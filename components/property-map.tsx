"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ---------------------------------------------------------------------------
// Types
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
  onPinAdd?: (lat: number, lng: number) => void;
  onPinMove?: (id: string, lat: number, lng: number) => void;
  onPinClick?: (id: string) => void;
  selectedPinId?: string | null;
  flyToId?: string | null;
  interactive?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Color by completion status: gray → yellow → green */
function pinColor(pin: TreePin): string {
  const hasSpecies = pin.speciesCommon && pin.speciesCommon.trim() !== "";
  const hasDBH = pin.dbhInches && pin.dbhInches > 0;
  const hasCondition = pin.conditionRating && pin.conditionRating > 0;
  const hasNotes =
    (pin.healthNotes && pin.healthNotes.trim() !== "") ||
    (pin.structuralNotes && pin.structuralNotes.trim() !== "");

  if (hasSpecies && hasDBH && hasCondition && hasNotes) {
    return "#16a34a"; // green-600 — fully assessed
  }
  if (hasSpecies || hasDBH) {
    return "#eab308"; // yellow-500 — partial data
  }
  return "#9ca3af"; // gray-400 — just placed, no data
}

function createMarkerElement(
  pin: TreePin,
  isSelected: boolean
): HTMLDivElement {
  const pinSize = isSelected ? 26 : 22;

  // Wrapper provides a 36px tap target while keeping visible pin small
  const wrapper = document.createElement("div");
  wrapper.style.width = "36px";
  wrapper.style.height = "36px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.cursor = "pointer";

  const el = document.createElement("div");
  el.style.width = `${pinSize}px`;
  el.style.height = `${pinSize}px`;
  el.style.lineHeight = `${pinSize}px`;
  el.style.textAlign = "center";
  el.style.borderRadius = "50%";
  el.style.color = "white";
  el.style.fontWeight = "600";
  el.style.fontSize = "10px";
  el.style.cursor = "pointer";
  el.style.userSelect = "none";
  el.style.backgroundColor = pinColor(pin);
  el.style.border = "2px solid white";
  el.style.transition = "box-shadow 0.15s";

  // Protection / heritage ring via outline
  if (pin.isHeritage) {
    el.style.outline = "2px solid #eab308";
    el.style.outlineOffset = "1px";
  } else if (pin.isProtected) {
    el.style.outline = "2px solid #22c55e";
    el.style.outlineOffset = "1px";
  }

  if (isSelected) {
    el.style.boxShadow =
      "0 0 0 3px rgba(22, 163, 74, 0.4), 0 2px 4px rgba(0,0,0,0.3)";
  } else {
    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
  }

  el.textContent = String(pin.treeNumber);
  wrapper.appendChild(el);

  // Hover effect — shadow only, no scale
  wrapper.addEventListener("mouseenter", () => {
    if (!isSelected) {
      el.style.boxShadow =
        "0 0 0 2px rgba(22, 163, 74, 0.3), 0 2px 4px rgba(0,0,0,0.3)";
    }
  });
  wrapper.addEventListener("mouseleave", () => {
    if (!isSelected) {
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
    }
  });

  return wrapper;
}

