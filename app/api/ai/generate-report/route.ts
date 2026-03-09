/**
 * AI Report Generation — Prompt v2.1 (2026-03-04)
 *
 * Data-driven generation: structured tree/property/ordinance data is sent
 * alongside detailed system prompt instructions. Claude generates the
 * narrative from data rather than polishing pre-written text.
 *
 * Prompt version: 2.1
 * Changes from v2.0:
 *   - Added MASTER_VOICE_INSTRUCTIONS for raw dictation → professional language
 *   - Labels health/structural notes as raw field dictation in data block
 *   - Scope of Assignment instruction for Section 1 foundation
 *   - Report depth scaling based on tree condition/action
 */
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate, getMasterVoiceInstructions } from "@/lib/report-templates";
import { buildArboristStyleInstructions } from "@/lib/ai-writing-preferences";
import Anthropic from "@anthropic-ai/sdk";
import { logApiUsage } from "@/lib/api-usage";
import { logEvent } from "@/lib/analytics";

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
        // For tree_valuation, the data is on dedicated TreeRecord columns, not typeSpecificData
        // This case handles any legacy data in typeSpecificData
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

      case "real_estate_package":
        return [
          d.maintenanceItems?.length
            ? `    - Maintenance Items: ${d.maintenanceItems.join(", ")}`
            : "",
          d.maintenancePriority
            ? `    - Maintenance Priority: ${d.maintenancePriority}`
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

/**
 * Generate a mock real estate package report with the correct section structure.
 */
function generateMockRealEstateReport(
  property: PropertyData,
  trees: TreeRecordData[]
): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const state = property.state || "CA";
  const treeCount = trees.length;

  const conditionLabels: Record<number, string> = {
    0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
  };

  const conditionCategories = {
    excellent: trees.filter((t) => t.conditionRating >= 4).length,
    fair: trees.filter((t) => t.conditionRating === 3).length,
    needsAttention: trees.filter((t) => t.conditionRating <= 2 && t.conditionRating > 0).length,
  };

  const actionCounts = {
    retain: trees.filter((t) => t.recommendedAction === "retain").length,
    prune: trees.filter((t) => t.recommendedAction === "prune").length,
    monitor: trees.filter((t) => t.recommendedAction === "monitor").length,
    remove: trees.filter((t) => t.recommendedAction === "remove").length,
  };

  const reActionLabels: Record<string, string> = {
    retain: "This tree is a healthy asset that enhances property value and should be preserved.",
    remove: "Replacement planting is recommended to restore canopy coverage in this area.",
    prune: "Routine maintenance pruning will maintain this tree's health and appearance.",
    monitor: "This tree should be periodically inspected to ensure continued vigor.",
  };

  const individualAssessments = trees
    .map((t) => {
      const conditionDesc = conditionLabels[t.conditionRating] || `${t.conditionRating}/5`;
      const dims = [
        `${t.dbhInches}-inch DBH`,
        t.heightFt ? `approximately ${t.heightFt} feet in height` : null,
        t.canopySpreadFt ? `with a canopy spread of ${t.canopySpreadFt} feet` : null,
      ].filter(Boolean).join(", ");

      const healthLine = t.healthNotes
        ? t.healthNotes
        : t.conditionRating >= 4
        ? "The specimen presented in good overall health with a full, well-distributed canopy."
        : t.conditionRating >= 3
        ? "The tree shows moderate stress that can be addressed with routine maintenance."
        : "The tree requires professional attention to address current condition concerns.";

      const action = reActionLabels[t.recommendedAction] || reActionLabels.monitor;

      return `### Tree #${t.treeNumber} — ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

The ${t.speciesCommon} is a ${dims} specimen located on the subject property.

**Condition: ${conditionDesc}** — ${healthLine}

${action}`;
    })
    .join("\n\n");

  return `# Certified Tree Canopy Report

**Date:** ${date}
**Property Address:** ${property.address}
**City:** ${property.city}, ${state}
**County:** ${property.county || "N/A"}
**Report Type:** Real Estate Package — Tree Canopy Assessment

---

## 1. Introduction and Scope

This Certified Tree Canopy Report has been prepared for a real estate transaction involving the property at ${property.address}, ${property.city}, ${state}. The assessment evaluates the health, structural condition, and contributory value of the tree canopy assets on the subject property. All ${treeCount} tree${treeCount !== 1 ? "s were" : " was"} assessed from ground level using a Level 2 Basic visual assessment per ISA Best Management Practices.

---

## 2. Site Description

The subject property is located at ${property.address}, ${property.city}, ${state}.${property.siteObservations ? ` ${property.siteObservations}` : ""} The mature tree canopy contributes to the established character of the property and surrounding neighborhood.

---

## 3. Executive Tree Summary

**Total Trees Assessed:** ${treeCount}
**Condition Overview:** ${conditionCategories.excellent} in Good/Excellent condition, ${conditionCategories.fair} Fair, ${conditionCategories.needsAttention} requiring attention
**Actions:** ${actionCounts.retain} retain, ${actionCounts.prune} prune, ${actionCounts.monitor} monitor, ${actionCounts.remove} remove
**Total Canopy Value:** *Formal CTLA valuation pending — complete tree assessment data to calculate appraised values.*

---

## 4. Individual Tree Assessments

${individualAssessments}

---

## 5. Canopy Valuation Summary

Tree values represent the contributory landscape value calculated using the Council of Tree and Landscape Appraisers (CTLA) Trunk Formula Method, 10th Edition. Values are based on trunk area, species rating, condition assessment, and location factors.

*Formal valuation calculations will be completed once all assessment data has been entered for each tree.*

---

## 6. Maintenance Outlook

${actionCounts.prune > 0 ? `${actionCounts.prune} tree${actionCounts.prune !== 1 ? "s require" : " requires"} routine maintenance pruning per ANSI A300 standards. ` : ""}${actionCounts.monitor > 0 ? `${actionCounts.monitor} tree${actionCounts.monitor !== 1 ? "s should" : " should"} be periodically inspected by a certified arborist. ` : ""}The diverse species composition on this property provides resilient canopy coverage that should continue to enhance property value with routine care.

---

## 7. Limitations and Assumptions

This assessment was conducted as a Level 2 Basic visual assessment from ground level per ISA Best Management Practices. No below-ground examination, aerial inspection, or invasive testing was performed. This report is intended to inform real estate transaction decisions and does not constitute a real estate appraisal. Tree values represent contributory landscape value calculated using the CTLA Trunk Formula Method, 10th Edition.

---

*This report was generated as a draft and requires review and certification by the assigned arborist.*
`;
}

