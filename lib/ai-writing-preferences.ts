/**
 * AI Writing Preferences — builds arborist-specific style instructions
 * for injection into report generation prompts.
 */

interface ArboristStyleFields {
  aiTonePreference?: string | null;
  aiPreferredTerms?: string | null;
  aiAvoidTerms?: string | null;
  aiCustomInstructions?: string | null;
}

/**
 * Build prompt instructions from arborist writing preferences.
 * Returns an empty string if no preferences are set.
 */
export function buildArboristStyleInstructions(
  arborist: ArboristStyleFields
): string {
  const parts: string[] = [];

  if (arborist.aiTonePreference) {
    const toneMap: Record<string, string> = {
      formal: "Use formal, professional ISA-standard language.",
      conversational:
        "Use a professional but approachable tone. Write as if explaining to an informed homeowner — still accurate and ISA-standard, but slightly less formal.",
      technical:
        "Use detailed technical language appropriate for a professional audience. Include specific ISA/ANSI terminology and quantitative assessments throughout.",
    };
    const instruction = toneMap[arborist.aiTonePreference];
    if (instruction) {
      parts.push(instruction);
    }
  }

  if (arborist.aiPreferredTerms) {
    try {
      const terms = JSON.parse(arborist.aiPreferredTerms) as string[];
      if (terms.length > 0) {
        parts.push(
          `PREFERRED TERMS: Use these words/phrases when appropriate: ${terms.join(", ")}.`
        );
      }
    } catch {
      // Invalid JSON — skip
    }
  }

  if (arborist.aiAvoidTerms) {
    try {
      const terms = JSON.parse(arborist.aiAvoidTerms) as string[];
      if (terms.length > 0) {
        parts.push(
          `AVOID THESE TERMS: Do not use: ${terms.join(", ")}. Find alternative phrasing.`
        );
      }
    } catch {
      // Invalid JSON — skip
    }
  }

  if (arborist.aiCustomInstructions) {
    parts.push(
      `ADDITIONAL STYLE INSTRUCTIONS: ${arborist.aiCustomInstructions}`
    );
  }

  return parts.length > 0
    ? `\n\nARBORIST WRITING PREFERENCES:\n${parts.join("\n")}`
    : "";
}
