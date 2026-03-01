import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getPropertyUploadDir,
  generateFilename,
  getPropertyServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const audioNotes = await prisma.propertyAudioNote.findMany({
      where: { propertyId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching property audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const durationStr = formData.get("durationSeconds") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate type
    const baseType = file.type.split(";")[0].trim();
    if (
      !ALLOWED_AUDIO_TYPES.has(baseType) &&
      !ALLOWED_AUDIO_TYPES.has(file.type)
    ) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    const extMap: Record<string, string> = {
      "audio/webm": ".webm",
      "audio/mp4": ".m4a",
      "audio/wav": ".wav",
      "audio/ogg": ".ogg",
      "audio/mpeg": ".mp3",
    };
    const ext = extMap[baseType] || ".webm";
    const originalName = file.name || `recording${ext}`;

    const filename = generateFilename(originalName);
    const uploadDir = getPropertyUploadDir(propertyId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getPropertyServingUrl(propertyId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.propertyAudioNote.create({
      data: {
        propertyId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading property audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}
