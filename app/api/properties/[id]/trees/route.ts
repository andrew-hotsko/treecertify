import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const trees = await prisma.treeRecord.findMany({
      where: { propertyId: id },
      orderBy: { treeNumber: "asc" },
    });

    return NextResponse.json(trees);
  } catch (error) {
    console.error("Error fetching trees:", error);
    return NextResponse.json(
      { error: "Failed to fetch trees" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Auto-calculate treeNumber: max existing + 1, or 1 if none exist
    const maxTree = await prisma.treeRecord.findFirst({
      where: { propertyId: id },
      orderBy: { treeNumber: "desc" },
      select: { treeNumber: true },
    });

    const nextTreeNumber = maxTree ? maxTree.treeNumber + 1 : 1;

    const tree = await prisma.treeRecord.create({
      data: {
        propertyId: id,
        treeNumber: nextTreeNumber,
        pinLat: body.pinLat ?? null,
        pinLng: body.pinLng ?? null,
        speciesCommon: body.speciesCommon ?? "",
        speciesScientific: body.speciesScientific ?? "",
        dbhInches: body.dbhInches ?? 0,
        heightFt: body.heightFt ?? null,
        canopySpreadFt: body.canopySpreadFt ?? null,
        conditionRating: body.conditionRating ?? 0,
        healthNotes: body.healthNotes ?? null,
        structuralNotes: body.structuralNotes ?? null,
        isProtected: body.isProtected ?? false,
        protectionReason: body.protectionReason ?? null,
        recommendedAction: body.recommendedAction ?? "retain",
        mitigationRequired: body.mitigationRequired ?? null,
        typeSpecificData: body.typeSpecificData ?? null,
      },
    });

    return NextResponse.json(tree, { status: 201 });
  } catch (error) {
    console.error("Error creating tree:", error);
    return NextResponse.json(
      { error: "Failed to create tree" },
      { status: 500 }
    );
  }
}
