/**
 * City-specific submission requirements for tree permit applications.
 *
 * Structured checklist data per city, used by the SubmissionChecklistDialog
 * to show arborists exactly what each jurisdiction requires before marking
 * a report as submitted.
 *
 * Coverage:
 *   5 original Peninsula cities — verified against permitProcessNotes (March 2026)
 *   9 expansion Peninsula cities — common requirements only (isVerified: false)
 *
 * Cities without entries (North Bay, Tahoe, Reno) get a generic fallback
 * via getGenericSubmissionConfig().
 */

import { toTitleCase } from "./utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SubmissionRequirement {
  id: string;
  label: string;
  description?: string;
  category: "document" | "form" | "fee" | "site" | "notification";
  autoCheckId?: string; // 'certified_report' | 'photos_attached'
  required: boolean;
}

export interface CitySubmissionConfig {
  cityName: string;
  isVerified: boolean;
  submissionMethod: string;
  submissionNotes?: string;
  typicalProcessingTime: string;
  requirements: SubmissionRequirement[];
}

// ---------------------------------------------------------------------------
// Common requirements (shared base for all cities)
// ---------------------------------------------------------------------------

const COMMON_REQUIREMENTS: SubmissionRequirement[] = [
  {
    id: "certified_report",
    label: "Certified arborist report (PDF)",
    description: "Must include ISA credential number and electronic signature",
    category: "document",
    autoCheckId: "certified_report",
    required: true,
  },
  {
    id: "permit_application",
    label: "Tree removal permit application form",
    description: "Completed city-specific application form",
    category: "form",
    required: true,
  },
  {
    id: "site_plan",
    label: "Site plan showing tree location(s)",
    description:
      "Property sketch with trees, structures, and property lines marked",
    category: "site",
    required: true,
  },
  {
    id: "photos",
    label: "Photos of tree(s)",
    description: "Full tree photo and any visible defects for each tree",
    category: "document",
    autoCheckId: "photos_attached",
    required: true,
  },
  {
    id: "application_fee",
    label: "Permit application fee",
    category: "fee",
    required: true,
  },
  {
    id: "owner_authorization",
    label: "Property owner authorization",
    description:
      "Written consent from property owner if applicant is not the owner",
    category: "form",
    required: false,
  },
];

// ---------------------------------------------------------------------------
// City-specific configs — Original 5 Peninsula cities
// ---------------------------------------------------------------------------

