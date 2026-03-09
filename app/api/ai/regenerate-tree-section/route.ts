/**
 * Per-tree AI regeneration — regenerates a single tree's narrative
 * without touching the rest of the report.
 *
 * POST /api/ai/regenerate-tree-section
 * Body: { reportId, treeId, treeNumber }
 * Returns: { content: string } — the regenerated markdown section
 */
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate, MASTER_VOICE_INSTRUCTIONS } from "@/lib/report-templates";
import { buildArboristStyleInstructions } from "@/lib/ai-writing-preferences";
import Anthropic from "@anthropic-ai/sdk";
import { logApiUsage } from "@/lib/api-usage";

function formatTypeSpecificBlock(
  reportType: string,
  raw: string | null | undefined
): string {
  if (!raw) return "";
  try {
    const d = JSON.parse(raw);
    switch (reportType) {
      case "health_assessment":
        return [
          d.likelihoodOfFailure ? `- TRAQ Likelihood of Failure: ${d.likelihoodOfFailure}` : "",
          d.likelihoodOfImpact ? `- TRAQ Likelihood of Impact: ${d.likelihoodOfImpact}` : "",
          d.consequences ? `- TRAQ Consequences: ${d.consequences}` : "",
          d.overallRiskRating ? `- TRAQ Overall Risk Rating: ${d.overallRiskRating}` : "",
          d.targetDescription ? `- Target Description: ${d.targetDescription}` : "",
          d.maintenanceItems?.length ? `- Maintenance Items: ${d.maintenanceItems.join(", ")}` : "",
          d.maintenanceRecommendations ? `- Maintenance Recommendations: ${d.maintenanceRecommendations}` : "",
          d.maintenancePriority ? `- Maintenance Priority: ${d.maintenancePriority}` : "",
          d.maintenanceTimeline ? `- Maintenance Timeline: ${d.maintenanceTimeline}` : "",
          d.estimatedMaintenanceCost != null ? `- Estimated Maintenance Cost: $${d.estimatedMaintenanceCost}` : "",
        ].filter(Boolean).join("\n");

      case "removal_permit":
        return [
          d.riskRating ? `- Risk Rating: ${d.riskRating}` : "",
          d.riskFactors?.length ? `- Risk Factors: ${d.riskFactors.join(", ")}` : "",
          d.removalReason ? `- Removal Reason: ${d.removalReason}` : "",
          d.retentionFeasibility ? `- Retention Feasibility: ${d.retentionFeasibility.replace(/_/g, " ")}` : "",
          d.retentionNotes ? `- Retention Notes: ${d.retentionNotes}` : "",
          d.estimatedRemainingLifespan ? `- Estimated Remaining Lifespan: ${d.estimatedRemainingLifespan}` : "",
        ].filter(Boolean).join("\n");

      case "tree_valuation":
        return [
          d.valuationMethod ? `- Valuation Method: ${d.valuationMethod}` : "",
          d.speciesRating != null ? `- Species Rating: ${d.speciesRating}%` : "",
          d.conditionRating != null ? `- Condition Rating (Valuation): ${d.conditionRating}%` : "",
          d.locationRating != null ? `- Location Rating: ${d.locationRating}%` : "",
          d.costPerSquareInch != null ? `- Cost per Sq Inch: $${d.costPerSquareInch}` : "",
          d.trunkArea != null ? `- Trunk Area: ${d.trunkArea.toFixed(1)} sq in` : "",
          d.appraisedValue != null ? `- Appraised Value: $${Number(d.appraisedValue).toLocaleString()}` : "",
        ].filter(Boolean).join("\n");

      case "construction_encroachment":
        return [
          d.tpzRadius != null ? `- TPZ Radius (auto): ${d.tpzRadius} ft` : "",
          d.tpzOverride && d.tpzManual != null ? `- TPZ Radius (manual override): ${d.tpzManual} ft` : "",
          d.srzRadius != null ? `- SRZ Radius (auto): ${d.srzRadius.toFixed(1)} ft` : "",
          d.tpzOverride && d.srzManual != null ? `- SRZ Radius (manual override): ${d.srzManual} ft` : "",
          d.encroachmentDescription ? `- Encroachment Description: ${d.encroachmentDescription}` : "",
          d.encroachmentPercent != null ? `- Encroachment: ${d.encroachmentPercent}%` : "",
          d.impactAssessment ? `- Impact Assessment: ${d.impactAssessment}` : "",
          d.protectionMeasuresList?.length
            ? `- Protection Measures: ${d.protectionMeasuresList.join(", ")}`
            : d.protectionMeasures ? `- Protection Measures: ${d.protectionMeasures}` : "",
          d.monitoringFrequency ? `- Monitoring Frequency: ${d.monitoringFrequency}`
            : d.monitoringSchedule ? `- Monitoring Schedule: ${d.monitoringSchedule}` : "",
        ].filter(Boolean).join("\n");

      default:
        return "";
    }
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json({ error: "No arborist found" }, { status: 404 });
    }

    const body = await request.json();
    if (!body.reportId || !body.treeId || body.treeNumber == null) {
      return NextResponse.json(
        { error: "Missing required fields: reportId, treeId, treeNumber" },
        { status: 400 }
      );
    }

    // Load report
    const report = await prisma.report.findUnique({
      where: { id: body.reportId },
      include: {
        property: true,
      },
    });
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Load the specific tree with photos and audio notes
    const tree = await prisma.treeRecord.findUnique({
      where: { id: body.treeId },
      include: {
        treePhotos: { orderBy: { sortOrder: "asc" } },
        treeAudioNotes: {
          where: { status: "ready" },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      // Mock fallback — generate a simple section
      const conditionLabels: Record<number, string> = {
        0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
      };
      const conditionDesc = conditionLabels[tree.conditionRating] || `${tree.conditionRating}/5`;
      const mockContent = `### Tree #${tree.treeNumber} — ${tree.speciesCommon}${tree.speciesScientific ? ` (*${tree.speciesScientific}*)` : ""}

The ${tree.speciesCommon} is a ${tree.dbhInches}-inch DBH specimen${tree.heightFt ? ` approximately ${tree.heightFt} feet in height` : ""} located on the subject property.

**Condition Rating: ${tree.conditionRating}/5 (${conditionDesc})**

**Health Observations:** ${tree.healthNotes || "No specific health concerns were noted during the Level 2 visual assessment."}

**Structural Assessment:** ${tree.structuralNotes || "No significant structural defects were observed during the visual assessment."}

${tree.recommendedAction === "retain" ? `The ${tree.speciesCommon} should be retained and preserved.` : tree.recommendedAction === "remove" ? `Removal of this ${tree.speciesCommon} is recommended.` : tree.recommendedAction === "prune" ? "Pruning in accordance with ANSI A300 standards is recommended." : "Continued monitoring at regular intervals by a certified arborist is recommended."}
`;
      return NextResponse.json({ content: mockContent });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const ordinance = await getOrdinanceByCity(report.property.city);
    const template = getReportTemplate(report.reportType);

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    // Build tree data block
    const photoLines = tree.treePhotos.length > 0
      ? tree.treePhotos.map((p, i) => `  Photo ${i + 1}: ${p.caption || "No caption"}`).join("\n")
      : "  None";
    const audioLines = tree.treeAudioNotes.length > 0
      ? tree.treeAudioNotes.map((a, i) => `  Audio Note ${i + 1}: ${a.cleanedTranscription || ""}`).join("\n")
      : "  None recorded";
    const typeBlock = formatTypeSpecificBlock(report.reportType, tree.typeSpecificData);

    const treeDataBlock = `Tree #${tree.treeNumber}:
- Tag Number: ${tree.tagNumber || "N/A"}
- Species: ${tree.speciesCommon}${tree.speciesScientific ? ` (${tree.speciesScientific})` : ""}
- DBH: ${tree.dbhInches} inches
- Height: ${tree.heightFt ? `${tree.heightFt} feet` : "Not measured"}
- Canopy Spread: ${tree.canopySpreadFt ? `${tree.canopySpreadFt} feet` : "Not measured"}
- Condition Rating: ${tree.conditionRating}/5
- Health Notes (raw field dictation — transform to professional language): ${tree.healthNotes || "None provided by arborist"}
- Structural Notes (raw field dictation — transform to professional language): ${tree.structuralNotes || "None provided by arborist"}
- Protected Status: ${tree.isProtected ? "Yes" : "No"}
- Protection Reason: ${tree.protectionReason || "N/A"}
- Recommended Action: ${tree.recommendedAction}
- Mitigation Required: ${tree.mitigationRequired || "None"}
- Photos on File: ${tree.treePhotos.length > 0 ? `${tree.treePhotos.length} photo(s)` : "None"}
${tree.treePhotos.length > 0 ? photoLines : ""}
- Field Audio Notes:
${audioLines}${typeBlock ? `\n- Type-Specific Assessment:\n${typeBlock}` : ""}`;

    // Build arborist writing preferences
    const styleInstructions = buildArboristStyleInstructions(arborist);

    const systemPrompt = `You are writing the assessment section for a single tree in a ${reportTypeLabel} report. Write ONLY this tree's section — do not include site observations, methodology, assignment/purpose, limitations, or any other report sections. Start with the tree heading.

${template?.systemInstructions || "Write a professional arborist assessment following ISA standards and best practices."}

${MASTER_VOICE_INSTRUCTIONS}
${styleInstructions}

MUNICIPAL ORDINANCE CONTEXT:
${
  ordinance
    ? `City: ${ordinance.cityName}, ${ordinance.state}
Code Reference: ${ordinance.codeReference || "N/A"}
Protected Species Rules: ${JSON.stringify(ordinance.protectedSpecies)}
Default Native DBH Threshold: ${ordinance.defaultDbhThresholdNative ?? "N/A"} inches
Default Non-Native DBH Threshold: ${ordinance.defaultDbhThresholdNonnative ?? "N/A"} inches
Heritage Tree Rules: ${JSON.stringify(ordinance.heritageTreeRules)}`
    : `No specific ordinance data available for ${report.property.city}.`
}

TREE DATA:
${treeDataBlock}

FORMATTING:
- Use ### for the tree heading: ### Tree #${body.treeNumber} — ${tree.speciesCommon}${tree.speciesScientific ? ` (*${tree.speciesScientific}*)` : ""}
- Follow the same style and depth as a full report's Individual Tree Assessments section
- Transform ALL raw field dictation into formal professional language
- Do NOT include any sections other than this tree's assessment narrative`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Generate the assessment section for Tree #${body.treeNumber} (${tree.speciesCommon}) based on the data provided. Write the complete section starting with the ### Tree heading.`,
        },
      ],
    });

    const generatedText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Log API usage (fire-and-forget)
    logApiUsage({
      arboristId: arborist.id,
      propertyId: report.propertyId,
      reportId: report.id,
      provider: "anthropic",
      endpoint: "regenerate-tree-section",
      model: "claude-sonnet-4-20250514",
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
    });

    return NextResponse.json({ content: generatedText });
  } catch (error) {
    console.error("Error regenerating tree section:", error);
    return NextResponse.json(
      { error: "Failed to regenerate tree section" },
      { status: 500 }
    );
  }
}
