import fs from "fs";
import path from "path";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/svg+xml",
]);

export const ALLOWED_AUDIO_TYPES = new Set([
  "audio/webm",
  "audio/mp4",
  "audio/wav",
  "audio/ogg",
  "audio/mpeg",
  "audio/webm;codecs=opus",
]);

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25 MB (Whisper limit)

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

/** Project root — two levels up from lib/ */
const PROJECT_ROOT = path.resolve(process.cwd());
const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads");

/**
 * Get the absolute upload directory for a tree's media, creating it if needed.
 */
export function getUploadDir(
  treeRecordId: string,
  type: "photos" | "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "trees", treeRecordId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the absolute upload directory for property-level media (audio), creating it if needed.
 */
export function getPropertyUploadDir(
  propertyId: string,
  type: "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "properties", propertyId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for a property-level uploaded file.
 */
export function getPropertyServingUrl(
  propertyId: string,
  type: "audio",
  filename: string
): string {
  return `/api/uploads/properties/${propertyId}/${type}/${filename}`;
}

/**
 * Get the absolute upload directory for arborist assets (logo, etc.), creating it if needed.
 */
export function getArboristUploadDir(arboristId: string): string {
  const dir = path.join(UPLOADS_ROOT, "arborist", arboristId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for an arborist's uploaded file.
 */
export function getArboristServingUrl(
  arboristId: string,
  filename: string
): string {
  return `/api/uploads/arborist/${arboristId}/${filename}`;
}

/**
 * Get the absolute upload directory for feedback screenshots, creating it if needed.
 */
export function getFeedbackUploadDir(): string {
  const dir = path.join(UPLOADS_ROOT, "feedback");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for a feedback screenshot.
 */
export function getFeedbackServingUrl(filename: string): string {
  return `/api/uploads/feedback/${filename}`;
}

/**
 * Generate a collision-safe filename from the original.
 * Format: {timestamp}_{random}_{sanitized-original}
 */
export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const rand = crypto.randomBytes(4).toString("hex");
  // Sanitize: keep only alphanumeric, dots, hyphens, underscores
  const sanitized = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-60);
  return `${timestamp}_${rand}_${sanitized}`;
}

/**
 * Get the serving URL for an uploaded file.
 */
export function getServingUrl(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): string {
  return `/api/uploads/trees/${treeRecordId}/${type}/${filename}`;
}

/**
 * Delete an uploaded file from disk. Silently ignores if file doesn't exist.
 */
export function deleteFile(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): void {
  const filePath = path.join(
    UPLOADS_ROOT,
    "trees",
    treeRecordId,
    type,
    filename
  );
  try {
    fs.unlinkSync(filePath);
  } catch (err: unknown) {
    // Ignore if file doesn't exist
    if (err && typeof err === "object" && "code" in err && err.code !== "ENOENT") {
      throw err;
    }
  }
}

/**
 * Resolve a relative path to an absolute one within the uploads directory.
 * Returns null if the path escapes the uploads root (path traversal).
 */
export function resolveUploadPath(relativePath: string): string | null {
  const resolved = path.resolve(UPLOADS_ROOT, relativePath);
  if (!resolved.startsWith(UPLOADS_ROOT)) {
    return null; // path traversal attempt
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// MIME type detection
// ---------------------------------------------------------------------------

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".webm": "audio/webm",
  ".mp4": "audio/mp4",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
};

export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_MAP[ext] || "application/octet-stream";
}
