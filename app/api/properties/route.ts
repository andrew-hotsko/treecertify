import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/analytics";

function defaultScope(reportType: string, address: string, city: string): string {
  const location = `${address}, ${city}`;
  switch (reportType) {
    case "removal_permit":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of the subject tree(s) at ${location} to evaluate health, structural condition, and risk, and to provide professional recommendations regarding tree removal permit application per the ${city} municipal tree ordinance.`;
    case "health_assessment":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of the subject tree(s) at ${location} to evaluate overall health, structural integrity, and vitality, and to provide maintenance recommendations.`;
    case "construction_encroachment":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of the subject tree(s) at ${location} to evaluate potential impacts from proposed construction activity, assess tree protection zone encroachment, and provide tree preservation recommendations per ANSI A300 Part 5 standards.`;
    case "tree_valuation":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices and appraise the subject tree(s) at ${location} using the CTLA Trunk Formula Method (10th Edition) to determine replacement value for insurance, litigation, or municipal purposes.`;
    case "real_estate_package":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices and appraise the subject tree(s) at ${location} to evaluate health, structural condition, and appraised value using the CTLA Trunk Formula Method (10th Edition) for the purpose of a real estate transaction.`;
    default:
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of the subject tree(s) at ${location} to evaluate health, structural condition, and provide professional arborist recommendations.`;
  }
}

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
        city: (body.city || "").trim().replace(/\b\w/g, (c: string) => c.toUpperCase()),
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
        scopeOfAssignment:
          body.scopeOfAssignment ??
          defaultScope(
            body.reportType ?? "health_assessment",
            body.address,
            (body.city || "").trim().replace(/\b\w/g, (c: string) => c.toUpperCase())
          ),
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

    logEvent("property_created", arborist.id, {
      city: property.city,
      reportType: property.reportType,
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
