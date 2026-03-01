import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const audioNotes = await prisma.treeAudioNote.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id: propertyId, treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
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

    // Validate type — check base type (ignore codec params)
    const baseType = file.type.split(";")[0].trim();
    if (!ALLOWED_AUDIO_TYPES.has(baseType) && !ALLOWED_AUDIO_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    // Determine file extension from type
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
    const uploadDir = getUploadDir(treeId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getServingUrl(treeId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.treeAudioNote.create({
      data: {
        treeRecordId: treeId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/trees/${treeId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}
