/**
 * CTLA Tree Valuation — Trunk Formula Technique (10th Edition, 2019)
 *
 * Implements the standard CTLA appraisal method used in California:
 *   Appraised Value = Trunk Area × Unit Price × Condition × Species × Location
 *
 * Condition = geometric mean of Health%, Structure%, Form% (10th Ed. method)
 * Location  = average of Site% and Contribution%
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValuationInputs {
  dbhInches: number;
  unitPrice: number;          // $/sq in
  healthRating: number;       // 0-100
  structureRating: number;    // 0-100
  formRating: number;         // 0-100
  speciesRating: number;      // 0-100
  siteRating: number;         // 0-100
  contributionRating: number; // 0-100
}

export interface ValuationResult {
  trunkAreaSqIn: number;
  basicValue: number;
  conditionRating: number;    // geometric mean, 0-100
  locationRating: number;     // average, 0-100
  appraisedValue: number;
}

// ---------------------------------------------------------------------------
// Core Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate appraised value using the CTLA Trunk Formula Technique (10th Edition).
 *
 * The 10th Edition separated condition into three independent ratings
 * (Health, Structure, Form), combined via geometric mean:
 *   Condition = (H% × S% × F%) ^ (1/3)
 *
 * Location combines site suitability and contribution:
 *   Location = (Site% + Contribution%) / 2
 */
export function calculateTFT(inputs: ValuationInputs): ValuationResult {
  const radius = inputs.dbhInches / 2;
  const trunkAreaSqIn = Math.PI * radius * radius;
  const basicValue = trunkAreaSqIn * inputs.unitPrice;

  // CTLA 10th Edition: geometric mean of three condition components
  const hPct = inputs.healthRating / 100;
  const sPct = inputs.structureRating / 100;
  const fPct = inputs.formRating / 100;
  const conditionRating =
    hPct === 0 || sPct === 0 || fPct === 0
      ? 0
      : Math.pow(hPct * sPct * fPct, 1 / 3) * 100;

  // Location: average of site and contribution
  const locationRating = (inputs.siteRating + inputs.contributionRating) / 2;

  const appraisedValue =
    basicValue *
    (conditionRating / 100) *
    (inputs.speciesRating / 100) *
    (locationRating / 100);

  return {
    trunkAreaSqIn: Math.round(trunkAreaSqIn * 100) / 100,
    basicValue: Math.round(basicValue * 100) / 100,
    conditionRating: Math.round(conditionRating * 10) / 10,
    locationRating: Math.round(locationRating * 10) / 10,
    appraisedValue: Math.round(appraisedValue),
  };
}

// ---------------------------------------------------------------------------
// CTLA → 1–5 Scale Mapping (single source of truth)
// ---------------------------------------------------------------------------

/**
 * Maps a CTLA condition percentage (0–100) to the existing 1–5 condition rating scale.
 * Used to keep the tree inventory table, condition dots, and existing UI consistent
 * when the arborist is working with the 3-component CTLA rating system.
 */
export function ctlaConditionTo15Scale(ctlaPercentage: number): number {
  if (ctlaPercentage >= 90) return 5;  // Excellent
  if (ctlaPercentage >= 70) return 4;  // Good
  if (ctlaPercentage >= 50) return 3;  // Fair
  if (ctlaPercentage >= 25) return 2;  // Poor
  return 1;                             // Critical/Dead
}

/**
 * Maps a CTLA condition percentage to a human-readable label.
 * Used in the real estate PDF executive summary, share page cards, and PDF cover.
 */
export function getConditionLabel(ctlaPercentage: number): string {
  if (ctlaPercentage >= 90) return "Excellent";
  if (ctlaPercentage >= 70) return "Good";
  if (ctlaPercentage >= 50) return "Fair";
  return "Poor";
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ---------------------------------------------------------------------------
// Re-export species rating lookup for convenience
// ---------------------------------------------------------------------------

export { getDefaultSpeciesRating } from "./species-ratings";

// ---------------------------------------------------------------------------
// Default unit price (Bay Area / North Bay, 2026)
// ---------------------------------------------------------------------------

export const DEFAULT_UNIT_PRICE = 38.0;

// ---------------------------------------------------------------------------
// Default basis statement
// ---------------------------------------------------------------------------

export const DEFAULT_BASIS_STATEMENT =
  "This appraisal was conducted in accordance with the Guide for Plant Appraisal, 10th Edition, authored by the Council of Tree and Landscape Appraisers (CTLA) and published by the International Society of Arboriculture (ISA), 2019. The Trunk Formula Technique (Cost Approach, Reproduction Method) was applied to determine the replacement cost value of each tree. This appraisal has been prepared with consideration of the Uniform Standards of Professional Appraisal Practice (USPAP) as applicable to plant appraisal.";

// ---------------------------------------------------------------------------
// Valuation purpose options
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Default limiting conditions for valuation reports
// ---------------------------------------------------------------------------

export const DEFAULT_LIMITING_CONDITIONS: string[] = [
  "The appraiser has no present or prospective interest in the subject property and has no personal interest with respect to the parties involved.",
  "The appraisal assumes the trees and site conditions as observed on the date of assessment. Conditions may change due to growth, disease, weather events, or human activity.",
  "No invasive or subsurface investigation was performed. Root condition and internal wood condition were assessed only from external, ground-level indicators.",
  "Values represent the replacement cost of the assessed trees using the Trunk Formula Technique. They do not represent the market value of the property or the contribution of trees to property market value.",
  "The unit cost values used in this appraisal are based on current wholesale nursery pricing for the largest commonly available replacement specimen of the same species and are subject to change.",
  "This appraisal is not a guarantee of tree health, structural integrity, or remaining useful life.",
];

// ---------------------------------------------------------------------------
// Valuation purpose options
// ---------------------------------------------------------------------------

export const VALUATION_PURPOSES = [
  "Real Estate Transaction",
  "Insurance Claim",
  "Legal / Litigation",
  "Estate Planning",
  "Permit Mitigation",
  "Other",
] as const;
