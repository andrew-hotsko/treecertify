"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, TreePine, MapPin, ArrowUpDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeSummaryItem {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  speciesCommon: string;
  dbhInches: number | null;
  conditionRating: number | null;
  isProtected: boolean;
  recommendedAction?: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface TreeSummaryPanelProps {
  trees: TreeSummaryItem[];
  selectedTreeId?: string | null;
  onSelectTree: (id: string) => void;
  reportType?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type SortKey = "treeNumber" | "species" | "dbh" | "condition" | "action";
type SortDir = "asc" | "desc";

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_DOT_COLOR: Record<number, string> = {
  0: "bg-neutral-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-500",
};

const ACTION_LABELS: Record<string, { label: string; className: string }> = {
  retain: { label: "Retain", className: "bg-green-100 text-green-800" },
  remove: { label: "Remove", className: "bg-red-100 text-red-800" },
  prune: { label: "Prune", className: "bg-amber-100 text-amber-800" },
  monitor: { label: "Monitor", className: "bg-blue-100 text-blue-800" },
};

function getAppraisedValue(typeSpecificData?: string | null): number | null {
  if (!typeSpecificData) return null;
  try {
    const parsed = JSON.parse(typeSpecificData);
    return typeof parsed.appraisedValue === "number"
      ? parsed.appraisedValue
      : null;
  } catch {
    return null;
  }
}

function sortTrees(
  trees: TreeSummaryItem[],
  key: SortKey,
  dir: SortDir
): TreeSummaryItem[] {
  const sorted = [...trees].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "treeNumber":
        cmp = a.treeNumber - b.treeNumber;
        break;
      case "species":
        cmp = (a.speciesCommon || "").localeCompare(b.speciesCommon || "");
        break;
      case "dbh":
        cmp = (a.dbhInches ?? 0) - (b.dbhInches ?? 0);
        break;
      case "condition":
        cmp = (a.conditionRating ?? -1) - (b.conditionRating ?? -1);
        break;
      case "action":
        cmp = (a.recommendedAction || "").localeCompare(
          b.recommendedAction || ""
        );
        break;
    }
    return dir === "asc" ? cmp : -cmp;
  });
  return sorted;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSummaryPanel({
  trees,
  selectedTreeId,
  onSelectTree,
  reportType,
}: TreeSummaryPanelProps) {
  const [sortKey, setSortKey] = useState<SortKey>("treeNumber");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const protectedCount = trees.filter((t) => t.isProtected).length;
  const showValue = reportType === "tree_valuation";
  const sortedTrees = sortTrees(trees, sortKey, sortDir);

  // Scroll selected row into view when selectedTreeId changes
  useEffect(() => {
    if (selectedTreeId && rowRefs.current[selectedTreeId]) {
      rowRefs.current[selectedTreeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedTreeId]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortHeader({
    label,
    sortKeyVal,
    className,
  }: {
    label: string;
    sortKeyVal: SortKey;
    className?: string;
  }) {
    const active = sortKey === sortKeyVal;
    return (
      <th
        className={`px-3 py-2 text-left text-xs font-mono uppercase tracking-wider text-neutral-500 cursor-pointer select-none hover:text-foreground transition-colors ${className ?? ""}`}
        onClick={() => handleSort(sortKeyVal)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ArrowUpDown
            className={`h-3 w-3 ${active ? "text-foreground" : "text-muted-foreground/40"}`}
          />
        </span>
      </th>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-forest" />
            Site Overview
          </span>
          <div className="flex items-center gap-2">
            {protectedCount > 0 && (
              <Badge variant="outline" className="text-xs gap-1">
                <ShieldCheck className="h-3 w-3 text-forest" />
                {protectedCount} protected
              </Badge>
            )}
            <Badge variant="secondary">{trees.length} trees</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {trees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2 text-muted-foreground/40" />
            <p>Click the map to add your first tree.</p>
          </div>
        ) : (
          <div className="max-h-72 overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-neutral-100 sticky top-0">
                <tr>
                  <SortHeader label="#" sortKeyVal="treeNumber" className="w-12" />
                  <th className="px-3 py-2 text-left text-xs font-mono uppercase tracking-wider text-neutral-500 w-16">
                    Tag
                  </th>
                  <SortHeader label="Species" sortKeyVal="species" />
                  <SortHeader label="DBH" sortKeyVal="dbh" className="w-16" />
                  <SortHeader label="Condition" sortKeyVal="condition" className="w-24" />
                  <th className="px-3 py-2 text-center text-xs font-mono uppercase tracking-wider text-neutral-500 w-8">
                    <ShieldCheck className="h-3.5 w-3.5 mx-auto" />
                  </th>
                  <SortHeader label="Action" sortKeyVal="action" className="w-20" />
                  {showValue && (
                    <th className="px-3 py-2 text-right text-xs font-mono uppercase tracking-wider text-neutral-500 w-24">
                      Value
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedTrees.map((tree) => {
                  const isSelected = tree.id === selectedTreeId;
                  const action = tree.recommendedAction
                    ? ACTION_LABELS[tree.recommendedAction]
                    : null;
                  const value = showValue
                    ? getAppraisedValue(tree.typeSpecificData)
                    : null;

                  return (
                    <tr
                      key={tree.id}
                      ref={(el) => {
                        rowRefs.current[tree.id] = el;
                      }}
                      onClick={() => onSelectTree(tree.id)}
                      className={`cursor-pointer transition-colors hover:bg-accent ${
                        isSelected
                          ? "bg-forest/5"
                          : ""
                      }`}
                    >
                      <td className="px-3 py-2 font-mono font-semibold text-xs">
                        {tree.treeNumber}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                        {tree.tagNumber || "—"}
                      </td>
                      <td className="px-3 py-2 truncate max-w-[200px]">
                        {tree.speciesCommon || (
                          <span className="text-muted-foreground italic">
                            Unknown
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">
                        {tree.dbhInches != null ? `${tree.dbhInches}"` : "—"}
                      </td>
                      <td className="px-3 py-2">
                        {tree.conditionRating != null && tree.conditionRating >= 0 ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                CONDITION_DOT_COLOR[tree.conditionRating] ?? "bg-neutral-400"
                              }`}
                            />
                            <span className="text-xs">
                              {CONDITION_LABELS[tree.conditionRating] ?? tree.conditionRating}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {tree.isProtected ? (
                          <ShieldCheck className="h-4 w-4 text-forest mx-auto" />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {action ? (
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${action.className}`}
                          >
                            {action.label}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      {showValue && (
                        <td className="px-3 py-2 text-right font-mono text-xs">
                          {value != null ? formatter.format(value) : "—"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
