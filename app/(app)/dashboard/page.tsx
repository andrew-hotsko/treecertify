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
            certifiedAt: true,
            billingIncluded: true,
            billingAmount: true,
            billingPaidAt: true,
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

  // Compute action counts in a single pass
  let needsTrees = 0;
  let readyToGenerate = 0;
  let readyToCertify = 0;

  for (const p of allProperties) {
    const r = p.reports[0];
    const hasTrees = p.trees.length > 0;

    if (!hasTrees) {
      needsTrees++;
    } else if (!r) {
      readyToGenerate++;
    } else if (r.status === "draft" || r.status === "review" || r.status === "amendment_in_progress") {
      readyToCertify++;
    }
  }

  const awaitingPayment = outstandingBilling.length;
  const awaitingPaymentTotal = outstandingBilling.reduce(
    (sum, r) => sum + (r.billingAmount ?? 0),
    0
  );

  // Build activity feed from the 5 most recently updated properties
  const activityFeed = allProperties.slice(0, 5).map((p) => ({
    id: p.id,
    address: p.address,
    city: p.city,
    updatedAt: p.updatedAt.toISOString(),
    treeCount: p.trees.length,
    reportStatus: p.reports[0]?.status || null,
    certifiedAt: p.reports[0]?.certifiedAt?.toISOString() || null,
  }));

  return (
    <DashboardView
      firstName={arborist.name?.split(" ")[0] ?? ""}
      actionCounts={{
        needsTrees,
        readyToGenerate,
        readyToCertify,
        awaitingPayment,
        awaitingPaymentTotal,
      }}
      activityFeed={activityFeed}
      hasProperties={allProperties.length > 0}
    />
  );
}
