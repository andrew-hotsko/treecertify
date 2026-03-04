"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ImageIcon,
  Trash2,
  Pencil,
  RotateCcw,
  Clock,
} from "lucide-react";
import {
  enqueuePhoto,
  getQueuedPhotosForTree,
  type QueuedPhoto,
} from "@/lib/photo-queue";
import { useToast } from "@/hooks/use-toast";

// Dynamically import markup editor (Fabric.js needs window/DOM)
const PhotoMarkupEditor = dynamic(
  () =>
    import("@/components/photo-markup-editor").then(
      (mod) => mod.PhotoMarkupEditor
    ),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreePhoto {
  id: string;
  treeRecordId: string;
  filename: string;
  url: string;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
  isAnnotated?: boolean;
  originalUrl?: string | null;
}

interface TreePhotosProps {
  propertyId: string;
  treeId: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreePhotos({ propertyId, treeId }: TreePhotosProps) {
  const [photos, setPhotos] = useState<TreePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [markupPhotoId, setMarkupPhotoId] = useState<string | null>(null);
  const [lightboxViewOriginal, setLightboxViewOriginal] = useState(false);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Offline photo queue
  const [queuedPhotos, setQueuedPhotos] = useState<QueuedPhoto[]>([]);

  const basePath = `/api/properties/${propertyId}/trees/${treeId}/photos`;

  // ---- Fetch photos ----
  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Failed to fetch photos:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Load queued (offline) photos for this tree
  useEffect(() => {
    getQueuedPhotosForTree(treeId)
      .then(setQueuedPhotos)
      .catch(() => {});
  }, [treeId]);

  // Memoize blob URLs for queued photos (revoke on unmount/change)
  const queuedPhotoUrls = useMemo(() => {
    return queuedPhotos.map((qp) => ({
      ...qp,
      previewUrl: URL.createObjectURL(qp.file),
    }));
  }, [queuedPhotos]);

  useEffect(() => {
    return () => {
      queuedPhotoUrls.forEach((qp) => URL.revokeObjectURL(qp.previewUrl));
    };
  }, [queuedPhotoUrls]);

  // ---- Upload ----
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);

      // Queue files for offline upload via IndexedDB
      try {
        for (let i = 0; i < files.length; i++) {
          await enqueuePhoto({ propertyId, treeId, file: files[i] });
        }
        const queued = await getQueuedPhotosForTree(treeId);
        setQueuedPhotos(queued);
        toast({
          title: "Photos saved offline",
          description: "Photos will upload when you're back online.",
        });
      } catch {
        // IndexedDB unavailable — fall back to silent failure
      }
    } finally {
      setUploading(false);
      // Reset input so the same file(s) can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // ---- Delete ----
  async function handleDelete(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        setDeleteConfirmId(null);
        // Close lightbox if the deleted photo was open
        if (lightboxIndex !== null) {
          const deletedIdx = photos.findIndex((p) => p.id === photoId);
          if (deletedIdx === lightboxIndex) setLightboxIndex(null);
          else if (deletedIdx < lightboxIndex) setLightboxIndex(lightboxIndex - 1);
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Caption update ----
  async function saveCaption(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: captionDraft || null }),
      });
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === photoId ? { ...p, caption: captionDraft || null } : p
          )
        );
      }
    } catch (err) {
      console.error("Caption update failed:", err);
    }
    setEditingCaptionId(null);
  }

  // ---- Markup save callback ----
  const handleMarkupSave = useCallback(
    (annotatedUrl: string) => {
      // Update photo in local state
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === markupPhotoId
            ? { ...p, url: annotatedUrl, isAnnotated: true }
            : p
        )
      );
      setMarkupPhotoId(null);
      // Re-fetch to get all updated fields
      fetchPhotos();
    },
    [markupPhotoId, fetchPhotos]
  );

  // ---- Revert annotation ----
  async function handleRevertAnnotation(photoId: string) {
    setRevertingId(photoId);
    try {
      const res = await fetch(
        `${basePath}/${photoId}/annotate`,
        { method: "DELETE" }
      );
      if (res.ok) {
        await fetchPhotos();
      }
    } catch (err) {
      console.error("Revert failed:", err);
    } finally {
      setRevertingId(null);
    }
  }

  // ---- Lightbox navigation ----
  const lightboxPhoto =
    lightboxIndex !== null ? photos[lightboxIndex] : null;

  function navigateLightbox(delta: number) {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + delta;
    if (next >= 0 && next < photos.length) {
      setLightboxIndex(next);
      setLightboxViewOriginal(false);
    }
  }

  // Which URL to show in lightbox (original or annotated)
  const lightboxUrl =
    lightboxPhoto && lightboxViewOriginal && lightboxPhoto.originalUrl
      ? lightboxPhoto.originalUrl
      : lightboxPhoto?.url;

  // The photo being marked up
  const markupPhoto = photos.find((p) => p.id === markupPhotoId);

  // ---- Render ----
  return (
    <div className="space-y-3">
      {/* Header + Upload Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="h-3.5 w-3.5" />
              Add Photos
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Thumbnail Grid */}
      {photos.length === 0 && queuedPhotoUrls.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-muted-foreground hover:border-muted-foreground/40 hover:text-muted-foreground/80 transition-colors w-full"
        >
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm">Tap to add photos</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="group relative">
              {/* Thumbnail */}
              <button
                className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxViewOriginal(false);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Annotated badge */}
                {photo.isAnnotated && (
                  <Badge
                    variant="secondary"
                    className="absolute bottom-1 left-1 text-[9px] px-1 py-0 bg-blue-600 text-white hover:bg-blue-600"
                  >
                    Annotated
                  </Badge>
                )}
              </button>

              {/* Hover overlay with markup button */}
              <div className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none" />
              <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMarkupPhotoId(photo.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmId(photo.id);
                  }}
                  title="Delete photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Caption */}
              {editingCaptionId === photo.id ? (
                <Input
                  value={captionDraft}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(photo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(photo.id);
                    if (e.key === "Escape") setEditingCaptionId(null);
                  }}
                  className="mt-1 h-6 text-[10px] px-1"
                  autoFocus
                  placeholder="Add caption..."
                />
              ) : (
                <button
                  className="mt-1 w-full text-left"
                  onClick={() => {
                    setEditingCaptionId(photo.id);
                    setCaptionDraft(photo.caption || "");
                  }}
                >
                  <p className="text-[10px] text-muted-foreground truncate hover:text-foreground transition-colors">
                    {photo.caption || "Add caption..."}
                  </p>
                </button>
              )}
            </div>
          ))}

          {/* Queued (offline) photo thumbnails */}
          {queuedPhotoUrls.map((qp) => (
            <div key={qp.id} className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted opacity-75">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qp.previewUrl}
                  alt="Pending upload"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-[10px] text-orange-500 mt-1 truncate">
                Pending upload
              </p>
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
          <DialogTitle>Delete Photo</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this photo? This cannot be undone.
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

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setLightboxIndex(null);
            setLightboxViewOriginal(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {lightboxPhoto && (
            <div className="flex flex-col">
              {/* Image */}
              <div className="relative bg-black flex items-center justify-center min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxUrl}
                  alt={lightboxPhoto.caption || "Photo"}
                  className="max-h-[70vh] max-w-full object-contain"
                />

                {/* Nav arrows */}
                {lightboxIndex! > 0 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {lightboxIndex! < photos.length - 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Counter + Annotated badge */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {lightboxPhoto.isAnnotated && (
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs">
                      Annotated
                    </Badge>
                  )}
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {lightboxIndex! + 1} of {photos.length}
                  </span>
                </div>

                {/* View original / annotated toggle */}
                {lightboxPhoto.isAnnotated && lightboxPhoto.originalUrl && (
                  <button
                    className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/80 transition-colors"
                    onClick={() =>
                      setLightboxViewOriginal(!lightboxViewOriginal)
                    }
                  >
                    {lightboxViewOriginal ? "View Annotated" : "View Original"}
                  </button>
                )}
              </div>

              {/* Caption + Actions bar */}
              <div className="flex items-center gap-2 p-3 border-t">
                <Input
                  value={
                    editingCaptionId === lightboxPhoto.id
                      ? captionDraft
                      : lightboxPhoto.caption || ""
                  }
                  placeholder="Add a caption..."
                  className="flex-1 text-sm"
                  onFocus={() => {
                    setEditingCaptionId(lightboxPhoto.id);
                    setCaptionDraft(lightboxPhoto.caption || "");
                  }}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(lightboxPhoto.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(lightboxPhoto.id);
                  }}
                />

                {/* Mark up button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setLightboxIndex(null);
                    setMarkupPhotoId(lightboxPhoto.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* Revert annotation button */}
                {lightboxPhoto.isAnnotated && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    onClick={() =>
                      handleRevertAnnotation(lightboxPhoto.id)
                    }
                    disabled={revertingId === lightboxPhoto.id}
                    title="Revert to original"
                  >
                    {revertingId === lightboxPhoto.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeleteConfirmId(lightboxPhoto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Photo Markup Editor Dialog */}
      {markupPhoto && (
        <PhotoMarkupEditor
          photoUrl={
            markupPhoto.isAnnotated && markupPhoto.originalUrl
              ? markupPhoto.originalUrl
              : markupPhoto.url
          }
          photoId={markupPhoto.id}
          propertyId={propertyId}
          treeId={treeId}
          onSave={handleMarkupSave}
          onClose={() => setMarkupPhotoId(null)}
        />
      )}
    </div>
  );
}
