import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { requireArborist } from "@/lib/auth";
import { logApiUsage } from "@/lib/api-usage";

export async function POST(req: Request) {
  const arborist = await requireArborist();

  const { text } = await req.json();
  if (!text?.trim()) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are an assistant that extracts structured tree assessment data from an arborist's spoken field notes. Extract ONLY the fields that are explicitly mentioned. Return a JSON object with these possible fields:

- speciesCommon (string): Common name of the tree species
- speciesScientific (string): Scientific name if mentioned
- dbhInches (number): Diameter at breast height in inches
- heightFt (number): Height in feet
- canopySpreadFt (number): Canopy spread in feet
- conditionRating (number 0-5): 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent
- healthNotes (string): Any health observations mentioned
- structuralNotes (string): Any structural observations mentioned
- recommendedAction (string): One of "retain", "remove", "prune", "monitor" - only if explicitly stated
- tagNumber (string): Tag number if mentioned

Only include fields that were clearly stated. Do not guess or infer values that weren't mentioned. Return ONLY valid JSON, no explanation.`,
    messages: [{ role: "user", content: text }],
  });

  // Log API usage (fire-and-forget)
  logApiUsage({
    arboristId: arborist.id,
    provider: "anthropic",
    endpoint: "parse-audio",
    model: "claude-sonnet-4-20250514",
    inputTokens: response.usage?.input_tokens ?? 0,
    outputTokens: response.usage?.output_tokens ?? 0,
  });

  try {
    const content = response.content[0];
    if (content.type === "text") {
      // Parse JSON, stripping any markdown fences
      let jsonStr = content.text.trim();
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr
          .replace(/^```(?:json)?\n?/, "")
          .replace(/\n?```$/, "");
      }
      const parsed = JSON.parse(jsonStr);
      return NextResponse.json({ parsed, rawText: text });
    }
  } catch {
    // If parsing fails, return the raw text as healthNotes fallback
    return NextResponse.json({ parsed: { healthNotes: text }, rawText: text });
  }

  return NextResponse.json({ parsed: { healthNotes: text }, rawText: text });
}
