import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import { DashboardView } from "@/components/dashboard-view";

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const [allProperties, outstandingBilling] = await Promise.all([
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      include: {
        trees: {
          select: { id: true },
          orderBy: { treeNumber: "asc" },
        },
        reports: {
          select: {
            id: true,
            status: true,
            reportType: true,
            certifiedAt: true,
            billingIncluded: true,
            billingAmount: true,
            billingPaidAt: true,
            permitStatus: true,
            permitExpiresAt: true,
          },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
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
  ]);

  // Compute pipeline stage counts and action counts in a single pass
  let needsTrees = 0;
  let readyToGenerate = 0;
  let readyToCertify = 0;
  let certified = 0;
  let permitsAwaitingReview = 0;
  let mitigationDeadlinesSoon = 0;
  let totalTrees = 0;
  let totalReports = 0;
  let totalCertified = 0;
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  for (const p of allProperties) {
    const r = p.reports[0];
    const hasTrees = p.trees.length > 0;
    totalTrees += p.trees.length;
    if (r) totalReports++;
    if (r?.certifiedAt) totalCertified++;

    if (!hasTrees) {
      needsTrees++;
    } else if (!r) {
      readyToGenerate++;
    } else if (r.status === "draft" || r.status === "review" || r.status === "amendment_in_progress") {
      readyToCertify++;
    } else if (r.status === "certified") {
      certified++;
    }

    // Permit tracking counts
    if (r?.permitStatus === "submitted" || r?.permitStatus === "under_review") {
      permitsAwaitingReview++;
    }
    if (r?.permitExpiresAt && new Date(r.permitExpiresAt) <= thirtyDaysFromNow && new Date(r.permitExpiresAt) > new Date()) {
      mitigationDeadlinesSoon++;
    }
  }

  const awaitingPayment = outstandingBilling.length;
  const awaitingPaymentTotal = outstandingBilling.reduce(
    (sum, r) => sum + (r.billingAmount ?? 0),
    0
  );

  // Draft = needs trees + ready to generate (field work stage)
  const draftCount = needsTrees + readyToGenerate;

  // Build property list for "All Properties" and pipeline filtering
  const propertyList = allProperties.map((p) => {
    const r = p.reports[0];
    const hasTrees = p.trees.length > 0;

    let stage: "draft" | "report_draft" | "certified" | "delivered" = "draft";
    if (!hasTrees || !r) {
      stage = "draft";
    } else if (r.status === "draft" || r.status === "review" || r.status === "amendment_in_progress") {
      stage = "report_draft";
    } else if (r.status === "certified") {
      stage = "certified";
    }

    return {
      id: p.id,
      address: p.address,
      city: p.city,
      reportType: r?.reportType || p.reportType || null,
      treeCount: p.trees.length,
      stage,
      reportStatus: r?.status || null,
      certifiedAt: r?.certifiedAt?.toISOString() || null,
      updatedAt: p.updatedAt.toISOString(),
    };
  });

  return (
    <DashboardView
      firstName={arborist.name?.split(" ")[0] ?? ""}
      pipelineCounts={{
        draft: draftCount,
        reportDraft: readyToCertify,
        certified: certified,
        delivered: 0, // TODO: implement delivered tracking
      }}
      actionCounts={{
        needsTrees,
        readyToGenerate,
        readyToCertify,
        awaitingPayment,
        awaitingPaymentTotal,
        permitsAwaitingReview,
        mitigationDeadlinesSoon,
      }}
      stats={{
        properties: allProperties.length,
        trees: totalTrees,
        reports: totalReports,
        certified: totalCertified,
      }}
      properties={propertyList}
      hasProperties={allProperties.length > 0}
    />
  );
}
