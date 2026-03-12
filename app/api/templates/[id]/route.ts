import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;
  const existing = await prisma.documentTemplate.findUnique({
    where: { id },
  });
  if (!existing || existing.arboristId !== arborist.id) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const body = await request.json();

  // Increment usage count (separate from edits)
  if (body.incrementUsage) {
    const updated = await prisma.documentTemplate.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    });
    return NextResponse.json(updated);
  }

  // Regular edit
  const updated = await prisma.documentTemplate.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name.trim() }),
      ...(body.content !== undefined && { content: body.content.trim() }),
      ...(body.category !== undefined && { category: body.category || null }),
      ...(body.cityTag !== undefined && { cityTag: body.cityTag || null }),
      ...(body.reportTypeTag !== undefined && { reportTypeTag: body.reportTypeTag || null }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;
  const existing = await prisma.documentTemplate.findUnique({
    where: { id },
  });
  if (!existing || existing.arboristId !== arborist.id) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  await prisma.documentTemplate.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
