"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { SpeciesSearch } from "@/components/species-search";
import { ConditionRating } from "@/components/condition-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreePhotos } from "@/components/tree-photos";
import { TreeAudioNotes } from "@/components/tree-audio-notes";
import { useToast } from "@/hooks/use-toast";
import { VoiceInput } from "@/components/voice-input";
import { HealthAssessmentFields } from "@/components/type-fields/health-assessment-fields";
import { RemovalPermitFields } from "@/components/type-fields/removal-permit-fields";
import { TreeValuationFields, type ValuationFieldValues } from "@/components/type-fields/tree-valuation-fields";
import { ConstructionEncroachmentFields } from "@/components/type-fields/construction-encroachment-fields";
import {
  getReportTypeConfig,
  type HealthAssessmentData,
  type RemovalPermitData,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";
import { ctlaConditionTo15Scale } from "@/lib/valuation";
import {
  HEALTH_OBSERVATIONS,
  STRUCTURAL_OBSERVATIONS,
  parseObservedLine,
  extractFreeText,
  buildNotesWithObserved,
  ACTION_OPTIONS,
} from "@/lib/observation-helpers";
import {
  type Observation,
  labelToCanonical,
  getDefaultHealthObservations,
  getDefaultStructuralObservations,
} from "@/lib/default-observations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  X,
  Save,
  Trash2,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Loader2,
  Camera,
  Mic,
  PenLine,
  ExternalLink,
  Info,
  Copy,
  ClipboardList,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreeFormData {
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  healthObservationCanonical?: string;
  structuralObservationCanonical?: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  tagNumber: string;
  typeSpecificData?: string; // JSON string
  // CTLA Valuation fields (only when reportType === "tree_valuation")
  valuationUnitPrice?: number | null;
  valuationHealthRating?: number | null;
  valuationStructureRating?: number | null;
  valuationFormRating?: number | null;
  valuationConditionRating?: number | null;
  valuationSpeciesRating?: number | null;
  valuationSiteRating?: number | null;
  valuationContributionRating?: number | null;
  valuationLocationRating?: number | null;
  valuationBasicValue?: number | null;
  valuationAppraisedValue?: number | null;
  valuationNotes?: string | null;
}

interface OrdinanceContext {
  nativeThreshold: number | null;
  nonnativeThreshold: number | null;
  heritageThreshold: number | null;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  replantingRatio: string | null;
  inLieuFee: string | null;
  certifierRequirement: string | null;
}

interface ProtectionResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
  ordinanceContext?: OrdinanceContext | null;
}

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
  // CTLA Valuation fields
  valuationUnitPrice?: number | null;
  valuationHealthRating?: number | null;
  valuationStructureRating?: number | null;
  valuationFormRating?: number | null;
  valuationConditionRating?: number | null;
  valuationSpeciesRating?: number | null;
  valuationSiteRating?: number | null;
  valuationContributionRating?: number | null;
  valuationLocationRating?: number | null;
  valuationBasicValue?: number | null;
  valuationAppraisedValue?: number | null;
  valuationNotes?: string | null;
}

