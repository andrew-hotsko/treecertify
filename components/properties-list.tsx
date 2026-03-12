"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
  Plus,
  TreePine,
  Search,
  Trash2,
  X,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
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
// Tab system
// ---------------------------------------------------------------------------

type Tab = "all" | "needsTrees" | "inProgress" | "ready" | "certified";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "needsTrees", label: "Needs Trees" },
  { key: "inProgress", label: "In Progress" },
  { key: "ready", label: "Ready" },
  { key: "certified", label: "Certified" },
];

function getTabCategory(property: PropertyItem): Exclude<Tab, "all"> {
  if (property.trees.length === 0) return "needsTrees";
  const r = property.reports[0];
  if (!r) return "inProgress";
  if (r.status === "certified") return "certified";
  return "ready"; // draft, review, amendment_in_progress
}

/** Map dashboard ?filter= values to initial tab */
function dashboardFilterToTab(filter?: string): Tab {
  switch (filter) {
    case "needs-trees": return "needsTrees";
    case "ready-to-generate": return "inProgress";
    case "ready-to-certify": return "ready";
    default: return "all";
  }
}

/** Map legacy ?status= values to tab */
function legacyFilterToTab(filter?: string): Tab {
  switch (filter) {
    case "inProgress": return "inProgress";
    case "draft": return "ready";
    case "certified": return "certified";
    default: return "all";
  }
}

// ---------------------------------------------------------------------------
// Card helpers
// ---------------------------------------------------------------------------

const STATUS_DOT: Record<Exclude<Tab, "all">, string> = {
  needsTrees: "bg-amber-400",
  inProgress: "bg-blue-400",
  ready: "bg-forest",
  certified: "bg-emerald-500",
};

const STATUS_LABEL: Record<Exclude<Tab, "all">, string> = {
  needsTrees: "Needs Trees",
  inProgress: "In Progress",
  ready: "Ready",
  certified: "Certified",
};

function formatReportType(reportType: string) {
  return reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const PERMIT_STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  approved_with_conditions: "Approved w/ Conditions",
  denied: "Denied",
  revision_requested: "Revision Requested",
};

function formatPermitStatus(report: PropertyReport): string | null {
  const ps = report.permitStatus;
  if (!ps || report.status !== "certified") return null;
  const label = PERMIT_STATUS_LABELS[ps] ?? ps;
  const date = report.approvedAt ?? report.submittedAt;
  if (date) {
    const d = new Date(date);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `Permit: ${label} \u00b7 ${formatted}`;
  }
  return `Permit: ${label}`;
}

// ---------------------------------------------------------------------------
// Empty state messages per tab
// ---------------------------------------------------------------------------

const EMPTY_STATES: Record<Tab, { title: string; subtitle?: string }> = {
  all: { title: "No properties yet", subtitle: "Create your first property to get started." },
  needsTrees: { title: "All properties have trees assessed", subtitle: "Nice work." },
  inProgress: { title: "No reports in progress" },
  ready: { title: "No reports awaiting certification" },
  certified: { title: "No certified reports yet" },
};

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
  const [properties, setProperties] = useState(initialProperties);

  // Determine initial tab from query params (dashboard filter takes priority)
  const initialTab = initialDashboardFilter
    ? dashboardFilterToTab(initialDashboardFilter)
    : initialFilter
      ? legacyFilterToTab(initialFilter)
      : "all";

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // awaiting-payment and mitigation-due don't map to tabs — show as secondary banners
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

  // Compute tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<Tab, number> = {
      all: properties.length,
      needsTrees: 0,
      inProgress: 0,
      ready: 0,
      certified: 0,
    };
    for (const p of properties) {
      counts[getTabCategory(p)]++;
    }
    return counts;
  }, [properties]);

  // Filter + search (always sorted by most recent first)
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Awaiting payment secondary filter
    if (awaitingPaymentFilter) {
      result = result.filter((p) => {
        const r = p.reports[0];
        return r && r.billingIncluded && (r.billingAmount ?? 0) > 0 && !r.billingPaidAt;
      });
    }

    // Mitigation deadline filter (permits expiring within 30 days)
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

    // Permit filter (from older ?permitStatus= links)
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

    // Tab filter
    if (activeTab !== "all") {
      result = result.filter((p) => getTabCategory(p) === activeTab);
    }

    // Search within active tab
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    // Fixed sort: most recent first
    result = [...result].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return result;
  }, [properties, activeTab, awaitingPaymentFilter, mitigationDueFilter, permitFilter, search]);

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
  const emptyState = search.trim()
    ? { title: "No properties match your search" }
    : EMPTY_STATES[activeTab];

  return (
    <div className="space-y-4">
      {/* Awaiting payment banner */}
      {awaitingPaymentFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest/5 border border-forest/20 text-sm">
          <span className="text-neutral-700">
            Showing: <span className="font-semibold text-forest">Awaiting Payment</span>
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

      {/* Mitigation deadline banner */}
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

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none border-b border-neutral-200 -mx-1 px-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                // Clear secondary filters when switching tabs
                if (awaitingPaymentFilter) setAwaitingPaymentFilter(false);
                if (mitigationDueFilter) setMitigationDueFilter(false);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors shrink-0",
                isActive
                  ? "border-forest text-forest"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-neutral-300"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "text-xs tabular-nums px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-forest/10 text-forest"
                    : "bg-neutral-100 text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Property list or empty state */}
      {showingEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-foreground">{emptyState.title}</p>
          {emptyState.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{emptyState.subtitle}</p>
          )}
          {activeTab === "all" && properties.length === 0 && (
            <Button
              asChild
              size="sm"
              className="mt-4 bg-forest hover:bg-forest-light"
            >
              <Link href="/properties/new">
                <Plus className="mr-2 h-4 w-4" />
                New Property
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProperties.map((property) => {
            const treeCount = property.trees.length;
            const category = getTabCategory(property);
            const dotColor = STATUS_DOT[category];
            const statusLabel = STATUS_LABEL[category];

            return (
              <div key={property.id} className="group relative">
                <Link
                  href={`/properties/${property.id}`}
                  className="block rounded-lg border bg-card p-4 hover:border-forest/30 hover:shadow-md transition-all"
                >
                  {/* Row 1: Address + City */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {property.address}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {property.city}
                    </span>
                  </div>

                  {/* Row 2: Report type · trees · status dot */}
                  <div className="flex items-center justify-between gap-3 mt-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                      <span className="truncate">
                        {formatReportType(property.reportType)}
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <TreePine className="h-3 w-3" />
                        {treeCount} tree{treeCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={cn("h-2 w-2 rounded-full", dotColor)} />
                      <span className="text-xs font-medium text-muted-foreground">
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Permit status (certified cards with active permit only) */}
                  {property.reports[0] && formatPermitStatus(property.reports[0]) && (
                    <p className="text-xs text-teal-700 mt-1.5">
                      {formatPermitStatus(property.reports[0])}
                    </p>
                  )}

                  {/* Row 4: Timestamp + chevron */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {category === "certified" && property.reports[0]?.status === "certified"
                        ? `Certified ${formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true })}`
                        : `Updated ${formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true })}`}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>

                {/* Delete button — hover on desktop */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePropertyId(property.id);
                  }}
                  className="absolute top-3 right-12 z-10 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-50/80 hover:bg-red-50 text-muted-foreground hover:text-red-600"
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
        className="fixed bottom-20 right-6 z-40 sm:hidden flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-lg hover:bg-forest-light active:scale-[0.98] transition-all"
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
