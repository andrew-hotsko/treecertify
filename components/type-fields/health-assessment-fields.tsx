"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { HealthAssessmentData } from "@/lib/report-types";

interface HealthAssessmentFieldsProps {
  data: HealthAssessmentData;
  onChange: (data: HealthAssessmentData) => void;
}

export function HealthAssessmentFields({
  data,
  onChange,
}: HealthAssessmentFieldsProps) {
  function update(partial: Partial<HealthAssessmentData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="tsd-maint-recs" className="text-xs">
          Maintenance Recommendations
        </Label>
        <Textarea
          id="tsd-maint-recs"
          placeholder="Crown cleaning, deadwood removal, structural pruning..."
          value={data.maintenanceRecommendations ?? ""}
          onChange={(e) =>
            update({ maintenanceRecommendations: e.target.value })
          }
          rows={2}
        />
      </div>

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
