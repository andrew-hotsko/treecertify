"use client";

import { useState, useRef, useCallback } from "react";
import { MicOff, Loader2, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParsedFields {
  speciesCommon?: string;
  speciesScientific?: string;
  dbhInches?: number;
  heightFt?: number;
  canopySpreadFt?: number;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  tagNumber?: string;
}

interface SmartDictationProps {
  onApply: (fields: ParsedFields) => void;
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const FIELD_LABELS: Record<string, string> = {
  speciesCommon: "Species (Common)",
  speciesScientific: "Species (Scientific)",
  dbhInches: "DBH (inches)",
  heightFt: "Height (ft)",
  canopySpreadFt: "Canopy Spread (ft)",
  conditionRating: "Condition",
  healthNotes: "Health Notes",
  structuralNotes: "Structural Notes",
  recommendedAction: "Recommended Action",
  tagNumber: "Tag Number",
};

export function SmartDictation({ onApply }: SmartDictationProps) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [parsed, setParsed] = useState<ParsedFields | null>(null);
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setError("");
      setParsed(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Determine supported MIME type
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : MediaRecorder.isTypeSupported("audio/mp4")
            ? "audio/mp4"
            : "";

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });
        await processAudio(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access denied");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, []);

  async function processAudio(blob: Blob) {
    setProcessing(true);
    try {
      // Step 1: Transcribe
      setProcessingStep("Transcribing...");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const transcribeRes = await fetch("/api/audio/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcribeRes.ok) {
        let errorMsg = "Transcription failed";
        try {
          const errData = await transcribeRes.json();
          if (errData?.error?.includes("No OPENAI_API_KEY")) {
            errorMsg = "Voice transcription requires an OpenAI API key. Add OPENAI_API_KEY to your .env file.";
          } else if (errData?.error?.includes("Incorrect API key") || errData?.error?.includes("invalid_api_key")) {
            errorMsg = "Your OpenAI API key is invalid. Check your key at platform.openai.com/api-keys and update .env.";
          } else if (errData?.error) {
            errorMsg = errData.error;
          }
        } catch {
          // couldn't parse error response
        }
        throw new Error(errorMsg);
      }
      const { text } = await transcribeRes.json();
      if (!text?.trim()) throw new Error("No speech detected");

      setRawText(text);

      // Step 2: Parse with Claude
      setProcessingStep("Extracting fields...");
      const parseRes = await fetch("/api/audio/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!parseRes.ok) {
        let errorMsg = "Field extraction failed";
        try {
          const errData = await parseRes.json();
          if (errData?.error) errorMsg = errData.error;
        } catch {
          // couldn't parse error response
        }
        throw new Error(errorMsg);
      }
      const { parsed: fields } = await parseRes.json();

      setParsed(fields);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Processing failed";
      setError(message);
    } finally {
      setProcessing(false);
      setProcessingStep("");
    }
  }

  function formatValue(key: string, value: unknown): string {
    if (key === "conditionRating" && typeof value === "number")
      return `${value} — ${CONDITION_LABELS[value] || "Unknown"}`;
    if (key === "recommendedAction" && typeof value === "string")
      return value.charAt(0).toUpperCase() + value.slice(1);
    return String(value);
  }

  function handleApply() {
    if (parsed) {
      onApply(parsed);
      setParsed(null);
      setRawText("");
    }
  }

  function handleDismiss() {
    setParsed(null);
    setRawText("");
    setError("");
  }

  // Render the confirmation card if we have parsed data
  // Otherwise render just the mic button
  return (
    <div>
      {/* Mic button */}
      {!parsed && !processing && (
        <Button
          type="button"
          variant={recording ? "destructive" : "outline"}
          size="sm"
          onClick={recording ? stopRecording : startRecording}
          className={recording ? "animate-pulse" : ""}
        >
          {recording ? (
            <>
              <MicOff className="h-3.5 w-3.5 mr-1" />
              Stop
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Smart Dictate
            </>
          )}
        </Button>
      )}

      {/* Processing indicator */}
      {processing && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {processingStep}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <X className="h-3.5 w-3.5" />
          {error}
          <button
            onClick={() => setError("")}
            className="underline ml-1 text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Confirmation card */}
      {parsed && (
        <div className="mt-3 rounded-lg border border-forest/20 bg-forest/5 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-forest flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Extracted from voice
            </p>
          </div>

          {rawText && (
            <p className="text-xs text-muted-foreground italic">
              &ldquo;{rawText}&rdquo;
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {Object.entries(parsed).map(([key, value]) => {
              if (value === undefined || value === null || value === "")
                return null;
              return (
                <div key={key} className="contents">
                  <span className="text-xs text-muted-foreground">
                    {FIELD_LABELS[key] || key}
                  </span>
                  <span className="text-xs font-medium text-neutral-900">
                    {formatValue(key, value)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-forest hover:bg-forest-light h-7 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Apply Fields
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-7 text-xs"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
