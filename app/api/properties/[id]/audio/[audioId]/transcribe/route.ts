import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  const { id: propertyId, audioId } = params;

  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Resolve audio file path
    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const audioFilePath = path.join(
      uploadsRoot,
      "properties",
      propertyId,
      "audio",
      audioNote.filename
    );

    if (!fs.existsSync(audioFilePath)) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage: "Audio file not found on disk",
        },
      });
      return NextResponse.json(
        { error: "Audio file not found on disk" },
        { status: 404 }
      );
    }

    // ---- Step 1: Whisper transcription ----
    let rawTranscription: string;

    if (process.env.OPENAI_API_KEY) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: { status: "transcribing" },
      });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const fileStream = fs.createReadStream(audioFilePath);
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "en",
        response_format: "text",
      });

      rawTranscription =
        typeof transcription === "string"
          ? transcription
          : String(transcription);
    } else {
      // No OpenAI key — mark as ready with placeholder
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "ready",
          rawTranscription: "(No OPENAI_API_KEY configured)",
          cleanedTranscription:
            "(Transcription unavailable — set OPENAI_API_KEY in .env to enable Whisper transcription)",
        },
      });
      return NextResponse.json({ status: "ready", message: "No API key" });
    }

    // Save raw transcription
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        rawTranscription,
        status: "cleaning",
      },
    });

    // ---- Step 2: Claude cleanup ----
    let cleanedTranscription: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `You are cleaning up a voice note from an ISA-certified arborist recording site-level observations at a property. The raw transcription may contain filler words, false starts, repetition, and casual speech.

Clean it up into clear, professional site observation notes that could be included in the executive summary or site observations section of a certified arborist report. Preserve all technical details about the site, soil conditions, access, structures, utilities, slopes, drainage, neighboring properties, and general landscape context. Organize into logical paragraphs if the note covers multiple topics. Do not add information that wasn't in the original. Just clean and structure what's there.

Return ONLY the cleaned text with no preamble or explanation.`,
        messages: [
          {
            role: "user",
            content: `Raw transcription:\n\n${rawTranscription}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      cleanedTranscription = textBlock?.text || rawTranscription;
    } else {
      cleanedTranscription = rawTranscription;
    }

    // Save cleaned transcription and mark as ready
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        cleanedTranscription,
        status: "ready",
      },
    });

    return NextResponse.json({ status: "ready" });
  } catch (error) {
    console.error("Property transcription pipeline error:", error);

    try {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage:
            error instanceof Error
              ? error.message
              : "Unknown transcription error",
        },
      });
    } catch {
      // Ignore
    }

    return NextResponse.json(
      { error: "Transcription pipeline failed" },
      { status: 500 }
    );
  }
}
