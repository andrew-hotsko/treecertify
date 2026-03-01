"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { RISK_FACTORS, type RemovalPermitData } from "@/lib/report-types";

interface RemovalPermitFieldsProps {
  data: RemovalPermitData;
  onChange: (data: RemovalPermitData) => void;
}

const RISK_RATING_OPTIONS = [
  { value: "low", label: "Low", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "high", label: "High", color: "orange" },
  { value: "extreme", label: "Extreme", color: "red" },
];

const RETENTION_OPTIONS = [
  { value: "feasible", label: "Feasible", color: "green" },
  { value: "not_feasible", label: "Not Feasible", color: "red" },
  { value: "feasible_with_conditions", label: "With Conditions", color: "amber" },
];

const LIFESPAN_OPTIONS = [
  "< 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const REMOVAL_REASONS = [
  "Dead/Dying",
  "Hazardous",
  "Disease/Pest",
  "Infrastructure Conflict",
  "Development",
  "Declining Beyond Remediation",
  "Other",
];

export function RemovalPermitFields({
  data,
  onChange,
}: RemovalPermitFieldsProps) {
  function update(partial: Partial<RemovalPermitData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* Risk Rating */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Rating</Label>
        <ButtonSelector
          options={RISK_RATING_OPTIONS}
          value={data.riskRating ?? ""}
          onChange={(v) =>
            update({
              riskRating: v as RemovalPermitData["riskRating"],
            })
          }
          size="sm"
        />
      </div>

      {/* Risk Factors */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Factors</Label>
        <MultiCheckbox
          options={[...RISK_FACTORS]}
          selected={data.riskFactors ?? []}
          onChange={(factors) => update({ riskFactors: factors })}
        />
      </div>

      {/* Primary Removal Reason */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-removal-reason" className="text-xs">
          Primary Removal Reason
        </Label>
        <select
          id="tsd-removal-reason"
          value={data.removalReason ?? ""}
          onChange={(e) => update({ removalReason: e.target.value || undefined })}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select reason...</option>
          {REMOVAL_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Retention Feasibility */}
      <div className="space-y-1.5">
        <Label className="text-xs">Retention Feasibility</Label>
        <ButtonSelector
          options={RETENTION_OPTIONS}
          value={data.retentionFeasibility ?? ""}
          onChange={(v) =>
            update({
              retentionFeasibility: v as RemovalPermitData["retentionFeasibility"],
            })
          }
          size="sm"
        />
        {data.retentionFeasibility === "feasible_with_conditions" && (
          <Textarea
            placeholder="Describe conditions required for retention..."
            value={data.retentionNotes ?? ""}
            onChange={(e) => update({ retentionNotes: e.target.value })}
            rows={2}
            className="mt-2"
          />
        )}
      </div>

      {/* Estimated Remaining Lifespan */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-lifespan" className="text-xs">
          Estimated Remaining Lifespan
        </Label>
        <select
          id="tsd-lifespan"
          value={data.estimatedRemainingLifespan ?? ""}
          onChange={(e) =>
            update({ estimatedRemainingLifespan: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {LIFESPAN_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
