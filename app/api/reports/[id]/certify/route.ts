import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error certifying report:", error);
    return NextResponse.json(
      { error: "Failed to certify report" },
      { status: 500 }
    );
  }
}
