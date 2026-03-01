import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate } from "@/lib/report-templates";
import Anthropic from "@anthropic-ai/sdk";

interface TreeRecordData {
  treeNumber: number;
  tagNumber?: string | null;
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
  scopeOfAssignment?: string | null;
  siteObservations?: string | null;
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
          d.likelihoodOfFailure
            ? `    - TRAQ Likelihood of Failure: ${d.likelihoodOfFailure}`
            : "",
          d.likelihoodOfImpact
            ? `    - TRAQ Likelihood of Impact: ${d.likelihoodOfImpact}`
            : "",
          d.consequences
            ? `    - TRAQ Consequences: ${d.consequences}`
            : "",
          d.overallRiskRating
            ? `    - TRAQ Overall Risk Rating: ${d.overallRiskRating}`
            : "",
          d.targetDescription
            ? `    - Target Description: ${d.targetDescription}`
            : "",
          d.maintenanceItems?.length
            ? `    - Maintenance Items: ${d.maintenanceItems.join(", ")}`
            : "",
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
            ? `    - Retention Feasibility: ${d.retentionFeasibility.replace(/_/g, " ")}`
            : "",
          d.retentionNotes
            ? `    - Retention Notes: ${d.retentionNotes}`
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
          d.tpzRadius != null ? `    - TPZ Radius (auto): ${d.tpzRadius} ft` : "",
          d.tpzOverride && d.tpzManual != null
            ? `    - TPZ Radius (manual override): ${d.tpzManual} ft`
            : "",
          d.srzRadius != null
            ? `    - SRZ Radius (auto): ${d.srzRadius.toFixed(1)} ft`
            : "",
          d.tpzOverride && d.srzManual != null
            ? `    - SRZ Radius (manual override): ${d.srzManual} ft`
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
          d.protectionMeasuresList?.length
            ? `    - Protection Measures: ${d.protectionMeasuresList.join(", ")}`
            : d.protectionMeasures
            ? `    - Protection Measures: ${d.protectionMeasures}`
            : "",
          d.monitoringFrequency
            ? `    - Monitoring Frequency: ${d.monitoringFrequency}`
            : d.monitoringSchedule
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

function mockHealthNotes(t: TreeRecordData): string {
  if (t.healthNotes) return t.healthNotes;
  if (t.conditionRating >= 4)
    return "The tree presents a full, well-distributed crown with no visible signs of disease, pest infestation, or nutritional deficiency. Foliage color and density are appropriate for the species.";
  if (t.conditionRating === 3)
    return "The tree shows moderate crown thinning and minor dieback in the upper canopy. No significant pest or disease issues were observed, though continued monitoring is warranted.";
  if (t.conditionRating >= 1)
    return "The tree exhibits significant decline including extensive crown dieback, reduced foliage density, and signs of stress. Further diagnostic evaluation may be warranted to determine the underlying cause.";
  return "The tree is dead with no viable foliage or cambial activity detected.";
}

function mockStructuralNotes(t: TreeRecordData): string {
  if (t.structuralNotes) return t.structuralNotes;
  if (t.conditionRating >= 4)
    return "The trunk and primary scaffold branches are structurally sound with no visible cavities, cracks, or significant included bark. The root flare appears stable with no signs of root plate failure.";
  if (t.conditionRating === 3)
    return "Minor structural concerns were noted including moderate co-dominant stems and minor deadwood in the upper crown. These do not represent an imminent hazard but should be addressed through maintenance pruning.";
  if (t.conditionRating >= 1)
    return "Significant structural defects were observed including evidence of internal decay, compromised branch attachments, and reduced structural integrity. The defects present an elevated risk that should be addressed.";
  return "Structural assessment is not applicable for a dead tree. The standing dead tree may present a hazard and should be evaluated for removal.";
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

  // Build individual tree assessment sections with condition-varied text
  const individualAssessments = trees
    .map((t) => {
      const conditionLabels: Record<number, string> = {
        0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
      };
      const conditionDesc = conditionLabels[t.conditionRating] || `${t.conditionRating}/5`;
      const dims = [
        `${t.dbhInches}-inch DBH`,
        t.heightFt ? `approximately ${t.heightFt} feet in height` : null,
        t.canopySpreadFt ? `with a canopy spread of ${t.canopySpreadFt} feet` : null,
      ].filter(Boolean).join(", ");

      const bottomLine =
        t.recommendedAction === "retain"
          ? `The ${t.speciesCommon} should be retained and preserved as a healthy contributor to the urban canopy.`
          : t.recommendedAction === "remove"
          ? `Removal of this ${t.speciesCommon} is recommended due to ${t.conditionRating <= 2 ? "its compromised health and structural condition" : "the factors identified in this assessment"}.${t.isProtected ? ` A removal permit is required from the City of ${property.city} prior to removal.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning in accordance with ANSI A300 standards is recommended to address the identified structural concerns.`
          : `Continued monitoring at 6\u201312 month intervals by a certified arborist is recommended to track progression of the noted conditions.`;

      return `### Tree #${t.treeNumber} \u2014 ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

The ${t.speciesCommon} is a ${dims} specimen located on the subject property.

**Condition Rating: ${t.conditionRating}/5 (${conditionDesc})**

**Health Observations:** ${mockHealthNotes(t)}

**Structural Assessment:** ${mockStructuralNotes(t)}

${bottomLine}`;
    })
    .join("\n\n");

  // Build per-tree recommendation summaries with specific standards references
  const recommendationSummaries = trees
    .map((t) => {
      const actionDesc =
        t.recommendedAction === "retain"
          ? `Retain and preserve. The ${t.dbhInches}-inch ${t.speciesCommon} is in ${t.conditionRating >= 4 ? "good to excellent" : t.conditionRating >= 3 ? "fair" : "declining"} condition and continues to provide aesthetic, environmental, and ecological benefits. A routine maintenance pruning program per ANSI A300 standards should be implemented.`
          : t.recommendedAction === "remove"
          ? `Removal is recommended. ${t.conditionRating <= 2 ? "The tree's declining health and structural deficiencies present an unacceptable level of risk that cannot be adequately mitigated through pruning or other remedial measures." : "The proposed removal should be evaluated against applicable municipal ordinance requirements."}${t.isProtected ? ` As a protected tree under the ${property.city} municipal ordinance, a removal permit must be obtained prior to any removal work.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning is recommended to address identified structural concerns and improve clearance. All pruning work shall be performed in accordance with ANSI A300 pruning standards and ISA Best Management Practices by a qualified tree care provider.`
          : `Continued monitoring at 6\u201312 month intervals is recommended. Any significant changes in health or structural condition should be evaluated by an ISA Certified Arborist.`;

      return `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${actionDesc}`;
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

  return `# ${reportTypeLabel}

**Date:** ${date}
**Property Address:** ${property.address}
**City:** ${property.city}, ${state}
**County:** ${property.county || "N/A"}
**Parcel Number:** ${property.parcelNumber || "N/A"}
**Total Trees Assessed:** ${treeCount}

---

## 1. Assignment and Purpose

This report has been prepared to provide a professional arborist assessment of ${treeCount} tree${treeCount !== 1 ? "s" : ""} located at ${property.address}, ${property.city}, ${state}. The purpose of this ${reportTypeLabel.toLowerCase()} is to evaluate each tree's health, structural condition, and protected status in accordance with applicable municipal ordinances and ISA (International Society of Arboriculture) standards. All trees were assessed from ground level using ISA Tree Risk Assessment (TRAQ) methodology.

---

## 2. Site Observations

The subject trees are located on the property at ${property.address}. The surrounding site conditions were evaluated for factors that may impact tree health and stability, including soil compaction, grade changes, construction activity, and proximity to structures.${property.siteObservations ? ` ${property.siteObservations}` : ""}

---

## 3. Individual Tree Assessments

${individualAssessments}

---

## 4. Protected Status Summary

**Protected Trees:** ${protectedCount} of ${treeCount} total

${protectedDetails}

---

## 5. Recommendations

${recommendationSummaries}

---

## 6. Mitigation Requirements

${mitigationContent}

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
    - Tag Number: ${t.tagNumber || "N/A"}
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

      // Filter out sections handled by the PDF template
      const excludedSections = ["Tree Inventory", "Arborist Certification Statement"];
      const filteredSections = template
        ? template.requiredSections.filter((s) => !excludedSections.includes(s))
        : [
            "Assignment and Purpose",
            "Site Observations",
            "Individual Tree Assessments",
            "Protected Status Summary",
            "Recommendations",
            "Mitigation Requirements",
          ];

      const sectionsList = filteredSections
        .map((s, i) => `${i + 1}. **${s}**`)
        .join("\n");

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
- Total Trees: ${treeCount}
- Scope of Assignment: ${property.scopeOfAssignment || "N/A"}
- Site Observations: ${property.siteObservations || "N/A"}${
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

When a Scope of Assignment is provided, use it to write the "Scope of Assignment" section describing the purpose, limitations, and scope of the assessment. When Site Observations are provided, weave them into the Site Observations section along with any additional observations from the tree data.

Use professional arborist terminology. Reference specific municipal code sections where applicable. The report should be thorough and suitable for submission to the City of ${property.city}.

IMPORTANT: Do NOT include a "Tree Inventory" section or table in the generated report — the PDF template generates its own formatted tree inventory table separately. Do NOT include an "Arborist Certification Statement" section — the certification is handled separately in the PDF template with the arborist's e-signature. End the report after the final content section (typically Mitigation Requirements or Recommendations).

CRITICAL WRITING GUIDELINES:
- Write in the professional third person. Never use "I" or "we" — use "the consulting arborist" or passive voice.
- Be specific. Never write generic filler like "typical characteristics for its species." Instead, describe the actual observations: crown density percentage, specific defects observed, or note that no defects were found.
- When no health notes or structural notes were provided by the arborist, infer reasonable observations from the condition rating and species. A Coast Live Oak rated 4/5 should have different observations than a Valley Oak rated 2/5.
- Vary your language between tree assessments. Do not use the same sentence structure or phrases for multiple trees.
- Reference specific tree care standards: ANSI A300, ISA Best Management Practices, ISA TRAQ methodology.
- For protected trees, always cite the specific municipal code section if ordinance data is available.
- For removal recommendations, always include the required findings under the applicable ordinance.
- Use measurements provided (DBH, height, canopy spread) in the narrative. Don't just list them — incorporate them naturally: "The 20-inch DBH Valley Oak..." not "DBH: 20 inches."
- End each individual tree assessment with a clear, one-sentence bottom line: what should be done with this tree and why.`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
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
