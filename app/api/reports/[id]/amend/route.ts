/**
 * POST /api/reports/[id]/amend
 * Issues an amendment on a certified report — reopens for editing while
 * preserving the share link and version history.
 */
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    if (!body.reason || !body.reason.trim()) {
      return NextResponse.json(
        { error: "Amendment reason is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (existing.status !== "certified" && existing.status !== "filed") {
      return NextResponse.json(
        { error: "Only certified or submitted reports can be amended" },
        { status: 400 }
      );
    }

    const newAmendmentNumber = existing.amendmentNumber + 1;

    // Create a pre-amendment version snapshot
    const currentContent = existing.finalContent || existing.aiDraftContent;
    if (currentContent) {
      await prisma.reportVersion.create({
        data: {
          reportId: id,
          content: currentContent,
          label: `Pre-amendment #${newAmendmentNumber}`,
        },
      });
    }

    // Update the report
    const report = await prisma.report.update({
      where: { id },
      data: {
        status: "amendment_in_progress",
        amendmentReason: body.reason.trim(),
        amendmentNumber: newAmendmentNumber,
        // Preserve original certification date on first amendment
        ...(existing.amendmentNumber === 0 && existing.certifiedAt
          ? { originalCertifiedAt: existing.certifiedAt }
          : {}),
        // Clear certification — will be re-set on re-certification
        certifiedAt: null,
        eSignatureText: null,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error issuing amendment:", error);
    return NextResponse.json(
      { error: "Failed to issue amendment" },
      { status: 500 }
    );
  }
}
