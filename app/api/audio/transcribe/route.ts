import { NextResponse } from "next/server";
import { getCurrentArborist } from "@/lib/auth";
import { logApiUsage } from "@/lib/api-usage";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob | null;

    if (!audio) {
      return NextResponse.json({ error: "No audio" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "No OPENAI_API_KEY configured" },
        { status: 500 }
      );
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (process.env.NODE_ENV === "development") {
      console.log(`[transcribe] Audio blob type: ${audio.type}, size: ${audio.size} bytes`);
    }

    const file = new File([audio], "recording.webm", { type: audio.type || "audio/webm" });

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file,
      language: "en",
      response_format: "verbose_json",
    });

    // Log API usage if arborist is authenticated (fire-and-forget)
    const arborist = await getCurrentArborist();
    if (arborist) {
      logApiUsage({
        arboristId: arborist.id,
        provider: "openai",
        endpoint: "transcribe",
        model: "whisper-1",
        audioDuration: (transcription as unknown as { duration?: number }).duration ?? null,
      });
    }

    return NextResponse.json({ text: transcription.text });
  } catch (error: unknown) {
    console.error("Voice transcription error:", error);

    // Surface the actual error from OpenAI
    let message = "Transcription failed";
    let status = 500;

    if (error && typeof error === "object") {
      const err = error as { status?: number; message?: string; error?: { message?: string } };
      if (err.status) status = err.status;
      if (err.error?.message) {
        message = err.error.message;
      } else if (err.message) {
        message = err.message;
      }
      console.error(`[transcribe] OpenAI error status=${err.status}, message=${message}`);
    }

    return NextResponse.json({ error: message }, { status });
  }
}
