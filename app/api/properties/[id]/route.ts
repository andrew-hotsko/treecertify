import { prisma } from "@/lib/db";
import { getCurrentArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
          include: {
            treePhotos: {
              select: { id: true, url: true, caption: true, category: true, sortOrder: true },
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        reports: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
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

    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...(body.address !== undefined && { address: body.address }),
        ...(body.city !== undefined && {
          city: (body.city || "").trim().replace(/\b\w/g, (c: string) => c.toUpperCase()),
        }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.zip !== undefined && { zip: body.zip }),
        ...(body.county !== undefined && { county: body.county }),
        ...(body.parcelNumber !== undefined && { parcelNumber: body.parcelNumber }),
        ...(body.lat !== undefined && { lat: body.lat }),
        ...(body.lng !== undefined && { lng: body.lng }),
        ...(body.lotSizeSqft !== undefined && { lotSizeSqft: body.lotSizeSqft }),
        ...(body.homeownerName !== undefined && { homeownerName: body.homeownerName }),
        ...(body.homeownerEmail !== undefined && { homeownerEmail: body.homeownerEmail }),
        ...(body.homeownerPhone !== undefined && { homeownerPhone: body.homeownerPhone }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.reportType !== undefined && { reportType: body.reportType }),
        ...(body.projectDescription !== undefined && { projectDescription: body.projectDescription }),
        ...(body.permitNumber !== undefined && { permitNumber: body.permitNumber }),
        ...(body.developerName !== undefined && { developerName: body.developerName }),
        ...(body.architectName !== undefined && { architectName: body.architectName }),
        ...(body.siteObservations !== undefined && { siteObservations: body.siteObservations }),
        ...(body.scopeOfAssignment !== undefined && { scopeOfAssignment: body.scopeOfAssignment }),
        ...(body.neededByDate !== undefined && {
          neededByDate: body.neededByDate ? new Date(body.neededByDate) : null,
        }),
      },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
          include: {
            treePhotos: {
              select: { id: true, url: true, caption: true, category: true, sortOrder: true },
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        reports: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
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

    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true, arboristId: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Reports don't cascade from Property, so delete them manually.
    // ReportVersions cascade from Report automatically.
    // TreeRecord, TreePhoto, TreeAudioNote, PropertyAudioNote all cascade from Property.
    await prisma.$transaction([
      prisma.reportVersion.deleteMany({
        where: { report: { propertyId: id } },
      }),
      prisma.report.deleteMany({
        where: { propertyId: id },
      }),
      prisma.property.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
