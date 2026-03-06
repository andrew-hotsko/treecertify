import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const tree = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!tree) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching tree:", error);
    return NextResponse.json(
      { error: "Failed to fetch tree" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;
    const body = await request.json();

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    const tree = await prisma.treeRecord.update({
      where: { id: treeId },
      data: {
        ...(body.pinLat !== undefined && { pinLat: body.pinLat }),
        ...(body.pinLng !== undefined && { pinLng: body.pinLng }),
        ...(body.speciesCommon !== undefined && { speciesCommon: body.speciesCommon }),
        ...(body.speciesScientific !== undefined && { speciesScientific: body.speciesScientific }),
        ...(body.dbhInches !== undefined && { dbhInches: body.dbhInches }),
        ...(body.heightFt !== undefined && { heightFt: body.heightFt }),
        ...(body.canopySpreadFt !== undefined && { canopySpreadFt: body.canopySpreadFt }),
        ...(body.conditionRating !== undefined && { conditionRating: body.conditionRating }),
        ...(body.healthNotes !== undefined && { healthNotes: body.healthNotes }),
        ...(body.structuralNotes !== undefined && { structuralNotes: body.structuralNotes }),
        ...(body.isProtected !== undefined && { isProtected: body.isProtected }),
        ...(body.protectionReason !== undefined && { protectionReason: body.protectionReason }),
        ...(body.recommendedAction !== undefined && { recommendedAction: body.recommendedAction }),
        ...(body.mitigationRequired !== undefined && { mitigationRequired: body.mitigationRequired }),
        ...(body.photos !== undefined && { photos: body.photos }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.tagNumber !== undefined && { tagNumber: body.tagNumber }),
        ...(body.typeSpecificData !== undefined && { typeSpecificData: body.typeSpecificData }),
        ...(body.healthObservationCanonical !== undefined && { healthObservationCanonical: body.healthObservationCanonical }),
        ...(body.structuralObservationCanonical !== undefined && { structuralObservationCanonical: body.structuralObservationCanonical }),
        ...(body.valuationUnitPrice !== undefined && { valuationUnitPrice: body.valuationUnitPrice }),
        ...(body.valuationHealthRating !== undefined && { valuationHealthRating: body.valuationHealthRating }),
        ...(body.valuationStructureRating !== undefined && { valuationStructureRating: body.valuationStructureRating }),
        ...(body.valuationFormRating !== undefined && { valuationFormRating: body.valuationFormRating }),
        ...(body.valuationConditionRating !== undefined && { valuationConditionRating: body.valuationConditionRating }),
        ...(body.valuationSpeciesRating !== undefined && { valuationSpeciesRating: body.valuationSpeciesRating }),
        ...(body.valuationSiteRating !== undefined && { valuationSiteRating: body.valuationSiteRating }),
        ...(body.valuationContributionRating !== undefined && { valuationContributionRating: body.valuationContributionRating }),
        ...(body.valuationLocationRating !== undefined && { valuationLocationRating: body.valuationLocationRating }),
        ...(body.valuationBasicValue !== undefined && { valuationBasicValue: body.valuationBasicValue }),
        ...(body.valuationAppraisedValue !== undefined && { valuationAppraisedValue: body.valuationAppraisedValue }),
        ...(body.valuationNotes !== undefined && { valuationNotes: body.valuationNotes }),
      },
    });

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error updating tree:", error);
    return NextResponse.json(
      { error: "Failed to update tree" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    await prisma.treeRecord.delete({
      where: { id: treeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tree:", error);
    return NextResponse.json(
      { error: "Failed to delete tree" },
      { status: 500 }
    );
  }
}
