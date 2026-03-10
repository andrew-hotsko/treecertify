import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardContent } from "@/components/dashboard-content";
import { Plus } from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getContextMessage(props: {
  draftCount: number;
  overdueCount: number;
  totalTrees: number;
}): string | null {
  if (props.overdueCount > 0)
    return `You have ${props.overdueCount} overdue ${props.overdueCount === 1 ? "report" : "reports"} to finish.`;
  if (props.draftCount > 0)
    return `${props.draftCount} ${props.draftCount === 1 ? "report is" : "reports are"} ready to certify.`;
  if (props.totalTrees === 0)
    return "Get started by creating a property and pinning trees on the map.";
  return null;
}

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // All dashboard queries in a single Promise.all — eliminates sequential waterfalls
  const [
    allProperties,
    totalTrees,
    outstandingBilling,
    treesThisWeek,
    treesLastWeek,
  ] = await Promise.all([
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: {
        trees: {
          select: { id: true, isProtected: true },
          orderBy: { treeNumber: "asc" },
        },
        reports: {
          select: {
            id: true,
            status: true,
            permitStatus: true,
            certifiedAt: true,
          },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.treeRecord.count({
      where: { property: { arboristId: arborist.id } },
    }),
    prisma.report.findMany({
      where: {
        arboristId: arborist.id,
        billingIncluded: true,
        billingAmount: { gt: 0 },
        billingPaidAt: null,
      },
      select: { billingAmount: true },
    }),
    prisma.treeRecord.count({
      where: {
        property: { arboristId: arborist.id },
        createdAt: { gte: oneWeekAgo },
      },
    }),
    prisma.treeRecord.count({
      where: {
        property: { arboristId: arborist.id },
        createdAt: { gte: twoWeeksAgo, lt: oneWeekAgo },
      },
    }),
  ]);

  // Compute all stats in a single pass through allProperties
  let draftCount = 0;
  let overdueCount = 0;
  let needTreeAssessment = 0;
  let needReport = 0;
  let readyToCertify = 0;
  let pendingSubmission = 0;
  let submittedOrReview = 0;
  let approved = 0;
  let needingRevision = 0;

  for (const p of allProperties) {
    const r = p.reports[0];
    const hasTrees = p.trees.length > 0;

    if (!hasTrees) {
      needTreeAssessment++;
    } else if (!r) {
      needReport++;
    } else if (r.status === "draft" || r.status === "review") {
      draftCount++;
      readyToCertify++;
    }

    // Overdue check
    if (
      p.neededByDate &&
      new Date(p.neededByDate) < now &&
      (!r || r.status !== "certified")
    ) {
      overdueCount++;
    }

    // Permit pipeline (certified reports only)
    if (r?.status === "certified") {
      if (!r.permitStatus) pendingSubmission++;
      else if (
        r.permitStatus === "submitted" ||
        r.permitStatus === "under_review"
      )
        submittedOrReview++;
      else if (r.permitStatus === "approved") approved++;
      else if (
        r.permitStatus === "denied" ||
        r.permitStatus === "revision_requested"
      )
        needingRevision++;
    }
  }

  const permitStats = {
    pendingSubmission,
    submittedOrReview,
    approved,
    needingRevision,
  };
  const nextActions = { needTreeAssessment, needReport, readyToCertify };

  const billingStats =
    outstandingBilling.length > 0
      ? {
          count: outstandingBilling.length,
          total: outstandingBilling.reduce(
            (sum, r) => sum + (r.billingAmount ?? 0),
            0
          ),
        }
      : null;

  const greeting = getGreeting();
  const contextMessage = getContextMessage({
    draftCount,
    overdueCount,
    totalTrees,
  });

  // Welcome state for new/returning users
  const hasReports = allProperties.some((p) => p.reports.length > 0);
  const welcomeState: "no_properties" | "no_trees" | "no_reports" | "normal" =
    allProperties.length === 0
      ? "no_properties"
      : totalTrees === 0
        ? "no_trees"
        : !hasReports
          ? "no_reports"
          : "normal";

  // Derive activity feed from allProperties (already sorted by updatedAt desc, take top 5)
  const activityFeed = allProperties.slice(0, 5).map((p) => ({
    id: p.id,
    address: p.address,
    city: p.city,
    updatedAt: p.updatedAt.toISOString(),
    treeCount: p.trees.length,
    reportStatus: p.reports[0]?.status || null,
    certifiedAt: p.reports[0]?.certifiedAt?.toISOString() || null,
  }));

  const firstName = arborist.name.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-display text-foreground">
            {greeting}, {firstName}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            ISA #
            <span className="font-mono">{arborist.isaCertificationNum}</span>{" "}
            &middot; {arborist.companyName ?? "Independent Arborist"}
          </p>
          {contextMessage && (
            <p className="mt-1 text-sm text-forest font-medium">
              {contextMessage}
            </p>
          )}
        </div>
        <Button
          asChild
          className="bg-forest hover:bg-forest-light self-start hidden md:flex"
        >
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            New Property
          </Link>
        </Button>
      </div>

      <DashboardContent
        properties={JSON.parse(JSON.stringify(allProperties))}
        totalTrees={totalTrees}
        activityFeed={activityFeed}
        permitStats={permitStats}
        nextActions={nextActions}
        treesThisWeek={treesThisWeek}
        treesLastWeek={treesLastWeek}
        welcomeState={welcomeState}
        billingStats={billingStats}
      />
    </div>
  );
}
