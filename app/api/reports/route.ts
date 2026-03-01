import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function getDemoArboristId(): Promise<string> {
  const arborist = await prisma.arborist.findFirst();
  if (!arborist) {
    throw new Error("No arborist found in the database");
  }
  return arborist.id;
}

export async function POST(request: NextRequest) {
  try {
    const arboristId = await getDemoArboristId();
    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId,
        reportType: body.reportType,
        aiDraftContent: body.aiDraftContent ?? null,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
