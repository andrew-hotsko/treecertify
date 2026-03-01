"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { TreeSummaryPanel } from "@/components/tree-summary-panel";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyAudioNotes } from "@/components/property-audio-notes";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  FileText,
  TreePine,
  Mic,
  ChevronDown,
  HardHat,
  Loader2,
  ClipboardList,
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
  trees: TreeData[];
  reports: { id: string; status: string }[];
}

interface PropertyMapViewProps {
  property: PropertyData;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMapView({ property }: PropertyMapViewProps) {
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
  const [savingSiteInfo, setSavingSiteInfo] = useState(false);

  const reportType = property.reportType ?? "health_assessment";
  const reportTypeConfig = getReportTypeConfig(reportType);

  // ---- Derived ----
  const selectedTree = trees.find((t) => t.id === selectedTreeId) ?? null;

  const center = {
    lat: property.lat ?? 37.4419,
    lng: property.lng ?? -122.143,
  };

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

  // ---- Handlers ----
  const handlePinAdd = useCallback(
    (lat: number, lng: number) => {
      setPendingPin({ lat, lng });
      setSelectedTreeId(null);
      setShowSidePanel(true);
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
          setPendingPin(null);
          setSelectedTreeId(newTree.id);
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
        }
      } catch (err) {
        console.error("Save failed:", err);
      } finally {
        setSaving(false);
      }
    },
    [pendingPin, selectedTreeId, property.id, trees.length]
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

  const handleSelectTreeFromSummary = useCallback((id: string) => {
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
        }),
      });
    } catch (err) {
      console.error("Failed to save site info:", err);
    } finally {
      setSavingSiteInfo(false);
    }
  }, [property.id, scopeOfAssignment, siteObservations]);

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Properties
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                {property.address}
              </h1>
              {reportTypeConfig && (
                <Badge variant="outline" className="text-xs">
                  {reportTypeConfig.label}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{property.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <TreePine className="h-3 w-3" />
            {trees.length} tree{trees.length !== 1 ? "s" : ""}
          </Badge>
          <Link href={`/properties/${property.id}/report`}>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </Link>
        </div>
      </div>

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
              <ChevronDown
                className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                  projectOpen ? "rotate-180" : ""
                }`}
              />
            </CardTitle>
          </CardHeader>
          {projectOpen && (
            <CardContent className="pt-0 space-y-3">
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
              <div className="grid grid-cols-2 gap-3">
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
            <ChevronDown
              className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                siteInfoOpen ? "rotate-180" : ""
              }`}
            />
          </CardTitle>
        </CardHeader>
        {siteInfoOpen && (
          <CardContent className="pt-0 space-y-3">
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
            <ChevronDown
              className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                audioOpen ? "rotate-180" : ""
              }`}
            />
          </CardTitle>
        </CardHeader>
        {audioOpen && (
          <CardContent className="pt-0">
            <PropertyAudioNotes propertyId={property.id} />
          </CardContent>
        )}
      </Card>

      {/* Main Area: Map + Side Panel */}
      <div className="flex gap-0 rounded-xl border overflow-hidden">
        {/* Map */}
        <div className="flex-1" style={{ minHeight: 500 }}>
          <PropertyMap
            center={center}
            pins={pins}
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

        {/* Side Panel */}
        {showSidePanel && (
          <TreeSidePanel
            tree={sidePanelTree}
            treeNumber={sidePanelTreeNumber}
            propertyId={property.id}
            propertyCity={property.city}
            reportType={reportType}
            onSave={handleSave}
            onDelete={
              selectedTree ? handleDelete : undefined
            }
            onClose={handleClosePanel}
            saving={saving}
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
