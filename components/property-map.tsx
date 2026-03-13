"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

// ---------------------------------------------------------------------------
// Types (unchanged — consumed by property-map-view.tsx)
// ---------------------------------------------------------------------------

export interface TreePin {
  id: string;
  treeNumber: number;
  lat: number;
  lng: number;
  status: "draft" | "assessed" | "certified";
  speciesCommon?: string;
  dbhInches?: number;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  isProtected?: boolean;
  isHeritage?: boolean;
}

export interface CircleOverlay {
  id: string;
  lat: number;
  lng: number;
  tpzRadiusFt: number;
  srzRadiusFt: number;
}

interface PropertyMapProps {
  center: { lat: number; lng: number };
  pins: TreePin[];
  circles?: CircleOverlay[];
  dimmedPinIds?: string[];
  onPinAdd?: (lat: number, lng: number) => void;
  onPinMove?: (id: string, lat: number, lng: number) => void;
  onPinClick?: (id: string) => void;
  selectedPinId?: string | null;
  flyToId?: string | null;
  interactive?: boolean;
  className?: string;
  onMapReady?: (helpers: {
    getCenter: () => { lat: number; lng: number };
    fitAllTrees: () => void;
  }) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const MAP_STYLES: Array<{ id: string; label: string }> = [
  { id: "satellite", label: "Satellite" },
  { id: "roadmap", label: "Streets" },
  { id: "terrain", label: "Terrain" },
];

/** Color by condition rating + recommended action */
function pinColor(pin: TreePin): string {
  if (pin.recommendedAction === "remove") return "#C0392B"; // red
  if (pin.conditionRating != null) {
    if (pin.conditionRating <= 1) return "#C0392B"; // red (Dead/Critical)
    if (pin.conditionRating === 2) return "#E07B3C"; // orange (Poor)
    if (pin.conditionRating === 3) return "#D4A017"; // gold (Fair)
    if (pin.conditionRating === 4) return "#3D7D68"; // forest muted (Good)
    if (pin.conditionRating >= 5) return "#1D4E3E"; // forest (Excellent)
  }
  return "#9CA3AF"; // gray — unassessed
}

/** Hex color for static map pins (same scheme, without # prefix) */
export function pinColorHex(conditionRating: number | null, recommendedAction?: string): string {
  if (recommendedAction === "remove") return "C0392B";
  if (conditionRating != null) {
    if (conditionRating <= 1) return "C0392B";
    if (conditionRating === 2) return "E07B3C";
    if (conditionRating === 3) return "D4A017";
    if (conditionRating === 4) return "3D7D68";
    if (conditionRating >= 5) return "1D4E3E";
  }
  return "9CA3AF";
}

/** Create the HTML content element for a map marker */
function createMarkerContent(
  pin: TreePin,
  isSelected: boolean,
  isDimmed: boolean
): HTMLDivElement {
  const pinSize = 32; // consistent 32px pins

  // Wrapper provides a 44px tap target (mobile-friendly)
  const wrapper = document.createElement("div");
  wrapper.style.width = "44px";
  wrapper.style.height = "44px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.cursor = "pointer";
  wrapper.style.position = "relative";
  wrapper.style.overflow = "visible";
  wrapper.style.transition = "transform 0.15s ease, opacity 0.2s ease";

  // Scale + opacity based on selection state
  if (isSelected) {
    wrapper.style.transform = "scale(1.2)";
    wrapper.style.zIndex = "20";
  } else if (isDimmed) {
    wrapper.style.opacity = "0.5";
    wrapper.style.zIndex = "1";
  } else {
    wrapper.style.zIndex = "10";
  }

  const el = document.createElement("div");
  el.style.width = `${pinSize}px`;
  el.style.height = `${pinSize}px`;
  el.style.lineHeight = `${pinSize}px`;
  el.style.textAlign = "center";
  el.style.borderRadius = "50%";
  el.style.color = "white";
  el.style.fontWeight = "700";
  el.style.fontSize = "12px";
  el.style.fontFamily = "'IBM Plex Mono', ui-monospace, monospace";
  el.style.cursor = "pointer";
  el.style.userSelect = "none";
  el.style.backgroundColor = pinColor(pin);
  el.style.transition = "box-shadow 0.15s ease";

  // Border: protection/heritage takes priority, then default white
  if (pin.isHeritage) {
    el.style.border = "2.5px solid #A855F7"; // purple
  } else if (pin.isProtected) {
    el.style.border = "2.5px solid #F59E0B"; // amber
  } else {
    el.style.border = "2px solid rgba(255,255,255,0.9)";
  }

  // Selected ring
  if (isSelected) {
    el.style.boxShadow =
      "0 0 0 3px white, 0 0 0 5px rgba(29,78,62,0.3), 0 2px 8px rgba(0,0,0,0.3)";
  } else {
    el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";
  }

  el.textContent = String(pin.treeNumber);
  wrapper.appendChild(el);

  // ---- Tooltip ----
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.bottom = "100%";
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%) translateY(-6px)";
  tooltip.style.whiteSpace = "nowrap";
  tooltip.style.padding = "4px 8px";
  tooltip.style.borderRadius = "6px";
  tooltip.style.backgroundColor = "rgba(0,0,0,0.85)";
  tooltip.style.color = "white";
  tooltip.style.fontSize = "11px";
  tooltip.style.fontWeight = "500";
  tooltip.style.pointerEvents = "none";
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity 0.15s";
  tooltip.style.zIndex = "30";
  tooltip.style.lineHeight = "1.3";

