"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Crosshair, Navigation, Loader2 } from "lucide-react";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PinDropMapProps {
  initialCenter: { lat: number; lng: number };
  existingPins?: Array<{ lat: number; lng: number; treeNumber: number }>;
  onConfirm: (lat: number, lng: number) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PinDropMap({
  initialCenter,
  existingPins = [],
  onConfirm,
}: PinDropMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // ---- Initialize Google Maps ----
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    loadGoogleMaps().then(() => {
      if (cancelled || !mapContainerRef.current) return;

      const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

      const map = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: initialCenter.lat, lng: initialCenter.lng },
        zoom: 19,
        mapTypeId: "satellite" as google.maps.MapTypeId,
        tilt: 0,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        ...(mapId ? { mapId } : {}),
      });

      mapRef.current = map;

      map.addListener("idle", () => {
        if (!cancelled) setMapReady(true);
      });

      // Add existing tree pins as small numbered context dots
      if (existingPins.length > 0) {
        existingPins.forEach((pin) => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 24px; height: 24px; border-radius: 50%;
            background: rgba(156, 163, 175, 0.85);
            border: 2px solid white;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 700; color: white;
            font-family: ui-monospace, monospace;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            pointer-events: none;
          `;
          el.textContent = String(pin.treeNumber);

          new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: pin.lat, lng: pin.lng },
            content: el,
          });
        });
      }
    });

    return () => {
      cancelled = true;
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- GPS locate ----
  const handleGpsLocate = useCallback(() => {
    if (!mapRef.current || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setGpsAccuracy(Math.round(accuracy));
        setLocating(false);
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
        mapRef.current?.setZoom(20);
      },
      () => {
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // ---- Confirm pin ----
  const handleConfirm = useCallback(() => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    if (center) {
      onConfirm(center.lat(), center.lng());
    }
    // Haptic
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [onConfirm]);

  return (
    <div className="relative w-full h-full" style={{ colorScheme: "light" }}>
      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Centered crosshair pin */}
      {mapReady && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center -translate-y-4">
            {/* Pin head */}
            <div className="w-8 h-8 rounded-full bg-forest border-[3px] border-white shadow-lg flex items-center justify-center">
              <Crosshair className="h-4 w-4 text-white" />
            </div>
            {/* Pin tail */}
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-forest -mt-0.5" />
            {/* Shadow dot */}
            <div className="w-2 h-1 rounded-full bg-black/20 mt-0.5" />
          </div>
        </div>
      )}

      {/* GPS button — bottom left */}
      <button
        type="button"
        onClick={handleGpsLocate}
        disabled={locating}
        className="absolute bottom-28 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg active:scale-95 transition-transform"
        aria-label="Use my location"
      >
        {locating ? (
          <Loader2 className="h-5 w-5 text-forest animate-spin" />
        ) : (
          <Navigation className="h-5 w-5 text-forest" />
        )}
      </button>

      {/* GPS accuracy indicator */}
      {gpsAccuracy !== null && (
        <div className="absolute bottom-28 left-[4.5rem] z-20 flex items-center h-8 px-2.5 rounded-full bg-white/90 shadow text-xs font-mono text-neutral-600">
          ± {gpsAccuracy}m
        </div>
      )}

      {/* Confirm Location button — full width at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
        }}
      >
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full h-14 rounded-xl bg-forest text-white text-base font-semibold shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}
