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

/**
 * Extract EXIF GPS coords and date from a JPEG buffer.
 * Returns partial data — fields may be undefined if not present.
 */
function extractExif(buffer: Buffer): {
  lat?: number;
  lng?: number;
  takenAt?: Date;
} {
  try {
    // exif-parser works on JPEG/TIFF buffers
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ExifParser = require("exif-parser");
    const parser = ExifParser.create(buffer);
    parser.enableSimpleValues(true);
    const result = parser.parse();

    const tags = result.tags || {};
    const lat =
      typeof tags.GPSLatitude === "number" ? tags.GPSLatitude : undefined;
    const lng =
      typeof tags.GPSLongitude === "number" ? tags.GPSLongitude : undefined;

    let takenAt: Date | undefined;
    // DateTimeOriginal is a unix timestamp (seconds) in exif-parser
    if (tags.DateTimeOriginal && typeof tags.DateTimeOriginal === "number") {
      takenAt = new Date(tags.DateTimeOriginal * 1000);
    }

    return { lat, lng, takenAt };
  } catch {
    // Not a JPEG, no EXIF, or parse error — return empty
    return {};
  }
}

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
    const categoriesRaw = formData.get("categories") as string | null;
    const categories: string[] = categoriesRaw
      ? JSON.parse(categoriesRaw)
      : [];

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

      // Extract EXIF data
      const exif = extractExif(buffer);

      const url = getServingUrl(treeId, "photos", filename);
      const caption = captions[i] || null;
      const category = categories[i] || null;

      await prisma.treePhoto.create({
        data: {
          treeRecordId: treeId,
          filename,
          url,
          caption,
          category,
          sortOrder: nextSortOrder++,
          ...(exif.lat !== undefined && { exifLat: exif.lat }),
          ...(exif.lng !== undefined && { exifLng: exif.lng }),
          ...(exif.takenAt !== undefined && { exifTakenAt: exif.takenAt }),
        },
      });
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
