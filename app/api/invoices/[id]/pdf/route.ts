import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Report type labels for the invoice
// ---------------------------------------------------------------------------

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Assessment",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Tree Appraisal & Valuation",
  construction_encroachment: "Construction Encroachment Assessment",
};

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

function fmtMoney(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function photoToBase64(photoUrl: string): string | null {
  try {
    const relativePath = photoUrl.replace(/^\/api\/uploads\//, "");
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const photoPath = path.resolve(uploadsRoot, relativePath);
    if (!photoPath.startsWith(uploadsRoot)) return null;
    if (!fs.existsSync(photoPath)) return null;
    const photoData = fs.readFileSync(photoPath);
    const ext = path.extname(photoPath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : "image/jpeg";
    return `data:${mimeType};base64,${photoData.toString("base64")}`;
  } catch {
    return null;
  }
}

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// ---------------------------------------------------------------------------
// GET /api/invoices/[id]/pdf — generate invoice PDF
// ---------------------------------------------------------------------------

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
      // Public access via share token
      const invoice = await prisma.invoice.findUnique({
        where: { id: params.id },
        select: {
          showOnSharePage: true,
          property: { select: { shareToken: true } },
        },
      });
      if (
        !invoice ||
        invoice.property.shareToken !== shareToken ||
        !invoice.showOnSharePage
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Fetch full invoice data
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        arborist: true,
        property: true,
        report: {
          select: { reportType: true, certifiedAt: true },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const { arborist, property, report } = invoice;

    // Parse line items
    let lineItems: LineItem[] = [];
    try {
      lineItems = JSON.parse(invoice.lineItems);
    } catch {
      lineItems = [];
    }

    // Company logo
    let logoBase64 = "";
    if (arborist.companyLogoUrl) {
      const b64 = photoToBase64(arborist.companyLogoUrl);
      if (b64) logoBase64 = b64;
    }

    const reportTypeLabel =
      REPORT_TYPE_LABELS[report?.reportType ?? ""] ?? "Arborist Report";
    const certifiedDate = report?.certifiedAt
      ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    const invoiceDate = new Date(invoice.invoiceDate).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
    const dueDate = new Date(invoice.dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // --- Build HTML ---
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Invoice ${esc(invoice.invoiceNumber)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; }
    body {
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #3A3A36;
      font-size: 10.5pt;
      line-height: 1.55;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .container { padding: 0; }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
    }
    .company-info { max-width: 55%; }
    .company-logo {
      max-height: 60px;
      max-width: 180px;
      object-fit: contain;
      margin-bottom: 8px;
    }
    .company-name {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 14pt;
      font-weight: 600;
      color: #1D4E3E;
      margin: 0 0 4px 0;
    }
    .company-detail {
      font-size: 9pt;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .invoice-title {
      text-align: right;
    }
    .invoice-title h1 {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 28pt;
      font-weight: 700;
      color: #1D4E3E;
      margin: 0 0 8px 0;
      letter-spacing: 2px;
    }
    .invoice-meta {
      font-size: 9.5pt;
      color: #555;
      text-align: right;
      line-height: 1.6;
    }
    .invoice-meta .label {
      color: #999;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .invoice-meta .value {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 500;
      color: #333;
    }

    /* Bill To / Regarding */
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .info-block {
      width: 48%;
    }
    .info-block h3 {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1D4E3E;
      margin: 0 0 6px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-block p {
      font-size: 10pt;
      margin: 0;
      line-height: 1.6;
      color: #444;
    }

    /* Line Items Table */
    .line-items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .line-items-table thead th {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1D4E3E;
      padding: 10px 8px;
      border-top: 2px solid #1D4E3E;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    .line-items-table thead th.right {
      text-align: right;
    }
    .line-items-table thead th.center {
      text-align: center;
    }
    .line-items-table tbody td {
      font-size: 10pt;
      padding: 10px 8px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }
    .line-items-table tbody tr:nth-child(even) {
      background: #fafaf8;
    }
    .line-items-table .desc { width: 50%; }
    .line-items-table .qty {
      width: 12%;
      text-align: center;
      font-family: 'IBM Plex Mono', monospace;
    }
    .line-items-table .rate {
      width: 19%;
      text-align: right;
      font-family: 'IBM Plex Mono', monospace;
    }
    .line-items-table .amount {
      width: 19%;
      text-align: right;
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 500;
    }

    /* Totals */
    .totals {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 28px;
    }
    .totals-table {
      width: 260px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      font-size: 10pt;
    }
    .totals-row .label { color: #666; }
    .totals-row .value {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 500;
      text-align: right;
    }
    .totals-divider {
      border-top: 1px solid #ddd;
      margin: 4px 0;
    }
    .totals-total {
      display: flex;
      justify-content: space-between;
      padding: 8px 0 0 0;
      font-size: 13pt;
      font-weight: 700;
      border-top: 2px solid #1D4E3E;
    }
    .totals-total .label { color: #1D4E3E; }
    .totals-total .value {
      font-family: 'IBM Plex Mono', monospace;
      color: #1D4E3E;
    }

    /* Payment Instructions */
    .payment-section {
      margin-bottom: 20px;
    }
    .payment-section h3 {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1D4E3E;
      margin: 0 0 6px 0;
    }
    .payment-section p {
      font-size: 10pt;
      color: #444;
      margin: 0;
      white-space: pre-wrap;
      line-height: 1.6;
      background: #f8f7f5;
      padding: 10px 14px;
      border-radius: 4px;
      border-left: 3px solid #1D4E3E;
    }

    .notes-section {
      margin-bottom: 20px;
    }
    .notes-section h3 {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #999;
      margin: 0 0 6px 0;
    }
    .notes-section p {
      font-size: 9.5pt;
      color: #666;
      margin: 0;
      white-space: pre-wrap;
      line-height: 1.5;
    }

    /* Footer */
    .footer {
      margin-top: 40px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 9pt;
      color: #999;
      line-height: 1.5;
    }
    .footer .company-line {
      color: #666;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        ${logoBase64 ? `<img src="${logoBase64}" alt="" class="company-logo" />` : ""}
        <p class="company-name">${esc(arborist.companyName || arborist.name)}</p>
        ${arborist.companyAddress ? `<p class="company-detail">${esc(arborist.companyAddress)}</p>` : ""}
        ${arborist.companyPhone ? `<p class="company-detail">${esc(arborist.companyPhone)}</p>` : ""}
        ${arborist.companyEmail ? `<p class="company-detail">${esc(arborist.companyEmail)}</p>` : ""}
      </div>
      <div class="invoice-title">
        <h1>INVOICE</h1>
        <div class="invoice-meta">
          <div><span class="label">Invoice #</span><br /><span class="value">${esc(invoice.invoiceNumber)}</span></div>
          <div style="margin-top:6px"><span class="label">Date</span><br /><span class="value">${invoiceDate}</span></div>
          <div style="margin-top:6px"><span class="label">Due</span><br /><span class="value">${dueDate}</span></div>
        </div>
      </div>
    </div>

    <!-- Bill To / Regarding -->
    <div class="info-row">
      <div class="info-block">
        <h3>Bill To</h3>
        ${invoice.billToName ? `<p><strong>${esc(invoice.billToName)}</strong></p>` : ""}
        ${invoice.billToAddress ? `<p>${esc(invoice.billToAddress)}</p>` : ""}
      </div>
      <div class="info-block">
        <h3>Regarding</h3>
        <p><strong>${esc(reportTypeLabel)}</strong></p>
        <p>Property: ${esc(property.address)}, ${esc(property.city)}</p>
        ${certifiedDate ? `<p>Report Date: ${certifiedDate}</p>` : ""}
      </div>
    </div>

    <!-- Line Items -->
    <table class="line-items-table">
      <thead>
        <tr>
          <th class="desc">Description</th>
          <th class="center">Qty</th>
          <th class="right">Rate</th>
          <th class="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${lineItems
          .map(
            (item) => `
        <tr>
          <td class="desc">${esc(item.description)}</td>
          <td class="qty">${item.quantity}</td>
          <td class="rate">$${fmtMoney(item.rate)}</td>
          <td class="amount">$${fmtMoney(item.amount)}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <div class="totals-table">
        <div class="totals-row">
          <span class="label">Subtotal</span>
          <span class="value">$${fmtMoney(invoice.subtotal)}</span>
        </div>
        ${
          invoice.tax > 0
            ? `<div class="totals-row">
                <span class="label">Tax</span>
                <span class="value">$${fmtMoney(invoice.tax)}</span>
              </div>`
            : ""
        }
        <div class="totals-total">
          <span class="label">TOTAL</span>
          <span class="value">$${fmtMoney(invoice.total)}</span>
        </div>
      </div>
    </div>

    <!-- Payment Instructions -->
    ${
      invoice.paymentInstructions
        ? `<div class="payment-section">
            <h3>Payment Instructions</h3>
            <p>${esc(invoice.paymentInstructions)}</p>
          </div>`
        : ""
    }

    <!-- Notes -->
    ${
      invoice.notes
        ? `<div class="notes-section">
            <h3>Notes</h3>
            <p>${esc(invoice.notes)}</p>
          </div>`
        : ""
    }

    <!-- Footer -->
    <div class="footer">
      <p class="company-line">${esc(arborist.companyName || arborist.name)}${arborist.companyPhone ? ` · ${esc(arborist.companyPhone)}` : ""}${arborist.companyEmail ? ` · ${esc(arborist.companyEmail)}` : ""}</p>
      <p>Thank you for your business.</p>
    </div>
  </div>
</body>
</html>`;

    // --- Render with Puppeteer ---
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
        right: "0.75in",
        bottom: "0.75in",
        left: "0.75in",
      },
    });

    await browser.close();
    browser = undefined;

    const filename = `Invoice_${invoice.invoiceNumber}_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore
      }
    }
  }
}
