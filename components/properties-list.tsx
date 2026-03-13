"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Plus,
  Search,
  Trash2,
  ChevronRight,
  Leaf,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { getReportTypeConfig } from "@/lib/report-types";

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
  reportType?: string | null;
  permitStatus?: string | null;
  submittedAt?: string | null;
  approvedAt?: string | null;
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

interface PropertiesListProps {
  properties: PropertyItem[];
  initialFilter?: string;
  initialPermitFilter?: string;
  initialDashboardFilter?: string;
}

// ---------------------------------------------------------------------------
// Status filter config — matches dashboard pipeline stages
// ---------------------------------------------------------------------------

type StatusFilter = "all" | "draft" | "report_draft" | "certified" | "delivered";

const STATUS_FILTERS: { value: StatusFilter; label: string; color: string }[] = [
  { value: "all", label: "All", color: "#1D4E3E" },
  { value: "draft", label: "Draft", color: "#9C9C93" },
  { value: "report_draft", label: "Report Draft", color: "#3D7D68" },
  { value: "certified", label: "Certified", color: "#1D4E3E" },
  { value: "delivered", label: "Delivered", color: "#1D4E3E" },
];

function getPropertyStage(property: PropertyItem): Exclude<StatusFilter, "all"> {
  if (property.trees.length === 0) return "draft";
  const r = property.reports[0];
  if (!r) return "draft";
  if (r.status === "certified") return "certified";
  if (r.status === "draft" || r.status === "review" || r.status === "amendment_in_progress") return "report_draft";
  return "draft";
}

/** Map dashboard ?filter= values to initial status */
function dashboardFilterToStatus(filter?: string): StatusFilter {
  switch (filter) {
    case "needs-trees": return "draft";
    case "ready-to-generate": return "draft";
    case "ready-to-certify": return "report_draft";
    default: return "all";
  }
}

