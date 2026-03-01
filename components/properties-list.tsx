"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Plus,
  TreePine,
  ShieldCheck,
  ArrowRight,
  Search,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PropertyTree {
  id: string;
  isProtected: boolean;
  status: string;
}

interface PropertyReport {
  id: string;
  status: string;
}

interface PropertyItem {
  id: string;
  address: string;
  city: string;
  county: string;
  reportType: string;
  neededByDate: string | null;
  updatedAt: string;
  trees: PropertyTree[];
  reports: PropertyReport[];
}

interface PropertiesListProps {
  properties: PropertyItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";
type SortKey = "recent" | "oldest" | "cityAZ" | "dueSoonest";

function getWorkflowStatus(property: PropertyItem) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", color: "bg-gray-100 text-gray-600" };
  if (!latestReport)
    return { label: "Assessing", color: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", color: "bg-emerald-100 text-emerald-700" };
  return { label: "Draft", color: "bg-blue-100 text-blue-700" };
}

function getFilterCategory(property: PropertyItem): FilterStatus {
  const latestReport = property.reports[0];
  if (!latestReport) return "inProgress";
  if (latestReport.status === "certified") return "certified";
  return "draft";
}

function getDueIndicator(neededByDate: string | null) {
  if (!neededByDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(neededByDate);
  due.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 0)
    return { label: "Overdue", className: "text-red-600 bg-red-50" };
  if (daysUntil === 0)
    return { label: "Due today", className: "text-amber-600 bg-amber-50" };
  if (daysUntil <= 7)
    return {
      label: `Due in ${daysUntil}d`,
      className: "text-amber-600 bg-amber-50",
    };
  return null;
}

function formatReportType(reportType: string) {
  return reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertiesList({ properties }: PropertiesListProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const [showSort, setShowSort] = useState(false);

  // Counts
  const counts = useMemo(
    () => ({
      all: properties.length,
      inProgress: properties.filter((p) => getFilterCategory(p) === "inProgress")
        .length,
      draft: properties.filter((p) => getFilterCategory(p) === "draft").length,
      certified: properties.filter(
        (p) => getFilterCategory(p) === "certified"
      ).length,
    }),
    [properties]
  );

  // Filter + search + sort
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Filter by status
    if (filter !== "all") {
      result = result.filter((p) => getFilterCategory(p) === filter);
    }

    // Search by address or city
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortKey) {
        case "recent":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "cityAZ":
          return a.city.localeCompare(b.city);
        case "dueSoonest": {
          const aDue = a.neededByDate
            ? new Date(a.neededByDate).getTime()
            : Infinity;
          const bDue = b.neededByDate
            ? new Date(b.neededByDate).getTime()
            : Infinity;
          return aDue - bDue;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [properties, filter, search, sortKey]);

  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "inProgress", label: `In Progress (${counts.inProgress})` },
    { key: "draft", label: `Draft (${counts.draft})` },
    { key: "certified", label: `Certified (${counts.certified})` },
  ];

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "recent", label: "Most Recent" },
    { key: "oldest", label: "Oldest First" },
    { key: "cityAZ", label: "City A-Z" },
    { key: "dueSoonest", label: "Due Date" },
  ];

  return (
    <>
      {/* Search + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by address or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 text-gray-700"
          >
            {sortOptions.find((s) => s.key === sortKey)?.label}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-10 py-1 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setShowSort(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50",
                    sortKey === opt.key
                      ? "text-emerald-700 font-medium"
                      : "text-gray-600"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              filter === f.key
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Property List */}
      {filteredProperties.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-50 p-4 mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              {properties.length === 0
                ? "No properties yet"
                : "No properties match your search"}
            </p>
            {properties.length === 0 && (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  Add your first property to start pinning trees on the
                  satellite map and generating AI-assisted reports.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link href="/properties/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Property
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProperties.map((property) => {
            const treeCount = property.trees.length;
            const protectedCount = property.trees.filter(
              (t) => t.isProtected
            ).length;
            const assessedCount = property.trees.filter(
              (t) => t.status !== "draft"
            ).length;
            const workflow = getWorkflowStatus(property);
            const dueIndicator = getDueIndicator(property.neededByDate);

            return (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="block"
              >
                <Card className="hover:border-emerald-300 transition-colors cursor-pointer">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 hidden sm:block">
                          <div className="rounded-full bg-emerald-50 p-2">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                              {property.address}
                            </h3>
                            {property.address === "123 Sample Street" && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted-foreground/30 shrink-0"
                              >
                                Sample
                              </Badge>
                            )}
                            <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                              {formatReportType(property.reportType)}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0",
                                workflow.color
                              )}
                            >
                              {workflow.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="truncate">
                              {property.city}
                              {property.county
                                ? `, ${property.county} County`
                                : ""}
                            </span>
                            {dueIndicator && (
                              <span
                                className={cn(
                                  "text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0",
                                  dueIndicator.className
                                )}
                              >
                                {dueIndicator.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <TreePine className="h-4 w-4 text-emerald-600" />
                            <span className="font-mono font-medium">
                              {treeCount}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {protectedCount > 0 && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600">
                                <ShieldCheck className="h-3 w-3" />
                                {protectedCount}
                              </span>
                            )}
                            {assessedCount > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {assessedCount}/{treeCount}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Mobile tree count */}
                        <span className="flex items-center gap-1 sm:hidden text-xs shrink-0">
                          <TreePine className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="font-mono">{treeCount}</span>
                        </span>

                        <span className="hidden md:inline-block text-xs text-muted-foreground">
                          {format(
                            new Date(property.updatedAt),
                            "MMM d, yyyy"
                          )}
                        </span>

                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
