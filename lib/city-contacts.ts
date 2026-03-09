/**
 * City-specific submission contacts for tree permit applications.
 *
 * Static data — no database queries, no API calls from share page.
 * Used by the share page to show homeowners exactly what to do with
 * their arborist report, with tap-to-call/email on mobile.
 *
 * Coverage:
 *   Peninsula: Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley
 *     + Redwood City, San Mateo, Los Altos, Los Altos Hills,
 *       Mountain View, Hillsborough, San Carlos, Burlingame, San Mateo County
 *   North Bay: Sonoma County, Santa Rosa, City of Napa, Windsor, Healdsburg
 *   Tahoe Basin: TRPA (regional authority covering all basin communities)
 *   Reno / Washoe County: no private-property permit required
 *
 * VERIFY: All contact info should be confirmed with each office before use.
 *   Peninsula cities last verified: March 2026
 *   North Bay cities added: March 2026 — NEEDS VERIFICATION
 *   Tahoe Basin entry added: March 2026 — TRPA phone verified from public website
 *   Reno entry added: March 2026 — NEEDS VERIFICATION
 */

import { toTitleCase } from "./utils";

// ---------------------------------------------------------------------------
// Peninsula expansion cities added: 2026-03-06 — NEEDS VERIFICATION
// All phone numbers and office hours are approximate and should be confirmed
// by calling each department before general availability.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type JurisdictionType =
  | "city"       // standard city planning department
  | "county"     // county planning (e.g., unincorporated Sonoma County)
  | "regional"   // regional authority that overrides city (TRPA)
  | "no_permit"; // no private property permit required (Reno)

export interface CityContact {
  jurisdictionType: JurisdictionType;
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
  /** For regional authorities: note which cities/areas are covered. */
  coverageNote?: string;
}

// ---------------------------------------------------------------------------
// City alias map — multiple city names resolve to a single canonical key
// ---------------------------------------------------------------------------

const CITY_ALIASES: Record<string, string> = {
  "Napa": "City Of Napa",
  "South Lake Tahoe": "Tahoe Basin",
  "Incline Village": "Tahoe Basin",
  "Tahoe City": "Tahoe Basin",
  "Kings Beach": "Tahoe Basin",
  "Stateline": "Tahoe Basin",
  "Zephyr Cove": "Tahoe Basin",
  "Tahoe Vista": "Tahoe Basin",
  "Crystal Bay": "Tahoe Basin",
  // NOTE: Truckee is OUTSIDE the TRPA boundary. Do NOT alias to "Tahoe Basin".
  // Truckee is under Town of Truckee / Nevada County jurisdiction.
  "Unincorporated San Mateo County": "San Mateo County",
};

// ---------------------------------------------------------------------------
// City Contact Data — keyed by city, then by report type
// ---------------------------------------------------------------------------

