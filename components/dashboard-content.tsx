"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface DashboardContentProps {
  properties: DashboardProperty[];
  totalTrees: number;
  activityFeed?: ActivityItem[];
  permitStats?: PermitStats;
  nextActions?: NextActions;
  treesThisWeek?: number;
  treesLastWeek?: number;
  welcomeState?: WelcomeState;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";

function getWorkflowStatus(property: DashboardProperty) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", color: "bg-neutral-200 text-neutral-600" };
  if (!latestReport)
    return { label: "Assessing", color: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", color: "bg-forest/10 text-forest" };
  return { label: "Draft", color: "bg-blue-100 text-blue-700" };
}

function getFilterCategory(property: DashboardProperty): FilterStatus {
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

function getActivityDescription(item: ActivityItem): string {
  if (item.certifiedAt) {
    return "Report certified";
  }
  if (item.reportStatus === "draft" || item.reportStatus === "review") {
    return "Report drafted";
  }
  if (item.treeCount > 0) {
    return `${item.treeCount} tree${item.treeCount !== 1 ? "s" : ""} assessed`;
  }
  return "Property created";
}

const WELCOME_CONFIG: Record<
  Exclude<WelcomeState, "normal">,
  { icon: typeof MapPin; title: string; description: string; href: string; cta: string }
> = {
  no_properties: {
    icon: MapPin,
    title: "Create your first property",
    description: "Get started by adding a property address and pinning trees on the map.",
    href: "/properties/new",
    cta: "New Property",
  },
  no_trees: {
    icon: TreePine,
    title: "Add tree assessments",
    description: "Open a property and pin trees on the map to begin your assessment.",
    href: "/properties",
    cta: "View Properties",
  },
  no_reports: {
    icon: FileText,
    title: "Ready to generate your first report?",
    description: "Your trees are assessed. Generate an AI-powered arborist report.",
    href: "/properties",
    cta: "View Properties",
  },
};

function WelcomeCard({ state }: { state: Exclude<WelcomeState, "normal"> }) {
  const config = WELCOME_CONFIG[state];
  const Icon = config.icon;

  return (
    <div className="rounded-xl border-2 border-dashed border-forest/20 bg-gradient-to-br from-forest/5 to-neutral-50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
        <Icon className="h-7 w-7 text-forest" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{config.title}</h3>
      <p className="mt-1 text-sm text-neutral-500 max-w-sm mx-auto">
        {config.description}
      </p>
      <Button
        asChild
        className="mt-5 bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
      >
        <Link href={config.href}>
          <Plus className="mr-2 h-4 w-4" />
          {config.cta}
        </Link>
      </Button>
    </div>
  );
}

export function DashboardContent({
  properties,
  totalTrees,
  activityFeed,
  permitStats,
  nextActions,
  treesThisWeek,
  treesLastWeek,
  welcomeState = "normal",
}: DashboardContentProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Compute counts
  const counts = {
    all: properties.length,
    inProgress: properties.filter((p) => getFilterCategory(p) === "inProgress")
      .length,
    draft: properties.filter((p) => getFilterCategory(p) === "draft").length,
    certified: properties.filter((p) => getFilterCategory(p) === "certified")
      .length,
  };

  // Filter properties
  const filtered =
    filter === "all"
      ? properties
      : properties.filter((p) => getFilterCategory(p) === filter);

  const stats = [
    {
      title: "In Progress",
      value: counts.inProgress,
      icon: Clock,
      accent: "text-amber-600",
      bg: "bg-amber-50",
      filterKey: "inProgress" as FilterStatus,
    },
    {
      title: "Ready to Certify",
      value: counts.draft,
      icon: FileCheck,
      accent: "text-blue-600",
      bg: "bg-blue-50",
      filterKey: "draft" as FilterStatus,
    },
    {
      title: "Certified",
      value: counts.certified,
      icon: ShieldCheck,
      accent: "text-forest",
      bg: "bg-forest/5",
      filterKey: "certified" as FilterStatus,
    },
    {
      title: "Trees Assessed",
      value: totalTrees,
      icon: TreePine,
      accent: "text-forest",
      bg: "bg-forest/5",
      filterKey: null,
    },
  ];

  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "inProgress", label: `In Progress (${counts.inProgress})` },
    { key: "draft", label: `Draft (${counts.draft})` },
    { key: "certified", label: `Certified (${counts.certified})` },
  ];

  return (
    <>
      {/* Welcome Card for new/returning users */}
      {welcomeState !== "normal" && <WelcomeCard state={welcomeState} />}

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isClickable = stat.filterKey !== null;
          const cardContent = (
            <Card
              key={stat.title}
              className={cn(
                "transition-all",
                isClickable && "hover:shadow-md hover:border-neutral-300"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-neutral-900">
                  {stat.value.toLocaleString()}
                </div>
                {stat.title === "Trees Assessed" && treesThisWeek != null && (
                  <div className="flex items-center gap-1 mt-1">
                    {treesThisWeek > (treesLastWeek ?? 0) ? (
                      <TrendingUp className="h-3 w-3 text-forest-light" />
                    ) : treesThisWeek < (treesLastWeek ?? 0) ? (
                      <TrendingDown className="h-3 w-3 text-amber-500" />
                    ) : (
                      <Minus className="h-3 w-3 text-neutral-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {treesThisWeek} this week
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );

          if (isClickable) {
            return (
              <Link key={stat.title} href={`/properties?status=${stat.filterKey}`}>
                {cardContent}
              </Link>
            );
          }
          return <div key={stat.title}>{cardContent}</div>;
        })}
      </div>

      {/* Next Action Needed */}
      {nextActions && (nextActions.needTreeAssessment + nextActions.needReport + nextActions.readyToCertify > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-display text-neutral-900">
              Next Action Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nextActions.needTreeAssessment > 0 && (
                <Link
                  href="/properties?status=inProgress"
                  className="flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-neutral-900">
                      {nextActions.needTreeAssessment} propert{nextActions.needTreeAssessment !== 1 ? "ies" : "y"} need tree assessment
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-amber-600" />
                </Link>
              )}
              {nextActions.needReport > 0 && (
                <Link
                  href="/properties?status=inProgress"
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-neutral-900">
                      {nextActions.needReport} propert{nextActions.needReport !== 1 ? "ies" : "y"} need a report
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </Link>
              )}
              {nextActions.readyToCertify > 0 && (
                <Link
                  href="/properties?status=draft"
                  className="flex items-center justify-between p-3 rounded-lg bg-forest/5 hover:bg-forest/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-forest" />
                    <span className="text-sm text-neutral-900">
                      {nextActions.readyToCertify} report{nextActions.readyToCertify !== 1 ? "s" : ""} ready to certify
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-forest" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permit Pipeline Card */}
      {permitStats && (permitStats.pendingSubmission + permitStats.submittedOrReview + permitStats.approved + permitStats.needingRevision > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-display text-neutral-900">
              Permit Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-100">
                <Send className="h-4 w-4 text-neutral-500" />
                <div>
                  <p className="text-2xl font-bold font-mono text-neutral-900">{permitStats.pendingSubmission}</p>
                  <p className="text-xs text-neutral-500">Pending Submission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
                <Clock className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold font-mono text-neutral-900">{permitStats.submittedOrReview}</p>
                  <p className="text-xs text-neutral-500">Submitted / Under Review</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-forest/5">
                <ShieldCheck className="h-4 w-4 text-forest" />
                <div>
                  <p className="text-2xl font-bold font-mono text-neutral-900">{permitStats.approved}</p>
                  <p className="text-xs text-neutral-500">Approved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold font-mono text-neutral-900">{permitStats.needingRevision}</p>
                  <p className="text-xs text-neutral-500">Needing Revision</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Properties Card */}
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold font-display text-neutral-900">
            Properties
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/properties"
              className="text-forest hover:text-forest"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        {/* Filter Pills */}
        <div className="px-6 pb-4">
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
        </div>

        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-neutral-100 p-3 mb-4">
                <MapPin className="h-6 w-6 text-neutral-400" />
              </div>
              <p className="text-sm font-medium text-neutral-900">
                {filter === "all" ? "No properties yet" : "No properties match this filter"}
              </p>
              {filter === "all" && (
                <>
                  <p className="mt-1 text-sm text-neutral-500">
                    Start by adding your first property and pinning trees on the
                    map.
                  </p>
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
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {filtered.map((property) => {
                const treeCount = property.trees.length;
                const protectedCount = property.trees.filter(
                  (t) => t.isProtected
                ).length;
                const workflow = getWorkflowStatus(property);
                const dueIndicator = getDueIndicator(property.neededByDate);

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-between gap-4 py-3.5 px-1 rounded-lg transition-colors hover:bg-neutral-100 -mx-1 first:pt-0"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest/5">
                        <MapPin className="h-4 w-4 text-forest" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium text-neutral-900">
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
                          <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-600 hidden sm:inline">
                            {formatReportType(property.reportType)}
                          </span>
                        </div>
                        <p className="truncate text-xs text-neutral-500">
                          {property.city}
                          {property.county ? `, ${property.county} County` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      {dueIndicator && (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded hidden sm:inline",
                            dueIndicator.className
                          )}
                        >
                          {dueIndicator.label}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <TreePine className="h-3.5 w-3.5" />
                        <span className="font-mono">{treeCount}</span>
                        {protectedCount > 0 && (
                          <span className="flex items-center gap-0.5 text-forest">
                            <ShieldCheck className="h-3 w-3" />
                            {protectedCount}
                          </span>
                        )}
                      </div>
                      <span className="hidden md:inline-block text-xs text-neutral-400">
                        {format(new Date(property.updatedAt), "MMM d, yyyy")}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full",
                          workflow.color
                        )}
                      >
                        {workflow.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {activityFeed && activityFeed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-display text-neutral-900">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <Link
                  key={item.id}
                  href={`/properties/${item.id}`}
                  className="flex items-center gap-3 text-sm hover:bg-neutral-100 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest/5">
                    {item.certifiedAt ? (
                      <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-neutral-900 truncate">{item.address}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 hidden sm:inline-flex">
                        {item.city}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{getActivityDescription(item)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA for new users with only the sample property */}
      {properties.length > 0 && properties.length <= 1 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>
            The sample property above shows what a completed assessment looks
            like.
          </p>
          <p className="mt-1">
            Ready to start?{" "}
            <Link
              href="/properties/new"
              className="text-forest font-medium hover:underline"
            >
              Create your first property &rarr;
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