/** Map legacy ?status= values */
function legacyFilterToStatus(filter?: string): StatusFilter {
  switch (filter) {
    case "inProgress": return "draft";
    case "draft": return "report_draft";
    case "certified": return "certified";
    default: return "all";
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PERMIT_STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  approved_with_conditions: "Approved w/ Conditions",
  denied: "Denied",
  revision_requested: "Revision Requested",
};

function formatPermitLine(report: PropertyReport): string | null {
  const ps = report.permitStatus;
  if (!ps || report.status !== "certified") return null;
  const label = PERMIT_STATUS_LABELS[ps] ?? ps;
  const date = report.approvedAt ?? report.submittedAt;
  if (date) {
    const d = new Date(date);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `Permit: ${label} · ${formatted}`;
  }
  return `Permit: ${label}`;
}

// ---------------------------------------------------------------------------
// Permit filter labels (for ?permitStatus= from older links)
// ---------------------------------------------------------------------------

const PERMIT_FILTER_LABELS: Record<string, string> = {
  pending: "Pending Submission",
  submitted: "Submitted / Under Review",
  approved: "Approved",
  revision: "Needing Revision",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertiesList({
  properties: initialProperties,
  initialFilter,
  initialPermitFilter,
  initialDashboardFilter,
}: PropertiesListProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);

  // Determine initial status filter from query params
  const initialStatus = initialDashboardFilter
    ? dashboardFilterToStatus(initialDashboardFilter)
    : initialFilter
      ? legacyFilterToStatus(initialFilter)
      : "all";

  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatus);

  // Secondary filters from dashboard
  const [awaitingPaymentFilter, setAwaitingPaymentFilter] = useState(
    initialDashboardFilter === "awaiting-payment"
  );
  const [mitigationDueFilter, setMitigationDueFilter] = useState(
    initialDashboardFilter === "mitigation-due"
  );
  const [permitFilter, setPermitFilter] = useState<string | null>(
    initialPermitFilter && Object.keys(PERMIT_FILTER_LABELS).includes(initialPermitFilter)
      ? initialPermitFilter
      : null
  );

  const [search, setSearch] = useState("");
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Compute status counts
  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: properties.length,
      draft: 0,
      report_draft: 0,
      certified: 0,
      delivered: 0,
    };
    for (const p of properties) {
      counts[getPropertyStage(p)]++;
    }
    return counts;
  }, [properties]);

  // Filter + search
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Awaiting payment secondary filter
    if (awaitingPaymentFilter) {
      result = result.filter((p) => {
        const r = p.reports[0];
        return r && r.billingIncluded && (r.billingAmount ?? 0) > 0 && !r.billingPaidAt;
      });
    }

    // Mitigation deadline filter
    if (mitigationDueFilter) {
      const now = new Date();
      const thirtyDaysOut = new Date();
      thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30);
      result = result.filter((p) => {
        const r = p.reports[0] as PropertyReport & { permitExpiresAt?: string | null } | undefined;
        if (!r?.permitExpiresAt) return false;
        const exp = new Date(r.permitExpiresAt);
        return exp > now && exp <= thirtyDaysOut;
      });
    }

    // Permit filter
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

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => getPropertyStage(p) === statusFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    // Sort most recent first
    return [...result].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [properties, statusFilter, awaitingPaymentFilter, mitigationDueFilter, permitFilter, search]);

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

  const showingEmpty = filteredProperties.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Properties
          </p>
          <h1 className="text-2xl md:text-3xl tracking-tight">
            {properties.length} {properties.length === 1 ? "Property" : "Properties"}
          </h1>
        </div>
        <Link
          href="/properties/new"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#1D4E3E] hover:bg-[#2A6B55] text-white active:scale-[0.98] transition-all"
        >
          <Plus className="h-4 w-4" />
          New Property
        </Link>
      </div>

      {/* Secondary filter banners */}
      {awaitingPaymentFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1D4E3E]/5 border border-[#1D4E3E]/20 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-[#1D4E3E]">Awaiting Payment</span>
          </span>
          <button
            onClick={() => setAwaitingPaymentFilter(false)}
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      )}

      {mitigationDueFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-200 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-orange-700">Mitigation Deadlines (next 30 days)</span>
          </span>
          <button
            onClick={() => setMitigationDueFilter(false)}
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      )}

      {permitFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1D4E3E]/5 border border-[#1D4E3E]/20 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-[#1D4E3E]">{PERMIT_FILTER_LABELS[permitFilter]}</span>
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

      {/* Search + Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search address or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUS_FILTERS.map((s) => {
            const isActive = statusFilter === s.value;
            const count = statusCounts[s.value];
            return (
              <button
                key={s.value}
                onClick={() => {
                  setStatusFilter(s.value);
                  if (awaitingPaymentFilter) setAwaitingPaymentFilter(false);
                  if (mitigationDueFilter) setMitigationDueFilter(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-white"
                    : "bg-secondary text-muted-foreground hover:bg-accent"
                }`}
                style={isActive ? { backgroundColor: s.color } : undefined}
              >
                {s.label}
                {count > 0 && (
                  <span className={`ml-1.5 ${isActive ? "opacity-80" : ""}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property List */}
      {showingEmpty ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-10 w-10 rounded-full bg-[#1D4E3E]/10 flex items-center justify-center mb-3">
              {search || statusFilter !== "all" ? (
                <Search className="h-5 w-5 text-[#1D4E3E]" />
              ) : (
                <Leaf className="h-5 w-5 text-[#1D4E3E]" />
              )}
            </div>
            <p className="text-sm font-medium mb-1">
              {search
                ? "No matching properties"
                : statusFilter !== "all"
                  ? `No ${STATUS_FILTERS.find(s => s.value === statusFilter)?.label.toLowerCase()} properties`
                  : "No properties yet"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {search || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Create your first property to get started."}
            </p>
            {!search && statusFilter === "all" && properties.length === 0 && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-1.5"
              >
                <Link href="/properties/new">
                  <Plus className="h-3.5 w-3.5" /> Create Property
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-1">
          {filteredProperties.map((property) => {
            const stage = getPropertyStage(property);
            const stageConfig = STATUS_FILTERS.find((s) => s.value === stage);
            const treeCount = property.trees.length;
            const rtc = property.reportType
              ? getReportTypeConfig(property.reportType)
              : null;
            const permitLine = property.reports[0]
              ? formatPermitLine(property.reports[0])
              : null;

            return (
              <div key={property.id} className="group relative">
                <button
                  onClick={() => router.push(`/properties/${property.id}`)}
                  className="w-full flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors text-left group"
                >
                  {/* Status dot */}
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: stageConfig?.color }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-[#1D4E3E] transition-colors">
                      {property.address}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {property.city && `${property.city} · `}
                      {rtc?.label || formatReportType(property.reportType)}
                      {treeCount > 0 && ` · ${treeCount} tree${treeCount !== 1 ? "s" : ""}`}
                    </p>
                    {permitLine && (
                      <p className="text-xs text-teal-700 mt-0.5 truncate">
                        {permitLine}
                      </p>
                    )}
                  </div>

                  {/* Status badge + time + chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true })}
                    </span>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 hidden sm:block"
                      style={{
                        color: stageConfig?.color,
                        backgroundColor: `${stageConfig?.color}15`,
                      }}
                    >
                      {stageConfig?.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-[#1D4E3E] transition-colors shrink-0" />
                  </div>
                </button>

                {/* Delete button — hover on desktop */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePropertyId(property.id);
                  }}
                  className="absolute top-1/2 -translate-y-1/2 right-14 z-10 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-50/80 hover:bg-red-50 text-muted-foreground hover:text-red-600"
                  title="Delete property"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile FAB */}
      <Link
        href="/properties/new"
        className="fixed bottom-20 right-6 z-40 sm:hidden flex h-14 w-14 items-center justify-center rounded-full bg-[#1D4E3E] text-white shadow-lg hover:bg-[#2A6B55] active:scale-[0.98] transition-all"
        aria-label="New Property"
      >
        <Plus className="h-6 w-6" />
      </Link>

      {/* Delete confirmation dialog */}
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatReportType(reportType: string) {
  return reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
