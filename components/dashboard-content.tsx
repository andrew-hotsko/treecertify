"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import {
  MapPin,
  TreePine,
  Clock,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Plus,
  Send,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  ClipboardList,
  FileText,
  Award,
  Home,
  Smartphone,
  Search,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DashboardTree {
  id: string;
  isProtected: boolean;
}

interface DashboardReport {
  id: string;
  status: string;
  permitStatus: string | null;
}

interface DashboardProperty {
  id: string;
  address: string;
  city: string;
  county: string;
  reportType: string;
  neededByDate: string | null;
  updatedAt: string;
  trees: DashboardTree[];
  reports: DashboardReport[];
}

interface ActivityItem {
  id: string;
  address: string;
  city: string;
  updatedAt: string;
  treeCount: number;
  reportStatus: string | null;
  certifiedAt: string | null;
}

interface PermitStats {
  pendingSubmission: number;
  submittedOrReview: number;
  approved: number;
  needingRevision: number;
}

interface NextActions {
  needTreeAssessment: number;
  needReport: number;
  readyToCertify: number;
}

type WelcomeState = "no_properties" | "no_trees" | "no_reports" | "normal";

interface BillingStats {
  count: number;
  total: number;
}

interface DashboardContentProps {
  properties: DashboardProperty[];
  totalTrees: number;
  activityFeed?: ActivityItem[];
  permitStats?: PermitStats;
  nextActions?: NextActions;
  treesThisWeek?: number;
  treesLastWeek?: number;
  welcomeState?: WelcomeState;
  billingStats?: BillingStats | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type PipelineStage = "assessing" | "draft" | "certified" | "all";

function getWorkflowStage(property: DashboardProperty): PipelineStage {
  const latestReport = property.reports[0];
  if (!latestReport || property.trees.length === 0) return "assessing";
  if (latestReport.status === "certified") return "certified";
  return "draft";
}

function getWorkflowBadge(property: DashboardProperty) {
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

function getActivityDescription(item: ActivityItem): string {
  if (item.certifiedAt) return "Report certified";
  if (item.reportStatus === "draft" || item.reportStatus === "review")
    return "Report drafted";
  if (item.treeCount > 0)
    return `${item.treeCount} tree${item.treeCount !== 1 ? "s" : ""} assessed`;
  return "Property created";
}

// ---------------------------------------------------------------------------
// Welcome Card
// ---------------------------------------------------------------------------

const WELCOME_CONFIG: Record<
  Exclude<WelcomeState, "normal">,
  { icon: typeof MapPin; title: string; description: string; href: string; cta: string }
> = {
  no_properties: {
    icon: MapPin,
    title: "Create your first property",
    description:
      "Get started by adding a property address and pinning trees on the map.",
    href: "/properties/new",
    cta: "New Property",
  },
  no_trees: {
    icon: TreePine,
    title: "Add tree assessments",
    description:
      "Open a property and pin trees on the map to begin your assessment.",
    href: "/properties",
    cta: "View Properties",
  },
  no_reports: {
    icon: FileText,
    title: "Ready to generate your first report?",
    description:
      "Your trees are assessed. Generate an AI-powered arborist report.",
    href: "/properties",
    cta: "View Properties",
  },
};

function WelcomeCard({ state }: { state: Exclude<WelcomeState, "normal"> }) {
  const config = WELCOME_CONFIG[state];
  const Icon = config.icon;

  return (
    <div className="rounded-xl border-2 border-dashed border-forest/20 bg-gradient-to-br from-forest/5 to-transparent p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
        <Icon className="h-7 w-7 text-forest" />
      </div>
      <h3 className="text-lg font-semibold font-display text-foreground">
        {config.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
        {config.description}
      </p>
      <Button
        asChild
        className="mt-5 bg-forest hover:bg-forest-light"
      >
        <Link href={config.href}>
          <Plus className="mr-2 h-4 w-4" />
          {config.cta}
        </Link>
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pipeline Bar — clickable horizontal status segments
// ---------------------------------------------------------------------------

interface PipelineBarProps {
  counts: {
    assessing: number;
    draft: number;
    certified: number;
    all: number;
  };
  activeStage: PipelineStage;
  onStageChange: (stage: PipelineStage) => void;
  totalTrees: number;
  treesThisWeek?: number;
  treesLastWeek?: number;
}

const PIPELINE_STAGES: { key: PipelineStage; label: string; icon: typeof Clock; accent: string; bg: string }[] = [
  { key: "assessing", label: "In Progress", icon: Clock, accent: "text-amber-600", bg: "bg-amber-50" },
  { key: "draft", label: "Ready to Certify", icon: FileCheck, accent: "text-blue-600", bg: "bg-blue-50" },
  { key: "certified", label: "Certified", icon: ShieldCheck, accent: "text-forest", bg: "bg-forest/5" },
];

function PipelineBar({ counts, activeStage, onStageChange, totalTrees, treesThisWeek, treesLastWeek }: PipelineBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PIPELINE_STAGES.map((stage) => {
        const Icon = stage.icon;
        const isActive = activeStage === stage.key;
        return (
          <button
            key={stage.key}
            onClick={() => onStageChange(isActive ? "all" : stage.key)}
            className={cn(
              "relative flex flex-col items-start gap-1 rounded-xl p-4 text-left transition-all",
              isActive
                ? "ring-2 ring-forest bg-card shadow-sm"
                : "bg-card hover:shadow-sm hover:ring-1 hover:ring-border"
            )}
          >
            <div className="flex items-center gap-2 w-full">
              <div className={cn("rounded-lg p-1.5", stage.bg)}>
                <Icon className={cn("h-4 w-4", stage.accent)} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {stage.label}
              </span>
            </div>
            <span className="text-2xl font-semibold font-mono text-foreground pl-0.5">
              {counts[stage.key]}
            </span>
          </button>
        );
      })}

      {/* Trees Assessed summary card */}
      <div className="flex flex-col items-start gap-1 rounded-xl bg-card p-4">
        <div className="flex items-center gap-2 w-full">
          <div className="rounded-lg p-1.5 bg-forest/5">
            <TreePine className="h-4 w-4 text-forest" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Trees Assessed
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold font-mono text-foreground pl-0.5">
            {totalTrees.toLocaleString()}
          </span>
          {treesThisWeek != null && (
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              {treesThisWeek > (treesLastWeek ?? 0) ? (
                <TrendingUp className="h-3 w-3 text-forest-light" />
              ) : treesThisWeek < (treesLastWeek ?? 0) ? (
                <TrendingDown className="h-3 w-3 text-amber-500" />
              ) : (
                <Minus className="h-3 w-3 text-muted-foreground" />
              )}
              {treesThisWeek}/wk
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Next Action Card
// ---------------------------------------------------------------------------

function NextActionCard({
  nextActions,
  properties,
}: {
  nextActions: NextActions;
  properties: DashboardProperty[];
}) {
  const total =
    nextActions.needTreeAssessment +
    nextActions.needReport +
    nextActions.readyToCertify;
  if (total === 0) return null;

  const certifiableProperties = properties.filter(
    (p) =>
      p.reports[0] &&
      (p.reports[0].status === "draft" || p.reports[0].status === "review")
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold font-display text-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Next Action Needed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {nextActions.needTreeAssessment > 0 && (
          <Link
            href="/properties?status=inProgress"
            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-foreground">
                <span className="font-semibold">{nextActions.needTreeAssessment}</span>{" "}
                propert{nextActions.needTreeAssessment !== 1 ? "ies" : "y"} need
                tree assessment
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
        {nextActions.needReport > 0 && (
          <Link
            href="/properties?status=inProgress"
            className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-foreground">
                <span className="font-semibold">{nextActions.needReport}</span>{" "}
                propert{nextActions.needReport !== 1 ? "ies" : "y"} need a report
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
        {nextActions.readyToCertify > 0 && (
          <>
            {certifiableProperties.length <= 3 ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 pt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Award className="h-3.5 w-3.5 text-forest" />
                  Ready to Certify
                </div>
                {certifiableProperties.map((p) => (
                  <Link
                    key={p.id}
                    href={`/properties/${p.id}/report?view=quickReview`}
                    className="flex items-center justify-between p-3 rounded-lg bg-forest/5 hover:bg-forest/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Smartphone className="h-4 w-4 text-forest shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm text-foreground truncate block font-medium">
                          {p.address}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {p.city} · {p.trees.length} tree
                          {p.trees.length !== 1 ? "s" : ""}
                          {p.reports[0]?.status === "review" && (
                            <span className="text-amber-600 ml-1">
                              · Flagged for revision
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-forest shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">
                      Quick Review
                      <ChevronRight className="inline h-3 w-3 ml-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href="/properties?status=draft"
                className="flex items-center justify-between p-3 rounded-lg bg-forest/5 hover:bg-forest/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-forest" />
                  <span className="text-sm text-foreground">
                    <span className="font-semibold">
                      {nextActions.readyToCertify}
                    </span>{" "}
                    report{nextActions.readyToCertify !== 1 ? "s" : ""} ready to
                    certify
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-forest group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Property Card (grid item)
// ---------------------------------------------------------------------------

function PropertyCard({ property }: { property: DashboardProperty }) {
  const treeCount = property.trees.length;
  const protectedCount = property.trees.filter((t) => t.isProtected).length;
  const workflow = getWorkflowBadge(property);
  const dueIndicator = getDueIndicator(property.neededByDate);
  const isRealEstate = property.reportType === "real_estate_package";

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block rounded-xl bg-card border border-border p-4 transition-all hover:shadow-sm hover:border-forest/20"
    >
      {/* Top row: icon + address + badge */}
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
            <p className="font-display font-medium text-foreground truncate">
              {property.address}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {property.city}
              {property.county ? `, ${property.county} County` : ""}
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

      {/* Bottom row: tree count, report type, date, due indicator */}
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
  );
}

// ---------------------------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------------------------

export function DashboardContent({
  properties,
  totalTrees,
  activityFeed,
  permitStats,
  nextActions,
  treesThisWeek,
  treesLastWeek,
  welcomeState = "normal",
  billingStats,
}: DashboardContentProps) {
  const [activeStage, setActiveStage] = useState<PipelineStage>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute pipeline counts
  const pipelineCounts = useMemo(() => {
    const counts = { assessing: 0, draft: 0, certified: 0, all: properties.length };
    for (const p of properties) {
      const stage = getWorkflowStage(p);
      if (stage !== "all") counts[stage]++;
    }
    return counts;
  }, [properties]);

  // Filter properties by pipeline stage + search query
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Stage filter
    if (activeStage !== "all") {
      result = result.filter((p) => getWorkflowStage(p) === activeStage);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.county && p.county.toLowerCase().includes(q))
      );
    }

    return result;
  }, [properties, activeStage, searchQuery]);

  const hasPermitPipeline =
    permitStats &&
    permitStats.pendingSubmission +
      permitStats.submittedOrReview +
      permitStats.approved +
      permitStats.needingRevision >
      0;

  return (
    <>
      {/* Welcome Card for new/returning users */}
      {welcomeState !== "normal" && <WelcomeCard state={welcomeState} />}

      {/* Pipeline Bar — status overview at a glance */}
      <PipelineBar
        counts={pipelineCounts}
        activeStage={activeStage}
        onStageChange={setActiveStage}
        totalTrees={totalTrees}
        treesThisWeek={treesThisWeek}
        treesLastWeek={treesLastWeek}
      />

      {/* Two-column layout: main + sidebar on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Action Needed */}
          {nextActions && (
            <NextActionCard nextActions={nextActions} properties={properties} />
          )}

          {/* Properties section with search */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold font-display text-foreground">
                Properties
                {activeStage !== "all" && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredProperties.length} of {properties.length})
                  </span>
                )}
              </h2>
              <Button variant="ghost" size="sm" asChild className="text-forest hover:text-forest">
                <Link href="/properties">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Search bar */}
            {properties.length > 3 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by address or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Active filter indicator */}
            {activeStage !== "all" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Filtered by:</span>
                <button
                  onClick={() => setActiveStage("all")}
                  className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-xs font-medium text-forest hover:bg-forest/20 transition-colors"
                >
                  {PIPELINE_STAGES.find((s) => s.key === activeStage)?.label}
                  <span className="ml-0.5">&times;</span>
                </button>
              </div>
            )}

            {/* Property grid */}
            {filteredProperties.length === 0 ? (
              <EmptyState
                icon={MapPin}
                title={
                  searchQuery
                    ? "No matching properties"
                    : activeStage !== "all"
                      ? "No properties in this stage"
                      : "No properties yet"
                }
                description={
                  searchQuery
                    ? "Try a different search term."
                    : activeStage !== "all"
                      ? "Properties will appear here as they move through your workflow."
                      : "Start by adding your first property and pinning trees on the map."
                }
                action={
                  !searchQuery && activeStage === "all" ? (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Permit Pipeline */}
          {hasPermitPipeline && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold font-display text-foreground">
                  Permit Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    count: permitStats.pendingSubmission,
                    label: "Pending Submission",
                    param: "pending",
                    icon: Send,
                    iconColor: "text-muted-foreground",
                    bg: "bg-muted",
                  },
                  {
                    count: permitStats.submittedOrReview,
                    label: "Under Review",
                    param: "submitted",
                    icon: Clock,
                    iconColor: "text-amber-600",
                    bg: "bg-amber-50",
                  },
                  {
                    count: permitStats.approved,
                    label: "Approved",
                    param: "approved",
                    icon: ShieldCheck,
                    iconColor: "text-forest",
                    bg: "bg-forest/5",
                  },
                  {
                    count: permitStats.needingRevision,
                    label: "Needs Revision",
                    param: "revision",
                    icon: AlertTriangle,
                    iconColor: "text-red-500",
                    bg: "bg-red-50",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const inner = (
                    <div
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-lg transition-colors",
                        item.count > 0 ? "hover:bg-muted" : "opacity-40"
                      )}
                    >
                      <div className={cn("rounded-md p-1.5", item.bg)}>
                        <Icon className={cn("h-3.5 w-3.5", item.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {item.count}
                      </span>
                    </div>
                  );
                  if (item.count > 0) {
                    return (
                      <Link
                        key={item.param}
                        href={`/properties?permitStatus=${item.param}`}
                      >
                        {inner}
                      </Link>
                    );
                  }
                  return <div key={item.param}>{inner}</div>;
                })}
              </CardContent>
            </Card>
          )}

          {/* Outstanding Payments */}
          {billingStats && (
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {billingStats.count} outstanding{" "}
                    {billingStats.count === 1 ? "payment" : "payments"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    $
                    {billingStats.total.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    unpaid
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          {activityFeed && activityFeed.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold font-display text-foreground">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {activityFeed.map((item) => (
                    <Link
                      key={item.id}
                      href={`/properties/${item.id}`}
                      className="flex items-center gap-3 text-sm hover:bg-muted rounded-lg p-2 -mx-2 transition-colors"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/5">
                        {item.certifiedAt ? (
                          <ShieldCheck className="h-3 w-3 text-forest" />
                        ) : (
                          <Clock className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-sm">
                          {item.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getActivityDescription(item)}
                        </p>
                      </div>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(item.updatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sample property CTA for very new users */}
          {properties.length > 0 && properties.length <= 1 && (
            <div className="text-center py-4 text-sm text-muted-foreground rounded-lg border border-dashed border-border p-4">
              <p>
                The sample property shows what a completed assessment looks like.
              </p>
              <p className="mt-1">
                <Link
                  href="/properties/new"
                  className="text-forest font-medium hover:underline"
                >
                  Create your first property &rarr;
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating New Property button — mobile only */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <Button
          asChild
          size="lg"
          className="bg-forest hover:bg-forest-light shadow-lg rounded-full h-14 w-14 p-0"
        >
          <Link href="/properties/new" aria-label="New Property">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </>
  );
}
