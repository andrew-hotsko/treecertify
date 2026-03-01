import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const treeRows = trees
      .map(
        (tree) => `
      <tr>
        <td style="text-align:center">${tree.treeNumber}</td>
        <td>${escapeHtml(tree.speciesCommon)}${tree.speciesScientific ? ` (<em>${escapeHtml(tree.speciesScientific)}</em>)` : ""}</td>
        <td style="text-align:center">${tree.dbhInches}"</td>
        <td style="text-align:center">${tree.heightFt ? `${tree.heightFt}'` : "N/A"}</td>
        <td style="text-align:center">${tree.conditionRating}/5</td>
        <td style="text-align:center">${tree.isProtected ? "Yes" : "No"}</td>
        <td>${escapeHtml(tree.recommendedAction || "N/A")}</td>
      </tr>`
      )
      .join("\n");

    // Generate a printable HTML page that can be saved as PDF
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Arborist Report - ${escapeHtml(property.address)}, ${escapeHtml(property.city)}</title>
  <style>
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 60px 1in 1in 1in;
      color: #1a1a1a;
      font-size: 11pt;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      border-bottom: 3px double #2d5016;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 18pt;
      color: #2d5016;
      margin: 0 0 5px 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .header h2 {
      font-size: 14pt;
      color: #333;
      margin: 0 0 10px 0;
      font-weight: normal;
    }
    .header .subtitle {
      font-size: 10pt;
      color: #666;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 10pt;
    }
    .meta-table td {
      padding: 4px 12px;
      border: 1px solid #ddd;
    }
    .meta-table .label {
      background: #f5f5f0;
      font-weight: bold;
      width: 30%;
      color: #333;
    }
    .tree-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 9pt;
    }
    .tree-table th {
      background: #2d5016;
      color: white;
      padding: 6px 8px;
      text-align: left;
      font-weight: bold;
    }
    .tree-table td {
      padding: 5px 8px;
      border: 1px solid #ddd;
    }
    .tree-table tr:nth-child(even) {
      background: #f9f9f6;
    }
    .tree-table-header {
      color: #2d5016;
      font-size: 13pt;
      margin: 30px 0 10px 0;
    }
    .content {
      white-space: pre-wrap;
      font-family: 'Georgia', serif;
    }
    .content h1, .content h2, .content h3 {
      color: #2d5016;
      margin-top: 24px;
    }
    .certification-box {
      border: 2px solid #2d5016;
      padding: 20px;
      margin-top: 40px;
      background: #f8faf5;
    }
    .certification-box h3 {
      color: #2d5016;
      margin: 0 0 10px 0;
    }
    .signature-line {
      border-bottom: 1px solid #333;
      display: inline-block;
      min-width: 300px;
      margin-top: 20px;
    }
    .no-print {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 12px 15px;
      background: #2d5016;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      font-size: 14px;
    }
    .no-print button, .no-print a {
      background: white;
      color: #2d5016;
      border: none;
      padding: 8px 24px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      font-weight: bold;
      text-decoration: none;
    }
    .no-print button:hover, .no-print a:hover {
      background: #e8e8e8;
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()">Print / Save as PDF</button>
    <a href="/properties/${property.id}/report">&larr; Back to Report</a>
  </div>

  ${arborist.companyLogoUrl ? `
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #ddd;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <img src="${arborist.companyLogoUrl}" alt="Company Logo" style="height: 50px; width: auto;" />
      <div>
        ${arborist.companyName ? `<div style="font-weight: bold; font-size: 12pt;">${escapeHtml(arborist.companyName)}</div>` : ""}
        ${arborist.companyAddress ? `<div style="font-size: 9pt; color: #666;">${escapeHtml(arborist.companyAddress)}</div>` : ""}
      </div>
    </div>
    <div style="text-align: right; font-size: 9pt; color: #666;">
      ${arborist.companyPhone ? `<div>${escapeHtml(arborist.companyPhone)}</div>` : ""}
      ${arborist.companyEmail ? `<div>${escapeHtml(arborist.companyEmail)}</div>` : ""}
      ${arborist.companyWebsite ? `<div>${escapeHtml(arborist.companyWebsite)}</div>` : ""}
    </div>
  </div>` : ""}

  <div class="header">
    <h1>Arborist Report</h1>
    <h2>${escapeHtml(property.address)}</h2>
    <div class="subtitle">${escapeHtml(property.city)}, ${escapeHtml(property.state || "CA")}${property.county ? `, ${escapeHtml(property.county)} County` : ""}</div>
  </div>

  <table class="meta-table">
    <tr>
      <td class="label">Report Type</td>
      <td>${report.reportType.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}</td>
      <td class="label">Date</td>
      <td>${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
    </tr>
    <tr>
      <td class="label">Arborist</td>
      <td>${escapeHtml(arborist.name)}</td>
      <td class="label">ISA #</td>
      <td>${escapeHtml(arborist.isaCertificationNum)}</td>
    </tr>
    <tr>
      <td class="label">Property</td>
      <td>${escapeHtml(property.address)}</td>
      <td class="label">APN</td>
      <td>${escapeHtml(property.parcelNumber || "N/A")}</td>
    </tr>
    <tr>
      <td class="label">City</td>
      <td>${escapeHtml(property.city)}, ${escapeHtml(property.state || "CA")} ${escapeHtml(property.zip || "")}</td>
      <td class="label">Trees Assessed</td>
      <td>${trees.length}</td>
    </tr>
  </table>

  <h2 class="tree-table-header">Tree Inventory</h2>
  <table class="tree-table">
    <thead>
      <tr>
        <th style="text-align:center">Tree #</th>
        <th>Species</th>
        <th style="text-align:center">DBH</th>
        <th style="text-align:center">Height</th>
        <th style="text-align:center">Condition</th>
        <th style="text-align:center">Protected</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
    </tbody>
  </table>

  <div class="content">${escapeHtml(content)}</div>

  ${trees.some((t: { treePhotos?: { id: string; caption: string | null; url: string }[] }) => (t.treePhotos?.length ?? 0) > 0) ? `
  <h2 class="tree-table-header" style="page-break-before: always;">Photo Documentation</h2>
  ${trees.filter((t: { treePhotos?: { id: string; caption: string | null; url: string }[] }) => (t.treePhotos?.length ?? 0) > 0).map((tree: { treeNumber: number; speciesCommon: string; treePhotos?: { id: string; caption: string | null; url: string }[] }) => `
  <div style="page-break-inside: avoid; margin-bottom: 20px;">
    <h3 style="color: #2d5016; font-size: 11pt; margin-bottom: 8px;">Tree #${tree.treeNumber} — ${escapeHtml(tree.speciesCommon)}</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
      ${(tree.treePhotos || []).map((photo: { caption: string | null; url: string }, i: number) => `
        <div style="text-align: center;">
          <img src="${photo.url}" style="max-width: 200px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px;" />
          <p style="font-size: 9pt; color: #666; margin-top: 4px;">Photo ${i + 1}${photo.caption ? `: ${escapeHtml(photo.caption)}` : ""}</p>
        </div>
      `).join("")}
    </div>
  </div>`).join("")}` : ""}

  ${
    report.status === "certified"
      ? `
  <div class="certification-box">
    <h3>Arborist Certification</h3>
    <p>I, the undersigned, certify that I have personally inspected the tree(s) described in this report and that the information contained herein is accurate to the best of my professional knowledge and belief.</p>
    <p><strong>Electronically signed:</strong> ${escapeHtml(report.eSignatureText || "")}</p>
    <p><strong>ISA Certification #:</strong> ${escapeHtml(arborist.isaCertificationNum)}</p>
    <p><strong>Date:</strong> ${report.certifiedAt ? new Date(report.certifiedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}</p>
  </div>`
      : ""
  }
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
