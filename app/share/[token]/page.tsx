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
  Receipt,
} from "lucide-react";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";
import { getCityGuide, getNextStepsText } from "@/lib/city-submission-guides";

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
          invoices: {
            where: { showOnSharePage: true },
            take: 1,
          },
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

  // City guide for removal permits
  const cityGuide =
    isCertified && report?.reportType === "removal_permit"
      ? getCityGuide(property.city)
      : null;

  // Next steps text for non-removal types
  const nextSteps =
    isCertified && report && report.reportType !== "removal_permit"
      ? getNextStepsText(report.reportType, property.city)
      : null;

  // Invoice for share page
  const invoice = report?.invoices?.[0] ?? null;

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

        {/* ==== F. What Happens Next — City-Specific (removal_permit) ==== */}
        {isCertified && report && cityGuide && (
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
                    <span className="font-medium">{cityGuide.department}</span>{" "}
                    in {property.city}.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {cityGuide.submissionMethod}
                  </p>
                  {cityGuide.url && (
                    <a
                      href={cityGuide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-forest hover:text-forest-light mt-1.5 font-medium"
                    >
                      Visit City Website
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
                    {cityGuide.requiredDocuments.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 3: City Review */}
              <div className="flex gap-4">
                <div className="flex-none flex items-start">
                  <span className="h-7 w-7 rounded-full bg-forest text-white text-sm font-semibold flex items-center justify-center">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">
                    City Review
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {cityGuide.typicalTimeline}
                  </p>
                  {cityGuide.fees && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {cityGuide.fees}
                    </p>
                  )}
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
                    {cityGuide.conditions}
                  </p>
                </div>
              </div>

              {/* Tips */}
              {cityGuide.tips && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-2">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Tip:</span> {cityGuide.tips}
                  </p>
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

        {/* Removal permit with unsupported city */}
        {isCertified &&
          report?.reportType === "removal_permit" &&
          !cityGuide && (
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

        {/* Non-removal report type next steps */}
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
              {report.reportType === "removal_permit" && cityGuide ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Submit this PDF with your permit application to the{" "}
                  {property.city} {cityGuide.department}.
                </p>
              ) : report.reportType === "removal_permit" ? (
                <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                  Submit this PDF with your tree removal permit application to
                  your local planning department.
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

        {/* ==== H2. Invoice Section ==== */}
        {isCertified && invoice && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="h-5 w-5 text-forest" />
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Invoice
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-mono font-medium text-neutral-900">
                    {invoice.invoiceNumber}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {invoice.status === "paid" ? (
                      <span className="text-green-700 font-medium">Paid</span>
                    ) : (
                      <>
                        Due{" "}
                        {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </>
                    )}
                  </p>
                </div>
                <p className="text-2xl font-bold font-mono text-neutral-900">
                  ${invoice.total.toFixed(2)}
                </p>
              </div>

              {invoice.paymentInstructions && (
                <div className="bg-neutral-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Payment Instructions
                  </p>
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {invoice.paymentInstructions}
                  </p>
                </div>
              )}

              <a
                href={`/api/invoices/${invoice.id}/pdf?token=${token}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-forest/30 text-forest hover:bg-forest/5 rounded-lg font-medium text-sm transition-colors w-full"
                download
              >
                <Download className="h-4 w-4" />
                Download Invoice (PDF)
              </a>
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
