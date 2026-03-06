"use client";

import { useEffect, useRef, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calculateTFT, formatCurrency, DEFAULT_UNIT_PRICE } from "@/lib/valuation";
import { getDefaultSpeciesRating } from "@/lib/species-ratings";

// ---------------------------------------------------------------------------
// The new valuation data stored on TreeRecord columns (NOT typeSpecificData)
// ---------------------------------------------------------------------------

export interface ValuationFieldValues {
  valuationUnitPrice: number | null;
  valuationHealthRating: number | null;
  valuationStructureRating: number | null;
  valuationFormRating: number | null;
  valuationConditionRating: number | null;
  valuationSpeciesRating: number | null;
  valuationSiteRating: number | null;
  valuationContributionRating: number | null;
  valuationLocationRating: number | null;
  valuationBasicValue: number | null;
  valuationAppraisedValue: number | null;
  valuationNotes: string | null;
}

interface TreeValuationFieldsProps {
  values: ValuationFieldValues;
  onChange: (values: ValuationFieldValues) => void;
  dbhInches: number;
  speciesCommon: string;
  defaultUnitPrice?: number; // from arborist settings
}

// Slider + number input combo
function RatingInput({
  id,
  label,
  value,
  onChange,
  tip,
}: {
  id: string;
  label: string;
  value: number | null;
  onChange: (v: number) => void;
  tip?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs">{label}</Label>
        <div className="flex items-center gap-1.5">
          <Input
            id={id}
            type="number"
            min="0"
            max="100"
            step="1"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : 0)}
            className="h-7 w-16 font-mono text-xs text-right"
          />
          <span className="text-xs text-muted-foreground">%</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value ?? 75}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 accent-forest cursor-pointer"
      />
      {tip && <p className="text-[10px] text-muted-foreground">{tip}</p>}
    </div>
  );
}

