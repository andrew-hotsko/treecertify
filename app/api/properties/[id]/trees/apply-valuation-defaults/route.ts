import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { DEFAULT_UNIT_PRICE } from "@/lib/valuation";
import { getDefaultSpeciesRating } from "@/lib/species-ratings";

/**
 * POST /api/properties/[id]/trees/apply-valuation-defaults
 *
 * Applies default valuation settings (unit price, site rating, contribution
 * rating) to all trees on this property. Only fills in fields that are
 * currently null — does NOT overwrite values the arborist already set.
 *
 * Body (all optional):
 *   unitPrice         — default unit price to apply
 *   siteRating        — default site rating (0-100)
 *   contributionRating — default contribution rating (0-100)
 *   autoSpecies       — if true, also auto-fill species rating from lookup
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: propertyId } = params;

    // Verify property belongs to this arborist
    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property || property.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const unitPrice = body.unitPrice ?? arborist.defaultValuationUnitPrice ?? DEFAULT_UNIT_PRICE;
    const siteRating = body.siteRating ?? 80;
    const contributionRating = body.contributionRating ?? 80;
    const autoSpecies = body.autoSpecies !== false; // default true

    // Get all trees for this property
    const trees = await prisma.treeRecord.findMany({
      where: { propertyId },
      select: {
        id: true,
        speciesCommon: true,
        valuationUnitPrice: true,
        valuationSiteRating: true,
        valuationContributionRating: true,
        valuationSpeciesRating: true,
        valuationHealthRating: true,
        valuationStructureRating: true,
        valuationFormRating: true,
      },
    });

    let updated = 0;

    for (const tree of trees) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: Record<string, any> = {};

      // Only fill nulls
      if (tree.valuationUnitPrice == null) data.valuationUnitPrice = unitPrice;
      if (tree.valuationSiteRating == null) data.valuationSiteRating = siteRating;
      if (tree.valuationContributionRating == null) data.valuationContributionRating = contributionRating;
      if (tree.valuationHealthRating == null) data.valuationHealthRating = 75;
      if (tree.valuationStructureRating == null) data.valuationStructureRating = 75;
      if (tree.valuationFormRating == null) data.valuationFormRating = 75;

      // Auto-fill species rating from lookup
      if (autoSpecies && tree.valuationSpeciesRating == null && tree.speciesCommon) {
        data.valuationSpeciesRating = getDefaultSpeciesRating(tree.speciesCommon);
      } else if (tree.valuationSpeciesRating == null) {
        data.valuationSpeciesRating = 60;
      }

      if (Object.keys(data).length > 0) {
        await prisma.treeRecord.update({
          where: { id: tree.id },
          data,
        });
        updated++;
      }
    }

    return NextResponse.json({
      updated,
      total: trees.length,
      defaults: { unitPrice, siteRating, contributionRating },
    });
  } catch (error) {
    console.error("Error applying valuation defaults:", error);
    return NextResponse.json(
      { error: "Failed to apply defaults" },
      { status: 500 }
    );
  }
}
