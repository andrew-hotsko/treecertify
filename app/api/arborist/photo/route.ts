import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  getArboristUploadDir,
  getArboristServingUrl,
  generateFilename,
} from "@/lib/uploads";

// POST /api/arborist/photo — upload a profile photo
export async function POST(request: NextRequest) {
  try {
    const arborist = await requireArborist();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: JPG, PNG, WebP, SVG`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10 MB)" },
        { status: 400 }
      );
    }

    // Delete existing photo file if present
    if (arborist.profilePhotoUrl) {
      const existingFilename = arborist.profilePhotoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore if file doesn't exist
        }
      }
    }

    // Save new photo
    const filename = generateFilename(file.name);
    const uploadDir = getArboristUploadDir(arborist.id);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const photoUrl = getArboristServingUrl(arborist.id, filename);

    // Update arborist record
    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { profilePhotoUrl: photoUrl },
    });

    return NextResponse.json({ url: photoUrl });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

// DELETE /api/arborist/photo — remove the profile photo
export async function DELETE() {
  try {
    const arborist = await requireArborist();

    if (arborist.profilePhotoUrl) {
      const existingFilename = arborist.profilePhotoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore if file doesn't exist
        }
      }
    }

    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { profilePhotoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
