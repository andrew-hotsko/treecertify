import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const VALID_TYPES = ["bug", "suggestion", "question"];

export async function POST(request: NextRequest) {
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

  const body = await request.json();

  if (!body.type || !body.description?.trim()) {
    return NextResponse.json(
      { error: "Type and description are required" },
      { status: 400 }
    );
  }

  if (!VALID_TYPES.includes(body.type)) {
    return NextResponse.json(
      { error: "Type must be bug, suggestion, or question" },
      { status: 400 }
    );
  }

  const feedback = await prisma.feedback.create({
    data: {
      arboristId: arborist.id,
      type: body.type,
      description: body.description.trim(),
      screenshotUrl: body.screenshotUrl || null,
      pageUrl: body.pageUrl || null,
      metadata: body.metadata ? JSON.stringify(body.metadata) : null,
    },
  });

  // Log for notification (email integration can be added later)
  console.log(
    `[FEEDBACK] ${body.type.toUpperCase()} from ${arborist.name} (${arborist.email}): ${body.description.trim().slice(0, 100)}`
  );

  return NextResponse.json(feedback, { status: 201 });
}
