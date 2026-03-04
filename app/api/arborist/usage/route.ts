import { NextResponse } from "next/server";
import { requireArborist } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const arborist = await requireArborist();

  // Current month boundaries
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [monthlyLogs, allTimeLogs] = await Promise.all([
    prisma.apiUsageLog.findMany({
      where: {
        arboristId: arborist.id,
        createdAt: { gte: monthStart, lt: monthEnd },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.apiUsageLog.aggregate({
      where: { arboristId: arborist.id },
      _sum: { estimatedCostUsd: true, inputTokens: true, outputTokens: true },
      _count: true,
    }),
  ]);

  // Monthly totals
  const monthlyCost = monthlyLogs.reduce((sum, l) => sum + l.estimatedCostUsd, 0);
  const monthlyInputTokens = monthlyLogs.reduce((sum, l) => sum + l.inputTokens, 0);
  const monthlyOutputTokens = monthlyLogs.reduce((sum, l) => sum + l.outputTokens, 0);

  // Breakdown by endpoint
  const byEndpoint: Record<string, { count: number; cost: number }> = {};
  for (const log of monthlyLogs) {
    if (!byEndpoint[log.endpoint]) {
      byEndpoint[log.endpoint] = { count: 0, cost: 0 };
    }
    byEndpoint[log.endpoint].count++;
    byEndpoint[log.endpoint].cost += log.estimatedCostUsd;
  }

  // Per-report costs (unique reportIds this month)
  const reportIdSet = new Set<string>();
  for (const l of monthlyLogs) {
    if (l.reportId) reportIdSet.add(l.reportId);
  }
  const reportCount = reportIdSet.size;
  const avgCostPerReport = reportCount > 0 ? monthlyCost / reportCount : 0;

  return NextResponse.json({
    monthly: {
      cost: monthlyCost,
      inputTokens: monthlyInputTokens,
      outputTokens: monthlyOutputTokens,
      callCount: monthlyLogs.length,
      reportCount,
      avgCostPerReport,
      byEndpoint,
    },
    allTime: {
      cost: allTimeLogs._sum.estimatedCostUsd ?? 0,
      callCount: allTimeLogs._count,
      inputTokens: allTimeLogs._sum.inputTokens ?? 0,
      outputTokens: allTimeLogs._sum.outputTokens ?? 0,
    },
  });
}