const CITY_CONTACTS: Record<string, Record<string, CityContact>> = {
  // ─── PENINSULA ────────────────────────────────────────────────────────────
  "Palo Alto": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Menlo Park": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  Atherton: {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  Woodside: {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Portola Valley": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  // ─── NORTH BAY ──────────────────────────────────────────────────────────

  "Sonoma County": {
    removal_permit: {
      jurisdictionType: "county",
      department: "Permit Sonoma — Planning Division",
      phone: "(707) 565-1900", // VERIFY
      email: "planner@sonomacounty.gov",
      address: "2550 Ventura Avenue, Santa Rosa, CA 95403",
      hours: "Monday–Friday 8:00 AM–4:00 PM", // VERIFY
      portalUrl:
        "https://permitsonoma.org/regulationsandlongrangeplans/regulationsandinitiatives/treepermitrequirements",
      websiteUrl: "https://permitsonoma.org",
      submissionMethod:
        "Applications are submitted through Permit Sonoma's online portal. Sonoma County adopted a substantially revised Tree Protection Ordinance in April 2024 — the most significant update since 1989. The ordinance protects 31 native species at 6 inches DBH and greater. The county also has an Oak Woodland Ordinance for parcels in the OAK Combining Zone. If your property is in an Oak Woodland zone, contact Permit Sonoma to confirm which ordinance(s) apply before submitting — the most protective rules govern.",
      requiredDocuments: [
        "Zoning Permit or Use Permit application (depending on tree size and species)",
        "This certified arborist report (PDF)",
        "Site plan showing location of tree(s) to be removed",
        "Photographs of the tree(s)",
        "Mitigation plan (tree replacement locations or in-lieu fee calculation)",
        "Property owner authorization if applicant is not the owner",
      ],
      typicalTimeline:
        "Zoning Permit (smaller protected trees): 15–30 business days. Use Permit (hardwoods > 36 inches DBH, redwoods > 48 inches DBH): 45–90 days, may require public hearing.",
      applicationFee:
        "In-lieu fees range from $500 to $3,500 per tree depending on size. Use Permit fees are additional. Contact Permit Sonoma for current fee schedule.",
      mitigationSummary:
        "Tree replacement is required. Mitigation must be provided through tree replacement planting or in-lieu payment. For in-lieu fees on large trees, the fee amount is determined using the CTLA Guide for Plant Appraisal methodology. Annual monitoring reports are required for 7 years if replacement planting is used.",
      tips: [
        "CRITICAL THRESHOLDS: Hardwood trees over 36 inches DBH and redwoods over 48 inches DBH require a Use Permit (public hearing, 60–90 days). All other protected trees (31 native species at 6+ inches DBH) require a Zoning Permit (15–30 days). Confirm your tree's measurements against these thresholds before selecting an application type.",
        "Sonoma County's 2024 ordinance is new — staff is still processing their first wave of applications under it. Allow extra time and call ahead.",
        "The Oak Woodland Ordinance is separate from the Tree Protection Ordinance. If your property is zoned OAK, you may need to comply with both.",
        "Defensible space, fire safety, and routine agricultural maintenance are exempt — document the reason for removal carefully if claiming an exemption.",
      ],
    },
  },

  "Santa Rosa": {
    removal_permit: {
      jurisdictionType: "city",
      department: "Planning and Economic Development — Permit Center",
      phone: "(707) 543-3200", // VERIFY
      email: null,
      address: "100 Santa Rosa Avenue, Santa Rosa, CA 95404",
      hours: "Monday–Friday 8:00 AM–4:00 PM", // VERIFY
      portalUrl: "https://www.srcity.org/583/Tree-Removal-Preservation",
      websiteUrl: "https://www.srcity.org/583/Tree-Removal-Preservation",
      submissionMethod:
        "Tree removal permit applications are submitted to the Planning and Economic Development Permit Center. Santa Rosa's ordinance distinguishes between Heritage Trees (designated native trees of a specific size) and other protected trees. Heritage trees require a permit in all zoning districts. Non-heritage trees 4 inches DBH or greater require permits in most zones. Properties in the Scenic Road (-SR) combining district have additional requirements.",
      requiredDocuments: [
        "Tree Removal Permit Application form",
        "This certified arborist report (PDF)",
        "Site plan showing tree location(s)",
        "Photographs of the tree(s)",
        "Completed replacement planting plan (if applicable)",
      ],
      typicalTimeline:
        "Standard review: 15–20 business days. Heritage trees with required public hearing: 45–60 days.",
      applicationFee:
        "Contact the Permit Center for current fee schedule.",
      mitigationSummary:
        "Replacement trees may be required as a permit condition. The planning department will specify requirements as part of permit approval.",
      tips: [
        "Verify whether your tree qualifies as a Heritage Tree before applying — the process and timeline differ significantly.",
        "Street tree removal (within the public right-of-way) is handled by the Parks Department, not Planning.",
      ],
    },
  },

  "City Of Napa": {
    removal_permit: {
      jurisdictionType: "city",
      department: "Parks and Recreation Services Department",
      phone: "(707) 257-9529", // VERIFY
      email: null,
      address: "1500 Jefferson Street, Napa, CA 94559",
      hours: "Monday–Friday 8:00 AM–5:00 PM",
      portalUrl: "https://www.cityofnapa.org/377/Trees-Urban-Forestry",
      websiteUrl: "https://www.cityofnapa.org/377/Trees-Urban-Forestry",
      submissionMethod:
        "Applications for removal or pruning of significant trees are submitted to the Parks and Recreation Services Department. The City of Napa has three separate tree programs: Street Trees (regulated under Chapter 12.44), Protected Native Trees, and Significant Trees (registered trees of historic significance). This certified arborist report supports the significant tree and protected native tree permit process. Applications go before the Parks, Recreation and Trees Advisory Commission for final determination.",
      requiredDocuments: [
        "Significant Tree Pruning/Removal Application form",
        "This certified arborist report (PDF)",
        "Photographs of the tree(s)",
        "Site plan showing tree location",
      ],
      typicalTimeline:
        "Staff review followed by Parks, Recreation and Trees Advisory Commission meeting. Commission meets monthly — plan for 30–45 days minimum.",
      applicationFee:
        "Contact the Parks Department for current fee schedule. Unauthorized removal of a protected native tree carries a civil penalty of $5,000 or the appraised value, whichever is greater.",
      mitigationSummary:
        "Mitigation requirements are specified as permit conditions. Napa's ordinance references the CTLA Guide for Plant Appraisal methodology for valuing removed trees — relevant if in-lieu fees apply.",
      tips: [
        "Napa has three separate tree protection programs — confirm which one applies to your tree before applying.",
        "The Commission meets monthly. Confirm the meeting schedule and application deadline with the Parks Department.",
        "The $5,000 minimum penalty for unauthorized removal is strict enforcement — do not proceed without a permit.",
      ],
    },
  },

  // Also match "Napa" without "City of" prefix
  Napa: {
    get removal_permit() {
      return CITY_CONTACTS["City Of Napa"].removal_permit;
    },
  },

  Windsor: {
    removal_permit: {
      jurisdictionType: "city",
      department: "Planning Department",
      phone: "(707) 838-1021", // VERIFY
      email: null,
      address: "9291 Old Redwood Highway, Windsor, CA 95492",
      hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
      portalUrl:
        "https://www.townofwindsor.ca.gov/DocumentCenter/View/21959/Tree-Removal-Permit-Application",
      websiteUrl: "https://www.townofwindsor.ca.gov",
      submissionMethod:
        "Applications submitted to the Town of Windsor Planning Department. Windsor has a Tree Preservation and Protection Ordinance (Chapter 27.36) and a detailed Tree Technical Manual that defines specific criteria for evaluating tree hazards. Note: Existing trees on single-family residential properties smaller than one acre are generally exempt — but trees required to be preserved by a prior permit, or trees on parcels one acre or more, are protected. Native oak trees are specifically protected regardless of parcel size.",
      requiredDocuments: [
        "Tree Removal Permit Application form (includes Tree Hazard Evaluation section)",
        "This certified arborist report (PDF)",
        "Color photographs of tree(s) to be removed",
        "Site plan with tree location clearly marked",
        "Property owner signature authorization",
      ],
      typicalTimeline:
        "15–20 business days for standard review.",
      applicationFee:
        "Mitigation fees are defined in the ordinance. In-lieu replacement fees apply when on-site replanting is not feasible. Contact Planning for current application fee schedule.",
      mitigationSummary:
        "Replacement requirements and in-lieu fees are specified in the ordinance (Section 27.36.061). Replacement value is based on tree health and structure. Windsor allows in-kind replacement, in-lieu replacement, or a combination.",
      tips: [
        "Windsor's ordinance has a broad residential exemption for parcels under one acre — confirm whether your property qualifies before applying.",
        "Native oaks are specifically protected and do not benefit from the residential exemption.",
        "Windsor has a Mediterranean Oak Borer (MOB) active monitoring program — if your tree may be MOB-affected, contact the Parks Department before proceeding with removal.",
      ],
    },
  },

  Healdsburg: {
    removal_permit: {
      jurisdictionType: "city",
      department: "Planning and Building Department",
      phone: "(707) 431-3348",
      email: null,
      address: "401 Grove Street, Healdsburg, CA 95448",
      hours: "Monday–Thursday 7:30 AM–5:00 PM; every other Friday 8:00 AM–5:00 PM (9/80 schedule)", // VERIFY
      portalUrl: null,
      websiteUrl: "https://www.ci.healdsburg.ca.us/352/Application-Forms-Submittal-Requirements",
      submissionMethod:
        "Tree permits are required for removal of heritage trees, and for encroachments into protected areas adjacent to heritage trees. Heritage trees in Healdsburg are defined as any tree with a diameter of 30 inches or more measured at two feet above level ground, or any tree identified by City Council resolution as having historic value. IMPORTANT: Healdsburg measures diameter at 2 feet above grade, NOT standard DBH (4.5 feet).",
      requiredDocuments: [
        "Tree Removal Permit Application",
        "This certified arborist report (PDF)",
        "Site plan with tree location",
        "Tree Location and Preservation Plan prepared by a qualified arborist (may be required)",
      ],
      typicalTimeline:
        "Planning Commission reviews at regularly scheduled meeting.",
      applicationFee:
        "$1,417.54 (base $1,050.03 + GP surcharge $367.51, FY 2025-26). Arborist report peer-review fee: $1,050.03.",
      mitigationSummary:
        "3:1 replacement ratio — three new trees per heritage tree removed (§20.24.075). In-lieu fee available when on-site replanting infeasible — amount set by Council resolution. 5-year maintenance program secured by cash surety may be required.",
      tips: [
        "IMPORTANT: Healdsburg measures tree diameter at 2 feet above level ground, NOT standard DBH (4.5 feet). Verify your measurements match the city's measurement standard before submitting.",
        "Healdsburg's heritage tree threshold (30 inches at 2 ft above grade) is one of the higher thresholds in the region — many trees that require permits elsewhere may be exempt here.",
        "Non-heritage trees do NOT require a permit in Healdsburg. Only heritage trees (30\"+ at 2 ft above grade or Council-designated) are regulated.",
        "Properties outside Healdsburg city limits but in the area are in unincorporated Sonoma County, which has a much stricter ordinance (31 species at 6\"+ DBH).",
      ],
    },
  },

  // ─── TAHOE BASIN ────────────────────────────────────────────────────────

  "Tahoe Basin": {
    removal_permit: {
      jurisdictionType: "regional",
      coverageNote:
        "The TRPA is the permitting authority for ALL tree removal within the Lake Tahoe Basin — this includes South Lake Tahoe (CA), Incline Village (NV), Tahoe City (CA), Kings Beach (CA), Stateline (NV), and surrounding communities. Local city/county planning departments do NOT issue tree removal permits in the basin.",
      department: "Tahoe Regional Planning Agency (TRPA)",
      phone: "(775) 588-4547",
      email: null,
      address: "128 Market Street, Stateline, NV 89449",
      hours: "Monday–Friday 8:00 AM–5:00 PM",
      portalUrl: "https://www.trpa.gov/trees-and-defensible-space/",
      websiteUrl: "https://www.trpa.gov",
      submissionMethod:
        "The Tahoe Regional Planning Agency is a bi-state regional authority covering both California and Nevada portions of the Lake Tahoe Basin. All tree removal permits are issued by TRPA, not local city or county planning departments. Apply online at aaweb.trpa.org or at the TRPA front counter. A TRPA forester will visit the property to assess the trees. The non-refundable filing fee is $53. TRPA rules: trees under 14 inches DBH can be removed without a permit for defensible space (as long as not in a sensitive area). For lakeshore properties, trees greater than 6 inches DBH between the house and the lake require a permit. Dead trees in non-sensitive areas can be removed without a permit.",
      requiredDocuments: [
        "TRPA Tree Removal Permit Application",
        "This certified arborist report (PDF) — supports the forester's site assessment",
        "Site plan showing tree location(s) and proximity to lake, stream environment zones, or backshore areas",
      ],
      typicalTimeline:
        "TRPA forester site visit required — schedule 2–4 weeks for inspection. Permit issued following forester assessment.",
      applicationFee:
        "$53 non-refundable filing fee. Additional fees may apply for large or complex projects.",
      mitigationSummary:
        "TRPA prioritizes retention and defensible space management over removal. Mitigation requirements are determined by the TRPA forester during the site visit.",
      tips: [
        "TRPA — not the City of South Lake Tahoe or the County of El Dorado — is the sole permit authority for tree removal in the basin. Do not contact local planning departments for tree removal permits.",
        "Trees smaller than 14 inches DBH can typically be removed for defensible space without a permit — but confirm with TRPA if the tree is near a Stream Environment Zone, the lakeshore, or was retained as part of a prior permit.",
        "The TRPA forester visits the property as part of the permit process. This certified arborist report supports but does not replace that forester assessment.",
        "South Lake Tahoe has a newer defensible space ordinance (2024) requiring inspections at property sales. If this report is for a real estate transaction, confirm defensible space compliance requirements with South Lake Tahoe Fire Rescue.",
      ],
    },
  },

  // ─── RENO / WASHOE COUNTY ──────────────────────────────────────────────

  Reno: {
    removal_permit: {
      jurisdictionType: "no_permit",
      department: "City of Reno Urban Forestry",
      phone: "(775) 321-8373",
      email: null,
      address: "Reno City Hall, 1 East First Street, Reno, NV 89501",
      hours: "Monday–Friday 8:00 AM–5:00 PM", // VERIFY
      portalUrl:
        "https://www.reno.gov/government/departments/parks-recreation-community-services/urban-forestry",
      websiteUrl: "https://www.reno.gov",
      submissionMethod:
        "No permit is required to remove trees on private residential property in the City of Reno. Tree removal permits are only required for work within City Rights-of-Way or on other City-owned property. This certified arborist report is not required for permit submission — it is for your records, insurance purposes, real estate documentation, or any other private purpose.",
      requiredDocuments: [
        "This certified arborist report (PDF) — for your records",
      ],
      typicalTimeline:
        "No city review required for private property tree removal.",
      applicationFee:
        "No permit fee for private property removal.",
      mitigationSummary:
        "No city-mandated mitigation for private property tree removal. If your HOA has tree regulations, check HOA governing documents separately.",
      tips: [
        "No city permit is required for removing trees on private property in Reno.",
        "If your tree is within or overhanging the public right-of-way, contact Urban Forestry at (775) 321-8373 before any work.",
        "This report is useful for insurance documentation, real estate disclosure, or HOA records even though no city permit is required.",
        "Check with your HOA or neighborhood association — some Reno communities have their own tree regulations independent of the city.",
      ],
    },
    health_assessment: {
      jurisdictionType: "no_permit",
      department: "City of Reno Urban Forestry",
      phone: "(775) 321-8373",
      email: null,
      address: "Reno City Hall, 1 East First Street, Reno, NV 89501",
      hours: "Monday–Friday 8:00 AM–5:00 PM",
      portalUrl: null,
      websiteUrl: "https://www.reno.gov",
      submissionMethod:
        "Health assessments in Reno do not require city submission. This report is for the property owner's records, insurance, real estate, or any private purpose.",
      requiredDocuments: [
        "This certified arborist report (PDF) — for your records",
      ],
      typicalTimeline: "No city review required.",
      applicationFee: "None.",
      mitigationSummary:
        "No city-mandated requirements for health assessments in Reno.",
      tips: [
        "This report does not need to be submitted to the City of Reno.",
        "For real estate transactions, this report can be provided directly to the buyer, listing agent, or title company.",
      ],
    },
  },

  // -----------------------------------------------------------------------
  // Priority 1 — High tree permit volume
  // -----------------------------------------------------------------------

  "Redwood City": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "San Mateo": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Los Altos": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Los Altos Hills": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Mountain View": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  // -----------------------------------------------------------------------
  // Priority 2 — Common but lower volume
  // -----------------------------------------------------------------------

  "Hillsborough": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "San Carlos": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "Burlingame": {
    removal_permit: {
      jurisdictionType: "city",
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
  },

  "San Mateo County": {
    removal_permit: {
      jurisdictionType: "county",
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
  real_estate_package: {
    title: "Share with Your Realtor",
    description:
      "This Certified Tree Canopy Report documents the health and appraised value of the trees on this property. Share it with your realtor, lender, or buyer to inform the real estate transaction.",
  },
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get city contact info for a specific report type.
 * Resolves city aliases (e.g., "South Lake Tahoe" → "Tahoe Basin").
 * Returns null if no contact info exists for the city/reportType combo.
 */
export function getCityContact(
  city: string,
  reportType?: string
): CityContact | null {
  if (!city) return null;

  const normalized = toTitleCase(city);
  const resolvedCity = CITY_ALIASES[normalized] ?? normalized;

  const cityData = CITY_CONTACTS[resolvedCity];
  if (!cityData) return null;

  // If a report type was provided, look up that specific type
  if (reportType) {
    return cityData[reportType] ?? null;
  }

  // Default: look for removal_permit
  return cityData["removal_permit"] ?? null;
}

/**
 * Get generic next-steps guidance for non-removal report types.
 */
export function getNextStepsText(
  reportType: string
): { title: string; description: string } | null {
  return NON_REMOVAL_NEXT_STEPS[reportType] ?? null;
}
