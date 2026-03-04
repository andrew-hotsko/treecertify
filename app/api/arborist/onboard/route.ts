import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const step = body.step || 1;

  if (step === 1) {
    // ---- Step 1: Professional Credentials ----
    if (!body.name || !body.isaCertificationNum || !body.isaExpirationDate) {
      return NextResponse.json(
        { error: "Missing required fields: name, isaCertificationNum, isaExpirationDate" },
        { status: 400 }
      );
    }

    const existing = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });

    if (existing) {
      // User went back to step 1 — update existing record
      const updated = await prisma.arborist.update({
        where: { id: existing.id },
        data: {
          name: body.name,
          email: body.email || existing.email,
          isaCertificationNum: body.isaCertificationNum,
          isaExpirationDate: new Date(body.isaExpirationDate),
          phone: body.phone || null,
          licenseNumbers: body.licenseNumbers || null,
          signatureName: body.signatureName || null,
          traqCertified: body.traqCertified ?? false,
          onboardingStep: Math.max(existing.onboardingStep, 1),
        },
      });
      return NextResponse.json(updated);
    }

    // Create new arborist
    const arborist = await prisma.arborist.create({
      data: {
        clerkUserId: userId,
        name: body.name,
        email: body.email || "",
        isaCertificationNum: body.isaCertificationNum,
        isaExpirationDate: new Date(body.isaExpirationDate),
        phone: body.phone || null,
        licenseNumbers: body.licenseNumbers || null,
        signatureName: body.signatureName || null,
        traqCertified: body.traqCertified ?? false,
        onboardingStep: 1,
      },
    });

    return NextResponse.json(arborist, { status: 201 });
  }

  if (step === 2) {
    // ---- Step 2: Company Branding ----
    const existing = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Complete step 1 first" },
        { status: 400 }
      );
    }

    const updated = await prisma.arborist.update({
      where: { id: existing.id },
      data: {
        companyName: body.companyName || null,
        companyAddress: body.companyAddress || null,
        companyPhone: body.companyPhone || null,
        companyEmail: body.companyEmail || null,
        companyWebsite: body.companyWebsite || null,
        onboardingStep: Math.max(existing.onboardingStep, 2),
      },
    });

    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Invalid step" }, { status: 400 });
}

// PATCH — Mark onboarding complete (called after Step 3 property creation or skip)
export async function PATCH() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (!arborist) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  const updated = await prisma.arborist.update({
    where: { id: arborist.id },
    data: { onboardingStep: 3 },
  });

  return NextResponse.json(updated);
}
