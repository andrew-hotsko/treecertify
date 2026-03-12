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
    const allowedStringFields = [
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
      "additionalCerts",
      "reportDefaults",
      "billingPaymentInstructions",
      // Customization settings (JSON strings)
      "healthObservations",
      "structuralObservations",
      "commonSpecies",
      "defaultReportType",
      "defaultRecommendationMap",
      "defaultScopeTemplate",
      "pdfCoverAccentColor",
      "shareDefaultMessage",
      "shareThankYouMessage",
      // AI writing preferences
      "aiPreferredTerms",
      "aiAvoidTerms",
      "aiStandardDisclaimer",
      "aiTonePreference",
      "aiCustomInstructions",
    ];

    const updateData: Record<string, string | boolean | number | null> = {};
    for (const field of allowedStringFields) {
      if (field in body) {
        updateData[field] = body[field] ?? null;
      }
    }
    // Boolean fields
    if ("traqCertified" in body) {
      updateData.traqCertified = !!body.traqCertified;
    }
    if ("showBillingOnShare" in body) {
      updateData.showBillingOnShare = !!body.showBillingOnShare;
    }
    if ("pdfShowTraqAppendix" in body) {
      updateData.pdfShowTraqAppendix = !!body.pdfShowTraqAppendix;
    }
    if ("pdfShowCityContacts" in body) {
      updateData.pdfShowCityContacts = !!body.pdfShowCityContacts;
    }
    // Float fields
    if ("defaultReportFee" in body) {
      updateData.defaultReportFee = body.defaultReportFee != null ? parseFloat(body.defaultReportFee) : null;
    }
    if ("defaultValuationUnitPrice" in body) {
      updateData.defaultValuationUnitPrice = body.defaultValuationUnitPrice != null ? parseFloat(body.defaultValuationUnitPrice) : null;
    }
    // Int fields
    if ("photoRequiredCount" in body) {
      const count = parseInt(body.photoRequiredCount, 10);
      if (!isNaN(count) && count >= 1 && count <= 10) {
        updateData.photoRequiredCount = count;
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
