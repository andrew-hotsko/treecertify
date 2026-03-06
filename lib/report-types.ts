/**
 * Report type configuration and type-specific data interfaces.
 * The report type drives the entire assessment workflow.
 */

// ---------------------------------------------------------------------------
// Report type metadata
// ---------------------------------------------------------------------------

export interface ReportTypeConfig {
  id: string;
  label: string;
  description: string;
  icon: "Stethoscope" | "Axe" | "DollarSign" | "HardHat" | "Home";
  color: string; // Tailwind color prefix (e.g. "green", "red")
}

export const REPORT_TYPES: ReportTypeConfig[] = [
  {
    id: "health_assessment",
    label: "Health Assessment / Inventory",
    description: "Tree condition evaluation with maintenance recommendations and risk prognosis",
    icon: "Stethoscope",
    color: "green",
  },
  {
    id: "removal_permit",
    label: "Removal Permit Application",
    description: "Justify tree removal with risk analysis, retention feasibility, and mitigation plan",
    icon: "Axe",
    color: "red",
  },
  {
    id: "tree_valuation",
    label: "Tree Valuation",
    description: "CTLA Trunk Formula appraisal with per-tree and aggregate dollar values",
    icon: "DollarSign",
    color: "amber",
  },
  {
    id: "construction_encroachment",
    label: "Construction Encroachment",
    description: "TPZ/SRZ analysis with tree protection zones and construction impact plan",
    icon: "HardHat",
    color: "blue",
  },
  {
    id: "real_estate_package",
    label: "Real Estate Package",
    description: "Bundled health assessment + CTLA valuation for real estate transactions",
    icon: "Home",
    color: "violet",
  },
];

export function getReportTypeConfig(id: string): ReportTypeConfig | undefined {
  return REPORT_TYPES.find((rt) => rt.id === id);
}

// ---------------------------------------------------------------------------
// Type-specific tree data interfaces
// ---------------------------------------------------------------------------

export interface HealthAssessmentData {
  // TRAQ fields
  likelihoodOfFailure?: "improbable" | "possible" | "probable" | "imminent";
  likelihoodOfImpact?: "very_low" | "low" | "medium" | "high";
  consequences?: "negligible" | "minor" | "significant" | "severe";
  overallRiskRating?: string; // auto-calculated
  targetDescription?: string;
  // Maintenance
  maintenanceItems?: string[]; // multi-select checkboxes
  maintenancePriority?: "low" | "moderate" | "high" | "urgent";
  maintenanceTimeline?: string;
  estimatedMaintenanceCost?: number;
  // Legacy field - kept for backwards compat
  maintenanceRecommendations?: string;
}

export interface RemovalPermitData {
  riskRating?: "low" | "moderate" | "high" | "extreme";
  riskFactors?: string[];
  removalReason?: string;
  retentionFeasibility?: "feasible" | "not_feasible" | "feasible_with_conditions";
  retentionNotes?: string;
  estimatedRemainingLifespan?: string;
  // Optional TRAQ fields (shown when TRAQ toggle is on)
  likelihoodOfFailure?: "improbable" | "possible" | "probable" | "imminent";
  likelihoodOfImpact?: "very_low" | "low" | "medium" | "high";
  consequences?: "negligible" | "minor" | "significant" | "severe";
  overallRiskRating?: string;
  targetDescription?: string;
}

export interface TreeValuationData {
  valuationMethod?: string; // default "CTLA Trunk Formula"
  speciesRating?: number; // 0-100 %
  conditionRating?: number; // 0-100 %
  locationRating?: number; // 0-100 %
  costPerSquareInch?: number; // regional rate, default $75
  trunkArea?: number; // auto-calc: pi * (DBH/2)^2
  appraisedValue?: number; // auto-calc
}

export interface ConstructionEncroachmentData {
  tpzRadius?: number; // auto-calc: DBH inches → feet
  srzRadius?: number; // auto-calc: sqrt(DBH * 0.1524) * 3.28084
  tpzOverride?: boolean;
  tpzManual?: number;
  srzManual?: number;
  encroachmentDescription?: string;
  encroachmentPercent?: number; // 0-100
  impactAssessment?: "none" | "minor" | "moderate" | "significant" | "severe";
  protectionMeasuresList?: string[]; // multi-select
  monitoringFrequency?: string;
  // Legacy fields
  protectionMeasures?: string;
  monitoringSchedule?: string;
}

export interface RealEstatePackageData {
  // Combines health + valuation fields
  // Health-related
  maintenanceItems?: string[];
  maintenancePriority?: "low" | "moderate" | "high" | "urgent";
  // Valuation is on the dedicated TreeRecord columns (valuationXxx)
}

export type TypeSpecificData =
  | HealthAssessmentData
  | RemovalPermitData
  | TreeValuationData
  | ConstructionEncroachmentData
  | RealEstatePackageData;

// ---------------------------------------------------------------------------
// Auto-calculation helpers
// ---------------------------------------------------------------------------

/**
 * @deprecated Use `calculateTFT()` from `lib/valuation.ts` instead.
 * This simplified function does not implement CTLA 10th Edition geometric mean.
 */
export function calcTrunkArea(dbhInches: number): number {
  return Math.PI * Math.pow(dbhInches / 2, 2);
}

