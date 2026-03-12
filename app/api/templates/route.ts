import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (!arborist) {
    return NextResponse.json({ error: "No arborist found" }, { status: 404 });
  }

  const templates = await prisma.documentTemplate.findMany({
    where: { arboristId: arborist.id },
    orderBy: { usageCount: "desc" },
  });

  return NextResponse.json(templates);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (!arborist) {
    return NextResponse.json({ error: "No arborist found" }, { status: 404 });
  }

  const body = await request.json();

  if (!body.name?.trim() || !body.content?.trim()) {
    return NextResponse.json(
      { error: "Name and content are required" },
      { status: 400 }
    );
  }

  const template = await prisma.documentTemplate.create({
    data: {
      arboristId: arborist.id,
      name: body.name.trim(),
      content: body.content.trim(),
      category: body.category || null,
      cityTag: body.cityTag || null,
      reportTypeTag: body.reportTypeTag || null,
    },
  });

  return NextResponse.json(template, { status: 201 });
}
