import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import {
  getFeedbackUploadDir,
  getFeedbackServingUrl,
  generateFilename,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/uploads";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify arborist exists
  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (!arborist) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("screenshot") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No screenshot file" }, { status: 400 });
  }

  // Validate type
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Invalid image type" },
      { status: 400 }
    );
  }

  // Validate size
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 10 MB)" },
      { status: 400 }
    );
  }

  const dir = getFeedbackUploadDir();
  const filename = generateFilename(file.name || "screenshot.png");
  const filePath = `${dir}/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

  const url = getFeedbackServingUrl(filename);

  return NextResponse.json({ url }, { status: 201 });
}