  const species = pin.speciesCommon || "Unidentified";
  const dbh = pin.dbhInches ? `${pin.dbhInches}"` : "";
  const condition =
    pin.conditionRating != null && pin.conditionRating >= 0
      ? CONDITION_LABELS[pin.conditionRating] ?? ""
      : "";
  const parts = [species, dbh, condition].filter(Boolean);
  tooltip.textContent = `#${pin.treeNumber} — ${parts.join(" \u00b7 ")}`;

  wrapper.appendChild(tooltip);

  // Hover effect: scale up + show tooltip
  wrapper.addEventListener("mouseenter", () => {
    if (!isSelected && !isDimmed) {
      wrapper.style.transform = "scale(1.15)";
      wrapper.style.zIndex = "15";
    }
    tooltip.style.opacity = "1";
  });
  wrapper.addEventListener("mouseleave", () => {
    if (!isSelected) {
      wrapper.style.transform = isDimmed ? "scale(1)" : "scale(1)";
      wrapper.style.zIndex = isDimmed ? "1" : "10";
    }
    tooltip.style.opacity = "0";
  });

  return wrapper;
}

/** Convert feet to meters */
function feetToMeters(ft: number): number {
  return ft * 0.3048;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMap({
  center,
  pins,
  circles,
  dimmedPinIds,
  onPinAdd,
  onPinMove,
  onPinClick,
  selectedPinId,
  flyToId,
  interactive = true,
  className,
  onMapReady,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const markerClickedRef = useRef(false);
  const circleOverlaysRef = useRef<google.maps.Circle[]>([]);
  const initialFitDoneRef = useRef(false);
  const mapClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const [activeStyle, setActiveStyle] = useState("satellite");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  // ---- Style change ----
  const handleStyleChange = useCallback((styleId: string) => {
    setActiveStyle(styleId);
    const map = mapRef.current;
    if (map) {
      map.setMapTypeId(styleId as google.maps.MapTypeId);
    }
  }, []);

  // ---- Cleanup markers ----
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => {
      m.map = null;
    });
    markersRef.current = [];
  }, []);

  // ---- Cleanup circles ----
  const clearCircles = useCallback(() => {
    circleOverlaysRef.current.forEach((c) => c.setMap(null));
    circleOverlaysRef.current = [];
  }, []);

  // ---- Initialize map ----
  useEffect(() => {
    if (!apiKey || !mapContainerRef.current) return;

    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapContainerRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: { lat: center.lat, lng: center.lng },
          zoom: 19,
          maxZoom: 22,
          mapTypeId: "satellite" as google.maps.MapTypeId,
          tilt: 0,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false, // We have our own toggle
          gestureHandling: "greedy",
          ...(mapId ? { mapId } : {}),
        };

        const map = new google.maps.Map(
          mapContainerRef.current!,
          mapOptions
        );

        mapRef.current = map;
        setLoaded(true);

        // Expose helpers to parent
        if (onMapReady) {
          onMapReady({
            getCenter: () => {
              const c = map.getCenter();
              return c
                ? { lat: c.lat(), lng: c.lng() }
                : { lat: center.lat, lng: center.lng };
            },
            fitAllTrees: () => {
              if (pins.length < 2) return;
              const bounds = new google.maps.LatLngBounds();
              pins.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
              map.fitBounds(bounds, 50);
            },
          });
        }
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });

    return () => {
      cancelled = true;
      clearMarkers();
      clearCircles();
      if (mapClickListenerRef.current) {
        google.maps.event.removeListener(mapClickListenerRef.current);
        mapClickListenerRef.current = null;
      }
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // ---- Map click -> add pin ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded || !interactive || !onPinAdd) return;

    // Remove previous listener
    if (mapClickListenerRef.current) {
      google.maps.event.removeListener(mapClickListenerRef.current);
    }

    mapClickListenerRef.current = map.addListener(
      "click",
      (e: google.maps.MapMouseEvent) => {
        if (markerClickedRef.current) {
          markerClickedRef.current = false;
          return;
        }
        if (e.latLng) {
          onPinAdd(e.latLng.lat(), e.latLng.lng());
        }
      }
    );

    return () => {
      if (mapClickListenerRef.current) {
        google.maps.event.removeListener(mapClickListenerRef.current);
        mapClickListenerRef.current = null;
      }
    };
  }, [loaded, interactive, onPinAdd]);

  // ---- Sync markers with pins ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;

    clearMarkers();

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId;
      const isDimmed = dimmedPinIds?.includes(pin.id) ?? false;
      const content = createMarkerContent(pin, isSelected, isDimmed);

      // Click handler on the content element
      content.addEventListener("mousedown", () => {
        markerClickedRef.current = true;
      });
      content.addEventListener("click", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
        onPinClick?.(pin.id);
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: pin.lat, lng: pin.lng },
        content,
        gmpDraggable: interactive,
        zIndex: isSelected ? 20 : isDimmed ? 1 : 10,
      });

      if (interactive && onPinMove) {
        marker.addListener("dragend", () => {
          const pos = marker.position;
          if (pos) {
            // position can be LatLng or LatLngLiteral
            const lat =
              typeof pos.lat === "function"
                ? (pos as google.maps.LatLng).lat()
                : (pos as google.maps.LatLngLiteral).lat;
            const lng =
              typeof pos.lng === "function"
                ? (pos as google.maps.LatLng).lng()
                : (pos as google.maps.LatLngLiteral).lng;
            onPinMove(pin.id, lat, lng);
          }
        });
      }

      markersRef.current.push(marker);
    });

    // Auto zoom-to-fit all pins on initial render
    if (pins.length >= 2 && !initialFitDoneRef.current) {
      initialFitDoneRef.current = true;
      const bounds = new google.maps.LatLngBounds();
      pins.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      map.fitBounds(bounds, 50);
    }
  }, [
    pins,
    selectedPinId,
    dimmedPinIds,
    interactive,
    onPinClick,
    onPinMove,
    clearMarkers,
    loaded,
  ]);

  // ---- flyTo support ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded || !flyToId) return;

    const pin = pins.find((p) => p.id === flyToId);
    if (pin) {
      map.panTo({ lat: pin.lat, lng: pin.lng });
      map.setZoom(20);
    }
  }, [flyToId, pins, loaded]);

  // ---- Sync circle overlays (TPZ/SRZ) ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;

    clearCircles();

    if (!circles || circles.length === 0) return;

    for (const c of circles) {
      // TPZ circle (dashed → solid thin orange, since Google Maps Circle doesn't support dash)
      if (c.tpzRadiusFt > 0) {
        const tpz = new google.maps.Circle({
          map,
          center: { lat: c.lat, lng: c.lng },
          radius: feetToMeters(c.tpzRadiusFt),
          strokeColor: "#f97316",
          strokeOpacity: 0.8,
          strokeWeight: 1.5,
          fillColor: "#f97316",
          fillOpacity: 0.08,
          clickable: false,
        });
        circleOverlaysRef.current.push(tpz);
      }

      // SRZ circle (solid red)
      if (c.srzRadiusFt > 0) {
        const srz = new google.maps.Circle({
          map,
          center: { lat: c.lat, lng: c.lng },
          radius: feetToMeters(c.srzRadiusFt),
          strokeColor: "#ef4444",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#ef4444",
          fillOpacity: 0.08,
          clickable: false,
        });
        circleOverlaysRef.current.push(srz);
      }
    }
  }, [circles, loaded, clearCircles]);

  // ---- No token placeholder ----
  if (!apiKey) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center text-sm text-muted-foreground ${className ?? ""}`}
      >
        <p>
          Set{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </code>{" "}
          in{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            .env
          </code>{" "}
          to enable the satellite map.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50 p-8 text-center text-sm text-red-600 ${className ?? ""}`}
      >
        <p>Failed to load Google Maps. Please check your API key.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className={`rounded-xl overflow-hidden ${className ?? ""}`}
        style={{ minHeight: 400 }}
      />
      {/* Map Style Toggle */}
      <div className="absolute top-2 right-2 z-10 flex bg-white/90 backdrop-blur-sm rounded-lg shadow-md border overflow-hidden">
        {MAP_STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleStyleChange(s.id)}
            className={`px-2.5 py-1.5 text-[10px] font-medium transition-colors ${
              activeStyle === s.id
                ? "bg-neutral-800 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {/* Legend for circle overlays */}
      {circles && circles.length > 0 && (
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-0.5 border-t-2 border-orange-500" />
            <span className="text-neutral-700">
              TPZ (Tree Protection Zone)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-red-500" />
            <span className="text-neutral-700">
              SRZ (Structural Root Zone)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
