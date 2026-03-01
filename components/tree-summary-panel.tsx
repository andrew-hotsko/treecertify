"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, TreePine, MapPin } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeSummaryItem {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  dbhInches: number | null;
  conditionRating: number | null;
  isProtected: boolean;
  status: string;
}

interface TreeSummaryPanelProps {
  trees: TreeSummaryItem[];
  selectedTreeId?: string | null;
  onSelectTree: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusColor(status: string): string {
  switch (status) {
    case "certified":
      return "bg-emerald-500 text-white";
    case "assessed":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

function conditionDots(rating: number | null | undefined) {
  if (rating == null) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`h-1.5 w-1.5 rounded-full ${
            n <= rating
              ? rating <= 2
                ? "bg-red-500"
                : rating === 3
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSummaryPanel({
  trees,
  selectedTreeId,
  onSelectTree,
}: TreeSummaryPanelProps) {
  const protectedCount = trees.filter((t) => t.isProtected).length;
  const avgCondition =
    trees.length > 0
      ? (
          trees.reduce(
            (sum: number, t: TreeSummaryItem) => sum + (t.conditionRating ?? 0),
            0
          ) / trees.length
        ).toFixed(1)
      : "--";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-emerald-600" />
            Trees on Property
          </span>
          <Badge variant="secondary">{trees.length}</Badge>
        </CardTitle>

        {/* Aggregate stats */}
        {trees.length > 0 && (
          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
            <span>
              <strong className="text-foreground">{trees.length}</strong> total
            </span>
            <span>
              <strong className="text-foreground">{protectedCount}</strong>{" "}
              protected
            </span>
            <span>
              Avg condition:{" "}
              <strong className="text-foreground">{avgCondition}</strong>
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {trees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2 text-muted-foreground/40" />
            <p>Click the map to add your first tree.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
            {trees.map((tree) => {
              const isSelected = tree.id === selectedTreeId;
              return (
                <button
                  key={tree.id}
                  type="button"
                  onClick={() => onSelectTree(tree.id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                      : "border-muted"
                  }`}
                >
                  {/* Tree number badge */}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${statusColor(tree.status)}`}
                  >
                    {tree.treeNumber}
                  </span>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {tree.speciesCommon || "Unknown species"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {tree.dbhInches != null && (
                        <span className="text-xs font-mono text-muted-foreground">
                          {tree.dbhInches}&quot;
                        </span>
                      )}
                      {conditionDots(tree.conditionRating)}
                    </div>
                  </div>

                  {/* Protection icon */}
                  {tree.isProtected && (
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
