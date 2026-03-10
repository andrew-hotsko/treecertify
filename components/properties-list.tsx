"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MapPin,
  Plus,
  TreePine,
  ShieldCheck,
  Search,
  ChevronDown,
  Trash2,
  X,
  Home,
  SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
  permitStatus?: string | null;
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
  initialFilter?: string;
  initialPermitFilter?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";
type SortKey = "recent" | "oldest" | "cityAZ" | "dueSoonest";

function getWorkflowBadge(property: PropertyItem) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", className: "bg-muted text-muted-foreground" };
  if (!latestReport)
    return { label: "Assessing", className: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", className: "bg-forest/10 text-forest" };
  if (latestReport.status === "review")
    return { label: "In Review", className: "bg-blue-100 text-blue-700" };
  return { label: "Draft", className: "bg-blue-100 text-blue-700" };
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

const VALID_FILTERS: FilterStatus[] = [
  "all",
  "inProgress",
  "draft",
  "certified",
];

const PERMIT_FILTER_LABELS: Record<string, string> = {
  pending: "Pending Submission",
  submitted: "Submitted / Under Review",
  approved: "Approved",
  revision: "Needing Revision",
};

export function PropertiesList({
  properties: initialProperties,
  initialFilter,
  initialPermitFilter,
}: PropertiesListProps) {
  const { toast } = useToast();
  const [properties, setProperties] = useState(initialProperties);
  const [filter, setFilter] = useState<FilterStatus>(
    VALID_FILTERS.includes(initialFilter as FilterStatus)
      ? (initialFilter as FilterStatus)
      : "all"
  );
  const [permitFilter, setPermitFilter] = useState<string | null>(
    initialPermitFilter &&
      Object.keys(PERMIT_FILTER_LABELS).includes(initialPermitFilter)
      ? initialPermitFilter
      : null
  );
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Derive unique cities and report types
  const uniqueCities = useMemo(() => {
    const cities = Array.from(new Set(properties.map((p) => p.city)))
      .filter(Boolean)
      .sort();
    return cities;
  }, [properties]);

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(properties.map((p) => p.reportType)))
      .filter(Boolean)
      .sort();
    return types;
  }, [properties]);

  // Counts
  const counts = useMemo(
    () => ({
      all: properties.length,
      inProgress: properties.filter(
        (p) => getFilterCategory(p) === "inProgress"
      ).length,
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

    // Filter by permit status
    if (permitFilter) {
      result = result.filter((p) => {
        const ps = p.reports[0]?.permitStatus;
        switch (permitFilter) {
          case "pending":
            return p.reports[0]?.status === "certified" && !ps;
          case "submitted":
            return ps === "submitted" || ps === "under_review";
          case "approved":
            return ps === "approved";
          case "revision":
            return ps === "denied" || ps === "revision_requested";
          default:
            return true;
        }
      });
    }

    if (filter !== "all") {
      result = result.filter((p) => getFilterCategory(p) === filter);
    }

    if (cityFilter !== "all") {
      result = result.filter((p) => p.city === cityFilter);
    }

    if (typeFilter !== "all") {
      result = result.filter((p) => p.reportType === typeFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

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
  }, [
    properties,
    filter,
    permitFilter,
    search,
    sortKey,
    cityFilter,
    typeFilter,
  ]);

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

  const deleteTarget = properties.find((p) => p.id === deletePropertyId);

  const handleDeleteProperty = async () => {
    if (!deletePropertyId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/properties/${deletePropertyId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete property");
      setProperties((prev) => prev.filter((p) => p.id !== deletePropertyId));
      toast({
        title: "Property deleted",
        description: `"${deleteTarget?.address}" has been deleted.`,
      });
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not delete property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletePropertyId(null);
      setDeleting(false);
    }
  };

  const hasActiveFilters =
    filter !== "all" ||
    cityFilter !== "all" ||
    typeFilter !== "all" ||
    !!permitFilter;

  return (
    <>
      {/* Permit filter banner */}
      {permitFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest/5 border border-forest/20 text-sm">
          <span className="text-foreground">
            Showing:{" "}
            <span className="font-semibold text-forest">
              {PERMIT_FILTER_LABELS[permitFilter]}
            </span>
          </span>
          <button
            onClick={() => setPermitFilter(null)}
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      )}

      {/* Search + Sort + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by address or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* City filter */}
          {uniqueCities.length > 1 && (
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="h-11 text-sm px-3 rounded-lg border border-input bg-background text-foreground hover:border-ring/50 focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 h-11 px-3 text-sm border border-input rounded-lg bg-background text-foreground hover:border-ring/50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline">
                {sortOptions.find((s) => s.key === sortKey)?.label}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            {showSort && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSort(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-popover border rounded-lg shadow-lg z-20 py-1 min-w-[160px]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortKey(opt.key);
                        setShowSort(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors",
                        sortKey === opt.key
                          ? "text-forest font-medium"
                          : "text-foreground"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[32px]",
              filter === f.key
                ? "bg-forest text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
        {/* Report type filter pills */}
        {uniqueTypes.length > 1 && (
          <>
            <div className="w-px h-4 bg-border" />
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  setTypeFilter(typeFilter === type ? "all" : type)
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[32px]",
                  typeFilter === type
                    ? "bg-forest text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {formatReportType(type)}
              </button>
            ))}
          </>
        )}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilter("all");
              setCityFilter("all");
              setTypeFilter("all");
              setPermitFilter(null);
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Property grid */}
      {filteredProperties.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title={
            properties.length === 0
              ? "No properties yet"
              : "No properties match your filters"
          }
          description={
            properties.length === 0
              ? "Add your first property to start pinning trees on the satellite map and generating AI-assisted reports."
              : "Try adjusting your search or filters."
          }
          action={
            properties.length === 0 ? (
              <Button
                asChild
                size="sm"
                className="bg-forest hover:bg-forest-light"
              >
                <Link href="/properties/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Property
                </Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProperties.map((property) => {
            const treeCount = property.trees.length;
            const protectedCount = property.trees.filter(
              (t) => t.isProtected
            ).length;
            const workflow = getWorkflowBadge(property);
            const dueIndicator = getDueIndicator(property.neededByDate);
            const isRealEstate = property.reportType === "real_estate_package";

            return (
              <div key={property.id} className="group relative">
                <Link
                  href={`/properties/${property.id}`}
                  className="block rounded-xl bg-card border border-border p-4 card-hover hover:border-forest/20"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest/5 mt-0.5">
                        {isRealEstate ? (
                          <Home className="h-4 w-4 text-forest" />
                        ) : (
                          <MapPin className="h-4 w-4 text-forest" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-medium text-foreground truncate">
                            {property.address}
                          </p>
                          {property.address === "123 Sample Street" && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted-foreground/30 shrink-0"
                            >
                              Sample
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {property.city}
                          {property.county
                            ? `, ${property.county} County`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0",
                        workflow.className
                      )}
                    >
                      {workflow.label}
                    </span>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <TreePine className="h-3.5 w-3.5" />
                        <span className="font-mono">
                          {treeCount} tree{treeCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {protectedCount > 0 && (
                        <div className="flex items-center gap-0.5 text-xs text-forest">
                          <ShieldCheck className="h-3 w-3" />
                          <span className="font-mono">{protectedCount}</span>
                        </div>
                      )}
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {isRealEstate
                          ? "Real Estate"
                          : formatReportType(property.reportType)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {dueIndicator && (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded",
                            dueIndicator.className
                          )}
                        >
                          {dueIndicator.label}
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {format(new Date(property.updatedAt), "MMM d")}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Delete button — hover only */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePropertyId(property.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 hover:bg-red-50 text-muted-foreground hover:text-red-600"
                  title="Delete property"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Property Confirmation */}
      <AlertDialog
        open={!!deletePropertyId}
        onOpenChange={(open) => !open && setDeletePropertyId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  This will permanently delete{" "}
                  <span className="font-semibold text-foreground">
                    &ldquo;{deleteTarget?.address}&rdquo;
                  </span>{" "}
                  and all associated data:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    {deleteTarget?.trees.length ?? 0} tree
                    {(deleteTarget?.trees.length ?? 0) !== 1 ? "s" : ""} and
                    their assessments
                  </li>
                  <li>
                    {deleteTarget?.reports.length ?? 0} report
                    {(deleteTarget?.reports.length ?? 0) !== 1 ? "s" : ""}
                  </li>
                  <li>All photos and audio notes</li>
                </ul>
                <p className="font-medium text-destructive">
                  This cannot be undone.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting..." : "Delete Property"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
