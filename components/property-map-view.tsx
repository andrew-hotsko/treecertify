"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { enqueueRequest, processQueue } from "@/lib/api-queue";
import { processPhotoQueue } from "@/lib/photo-queue";
import { useConnectivity } from "@/lib/connectivity";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { MobileFieldMode } from "@/components/mobile-field-mode";
import { type Observation } from "@/lib/default-observations";
import { TreeSummaryPanel } from "@/components/tree-summary-panel";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceInput } from "@/components/voice-input";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { VALUATION_PURPOSES, DEFAULT_BASIS_STATEMENT, formatCurrency } from "@/lib/valuation";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { OnboardingHint } from "@/components/onboarding-hint";
import {
  ChevronLeft,
  FileText,
  TreePine,
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
  Trash2,
  Smartphone,
  Monitor,
  DollarSign,
  Save,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Dynamically import PropertyMap with SSR disabled (Mapbox GL needs window/DOM)
const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-neutral-200 animate-pulse">
        <div className="text-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-forest" />
          <p className="text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
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
  valuationAppraisedValue?: number | null;
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
  reports: { id: string; status: string; reportType: string; certifiedAt?: string | null; valuationPurpose?: string | null; valuationBasisStatement?: string | null; valuationTotalValue?: number | null }[];
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

function generateScopeTemplate(
  reportType: string,
  address: string,
  city: string,
  treeCount: number
): string {
  const subject =
    treeCount > 0
      ? `${treeCount} tree${treeCount !== 1 ? "s" : ""}`
      : "the subject tree(s)";
  const location = `${address}, ${city}`;

  switch (reportType) {
    case "removal_permit":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of ${subject} at ${location} to evaluate health, structural condition, and risk, and to provide professional recommendations regarding tree removal permit application per the ${city} municipal tree ordinance.`;
    case "health_assessment":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of ${subject} at ${location} to evaluate overall health, structural integrity, and vitality, and to provide maintenance recommendations.`;
    case "construction_encroachment":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of ${subject} at ${location} to evaluate potential impacts from proposed construction activity, assess tree protection zone encroachment, and provide tree preservation recommendations per ANSI A300 Part 5 standards.`;
    case "tree_valuation":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices and appraise ${subject} at ${location} using the CTLA Trunk Formula Method (10th Edition) to determine replacement value for insurance, litigation, or municipal purposes.`;
    case "real_estate_package":
      return `Perform a Level 2 basic assessment per ISA Best Management Practices and appraise ${subject} at ${location} to evaluate health, structural condition, and appraised value using the CTLA Trunk Formula Method (10th Edition) for the purpose of a real estate transaction.`;
    default:
      return `Perform a Level 2 basic assessment per ISA Best Management Practices of ${subject} at ${location} to evaluate health, structural condition, and provide professional arborist recommendations.`;
  }
}

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
  // Quick-entry mode: auto-advance after save
  const [showPlacementPrompt, setShowPlacementPrompt] = useState(false);
  const [lastSavedNumber, setLastSavedNumber] = useState(0);

  // Quick Add mode — keep panel open after save, auto-create next pending pin
  const [quickAddMode, setQuickAddMode] = useState(false);
  const mapGetCenterRef = useRef<(() => { lat: number; lng: number }) | null>(null);

  // Mobile Field Mode — full-screen assessment flow
  const [fieldMode, setFieldMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setFieldMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setFieldMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  // Delete confirmation dialog
  const [deleteConfirmTreeId, setDeleteConfirmTreeId] = useState<string | null>(null);

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

  // ---- Arborist customization settings ----
  const [arboristHealthObs, setArboristHealthObs] = useState<Observation[] | undefined>(undefined);
  const [arboristStructuralObs, setArboristStructuralObs] = useState<Observation[] | undefined>(undefined);
  const [arboristRecommendationMap, setArboristRecommendationMap] = useState<Record<string, string> | undefined>(undefined);
  const [arboristCommonSpecies, setArboristCommonSpecies] = useState<string[] | undefined>(undefined);
  const [arboristScopeTemplates, setArboristScopeTemplates] = useState<Record<string, string> | undefined>(undefined);
  const [arboristDefaultUnitPrice, setArboristDefaultUnitPrice] = useState<number | undefined>(undefined);

  // ---- Valuation report-level settings ----
  const latestReport = property.reports?.[0] ?? null;
  const [valuationPurpose, setValuationPurpose] = useState<string>(latestReport?.valuationPurpose ?? "");
  const [valuationBasisStatement, setValuationBasisStatement] = useState<string>(latestReport?.valuationBasisStatement ?? DEFAULT_BASIS_STATEMENT);

  useEffect(() => {
    async function loadArboristSettings() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (!res.ok) return;
        const data = await res.json();
        // Parse observation library
        if (data.healthObservations) {
          try { setArboristHealthObs(JSON.parse(data.healthObservations)); } catch { /* use defaults */ }
        }
        if (data.structuralObservations) {
          try { setArboristStructuralObs(JSON.parse(data.structuralObservations)); } catch { /* use defaults */ }
        }
        // Parse recommendation map from reportDefaults
        if (data.reportDefaults) {
          try {
            const rd = JSON.parse(data.reportDefaults);
            if (rd.recommendationMap) setArboristRecommendationMap(rd.recommendationMap);
            if (rd.scopeTemplates) setArboristScopeTemplates(rd.scopeTemplates);
          } catch { /* use defaults */ }
        }
        // Parse species presets
        if (data.commonSpecies) {
          try { setArboristCommonSpecies(JSON.parse(data.commonSpecies)); } catch { /* use defaults */ }
        }
        // Parse default valuation unit price
        if (data.defaultValuationUnitPrice) {
          setArboristDefaultUnitPrice(data.defaultValuationUnitPrice);
        }
      } catch (err) {
        console.error("Arborist settings fetch failed:", err);
      }
    }
    loadArboristSettings();
  }, []);

  // ---- Connectivity + offline queue ----
  const { isOnline, setPendingCount } = useConnectivity();
  const { toast } = useToast();
  const prevOnlineRef = useRef(isOnline);

  // Process queued saves + photos when coming back online
  useEffect(() => {
    if (isOnline && !prevOnlineRef.current) {
      (async () => {
        const { succeeded, failed } = await processQueue(setPendingCount);
        const photoResult = await processPhotoQueue();
        const totalSucceeded = succeeded + photoResult.succeeded;
        const totalFailed = failed + photoResult.failed;

        if (totalSucceeded > 0) {
          toast({
            title: "All changes synced",
            description: `${totalSucceeded} change${totalSucceeded !== 1 ? "s" : ""} synced successfully.`,
          });
          router.refresh();
        }
        if (totalFailed > 0) {
          toast({
            title: "Some changes failed to sync",
            description: `${totalFailed} change${totalFailed !== 1 ? "s" : ""} could not be synced after multiple retries.`,
            variant: "destructive",
          });
        }
      })();
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline, setPendingCount, toast, router]);

  // Auto-generate scope of assignment when empty on report type change
  useEffect(() => {
    if (!scopeOfAssignment.trim()) {
      // Check arborist's custom scope template first
      const customTemplate = arboristScopeTemplates?.[reportType];
      if (customTemplate) {
        const count = trees.length > 0
          ? `${trees.length} tree${trees.length !== 1 ? "s" : ""}`
          : "the subject tree(s)";
        const address = `${property.address}, ${property.city}`;
        setScopeOfAssignment(
          customTemplate.replace(/\{count\}/g, count).replace(/\{address\}/g, address)
        );
      } else {
        setScopeOfAssignment(
          generateScopeTemplate(
            reportType,
            property.address,
            property.city,
            trees.length
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType, arboristScopeTemplates]);

  // Lazy migration: pull PropertyAudioNote transcriptions into siteObservations
  useEffect(() => {
    if (siteObservations.trim()) return; // already has content
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/properties/${property.id}/audio`);
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const notes: { cleanedTranscription?: string; status?: string }[] =
          data.notes ?? [];
        const transcriptions = notes
          .filter(
            (n) => n.status === "ready" && n.cleanedTranscription?.trim()
          )
          .map((n) => n.cleanedTranscription!.trim());
        if (transcriptions.length > 0 && !cancelled) {
          const combined = transcriptions.join(" ");
          setSiteObservations((prev) =>
            prev && prev.includes(combined) ? prev : combined
          );
        }
      } catch {
        // Audio notes migration is best-effort
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.id]);

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
        const res = await fetch(`/api/properties/${property.id}/trees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinLat: lat, pinLng: lng }),
        });
        if (!res.ok) throw new Error("Pin move failed");
      } catch {
        // Queue for offline sync
        enqueueRequest(
          {
            endpoint: `/api/properties/${property.id}/trees/${id}`,
            method: "PUT",
            body: JSON.stringify({ pinLat: lat, pinLng: lng }),
            propertyId: property.id,
          },
          setPendingCount
        );
      }
    },
    [property.id, setPendingCount]
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
          const res = await fetch(`/api/properties/${property.id}/trees/${selectedTreeId}`, {
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

        // ---- OFFLINE FALLBACK: Queue the request + optimistic update ----
        if (pendingPin) {
          const body = {
            ...data,
            pinLat: pendingPin.lat,
            pinLng: pendingPin.lng,
            treeNumber: trees.length + 1,
          };
          const treeLocalId = `offline_${Date.now()}`;
          enqueueRequest(
            {
              endpoint: `/api/properties/${property.id}/trees`,
              method: "POST",
              body: JSON.stringify(body),
              treeLocalId,
              propertyId: property.id,
            },
            setPendingCount
          );

          // Optimistic local state update with temp ID
          const tempTree: TreeData = {
            id: treeLocalId,
            treeNumber: trees.length + 1,
            pinLat: pendingPin.lat,
            pinLng: pendingPin.lng,
            speciesCommon: data.speciesCommon,
            speciesScientific: data.speciesScientific,
            dbhInches: data.dbhInches,
            heightFt: data.heightFt,
            canopySpreadFt: data.canopySpreadFt,
            conditionRating: data.conditionRating,
            healthNotes: data.healthNotes,
            structuralNotes: data.structuralNotes,
            recommendedAction: data.recommendedAction,
            isProtected: data.isProtected,
            protectionReason: data.protectionReason,
            mitigationRequired: data.mitigationRequired,
            status: "draft",
            typeSpecificData: data.typeSpecificData,
          };
          setTrees((prev) => [...prev, tempTree]);
          setLastSavedTree(tempTree);
          setLastSavedNumber(tempTree.treeNumber);

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

          // Preserve Quick Add flow
          if (quickAddMode) {
            const mapCenter = mapGetCenterRef.current?.();
            const nextCenter = mapCenter ?? {
              lat: pendingPin.lat + 0.00002,
              lng: pendingPin.lng + 0.00002,
            };
            setPendingPin(nextCenter);
            setSelectedTreeId(null);
          } else {
            setPendingPin(null);
            setSelectedTreeId(null);
            setShowSidePanel(false);
            setShowPlacementPrompt(true);
          }
        } else if (selectedTreeId) {
          enqueueRequest(
            {
              endpoint: `/api/properties/${property.id}/trees/${selectedTreeId}`,
              method: "PUT",
              body: JSON.stringify(data),
              propertyId: property.id,
            },
            setPendingCount
          );

          // Optimistic local state update
          setTrees((prev) =>
            prev.map((t) =>
              t.id === selectedTreeId
                ? {
                    ...t,
                    ...data,
                    typeSpecificData: data.typeSpecificData ?? t.typeSpecificData,
                  }
                : t
            )
          );
          setLastSavedTree(
            trees.find((t) => t.id === selectedTreeId)
              ? { ...trees.find((t) => t.id === selectedTreeId)!, ...data }
              : null
          );

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

        toast({
          title: "Saved offline",
          description: "Your changes will sync when you're back online.",
        });
      } finally {
        setSaving(false);
      }
    },
    [pendingPin, selectedTreeId, property.id, trees, quickAddMode, setPendingCount, toast]
  );

  const handleDeleteRequest = useCallback((treeId?: string) => {
    setDeleteConfirmTreeId(treeId ?? selectedTreeId);
  }, [selectedTreeId]);

  const handleDeleteConfirmed = useCallback(async () => {
    const treeId = deleteConfirmTreeId;
    if (!treeId) return;
    setDeleteConfirmTreeId(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/trees/${treeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete tree");

      const deletedTree = trees.find((t) => t.id === treeId);
      setTrees((prev) => prev.filter((t) => t.id !== treeId));
      if (selectedTreeId === treeId) {
        setSelectedTreeId(null);
        setShowSidePanel(false);
      }
      toast({
        title: "Tree deleted",
        description: deletedTree
          ? `Tree #${deletedTree.treeNumber} (${deletedTree.speciesCommon || "Unidentified"}) deleted`
          : "Tree deleted successfully",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      toast({
        title: "Delete failed",
        description: "Could not delete tree. Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [deleteConfirmTreeId, selectedTreeId, property.id, trees, toast]);

  const handleClosePanel = useCallback(() => {
    setShowSidePanel(false);
    setSelectedTreeId(null);
    setPendingPin(null);
  }, []);

  const handleSaveAndNext = useCallback(
    async (data: TreeFormData) => {
      if (!quickAddMode) setQuickAddMode(true);
      await handleSave(data);
    },
    [handleSave, quickAddMode]
  );

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
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectDescription.trim() || null,
          permitNumber: permitNumber.trim() || null,
          developerName: developerName.trim() || null,
          architectName: architectName.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch (err) {
      console.error("Failed to save project info:", err);
      toast({
        title: "Save failed",
        description: "Could not save project info. Try again.",
        variant: "destructive",
      });
    } finally {
      setSavingProject(false);
    }
  }, [property.id, projectDescription, permitNumber, developerName, architectName, toast]);

  const handleSaveSiteInfo = useCallback(async () => {
    setSavingSiteInfo(true);
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scopeOfAssignment: scopeOfAssignment.trim() || null,
          siteObservations: siteObservations.trim() || null,
          neededByDate: neededByDate || null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch (err) {
      console.error("Failed to save site info:", err);
      toast({
        title: "Save failed",
        description: "Could not save site info. Try again.",
        variant: "destructive",
      });
    } finally {
      setSavingSiteInfo(false);
    }
  }, [property.id, scopeOfAssignment, siteObservations, neededByDate, toast]);

  // ---- Valuation computed totals ----
  const valuationTotal = trees.reduce((sum, t) => sum + (t.valuationAppraisedValue ?? 0), 0);
  const treesWithValues = trees.filter(t => t.valuationAppraisedValue != null && t.valuationAppraisedValue > 0);

  const saveValuationReportSettings = useCallback(async () => {
    if (!latestReport?.id) return;
    try {
      const res = await fetch(`/api/reports/${latestReport.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valuationPurpose,
          valuationBasisStatement,
          valuationTotalValue: valuationTotal,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: "Valuation settings saved" });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    }
  }, [latestReport?.id, valuationPurpose, valuationBasisStatement, valuationTotal, toast]);

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
              <h1 className="text-lg font-semibold font-display truncate">
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
          {/* Field / Desktop toggle — mobile only */}
          <div className="flex items-center gap-1.5 md:hidden">
            <label
              htmlFor="field-mode-toggle"
              className={`flex items-center gap-1 text-xs cursor-pointer select-none ${
                fieldMode ? "text-forest font-medium" : "text-muted-foreground"
              }`}
            >
              {fieldMode ? (
                <Smartphone className="h-3.5 w-3.5 text-forest" />
              ) : (
                <Monitor className="h-3.5 w-3.5" />
              )}
              <span>{fieldMode ? "Field" : "Desktop"}</span>
            </label>
            <Switch
              id="field-mode-toggle"
              checked={fieldMode}
              onCheckedChange={setFieldMode}
              className="scale-75"
            />
          </div>
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
              <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-neutral-50 rounded-lg border shadow-lg p-4 space-y-3">
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
                <OnboardingHint hintId="share_link" className="mb-1">
                Share this link with your client. They&apos;ll see a plain-English summary and can download the PDF.
              </OnboardingHint>
              <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareToken}`}
                    className="flex-1 text-xs bg-neutral-100 border rounded px-2 py-1.5 text-neutral-700 select-all"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyShareLink}
                    className="shrink-0"
                  >
                    {shareCopied ? (
                      <span className="text-forest text-xs">Copied!</span>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="mv-scope" className="text-xs">
                  Scope of Assignment
                </Label>
                <VoiceInput
                  onTranscript={(text) =>
                    setScopeOfAssignment((prev) =>
                      prev ? prev + " " + text : text
                    )
                  }
                />
              </div>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="mv-site-obs" className="text-xs">
                  Site Observations
                </Label>
                <VoiceInput
                  onTranscript={(text) =>
                    setSiteObservations((prev) =>
                      prev ? prev + " " + text : text
                    )
                  }
                />
              </div>
              <Textarea
                id="mv-site-obs"
                placeholder="Describe the property setting, topography, soil conditions, surrounding land use, proximity to structures/infrastructure, and any relevant environmental factors..."
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

      {/* Valuation Report Settings */}
      {(property.reportType === "tree_valuation" || property.reportType === "real_estate_package") && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-4 w-4 text-amber-600" />
              Valuation Report Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Purpose of Appraisal</Label>
              <select
                value={valuationPurpose}
                onChange={(e) => setValuationPurpose(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select purpose...</option>
                {VALUATION_PURPOSES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Basis Statement</Label>
              <Textarea
                value={valuationBasisStatement}
                onChange={(e) => setValuationBasisStatement(e.target.value)}
                rows={4}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                This statement appears in the generated report describing the appraisal methodology.
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-amber-900">Total Appraised Value</span>
                <span className="font-mono text-xl font-bold text-amber-900">
                  {formatCurrency(valuationTotal)}
                </span>
              </div>
              {treesWithValues.length > 0 && (
                <p className="text-xs text-amber-700">
                  {treesWithValues.length} tree{treesWithValues.length !== 1 ? "s" : ""} assessed · Average: {formatCurrency(valuationTotal / treesWithValues.length)} per tree
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={saveValuationReportSettings}
                className="bg-forest hover:bg-forest-light"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Valuation Settings
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `/api/properties/${property.id}/trees/apply-valuation-defaults`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                      }
                    );
                    if (!res.ok) throw new Error("Failed");
                    const data = await res.json();
                    toast({
                      title: `Defaults applied to ${data.updated} tree${data.updated !== 1 ? "s" : ""}`,
                    });
                    // Refresh tree list to pick up new values
                    const treesRes = await fetch(`/api/properties/${property.id}/trees`);
                    if (treesRes.ok) {
                      const updatedTrees = await treesRes.json();
                      setTrees(updatedTrees);
                    }
                  } catch {
                    toast({
                      title: "Failed to apply defaults",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Apply Defaults to All Trees
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protected Trees Permit Warning Banner */}
      {trees.some((t) => t.isProtected) && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
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
                    ? "bg-forest text-white"
                    : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
        </div>
      )}

      {/* First-use hint for tree placement */}
      {trees.length === 0 && (
        <OnboardingHint hintId="assessment_first_tree" className="mb-3">
          Tap the map to place a tree, or use + Add Tree to enter data manually.
        </OnboardingHint>
      )}

      {/* Main Area: Tree List + Map + Side Panel */}
      <div className="flex gap-0 rounded-xl border overflow-hidden relative">
        {/* Quick-entry placement prompt */}
        {showPlacementPrompt && !selectedTreeId && !pendingPin && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-forest text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span>&#10003; Tree #{lastSavedNumber} saved</span>
            <span className="text-forest-muted">&middot;</span>
            <span>Tap map to place Tree #{lastSavedNumber + 1}</span>
            <button
              onClick={() => setShowPlacementPrompt(false)}
              className="ml-1 text-forest-muted hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Tree List Panel — desktop only */}
        {showTreeList && trees.length > 0 && (
          <div className="hidden md:flex flex-col w-60 border-r bg-neutral-50 overflow-hidden flex-shrink-0">
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
                    <div
                      key={tree.id}
                      className={`group w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 transition-colors flex items-center gap-2 ${
                        selectedTreeId === tree.id
                          ? "bg-forest/5 border-l-2 border-forest"
                          : ""
                      } ${isDimmed ? "opacity-40" : ""}`}
                    >
                      <button
                        onClick={() => handleSelectTreeFromList(tree.id)}
                        className="flex items-center gap-2 flex-1 min-w-0"
                      >
                        <span className="font-mono font-semibold text-muted-foreground w-6">
                          #{tree.treeNumber}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-left">
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
                          <ShieldCheck className="h-3 w-3 text-forest flex-shrink-0" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRequest(tree.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 flex-shrink-0"
                        title={`Delete Tree #${tree.treeNumber}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
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
              className="hidden md:flex absolute top-4 left-4 z-10 bg-neutral-50/95 backdrop-blur-sm rounded-lg shadow-md border px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground items-center gap-1"
            >
              <PanelLeftOpen className="h-3.5 w-3.5" />
              Trees
            </button>
          )}

          {/* Tree count progress badge */}
          {trees.length > 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-neutral-50/95 backdrop-blur-sm rounded-full shadow-md border px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <TreePine className="h-3.5 w-3.5 text-forest" />
              <span>
                {trees.length} tree{trees.length !== 1 ? "s" : ""}
              </span>
              <span className="text-muted-foreground">&middot;</span>
              <span className="text-forest">{assessedCount} assessed</span>
              {protectedCount > 0 && (
                <>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="text-forest">
                    {protectedCount} protected
                  </span>
                </>
              )}
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-10">
            {showLegend ? (
              <div className="bg-neutral-50/95 backdrop-blur-sm rounded-lg shadow-md border p-2.5 text-[10px]">
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
                className="bg-neutral-50/95 backdrop-blur-sm rounded-lg shadow-md border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground"
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

        {/* Side Panel — Field Mode on mobile, TreeSidePanel on desktop */}
        {showSidePanel && (
          fieldMode ? (
            <MobileFieldMode
              tree={sidePanelTree}
              treeNumber={sidePanelTreeNumber}
              propertyId={property.id}
              propertyCity={property.city}
              reportType={reportType}
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onClose={handleClosePanel}
              saving={saving}
              lastSavedTree={lastSavedTree}
              recentSpecies={recentSpecies}
              arboristHealthObs={arboristHealthObs}
              arboristStructuralObs={arboristStructuralObs}
              arboristRecommendationMap={arboristRecommendationMap}
              arboristCommonSpecies={arboristCommonSpecies}
              arboristDefaultUnitPrice={arboristDefaultUnitPrice}
            />
          ) : (
            <TreeSidePanel
              tree={sidePanelTree}
              treeNumber={sidePanelTreeNumber}
              totalTrees={trees.length}
              propertyId={property.id}
              propertyCity={property.city}
              reportType={reportType}
              onSave={handleSave}
              onDelete={
                selectedTree ? () => handleDeleteRequest() : undefined
              }
              onClose={handleClosePanel}
              saving={saving}
              lastSavedTree={lastSavedTree}
              recentSpecies={recentSpecies}
              quickAddMode={quickAddMode}
              arboristHealthObs={arboristHealthObs}
              arboristStructuralObs={arboristStructuralObs}
              arboristRecommendationMap={arboristRecommendationMap}
              arboristCommonSpecies={arboristCommonSpecies}
              arboristDefaultUnitPrice={arboristDefaultUnitPrice}
            />
          )
        )}
      </div>

      {/* Summary Panel */}
      <TreeSummaryPanel
        trees={trees}
        selectedTreeId={selectedTreeId}
        onSelectTree={handleSelectTreeFromSummary}
        reportType={reportType}
      />

      {/* Delete Tree Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmTreeId} onOpenChange={(open) => !open && setDeleteConfirmTreeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tree?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                {(() => {
                  const tree = trees.find((t) => t.id === deleteConfirmTreeId);
                  if (!tree) return <p>This tree will be permanently deleted.</p>;
                  return (
                    <>
                      <p>
                        Permanently delete <span className="font-semibold text-foreground">Tree #{tree.treeNumber}</span>
                        {tree.speciesCommon ? ` (${tree.speciesCommon}` : ""}
                        {tree.speciesCommon && tree.dbhInches ? `, ${tree.dbhInches}" DBH` : ""}
                        {tree.speciesCommon ? ")" : ""}?
                      </p>
                      <p>All photos and audio notes for this tree will also be deleted. This cannot be undone.</p>
                    </>
                  );
                })()}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Tree
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
