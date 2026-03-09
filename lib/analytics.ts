import { prisma } from "./db";

export type EventType =
  | "onboarding_started"
  | "onboarding_completed"
  | "sample_report_viewed"
  | "property_created"
  | "tree_added"
  | "tree_saved"
  | "report_generated"
  | "report_edited"
  | "report_certified"
  | "share_link_opened"
  | "pdf_downloaded"
  | "word_downloaded"
  | "settings_updated"
  | "feedback_submitted";

export async function logEvent(
  eventType: EventType,
  arboristId?: string | null,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        arboristId: arboristId || null,
        eventType,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    // Never let analytics logging break the main flow
    console.error("Analytics event logging failed:", error);
  }
}
