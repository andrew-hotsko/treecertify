/**
 * Singleton Google Maps JavaScript API loader.
 * Loads the script once, returns the same promise for all callers.
 * Includes the `marker` library for AdvancedMarkerElement support.
 */

let loadPromise: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    // Already loaded (e.g. via <script> in _document)
    if (typeof window !== "undefined" && window.google?.maps) {
      resolve();
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null; // Allow retry
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
