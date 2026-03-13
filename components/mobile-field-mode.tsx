"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SpeciesSheet } from "@/components/species-sheet";
import { VoiceInput } from "@/components/voice-input";
import { useConnectivity } from "@/lib/connectivity";
import { useToast } from "@/hooks/use-toast";
import { type TreeFormData } from "@/components/tree-side-panel";
import {
  HEALTH_OBSERVATIONS,
  STRUCTURAL_OBSERVATIONS,
  parseObservedLine,
  extractFreeText,
  buildNotesWithObserved,
  ACTION_OPTIONS,
  CONDITION_LABELS,
  CONDITION_BUTTON_COLORS,
} from "@/lib/observation-helpers";
import {
  type Observation,
  labelToCanonical,
  getDefaultHealthObservations,
  getDefaultStructuralObservations,
} from "@/lib/default-observations";
import { getCategoriesForReportType } from "@/lib/photo-categories";
import {
  X,
  ChevronLeft,
  ShieldCheck,
  ShieldX,
  Loader2,
  Camera,
  ImagePlus,
  Zap,
  Save,
  Copy,
  Pencil,
  Check,
  WifiOff,
} from "lucide-react";

// Dynamic import for PinDropMap (Mapbox needs DOM)
const PinDropMap = dynamic(
  () => import("@/components/pin-drop-map").then((mod) => mod.PinDropMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-neutral-200 animate-pulse" /> }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id?: string;
  treeNumber?: number;
  pinLat?: number;
  pinLng?: number;
  tagNumber?: string | null;
  speciesCommon?: string;
  speciesScientific?: string;
  dbhInches?: number;
  heightFt?: number | null;
  canopySpreadFt?: number | null;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  isProtected?: boolean;
  protectionReason?: string | null;
  isHeritage?: boolean;
  heritageReason?: string | null;
  mitigationRequired?: string | null;
  status?: string;
  typeSpecificData?: string | null;
}

interface ProtectionResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
}

