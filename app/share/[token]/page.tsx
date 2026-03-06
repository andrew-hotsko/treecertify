import { prisma } from "@/lib/db";
import {
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
import { getCityContact, getNextStepsText } from "@/lib/city-contacts";

export const metadata = {
  title: "Tree Assessment Report | TreeCertify",
};

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

interface TreeValuationData {
  appraisedValue?: number;
}

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
        try {
          if (tree.typeSpecificData) {
            const data = JSON.parse(tree.typeSpecificData) as TreeValuationData;
            if (data.appraisedValue != null && data.appraisedValue > 0) {
              totalValue += data.appraisedValue;
              if (data.appraisedValue > highestValue) {
                highestValue = data.appraisedValue;
              }
              valueCount++;
            }
          }
        } catch {
          // skip malformed data
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
// Page
// ---------------------------------------------------------------------------

export default async function SharedPropertyPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const property = await prisma.property.findUnique({
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

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">🔗</div>
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">
            This link is no longer active
          </h1>
          <p className="text-neutral-500 text-sm">
            The property owner may have revoked sharing access, or this link may
            have expired.
          </p>
        </div>
      </div>
    );
  }

  const report = property.reports[0] ?? null;
  const arborist = report?.arborist ?? null;
  const isCertified = report?.status === "certified";

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

  // City contact — now supports all report types and jurisdiction types
  const cityContact =
    isCertified && report
      ? getCityContact(property.city, report.reportType)
      : null;

  // Next steps text for non-removal types (only used when no city-specific contact exists)
  const nextSteps =
    isCertified && report && !cityContact && report.reportType !== "removal_permit"
      ? getNextStepsText(report.reportType)
      : null;

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
        <div className="max-w-2xl mx-auto px-5 py-6">
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
            {isCertified ? "Certified Arborist Report" : "Draft — Pending Certification"}
          </p>

          {/* Property address */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-display leading-tight">
            {property.address}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {property.city}, {property.state}
            {property.zip ? ` ${property.zip}` : ""}
          </p>

          {/* Arborist line */}
          {arborist && (
            <p className="text-sm text-neutral-600 mt-3">
              Prepared by {arborist.name}, ISA{" "}
              <span className="font-mono">#{arborist.isaCertificationNum}</span>
              {arborist.companyName ? ` — ${arborist.companyName}` : ""}
            </p>
          )}

          {/* Certification date */}
          {isCertified && report?.certifiedAt && (
            <p className="flex items-center gap-1.5 text-sm text-green-700 mt-2">
              <CheckCircle2 className="h-4 w-4" />
              Certified{" "}
              {new Date(report.certifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
                Assessment In Progress
              </h2>
              <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
                Your arborist is still working on this tree assessment report.
                Check back soon.
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
                        {ACTION_FRIENDLY[tree.recommendedAction] ??
                          tree.recommendedAction ??
                          "No recommendation yet"}
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

        {/* F4: Removal permit with unsupported city — generic fallback */}
        {isCertified &&
          report?.reportType === "removal_permit" &&
          !cityContact && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                What Happens Next
              </p>
              <div className="bg-white rounded-lg border p-5">
                <p className="text-sm text-neutral-600">
                  Contact your local planning department to submit this arborist
                  report with your tree removal permit application.{" "}
                  {arborist && (
                    <>
                      Your arborist,{" "}
                      <span className="font-medium">{arborist.name}</span>, can
                      help guide you through the process.
                    </>
                  )}
                </p>
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

        {/* ==== H2. Billing Section ==== */}
        {hasBilling && report && (
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

        {/* ==== J2. Realtor Contact Card (real_estate_package only) ==== */}
        {isCertified && report?.reportType === "real_estate_package" && report.reRealtorName && (
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
      </main>

      {/* ==== K. Footer ==== */}
      <footer className="border-t mt-12">
        <div className="max-w-2xl mx-auto px-5 py-4 text-center text-xs text-neutral-400">
          Shared via TreeCertify
        </div>
      </footer>
    </div>
  );
}
