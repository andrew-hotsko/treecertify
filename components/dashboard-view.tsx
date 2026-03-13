"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  FileText,
  CheckCircle,
  Send,
  Plus,
  ArrowRight,
  AlertCircle,
  ChevronRight,
  Leaf,
  X,
} from "lucide-react";
import { getReportTypeConfig } from "@/lib/report-types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PipelineCounts {
  draft: number;
  reportDraft: number;
  certified: number;
  delivered: number;
}

interface ActionCounts {
  needsTrees: number;
  readyToGenerate: number;
  readyToCertify: number;
  awaitingPayment: number;
  awaitingPaymentTotal: number;
  permitsAwaitingReview: number;
  mitigationDeadlinesSoon: number;
}

interface Stats {
  properties: number;
  trees: number;
  reports: number;
  certified: number;
}

interface PropertyItem {
  id: string;
  address: string;
  city: string;
  reportType: string | null;
  treeCount: number;
  stage: "draft" | "report_draft" | "certified" | "delivered";
  reportStatus: string | null;
  certifiedAt: string | null;
  updatedAt: string;
}

interface DashboardViewProps {
  firstName: string;
  pipelineCounts: PipelineCounts;
  actionCounts: ActionCounts;
  stats: Stats;
  properties: PropertyItem[];
  hasProperties: boolean;
}

// ---------------------------------------------------------------------------
// Pipeline stage config
// ---------------------------------------------------------------------------

const PIPELINE_STAGES = [
  { key: "draft" as const, icon: MapPin, label: "Draft", color: "#9C9C93" },
  { key: "report_draft" as const, icon: FileText, label: "Report Draft", color: "#3D7D68" },
  { key: "certified" as const, icon: CheckCircle, label: "Certified", color: "#1D4E3E" },
  { key: "delivered" as const, icon: Send, label: "Delivered", color: "#1D4E3E" },
];

// ---------------------------------------------------------------------------
// Action item types
// ---------------------------------------------------------------------------

