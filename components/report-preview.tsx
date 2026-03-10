"use client";

import { useState } from "react";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronDown, ChevronRight, X } from "lucide-react";
import { formatCurrency, DEFAULT_LIMITING_CONDITIONS } from "@/lib/valuation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreePhoto {
  id: string;
  url: string;
  caption?: string | null;
  category?: string | null;
}

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt?: number | null;
  conditionRating: number;
  isProtected: boolean;
  protectionReason?: string | null;
  recommendedAction: string;
  tagNumber?: string | null;
  treePhotos?: TreePhoto[];
  // Valuation fields
  valuationUnitPrice?: number | null;
  valuationHealthRating?: number | null;
  valuationStructureRating?: number | null;
  valuationFormRating?: number | null;
  valuationConditionRating?: number | null;
  valuationSpeciesRating?: number | null;
  valuationSiteRating?: number | null;
  valuationContributionRating?: number | null;
  valuationLocationRating?: number | null;
  valuationBasicValue?: number | null;
  valuationAppraisedValue?: number | null;
  valuationNotes?: string | null;
  // TRAQ / type-specific
  typeSpecificData?: string | null;
  mitigationRequired?: string | null;
}

interface PropertyInfo {
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  traqCertified?: boolean;
  additionalCerts?: string | null;
  licenseNumbers?: string | null;
  valuationLimitingConditions?: string | null;
}

interface ReportPreviewProps {
  content: string;
  property: PropertyInfo;
  trees: TreeRecord[];
  arborist?: ArboristInfo | null;
  reportType: string;
  certifiedAt?: string | null;
  eSignatureText?: string | null;
  reportOptions?: string | null;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Assessment",
  construction_encroachment: "Tree Protection & Construction Impact Assessment",
  health_assessment: "Tree Health Assessment Report",
  tree_valuation: "Tree Appraisal & Valuation Report",
  real_estate_package: "Certified Tree Canopy Report",
};

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
};

const CONDITION_COLORS: Record<number, string> = {
  0: "#6B6B63", 1: "#dc2626", 2: "#ea580c", 3: "#ca8a04", 4: "#65a30d", 5: "#16a34a",
};

const ACTION_COLORS: Record<string, string> = {
  retain: "#16a34a",
  preserve: "#16a34a",
  remove: "#dc2626",
  monitor: "#ca8a04",
  prune: "#2563eb",
  maintain: "#2563eb",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#e5e4df] rounded" style={{ marginBottom: 8 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-[#FEFDFB] transition-colors"
        style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "10.5pt", fontWeight: 600, color: "#1D4E3E" }}
      >
        {open ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
        {title}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-[#FEFDFB]" style={{ fontSize: "9pt", lineHeight: 1.5 }}>
          <p style={{ fontSize: "8pt", color: "#999", fontStyle: "italic", marginBottom: 10 }}>
            This section is generated from your assessment data. To make changes, update the tree data in the assessment.
          </p>
          {children}
        </div>
      )}
    </div>
  );
}

