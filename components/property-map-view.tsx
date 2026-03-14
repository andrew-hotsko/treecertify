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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { MobileFieldMode } from "@/components/mobile-field-mode";
import { type Observation } from "@/lib/default-observations";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { VALUATION_PURPOSES, DEFAULT_BASIS_STATEMENT, formatCurrency } from "@/lib/valuation";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { PermitTracker, type PermitUpdateData } from "@/components/permit-tracker";
import {
  ArrowLeft,
  FileText,
  TreePine,
  ChevronDown,
  ChevronRight,
  HardHat,
  Loader2,
  X,
  Zap,
  Trash2,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Dynamically import PropertyMap with SSR disabled (Google Maps needs window/DOM)
const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-neutral-200 animate-pulse">
        <div className="text-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-[#1D4E3E]" />
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
  shareToken?: string | null;
  trees: TreeData[];
  reports: {
    id: string;
    status: string;
    reportType: string;
    permitStatus?: string | null;
    submittedAt?: string | null;
    submittedTo?: string | null;
    reviewerNotes?: string | null;
    conditionsOfApproval?: string | null;
    denialReason?: string | null;
    approvedAt?: string | null;
    permitExpiresAt?: string | null;
    certifiedAt?: string | null;
    valuationPurpose?: string | null;
    valuationBasisStatement?: string | null;
    valuationTotalValue?: number | null;
  }[];
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

type LifecycleState = "no_trees" | "assessing" | "report_draft" | "certified" | "shared";

function getLifecycleState(
  trees: TreeData[],
  reports: PropertyData["reports"],
  shareToken: string | null
): LifecycleState {
  if (trees.length === 0) return "no_trees";
  const r = reports?.[0];
  if (!r) return "assessing";
  if (r.status === "certified") return shareToken ? "shared" : "certified";
  return "report_draft";
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_PIN_HEX: Record<number, string> = {
  0: "#C0392B",
  1: "#C0392B",
  2: "#E07B3C",
  3: "#D4A017",
  4: "#3D7D68",
  5: "#1D4E3E",
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

  // Filter (always "all" — filter chips removed, kept for dimmedPinIds compat)
  const activeFilter: FilterKey = "all";

  // Delete confirmation dialog
  const [deleteConfirmTreeId, setDeleteConfirmTreeId] = useState<string | null>(null);

  // Share token (read from property, used for lifecycle state)
  const shareToken = property.shareToken ?? null;

  // Permit tracking state (local for optimistic updates)
  const report0 = property.reports?.[0];
  const [permitData, setPermitData] = useState({
    permitStatus: report0?.permitStatus ?? null,
    submittedAt: report0?.submittedAt ?? null,
    submittedTo: report0?.submittedTo ?? null,
    reviewerNotes: report0?.reviewerNotes ?? null,
    conditionsOfApproval: report0?.conditionsOfApproval ?? null,
    denialReason: report0?.denialReason ?? null,
    approvedAt: report0?.approvedAt ?? null,
    permitExpiresAt: report0?.permitExpiresAt ?? null,
  });

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

  const [valuationOpen, setValuationOpen] = useState(false);
  const [scopeOfAssignment, setScopeOfAssignment] = useState(
    property.scopeOfAssignment ?? ""
  );
  const [siteObservations, setSiteObservations] = useState(
    property.siteObservations ?? ""
  );
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

  // Lifecycle state — drives progressive disclosure
  const lifecycleState = getLifecycleState(trees, property.reports, shareToken);
  const incompleteTrees = trees.filter((t) => !isTreeComplete(t));
  const allTreesComplete = trees.length > 0 && incompleteTrees.length === 0;

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

  // ---- Handlers ----
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (quickAddMode) {
        // Add mode: drop a pin
        setPendingPin({ lat, lng });
        setSelectedTreeId(null);
        setShowSidePanel(true);
        setShowPlacementPrompt(false);
      } else {
        // Non-add mode: deselect current tree, close panel
        setSelectedTreeId(null);
        setPendingPin(null);
        setShowSidePanel(false);
      }
    },
    [quickAddMode]
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
    async (data: TreeFormData & { pinLat?: number; pinLng?: number }) => {
      setSaving(true);
      try {
        if (pendingPin || data.pinLat != null) {
          // Create new tree — prefer pin coords from wizard, fall back to pendingPin
          const treeLat = data.pinLat ?? pendingPin?.lat;
          const treeLng = data.pinLng ?? pendingPin?.lng;
          const res = await fetch(`/api/properties/${property.id}/trees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              pinLat: treeLat,
              pinLng: treeLng,
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
              lat: (treeLat ?? 0) + 0.00002,
              lng: (treeLng ?? 0) + 0.00002,
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
        if (pendingPin || data.pinLat != null) {
          const offlineLat = data.pinLat ?? pendingPin?.lat ?? 0;
          const offlineLng = data.pinLng ?? pendingPin?.lng ?? 0;
          const body = {
            ...data,
            pinLat: offlineLat,
            pinLng: offlineLng,
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
            pinLat: offlineLat,
            pinLng: offlineLng,
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
              lat: offlineLat + 0.00002,
              lng: offlineLng + 0.00002,
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
    async (data: TreeFormData & { pinLat?: number; pinLng?: number }) => {
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

  // ---- Current side panel data ----
  const sidePanelTree = pendingPin
    ? { pinLat: pendingPin.lat, pinLng: pendingPin.lng }
    : selectedTree;
  const sidePanelTreeNumber = pendingPin
    ? trees.length + 1
    : selectedTree?.treeNumber ?? 1;


  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* ---- Compact Header ---- */}
      <div className="flex items-center gap-3 px-3 py-2 shrink-0">
        <Link href="/properties">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-semibold truncate">{property.address}</h1>
            {property.reports?.[0] && <StatusBadge status={property.reports[0].status} />}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            {reportTypeConfig && <span>{reportTypeConfig.label}</span>}
            {property.city && <span>{property.city}</span>}
            <span className="font-mono">{trees.length} tree{trees.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {lifecycleState === "assessing" && allTreesComplete && (
            <Link href={`/properties/${property.id}/report`}>
              <Button size="sm" className="gap-1.5 bg-[#1D4E3E] hover:bg-[#2A6B55] text-white h-8 text-xs">
                <FileText className="h-3.5 w-3.5" />
                Generate Report
              </Button>
            </Link>
          )}
          {lifecycleState === "report_draft" && (
            <Link href={`/properties/${property.id}/report`}>
              <Button size="sm" className="gap-1.5 bg-[#1D4E3E] hover:bg-[#2A6B55] text-white h-8 text-xs">
                <FileText className="h-3.5 w-3.5" />
                {property.reports?.[0]?.status === "review" ? "Review" : "Edit Report"}
              </Button>
            </Link>
          )}
          {(lifecycleState === "certified" || lifecycleState === "shared") && (
            <Link href={`/properties/${property.id}/report`}>
              <Button size="sm" className="gap-1.5 bg-[#1D4E3E] hover:bg-[#2A6B55] text-white h-8 text-xs">
                <FileText className="h-3.5 w-3.5" />
                View Report
              </Button>
            </Link>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Property</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this property, all trees, and any reports. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await fetch(`/api/properties/${property.id}`, { method: "DELETE" });
                      router.push("/properties");
                    } catch {
                      toast({ title: "Failed to delete property", variant: "destructive" });
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ---- Permit Tracker ---- */}
      {(lifecycleState === "certified" || lifecycleState === "shared") &&
        (reportType === "removal_permit" || reportType === "construction_encroachment") &&
        report0 && (
          <div className="px-3 pb-2 shrink-0">
            <PermitTracker
              reportId={report0.id}
              permitStatus={permitData.permitStatus}
              submittedAt={permitData.submittedAt}
              submittedTo={permitData.submittedTo}
              reviewerNotes={permitData.reviewerNotes}
              conditionsOfApproval={permitData.conditionsOfApproval}
              denialReason={permitData.denialReason}
              approvedAt={permitData.approvedAt}
              permitExpiresAt={permitData.permitExpiresAt}
              city={property.city}
              reportType={reportType}
              onUpdate={(data: PermitUpdateData) => {
                setPermitData((prev) => ({
                  ...prev,
                  ...Object.fromEntries(
                    Object.entries(data).filter(([, v]) => v !== undefined)
                  ),
                }));
              }}
            />
          </div>
        )}

      {/* ---- Split View: Map + Tree Sidebar ---- */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden rounded-lg border border-border mx-3 mb-3 relative">
        {/* Map Area */}
        <div className={`flex-1 relative h-[55vh] lg:h-auto overflow-hidden ${quickAddMode ? "cursor-crosshair" : ""}`}>
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
            onPinAdd={handleMapClick}
            onPinClick={handlePinClick}
            onPinMove={handlePinMove}
            selectedPinId={pendingPin ? "pending" : selectedTreeId}
            flyToId={flyToId}
            interactive
            className="h-full w-full"
          />

          {/* Floating Add Trees — top-left on map */}
          {(lifecycleState === "no_trees" || lifecycleState === "assessing") && (
            <div className="absolute top-3 left-3 z-10">
              <button
                type="button"
                onClick={() => setQuickAddMode(!quickAddMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-xs font-medium transition-all ${
                  quickAddMode
                    ? "bg-[#1D4E3E] text-white ring-2 ring-white/50"
                    : "bg-white hover:bg-gray-50 text-[#1D4E3E] border border-border"
                }`}
              >
                <TreePine className="h-3.5 w-3.5" />
                {quickAddMode ? "Adding Trees..." : "Add Trees"}
              </button>
            </div>
          )}

          {/* Map Legend — bottom-left, compact horizontal */}
          {trees.length > 0 && (
            <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border">
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Condition</p>
              <div className="flex items-center gap-2.5">
                {[
                  { label: "Excellent", color: "#1D4E3E" },
                  { label: "Good", color: "#3D7D68" },
                  { label: "Fair", color: "#D4A017" },
                  { label: "Poor", color: "#E07B3C" },
                  { label: "Dead", color: "#C0392B" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-[10px] text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick-entry placement prompt */}
          {showPlacementPrompt && !selectedTreeId && !pendingPin && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-[#1D4E3E] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span>&#10003; Tree #{lastSavedNumber} saved</span>
              <span className="text-[#3D7D68]">&middot;</span>
              <span>Tap map to place Tree #{lastSavedNumber + 1}</span>
              <button
                onClick={() => setShowPlacementPrompt(false)}
                className="ml-1 text-[#3D7D68] hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Slide-in Assessment Panel — overlays map from right */}
          {showSidePanel && (
            <div className="fixed inset-0 z-50 bg-white lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[420px] lg:z-20 lg:border-l lg:shadow-xl overflow-hidden">
              {fieldMode ? (
                <MobileFieldMode
                  key={(sidePanelTree && 'id' in sidePanelTree) ? (sidePanelTree as TreeData).id : `new-${pendingPin?.lat}-${pendingPin?.lng}`}
                  tree={sidePanelTree}
                  treeNumber={sidePanelTreeNumber}
                  propertyId={property.id}
                  propertyCity={property.city}
                  propertyCenter={center}
                  existingPins={trees
                    .filter((t) => t.pinLat != null && t.pinLng != null)
                    .map((t) => ({
                      lat: t.pinLat,
                      lng: t.pinLng,
                      treeNumber: t.treeNumber,
                    }))}
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
              )}
            </div>
          )}
        </div>

        {/* ---- Tree List Sidebar ---- */}
        <div className="w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-border bg-[#FAF9F6] flex flex-col shrink-0 overflow-hidden">
          {/* Sidebar header */}
          <div className="px-3 py-2.5 border-b border-border shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C9C93]">
              Trees ({trees.length})
            </span>
          </div>

          {/* Tree list — scrollable */}
          <div className="flex-1 overflow-y-auto">
            {trees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="h-10 w-10 rounded-full bg-[#1D4E3E]/10 flex items-center justify-center mb-3">
                  <TreePine className="h-4 w-4 text-[#1D4E3E]" />
                </div>
                <p className="text-sm font-medium mb-1">No trees yet</p>
                <p className="text-xs text-muted-foreground">
                  Click &ldquo;Add Trees&rdquo; then click the map to place your first tree.
                </p>
              </div>
            ) : (
              <div className="py-1">
                {[...trees]
                  .sort((a, b) => a.treeNumber - b.treeNumber)
                  .map((tree) => {
                    const isSelected = selectedTreeId === tree.id;
                    return (
                      <button
                        key={tree.id}
                        onClick={() => handleSelectTreeFromList(tree.id)}
                        className={`w-full flex items-center gap-2.5 py-2.5 px-3 transition-colors text-left group ${
                          isSelected ? "bg-[#1D4E3E]/10" : "hover:bg-accent/50"
                        }`}
                      >
                        <div
                          className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold font-mono shrink-0"
                          style={{ backgroundColor: CONDITION_PIN_HEX[tree.conditionRating] ?? "#9CA3AF" }}
                        >
                          {tree.treeNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium truncate">{tree.speciesCommon || "Unknown"}</span>
                            {tree.isProtected && (
                              <span className="text-[8px] font-mono uppercase px-1 py-0 rounded bg-amber-50 text-amber-700 border border-amber-200">P</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            {tree.dbhInches ? <span>{tree.dbhInches}&quot; DBH</span> : null}
                            {tree.conditionRating != null && tree.conditionRating > 0 && (
                              <span>· {CONDITION_LABELS[tree.conditionRating]}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-[#1D4E3E] transition-colors shrink-0" />
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Construction Project Info — collapsible in sidebar */}
          {reportType === "construction_encroachment" && (lifecycleState === "assessing" || lifecycleState === "report_draft") && (
            <div className="border-t border-border shrink-0">
              <button
                type="button"
                onClick={() => setProjectOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-accent/30 transition-colors"
              >
                <HardHat className="h-3.5 w-3.5 text-[#1D4E3E]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C9C93] flex-1">Project Info</span>
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${projectOpen ? "rotate-180" : ""}`} />
              </button>
              {projectOpen && (
                <div className="px-3 pb-3 space-y-2">
                  <div>
                    <Label htmlFor="mv-proj-desc" className="text-xs">Project Description</Label>
                    <Input
                      id="mv-proj-desc"
                      placeholder="New addition, foundation work..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="mt-1 h-8 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mv-permit" className="text-xs">Permit Number</Label>
                    <Input
                      id="mv-permit"
                      placeholder="BP-2024-001234"
                      value={permitNumber}
                      onChange={(e) => setPermitNumber(e.target.value)}
                      className="mt-1 h-8 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mv-developer" className="text-xs">Developer / Contractor</Label>
                    <Input
                      id="mv-developer"
                      placeholder="ABC Construction"
                      value={developerName}
                      onChange={(e) => setDeveloperName(e.target.value)}
                      className="mt-1 h-8 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mv-architect" className="text-xs">Architect</Label>
                    <Input
                      id="mv-architect"
                      placeholder="Jane Smith, AIA"
                      value={architectName}
                      onChange={(e) => setArchitectName(e.target.value)}
                      className="mt-1 h-8 text-xs"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={handleSaveProject}
                    disabled={savingProject}
                    className="w-full bg-[#1D4E3E] hover:bg-[#2A6B55] text-white h-8 text-xs"
                  >
                    {savingProject ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save Project Info"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Valuation Summary — collapsible in sidebar */}
          {(reportType === "tree_valuation" || reportType === "real_estate_package") && (lifecycleState === "assessing" || lifecycleState === "report_draft") && (
            <div className="border-t border-border shrink-0">
              <button
                type="button"
                onClick={() => setValuationOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-accent/30 transition-colors"
              >
                <DollarSign className="h-3.5 w-3.5 text-[#1D4E3E]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C9C93] flex-1">Valuation</span>
                <span className="font-mono text-xs font-semibold text-foreground mr-2">{formatCurrency(valuationTotal)}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${valuationOpen ? "rotate-180" : ""}`} />
              </button>
              {valuationOpen && (
                <div className="px-3 pb-3 space-y-2">
                  <div>
                    <Label className="text-xs">Purpose</Label>
                    <select
                      value={valuationPurpose}
                      onChange={(e) => setValuationPurpose(e.target.value)}
                      className="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-1"
                    >
                      <option value="">Select...</option>
                      {VALUATION_PURPOSES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Basis Statement</Label>
                    <Textarea
                      value={valuationBasisStatement}
                      onChange={(e) => setValuationBasisStatement(e.target.value)}
                      rows={3}
                      className="mt-1 text-xs"
                    />
                  </div>
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-amber-900">Total</span>
                      <span className="font-mono text-sm font-bold text-amber-900">{formatCurrency(valuationTotal)}</span>
                    </div>
                    {treesWithValues.length > 0 && (
                      <p className="text-[10px] text-amber-700 mt-0.5">
                        {treesWithValues.length} tree{treesWithValues.length !== 1 ? "s" : ""} · Avg: {formatCurrency(valuationTotal / treesWithValues.length)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      onClick={saveValuationReportSettings}
                      className="flex-1 bg-[#1D4E3E] hover:bg-[#2A6B55] h-8 text-xs"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/properties/${property.id}/trees/apply-valuation-defaults`,
                            { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) }
                          );
                          if (!res.ok) throw new Error("Failed");
                          const data = await res.json();
                          toast({ title: `Defaults applied to ${data.updated} tree${data.updated !== 1 ? "s" : ""}` });
                          const treesRes = await fetch(`/api/properties/${property.id}/trees`);
                          if (treesRes.ok) {
                            const updatedTrees = await treesRes.json();
                            setTrees(updatedTrees);
                          }
                        } catch {
                          toast({ title: "Failed to apply defaults", variant: "destructive" });
                        }
                      }}
                      className="h-8 text-xs"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Defaults
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
