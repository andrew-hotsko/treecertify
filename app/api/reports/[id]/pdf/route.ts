import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { renderMarkdownToHtml } from "@/lib/markdown";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Professional report-type titles (formal, uppercase style)
// ---------------------------------------------------------------------------
const REPORT_TYPE_TITLES: Record<string, string> = {
  removal_permit: "Tree Removal Permit Assessment",
  health_assessment: "Tree Health Assessment Report",
  tree_valuation: "Tree Appraisal & Valuation Report",
  construction_encroachment: "Tree Protection & Construction Impact Assessment",
  real_estate_package: "Certified Tree Canopy Report",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let browser;
  try {
    // --- Auth: share token or Clerk session ---
    const url = new URL(request.url);
    const shareToken = url.searchParams.get("token");

    if (shareToken) {
      // Public access via share token — validate token and require certified
      const check = await prisma.report.findUnique({
        where: { id: params.id },
        select: { status: true, property: { select: { shareToken: true } } },
      });
      if (!check || check.property.shareToken !== shareToken || check.status !== "certified") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else {
      // Authenticated access via Clerk
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
              include: {
                treePhotos: { orderBy: { sortOrder: "asc" } },
              },
            },
          },
        },
        arborist: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const content = report.finalContent || report.aiDraftContent || "";
    const property = report.property;
    const trees = property.trees;
    const arborist = report.arborist;
    const isCertified = report.status === "certified";

    const reportTitle =
      REPORT_TYPE_TITLES[report.reportType] ||
      report.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    // Canopy total for real estate package cover page
    const isRealEstate = report.reportType === "real_estate_package";
    const canopyTotal = isRealEstate
      ? trees.reduce((sum, t) => sum + ((t as Record<string, unknown>).valuationAppraisedValue as number ?? 0), 0)
      : 0;
    const fmtCoverMoney = (v: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

    // Parse report options
    let reportOpts: Record<string, boolean> = {};
    try {
      reportOpts = JSON.parse(report.reportOptions || "{}");
    } catch {
      /* default empty */
    }

    const includeTraq =
      reportOpts.includeTraq ??
      report.reportType === "health_assessment";
    const includeCoverLetter =
      reportOpts.includeCoverLetter ??
      report.reportType === "removal_permit";
    const includeMitigation = reportOpts.includeMitigation ?? true;
    const includeSiteMap = reportOpts.includeSiteMap ?? true;

    // Render markdown to HTML
    const bodyHtml = renderMarkdownToHtml(content);

    // Build condition labels
    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // Condition color mapping for inventory table
    const conditionColors: Record<number, string> = {
      0: "#6B6B63",
      1: "#dc2626",
      2: "#ea580c",
      3: "#d97706",
      4: "#65a30d",
      5: "#16a34a",
    };

    // Action color mapping
    const actionColors: Record<string, string> = {
      retain: "#16a34a",
      remove: "#dc2626",
      prune: "#d97706",
      monitor: "#2563eb",
    };

    // =========================================================================
    // COMPANY LOGO (base64)
    // =========================================================================
    let logoBase64 = "";
    if (arborist.companyLogoUrl) {
      const b64 = photoToBase64(arborist.companyLogoUrl);
      if (b64) logoBase64 = b64;
    }

    // =========================================================================
    // TREE INVENTORY TABLE (with protection status & summary row)
    // =========================================================================
    const actionCounts: Record<string, number> = {};
    trees.forEach((t) => {
      const a = t.recommendedAction || "retain";
      actionCounts[a] = (actionCounts[a] || 0) + 1;
    });
    const summaryParts = Object.entries(actionCounts)
      .map(
        ([action, count]) =>
          `${count} ${action.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`
      )
      .join(", ");

    const treeRows = trees
      .map((tree, idx) => {
        const condLabel =
          conditionLabels[tree.conditionRating] ??
          `${tree.conditionRating}`;
        const condColor =
          conditionColors[tree.conditionRating] ?? "#6B6B63";
        const actionRaw = tree.recommendedAction || "";
        const actionLabel =
          actionRaw
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A";
        const actionColor = actionColors[actionRaw] || "#3A3A36";

        // Protection status with shield + code reference
        let protCell = '<span style="color:#ccc;">\u2014</span>';
        if (tree.isProtected) {
          const reason = tree.protectionReason
            ? `<br/><span style="font-size:6.5pt;color:#666;">${esc(tree.protectionReason)}</span>`
            : "";
          protCell = `<span style="color:#1D4E3E;font-size:10pt;">\u{1F6E1}</span>${reason}`;
        }

        return `
      <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
        <td class="num-cell">${tree.treeNumber}</td>
        <td class="center">${esc(tree.tagNumber || "\u2014")}</td>
        <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
        <td class="num-cell">${tree.dbhInches}"</td>
        <td class="num-cell">${tree.heightFt ? `${tree.heightFt}'` : "\u2014"}</td>
        <td class="num-cell">${tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "\u2014"}</td>
        <td class="center"><span style="color:${condColor}; font-weight:600;">${condLabel}</span> <span style="color:#999; font-size:7pt;">(${tree.conditionRating}/5)</span></td>
        <td class="center">${protCell}</td>
        <td><span style="color:${actionColor}; font-weight:600;">${actionLabel}</span></td>
      </tr>`;
      })
      .join("\n");

    // Summary row
    const summaryRow = `
    <tr class="summary-row">
      <td colspan="3"><strong>TOTAL: ${trees.length} Trees</strong></td>
      <td colspan="6"><strong>Actions:</strong> ${summaryParts}${protectedCount > 0 ? ` &nbsp;|&nbsp; <strong>${protectedCount} Protected</strong>` : ""}</td>
    </tr>`;

    // =========================================================================
    // PHOTO DOCUMENTATION (2-column grid grouped by tree)
    // =========================================================================
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    const photoPages = treesWithPhotos
      .map((tree) => {
        const photos = tree.treePhotos || [];
        // Split into chunks of 4 photos per page
        const chunks: typeof photos[] = [];
        for (let i = 0; i < photos.length; i += 4) {
          chunks.push(photos.slice(i, i + 4));
        }

        return chunks
          .map(
            (chunk, chunkIdx) => `
      <div class="photo-group${chunkIdx > 0 ? " page-break" : ""}">
        ${chunkIdx === 0 ? `<h3 class="photo-tree-header">Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</h3>` : `<h3 class="photo-tree-header">Tree #${tree.treeNumber} (continued)</h3>`}
        <div class="photo-grid-2col">
          ${chunk
            .map(
              (
                photo: {
                  url: string;
                  caption?: string | null;
                  isAnnotated?: boolean;
                  originalUrl?: string | null;
                  createdAt?: Date | string;
                  category?: string | null;
                  exifTakenAt?: Date | string | null;
                },
                i: number
              ) => {
                const srcUrl =
                  photo.isAnnotated && photo.originalUrl
                    ? photo.url
                    : photo.url;
                const base64 = photoToBase64(srcUrl);
                // Prefer EXIF date, fall back to upload date
                const dateSource = photo.exifTakenAt || photo.createdAt;
                const photoDate = dateSource
                  ? new Date(dateSource).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "";
                const catLabel = photo.category
                  ? photo.category.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
                  : "";

                // If base64 conversion failed (file missing/deleted), show placeholder
                if (!base64) {
                  return `
            <div class="photo-cell">
              <div style="width:100%;height:200px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;border-radius:6px;color:#9ca3af;font-size:12px;border:1px solid #e5e4df;">Photo unavailable</div>
              <div class="photo-meta">
                <span class="photo-ref">Tree #${tree.treeNumber}${catLabel ? ` &mdash; ${catLabel}` : ""}${photo.isAnnotated ? " (annotated)" : ""}</span>
                ${photoDate ? `<span class="photo-date">${photoDate}</span>` : ""}
              </div>
            </div>`;
                }

                return `
            <div class="photo-cell">
              <img src="${base64}" alt="Tree #${tree.treeNumber} photo ${chunkIdx * 4 + i + 1}" />
              <div class="photo-meta">
                <span class="photo-ref">Tree #${tree.treeNumber}${catLabel ? ` &mdash; ${catLabel}` : ""}${photo.isAnnotated ? " (annotated)" : ""}</span>
                ${photo.caption ? `<span class="photo-caption-text">${esc(photo.caption)}</span>` : ""}
                ${photoDate ? `<span class="photo-date">${photoDate}</span>` : ""}
              </div>
            </div>`;
              }
            )
            .join("")}
        </div>
      </div>`
          )
          .join("\n");
      })
      .join("\n");

    // =========================================================================
    // COVER LETTER (removal permit only, when enabled)
    // =========================================================================
    let coverLetterHtml = "";
    if (includeCoverLetter && report.reportType === "removal_permit") {
      const removalCount = trees.filter(
        (t) => t.recommendedAction === "remove"
      ).length;
      const ordinance = await prisma.municipalOrdinance.findUnique({
        where: { cityName: property.city },
      });

      coverLetterHtml = `
  <div class="cover-letter">
    <div class="cl-letterhead">
      ${arborist.companyName ? `<p class="cl-company">${esc(arborist.companyName)}</p>` : ""}
      ${arborist.companyAddress ? `<p class="cl-contact">${esc(arborist.companyAddress)}</p>` : ""}
      <p class="cl-contact">
        ${[arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).join(" &bull; ")}
      </p>
    </div>

    <p class="cl-date">${dateStr}</p>

    <div class="cl-recipient">
      <p>${esc(property.city)} Planning Department</p>
      <p>Urban Forestry / Tree Preservation</p>
      <p>${esc(property.city)}, ${property.state || "CA"}</p>
    </div>

    <p class="cl-re">
      <strong>RE: Tree Removal Permit Application</strong><br>
      Property: ${esc(property.address)}, ${esc(property.city)}, ${property.state || "CA"}<br>
      ${property.parcelNumber ? `APN: ${esc(property.parcelNumber)}<br>` : ""}
    </p>

    <p>Dear Urban Forestry Division,</p>

    <p>This letter accompanies the attached Arborist Report in support of a tree removal permit application for
    ${removalCount} tree${removalCount !== 1 ? "s" : ""} at the above-referenced property${ordinance?.codeReference ? ` pursuant to ${esc(ordinance.codeReference)}` : ""}.</p>

    <p>As a certified arborist (ISA #${esc(arborist.isaCertificationNum)}), I have conducted a Level 2 Basic Assessment
    of ${trees.length} tree${trees.length !== 1 ? "s" : ""} on the property in accordance with ISA Tree Risk Assessment
    Qualification (TRAQ) methodology and ANSI A300 standards. The attached report provides detailed findings including
    individual tree assessments, risk analysis, and recommendations.</p>

    ${
      protectedCount > 0
        ? `
    <p><strong>Protected Trees:</strong> ${protectedCount} of ${trees.length} trees assessed meet the criteria for
    protected status under the applicable municipal tree ordinance. The report includes detailed justification for
    the requested removal${protectedCount > 1 ? "s" : ""}, including risk assessment findings, retention feasibility
    analysis, and proposed mitigation measures as required.</p>`
        : ""
    }

    <p>The enclosed report includes:</p>
    <ul>
      <li>Complete tree inventory with species, dimensions, and condition ratings</li>
      <li>Individual tree health and structural assessments</li>
      <li>Risk analysis and removal justification for each tree proposed for removal</li>
      ${includeTraq ? "<li>ISA TRAQ Level 2 Basic Assessment forms for each tree</li>" : ""}
      ${includeMitigation && protectedCount > 0 ? "<li>Mitigation requirements and replacement calculations</li>" : ""}
      <li>Arborist certification and credentials</li>
    </ul>

    <p>I am available to discuss these findings or provide additional information as needed to facilitate
    the permit review process. Please do not hesitate to contact me at the information provided above.</p>

    <p>Respectfully submitted,</p>

    <div class="cl-signature">
      <p class="cl-sig-name">${esc(arborist.name)}</p>
      <p>ISA Certified Arborist #${esc(arborist.isaCertificationNum)}</p>
      ${arborist.companyName ? `<p>${esc(arborist.companyName)}</p>` : ""}
    </div>
  </div>
  <div class="page-break"></div>
  `;
    }

    // =========================================================================
    // TRAQ APPENDIX
    // =========================================================================
    let traqAppendix = "";
    if (
      includeTraq &&
      (report.reportType === "health_assessment" ||
        report.reportType === "removal_permit")
    ) {
      const traqForms = trees
        .map((tree) => {
          let data: Record<string, unknown> = {};
          if (tree.typeSpecificData) {
            try {
              data = JSON.parse(tree.typeSpecificData);
            } catch {
              // skip
            }
          }

          const lof = (
            (data.likelihoodOfFailure as string) || ""
          ).toLowerCase();
          const loi = (
            (data.likelihoodOfImpact as string) || ""
          ).toLowerCase();
          const con = ((data.consequences as string) || "").toLowerCase();
          const overallRisk = fmtEnum(data.overallRiskRating as string);
          const overallRiskRaw = (
            (data.overallRiskRating as string) || ""
          ).toLowerCase();
          const target = (data.targetDescription as string) || "";
          const targetZone = (data.targetZone as string) || "";
          const occupancy = (data.occupancyRate as string) || "Frequent";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          const chk = (val: string, match: string) =>
            val === match ? "\u2611" : "\u2610";

          const m1Lookup: Record<string, Record<string, string>> = {
            imminent: {
              very_low: "Unlikely",
              low: "Somewhat likely",
              medium: "Likely",
              high: "Very likely",
            },
            probable: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Somewhat likely",
              high: "Likely",
            },
            possible: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Unlikely",
              high: "Somewhat likely",
            },
            improbable: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Unlikely",
              high: "Unlikely",
            },
          };
          const failureAndImpact =
            lof && loi ? m1Lookup[lof]?.[loi] || "N/A" : "N/A";
          const faiKey = failureAndImpact.toLowerCase().replace(/ /g, "_");

          const m2Lookup: Record<string, Record<string, string>> = {
            very_likely: {
              negligible: "Low",
              minor: "Moderate",
              significant: "High",
              severe: "Extreme",
            },
            likely: {
              negligible: "Low",
              minor: "Moderate",
              significant: "High",
              severe: "High",
            },
            somewhat_likely: {
              negligible: "Low",
              minor: "Low",
              significant: "Moderate",
              severe: "Moderate",
            },
            unlikely: {
              negligible: "Low",
              minor: "Low",
              significant: "Low",
              severe: "Low",
            },
          };
          const computedRisk =
            faiKey && con
              ? m2Lookup[faiKey]?.[con] || overallRisk
              : overallRisk;

          const m1Cell = (rowKey: string, colKey: string) => {
            const isActive = lof === rowKey && loi === colKey;
            return isActive ? 'class="matrix-active"' : "";
          };
          const m2Cell = (rowKey: string, colKey: string) => {
            const isActive = faiKey === rowKey && con === colKey;
            return isActive ? 'class="matrix-active"' : "";
          };

          return `
    <div class="traq-form">
      <div class="traq-header">
        <h3>ISA TRAQ Level 2 \u2014 Basic Assessment</h3>
        <p class="traq-subtitle">Tree Risk Assessment Qualification</p>
      </div>

      <table class="traq-info-table">
        <tr>
          <td class="traq-label">Assessor</td>
          <td>${esc(arborist.name)} (ISA #${esc(arborist.isaCertificationNum)})</td>
          <td class="traq-label">Date</td>
          <td>${dateStr}</td>
        </tr>
        <tr>
          <td class="traq-label">Address</td>
          <td colspan="3">${esc(property.address)}, ${esc(property.city)}, ${property.state || "CA"}</td>
        </tr>
        <tr>
          <td class="traq-label">Tree Species</td>
          <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
          <td class="traq-label">Tree #</td>
          <td>${tree.treeNumber}${tree.tagNumber ? ` (Tag: ${esc(tree.tagNumber)})` : ""}</td>
        </tr>
        <tr>
          <td class="traq-label">DBH</td>
          <td>${tree.dbhInches}"</td>
          <td class="traq-label">Height</td>
          <td>${tree.heightFt ? tree.heightFt + "'" : "N/A"}</td>
        </tr>
        <tr>
          <td class="traq-label">Crown Spread</td>
          <td>${tree.canopySpreadFt ? tree.canopySpreadFt + "'" : "N/A"}</td>
          <td class="traq-label">Condition</td>
          <td>${conditionLabels[tree.conditionRating] ?? tree.conditionRating} (${tree.conditionRating}/5)</td>
        </tr>
      </table>

      <div class="traq-section-header">Targets</div>
      <table class="traq-target-table">
        <thead>
          <tr><th>#</th><th>Target Description</th><th>Target Zone</th><th>Occupancy Rate</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${esc(target || "\u2014")}</td>
            <td>${esc(targetZone || "\u2014")}</td>
            <td>${esc(occupancy)}</td>
          </tr>
        </tbody>
      </table>

      <div class="traq-section-header">Tree Health &amp; Structural Assessment</div>
      <table class="traq-data-table">
        <tr>
          <td class="traq-label">Tree Health</td>
          <td>
            ${chk(String(tree.conditionRating <= 1 ? 1 : 0), "1")} Dead/Dying &nbsp;
            ${chk(String(tree.conditionRating === 2 ? 1 : 0), "1")} Poor &nbsp;
            ${chk(String(tree.conditionRating === 3 ? 1 : 0), "1")} Fair &nbsp;
            ${chk(String(tree.conditionRating >= 4 ? 1 : 0), "1")} Good
          </td>
        </tr>
        <tr>
          <td class="traq-label">Health Notes</td>
          <td>${formatNotesForTRAQ(tree.healthNotes, "No health defects noted.")}</td>
        </tr>
        <tr>
          <td class="traq-label">Structural Notes</td>
          <td>${formatNotesForTRAQ(tree.structuralNotes, "No structural defects noted.")}</td>
        </tr>
      </table>

      <div class="traq-section-header">Risk Rating</div>
      <table class="traq-risk-table">
        <tr>
          <td class="traq-label">Likelihood of Failure</td>
          <td>
            ${chk(lof, "improbable")} Improbable &nbsp;
            ${chk(lof, "possible")} Possible &nbsp;
            ${chk(lof, "probable")} Probable &nbsp;
            ${chk(lof, "imminent")} Imminent
          </td>
        </tr>
        <tr>
          <td class="traq-label">Likelihood of Impact</td>
          <td>
            ${chk(loi, "very_low")} Very Low &nbsp;
            ${chk(loi, "low")} Low &nbsp;
            ${chk(loi, "medium")} Medium &nbsp;
            ${chk(loi, "high")} High
          </td>
        </tr>
        <tr>
          <td class="traq-label">Consequences</td>
          <td>
            ${chk(con, "negligible")} Negligible &nbsp;
            ${chk(con, "minor")} Minor &nbsp;
            ${chk(con, "significant")} Significant &nbsp;
            ${chk(con, "severe")} Severe
          </td>
        </tr>
      </table>

      <div class="traq-overall-risk traq-risk-${overallRiskRaw || "none"}">
        <strong>OVERALL RISK RATING:</strong>
        <span class="traq-risk-value">${(computedRisk || overallRisk || "N/A").toUpperCase()}</span>
      </div>

      <div class="traq-matrices">
        <div class="matrix-pair">
          <div class="matrix">
            <p class="matrix-title">Matrix 1: Likelihood of Failure &amp; Impact</p>
            <table class="matrix-table">
              <thead>
                <tr><th>Failure \u2193 / Impact \u2192</th><th>Very Low</th><th>Low</th><th>Medium</th><th>High</th></tr>
              </thead>
              <tbody>
                <tr><td>Imminent</td><td ${m1Cell("imminent", "very_low")}>Unlikely</td><td ${m1Cell("imminent", "low")}>Somewhat</td><td ${m1Cell("imminent", "medium")}>Likely</td><td ${m1Cell("imminent", "high")}>Very likely</td></tr>
                <tr><td>Probable</td><td ${m1Cell("probable", "very_low")}>Unlikely</td><td ${m1Cell("probable", "low")}>Unlikely</td><td ${m1Cell("probable", "medium")}>Somewhat</td><td ${m1Cell("probable", "high")}>Likely</td></tr>
                <tr><td>Possible</td><td ${m1Cell("possible", "very_low")}>Unlikely</td><td ${m1Cell("possible", "low")}>Unlikely</td><td ${m1Cell("possible", "medium")}>Unlikely</td><td ${m1Cell("possible", "high")}>Somewhat</td></tr>
                <tr><td>Improbable</td><td ${m1Cell("improbable", "very_low")}>Unlikely</td><td ${m1Cell("improbable", "low")}>Unlikely</td><td ${m1Cell("improbable", "medium")}>Unlikely</td><td ${m1Cell("improbable", "high")}>Unlikely</td></tr>
              </tbody>
            </table>
          </div>
          <div class="matrix">
            <p class="matrix-title">Matrix 2: Risk Rating</p>
            <table class="matrix-table">
              <thead>
                <tr><th>F&amp;I \u2193 / Conseq. \u2192</th><th>Negligible</th><th>Minor</th><th>Significant</th><th>Severe</th></tr>
              </thead>
              <tbody>
                <tr><td>Very likely</td><td ${m2Cell("very_likely", "negligible")}>Low</td><td ${m2Cell("very_likely", "minor")}>Moderate</td><td ${m2Cell("very_likely", "significant")}>High</td><td ${m2Cell("very_likely", "severe")}>Extreme</td></tr>
                <tr><td>Likely</td><td ${m2Cell("likely", "negligible")}>Low</td><td ${m2Cell("likely", "minor")}>Moderate</td><td ${m2Cell("likely", "significant")}>High</td><td ${m2Cell("likely", "severe")}>High</td></tr>
                <tr><td>Somewhat likely</td><td ${m2Cell("somewhat_likely", "negligible")}>Low</td><td ${m2Cell("somewhat_likely", "minor")}>Low</td><td ${m2Cell("somewhat_likely", "significant")}>Moderate</td><td ${m2Cell("somewhat_likely", "severe")}>Moderate</td></tr>
                <tr><td>Unlikely</td><td ${m2Cell("unlikely", "negligible")}>Low</td><td ${m2Cell("unlikely", "minor")}>Low</td><td ${m2Cell("unlikely", "significant")}>Low</td><td ${m2Cell("unlikely", "severe")}>Low</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="traq-section-header">Recommended Action &amp; Mitigation</div>
      <table class="traq-data-table">
        <tr>
          <td class="traq-label">Recommended Action</td>
          <td>${fmtEnum(tree.recommendedAction)}</td>
          <td class="traq-label">Priority</td>
          <td>${fmtEnum((data.maintenancePriority as string) || "N/A")}</td>
        </tr>
        <tr>
          <td class="traq-label">Timeline</td>
          <td>${(data.maintenanceTimeline as string) || "N/A"}</td>
          <td class="traq-label">Mitigation</td>
          <td>${tree.mitigationRequired || "None"}</td>
        </tr>
        <tr>
          <td class="traq-label">Maintenance Items</td>
          <td colspan="3">${esc(maintenance)}</td>
        </tr>
      </table>

      <div class="traq-footer-note">
        <p>Inspection limitations: Visual assessment from ground level. Tools: N/A</p>
        <p>Data: \u2611 Final &nbsp; \u2610 Preliminary</p>
      </div>

      <div class="traq-signature">
        <div class="traq-sig-line">
          <span>${isCertified ? esc(report.eSignatureText || arborist.name) : "________________________"}</span>
          <p>Assessor Signature</p>
        </div>
        <div class="traq-sig-line">
          <span>${arborist.isaCertificationNum}</span>
          <p>ISA Certification #</p>
        </div>
        <div class="traq-sig-line">
          <span>${dateStr}</span>
          <p>Date</p>
        </div>
      </div>
    </div>`;
        })
        .join("\n");

      traqAppendix = `
      <div class="page-break"></div>
      <h2 class="section-title">Appendix: TRAQ Risk Assessment Forms</h2>
      <p class="appendix-subtitle">ISA Tree Risk Assessment Qualification (TRAQ) \u2014 Level 2 Basic Assessment</p>
      ${traqForms}`;
    }

    // =========================================================================
    // MITIGATION SUMMARY TABLE
    // =========================================================================
    let mitigationHtml = "";
    if (includeMitigation) {
      const protectedRemovalTrees = trees.filter(
        (t) => t.isProtected && t.recommendedAction === "remove"
      );

      if (protectedRemovalTrees.length > 0) {
        const ordinance = await prisma.municipalOrdinance.findUnique({
          where: { cityName: property.city },
        });

        let mitigationRules: Record<string, unknown> = {};
        if (ordinance?.mitigationRules) {
          try {
            mitigationRules = JSON.parse(ordinance.mitigationRules);
          } catch {
            /* ignore */
          }
        }

        const replacementRatio =
          (mitigationRules.replantingRatio as string) || "3:1";
        const minBoxSize =
          (mitigationRules.minBoxSize as string) || "24-inch box";
        const inLieuFeePerTree =
          (mitigationRules.inLieuFeePerTree as number) || null;

        const ratioNum = parseInt(replacementRatio.split(":")[0]) || 3;

        const rows = protectedRemovalTrees
          .map((tree) => {
            const replacementsRequired = ratioNum;
            const feeTotal = inLieuFeePerTree
              ? inLieuFeePerTree * replacementsRequired
              : null;

            return `
          <tr>
            <td class="center">#${tree.treeNumber}</td>
            <td>${esc(tree.speciesCommon)}</td>
            <td class="center">${tree.dbhInches}"</td>
            <td>${esc(tree.protectionReason || "Protected")}</td>
            <td class="center">${replacementRatio}</td>
            <td class="center">${replacementsRequired} tree${replacementsRequired !== 1 ? "s" : ""}</td>
            <td class="center">${minBoxSize} min.</td>
            ${inLieuFeePerTree ? `<td class="center">$${feeTotal!.toLocaleString()}</td>` : ""}
          </tr>`;
          })
          .join("\n");

        const totalReplacements = protectedRemovalTrees.length * ratioNum;
        const totalFee = inLieuFeePerTree
          ? totalReplacements * inLieuFeePerTree
          : null;

        mitigationHtml = `
    <div class="page-break"></div>
    <h2 class="section-title">Appendix: Mitigation Requirements Summary</h2>
    <p class="mitigation-intro">The following mitigation is required for the removal of protected trees
    ${ordinance?.codeReference ? `per ${esc(ordinance.codeReference)}` : "per applicable municipal tree ordinance"}.</p>

    <table class="mitigation-table">
      <thead>
        <tr>
          <th>Tree</th>
          <th>Species</th>
          <th>DBH</th>
          <th>Protection Basis</th>
          <th>Ratio</th>
          <th>Replacements</th>
          <th>Min. Size</th>
          ${inLieuFeePerTree ? "<th>In-Lieu Fee</th>" : ""}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
        <tr class="mitigation-total">
          <td colspan="5"><strong>TOTAL MITIGATION REQUIRED</strong></td>
          <td class="center"><strong>${totalReplacements} trees</strong></td>
          <td class="center"><strong>${minBoxSize}</strong></td>
          ${totalFee ? `<td class="center"><strong>$${totalFee.toLocaleString()}</strong></td>` : ""}
        </tr>
      </tfoot>
    </table>

    ${
      inLieuFeePerTree
        ? `
    <p class="mitigation-note">
      <strong>Note:</strong> The property owner may elect to plant replacement trees on-site at the required ratio
      and size, or pay the in-lieu fee of $${inLieuFeePerTree.toLocaleString()} per required replacement tree to
      the city's tree replacement fund. Contact the city Urban Forestry division for current fee schedules and
      approved replacement species lists.
    </p>`
        : `
    <p class="mitigation-note">
      <strong>Note:</strong> Contact the ${esc(property.city)} Urban Forestry division for current mitigation
      requirements, approved replacement species lists, and any applicable in-lieu fee options.
    </p>`
    }
    `;
      }
    }

    // =========================================================================
    // VALUATION SUMMARY (tree_valuation reports only)
    // =========================================================================
    let valuationSummaryHtml = "";
    if (report.reportType === "tree_valuation" || report.reportType === "real_estate_package") {
      const treesWithValue = trees.filter(t => t.valuationAppraisedValue != null && t.valuationAppraisedValue > 0);
      const totalValue = treesWithValue.reduce((sum, t) => sum + (t.valuationAppraisedValue ?? 0), 0);

      const fmtMoney = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

      // Per-tree valuation breakdown boxes
      const treeBreakdowns = treesWithValue.map(t => {
        const trunkArea = t.dbhInches > 0 ? Math.PI * Math.pow(t.dbhInches / 2, 2) : 0;
        return `
        <div class="val-tree-box">
          <div class="val-tree-header">Tree #${t.treeNumber} — ${esc(t.speciesCommon)}${t.speciesScientific ? ` <em>(${esc(t.speciesScientific)})</em>` : ""}</div>
          <div class="val-tree-meta">DBH: ${t.dbhInches}" | Height: ${t.heightFt ? t.heightFt + "'" : "\u2014"} | Canopy: ${t.canopySpreadFt ? t.canopySpreadFt + "'" : "\u2014"}</div>
          <table class="val-calc-table">
            <tr><td>Trunk Cross-Sectional Area:</td><td class="val-num">${trunkArea.toFixed(1)} sq in</td></tr>
            <tr><td>Unit Price:</td><td class="val-num">\u00D7 $${(t.valuationUnitPrice ?? 38).toFixed(2)}/sq in</td></tr>
            <tr class="val-subtotal"><td>Basic Value:</td><td class="val-num">= ${fmtMoney(t.valuationBasicValue ?? 0)}</td></tr>
            <tr><td>Condition (H:${t.valuationHealthRating ?? 0}/S:${t.valuationStructureRating ?? 0}/F:${t.valuationFormRating ?? 0}):</td><td class="val-num">\u00D7 ${(t.valuationConditionRating ?? 0).toFixed(1)}%</td></tr>
            <tr><td>Species Rating:</td><td class="val-num">\u00D7 ${t.valuationSpeciesRating ?? 0}%</td></tr>
            <tr><td>Location (Site:${t.valuationSiteRating ?? 0}/Cont:${t.valuationContributionRating ?? 0}):</td><td class="val-num">\u00D7 ${(t.valuationLocationRating ?? 0).toFixed(1)}%</td></tr>
            <tr class="val-total"><td><strong>APPRAISED VALUE:</strong></td><td class="val-num"><strong>${fmtMoney(t.valuationAppraisedValue ?? 0)}</strong></td></tr>
          </table>
          ${t.valuationNotes ? `<div class="val-notes">${esc(t.valuationNotes)}</div>` : ""}
        </div>`;
      }).join("\n");

      // Summary table
      const summaryValRows = treesWithValue.map((t, idx) => `
        <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
          <td class="num-cell">${t.treeNumber}</td>
          <td>${esc(t.speciesCommon)}</td>
          <td class="num-cell">${t.dbhInches}"</td>
          <td class="num-cell">${(t.valuationConditionRating ?? 0).toFixed(1)}%</td>
          <td class="num-cell" style="font-weight:600;">${fmtMoney(t.valuationAppraisedValue ?? 0)}</td>
        </tr>`).join("\n");

      valuationSummaryHtml = `
        <div class="page-break"></div>
        <h2 class="section-title">Valuation Summary</h2>

        <div class="val-meta">
          <p><strong>Property:</strong> ${esc(property.address)}, ${esc(property.city)}, ${property.state}</p>
          <p><strong>Date of Assessment:</strong> ${new Date(report.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          <p><strong>Method:</strong> Trunk Formula Technique, Cost Approach (Reproduction Method)</p>
          <p><strong>Standard:</strong> CTLA Guide for Plant Appraisal, 10th Edition (2019)</p>
          ${report.valuationPurpose ? `<p><strong>Purpose:</strong> ${esc(report.valuationPurpose)}</p>` : report.reportType === "real_estate_package" ? `<p><strong>Purpose:</strong> Real Estate Transaction</p>` : ""}
        </div>

        ${treeBreakdowns}

        <h3 style="margin-top:24pt;margin-bottom:8pt;font-family:'Instrument Sans',sans-serif;font-size:12pt;color:#1D4E3E;">Tree Inventory Value Summary</h3>
        <table class="inventory-table">
          <thead>
            <tr>
              <th class="num-cell" style="width:8%">Tree</th>
              <th>Species</th>
              <th class="num-cell" style="width:10%">DBH</th>
              <th class="num-cell" style="width:12%">Condition</th>
              <th class="num-cell" style="width:18%">Appraised Value</th>
            </tr>
          </thead>
          <tbody>
            ${summaryValRows}
            <tr class="summary-row">
              <td colspan="4"><strong>TOTAL APPRAISED VALUE OF TREE CANOPY:</strong></td>
              <td class="num-cell" style="font-size:11pt;"><strong>${fmtMoney(totalValue)}</strong></td>
            </tr>
          </tbody>
        </table>

        ${report.valuationBasisStatement ? `
        <div style="margin-top:16pt;padding:12pt;background:#f8f7f5;border-radius:4pt;font-size:9pt;color:#666;">
          <p>${esc(report.valuationBasisStatement)}</p>
          <p style="margin-top:8pt;">This appraisal represents the replacement cost value of the assessed trees as of the date of assessment. Values reflect conditions observed on the date of assessment and may change due to tree health, growth, or other factors.</p>
        </div>` : ""}
      `;
    }

    // =========================================================================
    // VALUATION LIMITING CONDITIONS
    // =========================================================================
    let valuationLimitingHtml = "";
    if (isRealEstate || report.reportType === "tree_valuation") {
      let conditions: string[] = [];
      try {
        conditions = JSON.parse(arborist.valuationLimitingConditions || "[]");
      } catch { /* use defaults */ }
      if (!Array.isArray(conditions) || conditions.length === 0) {
        // Use hardcoded defaults
        conditions = [
          "The appraiser has no present or prospective interest in the subject property and has no personal interest with respect to the parties involved.",
          "The appraisal assumes the trees and site conditions as observed on the date of assessment. Conditions may change due to growth, disease, weather events, or human activity.",
          "No invasive or subsurface investigation was performed. Root condition and internal wood condition were assessed only from external, ground-level indicators.",
          "Values represent the replacement cost of the assessed trees using the Trunk Formula Technique. They do not represent the market value of the property or the contribution of trees to property market value.",
          "The unit cost values used in this appraisal are based on current wholesale nursery pricing for the largest commonly available replacement specimen of the same species and are subject to change.",
          "This appraisal is not a guarantee of tree health, structural integrity, or remaining useful life.",
        ];
      }
      valuationLimitingHtml = `
        <div class="page-break"></div>
        <h2 class="section-title">Limiting Conditions and Assumptions</h2>
        <div class="limitations-box">
          <ol style="margin:0;padding-left:20pt;font-size:9.5pt;line-height:1.6;">
            ${conditions.map(c => `<li style="margin-bottom:6pt;">${esc(c)}</li>`).join("\n")}
          </ol>
        </div>`;
    }

    // =========================================================================
    // ADDITIONAL CERTS
    // =========================================================================
    let additionalCertsArr: string[] = [];
    try {
      const parsed = JSON.parse(arborist.additionalCerts || "[]");
      if (Array.isArray(parsed)) additionalCertsArr = parsed;
    } catch {
      if (
        arborist.additionalCerts &&
        arborist.additionalCerts !== "[]"
      ) {
        additionalCertsArr = arborist.additionalCerts
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }

    // =========================================================================
    // SITE MAP — Mapbox Static Image with colored tree pins
    // =========================================================================
    let siteMapHtml = "";
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (
      includeSiteMap &&
      property.lat &&
      property.lng &&
      mapboxToken
    ) {
      try {
        // Build pin overlays for Mapbox Static API
        const pinOverlays: string[] = [];
        for (const t of trees) {
          if (t.pinLat == null || t.pinLng == null) continue;

          // Determine pin color (same logic as property-map.tsx)
          let color = "9ca3af"; // gray — unassessed
          if (t.recommendedAction === "remove") {
            color = "dc2626"; // red
          } else if (t.conditionRating != null) {
            if (t.conditionRating <= 1) color = "dc2626"; // red
            else if (t.conditionRating === 2) color = "ea580c"; // orange
            else if (t.conditionRating === 3) color = "eab308"; // yellow
            else if (t.conditionRating === 4) color = "84cc16"; // lime
            else if (t.conditionRating >= 5) color = "22c55e"; // green
          }

          pinOverlays.push(
            `pin-s-${t.treeNumber}+${color}(${t.pinLng},${t.pinLat})`
          );
        }

        if (pinOverlays.length > 0) {
          const overlay = pinOverlays.join(",");
          const staticUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${overlay}/${property.lng},${property.lat},18,0/1200x800@2x?access_token=${mapboxToken}`;

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);

          const mapRes = await fetch(staticUrl, { signal: controller.signal });
          clearTimeout(timeout);

          if (mapRes.ok) {
            const mapBuffer = Buffer.from(await mapRes.arrayBuffer());
            const mapBase64 = `data:image/png;base64,${mapBuffer.toString("base64")}`;

            // Count trees by condition for legend
            const condCounts = { good: 0, fair: 0, poor: 0, critical: 0, unassessed: 0 };
            for (const t of trees) {
              if (t.pinLat == null || t.pinLng == null) continue;
              if (t.recommendedAction === "remove" || (t.conditionRating != null && t.conditionRating <= 1)) condCounts.critical++;
              else if (t.conditionRating === 2) condCounts.poor++;
              else if (t.conditionRating === 3) condCounts.fair++;
              else if (t.conditionRating != null && t.conditionRating >= 4) condCounts.good++;
              else condCounts.unassessed++;
            }

            const legendItems: string[] = [];
            if (condCounts.good > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#22c55e"></span> Good/Excellent (${condCounts.good})</span>`);
            if (condCounts.fair > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#eab308"></span> Fair (${condCounts.fair})</span>`);
            if (condCounts.poor > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#ea580c"></span> Poor (${condCounts.poor})</span>`);
            if (condCounts.critical > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#dc2626"></span> Critical/Remove (${condCounts.critical})</span>`);
            if (condCounts.unassessed > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#9ca3af"></span> Unassessed (${condCounts.unassessed})</span>`);

            siteMapHtml = `
              <div class="page-break"></div>
              <h2 class="section-title">Site Map</h2>
              <div class="site-map-container">
                <img class="site-map-image" src="${mapBase64}" alt="Satellite map showing assessed trees" />
                <p class="site-map-caption">${esc(property.address)}, ${esc(property.city)} &mdash; ${pinOverlays.length} tree${pinOverlays.length !== 1 ? "s" : ""} assessed</p>
                <div class="site-map-legend">${legendItems.join("")}</div>
              </div>`;
          }
        }
      } catch (err) {
        // Gracefully degrade — skip site map if fetch fails
        console.error("Site map generation failed:", err);
      }
    }

    // =========================================================================
    // TABLE OF CONTENTS — section list
    // =========================================================================
    const tocSections: { title: string; desc: string }[] = [];
    if (siteMapHtml) {
      tocSections.push({
        title: "Site Map",
        desc: "Satellite overview with tree locations",
      });
    }
    tocSections.push({
      title: "Tree Inventory",
      desc: `${trees.length} trees assessed`,
    });

    // Parse H1 sections from the report body
    const h1Regex = /^#\s+(.+)$/gm;
    let h1Match;
    while ((h1Match = h1Regex.exec(content)) !== null) {
      tocSections.push({ title: h1Match[1], desc: "" });
    }

    if (treesWithPhotos.length > 0) {
      tocSections.push({
        title: "Photo Documentation",
        desc: `${treesWithPhotos.reduce((sum, t) => sum + (t.treePhotos?.length || 0), 0)} photos`,
      });
    }
    if (traqAppendix) {
      tocSections.push({
        title: "Appendix: TRAQ Risk Assessment Forms",
        desc: `${trees.length} forms`,
      });
    }
    if (mitigationHtml) {
      tocSections.push({
        title: "Appendix: Mitigation Requirements Summary",
        desc: "",
      });
    }
    if (valuationSummaryHtml) {
      tocSections.push({
        title: "Valuation Summary",
        desc: `${trees.filter(t => t.valuationAppraisedValue != null && t.valuationAppraisedValue > 0).length} trees appraised`,
      });
    }
    tocSections.push({
      title: "Arborist Certification & Signature",
      desc: "",
    });

    const tocRows = tocSections
      .map(
        (s, i) => `
      <tr>
        <td class="toc-num">${i + 1}.</td>
        <td class="toc-title">${esc(s.title)}<span class="toc-dots"></span></td>
        <td class="toc-desc">${esc(s.desc)}</td>
      </tr>`
      )
      .join("\n");

    // =========================================================================
    // COVER PAGE — "Prepared For" block
    // =========================================================================
    const preparedForLines: string[] = [];
    if (property.homeownerName) {
      preparedForLines.push(esc(property.homeownerName));
    }
    preparedForLines.push(esc(property.address));
    preparedForLines.push(
      `${esc(property.city)}, ${esc(property.state || "CA")}${property.zip ? ` ${esc(property.zip)}` : ""}`
    );
    if (report.reportType === "real_estate_package") {
      // Real estate package: show realtor info instead of city planning
      if (report.reRealtorName) {
        preparedForLines.push(""); // spacer
        preparedForLines.push(`Listing Agent: ${esc(report.reRealtorName)}`);
        if (report.reRealtorCompany) preparedForLines.push(esc(report.reRealtorCompany));
      }
    } else {
      preparedForLines.push(""); // spacer
      preparedForLines.push(`City of ${esc(property.city)}`);
      preparedForLines.push("Planning & Development Services");
    }

    // =========================================================================
    // SIGNATURE BLOCK
    // =========================================================================
    const certDateStr = report.certifiedAt
      ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : dateStr;

    const signatureBlock = `
    <div class="signature-block">
      <h2 class="section-title">Arborist Certification & Signature</h2>
      <div class="cert-statement">
        <p>I, the undersigned, certify that I have personally inspected the tree(s) described in this
        report and that the information contained herein is accurate to the best of my professional
        knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based
        on my professional training, experience, and education.</p>
        <p>I have no personal interest or bias with respect to the parties involved. The analysis,
        opinions, and conclusions stated herein are my own, and are based on current scientific
        procedures and facts.</p>
      </div>

      <div class="sig-area">
        ${
          isCertified
            ? `
        <div class="sig-line-group">
          <div class="sig-esignature">${esc(report.eSignatureText || arborist.name)}</div>
          <div class="sig-rule"></div>
          <div class="sig-label">Signature</div>
        </div>
        `
            : `
        <div class="sig-line-group">
          <div class="sig-rule" style="margin-top:40px;"></div>
          <div class="sig-label">Signature</div>
        </div>
        `
        }
        <div class="sig-details">
          <div class="sig-detail-row"><span class="sig-detail-label">Name:</span> ${esc(arborist.name)}</div>
          <div class="sig-detail-row"><span class="sig-detail-label">ISA Certified Arborist:</span> #${esc(arborist.isaCertificationNum)}</div>
          ${arborist.traqCertified ? `<div class="sig-detail-row"><span class="sig-detail-label">Qualification:</span> ISA Tree Risk Assessment Qualified</div>` : ""}
          ${additionalCertsArr.length > 0 ? `<div class="sig-detail-row"><span class="sig-detail-label">Additional Certifications:</span> ${esc(additionalCertsArr.join(", "))}</div>` : ""}
          ${arborist.licenseNumbers ? `<div class="sig-detail-row"><span class="sig-detail-label">License(s):</span> ${esc(arborist.licenseNumbers)}</div>` : ""}
          ${arborist.companyName ? `<div class="sig-detail-row"><span class="sig-detail-label">Company:</span> ${esc(arborist.companyName)}</div>` : ""}
          <div class="sig-detail-row"><span class="sig-detail-label">Date:</span> ${certDateStr}</div>
        </div>
      </div>
    </div>`;

    // Draft watermark
    const draftWatermark = !isCertified
      ? `<div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-35deg); font-size:140pt; font-weight:bold; color:rgba(200,200,200,0.08); letter-spacing:24px; pointer-events:none; z-index:0; white-space:nowrap;">DRAFT</div>`
      : "";

    // Header/footer values for Puppeteer
    const headerCompany = esc(
      arborist.companyName || arborist.name
    );
    const headerTitle = esc(reportTitle);

    // =========================================================================
    // FULL HTML DOCUMENT
    // =========================================================================
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${esc(reportTitle)} \u2014 ${esc(property.address)}, ${esc(property.city)}</title>
  <style>
    /* =========================================================================
       BASE TYPOGRAPHY & LAYOUT
       ========================================================================= */
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&family=Dancing+Script:wght@700&display=swap');

    * { box-sizing: border-box; }
    body {
      font-family: 'Roboto', 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #3A3A36;
      font-size: 10.5pt;
      line-height: 1.55;
      margin: 0;
      padding: 0;
      position: relative;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-break { page-break-before: always; }

    /* Cover page: hide from running header/footer via @page :first */
    @page :first {
      margin-top: 0.5in;
      margin-bottom: 0.5in;
    }

    /* =========================================================================
       COVER LETTER
       ========================================================================= */
    .cover-letter {
      font-size: 10.5pt;
      line-height: 1.6;
      padding: 0.5in 0;
    }
    .cl-letterhead {
      border-bottom: 2px solid #1D4E3E;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .cl-company {
      font-size: 14pt;
      font-weight: bold;
      color: #1D4E3E;
      margin: 0;
    }
    .cl-contact {
      font-size: 9pt;
      color: #666;
      margin: 2px 0;
    }
    .cl-date { margin-bottom: 20px; }
    .cl-recipient { margin-bottom: 20px; }
    .cl-recipient p { margin: 0; }
    .cl-re {
      margin-bottom: 20px;
      padding: 8px 12px;
      border-left: 3px solid #1D4E3E;
      background-color: #FBF9F6;
    }
    .cover-letter ul { padding-left: 24px; margin: 8px 0; }
    .cover-letter li { margin-bottom: 4px; }
    .cl-signature { margin-top: 40px; }
    .cl-sig-name {
      font-weight: bold;
      font-style: italic;
      margin-bottom: 2px;
    }
    .cl-signature p { margin: 2px 0; font-size: 9.5pt; }

    /* =========================================================================
       COVER PAGE
       ========================================================================= */
    .cover-page {
      display: flex;
      flex-direction: column;
      min-height: 9.5in;
      position: relative;
      padding: 0;
    }

    /* Company block */
    .cover-company-block {
      text-align: center;
      padding: 40px 0 24px 0;
      border-bottom: 2.5px solid #1D4E3E;
      margin-bottom: 0;
    }
    .cover-logo-img {
      max-width: 180px;
      max-height: 80px;
      width: auto;
      height: auto;
      margin-bottom: 12px;
    }
    .cover-company-name {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 18pt;
      font-weight: 700;
      color: #1D4E3E;
      letter-spacing: 1px;
      margin: 0;
    }
    .cover-company-detail {
      font-size: 9.5pt;
      color: #666;
      margin: 2px 0;
      line-height: 1.4;
    }

    /* Report title area */
    .cover-title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 36px 40px;
    }
    .cover-rule {
      width: 240px;
      border: none;
      border-top: 3px double #1D4E3E;
      margin: 0 auto 28px auto;
    }
    .cover-report-title {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 26pt;
      font-weight: 700;
      color: #3A3A36;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }
    .cover-property-address {
      font-size: 15pt;
      color: #333;
      margin: 0 0 4px 0;
      font-weight: 400;
    }
    .cover-property-city {
      font-size: 11pt;
      color: #666;
      margin: 0 0 20px 0;
    }
    .cover-status-badge {
      font-size: 8.5pt;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      display: inline-block;
      padding: 5px 24px;
      border-radius: 20px;
      margin-bottom: 4px;
    }
    .badge-certified { background: #1D4E3E; color: #fff; }
    .badge-draft { background: #e5e4df; color: #6B6B63; }
    .cover-rule-bottom {
      width: 240px;
      border: none;
      border-top: 3px double #1D4E3E;
      margin: 24px auto 0 auto;
    }

    /* Canopy value on cover (real estate package) */
    .cover-canopy-value {
      text-align: center;
      margin: 16px 0 4px 0;
    }
    .cover-canopy-label {
      font-size: 9pt;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #1D4E3E;
      margin: 0 0 4px 0;
    }
    .cover-canopy-amount {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 36pt;
      font-weight: 700;
      color: #1D4E3E;
      margin: 0;
      line-height: 1.1;
    }
    .cover-canopy-subtitle {
      font-size: 8pt;
      color: #666;
      margin: 4px 0 0 0;
    }

    /* Prepared For block */
    .cover-prepared-block {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
      gap: 40px;
    }
    .cover-prepared-col {
      flex: 1;
    }
    .cover-prepared-label {
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #999;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .cover-prepared-value {
      font-size: 10pt;
      color: #333;
      line-height: 1.5;
    }
    .cover-prepared-value .name {
      font-weight: 600;
      color: #3A3A36;
      font-size: 10.5pt;
    }

    /* Cover footer */
    .cover-footer {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid #ddd;
      margin-top: auto;
    }
    .cover-credentials-line {
      font-size: 9pt;
      color: #555;
      margin: 2px 0;
    }
    .cover-draft-badge {
      font-size: 14pt;
      color: #b0b0b0;
      letter-spacing: 6px;
      text-transform: uppercase;
      border: 2px solid #d0d0d0;
      padding: 6px 32px;
      display: inline-block;
      margin-bottom: 12px;
    }
    .cover-confidential {
      font-size: 7pt;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 8px;
    }

    /* =========================================================================
       TABLE OF CONTENTS
       ========================================================================= */
    .toc-page {
      padding: 40px 0;
    }
    .toc-title {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 18pt;
      color: #1D4E3E;
      font-weight: 700;
      margin: 0 0 6px 0;
      border-bottom: 2.5px solid #1D4E3E;
      padding-bottom: 8px;
    }
    .toc-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    .toc-table tr {
      border-bottom: 1px dotted #ccc;
    }
    .toc-table td {
      padding: 8px 4px;
      vertical-align: bottom;
    }
    .toc-num {
      width: 30px;
      color: #1D4E3E;
      font-weight: 600;
      font-size: 10pt;
    }
    .toc-table .toc-title-cell {
      font-size: 10.5pt;
      color: #3A3A36;
      font-weight: 500;
    }
    .toc-dots {
      display: inline;
    }
    .toc-desc {
      text-align: right;
      font-size: 9pt;
      color: #888;
      white-space: nowrap;
      width: 120px;
    }
    .toc-note {
      margin-top: 20px;
      font-size: 9pt;
      color: #999;
      font-style: italic;
    }

    /* =========================================================================
       SITE MAP
       ========================================================================= */
    .site-map-container {
      text-align: center;
      margin-top: 10px;
    }
    .site-map-image {
      width: 100%;
      max-width: 100%;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .site-map-caption {
      margin-top: 10px;
      font-size: 10pt;
      color: #555;
      font-style: italic;
    }
    .site-map-legend {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 9pt;
      color: #666;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .legend-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.15);
    }

    /* =========================================================================
       REPORT BODY
       ========================================================================= */
    .section-title {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 14pt;
      color: #1D4E3E;
      margin: 28px 0 8px 0;
      border-bottom: 2.5px solid #1D4E3E;
      padding-bottom: 5px;
      font-weight: 700;
    }
    .report-body h1 {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 14pt;
      color: #1D4E3E;
      border-bottom: 2.5px solid #1D4E3E;
      padding-bottom: 5px;
      margin: 32px 0 10px 0;
      font-weight: 700;
    }
    .report-body h2 {
      font-size: 12pt;
      color: #3A3A36;
      margin: 22px 0 8px 0;
      font-weight: 600;
      border-bottom: 1px solid #e5e4df;
      padding-bottom: 3px;
    }
    .report-body h3 {
      font-size: 10.5pt;
      color: #333;
      margin: 16px 0 6px 0;
      font-weight: 600;
    }
    .report-body p { margin: 6px 0; }
    .report-body ul, .report-body ol { margin: 6px 0; padding-left: 24px; }
    .report-body li { margin: 3px 0; }
    .report-body hr { border: none; border-top: 1px solid #ccc; margin: 16px 0; }
    .report-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9pt;
    }
    .report-body table th {
      background: #1D4E3E;
      color: white;
      padding: 5px 8px;
      text-align: left;
      font-weight: bold;
      font-size: 8.5pt;
    }
    .report-body table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .report-body table tr:nth-child(even) { background: #FEFDFB; }

    /* Limitations section — distinct visual treatment */
    .report-body h1:has(+ *),
    .report-body h2:has(+ *) {
      /* These are generic selectors; the limitations box is applied via JS post-processing */
    }
    .limitations-box {
      background-color: #f5f5f2;
      border: 1px solid #e0e0dd;
      border-radius: 3px;
      padding: 14px 18px;
      margin: 12px 0 20px 0;
      font-size: 9.5pt;
      color: #555;
      line-height: 1.5;
    }
    .limitations-box h1,
    .limitations-box h2,
    .limitations-box h3 {
      font-size: 11pt;
      color: #444;
      border-bottom-color: #ddd;
      margin-top: 0;
    }
    .limitations-box p {
      font-size: 9.5pt;
      color: #555;
    }
    .limitations-box ul, .limitations-box ol {
      font-size: 9.5pt;
      color: #555;
    }

    /* =========================================================================
       TREE INVENTORY TABLE
       ========================================================================= */
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    .inventory-table th {
      background: #1D4E3E;
      color: white;
      padding: 7px 6px;
      text-align: left;
      font-weight: 600;
      font-size: 8pt;
      letter-spacing: 0.3px;
    }
    .inventory-table td {
      padding: 5px 6px;
      border-bottom: 1px solid #e5e4df;
    }
    .inventory-table tr.alt { background: #FEFDFB; }
    .inventory-table td.center,
    .inventory-table th.center { text-align: center; }
    .inventory-table td.num-cell { text-align: right; font-variant-numeric: tabular-nums; }
    .inventory-table th.num-cell { text-align: right; }
    .summary-row {
      background-color: #F5F4F0 !important;
      border-top: 2px solid #1D4E3E;
      font-size: 8.5pt;
    }
    .summary-row td {
      padding: 7px 6px;
    }
    .inventory-legend {
      font-size: 7.5pt;
      color: #999;
      margin-top: 6px;
      font-style: italic;
    }

    /* =========================================================================
       PHOTO DOCUMENTATION — 2-column grid
       ========================================================================= */
    .photo-group {
      margin-bottom: 20px;
    }
    .photo-tree-header {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 11pt;
      color: #1D4E3E;
      margin: 0 0 10px 0;
      font-weight: 600;
      border-bottom: 1px solid #e5e4df;
      padding-bottom: 4px;
    }
    .photo-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .photo-cell {
      page-break-inside: avoid;
    }
    .photo-cell img {
      width: 100%;
      max-height: 230px;
      object-fit: contain;
      border: 1px solid #d0d0d0;
      border-radius: 3px;
      background: #fafafa;
    }
    .photo-meta {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin-top: 4px;
    }
    .photo-ref {
      font-size: 7.5pt;
      color: #1D4E3E;
      font-weight: 600;
    }
    .photo-caption-text {
      font-size: 8pt;
      color: #555;
      font-style: italic;
    }
    .photo-date {
      font-size: 7pt;
      color: #999;
    }

    /* =========================================================================
       TRAQ FORM STYLES
       ========================================================================= */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 12px 0;
    }
    .traq-form {
      page-break-inside: avoid;
      page-break-before: always;
      border: 1.5px solid #3D7D68;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 9px;
      line-height: 1.3;
    }
    .traq-header {
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #3D7D68;
      padding-bottom: 6px;
    }
    .traq-header h3 {
      font-size: 13px;
      margin: 0;
      color: #3D7D68;
    }
    .traq-subtitle {
      font-size: 9px;
      color: #666;
      margin: 2px 0 0 0;
    }
    .traq-section-header {
      background: #3D7D68;
      color: white;
      font-weight: 700;
      font-size: 9px;
      padding: 3px 8px;
      margin: 8px 0 4px 0;
      border-radius: 2px;
    }
    .traq-info-table, .traq-data-table, .traq-target-table, .traq-risk-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 4px;
    }
    .traq-info-table td, .traq-data-table td, .traq-target-table td, .traq-target-table th, .traq-risk-table td {
      padding: 3px 6px;
      border: 0.5px solid #ddd;
      font-size: 9px;
      vertical-align: top;
    }
    .traq-label {
      font-weight: 700;
      width: 120px;
      background: #f8f8f8;
      white-space: nowrap;
      font-size: 8.5px;
      color: #444;
    }
    .traq-target-table th {
      background: #f0f0f0;
      font-size: 8px;
      font-weight: 700;
      text-align: left;
      padding: 2px 6px;
    }
    .traq-overall-risk {
      border: 2px solid #3D7D68;
      padding: 6px 12px;
      margin: 8px 0;
      text-align: center;
      font-size: 11px;
    }
    .traq-risk-value {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      margin-left: 8px;
    }
    .traq-risk-low { background-color: #e8f5e9; }
    .traq-risk-low .traq-risk-value { color: #1D4E3E; }
    .traq-risk-moderate { background-color: #fff8e1; }
    .traq-risk-moderate .traq-risk-value { color: #b8860b; }
    .traq-risk-high { background-color: #fff3e0; }
    .traq-risk-high .traq-risk-value { color: #e65100; }
    .traq-risk-extreme { background-color: #ffebee; }
    .traq-risk-extreme .traq-risk-value { color: #c62828; }
    .traq-risk-none { background-color: #f0f0f0; }
    .traq-risk-none .traq-risk-value { color: #666; }
    .traq-matrices { margin: 6px 0; }
    .matrix-pair { display: flex; gap: 8px; }
    .matrix { flex: 1; }
    .matrix-title {
      font-size: 8px;
      font-weight: 700;
      margin: 0 0 2px 0;
      text-align: center;
    }
    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7px;
    }
    .matrix-table th, .matrix-table td {
      padding: 1px 3px;
      border: 0.5px solid #ccc;
      text-align: center;
    }
    .matrix-table th {
      background: #f0f0f0;
      font-weight: 700;
    }
    .matrix-table td:first-child, .matrix-table th:first-child {
      text-align: left;
      font-weight: 600;
      width: 70px;
    }
    .matrix-active {
      background-color: #3D7D68;
      color: white;
      font-weight: 700;
    }
    .traq-signature {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #ccc;
    }
    .traq-sig-line { text-align: center; width: 30%; }
    .traq-sig-line span {
      display: block;
      font-size: 9px;
      font-style: italic;
      border-bottom: 1px solid #333;
      padding-bottom: 2px;
      margin-bottom: 2px;
      min-height: 14px;
    }
    .traq-sig-line p {
      font-size: 7px;
      color: #666;
      margin: 2px 0 0 0;
    }
    .traq-footer-note {
      margin-top: 6px;
      font-size: 8px;
      color: #666;
      border-top: 0.5px solid #ddd;
      padding-top: 4px;
    }
    .traq-footer-note p { margin: 1px 0; }

    /* =========================================================================
       MITIGATION TABLE
       ========================================================================= */
    .mitigation-intro {
      font-size: 10pt;
      margin-bottom: 12px;
    }
    .mitigation-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
      margin-bottom: 16px;
    }
    .mitigation-table th {
      background-color: #1D4E3E;
      color: white;
      padding: 6px 8px;
      text-align: left;
      font-size: 8.5pt;
    }
    .mitigation-table td {
      border: 1px solid #ddd;
      padding: 5px 8px;
    }
    .mitigation-total {
      background-color: #f5f5f0;
      border-top: 2px solid #1D4E3E;
    }
    .mitigation-note {
      font-size: 8.5pt;
      color: #555;
      font-style: italic;
      border-left: 3px solid #eab308;
      padding: 6px 10px;
      background-color: #fefce8;
    }
    .center { text-align: center; }

    /* =========================================================================
       VALUATION SUMMARY (tree_valuation reports)
       ========================================================================= */
    .val-tree-box { margin: 16pt 0; padding: 12pt; border: 1pt solid #ddd; border-radius: 4pt; page-break-inside: avoid; }
    .val-tree-header { font-family: 'Instrument Sans', sans-serif; font-size: 11pt; font-weight: 600; color: #1D4E3E; margin-bottom: 4pt; }
    .val-tree-meta { font-size: 8.5pt; color: #888; margin-bottom: 8pt; font-family: 'IBM Plex Mono', monospace; }
    .val-calc-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
    .val-calc-table td { padding: 2pt 0; }
    .val-calc-table .val-num { text-align: right; font-family: 'IBM Plex Mono', monospace; white-space: nowrap; }
    .val-calc-table .val-subtotal td { border-top: 0.5pt solid #ccc; padding-top: 4pt; }
    .val-calc-table .val-total td { border-top: 1.5pt solid #1D4E3E; padding-top: 6pt; font-size: 10pt; color: #1D4E3E; }
    .val-notes { margin-top: 6pt; font-size: 8.5pt; color: #666; font-style: italic; }
    .val-meta { margin-bottom: 16pt; font-size: 9pt; line-height: 1.6; }
    .val-meta p { margin: 2pt 0; }

    /* =========================================================================
       SIGNATURE BLOCK
       ========================================================================= */
    .signature-block {
      page-break-before: always;
      padding-top: 20px;
    }
    .cert-statement {
      border: 2px solid #1D4E3E;
      background: #FBF9F6;
      padding: 24px 28px;
      margin: 16px 0 32px 0;
      border-radius: 2px;
    }
    .cert-statement p {
      font-size: 10pt;
      line-height: 1.6;
      margin: 6px 0;
    }
    .sig-area {
      margin-top: 24px;
    }
    .sig-line-group {
      margin-bottom: 24px;
    }
    .sig-esignature {
      font-family: 'Dancing Script', cursive;
      font-size: 22pt;
      color: #3A3A36;
      padding-bottom: 4px;
    }
    .sig-rule {
      border-bottom: 1px solid #333;
      width: 340px;
      margin-bottom: 4px;
    }
    .sig-label {
      font-size: 8pt;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .sig-details {
      margin-top: 16px;
      border: 1.5px solid #e5e4df;
      border-radius: 3px;
      overflow: hidden;
    }
    .sig-detail-row {
      padding: 6px 14px;
      font-size: 9.5pt;
      border-bottom: 1px solid #f0f0f0;
    }
    .sig-detail-row:last-child { border-bottom: none; }
    .sig-detail-row:nth-child(even) { background: #FAF9F6; }
    .sig-detail-label {
      font-weight: 600;
      color: #555;
      display: inline-block;
      min-width: 180px;
    }

    /* Draft not-certified watermark in signature area */
    .draft-not-certified {
      text-align: center;
      margin: 24px 0;
      padding: 12px;
      border: 2px dashed #ccc;
      color: #999;
      font-size: 14pt;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    /* =========================================================================
       UTILITY
       ========================================================================= */
    .avoid-break { page-break-inside: avoid; }
  </style>
</head>
<body>
  ${draftWatermark}

  <!-- ========== COVER LETTER (removal permits) ========== -->
  ${coverLetterHtml}

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    <!-- Company block — centered logo + info -->
    <div class="cover-company-block">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Company Logo" class="cover-logo-img" /><br/>` : ""}
      <div class="cover-company-name">${esc(arborist.companyName || arborist.name)}</div>
      ${arborist.companyAddress ? `<div class="cover-company-detail">${esc(arborist.companyAddress)}</div>` : ""}
      <div class="cover-company-detail">
        ${[arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).map((v) => esc(v!)).join(" &nbsp;&bull;&nbsp; ")}
      </div>
    </div>

    <!-- Report title -->
    <div class="cover-title-area">
      <hr class="cover-rule" />
      <div class="cover-report-title">${esc(reportTitle)}</div>
      <div class="cover-property-address">${esc(property.address)}</div>
      <div class="cover-property-city">
        ${esc(property.city)}, ${esc(property.state || "CA")}${property.county ? ` \u2014 ${esc(property.county)} County` : ""}
      </div>
      <div class="cover-status-badge ${isCertified ? "badge-certified" : "badge-draft"}">
        ${isCertified ? "\u2713 Certified" : "Draft"}
      </div>
      ${isRealEstate && canopyTotal > 0 ? `
      <div class="cover-canopy-value">
        <p class="cover-canopy-label">Total Canopy Value</p>
        <p class="cover-canopy-amount">${fmtCoverMoney(canopyTotal)}</p>
        <p class="cover-canopy-subtitle">CTLA Trunk Formula Method, 10th Edition</p>
      </div>` : ""}
      <hr class="cover-rule-bottom" />
    </div>

    <!-- Prepared For / Prepared By -->
    <div class="cover-prepared-block">
      <div class="cover-prepared-col">
        <div class="cover-prepared-label">Prepared For</div>
        <div class="cover-prepared-value">
          ${preparedForLines.map((line) => (line === "" ? "<br/>" : `<div${line.startsWith(esc(property.homeownerName || "__NOMATCH__")) ? ' class="name"' : ""}>${line}</div>`)).join("\n")}
        </div>
      </div>
      <div class="cover-prepared-col" style="text-align:right;">
        <div class="cover-prepared-label">Report Date</div>
        <div class="cover-prepared-value" style="font-weight:600;margin-bottom:12px;">${dateStr}</div>
        ${property.parcelNumber ? `<div class="cover-prepared-label">APN</div><div class="cover-prepared-value">${esc(property.parcelNumber)}</div>` : ""}
      </div>
    </div>

    <!-- Cover footer -->
    <div class="cover-footer">
      ${!isCertified ? '<div class="cover-draft-badge">DRAFT</div><br/>' : ""}
      <div class="cover-credentials-line">${esc(arborist.name)} &nbsp;&bull;&nbsp; ISA Certified Arborist #${esc(arborist.isaCertificationNum)}</div>
      ${arborist.traqCertified ? '<div class="cover-credentials-line">ISA Tree Risk Assessment Qualified</div>' : ""}
      <div class="cover-confidential">Confidential \u2014 Prepared for property owner and authorized parties only</div>
    </div>
  </div>

  <!-- ========== TABLE OF CONTENTS ========== -->
  <div class="page-break"></div>
  <div class="toc-page">
    <div class="toc-title">Table of Contents</div>
    <table class="toc-table">
      ${tocRows}
    </table>
    <p class="toc-note">
      <!-- TODO: Exact page numbers require a two-pass PDF render. Section titles are listed for reference. -->
      This report contains ${trees.length} trees assessed across ${tocSections.length} sections.
    </p>
  </div>

  <!-- ========== SITE MAP ========== -->
  ${siteMapHtml}

  <!-- ========== TREE INVENTORY TABLE ========== -->
  <div class="page-break"></div>
  <h2 class="section-title">Tree Inventory</h2>
  <table class="inventory-table">
    <thead>
      <tr>
        <th class="num-cell" style="width:5%">#</th>
        <th class="center" style="width:5%">Tag</th>
        <th>Species</th>
        <th class="num-cell" style="width:6%">DBH</th>
        <th class="num-cell" style="width:5%">Ht.</th>
        <th class="num-cell" style="width:6%">Canopy</th>
        <th class="center" style="width:12%">Condition</th>
        <th class="center" style="width:8%">Protection</th>
        <th style="width:10%">Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
      ${summaryRow}
    </tbody>
  </table>
  <p class="inventory-legend">
    Condition: 0 = Dead &bull; 1 = Critical &bull; 2 = Poor &bull; 3 = Fair &bull; 4 = Good &bull; 5 = Excellent &nbsp;|&nbsp;
    \u{1F6E1} = Protected under local tree ordinance
  </p>

  <!-- ========== REPORT BODY ========== -->
  <div class="page-break"></div>
  <div class="report-body">
    ${bodyHtml}
  </div>

  <!-- ========== PHOTO DOCUMENTATION ========== -->
  ${
    treesWithPhotos.length > 0
      ? `
  <div class="page-break"></div>
  <h2 class="section-title">Photo Documentation</h2>
  ${photoPages}`
      : ""
  }

  <!-- ========== TRAQ APPENDIX ========== -->
  ${traqAppendix}

  <!-- ========== MITIGATION SUMMARY ========== -->
  ${mitigationHtml}

  <!-- ========== VALUATION SUMMARY ========== -->
  ${valuationSummaryHtml}

  <!-- ========== VALUATION LIMITING CONDITIONS ========== -->
  ${valuationLimitingHtml}

  <!-- ========== SIGNATURE BLOCK ========== -->
  ${signatureBlock}

</body>
</html>`;

    // =========================================================================
    // POST-PROCESS: Wrap Limitations section in a gray box
    // =========================================================================
    // Find the "Limitations and Assumptions" section in the rendered HTML
    // and wrap its content in a .limitations-box div
    let processedHtml = html;
    const limRegex =
      /(<h[12][^>]*>(?:[^<]*Limitations?\s+and\s+Assumptions?[^<]*)<\/h[12]>)([\s\S]*?)(?=<h[12][ >]|<div class="page-break"|<div class="signature-block"|$)/i;
    const limMatch = processedHtml.match(limRegex);
    if (limMatch) {
      const fullMatch = limMatch[0];
      const heading = limMatch[1];
      const sectionContent = limMatch[2];
      const replacement = `${heading}<div class="limitations-box">${sectionContent}</div>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    }

    // =========================================================================
    // RENDER PDF
    // =========================================================================
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(processedHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "1in",
        right: "0.85in",
        bottom: "0.85in",
        left: "0.85in",
      },
      displayHeaderFooter: true,
      // Running header: company left, report title right, hairline rule
      // Cover page (page 1) gets blank header via conditional display
      headerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; padding:0 0.85in; margin:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:4px; border-bottom:0.5px solid #ccc;">
            <span style="font-weight:600;">${headerCompany}</span>
            <span style="font-style:italic;">${headerTitle}</span>
          </div>
        </div>
      `,
      // Page X of Y, centered, gray
      footerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; text-align:center; padding:0 0.85in;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();
    browser = undefined;

    const filename = `Arborist_Report_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse "Observed: X, Y, Z" prefix from a notes string.
 */
function parseObservedItems(notes: string): string[] {
  const match = notes.match(/^Observed:\s*(.+?)(\n|$)/);
  if (!match) return [];
  return match[1].split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * Extract free-text portion after "Observed: ..." line.
 */
function extractNoteFreeText(notes: string): string {
  return notes.replace(/^Observed:\s*.+?(\n\n|\n|$)/, "").trim();
}

/**
 * Format notes for TRAQ display:
 * - Strip "Observed:" prefix, show items as "Observed conditions: X, Y, Z."
 * - Show free text below
 * - If no "Observed:" prefix, return notes as-is
 */
function formatNotesForTRAQ(notes: string | null, fallback: string): string {
  if (!notes || !notes.trim()) return fallback;
  const items = parseObservedItems(notes);
  const freeText = extractNoteFreeText(notes);
  if (items.length > 0) {
    const itemLine = `Observed conditions: ${items.join(", ")}.`;
    return freeText ? `${esc(itemLine)}<br/>${esc(freeText)}` : esc(itemLine);
  }
  return esc(notes);
}

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fmtEnum(value: string | undefined | null): string {
  if (!value) return "N/A";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Convert a serving URL like /api/uploads/trees/{id}/photos/{file}
 * to a base64 data URI by reading the file from disk.
 */
function photoToBase64(photoUrl: string): string | null {
  try {
    // Strip the /api/uploads/ prefix to get the relative path within uploads/
    const relativePath = photoUrl.replace(/^\/api\/uploads\//, "");
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const photoPath = path.resolve(uploadsRoot, relativePath);

    // Security: prevent path traversal
    if (!photoPath.startsWith(uploadsRoot)) return null;
    if (!fs.existsSync(photoPath)) return null;

    const photoData = fs.readFileSync(photoPath);
    const ext = path.extname(photoPath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".heic"
            ? "image/heic"
            : "image/jpeg";

    return `data:${mimeType};base64,${photoData.toString("base64")}`;
  } catch {
    return null;
  }
}
