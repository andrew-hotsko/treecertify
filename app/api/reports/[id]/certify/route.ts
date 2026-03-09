import { prisma } from "@/lib/db";
import { validateReportForCertification } from "@/lib/report-validation";
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/analytics";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body.eSignatureText) {
      return NextResponse.json(
        { error: "Missing required field: eSignatureText" },
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

    // Server-side validation gate — block if any check fails
    const validation = await validateReportForCertification(id);
    if (validation.hasFailures) {
      return NextResponse.json(
        {
          error: "Report cannot be certified — resolve required items first",
          validation,
        },
        { status: 400 }
      );
    }

    // Snapshot content before certification
    const certContent = existing.finalContent || existing.aiDraftContent;
    const isAmendment = existing.status === "amendment_in_progress";
    if (certContent) {
      await prisma.reportVersion.create({
        data: {
          reportId: id,
          content: certContent,
          label: isAmendment
            ? `Amendment #${existing.amendmentNumber} — Certified`
            : "Pre-certification",
        },
      });
    }

    const now = new Date();

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: body.eSignatureText,
        certifiedAt: now,
        status: "certified",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "certified" },
    });

    const treeCount = await prisma.treeRecord.count({
      where: { propertyId: report.propertyId },
    });
    const property = await prisma.property.findUnique({
      where: { id: report.propertyId },
      select: { createdAt: true },
    });
    logEvent("report_certified", existing.arboristId, {
      reportId: id,
      reportType: existing.reportType,
      treeCount,
      minutesToCertify: property
        ? Math.round((Date.now() - new Date(property.createdAt).getTime()) / 60000)
        : null,
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error certifying report:", error);
    return NextResponse.json(
      { error: "Failed to certify report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (existing.status !== "certified") {
      return NextResponse.json(
        { error: "Report is not certified" },
        { status: 400 }
      );
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: null,
        certifiedAt: null,
        status: "review",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "assessed" },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error uncertifying report:", error);
    return NextResponse.json(
      { error: "Failed to uncertify report" },
      { status: 500 }
    );
  }
}
