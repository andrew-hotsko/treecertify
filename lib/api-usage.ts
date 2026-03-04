import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Pricing constants (per-unit rates as of 2026-03)
// ---------------------------------------------------------------------------

export const PRICING = {
  anthropic: {
    "claude-sonnet-4-20250514": {
      inputPerMillion: 3.0,
      outputPerMillion: 15.0,
    },
  },
  openai: {
    "whisper-1": {
      perMinute: 0.006,
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Cost estimation helpers
// ---------------------------------------------------------------------------

export function estimateAnthropicCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const rates =
    (PRICING.anthropic as Record<string, { inputPerMillion: number; outputPerMillion: number }>)[
      model
    ] ?? PRICING.anthropic["claude-sonnet-4-20250514"];

  return (
    (inputTokens / 1_000_000) * rates.inputPerMillion +
    (outputTokens / 1_000_000) * rates.outputPerMillion
  );
}

export function estimateWhisperCost(durationSeconds: number): number {
  const minutes = durationSeconds / 60;
  return minutes * PRICING.openai["whisper-1"].perMinute;
}

// ---------------------------------------------------------------------------
// Fire-and-forget logger
// ---------------------------------------------------------------------------

export interface LogApiUsageParams {
  arboristId: string;
  propertyId?: string | null;
  reportId?: string | null;
  provider: "anthropic" | "openai";
  endpoint: string; // "generate-report", "parse-audio", "transcribe"
  model: string;
  inputTokens?: number;
  outputTokens?: number;
  audioDuration?: number | null; // seconds
}

export function logApiUsage(params: LogApiUsageParams): void {
  const {
    arboristId,
    propertyId,
    reportId,
    provider,
    endpoint,
    model,
    inputTokens = 0,
    outputTokens = 0,
    audioDuration,
  } = params;

  let estimatedCostUsd = 0;

  if (provider === "anthropic") {
    estimatedCostUsd = estimateAnthropicCost(model, inputTokens, outputTokens);
  } else if (provider === "openai" && audioDuration != null) {
    estimatedCostUsd = estimateWhisperCost(audioDuration);
  }

  // Fire-and-forget — don't await, don't block the response
  prisma.apiUsageLog
    .create({
      data: {
        arboristId,
        propertyId: propertyId ?? null,
        reportId: reportId ?? null,
        provider,
        endpoint,
        model,
        inputTokens,
        outputTokens,
        audioDuration: audioDuration ?? null,
        estimatedCostUsd,
      },
    })
    .catch((err) => {
      console.error("Failed to log API usage:", err);
    });
}