const CITY_CONFIGS: Record<string, CitySubmissionConfig> = {
  // ─── PALO ALTO ────────────────────────────────────────────────────────────
  "Palo Alto": {
    cityName: "Palo Alto",
    isVerified: true,
    submissionMethod:
      "Online through the City of Palo Alto Development Services portal, or in person at the Planning counter",
    submissionNotes:
      "Invasive species and high water users may be excluded from protection. Confirm species status before submitting.",
    typicalProcessingTime:
      "15–30 business days for staff review; heritage trees may require public hearing (60–90 days)",
    requirements: [
      ...COMMON_REQUIREMENTS.map((r) =>
        r.id === "application_fee"
          ? { ...r, description: "Approximately $507 — confirm current fee with Planning" }
          : r
      ),
      {
        id: "pa_tltm_worksheet",
        label: "TLTM replacement calculation worksheet",
        description:
          "Tree Loss and Tree Mitigation (TLTM) governs replacement calculations",
        category: "form",
        required: true,
      },
      {
        id: "pa_neighbor_notification",
        label: "Adjacent property owner notification",
        description:
          "May be required for certain protected or heritage trees — confirm with Urban Forestry",
        category: "notification",
        required: false,
      },
    ],
  },

  // ─── MENLO PARK ───────────────────────────────────────────────────────────
  "Menlo Park": {
    cityName: "Menlo Park",
    isVerified: true,
    submissionMethod:
      "In person or by mail to the Community Development Department",
    submissionNotes:
      "Major pruning (>25% of crown/roots) also requires a permit. Work within Tree Protection Zone (10× trunk diameter) requires a tree protection plan.",
    typicalProcessingTime: "10–20 business days for staff review",
    requirements: [
      ...COMMON_REQUIREMENTS,
      {
        id: "mp_mitigation_plan",
        label: "Mitigation/replanting plan or in-lieu fee payment",
        description:
          "Approved removals typically require 2:1 replanting — 2 new trees per 1 removed",
        category: "document",
        required: true,
      },
      {
        id: "mp_tpz_plan",
        label: "Tree protection plan for work in TPZ",
        description:
          "Required if any work within Tree Protection Zone (10× trunk diameter)",
        category: "document",
        required: false,
      },
    ],
  },

  // ─── ATHERTON ─────────────────────────────────────────────────────────────
  Atherton: {
    cityName: "Atherton",
    isVerified: true,
    submissionMethod:
      "Submit to the Building Department. The Town Arborist reviews all applications.",
    submissionNotes:
      "Retroactive permit required for illegal removal with full penalties. Town Arborist may schedule a site visit.",
    typicalProcessingTime:
      "Heritage oaks: 30–60 days (requires Council approval). Other protected trees: 15–30 days.",
    requirements: [
      ...COMMON_REQUIREMENTS,
      {
        id: "ath_tpp",
        label: "Tree Protection and Preservation Plan",
        description:
          "Required by Planning Department for all tree removal applications",
        category: "document",
        required: true,
      },
      {
        id: "ath_planning_commission",
        label: "Planning Commission review application",
        description: "Required for heritage tree removal — includes Council vote for oaks",
        category: "form",
        required: false,
      },
      {
        id: "ath_quarterly_inspection",
        label: "Quarterly inspection schedule (if construction-related)",
        description:
          "Quarterly inspections required during construction projects",
        category: "document",
        required: false,
      },
    ],
  },

  // ─── WOODSIDE ─────────────────────────────────────────────────────────────
  Woodside: {
    cityName: "Woodside",
    isVerified: true,
    submissionMethod: "Submit to the Planning Department in person or by mail",
    submissionNotes:
      "Eucalyptus, Acacia, and Monterey Pine are exempt from fees. Permit valid for 2 years.",
    typicalProcessingTime: "15–20 business days for standard review",
    requirements: [
      ...COMMON_REQUIREMENTS.map((r) => {
        if (r.id === "site_plan") {
          return {
            ...r,
            label: "Site sketch with tree locations and surroundings",
            description:
              "Must show proximity to structures, property lines, streams, and trails",
          };
        }
        if (r.id === "photos") {
          return {
            ...r,
            label: "Photos with trees physically marked",
            description:
              "Trees must be marked with orange ribbon in photos for identification",
          };
        }
        return r;
      }),
    ],
  },

  // ─── PORTOLA VALLEY ───────────────────────────────────────────────────────
  "Portola Valley": {
    cityName: "Portola Valley",
    isVerified: true,
    submissionMethod: "Submit Application for Site Development Permit (Tree Removal) to the Planning Department",
    submissionNotes:
      "Fee waived for dead trees (including Sudden Oak Death). Conservation Committee reviews applications and may conduct a site inspection.",
    typicalProcessingTime:
      "Varies — Conservation Committee review schedule. Appeal to Planning Commission if disagreeing with findings.",
    requirements: [
      ...COMMON_REQUIREMENTS,
      {
        id: "pv_sdp_application",
        label: "Site Development Permit application (tree removal)",
        description: "City-specific form — contact Planning Department for current version",
        category: "form",
        required: true,
      },
      {
        id: "pv_conservation_review",
        label: "Conservation Committee review preparation",
        description:
          "Committee may conduct a site inspection — ensure tree access is available",
        category: "notification",
        required: false,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Expansion Peninsula cities — common requirements only
// ---------------------------------------------------------------------------

const EXPANSION_CITIES = [
  "Redwood City",
  "San Mateo",
  "Los Altos",
  "Los Altos Hills",
  "Mountain View",
  "Hillsborough",
  "San Carlos",
  "Burlingame",
  "San Mateo County",
];

for (const city of EXPANSION_CITIES) {
  CITY_CONFIGS[city] = {
    cityName: city,
    isVerified: false,
    submissionMethod: "Contact city Planning Department for submission requirements",
    typicalProcessingTime: "Varies by jurisdiction — contact city for current timeline",
    requirements: [...COMMON_REQUIREMENTS],
  };
}

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------

/**
 * Get submission requirements for a specific city.
 * Returns null for cities without configured requirements (North Bay, Tahoe, Reno).
 */
export function getSubmissionConfig(
  cityName: string
): CitySubmissionConfig | null {
  const normalized = toTitleCase(cityName.trim());
  return CITY_CONFIGS[normalized] ?? null;
}

/**
 * Get a generic submission config for cities without specific data.
 * Provides common requirements as a useful starting checklist.
 */
export function getGenericSubmissionConfig(
  cityName: string
): CitySubmissionConfig {
  return {
    cityName: toTitleCase(cityName.trim()),
    isVerified: false,
    submissionMethod:
      "Contact your local Planning Department for submission requirements",
    typicalProcessingTime:
      "Varies by jurisdiction — contact city for current timeline",
    requirements: [...COMMON_REQUIREMENTS],
  };
}

// ---------------------------------------------------------------------------
// Category labels and ordering
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<
  SubmissionRequirement["category"],
  string
> = {
  document: "Documents",
  form: "Forms & Applications",
  fee: "Fees",
  site: "Site Requirements",
  notification: "Notifications",
};

export const CATEGORY_ORDER: SubmissionRequirement["category"][] = [
  "document",
  "form",
  "fee",
  "site",
  "notification",
];
