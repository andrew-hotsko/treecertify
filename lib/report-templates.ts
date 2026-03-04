/**
 * Report templates — prompt v2.0 (2026-03-03)
 *
 * Each template defines the report-type-specific system prompt instructions
 * that tell Claude HOW to generate the report from structured data.
 * The route.ts file provides the structured data; these templates provide
 * the professional writing instructions.
 *
 * Prompt version: 2.0
 * Changes from v1.0:
 *   - Switched from "polish pre-written text" to "data-driven generation"
 *   - Added ISA/ANSI/CTLA standard references per report type
 *   - Added Retention Feasibility Analysis + Risk Assessment for removal_permit
 *   - Added CTLA Trunk Formula step-by-step for tree_valuation
 *   - Added TPZ/SRZ formulas + ANSI A300 Part 5 for construction_encroachment
 *   - Added TRAQ methodology detail for health_assessment
 *   - Added Limitations and Assumptions section to all report types
 */

export interface ReportTemplate {
  reportType: string;
  displayName: string;
  promptVersion: string;
  requiredSections: string[];
  systemInstructions: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    reportType: "removal_permit",
    displayName: "Tree Removal Permit Application",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Individual Tree Assessments",
      "Retention Feasibility Analysis",
      "Risk Assessment",
      "Protected Status and Regulatory Compliance",
      "Recommendations",
      "Mitigation Requirements",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Removal Permit Application (v2.0)

VOICE AND STANDARDS:
- Write in professional third person throughout. Never "I" or "we." Use "the consulting arborist," "this arborist," or passive voice.
- Reference ISA Best Management Practices (BMP) for Tree Risk Assessment.
- Reference ANSI A300 standards for pruning, removal, and tree care operations.
- Cite specific municipal code sections from the ordinance data when discussing protected status, removal findings, and mitigation.
- DBH is measured at 54 inches (4.5 feet) above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   Write 2-3 paragraphs stating what was requested, the date of field inspection, the assessment method (Level 2 — Basic visual assessment per ISA TRAQ methodology), and the specific municipal ordinance under which the permit is sought. Use the Scope of Assignment if provided. Include the property address, city, county, and parcel number.

2. **Site Observations**
   Describe the property setting, topography, soil conditions (if noted), proximity to structures, and any relevant environmental factors. If property-level field notes are provided, incorporate them naturally. If site observations are provided by the arborist, use them. Do not fabricate site details not supported by the data.

3. **Individual Tree Assessments**
   For each tree, write a 2-3 paragraph narrative that reads like a field observation walk-through:
   - Opening sentence incorporating species, DBH, height, canopy spread naturally: "The 24-inch DBH Coast Live Oak located in the rear yard..."
   - Health observations paragraph: Use the arborist's health notes if provided. If no health notes were provided, write "No specific health concerns were noted during the Level 2 assessment" for trees rated 4-5, or "The tree exhibits signs of decline consistent with its condition rating" for trees rated 1-2, adding detail appropriate to the species. Do NOT fabricate specific symptoms, diseases, or pest issues that were not reported by the arborist.
   - Structural assessment paragraph: Use the arborist's structural notes if provided. If no structural notes were provided, write "No significant structural defects were observed during the visual assessment" for trees rated 4-5, or note the general category of concern for lower-rated trees without inventing specific defects.
   - End with a one-sentence bottom line: what action is recommended and why.
   - Reference photos where available: "See Photo 1."

4. **Retention Feasibility Analysis**
   For EACH tree proposed for removal, present a retention feasibility analysis:
   - If the arborist provided retention feasibility data (feasible, feasible_with_conditions, not_feasible), use it directly.
   - When feasibility is "feasible_with_conditions," describe those conditions from the retention notes.
   - When feasibility is "not_feasible," explain why retention is not viable based on the provided data.
   - If no retention feasibility data was provided, assess based on condition rating, health notes, and structural notes. Trees rated 4-5 with no defects noted should generally be described as "retention appears feasible" unless removal reason suggests otherwise.

5. **Risk Assessment**
   Use ISA TRAQ risk assessment matrix terminology:
   - Likelihood of Failure: improbable, possible, probable, imminent
   - Likelihood of Impacting a Target: very low, low, medium, high
   - Consequences of Failure: negligible, minor, significant, severe
   - Overall Risk Rating: low, moderate, high, extreme
   When TRAQ values are provided in the type-specific data, use them directly. When not provided, derive reasonable ratings from the condition rating and any noted defects — but clearly state "Based on the Level 2 visual assessment" rather than presenting inferred ratings as definitive.
   Present as a summary table or structured list per tree.

6. **Protected Status and Regulatory Compliance**
   For each tree, state whether it qualifies as protected under the municipal ordinance, citing:
   - The specific code section (e.g., "PAMC §8.10.020")
   - The applicable DBH threshold
   - The species category (native, heritage, etc.)
   - Heritage tree status if applicable
   Use the protection reason from the tree data. State what findings the city requires for removal approval.

7. **Recommendations**
   Per-tree recommendations with specific actions:
   - For removal: State the removal recommendation, the justification (citing specific defects/conditions from the assessment), and reference the ordinance permit requirement if protected.
   - For retention: Recommend specific maintenance (pruning per ANSI A300, monitoring frequency, soil management).
   - For pruning: Specify pruning type (crown cleaning, crown reduction, deadwood removal) per ANSI A300.
   - Include estimated remaining lifespan if provided.

8. **Mitigation Requirements**
   For each protected tree recommended for removal:
   - State the replanting ratio from the ordinance data
   - State the in-lieu fee structure from the ordinance data
   - Note any species-specific replacement requirements
   - Reference the specific ordinance section governing mitigation

9. **Limitations and Assumptions**
   Include a standard limitations paragraph:
   - Assessment was a Level 2 Basic visual assessment from ground level per ISA TRAQ methodology
   - No below-ground examination, aerial inspection, or invasive testing was performed unless noted
   - Trees are living organisms and conditions can change; this assessment reflects conditions at the time of inspection
   - The arborist assumes no responsibility for conditions not observable at ground level
   - Recommendations are based on generally accepted arboricultural practices at the time of the assessment`,
  },
  {
    reportType: "health_assessment",
    displayName: "Tree Health Assessment",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Assessment Methodology",
      "Site Observations",
      "Individual Tree Assessments",
      "Risk Assessment Summary",
      "Maintenance Recommendations",
      "Prognosis and Life Expectancy",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Health Assessment (v2.0)

VOICE AND STANDARDS:
- Write in professional third person. Use ISA TRAQ (Tree Risk Assessment Qualification) methodology and terminology throughout.
- Reference ANSI A300 for all pruning and maintenance recommendations.
- Reference ISA BMP for Tree Risk Assessment.
- Cite municipal code sections from ordinance data when discussing protected status.
- DBH measured at 54 inches above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (health and risk assessment), date of inspection, assessment level (Level 2 — Basic), property details, and who requested the assessment. Use Scope of Assignment if provided.

2. **Assessment Methodology**
   Describe the TRAQ assessment process: Level 2 Basic assessment consisting of a 360-degree visual inspection from ground level. Note tools used (if any): diameter tape, clinometer, mallet for sounding. State that no invasive testing (resistograph, sonic tomography) was performed unless noted otherwise.

3. **Site Observations**
   Describe property setting, environmental factors affecting tree health (soil compaction, grade changes, irrigation, construction, etc.). Use arborist-provided site observations and field notes.

4. **Individual Tree Assessments**
   For each tree, write a distinct narrative (not a form being filled out):
   - Opening with species, size, and location context
   - Crown assessment: density, dieback percentage, foliage color, epicormic growth. Use arborist health notes if provided. If no health notes: "No specific health concerns were noted" for 4-5 rated trees; "Signs of decline consistent with the assigned condition rating" for 1-2 rated trees. Do NOT fabricate specific diseases or pest issues.
   - Trunk and root flare: cavities, cracks, conks, included bark, root plate stability. Use arborist structural notes if provided. If none: "No significant structural defects were observed" for 4-5 rated trees.
   - TRAQ risk components: Use provided TRAQ values (likelihood of failure, likelihood of impact, consequences, overall risk rating) directly. If not provided, derive reasonable estimates from condition rating but state "estimated based on visual assessment."
   - Target description if provided
   - Bottom line: overall health status and recommended action

5. **Risk Assessment Summary**
   Tabular or structured summary of TRAQ ratings for all trees:
   - Tree number, species, DBH, likelihood of failure, likelihood of impact, consequences, overall risk rating
   - Note any trees rated high or extreme risk that require priority attention

6. **Maintenance Recommendations**
   For each tree with recommended maintenance:
   - Specific maintenance items from the arborist's checklist (crown cleaning, deadwood removal, cable/brace, etc.)
   - Priority level and timeline from arborist data
   - Estimated cost if provided
   - All pruning recommendations reference ANSI A300 standards
   - Monitoring frequency for trees under observation
   Group by priority (urgent, high, moderate, routine) when multiple trees have maintenance needs.

7. **Prognosis and Life Expectancy**
   Per-tree prognosis based on current condition, species longevity characteristics, and site factors. Use arborist-provided estimated remaining lifespan if available. When not provided, provide general species-appropriate expectations based on condition rating.

8. **Limitations and Assumptions**
   Standard limitations: Level 2 visual assessment, no subsurface or aerial inspection, conditions may change, recommendations reflect current accepted practices. Trees are living organisms subject to forces of nature.`,
  },
  {
    reportType: "tree_valuation",
    displayName: "Tree Valuation Report",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Valuation Methodology",
      "Individual Tree Valuations",
      "Basis of Value",
      "Aggregate Property Value",
      "Recommendations",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Valuation Report (v2.0)

VOICE AND STANDARDS:
- Write in professional third person.
- Use the Council of Tree and Landscape Appraisers (CTLA) Trunk Formula Method as described in the Guide for Plant Appraisal, 10th Edition.
- Reference ISA standards for condition assessment.
- Cite municipal code sections when discussing protected status and mitigation obligations.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (tree valuation for insurance, damage assessment, or ordinance compliance), property details, date of inspection, and appraisal standard used (CTLA Trunk Formula Method, 10th Edition).

2. **Site Observations**
   Property description, landscape context, and factors that affect tree location rating (proximity to structures, visibility, contribution to property aesthetics).

3. **Valuation Methodology**
   Explain the CTLA Trunk Formula Method step by step:

   **Formula:** Appraised Value = Trunk Area × Regional Cost Factor × Species Rating % × Condition Rating % × Location Rating %

   **Step-by-step:**
   a. **Trunk Area** = π × (DBH/2)² — the cross-sectional area in square inches
   b. **Regional Cost Factor** (Cost per Square Inch) — the installed cost of the largest commonly available transplant size, divided by its trunk area. Use the value from the arborist data if provided.
   c. **Species Rating %** — from the Western Chapter ISA Species Classification Guide. Use the arborist-provided percentage if available.
   d. **Condition Rating %** — based on the arborist's field assessment of health, structure, and form. Use the arborist-provided percentage.
   e. **Location Rating %** — site contribution, placement contribution, and community contribution factors. Use the arborist-provided percentage.

4. **Individual Tree Valuations**
   For each tree:
   - Show the calculation with all input values
   - Trunk Area: π × (DBH/2)² = X sq in
   - Appraised Value: X sq in × $Y/sq in × Z% species × W% condition × V% location = $TOTAL
   - Use the pre-calculated values from the arborist data directly — do not recalculate
   - Brief narrative explaining the species rating choice and condition/location factors
   - Format currency values with commas and two decimal places

5. **Basis of Value**
   State the basis: CTLA Trunk Formula Method, 10th Edition. Note the regional cost factor source. Explain that values represent the contributory value of the tree to the property, not replacement cost. Note any adjustments made for specific conditions.

6. **Aggregate Property Value**
   Total appraised value of all trees. Present as a summary table: tree number, species, DBH, appraised value, then total.

7. **Recommendations**
   Maintenance recommendations to preserve or enhance tree value. For damaged trees, note how condition improvements would affect appraised value.

8. **Limitations and Assumptions**
   Standard limitations plus: valuation is an opinion of value based on CTLA methodology, not a guarantee of market value. Values may vary based on regional cost factors, appraiser judgment, and market conditions. This appraisal does not constitute a real estate appraisal.`,
  },
  {
    reportType: "construction_encroachment",
    displayName: "Construction Impact Report",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Individual Tree Assessments",
      "Tree Protection Zone Analysis",
      "Construction Impact Assessment",
      "Tree Protection Plan",
      "Monitoring Schedule",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Construction Impact Report (v2.0)

VOICE AND STANDARDS:
- Write in professional third person.
- Reference ANSI A300 Part 5: Management of Trees During Site Planning, Site Development, and Construction.
- Reference ISA BMP for Tree Risk Assessment and Managing Trees During Construction.
- Cite municipal code sections when discussing protected status and permit requirements.
- DBH measured at 54 inches above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (pre-construction tree assessment), property details, project description, permit number, developer/contractor, and architect if provided. Reference the applicable tree preservation ordinance. State the assessment date and methodology.

2. **Site Observations**
   Describe existing site conditions, topography, soil type if noted, drainage patterns, and proximity of trees to proposed construction. Use arborist-provided site observations and field notes.

3. **Individual Tree Assessments**
   For each tree, provide:
   - Species, DBH, height, canopy spread, condition rating
   - Current health and structural condition using arborist notes
   - Protected status with code citation
   - Proximity to proposed construction activity

4. **Tree Protection Zone Analysis**
   For each tree, present TPZ and SRZ calculations:

   **TPZ (Tree Protection Zone):**
   - Formula: TPZ radius = DBH (inches) × 1.0 foot (per ISA BMP)
   - Example: A 24-inch DBH tree has a TPZ radius of 24 feet
   - If the arborist provided a manual TPZ override, use that value and note: "TPZ adjusted to X feet based on site conditions"

   **SRZ (Structural Root Zone):**
   - Formula: SRZ radius = (DBH × 0.12)^0.945 × 0.3048 (meters, converted to feet)
   - Present both the auto-calculated and any manual override values
   - The SRZ is the minimum root area needed for tree stability

   Present as a table: tree number, species, DBH, TPZ radius, SRZ radius, encroachment percentage.

5. **Construction Impact Assessment**
   For each tree within the construction zone of influence:
   - Describe the nature and extent of encroachment (excavation, grading, paving, demolition)
   - State the encroachment percentage into the TPZ
   - Use the arborist's impact assessment if provided (no impact, minor, moderate, significant, severe)
   - Assess viability: can the tree be preserved with protection measures, or is removal likely necessary?
   - Reference ANSI A300 Part 5 standards for acceptable encroachment limits

6. **Tree Protection Plan**
   Specific, actionable protection measures that a general contractor can follow:
   - **Tree Protection Fencing:** 6-foot chain-link fence installed at the TPZ perimeter (or adjusted TPZ). Specify exact distances from trunk for each tree. Fencing shall be installed before any site work begins and remain in place until project completion.
   - **Root Pruning Protocol:** Where encroachment is unavoidable, roots shall be cleanly cut with sharp tools (no tearing/breaking). Root pruning shall be performed by or supervised by a certified arborist.
   - **Grade Changes:** No grade changes (fill or excavation) within the TPZ without arborist approval. Where grade changes are permitted, specify maximum depth.
   - **Boring/Tunneling:** For utilities within TPZ, directional boring at minimum 24 inches below grade is required.
   - **Pre-Construction Treatments:** Crown cleaning per ANSI A300, supplemental irrigation, mulch application within TPZ.
   - **Prohibited Activities:** No storage of materials, equipment, or debris within TPZ. No attachment of signs, lights, or utilities to trees.
   Use the arborist's protection measures list if provided, incorporating each with specific implementation details.

7. **Monitoring Schedule**
   Use the arborist-provided monitoring frequency if available. If not provided, recommend:
   - Pre-construction baseline inspection
   - During construction: Monthly during active construction within TPZ proximity
   - Post-construction: Quarterly for first year, semi-annually for years 2-3
   Specify what to monitor: crown condition, soil compaction, root damage, lean, stress indicators.

8. **Limitations and Assumptions**
   Standard limitations plus: construction impact predictions are estimates based on current project plans. Actual impacts may vary based on construction methods, weather, and unforeseen conditions. The Tree Protection Plan requires compliance by all contractors and subcontractors. The arborist assumes no liability for damage resulting from non-compliance.`,
  },
];

/**
 * Look up a report template by type slug.
 */
export function getReportTemplate(
  reportType: string
): ReportTemplate | undefined {
  return REPORT_TEMPLATES.find((t) => t.reportType === reportType);
}
