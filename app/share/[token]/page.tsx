import { cache } from "react";
import { prisma } from "@/lib/db";
import {
  Check,
  Clock,
  Download,
  TreePine,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  ShieldCheck,
  FileText,
  ExternalLink,
  MessageSquare,
  MapPin,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";
import { getCityContact, getNextStepsText, getPermitTimeline } from "@/lib/city-contacts";
import type { PermitTimelineStage } from "@/lib/city-contacts";
import type { Metadata } from "next";
import { logEvent } from "@/lib/analytics";

const REPORT_TYPE_META: Record<string, string> = {
  removal_permit: "Tree Removal Permit Report",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Certified Tree Appraisal",
  construction_encroachment: "Construction Encroachment Assessment",
  real_estate_package: "Certified Tree Canopy Report",
};

const getSharedProperty = cache(async (token: string) => {
  return prisma.property.findUnique({
    where: { shareToken: token },
    include: {
      trees: {
        orderBy: { treeNumber: "asc" },
      },
      reports: {
        orderBy: { updatedAt: "desc" },
        take: 1,
        include: {
          arborist: true,
        },
      },
    },
  });
});

export async function generateMetadata({
  params,
}: {
  params: { token: string };
}): Promise<Metadata> {
  const property = await getSharedProperty(params.token);

  if (!property) {
    return { title: "Report Not Found | TreeCertify" };
  }

  const report = property.reports[0];
  const reportLabel = REPORT_TYPE_META[report?.reportType ?? ""] ?? "Arborist Report";
  const companyName = report?.arborist?.companyName ?? report?.arborist?.name ?? "TreeCertify";
  const title = `${reportLabel} — ${property.address}`;
  const description = `${reportLabel} for ${property.address}, ${property.city}. Prepared by ${companyName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "TreeCertify",
    },
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONDITION_DOT_BG: Record<number, string> = {
  0: "bg-neutral-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-600",
};

const CONDITION_FRIENDLY: Record<number, string> = {
  0: "Dead",
  1: "Critical condition",
  2: "Poor condition",
  3: "Fair condition",
  4: "Good condition",
  5: "Excellent condition",
};

const ACTION_FRIENDLY: Record<string, string> = {
  retain: "This tree is healthy and will be preserved",
  remove: "Removal is recommended — see report for details",
  prune: "Maintenance pruning is recommended",
  monitor: "This tree will be monitored over time",
};

// Buyer-friendly action text for real estate packages — no "removal" language
const RE_ACTION_FRIENDLY: Record<string, string> = {
  retain: "Healthy — no action needed",
  remove: "This tree's condition warrants further professional assessment",
  prune: "Minor maintenance pruning recommended",
  monitor: "Routine monitoring recommended",
};

// Formal appraisal action text for standalone valuation reports
const VALUATION_ACTION_FRIENDLY: Record<string, string> = {
  retain: "Retainable — no action required",
  remove: "Condition warrants removal consideration",
  prune: "Corrective pruning recommended",
  monitor: "Periodic monitoring recommended",
};

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Report",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Tree Valuation Appraisal",
  construction_encroachment: "Construction Encroachment Assessment",
  real_estate_package: "Certified Tree Canopy Report",
};

// ---------------------------------------------------------------------------
// Summary helpers
// ---------------------------------------------------------------------------

function buildSummaryStats(
  trees: Array<{
    conditionRating: number;
    recommendedAction: string;
    isProtected: boolean;
    typeSpecificData: string | null;
    valuationAppraisedValue?: number | null;
  }>,
  reportType: string
): { stats: { label: string; value: string }[]; explanation: string } {
  const total = trees.length;

  switch (reportType) {
    case "removal_permit": {
      const removals = trees.filter(
        (t) => t.recommendedAction === "remove"
      ).length;
      const retentions = total - removals;
      const protectedCount = trees.filter((t) => t.isProtected).length;
      return {
        stats: [
          { label: "Trees Assessed", value: String(total) },
          { label: "Recommended for Removal", value: String(removals) },
          { label: "To Be Retained", value: String(retentions) },
          { label: "Protected by Ordinance", value: String(protectedCount) },
        ],
        explanation:
          removals > 0
            ? `${removals} tree${removals !== 1 ? "s" : ""} ${removals !== 1 ? "have" : "has"} been recommended for removal. ${protectedCount > 0 ? `${protectedCount} ${protectedCount !== 1 ? "are" : "is"} protected under the local tree ordinance and will require a city permit.` : "None are protected under the local tree ordinance."}`
            : "All trees have been assessed and no removals are recommended at this time.",
      };
    }

    case "health_assessment": {
      const excellent = trees.filter((t) => t.conditionRating >= 4).length;
      const fair = trees.filter((t) => t.conditionRating === 3).length;
      const atRisk = trees.filter((t) => t.conditionRating <= 2).length;
      return {
        stats: [
          { label: "Trees Assessed", value: String(total) },
          { label: "Good or Excellent", value: String(excellent) },
          { label: "Fair Condition", value: String(fair) },
          { label: "Needs Attention", value: String(atRisk) },
        ],
        explanation:
          atRisk > 0
            ? `${atRisk} tree${atRisk !== 1 ? "s" : ""} ${atRisk !== 1 ? "require" : "requires"} attention. Review the full report for specific recommendations.`
            : "All trees are in fair or better condition. Regular maintenance is recommended to keep them healthy.",
      };
    }

    case "tree_valuation": {
      let totalValue = 0;
      let highestValue = 0;
      let valueCount = 0;
      for (const tree of trees) {
        const val = tree.valuationAppraisedValue ?? 0;
        if (val > 0) {
          totalValue += val;
          if (val > highestValue) highestValue = val;
          valueCount++;
        }
      }
      const fmt = (v: number) =>
        v >= 1000
          ? `$${Math.round(v).toLocaleString()}`
          : `$${Math.round(v)}`;
      return {
        stats: [
          { label: "Trees Assessed", value: String(total) },
          { label: "Trees Valued", value: String(valueCount) },
          {
            label: "Total Appraised Value",
            value: totalValue > 0 ? fmt(totalValue) : "—",
          },
          {
            label: "Highest Single Value",
            value: highestValue > 0 ? fmt(highestValue) : "—",
          },
        ],
        explanation:
          totalValue > 0
            ? `The combined appraised value of ${valueCount} tree${valueCount !== 1 ? "s" : ""} is ${fmt(totalValue)}, calculated using the ISA Trunk Formula Method.`
            : "Tree valuations are included in the full report.",
      };
    }

    case "construction_encroachment": {
      const needsProtection = trees.filter(
        (t) => t.recommendedAction === "retain" || t.recommendedAction === "monitor"
      ).length;
      const removals = trees.filter(
        (t) => t.recommendedAction === "remove"
      ).length;
      return {
        stats: [
          { label: "Trees Assessed", value: String(total) },
          {
            label: "Need Protection During Construction",
            value: String(needsProtection),
          },
          { label: "Recommended for Removal", value: String(removals) },
          { label: "Protected by Ordinance", value: trees.filter((t) => t.isProtected).length.toString() },
        ],
        explanation:
          needsProtection > 0
            ? `${needsProtection} tree${needsProtection !== 1 ? "s" : ""} will require protection measures during construction. The report includes a detailed Tree Protection Plan for your contractor.`
            : "Review the full report for construction impact assessment details.",
      };
    }

    case "real_estate_package": {
      let totalValue = 0;
      let valueCount = 0;
      const excellent = trees.filter((t) => t.conditionRating >= 4).length;
      const needsAttention = trees.filter((t) => t.conditionRating <= 2).length;
      for (const tree of trees) {
        const val = tree.valuationAppraisedValue;
        if (val != null && val > 0) {
          totalValue += val;
          valueCount++;
        }
      }
      const fmt = (v: number) =>
        v >= 1000
          ? `$${Math.round(v).toLocaleString()}`
          : `$${Math.round(v)}`;
      return {
        stats: [
          { label: "Trees Assessed", value: String(total) },
          {
            label: "Canopy Value",
            value: totalValue > 0 ? fmt(totalValue) : "—",
          },
          { label: "Good or Excellent", value: String(excellent) },
          { label: "Needs Attention", value: String(needsAttention) },
        ],
        explanation:
          totalValue > 0
            ? `The property's tree canopy has a combined appraised value of ${fmt(totalValue)} across ${valueCount} tree${valueCount !== 1 ? "s" : ""}, assessed using the ISA Trunk Formula Method.${excellent > 0 ? ` ${excellent} ${excellent !== 1 ? "are" : "is"} in good or excellent condition.` : ""}`
            : "See the full report for detailed tree assessments and valuations.",
      };
    }

    default:
      return {
        stats: [{ label: "Trees Assessed", value: String(total) }],
        explanation: "See the full report for detailed findings.",
      };
  }
}

