import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ordinances = await prisma.municipalOrdinance.findMany({
      orderBy: { cityName: "asc" },
    });

    const parsed = ordinances.map((ord) => ({
      ...ord,
      protectedSpecies: JSON.parse(ord.protectedSpecies),
      mitigationRules: JSON.parse(ord.mitigationRules),
      heritageTreeRules: JSON.parse(ord.heritageTreeRules),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching ordinances:", error);
    return NextResponse.json(
      { error: "Failed to fetch ordinances" },
      { status: 500 }
    );
  }
}
