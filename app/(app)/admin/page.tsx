import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// Admin access gate
// ---------------------------------------------------------------------------

const ADMIN_ARBORIST_IDS = [process.env.ADMIN_ARBORIST_ID || ""];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function timeAgo(date: Date | null): string {
  if (!date) return "Never";
  const ms = Date.now() - date.getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function pct(num: number, denom: number): string {
  if (denom === 0) return "0%";
  return `${Math.round((num / denom) * 100)}%`;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AdminDashboard() {
  const arborist = await requireArborist();
  if (!ADMIN_ARBORIST_IDS.includes(arborist.id)) {
    redirect("/dashboard");
  }

  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // -----------------------------------------------------------------------
  // Summary stats
  // -----------------------------------------------------------------------
  const [
    reportsCreated7d,
    reportsCertified7d,
    sharesOpened7d,
    pdfsDownloaded7d,
    reportsCreatedAll,
    reportsCertifiedAll,
    sharesOpenedAll,
    pdfsDownloadedAll,
  ] = await Promise.all([
    prisma.analyticsEvent.count({ where: { eventType: "report_generated", createdAt: { gte: last7Days } } }),
    prisma.analyticsEvent.count({ where: { eventType: "report_certified", createdAt: { gte: last7Days } } }),
    prisma.analyticsEvent.count({ where: { eventType: "share_link_opened", createdAt: { gte: last7Days } } }),
    prisma.analyticsEvent.count({ where: { eventType: "pdf_downloaded", createdAt: { gte: last7Days } } }),
    prisma.analyticsEvent.count({ where: { eventType: "report_generated" } }),
    prisma.analyticsEvent.count({ where: { eventType: "report_certified" } }),
    prisma.analyticsEvent.count({ where: { eventType: "share_link_opened" } }),
    prisma.analyticsEvent.count({ where: { eventType: "pdf_downloaded" } }),
  ]);

  // -----------------------------------------------------------------------
  // Per-arborist activity (last 30 days)
  // -----------------------------------------------------------------------
  const arborists = await prisma.arborist.findMany({
    select: {
      id: true,
      name: true,
      companyName: true,
      _count: { select: { properties: true } },
    },
  });

  const arboristActivity = await Promise.all(
    arborists.map(async (a: { id: string; name: string; companyName: string | null; _count: { properties: number } }) => {
      const [events, lastEvent, treeCount] = await Promise.all([
        prisma.analyticsEvent.groupBy({
          by: ["eventType"],
          where: { arboristId: a.id, createdAt: { gte: last30Days } },
          _count: true,
        }),
        prisma.analyticsEvent.findFirst({
          where: { arboristId: a.id },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        }),
        prisma.treeRecord.count({
          where: { property: { arboristId: a.id } },
        }),
      ]);

      const eventMap: Record<string, number> = {};
      events.forEach((e: { eventType: string; _count: number }) => {
        eventMap[e.eventType] = e._count;
      });

      return {
        name: a.name,
        companyName: a.companyName,
        properties: a._count.properties,
        trees: treeCount,
        reportsGenerated: eventMap["report_generated"] || 0,
        reportsCertified: eventMap["report_certified"] || 0,
        lastActive: lastEvent?.createdAt ?? null,
      };
    })
  );

  // Sort by last active (most recent first)
  arboristActivity.sort((a: { lastActive: Date | null }, b: { lastActive: Date | null }) => {
    if (!a.lastActive) return 1;
    if (!b.lastActive) return -1;
    return b.lastActive.getTime() - a.lastActive.getTime();
  });

  // -----------------------------------------------------------------------
  // Report type distribution
  // -----------------------------------------------------------------------
  const reportTypeEvents = await prisma.analyticsEvent.findMany({
    where: { eventType: "report_generated" },
    select: { metadata: true },
  });
  const reportTypeCounts: Record<string, number> = {};
  reportTypeEvents.forEach((e: { metadata: string | null }) => {
    try {
      const meta = JSON.parse(e.metadata || "{}");
      const rt = meta.reportType || "unknown";
      reportTypeCounts[rt] = (reportTypeCounts[rt] || 0) + 1;
    } catch { /* skip */ }
  });
  const reportTypeTotal = Object.values(reportTypeCounts).reduce((a, b) => a + b, 0);

  const REPORT_TYPE_LABELS: Record<string, string> = {
    removal_permit: "Removal Permit",
    health_assessment: "Health Assessment",
    tree_valuation: "Tree Valuation",
    construction_encroachment: "Construction Encroachment",
  };

  // -----------------------------------------------------------------------
  // AI edit rate
  // -----------------------------------------------------------------------
  const editEvents = await prisma.analyticsEvent.findMany({
    where: { eventType: "report_edited" },
    select: { metadata: true },
  });
  const editDeltas = editEvents
    .map((e: { metadata: string | null }) => {
      try {
        return JSON.parse(e.metadata || "{}").editWordDelta || 0;
      } catch {
        return 0;
      }
    })
    .filter((d: number) => d > 0);
  const avgEditDistance =
    editDeltas.length > 0
      ? Math.round(editDeltas.reduce((a: number, b: number) => a + b, 0) / editDeltas.length)
      : 0;
  const heavyEdits = editDeltas.filter((d: number) => d > 100).length;
  const minimalEdits = editDeltas.filter((d: number) => d < 20).length;

  // -----------------------------------------------------------------------
  // Share link performance
  // -----------------------------------------------------------------------
  const certifiedReportCount = await prisma.report.count({
    where: { status: "certified" },
  });
  const shareDownloads = await prisma.analyticsEvent.count({
    where: {
      eventType: "pdf_downloaded",
      metadata: { contains: "share_page" },
    },
  });

  // -----------------------------------------------------------------------
  // Recent events
  // -----------------------------------------------------------------------
  const recentEvents = await prisma.analyticsEvent.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { arborist: { select: { name: true } } },
  });

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight text-foreground">
          TreeCertify Beta Dashboard
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Internal metrics — {now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* ===== Summary Stats ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Reports Created", v7: reportsCreated7d, vAll: reportsCreatedAll },
          { label: "Reports Certified", v7: reportsCertified7d, vAll: reportsCertifiedAll },
          { label: "Share Links Opened", v7: sharesOpened7d, vAll: sharesOpenedAll },
          { label: "PDFs Downloaded", v7: pdfsDownloaded7d, vAll: pdfsDownloadedAll },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl font-bold font-mono text-neutral-900">{stat.v7}</span>
              <span className="text-xs text-neutral-400">7d</span>
              <span className="text-lg font-mono text-neutral-400">{stat.vAll}</span>
              <span className="text-xs text-neutral-400">all</span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Arborist Activity ===== */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="px-4 py-3 border-b bg-muted/50">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Arborist Activity (Last 30 Days)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-neutral-500 uppercase tracking-wider">
                <th className="px-4 py-2 font-medium">Arborist</th>
                <th className="px-4 py-2 font-medium text-right">Properties</th>
                <th className="px-4 py-2 font-medium text-right">Trees</th>
                <th className="px-4 py-2 font-medium text-right">Reports</th>
                <th className="px-4 py-2 font-medium text-right">Certified</th>
                <th className="px-4 py-2 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {arboristActivity.map((a) => (
                <tr key={a.name} className="border-b last:border-0 hover:bg-neutral-50">
                  <td className="px-4 py-2">
                    <span className="font-medium text-neutral-900">{a.name}</span>
                    {a.companyName && (
                      <span className="text-xs text-neutral-400 ml-2">{a.companyName}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">{a.properties}</td>
                  <td className="px-4 py-2 text-right font-mono">{a.trees}</td>
                  <td className="px-4 py-2 text-right font-mono">{a.reportsGenerated}</td>
                  <td className="px-4 py-2 text-right font-mono">{a.reportsCertified}</td>
                  <td className="px-4 py-2 text-neutral-500">{timeAgo(a.lastActive)}</td>
                </tr>
              ))}
              {arboristActivity.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-neutral-400">
                    No arborists yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Metrics Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Report Type Distribution */}
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Report Type Distribution
          </h2>
          <div className="space-y-2">
            {Object.entries(reportTypeCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{REPORT_TYPE_LABELS[type] || type}</span>
                  <span className="font-mono text-neutral-900">
                    {count} <span className="text-neutral-400 text-xs">({pct(count, reportTypeTotal)})</span>
                  </span>
                </div>
              ))}
            {Object.keys(reportTypeCounts).length === 0 && (
              <p className="text-sm text-neutral-400">No reports yet</p>
            )}
          </div>
        </div>

        {/* AI Edit Rate */}
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            AI Edit Rate
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-700">Avg edit distance</span>
              <span className="font-mono font-medium">{avgEditDistance} words</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Heavy edits (&gt;100 words)</span>
              <span className="font-mono">{heavyEdits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Minimal edits (&lt;20 words)</span>
              <span className="font-mono">{minimalEdits}</span>
            </div>
            {editDeltas.length === 0 && (
              <p className="text-neutral-400">No edit data yet</p>
            )}
          </div>
        </div>

        {/* Share Link Performance */}
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Share Link Performance
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-700">Reports certified</span>
              <span className="font-mono">{certifiedReportCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Share links opened</span>
              <span className="font-mono">
                {sharesOpenedAll}{" "}
                <span className="text-neutral-400 text-xs">
                  ({pct(sharesOpenedAll, certifiedReportCount)} open rate)
                </span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">PDFs from share page</span>
              <span className="font-mono">
                {shareDownloads}{" "}
                <span className="text-neutral-400 text-xs">
                  ({pct(shareDownloads, sharesOpenedAll)} download rate)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Recent Events ===== */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="px-4 py-3 border-b bg-muted/50">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Recent Events (Last 50)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-neutral-500 uppercase tracking-wider">
                <th className="px-4 py-2 font-medium">When</th>
                <th className="px-4 py-2 font-medium">Arborist</th>
                <th className="px-4 py-2 font-medium">Event</th>
                <th className="px-4 py-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => {
                let details = "";
                try {
                  const meta = JSON.parse(event.metadata || "{}");
                  const parts: string[] = [];
                  if (meta.reportType) parts.push(REPORT_TYPE_LABELS[meta.reportType] || meta.reportType);
                  if (meta.treeCount) parts.push(`${meta.treeCount} trees`);
                  if (meta.species) parts.push(meta.species);
                  if (meta.city) parts.push(meta.city);
                  if (meta.minutesToCertify) parts.push(`${meta.minutesToCertify} min`);
                  if (meta.editWordDelta) parts.push(`${meta.editWordDelta} words changed`);
                  if (meta.source) parts.push(`via ${meta.source}`);
                  details = parts.join(", ");
                } catch { /* skip */ }

                return (
                  <tr key={event.id} className="border-b last:border-0 hover:bg-neutral-50">
                    <td className="px-4 py-2 text-neutral-500 whitespace-nowrap">
                      {timeAgo(event.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      {event.arborist?.name || (
                        <span className="text-neutral-400">anonymous</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-0.5 bg-neutral-100 rounded text-xs font-mono">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-neutral-600 truncate max-w-xs">
                      {details || "\u2014"}
                    </td>
                  </tr>
                );
              })}
              {recentEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-neutral-400">
                    No events yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
