/**
 * Per-section AI rewrite — rewrites a single report section
 * based on arborist instructions.
 *
 * POST /api/ai/rewrite-section
 * Body: { reportId, sectionTitle, sectionContent, instruction }
 * Returns: { content: string } — the rewritten section markdown
 */
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { buildArboristStyleInstructions } from "@/lib/ai-writing-preferences";
import { getMasterVoiceInstructions } from "@/lib/report-templates";
import Anthropic from "@anthropic-ai/sdk";
import { logApiUsage } from "@/lib/api-usage";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json({ error: "No arborist found" }, { status: 404 });
    }

    const body = await request.json();
    if (!body.reportId || !body.sectionTitle || !body.sectionContent || !body.instruction) {
      return NextResponse.json(
        { error: "Missing required fields: reportId, sectionTitle, sectionContent, instruction" },
        { status: 400 }
      );
    }

    // Load report for context
    const report = await prisma.report.findUnique({
      where: { id: body.reportId },
      include: { property: true },
    });
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      // Mock fallback — return original with a note
      return NextResponse.json({
        content: body.sectionContent + "\n\n*(AI rewrite unavailable — ANTHROPIC_API_KEY not set)*",
      });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    // Build arborist writing preferences
    const styleInstructions = buildArboristStyleInstructions(arborist);

    const systemPrompt = `You are editing a section of an ISA arborist ${reportTypeLabel} report. Rewrite the following section based on the user's instruction. Maintain ISA professional standards and keep factual claims accurate. Adjust tone, structure, or detail level per the instruction.

${getMasterVoiceInstructions(report.reportType)}
${styleInstructions}

RULES:
- Return ONLY the rewritten section markdown — no explanations, no preamble
- Keep the same heading level and title (e.g., ## Section Title) at the top
- Do not add sections that weren't in the original
- Do not remove critical factual information unless instructed
- Maintain professional ISA arborist language throughout`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `SECTION TITLE: ${body.sectionTitle}

CURRENT SECTION CONTENT:
${body.sectionContent}

INSTRUCTION: ${body.instruction}

Rewrite this section following the instruction above. Return only the rewritten markdown.`,
        },
      ],
    });

    const generatedText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Log API usage (fire-and-forget)
    logApiUsage({
      arboristId: arborist.id,
      propertyId: report.propertyId,
      reportId: report.id,
      provider: "anthropic",
      endpoint: "rewrite-section",
      model: "claude-sonnet-4-20250514",
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
    });

    return NextResponse.json({ content: generatedText });
  } catch (error) {
    console.error("Error rewriting section:", error);
    return NextResponse.json(
      { error: "Failed to rewrite section" },
      { status: 500 }
    );
  }
}
