"use client";

import Link from "next/link";
import {
  AlertTriangle,
  FileText,
  Award,
  DollarSign,
  ChevronRight,
  Plus,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ActionCounts {
  needsTrees: number;
  readyToGenerate: number;
  readyToCertify: number;
  awaitingPayment: number;
  awaitingPaymentTotal: number;
  permitsAwaitingReview: number;
  mitigationDeadlinesSoon: number;
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

interface DashboardViewProps {
  firstName: string;
  actionCounts: ActionCounts;
  activityFeed: ActivityItem[];
  hasProperties: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

function getActivityDescription(item: ActivityItem): string {
  if (item.certifiedAt) return "Certified report";
  if (item.reportStatus === "draft" || item.reportStatus === "review")
    return "Generated report";
  if (item.treeCount > 0)
    return `Added ${item.treeCount} tree${item.treeCount !== 1 ? "s" : ""}`;
  return "Created property";
}

// ---------------------------------------------------------------------------
// Action Card definitions
// ---------------------------------------------------------------------------

interface ActionCard {
  key: string;
  count: number;
  label: string;
  subtitle: string;
  href: string;
  icon: typeof AlertTriangle;
  borderColor: string;
  iconColor: string;
  bgColor: string;
}

function buildActionCards(counts: ActionCounts): ActionCard[] {
  const cards: ActionCard[] = [];

  if (counts.needsTrees > 0) {
    cards.push({
      key: "needs-trees",
      count: counts.needsTrees,
      label: `${counts.needsTrees} ${counts.needsTrees === 1 ? "property needs" : "properties need"} tree assessments`,
      subtitle: "Properties with 0 trees entered",
      href: "/properties?filter=needs-trees",
      icon: AlertTriangle,
      borderColor: "border-l-amber-500",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    });
  }

  if (counts.readyToGenerate > 0) {
    cards.push({
      key: "ready-to-generate",
      count: counts.readyToGenerate,
      label: `${counts.readyToGenerate} ${counts.readyToGenerate === 1 ? "report" : "reports"} ready to generate`,
      subtitle: "Trees entered, AI report not yet created",
      href: "/properties?filter=ready-to-generate",
      icon: FileText,
      borderColor: "border-l-blue-500",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    });
  }

  if (counts.readyToCertify > 0) {
    cards.push({
      key: "ready-to-certify",
      count: counts.readyToCertify,
      label: `${counts.readyToCertify} ${counts.readyToCertify === 1 ? "report" : "reports"} ready to certify`,
      subtitle: "AI draft complete, awaiting your review",
      href: "/properties?filter=ready-to-certify",
      icon: Award,
      borderColor: "border-l-forest",
      iconColor: "text-forest",
      bgColor: "bg-forest/5",
    });
  }

  if (counts.awaitingPayment > 0) {
    cards.push({
      key: "awaiting-payment",
      count: counts.awaitingPayment,
      label: `${counts.awaitingPayment} ${counts.awaitingPayment === 1 ? "report" : "reports"} awaiting payment — $${counts.awaitingPaymentTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      subtitle: "Billing included, not yet marked paid",
      href: "/properties?filter=awaiting-payment",
      icon: DollarSign,
      borderColor: "border-l-neutral-400",
      iconColor: "text-neutral-500",
      bgColor: "bg-neutral-50",
    });
  }

  if (counts.permitsAwaitingReview > 0) {
    cards.push({
      key: "permits-awaiting",
      count: counts.permitsAwaitingReview,
      label: `${counts.permitsAwaitingReview} ${counts.permitsAwaitingReview === 1 ? "permit" : "permits"} awaiting city review`,
      subtitle: "Submitted to city, pending decision",
      href: "/properties?permitStatus=submitted",
      icon: Send,
      borderColor: "border-l-teal-500",
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50",
    });
  }

  if (counts.mitigationDeadlinesSoon > 0) {
    cards.push({
      key: "mitigation-deadlines",
      count: counts.mitigationDeadlinesSoon,
      label: `${counts.mitigationDeadlinesSoon} mitigation ${counts.mitigationDeadlinesSoon === 1 ? "deadline" : "deadlines"} approaching`,
      subtitle: "Due within 30 days",
      href: "/properties?filter=mitigation-due",
      icon: Clock,
      borderColor: "border-l-orange-500",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    });
  }

  return cards;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardView({
  firstName,
  actionCounts,
  activityFeed,
  hasProperties,
}: DashboardViewProps) {
  const cards = buildActionCards(actionCounts);
  const allCaughtUp = cards.length === 0 && hasProperties;

  return (
    <div className="space-y-8 pb-24 sm:pb-8">
      {/* Greeting + Date + Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-display text-foreground">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">
            {formatDate()}
          </p>
        </div>
        <Link
          href="/properties/new"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-forest text-white hover:bg-forest-light active:scale-[0.98] transition-all"
        >
          <Plus className="h-4 w-4" />
          New Property
        </Link>
      </div>

      {/* Action Cards */}
      {cards.length > 0 && (
        <div className="space-y-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.key}
                href={card.href}
                className={`flex items-center gap-4 p-4 rounded-lg border border-l-4 ${card.borderColor} bg-card hover:shadow-sm transition-shadow`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {card.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            );
          })}
        </div>
      )}

      {/* All caught up */}
      {allCaughtUp && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/5 mb-4">
            <CheckCircle2 className="h-7 w-7 text-forest" />
          </div>
          <p className="text-lg font-semibold font-display text-foreground">
            All caught up
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            No properties need your attention right now.
          </p>
          <Link
            href="/properties/new"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-md text-sm font-medium bg-forest text-white hover:bg-forest-light transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Property
          </Link>
        </div>
      )}

      {/* First-time empty state (no properties at all) */}
      {!hasProperties && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Get started by creating your first property.
          </p>
          <Link
            href="/properties/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-md text-sm font-medium bg-forest text-white hover:bg-forest-light transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Property
          </Link>
        </div>
      )}

      {/* Recent Activity */}
      {activityFeed.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Recent Activity
          </h2>
          <div className="divide-y divide-neutral-100">
            {activityFeed.map((item) => (
              <Link
                key={item.id}
                href={`/properties/${item.id}`}
                className="flex items-center gap-3 py-3 hover:bg-neutral-50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  {item.certifiedAt ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    <span className="text-muted-foreground">
                      {getActivityDescription(item)}
                    </span>
                    {" for "}
                    <span className="font-medium">{item.address}</span>
                    {item.city && (
                      <span className="text-muted-foreground">
                        , {item.city}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(item.updatedAt), {
                    addSuffix: false,
                  })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No activity state */}
      {activityFeed.length === 0 && hasProperties && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            No recent activity. Create your first property to get started.
          </p>
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
    </div>
  );
}