const ACTION_TYPE_CONFIG = {
  needs_trees: { icon: MapPin, color: "#9C9C93", label: "Assessment" },
  ready_to_generate: { icon: FileText, color: "#3D7D68", label: "Report" },
  ready_to_certify: { icon: CheckCircle, color: "#1D4E3E", label: "Certification" },
  permits_awaiting: { icon: Send, color: "#C4A35A", label: "City" },
  awaiting_payment: { icon: AlertCircle, color: "#9C9C93", label: "Billing" },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardView({
  firstName,
  pipelineCounts,
  actionCounts,
  stats,
  properties,
  hasProperties,
}: DashboardViewProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Group properties by pipeline stage
  const filteredProperties = useMemo(() => {
    if (!activeFilter) return null;
    return properties.filter((p) => p.stage === activeFilter);
  }, [activeFilter, properties]);

  // Build action items from counts
  const actionItems = useMemo(() => {
    const items: Array<{
      type: keyof typeof ACTION_TYPE_CONFIG;
      title: string;
      subtitle: string;
      href: string;
      action: string;
      priority: number;
    }> = [];

    // Properties needing trees
    const needsTreesProps = properties.filter((p) => p.stage === "draft" && p.treeCount === 0);
    for (const p of needsTreesProps) {
      items.push({
        type: "needs_trees",
        title: p.address,
        subtitle: `${p.city || "Unknown city"} · No trees assessed`,
        href: `/properties/${p.id}`,
        action: "Add trees",
        priority: 3,
      });
    }

    // Ready to generate report
    const readyToGenProps = properties.filter((p) => p.stage === "draft" && p.treeCount > 0);
    for (const p of readyToGenProps) {
      const rtc = p.reportType ? getReportTypeConfig(p.reportType) : null;
      items.push({
        type: "ready_to_generate",
        title: p.address,
        subtitle: `${p.city || "Unknown city"} · ${rtc?.label || "Report"} · ${p.treeCount} tree${p.treeCount !== 1 ? "s" : ""}`,
        href: `/properties/${p.id}/report`,
        action: "Generate report",
        priority: 2,
      });
    }

    // Ready to certify
    const certifyProps = properties.filter((p) => p.stage === "report_draft");
    for (const p of certifyProps) {
      items.push({
        type: "ready_to_certify",
        title: p.address,
        subtitle: "Report draft ready for review",
        href: `/properties/${p.id}/report`,
        action: "Review & certify",
        priority: 1,
      });
    }

    // Permits awaiting review
    if (actionCounts.permitsAwaitingReview > 0) {
      items.push({
        type: "permits_awaiting",
        title: `${actionCounts.permitsAwaitingReview} permit${actionCounts.permitsAwaitingReview !== 1 ? "s" : ""} awaiting city review`,
        subtitle: "Submitted to city, pending decision",
        href: "/properties?permitStatus=submitted",
        action: "View",
        priority: 1,
      });
    }

    return items.sort((a, b) => a.priority - b.priority);
  }, [properties, actionCounts]);

  // Stage count map
  const stageCounts: Record<string, number> = {
    draft: pipelineCounts.draft,
    report_draft: pipelineCounts.reportDraft,
    certified: pipelineCounts.certified,
    delivered: pipelineCounts.delivered,
  };

  return (
    <div className="space-y-8 max-w-6xl pb-24 sm:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl tracking-tight">
            {firstName ? `${firstName}'s Pipeline` : "Your Pipeline"}
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

      {/* Pipeline Stage Cards */}
      {hasProperties && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-card rounded-xl border border-border p-1">
          {PIPELINE_STAGES.map((stage) => {
            const count = stageCounts[stage.key] ?? 0;
            const isActive = count > 0;
            const isSelected = activeFilter === stage.key;
            const Icon = stage.icon;

            return (
              <button
                key={stage.key}
                onClick={() => {
                  if (count > 0) {
                    setActiveFilter(isSelected ? null : stage.key);
                  }
                }}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all text-center ${
                  isSelected
                    ? "bg-[#1D4E3E]/10 ring-1 ring-[#1D4E3E]/30 cursor-pointer"
                    : isActive
                      ? "bg-background hover:bg-accent cursor-pointer"
                      : "opacity-40 cursor-default"
                }`}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: stage.color }}
                />
                <span
                  className="text-xl font-mono font-semibold leading-none"
                  style={{ color: isActive ? stage.color : undefined }}
                >
                  {count}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground leading-tight">
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Filtered Property List — shown when pipeline stage is clicked */}
      {activeFilter && filteredProperties && (
        <div className="rounded-xl border border-[#1D4E3E]/20 bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1D4E3E]/5 border-b border-[#1D4E3E]/10">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono uppercase tracking-widest text-[#1D4E3E]">
                {PIPELINE_STAGES.find((s) => s.key === activeFilter)?.label}
              </span>
              <Badge variant="secondary" className="font-mono text-xs">
                {filteredProperties.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setActiveFilter(null)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          {filteredProperties.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No properties in this stage.
            </div>
          ) : (
            <ScrollArea className={filteredProperties.length > 5 ? "max-h-[320px]" : ""}>
              <div className="divide-y divide-border">
                {filteredProperties.map((prop) => {
                  const stageInfo = PIPELINE_STAGES.find((s) => s.key === prop.stage);
                  const rtc = prop.reportType ? getReportTypeConfig(prop.reportType) : null;
                  return (
                    <button
                      key={prop.id}
                      onClick={() => router.push(`/properties/${prop.id}`)}
                      className="w-full flex items-center gap-4 py-3 px-4 hover:bg-accent/50 transition-colors text-left group"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: stageInfo?.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-[#1D4E3E] transition-colors">
                          {prop.address}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {prop.city && `${prop.city} · `}
                          {rtc?.label || prop.reportType || "No report"}
                          {prop.treeCount > 0 && ` · ${prop.treeCount} tree${prop.treeCount !== 1 ? "s" : ""}`}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-[#1D4E3E] transition-colors shrink-0" />
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      )}

      {/* Action Items */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-4 w-4 text-[#1D4E3E]" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground">
            Action Items
          </h2>
          {actionItems.length > 0 && (
            <Badge variant="secondary" className="font-mono text-xs ml-1">
              {actionItems.length}
            </Badge>
          )}
        </div>

        {actionItems.length === 0 && hasProperties ? (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-full bg-[#1D4E3E]/10 flex items-center justify-center mb-3">
                <Leaf className="h-5 w-5 text-[#1D4E3E]" />
              </div>
              <p className="text-sm font-medium mb-1">No pending action items</p>
              <p className="text-xs text-muted-foreground mb-4">
                All properties are up to date.
              </p>
            </CardContent>
          </Card>
        ) : !hasProperties ? (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-full bg-[#1D4E3E]/10 flex items-center justify-center mb-3">
                <Leaf className="h-5 w-5 text-[#1D4E3E]" />
              </div>
              <p className="text-sm font-medium mb-1">No properties yet</p>
              <p className="text-xs text-muted-foreground mb-4">
                Create a property to start your first assessment.
              </p>
              <Link
                href="/properties/new"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-[#1D4E3E]/20 hover:bg-[#1D4E3E]/5 hover:border-[#1D4E3E]/40 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                New Property
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {actionItems.map((item, i) => {
              const config = ACTION_TYPE_CONFIG[item.type];
              const Icon = config.icon;
              return (
                <button
                  key={`${item.type}-${i}`}
                  onClick={() => router.push(item.href)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-[#1D4E3E]/30 hover:bg-accent/30 transition-all text-left group"
                >
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${config.color}15` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider"
                        style={{ color: config.color }}
                      >
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate group-hover:text-[#1D4E3E] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {item.action}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-[#1D4E3E] transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Separator />

      {/* All Properties */}
      {properties.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-foreground">
              All Properties
            </h2>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-[#1D4E3E] transition-colors"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-1">
            {properties.slice(0, 10).map((prop) => {
              const stageInfo = PIPELINE_STAGES.find((s) => s.key === prop.stage);
              const rtc = prop.reportType ? getReportTypeConfig(prop.reportType) : null;
              return (
                <button
                  key={prop.id}
                  onClick={() => router.push(`/properties/${prop.id}`)}
                  className="w-full flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors text-left group"
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: stageInfo?.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-[#1D4E3E] transition-colors">
                      {prop.address}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {prop.city && `${prop.city} · `}
                      {rtc?.label || prop.reportType || "No report"}
                      {prop.treeCount > 0 && ` · ${prop.treeCount} tree${prop.treeCount !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      color: stageInfo?.color,
                      backgroundColor: `${stageInfo?.color}15`,
                    }}
                  >
                    {stageInfo?.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-[#1D4E3E] transition-colors shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Footer */}
      {hasProperties && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="py-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              Properties
            </p>
            <p className="text-2xl font-mono font-semibold text-[#1D4E3E]">
              {stats.properties}
            </p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              Trees Assessed
            </p>
            <p className="text-2xl font-mono font-semibold text-[#1D4E3E]">
              {stats.trees}
            </p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              Reports
            </p>
            <p className="text-2xl font-mono font-semibold text-[#1D4E3E]">
              {stats.reports}
            </p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              Certified
            </p>
            <p className="text-2xl font-mono font-semibold text-[#1D4E3E]">
              {stats.certified}
            </p>
          </div>
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
    </div>
  );
}
