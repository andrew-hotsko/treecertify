import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// GET /api/arborist/profile — fetch the current arborist profile
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
    return NextResponse.json(arborist);
  } catch (error) {
    console.error("Error fetching arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

// PUT /api/arborist/profile — update arborist profile fields
export async function PUT(request: NextRequest) {
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

    // Whitelist of updatable fields
    const allowedFields = [
      "name",
      "email",
      "isaCertificationNum",
      "companyName",
      "phone",
      "companyAddress",
      "companyPhone",
      "companyEmail",
      "companyWebsite",
      "licenseNumbers",
      "signatureName",
    ];

    const updateData: Record<string, string | null> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field] ?? null;
      }
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
