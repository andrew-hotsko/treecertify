import { prisma } from "@/lib/db";
import { getCurrentArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const arborist = await getCurrentArborist();
    if (!arborist) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { commonSpecies } = body;

    if (!Array.isArray(commonSpecies)) {
      return NextResponse.json(
        { error: "commonSpecies must be an array" },
        { status: 400 }
      );
    }

    if (commonSpecies.length > 30) {
      return NextResponse.json(
        { error: "Maximum 30 species presets allowed" },
        { status: 400 }
      );
    }

    if (!commonSpecies.every((s: unknown) => typeof s === "string")) {
      return NextResponse.json(
        { error: "Each species must be a string" },
        { status: 400 }
      );
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: {
        commonSpecies: JSON.stringify(commonSpecies),
      },
    });

    return NextResponse.json({
      commonSpecies: updated.commonSpecies,
    });
  } catch (error) {
    console.error("Error saving species presets:", error);
    return NextResponse.json(
      { error: "Failed to save species presets" },
      { status: 500 }
    );
  }
}
