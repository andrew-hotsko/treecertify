/**
 * City-specific submission contacts for tree permit applications.
 *
 * Static data — no database queries, no API calls from share page.
 * Used by the share page to show homeowners exactly what to do with
 * their arborist report, with tap-to-call/email on mobile.
 *
 * Covers the 5 Peninsula cities TreeCertify supports:
 *   Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CityContact {
  department: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  portalUrl: string | null;
  websiteUrl: string;
  submissionMethod: string;
  requiredDocuments: string[];
  typicalTimeline: string;
  applicationFee: string;
  mitigationSummary: string;
  tips: string[];
}

// ---------------------------------------------------------------------------
// City Contact Data — Removal Permits
// ---------------------------------------------------------------------------

const REMOVAL_CONTACTS: Record<string, CityContact> = {
  "Palo Alto": {
    department: "Planning & Development Services — Urban Forestry",
    phone: "(650) 329-2421",
    email: "planning@cityofpaloalto.org",
    address: "250 Hamilton Ave, Palo Alto, CA 94301",
    hours: "Monday–Friday, 8:00 AM – 12:00 PM, 1:00 – 4:00 PM",
    portalUrl: "https://www.cityofpaloalto.org/Departments/Planning-Development-Services",
    websiteUrl: "https://www.cityofpaloalto.org/Departments/Planning-Development-Services",
    submissionMethod:
      "Online through the City of Palo Alto Development Services portal, or in person at the Planning counter",
    requiredDocuments: [
      "Completed Tree Removal Permit Application",
      "This certified arborist report (attached or uploaded)",
      "Site plan showing tree location(s)",
      "Photos of the tree(s)",
    ],
    typicalTimeline:
      "15–30 business days for staff review. Heritage trees may require a public hearing, extending the timeline to 60–90 days.",
    applicationFee:
      "Application fee varies — check with the Planning Department for current fee schedule.",
    mitigationSummary:
      "If approved, the city typically requires replanting at a 3:1 ratio (3 new trees per 1 removed) or payment of an in-lieu fee.",
    tips: [
      "Submit all documents together to avoid delays.",
      "Heritage-designated trees require a public hearing — your arborist report is the key document reviewed.",
      "Call the Urban Forestry line to confirm your tree species and any special requirements before submitting.",
      "If your project involves construction, you may also need a building permit — check with Planning.",
    ],
  },
  "Menlo Park": {
    department: "Community Development Department",
    phone: "(650) 330-6702",
    email: "planning@menlopark.gov",
    address: "701 Laurel St, Menlo Park, CA 94025",
    hours: "Monday–Thursday, 7:30 AM – 5:30 PM; Friday, 8:00 AM – 5:00 PM (alternating Fridays closed)",
    portalUrl: "https://www.menlopark.gov/Government/Departments/Community-Development",
    websiteUrl: "https://www.menlopark.gov/Government/Departments/Community-Development",
    submissionMethod:
      "In person or by mail to the Community Development Department",
    requiredDocuments: [
      "Heritage Tree Removal Application",
      "This certified arborist report",
      "Photos of the tree(s)",
    ],
    typicalTimeline: "Staff review typically takes 10–20 business days.",
    applicationFee:
      "Check with Community Development for current application fees.",
    mitigationSummary:
      "Approved removals typically require 2:1 replanting — 2 new trees per 1 removed.",
    tips: [
      "Menlo Park staff review is generally faster than cities requiring public hearings.",
      "Call ahead to confirm current application requirements — forms are updated periodically.",
      "The Heritage Tree ordinance covers trees with a trunk diameter of 48 inches or more (any species).",
    ],
  },
  Atherton: {
    department: "Building Department / Town Arborist",
    phone: "(650) 752-0530",
    email: "building@ci.atherton.ca.us",
    address: "91 Ashfield Rd, Atherton, CA 94027",
    hours: "Monday–Friday, 8:00 AM – 5:00 PM",
    portalUrl: null,
    websiteUrl: "https://www.ci.atherton.ca.us",
    submissionMethod:
      "Submit to the Building Department. The Town Arborist reviews all applications.",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report",
      "Site plan with tree locations",
      "Photos of the tree(s)",
    ],
    typicalTimeline:
      "Heritage oaks require City Council approval — expect 30–60 days. Other protected trees are reviewed by the Town Arborist within 15–30 days.",
    applicationFee:
      "In-lieu fees range from $500 to $2,500 depending on tree size and species.",
    mitigationSummary:
      "Oak removals require a Council vote. Other species are reviewed by the Town Arborist. In-lieu fees or replanting are commonly required.",
    tips: [
      "Atherton is particularly protective of oaks — expect additional scrutiny for Coast Live Oaks.",
      "The Town Arborist may schedule a site visit before making a recommendation.",
      "Contact the Building Department for current forms — they are not always available online.",
      "If your tree removal is related to construction, coordinate with the building permit process.",
    ],
  },
  Woodside: {
    department: "Planning Department",
    phone: "(650) 851-6790",
    email: "planning@woodsidetown.org",
    address: "2955 Woodside Rd, Woodside, CA 94062",
    hours: "Monday–Friday, 8:00 AM – 12:00 PM, 1:00 – 5:00 PM",
    portalUrl: null,
    websiteUrl: "https://www.woodsidetown.org",
    submissionMethod: "Submit to the Planning Department in person or by mail.",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report",
      "Site plan showing tree location(s)",
    ],
    typicalTimeline: "15–20 business days for standard review.",
    applicationFee: "Check with Planning for current fees.",
    mitigationSummary:
      "1:1 replanting ratio — one new tree per one removed. Lower ratio than neighboring cities.",
    tips: [
      "Woodside has a lower replanting ratio than neighboring cities, simplifying mitigation.",
      "The town has species-specific trunk diameter thresholds — your arborist report documents whether your tree qualifies.",
      "Call the Planning Department to confirm submission requirements before visiting.",
    ],
  },
  "Portola Valley": {
    department: "Planning Department",
    phone: "(650) 851-1700",
    email: "planning@portolavalley.net",
    address: "765 Portola Rd, Portola Valley, CA 94028",
    hours: "Monday–Friday, 8:00 AM – 12:00 PM, 1:00 – 5:00 PM",
    portalUrl: null,
    websiteUrl: "https://www.portolavalley.net",
    submissionMethod: "Submit to the Planning Department in person or by mail.",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report",
      "Site plan with tree locations",
    ],
    typicalTimeline: "15–30 business days.",
    applicationFee: "Check with Planning for current fees.",
    mitigationSummary:
      "Replanting typically required for protected tree removals. Specific ratios vary by species and circumstance.",
    tips: [
      "Contact the Planning Department to confirm current application requirements before submitting.",
      "Portola Valley's tree ordinance covers significant native trees — your arborist report documents protection status.",
      "If your property is in a fire-prone area, mention any defensible space considerations in your application.",
    ],
  },
};

// ---------------------------------------------------------------------------
// Generic next-steps text for non-removal report types
// ---------------------------------------------------------------------------

const NON_REMOVAL_NEXT_STEPS: Record<
  string,
  { title: string; description: string }
> = {
  health_assessment: {
    title: "Schedule Recommended Maintenance",
    description:
      "Your arborist has provided maintenance recommendations for your trees. Contact them to schedule pruning, treatment, or follow-up assessments as recommended in the report.",
  },
  tree_valuation: {
    title: "Submit Your Valuation Report",
    description:
      "This appraisal report documents the assessed value of your trees using the ISA Trunk Formula Method. Submit it to your insurance provider, attorney, or other party as needed for your claim or proceeding.",
  },
  construction_encroachment: {
    title: "Share the Tree Protection Plan",
    description:
      "Share this report with your contractor and submit it to the city before construction begins. The Tree Protection Plan includes specific measures your contractor must follow to protect trees during construction.",
  },
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get city contact info. For removal_permit reports, returns the full
 * department contact data. For other report types, returns null (use
 * getNextStepsText instead).
 */
export function getCityContact(
  city: string,
  reportType?: string
): CityContact | null {
  if (!city) return null;

  // Only removal permits have city-specific submission processes
  if (reportType && reportType !== "removal_permit") return null;

  const normalized = city
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return REMOVAL_CONTACTS[normalized] ?? null;
}

/**
 * Get generic next-steps guidance for non-removal report types.
 */
export function getNextStepsText(
  reportType: string
): { title: string; description: string } | null {
  return NON_REMOVAL_NEXT_STEPS[reportType] ?? null;
}
