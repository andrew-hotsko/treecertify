/**
 * Shared observation constants and utilities.
 *
 * Used by both tree-side-panel.tsx (desktop) and mobile-field-mode.tsx (mobile).
 * Extracted to avoid duplication.
 */

// ---------------------------------------------------------------------------
// ISA Standard Observation Checklists
// ---------------------------------------------------------------------------

export const HEALTH_OBSERVATIONS = [
  "Chlorosis (yellowing)",
  "Crown dieback",
  "Decay / fungal fruiting bodies",
  "Pest / insect damage",
  "Girdling roots",
  "Poor vigor / sparse canopy",
  "Leaf scorch / burn",
  "Crown thinning",
  "Epicormic sprouting",
  "Root damage / cut roots",
  "Cankers / lesions",
  "No significant concerns",
];

export const STRUCTURAL_OBSERVATIONS = [
  "Codominant stems",
  "Included bark",
  "Cavity / hollow",
  "Lean (note degree if significant)",
  "Root plate heaving / lifting",
  "Asymmetric crown",
  "Deadwood in crown",
  "Cracks / splits",
  "Weak branch attachments",
  "Trunk wound / damage",
  "Hangers / broken branches",
  "No significant concerns",
];

// ---------------------------------------------------------------------------
// Note format helpers — "Observed: X, Y\n\nfree text" prefix format
// ---------------------------------------------------------------------------

/** Extract checked items from "Observed: X, Y" prefix line */
export function parseObservedLine(notes: string): string[] {
  const match = notes.match(/^Observed:\s*(.+?)(\n|$)/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Get free text portion after the "Observed:" prefix */
export function extractFreeText(notes: string): string {
  return notes.replace(/^Observed:\s*.+?(\n\n|\n|$)/, "").trim();
}

/** Rebuild notes with "Observed:" prefix + free text */
export function buildNotesWithObserved(
  checks: string[],
  freeText: string
): string {
  const prefix = checks.length > 0 ? `Observed: ${checks.join(", ")}` : "";
  const trimmed = freeText.trim();
  if (prefix && trimmed) return `${prefix}\n\n${trimmed}`;
  if (prefix) return prefix;
  return trimmed;
}

// ---------------------------------------------------------------------------
// Action options
// ---------------------------------------------------------------------------

export const ACTION_OPTIONS = [
  { value: "retain", label: "Retain", color: "green" },
  { value: "remove", label: "Remove", color: "red" },
  { value: "prune", label: "Prune", color: "amber" },
  { value: "monitor", label: "Monitor", color: "blue" },
];

// ---------------------------------------------------------------------------
// Condition labels and colors
// ---------------------------------------------------------------------------

export const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

export const CONDITION_BUTTON_COLORS: Record<
  number,
  { selected: string; dot: string }
> = {
  0: {
    selected: "border-gray-700 bg-gray-100 text-gray-800",
    dot: "bg-gray-700",
  },
  1: {
    selected: "border-red-500 bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
  2: {
    selected: "border-orange-500 bg-orange-50 text-orange-700",
    dot: "bg-orange-500",
  },
  3: {
    selected: "border-amber-500 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  4: {
    selected: "border-emerald-500 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  5: {
    selected: "border-green-600 bg-green-50 text-green-700",
    dot: "bg-green-600",
  },
};
