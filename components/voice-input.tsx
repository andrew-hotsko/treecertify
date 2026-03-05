"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());

        // Send to transcription API
        setTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", blob, "recording.webm");

          const res = await fetch("/api/audio/transcribe", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const { text } = await res.json();
            if (text?.trim()) {
              onTranscript(text.trim());
            }
          } else {
            let errorMsg = "Transcription failed";
            try {
              const errData = await res.json();
              if (errData?.error?.includes("OPENAI_API_KEY") || errData?.error?.includes("API key")) {
                errorMsg = "Voice transcription requires an OpenAI API key. Add OPENAI_API_KEY to your .env file.";
              } else if (errData?.error) {
                errorMsg = errData.error;
              }
            } catch {
              // couldn't parse error response
            }
            toast({
              title: "Transcription error",
              description: errorMsg,
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("Transcription failed:", err);
          toast({
            title: "Transcription error",
            description: "Could not connect to transcription service",
            variant: "destructive",
          });
        } finally {
          setTranscribing(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled || transcribing}
        onClick={recording ? stopRecording : startRecording}
        className={`h-9 w-9 p-0 ${
          recording
            ? "bg-red-100 text-red-600 animate-pulse ring-2 ring-red-300"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title={recording ? "Stop recording" : "Voice input"}
      >
        {transcribing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : recording ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      {recording && (
        <span className="text-xs font-mono text-red-500 tabular-nums">
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
