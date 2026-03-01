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
  icon: "Stethoscope" | "Axe" | "DollarSign" | "HardHat";
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
];

export function getReportTypeConfig(id: string): ReportTypeConfig | undefined {
  return REPORT_TYPES.find((rt) => rt.id === id);
}

// ---------------------------------------------------------------------------
// Type-specific tree data interfaces
// ---------------------------------------------------------------------------

export interface HealthAssessmentData {
  maintenanceRecommendations?: string;
  maintenancePriority?: "low" | "moderate" | "high" | "urgent";
  maintenanceTimeline?: string;
  estimatedMaintenanceCost?: number;
}

export interface RemovalPermitData {
  riskRating?: "low" | "moderate" | "high" | "extreme";
  riskFactors?: string[];
  removalReason?: string;
  retentionFeasibility?: string;
  estimatedRemainingLifespan?: string;
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
  encroachmentDescription?: string;
  encroachmentPercent?: number; // 0-100
  impactAssessment?: "none" | "minor" | "moderate" | "significant" | "severe";
  protectionMeasures?: string;
  monitoringSchedule?: string;
}

export type TypeSpecificData =
  | HealthAssessmentData
  | RemovalPermitData
  | TreeValuationData
  | ConstructionEncroachmentData;

// ---------------------------------------------------------------------------
// Auto-calculation helpers
// ---------------------------------------------------------------------------

/** Calculate trunk cross-sectional area in square inches from DBH. */
export function calcTrunkArea(dbhInches: number): number {
  return Math.PI * Math.pow(dbhInches / 2, 2);
}

/** Calculate CTLA appraised value. */
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
