/**
 * Default observation library and canonical term mappings.
 *
 * The Observation interface powers the arborist-customizable checklist.
 * Each observation has a stable `canonical` identifier used in the AI
 * pipeline, while `label` can be renamed by arborists. Custom
 * observations added by arborists get `canonical: "(custom) {label}"`.
 *
 * The defaults here are reconciled with the existing hardcoded arrays
 * in `lib/observation-helpers.ts` to ensure backward compatibility —
 * every observation that could already be stored on a tree record is
 * present in the default list.
 */

// Use crypto.randomUUID() — available in Node 19+ and all modern browsers

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Observation {
  id: string; // uuid
  label: string; // display text (arborist can rename)
  canonical: string; // stable ISA term for AI pipeline
  enabled: boolean; // arborist can toggle off (unless first 6)
  builtIn: boolean; // true = shipped with app
}

// ---------------------------------------------------------------------------
// Default Health Observations (12)
// ---------------------------------------------------------------------------

const DEFAULT_HEALTH: Array<Omit<Observation, "id">> = [
  // First 6 = locked (cannot be hidden)
  { label: "Chlorosis (yellowing)", canonical: "chlorosis", enabled: true, builtIn: true },
  { label: "Crown dieback", canonical: "crown_dieback", enabled: true, builtIn: true },
  { label: "Decay / fungal fruiting bodies", canonical: "decay_fungal", enabled: true, builtIn: true },
  { label: "Pest / insect damage", canonical: "pest_damage", enabled: true, builtIn: true },
  { label: "Girdling roots", canonical: "girdling_roots", enabled: true, builtIn: true },
  { label: "Poor vigor / sparse canopy", canonical: "poor_vigor", enabled: true, builtIn: true },
  // Remaining = can be hidden but still builtIn
  { label: "Leaf scorch / burn", canonical: "leaf_scorch", enabled: true, builtIn: true },
  { label: "Crown thinning", canonical: "crown_thinning", enabled: true, builtIn: true },
  { label: "Epicormic sprouting", canonical: "epicormic_sprouting", enabled: true, builtIn: true },
  { label: "Root damage / cut roots", canonical: "root_damage", enabled: true, builtIn: true },
  { label: "Cankers / lesions", canonical: "cankers", enabled: true, builtIn: true },
  { label: "Wilting / drought stress", canonical: "wilting_drought", enabled: true, builtIn: true },
];

// ---------------------------------------------------------------------------
// Default Structural Observations (11)
// ---------------------------------------------------------------------------

const DEFAULT_STRUCTURAL: Array<Omit<Observation, "id">> = [
  // First 6 = locked
  { label: "Codominant stems", canonical: "codominant_stems", enabled: true, builtIn: true },
  { label: "Included bark", canonical: "included_bark", enabled: true, builtIn: true },
  { label: "Cavity / hollow", canonical: "cavity_hollow", enabled: true, builtIn: true },
  { label: "Lean (note degree if significant)", canonical: "significant_lean", enabled: true, builtIn: true },
  { label: "Root plate heaving / lifting", canonical: "root_plate_heaving", enabled: true, builtIn: true },
  { label: "Asymmetric crown", canonical: "crown_asymmetry", enabled: true, builtIn: true },
  // Remaining
  { label: "Deadwood in crown", canonical: "deadwood", enabled: true, builtIn: true },
  { label: "Cracks / splits", canonical: "cracks_splits", enabled: true, builtIn: true },
  { label: "Weak branch attachments", canonical: "weak_attachments", enabled: true, builtIn: true },
  { label: "Trunk wound / damage", canonical: "trunk_wound", enabled: true, builtIn: true },
  { label: "Hangers / broken branches", canonical: "hangers_broken", enabled: true, builtIn: true },
];

// ---------------------------------------------------------------------------
// Factory functions — fresh UUIDs each call
// ---------------------------------------------------------------------------

export function getDefaultHealthObservations(): Observation[] {
  return DEFAULT_HEALTH.map((o) => ({ ...o, id: crypto.randomUUID() }));
}

export function getDefaultStructuralObservations(): Observation[] {
  return DEFAULT_STRUCTURAL.map((o) => ({ ...o, id: crypto.randomUUID() }));
}

// ---------------------------------------------------------------------------
// Default recommendation map — condition rating → recommended action
// ---------------------------------------------------------------------------

export function getDefaultRecommendationMap(): Record<string, string> {
  return {
    "0": "remove", // Dead
    "1": "remove", // Critical
    "2": "remove", // Poor
    "3": "monitor", // Fair
    "4": "retain", // Good
    "5": "retain", // Excellent
  };
}

// ---------------------------------------------------------------------------
// Canonical ↔ Label lookups
// ---------------------------------------------------------------------------

/** Look up canonical term for a given label. Returns "(custom) {label}" if not found. */
export function labelToCanonical(
  label: string,
  observations: Observation[]
): string {
  const match = observations.find(
    (o) => o.label.toLowerCase() === label.toLowerCase()
  );
  return match ? match.canonical : `(custom) ${label}`;
}

/** Look up label for a given canonical term. Returns the canonical itself if not found. */
export function canonicalToLabel(
  canonical: string,
  observations: Observation[]
): string {
  const match = observations.find((o) => o.canonical === canonical);
  return match ? match.label : canonical;
}

// ---------------------------------------------------------------------------
// Number of locked observations per category (first N cannot be hidden)
// ---------------------------------------------------------------------------

export const LOCKED_OBSERVATION_COUNT = 6;