/**
 * @deprecated Use `calculateTFT()` from `lib/valuation.ts` instead.
 * This simplified function does not implement CTLA 10th Edition condition decomposition
 * (Health × Structure × Form geometric mean) or Location (Site + Contribution average).
 */
export function calcAppraisedValue(
  trunkArea: number,
  costPerSqInch: number,
  speciesRatingPct: number,
  conditionRatingPct: number,
  locationRatingPct: number
): number {
  return (
    trunkArea *
    costPerSqInch *
    (speciesRatingPct / 100) *
    (conditionRatingPct / 100) *
    (locationRatingPct / 100)
  );
}

/** Calculate TPZ radius in feet (1 inch DBH = 1 foot radius per ISA standard). */
export function calcTpzRadius(dbhInches: number): number {
  return dbhInches; // 1:1 ratio
}

/** Calculate SRZ radius in feet from DBH inches (ISA formula). */
export function calcSrzRadius(dbhInches: number): number {
  // SRZ = sqrt(DBH_in_meters) in meters, converted to feet
  const dbhMeters = dbhInches * 0.0254;
  const srzMeters = Math.sqrt(dbhMeters);
  return srzMeters * 3.28084;
}

/** Map condition rating (0-5) to a percentage for CTLA valuation. */
export function conditionToPercent(rating: number): number {
  const map: Record<number, number> = { 0: 0, 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 };
  return map[rating] ?? 60;
}

/** Lookup species rating % for common CA species. Returns default 50 if unknown. */
export function getSpeciesRating(speciesCommon: string): number {
  const normalized = speciesCommon.toLowerCase().trim();
  const ratings: Record<string, number> = {
    "coast live oak": 90,
    "valley oak": 90,
    "blue oak": 85,
    "california sycamore": 80,
    "western sycamore": 80,
    "coast redwood": 95,
    "monterey pine": 60,
    "monterey cypress": 70,
    "eucalyptus": 40,
    "blue gum eucalyptus": 35,
    "red ironbark": 45,
    "london plane": 70,
    "chinese elm": 50,
    "camphor tree": 55,
    "japanese maple": 75,
    "deodar cedar": 70,
    "atlas cedar": 70,
    "incense cedar": 80,
    "white alder": 60,
    "red alder": 55,
    "california bay laurel": 75,
    "california buckeye": 65,
    "italian stone pine": 55,
    "canary island pine": 50,
    "aleppo pine": 45,
    "southern magnolia": 70,
    "cork oak": 80,
    "interior live oak": 85,
    "black walnut": 70,
    "california black walnut": 75,
    "sweetgum": 60,
    "liquidambar": 60,
    "ginkgo": 75,
    "jacaranda": 60,
    "brazilian pepper": 30,
    "tree of heaven": 20,
    "palm": 40,
    "mexican fan palm": 35,
    "queen palm": 40,
    "date palm": 50,
  };

  for (const [key, value] of Object.entries(ratings)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return 50; // default
}

/** Calculate TRAQ overall risk rating from the three components. */
export function calcTRAQRisk(
  likelihood?: string,
  impact?: string,
  consequences?: string
): string {
  if (!likelihood || !impact || !consequences) return "";

  // ISA TRAQ matrix simplified:
  // Combine likelihood of failure + likelihood of impact into "likelihood" score
  const lofScore: Record<string, number> = {
    improbable: 1, possible: 2, probable: 3, imminent: 4,
  };
  const loiScore: Record<string, number> = {
    very_low: 1, low: 2, medium: 3, high: 4,
  };
  const conScore: Record<string, number> = {
    negligible: 1, minor: 2, significant: 3, severe: 4,
  };

  const lof = lofScore[likelihood] ?? 1;
  const loi = loiScore[impact] ?? 1;
  const con = conScore[consequences] ?? 1;

  // Combined likelihood = lof * loi weight
  const combined = lof * loi;
  // Risk = combined * consequences
  const risk = combined * con;

  if (risk >= 32) return "extreme";
  if (risk >= 12) return "high";
  if (risk >= 4) return "moderate";
  return "low";
}

// ---------------------------------------------------------------------------
// Risk factors for removal permit
// ---------------------------------------------------------------------------

export const RISK_FACTORS = [
  "Root damage / decay",
  "Trunk decay / cavity",
  "Canopy dieback",
  "Significant lean",
  "Co-dominant stems",
  "Dead branches",
  "Fungal fruiting bodies",
  "Bark damage / wounds",
] as const;

// ---------------------------------------------------------------------------
// Maintenance items for health assessment
// ---------------------------------------------------------------------------

export const MAINTENANCE_ITEMS = [
  "Crown cleaning",
  "Deadwood removal",
  "Structural pruning",
  "Cable/brace",
  "Root crown excavation",
  "Pest treatment",
  "Soil improvement",
  "Clearance pruning",
] as const;

// ---------------------------------------------------------------------------
// Protection measures for construction encroachment
// ---------------------------------------------------------------------------

export const PROTECTION_MEASURES = [
  "Tree protection fencing",
  "Root pruning",
  "Trunk protection wrap",
  "Grade board installation",
  "Mulch application",
  "Irrigation plan",
  "Arborist supervision during excavation",
  "Crown pruning for clearance",
] as const;

// ---------------------------------------------------------------------------
// Re-exports from lib/valuation.ts (CTLA 10th Edition)
// ---------------------------------------------------------------------------

export { calculateTFT, formatCurrency, getDefaultSpeciesRating } from "./valuation";
