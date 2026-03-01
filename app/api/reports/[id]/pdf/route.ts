import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { renderMarkdownToHtml } from "@/lib/markdown";
import puppeteer from "puppeteer";

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

    // TRAQ risk color mapping
    const riskColors: Record<string, string> = {
      low: "#e8f5e9",
      moderate: "#fff8e1",
      high: "#fff3e0",
      extreme: "#ffebee",
    };

    const riskTextColors: Record<string, string> = {
      low: "#2e7d32",
      moderate: "#f57f17",
      high: "#e65100",
      extreme: "#c62828",
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
              (photo, i) => `
            <div class="photo-item">
              <img src="${photo.url}" alt="Tree #${tree.treeNumber} photo ${i + 1}" />
              <p class="photo-caption">Photo ${i + 1}${photo.caption ? ` \u2014 ${esc(photo.caption)}` : ""}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("\n");

    // TRAQ appendix (health assessment only)
    let traqAppendix = "";
    if (report.reportType === "health_assessment") {
      const traqRows = trees
        .map((tree) => {
          let data: Record<string, unknown> = {};
          if (tree.typeSpecificData) {
            try {
              data = JSON.parse(tree.typeSpecificData);
            } catch {
              // skip
            }
          }

          const likelihoodOfFailure = fmtEnum(data.likelihoodOfFailure as string);
          const likelihoodOfImpact = fmtEnum(data.likelihoodOfImpact as string);
          const consequences = fmtEnum(data.consequences as string);
          const overallRisk = fmtEnum(data.overallRiskRating as string);
          const overallRiskRaw = ((data.overallRiskRating as string) || "").toLowerCase();
          const riskBg = riskColors[overallRiskRaw] || "#f0f0f0";
          const riskTxt = riskTextColors[overallRiskRaw] || "#1a1a1a";

          // Individual row risk coloring
          const lofRaw = ((data.likelihoodOfFailure as string) || "").toLowerCase();
          const loiRaw = ((data.likelihoodOfImpact as string) || "").toLowerCase();
          const consRaw = ((data.consequences as string) || "").toLowerCase();

          const target = (data.targetDescription as string) || "N/A";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          return `
        <div class="traq-tree avoid-break">
          <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</h3>
          <table class="traq-table">
            <tr>
              <td class="label-cell">Species</td>
              <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` (${esc(tree.speciesScientific)})` : ""}</td>
              <td class="label-cell">DBH</td>
              <td>${tree.dbhInches}"</td>
            </tr>
            <tr>
              <td class="label-cell">Height</td>
              <td>${tree.heightFt ? `${tree.heightFt}'` : "N/A"}</td>
              <td class="label-cell">Condition</td>
              <td>${conditionLabels[tree.conditionRating] ?? tree.conditionRating} (${tree.conditionRating}/5)</td>
            </tr>
            <tr>
              <td class="label-cell">Target</td>
              <td colspan="3">${esc(target)}</td>
            </tr>
          </table>
          <table class="traq-matrix">
            <thead>
              <tr>
                <th>Assessment Factor</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:${riskRowBg(lofRaw)};">
                <td>Likelihood of Failure</td>
                <td class="center">${likelihoodOfFailure}</td>
              </tr>
              <tr style="background:${riskRowBg(loiRaw)};">
                <td>Likelihood of Impact</td>
                <td class="center">${likelihoodOfImpact}</td>
              </tr>
              <tr style="background:${riskRowBg(consRaw)};">
                <td>Consequences of Failure</td>
                <td class="center">${consequences}</td>
              </tr>
              <tr class="risk-row" style="background:${riskBg};">
                <td><strong>Overall Risk Rating</strong></td>
                <td class="center"><strong style="color:${riskTxt}; font-size:10pt;">${overallRisk}</strong></td>
              </tr>
            </tbody>
          </table>
          <p class="maintenance-line"><strong>Recommended Maintenance:</strong> ${esc(maintenance)}</p>
        </div>`;
        })
        .join("\n");

      traqAppendix = `
      <div class="page-break"></div>
      <h2 class="section-title">Appendix: TRAQ Risk Assessment Forms</h2>
      <p class="appendix-subtitle">ISA Tree Risk Assessment Qualification (TRAQ) \u2014 Level 2 Basic Assessment</p>
      ${traqRows}`;
    }

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

    /* ==== COVER PAGE ==== */
    .cover-page {
      display: flex;
      flex-direction: column;
      min-height: 9in;
      position: relative;
      padding: 0;
    }

    /* Top branding bar: logo left, company info right */
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

    /* Centered title block */
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
    .cover-type-certified {
      background: #2d5016;
      color: #fff;
    }
    .cover-type-draft {
      background: #e5e7eb;
      color: #6b7280;
    }
    .cover-rule-bottom {
      width: 280px;
      border: none;
      border-top: 3px double #2d5016;
      margin: 28px auto 0 auto;
    }

    /* 2-column meta table */
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
    .cover-meta-value {
      color: #1a1a1a;
      font-weight: 500;
    }

    /* Cover footer area */
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

    /* ---- TRAQ Appendix ---- */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 20px 0;
    }
    .traq-tree {
      margin-bottom: 28px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      padding: 16px;
      page-break-inside: avoid;
    }
    .traq-tree h3 {
      margin: 0 0 10px 0;
      font-size: 11pt;
      color: #2d5016;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 600;
    }
    .traq-table {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 10px 0;
      font-size: 9pt;
    }
    .traq-table td {
      padding: 5px 8px;
      border: 1px solid #e5e7eb;
    }
    .traq-table .label-cell {
      background: #f0f4ec;
      font-weight: 600;
      width: 20%;
      color: #333;
    }
    .traq-matrix {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 10px 0;
      font-size: 9pt;
    }
    .traq-matrix th {
      background: #2d5016;
      color: white;
      padding: 5px 8px;
      text-align: left;
      font-weight: 600;
      font-size: 8.5pt;
    }
    .traq-matrix td {
      padding: 5px 8px;
      border: 1px solid #e5e7eb;
    }
    .traq-matrix .risk-row { font-size: 10pt; }
    .traq-matrix td.center { text-align: center; }
    .maintenance-line {
      font-size: 9pt;
      margin: 6px 0 0 0;
      padding: 6px 0 0 0;
      border-top: 1px solid #e5e7eb;
    }
    .avoid-break { page-break-inside: avoid; }

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
  </style>
</head>
<body>
  ${draftWatermark}

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    <!-- Top branding bar -->
    <div class="cover-branding">
      <div class="cover-brand-left">
        ${arborist.companyLogoUrl ? `<img src="${arborist.companyLogoUrl}" alt="Logo" class="cover-logo" />` : ""}
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

function riskRowBg(rawValue: string): string {
  const map: Record<string, string> = {
    improbable: "#f7f9f5",
    possible: "#fff8e1",
    probable: "#fff3e0",
    imminent: "#ffebee",
    very_low: "#f7f9f5",
    low: "#e8f5e9",
    medium: "#fff8e1",
    high: "#fff3e0",
    negligible: "#f7f9f5",
    minor: "#e8f5e9",
    significant: "#fff3e0",
    severe: "#ffebee",
  };
  return map[rawValue] || "#ffffff";
}
