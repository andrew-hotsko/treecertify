import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUploadDir, getServingUrl, generateFilename, deleteFile } from "@/lib/uploads";
import fs from "fs";
import path from "path";

/**
 * POST — Save an annotated version of a photo.
 * Stores the annotated image alongside the original, updates the TreePhoto
 * record so the annotated version becomes the primary (url/filename) and
 * the original is preserved in originalUrl/originalFilename.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // Generate filename for annotated version
    const annotatedFilename = generateFilename(`annotated_${photo.filename.replace(/\.[^.]+$/, "")}.png`);
    const uploadDir = getUploadDir(treeId, "photos");
    const filePath = path.join(uploadDir, annotatedFilename);

    // Write annotated image to disk
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const annotatedUrl = getServingUrl(treeId, "photos", annotatedFilename);

    // If already annotated, delete the previous annotated file (but keep original)
    if (photo.isAnnotated && photo.filename) {
      try {
        deleteFile(treeId, "photos", photo.filename);
      } catch {
        // Ignore — file may not exist
      }
    }

    // Store original info (only on first annotation)
    const originalFilename = photo.isAnnotated
      ? photo.originalFilename
      : photo.filename;
    const originalUrl = photo.isAnnotated ? photo.originalUrl : photo.url;

    // Update database record
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: annotatedFilename,
        url: annotatedUrl,
        originalFilename: originalFilename,
        originalUrl: originalUrl,
        isAnnotated: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error saving annotation:", error);
    return NextResponse.json(
      { error: "Failed to save annotation" },
      { status: 500 }
    );
  }
}

/**
 * DELETE — Revert to the original photo (remove annotation).
 * Deletes the annotated file and restores the original url/filename.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (!photo.isAnnotated || !photo.originalFilename || !photo.originalUrl) {
      return NextResponse.json(
        { error: "Photo is not annotated" },
        { status: 400 }
      );
    }

    // Delete annotated file from disk
    try {
      deleteFile(treeId, "photos", photo.filename);
    } catch {
      // Ignore
    }

    // Restore original
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: photo.originalFilename,
        url: photo.originalUrl,
        originalFilename: null,
        originalUrl: null,
        isAnnotated: false,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error reverting annotation:", error);
    return NextResponse.json(
      { error: "Failed to revert annotation" },
      { status: 500 }
    );
  }
}
