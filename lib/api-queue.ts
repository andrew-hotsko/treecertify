"use client";

// ---------------------------------------------------------------------------
// Offline API Queue — stores failed requests in localStorage and replays
// them when the app comes back online.
// ---------------------------------------------------------------------------

export interface QueuedRequest {
  id: string;
  endpoint: string;
  method: "POST" | "PUT";
  body: string; // JSON stringified
  timestamp: number;
  retryCount: number;
  treeLocalId?: string; // dedup key for new trees (POST)
  propertyId?: string;
}

const QUEUE_KEY = "treecertify_queue";
const MAX_RETRIES = 3;

// ---------------------------------------------------------------------------
// Read / write helpers
// ---------------------------------------------------------------------------

export function getQueue(): QueuedRequest[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveQueue(queue: QueuedRequest[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    /* localStorage full — best-effort */
  }
}

// ---------------------------------------------------------------------------
// Enqueue a failed request (with dedup)
// ---------------------------------------------------------------------------

export function enqueueRequest(
  req: Omit<QueuedRequest, "id" | "timestamp" | "retryCount">,
  setPendingCount?: (count: number) => void
): string {
  const queue = getQueue();

  // Dedup: find existing item that should be replaced
  let existingIdx = -1;
  if (req.method === "PUT") {
    // For PUT: same endpoint = same resource, last-write-wins
    existingIdx = queue.findIndex(
      (q) => q.endpoint === req.endpoint && q.method === "PUT"
    );
  } else if (req.method === "POST" && req.treeLocalId) {
    // For POST: same treeLocalId = same pending tree, replace
    existingIdx = queue.findIndex(
      (q) =>
        q.endpoint === req.endpoint &&
        q.method === "POST" &&
        q.treeLocalId === req.treeLocalId
    );
  }

  const id = existingIdx >= 0 ? queue[existingIdx].id : crypto.randomUUID();
  const item: QueuedRequest = {
    ...req,
    id,
    timestamp: Date.now(),
    retryCount: 0,
  };

  if (existingIdx >= 0) {
    queue[existingIdx] = item;
  } else {
    queue.push(item);
  }

  saveQueue(queue);
  setPendingCount?.(queue.length);
  return id;
}

// ---------------------------------------------------------------------------
// Process the queue (FIFO). Called when app comes back online.
// ---------------------------------------------------------------------------

export async function processQueue(
  setPendingCount?: (count: number) => void
): Promise<{ succeeded: number; failed: number }> {
  const queue = getQueue();
  if (queue.length === 0) return { succeeded: 0, failed: 0 };

  let succeeded = 0;
  let failed = 0;
  const remaining: QueuedRequest[] = [];

  for (const item of queue) {
    try {
      const res = await fetch(item.endpoint, {
        method: item.method,
        headers: { "Content-Type": "application/json" },
        body: item.body,
      });

      if (res.ok) {
        succeeded++;
      } else if (res.status >= 400 && res.status < 500) {
        // Client error (e.g. 404, 422) — don't retry
        failed++;
      } else {
        // Server error — retry if under limit
        if (item.retryCount < MAX_RETRIES) {
          remaining.push({ ...item, retryCount: item.retryCount + 1 });
        } else {
          failed++;
        }
      }
    } catch {
      // Network error — retry if under limit
      if (item.retryCount < MAX_RETRIES) {
        remaining.push({ ...item, retryCount: item.retryCount + 1 });
      } else {
        failed++;
      }
    }
  }

  saveQueue(remaining);
  setPendingCount?.(remaining.length);
  return { succeeded, failed };
}

// ---------------------------------------------------------------------------
// Remove a specific item (e.g. after a successful online save)
// ---------------------------------------------------------------------------

export function dequeueRequest(
  id: string,
  setPendingCount?: (count: number) => void
): void {
  const queue = getQueue().filter((q) => q.id !== id);
  saveQueue(queue);
  setPendingCount?.(queue.length);
}
