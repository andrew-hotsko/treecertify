/**
 * Report templates define per-type boilerplate language, required sections,
 * and AI prompt additions for different arborist report types.
 */

export interface ReportTemplate {
  reportType: string;
  displayName: string;
  boilerplateIntro: string;
  requiredSections: string[];
  aiPromptAdditions: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    reportType: "removal_permit",
    displayName: "Tree Removal Permit Application",
    boilerplateIntro: `This report has been prepared in support of a tree removal permit application pursuant to the applicable municipal tree preservation ordinance. The purpose of this assessment is to evaluate the health, structural condition, and protected status of the subject tree(s) and to provide a professional recommendation regarding the proposed removal.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Protected Status Summary",
      "Removal Justification",
      "Recommendations",
      "Mitigation Requirements",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Focus on removal justification using ISA-recognized criteria: hazard potential, structural failure risk, disease/pest infestation, interference with infrastructure, and declining health beyond remediation. Reference the specific municipal code sections that govern tree removal permits. For each tree proposed for removal, clearly state whether it meets the criteria for removal under the ordinance and what the required findings are. Include replacement tree ratios and in-lieu fee calculations where applicable. When type-specific assessment data is provided (risk rating, risk factors, removal reason, retention feasibility, retention notes, estimated remaining lifespan), use these arborist-provided values directly in the risk assessment and removal justification sections. Present retention feasibility analysis for each tree, particularly when retention is feasible with conditions — describe those conditions clearly.`,
  },
  {
    reportType: "tree_valuation",
    displayName: "Tree Valuation Report",
    boilerplateIntro: `This report provides a professional valuation of the subject tree(s) using the Council of Tree and Landscape Appraisers (CTLA) Trunk Formula Method as described in the Guide for Plant Appraisal, 10th Edition. The valuation considers species rating, condition, location, and size to determine the appraised value of each tree.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Valuation Methodology",
      "Tree Inventory",
      "Individual Tree Valuations",
      "Aggregate Property Value",
      "Recommendations",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Use the CTLA Trunk Formula Method for valuation. When type-specific valuation data is provided (trunk area, species rating %, condition rating %, location rating %, cost per sq inch, appraised value), use these pre-calculated values directly — do not recalculate them. Present the per-tree valuation breakdown showing all factors. Include an aggregate total value for all trees. Use realistic species ratings based on the Western Chapter ISA species classification guide. Format currency values clearly.`,
  },
  {
    reportType: "construction_encroachment",
    displayName: "Construction Impact Report",
    boilerplateIntro: `This report has been prepared to evaluate the potential impact of proposed construction activities on existing trees at the subject property. The assessment identifies trees within the construction zone of influence, defines Tree Protection Zones (TPZ) and Critical Root Zones (CRZ), and provides recommendations for tree preservation during construction.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Tree Protection Zone Analysis",
      "Construction Impact Assessment",
      "Tree Protection Plan",
      "Monitoring Schedule",
      "Mitigation Requirements",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `When type-specific assessment data is provided (TPZ radius, SRZ radius, manual TPZ/SRZ overrides, encroachment description, encroachment %, impact assessment, protection measures list, monitoring frequency), use these pre-calculated and arborist-provided values directly — do not recalculate TPZ or SRZ. If manual TPZ/SRZ overrides are provided, use those values instead of auto-calculated ones and note the override. Present the TPZ and SRZ values in the Tree Protection Zone Analysis section. When project information is included in the property data (project description, permit number, developer, architect), reference these in the Scope of Assignment section. When a protection measures list is provided, incorporate each measure into the Tree Protection Plan with specific implementation details. Include the monitoring frequency in the Monitoring Schedule section. Provide a detailed Tree Protection Plan with specific measures: tree protection fencing specifications (6-foot chain link), root pruning protocols, grade change restrictions, and pre-construction treatments. Reference ANSI A300 Part 5 (Management of Trees During Site Planning, Site Development, and Construction) standards.`,
  },
  {
    reportType: "health_assessment",
    displayName: "Tree Health Assessment",
    boilerplateIntro: `This report presents a comprehensive health and risk assessment of the subject tree(s) conducted in accordance with ISA Best Management Practices for Tree Risk Assessment (TRAQ methodology). The assessment evaluates each tree's health, structural condition, site factors, and overall risk rating to inform management decisions.`,
    requiredSections: [
      "Scope of Assignment",
      "Assessment Methodology",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Risk Assessment Summary",
      "Prognosis and Life Expectancy",
      "Recommendations",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Use ISA TRAQ (Tree Risk Assessment Qualification) methodology and terminology throughout. For each tree, use the arborist-provided TRAQ values when available: (1) Likelihood of Failure (improbable, possible, probable, imminent), (2) Likelihood of Impacting a Target (very low, low, medium, high), (3) Consequences of Failure (negligible, minor, significant, severe), (4) Overall Risk Rating (low, moderate, high, extreme). When a target description is provided, incorporate it into the risk assessment. When maintenance items (multi-select list) are provided, list each recommended maintenance action with specific implementation guidance. Include the arborist-provided priority and timeline for maintenance work. Include detailed observations on crown health indicators, trunk and root flare condition, pest/pathogen signs, and structural defects. Provide a prognosis for each tree including estimated remaining useful life. When type-specific assessment data is provided (TRAQ ratings, target description, maintenance items, priority, timeline, estimated cost), incorporate these directly into each tree's assessment and recommendations sections.`,
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
