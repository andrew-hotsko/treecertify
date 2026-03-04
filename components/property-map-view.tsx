"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { TreeSummaryPanel } from "@/components/tree-summary-panel";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyAudioNotes } from "@/components/property-audio-notes";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import {
  ChevronLeft,
  FileText,
  TreePine,
  Mic,
  ChevronDown,
  HardHat,
  Loader2,
  ClipboardList,
  Download,
  FileDown,
  Share2,
  Copy,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Dynamically import PropertyMap with SSR disabled (Mapbox GL needs window/DOM)
const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeData {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  pinLat: number;
  pinLng: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface PropertyData {
  id: string;
  address: string;
  city: string;
  lat: number | null;
  lng: number | null;
  reportType?: string;
  projectDescription?: string | null;
  permitNumber?: string | null;
  developerName?: string | null;
  architectName?: string | null;
  siteObservations?: string | null;
  scopeOfAssignment?: string | null;
  neededByDate?: string | null;
  trees: TreeData[];
  reports: { id: string; status: string; reportType: string; certifiedAt?: string | null }[];
}

interface PropertyMapViewProps {
  property: PropertyData;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isTreeComplete(tree: TreeData): boolean {
  return !!(
    tree.speciesCommon?.trim() &&
    tree.dbhInches && tree.dbhInches > 0 &&
    tree.conditionRating && tree.conditionRating > 0 &&
    (tree.healthNotes?.trim() || tree.structuralNotes?.trim())
  );
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_DOT_COLOR: Record<number, string> = {
  0: "bg-gray-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-500",
};

type FilterKey = "all" | "incomplete" | "protected" | "remove" | "retain";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMapView({ property }: PropertyMapViewProps) {
  const router = useRouter();
  const [trees, setTrees] = useState<TreeData[]>(property.trees ?? []);
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const [pendingPin, setPendingPin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flyToId, setFlyToId] = useState<string | null>(null);
  const [audioOpen, setAudioOpen] = useState(false);

  // Quick-entry mode: auto-advance after save
  const [showPlacementPrompt, setShowPlacementPrompt] = useState(false);
  const [lastSavedNumber, setLastSavedNumber] = useState(0);

  // Quick Add mode — keep panel open after save, auto-create next pending pin
  const [quickAddMode, setQuickAddMode] = useState(false);
  const mapGetCenterRef = useRef<(() => { lat: number; lng: number }) | null>(null);

  // Copy from last tree
  const [lastSavedTree, setLastSavedTree] = useState<TreeData | null>(null);

  // Recent species tracking (last 3 unique species for quick-tap chips)
  const [recentSpecies, setRecentSpecies] = useState<
    { common: string; scientific: string }[]
  >([]);

  // Tree list panel (desktop only)
  const [showTreeList, setShowTreeList] = useState(true);

  // Filter chips
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Map legend
  const [showLegend, setShowLegend] = useState(false);

  // Share link
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [showSharePopover, setShowSharePopover] = useState(false);
  const [sharingLoading, setSharingLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Construction encroachment project fields
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectDescription, setProjectDescription] = useState(
    property.projectDescription ?? ""
  );
  const [permitNumber, setPermitNumber] = useState(
    property.permitNumber ?? ""
  );
  const [developerName, setDeveloperName] = useState(
    property.developerName ?? ""
  );
  const [architectName, setArchitectName] = useState(
    property.architectName ?? ""
  );
  const [savingProject, setSavingProject] = useState(false);

  // Site information fields
  const [siteInfoOpen, setSiteInfoOpen] = useState(false);
  const [scopeOfAssignment, setScopeOfAssignment] = useState(
    property.scopeOfAssignment ?? ""
  );
  const [siteObservations, setSiteObservations] = useState(
    property.siteObservations ?? ""
  );
  const [neededByDate, setNeededByDate] = useState(
    property.neededByDate ? property.neededByDate.split("T")[0] : ""
  );
  const [savingSiteInfo, setSavingSiteInfo] = useState(false);

  const reportType = property.reportType ?? "health_assessment";
  const reportTypeConfig = getReportTypeConfig(reportType);

  // ---- Derived ----
  const selectedTree = trees.find((t) => t.id === selectedTreeId) ?? null;

  const center = {
    lat: property.lat ?? 37.4419,
    lng: property.lng ?? -122.143,
  };

  // Progress counts
  const assessedCount = trees.filter((t) => isTreeComplete(t)).length;
  const protectedCount = trees.filter((t) => t.isProtected).length;

  // Filter logic: compute dimmed pin IDs
  const dimmedPinIds =
    activeFilter === "all"
      ? []
      : trees
          .filter((t) => {
            switch (activeFilter) {
              case "incomplete":
                return isTreeComplete(t);
              case "protected":
                return !t.isProtected;
              case "remove":
                return t.recommendedAction !== "remove";
              case "retain":
                return t.recommendedAction !== "retain";
              default:
                return false;
            }
          })
          .map((t) => t.id);

  // Convert trees to pins
  const pins: TreePin[] = trees.map((t) => ({
    id: t.id,
    treeNumber: t.treeNumber,
    lat: t.pinLat,
    lng: t.pinLng,
    status: (t.status ?? "draft") as TreePin["status"],
    speciesCommon: t.speciesCommon,
    dbhInches: t.dbhInches,
    conditionRating: t.conditionRating,
    healthNotes: t.healthNotes,
    structuralNotes: t.structuralNotes,
    recommendedAction: t.recommendedAction,
    isProtected: t.isProtected,
  }));

  // Add pending pin if exists
  if (pendingPin) {
    pins.push({
      id: "pending",
      treeNumber: trees.length + 1,
      lat: pendingPin.lat,
      lng: pendingPin.lng,
      status: "draft",
    });
  }

  // Filter chip definitions
  const filterChips: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: trees.length },
    { key: "incomplete", label: "Needs Data", count: trees.filter((t) => !isTreeComplete(t)).length },
    { key: "protected", label: "Protected", count: trees.filter((t) => t.isProtected).length },
    { key: "remove", label: "Remove", count: trees.filter((t) => t.recommendedAction === "remove").length },
    { key: "retain", label: "Retain", count: trees.filter((t) => t.recommendedAction === "retain").length },
  ];

  // ---- Handlers ----
  const handlePinAdd = useCallback(
    (lat: number, lng: number) => {
      setPendingPin({ lat, lng });
      setSelectedTreeId(null);
      setShowSidePanel(true);
      setShowPlacementPrompt(false);
    },
    []
  );

  const handlePinClick = useCallback(
    (id: string) => {
      if (id === "pending") return;
      setPendingPin(null);
      setSelectedTreeId(id);
      setShowSidePanel(true);
    },
    []
  );

  const handlePinMove = useCallback(
    async (id: string, lat: number, lng: number) => {
      if (id === "pending") {
        setPendingPin({ lat, lng });
        return;
      }

      // Optimistic update
      setTrees((prev) =>
        prev.map((t) => (t.id === id ? { ...t, pinLat: lat, pinLng: lng } : t))
      );

      try {
        await fetch(`/api/trees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinLat: lat, pinLng: lng }),
        });
      } catch {
        // Revert on failure - refetch would be ideal but keep it simple
      }
    },
    []
  );

  const handleSave = useCallback(
    async (data: TreeFormData) => {
      setSaving(true);
      try {
        if (pendingPin) {
          // Create new tree
          const res = await fetch(`/api/properties/${property.id}/trees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              pinLat: pendingPin.lat,
              pinLng: pendingPin.lng,
              treeNumber: trees.length + 1,
            }),
          });

          if (!res.ok) throw new Error("Failed to create tree");
          const newTree = await res.json();

          setTrees((prev) => [...prev, newTree]);
          setLastSavedTree(newTree);
          setLastSavedNumber(newTree.treeNumber);

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }

          if (quickAddMode) {
            // Quick Add: create new pending pin at map center, reset panel
            const mapCenter = mapGetCenterRef.current?.();
            const nextCenter = mapCenter ?? {
              lat: pendingPin.lat + 0.00002,
              lng: pendingPin.lng + 0.00002,
            };
            setPendingPin(nextCenter);
            setSelectedTreeId(null);
            // showSidePanel stays true — panel resets via new pendingPin
          } else {
            // Normal: close panel and show placement prompt
            setPendingPin(null);
            setSelectedTreeId(null);
            setShowSidePanel(false);
            setShowPlacementPrompt(true);
          }
        } else if (selectedTreeId) {
          // Update existing tree
          const res = await fetch(`/api/trees/${selectedTreeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) throw new Error("Failed to update tree");
          const updatedTree = await res.json();

          setTrees((prev) =>
            prev.map((t) => (t.id === selectedTreeId ? updatedTree : t))
          );
          setLastSavedTree(updatedTree);

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }
        }
      } catch (err) {
        console.error("Save failed:", err);
      } finally {
        setSaving(false);
      }
    },
    [pendingPin, selectedTreeId, property.id, trees.length, quickAddMode]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedTreeId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trees/${selectedTreeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete tree");

      setTrees((prev) => prev.filter((t) => t.id !== selectedTreeId));
      setSelectedTreeId(null);
      setShowSidePanel(false);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSaving(false);
    }
  }, [selectedTreeId]);

  const handleClosePanel = useCallback(() => {
    setShowSidePanel(false);
    setSelectedTreeId(null);
    setPendingPin(null);
  }, []);

  const handleMapReady = useCallback(
    (helpers: { getCenter: () => { lat: number; lng: number } }) => {
      mapGetCenterRef.current = helpers.getCenter;
    },
    []
  );

  const handleSelectTreeFromSummary = useCallback((id: string) => {
    setPendingPin(null);
    setSelectedTreeId(id);
    setShowSidePanel(true);
    setFlyToId(id);
  }, []);

  const handleSelectTreeFromList = useCallback((id: string) => {
    setPendingPin(null);
    setSelectedTreeId(id);
    setShowSidePanel(true);
    setFlyToId(id);
  }, []);

  const handleSaveProject = useCallback(async () => {
    setSavingProject(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectDescription.trim() || null,
          permitNumber: permitNumber.trim() || null,
          developerName: developerName.trim() || null,
          architectName: architectName.trim() || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save project info:", err);
    } finally {
      setSavingProject(false);
    }
  }, [property.id, projectDescription, permitNumber, developerName, architectName]);

  const handleSaveSiteInfo = useCallback(async () => {
    setSavingSiteInfo(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scopeOfAssignment: scopeOfAssignment.trim() || null,
          siteObservations: siteObservations.trim() || null,
          neededByDate: neededByDate || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save site info:", err);
    } finally {
      setSavingSiteInfo(false);
    }
  }, [property.id, scopeOfAssignment, siteObservations, neededByDate]);

  const handleDuplicate = useCallback(async () => {
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: "(New Property)",
          city: property.city,
          county: "",
          reportType,
          scopeOfAssignment: property.scopeOfAssignment || undefined,
        }),
      });
      if (res.ok) {
        const newProperty = await res.json();
        router.push(`/properties/${newProperty.id}`);
      }
    } catch (err) {
      console.error("Failed to duplicate:", err);
    }
  }, [property.city, property.scopeOfAssignment, reportType, router]);

  const handleShare = useCallback(async () => {
    setSharingLoading(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/share`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setShareToken(data.shareToken);
        setShowSharePopover(true);
      }
    } catch (err) {
      console.error("Failed to create share link:", err);
    } finally {
      setSharingLoading(false);
    }
  }, [property.id]);

  const handleRevokeShare = useCallback(async () => {
    setSharingLoading(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/share`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShareToken(null);
        setShowSharePopover(false);
        setShareCopied(false);
      }
    } catch (err) {
      console.error("Failed to revoke share link:", err);
    } finally {
      setSharingLoading(false);
    }
  }, [property.id]);

  const handleCopyShareLink = useCallback(() => {
    if (!shareToken) return;
    const url = `${window.location.origin}/share/${shareToken}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }, [shareToken]);

  // ---- Current side panel data ----
  const sidePanelTree = pendingPin
    ? { pinLat: pendingPin.lat, pinLng: pendingPin.lng }
    : selectedTree;
  const sidePanelTreeNumber = pendingPin
    ? trees.length + 1
    : selectedTree?.treeNumber ?? 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/properties" className="shrink-0">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold truncate">
                {property.address}
              </h1>
              {reportTypeConfig && (
                <Badge variant="outline" className="text-xs shrink-0 hidden sm:inline-flex">
                  {reportTypeConfig.label}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{property.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Add toggle */}
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="quick-add-toggle"
              className={`flex items-center gap-1 text-xs cursor-pointer select-none ${
                quickAddMode ? "text-amber-700 font-medium" : "text-muted-foreground"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${quickAddMode ? "text-amber-500" : ""}`} />
              <span className="hidden sm:inline">Quick Add</span>
            </label>
            <Switch
              id="quick-add-toggle"
              checked={quickAddMode}
              onCheckedChange={setQuickAddMode}
              className="scale-75"
            />
          </div>
          <Badge variant="secondary" className="gap-1">
            <TreePine className="h-3 w-3" />
            {trees.length} tree{trees.length !== 1 ? "s" : ""}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            title="Duplicate property setup"
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            <span className="hidden sm:inline">Duplicate</span>
          </Button>
          {trees.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/properties/${property.id}/trees/export`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              title="Export tree inventory as CSV"
            >
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          )}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              disabled={sharingLoading}
              title="Share property map"
            >
              {sharingLoading ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
              )}
              <span className="hidden sm:inline">Share</span>
            </Button>
            {showSharePopover && shareToken && (
              <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-lg border shadow-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Share Link</h3>
                  <button
                    onClick={() => {
                      setShowSharePopover(false);
                      setShareCopied(false);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareToken}`}
                    className="flex-1 text-xs bg-gray-50 border rounded px-2 py-1.5 text-gray-700 select-all"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyShareLink}
                    className="shrink-0"
                  >
                    {shareCopied ? (
                      <span className="text-emerald-600 text-xs">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view the property map and tree inventory.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRevokeShare}
                  disabled={sharingLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                >
                  {sharingLoading ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : (
                    "Revoke Link"
                  )}
                </Button>
              </div>
            )}
          </div>
          {property.reports && property.reports.length > 0 ? (
            <div className="flex items-center gap-2">
              <StatusBadge status={property.reports[0].status} />
              <Link href={`/properties/${property.id}/report`}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">
                    {property.reports[0].status === "certified"
                      ? "View Report"
                      : "Edit Report"}
                  </span>
                </Button>
              </Link>
              {property.reports[0].status === "certified" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = `/api/reports/${property.reports[0].id}/pdf`;
                      a.download = "";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = `/api/reports/${property.reports[0].id}/word`;
                      a.download = "";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                  >
                    <FileDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const pdfUrl = `/api/reports/${property.reports[0].id}/pdf`;
                      if (navigator.share) {
                        try {
                          const res = await fetch(pdfUrl);
                          const blob = await res.blob();
                          const file = new File(
                            [blob],
                            `report-${property.reports[0].id}.pdf`,
                            { type: "application/pdf" }
                          );
                          await navigator.share({
                            title: `Tree Report — ${property.address}`,
                            files: [file],
                          });
                        } catch {
                          // User cancelled or share failed
                        }
                      } else {
                        const a = document.createElement("a");
                        a.href = pdfUrl;
                        a.download = "";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Link href={`/properties/${property.id}/report`}>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Generate Report
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Sample property banner */}
      {property.address === "123 Sample Street" && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
          This is a sample property to help you explore TreeCertify. Feel free to generate a report, try the certification flow, or delete it when you&apos;re ready.
        </div>
      )}

      {/* Construction Encroachment: Project Info Card */}
      {reportType === "construction_encroachment" && (
        <Card>
          <CardHeader
            className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setProjectOpen((v) => !v)}
          >
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <HardHat className="h-4 w-4 text-blue-600" />
              Project Information
              <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    projectOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </CardTitle>
          </CardHeader>
          {projectOpen && (
            <CardContent className="pt-0 px-3 md:px-6 space-y-3">
              <div>
                <Label htmlFor="mv-proj-desc" className="text-xs">
                  Project Description
                </Label>
                <Input
                  id="mv-proj-desc"
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="mv-permit" className="text-xs">
                    Permit Number
                  </Label>
                  <Input
                    id="mv-permit"
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mv-developer" className="text-xs">
                    Developer / Contractor
                  </Label>
                  <Input
                    id="mv-developer"
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label htmlFor="mv-architect" className="text-xs">
                    Architect
                  </Label>
                  <Input
                    id="mv-architect"
                    placeholder="Jane Smith, AIA"
                    value={architectName}
                    onChange={(e) => setArchitectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleSaveProject}
                  disabled={savingProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {savingProject ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Site Information */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setSiteInfoOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-violet-600" />
            Site Information
            <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  siteInfoOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </CardTitle>
        </CardHeader>
        {siteInfoOpen && (
          <CardContent className="pt-0 px-3 md:px-6 space-y-3">
            <div>
              <Label htmlFor="mv-needed-by" className="text-xs">
                Needed By
              </Label>
              <Input
                id="mv-needed-by"
                type="date"
                value={neededByDate}
                onChange={(e) => setNeededByDate(e.target.value)}
                className="mt-1 w-48"
              />
            </div>
            <div>
              <Label htmlFor="mv-scope" className="text-xs">
                Scope of Assignment
              </Label>
              <Textarea
                id="mv-scope"
                placeholder="Describe the scope and purpose of this assessment..."
                value={scopeOfAssignment}
                onChange={(e) => setScopeOfAssignment(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mv-site-obs" className="text-xs">
                Site Observations
              </Label>
              <Textarea
                id="mv-site-obs"
                placeholder="Describe site conditions, terrain, surrounding land use..."
                value={siteObservations}
                onChange={(e) => setSiteObservations(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSaveSiteInfo}
                disabled={savingSiteInfo}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {savingSiteInfo ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Site Audio Notes */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setAudioOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Mic className="h-4 w-4 text-emerald-600" />
            Site Audio Notes
            <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  audioOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </CardTitle>
        </CardHeader>
        {audioOpen && (
          <CardContent className="pt-0 px-3 md:px-6">
            <PropertyAudioNotes propertyId={property.id} />
          </CardContent>
        )}
      </Card>

      {/* Protected Trees Permit Warning Banner */}
      {trees.some((t) => t.isProtected) && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Protected trees on this property may require permits before work
            begins. Check individual tree details for permit requirements.
          </p>
        </div>
      )}

      {/* Filter Chips */}
      {trees.length > 0 && (
        <div className="flex items-center gap-1.5 px-1 overflow-x-auto">
          {filterChips
            .filter((f) => f.key === "all" || f.count > 0)
            .map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
        </div>
      )}

      {/* Main Area: Tree List + Map + Side Panel */}
      <div className="flex gap-0 rounded-xl border overflow-hidden relative">
        {/* Quick-entry placement prompt */}
        {showPlacementPrompt && !selectedTreeId && !pendingPin && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span>&#10003; Tree #{lastSavedNumber} saved</span>
            <span className="text-emerald-200">&middot;</span>
            <span>Tap map to place Tree #{lastSavedNumber + 1}</span>
            <button
              onClick={() => setShowPlacementPrompt(false)}
              className="ml-1 text-emerald-200 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Tree List Panel — desktop only */}
        {showTreeList && trees.length > 0 && (
          <div className="hidden md:flex flex-col w-60 border-r bg-white overflow-hidden flex-shrink-0">
            <div className="p-3 border-b flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trees ({trees.length})
              </h3>
              <button
                onClick={() => setShowTreeList(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y overflow-y-auto flex-1">
              {[...trees]
                .sort((a, b) => a.treeNumber - b.treeNumber)
                .map((tree) => {
                  const isDimmed = dimmedPinIds.includes(tree.id);
                  return (
                    <button
                      key={tree.id}
                      onClick={() => handleSelectTreeFromList(tree.id)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        selectedTreeId === tree.id
                          ? "bg-emerald-50 border-l-2 border-emerald-600"
                          : ""
                      } ${isDimmed ? "opacity-40" : ""}`}
                    >
                      <span className="font-mono font-semibold text-muted-foreground w-6">
                        #{tree.treeNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">
                          {tree.speciesCommon || "Unidentified"}
                        </p>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          {tree.dbhInches ? (
                            <span>{tree.dbhInches}&quot;</span>
                          ) : null}
                          {tree.conditionRating != null && tree.conditionRating > 0 ? (
                            <span className="flex items-center gap-0.5">
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full ${
                                  CONDITION_DOT_COLOR[tree.conditionRating] ?? "bg-gray-400"
                                }`}
                              />
                              {CONDITION_LABELS[tree.conditionRating]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {tree.isProtected && (
                        <ShieldCheck className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* Map area — with relative positioning for overlays */}
        <div className="w-full md:flex-1 relative" style={{ minHeight: 400 }}>
          {/* Tree list toggle button (when list is hidden) */}
          {!showTreeList && trees.length > 0 && (
            <button
              onClick={() => setShowTreeList(true)}
              className="hidden md:flex absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground items-center gap-1"
            >
              <PanelLeftOpen className="h-3.5 w-3.5" />
              Trees
            </button>
          )}

          {/* Tree count progress badge */}
          {trees.length > 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-full shadow-md border px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <TreePine className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {trees.length} tree{trees.length !== 1 ? "s" : ""}
              </span>
              <span className="text-muted-foreground">&middot;</span>
              <span className="text-emerald-600">{assessedCount} assessed</span>
              {protectedCount > 0 && (
                <>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="text-emerald-600">
                    {protectedCount} protected
                  </span>
                </>
              )}
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-10">
            {showLegend ? (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border p-2.5 text-[10px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">
                    Legend
                  </span>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white shadow-sm" />
                    <span>Excellent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#84cc16] border-2 border-white shadow-sm" />
                    <span>Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#eab308] border-2 border-white shadow-sm" />
                    <span>Fair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f97316] border-2 border-white shadow-sm" />
                    <span>Poor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] border-2 border-white shadow-sm" />
                    <span>Dead / Critical / Remove</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#9ca3af] border-2 border-white shadow-sm" />
                    <span>Unassessed</span>
                  </div>
                  <div className="border-t pt-1 mt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white outline outline-2 outline-[#22c55e]"
                        style={{ outlineOffset: "1px" }}
                      />
                      <span>Protected</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white outline outline-2 outline-[#eab308]"
                        style={{ outlineOffset: "1px" }}
                      />
                      <span>Heritage</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLegend(true)}
                className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground"
              >
                Legend
              </button>
            )}
          </div>

          <PropertyMap
            center={center}
            pins={pins}
            dimmedPinIds={dimmedPinIds}
            onMapReady={handleMapReady}
            circles={
              reportType === "construction_encroachment"
                ? trees
                    .filter((t) => t.pinLat && t.pinLng && t.dbhInches > 0)
                    .map(
                      (t): CircleOverlay => ({
                        id: t.id,
                        lat: t.pinLat,
                        lng: t.pinLng,
                        tpzRadiusFt: calcTpzRadius(t.dbhInches),
                        srzRadiusFt: calcSrzRadius(t.dbhInches),
                      })
                    )
                : undefined
            }
            onPinAdd={handlePinAdd}
            onPinClick={handlePinClick}
            onPinMove={handlePinMove}
            selectedPinId={pendingPin ? "pending" : selectedTreeId}
            flyToId={flyToId}
            interactive
            className="h-full w-full"
          />
        </div>

        {/* Side Panel — bottom sheet on mobile, right panel on desktop */}
        {showSidePanel && (
          <TreeSidePanel
            tree={sidePanelTree}
            treeNumber={sidePanelTreeNumber}
            totalTrees={trees.length}
            propertyId={property.id}
            propertyCity={property.city}
            reportType={reportType}
            onSave={handleSave}
            onDelete={
              selectedTree ? handleDelete : undefined
            }
            onClose={handleClosePanel}
            saving={saving}
            lastSavedTree={lastSavedTree}
            recentSpecies={recentSpecies}
            quickAddMode={quickAddMode}
          />
        )}
      </div>

      {/* Summary Panel */}
      <TreeSummaryPanel
        trees={trees}
        selectedTreeId={selectedTreeId}
        onSelectTree={handleSelectTreeFromSummary}
        reportType={reportType}
      />
    </div>
  );
}