/**
 * Generate a mock/fallback report when no ANTHROPIC_API_KEY is configured.
 * This is a simplified structural draft — not the AI-quality output.
 */
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

  const conditionLabels: Record<number, string> = {
    0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
  };

  const individualAssessments = trees
    .map((t) => {
      const conditionDesc = conditionLabels[t.conditionRating] || `${t.conditionRating}/5`;
      const dims = [
        `${t.dbhInches}-inch DBH`,
        t.heightFt ? `approximately ${t.heightFt} feet in height` : null,
        t.canopySpreadFt ? `with a canopy spread of ${t.canopySpreadFt} feet` : null,
      ].filter(Boolean).join(", ");

      // Use arborist notes directly — do not fabricate observations
      const healthLine = t.healthNotes
        ? t.healthNotes
        : t.conditionRating >= 4
        ? "No specific health concerns were noted during the Level 2 visual assessment."
        : t.conditionRating >= 3
        ? "The tree exhibits moderate signs of stress consistent with its assigned condition rating. Further monitoring is recommended."
        : t.conditionRating >= 1
        ? "The tree exhibits signs of decline consistent with its assigned condition rating. Further diagnostic evaluation may be warranted."
        : "The tree is dead with no viable foliage or cambial activity detected.";

      const structuralLine = t.structuralNotes
        ? t.structuralNotes
        : t.conditionRating >= 4
        ? "No significant structural defects were observed during the visual assessment."
        : t.conditionRating >= 3
        ? "Minor structural concerns were noted. These should be addressed through maintenance pruning per ANSI A300 standards."
        : t.conditionRating >= 1
        ? "Structural defects were observed that warrant further evaluation and may require corrective action."
        : "Structural assessment is not applicable for a dead tree.";

      const bottomLine =
        t.recommendedAction === "retain"
          ? `The ${t.speciesCommon} should be retained and preserved.`
          : t.recommendedAction === "remove"
          ? `Removal of this ${t.speciesCommon} is recommended.${t.isProtected ? ` A removal permit is required from the City of ${property.city}.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning in accordance with ANSI A300 standards is recommended.`
          : `Continued monitoring at regular intervals by a certified arborist is recommended.`;

      return `### Tree #${t.treeNumber} \u2014 ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

The ${t.speciesCommon} is a ${dims} specimen located on the subject property.

**Condition Rating: ${t.conditionRating}/5 (${conditionDesc})**

**Health Observations:** ${healthLine}

**Structural Assessment:** ${structuralLine}

${bottomLine}`;
    })
    .join("\n\n");

  const recommendationSummaries = trees
    .map((t) => {
      const actionDesc =
        t.recommendedAction === "retain"
          ? `Retain and preserve.`
          : t.recommendedAction === "remove"
          ? `Removal is recommended.${t.isProtected ? ` A removal permit must be obtained from the City of ${property.city}.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning per ANSI A300 standards is recommended.`
          : `Continued monitoring is recommended.`;

      return `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${actionDesc}`;
    })
    .join("\n");

  const protectedTrees = trees.filter((t) => t.isProtected);
  const protectedDetails = protectedTrees.length
    ? protectedTrees
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${t.protectionReason || "Meets protection criteria under the municipal ordinance."}`
        )
        .join("\n")
    : "No trees on this property meet the criteria for protected status under the applicable municipal ordinance.";

  const treesNeedingMitigation = trees.filter(
    (t) => t.isProtected && t.recommendedAction === "remove"
  );
  const mitigationContent = treesNeedingMitigation.length
    ? treesNeedingMitigation
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${t.mitigationRequired || `As a protected tree, removal will require mitigation in accordance with the ${property.city} municipal ordinance.`}`
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

This report has been prepared to provide a professional arborist assessment of ${treeCount} tree${treeCount !== 1 ? "s" : ""} located at ${property.address}, ${property.city}, ${state}. All trees were assessed from ground level using a Level 2 Basic visual assessment per ISA TRAQ methodology.

---

## 2. Site Observations

The subject trees are located on the property at ${property.address}.${property.siteObservations ? ` ${property.siteObservations}` : ""}

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

## 7. Limitations and Assumptions

This assessment was conducted as a Level 2 Basic visual assessment from ground level per ISA TRAQ methodology. No below-ground examination, aerial inspection, or invasive testing was performed. Trees are living organisms and conditions can change; this assessment reflects conditions at the time of inspection.

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

      // Build structured tree data block
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
    - Health Observations (canonical): ${t.healthObservationCanonical || ""}
    - Health Notes (raw field dictation — transform to professional language): ${t.healthNotes || "None provided by arborist"}
    - Structural Observations (canonical): ${t.structuralObservationCanonical || ""}
    - Structural Notes (raw field dictation — transform to professional language): ${t.structuralNotes || "None provided by arborist"}
    - Protected Status: ${t.isProtected ? "Yes" : "No"}
    - Protection Reason: ${t.protectionReason || "N/A"}
    - Recommended Action: ${t.recommendedAction}
    - Mitigation Required: ${t.mitigationRequired || "None"}
    - Photos on File: ${t.treePhotos.length > 0 ? `${t.treePhotos.length} photo(s)` : "None"}
${t.treePhotos.length > 0 ? photoLines : ""}
    - Field Audio Notes:
${audioLines}${typeBlock ? `\n    - Type-Specific Assessment:\n${typeBlock}` : ""}${(body.reportType === "tree_valuation" || body.reportType === "real_estate_package") ? `
    - CTLA Valuation — Unit Price: $${t.valuationUnitPrice ?? "N/A"}/sq in, Health: ${t.valuationHealthRating ?? "N/A"}%, Structure: ${t.valuationStructureRating ?? "N/A"}%, Form: ${t.valuationFormRating ?? "N/A"}%, Condition (geometric mean): ${t.valuationConditionRating ?? "N/A"}%, Species: ${t.valuationSpeciesRating ?? "N/A"}%, Site: ${t.valuationSiteRating ?? "N/A"}%, Contribution: ${t.valuationContributionRating ?? "N/A"}%, Location: ${t.valuationLocationRating ?? "N/A"}%, Basic Value: $${t.valuationBasicValue ?? "N/A"}, Appraised Value: $${t.valuationAppraisedValue ?? "N/A"}
    - Valuation Notes: ${t.valuationNotes || "None"}` : ""}`;
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
            "Limitations and Assumptions",
          ];

      const sectionsList = filteredSections
        .map((s, i) => `${i + 1}. **${s}**`)
        .join("\n");

      // Build the data-driven system prompt (v2.1)
      const systemPrompt = `You are an expert ISA Certified Arborist generating a professional ${reportTypeLabel} report from structured field data. Your task is to GENERATE a complete, submission-ready narrative from the data below — not to polish or refine pre-written text.

PROMPT VERSION: 2.1

${template?.systemInstructions || `Write a professional arborist report following ISA standards and best practices.`}

${getMasterVoiceInstructions(body.reportType)}
${buildArboristStyleInstructions(arborist)}
${body.reportType === "real_estate_package" ? `
REAL ESTATE PACKAGE — LANGUAGE OVERRIDES:
This report is for a REAL ESTATE TRANSACTION, not a municipal permit application. Override the general voice instructions as follows:
- The audience is homebuyers and realtors, NOT city planners or attorneys.
- Frame trees as PROPERTY ASSETS and AMENITIES. Use words like "specimen," "asset," "amenity," "canopy," "mature landscaping."
- AVOID alarming language: do NOT use "hazard," "hazardous," "failure," "risk of failure," "target zone," "mitigation." Instead use: "may benefit from structural pruning," "recommend professional evaluation," "routine maintenance will address."
- For trees recommended for removal: frame diplomatically. Explain why, suggest replacement: "Replacement planting would restore canopy coverage in this area." Never say "removal recommended" as a standalone phrase — provide context.
- Condition descriptions: "good health with a full canopy" (not "no defects observed"); "showing moderate stress that responds well to maintenance" (not "declining health, poor prognosis").
- This report will NOT be submitted to city planners. Do NOT reference municipal code, permit requirements, or compliance language unless specifically relevant to the property.
` : ""}${(body.reportType === "tree_valuation" || body.reportType === "real_estate_package") ? `
VALUATION NARRATIVE CALIBRATION (MANDATORY):
Calibrate your language to match the numeric CTLA ratings provided for each tree.
- 90–100%: "excellent", "exceptional", "outstanding specimen"
- 70–89%: "good overall condition", "sound", "well-maintained"
- 50–69%: "moderate condition", "functional but showing signs of decline"
- 25–49%: "poor condition", "significant concerns", "declining"
- Below 25%: "severely compromised", "critical condition"

Do NOT describe a tree as "excellent" if its condition ratings are below 90%.
Do NOT describe a tree as "poor" if its condition ratings are above 70%.
The narrative must be consistent with the numeric data — reviewers will check.
Do NOT include dollar figures in narrative paragraphs — values belong in the valuation table only.
` : ""}
═══════════════════════════════════════════════════════════
STRUCTURED DATA — Generate the report narrative from this data
═══════════════════════════════════════════════════════════

MUNICIPAL ORDINANCE CONTEXT:
${
  ordinance
    ? `City: ${ordinance.cityName}, ${ordinance.state}
Code Reference: ${ordinance.codeReference || "N/A"}
Ordinance URL: ${ordinance.ordinanceUrl || "N/A"}
Protected Species Rules: ${JSON.stringify(ordinance.protectedSpecies)}
Default Native DBH Threshold: ${ordinance.defaultDbhThresholdNative ?? "N/A"} inches
Default Non-Native DBH Threshold: ${ordinance.defaultDbhThresholdNonnative ?? "N/A"} inches
Mitigation Rules: ${JSON.stringify(ordinance.mitigationRules)}
Heritage Tree Rules: ${JSON.stringify(ordinance.heritageTreeRules)}
Certifier Requirement: ${ordinance.certifierRequirement || "N/A"}
Permit Process Notes: ${ordinance.permitProcessNotes || "N/A"}`
    : `No specific ordinance data available for ${property.city}. Use general California arborist reporting standards. Do not cite specific code sections.`
}

PROPERTY DATA:
- Address: ${property.address}
- City: ${property.city}, ${property.state || "CA"}
- County: ${property.county || "N/A"}
- Parcel Number: ${property.parcelNumber || "N/A"}
- Report Type: ${reportTypeLabel}
- Total Trees: ${treeCount}
- Scope of Assignment: ${property.scopeOfAssignment || "Not specified"}
- Site Observations (raw field dictation — transform to professional language): ${property.siteObservations || "Not specified"}${
  body.reportType === "construction_encroachment"
    ? `\n- Project Description: ${(property as Record<string, unknown>).projectDescription || "N/A"}\n- Permit Number: ${(property as Record<string, unknown>).permitNumber || "N/A"}\n- Developer/Contractor: ${(property as Record<string, unknown>).developerName || "N/A"}\n- Architect: ${(property as Record<string, unknown>).architectName || "N/A"}`
    : ""
}${(body.reportType === "tree_valuation" || body.reportType === "real_estate_package") ? (() => {
  const treesWithValues = property.trees.filter((t: { valuationAppraisedValue?: number | null }) => t.valuationAppraisedValue != null && t.valuationAppraisedValue > 0);
  const treesWithoutValues = property.trees.filter((t: { valuationAppraisedValue?: number | null; treeNumber: number }) => !t.valuationAppraisedValue || t.valuationAppraisedValue <= 0);
  const partialTotal = treesWithValues.reduce((sum: number, t: { valuationAppraisedValue?: number | null }) => sum + (t.valuationAppraisedValue ?? 0), 0);
  let valuationLine: string;
  if (treesWithValues.length === 0) {
    valuationLine = "- Total Appraised Value: Valuations have not yet been calculated. The Canopy Valuation Summary section should note that formal CTLA valuation is pending completion of field data entry.";
  } else if (treesWithoutValues.length > 0) {
    const pendingNums = treesWithoutValues.map((t: { treeNumber: number }) => `#${t.treeNumber}`).join(", ");
    valuationLine = `- Total Appraised Value (partial): $${partialTotal.toLocaleString()} (${treesWithValues.length} of ${property.trees.length} trees valued; trees ${pendingNums} pending valuation)`;
  } else {
    valuationLine = `- Total Appraised Value: $${partialTotal.toLocaleString()}`;
  }
  return `\nVALUATION CONTEXT:\n- Purpose: ${body.reportType === "real_estate_package" ? "Real Estate Transaction" : (body.valuationPurpose || "Not specified")}\n- Basis Statement: ${body.valuationBasisStatement || "CTLA Trunk Formula Method, 10th Edition"}\n${valuationLine}`;
})() : ""}

TREE ASSESSMENT DATA:
${treeDataBlock}
${propertyAudioBlock}

═══════════════════════════════════════════════════════════
OUTPUT INSTRUCTIONS
═══════════════════════════════════════════════════════════

Generate the complete report in markdown format with these sections:

${sectionsList}

FORMATTING RULES:
- Use ## for section headers (numbered: ## 1. Assignment and Purpose)
- Use ### for per-tree sub-headers within Individual Tree Assessments
- Use **bold** for emphasis on key findings
- Use horizontal rules (---) between major sections
- Incorporate measurements naturally in prose: "The 24-inch DBH Coast Live Oak..." not "DBH: 24 inches"

DATA INTEGRITY RULES:
- When the arborist provided health notes, use them. When health notes say "None provided by arborist," write "No specific health concerns were noted during the Level 2 visual assessment" for trees rated 4-5/5, or note decline consistent with the rating for lower-rated trees. Do NOT fabricate specific diseases, pests, or symptoms that were not reported.
- When the arborist provided structural notes, use them. When structural notes say "None provided by arborist," write "No significant structural defects were observed during the visual assessment" for trees rated 4-5/5. Do NOT fabricate specific structural defects that were not reported.
- When type-specific assessment data is provided (TRAQ ratings, risk factors, retention feasibility, valuation data, TPZ/SRZ values), use those values directly — they are arborist-provided measurements.
- When field audio notes are provided, incorporate them naturally as "Per field observations..." or "The arborist noted during field inspection that..." Do not mention audio recordings.
- When property-level field notes are provided, weave them into Site Observations as "Site conditions noted during the field inspection include..."
- When photos are on file, reference them: "See Photo 1."

SCOPE OF ASSIGNMENT HANDLING:
- Use the arborist's Scope of Assignment as the foundation for Section 1 (Assignment and Purpose / Introduction)
- Expand into a formal scope paragraph including the date of the field inspection, assessment methodology (Level 2 basic assessment per ISA Best Management Practices), applicable municipal ordinance, and assessment objectives
- Do NOT contradict the arborist's stated scope — enhance and formalize it
- If scope is "Not specified," compose Section 1 from the property data, tree count, and report type context

CRITICAL: Do NOT include a "Tree Inventory" section or table — the PDF template generates that separately. Do NOT include an "Arborist Certification Statement" — the certification is handled by the PDF template with the arborist's e-signature. End the report after the final content section.`;

      // Stream the response for real-time progress
      const stream = anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        messages: [
          {
            role: "user",
            content: `Generate the complete ${reportTypeLabel} report for the ${treeCount}-tree property at ${property.address}, ${property.city} based on the structured assessment data provided.\n\nIMPORTANT: Transform ALL raw field dictation into formal professional arborist report language. Never reproduce dictation verbatim. Every sentence must be suitable for municipal submission and legal review.`,
          },
        ],
        system: systemPrompt,
      });

      const encoder = new TextEncoder();

      const readableStream = new ReadableStream({
        async start(controller) {
          let fullText = "";
          let usageInput = 0;
          let usageOutput = 0;

          try {
            for await (const event of stream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                const text = event.delta.text;
                fullText += text;
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text", text })}\n\n`
                  )
                );
              } else if (event.type === "message_delta") {
                usageOutput = (event as unknown as { usage?: { output_tokens?: number } }).usage?.output_tokens ?? 0;
              } else if (event.type === "message_start") {
                usageInput = (event as unknown as { message?: { usage?: { input_tokens?: number } } }).message?.usage?.input_tokens ?? 0;
              }
            }

            // Append standard disclaimer if the arborist has one set
            if (arborist.aiStandardDisclaimer) {
              fullText += `\n\n---\n\n${arborist.aiStandardDisclaimer}`;
            }

            // Save to database after streaming completes
            const report = await prisma.report.create({
              data: {
                propertyId: body.propertyId,
                arboristId,
                reportType: body.reportType,
                aiDraftContent: fullText,
                // Auto-set valuation metadata for real_estate_package
                ...(body.reportType === "real_estate_package" ? {
                  valuationPurpose: "Real Estate Transaction",
                  valuationBasisStatement: "This valuation is prepared for the purpose of real estate disclosure and is based on the CTLA Trunk Formula Method (10th Edition).",
                  valuationTotalValue: property.trees.reduce(
                    (sum: number, t: { valuationAppraisedValue?: number | null }) =>
                      sum + (t.valuationAppraisedValue ?? 0),
                    0
                  ) || null,
                } : {}),
              },
            });

            // Create "AI Draft" version snapshot
            await prisma.reportVersion.create({
              data: {
                reportId: report.id,
                content: fullText,
                label: "AI Draft",
              },
            });

            // Log API usage (fire-and-forget)
            logApiUsage({
              arboristId,
              propertyId: body.propertyId,
              reportId: report.id,
              provider: "anthropic",
              endpoint: "generate-report",
              model: "claude-sonnet-4-20250514",
              inputTokens: usageInput,
              outputTokens: usageOutput,
            });

            logEvent("report_generated", arboristId, {
              reportId: report.id,
              reportType: body.reportType,
              treeCount: property.trees.length,
            });

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "done", reportId: report.id })}\n\n`
              )
            );
          } catch (err) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", error: String(err) })}\n\n`
              )
            );
          }

          controller.close();
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      aiDraftContent = body.reportType === "real_estate_package"
        ? generateMockRealEstateReport(property, property.trees)
        : generateMockReport(property, property.trees, body.reportType);
    }

    // Mock path: non-streaming fallback
    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId,
        reportType: body.reportType,
        aiDraftContent,
        // Auto-set valuation metadata for real_estate_package
        ...(body.reportType === "real_estate_package" ? {
          valuationPurpose: "Real Estate Transaction",
          valuationBasisStatement: "This valuation is prepared for the purpose of real estate disclosure and is based on the CTLA Trunk Formula Method (10th Edition).",
          valuationTotalValue: property.trees.reduce(
            (sum: number, t: { valuationAppraisedValue?: number | null }) =>
              sum + (t.valuationAppraisedValue ?? 0),
            0
          ) || null,
        } : {}),
      },
    });

    // Create "AI Draft" version snapshot
    await prisma.reportVersion.create({
      data: {
        reportId: report.id,
        content: aiDraftContent,
        label: "AI Draft",
      },
    });

    logEvent("report_generated", arboristId, {
      reportId: report.id,
      reportType: body.reportType,
      treeCount: property.trees.length,
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
