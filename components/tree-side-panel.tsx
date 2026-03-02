"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { SpeciesSearch } from "@/components/species-search";
import { ConditionRating } from "@/components/condition-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreePhotos } from "@/components/tree-photos";
import { TreeAudioNotes } from "@/components/tree-audio-notes";
import { VoiceInput } from "@/components/voice-input";
import { SmartDictation } from "@/components/smart-dictation";
import { HealthAssessmentFields } from "@/components/type-fields/health-assessment-fields";
import { RemovalPermitFields } from "@/components/type-fields/removal-permit-fields";
import { TreeValuationFields } from "@/components/type-fields/tree-valuation-fields";
import { ConstructionEncroachmentFields } from "@/components/type-fields/construction-encroachment-fields";
import {
  getReportTypeConfig,
  type HealthAssessmentData,
  type RemovalPermitData,
  type TreeValuationData,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  tagNumber: string;
  typeSpecificData?: string; // JSON string
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
}

interface TreeSidePanelProps {
  tree: TreeRecord | null;
  treeNumber: number;
  propertyId: string;
  propertyCity: string;
  reportType?: string;
  onSave: (data: TreeFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
  lastSavedTree?: TreeRecord | null;
}

const ACTION_OPTIONS = [
  { value: "retain", label: "Retain", color: "green" },
  { value: "remove", label: "Remove", color: "red" },
  { value: "prune", label: "Prune", color: "amber" },
  { value: "monitor", label: "Monitor", color: "blue" },
];

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
  propertyId,
  propertyCity,
  reportType,
  onSave,
  onDelete,
  onClose,
  saving = false,
  lastSavedTree,
}: TreeSidePanelProps) {
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
  const [recommendedAction, setRecommendedAction] = useState(
    tree?.recommendedAction ?? ""
  );

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
    } finally {
      setCheckingProtection(false);
    }
  }, [speciesCommon, dbhInches, propertyCity]);

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

  // ---- Derived ----
  const statusDot =
    tree?.status === "certified"
      ? "bg-emerald-500"
      : tree?.status === "assessed"
        ? "bg-blue-500"
        : "bg-gray-400";

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
        reportType && Object.keys(typeData).length > 0
          ? JSON.stringify(typeData)
          : undefined,
    });
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
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
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
      <div className="md:hidden mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-gray-300" />
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
          <h2 className="text-lg font-semibold">Tree #{treeNumber}</h2>
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
            className="w-full text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 py-1.5 px-3 rounded border border-emerald-200 border-dashed transition-colors flex items-center justify-center gap-1.5"
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
            <label className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 py-2 px-3 rounded border border-emerald-200 border-dashed cursor-pointer transition-colors">
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

        {/* Smart Dictation — fill multiple fields from voice */}
        <SmartDictation
          onApply={(fields) => {
            if (fields.speciesCommon !== undefined) setSpeciesCommon(fields.speciesCommon);
            if (fields.speciesScientific !== undefined) setSpeciesScientific(fields.speciesScientific);
            if (fields.dbhInches !== undefined) setDbhInches(String(fields.dbhInches));
            if (fields.heightFt !== undefined) setHeightFt(String(fields.heightFt));
            if (fields.canopySpreadFt !== undefined) setCanopySpreadFt(String(fields.canopySpreadFt));
            if (fields.conditionRating !== undefined) setConditionRating(fields.conditionRating);
            if (fields.healthNotes !== undefined) {
              const existing = healthNotes || "";
              const separator = existing.trim() ? " " : "";
              setHealthNotes(existing + separator + fields.healthNotes);
            }
            if (fields.structuralNotes !== undefined) {
              const existing = structuralNotes || "";
              const separator = existing.trim() ? " " : "";
              setStructuralNotes(existing + separator + fields.structuralNotes);
            }
            if (fields.recommendedAction !== undefined) setRecommendedAction(fields.recommendedAction);
            if (fields.tagNumber !== undefined) setTagNumber(fields.tagNumber);
          }}
        />

        {/* Species */}
        <div className="space-y-2">
          <Label>Species</Label>
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

        {/* Condition Rating */}
        <div className="space-y-2">
          <Label>Condition Rating</Label>
          <ConditionRating
            value={conditionRating}
            onChange={setConditionRating}
            size="sm"
          />
        </div>

        {/* Notes with Voice Input */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="sp-health" className="text-xs">
                Health Notes
              </Label>
              <VoiceInput
                onTranscript={(text) => {
                  const existing = healthNotes || "";
                  const separator = existing.trim() ? " " : "";
                  setHealthNotes(existing + separator + text);
                }}
              />
            </div>
            <Textarea
              id="sp-health"
              placeholder="Describe observed health conditions..."
              value={healthNotes}
              onChange={(e) => setHealthNotes(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="sp-structural" className="text-xs">
                Structural Notes
              </Label>
              <VoiceInput
                onTranscript={(text) => {
                  const existing = structuralNotes || "";
                  const separator = existing.trim() ? " " : "";
                  setStructuralNotes(existing + separator + text);
                }}
              />
            </div>
            <Textarea
              id="sp-structural"
              placeholder="Describe structural defects or concerns..."
              value={structuralNotes}
              onChange={(e) => setStructuralNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

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
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-gray-300 bg-gray-50 dark:bg-gray-900/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {protectionResult.isProtected ? (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <ShieldX className="h-5 w-5 shrink-0 text-gray-400" />
                )}
                <span
                  className={`font-semibold ${
                    protectionResult.isProtected
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-400"
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
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-gray-500 dark:text-gray-400"
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
              <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    Permit Requirements
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
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
            <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
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

            {reportType === "tree_valuation" && (
              <TreeValuationFields
                data={typeData as TreeValuationData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
                conditionRating={conditionRating}
                speciesCommon={speciesCommon}
              />
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
            <TreePhotos propertyId={propertyId} treeId={tree.id} />
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
      <div className="flex items-center gap-2 border-t px-4 py-3">
        <Button
          onClick={handleSave}
          disabled={saving || !speciesCommon || !dbhInches}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
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
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <Button variant="outline" onClick={onClose} disabled={saving}>
          Close
        </Button>
      </div>
    </div>
  );
}
