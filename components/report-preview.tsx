"use client";

import { renderMarkdownToHtml } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  isProtected: boolean;
  recommendedAction: string;
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
}

interface ReportPreviewProps {
  content: string;
  property: PropertyInfo;
  trees: TreeRecord[];
  arborist?: ArboristInfo | null;
  reportType: string;
  certifiedAt?: string | null;
  eSignatureText?: string | null;
}

// ---------------------------------------------------------------------------
// Report type display names
// ---------------------------------------------------------------------------

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Application",
  construction_encroachment: "Construction Impact Report",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Tree Valuation Report",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReportPreview({
  content,
  property,
  trees,
  arborist,
  reportType,
  certifiedAt,
  eSignatureText,
}: ReportPreviewProps) {
  const reportHtml = renderMarkdownToHtml(content);
  const reportLabel =
    REPORT_TYPE_LABELS[reportType] ||
    reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const protectedCount = trees.filter((t) => t.isProtected).length;

  return (
    <div className="report-preview-container bg-neutral-50 dark:bg-zinc-950 rounded-lg shadow-md border border-neutral-300 dark:border-zinc-800 overflow-hidden">
      {/* ---- Styles scoped to .report-preview ---- */}
      <style>{`
        .report-preview {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          font-size: 11pt;
          line-height: 1.6;
          padding: 24px 16px;
          max-width: 8.5in;
          margin: 0 auto;
        }
        .dark .report-preview {
          color: #e4e4e7;
        }
        .report-preview h1,
        .report-preview h2,
        .report-preview h3 {
          color: #2d5016;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .dark .report-preview h1,
        .dark .report-preview h2,
        .dark .report-preview h3 {
          color: #6fcf3b;
        }
        .report-preview h1 { font-size: 18pt; }
        .report-preview h2 { font-size: 14pt; }
        .report-preview h3 { font-size: 12pt; }
        .report-preview p {
          margin: 8px 0;
        }
        .report-preview ul, .report-preview ol {
          margin: 8px 0;
          padding-left: 24px;
        }
        .report-preview li {
          margin: 4px 0;
        }
        @media (min-width: 640px) {
          .report-preview {
            padding: 48px 56px;
          }
        }
        .report-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 9pt;
          display: block;
          overflow-x: auto;
        }
        .report-preview table th {
          background: #2d5016;
          color: white;
          padding: 6px 8px;
          text-align: left;
          font-weight: bold;
        }
        .dark .report-preview table th {
          background: #1a3a0a;
        }
        .report-preview table td {
          padding: 5px 8px;
          border: 1px solid #ddd;
        }
        .dark .report-preview table td {
          border-color: #3f3f46;
        }
        .report-preview table tr:nth-child(even) {
          background: #f9f9f6;
        }
        .dark .report-preview table tr:nth-child(even) {
          background: #18181b;
        }
        .report-preview hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 24px 0;
        }
        .dark .report-preview hr {
          border-color: #3f3f46;
        }
        .report-preview strong {
          font-weight: 700;
        }
        .report-preview em {
          font-style: italic;
        }
      `}</style>

      <div className="report-preview">
        {/* ---- Company Branding Header ---- */}
        {arborist?.companyLogoUrl && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-300 dark:border-zinc-700">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arborist.companyLogoUrl}
                alt="Company logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                {arborist.companyName && (
                  <p className="font-bold text-[12pt]">
                    {arborist.companyName}
                  </p>
                )}
                {arborist.companyAddress && (
                  <p className="text-[9pt] text-neutral-500 dark:text-zinc-400">
                    {arborist.companyAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right text-[9pt] text-neutral-500 dark:text-zinc-400">
              {arborist.companyPhone && <p>{arborist.companyPhone}</p>}
              {arborist.companyEmail && <p>{arborist.companyEmail}</p>}
              {arborist.companyWebsite && <p>{arborist.companyWebsite}</p>}
            </div>
          </div>
        )}

        {/* ---- Header ---- */}
        <div className="text-center border-b-[3px] border-double border-[#2d5016] dark:border-[#6fcf3b] pb-5 mb-8">
          <h1 className="text-[18pt] tracking-[2px] uppercase !mt-0 !mb-1">
            Arborist Report
          </h1>
          <h2 className="!text-neutral-700 dark:!text-zinc-300 font-normal !mt-0 !mb-2">
            {property.address}
          </h2>
          <p className="text-[10pt] text-neutral-500 dark:text-zinc-400">
            {property.city}
            {property.state ? `, ${property.state}` : ", CA"}
            {property.county ? ` \u2014 ${property.county} County` : ""}
          </p>
        </div>

        {/* ---- Report Type Badge ---- */}
        <div className="text-center mb-6">
          <Badge
            variant="outline"
            className="text-[10pt] px-4 py-1.5 border-[#2d5016] text-[#2d5016] dark:border-[#6fcf3b] dark:text-[#6fcf3b]"
          >
            {reportLabel}
          </Badge>
        </div>

        {/* ---- Meta Table ---- */}
        <table className="!text-[10pt]" style={{ marginBottom: 24 }}>
          <tbody>
            <tr>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold w-[28%]">
                Report Type
              </td>
              <td>{reportLabel}</td>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold w-[18%]">
                Date
              </td>
              <td>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            {arborist && (
              <tr>
                <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                  Arborist
                </td>
                <td>{arborist.name}</td>
                <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                  ISA #
                </td>
                <td>{arborist.isaCertificationNum}</td>
              </tr>
            )}
            <tr>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                Property
              </td>
              <td>{property.address}</td>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                APN
              </td>
              <td>{property.parcelNumber || "N/A"}</td>
            </tr>
            <tr>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                City
              </td>
              <td>
                {property.city}
                {property.state ? `, ${property.state}` : ", CA"}
                {property.zip ? ` ${property.zip}` : ""}
              </td>
              <td className="!bg-neutral-200 dark:!bg-zinc-800 !font-bold">
                Trees
              </td>
              <td>
                {trees.length} assessed &middot; {protectedCount} protected
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---- Tree Inventory Table ---- */}
        {trees.length > 0 && (
          <>
            <h2 className="!text-[13pt]">Tree Inventory</h2>
            <table>
              <thead>
                <tr>
                  <th className="text-center">Tree&nbsp;#</th>
                  <th>Species</th>
                  <th className="text-center">DBH</th>
                  <th className="text-center">Height</th>
                  <th className="text-center">Condition</th>
                  <th className="text-center">Protected</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree) => (
                  <tr key={tree.id}>
                    <td className="text-center font-bold">{tree.treeNumber}</td>
                    <td>
                      {tree.speciesCommon || "Unidentified"}
                      {tree.speciesScientific && (
                        <em className="text-neutral-500 dark:text-zinc-400 ml-1">
                          ({tree.speciesScientific})
                        </em>
                      )}
                    </td>
                    <td className="text-center">{tree.dbhInches}&Prime;</td>
                    <td className="text-center">
                      {tree.heightFt ? `${tree.heightFt}'` : "N/A"}
                    </td>
                    <td className="text-center">{tree.conditionRating}/5</td>
                    <td className="text-center">
                      {tree.isProtected ? (
                        <span className="inline-flex items-center gap-0.5 text-forest">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Yes
                        </span>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td>{tree.recommendedAction || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ---- Report Content (rendered markdown) ---- */}
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        {/* ---- Certification Box ---- */}
        {certifiedAt && eSignatureText && (
          <div className="mt-10 border-2 border-[#2d5016] dark:border-[#6fcf3b] rounded-lg p-5 bg-[#f8faf5] dark:bg-forest/10">
            <div className="flex items-center gap-2 text-[#2d5016] dark:text-[#6fcf3b] mb-3">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="!mt-0 !mb-0 text-[12pt]">
                Arborist Certification
              </h3>
            </div>
            <p className="text-[10pt]">
              I, the undersigned, certify that I have personally inspected the
              tree(s) described in this report and that the information contained
              herein is accurate to the best of my professional knowledge and
              belief.
            </p>
            <div className="mt-4 space-y-1 text-[10pt]">
              <p>
                <strong>Electronically signed:</strong> {eSignatureText}
              </p>
              {arborist && (
                <p>
                  <strong>ISA Certification #:</strong>{" "}
                  {arborist.isaCertificationNum}
                </p>
              )}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
