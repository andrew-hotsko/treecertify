import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Profile already exists" },
      { status: 409 }
    );
  }

  const body = await request.json();

  if (!body.name || !body.isaCertificationNum || !body.isaExpirationDate) {
    return NextResponse.json(
      { error: "Missing required fields: name, isaCertificationNum, isaExpirationDate" },
      { status: 400 }
    );
  }

  const arborist = await prisma.arborist.create({
    data: {
      clerkUserId: userId,
      name: body.name,
      email: body.email || "",
      isaCertificationNum: body.isaCertificationNum,
      isaExpirationDate: new Date(body.isaExpirationDate),
      companyName: body.companyName || null,
      phone: body.phone || null,
      licenseNumbers: body.licenseNumbers || null,
      signatureName: body.signatureName || null,
      companyAddress: body.companyAddress || null,
      companyPhone: body.companyPhone || null,
      companyEmail: body.companyEmail || null,
      companyWebsite: body.companyWebsite || null,
    },
  });

  // Create a sample property so the dashboard isn't empty
  try {
    await prisma.property.create({
      data: {
        arboristId: arborist.id,
        address: "123 Sample Street",
        city: "Palo Alto",
        state: "CA",
        county: "Santa Clara",
        reportType: "health_assessment",
        lat: 37.4419,
        lng: -122.143,
        scopeOfAssignment:
          "This is a sample property to demonstrate TreeCertify's workflow. You can explore the trees, generate a report, and see how the certification process works. Feel free to delete this property when you're ready.",
        siteObservations:
          "The property features mature native and ornamental trees in a residential setting. The trees are generally well-maintained with adequate spacing and good soil conditions.",
        trees: {
          create: [
            {
              treeNumber: 1,
              speciesCommon: "Coast Live Oak",
              speciesScientific: "Quercus agrifolia",
              dbhInches: 24,
              heightFt: 35,
              canopySpreadFt: 40,
              conditionRating: 4,
              healthNotes:
                "Full, well-distributed crown with dense foliage. No visible signs of disease or pest infestation. Minor deadwood present in interior canopy, typical for species.",
              structuralNotes:
                "Strong central leader with well-spaced scaffold branches. No significant included bark or co-dominant stems. Root flare visible and stable.",
              isProtected: true,
              protectionReason:
                "Native oak exceeding 12-inch DBH threshold per Palo Alto Municipal Code Section 8.10.",
              recommendedAction: "retain",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "improbable",
                likelihoodOfImpact: "low",
                consequences: "minor",
                overallRiskRating: "low",
                targetDescription:
                  "Pedestrian walkway and residential structure within fall zone",
                maintenanceItems: ["deadwood removal", "crown cleaning"],
                maintenancePriority: "low",
                maintenanceTimeline: "Within 12 months",
              }),
            },
            {
              treeNumber: 2,
              speciesCommon: "Monterey Pine",
              speciesScientific: "Pinus radiata",
              dbhInches: 18,
              heightFt: 45,
              canopySpreadFt: 25,
              conditionRating: 2,
              healthNotes:
                "Significant crown thinning with approximately 40% dieback in upper canopy. Pine pitch canker (Fusarium circinatum) symptoms observed including resinous lesions on branches. Bark beetle exit holes noted on lower trunk.",
              structuralNotes:
                "Moderate lean toward adjacent structure (approximately 10 degrees). Two co-dominant stems with included bark at 12-foot height. Evidence of prior branch failure on north side.",
              isProtected: false,
              protectionReason: null,
              recommendedAction: "remove",
              mitigationRequired:
                "No mitigation required — tree does not meet protection thresholds.",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "probable",
                likelihoodOfImpact: "medium",
                consequences: "significant",
                overallRiskRating: "high",
                targetDescription:
                  "Residential structure, driveway, and vehicle parking area",
                maintenanceItems: ["removal"],
                maintenancePriority: "high",
                maintenanceTimeline: "Within 30 days",
              }),
            },
            {
              treeNumber: 3,
              speciesCommon: "Japanese Maple",
              speciesScientific: "Acer palmatum",
              dbhInches: 8,
              heightFt: 15,
              canopySpreadFt: 12,
              conditionRating: 5,
              healthNotes:
                "Excellent health with vibrant foliage color and strong new growth. No signs of disease, pest damage, or nutritional deficiency. Crown is symmetrical and well-formed.",
              structuralNotes:
                "Multi-stemmed form typical of cultivar. All stems well-attached with no included bark. No structural concerns identified.",
              isProtected: false,
              protectionReason: null,
              recommendedAction: "retain",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "improbable",
                likelihoodOfImpact: "very_low",
                consequences: "negligible",
                overallRiskRating: "low",
                targetDescription: "Garden bed and lawn area",
                maintenanceItems: ["routine pruning"],
                maintenancePriority: "low",
                maintenanceTimeline: "Annual maintenance cycle",
              }),
            },
          ],
        },
      },
    });
  } catch (err) {
    // Sample property creation is non-fatal — log and continue
    console.error("Failed to create sample property:", err);
  }

  return NextResponse.json(arborist, { status: 201 });
}