export function TreeValuationFields({
  values,
  onChange,
  dbhInches,
  speciesCommon,
  defaultUnitPrice,
}: TreeValuationFieldsProps) {
  const userOverrodeSpeciesRef = useRef(false);
  const initializedRef = useRef(false);

  // Compute effective unit price
  const unitPrice = values.valuationUnitPrice ?? defaultUnitPrice ?? DEFAULT_UNIT_PRICE;

  // Auto-populate species rating when species changes (unless user has overridden)
  useEffect(() => {
    if (!speciesCommon || userOverrodeSpeciesRef.current) return;
    const rating = getDefaultSpeciesRating(speciesCommon);
    if (rating !== values.valuationSpeciesRating) {
      onChange({ ...values, valuationSpeciesRating: rating });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciesCommon]);

  // Initialize default ratings on first mount if not set
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const updates: Partial<ValuationFieldValues> = {};
    if (values.valuationHealthRating == null) updates.valuationHealthRating = 75;
    if (values.valuationStructureRating == null) updates.valuationStructureRating = 75;
    if (values.valuationFormRating == null) updates.valuationFormRating = 75;
    if (values.valuationSpeciesRating == null && speciesCommon) {
      updates.valuationSpeciesRating = getDefaultSpeciesRating(speciesCommon);
    } else if (values.valuationSpeciesRating == null) {
      updates.valuationSpeciesRating = 60;
    }
    if (values.valuationSiteRating == null) updates.valuationSiteRating = 80;
    if (values.valuationContributionRating == null) updates.valuationContributionRating = 80;
    if (values.valuationUnitPrice == null && defaultUnitPrice) {
      updates.valuationUnitPrice = defaultUnitPrice;
    }

    if (Object.keys(updates).length > 0) {
      onChange({ ...values, ...updates });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live calculation
  const compute = useCallback(() => {
    const health = values.valuationHealthRating ?? 75;
    const structure = values.valuationStructureRating ?? 75;
    const form = values.valuationFormRating ?? 75;
    const species = values.valuationSpeciesRating ?? 60;
    const site = values.valuationSiteRating ?? 80;
    const contribution = values.valuationContributionRating ?? 80;

    if (dbhInches <= 0) return;

    const result = calculateTFT({
      dbhInches,
      unitPrice,
      healthRating: health,
      structureRating: structure,
      formRating: form,
      speciesRating: species,
      siteRating: site,
      contributionRating: contribution,
    });

    // Only update if values changed
    if (
      Math.abs((values.valuationConditionRating ?? 0) - result.conditionRating) > 0.05 ||
      Math.abs((values.valuationLocationRating ?? 0) - result.locationRating) > 0.05 ||
      Math.abs((values.valuationBasicValue ?? 0) - result.basicValue) > 0.05 ||
      Math.abs((values.valuationAppraisedValue ?? 0) - result.appraisedValue) > 0.5
    ) {
      onChange({
        ...values,
        valuationConditionRating: result.conditionRating,
        valuationLocationRating: result.locationRating,
        valuationBasicValue: result.basicValue,
        valuationAppraisedValue: result.appraisedValue,
      });
    }
  }, [
    dbhInches,
    unitPrice,
    values.valuationHealthRating,
    values.valuationStructureRating,
    values.valuationFormRating,
    values.valuationSpeciesRating,
    values.valuationSiteRating,
    values.valuationContributionRating,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    values.valuationConditionRating,
    values.valuationLocationRating,
    values.valuationBasicValue,
    values.valuationAppraisedValue,
    onChange,
    values,
  ]);

  useEffect(() => {
    compute();
  }, [compute]);

  function update(partial: Partial<ValuationFieldValues>) {
    onChange({ ...values, ...partial });
  }

  const trunkArea = dbhInches > 0 ? Math.PI * Math.pow(dbhInches / 2, 2) : 0;
  const conditionPct = values.valuationConditionRating ?? 0;
  const locationPct = values.valuationLocationRating ?? 0;
  const speciesPct = values.valuationSpeciesRating ?? 60;
  const basicVal = values.valuationBasicValue ?? 0;
  const appraisedVal = values.valuationAppraisedValue ?? 0;

  const defaultSpeciesRating = speciesCommon ? getDefaultSpeciesRating(speciesCommon) : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          CTLA Valuation (10th Ed.)
        </span>
      </div>

      {/* Unit Price */}
      <div className="space-y-1.5">
        <Label htmlFor="val-unit-price" className="text-xs">
          Unit Price ($ per sq in)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
          <Input
            id="val-unit-price"
            type="number"
            min="0"
            step="1"
            placeholder={String(defaultUnitPrice ?? DEFAULT_UNIT_PRICE)}
            value={values.valuationUnitPrice ?? ""}
            onChange={(e) =>
              update({ valuationUnitPrice: e.target.value ? Number(e.target.value) : null })
            }
            className="pl-7 font-mono h-8 text-sm"
          />
        </div>
        <p className="text-[10px] text-muted-foreground">
          Based on wholesale nursery cost of largest available replacement.
        </p>
      </div>

      {/* Condition Rating — 3 components */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-600">
            Condition Rating
          </span>
          <span className="font-mono text-xs font-semibold text-forest">
            Combined: {conditionPct.toFixed(1)}%
          </span>
        </div>
        <div className="space-y-3 rounded-md border border-neutral-200 p-3">
          <RatingInput
            id="val-health"
            label="Health"
            value={values.valuationHealthRating}
            onChange={(v) => update({ valuationHealthRating: v })}
            tip="Crown density, leaf color, growth rate, pest/disease"
          />
          <RatingInput
            id="val-structure"
            label="Structure"
            value={values.valuationStructureRating}
            onChange={(v) => update({ valuationStructureRating: v })}
            tip="Branch attachments, trunk integrity, root plate, crown form"
          />
          <RatingInput
            id="val-form"
            label="Form"
            value={values.valuationFormRating}
            onChange={(v) => update({ valuationFormRating: v })}
            tip="Symmetry, natural shape, pruning history, aesthetics"
          />
          <p className="text-[10px] text-muted-foreground italic">
            Geometric mean per CTLA 10th Edition
          </p>
        </div>
      </div>

      {/* Species Rating */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="val-species" className="text-xs">Species Rating</Label>
          <div className="flex items-center gap-1.5">
            <Input
              id="val-species"
              type="number"
              min="0"
              max="100"
              step="5"
              value={values.valuationSpeciesRating ?? ""}
              onChange={(e) => {
                userOverrodeSpeciesRef.current = true;
                update({ valuationSpeciesRating: e.target.value ? Number(e.target.value) : null });
              }}
              className="h-7 w-16 font-mono text-xs text-right"
            />
            <span className="text-xs text-muted-foreground">%</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={values.valuationSpeciesRating ?? 60}
          onChange={(e) => {
            userOverrodeSpeciesRef.current = true;
            update({ valuationSpeciesRating: Number(e.target.value) });
          }}
          className="w-full h-1.5 accent-forest cursor-pointer"
        />
        {defaultSpeciesRating != null && (
          <p className="text-[10px] text-muted-foreground">
            Default: {defaultSpeciesRating}% for {speciesCommon}
          </p>
        )}
      </div>

      {/* Location Rating — 2 components */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-600">
            Location Rating
          </span>
          <span className="font-mono text-xs font-semibold text-forest">
            Combined: {locationPct.toFixed(1)}%
          </span>
        </div>
        <div className="space-y-3 rounded-md border border-neutral-200 p-3">
          <RatingInput
            id="val-site"
            label="Site Suitability"
            value={values.valuationSiteRating}
            onChange={(v) => update({ valuationSiteRating: v })}
            tip="Climate, soil, available growing space"
          />
          <RatingInput
            id="val-contribution"
            label="Contribution"
            value={values.valuationContributionRating}
            onChange={(v) => update({ valuationContributionRating: v })}
            tip="Prominence, function, visibility to street/property"
          />
        </div>
      </div>

      {/* Calculation Breakdown */}
      <div className="rounded-lg border border-forest/20 bg-forest/5 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-forest">
          Appraised Value
        </p>
        <div className="space-y-1 text-xs text-forest">
          <div className="flex justify-between">
            <span>Trunk Area</span>
            <span className="font-mono font-medium">{trunkArea.toFixed(1)} sq in</span>
          </div>
          <div className="flex justify-between">
            <span>× Unit Price</span>
            <span className="font-mono font-medium">${unitPrice.toFixed(2)}/sq in</span>
          </div>
          <div className="flex justify-between border-t border-forest/10 pt-1">
            <span>= Basic Value</span>
            <span className="font-mono font-medium">{formatCurrency(basicVal)}</span>
          </div>
          <div className="flex justify-between">
            <span>× Condition (H:{values.valuationHealthRating ?? 0}/S:{values.valuationStructureRating ?? 0}/F:{values.valuationFormRating ?? 0})</span>
            <span className="font-mono font-medium">{conditionPct.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>× Species</span>
            <span className="font-mono font-medium">{speciesPct}%</span>
          </div>
          <div className="flex justify-between">
            <span>× Location (Site:{values.valuationSiteRating ?? 0}/Cont:{values.valuationContributionRating ?? 0})</span>
            <span className="font-mono font-medium">{locationPct.toFixed(1)}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-forest/30 pt-2">
          <span className="text-sm font-bold text-forest">APPRAISED VALUE</span>
          <span className="font-mono text-xl font-bold text-forest">
            {formatCurrency(appraisedVal)}
          </span>
        </div>
      </div>

      {/* Valuation Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="val-notes" className="text-xs">Valuation Notes</Label>
        <Textarea
          id="val-notes"
          placeholder="Notes specific to this tree's valuation..."
          value={values.valuationNotes ?? ""}
          onChange={(e) => update({ valuationNotes: e.target.value || null })}
          rows={3}
          className="text-sm"
        />
      </div>
    </div>
  );
}