// ---------------------------------------------------------------------------
// Permit timeline helpers
// ---------------------------------------------------------------------------

interface TimelineProgress {
  completedKeys: Set<string>;
  activeKey: string | null;
  terminalStatus: "denied" | "revision_requested" | null;
}

function computeTimelineProgress(
  permitStatus: string | null,
  stages: PermitTimelineStage[]
): TimelineProgress {
  if (!permitStatus) {
    return { completedKeys: new Set(), activeKey: null, terminalStatus: null };
  }

  switch (permitStatus) {
    case "submitted":
      return {
        completedKeys: new Set(["submitted"]),
        activeKey: stages.find((s) => s.key === "under_review")?.key ?? stages[1]?.key ?? null,
        terminalStatus: null,
      };

    case "under_review": {
      const idx = stages.findIndex((s) => s.key === "under_review");
      const nextKey = stages[idx + 1]?.key ?? null;
      return {
        completedKeys: new Set(["submitted", "under_review"]),
        activeKey: nextKey,
        terminalStatus: null,
      };
    }

    case "approved":
      return {
        completedKeys: new Set(stages.map((s) => s.key)),
        activeKey: null,
        terminalStatus: null,
      };

    case "denied":
      return {
        completedKeys: new Set(["submitted", "under_review"]),
        activeKey: "decision",
        terminalStatus: "denied",
      };

    case "revision_requested":
      return {
        completedKeys: new Set(["submitted", "under_review"]),
        activeKey: "decision",
        terminalStatus: "revision_requested",
      };

    default:
      return { completedKeys: new Set(), activeKey: null, terminalStatus: null };
  }
}

function formatTimelineDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getStageDate(
  stage: PermitTimelineStage,
  permitStatus: string | null,
  submittedAt: Date | null,
  approvedAt: Date | null,
  isCompleted: boolean
): string | null {
  // Submitted stage: use actual date
  if (stage.key === "submitted" && submittedAt) {
    return formatTimelineDate(submittedAt);
  }

  // Decision/active stage when approved: use actual approvedAt
  if ((stage.key === "decision" || stage.key === "active") && permitStatus === "approved" && approvedAt) {
    return formatTimelineDate(approvedAt);
  }

  // Completed stages without a specific date — skip
  if (isCompleted) return null;

  // Future stages with a submittedAt: show estimated date
  if (submittedAt && stage.typicalDaysFromSubmission > 0) {
    const estimated = new Date(submittedAt.getTime() + stage.typicalDaysFromSubmission * 86400000);
    return `Expected by ${formatTimelineDate(estimated)}`;
  }

  // No submittedAt: show relative text
  if (stage.typicalDaysFromSubmission > 0) {
    const weeks = Math.round(stage.typicalDaysFromSubmission / 7);
    if (weeks <= 1) return `Typically ${stage.typicalDaysFromSubmission} days after submission`;
    return `Typically ${weeks} weeks after submission`;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SharedPropertyPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const property = await getSharedProperty(token);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md px-6">
          <div className="inline-flex items-center gap-2 mb-6">
            <TreePine className="h-6 w-6 text-[#1D4E3E]" />
            <span className="font-semibold text-[#1D4E3E] tracking-tight">TreeCertify</span>
          </div>
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">
            This report link is no longer available
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            The link may have been revoked or is no longer active.
            If you need access to this report, please contact your arborist directly.
          </p>
        </div>
      </div>
    );
  }

  const report = property.reports[0] ?? null;
  const arborist = report?.arborist ?? null;
  const isAmending = report?.status === "amendment_in_progress";
  // Show certified view for both certified AND amendment_in_progress
  // During amendment, display the pre-amendment version snapshot
  const isCertified = report?.status === "certified" || report?.status === "filed" || isAmending;

  // Log share link opened (rate-limited: 1 per token per hour)
  try {
    const lastOpen = await prisma.analyticsEvent.findFirst({
      where: {
        eventType: "share_link_opened",
        metadata: { contains: property.id },
        createdAt: { gte: new Date(Date.now() - 3600000) },
      },
    });
    if (!lastOpen) {
      logEvent("share_link_opened", null, {
        propertyId: property.id,
        reportType: report?.reportType,
        isCertified,
      });
    }
  } catch {
    // Never let analytics break the share page
  }

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const hasCoords = property.lat != null && property.lng != null;

  // Build static Mapbox URL with tree pins
  let mapImageUrl: string | null = null;
  if (hasCoords && mapboxToken) {
    const lng = property.lng!;
    const lat = property.lat!;

    const treePins = property.trees
      .filter((t) => t.pinLat != null && t.pinLng != null)
      .slice(0, 50)
      .map((t) => `pin-s-${t.treeNumber}+16a34a(${t.pinLng},${t.pinLat})`)
      .join(",");

    const markers = treePins ? `${treePins}/` : "";
    mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${markers}${lng},${lat},17,0/800x400@2x?access_token=${mapboxToken}`;
  }

  // Pre-compute summary data
  const summary =
    isCertified && report
      ? buildSummaryStats(property.trees, report.reportType)
      : null;

  // Real estate packages and standalone valuations have their own distinct paths
  const isRealEstatePackage = report?.reportType === "real_estate_package";
  const isValuation = report?.reportType === "tree_valuation";
  const isValuationType = isRealEstatePackage || isValuation;

  // City contact — skip for valuation types (no city submission needed)
  const cityContact =
    isCertified && report && !isValuationType
      ? getCityContact(property.city, report.reportType)
      : null;

  // Next steps text for non-removal types (only used when no city-specific contact exists)
  // Skip for valuation types — they have their own "About" sections
  const nextSteps =
    isCertified && report && !cityContact && !isValuationType && report.reportType !== "removal_permit"
      ? getNextStepsText(report.reportType)
      : null;

  // Permit processing timeline — only for permit-requiring report types once submitted
  const isPermitType = report?.reportType === "removal_permit" || report?.reportType === "construction_encroachment";
  const timeline =
    isCertified && report && report.permitStatus && isPermitType
      ? getPermitTimeline(property.city)
      : null;
  const timelineProgress = timeline
    ? computeTimelineProgress(report?.permitStatus ?? null, timeline.stages)
    : null;

  // Compute canopy/valuation total for valuation types
  const canopyTotal = isValuationType
    ? property.trees.reduce((sum, t) => sum + (t.valuationAppraisedValue ?? 0), 0)
    : 0;
  const fmtCurrency = (v: number) =>
    v >= 1000 ? `$${Math.round(v).toLocaleString()}` : `$${Math.round(v)}`;

  // Billing data from report
  const hasBilling =
    isCertified &&
    report?.billingIncluded &&
    report?.billingAmount != null &&
    report.billingAmount > 0;
  const billingLineItems = (() => {
    try {
      return report?.billingLineItems ? JSON.parse(report.billingLineItems) : [];
    } catch {
      return [];
    }
  })();

  const reportTypeLabel =
    REPORT_TYPE_LABELS[report?.reportType ?? ""] ?? "Arborist Report";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ==== A. Branded Header ==== */}
      <header className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-5 py-8">
          {/* Company logo */}
          {arborist?.companyLogoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={arborist.companyLogoUrl}
              alt={arborist.companyName ?? "Company logo"}
              className="h-12 w-auto object-contain mb-4"
            />
          )}

          {/* Report type label */}
          <p className="text-xs font-semibold uppercase tracking-wider text-forest mb-1">
            {isRealEstatePackage
              ? (isCertified ? "Certified Tree Canopy Report" : "Draft — Pending Certification")
              : isValuation
                ? (isCertified ? "Certified Tree Appraisal" : "Draft — Pending Certification")
                : (isCertified ? "Certified Arborist Report" : "Draft — Pending Certification")}
          </p>

          {/* Property address */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground font-display leading-tight">
            {property.address}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {property.city}, {property.state}
            {property.zip ? ` ${property.zip}` : ""}
          </p>

          {/* Listing price (real estate package only) */}
          {isRealEstatePackage && report?.reListingPrice != null && report.reListingPrice > 0 && (
            <p className="text-sm text-neutral-600 mt-1 font-medium">
              Listed at {fmtCurrency(report.reListingPrice)}
            </p>
          )}

          {/* Arborist line */}
          {arborist && (
            <p className="text-sm text-neutral-600 mt-3">
              Prepared by {arborist.name}, ISA{" "}
              <span className="font-mono">#{arborist.isaCertificationNum}</span>
              {arborist.companyName ? ` — ${arborist.companyName}` : ""}
            </p>
          )}

          {/* Certification date */}
          {isCertified && (report?.certifiedAt || report?.originalCertifiedAt) && (
            <p className="flex items-center gap-1.5 text-sm text-green-700 mt-2">
              <CheckCircle2 className="h-4 w-4" />
              Certified{" "}
              {new Date(
                (isAmending ? report?.originalCertifiedAt : report?.certifiedAt) ?? report?.certifiedAt ?? ""
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {report?.amendmentNumber != null && report.amendmentNumber > 0 && !isAmending && (
                <span className="text-green-600 text-xs ml-1">(Amended)</span>
              )}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* ==== B. In-Progress Banner (not certified) ==== */}
        {!isCertified && (
          <section>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h2 className="text-lg font-semibold text-amber-800">
                This report is still being prepared
              </h2>
              <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
                Your arborist is finalizing the assessment.
                You&apos;ll be able to view the full report once it has been certified.
              </p>
              {property.trees.length > 0 && (
                <p className="text-sm text-amber-600 mt-3 font-medium">
                  {property.trees.length} tree
                  {property.trees.length !== 1 ? "s" : ""} assessed so far
                </p>
              )}
            </div>
          </section>
        )}

        {/* ==== C. Client Note ==== */}
        {isCertified && report?.clientNote && (
          <section>
            <div className="bg-forest/5 border border-forest/20 rounded-lg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/70 mb-2 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                From Your Arborist
              </p>
              <p className="text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
                {report.clientNote}
              </p>
            </div>
          </section>
        )}

        {/* ==== D. Plain-Language Summary ==== */}
        {isCertified && summary && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              {reportTypeLabel}
            </p>

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {summary.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-lg border p-3 text-center"
                >
                  <p className="text-2xl font-semibold text-neutral-900 font-mono">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Explanation paragraph */}
            <p className="text-sm text-neutral-600 leading-relaxed">
              {summary.explanation}
            </p>
          </section>
        )}

        {/* ==== D2. Prominent Canopy Value (real_estate_package only) ==== */}
        {isCertified && isRealEstatePackage && canopyTotal > 0 && (
          <section>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/70 mb-2">
                Total Certified Tree Canopy Value
              </p>
              <p className="text-4xl sm:text-5xl font-bold font-mono text-forest tracking-tight">
                {fmtCurrency(canopyTotal)}
              </p>
              <p className="text-sm text-neutral-500 mt-3">
                {property.trees.length} tree{property.trees.length !== 1 ? "s" : ""} · Certified{" "}
                {report?.certifiedAt
                  ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </section>
        )}

        {/* ==== D3. Prominent Total Appraised Value (standalone tree_valuation only) ==== */}
        {isCertified && isValuation && canopyTotal > 0 && (
          <section>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/70 mb-2">
                Total Appraised Value
              </p>
              <p className="text-4xl sm:text-5xl font-bold font-mono text-forest tracking-tight">
                {fmtCurrency(canopyTotal)}
              </p>
              <p className="text-sm text-neutral-500 mt-3">
                {property.trees.length} tree{property.trees.length !== 1 ? "s" : ""} · CTLA Trunk Formula Technique · Certified{" "}
                {report?.certifiedAt
                  ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              {report?.valuationPurpose && (
                <p className="text-xs text-neutral-400 mt-2">
                  Purpose: {report.valuationPurpose}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ==== E. Tree Overview Cards ==== */}
        {isCertified && property.trees.length > 0 && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              Trees on This Property ({property.trees.length})
            </p>
            <div className="space-y-3">
              {property.trees.map((tree) => {
                const measurements: string[] = [];
                if (tree.dbhInches && tree.dbhInches > 0) {
                  measurements.push(`${tree.dbhInches}" DBH`);
                }
                if (tree.heightFt != null && tree.heightFt > 0) {
                  measurements.push(`${tree.heightFt} ft tall`);
                }
                if (tree.canopySpreadFt != null && tree.canopySpreadFt > 0) {
                  measurements.push(`${tree.canopySpreadFt} ft spread`);
                }

                const actionText = isRealEstatePackage
                  ? (RE_ACTION_FRIENDLY[tree.recommendedAction] ?? tree.recommendedAction ?? "")
                  : isValuation
                    ? (VALUATION_ACTION_FRIENDLY[tree.recommendedAction] ?? tree.recommendedAction ?? "")
                    : (ACTION_FRIENDLY[tree.recommendedAction] ?? tree.recommendedAction ?? "No recommendation yet");

                // Valuation types (RE + standalone): compact card with expandable detail
                if (isRealEstatePackage || isValuation) {
                  return (
                    <details
                      key={tree.id}
                      className="bg-white rounded-lg border shadow-sm group"
                    >
                      <summary className="p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                                CONDITION_DOT_BG[tree.conditionRating] ?? "bg-neutral-400"
                              }`}
                            />
                            <span className="text-xs font-mono text-neutral-500">
                              #{tree.treeNumber}
                            </span>
                            <h3 className="font-medium text-neutral-900 font-display truncate">
                              {tree.speciesCommon || "Unidentified Species"}
                            </h3>
                          </div>
                          {tree.valuationAppraisedValue != null && tree.valuationAppraisedValue > 0 && (
                            <span className="font-mono font-semibold text-forest text-sm shrink-0 ml-3">
                              {fmtCurrency(tree.valuationAppraisedValue)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 ml-5 text-xs text-neutral-500">
                          {measurements.length > 0 && (
                            <span className="font-mono">{measurements.join(" · ")}</span>
                          )}
                          <span className="text-neutral-400">·</span>
                          <span>{CONDITION_FRIENDLY[tree.conditionRating] ?? "Not assessed"}</span>
                        </div>
                        <p className="text-xs text-forest mt-1.5 ml-5 group-open:hidden">
                          View details ▸
                        </p>
                      </summary>
                      <div className="px-4 pb-4 pt-2 border-t space-y-2">
                        {tree.speciesScientific && (
                          <p className="text-xs text-neutral-400 italic">
                            {tree.speciesScientific}
                          </p>
                        )}
                        <p className="text-sm text-neutral-600">{actionText}</p>
                        {tree.valuationAppraisedValue != null && tree.valuationAppraisedValue > 0 && (
                          <div className="bg-neutral-50 rounded-md p-3 text-xs font-mono text-neutral-600 space-y-0.5">
                            <p>Appraised Value: <span className="font-semibold text-neutral-900">{fmtCurrency(tree.valuationAppraisedValue)}</span></p>
                            {tree.valuationConditionRating != null && (
                              <p>Condition: {tree.valuationConditionRating.toFixed(1)}% · Species: {tree.valuationSpeciesRating ?? 0}% · Location: {(tree.valuationLocationRating ?? 0).toFixed(1)}%</p>
                            )}
                          </div>
                        )}
                        {tree.isProtected && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                            <ShieldCheck className="h-3 w-3" />
                            Protected Tree
                          </span>
                        )}
                      </div>
                    </details>
                  );
                }

                // Standard tree card for other report types
                return (
                  <div
                    key={tree.id}
                    className="bg-white rounded-lg border p-4 shadow-sm"
                  >
                    {/* Row 1: condition dot + tree number + species */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                          CONDITION_DOT_BG[tree.conditionRating] ??
                          "bg-neutral-400"
                        }`}
                      />
                      <span className="text-xs font-mono text-neutral-500">
                        #{tree.treeNumber}
                      </span>
                      <h3 className="font-medium text-neutral-900 font-display">
                        {tree.speciesCommon || "Unidentified Species"}
                      </h3>
                    </div>

                    {/* Scientific name */}
                    {tree.speciesScientific && (
                      <p className="text-xs text-neutral-400 italic ml-5 mb-2">
                        {tree.speciesScientific}
                      </p>
                    )}

                    {/* Measurements row */}
                    {measurements.length > 0 && (
                      <p className="text-xs font-mono text-neutral-500 ml-5 mb-2">
                        {measurements.join(" · ")}
                      </p>
                    )}

                    {/* Condition + Action */}
                    <div className="ml-5 space-y-1">
                      <p className="text-sm text-neutral-600">
                        {CONDITION_FRIENDLY[tree.conditionRating] ?? "Not assessed"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {actionText}
                      </p>
                    </div>

                    {/* Protected badge */}
                    {tree.isProtected && (
                      <div className="ml-5 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                          <ShieldCheck className="h-3 w-3" />
                          Protected Tree
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Not certified — just show tree count */}
        {!isCertified && property.trees.length > 0 && (
          <section>
            <div className="bg-white rounded-lg border p-6 text-center text-neutral-500 text-sm">
              <TreePine className="h-6 w-6 mx-auto mb-2 text-neutral-400" />
              {property.trees.length} tree
              {property.trees.length !== 1 ? "s" : ""} assessed on this
              property. Full details will be available once the report is
              complete.
            </div>
          </section>
        )}

        {/* ==== F. What Happens Next ==== */}

        {/* F1: No-permit jurisdiction (e.g. Reno) — positive framing */}
        {isCertified && report && cityContact && cityContact.jurisdictionType === "no_permit" && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              What To Do With This Report
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <h3 className="font-semibold text-emerald-900">
                    Good news — the City of {property.city} does not require a permit to remove trees on private property.
                  </h3>
                  <p className="text-sm text-emerald-800">
                    {cityContact.submissionMethod}
                  </p>
                  {cityContact.tips.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {cityContact.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                          <span className="text-emerald-400 mt-1 shrink-0">&#8226;</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* City contact info for public right-of-way questions */}
            {cityContact.phone && (
              <div className="bg-white rounded-lg border p-4 space-y-2 mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  {cityContact.department}
                </p>
                <a
                  href={`tel:${cityContact.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-forest hover:text-forest-light font-medium"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {cityContact.phone}
                </a>
                {cityContact.address && (
                  <p className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {cityContact.address}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* F2: Regional authority (e.g. TRPA) — amber warning callout + standard guidance */}
        {isCertified && report && cityContact && cityContact.jurisdictionType === "regional" && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
              What Happens Next
            </p>
            <div className="space-y-4">
              {/* Regional authority warning callout */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-900 text-sm uppercase tracking-wide">
                      Important — {property.city} Properties
                    </h3>
                    {cityContact.coverageNote && (
                      <p className="text-sm text-amber-800 mt-2 leading-relaxed">
                        {cityContact.coverageNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 1: Submit */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    Submit Your Application
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    File your application with the{" "}
                    <span className="font-medium">{cityContact.department}</span>.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {cityContact.submissionMethod}
                  </p>
                  {cityContact.portalUrl && (
                    <a
                      href={cityContact.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-forest hover:bg-forest-light text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Open Agency Portal
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Step 2: Required Documents */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    Required Documents
                  </h3>
                  <ul className="mt-1.5 space-y-1">
                    {cityContact.requiredDocuments.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  {cityContact.applicationFee && (
                    <p className="text-xs text-neutral-500 mt-2">
                      {cityContact.applicationFee}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Agency Review */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    Agency Review
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {cityContact.typicalTimeline}
                  </p>
                </div>
              </div>

              {/* Step 4: After Approval */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    4
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    After Approval
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {cityContact.mitigationSummary}
                  </p>
                </div>
              </div>

              {/* Agency Contact Info Card */}
              <div className="bg-white rounded-lg border p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  {cityContact.department}
                </p>
                {cityContact.phone && (
                  <a
                    href={`tel:${cityContact.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 text-sm text-forest hover:text-forest-light font-medium"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {cityContact.phone}
                  </a>
                )}
                {cityContact.email && (
                  <a
                    href={`mailto:${cityContact.email}`}
                    className="flex items-center gap-2 text-sm text-forest hover:text-forest-light font-medium"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {cityContact.email}
                  </a>
                )}
                {cityContact.address && (
                  <p className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {cityContact.address}
                  </p>
                )}
                {cityContact.hours && (
                  <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {cityContact.hours}
                  </p>
                )}
              </div>

              {/* Tips */}
              {cityContact.tips.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-2">
                  <p className="text-xs font-semibold text-amber-800 mb-2">Tips</p>
                  <ul className="space-y-1.5">
                    {cityContact.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                        <span className="text-amber-400 mt-1 shrink-0">&#8226;</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need help line */}
              {arborist && (
                <p className="text-sm text-neutral-500">
                  Need help?{" "}
                  <span className="font-medium text-neutral-700">
                    {arborist.name}
                  </span>{" "}
                  can assist with the permit process.
                </p>
              )}
            </div>
          </section>
        )}

        {/* F3: Standard city/county submission guidance */}
        {isCertified && report && cityContact &&
         cityContact.jurisdictionType !== "no_permit" &&
         cityContact.jurisdictionType !== "regional" && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
              What Happens Next
            </p>
            <div className="space-y-4">
              {/* Step 1: Submit */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    Submit Your Application
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    File your application with the{" "}
                    <span className="font-medium">{cityContact.department}</span>{" "}
                    in {property.city}.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {cityContact.submissionMethod}
                  </p>
                  {cityContact.portalUrl && (
                    <a
                      href={cityContact.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-forest hover:bg-forest-light text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {cityContact.jurisdictionType === "county" ? "Open County Portal" : "Open City Portal"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!cityContact.portalUrl && cityContact.websiteUrl && (
                    <a
                      href={cityContact.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-forest hover:text-forest-light mt-1.5 font-medium"
                    >
                      {cityContact.jurisdictionType === "county" ? "Visit County Website" : "Visit City Website"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Step 2: Required Documents */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    Required Documents
                  </h3>
                  <ul className="mt-1.5 space-y-1">
                    {cityContact.requiredDocuments.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  {cityContact.applicationFee && (
                    <p className="text-xs text-neutral-500 mt-2">
                      {cityContact.applicationFee}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Review */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    {cityContact.jurisdictionType === "county" ? "County Review" : "City Review"}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {cityContact.typicalTimeline}
                  </p>
                </div>
              </div>

              {/* Step 4: After Approval */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    4
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    After Approval
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {cityContact.mitigationSummary}
                  </p>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-lg border p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  {property.city} {cityContact.department}
                </p>
                {cityContact.phone && (
                  <a
                    href={`tel:${cityContact.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 text-sm text-forest hover:text-forest-light font-medium"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {cityContact.phone}
                  </a>
                )}
                {cityContact.email && (
                  <a
                    href={`mailto:${cityContact.email}`}
                    className="flex items-center gap-2 text-sm text-forest hover:text-forest-light font-medium"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {cityContact.email}
                  </a>
                )}
                {cityContact.address && (
                  <p className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {cityContact.address}
                  </p>
                )}
                {cityContact.hours && (
                  <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {cityContact.hours}
                  </p>
                )}
              </div>

              {/* Tips */}
              {cityContact.tips.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-2">
                  <p className="text-xs font-semibold text-amber-800 mb-2">Tips</p>
                  <ul className="space-y-1.5">
                    {cityContact.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                        <span className="text-amber-400 mt-1 shrink-0">&#8226;</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need help line */}
              {arborist && (
                <p className="text-sm text-neutral-500">
                  Need help?{" "}
                  <span className="font-medium text-neutral-700">
                    {arborist.name}
                  </span>{" "}
                  can assist with the permit process.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Removal permit with unsupported city — generic 3-step guidance */}
        {isCertified &&
          report?.reportType === "removal_permit" &&
          !cityContact && (
            <section>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Submitting Your Report
                </h3>
                <p className="text-gray-700 text-sm">
                  Your arborist report is ready to submit. Here&apos;s the general process
                  for tree removal permits in California cities:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Contact your city&apos;s Planning Department</p>
                      <p className="text-sm text-gray-600">
                        Search for &ldquo;{property.city} tree removal permit&rdquo; or call your city hall to find the right department.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Request a Tree Removal Permit Application</p>
                      <p className="text-sm text-gray-600">
                        Most cities have a specific form. Ask what documents are required — your arborist report will be one of them.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Submit the application with this report</p>
                      <p className="text-sm text-gray-600">
                        Download the PDF below and include it with your permit application.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arborist contact nudge */}
                {arborist && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Your arborist can help with the submission process.{" "}
                      <span className="font-medium text-gray-700">{arborist.name}</span>{" "}
                      is available to answer questions about your report and permit requirements.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

        {/* F5: Non-removal report type next steps (generic) */}
        {isCertified && nextSteps && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              What Happens Next
            </p>
            <div className="bg-white rounded-lg border p-5">
              <h3 className="font-medium text-neutral-900 text-sm mb-1">
                {nextSteps.title}
              </h3>
              <p className="text-sm text-neutral-600">
                {nextSteps.description}
              </p>
            </div>
          </section>
        )}

        {/* ==== F6. About This Report (real_estate_package only) ==== */}
        {isCertified && isRealEstatePackage && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              About This Report
            </p>
            <div className="bg-white rounded-lg border p-5 space-y-3">
              <p className="text-sm text-neutral-600 leading-relaxed">
                This Certified Tree Canopy Report documents the health and appraised
                value of the trees at this property. It was prepared by a licensed
                ISA Certified Arborist in accordance with ISA standards and the CTLA
                Guide for Plant Appraisal, 10th Edition (2019).
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Tree valuations are based on the Trunk Formula Technique, the
                industry standard for tree appraisal used in insurance claims,
                real estate transactions, and municipal assessments.
              </p>
            </div>
          </section>
        )}

        {/* ==== F7. About This Appraisal (standalone tree_valuation only) ==== */}
        {isCertified && isValuation && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              About This Appraisal
            </p>
            <div className="bg-white rounded-lg border p-5 space-y-3">
              <p className="text-sm text-neutral-600 leading-relaxed">
                This certified tree appraisal was prepared by a licensed ISA Certified
                Arborist in accordance with the Council of Tree and Landscape Appraisers
                (CTLA) Guide for Plant Appraisal, 10th Edition (2019), using the Trunk
                Formula Technique.
              </p>
              {report?.valuationPurpose && (
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <span className="font-medium">Purpose:</span> {report.valuationPurpose}
                </p>
              )}
              <p className="text-sm text-neutral-500 leading-relaxed">
                Provide this report to your insurance company, attorney, estate planner,
                or other requesting party as needed.
              </p>
            </div>
          </section>
        )}

        {/* ==== G. Permit Status Pipeline ==== */}
        {isCertified && report?.permitStatus && (
          <section>
            <PermitStatusPipeline
              permitStatus={report.permitStatus}
              submittedAt={report.submittedAt?.toISOString() ?? null}
              submittedTo={report.submittedTo}
              reviewerName={report.reviewerName}
              reviewerNotes={report.reviewerNotes}
              conditionsOfApproval={report.conditionsOfApproval}
              denialReason={report.denialReason}
              approvedAt={report.approvedAt?.toISOString() ?? null}
              permitExpiresAt={report.permitExpiresAt?.toISOString() ?? null}
              certifiedAt={report.certifiedAt?.toISOString() ?? null}
              mode="readonly"
              friendlyLabels
            />
          </section>
        )}

        {/* ==== G2. Permit Processing Timeline ==== */}
        {isCertified &&
         report &&
         isPermitType &&
         report.permitStatus &&
         cityContact?.jurisdictionType !== "no_permit" &&
         timeline &&
         timelineProgress && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Permit Processing Timeline
            </p>
            <div className="bg-white rounded-lg border p-5">
              <div className="space-y-0">
                {timeline.stages.map((stage, idx) => {
                  const isCompleted = timelineProgress.completedKeys.has(stage.key);
                  const isActive = timelineProgress.activeKey === stage.key;
                  const isFuture = !isCompleted && !isActive;
                  const isTerminalNegative = isActive && timelineProgress.terminalStatus !== null;
                  const isLast = idx === timeline.stages.length - 1;

                  // Hide "Permit Active" stage for denied/revision outcomes
                  if (stage.key === "active" && timelineProgress.terminalStatus) return null;

                  const stageDate = getStageDate(
                    stage,
                    report.permitStatus,
                    report.submittedAt,
                    report.approvedAt,
                    isCompleted
                  );

                  return (
                    <div key={stage.key} className="flex gap-3">
                      {/* Left column: circle + vertical line */}
                      <div className="flex flex-col items-center w-4 shrink-0">
                        {/* Circle */}
                        <div
                          className={[
                            "w-3.5 h-3.5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center",
                            isCompleted ? "bg-forest border-forest" : "",
                            isActive && !isTerminalNegative ? "bg-forest border-forest ring-4 ring-forest/20" : "",
                            isActive && timelineProgress.terminalStatus === "denied" ? "bg-red-500 border-red-500 ring-4 ring-red-100" : "",
                            isActive && timelineProgress.terminalStatus === "revision_requested" ? "bg-amber-500 border-amber-500 ring-4 ring-amber-100" : "",
                            isFuture ? "bg-white border-neutral-300" : "",
                          ].filter(Boolean).join(" ")}
                        >
                          {isCompleted && (
                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                          )}
                        </div>
                        {/* Connector line */}
                        {!isLast && !(stage.key === "active" && timelineProgress.terminalStatus) && (
                          <div
                            className={[
                              "w-0.5 flex-1 min-h-[24px]",
                              isCompleted && !isFuture ? "bg-forest" : "bg-neutral-200",
                            ].filter(Boolean).join(" ")}
                          />
                        )}
                      </div>

                      {/* Right column: content */}
                      <div className={isLast || (stage.key === "decision" && timelineProgress.terminalStatus) ? "pb-0" : "pb-5"}>
                        <p
                          className={[
                            "text-sm",
                            isCompleted ? "font-medium text-neutral-900" : "",
                            isActive && !isTerminalNegative ? "font-medium text-forest" : "",
                            isActive && timelineProgress.terminalStatus === "denied" ? "font-medium text-red-700" : "",
                            isActive && timelineProgress.terminalStatus === "revision_requested" ? "font-medium text-amber-700" : "",
                            isFuture ? "text-neutral-400" : "",
                          ].filter(Boolean).join(" ")}
                        >
                          {isTerminalNegative && timelineProgress.terminalStatus === "denied"
                            ? "Permit Denied"
                            : isTerminalNegative && timelineProgress.terminalStatus === "revision_requested"
                            ? "Revision Requested"
                            : stage.label}
                        </p>
                        {stageDate && (
                          <p className={`text-xs mt-0.5 ${isFuture ? "text-neutral-300" : "text-neutral-500"}`}>
                            {stageDate}
                          </p>
                        )}
                        {(isActive || isCompleted) && stage.description && (
                          <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                            {stage.description}
                          </p>
                        )}
                        {/* Terminal negative detail */}
                        {isTerminalNegative && timelineProgress.terminalStatus === "denied" && report.denialReason && (
                          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-sm text-red-800">{report.denialReason}</p>
                          </div>
                        )}
                        {isTerminalNegative && timelineProgress.terminalStatus === "revision_requested" && report.reviewerNotes && (
                          <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                            <p className="text-sm text-amber-800">{report.reviewerNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total estimate + notes */}
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <p className="text-xs text-neutral-500">
                  Estimated total processing time:{" "}
                  <span className="font-medium">{timeline.totalEstimate}</span>
                </p>
                {timeline.notes && (
                  <p className="text-xs text-neutral-400 mt-1 italic">
                    {timeline.notes}
                  </p>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-neutral-400 mt-3 leading-relaxed italic">
                Processing times are estimates based on typical {property.city} permit
                timelines and may vary.
                {cityContact?.phone && (
                  <>
                    {" "}Contact {cityContact.department} at{" "}
                    <a
                      href={`tel:${cityContact.phone.replace(/[^\d+]/g, "")}`}
                      className="text-forest hover:text-forest-light font-medium not-italic"
                    >
                      {cityContact.phone}
                    </a>{" "}
                    for current status.
                  </>
                )}
              </p>
            </div>
          </section>
        )}

        {/* ==== H. PDF Download ==== */}
        {isCertified && report && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm text-center">
              <FileText className="h-8 w-8 text-forest mx-auto mb-3" />
              {cityContact?.jurisdictionType === "no_permit" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Download the full certified report for your records, insurance, or real estate documentation.
                </p>
              ) : cityContact?.jurisdictionType === "regional" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Submit this PDF with your permit application to the{" "}
                  {cityContact.department}.
                </p>
              ) : report.reportType === "removal_permit" && cityContact ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Submit this PDF with your permit application to the{" "}
                  {property.city} {cityContact.department}.
                </p>
              ) : report.reportType === "removal_permit" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Submit this PDF with your tree removal permit application to
                  your local planning department.
                </p>
              ) : report.reportType === "real_estate_package" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Download the Certified Tree Canopy Report for your real estate transaction records, lender, or buyer.
                </p>
              ) : report.reportType === "tree_valuation" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Download the full certified tree appraisal for your insurance claim, legal matter, estate planning, or other needs.
                </p>
              ) : (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Download the full certified report for your records.
                </p>
              )}
              <a
                href={`/api/reports/${report.id}/pdf?token=${token}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-forest hover:bg-forest-light text-white rounded-lg font-medium text-sm transition-colors shadow-sm w-full sm:w-auto justify-center"
                download
              >
                <Download className="h-4 w-4" />
                Download Report (PDF)
              </a>
            </div>
          </section>
        )}

        {/* ==== H2. Billing Section (non-RE/valuation types — RE billing goes after arborist contact) ==== */}
        {hasBilling && report && !isValuationType && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-forest" />
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Amount Due
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {report.billingPaidAt ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid
                    </span>
                  ) : (
                    <p className="text-sm text-neutral-500">Payment requested</p>
                  )}
                </div>
                <p className="text-2xl font-bold font-mono text-neutral-900">
                  ${report.billingAmount!.toFixed(2)}
                </p>
              </div>

              {/* Line Items */}
              {billingLineItems.length > 0 && (
                <div className="border-t pt-3 mb-4 space-y-1">
                  {billingLineItems.map(
                    (item: { description: string; amount: string }, i: number) =>
                      item.description && (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-neutral-600">{item.description}</span>
                          {item.amount && (
                            <span className="font-mono text-neutral-700">
                              ${parseFloat(item.amount).toFixed(2)}
                            </span>
                          )}
                        </div>
                      )
                  )}
                </div>
              )}

              {report.billingPaymentInstructions && (
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Payment Instructions
                  </p>
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {report.billingPaymentInstructions}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==== I. Satellite Map ==== */}
        {mapImageUrl && (
          <section>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mapImageUrl}
              alt={`Satellite map of ${property.address}`}
              className="w-full rounded-lg shadow-sm border"
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
          </section>
        )}

        {/* ==== J0. Realtor Contact Card (real_estate_package only) ==== */}
        {isCertified && isRealEstatePackage && report?.reRealtorName && (
          <section>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-4">
                Listing Agent
              </p>
              <div className="text-sm space-y-1 mb-4">
                <p className="font-medium text-neutral-900">{report.reRealtorName}</p>
                {report.reRealtorCompany && (
                  <p className="text-neutral-600">{report.reRealtorCompany}</p>
                )}
              </div>
              {(report.reRealtorPhone || report.reRealtorEmail) && (
                <div className="grid grid-cols-2 gap-3">
                  {report.reRealtorPhone && (
                    <a
                      href={`tel:${report.reRealtorPhone}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-lg text-sm font-medium transition-colors border border-violet-200"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                  {report.reRealtorEmail && (
                    <a
                      href={`mailto:${report.reRealtorEmail}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-lg text-sm font-medium transition-colors border border-violet-200"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==== J. Arborist Contact Card ==== */}
        {arborist && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                Your Arborist
              </p>
              <div className="flex items-start gap-4 mb-4">
                {arborist.companyLogoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={arborist.companyLogoUrl}
                    alt=""
                    className="h-12 w-12 rounded-lg object-contain border shrink-0"
                  />
                )}
                <div className="text-sm min-w-0">
                  <p className="font-medium text-neutral-900">{arborist.name}</p>
                  {arborist.companyName && (
                    <p className="text-neutral-600">{arborist.companyName}</p>
                  )}
                  <p className="text-neutral-500">
                    ISA Certified Arborist{" "}
                    <span className="font-mono">
                      #{arborist.isaCertificationNum}
                    </span>
                  </p>
                </div>
              </div>

              {/* Tap-to-call / Tap-to-email buttons */}
              {(arborist.companyPhone || arborist.companyEmail) && (
                <div className="grid grid-cols-2 gap-3">
                  {arborist.companyPhone && (
                    <a
                      href={`tel:${arborist.companyPhone}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-forest/5 hover:bg-forest/10 text-forest rounded-lg text-sm font-medium transition-colors border border-forest/20"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                  {arborist.companyEmail && (
                    <a
                      href={`mailto:${arborist.companyEmail}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-forest/5 hover:bg-forest/10 text-forest rounded-lg text-sm font-medium transition-colors border border-forest/20"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  )}
                </div>
              )}

              {/* Website */}
              {arborist.companyWebsite && (
                <a
                  href={arborist.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-sm text-forest hover:text-forest-light mt-3 font-medium"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {arborist.companyWebsite.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </section>
        )}

        {/* Realtor contact card moved to J0 above arborist card */}

        {/* ==== K. Billing Section for RE/Valuation types (positioned last) ==== */}
        {hasBilling && report && isValuationType && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-forest" />
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Amount Due
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {report.billingPaidAt ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid
                    </span>
                  ) : (
                    <p className="text-sm text-neutral-500">Payment requested</p>
                  )}
                </div>
                <p className="text-2xl font-bold font-mono text-neutral-900">
                  ${report.billingAmount!.toFixed(2)}
                </p>
              </div>

              {billingLineItems.length > 0 && (
                <div className="border-t pt-3 mb-4 space-y-1">
                  {billingLineItems.map(
                    (item: { description: string; amount: string }, i: number) =>
                      item.description && (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-neutral-600">{item.description}</span>
                          {item.amount && (
                            <span className="font-mono text-neutral-700">
                              ${parseFloat(item.amount).toFixed(2)}
                            </span>
                          )}
                        </div>
                      )
                  )}
                </div>
              )}

              {report.billingPaymentInstructions && (
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Payment Instructions
                  </p>
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {report.billingPaymentInstructions}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* ==== K. Footer ==== */}
      <footer className="border-t mt-12">
        <div className="max-w-2xl mx-auto px-5 py-4 text-center text-xs text-neutral-400">
          Powered by TreeCertify
        </div>
      </footer>
    </div>
  );
}
