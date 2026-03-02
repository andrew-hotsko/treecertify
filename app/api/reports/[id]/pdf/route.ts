import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { renderMarkdownToHtml } from "@/lib/markdown";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let browser;
  try {
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

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    // Parse report options
    let reportOpts: Record<string, boolean> = {};
    try {
      reportOpts = JSON.parse(report.reportOptions || "{}");
    } catch { /* default empty */ }

    const includeTraq = reportOpts.includeTraq ?? (report.reportType === "health_assessment");
    const includeCoverLetter = reportOpts.includeCoverLetter ?? (report.reportType === "removal_permit");
    const includeMitigation = reportOpts.includeMitigation ?? true;

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
      0: "#6b7280",
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

    // Tree inventory rows
    const treeRows = trees
      .map(
        (tree, idx) => {
          const condLabel = conditionLabels[tree.conditionRating] ?? `${tree.conditionRating}`;
          const condColor = conditionColors[tree.conditionRating] ?? "#6b7280";
          const actionRaw = tree.recommendedAction || "";
          const actionLabel = actionRaw.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A";
          const actionColor = actionColors[actionRaw] || "#374151";

          return `
      <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
        <td class="center">${tree.treeNumber}</td>
        <td class="center">${esc(tree.tagNumber || "\u2014")}</td>
        <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
        <td class="center">${tree.dbhInches}"</td>
        <td class="center">${tree.heightFt ? `${tree.heightFt}'` : "\u2014"}</td>
        <td class="center">${tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "\u2014"}</td>
        <td class="center"><span style="color:${condColor}; font-weight:600;">${condLabel}</span> <span style="color:#999; font-size:7.5pt;">(${tree.conditionRating}/5)</span></td>
        <td class="center">${tree.isProtected ? '<span style="color:#16a34a;">&#10003;</span>' : '<span style="color:#ccc;">\u2014</span>'}</td>
        <td><span style="color:${actionColor}; font-weight:600;">${actionLabel}</span></td>
      </tr>`;
        }
      )
      .join("\n");

    // Photo documentation
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    const photoPages = treesWithPhotos
      .map(
        (tree) => `
      <div class="photo-group">
        <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</h3>
        <div class="photo-grid">
          ${(tree.treePhotos || [])
            .map(
              (photo: { url: string; caption?: string | null; isAnnotated?: boolean; annotatedUrl?: string | null }, i: number) => {
                // Use annotated version if available
                const srcUrl = photo.isAnnotated && photo.annotatedUrl ? photo.annotatedUrl : photo.url;
                // Convert to base64 data URI so Puppeteer can render it
                const base64 = photoToBase64(srcUrl);
                const imgSrc = base64 || srcUrl;
                return `
            <div class="photo-item">
              <img src="${imgSrc}" alt="Tree #${tree.treeNumber} photo ${i + 1}" />
              <p class="photo-caption">Photo ${i + 1}${photo.caption ? ` \u2014 ${esc(photo.caption)}` : ""}${photo.isAnnotated ? " (annotated)" : ""}</p>
            </div>`;
              }
            )
            .join("")}
        </div>
      </div>`
      )
      .join("\n");

    // =========================================================================
    // COVER LETTER (removal permit only, when enabled)
    // =========================================================================
    let coverLetterHtml = "";
    if (includeCoverLetter && report.reportType === "removal_permit") {
      const removalCount = trees.filter((t) => t.recommendedAction === "remove").length;
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

    ${protectedCount > 0 ? `
    <p><strong>Protected Trees:</strong> ${protectedCount} of ${trees.length} trees assessed meet the criteria for
    protected status under the applicable municipal tree ordinance. The report includes detailed justification for
    the requested removal${protectedCount > 1 ? "s" : ""}, including risk assessment findings, retention feasibility
    analysis, and proposed mitigation measures as required.</p>` : ""}

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
    // TRAQ APPENDIX — Formal ISA TRAQ Level 2 Basic Assessment forms
    // =========================================================================
    let traqAppendix = "";
    if (includeTraq && (report.reportType === "health_assessment" || report.reportType === "removal_permit")) {
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

          const lof = ((data.likelihoodOfFailure as string) || "").toLowerCase();
          const loi = ((data.likelihoodOfImpact as string) || "").toLowerCase();
          const con = ((data.consequences as string) || "").toLowerCase();
          const overallRisk = fmtEnum(data.overallRiskRating as string);
          const overallRiskRaw = ((data.overallRiskRating as string) || "").toLowerCase();
          const target = (data.targetDescription as string) || "";
          const targetZone = (data.targetZone as string) || "";
          const occupancy = (data.occupancyRate as string) || "Frequent";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          // Checkbox helper
          const chk = (val: string, match: string) => val === match ? "\u2611" : "\u2610";

          // Compute Matrix 1 result: Likelihood of Failure & Impact
          const m1Lookup: Record<string, Record<string, string>> = {
            imminent:   { very_low: "Unlikely",  low: "Somewhat likely", medium: "Likely",          high: "Very likely" },
            probable:   { very_low: "Unlikely",  low: "Unlikely",        medium: "Somewhat likely",  high: "Likely" },
            possible:   { very_low: "Unlikely",  low: "Unlikely",        medium: "Unlikely",         high: "Somewhat likely" },
            improbable: { very_low: "Unlikely",  low: "Unlikely",        medium: "Unlikely",         high: "Unlikely" },
          };
          const failureAndImpact = (lof && loi) ? (m1Lookup[lof]?.[loi] || "N/A") : "N/A";
          const faiKey = failureAndImpact.toLowerCase().replace(/ /g, "_");

          // Compute Matrix 2 result: Risk Rating
          const m2Lookup: Record<string, Record<string, string>> = {
            very_likely:     { negligible: "Low", minor: "Moderate", significant: "High",     severe: "Extreme" },
            likely:          { negligible: "Low", minor: "Moderate", significant: "High",     severe: "High" },
            somewhat_likely: { negligible: "Low", minor: "Low",      significant: "Moderate", severe: "Moderate" },
            unlikely:        { negligible: "Low", minor: "Low",      significant: "Low",      severe: "Low" },
          };
          const computedRisk = (faiKey && con) ? (m2Lookup[faiKey]?.[con] || overallRisk) : overallRisk;

          // Matrix cell highlight helper
          const m1Cell = (rowKey: string, colKey: string) => {
            const isActive = lof === rowKey && loi === colKey;
            return isActive ? 'class="matrix-active"' : '';
          };
          const m2Cell = (rowKey: string, colKey: string) => {
            const isActive = faiKey === rowKey && con === colKey;
            return isActive ? 'class="matrix-active"' : '';
          };

          return `
    <div class="traq-form">
      <!-- Header -->
      <div class="traq-header">
        <h3>ISA TRAQ Level 2 \u2014 Basic Assessment</h3>
        <p class="traq-subtitle">Tree Risk Assessment Qualification</p>
      </div>

      <!-- Assessor/Tree Info -->
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

      <!-- Targets -->
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

      <!-- Tree Health & Structural Assessment -->
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
          <td>${esc(tree.healthNotes || "No health defects noted.")}</td>
        </tr>
        <tr>
          <td class="traq-label">Structural Notes</td>
          <td>${esc(tree.structuralNotes || "No structural defects noted.")}</td>
        </tr>
      </table>

      <!-- Risk Rating -->
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

      <!-- Overall Risk -->
      <div class="traq-overall-risk traq-risk-${overallRiskRaw || "none"}">
        <strong>OVERALL RISK RATING:</strong>
        <span class="traq-risk-value">${(computedRisk || overallRisk || "N/A").toUpperCase()}</span>
      </div>

      <!-- ISA Matrices (reference) -->
      <div class="traq-matrices">
        <div class="matrix-pair">
          <div class="matrix">
            <p class="matrix-title">Matrix 1: Likelihood of Failure &amp; Impact</p>
            <table class="matrix-table">
              <thead>
                <tr><th>Failure \u2193 / Impact \u2192</th><th>Very Low</th><th>Low</th><th>Medium</th><th>High</th></tr>
              </thead>
              <tbody>
                <tr><td>Imminent</td><td ${m1Cell("imminent","very_low")}>Unlikely</td><td ${m1Cell("imminent","low")}>Somewhat</td><td ${m1Cell("imminent","medium")}>Likely</td><td ${m1Cell("imminent","high")}>Very likely</td></tr>
                <tr><td>Probable</td><td ${m1Cell("probable","very_low")}>Unlikely</td><td ${m1Cell("probable","low")}>Unlikely</td><td ${m1Cell("probable","medium")}>Somewhat</td><td ${m1Cell("probable","high")}>Likely</td></tr>
                <tr><td>Possible</td><td ${m1Cell("possible","very_low")}>Unlikely</td><td ${m1Cell("possible","low")}>Unlikely</td><td ${m1Cell("possible","medium")}>Unlikely</td><td ${m1Cell("possible","high")}>Somewhat</td></tr>
                <tr><td>Improbable</td><td ${m1Cell("improbable","very_low")}>Unlikely</td><td ${m1Cell("improbable","low")}>Unlikely</td><td ${m1Cell("improbable","medium")}>Unlikely</td><td ${m1Cell("improbable","high")}>Unlikely</td></tr>
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
                <tr><td>Very likely</td><td ${m2Cell("very_likely","negligible")}>Low</td><td ${m2Cell("very_likely","minor")}>Moderate</td><td ${m2Cell("very_likely","significant")}>High</td><td ${m2Cell("very_likely","severe")}>Extreme</td></tr>
                <tr><td>Likely</td><td ${m2Cell("likely","negligible")}>Low</td><td ${m2Cell("likely","minor")}>Moderate</td><td ${m2Cell("likely","significant")}>High</td><td ${m2Cell("likely","severe")}>High</td></tr>
                <tr><td>Somewhat likely</td><td ${m2Cell("somewhat_likely","negligible")}>Low</td><td ${m2Cell("somewhat_likely","minor")}>Low</td><td ${m2Cell("somewhat_likely","significant")}>Moderate</td><td ${m2Cell("somewhat_likely","severe")}>Moderate</td></tr>
                <tr><td>Unlikely</td><td ${m2Cell("unlikely","negligible")}>Low</td><td ${m2Cell("unlikely","minor")}>Low</td><td ${m2Cell("unlikely","significant")}>Low</td><td ${m2Cell("unlikely","severe")}>Low</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recommended Action & Mitigation -->
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

      <!-- Inspection limitations & Signature -->
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
          } catch { /* ignore */ }
        }

        const replacementRatio = (mitigationRules.replantingRatio as string) || "3:1";
        const minBoxSize = (mitigationRules.minBoxSize as string) || "24-inch box";
        const inLieuFeePerTree = (mitigationRules.inLieuFeePerTree as number) || null;

        const ratioNum = parseInt(replacementRatio.split(":")[0]) || 3;

        const rows = protectedRemovalTrees
          .map((tree) => {
            const replacementsRequired = ratioNum;
            const feeTotal = inLieuFeePerTree ? inLieuFeePerTree * replacementsRequired : null;

            return `
          <tr>
            <td class="center">#${tree.treeNumber}</td>
            <td>${esc(tree.speciesCommon)}</td>
            <td class="center">${tree.dbhInches}"</td>
            <td>${esc(tree.protectionReason || "Protected")}</td>
            <td class="center">${replacementRatio}</td>
            <td class="center">${replacementsRequired} tree${replacementsRequired !== 1 ? "s" : ""}</td>
            <td class="center">${minBoxSize} min.</td>
            ${inLieuFeePerTree ? `<td class="center">$${(feeTotal!).toLocaleString()}</td>` : ""}
          </tr>`;
          })
          .join("\n");

        const totalReplacements = protectedRemovalTrees.length * ratioNum;
        const totalFee = inLieuFeePerTree ? totalReplacements * inLieuFeePerTree : null;

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

    ${inLieuFeePerTree ? `
    <p class="mitigation-note">
      <strong>Note:</strong> The property owner may elect to plant replacement trees on-site at the required ratio
      and size, or pay the in-lieu fee of $${inLieuFeePerTree.toLocaleString()} per required replacement tree to
      the city's tree replacement fund. Contact the city Urban Forestry division for current fee schedules and
      approved replacement species lists.
    </p>` : `
    <p class="mitigation-note">
      <strong>Note:</strong> Contact the ${esc(property.city)} Urban Forestry division for current mitigation
      requirements, approved replacement species lists, and any applicable in-lieu fee options.
    </p>`}
    `;
      }
    }

    // =========================================================================
    // ENHANCED CREDENTIALS BLOCK
    // =========================================================================
    let additionalCertsArr: string[] = [];
    try {
      const parsed = JSON.parse(arborist.additionalCerts || "[]");
      if (Array.isArray(parsed)) additionalCertsArr = parsed;
    } catch {
      // If it's a comma-separated string, split it
      if (arborist.additionalCerts && arborist.additionalCerts !== "[]") {
        additionalCertsArr = arborist.additionalCerts
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }

    const credentialsBlock = `
    <div class="cert-credentials">
      <div class="cert-credentials-header">CERTIFYING ARBORIST</div>
      <table class="cert-credentials-table">
        <tr>
          <td class="cert-cred-label">Name</td>
          <td class="cert-cred-value">${esc(arborist.name)}</td>
        </tr>
        <tr>
          <td class="cert-cred-label">ISA Certification</td>
          <td class="cert-cred-value">#${esc(arborist.isaCertificationNum)}</td>
        </tr>
        ${arborist.traqCertified ? `
        <tr>
          <td class="cert-cred-label">TRAQ Qualified</td>
          <td class="cert-cred-value">ISA Tree Risk Assessment Qualified</td>
        </tr>` : ""}
        ${additionalCertsArr.length > 0 ? `
        <tr>
          <td class="cert-cred-label">Additional Certs</td>
          <td class="cert-cred-value">${esc(additionalCertsArr.join(", "))}</td>
        </tr>` : ""}
        ${arborist.licenseNumbers ? `
        <tr>
          <td class="cert-cred-label">License Numbers</td>
          <td class="cert-cred-value">${esc(arborist.licenseNumbers)}</td>
        </tr>` : ""}
        ${arborist.companyName ? `
        <tr>
          <td class="cert-cred-label">Company</td>
          <td class="cert-cred-value">${esc(arborist.companyName)}</td>
        </tr>` : ""}
        ${arborist.companyPhone ? `
        <tr>
          <td class="cert-cred-label">Phone</td>
          <td class="cert-cred-value">${esc(arborist.companyPhone)}</td>
        </tr>` : ""}
        ${arborist.companyEmail ? `
        <tr>
          <td class="cert-cred-label">Email</td>
          <td class="cert-cred-value">${esc(arborist.companyEmail)}</td>
        </tr>` : ""}
      </table>
    </div>`;

    // Draft watermark
    const draftWatermark = !isCertified
      ? `<div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-35deg); font-size:140pt; font-weight:bold; color:rgba(200,200,200,0.08); letter-spacing:24px; pointer-events:none; z-index:0; white-space:nowrap;">DRAFT</div>`
      : "";

    // Footer text for displayHeaderFooter
    const footerCompany = arborist.companyName || arborist.name;
    const footerAddress = `${property.address}, ${property.city}`;

    // Build the full HTML document
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Arborist Report \u2014 ${esc(property.address)}, ${esc(property.city)}</title>
  <style>
    /* ---- Base ---- */
    * { box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1a1a1a;
      font-size: 10.5pt;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      position: relative;
    }
    .page-break { page-break-before: always; }

    /* ==== COVER LETTER ==== */
    .cover-letter {
      font-family: Georgia, serif;
      font-size: 10.5pt;
      line-height: 1.6;
      padding: 0.5in 0;
    }
    .cl-letterhead {
      border-bottom: 2px solid #2d5016;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .cl-company {
      font-size: 14pt;
      font-weight: bold;
      color: #2d5016;
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
      border-left: 3px solid #2d5016;
      background-color: #f8faf5;
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

    /* ==== COVER PAGE ==== */
    .cover-page {
      display: flex;
      flex-direction: column;
      min-height: 9in;
      position: relative;
      padding: 0;
    }
    .cover-branding {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 2px solid #2d5016;
      margin-bottom: 0;
    }
    .cover-brand-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .cover-logo { max-height: 64px; width: auto; }
    .cover-company-name {
      font-size: 16pt;
      font-weight: bold;
      color: #2d5016;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: 0.5px;
    }
    .cover-brand-right {
      text-align: right;
      font-size: 8.5pt;
      color: #666;
      line-height: 1.5;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cover-title-block {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px 0 40px 0;
    }
    .cover-rule-top {
      width: 280px;
      border: none;
      border-top: 3px double #2d5016;
      margin: 0 auto 32px auto;
    }
    .cover-title {
      font-size: 28pt;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin: 0 0 6px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cover-address {
      font-size: 14pt;
      color: #333;
      font-weight: normal;
      margin: 0 0 4px 0;
    }
    .cover-city {
      font-size: 11pt;
      color: #666;
      margin: 0 0 20px 0;
    }
    .cover-type-badge {
      font-size: 9pt;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      display: inline-block;
      padding: 5px 20px;
      border-radius: 20px;
      margin: 0 0 4px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cover-type-certified { background: #2d5016; color: #fff; }
    .cover-type-draft { background: #e5e7eb; color: #6b7280; }
    .cover-rule-bottom {
      width: 280px;
      border: none;
      border-top: 3px double #2d5016;
      margin: 28px auto 0 auto;
    }
    .cover-meta-table {
      width: 80%;
      max-width: 480px;
      margin: 32px auto 0 auto;
      border-collapse: collapse;
      font-size: 10pt;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cover-meta-table td {
      padding: 6px 12px;
      vertical-align: top;
    }
    .cover-meta-label {
      color: #888;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-bottom: 2px;
    }
    .cover-meta-value { color: #1a1a1a; font-weight: 500; }
    .cover-footer {
      text-align: center;
      padding-top: 20px;
      margin-top: auto;
    }
    .cover-draft-badge {
      font-size: 14pt;
      color: #b0b0b0;
      letter-spacing: 6px;
      text-transform: uppercase;
      border: 2px solid #d0d0d0;
      padding: 6px 32px;
      display: inline-block;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin-bottom: 16px;
    }
    .cover-confidential {
      font-size: 7.5pt;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* ==== REPORT BODY ==== */
    .section-title {
      font-size: 14pt;
      color: #2d5016;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 24px 0 8px 0;
      border-bottom: 2px solid #2d5016;
      padding-bottom: 4px;
      font-weight: 700;
    }
    .report-body h1 {
      font-size: 14pt;
      color: #2d5016;
      border-bottom: 2px solid #2d5016;
      padding-bottom: 4px;
      margin: 28px 0 10px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 700;
    }
    .report-body h2 {
      font-size: 12pt;
      color: #1a1a1a;
      margin: 20px 0 8px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 600;
    }
    .report-body h3 {
      font-size: 10.5pt;
      color: #333;
      margin: 16px 0 6px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
      background: #2d5016;
      color: white;
      padding: 5px 8px;
      text-align: left;
      font-weight: bold;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8.5pt;
    }
    .report-body table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .report-body table tr:nth-child(even) { background: #f7f9f5; }

    /* ---- Tree Inventory Table ---- */
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    .inventory-table th {
      background: #2d5016;
      color: white;
      padding: 6px 6px;
      text-align: left;
      font-weight: 600;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8pt;
      letter-spacing: 0.3px;
    }
    .inventory-table td {
      padding: 4px 6px;
      border-bottom: 1px solid #e5e7eb;
    }
    .inventory-table tr.alt { background: #f7f9f5; }
    .inventory-table td.center,
    .inventory-table th.center { text-align: center; }
    .inventory-legend {
      font-size: 7.5pt;
      color: #999;
      margin-top: 6px;
      font-style: italic;
    }

    /* ---- Photo Documentation ---- */
    .photo-group {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    .photo-group h3 {
      font-size: 11pt;
      color: #2d5016;
      margin: 0 0 10px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 600;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
    }
    .photo-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }
    .photo-item {
      text-align: center;
      max-width: 280px;
    }
    .photo-item img {
      max-width: 280px;
      max-height: 220px;
      border: 1px solid #d0d0d0;
      border-radius: 3px;
    }
    .photo-caption {
      font-size: 8pt;
      color: #666;
      margin-top: 4px;
      font-style: italic;
    }

    /* ---- TRAQ Form Styles ---- */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 12px 0;
    }
    .traq-form {
      page-break-inside: avoid;
      page-break-before: always;
      border: 1.5px solid #3d5c2e;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 9px;
      line-height: 1.3;
    }
    .traq-header {
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #3d5c2e;
      padding-bottom: 6px;
    }
    .traq-header h3 {
      font-size: 13px;
      margin: 0;
      color: #3d5c2e;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .traq-subtitle {
      font-size: 9px;
      color: #666;
      margin: 2px 0 0 0;
    }
    .traq-section-header {
      background: #3d5c2e;
      color: white;
      font-weight: 700;
      font-size: 9px;
      padding: 3px 8px;
      margin: 8px 0 4px 0;
      border-radius: 2px;
      font-family: Helvetica, Arial, sans-serif;
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
      border: 2px solid #3d5c2e;
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
    .traq-risk-low .traq-risk-value { color: #2d5016; }
    .traq-risk-moderate { background-color: #fff8e1; }
    .traq-risk-moderate .traq-risk-value { color: #b8860b; }
    .traq-risk-high { background-color: #fff3e0; }
    .traq-risk-high .traq-risk-value { color: #e65100; }
    .traq-risk-extreme { background-color: #ffebee; }
    .traq-risk-extreme .traq-risk-value { color: #c62828; }
    .traq-risk-none { background-color: #f0f0f0; }
    .traq-risk-none .traq-risk-value { color: #666; }

    /* Matrices side by side */
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
    /* Highlight the active cell in the matrix */
    .matrix-active {
      background-color: #3d5c2e;
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
    .avoid-break { page-break-inside: avoid; }

    /* ---- Mitigation Table ---- */
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
      background-color: #2d5016;
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
      border-top: 2px solid #2d5016;
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

    /* ---- Certification Page ---- */
    .cert-page {
      page-break-before: always;
      padding-top: 40px;
    }
    .cert-box {
      border: 3px double #2d5016;
      padding: 32px;
      margin: 20px 0;
      background: #f8faf5;
      border-radius: 2px;
    }
    .cert-box h2 {
      margin: 0 0 16px 0;
      font-size: 14pt;
      color: #2d5016;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 700;
    }
    .cert-icon {
      display: inline-block;
      margin-right: 8px;
      font-size: 16pt;
    }
    .cert-box p { margin: 5px 0; font-size: 10pt; line-height: 1.6; }
    .cert-signature {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #ccc;
    }
    .cert-signature p { margin: 4px 0; font-size: 10pt; }
    .signature-line {
      border-bottom: 1px solid #333;
      display: inline-block;
      min-width: 300px;
      padding-bottom: 3px;
      font-style: italic;
      margin-left: 4px;
    }

    /* ---- Enhanced Credentials Block ---- */
    .cert-credentials {
      border: 2px solid #2d5016;
      margin-top: 24px;
      overflow: hidden;
    }
    .cert-credentials-header {
      background-color: #2d5016;
      color: white;
      padding: 6px 12px;
      font-size: 9pt;
      font-weight: bold;
      font-family: Helvetica, Arial, sans-serif;
      letter-spacing: 1px;
    }
    .cert-credentials-table {
      width: 100%;
      font-size: 9.5pt;
    }
    .cert-credentials-table td {
      padding: 5px 12px;
      border-bottom: 1px solid #eee;
    }
    .cert-cred-label {
      width: 30%;
      font-weight: 600;
      color: #555;
      background-color: #f8faf5;
    }
    .cert-cred-value { color: #222; }
  </style>
</head>
<body>
  ${draftWatermark}

  <!-- ========== COVER LETTER (removal permits) ========== -->
  ${coverLetterHtml}

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    <!-- Top branding bar -->
    <div class="cover-branding">
      <div class="cover-brand-left">
        ${arborist.companyLogoUrl ? `<img src="${photoToBase64(arborist.companyLogoUrl) || arborist.companyLogoUrl}" alt="Logo" class="cover-logo" />` : ""}
        ${arborist.companyName ? `<div class="cover-company-name">${esc(arborist.companyName)}</div>` : `<div class="cover-company-name">${esc(arborist.name)}</div>`}
      </div>
      <div class="cover-brand-right">
        ${arborist.companyAddress ? `${esc(arborist.companyAddress)}<br/>` : ""}
        ${arborist.companyPhone ? `${esc(arborist.companyPhone)}<br/>` : ""}
        ${arborist.companyEmail ? `${esc(arborist.companyEmail)}<br/>` : ""}
        ${arborist.companyWebsite ? `${esc(arborist.companyWebsite)}` : ""}
      </div>
    </div>

    <!-- Centered title block -->
    <div class="cover-title-block">
      <hr class="cover-rule-top" />
      <div class="cover-title">Arborist Report</div>
      <div class="cover-address">${esc(property.address)}</div>
      <div class="cover-city">
        ${esc(property.city)}, ${esc(property.state || "CA")}${property.county ? ` \u2014 ${esc(property.county)} County` : ""}
      </div>
      <div class="cover-type-badge ${isCertified ? "cover-type-certified" : "cover-type-draft"}">
        ${isCertified ? "\u2713 Certified" : "Draft"} \u2014 ${esc(reportTypeLabel)}
      </div>
      <hr class="cover-rule-bottom" />

      <!-- 2-column meta table -->
      <table class="cover-meta-table">
        <tr>
          <td>
            <div class="cover-meta-label">Prepared By</div>
            <div class="cover-meta-value">${esc(arborist.name)}</div>
          </td>
          <td>
            <div class="cover-meta-label">ISA Certification</div>
            <div class="cover-meta-value">#${esc(arborist.isaCertificationNum)}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="cover-meta-label">Report Date</div>
            <div class="cover-meta-value">${dateStr}</div>
          </td>
          <td>
            <div class="cover-meta-label">Property APN</div>
            <div class="cover-meta-value">${esc(property.parcelNumber || "N/A")}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="cover-meta-label">Trees Assessed</div>
            <div class="cover-meta-value">${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}</div>
          </td>
          <td>
            <div class="cover-meta-label">Report Type</div>
            <div class="cover-meta-value">${esc(reportTypeLabel)}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Cover footer -->
    <div class="cover-footer">
      ${!isCertified ? '<div class="cover-draft-badge">DRAFT</div><br/>' : ""}
      <div class="cover-confidential">Confidential \u2014 Prepared for property owner and authorized parties only</div>
    </div>
  </div>

  <!-- ========== TREE INVENTORY TABLE ========== -->
  <div class="page-break"></div>
  <h2 class="section-title">Tree Inventory</h2>
  <table class="inventory-table">
    <thead>
      <tr>
        <th class="center" style="width:5%">#</th>
        <th class="center" style="width:5%">Tag</th>
        <th>Species</th>
        <th class="center" style="width:6%">DBH</th>
        <th class="center" style="width:6%">Ht.</th>
        <th class="center" style="width:7%">Canopy</th>
        <th class="center" style="width:12%">Condition</th>
        <th class="center" style="width:6%">Prot.</th>
        <th style="width:10%">Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
    </tbody>
  </table>
  <p class="inventory-legend">
    Condition: 0 = Dead &bull; 1 = Critical &bull; 2 = Poor &bull; 3 = Fair &bull; 4 = Good &bull; 5 = Excellent &nbsp;|&nbsp; Prot. = Protected under local tree ordinance
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

  <!-- ========== CERTIFICATION PAGE ========== -->
  <div class="cert-page">
    <h2 class="section-title">Arborist Certification</h2>
    <div class="cert-box">
      <h2><span class="cert-icon">${isCertified ? "\u2713" : "\u2726"}</span>Certification Statement</h2>
      <p>
        I, the undersigned, certify that I have personally inspected the tree(s) described in this
        report and that the information contained herein is accurate to the best of my professional
        knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based
        on my professional training, experience, and education.
      </p>
      <p>
        I have no personal interest or bias with respect to the parties involved. The analysis,
        opinions, and conclusions stated herein are my own, and are based on current scientific
        procedures and facts.
      </p>

      <div class="cert-signature">
        ${
          isCertified
            ? `
        <p><strong>Electronically Signed:</strong><span class="signature-line">${esc(report.eSignatureText || "")}</span></p>
        <p style="margin-top:12px;"><strong>Name:</strong> ${esc(arborist.name)}</p>
        <p><strong>ISA Certification #:</strong> ${esc(arborist.isaCertificationNum)}</p>
        ${arborist.companyName ? `<p><strong>Company:</strong> ${esc(arborist.companyName)}</p>` : ""}
        <p><strong>Date Certified:</strong> ${
          report.certifiedAt
            ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : dateStr
        }</p>`
            : `
        <p style="color: #999; font-style: italic;">
          This report has not yet been certified. The certification signature will appear here once the arborist certifies the report.
        </p>
        <p style="margin-top: 24px;"><strong>Arborist:</strong> ${esc(arborist.name)}</p>
        <p><strong>ISA Certification #:</strong> ${esc(arborist.isaCertificationNum)}</p>
        ${arborist.companyName ? `<p><strong>Company:</strong> ${esc(arborist.companyName)}</p>` : ""}`
        }
      </div>
    </div>

    <!-- Enhanced Credentials Block -->
    ${credentialsBlock}
  </div>
</body>
</html>`;

    // Render HTML to PDF using Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.75in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width:100%; font-size:8px; font-family:Helvetica,Arial,sans-serif; color:#999; padding:0 0.6in; display:flex; justify-content:space-between; align-items:center;">
          <span>${esc(footerCompany)}</span>
          <span>${esc(footerAddress)}</span>
          <span>Page <span class="pageNumber"></span></span>
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
      ext === ".png" ? "image/png" :
      ext === ".webp" ? "image/webp" :
      ext === ".heic" ? "image/heic" :
      "image/jpeg";

    return `data:${mimeType};base64,${photoData.toString("base64")}`;
  } catch {
    return null;
  }
}
