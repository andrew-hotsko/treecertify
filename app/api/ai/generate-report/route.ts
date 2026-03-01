import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate } from "@/lib/report-templates";
import Anthropic from "@anthropic-ai/sdk";

interface TreeRecordData {
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string | null;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string | null;
  structuralNotes: string | null;
  isProtected: boolean;
  protectionReason: string | null;
  recommendedAction: string;
  mitigationRequired: string | null;
  typeSpecificData?: string | null;
}

interface PropertyData {
  address: string;
  city: string;
  state: string | null;
  zip: string | null;
  county: string | null;
  parcelNumber: string | null;
}

/**
 * Format type-specific tree assessment data for inclusion in AI prompts.
 */
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
          d.maintenanceRecommendations
            ? `    - Maintenance Recommendations: ${d.maintenanceRecommendations}`
            : "",
          d.maintenancePriority
            ? `    - Maintenance Priority: ${d.maintenancePriority}`
            : "",
          d.maintenanceTimeline
            ? `    - Maintenance Timeline: ${d.maintenanceTimeline}`
            : "",
          d.estimatedMaintenanceCost != null
            ? `    - Estimated Maintenance Cost: $${d.estimatedMaintenanceCost}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "removal_permit":
        return [
          d.riskRating ? `    - Risk Rating: ${d.riskRating}` : "",
          d.riskFactors?.length
            ? `    - Risk Factors: ${d.riskFactors.join(", ")}`
            : "",
          d.removalReason ? `    - Removal Reason: ${d.removalReason}` : "",
          d.retentionFeasibility
            ? `    - Retention Feasibility: ${d.retentionFeasibility}`
            : "",
          d.estimatedRemainingLifespan
            ? `    - Estimated Remaining Lifespan: ${d.estimatedRemainingLifespan}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "tree_valuation":
        return [
          d.valuationMethod
            ? `    - Valuation Method: ${d.valuationMethod}`
            : "",
          d.speciesRating != null
            ? `    - Species Rating: ${d.speciesRating}%`
            : "",
          d.conditionRating != null
            ? `    - Condition Rating (Valuation): ${d.conditionRating}%`
            : "",
          d.locationRating != null
            ? `    - Location Rating: ${d.locationRating}%`
            : "",
          d.costPerSquareInch != null
            ? `    - Cost per Sq Inch: $${d.costPerSquareInch}`
            : "",
          d.trunkArea != null
            ? `    - Trunk Area: ${d.trunkArea.toFixed(1)} sq in`
            : "",
          d.appraisedValue != null
            ? `    - Appraised Value: $${Number(d.appraisedValue).toLocaleString()}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "construction_encroachment":
        return [
          d.tpzRadius != null ? `    - TPZ Radius: ${d.tpzRadius} ft` : "",
          d.srzRadius != null
            ? `    - SRZ Radius: ${d.srzRadius.toFixed(1)} ft`
            : "",
          d.encroachmentDescription
            ? `    - Encroachment Description: ${d.encroachmentDescription}`
            : "",
          d.encroachmentPercent != null
            ? `    - Encroachment: ${d.encroachmentPercent}%`
            : "",
          d.impactAssessment
            ? `    - Impact Assessment: ${d.impactAssessment}`
            : "",
          d.protectionMeasures
            ? `    - Protection Measures: ${d.protectionMeasures}`
            : "",
          d.monitoringSchedule
            ? `    - Monitoring Schedule: ${d.monitoringSchedule}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      default:
        return "";
    }
  } catch {
    return "";
  }
}

