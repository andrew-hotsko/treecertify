import { NextRequest, NextResponse } from "next/server";
import { requireArborist } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const arborist = await requireArborist();

  const reportId = req.nextUrl.searchParams.get("reportId");
  if (!reportId) {
    return NextResponse.json({ error: "reportId required" }, { status: 400 });
  }

  const logs = await prisma.apiUsageLog.findMany({
    where: {
      arboristId: arborist.id,
      reportId,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalCost = logs.reduce((sum, l) => sum + l.estimatedCostUsd, 0);

  return NextResponse.json({ totalCost, logs });
}
