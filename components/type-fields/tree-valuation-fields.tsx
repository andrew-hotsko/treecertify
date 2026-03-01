"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  calcTrunkArea,
  calcAppraisedValue,
  type TreeValuationData,
} from "@/lib/report-types";

interface TreeValuationFieldsProps {
  data: TreeValuationData;
  onChange: (data: TreeValuationData) => void;
  dbhInches: number;
}

export function TreeValuationFields({
  data,
  onChange,
  dbhInches,
}: TreeValuationFieldsProps) {
  // Auto-calculate on DBH or rating changes
  useEffect(() => {
    const trunkArea = dbhInches > 0 ? calcTrunkArea(dbhInches) : 0;
    const costPerSqInch = data.costPerSquareInch ?? 75;
    const speciesRating = data.speciesRating ?? 70;
    const conditionRating = data.conditionRating ?? 70;
    const locationRating = data.locationRating ?? 70;
    const appraisedValue =
      trunkArea > 0
        ? calcAppraisedValue(
            trunkArea,
            costPerSqInch,
            speciesRating,
            conditionRating,
            locationRating
          )
        : 0;

    // Only update if values actually changed
    if (
      Math.abs((data.trunkArea ?? 0) - trunkArea) > 0.01 ||
      Math.abs((data.appraisedValue ?? 0) - appraisedValue) > 0.01
    ) {
      onChange({ ...data, trunkArea, appraisedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dbhInches,
    data.costPerSquareInch,
    data.speciesRating,
    data.conditionRating,
    data.locationRating,
  ]);

  function update(partial: Partial<TreeValuationData>) {
    onChange({ ...data, ...partial });
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-4">
      {/* Valuation Method (read-only) */}
      <div className="space-y-1.5">
        <Label className="text-xs">Valuation Method</Label>
        <div className="flex h-9 w-full items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
          CTLA Trunk Formula
        </div>
      </div>

      {/* Rating inputs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-species-rating" className="text-xs">
            Species %
          </Label>
          <Input
            id="tsd-species-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.speciesRating ?? ""}
            onChange={(e) =>
              update({
                speciesRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-condition-rating" className="text-xs">
            Condition %
          </Label>
          <Input
            id="tsd-condition-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.conditionRating ?? ""}
            onChange={(e) =>
              update({
                conditionRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-location-rating" className="text-xs">
            Location %
          </Label>
          <Input
            id="tsd-location-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.locationRating ?? ""}
            onChange={(e) =>
              update({
                locationRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
      </div>

      {/* Cost per sq inch */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost-sq-in" className="text-xs">
          Cost per Sq Inch (Regional Rate)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost-sq-in"
            type="number"
            min="0"
            step="5"
            placeholder="75"
            value={data.costPerSquareInch ?? ""}
            onChange={(e) =>
              update({
                costPerSquareInch: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>

      {/* Auto-calculated values */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
          Auto-Calculated
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Trunk Area</span>
          <span className="font-mono text-sm font-semibold text-emerald-800">
            {(data.trunkArea ?? 0).toFixed(1)} sq in
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Appraised Value</span>
          <span className="font-mono text-lg font-bold text-emerald-800">
            {formatter.format(data.appraisedValue ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