interface TreeSidePanelProps {
  tree: TreeRecord | null;
  treeNumber: number;
  totalTrees?: number;
  propertyId: string;
  propertyCity: string;
  reportType?: string;
  onSave: (data: TreeFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
  lastSavedTree?: TreeRecord | null;
  recentSpecies?: { common: string; scientific: string }[];
  quickAddMode?: boolean;
  // Arborist customization
  arboristHealthObs?: Observation[];
  arboristStructuralObs?: Observation[];
  arboristRecommendationMap?: Record<string, string>;
  arboristCommonSpecies?: string[];
  arboristDefaultUnitPrice?: number;
}


// ---------------------------------------------------------------------------
// Quick Photo types
// ---------------------------------------------------------------------------

interface QuickPhoto {
  id: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSidePanel({
  tree,
  treeNumber,
  totalTrees,
  propertyId,
  propertyCity,
  reportType,
  onSave,
  onDelete,
  onClose,
  saving = false,
  lastSavedTree,
  recentSpecies = [],
  quickAddMode = false,
  arboristHealthObs,
  arboristStructuralObs,
  arboristRecommendationMap,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  arboristCommonSpecies,
  arboristDefaultUnitPrice,
}: TreeSidePanelProps) {
  const { toast } = useToast();

  // ---- Computed observation arrays (arborist customization or fallback) ----
  const effectiveHealthObs = arboristHealthObs
    ? arboristHealthObs.filter((o) => o.enabled).map((o) => o.label)
    : HEALTH_OBSERVATIONS;
  const effectiveStructuralObs = arboristStructuralObs
    ? arboristStructuralObs.filter((o) => o.enabled).map((o) => o.label)
    : STRUCTURAL_OBSERVATIONS;

  // Full observation arrays for canonical lookup (includes disabled)
  const allHealthObs = arboristHealthObs || getDefaultHealthObservations();
  const allStructuralObs = arboristStructuralObs || getDefaultStructuralObservations();

  // ---- Form state ----
  const [tagNumber, setTagNumber] = useState(tree?.tagNumber ?? "");
  const [speciesCommon, setSpeciesCommon] = useState(tree?.speciesCommon ?? "");
  const [speciesScientific, setSpeciesScientific] = useState(
    tree?.speciesScientific ?? ""
  );
  const [dbhInches, setDbhInches] = useState<string>(
    tree?.dbhInches != null ? String(tree.dbhInches) : ""
  );
  const [heightFt, setHeightFt] = useState<string>(
    tree?.heightFt != null ? String(tree.heightFt) : ""
  );
  const [canopySpreadFt, setCanopySpreadFt] = useState<string>(
    tree?.canopySpreadFt != null ? String(tree.canopySpreadFt) : ""
  );
  const [conditionRating, setConditionRating] = useState<number>(
    tree?.conditionRating ?? 0
  );
  const [healthNotes, setHealthNotes] = useState(tree?.healthNotes ?? "");
  const [structuralNotes, setStructuralNotes] = useState(
    tree?.structuralNotes ?? ""
  );
  const [healthChecks, setHealthChecks] = useState<string[]>(() =>
    parseObservedLine(tree?.healthNotes ?? "")
  );
  const [structuralChecks, setStructuralChecks] = useState<string[]>(() =>
    parseObservedLine(tree?.structuralNotes ?? "")
  );
  const [recommendedAction, setRecommendedAction] = useState(
    tree?.recommendedAction ?? ""
  );

  // ---- Multi-trunk DBH calculator ----
  const [showMultiTrunk, setShowMultiTrunk] = useState(false);
  const [trunkDiameters, setTrunkDiameters] = useState<string[]>(["", ""]);

  // ---- Type-specific data state ----
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [typeData, setTypeData] = useState<any>(() => {
    if (tree?.typeSpecificData) {
      try {
        return JSON.parse(tree.typeSpecificData);
      } catch {
        return {};
      }
    }
    return {};
  });

  // ---- CTLA Valuation state (only used when reportType === "tree_valuation") ----
  const [valuationData, setValuationData] = useState<ValuationFieldValues>(() => ({
    valuationUnitPrice: tree?.valuationUnitPrice ?? null,
    valuationHealthRating: tree?.valuationHealthRating ?? null,
    valuationStructureRating: tree?.valuationStructureRating ?? null,
    valuationFormRating: tree?.valuationFormRating ?? null,
    valuationConditionRating: tree?.valuationConditionRating ?? null,
    valuationSpeciesRating: tree?.valuationSpeciesRating ?? null,
    valuationSiteRating: tree?.valuationSiteRating ?? null,
    valuationContributionRating: tree?.valuationContributionRating ?? null,
    valuationLocationRating: tree?.valuationLocationRating ?? null,
    valuationBasicValue: tree?.valuationBasicValue ?? null,
    valuationAppraisedValue: tree?.valuationAppraisedValue ?? null,
    valuationNotes: tree?.valuationNotes ?? null,
  }));

  // ---- Quick photos state ----
  const [photos, setPhotos] = useState<QuickPhoto[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Load photos when tree exists
  const isExisting = tree != null && tree.id != null;
  useEffect(() => {
    if (isExisting && tree?.id) {
      fetch(`/api/properties/${propertyId}/trees/${tree.id}/photos`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setPhotos(data.map((p: { id: string; url: string }) => ({ id: p.id, url: p.url }))))
        .catch(() => setPhotos([]));
    }
  }, [isExisting, tree?.id, propertyId]);

  // ---- Auto-derive conditionRating from CTLA sliders for valuation types ----
  const isValuationType = reportType === "tree_valuation" || reportType === "real_estate_package";
  useEffect(() => {
    if (!isValuationType) return;
    const ctla = valuationData.valuationConditionRating;
    if (ctla != null && ctla > 0) {
      const derived = ctlaConditionTo15Scale(ctla);
      setConditionRating(derived);
      // Also auto-select recommended action from arborist's map
      if (arboristRecommendationMap) {
        const action = arboristRecommendationMap[String(derived)];
        if (action) setRecommendedAction(action);
      }
    }
  }, [isValuationType, valuationData.valuationConditionRating, arboristRecommendationMap]);

  // ---- Protection check state ----
  const [protectionResult, setProtectionResult] =
    useState<ProtectionResult | null>(
      tree?.isProtected != null
        ? {
            isProtected: tree.isProtected,
            reason: tree.protectionReason ?? "",
            isHeritage: tree.isHeritage ?? false,
            heritageReason: tree.heritageReason ?? null,
            mitigationRequired: tree.mitigationRequired ?? null,
            codeReference: null,
          }
        : null
    );
  const [checkingProtection, setCheckingProtection] = useState(false);
  const [overrideProtection, setOverrideProtection] = useState(false);
  const [overrideIsProtected, setOverrideIsProtected] = useState(
    tree?.isProtected ?? false
  );
  const [overrideReason, setOverrideReason] = useState(
    tree?.protectionReason ?? ""
  );

  // ---- Auto-check ordinance debounce ----
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkProtection = useCallback(async () => {
    if (!speciesCommon || !dbhInches || !propertyCity) return;
    setCheckingProtection(true);
    try {
      const params = new URLSearchParams({
        city: propertyCity,
        species: speciesCommon,
        dbh: dbhInches,
      });
      const res = await fetch(`/api/ordinances/check?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to check protection");
      const data: ProtectionResult = await res.json();
      setProtectionResult(data);
    } catch {
      setProtectionResult(null);
      toast({
        title: "Ordinance check failed",
        description: "Could not check tree protection status. You can still save the tree.",
        variant: "destructive",
      });
    } finally {
      setCheckingProtection(false);
    }
  }, [speciesCommon, dbhInches, propertyCity, toast]);

  // Auto-trigger ordinance check when species + DBH both have values
  useEffect(() => {
    if (!speciesCommon || !dbhInches) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      checkProtection();
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [speciesCommon, dbhInches, checkProtection]);

  // ---- Floating dictation modal ----

  // ---- Auto-save draft ----
  const draftKey = `treecertify_draft_${propertyId}_${tree?.id || "new_" + treeNumber}`;
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const draftRef = useRef<Record<string, any> | null>(null);

  // Check for existing draft on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(draftKey);
      if (!stored) return;
      const draft = JSON.parse(stored);
      const hasContent =
        draft.speciesCommon || draft.dbhInches || draft.healthNotes || draft.structuralNotes;
      if (hasContent) {
        draftRef.current = draft;
        setDraftTimestamp(draft.timestamp);
        setShowDraftBanner(true);
      }
    } catch {
      /* ignore */
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          draftKey,
          JSON.stringify({
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
            typeData,
            overrideProtection,
            overrideIsProtected,
            overrideReason,
            timestamp: Date.now(),
          })
        );
        setDraftSavedAt(Date.now());
      } catch {
        /* localStorage full */
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [
    draftKey,
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
    typeData,
    overrideProtection,
    overrideIsProtected,
    overrideReason,
  ]);

  function restoreDraft() {
    const d = draftRef.current;
    if (!d) return;
    if (d.tagNumber !== undefined) setTagNumber(d.tagNumber);
    if (d.speciesCommon !== undefined) setSpeciesCommon(d.speciesCommon);
    if (d.speciesScientific !== undefined) setSpeciesScientific(d.speciesScientific);
    if (d.dbhInches !== undefined) setDbhInches(d.dbhInches);
    if (d.heightFt !== undefined) setHeightFt(d.heightFt);
    if (d.canopySpreadFt !== undefined) setCanopySpreadFt(d.canopySpreadFt);
    if (d.conditionRating !== undefined) setConditionRating(d.conditionRating);
    if (d.healthNotes !== undefined) setHealthNotes(d.healthNotes);
    if (d.structuralNotes !== undefined) setStructuralNotes(d.structuralNotes);
    if (d.recommendedAction !== undefined) setRecommendedAction(d.recommendedAction);
    if (d.typeData !== undefined) setTypeData(d.typeData);
    if (d.overrideProtection !== undefined) setOverrideProtection(d.overrideProtection);
    if (d.overrideIsProtected !== undefined) setOverrideIsProtected(d.overrideIsProtected);
    if (d.overrideReason !== undefined) setOverrideReason(d.overrideReason);
    setShowDraftBanner(false);
  }

  function dismissDraft() {
    setShowDraftBanner(false);
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
  }

  // ---- Derived ----
  const statusDot =
    tree?.status === "certified"
      ? "bg-forest-light"
      : tree?.status === "assessed"
        ? "bg-blue-500"
        : "bg-neutral-400";

  const reportTypeConfig = reportType
    ? getReportTypeConfig(reportType)
    : undefined;

  // Is this a new tree (no id)?
  const isNewTree = !tree?.id;

  // ---- Handlers ----
  function handleSpeciesChange(common: string, scientific: string) {
    setSpeciesCommon(common);
    setSpeciesScientific(scientific);
    setProtectionResult(null);
  }

  function handleCopyFromLast() {
    if (!lastSavedTree) return;
    setSpeciesCommon(lastSavedTree.speciesCommon ?? "");
    setSpeciesScientific(lastSavedTree.speciesScientific ?? "");
    setDbhInches(lastSavedTree.dbhInches != null ? String(lastSavedTree.dbhInches) : "");
    setHeightFt(lastSavedTree.heightFt != null ? String(lastSavedTree.heightFt) : "");
    setCanopySpreadFt(lastSavedTree.canopySpreadFt != null ? String(lastSavedTree.canopySpreadFt) : "");
    setConditionRating(lastSavedTree.conditionRating ?? 0);
    setRecommendedAction(lastSavedTree.recommendedAction ?? "");
    // Don't copy: healthNotes, structuralNotes, photos, pin location
  }

  function handleSave() {
    const useOverride = overrideProtection;
    onSave({
      speciesCommon,
      speciesScientific,
      dbhInches: Number(dbhInches) || 0,
      heightFt: heightFt ? Number(heightFt) : null,
      canopySpreadFt: canopySpreadFt ? Number(canopySpreadFt) : null,
      conditionRating,
      healthNotes,
      structuralNotes,
      healthObservationCanonical: healthChecks
        .filter((c) => c !== "No significant concerns")
        .map((c) => labelToCanonical(c, allHealthObs))
        .join(", ") || (healthChecks.includes("No significant concerns") ? "no_significant_concerns" : undefined),
      structuralObservationCanonical: structuralChecks
        .filter((c) => c !== "No significant concerns")
        .map((c) => labelToCanonical(c, allStructuralObs))
        .join(", ") || (structuralChecks.includes("No significant concerns") ? "no_significant_concerns" : undefined),
      recommendedAction,
      isProtected: useOverride
        ? overrideIsProtected
        : (protectionResult?.isProtected ?? false),
      protectionReason: useOverride
        ? overrideReason || null
        : (protectionResult?.reason ?? null),
      mitigationRequired: useOverride
        ? null
        : (protectionResult?.mitigationRequired ?? null),
      tagNumber,
      typeSpecificData:
        reportType && reportType !== "tree_valuation" && reportType !== "real_estate_package" && Object.keys(typeData).length > 0
          ? JSON.stringify(typeData)
          : undefined,
      // CTLA Valuation fields (sent for tree_valuation and real_estate_package)
      ...((reportType === "tree_valuation" || reportType === "real_estate_package") ? {
        valuationUnitPrice: valuationData.valuationUnitPrice,
        valuationHealthRating: valuationData.valuationHealthRating,
        valuationStructureRating: valuationData.valuationStructureRating,
        valuationFormRating: valuationData.valuationFormRating,
        valuationConditionRating: valuationData.valuationConditionRating,
        valuationSpeciesRating: valuationData.valuationSpeciesRating,
        valuationSiteRating: valuationData.valuationSiteRating,
        valuationContributionRating: valuationData.valuationContributionRating,
        valuationLocationRating: valuationData.valuationLocationRating,
        valuationBasicValue: valuationData.valuationBasicValue,
        valuationAppraisedValue: valuationData.valuationAppraisedValue,
        valuationNotes: valuationData.valuationNotes,
      } : {}),
    });
    // Clear draft after save (data is either sent to server or queued for offline sync)
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
    setDraftSavedAt(null);
  }

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tree?.id) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `/api/properties/${propertyId}/trees/${tree.id}/photos`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const photo = await res.json();
        setPhotos((prev) => [...prev, { id: photo.id, url: photo.url }]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
      toast({
        title: "Photo upload failed",
        description: "Could not upload photo. Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingPhoto(false);
    }

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  // ---- Render ----
  return (
    <div className={cn(
      "flex flex-col bg-background",
      // Mobile: bottom sheet overlay
      "fixed inset-x-0 bottom-0 z-50",
      "max-h-[75vh] rounded-t-2xl shadow-2xl",
      // Desktop: right side panel
      "md:relative md:inset-auto md:z-auto",
      "md:h-full md:w-96 md:max-h-none md:rounded-none md:shadow-none md:border-l"
    )}>
      {/* Mobile drag handle */}
      <div className="md:hidden mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-neutral-300" />
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
          <h2 className="text-lg font-semibold">Tree #<span className="font-mono">{treeNumber}</span></h2>
          {quickAddMode && isNewTree && totalTrees != null && (
            <span className="text-xs text-muted-foreground">
              of {totalTrees + 1}
            </span>
          )}
          <Input
            placeholder="Tag #"
            value={tagNumber}
            onChange={(e) => setTagNumber(e.target.value)}
            className="h-7 w-20 text-xs font-mono"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Coordinates */}
      {tree?.pinLat != null && tree?.pinLng != null && (
        <div className="border-b px-4 py-2">
          <p className="text-xs text-muted-foreground font-mono">
            {tree.pinLat.toFixed(6)}, {tree.pinLng.toFixed(6)}
          </p>
        </div>
      )}

      {/* Draft restore banner */}
      {showDraftBanner && draftTimestamp && (
        <div className="mx-4 mt-2 rounded-lg border border-amber-300 bg-amber-50 p-3">
          <p className="text-xs text-amber-800 font-medium">
            Unsaved changes found from{" "}
            {formatDistanceToNow(new Date(draftTimestamp), { addSuffix: true })}
          </p>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={restoreDraft} className="text-xs h-7">
              Restore
            </Button>
            <Button size="sm" variant="ghost" onClick={dismissDraft} className="text-xs h-7">
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Tabbed content */}
      <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="photos" className="text-xs gap-1">
            <Camera className="h-3 w-3" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="audio" className="text-xs gap-1">
            <Mic className="h-3 w-3" />
            Audio
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="flex-1 overflow-y-auto px-4 py-4 space-y-5 mt-0">

        {/* Copy from last tree button */}
        {isNewTree && lastSavedTree && (
          <button
            onClick={handleCopyFromLast}
            className="w-full text-xs text-forest hover:text-forest hover:bg-forest/5 py-1.5 px-3 rounded border border-forest/20 border-dashed transition-colors flex items-center justify-center gap-1.5"
          >
            <Copy className="h-3 w-3" />
            Copy species &amp; size from Tree #{lastSavedTree.treeNumber}
          </button>
        )}

        {/* Quick Photos Section */}
        {isExisting && tree?.id && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Photos</Label>
              <span className="text-[10px] text-muted-foreground">
                {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Photo thumbnails row */}
            {photos.length > 0 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    className="w-12 h-12 rounded object-cover border flex-shrink-0"
                    alt=""
                  />
                ))}
              </div>
            )}

            {/* Camera capture button */}
            <label className="flex items-center justify-center gap-1.5 text-xs text-forest hover:text-forest hover:bg-forest/5 py-2 px-3 rounded border border-forest/20 border-dashed cursor-pointer transition-colors">
              {uploadingPhoto ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              <span>{uploadingPhoto ? "Uploading..." : "Take Photo"}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoCapture}
                disabled={uploadingPhoto}
              />
            </label>
          </div>
        )}

        {/* Species */}
        <div className="space-y-2">
          <Label>Species</Label>

          {/* Recent species chips */}
          {recentSpecies.length > 0 && !speciesCommon && (
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mt-0.5">
              {recentSpecies.map((sp) => (
                <button
                  key={sp.common}
                  type="button"
                  onClick={() => handleSpeciesChange(sp.common, sp.scientific)}
                  className="text-xs px-2.5 py-1 rounded-full bg-forest/5 text-forest hover:bg-forest/10 border border-forest/20 whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {sp.common}
                </button>
              ))}
            </div>
          )}

          <SpeciesSearch
            value={speciesCommon}
            onChange={handleSpeciesChange}
          />
          {speciesScientific && (
            <p className="text-xs text-muted-foreground italic">
              {speciesScientific}
            </p>
          )}
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="sp-dbh" className="text-xs">
              DBH (in)
            </Label>
            <Input
              id="sp-dbh"
              type="number"
              min="0"
              step="0.5"
              placeholder="0"
              value={dbhInches}
              onChange={(e) => {
                setDbhInches(e.target.value);
                setProtectionResult(null);
              }}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-height" className="text-xs">
              Height (ft)
            </Label>
            <Input
              id="sp-height"
              type="number"
              min="0"
              placeholder="0"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-canopy" className="text-xs">
              Canopy (ft)
            </Label>
            <Input
              id="sp-canopy"
              type="number"
              min="0"
              placeholder="0"
              value={canopySpreadFt}
              onChange={(e) => setCanopySpreadFt(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        {/* Multi-trunk DBH calculator */}
        {isValuationType && (
          <div>
            <button
              type="button"
              onClick={() => setShowMultiTrunk(!showMultiTrunk)}
              className="text-xs text-forest hover:text-forest-light font-medium flex items-center gap-1 transition-colors"
            >
              {showMultiTrunk ? "▾" : "▸"} Multi-trunk calculator
            </button>
            {showMultiTrunk && (
              <div className="mt-2 p-3 bg-neutral-50 rounded-md border space-y-2">
                <p className="text-[10px] text-muted-foreground">
                  Enter each trunk diameter. Equivalent DBH = √(d₁² + d₂² + … + dₙ²)
                </p>
                <div className="flex flex-wrap gap-2">
                  {trunkDiameters.map((d, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder={`T${i + 1}`}
                        value={d}
                        onChange={(e) => {
                          const next = [...trunkDiameters];
                          next[i] = e.target.value;
                          setTrunkDiameters(next);
                        }}
                        className="h-7 w-16 font-mono text-xs"
                      />
                      {trunkDiameters.length > 2 && (
                        <button
                          type="button"
                          onClick={() => setTrunkDiameters(trunkDiameters.filter((_, j) => j !== i))}
                          className="text-neutral-400 hover:text-red-500 text-xs"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setTrunkDiameters([...trunkDiameters, ""])}
                    className="h-7 px-2 text-xs text-forest hover:text-forest-light border border-dashed border-forest/30 rounded-md"
                  >
                    + Trunk
                  </button>
                </div>
                {trunkDiameters.some((d) => Number(d) > 0) && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Equivalent DBH:{" "}
                      <span className="font-mono font-semibold text-neutral-900">
                        {Math.round(
                          Math.sqrt(
                            trunkDiameters.reduce((sum, d) => sum + Math.pow(Number(d) || 0, 2), 0)
                          ) * 10
                        ) / 10}
                        &quot;
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const eq = Math.round(
                          Math.sqrt(
                            trunkDiameters.reduce((sum, d) => sum + Math.pow(Number(d) || 0, 2), 0)
                          ) * 10
                        ) / 10;
                        setDbhInches(String(eq));
                        setProtectionResult(null);
                        toast({ title: `DBH set to ${eq}"` });
                      }}
                      className="text-xs px-2 py-0.5 bg-forest text-white rounded font-medium hover:bg-forest-light transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Condition Rating — hidden for valuation types (derived from CTLA sliders) */}
        {!isValuationType && (
          <div className="space-y-2">
            <Label>Condition Rating</Label>
            <ConditionRating
              value={conditionRating}
              onChange={(rating) => {
                setConditionRating(rating);
                // Auto-select recommended action from arborist's map
                if (arboristRecommendationMap) {
                  const action = arboristRecommendationMap[String(rating)];
                  if (action) setRecommendedAction(action);
                }
              }}
              size="sm"
            />
          </div>
        )}

        {/* Health Observations + Notes */}
        <CollapsibleSection
          title="Health Observations"
          badge={healthChecks.filter(c => c !== "No significant concerns").length}
          defaultOpen={healthChecks.length > 0 && healthChecks[0] !== "No significant concerns"}
        >
          <div className="space-y-3">
            <MultiCheckbox
              options={effectiveHealthObs}
              selected={healthChecks}
              onChange={(selected) => {
                setHealthChecks(selected);
                setHealthNotes(
                  buildNotesWithObserved(selected, extractFreeText(healthNotes))
                );
              }}
              columns={2}
              exclusiveOption="No significant concerns"
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="sp-health" className="text-xs">
                  Additional Health Notes
                </Label>
                <VoiceInput
                  onTranscript={(text) => {
                    const existing = extractFreeText(healthNotes);
                    const combined = existing ? existing + " " + text : text;
                    setHealthNotes(
                      buildNotesWithObserved(healthChecks, combined)
                    );
                  }}
                />
              </div>
              <Textarea
                id="sp-health"
                placeholder="Additional observations not covered above..."
                value={extractFreeText(healthNotes)}
                onChange={(e) =>
                  setHealthNotes(
                    buildNotesWithObserved(healthChecks, e.target.value)
                  )
                }
                rows={2}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Structural Observations + Notes */}
        <CollapsibleSection
          title="Structural Observations"
          badge={structuralChecks.filter(c => c !== "No significant concerns").length}
          defaultOpen={structuralChecks.length > 0 && structuralChecks[0] !== "No significant concerns"}
        >
          <div className="space-y-3">
            <MultiCheckbox
              options={effectiveStructuralObs}
              selected={structuralChecks}
              onChange={(selected) => {
                setStructuralChecks(selected);
                setStructuralNotes(
                  buildNotesWithObserved(
                    selected,
                    extractFreeText(structuralNotes)
                  )
                );
              }}
              columns={2}
              exclusiveOption="No significant concerns"
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="sp-structural" className="text-xs">
                  Additional Structural Notes
                </Label>
                <VoiceInput
                  onTranscript={(text) => {
                    const existing = extractFreeText(structuralNotes);
                    const combined = existing ? existing + " " + text : text;
                    setStructuralNotes(
                      buildNotesWithObserved(structuralChecks, combined)
                    );
                  }}
                />
              </div>
              <Textarea
                id="sp-structural"
                placeholder="Additional structural observations not covered above..."
                value={extractFreeText(structuralNotes)}
                onChange={(e) =>
                  setStructuralNotes(
                    buildNotesWithObserved(structuralChecks, e.target.value)
                  )
                }
                rows={2}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Recommended Action — Pill Buttons */}
        <div className="space-y-1.5">
          <Label className="text-xs">Recommended Action</Label>
          <ButtonSelector
            options={ACTION_OPTIONS}
            value={recommendedAction}
            onChange={setRecommendedAction}
            size="sm"
          />
        </div>

        {/* Protection Status — Auto-check */}
        <div className="space-y-2">
          <Label className="text-xs">Protection Status</Label>

          {/* Loading state */}
          {checkingProtection && (
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking ordinance...</span>
            </div>
          )}

          {/* No data yet — prompt */}
          {!checkingProtection && !protectionResult && (!speciesCommon || !dbhInches) && (
            <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              Enter species and DBH to auto-check protection status.
            </div>
          )}

          {/* Result card */}
          {!checkingProtection && protectionResult && (
            <div
              className={`rounded-lg border-2 p-3 text-sm ${
                protectionResult.isProtected
                  ? "border-forest-light bg-forest/5"
                  : "border-neutral-300 bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {protectionResult.isProtected ? (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-forest" />
                ) : (
                  <ShieldX className="h-5 w-5 shrink-0 text-neutral-400" />
                )}
                <span
                  className={`font-semibold ${
                    protectionResult.isProtected
                      ? "text-forest"
                      : "text-neutral-600"
                  }`}
                >
                  {protectionResult.isProtected ? "Protected" : "Not Protected"}
                </span>
                {protectionResult.isHeritage && (
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                    Heritage
                  </Badge>
                )}
              </div>
              <p
                className={`mt-1.5 text-xs ${
                  protectionResult.isProtected
                    ? "text-forest"
                    : "text-neutral-500"
                }`}
              >
                {protectionResult.reason ||
                  `No specific protection under ${propertyCity} ordinance`}
              </p>
              {protectionResult.mitigationRequired && (
                <div className="mt-2 rounded border bg-muted/50 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Mitigation Required
                  </p>
                  <p className="mt-0.5 text-xs">
                    {protectionResult.mitigationRequired}
                  </p>
                </div>
              )}

              {/* Ordinance details popover */}
              {protectionResult.ordinanceContext && (
                <div className="mt-2 flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Info className="h-3 w-3" />
                        View ordinance details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-72 p-3 space-y-2 text-xs"
                    >
                      <p className="font-semibold text-sm">
                        {propertyCity} Tree Ordinance
                      </p>
                      {protectionResult.codeReference && (
                        <p className="text-muted-foreground">
                          {protectionResult.codeReference}
                        </p>
                      )}
                      <div className="space-y-1.5 pt-1">
                        {protectionResult.ordinanceContext.nativeThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Native threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.nativeThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.nonnativeThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Non-native threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.nonnativeThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.heritageThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Heritage threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.heritageThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.replantingRatio && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Replanting ratio</span>
                            <span className="font-medium">
                              {protectionResult.ordinanceContext.replantingRatio}
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.inLieuFee && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">In-lieu fee</span>
                            <span className="font-medium">
                              {protectionResult.ordinanceContext.inLieuFee}
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.certifierRequirement && (
                          <div className="pt-1 border-t">
                            <span className="text-muted-foreground">Certifier: </span>
                            <span>{protectionResult.ordinanceContext.certifierRequirement}</span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.permitProcessNotes && (
                          <div className="pt-1 border-t">
                            <span className="text-muted-foreground">Permit process: </span>
                            <span>{protectionResult.ordinanceContext.permitProcessNotes}</span>
                          </div>
                        )}
                      </div>
                      {protectionResult.ordinanceContext.ordinanceUrl && (
                        <a
                          href={protectionResult.ordinanceContext.ordinanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 pt-1 border-t"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View full ordinance
                        </a>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          )}

          {/* Permit Requirements — shown when tree is protected and ordinance has permit process notes */}
          {!checkingProtection &&
            protectionResult?.isProtected &&
            protectionResult.ordinanceContext?.permitProcessNotes && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700">
                    Permit Requirements
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {protectionResult.ordinanceContext.permitProcessNotes}
                </p>
                {protectionResult.ordinanceContext.ordinanceUrl && (
                  <a
                    href={protectionResult.ordinanceContext.ordinanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Ordinance
                  </a>
                )}
              </div>
            )}

          {/* Arborist Override */}
          <button
            type="button"
            onClick={() => setOverrideProtection((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3 w-3" />
            {overrideProtection ? "Cancel override" : "Override protection status"}
          </button>

          {overrideProtection && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">
                  Manual Override
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={overrideIsProtected}
                  onChange={(e) => setOverrideIsProtected(e.target.checked)}
                  className="rounded border-input h-3.5 w-3.5"
                />
                Tree is protected
              </label>
              <Textarea
                placeholder="Reason for protection status..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                rows={2}
                className="text-xs"
              />
            </div>
          )}
        </div>

        {/* ============ Type-Specific Fields ============ */}
        {reportType && reportTypeConfig && (
          <div className="border-t pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {reportTypeConfig.label}
            </p>

            {reportType === "health_assessment" && (
              <HealthAssessmentFields
                data={typeData as HealthAssessmentData}
                onChange={setTypeData}
              />
            )}

            {reportType === "removal_permit" && (
              <RemovalPermitFields
                data={typeData as RemovalPermitData}
                onChange={setTypeData}
              />
            )}

            {(reportType === "tree_valuation" || reportType === "real_estate_package") && (
              <div className="space-y-3">
                {/* Copy from previous tree — only show for new trees when a previous tree exists */}
                {lastSavedTree && !tree?.id && (
                  lastSavedTree.valuationUnitPrice != null ||
                  lastSavedTree.valuationSiteRating != null ||
                  lastSavedTree.valuationContributionRating != null
                ) && (
                  <button
                    type="button"
                    onClick={() => {
                      setValuationData((prev) => ({
                        ...prev,
                        valuationUnitPrice: lastSavedTree.valuationUnitPrice ?? prev.valuationUnitPrice,
                        valuationSiteRating: lastSavedTree.valuationSiteRating ?? prev.valuationSiteRating,
                        valuationContributionRating: lastSavedTree.valuationContributionRating ?? prev.valuationContributionRating,
                      }));
                      toast({ title: "Copied valuation settings from previous tree" });
                    }}
                    className="flex items-center gap-1.5 text-xs text-forest hover:text-forest-light font-medium transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                    Copy unit price &amp; location ratings from Tree #{lastSavedTree.treeNumber}
                  </button>
                )}
                <TreeValuationFields
                  values={valuationData}
                  onChange={setValuationData}
                  dbhInches={Number(dbhInches) || 0}
                  speciesCommon={speciesCommon}
                  defaultUnitPrice={arboristDefaultUnitPrice}
                />
              </div>
            )}

            {reportType === "construction_encroachment" && (
              <ConstructionEncroachmentFields
                data={typeData as ConstructionEncroachmentData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
              />
            )}
          </div>
        )}

        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreePhotos
              propertyId={propertyId}
              treeId={tree.id}
              reportType={reportType}
              treeNumber={treeNumber}
              speciesCommon={speciesCommon}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Camera className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add photos.</p>
            </div>
          )}
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreeAudioNotes propertyId={propertyId} treeId={tree.id} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Mic className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add audio notes.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="border-t px-4 py-3 space-y-1.5">
        {draftSavedAt && (
          <p className="text-[10px] text-muted-foreground text-center">
            Draft saved {formatDistanceToNow(new Date(draftSavedAt), { addSuffix: true })}
          </p>
        )}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleSave}
          disabled={saving || !speciesCommon || !dbhInches}
          className="flex-1 bg-forest hover:bg-forest-light text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : quickAddMode && isNewTree ? (
            <>
              <Zap className="h-4 w-4" />
              Save &amp; Next
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          )}
        </Button>

        {isExisting && onDelete && (
          <Button
            variant="outline"
            onClick={onDelete}
            disabled={saving}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <Button variant="outline" onClick={onClose} disabled={saving}>
          Close
        </Button>
      </div>
      </div>
    </div>
  );
}