function generateMockReport(
  property: PropertyData,
  trees: TreeRecordData[],
  reportType: string
): string {
  const reportTypeLabel = reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const state = property.state || "CA";
  const treeCount = trees.length;
  const protectedCount = trees.filter((t) => t.isProtected).length;

  // Build tree inventory table
  const treeTableHeader = `| Tree # | Common Name | Scientific Name | DBH (in) | Height (ft) | Canopy (ft) | Condition | Protected | Action |`;
  const treeTableDivider = `|--------|-------------|-----------------|----------|-------------|-------------|-----------|-----------|--------|`;
  const treeTableRows = trees
    .map(
      (t) =>
        `| ${t.treeNumber} | ${t.speciesCommon} | ${t.speciesScientific ? `*${t.speciesScientific}*` : "N/A"} | ${t.dbhInches} | ${t.heightFt ?? "N/M"} | ${t.canopySpreadFt ?? "N/M"} | ${t.conditionRating}/5 | ${t.isProtected ? "Yes" : "No"} | ${t.recommendedAction} |`
    )
    .join("\n");

  // Build individual tree assessment sections
  const individualAssessments = trees
    .map((t) => {
      const conditionDesc =
        t.conditionRating >= 4
          ? "good to excellent"
          : t.conditionRating >= 3
          ? "fair"
          : "poor to declining";

      return `### Tree #${t.treeNumber} - ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

**Condition Rating: ${t.conditionRating}/5 (${conditionDesc})**

**Health Notes:** ${t.healthNotes || "The tree exhibits typical characteristics for its species and age class. No significant health defects were noted during the visual assessment. Crown density, leaf color, and twig growth appear within normal ranges."}

**Structural Notes:** ${t.structuralNotes || "The tree's structural integrity was evaluated for defects including cavities, included bark, codominant stems, decay, cracks, and root plate stability. No significant structural defects were identified that would warrant immediate concern."}

${t.conditionRating >= 4 ? "The tree is in good to excellent condition and is expected to provide continued benefits to the property and community." : t.conditionRating >= 3 ? "The tree is in fair condition. Continued monitoring is recommended to track any changes in health or structural stability." : "The tree is in poor condition. Remedial action may be necessary to address the identified health and/or structural concerns."}`;
    })
    .join("\n\n");

  // Build per-tree recommendation summaries
  const recommendationSummaries = trees
    .map((t) => {
      const actionDesc =
        t.recommendedAction === "retain"
          ? `Retain and preserve. The tree is in ${t.conditionRating >= 4 ? "good" : t.conditionRating >= 3 ? "fair" : "declining"} condition and continues to provide aesthetic, environmental, and ecological benefits. A routine maintenance pruning program should be implemented.`
          : t.recommendedAction === "remove"
          ? `Removal is recommended. ${t.conditionRating <= 2 ? "The tree's declining health and/or structural deficiencies present an unacceptable level of risk." : "The proposed removal should be evaluated against applicable municipal ordinance requirements."}${t.isProtected ? ` As a protected tree, a removal permit must be obtained from the City of ${property.city} prior to any removal work.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning is recommended to address identified structural concerns and/or improve clearance. All pruning should be performed in accordance with ANSI A300 pruning standards and ISA Best Management Practices.`
          : `Continued monitoring at 6-12 month intervals is recommended. Any significant changes in condition should be evaluated by a certified arborist.`;

      return `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${actionDesc}`;
    })
    .join("\n");

  // Build protected status details
  const protectedTrees = trees.filter((t) => t.isProtected);
  const protectedDetails = protectedTrees.length
    ? protectedTrees
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${t.protectionReason || "Meets protection criteria under the municipal ordinance."}`
        )
        .join("\n")
    : "No trees on this property meet the criteria for protected status under the applicable municipal ordinance.";

  // Build mitigation section
  const treesNeedingMitigation = trees.filter(
    (t) => t.isProtected && t.recommendedAction === "remove"
  );
  const mitigationContent = treesNeedingMitigation.length
    ? treesNeedingMitigation
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${t.mitigationRequired || `As a protected tree, removal will require mitigation in accordance with the ${property.city} municipal ordinance. Typical mitigation may include replanting replacement trees at the required ratio and/or payment of in-lieu fees.`}`
        )
        .join("\n")
    : "No mitigation is required at this time based on the current assessment and recommended actions.";

  return `# Arborist ${reportTypeLabel} Report

**Date:** ${date}
**Property Address:** ${property.address}
**City:** ${property.city}, ${state}
**County:** ${property.county || "N/A"}
**Parcel Number:** ${property.parcelNumber || "N/A"}
**Total Trees Assessed:** ${treeCount}

---

## 1. Assignment and Purpose

This report has been prepared to provide a professional arborist assessment of ${treeCount} tree${treeCount !== 1 ? "s" : ""} located at ${property.address}, ${property.city}, ${state}. The purpose of this ${reportTypeLabel.toLowerCase()} is to evaluate each tree's health, structural condition, and protected status in accordance with applicable municipal ordinances and ISA (International Society of Arboriculture) standards.

---

## 2. Tree Inventory

${treeTableHeader}
${treeTableDivider}
${treeTableRows}

---

## 3. Site Observations

The subject trees are located on the property at ${property.address}. The surrounding site conditions were evaluated for factors that may impact tree health and stability, including soil compaction, grade changes, construction activity, and proximity to structures. All trees were visually assessed from ground level in accordance with ISA Tree Risk Assessment standards (TRAQ methodology).

---

## 4. Individual Tree Assessments

${individualAssessments}

---

## 5. Protected Status Summary

**Protected Trees:** ${protectedCount} of ${treeCount} total

${protectedDetails}

---

## 6. Recommendations

${recommendationSummaries}

---

## 7. Mitigation Requirements

${mitigationContent}

---

## 8. Arborist Certification Statement

I, the undersigned, certify that this report represents my professional opinion based on my education, training, and experience as an ISA Certified Arborist. The observations and recommendations contained herein are based on a visual assessment of the subject trees conducted from ground level. No warranty is made, expressed, or implied, regarding the future health, structural stability, or safety of the subject trees.

This report has been prepared in accordance with the standards and guidelines of the International Society of Arboriculture (ISA) and applicable ANSI A300 standards.

---

*This report was generated as a draft and requires review and certification by the assigned arborist.*
`;
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
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const arboristId = arborist.id;
    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
          include: {
            treePhotos: { orderBy: { sortOrder: "asc" } },
            treeAudioNotes: {
              where: { status: "ready" },
              orderBy: { createdAt: "asc" },
            },
          },
        },
        propertyAudioNotes: {
          where: { status: "ready" },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.trees.length === 0) {
      return NextResponse.json(
        { error: "Property has no tree records. Add trees before generating a report." },
        { status: 400 }
      );
    }

    const ordinance = await getOrdinanceByCity(property.city);

    let aiDraftContent: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const reportTypeLabel = body.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

      const treeCount = property.trees.length;

      const treeDataBlock = property.trees
        .map(
          (t) => {
            const photoLines = t.treePhotos.length > 0
              ? t.treePhotos
                  .map((p, i) => `      Photo ${i + 1}: ${p.caption || "No caption"}`)
                  .join("\n")
              : "      None";

            const audioLines = t.treeAudioNotes.length > 0
              ? t.treeAudioNotes
                  .map((a, i) => `      Audio Note ${i + 1}: ${a.cleanedTranscription || ""}`)
                  .join("\n")
              : "      None recorded";

            const typeBlock = formatTypeSpecificBlock(body.reportType, t.typeSpecificData);

            return `  Tree #${t.treeNumber}:
    - Species: ${t.speciesCommon}${t.speciesScientific ? ` (${t.speciesScientific})` : ""}
    - DBH: ${t.dbhInches} inches
    - Height: ${t.heightFt ? `${t.heightFt} feet` : "Not measured"}
    - Canopy Spread: ${t.canopySpreadFt ? `${t.canopySpreadFt} feet` : "Not measured"}
    - Condition Rating: ${t.conditionRating}/5
    - Health Notes: ${t.healthNotes || "None provided"}
    - Structural Notes: ${t.structuralNotes || "None provided"}
    - Protected Status: ${t.isProtected ? "Yes" : "No"}
    - Protection Reason: ${t.protectionReason || "N/A"}
    - Recommended Action: ${t.recommendedAction}
    - Mitigation Required: ${t.mitigationRequired || "None"}
    - Photos on File: ${t.treePhotos.length > 0 ? `${t.treePhotos.length} photo(s)` : "None"}
${t.treePhotos.length > 0 ? photoLines : ""}
    - Field Audio Notes:
${audioLines}${typeBlock ? `\n    - Type-Specific Assessment:\n${typeBlock}` : ""}`;
          }
        )
        .join("\n\n");

      // Property-level site audio notes
      const propertyAudioBlock =
        property.propertyAudioNotes && property.propertyAudioNotes.length > 0
          ? `\nPROPERTY-LEVEL FIELD NOTES (recorded by the arborist during site visit):
${property.propertyAudioNotes
  .map(
    (a: { cleanedTranscription: string | null }, i: number) =>
      `  Site Note ${i + 1}: ${a.cleanedTranscription || ""}`
  )
  .join("\n")}`
          : "";

      // Look up template for this report type
      const template = getReportTemplate(body.reportType);

      const boilerplateBlock = template
        ? `\nREPORT TEMPLATE CONTEXT:
Report Type: ${template.displayName}
Boilerplate Introduction (use this as the opening for the Assignment and Purpose section):
"${template.boilerplateIntro}"

${template.aiPromptAdditions}`
        : "";

      const sectionsList = template
        ? template.requiredSections
            .map((s, i) => `${i + 1}. **${s}**`)
            .join("\n")
        : `1. **Assignment and Purpose** - State the purpose and scope covering all ${treeCount} trees
2. **Tree Inventory** - Markdown table with all trees: Tree #, Common Name, Scientific Name, DBH, Height, Canopy Spread, Condition, Protected, Recommended Action
3. **Site Observations** - Describe the site context and assessment methodology
4. **Individual Tree Assessments** - A subsection per tree with condition rating, health notes, and structural notes
5. **Protected Status Summary** - How many of the ${treeCount} trees are protected, with code references for each
6. **Recommendations** - Per-tree recommended action summary
7. **Mitigation Requirements** - Required mitigation per the city ordinance for any protected trees being removed
8. **Arborist Certification Statement** - Standard ISA certification language`;

      const systemPrompt = `You are an expert ISA Certified Arborist preparing a professional ${reportTypeLabel} report for a property with ${treeCount} tree${treeCount !== 1 ? "s" : ""}. Follow ISA report formatting standards and best practices for arborist reports filed with California municipalities.
${boilerplateBlock}

MUNICIPAL ORDINANCE CONTEXT:
${
  ordinance
    ? `City: ${ordinance.cityName}, ${ordinance.state}
Code Reference: ${ordinance.codeReference || "N/A"}
Protected Species Rules: ${JSON.stringify(ordinance.protectedSpecies)}
Default Native DBH Threshold: ${ordinance.defaultDbhThresholdNative || "N/A"} inches
Default Non-Native DBH Threshold: ${ordinance.defaultDbhThresholdNonnative || "N/A"} inches
Mitigation Rules: ${JSON.stringify(ordinance.mitigationRules)}
Heritage Tree Rules: ${JSON.stringify(ordinance.heritageTreeRules)}
Certifier Requirement: ${ordinance.certifierRequirement || "N/A"}
Permit Process Notes: ${ordinance.permitProcessNotes || "N/A"}`
    : `No specific ordinance data available for ${property.city}. Use general California arborist reporting standards.`
}

PROPERTY DATA:
- Address: ${property.address}
- City: ${property.city}, ${property.state || "CA"}
- County: ${property.county || "N/A"}
- Parcel Number: ${property.parcelNumber || "N/A"}
- Report Type: ${reportTypeLabel}
- Total Trees: ${treeCount}${
  body.reportType === "construction_encroachment"
    ? `\n- Project Description: ${property.projectDescription || "N/A"}\n- Permit Number: ${property.permitNumber || "N/A"}\n- Developer/Contractor: ${property.developerName || "N/A"}\n- Architect: ${property.architectName || "N/A"}`
    : ""
}

TREE ASSESSMENT DATA:
${treeDataBlock}
${propertyAudioBlock}

Generate a comprehensive, professional arborist report in markdown format with the following sections:

${sectionsList}

When trees have field audio notes (transcribed arborist voice recordings), incorporate these observations naturally into the Individual Tree Assessments section. Reference them as "Per field observations..." or "The arborist noted during field inspection that..." Do not mention that they came from audio recordings.

When property-level field notes are provided, weave them into the Site Observations and/or Executive Summary sections. Reference them as "Site conditions noted during the field inspection include..." Do not mention they came from audio recordings.

When trees have photos on file, reference them in the individual assessments as "See Photo 1", "See Photo 2", etc. to support observations.

Use professional arborist terminology. Reference specific municipal code sections where applicable. The report should be thorough and suitable for submission to the City of ${property.city}.`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: `Please generate the complete ${reportTypeLabel} report for the ${treeCount}-tree property based on the assessment data and ordinance context provided in your instructions.`,
          },
        ],
        system: systemPrompt,
      });

      const textBlock = message.content.find((block) => block.type === "text");
      aiDraftContent = textBlock?.text || "Error: No text content generated.";
    } else {
      aiDraftContent = generateMockReport(property, property.trees, body.reportType);
    }

    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId,
        reportType: body.reportType,
        aiDraftContent,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
