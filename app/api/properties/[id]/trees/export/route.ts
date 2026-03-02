import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

/** Escape a value for CSV: wrap in double quotes if it contains commas, quotes, or newlines. */
function csvEscape(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true, address: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const trees = await prisma.treeRecord.findMany({
      where: { propertyId: id },
      orderBy: { treeNumber: "asc" },
    });

    const headers = [
      "Tree #",
      "Tag #",
      "Species (Common)",
      "Species (Scientific)",
      "DBH (inches)",
      "Height (ft)",
      "Canopy Spread (ft)",
      "Condition Rating",
      "Condition Label",
      "Health Notes",
      "Structural Notes",
      "Recommended Action",
      "Protected",
      "Protection Reason",
    ];

    const rows = trees.map((tree) => [
      csvEscape(tree.treeNumber),
      csvEscape(tree.tagNumber),
      csvEscape(tree.speciesCommon),
      csvEscape(tree.speciesScientific),
      csvEscape(tree.dbhInches),
      csvEscape(tree.heightFt),
      csvEscape(tree.canopySpreadFt),
      csvEscape(tree.conditionRating),
      csvEscape(CONDITION_LABELS[tree.conditionRating] ?? ""),
      csvEscape(tree.healthNotes),
      csvEscape(tree.structuralNotes),
      csvEscape(tree.recommendedAction),
      csvEscape(tree.isProtected ? "Yes" : "No"),
      csvEscape(tree.protectionReason),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    // Sanitize address for filename
    const safeAddress = property.address
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 50);
    const filename = `tree_inventory_${safeAddress}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting trees:", error);
    return NextResponse.json(
      { error: "Failed to export trees" },
      { status: 500 }
    );
  }
}