export interface MobileFieldModeProps {
  tree: TreeRecord | null;
  treeNumber: number;
  propertyId: string;
  propertyCity: string;
  propertyCenter: { lat: number; lng: number };
  existingPins?: Array<{ lat: number; lng: number; treeNumber: number }>;
  reportType?: string;
  onSave: (data: TreeFormData & { pinLat?: number; pinLng?: number }) => void;
  onSaveAndNext: (data: TreeFormData & { pinLat?: number; pinLng?: number }) => void;
  onClose: () => void;
  saving?: boolean;
  lastSavedTree?: TreeRecord | null;
  recentSpecies?: { common: string; scientific: string }[];
  // Arborist customization
  arboristHealthObs?: Observation[];
  arboristStructuralObs?: Observation[];
  arboristRecommendationMap?: Record<string, string>;
  arboristCommonSpecies?: string[];
  arboristDefaultUnitPrice?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function haptic(ms: number = 10) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

// Abbreviated observation labels for mobile (display-only — canonical terms stored unchanged)
const MOBILE_HEALTH_ABBREV: Record<string, string> = {
  "Chlorosis (yellowing)": "Chlorosis",
  "Decay / fungal fruiting bodies": "Decay / fungi",
  "Pest / insect damage": "Pest damage",
  "Poor vigor / sparse canopy": "Poor vigor",
  "Leaf scorch / burn": "Leaf scorch",
  "Root damage / cut roots": "Root damage",
  "Cankers / lesions": "Cankers",
};

const MOBILE_STRUCTURAL_ABBREV: Record<string, string> = {
  "Codominant stems": "Codom. stems",
  "Lean (note degree if significant)": "Lean",
  "Root plate heaving / lifting": "Root heaving",
  "Deadwood in crown": "Deadwood",
  "Cracks / splits": "Cracks",
  "Weak branch attachments": "Weak attach.",
  "Trunk wound / damage": "Trunk wound",
  "Hangers / broken branches": "Hangers",
};

function abbreviateObs(label: string, map: Record<string, string>): string {
  return map[label] ?? label;
}

// Screen names for wizard
type WizardScreen = 1 | 2 | 3 | 4 | 5;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MobileFieldMode({
  tree,
  treeNumber,
  propertyId,
  propertyCity,
  propertyCenter,
  existingPins = [],
  reportType,
  onSave,
  onSaveAndNext,
  onClose,
  saving = false,
  lastSavedTree,
  recentSpecies = [],
  arboristHealthObs,
  arboristStructuralObs,
  arboristRecommendationMap,
  arboristCommonSpecies,
}: MobileFieldModeProps) {
  const { isOnline } = useConnectivity();
  const { toast } = useToast();
  const isNewTree = !tree?.id;

  // ---- Computed observation arrays (arborist customization or fallback) ----
  const effectiveHealthObs = arboristHealthObs
    ? arboristHealthObs.filter((o) => o.enabled).map((o) => o.label)
    : HEALTH_OBSERVATIONS;
  const effectiveStructuralObs = arboristStructuralObs
    ? arboristStructuralObs.filter((o) => o.enabled).map((o) => o.label)
    : STRUCTURAL_OBSERVATIONS;
  const allHealthObs = arboristHealthObs || getDefaultHealthObservations();
  const allStructuralObs = arboristStructuralObs || getDefaultStructuralObservations();

  // ---- Wizard state ----
  // New trees start at screen 1 (pin drop), existing trees start at screen 2
  const [currentScreen, setCurrentScreen] = useState<WizardScreen>(isNewTree ? 1 : 2);

  // ---- Pin state (from wizard screen 1) ----
  const [pinLat, setPinLat] = useState<number | undefined>(tree?.pinLat);
  const [pinLng, setPinLng] = useState<number | undefined>(tree?.pinLng);

  // ---- Form state ----
  const [tagNumber, setTagNumber] = useState(tree?.tagNumber ?? "");
  const [speciesCommon, setSpeciesCommon] = useState(tree?.speciesCommon ?? "");
  const [speciesScientific, setSpeciesScientific] = useState(tree?.speciesScientific ?? "");
  const [dbhInches, setDbhInches] = useState(tree?.dbhInches ? String(tree.dbhInches) : "");
  const [heightFt, setHeightFt] = useState(tree?.heightFt ? String(tree.heightFt) : "");
  const [canopySpreadFt, setCanopySpreadFt] = useState(tree?.canopySpreadFt ? String(tree.canopySpreadFt) : "");
  const [conditionRating, setConditionRating] = useState(tree?.conditionRating ?? 0);
  const [healthNotes, setHealthNotes] = useState(tree?.healthNotes ?? "");
  const [structuralNotes, setStructuralNotes] = useState(tree?.structuralNotes ?? "");
  const [healthChecks, setHealthChecks] = useState<string[]>(parseObservedLine(tree?.healthNotes ?? ""));
  const [structuralChecks, setStructuralChecks] = useState<string[]>(parseObservedLine(tree?.structuralNotes ?? ""));
  const [recommendedAction, setRecommendedAction] = useState(tree?.recommendedAction ?? "retain");

  // ---- Species sheet state ----
  const [speciesSheetOpen, setSpeciesSheetOpen] = useState(false);

  // ---- Protection ----
  const [protectionResult, setProtectionResult] = useState<ProtectionResult | null>(null);
  const [checkingProtection, setCheckingProtection] = useState(false);

  // ---- Photos ----
  const [photos, setPhotos] = useState<{ id: string; url: string; category?: string }[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<File[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);

  // ---- Fetch photos for existing trees ----
  useEffect(() => {
    if (!tree?.id) return;
    (async () => {
      try {
        const res = await fetch(`/api/properties/${propertyId}/trees/${tree.id}/photos`);
        if (res.ok) {
          const data = await res.json();
          setPhotos(
            (data ?? []).map((p: { id: string; url: string; category?: string }) => ({
              id: p.id,
              url: p.url,
              category: p.category,
            }))
          );
        }
      } catch {
        // Best effort
      }
    })();
  }, [tree?.id, propertyId]);

  // ---- Ordinance protection auto-check ----
  useEffect(() => {
    if (!speciesCommon || !dbhInches || !propertyCity) {
      setProtectionResult(null);
      return;
    }
    const timer = setTimeout(async () => {
      setCheckingProtection(true);
      try {
        const params = new URLSearchParams({
          city: propertyCity,
          species: speciesCommon,
          dbh: dbhInches,
        });
        const res = await fetch(`/api/ordinances/check?${params.toString()}`);
        if (res.ok) {
          const data: ProtectionResult = await res.json();
          setProtectionResult(data);
        }
      } catch {
        setProtectionResult(null);
      } finally {
        setCheckingProtection(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [speciesCommon, dbhInches, propertyCity]);

  // ---- Draft auto-save (localStorage, every 30s) ----
  const draftKey = `treecertify_draft_${propertyId}_${tree?.id || "new_" + treeNumber}`;

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          draftKey,
          JSON.stringify({
            currentScreen,
            pinLat,
            pinLng,
            tagNumber,
            speciesCommon,
            speciesScientific,
            dbhInches,
            heightFt,
            canopySpreadFt,
            conditionRating,
            healthNotes,
            structuralNotes,
            recommendedAction,
            additionalNotes,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [
    draftKey, currentScreen, pinLat, pinLng, tagNumber,
    speciesCommon, speciesScientific, dbhInches, heightFt,
    canopySpreadFt, conditionRating, healthNotes, structuralNotes,
    recommendedAction, additionalNotes,
  ]);

  // ---- Restore draft on mount ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (!saved) return;
      const draft = JSON.parse(saved);
      // Only restore if recent (< 1 hour)
      if (Date.now() - draft.timestamp > 3600000) return;
      // Only restore if form is empty (new tree)
      if (isNewTree && !speciesCommon) {
        if (draft.pinLat) setPinLat(draft.pinLat);
        if (draft.pinLng) setPinLng(draft.pinLng);
        if (draft.tagNumber) setTagNumber(draft.tagNumber);
        if (draft.speciesCommon) setSpeciesCommon(draft.speciesCommon);
        if (draft.speciesScientific) setSpeciesScientific(draft.speciesScientific);
        if (draft.dbhInches) setDbhInches(draft.dbhInches);
        if (draft.heightFt) setHeightFt(draft.heightFt);
        if (draft.canopySpreadFt) setCanopySpreadFt(draft.canopySpreadFt);
        if (draft.conditionRating != null) setConditionRating(draft.conditionRating);
        if (draft.healthNotes) setHealthNotes(draft.healthNotes);
        if (draft.structuralNotes) setStructuralNotes(draft.structuralNotes);
        if (draft.recommendedAction) setRecommendedAction(draft.recommendedAction);
        if (draft.additionalNotes) setAdditionalNotes(draft.additionalNotes);
        if (draft.currentScreen && draft.currentScreen > 1) {
          setCurrentScreen(draft.currentScreen);
        }
      }
    } catch {
      // Ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Handlers ----

  const handleSpeciesChange = useCallback((common: string, scientific: string) => {
    setSpeciesCommon(common);
    setSpeciesScientific(scientific);
    setProtectionResult(null);
  }, []);

  const handleCopyFromLast = useCallback(() => {
    if (!lastSavedTree) return;
    // Copy species, condition, action (NOT measurements — those vary per tree)
    setSpeciesCommon(lastSavedTree.speciesCommon ?? "");
    setSpeciesScientific(lastSavedTree.speciesScientific ?? "");
    setConditionRating(lastSavedTree.conditionRating ?? 0);
    setRecommendedAction(lastSavedTree.recommendedAction ?? "retain");

    // Copy observation checkboxes
    const copiedHealthChecks = parseObservedLine(lastSavedTree.healthNotes ?? "");
    const copiedStructuralChecks = parseObservedLine(lastSavedTree.structuralNotes ?? "");
    setHealthChecks(copiedHealthChecks);
    setStructuralChecks(copiedStructuralChecks);
    setHealthNotes(buildNotesWithObserved(copiedHealthChecks, ""));
    setStructuralNotes(buildNotesWithObserved(copiedStructuralChecks, ""));

    setProtectionResult(null);
    haptic(10);
  }, [lastSavedTree]);

  const handleConditionSelect = useCallback(
    (rating: number) => {
      setConditionRating(rating);
      haptic(10);
      if (arboristRecommendationMap) {
        const action = arboristRecommendationMap[String(rating)];
        if (action) setRecommendedAction(action);
      }
    },
    [arboristRecommendationMap]
  );

  // ---- Build form data ----
  const buildFormData = useCallback((): TreeFormData & { pinLat?: number; pinLng?: number } => {
    // Merge additional notes into healthNotes free text
    const existingFreeText = extractFreeText(healthNotes);
    const mergedFreeText = additionalNotes.trim()
      ? (existingFreeText ? existingFreeText + "\n\n" + additionalNotes.trim() : additionalNotes.trim())
      : existingFreeText;
    const finalHealthNotes = buildNotesWithObserved(healthChecks, mergedFreeText);

    return {
      speciesCommon,
      speciesScientific,
      dbhInches: Number(dbhInches) || 0,
      heightFt: heightFt ? Number(heightFt) : null,
      canopySpreadFt: canopySpreadFt ? Number(canopySpreadFt) : null,
      conditionRating,
      healthNotes: finalHealthNotes,
      structuralNotes,
      healthObservationCanonical:
        healthChecks
          .filter((c) => c !== "No significant concerns")
          .map((c) => labelToCanonical(c, allHealthObs))
          .join(", ") ||
        (healthChecks.includes("No significant concerns") ? "no_significant_concerns" : undefined),
      structuralObservationCanonical:
        structuralChecks
          .filter((c) => c !== "No significant concerns")
          .map((c) => labelToCanonical(c, allStructuralObs))
          .join(", ") ||
        (structuralChecks.includes("No significant concerns") ? "no_significant_concerns" : undefined),
      recommendedAction,
      isProtected: protectionResult?.isProtected ?? false,
      protectionReason: protectionResult?.reason ?? null,
      mitigationRequired: protectionResult?.mitigationRequired ?? null,
      tagNumber,
      pinLat,
      pinLng,
    };
  }, [
    speciesCommon, speciesScientific, dbhInches, heightFt, canopySpreadFt,
    conditionRating, healthNotes, structuralNotes, healthChecks, structuralChecks,
    allHealthObs, allStructuralObs, recommendedAction, protectionResult,
    tagNumber, pinLat, pinLng, additionalNotes,
  ]);

  // Upload queued photos after save for new trees
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadPendingPhotos = useCallback(async (treeId: string) => {
    for (const file of pendingPhotos) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(`/api/properties/${propertyId}/trees/${treeId}/photos`, {
          method: "POST",
          body: formData,
        });
      } catch {
        // Best effort — photos may need manual re-upload
      }
    }
  }, [pendingPhotos, propertyId]);

  const handleSaveAndClose = useCallback(() => {
    const data = buildFormData();
    onSave(data);
    haptic(20);
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
  }, [onSave, buildFormData, draftKey]);

  const handleSaveAndNext = useCallback(() => {
    const data = buildFormData();
    onSaveAndNext(data);
    haptic(20);
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
  }, [onSaveAndNext, buildFormData, draftKey]);

  // ---- Photo handlers ----
  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    haptic(10);

    if (isNewTree || !tree?.id) {
      // Queue for upload after save
      setPendingPhotos((prev) => [...prev, file]);
      toast({ title: "Photo queued", description: "Will upload when tree is saved." });
    } else {
      // Upload immediately for existing trees
      setUploadingPhoto(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(
          `/api/properties/${propertyId}/trees/${tree.id}/photos`,
          { method: "POST", body: formData }
        );
        if (res.ok) {
          const photo = await res.json();
          setPhotos((prev) => [...prev, { id: photo.id, url: photo.url }]);
        } else {
          throw new Error("Upload failed");
        }
      } catch {
        toast({
          title: "Photo upload failed",
          description: "Could not upload photo. Check your connection.",
          variant: "destructive",
        });
      } finally {
        setUploadingPhoto(false);
      }
    }
    e.target.value = "";
  };

  const handleLibrarySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isNewTree || !tree?.id) {
        setPendingPhotos((prev) => [...prev, file]);
      } else {
        setUploadingPhoto(true);
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch(
            `/api/properties/${propertyId}/trees/${tree.id}/photos`,
            { method: "POST", body: formData }
          );
          if (res.ok) {
            const photo = await res.json();
            setPhotos((prev) => [...prev, { id: photo.id, url: photo.url }]);
          }
        } catch {
          // Best effort
        } finally {
          setUploadingPhoto(false);
        }
      }
    }
    e.target.value = "";
  };

  // ---- Navigation ----
  const goBack = useCallback(() => {
    if (currentScreen === 1 || (currentScreen === 2 && !isNewTree)) {
      onClose();
    } else {
      setCurrentScreen((prev) => (prev - 1) as WizardScreen);
    }
  }, [currentScreen, isNewTree, onClose]);

  const goNext = useCallback(() => {
    if (currentScreen < 5) {
      setCurrentScreen((prev) => (prev + 1) as WizardScreen);
    }
  }, [currentScreen]);

  const goToScreen = useCallback((screen: WizardScreen) => {
    setCurrentScreen(screen);
  }, []);

  // ---- Derived ----
  const canSave = !!speciesCommon.trim() && !!dbhInches;
  const totalScreens = isNewTree ? 5 : 4;
  const displayStep = isNewTree ? currentScreen : currentScreen - 1;

  // Photo categories for checklist
  const photoCategories = getCategoriesForReportType(reportType || "removal_permit");
  const totalPhotoCount = photos.length + pendingPhotos.length;

  // ---- Render ----
  return (
    <div
      className="fixed inset-0 z-40 bg-white flex flex-col"
      style={{ colorScheme: "light" }}
    >
      {/* ================================================================= */}
      {/* SCREEN 1 — Pin Drop (new trees only) */}
      {/* ================================================================= */}
      {currentScreen === 1 && (
        <div className="flex-1 flex flex-col">
          {/* Header overlay */}
          <div
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 bg-gradient-to-b from-black/40 to-transparent"
            style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 12px)", paddingBottom: 12 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 text-white text-sm font-medium"
              style={{ minHeight: 44 }}
            >
              <ChevronLeft className="h-5 w-5" />
              Cancel
            </button>
            <span className="text-white/80 text-sm font-medium">
              Tree #{treeNumber} — Place Pin
            </span>
            <div className="w-16" /> {/* Spacer for balance */}
          </div>

          {/* Map fills rest */}
          <div className="flex-1">
            <PinDropMap
              initialCenter={
                tree?.pinLat && tree?.pinLng
                  ? { lat: tree.pinLat, lng: tree.pinLng }
                  : propertyCenter
              }
              existingPins={existingPins}
              onConfirm={(lat, lng) => {
                setPinLat(lat);
                setPinLng(lng);
                goNext();
              }}
            />
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCREENS 2–5 — Shared chrome: header + content + footer */}
      {/* ================================================================= */}
      {currentScreen >= 2 && (
        <>
          {/* ---- Fixed Header ---- */}
          <div
            className="shrink-0 bg-white border-b px-4 py-3 z-50"
            style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 12px)" }}
          >
            {/* Offline bar */}
            {!isOnline && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5 mb-2 -mx-1">
                <WifiOff className="h-3.5 w-3.5" />
                Offline — data will sync when reconnected
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-0.5 text-forest text-sm font-medium -ml-1"
                style={{ minHeight: 44, minWidth: 44 }}
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </button>

              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold font-display">
                  Tree <span className="font-mono">#{treeNumber}</span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Step indicator */}
                <span className="text-xs text-neutral-400 font-mono">
                  {displayStep}/{totalScreens}
                </span>
                {/* Connectivity dot */}
                <span
                  className={`h-2 w-2 rounded-full shrink-0 ${
                    isOnline ? "bg-green-500" : "bg-amber-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-lg"
                  style={{ minWidth: 44, minHeight: 44 }}
                >
                  <X className="h-5 w-5 text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: totalScreens }, (_, i) => {
                const screenNum = isNewTree ? i + 1 : i + 2;
                const isActive = screenNum === currentScreen;
                const isPast = screenNum < currentScreen;
                return (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      isActive ? "bg-forest" : isPast ? "bg-forest/40" : "bg-neutral-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* ---- Scrollable Content ---- */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {/* ============================================= */}
            {/* SCREEN 2 — Species & Measurements */}
            {/* ============================================= */}
            {currentScreen === 2 && (
              <div className="space-y-6 pt-4">
                {/* Copy from last tree */}
                {isNewTree && lastSavedTree?.speciesCommon && (
                  <button
                    type="button"
                    onClick={handleCopyFromLast}
                    className="w-full h-12 rounded-lg border-2 border-dashed border-neutral-300 text-sm text-neutral-500 active:border-forest active:text-forest transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy from Tree #{lastSavedTree.treeNumber} ({lastSavedTree.speciesCommon})
                  </button>
                )}

                {/* Species */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold font-display">Species</Label>
                  <button
                    type="button"
                    onClick={() => setSpeciesSheetOpen(true)}
                    className={`w-full h-14 rounded-xl border-2 px-4 text-left flex items-center justify-between transition-colors ${
                      speciesCommon
                        ? "border-forest/30 bg-forest/5"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="min-w-0">
                      {speciesCommon ? (
                        <>
                          <p className="text-base font-medium text-neutral-900 truncate">
                            {speciesCommon}
                          </p>
                          {speciesScientific && (
                            <p className="text-xs text-neutral-400 italic truncate">
                              {speciesScientific}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-base text-neutral-400">Tap to select species...</p>
                      )}
                    </div>
                    <ChevronLeft className="h-4 w-4 text-neutral-400 rotate-180 shrink-0" />
                  </button>

                  <SpeciesSheet
                    open={speciesSheetOpen}
                    onOpenChange={setSpeciesSheetOpen}
                    value={speciesCommon}
                    onChange={handleSpeciesChange}
                    recentSpecies={recentSpecies}
                    arboristCommonSpecies={arboristCommonSpecies}
                  />
                </div>

                {/* Tag # */}
                <div className="flex items-center gap-3">
                  <Label htmlFor="fm-tag" className="text-xs shrink-0 text-neutral-500">
                    Tag #
                  </Label>
                  <Input
                    id="fm-tag"
                    placeholder="Optional"
                    value={tagNumber}
                    onChange={(e) => setTagNumber(e.target.value)}
                    className="h-10 w-32 font-mono text-sm"
                  />
                </div>

                {/* DBH */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold font-display">DBH (inches)</Label>
                  <Input
                    inputMode="decimal"
                    placeholder="0"
                    value={dbhInches}
                    onChange={(e) => {
                      setDbhInches(e.target.value);
                      setProtectionResult(null);
                    }}
                    className="h-14 text-2xl font-mono text-center rounded-xl"
                  />
                </div>

                {/* Height & Spread side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-neutral-500">Height (ft)</Label>
                    <Input
                      inputMode="decimal"
                      placeholder="—"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="h-14 text-xl font-mono text-center rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-neutral-500">Canopy (ft)</Label>
                    <Input
                      inputMode="decimal"
                      placeholder="—"
                      value={canopySpreadFt}
                      onChange={(e) => setCanopySpreadFt(e.target.value)}
                      className="h-14 text-xl font-mono text-center rounded-xl"
                    />
                  </div>
                </div>

                {/* Condition rating */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold font-display">Condition</Label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((rating) => {
                      const isSelected = conditionRating === rating;
                      const colors = CONDITION_BUTTON_COLORS[rating];
                      return (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleConditionSelect(rating)}
                          className={`flex flex-col items-center justify-center rounded-xl border-2 transition-colors ${
                            isSelected
                              ? colors.selected
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                          style={{ height: 52, minHeight: 52 }}
                        >
                          <span className="text-lg font-bold leading-none">{rating}</span>
                          <span className="text-[8px] font-medium leading-tight mt-0.5">
                            {CONDITION_LABELS[rating]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recommended action */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold font-display">Action</Label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {ACTION_OPTIONS.map((opt) => {
                      const isSelected = recommendedAction === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRecommendedAction(opt.value)}
                          className={`h-12 rounded-xl border-2 font-medium text-sm transition-colors ${
                            isSelected
                              ? opt.color === "red"
                                ? "border-red-500 bg-red-50 text-red-700"
                                : opt.color === "amber"
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : opt.color === "blue"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-forest bg-forest/10 text-forest"
                              : "border-neutral-200 text-neutral-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Protection banner */}
                {checkingProtection && (
                  <div className="flex items-center gap-2 text-xs text-neutral-400 py-1">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Checking ordinance...
                  </div>
                )}
                {protectionResult && !checkingProtection && (
                  <div
                    className={`flex items-start gap-2.5 rounded-xl border px-3 py-3 ${
                      protectionResult.isProtected
                        ? "border-amber-300 bg-amber-50"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    {protectionResult.isProtected ? (
                      <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <ShieldX className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs leading-relaxed">
                      {protectionResult.isProtected ? (
                        <>
                          <span className="font-semibold text-amber-800">Protected</span>
                          {protectionResult.codeReference && (
                            <span className="text-amber-700"> — {protectionResult.codeReference}</span>
                          )}
                          {protectionResult.isHeritage && (
                            <Badge className="ml-1.5 bg-amber-500 text-white text-[10px] px-1.5 py-0">
                              Heritage
                            </Badge>
                          )}
                          {protectionResult.mitigationRequired && (
                            <p className="text-amber-700 mt-0.5">{protectionResult.mitigationRequired}</p>
                          )}
                        </>
                      ) : (
                        <span className="text-neutral-500">
                          Not protected under {propertyCity} ordinance
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================= */}
            {/* SCREEN 3 — Health & Structural Observations */}
            {/* ============================================= */}
            {currentScreen === 3 && (
              <div className="space-y-6 pt-4">
                {/* Health observations */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold font-display">
                      Health Observations
                    </Label>
                    <VoiceInput
                      onTranscript={(text) => {
                        const existing = extractFreeText(healthNotes);
                        const combined = existing ? existing + " " + text : text;
                        setHealthNotes(buildNotesWithObserved(healthChecks, combined));
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {effectiveHealthObs.map((label) => {
                      const isChecked = healthChecks.includes(label);
                      return (
                        <label
                          key={label}
                          className="flex items-center gap-2 text-xs cursor-pointer"
                          style={{ minHeight: 44 }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              let next: string[];
                              if (label === "No significant concerns") {
                                next = isChecked ? [] : ["No significant concerns"];
                              } else if (isChecked) {
                                next = healthChecks.filter((c) => c !== label);
                              } else {
                                next = healthChecks.filter((c) => c !== "No significant concerns").concat(label);
                              }
                              setHealthChecks(next);
                              setHealthNotes(buildNotesWithObserved(next, extractFreeText(healthNotes)));
                            }}
                            className="rounded border-input h-5 w-5 shrink-0"
                          />
                          <span className="leading-tight">
                            {abbreviateObs(label, MOBILE_HEALTH_ABBREV)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {(extractFreeText(healthNotes) || healthChecks.length > 0) && (
                    <div className="relative">
                      <Textarea
                        placeholder="Additional health notes..."
                        value={extractFreeText(healthNotes)}
                        onChange={(e) =>
                          setHealthNotes(buildNotesWithObserved(healthChecks, e.target.value))
                        }
                        rows={2}
                        className="text-base pr-10"
                      />
                    </div>
                  )}
                </div>

                <div className="h-px bg-neutral-100" />

                {/* Structural observations */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold font-display">
                      Structural Observations
                    </Label>
                    <VoiceInput
                      onTranscript={(text) => {
                        const existing = extractFreeText(structuralNotes);
                        const combined = existing ? existing + " " + text : text;
                        setStructuralNotes(buildNotesWithObserved(structuralChecks, combined));
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {effectiveStructuralObs.map((label) => {
                      const isChecked = structuralChecks.includes(label);
                      return (
                        <label
                          key={label}
                          className="flex items-center gap-2 text-xs cursor-pointer"
                          style={{ minHeight: 44 }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              let next: string[];
                              if (label === "No significant concerns") {
                                next = isChecked ? [] : ["No significant concerns"];
                              } else if (isChecked) {
                                next = structuralChecks.filter((c) => c !== label);
                              } else {
                                next = structuralChecks.filter((c) => c !== "No significant concerns").concat(label);
                              }
                              setStructuralChecks(next);
                              setStructuralNotes(buildNotesWithObserved(next, extractFreeText(structuralNotes)));
                            }}
                            className="rounded border-input h-5 w-5 shrink-0"
                          />
                          <span className="leading-tight">
                            {abbreviateObs(label, MOBILE_STRUCTURAL_ABBREV)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {(extractFreeText(structuralNotes) || structuralChecks.length > 0) && (
                    <div className="relative">
                      <Textarea
                        placeholder="Additional structural notes..."
                        value={extractFreeText(structuralNotes)}
                        onChange={(e) =>
                          setStructuralNotes(buildNotesWithObserved(structuralChecks, e.target.value))
                        }
                        rows={2}
                        className="text-base pr-10"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================= */}
            {/* SCREEN 4 — Photos & Notes */}
            {/* ============================================= */}
            {currentScreen === 4 && (
              <div className="space-y-5 pt-4">
                <Label className="text-sm font-semibold font-display">Photos</Label>

                {/* Required photo checklist */}
                <div className="space-y-1.5">
                  {photoCategories
                    .filter((c) => c.required)
                    .map((cat) => {
                      const has = photos.some((p) => p.category === cat.value);
                      return (
                        <div key={cat.value} className="flex items-center gap-2 text-xs">
                          <span className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            has ? "bg-forest" : "bg-neutral-200"
                          }`}>
                            {has && <Check className="h-2.5 w-2.5 text-white" />}
                          </span>
                          <span className={has ? "text-forest font-medium" : "text-neutral-400"}>
                            {cat.label} {cat.required && "(required)"}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {/* Camera button */}
                <label className="flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-dashed border-forest/30 text-forest cursor-pointer active:bg-forest/5 transition-colors">
                  {uploadingPhoto ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Camera className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">
                    {uploadingPhoto ? "Uploading..." : "Take Photo"}
                  </span>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoCapture}
                    disabled={uploadingPhoto}
                    className="hidden"
                  />
                </label>

                {/* Library button */}
                <label className="flex items-center justify-center gap-2 h-12 rounded-xl border border-neutral-200 text-neutral-600 cursor-pointer active:bg-neutral-50 transition-colors">
                  <ImagePlus className="h-4 w-4" />
                  <span className="text-sm">Add from Library</span>
                  <input
                    ref={libraryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleLibrarySelect}
                    className="hidden"
                  />
                </label>

                {/* Photo thumbnails */}
                {(photos.length > 0 || pendingPhotos.length > 0) && (
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                    {photos.map((p) => (
                      <img
                        key={p.id}
                        src={p.url}
                        className="w-[72px] h-[72px] rounded-lg object-cover border shrink-0"
                        alt=""
                      />
                    ))}
                    {pendingPhotos.map((file, i) => (
                      <div
                        key={`pending-${i}`}
                        className="w-[72px] h-[72px] rounded-lg bg-neutral-100 border shrink-0 flex items-center justify-center relative"
                      >
                        <Camera className="h-5 w-5 text-neutral-300" />
                        <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-amber-100 text-amber-700 px-1 rounded-sm font-medium">
                          queued
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional notes */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold font-display">Additional Notes</Label>
                    <VoiceInput
                      onTranscript={(text) => {
                        setAdditionalNotes((prev) => (prev ? prev + " " + text : text));
                      }}
                    />
                  </div>
                  <Textarea
                    placeholder="Any additional observations, site notes..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    className="text-base"
                  />
                </div>
              </div>
            )}

            {/* ============================================= */}
            {/* SCREEN 5 — Review & Save */}
            {/* ============================================= */}
            {currentScreen === 5 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold font-display text-neutral-400 uppercase tracking-wider">
                  Review
                </h3>

                {/* Species & Measurements summary */}
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => goToScreen(2)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-neutral-100 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-neutral-900 truncate">
                        {speciesCommon || "No species selected"}
                      </p>
                      {speciesScientific && (
                        <p className="text-xs text-neutral-400 italic">{speciesScientific}</p>
                      )}
                      <div className="flex gap-4 mt-1.5">
                        <span className="text-sm font-mono text-neutral-600">
                          DBH: {dbhInches || "—"}&quot;
                        </span>
                        {heightFt && (
                          <span className="text-sm font-mono text-neutral-600">
                            H: {heightFt}&apos;
                          </span>
                        )}
                        {canopySpreadFt && (
                          <span className="text-sm font-mono text-neutral-600">
                            Canopy: {canopySpreadFt}&apos;
                          </span>
                        )}
                      </div>
                    </div>
                    <Pencil className="h-4 w-4 text-neutral-400 shrink-0" />
                  </button>

                  <div className="border-t border-neutral-200 px-4 py-2.5 flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${CONDITION_BUTTON_COLORS[conditionRating]?.dot || "bg-neutral-300"}`} />
                    <span className="text-sm text-neutral-700">
                      {CONDITION_LABELS[conditionRating]} ({conditionRating}/5)
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className={`text-sm font-medium capitalize ${
                      recommendedAction === "remove" ? "text-red-600" :
                      recommendedAction === "prune" ? "text-amber-600" :
                      recommendedAction === "monitor" ? "text-blue-600" :
                      "text-forest"
                    }`}>
                      {recommendedAction}
                    </span>
                  </div>
                </div>

                {/* Observations summary */}
                <button
                  type="button"
                  onClick={() => goToScreen(3)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-left active:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Observations
                    </p>
                    {healthChecks.length > 0 && (
                      <p className="text-sm text-neutral-700 truncate">
                        Health: {healthChecks.join(", ")}
                      </p>
                    )}
                    {structuralChecks.length > 0 && (
                      <p className="text-sm text-neutral-700 truncate">
                        Structural: {structuralChecks.join(", ")}
                      </p>
                    )}
                    {healthChecks.length === 0 && structuralChecks.length === 0 && (
                      <p className="text-sm text-neutral-400 italic">No observations recorded</p>
                    )}
                  </div>
                  <Pencil className="h-4 w-4 text-neutral-400 shrink-0" />
                </button>

                {/* Photos summary */}
                <button
                  type="button"
                  onClick={() => goToScreen(4)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-left active:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Photos & Notes
                    </p>
                    <p className="text-sm text-neutral-700">
                      {totalPhotoCount} photo{totalPhotoCount !== 1 ? "s" : ""}
                      {pendingPhotos.length > 0 && (
                        <span className="text-amber-600 ml-1">
                          ({pendingPhotos.length} queued)
                        </span>
                      )}
                    </p>
                    {additionalNotes && (
                      <p className="text-sm text-neutral-500 truncate mt-0.5">
                        {additionalNotes}
                      </p>
                    )}
                  </div>
                  <Pencil className="h-4 w-4 text-neutral-400 shrink-0" />
                </button>

                {/* Protection status — the "wow" moment */}
                {checkingProtection && (
                  <div className="flex items-center gap-2 text-xs text-neutral-400 py-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Checking protection status...
                  </div>
                )}
                {protectionResult && !checkingProtection && (
                  <div
                    className={`rounded-xl border-2 px-4 py-4 ${
                      protectionResult.isProtected
                        ? "border-amber-400 bg-amber-50"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    {protectionResult.isProtected ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-6 w-6 text-amber-600" />
                          <span className="text-base font-semibold text-amber-800">
                            Protected Tree
                          </span>
                          {protectionResult.isHeritage && (
                            <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5">
                              Heritage
                            </Badge>
                          )}
                        </div>
                        {protectionResult.codeReference && (
                          <p className="text-sm text-amber-700">{protectionResult.codeReference}</p>
                        )}
                        {protectionResult.mitigationRequired && (
                          <p className="text-sm text-amber-700 bg-amber-100/50 rounded-lg px-3 py-2">
                            {protectionResult.mitigationRequired}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShieldX className="h-5 w-5 text-neutral-400" />
                        <span className="text-sm text-neutral-500">
                          Not protected under {propertyCity} ordinance
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tag number if set */}
                {tagNumber && (
                  <p className="text-xs text-neutral-400 font-mono">
                    Tag #{tagNumber}
                  </p>
                )}
              </div>
            )}

            {/* Bottom spacer for fixed bar */}
            <div className="h-4" />
          </div>

          {/* ---- Fixed Bottom Bar ---- */}
          <div
            className="shrink-0 bg-white border-t px-4 py-3 z-50"
            style={{
              paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
            }}
          >
            {currentScreen < 5 ? (
              /* Next button for screens 2-4 */
              <Button
                type="button"
                onClick={goNext}
                disabled={currentScreen === 2 && !canSave}
                className="w-full h-14 bg-forest hover:bg-forest-light text-white text-base font-semibold rounded-xl"
              >
                {currentScreen === 2 && !canSave
                  ? "Enter species & DBH to continue"
                  : "Continue"}
              </Button>
            ) : (
              /* Save buttons on screen 5 */
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={handleSaveAndNext}
                  disabled={saving || !canSave}
                  className="w-full h-14 bg-forest hover:bg-forest-light text-white text-base font-semibold rounded-xl gap-2"
                >
                  {saving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                  Save & Add Next Tree
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveAndClose}
                  disabled={saving || !canSave}
                  variant="outline"
                  className="w-full h-14 text-base font-semibold rounded-xl gap-2"
                >
                  <Save className="h-5 w-5" />
                  Save & Finish
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
