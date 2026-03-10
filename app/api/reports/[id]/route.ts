import { prisma } from "@/lib/db";
import { getCurrentArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/analytics";

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
        ...(body.submissionChecklist !== undefined && { submissionChecklist: body.submissionChecklist }),
        ...(body.clientNote !== undefined && { clientNote: body.clientNote }),
        // Simple billing fields
        ...(body.billingAmount !== undefined && { billingAmount: body.billingAmount != null ? parseFloat(body.billingAmount) : null }),
        ...(body.billingLineItems !== undefined && { billingLineItems: body.billingLineItems }),
        ...(body.billingPaymentInstructions !== undefined && { billingPaymentInstructions: body.billingPaymentInstructions }),
        ...(body.billingIncluded !== undefined && { billingIncluded: !!body.billingIncluded }),
        ...(body.billingPaidAt !== undefined && { billingPaidAt: body.billingPaidAt ? new Date(body.billingPaidAt) : null }),
        // Valuation report fields
        ...(body.valuationPurpose !== undefined && { valuationPurpose: body.valuationPurpose }),
        ...(body.valuationBasisStatement !== undefined && { valuationBasisStatement: body.valuationBasisStatement }),
        ...(body.valuationTotalValue !== undefined && { valuationTotalValue: body.valuationTotalValue != null ? parseFloat(body.valuationTotalValue) : null }),
        // Real estate package fields
        ...(body.reListingAddress !== undefined && { reListingAddress: body.reListingAddress }),
        ...(body.reRealtorName !== undefined && { reRealtorName: body.reRealtorName }),
        ...(body.reRealtorEmail !== undefined && { reRealtorEmail: body.reRealtorEmail }),
        ...(body.reRealtorPhone !== undefined && { reRealtorPhone: body.reRealtorPhone }),
        ...(body.reRealtorCompany !== undefined && { reRealtorCompany: body.reRealtorCompany }),
        ...(body.reListingPrice !== undefined && { reListingPrice: body.reListingPrice != null ? parseFloat(body.reListingPrice) : null }),
        ...(body.rePackageNotes !== undefined && { rePackageNotes: body.rePackageNotes }),
      },
    });

    if (body.finalContent !== undefined) {
      const draftWords = (existing.aiDraftContent || "").split(/\s+/).length;
      const editWords = (body.finalContent || "").split(/\s+/).length;
      logEvent("report_edited", existing.arboristId, {
        reportId: id,
        editWordDelta: Math.abs(draftWords - editWords),
      });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arborist = await getCurrentArborist();
    if (!arborist) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
      select: { id: true, arboristId: true, propertyId: true },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    if (report.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ReportVersions cascade automatically via onDelete: Cascade
    await prisma.report.delete({ where: { id } });

    return NextResponse.json({ success: true, propertyId: report.propertyId });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
