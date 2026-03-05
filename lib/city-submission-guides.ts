/**
 * City-specific submission guides for tree permit applications.
 *
 * Static data — no database queries. Used by the share page to show
 * homeowners exactly what to do with their arborist report.
 *
 * Covers the 5 Peninsula cities TreeCertify supports:
 *   Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CitySubmissionGuide {
  department: string;
  submissionMethod: string;
  url: string | null;
  requiredDocuments: string[];
  typicalTimeline: string;
  fees: string;
  conditions: string;
  tips: string;
}

// ---------------------------------------------------------------------------
// City Guides — Removal Permits
// ---------------------------------------------------------------------------

export const CITY_SUBMISSION_GUIDES: Record<string, CitySubmissionGuide> = {
  "Palo Alto": {
    department: "Planning & Development Services — Urban Forestry",
    submissionMethod:
      "Online through the City of Palo Alto Development Services portal",
    url: "https://www.cityofpaloalto.org/Departments/Planning-Development-Services",
    requiredDocuments: [
      "Completed Tree Removal Permit Application",
      "This certified arborist report (attached or uploaded)",
      "Site plan showing tree location(s)",
      "Photos of the tree(s)",
    ],
    typicalTimeline:
      "15–30 business days for staff review. Heritage trees may require a public hearing, which extends the timeline to 60–90 days.",
    fees: "Application fee varies — check with the Planning Department for current fee schedule.",
    conditions:
      "If approved, the city typically requires replanting at a 3:1 ratio (3 new trees per 1 removed) or payment of an in-lieu fee.",
    tips: "Submit all documents together to avoid delays. If your tree is heritage-designated, the process will include a public hearing — your arborist's report is the key document the hearing body reviews.",
  },
  "Menlo Park": {
    department: "Community Development Department",
    submissionMethod:
      "In person or by mail to the Community Development Department",
    url: "https://www.menlopark.gov/Government/Departments/Community-Development",
    requiredDocuments: [
      "Heritage Tree Removal Application",
      "This certified arborist report",
      "Photos of the tree(s)",
    ],
    typicalTimeline: "Staff review typically takes 10–20 business days.",
    fees: "Check with Community Development for current application fees.",
    conditions:
      "Approved removals typically require 2:1 replanting — 2 new trees per 1 removed.",
    tips: "Menlo Park staff review is generally faster than cities requiring public hearings.",
  },
  Atherton: {
    department: "Building Department / Town Arborist",
    submissionMethod:
      "Submit to the Building Department. The Town Arborist reviews all applications.",
    url: "https://www.ci.atherton.ca.us",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report",
      "Site plan with tree locations",
      "Photos",
    ],
    typicalTimeline:
      "Heritage oaks require City Council approval — expect 30–60 days. Other protected trees are reviewed by the Town Arborist within 15–30 days.",
    fees: "In-lieu fees range from $500 to $2,500 depending on tree size and species.",
    conditions:
      "Oak removals require Council vote. Other species reviewed by Town Arborist. In-lieu fees are common.",
    tips: "Atherton is particularly protective of oaks. If your tree is a Coast Live Oak, expect additional scrutiny and potentially a Council hearing.",
  },
  Woodside: {
    department: "Planning Department",
    submissionMethod: "Submit to the Planning Department",
    url: "https://www.woodsidetown.org",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report",
      "Site plan",
    ],
    typicalTimeline:
      "15–20 business days for standard review.",
    fees: "Check with Planning for current fees.",
    conditions:
      "1:1 replanting ratio — one new tree per one removed.",
    tips: "Woodside has a lower replanting ratio than neighboring cities, which simplifies the mitigation process.",
  },
  "Portola Valley": {
    department: "Planning Department",
    submissionMethod: "Submit to the Planning Department",
    url: "https://www.portolavalley.net",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report",
      "Site plan with tree locations",
    ],
    typicalTimeline: "15–30 business days.",
    fees: "Check with Planning for current fees.",
    conditions:
      "Replanting typically required for protected tree removals.",
    tips: "Contact the Planning Department to confirm current application requirements before submitting.",
  },
};

// ---------------------------------------------------------------------------
// Lookup helper (case-insensitive)
// ---------------------------------------------------------------------------

export function getCityGuide(city: string): CitySubmissionGuide | null {
  if (!city) return null;
  const normalized = city
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return CITY_SUBMISSION_GUIDES[normalized] ?? null;
}

// ---------------------------------------------------------------------------
// Generic next-steps text for non-removal report types
// ---------------------------------------------------------------------------

export function getNextStepsText(
  reportType: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _city: string
): { title: string; description: string } | null {
  switch (reportType) {
    case "health_assessment":
      return {
        title: "Schedule Recommended Maintenance",
        description:
          "Your arborist has provided maintenance recommendations for your trees. Contact them to schedule pruning, treatment, or follow-up assessments as recommended in the report.",
      };
    case "tree_valuation":
      return {
        title: "Submit Your Valuation Report",
        description:
          "This appraisal report documents the assessed value of your trees using the ISA Trunk Formula Method. Submit it to your insurance provider, attorney, or other party as needed for your claim or proceeding.",
      };
    case "construction_encroachment":
      return {
        title: "Share the Tree Protection Plan",
        description:
          "Share this report with your contractor and submit it to the city before construction begins. The Tree Protection Plan includes specific measures your contractor must follow to protect trees during construction.",
      };
    default:
      return null;
  }
}
