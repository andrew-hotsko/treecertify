import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // Snapshot previous content as a version before overwriting
    if (body.finalContent !== undefined) {
      const previousContent = existing.finalContent || existing.aiDraftContent;
      if (previousContent && previousContent !== body.finalContent) {
        await prisma.reportVersion.create({
          data: {
            reportId: id,
            content: previousContent,
            label: "Edit",
          },
        });
      }
    }

    // Validate permitStatus if provided
    const VALID_PERMIT_STATUSES = [null, "submitted", "under_review", "approved", "denied", "revision_requested"];
    if (body.permitStatus !== undefined && !VALID_PERMIT_STATUSES.includes(body.permitStatus)) {
      return NextResponse.json({ error: "Invalid permit status" }, { status: 400 });
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        ...(body.finalContent !== undefined && { finalContent: body.finalContent }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.eSignatureText !== undefined && { eSignatureText: body.eSignatureText }),
        ...(body.reportOptions !== undefined && { reportOptions: body.reportOptions }),
        // Permit lifecycle fields
        ...(body.permitStatus !== undefined && { permitStatus: body.permitStatus }),
        ...(body.submittedAt !== undefined && { submittedAt: body.submittedAt }),
        ...(body.submittedTo !== undefined && { submittedTo: body.submittedTo }),
        ...(body.reviewerName !== undefined && { reviewerName: body.reviewerName }),
        ...(body.reviewerNotes !== undefined && { reviewerNotes: body.reviewerNotes }),
        ...(body.conditionsOfApproval !== undefined && { conditionsOfApproval: body.conditionsOfApproval }),
        ...(body.denialReason !== undefined && { denialReason: body.denialReason }),
        ...(body.approvedAt !== undefined && { approvedAt: body.approvedAt }),
        ...(body.permitExpiresAt !== undefined && { permitExpiresAt: body.permitExpiresAt }),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
