import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // ---- Step 1: Profile Essentials (name, ISA cert, service area) ----
  if (!body.name || !body.isaCertificationNum) {
    return NextResponse.json(
      { error: "Missing required fields: name, isaCertificationNum" },
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
        citiesServed: body.citiesServed || existing.citiesServed,
        onboardingStep: Math.max(existing.onboardingStep, 1),
      },
    });
    return NextResponse.json(updated);
  }

  // Create new arborist (isaExpirationDate defaults to 1 year out; editable in Settings)
  const defaultExpiration = new Date();
  defaultExpiration.setFullYear(defaultExpiration.getFullYear() + 1);

  const arborist = await prisma.arborist.create({
    data: {
      clerkUserId: userId,
      name: body.name,
      email: body.email || "",
      isaCertificationNum: body.isaCertificationNum,
      isaExpirationDate: defaultExpiration,
      citiesServed: body.citiesServed || "[]",
      onboardingStep: 1,
    },
  });

  return NextResponse.json(arborist, { status: 201 });
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
    data: {
      onboardingStep: 3,
      hasCompletedOnboarding: true,
    },
  });

  return NextResponse.json(updated);
}
