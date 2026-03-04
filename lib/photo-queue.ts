"use client";

// ---------------------------------------------------------------------------
// Offline Photo Queue — stores File objects in IndexedDB for deferred upload
// when the app comes back online. Photos are too large for localStorage.
// ---------------------------------------------------------------------------

export interface QueuedPhoto {
  id: string;
  propertyId: string;
  treeId: string;
  file: File;
  timestamp: number;
  retryCount: number;
}

const DB_NAME = "treecertify_photos";
const DB_VERSION = 1;
const STORE_NAME = "photo_queue";
const MAX_RETRIES = 3;

// ---------------------------------------------------------------------------
// IndexedDB helpers
// ---------------------------------------------------------------------------

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function enqueuePhoto(
  photo: Omit<QueuedPhoto, "id" | "timestamp" | "retryCount">
): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();
  const item: QueuedPhoto = {
    ...photo,
    id,
    timestamp: Date.now(),
    retryCount: 0,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(item);
    req.onsuccess = () => resolve(id);
    req.onerror = () => reject(req.error);
  });
}

export async function getQueuedPhotos(): Promise<QueuedPhoto[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getQueuedPhotosForTree(
  treeId: string
): Promise<QueuedPhoto[]> {
  const all = await getQueuedPhotos();
  return all.filter((p) => p.treeId === treeId);
}

export async function removeQueuedPhoto(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Process queued photos one at a time to avoid overwhelming slow connections.
export async function processPhotoQueue(): Promise<{
  succeeded: number;
  failed: number;
}> {
  let photos: QueuedPhoto[];
  try {
    photos = await getQueuedPhotos();
  } catch {
    return { succeeded: 0, failed: 0 };
  }
  if (photos.length === 0) return { succeeded: 0, failed: 0 };

  let succeeded = 0;
  let failed = 0;

  for (const photo of photos) {
    try {
      const formData = new FormData();
      formData.append("files", photo.file, photo.file.name || "photo.jpg");

      const res = await fetch(
        `/api/properties/${photo.propertyId}/trees/${photo.treeId}/photos`,
        { method: "POST", body: formData }
      );

      if (res.ok) {
        await removeQueuedPhoto(photo.id);
        succeeded++;
      } else if (res.status >= 400 && res.status < 500) {
        // Client error — don't retry
        await removeQueuedPhoto(photo.id);
        failed++;
      } else {
        // Server error — retry if under limit
        if (photo.retryCount >= MAX_RETRIES) {
          await removeQueuedPhoto(photo.id);
          failed++;
        }
        // else leave in queue for next cycle
      }
    } catch {
      // Network error — retry if under limit
      if (photo.retryCount >= MAX_RETRIES) {
        await removeQueuedPhoto(photo.id);
        failed++;
      }
    }
  }

  return { succeeded, failed };
}
