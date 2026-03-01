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
    },
  });

  return NextResponse.json(arborist, { status: 201 });
}
