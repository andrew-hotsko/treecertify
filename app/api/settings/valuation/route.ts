import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
      return NextResponse.json({ error: "No arborist found" }, { status: 404 });
    }

    const body = await request.json();

    const updateData: Record<string, number | null> = {};

    if ("defaultValuationUnitPrice" in body) {
      const price = body.defaultValuationUnitPrice != null ? parseFloat(body.defaultValuationUnitPrice) : null;
      if (price != null && (isNaN(price) || price < 0)) {
        return NextResponse.json({ error: "Invalid unit price" }, { status: 400 });
      }
      updateData.defaultValuationUnitPrice = price;
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating valuation settings:", error);
    return NextResponse.json(
      { error: "Failed to update valuation settings" },
      { status: 500 }
    );
  }
}