function PhotoLightbox({
  photo,
  treeName,
  onClose,
}: {
  photo: TreePhoto;
  treeName: string;
  onClose: () => void;
}) {
  const catLabel = photo.category
    ? photo.category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1 hover:bg-white"
        >
          <X className="h-5 w-5 text-neutral-600" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption || treeName}
          className="max-w-full max-h-[75vh] object-contain mx-auto"
        />
        <div className="p-3 text-center" style={{ fontSize: "9pt", color: "#666" }}>
          <p style={{ fontWeight: 600, color: "#1D4E3E" }}>{treeName}{catLabel ? ` — ${catLabel}` : ""}</p>
          {photo.caption && <p style={{ fontStyle: "italic" }}>{photo.caption}</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ReportPreview({
  content,
  property,
  trees,
  arborist,
  reportType,
  certifiedAt,
  eSignatureText,
  reportOptions,
}: ReportPreviewProps) {
  const [lightboxPhoto, setLightboxPhoto] = useState<{ photo: TreePhoto; treeName: string } | null>(null);

  const reportHtml = renderMarkdownToHtml(content);
  const reportLabel =
    REPORT_TYPE_LABELS[reportType] ||
    reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const protectedCount = trees.filter((t) => t.isProtected).length;
  const isValuationType = reportType === "tree_valuation" || reportType === "real_estate_package";
  const isRemovalPermit = reportType === "removal_permit";
  const protectedRemovalTrees = trees.filter((t) => t.isProtected && t.recommendedAction === "remove");

  // Parse report options
  let opts: Record<string, boolean> = {};
  try { opts = JSON.parse(reportOptions || "{}"); } catch { /* default */ }
  const includeTraq = opts.includeTraq ?? (reportType === "health_assessment");

  // Compute action counts for summary row
  const actionCounts: Record<string, number> = {};
  trees.forEach((t) => {
    const a = t.recommendedAction || "retain";
    actionCounts[a] = (actionCounts[a] || 0) + 1;
  });

  // Check if any tree has TRAQ data
  const treesWithTraq = trees.filter((t) => {
    if (!t.typeSpecificData) return false;
    try {
      const d = JSON.parse(t.typeSpecificData);
      return d.likelihoodOfFailure || d.likelihoodOfImpact || d.consequences;
    } catch { return false; }
  });
  const hasTraqData = includeTraq && treesWithTraq.length > 0;

  // Build photo lookup: which tree sections contain ### Tree #N patterns
  const treePhotoMap = new Map<number, TreePhoto[]>();
  trees.forEach((t) => {
    if (t.treePhotos && t.treePhotos.length > 0) {
      treePhotoMap.set(t.treeNumber, t.treePhotos);
    }
  });

  // Inject photo thumbnails after each tree section in the rendered HTML
  const htmlWithPhotos = injectPhotoThumbnails(reportHtml, treePhotoMap);

  // Additional cert parsing
  let additionalCertsArr: string[] = [];
  if (arborist?.additionalCerts) {
    try {
      const parsed = JSON.parse(arborist.additionalCerts);
      if (Array.isArray(parsed)) additionalCertsArr = parsed;
    } catch {
      additionalCertsArr = arborist.additionalCerts.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  return (
    <div className="report-preview-container bg-neutral-50 rounded-lg shadow-sm border border-neutral-300 overflow-hidden">
      {/* ---- Styles scoped to .report-preview (aligned with PDF) ---- */}
      <style>{`
        .report-preview {
          font-family: 'Roboto', 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #3A3A36;
          font-size: 10.5pt;
          line-height: 1.55;
          padding: 24px 16px;
          max-width: 8.5in;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .report-preview {
            padding: 48px 56px;
          }
        }
        .report-preview h1 {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14pt;
          color: #1D4E3E;
          font-weight: 700;
          border-bottom: 2.5px solid #1D4E3E;
          padding-bottom: 5px;
          margin: 32px 0 10px 0;
        }
        .report-preview h2 {
          font-size: 12pt;
          color: #3A3A36;
          font-weight: 600;
          border-bottom: 1px solid #e5e4df;
          padding-bottom: 3px;
          margin: 22px 0 8px 0;
        }
        .report-preview h3 {
          font-size: 10.5pt;
          color: #333;
          font-weight: 600;
          margin: 16px 0 6px 0;
        }
        .report-preview p {
          margin: 6px 0;
        }
        .report-preview ul, .report-preview ol {
          margin: 6px 0;
          padding-left: 24px;
        }
        .report-preview li {
          margin: 3px 0;
        }
        .report-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
          font-size: 9pt;
          display: block;
          overflow-x: auto;
        }
        .report-preview table th {
          background: #1D4E3E;
          color: white;
          padding: 5px 8px;
          text-align: left;
          font-weight: bold;
          font-size: 8.5pt;
          letter-spacing: 0.3px;
        }
        .report-preview table td {
          padding: 4px 8px;
          border-bottom: 1px solid #e5e4df;
        }
        .report-preview table tr:nth-child(even) {
          background: #FEFDFB;
        }
        .report-preview hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 16px 0;
        }
        .report-preview strong {
          font-weight: 700;
        }
        .report-preview em {
          font-style: italic;
        }
        /* Photo thumbnail row injected into report body */
        .report-preview .tree-photo-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
          margin: 8px 0 16px 0;
        }
        .report-preview .tree-photo-thumb {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #e5e4df;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .report-preview .tree-photo-thumb:hover {
          opacity: 0.8;
        }
        .report-preview .tree-photo-more {
          width: 80px;
          height: 80px;
          border-radius: 4px;
          border: 1px solid #e5e4df;
          background: #f5f5f2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8.5pt;
          color: #888;
          font-weight: 500;
          cursor: pointer;
        }
        .report-preview .tree-photo-more:hover {
          background: #eee;
        }
      `}</style>

      <div className="report-preview">
        {/* ---- Company Branding Header ---- */}
        {arborist?.companyLogoUrl && (
          <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: "2.5px solid #1D4E3E" }}>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arborist.companyLogoUrl}
                alt="Company logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                {arborist.companyName && (
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: "12pt", color: "#1D4E3E", margin: 0 }}>
                    {arborist.companyName}
                  </p>
                )}
                {arborist.companyAddress && (
                  <p style={{ fontSize: "9pt", color: "#666", margin: "2px 0" }}>
                    {arborist.companyAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right" style={{ fontSize: "9pt", color: "#666" }}>
              {arborist.companyPhone && <p style={{ margin: "2px 0" }}>{arborist.companyPhone}</p>}
              {arborist.companyEmail && <p style={{ margin: "2px 0" }}>{arborist.companyEmail}</p>}
              {arborist.companyWebsite && <p style={{ margin: "2px 0" }}>{arborist.companyWebsite}</p>}
            </div>
          </div>
        )}

        {/* ---- Header ---- */}
        <div className="text-center pb-5 mb-8" style={{ borderBottom: "3px double #1D4E3E" }}>
          <h1 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "18pt", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#3A3A36", margin: "0 0 4px 0", borderBottom: "none", paddingBottom: 0 }}>
            {reportLabel}
          </h1>
          <p style={{ fontSize: "15pt", color: "#333", margin: "0 0 4px 0" }}>
            {property.address}
          </p>
          <p style={{ fontSize: "11pt", color: "#666", margin: 0 }}>
            {property.city}
            {property.state ? `, ${property.state}` : ", CA"}
            {property.county ? ` \u2014 ${property.county} County` : ""}
          </p>
        </div>

        {/* ---- Report Type Badge ---- */}
        <div className="text-center mb-6">
          <Badge
            variant="outline"
            className="text-[10pt] px-4 py-1.5 border-[#1D4E3E] text-[#1D4E3E]"
          >
            {reportLabel}
          </Badge>
        </div>

        {/* ---- Meta Table ---- */}
        <table className="!text-[10pt]" style={{ marginBottom: 24, display: "table" }}>
          <tbody>
            <tr>
              <td style={{ background: "#f5f5f2", fontWeight: 700, width: "28%", borderBottom: "1px solid #e5e4df" }}>
                Report Type
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>{reportLabel}</td>
              <td style={{ background: "#f5f5f2", fontWeight: 700, width: "18%", borderBottom: "1px solid #e5e4df" }}>
                Date
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            {arborist && (
              <tr>
                <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                  Arborist
                </td>
                <td style={{ borderBottom: "1px solid #e5e4df" }}>{arborist.name}</td>
                <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                  ISA #
                </td>
                <td style={{ borderBottom: "1px solid #e5e4df" }}>{arborist.isaCertificationNum}</td>
              </tr>
            )}
            <tr>
              <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                Property
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>{property.address}</td>
              <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                APN
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>{property.parcelNumber || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                City
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>
                {property.city}
                {property.state ? `, ${property.state}` : ", CA"}
                {property.zip ? ` ${property.zip}` : ""}
              </td>
              <td style={{ background: "#f5f5f2", fontWeight: 700, borderBottom: "1px solid #e5e4df" }}>
                Trees
              </td>
              <td style={{ borderBottom: "1px solid #e5e4df" }}>
                {trees.length} assessed &middot; {protectedCount} protected
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---- Tree Inventory Table ---- */}
        {trees.length > 0 && (
          <>
            <h2 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14pt", color: "#1D4E3E", fontWeight: 700, borderBottom: "2.5px solid #1D4E3E", paddingBottom: 5, margin: "28px 0 8px 0" }}>
              Tree Inventory
            </h2>
            <table style={{ display: "table", fontSize: "8.5pt" }}>
              <thead>
                <tr>
                  <th className="text-right" style={{ width: "5%" }}>#</th>
                  <th className="text-center" style={{ width: "5%" }}>Tag</th>
                  <th>Species</th>
                  <th className="text-right" style={{ width: "6%" }}>DBH</th>
                  <th className="text-right" style={{ width: "5%" }}>Ht.</th>
                  <th className="text-center" style={{ width: "12%" }}>Condition</th>
                  <th className="text-center" style={{ width: "8%" }}>Protected</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree, idx) => {
                  const condLabel = CONDITION_LABELS[tree.conditionRating] ?? `${tree.conditionRating}`;
                  const condColor = CONDITION_COLORS[tree.conditionRating] ?? "#6B6B63";
                  const actionRaw = tree.recommendedAction || "";
                  const actionLabel = actionRaw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A";
                  const actionColor = ACTION_COLORS[actionRaw] || "#3A3A36";

                  return (
                    <tr key={tree.id} style={idx % 2 === 1 ? { background: "#FEFDFB" } : undefined}>
                      <td className="text-right" style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{tree.treeNumber}</td>
                      <td className="text-center">{tree.tagNumber || "\u2014"}</td>
                      <td>
                        {tree.speciesCommon || "Unidentified"}
                        {tree.speciesScientific && (
                          <em style={{ color: "#888", marginLeft: 4 }}>
                            ({tree.speciesScientific})
                          </em>
                        )}
                      </td>
                      <td className="text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{tree.dbhInches}&Prime;</td>
                      <td className="text-right" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {tree.heightFt ? `${tree.heightFt}'` : "\u2014"}
                      </td>
                      <td className="text-center">
                        <span style={{ color: condColor, fontWeight: 600 }}>{condLabel}</span>
                        <span style={{ color: "#999", fontSize: "7pt", marginLeft: 4 }}>({tree.conditionRating}/5)</span>
                      </td>
                      <td className="text-center">
                        {tree.isProtected ? (
                          <span>
                            <span style={{ color: "#1D4E3E", fontSize: "10pt" }}>{"\u{1F6E1}"}</span>
                            {tree.protectionReason && (
                              <span style={{ display: "block", fontSize: "6.5pt", color: "#666" }}>
                                {tree.protectionReason}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span style={{ color: "#ccc" }}>{"\u2014"}</span>
                        )}
                      </td>
                      <td>
                        <span style={{ color: actionColor, fontWeight: 600 }}>{actionLabel}</span>
                      </td>
                    </tr>
                  );
                })}
                {/* Summary row */}
                <tr style={{ backgroundColor: "#F5F4F0", borderTop: "2px solid #1D4E3E" }}>
                  <td colSpan={3} style={{ fontWeight: 700, fontSize: "8.5pt", padding: "7px 6px" }}>
                    TOTAL: {trees.length} Trees
                  </td>
                  <td colSpan={5} style={{ fontWeight: 700, fontSize: "8.5pt", padding: "7px 6px" }}>
                    <strong>Actions:</strong>{" "}
                    {Object.entries(actionCounts).map(([action, count]) => (
                      `${count} ${action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`
                    )).join(", ")}
                    {protectedCount > 0 && (
                      <span> &nbsp;|&nbsp; <strong>{protectedCount} Protected</strong></span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Legend */}
            <p style={{ fontSize: "7.5pt", color: "#999", marginTop: 6, fontStyle: "italic" }}>
              Condition: 0 = Dead &bull; 1 = Critical &bull; 2 = Poor &bull; 3 = Fair &bull; 4 = Good &bull; 5 = Excellent
              &nbsp;|&nbsp; {"\u{1F6E1}"} = Protected under local tree ordinance
            </p>
          </>
        )}

        {/* ---- Report Content (rendered markdown with photo thumbnails) ---- */}
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: htmlWithPhotos }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("tree-photo-thumb") || target.classList.contains("tree-photo-more")) {
              const treeNum = parseInt(target.dataset.treenum || "0");
              const photoIdx = parseInt(target.dataset.photoidx || "0");
              const tree = trees.find((t) => t.treeNumber === treeNum);
              if (tree?.treePhotos && tree.treePhotos[photoIdx]) {
                setLightboxPhoto({
                  photo: tree.treePhotos[photoIdx],
                  treeName: `Tree #${tree.treeNumber} — ${tree.speciesCommon}`,
                });
              } else if (tree?.treePhotos && tree.treePhotos.length > 0) {
                // "+N more" clicked — open first photo
                setLightboxPhoto({
                  photo: tree.treePhotos[0],
                  treeName: `Tree #${tree.treeNumber} — ${tree.speciesCommon}`,
                });
              }
            }
          }}
        />

        {/* ---- Auto-Generated Sections Divider ---- */}
        {(isValuationType || (isRemovalPermit && protectedRemovalTrees.length > 0) || hasTraqData) && (
          <div className="mt-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-[#e5e4df]" />
              <span style={{ fontSize: "8pt", color: "#999", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600, whiteSpace: "nowrap" }}>
                Auto-Generated Sections (included in final PDF)
              </span>
              <div className="flex-1 border-t border-[#e5e4df]" />
            </div>
          </div>
        )}

        {/* ---- Valuation Summary ---- */}
        {isValuationType && (
          <CollapsibleSection title="Valuation Summary">
            <ValuationSummarySection trees={trees} />
          </CollapsibleSection>
        )}

        {/* ---- Mitigation Summary ---- */}
        {isRemovalPermit && protectedRemovalTrees.length > 0 && (
          <CollapsibleSection title="Mitigation Requirements Summary">
            <MitigationSummarySection trees={protectedRemovalTrees} city={property.city} />
          </CollapsibleSection>
        )}

        {/* ---- TRAQ Risk Assessment ---- */}
        {hasTraqData && (
          <CollapsibleSection title="TRAQ Risk Assessment">
            <TraqSummarySection trees={treesWithTraq} />
          </CollapsibleSection>
        )}

        {/* ---- Limiting Conditions ---- */}
        {isValuationType && (
          <CollapsibleSection title="Limiting Conditions and Assumptions">
            <LimitingConditionsSection arborist={arborist} />
          </CollapsibleSection>
        )}

        {/* ---- Certification Box ---- */}
        {certifiedAt && eSignatureText && (
          <div className="mt-10" style={{ border: "2px solid #1D4E3E", borderRadius: 2, padding: "24px 28px", background: "#FBF9F6" }}>
            <div className="flex items-center gap-2 mb-3" style={{ color: "#1D4E3E" }}>
              <CheckCircle2 className="h-5 w-5" />
              <h3 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14pt", fontWeight: 700, margin: 0, color: "#1D4E3E" }}>
                Arborist Certification &amp; Signature
              </h3>
            </div>
            <div style={{ border: "1px solid #e5e4df", borderRadius: 2, padding: "16px 20px", margin: "12px 0 20px 0", background: "#FBF9F6" }}>
              <p style={{ fontSize: "10pt", lineHeight: 1.6, margin: "6px 0" }}>
                I, the undersigned, certify that I have personally inspected the tree(s) described in this
                report and that the information contained herein is accurate to the best of my professional
                knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based
                on my professional training, experience, and education.
              </p>
              <p style={{ fontSize: "10pt", lineHeight: 1.6, margin: "6px 0" }}>
                I have no personal interest or bias with respect to the parties involved. The analysis,
                opinions, and conclusions stated herein are my own, and are based on current scientific
                procedures and facts.
              </p>
            </div>
            <p style={{ fontSize: "10pt", margin: "12px 0 16px 0" }}>
              <strong>Electronically signed by:</strong> {eSignatureText}
            </p>
            {/* Credential details table */}
            <div style={{ border: "1.5px solid #e5e4df", borderRadius: 3, overflow: "hidden" }}>
              {[
                { label: "Name", value: arborist?.name },
                { label: "ISA Certified Arborist", value: arborist ? `#${arborist.isaCertificationNum}` : undefined },
                ...(arborist?.traqCertified ? [{ label: "Qualification", value: "ISA Tree Risk Assessment Qualified" }] : []),
                ...(additionalCertsArr.length > 0 ? [{ label: "Additional Certifications", value: additionalCertsArr.join(", ") }] : []),
                ...(arborist?.licenseNumbers ? [{ label: "License(s)", value: arborist.licenseNumbers }] : []),
                ...(arborist?.companyName ? [{ label: "Company", value: arborist.companyName }] : []),
                { label: "Date", value: new Date(certifiedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
              ].filter((r) => r.value).map((row, idx) => (
                <div
                  key={row.label}
                  style={{
                    padding: "6px 14px",
                    fontSize: "9.5pt",
                    borderBottom: "1px solid #f0f0f0",
                    background: idx % 2 === 1 ? "#FAF9F6" : "transparent",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#555", display: "inline-block", minWidth: 180 }}>
                    {row.label}:
                  </span>{" "}
                  {row.value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto.photo}
          treeName={lightboxPhoto.treeName}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Valuation Summary sub-component
// ---------------------------------------------------------------------------

function ValuationSummarySection({ trees }: { trees: TreeRecord[] }) {
  const treesWithValue = trees.filter((t) => t.valuationAppraisedValue != null && t.valuationAppraisedValue > 0);
  const treesWithoutValue = trees.filter((t) => !t.valuationAppraisedValue || t.valuationAppraisedValue <= 0);
  const totalValue = treesWithValue.reduce((sum, t) => sum + (t.valuationAppraisedValue ?? 0), 0);

  if (treesWithValue.length === 0) {
    return (
      <div style={{ padding: "12px 16px", background: "#fff8e1", border: "1px solid #fde68a", borderRadius: 4, fontSize: "9pt", color: "#92400e" }}>
        <strong>No valuations calculated yet.</strong> Open each tree&apos;s assessment and fill in the CTLA ratings (Health, Structure, Form, Species, Site, Contribution) to generate appraised values.
        <div style={{ marginTop: 8 }}>
          Trees needing valuation: {treesWithoutValue.map((t) => `#${t.treeNumber}`).join(", ")}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Per-tree breakdowns */}
      {treesWithValue.map((t) => {
        const trunkArea = t.dbhInches > 0 ? Math.PI * Math.pow(t.dbhInches / 2, 2) : 0;
        return (
          <div key={t.id} style={{ margin: "12px 0", padding: "10px 12px", border: "1px solid #e5e4df", borderRadius: 4 }}>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "10pt", fontWeight: 600, color: "#1D4E3E", marginBottom: 4 }}>
              Tree #{t.treeNumber} — {t.speciesCommon}{t.speciesScientific ? ` (${t.speciesScientific})` : ""}
            </div>
            <div style={{ fontSize: "8pt", color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6 }}>
              DBH: {t.dbhInches}&Prime; | Height: {t.heightFt ? `${t.heightFt}'` : "\u2014"} | Canopy: {t.canopySpreadFt ? `${t.canopySpreadFt}'` : "\u2014"}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8.5pt", display: "table" }}>
              <tbody>
                <tr><td>Trunk Area:</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>{trunkArea.toFixed(1)} sq in</td></tr>
                <tr><td>Unit Price:</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>&times; ${(t.valuationUnitPrice ?? 38).toFixed(2)}/sq in</td></tr>
                <tr style={{ borderTop: "0.5px solid #ccc" }}><td>Basic Value:</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>= {formatCurrency(t.valuationBasicValue ?? 0)}</td></tr>
                <tr><td>Condition (H:{t.valuationHealthRating ?? 0}/S:{t.valuationStructureRating ?? 0}/F:{t.valuationFormRating ?? 0}):</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>&times; {(t.valuationConditionRating ?? 0).toFixed(1)}%</td></tr>
                <tr><td>Species Rating:</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>&times; {t.valuationSpeciesRating ?? 0}%</td></tr>
                <tr><td>Location (Site:{t.valuationSiteRating ?? 0}/Cont:{t.valuationContributionRating ?? 0}):</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>&times; {(t.valuationLocationRating ?? 0).toFixed(1)}%</td></tr>
                <tr style={{ borderTop: "1.5px solid #1D4E3E" }}><td style={{ fontWeight: 700, color: "#1D4E3E" }}>APPRAISED VALUE:</td><td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: "#1D4E3E" }}>{formatCurrency(t.valuationAppraisedValue ?? 0)}</td></tr>
              </tbody>
            </table>
          </div>
        );
      })}
      {/* Incomplete trees warning */}
      {treesWithoutValue.length > 0 && (
        <div style={{ padding: "8px 12px", background: "#fff8e1", border: "1px solid #fde68a", borderRadius: 4, fontSize: "8.5pt", color: "#92400e", marginTop: 8 }}>
          Trees still needing valuation: {treesWithoutValue.map((t) => `#${t.treeNumber}`).join(", ")}
        </div>
      )}
      {/* Grand total */}
      <div style={{ marginTop: 12, padding: "10px 14px", background: "#1D4E3E", borderRadius: 4, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "10pt" }}>TOTAL APPRAISED VALUE:</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "12pt" }}>{formatCurrency(totalValue)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TRAQ Summary sub-component
// ---------------------------------------------------------------------------

function TraqSummarySection({ trees }: { trees: TreeRecord[] }) {
  return (
    <div>
      {trees.map((tree) => {
        let data: Record<string, unknown> = {};
        try { data = JSON.parse(tree.typeSpecificData || "{}"); } catch { /* skip */ }

        const lof = (data.likelihoodOfFailure as string) || "N/A";
        const loi = (data.likelihoodOfImpact as string) || "N/A";
        const con = (data.consequences as string) || "N/A";
        const overall = (data.overallRiskRating as string) || "N/A";
        const fmtVal = (v: string) => v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        const riskColor = overall.toLowerCase() === "extreme" ? "#dc2626"
          : overall.toLowerCase() === "high" ? "#ea580c"
          : overall.toLowerCase() === "moderate" ? "#ca8a04"
          : "#16a34a";

        return (
          <div key={tree.id} style={{ margin: "10px 0", padding: "10px 12px", border: "1px solid #e5e4df", borderRadius: 4 }}>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "10pt", fontWeight: 600, color: "#1D4E3E", marginBottom: 6 }}>
              Tree #{tree.treeNumber} — {tree.speciesCommon}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8.5pt", display: "table" }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700, background: "#f8f8f8", width: 140, padding: "3px 6px", border: "0.5px solid #e5e4df" }}>Likelihood of Failure</td>
                  <td style={{ padding: "3px 6px", border: "0.5px solid #e5e4df" }}>{fmtVal(lof)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, background: "#f8f8f8", padding: "3px 6px", border: "0.5px solid #e5e4df" }}>Likelihood of Impact</td>
                  <td style={{ padding: "3px 6px", border: "0.5px solid #e5e4df" }}>{fmtVal(loi)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, background: "#f8f8f8", padding: "3px 6px", border: "0.5px solid #e5e4df" }}>Consequences</td>
                  <td style={{ padding: "3px 6px", border: "0.5px solid #e5e4df" }}>{fmtVal(con)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, background: "#f8f8f8", padding: "3px 6px", border: "0.5px solid #e5e4df" }}>Overall Risk Rating</td>
                  <td style={{ padding: "3px 6px", border: "0.5px solid #e5e4df", fontWeight: 700, color: riskColor }}>
                    {fmtVal(overall)}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, background: "#f8f8f8", padding: "3px 6px", border: "0.5px solid #e5e4df" }}>Recommended Action</td>
                  <td style={{ padding: "3px 6px", border: "0.5px solid #e5e4df" }}>{fmtVal(tree.recommendedAction || "N/A")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Limiting Conditions sub-component
// ---------------------------------------------------------------------------

function LimitingConditionsSection({ arborist }: { arborist?: ArboristInfo | null }) {
  let conditions: string[] = [];
  if (arborist?.valuationLimitingConditions) {
    try {
      const parsed = JSON.parse(arborist.valuationLimitingConditions);
      if (Array.isArray(parsed) && parsed.length > 0) conditions = parsed;
    } catch { /* use defaults */ }
  }
  if (conditions.length === 0) {
    conditions = DEFAULT_LIMITING_CONDITIONS;
  }

  return (
    <div style={{ background: "#f5f5f2", border: "1px solid #e0e0dd", borderRadius: 3, padding: "14px 18px" }}>
      <ol style={{ margin: 0, paddingLeft: 20, fontSize: "9pt", lineHeight: 1.6 }}>
        {conditions.map((c, i) => (
          <li key={i} style={{ marginBottom: 6 }}>{c}</li>
        ))}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mitigation Summary sub-component
// ---------------------------------------------------------------------------

function MitigationSummarySection({ trees, city }: { trees: TreeRecord[]; city: string }) {
  // Note: We don't have access to the ordinance DB here (client-side), so we
  // show a simplified mitigation table with a note to refer to the PDF for
  // exact ratios and fees. The PDF (server-side) pulls from the ordinance DB.
  return (
    <div>
      <p style={{ fontSize: "9pt", marginBottom: 10 }}>
        The following protected trees are recommended for removal and will require mitigation
        per the applicable {city} municipal tree ordinance. Exact replacement ratios, minimum sizes,
        and in-lieu fee options are detailed in the final PDF.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8.5pt", display: "table" }}>
        <thead>
          <tr>
            <th style={{ background: "#1D4E3E", color: "white", padding: "4px 8px", textAlign: "center", fontWeight: 700, fontSize: "8pt", letterSpacing: "0.3px" }}>#</th>
            <th style={{ background: "#1D4E3E", color: "white", padding: "4px 8px", textAlign: "left", fontWeight: 700, fontSize: "8pt", letterSpacing: "0.3px" }}>Species</th>
            <th style={{ background: "#1D4E3E", color: "white", padding: "4px 8px", textAlign: "center", fontWeight: 700, fontSize: "8pt", letterSpacing: "0.3px" }}>DBH</th>
            <th style={{ background: "#1D4E3E", color: "white", padding: "4px 8px", textAlign: "left", fontWeight: 700, fontSize: "8pt", letterSpacing: "0.3px" }}>Protection Basis</th>
          </tr>
        </thead>
        <tbody>
          {trees.map((tree, idx) => (
            <tr key={tree.id} style={idx % 2 === 1 ? { background: "#FEFDFB" } : undefined}>
              <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e4df", textAlign: "center", fontWeight: 700 }}>
                {tree.treeNumber}
              </td>
              <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e4df" }}>
                {tree.speciesCommon}
                {tree.speciesScientific && (
                  <em style={{ color: "#888", marginLeft: 4 }}>({tree.speciesScientific})</em>
                )}
              </td>
              <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e4df", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>
                {tree.dbhInches}&Prime;
              </td>
              <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e4df" }}>
                {tree.protectionReason || "Protected"}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#F5F4F0", borderTop: "2px solid #1D4E3E" }}>
            <td colSpan={4} style={{ fontWeight: 700, fontSize: "8.5pt", padding: "7px 8px" }}>
              {trees.length} protected tree{trees.length !== 1 ? "s" : ""} requiring mitigation
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: "7.5pt", color: "#999", marginTop: 6, fontStyle: "italic" }}>
        Replacement ratios, minimum sizes, and in-lieu fee calculations are included in the final PDF based on {city} municipal code.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: Inject photo thumbnails into rendered HTML after each ### Tree #N
// ---------------------------------------------------------------------------

function injectPhotoThumbnails(
  html: string,
  photoMap: Map<number, TreePhoto[]>
): string {
  if (photoMap.size === 0) return html;

  // Find each <h3> that matches "Tree #N" and inject photo row after it
  // We look for the pattern: <h3>Tree #N ...</h3> followed by content until next <h3> or end
  let result = html;

  photoMap.forEach((photos, treeNum) => {
    // Find the heading for this tree — use [\s\S] to match across <em> tags inside the heading
    const headingRegex = new RegExp(`(<h3>(?:(?!<\\/h3>)[\\s\\S])*Tree\\s*#${treeNum}\\b(?:(?!<\\/h3>)[\\s\\S])*<\\/h3>)`, "i");
    const match = result.match(headingRegex);
    if (!match) return;

    const maxShow = 4;
    const shown = photos.slice(0, maxShow);
    const remaining = photos.length - maxShow;

    const thumbs = shown.map((photo, idx) =>
      `<img class="tree-photo-thumb" src="${escapeAttr(photo.url)}" alt="Tree #${treeNum} photo" data-treenum="${treeNum}" data-photoidx="${idx}" />`
    ).join("");

    const moreBtn = remaining > 0
      ? `<div class="tree-photo-more" data-treenum="${treeNum}" data-photoidx="0">+${remaining} more</div>`
      : "";

    const photoRow = `<div class="tree-photo-row">${thumbs}${moreBtn}</div>`;

    // Insert photo row right after the heading
    result = result.replace(match[0], match[0] + photoRow);
  });

  return result;
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
