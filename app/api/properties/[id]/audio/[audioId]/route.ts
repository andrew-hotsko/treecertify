import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getPropertyUploadDir } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error fetching property audio note:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    const audioNote = await prisma.propertyAudioNote.update({
      where: { id: params.audioId },
      data: {
        ...(body.cleanedTranscription !== undefined && {
          cleanedTranscription: body.cleanedTranscription,
        }),
      },
    });

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error updating property audio note:", error);
    return NextResponse.json(
      { error: "Failed to update audio note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const { id: propertyId, audioId } = params;

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Delete file from disk
    const filePath = path.join(
      getPropertyUploadDir(propertyId, "audio"),
      existing.filename
    );
    try {
      fs.unlinkSync(filePath);
    } catch {
      // ignore
    }

    // Delete database record
    await prisma.propertyAudioNote.delete({ where: { id: audioId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property audio note:", error);
    return NextResponse.json(
      { error: "Failed to delete audio note" },
      { status: 500 }
    );
  }
}
