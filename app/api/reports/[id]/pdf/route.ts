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

    // Tree inventory rows
    const treeRows = trees
      .map(
        (tree, idx) => `
      <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
        <td class="center">${tree.treeNumber}</td>
        <td>${esc(tree.tagNumber || "\u2014")}</td>
        <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
        <td class="center">${tree.dbhInches}"</td>
        <td class="center">${tree.heightFt ? `${tree.heightFt}'` : "N/A"}</td>
        <td class="center">${tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "N/A"}</td>
        <td class="center">${conditionLabels[tree.conditionRating] ?? tree.conditionRating}</td>
        <td class="center">${tree.isProtected ? "Yes" : "No"}</td>
        <td>${esc(tree.recommendedAction?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A")}</td>
      </tr>`
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
        <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}</h3>
        <div class="photo-grid">
          ${(tree.treePhotos || [])
            .map(
              (photo, i) => `
            <div class="photo-item">
              <img src="${photo.url}" alt="Tree #${tree.treeNumber} photo ${i + 1}" />
              <p class="photo-caption">Photo ${i + 1}${photo.caption ? `: ${esc(photo.caption)}` : ""}</p>
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
          const target = (data.targetDescription as string) || "N/A";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          return `
        <div class="traq-tree avoid-break">
          <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}</h3>
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
              <td class="label-cell">Condition Rating</td>
              <td>${conditionLabels[tree.conditionRating] ?? tree.conditionRating} (${tree.conditionRating}/5)</td>
            </tr>
            <tr>
              <td class="label-cell">Target Description</td>
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
              <tr>
                <td>Likelihood of Failure</td>
                <td class="center">${likelihoodOfFailure}</td>
              </tr>
              <tr>
                <td>Likelihood of Impact</td>
                <td class="center">${likelihoodOfImpact}</td>
              </tr>
              <tr>
                <td>Consequences of Failure</td>
                <td class="center">${consequences}</td>
              </tr>
              <tr class="risk-row">
                <td><strong>Overall Risk Rating</strong></td>
                <td class="center"><strong>${overallRisk}</strong></td>
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

    // Draft watermark as absolutely-positioned element (not CSS ::after which doesn't work in Puppeteer PDF)
    const draftWatermark = !isCertified
      ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 120pt; font-weight: bold; color: rgba(200, 200, 200, 0.15); letter-spacing: 20px; pointer-events: none; z-index: 0; white-space: nowrap;">DRAFT</div>`
      : "";

    // Build the full HTML document (no toolbar, no body::after watermark)
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
      line-height: 1.55;
      margin: 0;
      padding: 0;
      position: relative;
    }
    .page-break { page-break-before: always; }

    /* ==== COVER PAGE ==== */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 9in;
      text-align: center;
      position: relative;
    }
    .cover-logo { max-height: 80px; width: auto; margin-bottom: 24px; }
    .cover-company {
      font-size: 14pt;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
    }
    .cover-contact { font-size: 9pt; color: #666; margin-bottom: 40px; }
    .cover-rule {
      width: 200px;
      border: none;
      border-top: 2px solid #333;
      margin: 0 auto 40px auto;
    }
    .cover-title {
      font-size: 28pt;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin: 0 0 8px 0;
    }
    .cover-subtitle {
      font-size: 14pt;
      color: #333;
      font-weight: normal;
      margin: 0 0 8px 0;
    }
    .cover-type {
      font-size: 11pt;
      color: #555;
      border: 1px solid #999;
      display: inline-block;
      padding: 4px 16px;
      margin: 16px 0 40px 0;
    }
    .cover-meta {
      font-size: 10pt;
      color: #555;
      line-height: 1.8;
    }
    .cover-meta strong { color: #333; }
    ${!isCertified ? '.cover-draft { font-size: 16pt; color: #999; letter-spacing: 4px; margin-top: 20px; border: 2px solid #ccc; padding: 6px 30px; display: inline-block; }' : ''}

    /* ==== REPORT BODY ==== */
    .section-title {
      font-size: 14pt;
      color: #1a1a1a;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 24px 0 8px 0;
      border-bottom: 1px solid #333;
      padding-bottom: 3px;
    }
    .report-body h1 {
      font-size: 14pt;
      color: #1a1a1a;
      border-bottom: 1px solid #999;
      padding-bottom: 3px;
      margin: 24px 0 10px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .report-body h2 {
      font-size: 12pt;
      color: #1a1a1a;
      margin: 18px 0 8px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .report-body h3 {
      font-size: 10.5pt;
      color: #333;
      margin: 14px 0 6px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
      background: #333;
      color: white;
      padding: 4px 8px;
      text-align: left;
      font-weight: bold;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8.5pt;
    }
    .report-body table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .report-body table tr:nth-child(even) { background: #f7f7f7; }

    /* ---- Tree Inventory Table ---- */
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    .inventory-table th {
      background: #333;
      color: white;
      padding: 5px 6px;
      text-align: left;
      font-weight: bold;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8pt;
    }
    .inventory-table td {
      padding: 4px 6px;
      border: 1px solid #ddd;
    }
    .inventory-table tr.alt { background: #f7f7f7; }
    .inventory-table td.center,
    .inventory-table th.center { text-align: center; }

    /* ---- Photo Documentation ---- */
    .photo-group { margin-bottom: 20px; page-break-inside: avoid; }
    .photo-group h3 {
      font-size: 11pt;
      color: #333;
      margin: 0 0 8px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .photo-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .photo-item { text-align: center; }
    .photo-item img {
      max-width: 220px;
      max-height: 180px;
      border: 1px solid #ddd;
    }
    .photo-caption {
      font-size: 8pt;
      color: #666;
      margin-top: 3px;
    }

    /* ---- TRAQ Appendix ---- */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 20px 0;
    }
    .traq-tree {
      margin-bottom: 24px;
      border: 1px solid #ccc;
      padding: 12px;
    }
    .traq-tree h3 {
      margin: 0 0 8px 0;
      font-size: 11pt;
      color: #1a1a1a;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .traq-table {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 8px 0;
      font-size: 9pt;
    }
    .traq-table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .traq-table .label-cell {
      background: #f0f0f0;
      font-weight: bold;
      width: 20%;
    }
    .traq-matrix {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 8px 0;
      font-size: 9pt;
    }
    .traq-matrix th {
      background: #555;
      color: white;
      padding: 4px 8px;
      text-align: left;
      font-weight: bold;
      font-size: 8.5pt;
    }
    .traq-matrix td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .traq-matrix .risk-row { background: #f0f0f0; }
    .traq-matrix td.center { text-align: center; }
    .maintenance-line {
      font-size: 9pt;
      margin: 4px 0 0 0;
    }
    .avoid-break { page-break-inside: avoid; }

    /* ---- Certification Page ---- */
    .cert-page {
      page-break-before: always;
      padding-top: 40px;
    }
    .cert-box {
      border: 2px solid #333;
      padding: 24px;
      margin: 20px 0;
    }
    .cert-box h2 {
      margin: 0 0 16px 0;
      font-size: 14pt;
      color: #1a1a1a;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cert-box p { margin: 4px 0; font-size: 10pt; }
    .cert-signature {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #ccc;
    }
    .cert-signature p { margin: 3px 0; font-size: 10pt; }
    .signature-line {
      border-bottom: 1px solid #333;
      display: inline-block;
      min-width: 280px;
      padding-bottom: 2px;
      font-style: italic;
    }

    /* ---- Footer ---- */
    .page-footer {
      text-align: center;
      font-size: 8pt;
      color: #999;
      margin-top: 40px;
      padding-top: 8px;
      border-top: 1px solid #eee;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  </style>
</head>
<body>
  ${draftWatermark}

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    ${
      arborist.companyLogoUrl
        ? `<img src="${arborist.companyLogoUrl}" alt="Company Logo" class="cover-logo" />`
        : ""
    }
    ${arborist.companyName ? `<div class="cover-company">${esc(arborist.companyName)}</div>` : ""}
    <div class="cover-contact">
      ${[arborist.companyAddress, arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).map((s) => esc(s!)).join(" &bull; ")}
    </div>

    <hr class="cover-rule" />

    <div class="cover-title">Arborist Report</div>
    <div class="cover-subtitle">${esc(property.address)}</div>
    <div class="cover-subtitle" style="font-size: 11pt; color: #666;">
      ${esc(property.city)}, ${esc(property.state || "CA")}${property.county ? ` \u2014 ${esc(property.county)} County` : ""}
    </div>

    <div class="cover-type">${esc(reportTypeLabel)}</div>

    <div class="cover-meta">
      <strong>Prepared by:</strong> ${esc(arborist.name)}, ISA #${esc(arborist.isaCertificationNum)}<br />
      <strong>Date:</strong> ${dateStr}<br />
      <strong>Property APN:</strong> ${esc(property.parcelNumber || "N/A")}<br />
      <strong>Trees Assessed:</strong> ${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}
    </div>

    ${!isCertified ? '<div class="cover-draft">DRAFT</div>' : ""}
  </div>

  <!-- ========== TREE INVENTORY TABLE ========== -->
  <div class="page-break"></div>
  <h2 class="section-title">Tree Inventory</h2>
  <table class="inventory-table">
    <thead>
      <tr>
        <th class="center" style="width:5%">Tree&nbsp;#</th>
        <th style="width:5%">Tag</th>
        <th>Species</th>
        <th class="center" style="width:6%">DBH</th>
        <th class="center" style="width:6%">Height</th>
        <th class="center" style="width:7%">Canopy</th>
        <th class="center" style="width:9%">Condition</th>
        <th class="center" style="width:8%">Protected</th>
        <th style="width:9%">Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
    </tbody>
  </table>
  <p style="font-size:8pt; color:#999; margin-top:4px;">
    Condition Scale: 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent
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
      <h2>Certification Statement</h2>
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
        <p><strong>Electronically Signed:</strong> <span class="signature-line">${esc(report.eSignatureText || "")}</span></p>
        <p><strong>Name:</strong> ${esc(arborist.name)}</p>
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
        <p style="margin-top: 20px;"><strong>Arborist:</strong> ${esc(arborist.name)}</p>
        <p><strong>ISA Certification #:</strong> ${esc(arborist.isaCertificationNum)}</p>
        ${arborist.companyName ? `<p><strong>Company:</strong> ${esc(arborist.companyName)}</p>` : ""}`
        }
      </div>
    </div>
  </div>

  <div class="page-footer">
    ${esc(arborist.companyName || arborist.name)} &bull; ${esc(property.address)}, ${esc(property.city)} &bull; ${dateStr}
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
        bottom: "0.75in",
        left: "1in",
      },
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
