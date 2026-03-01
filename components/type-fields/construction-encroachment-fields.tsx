"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTpzRadius,
  calcSrzRadius,
  PROTECTION_MEASURES,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";

interface ConstructionEncroachmentFieldsProps {
  data: ConstructionEncroachmentData;
  onChange: (data: ConstructionEncroachmentData) => void;
  dbhInches: number;
}

const IMPACT_OPTIONS = [
  { value: "none", label: "None", color: "gray" },
  { value: "minor", label: "Minor", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

const MONITORING_OPTIONS = [
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Bi-annually",
];

export function ConstructionEncroachmentFields({
  data,
  onChange,
  dbhInches,
}: ConstructionEncroachmentFieldsProps) {
  const [overrideEnabled, setOverrideEnabled] = useState(
    data.tpzOverride ?? false
  );

  // Auto-calculate TPZ/SRZ when DBH changes
  useEffect(() => {
    if (dbhInches <= 0) return;
    const tpzRadius = calcTpzRadius(dbhInches);
    const srzRadius = calcSrzRadius(dbhInches);

    if (
      Math.abs((data.tpzRadius ?? 0) - tpzRadius) > 0.01 ||
      Math.abs((data.srzRadius ?? 0) - srzRadius) > 0.01
    ) {
      onChange({ ...data, tpzRadius, srzRadius });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbhInches]);

  function update(partial: Partial<ConstructionEncroachmentData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* TPZ/SRZ Display */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            Protection Zones
          </p>
          <button
            type="button"
            onClick={() => {
              setOverrideEnabled(!overrideEnabled);
              update({ tpzOverride: !overrideEnabled });
            }}
            className="text-[10px] text-blue-600 hover:text-blue-800 underline"
          >
            {overrideEnabled ? "Use auto-calc" : "Manual override"}
          </button>
        </div>

        {!overrideEnabled ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">TPZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.tpzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">SRZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.srzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">TPZ</span>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={data.tpzManual ?? data.tpzRadius ?? ""}
                onChange={(e) =>
                  update({
                    tpzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.tpzRadius ?? 0).toFixed(1)})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">SRZ</span>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={data.srzManual ?? data.srzRadius ?? ""}
                onChange={(e) =>
                  update({
                    srzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.srzRadius ?? 0).toFixed(1)})
              </span>
            </div>
          </div>
        )}

        {dbhInches <= 0 && (
          <p className="text-[10px] italic text-blue-600">
            Enter DBH above to calculate zones
          </p>
        )}
      </div>

      {/* Encroachment details */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-encroach-desc" className="text-xs">
          Encroachment Description
        </Label>
        <Textarea
          id="tsd-encroach-desc"
          placeholder="Describe the construction activity within the TPZ..."
          value={data.encroachmentDescription ?? ""}
          onChange={(e) =>
            update({ encroachmentDescription: e.target.value })
          }
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-encroach-pct" className="text-xs">
            Encroachment %
          </Label>
          <Input
            id="tsd-encroach-pct"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="0"
            value={data.encroachmentPercent ?? ""}
            onChange={(e) =>
              update({
                encroachmentPercent: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
        <div /> {/* spacer */}
      </div>

      {/* Impact Assessment */}
      <div className="space-y-1.5">
        <Label className="text-xs">Impact Assessment</Label>
        <ButtonSelector
          options={IMPACT_OPTIONS}
          value={data.impactAssessment ?? ""}
          onChange={(v) =>
            update({
              impactAssessment: v as ConstructionEncroachmentData["impactAssessment"],
            })
          }
          size="sm"
        />
      </div>

      {/* Protection Measures */}
      <div className="space-y-1.5">
        <Label className="text-xs">Protection Measures</Label>
        <MultiCheckbox
          options={[...PROTECTION_MEASURES]}
          selected={data.protectionMeasuresList ?? []}
          onChange={(items) => update({ protectionMeasuresList: items })}
        />
      </div>

      {/* Monitoring Frequency */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-monitoring" className="text-xs">
          Monitoring Frequency
        </Label>
        <select
          id="tsd-monitoring"
          value={data.monitoringFrequency ?? ""}
          onChange={(e) =>
            update({ monitoringFrequency: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {MONITORING_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
