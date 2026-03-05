"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTRAQRisk,
  MAINTENANCE_ITEMS,
  type HealthAssessmentData,
} from "@/lib/report-types";

interface HealthAssessmentFieldsProps {
  data: HealthAssessmentData;
  onChange: (data: HealthAssessmentData) => void;
}

const LOF_OPTIONS = [
  { value: "improbable", label: "Improbable", color: "green" },
  { value: "possible", label: "Possible", color: "amber" },
  { value: "probable", label: "Probable", color: "orange" },
  { value: "imminent", label: "Imminent", color: "red" },
];

const LOI_OPTIONS = [
  { value: "very_low", label: "Very Low", color: "green" },
  { value: "low", label: "Low", color: "amber" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "red" },
];

const CONSEQUENCES_OPTIONS = [
  { value: "negligible", label: "Negligible", color: "green" },
  { value: "minor", label: "Minor", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

function riskBadgeColor(risk: string): string {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    case "moderate":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "extreme":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-neutral-100 text-neutral-600 border-neutral-300";
  }
}

export function HealthAssessmentFields({
  data,
  onChange,
}: HealthAssessmentFieldsProps) {
  function update(partial: Partial<HealthAssessmentData>) {
    onChange({ ...data, ...partial });
  }

  // Auto-calculate risk rating
  useEffect(() => {
    const risk = calcTRAQRisk(
      data.likelihoodOfFailure,
      data.likelihoodOfImpact,
      data.consequences
    );
    if (risk && risk !== data.overallRiskRating) {
      onChange({ ...data, overallRiskRating: risk });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.likelihoodOfFailure, data.likelihoodOfImpact, data.consequences]);

  return (
    <div className="space-y-4">
      {/* TRAQ Risk Assessment */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          TRAQ Risk Assessment
        </p>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Failure</Label>
          <ButtonSelector
            options={LOF_OPTIONS}
            value={data.likelihoodOfFailure ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfFailure: v as HealthAssessmentData["likelihoodOfFailure"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Impact</Label>
          <ButtonSelector
            options={LOI_OPTIONS}
            value={data.likelihoodOfImpact ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfImpact: v as HealthAssessmentData["likelihoodOfImpact"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Consequences</Label>
          <ButtonSelector
            options={CONSEQUENCES_OPTIONS}
            value={data.consequences ?? ""}
            onChange={(v) =>
              update({
                consequences: v as HealthAssessmentData["consequences"],
              })
            }
            size="sm"
          />
        </div>

        {/* Auto-calculated risk rating — full-width colored banner */}
        {data.overallRiskRating && (
          <div className={`text-center py-2 rounded-lg border font-semibold text-sm ${riskBadgeColor(data.overallRiskRating)}`}>
            Overall Risk: {data.overallRiskRating.charAt(0).toUpperCase() + data.overallRiskRating.slice(1)}
          </div>
        )}
      </div>

      {/* Target Description */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-target" className="text-xs">
          Target Description
        </Label>
        <Textarea
          id="tsd-target"
          placeholder="Describe the target (people, property, infrastructure)..."
          value={data.targetDescription ?? ""}
          onChange={(e) => update({ targetDescription: e.target.value })}
          rows={2}
        />
      </div>

      {/* Maintenance Items */}
      <div className="space-y-1.5">
        <Label className="text-xs">Maintenance Recommendations</Label>
        <MultiCheckbox
          options={[...MAINTENANCE_ITEMS]}
          selected={data.maintenanceItems ?? []}
          onChange={(items) => update({ maintenanceItems: items })}
        />
      </div>

      {/* Priority & Timeline */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-priority" className="text-xs">
            Priority
          </Label>
          <select
            id="tsd-priority"
            value={data.maintenancePriority ?? ""}
            onChange={(e) =>
              update({
                maintenancePriority: (e.target.value || undefined) as
                  | HealthAssessmentData["maintenancePriority"]
                  | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-timeline" className="text-xs">
            Timeline
          </Label>
          <Input
            id="tsd-timeline"
            placeholder="Within 6 months"
            value={data.maintenanceTimeline ?? ""}
            onChange={(e) => update({ maintenanceTimeline: e.target.value })}
          />
        </div>
      </div>

      {/* Estimated Cost */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost" className="text-xs">
          Estimated Maintenance Cost
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost"
            type="number"
            min="0"
            step="50"
            placeholder="0"
            value={data.estimatedMaintenanceCost ?? ""}
            onChange={(e) =>
              update({
                estimatedMaintenanceCost: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
