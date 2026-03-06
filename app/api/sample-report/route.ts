import { NextResponse } from "next/server";
import { requireArborist } from "@/lib/auth";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { SAMPLE_REPORT } from "@/lib/sample-report-data";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function logoToBase64(logoUrl: string): string | null {
  try {
    const relativePath = logoUrl.replace(/^\/api\/uploads\//, "");
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const filePath = path.resolve(uploadsRoot, relativePath);
    if (!filePath.startsWith(uploadsRoot)) return null;
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".svg"
            ? "image/svg+xml"
            : "image/jpeg";
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * GET /api/sample-report
 *
 * Returns a cached sample PDF if one exists for this arborist.
 * Returns 404 if not yet generated.
 */
export async function GET() {
  try {
    const arborist = await requireArborist();
    const cacheDir = path.join(process.cwd(), "uploads", "sample-reports");
    const cachePath = path.join(cacheDir, `sample-report-${arborist.id}.pdf`);

    if (fs.existsSync(cachePath)) {
      const pdfData = fs.readFileSync(cachePath);
      return new NextResponse(pdfData, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="TreeCertify_Sample_Report.pdf"`,
        },
      });
    }

    return NextResponse.json({ error: "No sample report generated yet" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

/**
 * POST /api/sample-report
 *
 * Generates a sample PDF using the arborist's branding and credentials,
 * caches it on disk, and returns it.
 */
export async function POST() {
  let browser;
  try {
    const arborist = await requireArborist();

    // Check cache first
    const cacheDir = path.join(process.cwd(), "uploads", "sample-reports");
    const cachePath = path.join(cacheDir, `sample-report-${arborist.id}.pdf`);

    if (fs.existsSync(cachePath)) {
      const pdfData = fs.readFileSync(cachePath);
      return new NextResponse(pdfData, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="TreeCertify_Sample_Report.pdf"`,
        },
      });
    }

    // Generate the sample PDF
    const { property, trees, reportContent } = SAMPLE_REPORT;
    const reportTitle = "Tree Removal Permit Assessment";
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Logo
    let logoBase64 = "";
    if (arborist.companyLogoUrl) {
      const b64 = logoToBase64(arborist.companyLogoUrl);
      if (b64) logoBase64 = b64;
    }

    // Body HTML from markdown
    const bodyHtml = renderMarkdownToHtml(reportContent);

    // Condition/action mappings
    const conditionLabels: Record<number, string> = {
      0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
    };
    const conditionColors: Record<number, string> = {
      0: "#6B6B63", 1: "#dc2626", 2: "#ea580c", 3: "#d97706", 4: "#65a30d", 5: "#16a34a",
    };
    const actionColors: Record<string, string> = {
      retain: "#16a34a", remove: "#dc2626", prune: "#d97706", monitor: "#2563eb",
    };

    // Tree inventory rows
    const actionCounts: Record<string, number> = {};
    trees.forEach((t) => {
      const a = t.recommendedAction;
      actionCounts[a] = (actionCounts[a] || 0) + 1;
    });
    const summaryParts = Object.entries(actionCounts)
      .map(([action, count]) =>
        `${count} ${action.replace(/\b\w/g, (c: string) => c.toUpperCase())}`
      )
      .join(", ");
    const protectedCount = trees.filter((t) => t.isProtected).length;

    const treeRows = trees
      .map((tree, idx) => {
        const condLabel = conditionLabels[tree.conditionRating] ?? `${tree.conditionRating}`;
        const condColor = conditionColors[tree.conditionRating] ?? "#6B6B63";
        const actionLabel = tree.recommendedAction.replace(/\b\w/g, (c: string) => c.toUpperCase());
        const actionColor = actionColors[tree.recommendedAction] || "#3A3A36";
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
        <td class="center">\u2014</td>
        <td>${esc(tree.speciesCommon)} <em>(${esc(tree.speciesScientific)})</em></td>
        <td class="num-cell">${tree.dbhInches}"</td>
        <td class="num-cell">${tree.heightFt}'</td>
        <td class="num-cell">${tree.canopySpreadFt}'</td>
        <td class="center"><span style="color:${condColor}; font-weight:600;">${condLabel}</span> <span style="color:#999; font-size:7pt;">(${tree.conditionRating}/5)</span></td>
        <td class="center">${protCell}</td>
        <td><span style="color:${actionColor}; font-weight:600;">${actionLabel}</span></td>
      </tr>`;
      })
      .join("\n");

    const summaryRow = `
    <tr class="summary-row">
      <td colspan="3"><strong>TOTAL: ${trees.length} Trees</strong></td>
      <td colspan="6"><strong>Actions:</strong> ${summaryParts} &nbsp;|&nbsp; <strong>${protectedCount} Protected</strong></td>
    </tr>`;

    // Cover page data
    const preparedForLines = [
      esc(property.homeownerName),
      esc(property.address),
      `${esc(property.city)}, ${esc(property.state)} ${esc(property.zip)}`,
      "",
      `City of ${esc(property.city)}`,
      "Planning & Development Services",
    ];

    // TOC
    const tocSections = [
      { title: "Scope of Assignment", desc: "" },
      { title: "Site Observations", desc: "" },
      { title: "Tree Assessments", desc: `${trees.length} trees` },
      { title: "Limitations", desc: "" },
      { title: "Arborist Certification & Signature", desc: "" },
    ];
    const tocRows = tocSections
      .map((s, i) => `
      <tr>
        <td class="toc-num">${i + 1}.</td>
        <td class="toc-title">${esc(s.title)}<span class="toc-dots"></span></td>
        <td class="toc-desc">${esc(s.desc)}</td>
      </tr>`)
      .join("\n");

    // Additional certs
    let additionalCertsArr: string[] = [];
    try {
      additionalCertsArr = JSON.parse(arborist.additionalCerts || "[]");
    } catch { /* skip */ }

    // Signature block
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
        <div class="sig-line-group">
          <div class="sig-esignature">${esc(arborist.signatureName || arborist.name)}</div>
          <div class="sig-rule"></div>
          <div class="sig-label">Signature</div>
        </div>
        <div class="sig-details">
          <div class="sig-detail-row"><span class="sig-detail-label">Name:</span> ${esc(arborist.name)}</div>
          <div class="sig-detail-row"><span class="sig-detail-label">ISA Certified Arborist:</span> #${esc(arborist.isaCertificationNum)}</div>
          ${arborist.traqCertified ? `<div class="sig-detail-row"><span class="sig-detail-label">Qualification:</span> ISA Tree Risk Assessment Qualified</div>` : ""}
          ${additionalCertsArr.length > 0 ? `<div class="sig-detail-row"><span class="sig-detail-label">Additional Certifications:</span> ${esc(additionalCertsArr.join(", "))}</div>` : ""}
          ${arborist.licenseNumbers ? `<div class="sig-detail-row"><span class="sig-detail-label">License(s):</span> ${esc(arborist.licenseNumbers)}</div>` : ""}
          ${arborist.companyName ? `<div class="sig-detail-row"><span class="sig-detail-label">Company:</span> ${esc(arborist.companyName)}</div>` : ""}
          <div class="sig-detail-row"><span class="sig-detail-label">Date:</span> ${dateStr}</div>
        </div>
      </div>
    </div>`;

    const headerCompany = esc(arborist.companyName || arborist.name);

    // Build the full HTML — same CSS and structure as production PDF route
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sample Report — ${esc(property.address)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&family=Dancing+Script:wght@700&display=swap');
    * { box-sizing: border-box; }
    body {
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #3A3A36; font-size: 10.5pt; line-height: 1.55;
      margin: 0; padding: 0; position: relative;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .page-break { page-break-before: always; }
    @page :first { margin-top: 0.5in; margin-bottom: 0.5in; }

    /* Cover page */
    .cover-page { display: flex; flex-direction: column; min-height: 9.5in; position: relative; padding: 0; }
    .cover-company-block { text-align: center; padding: 40px 0 24px 0; border-bottom: 2.5px solid #1D4E3E; margin-bottom: 0; }
    .cover-logo-img { max-width: 180px; max-height: 80px; width: auto; height: auto; margin-bottom: 12px; }
    .cover-company-name { font-family: 'Instrument Sans', sans-serif; font-size: 18pt; font-weight: 700; color: #1D4E3E; letter-spacing: 1px; margin: 0; }
    .cover-company-detail { font-size: 9.5pt; color: #666; margin: 2px 0; line-height: 1.4; }
    .cover-title-area { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 36px 40px; }
    .cover-rule { width: 240px; border: none; border-top: 3px double #1D4E3E; margin: 0 auto 28px auto; }
    .cover-report-title { font-family: 'Instrument Sans', sans-serif; font-size: 26pt; font-weight: 700; color: #3A3A36; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px 0; line-height: 1.2; }
    .cover-property-address { font-size: 15pt; color: #333; margin: 0 0 4px 0; font-weight: 400; }
    .cover-property-city { font-size: 11pt; color: #666; margin: 0 0 20px 0; }
    .cover-status-badge { font-size: 8.5pt; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block; padding: 5px 24px; border-radius: 20px; margin-bottom: 4px; }
    .badge-certified { background: #1D4E3E; color: #fff; }
    .cover-rule-bottom { width: 240px; border: none; border-top: 3px double #1D4E3E; margin: 24px auto 0 auto; }
    .cover-prepared-block { display: flex; justify-content: space-between; padding: 24px 0; }
    .cover-prepared-col { flex: 1; }
    .cover-prepared-label { font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 4px; }
    .cover-prepared-value { font-size: 10pt; color: #3A3A36; line-height: 1.5; }
    .cover-prepared-value .name { font-weight: 600; }
    .cover-footer { text-align: center; padding: 24px 0; border-top: 1px solid #e5e4df; }
    .cover-credentials-line { font-size: 9pt; color: #666; }
    .cover-confidential { font-size: 7.5pt; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 12px; }
    .cover-draft-badge { display: inline-block; background: #e5e4df; color: #6B6B63; font-size: 9pt; font-weight: 600; letter-spacing: 2px; padding: 4px 20px; border-radius: 14px; }

    /* Sample badge */
    .sample-badge { display: inline-block; background: #dbeafe; color: #1e40af; font-size: 8pt; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 16px; border-radius: 14px; margin-bottom: 8px; }

    /* TOC */
    .toc-page { padding: 40px 0; }
    .toc-title { font-family: 'Instrument Sans', sans-serif; font-size: 20pt; font-weight: 700; color: #1D4E3E; margin-bottom: 32px; text-align: center; letter-spacing: 1px; }
    .toc-table { width: 100%; border-collapse: collapse; margin: 0 auto; max-width: 480px; }
    .toc-table td { padding: 10px 4px; border-bottom: 1px solid #e5e4df; font-size: 10pt; }
    .toc-num { width: 24px; color: #1D4E3E; font-weight: 600; text-align: right; padding-right: 8px; }
    .toc-title { font-weight: 500; color: #3A3A36; position: relative; }
    .toc-desc { text-align: right; color: #999; font-size: 8.5pt; white-space: nowrap; }
    .toc-note { text-align: center; font-size: 8.5pt; color: #999; margin-top: 24px; }

    /* Section titles */
    .section-title { font-family: 'Instrument Sans', sans-serif; font-size: 14pt; font-weight: 700; color: #1D4E3E; border-bottom: 2px solid #1D4E3E; padding-bottom: 6px; margin: 28px 0 16px 0; }

    /* Inventory table */
    .inventory-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 12px; }
    .inventory-table th { background: #1D4E3E; color: #fff; padding: 6px 5px; text-align: left; font-weight: 600; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px; }
    .inventory-table td { padding: 5px 5px; border-bottom: 1px solid #e5e4df; vertical-align: top; }
    .inventory-table tr.alt td { background-color: #FEFDFB; }
    .inventory-table .num-cell { text-align: right; font-family: 'IBM Plex Mono', monospace; }
    .inventory-table .center { text-align: center; }
    .inventory-table .summary-row td { background-color: #f0f0ec; font-size: 8pt; padding: 6px 5px; border-top: 1.5px solid #1D4E3E; }
    .inventory-legend { font-size: 7pt; color: #999; text-align: center; margin-top: 4px; }

    /* Report body */
    .report-body h1 { font-family: 'Instrument Sans', sans-serif; font-size: 16pt; color: #1D4E3E; font-weight: 700; border-bottom: 2px solid #1D4E3E; padding-bottom: 6px; margin: 30px 0 14px 0; }
    .report-body h2 { font-family: 'Instrument Sans', sans-serif; font-size: 14pt; color: #1D4E3E; font-weight: 700; border-bottom: 2px solid #1D4E3E; padding-bottom: 6px; margin: 28px 0 14px 0; }
    .report-body h3 { font-family: 'Instrument Sans', sans-serif; font-size: 11.5pt; color: #3A3A36; font-weight: 600; margin: 20px 0 8px 0; }
    .report-body p { margin: 0 0 10px 0; text-align: justify; }
    .report-body ul, .report-body ol { margin: 6px 0 10px 0; padding-left: 24px; }
    .report-body li { margin-bottom: 3px; }
    .report-body strong { color: #1D4E3E; }

    /* Limitations box */
    .limitations-box { background: #f5f4f0; border-radius: 8px; padding: 14px 18px; margin: 8px 0; }

    /* Signature block */
    .signature-block { page-break-before: always; padding-top: 20px; }
    .cert-statement { background: #FEFDFB; border: 1px solid #e5e4df; border-radius: 8px; padding: 16px 20px; font-size: 9.5pt; line-height: 1.6; margin-bottom: 32px; }
    .cert-statement p { margin: 0 0 8px 0; }
    .sig-area { display: flex; gap: 40px; align-items: flex-start; }
    .sig-line-group { flex: 1; text-align: center; }
    .sig-esignature { font-family: 'Dancing Script', cursive; font-size: 28pt; font-weight: 700; color: #1D4E3E; margin-bottom: 4px; }
    .sig-rule { border-bottom: 1.5px solid #3A3A36; margin-bottom: 4px; }
    .sig-label { font-size: 7pt; text-transform: uppercase; letter-spacing: 1px; color: #999; }
    .sig-details { flex: 1; font-size: 9pt; }
    .sig-detail-row { margin-bottom: 3px; }
    .sig-detail-label { font-weight: 600; color: #666; display: inline-block; min-width: 100px; }
    .avoid-break { page-break-inside: avoid; }
  </style>
</head>
<body>
  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-company-block">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Company Logo" class="cover-logo-img" /><br/>` : ""}
      <div class="cover-company-name">${esc(arborist.companyName || arborist.name)}</div>
      ${arborist.companyAddress ? `<div class="cover-company-detail">${esc(arborist.companyAddress)}</div>` : ""}
      <div class="cover-company-detail">
        ${[arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).map((v) => esc(v!)).join(" &nbsp;&bull;&nbsp; ")}
      </div>
    </div>
    <div class="cover-title-area">
      <hr class="cover-rule" />
      <div class="cover-report-title">${esc(reportTitle)}</div>
      <div class="cover-property-address">${esc(property.address)}</div>
      <div class="cover-property-city">${esc(property.city)}, ${esc(property.state)}</div>
      <div class="sample-badge">Sample Report</div>
      <div class="cover-status-badge badge-certified">\u2713 Certified</div>
      <hr class="cover-rule-bottom" />
    </div>
    <div class="cover-prepared-block">
      <div class="cover-prepared-col">
        <div class="cover-prepared-label">Prepared For</div>
        <div class="cover-prepared-value">
          ${preparedForLines.map((line) => (line === "" ? "<br/>" : `<div${line === esc(property.homeownerName) ? ' class="name"' : ""}>${line}</div>`)).join("\n")}
        </div>
      </div>
      <div class="cover-prepared-col" style="text-align:right;">
        <div class="cover-prepared-label">Report Date</div>
        <div class="cover-prepared-value" style="font-weight:600;margin-bottom:12px;">${dateStr}</div>
      </div>
    </div>
    <div class="cover-footer">
      <div class="cover-credentials-line">${esc(arborist.name)} &nbsp;&bull;&nbsp; ISA Certified Arborist #${esc(arborist.isaCertificationNum)}</div>
      ${arborist.traqCertified ? '<div class="cover-credentials-line">ISA Tree Risk Assessment Qualified</div>' : ""}
      <div class="cover-confidential">Sample Report &mdash; Generated by TreeCertify</div>
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="page-break"></div>
  <div class="toc-page">
    <div class="toc-title">Table of Contents</div>
    <table class="toc-table">
      ${tocRows}
    </table>
    <p class="toc-note">
      This sample report contains ${trees.length} trees assessed across ${tocSections.length} sections.
    </p>
  </div>

  <!-- TREE INVENTORY TABLE -->
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

  <!-- REPORT BODY -->
  <div class="page-break"></div>
  <div class="report-body">
    ${bodyHtml}
  </div>

  <!-- SIGNATURE BLOCK -->
  ${signatureBlock}

</body>
</html>`;

    // Post-process: wrap Limitations section
    let processedHtml = html;
    const limRegex =
      /(<h[12][^>]*>(?:[^<]*Limitations?\s+and\s+Assumptions?[^<]*)<\/h[12]>)([\s\S]*?)(?=<h[12][ >]|<div class="page-break"|<div class="signature-block"|$)/i;
    const limMatch = processedHtml.match(limRegex);
    if (limMatch) {
      const fullMatch = limMatch[0];
      const heading = limMatch[1];
      const sectionContent = limMatch[2];
      processedHtml = processedHtml.replace(
        fullMatch,
        `${heading}<div class="limitations-box">${sectionContent}</div>`
      );
    }

    // Render PDF with Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(processedHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "1in", right: "0.85in", bottom: "0.85in", left: "0.85in" },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; padding:0 0.85in; margin:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:4px; border-bottom:0.5px solid #ccc;">
            <span style="font-weight:600;">${headerCompany}</span>
            <span style="font-style:italic;">Sample Report</span>
          </div>
        </div>
      `,
      footerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; text-align:center; padding:0 0.85in;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();
    browser = undefined;

    // Cache the PDF
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(cachePath, Buffer.from(pdfBuffer));

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="TreeCertify_Sample_Report.pdf"`,
      },
    });
  } catch (error) {
    console.error("Sample report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate sample report" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
