/**
 * City-specific submission contacts for tree permit applications.
 *
 * Static data — no database queries, no API calls from share page.
 * Used by the share page to show homeowners exactly what to do with
 * their arborist report, with tap-to-call/email on mobile.
 *
 * Covers 14 Peninsula cities/jurisdictions:
 *   Original 5: Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley
 *   Expansion 9: Redwood City, San Mateo, Los Altos, Los Altos Hills,
 *     Mountain View, Hillsborough, San Carlos, Burlingame, San Mateo County
 */

// ---------------------------------------------------------------------------
// Peninsula expansion cities added: 2026-03-06 — NEEDS VERIFICATION
// All phone numbers and office hours are approximate and should be confirmed
// by calling each department before general availability.
// ---------------------------------------------------------------------------

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

  // -----------------------------------------------------------------------
  // Priority 1 — High tree permit volume
  // -----------------------------------------------------------------------

  "Redwood City": {
    department: "Community Development Department — Planning Division",
    phone: "(650) 780-7234", // VERIFY
    email: null,
    address: "1017 Middlefield Road, Redwood City, CA 94063",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: "https://www.redwoodcity.org/departments/community-development-department/planning-housing",
    websiteUrl: "https://www.redwoodcity.org/departments/community-development-department/planning-housing",
    submissionMethod:
      "Redwood City requires a Tree Removal Permit for the removal of any Significant Tree (48\"+ circumference ≈ 15.3\" DBH) or Heritage Tree (72\"+ circumference ≈ 22.9\" DBH). Submit online through the Community Development portal.",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location(s) and proximity to structures",
      "Photographs of the tree(s)",
      "Replacement planting plan (if applicable)",
    ],
    typicalTimeline:
      "Significant trees: 10–15 business days for administrative review. Heritage trees (72\"+ circumference): may require Planning Commission hearing, extending to 30–60 days.",
    applicationFee: "Contact Community Development for current fee schedule.",
    mitigationSummary:
      "Replacement planting may be required as a condition of approval. The city may specify species, size, and location of replacement trees.",
    tips: [
      "Redwood City measures trunk circumference at 24 inches above grade, not DBH at 4.5 feet — make sure to note both measurements in your report.",
      "The 48-inch circumference threshold (≈15.3\" DBH) is relatively low — many trees that wouldn't be protected in neighboring cities will need a permit here.",
      "Heritage tree designation (72\"+ circumference, ≈22.9\" DBH) triggers Planning Commission review. Allow extra time for these applications.",
    ],
  },

  "San Mateo": {
    department: "Parks and Recreation Department — Urban Forestry",
    phone: "(650) 522-7420", // VERIFY
    email: null,
    address: "330 West 20th Avenue, San Mateo, CA 94403",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: null,
    websiteUrl: "https://www.cityofsanmateo.org/3074/Tree-Removal",
    submissionMethod:
      "The City of San Mateo regulates Heritage Trees, defined as any tree with a trunk diameter of 16 inches or more at 4.5 feet above grade. Submit application in person to the Parks and Recreation Department.",
    requiredDocuments: [
      "Heritage Tree Removal Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location",
      "Photographs of the tree",
      "Justification for removal",
    ],
    typicalTimeline:
      "15–20 business days for administrative review. Designated Heritage Trees may require Parks Commission hearing.",
    applicationFee: "Contact Parks and Recreation for current fee schedule.",
    mitigationSummary:
      "Replacement planting is typically required. The Parks Department specifies species, size, and maintenance requirements.",
    tips: [
      "San Mateo's threshold is 16 inches DBH (50.25 inch circumference at 4.5 feet) — this is a straightforward DBH measurement, unlike Redwood City's circumference-at-24\" method.",
      "Significant pruning (more than one-third of canopy) also requires a Heritage Tree permit — mention this to your client if pruning is recommended.",
      "If the tree is within the dripline of a Heritage Tree and you're doing construction, you'll need a tree protection plan even if you're not removing the tree.",
    ],
  },

  "Los Altos": {
    department: "Community Development Department",
    phone: "(650) 947-2750", // VERIFY
    email: null,
    address: "1 North San Antonio Road, Los Altos, CA 94022",
    hours: "Monday–Thursday 8:00 AM–12:00 PM, 1:00 PM–4:00 PM", // VERIFY — note non-standard hours
    portalUrl: null,
    websiteUrl: "https://www.losaltosca.gov/communitydevelopment/page/tree-removal-permits",
    submissionMethod:
      "Los Altos requires a permit for removal of any Protected Tree, defined as any tree with a trunk diameter of 12 inches or more at 4.5 feet above grade. Submit application in person to Community Development.",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location(s) and property boundaries",
      "Photographs of the tree(s)",
      "Replacement planting plan",
    ],
    typicalTimeline:
      "Standard Protected Tree: 10–15 business days. Heritage Oaks: 30–60 days with possible public hearing.",
    applicationFee:
      "Contact Community Development for current fee schedule. In-lieu fees may apply if on-site replanting is not feasible.",
    mitigationSummary:
      "Replacement planting is required. Los Altos typically requires a minimum 24-inch box replacement tree per removal.",
    tips: [
      "Los Altos has one of the lowest protection thresholds on the Peninsula — 12 inches DBH covers nearly every mature tree. Most removal projects here will need a permit.",
      "Multi-trunk trees are measured as aggregate diameter (sum of all trunks). A dual-trunk tree with two 8\" trunks qualifies as 16\" aggregate — well above the threshold.",
      "Heritage Oaks (any oak 24\"+ DBH) are the most strictly protected category. Expect a longer review process and stricter mitigation requirements.",
      "Note the non-standard office hours — the department closes for lunch 12–1 PM.",
    ],
  },

  "Los Altos Hills": {
    department: "Planning Department",
    phone: "(650) 941-7222", // VERIFY
    email: null,
    address: "26379 Fremont Road, Los Altos Hills, CA 94022",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: null,
    websiteUrl: "https://www.losaltoshills.ca.gov",
    submissionMethod:
      "Los Altos Hills requires a permit for removal of any Protected Tree, defined as any native tree with a trunk diameter of 12 inches or more at 4.5 feet above grade. Non-native trees are not protected. Submit application in person.",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location",
      "Photographs of the tree",
    ],
    typicalTimeline: "Contact the Planning Department for current review timelines.",
    applicationFee: "Contact the Planning Department for current fee schedule.",
    mitigationSummary:
      "Replacement planting may be required. Contact Planning for current mitigation requirements.",
    tips: [
      "Los Altos Hills protects native trees only at the 12-inch DBH threshold — non-native trees are not regulated regardless of size.",
      "Many properties in Los Altos Hills have significant oak woodland. The town may have additional review requirements for large-scale removals.",
      "The town has a small planning staff — call ahead to confirm availability before visiting in person.",
    ],
  },

  "Mountain View": {
    department: "Public Works Department — Parks Division",
    phone: "(650) 903-6273", // VERIFY
    email: null,
    address: "500 Castro Street, Mountain View, CA 94041",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: null,
    websiteUrl: "https://www.mountainview.gov/depts/pw/parks/trees/default.asp",
    submissionMethod:
      "Mountain View regulates Heritage Trees, defined as any tree with a circumference of 48 inches or more at 4.5 feet above grade (≈15.3\" DBH). Submit application in person to the Parks Division.",
    requiredDocuments: [
      "Heritage Tree Removal Application",
      "This certified arborist report (PDF)",
      "Site plan with tree location",
      "Photographs of the tree",
    ],
    typicalTimeline: "15–20 business days for standard review.",
    applicationFee: "Contact the Parks Division for current fee schedule.",
    mitigationSummary:
      "Replacement planting may be required as a condition of approval.",
    tips: [
      "Mountain View's tree permits go through Public Works (Parks Division), not Community Development — make sure your client contacts the right department.",
      "The 48-inch circumference threshold (≈15.3\" DBH) is the same as Redwood City but measured at 4.5 feet (standard) rather than Redwood City's 24 inches above grade.",
      "Street trees (in the public right-of-way) are handled separately — contact the city arborist directly for those.",
    ],
  },

  // -----------------------------------------------------------------------
  // Priority 2 — Common but lower volume
  // -----------------------------------------------------------------------

  Hillsborough: {
    department: "Building and Planning Department",
    phone: "(650) 375-7411", // VERIFY
    email: null,
    address: "1600 Floribunda Avenue, Hillsborough, CA 94010",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: null,
    websiteUrl: "https://www.hillsborough.net",
    submissionMethod:
      "The Town of Hillsborough requires a permit for removal of any Significant Tree (10\"+ DBH) or Heritage Oak (native oak 18\"+ DBH). Submit application in person to Building and Planning.",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location(s)",
      "Photographs of the tree(s)",
      "Replacement planting plan (typically required)",
    ],
    typicalTimeline:
      "15–20 business days. Heritage Oak removal may require additional review.",
    applicationFee: "Contact Building and Planning for current fee schedule.",
    mitigationSummary:
      "Replacement planting is typically required at a ratio determined by the size of the removed tree.",
    tips: [
      "Hillsborough's 10-inch DBH threshold is among the lowest on the Peninsula — nearly every mature tree on a property will be protected.",
      "Heritage Oaks (native oaks 18\"+ DBH) have the strictest protection.",
      "Properties in Hillsborough tend to have large lots with many mature trees — plan for multiple permits if a project involves several removals.",
    ],
  },

  "San Carlos": {
    department: "Community Development Department — Planning Division",
    phone: "(650) 802-4228", // VERIFY
    email: null,
    address: "600 Elm Street, San Carlos, CA 94070",
    hours: "Monday–Thursday 7:00 AM–5:00 PM, Friday Closed", // VERIFY — 4/10 schedule
    portalUrl: null,
    websiteUrl: "https://www.cityofsancarlos.org/government/departments/community-development",
    submissionMethod:
      "San Carlos requires a Tree Removal Permit for removal of any Protected Tree (48\"+ circumference ≈ 15.3\" DBH) or any oak tree regardless of size. Submit application in person to Community Development.",
    requiredDocuments: [
      "Tree Removal Permit Application",
      "This certified arborist report (PDF)",
      "Site plan with tree location",
      "Photographs of the tree",
    ],
    typicalTimeline: "10–15 business days.",
    applicationFee: "Contact Community Development for current fee schedule.",
    mitigationSummary: "Replacement planting may be required.",
    tips: [
      "San Carlos protects ALL oak trees regardless of size — even a 6-inch oak needs a permit. This catches many homeowners by surprise.",
      "The city operates on a 4/10 schedule — closed on Fridays. Plan your office visits accordingly.",
      "The 48-inch circumference threshold (≈15.3\" DBH) applies to all non-oak species.",
    ],
  },

  Burlingame: {
    department: "Parks and Recreation Department",
    phone: "(650) 558-7330", // VERIFY
    email: null,
    address: "850 Burlingame Avenue, Burlingame, CA 94010",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: null,
    websiteUrl: "https://www.burlingame.org",
    submissionMethod:
      "Burlingame regulates Protected Trees, defined as any tree with a trunk diameter of 12 inches or more at 4.5 feet above grade, and oaks at 6 inches or more. Submit application in person to Parks and Recreation.",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report (PDF)",
      "Site plan and photographs",
    ],
    typicalTimeline: "15–20 business days.",
    applicationFee: "Contact Parks and Recreation for current fee schedule.",
    mitigationSummary:
      "Replacement planting may be required. Contact the city arborist for specific requirements.",
    tips: [
      "Burlingame protects oaks at a lower threshold (6\" DBH) than general trees (12\" DBH). Even a small oak may need a permit.",
      "The city arborist personally reviews all tree removal applications — they may schedule a site visit.",
    ],
  },

  "San Mateo County": {
    department: "Planning and Building Department",
    phone: "(650) 363-4161", // VERIFY
    email: null,
    address: "455 County Center, 2nd Floor, Redwood City, CA 94063",
    hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
    portalUrl: "https://www.smcgov.org/planning-building",
    websiteUrl: "https://www.smcgov.org/planning-building",
    submissionMethod:
      "Unincorporated San Mateo County requires a permit for removal of Significant Trees (12\"+ DBH). Submit application in person to the Planning and Building Department in Redwood City.",
    requiredDocuments: [
      "Tree Removal Application",
      "This certified arborist report (PDF)",
      "Site plan showing tree location(s)",
      "Photographs of the tree(s)",
    ],
    typicalTimeline:
      "15–30 business days. Coastal zone properties may require additional review.",
    applicationFee: "Contact the Planning and Building Department for current fee schedule.",
    mitigationSummary:
      "Replacement planting may be required. The Planning Department specifies conditions.",
    tips: [
      "Many properties in the Peninsula hills are in unincorporated San Mateo County, not in a city — confirm the jurisdiction before choosing the submission department.",
      "Coastal zone properties (Pacifica, Half Moon Bay coastside, and surrounding unincorporated areas) may require a Coastal Development Permit in addition to the tree removal permit.",
      "The county office is in Redwood City — don't confuse it with the City of Redwood City's planning office at a different address.",
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
// City aliases — alternate names that map to canonical entries above
// ---------------------------------------------------------------------------

const CITY_ALIASES: Record<string, string> = {
  "Unincorporated San Mateo County": "San Mateo County",
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

  // Check direct match first, then aliases
  const canonical = CITY_ALIASES[normalized] ?? normalized;
  return REMOVAL_CONTACTS[canonical] ?? null;
}

/**
 * Get generic next-steps guidance for non-removal report types.
 */
export function getNextStepsText(
  reportType: string
): { title: string; description: string } | null {
  return NON_REMOVAL_NEXT_STEPS[reportType] ?? null;
}
