"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { ButtonSelector } from "@/components/ui/button-selector";
import { SpeciesSearch } from "@/components/species-search";
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
import {
  X,
  Save,
  ShieldCheck,
  ShieldX,
  Loader2,
  Camera,
  Zap,
  Copy,
} from "lucide-react";

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

interface MobileFieldModeProps {
  tree: TreeRecord | null;
  treeNumber: number;
  propertyId: string;
  propertyCity: string;
  reportType?: string;
  onSave: (data: TreeFormData) => void;
  onSaveAndNext: (data: TreeFormData) => void;
  onClose: () => void;
  saving?: boolean;
  lastSavedTree?: TreeRecord | null;
  recentSpecies?: { common: string; scientific: string }[];
  // Arborist customization
  arboristHealthObs?: Observation[];
  arboristStructuralObs?: Observation[];
  arboristRecommendationMap?: Record<string, string>;
  arboristCommonSpecies?: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function haptic(ms: number = 10) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

const SECTIONS = ["species", "measurements", "condition", "observations", "action"] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MobileFieldMode({
  tree,
  treeNumber,
  propertyId,
  propertyCity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // ---- Form state ----
  const [tagNumber, setTagNumber] = useState(tree?.tagNumber ?? "");
  const [speciesCommon, setSpeciesCommon] = useState(tree?.speciesCommon ?? "");
  const [speciesScientific, setSpeciesScientific] = useState(
    tree?.speciesScientific ?? ""
  );
  const [dbhInches, setDbhInches] = useState(
    tree?.dbhInches ? String(tree.dbhInches) : ""
  );
  const [heightFt, setHeightFt] = useState(
    tree?.heightFt ? String(tree.heightFt) : ""
  );
  const [canopySpreadFt, setCanopySpreadFt] = useState(
    tree?.canopySpreadFt ? String(tree.canopySpreadFt) : ""
  );
  const [conditionRating, setConditionRating] = useState(
    tree?.conditionRating ?? 0
  );
  const [healthNotes, setHealthNotes] = useState(tree?.healthNotes ?? "");
  const [structuralNotes, setStructuralNotes] = useState(
    tree?.structuralNotes ?? ""
  );
  const [healthChecks, setHealthChecks] = useState<string[]>(
    parseObservedLine(tree?.healthNotes ?? "")
  );
  const [structuralChecks, setStructuralChecks] = useState<string[]>(
    parseObservedLine(tree?.structuralNotes ?? "")
  );
  const [recommendedAction, setRecommendedAction] = useState(
    tree?.recommendedAction ?? "retain"
  );

  // ---- Protection ----
  const [protectionResult, setProtectionResult] =
    useState<ProtectionResult | null>(null);
  const [checkingProtection, setCheckingProtection] = useState(false);

  // ---- Photos (simplified for field mode) ----
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // ---- Section tracking ----
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ---- IntersectionObserver for progress dots ----
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = activeSection;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const idx = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx >= 0) {
              bestIdx = idx;
              bestRatio = entry.intersectionRatio;
            }
          }
        });
        setActiveSection(bestIdx);
      },
      { root: container, threshold: [0.3, 0.5, 0.7] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Fetch photos for existing trees ----
  useEffect(() => {
    if (!tree?.id) return;
    (async () => {
      try {
        const res = await fetch(
          `/api/properties/${propertyId}/trees/${tree.id}/photos`
        );
        if (res.ok) {
          const data = await res.json();
          setPhotos(
            (data ?? []).map((p: { id: string; url: string }) => ({
              id: p.id,
              url: p.url,
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
  const draftKey = `treecertify_draft_${propertyId}_${
    tree?.id || "new_" + treeNumber
  }`;

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
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore
      }
    }, 30000);
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
  ]);

  // ---- Handlers ----

  const handleSpeciesChange = useCallback(
    (common: string, scientific: string) => {
      setSpeciesCommon(common);
      setSpeciesScientific(scientific);
      setProtectionResult(null);
    },
    []
  );

  const handleCopyFromLast = useCallback(() => {
    if (!lastSavedTree) return;
    setSpeciesCommon(lastSavedTree.speciesCommon ?? "");
    setSpeciesScientific(lastSavedTree.speciesScientific ?? "");
    setDbhInches(
      lastSavedTree.dbhInches ? String(lastSavedTree.dbhInches) : ""
    );
    setHeightFt(lastSavedTree.heightFt ? String(lastSavedTree.heightFt) : "");
    setCanopySpreadFt(
      lastSavedTree.canopySpreadFt
        ? String(lastSavedTree.canopySpreadFt)
        : ""
    );
    setProtectionResult(null);
  }, [lastSavedTree]);

  const handleConditionSelect = useCallback(
    (rating: number) => {
      setConditionRating(rating);
      haptic(10);
      // Auto-select recommended action from arborist's map
      if (arboristRecommendationMap) {
        const action = arboristRecommendationMap[String(rating)];
        if (action) setRecommendedAction(action);
      }
      // Auto-scroll to observations section
      setTimeout(() => {
        sectionRefs.current[3]?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    },
    [arboristRecommendationMap]
  );

  const buildFormData = useCallback((): TreeFormData => {
    return {
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
      isProtected: protectionResult?.isProtected ?? false,
      protectionReason: protectionResult?.reason ?? null,
      mitigationRequired: protectionResult?.mitigationRequired ?? null,
      tagNumber,
    };
  }, [
    speciesCommon,
    speciesScientific,
    dbhInches,
    heightFt,
    canopySpreadFt,
    conditionRating,
    healthNotes,
    structuralNotes,
    healthChecks,
    structuralChecks,
    allHealthObs,
    allStructuralObs,
    recommendedAction,
    protectionResult,
    tagNumber,
  ]);

  const handleSaveAndClose = useCallback(() => {
    onSave(buildFormData());
    haptic(20);
    // Clear draft
    try {
      localStorage.removeItem(draftKey);
    } catch {
      // Ignore
    }
  }, [onSave, buildFormData, draftKey]);

  const handleSaveAndNext = useCallback(() => {
    onSaveAndNext(buildFormData());
    haptic(20);
    // Clear draft
    try {
      localStorage.removeItem(draftKey);
    } catch {
      // Ignore
    }
  }, [onSaveAndNext, buildFormData, draftKey]);

  const handlePhotoCapture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !tree?.id) return;

    setUploadingPhoto(true);
    haptic(10);
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
    e.target.value = "";
  };

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  const canSave = !!speciesCommon.trim() && !!dbhInches;

  // ---- Render ----
  return (
    <div className="fixed inset-0 z-40 bg-background flex flex-col">
      {/* ---- Fixed Header ---- */}
      <div
        className="shrink-0 bg-background border-b px-4 py-3 z-50"
        style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 12px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <h2 className="text-lg font-semibold font-display">
              Tree{" "}
              <span className="font-mono">#{treeNumber}</span>
            </h2>
            {speciesCommon && (
              <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                {speciesCommon}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Progress dots */}
            <div className="flex gap-1.5">
              {SECTIONS.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => scrollToSection(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === activeSection ? "bg-forest" : "bg-neutral-300"
                  }`}
                  style={{ minWidth: 10, minHeight: 10 }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 rounded-lg hover:bg-neutral-100"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ---- Scrollable Content ---- */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 pb-4 space-y-8"
        style={{ paddingTop: 16 }}
      >
        {/* ======= SECTION 1: SPECIES ======= */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} className="space-y-3">
          <Label className="text-sm font-semibold font-display">
            Species
          </Label>

          {/* Copy from last tree */}
          {isNewTree && lastSavedTree?.speciesCommon && (
            <button
              type="button"
              onClick={handleCopyFromLast}
              className="w-full h-12 rounded-lg border-2 border-dashed border-neutral-300 text-sm text-muted-foreground hover:border-forest hover:text-forest transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy from Tree #{lastSavedTree.treeNumber} (
              {lastSavedTree.speciesCommon})
            </button>
          )}

          {/* Recent species chips */}
          {recentSpecies.length > 0 && !speciesCommon && (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {recentSpecies.map((sp) => (
                <button
                  key={sp.common}
                  type="button"
                  onClick={() =>
                    handleSpeciesChange(sp.common, sp.scientific)
                  }
                  className="shrink-0 px-4 py-2.5 rounded-full border-2 border-forest/20 bg-forest/5 text-sm font-medium text-forest hover:bg-forest/10 transition-colors"
                  style={{ minHeight: 44 }}
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
            <p className="text-sm text-muted-foreground italic pl-1">
              {speciesScientific}
            </p>
          )}

          {/* Tag number */}
          <div className="flex items-center gap-2">
            <Label htmlFor="fm-tag" className="text-xs shrink-0">
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
        </div>

        {/* ======= SECTION 2: MEASUREMENTS ======= */}
        <div ref={(el) => { sectionRefs.current[1] = el; }} className="space-y-3">
          <Label className="text-sm font-semibold font-display">
            Measurements
          </Label>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                DBH (in)
              </Label>
              <Input
                inputMode="decimal"
                placeholder="0"
                value={dbhInches}
                onChange={(e) => {
                  setDbhInches(e.target.value);
                  setProtectionResult(null);
                }}
                className="h-14 text-xl font-mono text-center"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Height (ft)
              </Label>
              <Input
                inputMode="decimal"
                placeholder="—"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="h-14 text-xl font-mono text-center"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Canopy (ft)
              </Label>
              <Input
                inputMode="decimal"
                placeholder="—"
                value={canopySpreadFt}
                onChange={(e) => setCanopySpreadFt(e.target.value)}
                className="h-14 text-xl font-mono text-center"
              />
            </div>
          </div>

          {/* Ordinance protection banner */}
          {checkingProtection && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Checking ordinance...
            </div>
          )}
          {protectionResult && !checkingProtection && (
            <div
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 ${
                protectionResult.isProtected
                  ? "border-amber-300 bg-amber-50"
                  : "border-neutral-200 bg-neutral-50"
              }`}
            >
              {protectionResult.isProtected ? (
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <ShieldX className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                {protectionResult.isProtected ? (
                  <>
                    <span className="font-semibold text-amber-800">
                      Protected
                    </span>
                    {protectionResult.codeReference && (
                      <span className="text-amber-700">
                        {" "}
                        — {protectionResult.codeReference}
                      </span>
                    )}
                    {protectionResult.isHeritage && (
                      <Badge className="ml-1.5 bg-amber-500 text-white text-[10px] px-1.5 py-0">
                        Heritage
                      </Badge>
                    )}
                    {protectionResult.mitigationRequired && (
                      <p className="text-amber-700 mt-0.5">
                        {protectionResult.mitigationRequired}
                      </p>
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

        {/* ======= SECTION 3: CONDITION ======= */}
        <div ref={(el) => { sectionRefs.current[2] = el; }} className="space-y-3">
          <Label className="text-sm font-semibold font-display">
            Condition
          </Label>

          <div className="grid grid-cols-3 gap-2">
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
                  style={{ height: 64, minHeight: 64 }}
                >
                  <span className="text-xl font-bold">{rating}</span>
                  <span className="text-[10px] font-medium leading-tight">
                    {CONDITION_LABELS[rating]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======= SECTION 4: OBSERVATIONS ======= */}
        <div ref={(el) => { sectionRefs.current[3] = el; }} className="space-y-5">
          <Label className="text-sm font-semibold font-display">
            Observations
          </Label>

          {/* Health observations */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Health</Label>
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
            <MultiCheckbox
              options={effectiveHealthObs}
              selected={healthChecks}
              onChange={(selected) => {
                setHealthChecks(selected);
                setHealthNotes(
                  buildNotesWithObserved(
                    selected,
                    extractFreeText(healthNotes)
                  )
                );
              }}
              columns={1}
              exclusiveOption="No significant concerns"
            />
            {(extractFreeText(healthNotes) || healthChecks.length > 0) && (
              <Textarea
                placeholder="Additional health notes..."
                value={extractFreeText(healthNotes)}
                onChange={(e) =>
                  setHealthNotes(
                    buildNotesWithObserved(healthChecks, e.target.value)
                  )
                }
                rows={2}
                className="text-base"
              />
            )}
          </div>

          {/* Structural observations */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Structural</Label>
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
              columns={1}
              exclusiveOption="No significant concerns"
            />
            {(extractFreeText(structuralNotes) ||
              structuralChecks.length > 0) && (
              <Textarea
                placeholder="Additional structural notes..."
                value={extractFreeText(structuralNotes)}
                onChange={(e) =>
                  setStructuralNotes(
                    buildNotesWithObserved(structuralChecks, e.target.value)
                  )
                }
                rows={2}
                className="text-base"
              />
            )}
          </div>
        </div>

        {/* ======= SECTION 5: ACTION & PHOTOS ======= */}
        <div ref={(el) => { sectionRefs.current[4] = el; }} className="space-y-4">
          <Label className="text-sm font-semibold font-display">
            Action & Photos
          </Label>

          {/* Recommended action */}
          <ButtonSelector
            options={ACTION_OPTIONS}
            value={recommendedAction}
            onChange={setRecommendedAction}
          />

          {/* Camera + photo thumbnails (existing trees only) */}
          {!isNewTree && tree?.id && (
            <div className="space-y-2.5">
              {photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {photos.map((p) => (
                    <img
                      key={p.id}
                      src={p.url}
                      className="w-14 h-14 rounded-lg object-cover border shrink-0"
                      alt=""
                    />
                  ))}
                </div>
              )}
              <label className="flex items-center justify-center gap-2 h-14 rounded-lg border-2 border-dashed border-forest/30 text-forest cursor-pointer hover:bg-forest/5 transition-colors">
                {uploadingPhoto ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">
                  {uploadingPhoto ? "Uploading..." : "Take Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  disabled={uploadingPhoto}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {isNewTree && (
            <p className="text-xs text-muted-foreground italic">
              Save the tree first to add photos.
            </p>
          )}
        </div>

        {/* Bottom spacer for fixed bar */}
        <div className="h-4" />
      </div>

      {/* ---- Fixed Bottom Bar ---- */}
      <div
        className="shrink-0 bg-background border-t px-4 py-3 z-50"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
        }}
      >
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleSaveAndNext}
            disabled={saving || !canSave}
            className="flex-1 h-12 bg-forest hover:bg-forest-light text-white text-base gap-2"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Zap className="h-5 w-5" />
            )}
            Save & Next Tree
          </Button>
          <Button
            type="button"
            onClick={handleSaveAndClose}
            disabled={saving || !canSave}
            variant="outline"
            className="h-12 px-4"
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
