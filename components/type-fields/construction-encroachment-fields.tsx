"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  calcTpzRadius,
  calcSrzRadius,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";

interface ConstructionEncroachmentFieldsProps {
  data: ConstructionEncroachmentData;
  onChange: (data: ConstructionEncroachmentData) => void;
  dbhInches: number;
}

export function ConstructionEncroachmentFields({
  data,
  onChange,
  dbhInches,
}: ConstructionEncroachmentFieldsProps) {
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
      {/* Auto-calculated TPZ/SRZ */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
          Auto-Calculated Protection Zones
        </p>
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
        <div className="space-y-1.5">
          <Label htmlFor="tsd-impact" className="text-xs">
            Impact Assessment
          </Label>
          <select
            id="tsd-impact"
            value={data.impactAssessment ?? ""}
            onChange={(e) =>
              update({
                impactAssessment: (e.target.value || undefined) as
                  | ConstructionEncroachmentData["impactAssessment"]
                  | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="significant">Significant</option>
            <option value="severe">Severe</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tsd-protection" className="text-xs">
          Protection Measures
        </Label>
        <Textarea
          id="tsd-protection"
          placeholder="Tree protection fencing, root pruning specifications..."
          value={data.protectionMeasures ?? ""}
          onChange={(e) => update({ protectionMeasures: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tsd-monitoring" className="text-xs">
          Monitoring Schedule
        </Label>
        <Textarea
          id="tsd-monitoring"
          placeholder="Weekly inspections during construction, bi-annual for 2 years..."
          value={data.monitoringSchedule ?? ""}
          onChange={(e) => update({ monitoringSchedule: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  );
}
