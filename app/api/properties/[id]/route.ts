import { prisma } from "@/lib/db";
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
        ...(body.city !== undefined && { city: body.city }),
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
      },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
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
