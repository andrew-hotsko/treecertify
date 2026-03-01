import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const properties = await prisma.property.findMany({
      where: { arboristId: arborist.id },
      include: {
        trees: true,
        reports: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    // Add tree count to each property
    const propertiesWithCount = properties.map((property) => ({
      ...property,
      _count: { trees: property.trees.length },
    }));

    return NextResponse.json(propertiesWithCount);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.address || !body.city) {
      return NextResponse.json(
        { error: "Missing required fields: address, city" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        arboristId: arborist.id,
        address: body.address,
        city: body.city,
        county: body.county ?? "San Mateo",
        state: body.state ?? "CA",
        zip: body.zip ?? null,
        parcelNumber: body.parcelNumber ?? null,
        lat: body.lat ?? null,
        lng: body.lng ?? null,
        lotSizeSqft: body.lotSizeSqft ?? null,
        homeownerName: body.homeownerName ?? null,
        homeownerEmail: body.homeownerEmail ?? null,
        homeownerPhone: body.homeownerPhone ?? null,
        reportType: body.reportType ?? "health_assessment",
        projectDescription: body.projectDescription ?? null,
        permitNumber: body.permitNumber ?? null,
        developerName: body.developerName ?? null,
        architectName: body.architectName ?? null,
        neededByDate: body.neededByDate ? new Date(body.neededByDate) : null,
      },
      include: {
        trees: true,
        reports: true,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
