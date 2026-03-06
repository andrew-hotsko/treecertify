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
  "This appraisal was conducted in accordance with the Guide for Plant Appraisal, 10th Edition, authored by the Council of Tree and Landscape Appraisers (CTLA) and published by the International Society of Arboriculture (ISA), 2019. The Trunk Formula Technique (Cost Approach, Reproduction Method) was applied to determine the replacement cost value of each tree.";

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
