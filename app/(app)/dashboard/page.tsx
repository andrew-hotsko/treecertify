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

function getContextMessage(props: { draftCount: number; overdueCount: number; totalTrees: number }): string | null {
  if (props.overdueCount > 0) return `You have ${props.overdueCount} overdue ${props.overdueCount === 1 ? "report" : "reports"} to finish.`;
  if (props.draftCount > 0) return `${props.draftCount} ${props.draftCount === 1 ? "report is" : "reports are"} ready to certify.`;
  if (props.totalTrees === 0) return "Get started by creating a property and pinning trees on the map.";
  return null;
}

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const [allProperties, totalTrees, recentActivity] = await Promise.all([
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
          select: { id: true, status: true, permitStatus: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.treeRecord.count({
      where: { property: { arboristId: arborist.id } },
    }),
    // Recent activity: last 5 updated properties
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        address: true,
        city: true,
        updatedAt: true,
        _count: { select: { trees: true } },
        reports: {
          select: { status: true, certifiedAt: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
  ]);

  // Compute contextual stats
  const draftCount = allProperties.filter(
    (p) => p.reports[0] && p.reports[0].status !== "certified"
  ).length;
  const now = new Date();
  const overdueCount = allProperties.filter((p) => {
    const due = p.neededByDate;
    return due && new Date(due) < now && (!p.reports[0] || p.reports[0].status !== "certified");
  }).length;

  // Permit pipeline stats
  const certifiedReports = allProperties
    .filter((p) => p.reports[0]?.status === "certified")
    .map((p) => p.reports[0]);
  const permitStats = {
    pendingSubmission: certifiedReports.filter((r) => !r.permitStatus).length,
    submittedOrReview: certifiedReports.filter(
      (r) => r.permitStatus === "submitted" || r.permitStatus === "under_review"
    ).length,
    approved: certifiedReports.filter((r) => r.permitStatus === "approved").length,
    needingRevision: certifiedReports.filter(
      (r) => r.permitStatus === "denied" || r.permitStatus === "revision_requested"
    ).length,
  };

  // Next Actions
  const nextActions = {
    needTreeAssessment: allProperties.filter((p) => p.trees.length === 0).length,
    needReport: allProperties.filter((p) => p.trees.length > 0 && !p.reports[0]).length,
    readyToCertify: allProperties.filter(
      (p) => p.reports[0] && (p.reports[0].status === "draft" || p.reports[0].status === "review")
    ).length,
  };

  // Weekly activity comparison
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const [treesThisWeek, treesLastWeek] = await Promise.all([
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

  const greeting = getGreeting();
  const contextMessage = getContextMessage({ draftCount, overdueCount, totalTrees });

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

  const activityFeed = recentActivity.map((p) => ({
    id: p.id,
    address: p.address,
    city: p.city,
    updatedAt: p.updatedAt.toISOString(),
    treeCount: p._count.trees,
    reportStatus: p.reports[0]?.status || null,
    certifiedAt: p.reports[0]?.certifiedAt?.toISOString() || null,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            {greeting}, {arborist.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">
            ISA #{arborist.isaCertificationNum} &middot;{" "}
            {arborist.companyName ?? "Independent Arborist"}
          </p>
          {contextMessage && (
            <p className="mt-1 text-sm text-emerald-600 font-medium">
              {contextMessage}
            </p>
          )}
        </div>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto"
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
      />
    </div>
  );
}
