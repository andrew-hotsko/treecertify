import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Normalize a string to Title Case (e.g. "south lake tahoe" → "South Lake Tahoe"). */
export function toTitleCase(str: string): string {
  return str.trim().replace(/\b\w/g, (c) => c.toUpperCase());
}
