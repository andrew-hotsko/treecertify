import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const captionsRaw = formData.get("captions") as string | null;
    const captions: string[] = captionsRaw ? JSON.parse(captionsRaw) : [];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Get current max sort order
    const maxSort = await prisma.treePhoto.aggregate({
      where: { treeRecordId: treeId },
      _max: { sortOrder: true },
    });
    let nextSortOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const uploadDir = getUploadDir(treeId, "photos");
    const created = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate type
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        continue; // skip unsupported files
      }

      // Validate size
      if (file.size > MAX_IMAGE_SIZE) {
        continue; // skip oversized files
      }

      const filename = generateFilename(file.name);
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      const url = getServingUrl(treeId, "photos", filename);
      const caption = captions[i] || null;

      const photo = await prisma.treePhoto.create({
        data: {
          treeRecordId: treeId,
          filename,
          url,
          caption,
          sortOrder: nextSortOrder++,
        },
      });

      created.push(photo);
    }

    // Return all photos for the tree
    const allPhotos = await prisma.treePhoto.findMany({
      where: { treeRecordId: treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(allPhotos, { status: 201 });
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json(
      { error: "Failed to upload photos" },
      { status: 500 }
    );
  }
}
