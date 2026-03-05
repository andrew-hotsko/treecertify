"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Loader2,
  Trash2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AudioNote {
  id: string;
  propertyId: string;
  filename: string;
  audioUrl: string;
  rawTranscription: string | null;
  cleanedTranscription: string | null;
  durationSeconds: number | null;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface PropertyAudioNotesProps {
  propertyId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ready":
      return "default";
    case "error":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "transcribing":
      return "Transcribing";
    case "cleaning":
      return "Cleaning up";
    case "ready":
      return "Ready";
    case "error":
      return "Error";
    default:
      return status;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyAudioNotes({ propertyId }: PropertyAudioNotesProps) {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isRecording,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useAudioRecorder();

  const basePath = `/api/properties/${propertyId}/audio`;

  // ---- Fetch audio notes ----
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setAudioNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch property audio notes:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---- Poll for pending transcriptions ----
  useEffect(() => {
    const pendingIds = audioNotes
      .filter((n) => n.status !== "ready" && n.status !== "error")
      .map((n) => n.id);

    if (pendingIds.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      for (const noteId of pendingIds) {
        try {
          const res = await fetch(`${basePath}/${noteId}`);
          if (res.ok) {
            const updated: AudioNote = await res.json();
            if (
              updated.status === "ready" ||
              updated.status === "error" ||
              updated.status !== audioNotes.find((n) => n.id === noteId)?.status
            ) {
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
            }
          }
        } catch {
          // ignore polling errors
        }
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [audioNotes, basePath]);

  // ---- Recording flow ----
  async function handleStopRecording() {
    try {
      const blob = await stopRecording();
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }

  function handleDiscardPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewBlob(null);
    setPreviewUrl(null);
  }

  async function handleUploadRecording() {
    if (!previewBlob) return;
    setUploading(true);

    try {
      const formData = new FormData();
      const ext = previewBlob.type.includes("mp4") ? ".m4a" : ".webm";
      formData.append("file", previewBlob, `site-note${ext}`);
      formData.append("durationSeconds", String(recordingDuration));

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setAudioNotes((prev) => [newNote, ...prev]);
        handleDiscardPreview();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  // ---- Delete ----
  async function handleDelete(noteId: string) {
    try {
      const res = await fetch(`${basePath}/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Retry transcription ----
  async function handleRetry(noteId: string) {
    setAudioNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, status: "transcribing", errorMessage: null }
          : n
      )
    );
    try {
      await fetch(`${basePath}/${noteId}/transcribe`, { method: "POST" });
    } catch (err) {
      console.error("Retry failed:", err);
    }
  }

  // ---- Update transcription ----
  async function handleTranscriptionEdit(noteId: string, text: string) {
    try {
      await fetch(`${basePath}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanedTranscription: text }),
      });
      setAudioNotes((prev) =>
        prev.map((n) =>
          n.id === noteId ? { ...n, cleanedTranscription: text } : n
        )
      );
    } catch (err) {
      console.error("Transcription edit failed:", err);
    }
  }

  // ---- Playback ----
  function togglePlay(noteId: string) {
    const audio = audioPlayerRefs.current.get(noteId);
    if (!audio) return;

    if (playingId === noteId) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        audioPlayerRefs.current.get(playingId)?.pause();
      }
      audio.play();
      setPlayingId(noteId);
    }
  }

  // ---- Render ----
  return (
    <div className="space-y-4">
      {/* Record Section */}
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
        {!isRecording && !previewUrl && !recorderError && (
          <>
            <button
              onClick={startRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition-all"
              title="Record site observation"
            >
              <Mic className="h-6 w-6" />
            </button>
            <p className="text-xs text-muted-foreground">
              Record site observations
            </p>
          </>
        )}

        {isRecording && (
          <>
            <button
              onClick={handleStopRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
              title="Stop recording"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
            <p className="text-sm font-mono font-semibold text-red-600">
              {formatDuration(recordingDuration)}
            </p>
            <p className="text-xs text-muted-foreground">Recording...</p>
          </>
        )}

        {previewUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <audio src={previewUrl} controls className="w-full h-10" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUploadRecording}
                disabled={uploading}
                className="bg-forest hover:bg-forest-light text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload & Transcribe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardPreview}
                disabled={uploading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {recorderError && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 p-3 space-y-2">
            <p className="text-xs font-medium text-red-600">
              {recorderError.toLowerCase().includes("permission")
                ? "Microphone access denied"
                : recorderError}
            </p>
            <p className="text-[11px] text-red-500/80/70">
              {recorderError.toLowerCase().includes("permission")
                ? "Your browser blocked microphone access. Click the lock/site-settings icon in your address bar, allow microphone access, then try again."
                : "Make sure your device has a microphone connected and try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 border-red-300 text-red-600 hover:bg-red-100"
              onClick={startRecording}
            >
              <RotateCcw className="h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Audio Notes List */}
      {audioNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {audioNotes.length} site note{audioNotes.length !== 1 ? "s" : ""}
          </p>

          {audioNotes.map((note) => (
            <div key={note.id} className="rounded-lg border p-3 space-y-2">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(note.status)}>
                    {(note.status === "transcribing" ||
                      note.status === "cleaning" ||
                      note.status === "uploading") && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {statusLabel(note.status)}
                  </Badge>
                  {note.durationSeconds != null && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDuration(Math.round(note.durationSeconds))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {note.status === "error" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRetry(note.id)}
                      title="Retry transcription"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-700"
                    onClick={() => setDeleteConfirmId(note.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePlay(note.id)}
                >
                  {playingId === note.id ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <audio
                  ref={(el) => {
                    if (el) audioPlayerRefs.current.set(note.id, el);
                    else audioPlayerRefs.current.delete(note.id);
                  }}
                  src={note.audioUrl}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      playingId === note.id
                        ? "bg-forest-light animate-pulse w-1/2"
                        : "bg-muted-foreground/30 w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Transcription */}
              {note.status === "ready" && note.cleanedTranscription && (
                <Textarea
                  value={note.cleanedTranscription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAudioNotes((prev) =>
                      prev.map((n) =>
                        n.id === note.id
                          ? { ...n, cleanedTranscription: value }
                          : n
                      )
                    );
                  }}
                  onBlur={() =>
                    handleTranscriptionEdit(
                      note.id,
                      note.cleanedTranscription || ""
                    )
                  }
                  rows={3}
                  className="text-xs resize-none"
                />
              )}

              {(note.status === "transcribing" ||
                note.status === "cleaning") && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {note.status === "transcribing"
                      ? "Transcribing audio with Whisper..."
                      : "Cleaning up transcription with Claude..."}
                  </span>
                </div>
              )}

              {note.status === "error" && (
                <p className="text-xs text-red-500 p-2 rounded bg-red-50">
                  {note.errorMessage || "Transcription failed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Site Audio Note</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this site audio note and its
            transcription? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
