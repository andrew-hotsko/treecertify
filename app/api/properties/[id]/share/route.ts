import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arborist = await requireArborist();
    const { id } = params;

    // Verify property belongs to this arborist
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.arboristId !== arborist.id) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    // If already has a share token, return it
    if (property.shareToken) {
      return NextResponse.json({ shareToken: property.shareToken });
    }

    // Generate a new share token
    const shareToken = crypto.randomUUID().slice(0, 12);

    await prisma.property.update({
      where: { id },
      data: { shareToken },
    });

    return NextResponse.json({ shareToken });
  } catch (error) {
    console.error("Error creating share link:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arborist = await requireArborist();
    const { id } = params;

    // Verify property belongs to this arborist
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.arboristId !== arborist.id) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    await prisma.property.update({
      where: { id },
      data: { shareToken: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking share link:", error);
    return NextResponse.json(
      { error: "Failed to revoke share link" },
      { status: 500 }
    );
  }
}
