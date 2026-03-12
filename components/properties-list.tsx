"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ArrowRight,
  Search,
  ChevronDown,
  Trash2,
  X,
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
  billingIncluded?: boolean;
  billingAmount?: number | null;
  billingPaidAt?: string | null;
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

type DashboardFilter = "needs-trees" | "ready-to-generate" | "ready-to-certify" | "awaiting-payment";

const VALID_DASHBOARD_FILTERS: DashboardFilter[] = [
  "needs-trees",
  "ready-to-generate",
  "ready-to-certify",
  "awaiting-payment",
];

const DASHBOARD_FILTER_LABELS: Record<DashboardFilter, string> = {
  "needs-trees": "Needs Tree Assessments",
  "ready-to-generate": "Ready to Generate",
  "ready-to-certify": "Ready to Certify",
  "awaiting-payment": "Awaiting Payment",
};

interface PropertiesListProps {
  properties: PropertyItem[];
  initialFilter?: string;
  initialPermitFilter?: string;
  initialDashboardFilter?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";
type SortKey = "recent" | "oldest" | "cityAZ" | "dueSoonest";

function getWorkflowStatus(property: PropertyItem) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", color: "bg-neutral-200 text-neutral-600" };
  if (!latestReport)
    return { label: "Assessing", color: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", color: "bg-forest/10 text-forest" };
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

const VALID_FILTERS: FilterStatus[] = ["all", "inProgress", "draft", "certified"];

const PERMIT_FILTER_LABELS: Record<string, string> = {
  pending: "Pending Submission",
  submitted: "Submitted / Under Review",
  approved: "Approved",
  revision: "Needing Revision",
};

export function PropertiesList({ properties: initialProperties, initialFilter, initialPermitFilter, initialDashboardFilter }: PropertiesListProps) {
  const { toast } = useToast();
  const [properties, setProperties] = useState(initialProperties);
  const [filter, setFilter] = useState<FilterStatus>(
    VALID_FILTERS.includes(initialFilter as FilterStatus) ? (initialFilter as FilterStatus) : "all"
  );
  const [permitFilter, setPermitFilter] = useState<string | null>(
    initialPermitFilter && Object.keys(PERMIT_FILTER_LABELS).includes(initialPermitFilter) ? initialPermitFilter : null
  );
  const [dashboardFilter, setDashboardFilter] = useState<DashboardFilter | null>(
    initialDashboardFilter && VALID_DASHBOARD_FILTERS.includes(initialDashboardFilter as DashboardFilter)
      ? (initialDashboardFilter as DashboardFilter)
      : null
  );
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Derive unique cities and report types for filter dropdowns
  const uniqueCities = useMemo(() => {
    const cities = Array.from(new Set(properties.map((p) => p.city))).filter(Boolean).sort();
    return cities;
  }, [properties]);

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(properties.map((p) => p.reportType))).filter(Boolean).sort();
    return types;
  }, [properties]);

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

    // Filter by dashboard action card (from ?filter= param)
    if (dashboardFilter) {
      result = result.filter((p) => {
        const r = p.reports[0];
        const hasTrees = p.trees.length > 0;
        switch (dashboardFilter) {
          case "needs-trees": return !hasTrees;
          case "ready-to-generate": return hasTrees && !r;
          case "ready-to-certify": return r && (r.status === "draft" || r.status === "review" || r.status === "amendment_in_progress");
          case "awaiting-payment": return r && r.billingIncluded && (r.billingAmount ?? 0) > 0 && !r.billingPaidAt;
          default: return true;
        }
      });
    }

    // Filter by permit status (from dashboard pipeline click)
    if (permitFilter) {
      result = result.filter((p) => {
        const ps = p.reports[0]?.permitStatus;
        switch (permitFilter) {
          case "pending": return p.reports[0]?.status === "certified" && !ps;
          case "submitted": return ps === "submitted" || ps === "under_review";
          case "approved": return ps === "approved";
          case "revision": return ps === "denied" || ps === "revision_requested";
          default: return true;
        }
      });
    }

    // Filter by status (skip if a dashboard filter is active — they're more specific)
    if (filter !== "all" && !dashboardFilter) {
      result = result.filter((p) => getFilterCategory(p) === filter);
    }

    // Filter by city
    if (cityFilter !== "all") {
      result = result.filter((p) => p.city === cityFilter);
    }

    // Filter by report type
    if (typeFilter !== "all") {
      result = result.filter((p) => p.reportType === typeFilter);
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
  }, [properties, filter, dashboardFilter, permitFilter, search, sortKey, cityFilter, typeFilter]);

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

  return (
    <>
      {/* Dashboard filter banner */}
      {dashboardFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest/5 border border-forest/20 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-forest">{DASHBOARD_FILTER_LABELS[dashboardFilter]}</span>
          </span>
          <button
            onClick={() => setDashboardFilter(null)}
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      )}

      {/* Permit filter banner */}
      {permitFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest/5 border border-forest/20 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-forest">{PERMIT_FILTER_LABELS[permitFilter]}</span>
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
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
          >
            {sortOptions.find((s) => s.key === sortKey)?.label}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-1 bg-neutral-50 border rounded-md shadow-lg z-10 py-1 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setShowSort(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-100",
                    sortKey === opt.key
                      ? "text-forest font-medium"
                      : "text-neutral-600"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* City & Type Filters */}
      {(uniqueCities.length > 1 || uniqueTypes.length > 1) && (
        <div className="flex flex-wrap gap-2">
          {uniqueCities.length > 1 && (
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-md border bg-neutral-50 text-neutral-700 hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-forest-light"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
          {uniqueTypes.length > 1 && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-md border bg-neutral-50 text-neutral-700 hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-forest-light"
            >
              <option value="all">All Report Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{formatReportType(type)}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              filter === f.key
                ? "bg-forest text-white"
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
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
            <div className="rounded-full bg-neutral-100 p-4 mb-4">
              <MapPin className="h-8 w-8 text-neutral-400" />
            </div>
            <p className="text-sm font-medium text-neutral-900">
              {properties.length === 0
                ? "No properties yet"
                : "No properties match your search"}
            </p>
            {properties.length === 0 && (
              <>
                <p className="mt-1 text-sm text-neutral-500">
                  Add your first property to start pinning trees on the
                  satellite map and generating AI-assisted reports.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
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
              <div key={property.id} className="group relative">
                <Link
                  href={`/properties/${property.id}`}
                  className="block"
                >
                  <Card className="hover:border-forest/30 hover:shadow-md transition-all duration-150 cursor-pointer">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0 hidden sm:block">
                            <div className="rounded-full bg-forest/5 p-2">
                              <MapPin className="h-5 w-5 text-forest" />
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
                              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-600">
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
                              <TreePine className="h-4 w-4 text-forest" />
                              <span className="font-mono font-medium">
                                {treeCount}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {protectedCount > 0 && (
                                <span className="flex items-center gap-1 text-xs text-forest">
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
                            <TreePine className="h-3.5 w-3.5 text-forest" />
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
                {/* Delete button — appears on hover */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePropertyId(property.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-md opacity-0 group-hover:opacity-100 sm:transition-opacity bg-neutral-50/80 hover:bg-red-50 text-muted-foreground hover:text-red-600"
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
      <AlertDialog open={!!deletePropertyId} onOpenChange={(open) => !open && setDeletePropertyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  This will permanently delete{" "}
                  <span className="font-semibold text-foreground">&ldquo;{deleteTarget?.address}&rdquo;</span> and all associated data:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>{deleteTarget?.trees.length ?? 0} tree{(deleteTarget?.trees.length ?? 0) !== 1 ? "s" : ""} and their assessments</li>
                  <li>{deleteTarget?.reports.length ?? 0} report{(deleteTarget?.reports.length ?? 0) !== 1 ? "s" : ""}</li>
                  <li>All photos and audio notes</li>
                </ul>
                <p className="font-medium text-destructive">This cannot be undone.</p>
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