/** Generate a GeoJSON circle polygon (no turf dependency). */
function createCirclePolygon(
  center: [number, number], // [lng, lat]
  radiusFeet: number,
  points = 64
): GeoJSON.Polygon {
  const radiusMeters = radiusFeet * 0.3048;
  const coords: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const lat = center[1] + dy / 111320;
    const lng =
      center[0] + dx / (111320 * Math.cos((center[1] * Math.PI) / 180));
    coords.push([lng, lat]);
  }
  return { type: "Polygon", coordinates: [coords] };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMap({
  center,
  pins,
  circles,
  onPinAdd,
  onPinMove,
  onPinClick,
  selectedPinId,
  flyToId,
  interactive = true,
  className,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const markerClickedRef = useRef(false);
  const circleSourceIdsRef = useRef<string[]>([]);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // ---- Cleanup helper ----
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }, []);

  // ---- Initialize map ----
  useEffect(() => {
    if (!token || !mapContainerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [center.lng, center.lat],
      zoom: 19,
      maxZoom: 22,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Hide cluttering map labels for cleaner satellite view
    map.on("load", () => {
      const layersToHide = [
        "poi-label",
        "transit-label",
        "natural-point-label",
        "waterway-label",
      ];
      layersToHide.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", "none");
        }
      });
    });

    mapRef.current = map;

    return () => {
      clearMarkers();
      map.remove();
      mapRef.current = null;
    };
    // Only re-init if center changes substantially or token changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ---- Map click -> add pin ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !interactive || !onPinAdd) return;

    function handleMapClick(e: mapboxgl.MapMouseEvent) {
      // Skip if a marker was just clicked
      if (markerClickedRef.current) {
        markerClickedRef.current = false;
        return;
      }
      onPinAdd!(e.lngLat.lat, e.lngLat.lng);
    }

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [interactive, onPinAdd]);

  // ---- Sync markers with pins ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    clearMarkers();

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId;
      const el = createMarkerElement(pin, isSelected);

      // Prevent map click when clicking marker
      el.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
      });

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
        onPinClick?.(pin.id);
      });

      const marker = new mapboxgl.Marker({
        element: el,
        draggable: interactive,
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      if (interactive && onPinMove) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          onPinMove(pin.id, lngLat.lat, lngLat.lng);
        });
      }

      markersRef.current.push(marker);
    });
  }, [pins, selectedPinId, interactive, onPinClick, onPinMove, clearMarkers]);

  // ---- flyTo support ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToId) return;

    const pin = pins.find((p) => p.id === flyToId);
    if (pin) {
      map.flyTo({ center: [pin.lng, pin.lat], zoom: 20, duration: 800 });
    }
  }, [flyToId, pins]);

  // ---- Sync circle overlays (TPZ/SRZ) ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function syncCircles() {
      // Remove old circle layers/sources
      for (const sourceId of circleSourceIdsRef.current) {
        if (map!.getLayer(`${sourceId}-tpz-fill`))
          map!.removeLayer(`${sourceId}-tpz-fill`);
        if (map!.getLayer(`${sourceId}-tpz-line`))
          map!.removeLayer(`${sourceId}-tpz-line`);
        if (map!.getLayer(`${sourceId}-srz-fill`))
          map!.removeLayer(`${sourceId}-srz-fill`);
        if (map!.getLayer(`${sourceId}-srz-line`))
          map!.removeLayer(`${sourceId}-srz-line`);
        if (map!.getSource(sourceId)) map!.removeSource(sourceId);
      }
      circleSourceIdsRef.current = [];

      if (!circles || circles.length === 0) return;

      // Build a combined FeatureCollection for TPZ and SRZ
      const tpzFeatures: GeoJSON.Feature[] = [];
      const srzFeatures: GeoJSON.Feature[] = [];

      for (const c of circles) {
        if (c.tpzRadiusFt > 0) {
          tpzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "TPZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.tpzRadiusFt),
          });
        }
        if (c.srzRadiusFt > 0) {
          srzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "SRZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.srzRadiusFt),
          });
        }
      }

      // TPZ source + layers
      if (tpzFeatures.length > 0) {
        const tpzSourceId = "tpz-circles";
        map!.addSource(tpzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: tpzFeatures },
        });
        map!.addLayer({
          id: `${tpzSourceId}-fill`,
          type: "fill",
          source: tpzSourceId,
          paint: {
            "fill-color": "#f97316", // orange
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${tpzSourceId}-line`,
          type: "line",
          source: tpzSourceId,
          paint: {
            "line-color": "#f97316",
            "line-width": 2,
            "line-dasharray": [4, 2],
          },
        });
        circleSourceIdsRef.current.push(tpzSourceId);
      }

      // SRZ source + layers
      if (srzFeatures.length > 0) {
        const srzSourceId = "srz-circles";
        map!.addSource(srzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: srzFeatures },
        });
        map!.addLayer({
          id: `${srzSourceId}-fill`,
          type: "fill",
          source: srzSourceId,
          paint: {
            "fill-color": "#ef4444", // red
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${srzSourceId}-line`,
          type: "line",
          source: srzSourceId,
          paint: {
            "line-color": "#ef4444",
            "line-width": 2,
          },
        });
        circleSourceIdsRef.current.push(srzSourceId);
      }
    }

    // If style is already loaded, sync immediately; otherwise wait
    if (map.isStyleLoaded()) {
      syncCircles();
    } else {
      map.on("style.load", syncCircles);
      return () => {
        map.off("style.load", syncCircles);
      };
    }
  }, [circles]);

  // ---- No token placeholder ----
  if (!token) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center text-sm text-muted-foreground ${className ?? ""}`}
      >
        <p>
          Set <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> in{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">.env</code> to enable the satellite map.
        </p>
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
      {/* Legend for circle overlays */}
      {circles && circles.length > 0 && (
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-orange-500" />
            <span className="text-gray-700">TPZ (Tree Protection Zone)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-red-500" />
            <span className="text-gray-700">SRZ (Structural Root Zone)</span>
          </div>
        </div>
      )}
    </div>
  );
}
