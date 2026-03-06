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
    const { healthObservations, structuralObservations } = body;

    // Validate arrays
    if (!Array.isArray(healthObservations) || !Array.isArray(structuralObservations)) {
      return NextResponse.json(
        { error: "healthObservations and structuralObservations must be arrays" },
        { status: 400 }
      );
    }

    // Validate each item has required fields
    const validateObs = (obs: unknown[]): boolean => {
      return obs.every(
        (o: unknown) =>
          typeof o === "object" &&
          o !== null &&
          typeof (o as Record<string, unknown>).id === "string" &&
          typeof (o as Record<string, unknown>).label === "string" &&
          typeof (o as Record<string, unknown>).canonical === "string" &&
          typeof (o as Record<string, unknown>).enabled === "boolean" &&
          typeof (o as Record<string, unknown>).builtIn === "boolean"
      );
    };

    if (!validateObs(healthObservations) || !validateObs(structuralObservations)) {
      return NextResponse.json(
        { error: "Each observation must have id, label, canonical, enabled, and builtIn" },
        { status: 400 }
      );
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: {
        healthObservations: JSON.stringify(healthObservations),
        structuralObservations: JSON.stringify(structuralObservations),
      },
    });

    return NextResponse.json({
      healthObservations: updated.healthObservations,
      structuralObservations: updated.structuralObservations,
    });
  } catch (error) {
    console.error("Error saving observations:", error);
    return NextResponse.json(
      { error: "Failed to save observations" },
      { status: 500 }
    );
  }
}
