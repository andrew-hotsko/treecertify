import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  getArboristUploadDir,
  getArboristServingUrl,
  generateFilename,
} from "@/lib/uploads";

// POST /api/arborist/logo — upload a company logo
export async function POST(request: NextRequest) {
  try {
    const arborist = await prisma.arborist.findFirst();
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("logo") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No logo file provided" },
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

    // Delete existing logo file if present
    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    // Save new logo
    const filename = generateFilename(file.name);
    const uploadDir = getArboristUploadDir(arborist.id);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoUrl = getArboristServingUrl(arborist.id, filename);

    // Update arborist record
    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: logoUrl },
    });

    return NextResponse.json({
      companyLogoUrl: updated.companyLogoUrl,
    });
  } catch (error) {
    console.error("Error uploading logo:", error);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }
}

// DELETE /api/arborist/logo — remove the company logo
export async function DELETE() {
  try {
    const arborist = await prisma.arborist.findFirst();
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting logo:", error);
    return NextResponse.json(
      { error: "Failed to delete logo" },
      { status: 500 }
    );
  }
}
