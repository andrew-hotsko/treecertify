import { prisma } from "@/lib/db";
import { Clock, Download, TreePine, Mail, Phone, Globe } from "lucide-react";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";

export const metadata = {
  title: "Tree Assessment Report | TreeCertify",
};

// ---------------------------------------------------------------------------
// Condition labels & colors (duplicated from condition-rating.tsx for RSC use)
// ---------------------------------------------------------------------------

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_COLORS: Record<number, string> = {
  0: "text-neutral-700",
  1: "text-red-600",
  2: "text-orange-500",
  3: "text-amber-500",
  4: "text-emerald-500",
  5: "text-green-600",
};

// ---------------------------------------------------------------------------
// Homeowner-friendly action translations
// ---------------------------------------------------------------------------

const ACTION_FRIENDLY: Record<string, string> = {
  retain: "This tree is healthy and will be preserved",
  remove: "Removal is recommended — see report for details",
  prune: "Maintenance pruning is recommended",
  monitor: "This tree will be monitored over time",
};

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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ---- Header ---- */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {arborist?.companyLogoUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={arborist.companyLogoUrl}
                  alt={arborist.companyName ?? "Company logo"}
                  className="h-10 w-10 rounded-lg object-contain border"
                />
              )}
              <div>
                <h1 className="text-lg font-semibold text-neutral-900 font-display">
                  {property.address}
                </h1>
                <p className="text-sm text-neutral-500">
                  {arborist?.companyName ?? "Tree Assessment Report"} &middot; {property.city}
                </p>
              </div>
            </div>
            <span className="text-xs text-neutral-400 font-medium tracking-wider uppercase hidden sm:inline">
              TreeCertify
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ---- In Progress Banner (not certified) ---- */}
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
              {arborist && (
                <p className="text-xs text-amber-600 mt-3">
                  Arborist: {arborist.name}
                  {arborist.companyName ? ` — ${arborist.companyName}` : ""}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ---- Permit Status Pipeline (certified only) ---- */}
        {isCertified && report && (
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

        {/* ---- Download Report (certified only) ---- */}
        {isCertified && report && (
          <section className="flex justify-center">
            <a
              href={`/api/reports/${report.id}/pdf?token=${token}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
              download
            >
              <Download className="h-4 w-4" />
              Download Report (PDF)
            </a>
          </section>
        )}

        {/* ---- Map Section ---- */}
        <section>
          {mapImageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={mapImageUrl}
              alt={`Satellite map of ${property.address}`}
              className="w-full rounded-lg shadow-sm border"
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-48 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-sm border">
              No map available
            </div>
          )}
        </section>

        {/* ---- Tree Summary (certified: full details; otherwise: basic count) ---- */}
        {isCertified && property.trees.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              Trees on This Property ({property.trees.length})
            </h2>
            <div className="space-y-3">
              {property.trees.map((tree) => (
                <div
                  key={tree.id}
                  className="bg-white rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-neutral-500">
                          #{tree.treeNumber}
                        </span>
                        <h3 className="font-medium text-neutral-900">
                          {tree.speciesCommon || "Unidentified Species"}
                        </h3>
                      </div>
                      {tree.speciesScientific && (
                        <p className="text-xs text-neutral-400 italic mb-2">
                          {tree.speciesScientific}
                        </p>
                      )}
                      <p className="text-sm text-neutral-600">
                        {ACTION_FRIENDLY[tree.recommendedAction] ??
                          tree.recommendedAction ??
                          "No recommendation yet"}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap ${
                        CONDITION_COLORS[tree.conditionRating] ?? "text-neutral-400"
                      }`}
                    >
                      {CONDITION_LABELS[tree.conditionRating] ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Not certified — just show tree count */}
        {!isCertified && property.trees.length > 0 && (
          <section>
            <div className="bg-white rounded-lg border p-6 text-center text-neutral-500 text-sm">
              <TreePine className="h-6 w-6 mx-auto mb-2 text-neutral-400" />
              {property.trees.length} tree{property.trees.length !== 1 ? "s" : ""} assessed on this property.
              Full details will be available once the report is complete.
            </div>
          </section>
        )}

        {/* ---- Arborist Contact Card ---- */}
        {arborist && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3">
                Your Arborist
              </h2>
              <div className="flex items-start gap-4">
                {arborist.companyLogoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={arborist.companyLogoUrl}
                    alt=""
                    className="h-12 w-12 rounded-lg object-contain border shrink-0"
                  />
                )}
                <div className="space-y-1 text-sm min-w-0">
                  <p className="font-medium text-neutral-900">{arborist.name}</p>
                  {arborist.companyName && (
                    <p className="text-neutral-600">{arborist.companyName}</p>
                  )}
                  <p className="text-neutral-500">
                    ISA Certified Arborist #<span className="font-mono">{arborist.isaCertificationNum}</span>
                  </p>
                  {arborist.companyPhone && (
                    <p className="flex items-center gap-1.5 text-neutral-600">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <a
                        href={`tel:${arborist.companyPhone}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {arborist.companyPhone}
                      </a>
                    </p>
                  )}
                  {arborist.companyEmail && (
                    <p className="flex items-center gap-1.5 text-neutral-600">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <a
                        href={`mailto:${arborist.companyEmail}`}
                        className="hover:text-emerald-600 transition-colors truncate"
                      >
                        {arborist.companyEmail}
                      </a>
                    </p>
                  )}
                  {arborist.companyWebsite && (
                    <p className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                      <a
                        href={arborist.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline truncate"
                      >
                        {arborist.companyWebsite.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-neutral-400">
          Shared via TreeCertify
          {arborist?.companyName ? ` · ${arborist.companyName}` : ""}
        </div>
      </footer>
    </div>
  );
}
