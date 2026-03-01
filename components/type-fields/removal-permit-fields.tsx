"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RISK_FACTORS, type RemovalPermitData } from "@/lib/report-types";

interface RemovalPermitFieldsProps {
  data: RemovalPermitData;
  onChange: (data: RemovalPermitData) => void;
}

export function RemovalPermitFields({
  data,
  onChange,
}: RemovalPermitFieldsProps) {
  function update(partial: Partial<RemovalPermitData>) {
    onChange({ ...data, ...partial });
  }

  function toggleRiskFactor(factor: string) {
    const current = data.riskFactors ?? [];
    const next = current.includes(factor)
      ? current.filter((f) => f !== factor)
      : [...current, factor];
    update({ riskFactors: next });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="tsd-risk-rating" className="text-xs">
          Risk Rating
        </Label>
        <select
          id="tsd-risk-rating"
          value={data.riskRating ?? ""}
          onChange={(e) =>
            update({
              riskRating: (e.target.value || undefined) as
                | RemovalPermitData["riskRating"]
                | undefined,
            })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
          <option value="extreme">Extreme</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Risk Factors</Label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {RISK_FACTORS.map((factor) => (
            <label
              key={factor}
              className="flex items-center gap-2 text-xs cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(data.riskFactors ?? []).includes(factor)}
                onChange={() => toggleRiskFactor(factor)}
                className="rounded border-input h-3.5 w-3.5"
              />
              <span className="leading-tight">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tsd-removal-reason" className="text-xs">
          Removal Reason
        </Label>
        <Textarea
          id="tsd-removal-reason"
          placeholder="Describe the justification for removal..."
          value={data.removalReason ?? ""}
          onChange={(e) => update({ removalReason: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tsd-retention" className="text-xs">
          Retention Feasibility
        </Label>
        <Textarea
          id="tsd-retention"
          placeholder="Can the tree be retained? If not, explain why..."
          value={data.retentionFeasibility ?? ""}
          onChange={(e) => update({ retentionFeasibility: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tsd-lifespan" className="text-xs">
          Estimated Remaining Lifespan
        </Label>
        <Input
          id="tsd-lifespan"
          placeholder="5-10 years"
          value={data.estimatedRemainingLifespan ?? ""}
          onChange={(e) =>
            update({ estimatedRemainingLifespan: e.target.value })
          }
        />
      </div>
    </div>
  );
}
