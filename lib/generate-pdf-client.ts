/**
 * Client-side PDF generator using jsPDF + jspdf-autotable.
 *
 * This is a fallback for when the server-side Puppeteer PDF route fails
 * (e.g. Vercel cold-start timeout, memory limit, Chromium unavailable).
 * It produces a professional arborist report PDF entirely in the browser.
 *
 * Usage:
 *   import { generateClientPdf } from "@/lib/generate-pdf-client";
 *   const blob = await generateClientPdf(data);
 *   // trigger download or upload
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Public Interface ──────────────────────────────────────────────────────

export interface ClientPdfData {
  reportType: string;
  reportTypeLabel: string;
  narrativeContent: string;
  propertyAddress: string;
  propertyCity: string;
  clientName?: string;
  trees: Array<{
    treeNumber: number;
    speciesCommon: string | null;
    speciesScientific?: string | null;
    dbh: string | null;
    height?: string | null;
    canopySpread?: string | null;
    conditionRating: number | null;
    action?: string | null;
    isProtected?: boolean | null;
    isHeritage?: boolean | null;
  }>;
  arboristName: string;
  companyName?: string | null;
  isaCredentialNumber?: string | null;
  isaQualification?: string | null;
  licenseNumber?: string | null;
  certifiedAt?: string | null;
  createdAt: string;
}

// ─── Brand Colors (RGB tuples) ─────────────────────────────────────────────

const FOREST: [number, number, number] = [29, 78, 62]; // #1D4E3E
const DARK: [number, number, number] = [34, 34, 32]; // #222220
const CREAM: [number, number, number] = [250, 249, 246]; // #FAF9F6
const GOLD: [number, number, number] = [196, 160, 82]; // #C4A052
const MUTED: [number, number, number] = [156, 156, 147]; // #9C9C93
const WHITE: [number, number, number] = [255, 255, 255];
const RULE: [number, number, number] = [220, 220, 215]; // light border/rule

// ─── Condition & Action Formatting ──────────────────────────────────────────

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

function conditionLabel(rating: number | null): string {
  if (rating === null || rating === undefined) return "-";
  return CONDITION_LABELS[rating] ?? String(rating);
}

function actionLabel(action: string | null | undefined): string {
  if (!action) return "-";
  const map: Record<string, string> = {
    retain: "Retain",
    remove: "Remove",
    prune: "Prune",
    monitor: "Monitor",
  };
  return map[action.toLowerCase()] ?? action.charAt(0).toUpperCase() + action.slice(1);
}

// ─── Markdown Helpers ───────────────────────────────────────────────────────

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold
    .replace(/\*(.*?)\*/g, "$1") // italic
    .replace(/`(.*?)`/g, "$1") // inline code
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // links
    .replace(/^[-*+]\s+/gm, "  \u2022 ") // unordered list items
    .replace(/^\d+\.\s+/gm, (m) => `  ${m}`) // numbered list items
    .replace(/^>\s+/gm, "  ") // blockquotes
    .replace(/---+/g, "") // horizontal rules
    .replace(/\n{3,}/g, "\n\n") // collapse excess newlines
    .trim();
}

interface ParsedSection {
  heading: string;
  level: number; // 1, 2, or 3
  content: string;
}

function parseMarkdownSections(md: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const lines = md.split("\n");
  let currentHeading = "";
  let currentLevel = 1;
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      if (currentHeading || currentContent.length > 0) {
        sections.push({
          heading: currentHeading,
          level: currentLevel,
          content: currentContent.join("\n").trim(),
        });
      }
      currentLevel = headingMatch[1].length;
      currentHeading = headingMatch[2].trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentHeading || currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      level: currentLevel,
      content: currentContent.join("\n").trim(),
    });
  }

  return sections;
}

// ─── Text Drawing Helpers ───────────────────────────────────────────────────

/**
 * Draws wrapped text, inserting page breaks as needed.
 * Returns the Y position after the last line.
 */
function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  pageTopY: number = 25
): number {
  const lines: string[] = doc.splitTextToSize(text, maxWidth);
  for (const line of lines) {
    if (y > 268) {
      doc.addPage();
      y = pageTopY;
    }
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Main Generator ─────────────────────────────────────────────────────────

export async function generateClientPdf(data: ClientPdfData): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // ─── Page 1: Cover Page ──────────────────────────────────────────────────

  // Forest green header bar
  doc.setFillColor(...FOREST);
  doc.rect(0, 0, pageWidth, 85, "F");

  // Company name or fallback
  const displayCompany = data.companyName || "Certified Arborist Report";
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(displayCompany.toUpperCase(), margin, 25);

  // Report type title
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  const titleLines: string[] = doc.splitTextToSize(data.reportTypeLabel, contentWidth);
  let titleY = 42;
  for (const line of titleLines) {
    doc.text(line, margin, titleY);
    titleY += 11;
  }

  // Gold accent line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.line(margin, titleY + 2, margin + 60, titleY + 2);

  // Property address (still in the green bar)
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(data.propertyAddress, margin, titleY + 12);
  doc.setFontSize(10);
  doc.text(data.propertyCity, margin, titleY + 18);

  // ── Info block below green bar ──

  let infoY = 100;
  doc.setTextColor(...DARK);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const infoItems: [string, string][] = [
    ["Report Date", formatDate(data.createdAt)],
    ["Report Type", data.reportTypeLabel],
    ["Property", data.propertyAddress],
  ];
  if (data.clientName) infoItems.push(["Client", data.clientName]);
  infoItems.push(["Trees Assessed", String(data.trees.length)]);

  for (const [label, value] of infoItems) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), margin, infoY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...DARK);
    doc.text(String(value), margin + 40, infoY);
    infoY += 6;
  }

  // ── Arborist credentials block ──

  infoY += 8;
  doc.setDrawColor(...FOREST);
  doc.setLineWidth(0.3);
  doc.line(margin, infoY, margin + contentWidth, infoY);
  infoY += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...FOREST);
  doc.text("PREPARED BY", margin, infoY);
  infoY += 7;

  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.text(data.arboristName, margin, infoY);
  infoY += 5;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MUTED);

  const credentials: string[] = [];
  if (data.isaQualification) credentials.push(data.isaQualification);
  if (data.isaCredentialNumber) credentials.push(`ISA# ${data.isaCredentialNumber}`);
  if (data.licenseNumber) credentials.push(`License# ${data.licenseNumber}`);
  if (credentials.length > 0) {
    doc.text(credentials.join("  |  "), margin, infoY);
    infoY += 5;
  }
  if (data.companyName) {
    doc.text(data.companyName, margin, infoY);
    infoY += 5;
  }

  // ── Certification stamp ──

  if (data.certifiedAt) {
    infoY += 10;

    // Stamp border
    doc.setDrawColor(...FOREST);
    doc.setLineWidth(1.5);
    doc.roundedRect(margin, infoY, 80, 28, 3, 3, "S");

    doc.setTextColor(...FOREST);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFIED ARBORIST REPORT", margin + 5, infoY + 7);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Certified: ${formatDate(data.certifiedAt)}`,
      margin + 5,
      infoY + 13
    );
    doc.text(`By: ${data.arboristName}`, margin + 5, infoY + 18);
    if (data.isaCredentialNumber) {
      doc.text(`ISA# ${data.isaCredentialNumber}`, margin + 5, infoY + 23);
    }
  }

  // Cover page footer
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(
    "Generated by TreeCertify \u2014 AI-Powered Arborist Report Platform",
    margin,
    pageHeight - 15
  );
  doc.text("Page 1", pageWidth - margin, pageHeight - 15, { align: "right" });

  // ─── Page 2: Tree Inventory Table ────────────────────────────────────────

  doc.addPage();
  let y = 25;

  // Section header bar
  doc.setFillColor(...FOREST);
  doc.rect(margin, y - 5, contentWidth, 8, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TREE INVENTORY SUMMARY", margin + 3, y);
  y += 10;

  // Build table rows
  const tableHead = [["#", "Common Name", "Scientific Name", "DBH", "Ht", "Spread", "Condition", "Action", "Status"]];
  const tableBody = data.trees.map((t) => {
    const statusParts: string[] = [];
    if (t.isProtected) statusParts.push("Protected");
    if (t.isHeritage) statusParts.push("Heritage");

    return [
      `#${t.treeNumber}`,
      t.speciesCommon || "Unknown",
      t.speciesScientific || "",
      t.dbh ? `${t.dbh}"` : "-",
      t.height ? `${t.height}'` : "-",
      t.canopySpread ? `${t.canopySpread}'` : "-",
      conditionLabel(t.conditionRating),
      actionLabel(t.action),
      statusParts.length > 0 ? statusParts.join(", ") : "-",
    ];
  });

  autoTable(doc, {
    startY: y,
    head: tableHead,
    body: tableBody,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      textColor: [...DARK],
      lineColor: [...RULE],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [...FOREST],
      textColor: [...WHITE],
      fontStyle: "bold",
      fontSize: 7.5,
    },
    alternateRowStyles: {
      fillColor: [...CREAM],
    },
    columnStyles: {
      0: { cellWidth: 10 }, // #
      1: { cellWidth: 28 }, // Common Name
      2: { cellWidth: 28, fontStyle: "italic" }, // Scientific
      3: { cellWidth: 13, halign: "center" as const }, // DBH
      4: { cellWidth: 11, halign: "center" as const }, // Ht
      5: { cellWidth: 14, halign: "center" as const }, // Spread
      6: { cellWidth: 18 }, // Condition
      7: { cellWidth: 16 }, // Action
      8: { cellWidth: 22 }, // Status
    },
  });

  // Summary row below table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY: number = (doc as any).lastAutoTable?.finalY ?? y + 20;
  y = finalY + 6;

  if (y < 260) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);

    const protectedCount = data.trees.filter((t) => t.isProtected).length;
    const heritageCount = data.trees.filter((t) => t.isHeritage).length;
    const removeCount = data.trees.filter(
      (t) => t.action?.toLowerCase() === "remove"
    ).length;
    const retainCount = data.trees.filter(
      (t) => t.action?.toLowerCase() === "retain"
    ).length;

    const summaryParts: string[] = [
      `${data.trees.length} tree${data.trees.length !== 1 ? "s" : ""} assessed`,
    ];
    if (retainCount > 0) summaryParts.push(`${retainCount} retain`);
    if (removeCount > 0) summaryParts.push(`${removeCount} remove`);
    if (protectedCount > 0) summaryParts.push(`${protectedCount} protected`);
    if (heritageCount > 0) summaryParts.push(`${heritageCount} heritage`);

    doc.text(summaryParts.join("  \u00B7  "), margin, y);
  }

  // ─── Report Narrative Pages ──────────────────────────────────────────────

  doc.addPage();
  y = 25;

  const sections = parseMarkdownSections(data.narrativeContent || "");

  for (const section of sections) {
    // Skip sections that the PDF template handles separately
    const headingLower = section.heading.toLowerCase();
    if (
      headingLower.includes("tree inventory") ||
      headingLower.includes("arborist certification")
    ) {
      continue;
    }

    // Check for page break before heading
    if (y > 250) {
      doc.addPage();
      y = 25;
    }

    // Section heading
    if (section.heading) {
      if (section.level === 1 || section.level === 2) {
        // Major section: forest green bar
        doc.setFillColor(...FOREST);
        doc.rect(margin, y - 4, contentWidth, 7, "F");
        doc.setTextColor(...WHITE);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(section.heading.toUpperCase(), margin + 3, y);
        y += 10;
      } else {
        // Subsection (H3): forest green text with underline
        doc.setTextColor(...FOREST);
        doc.setFontSize(9.5);
        doc.setFont("helvetica", "bold");
        doc.text(section.heading, margin, y);
        y += 1.5;
        doc.setDrawColor(...RULE);
        doc.setLineWidth(0.2);
        doc.line(margin, y, margin + contentWidth, y);
        y += 5;
      }
    }

    // Section content
    if (section.content) {
      doc.setTextColor(...DARK);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      const cleanText = stripMarkdown(section.content);
      const paragraphs = cleanText.split("\n\n").filter((p) => p.trim());

      for (const para of paragraphs) {
        if (y > 260) {
          doc.addPage();
          y = 25;
        }
        y = addWrappedText(doc, para.trim(), margin, y, contentWidth, 4.2);
        y += 3;
      }
      y += 2;
    }
  }

  // ─── Certification Statement (Final Page) ────────────────────────────────

  doc.addPage();
  y = 30;

  // Header bar
  doc.setFillColor(...FOREST);
  doc.rect(0, 0, pageWidth, 20, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATION STATEMENT", margin, 13);

  y = 35;
  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const certParagraph1 = `I, ${data.arboristName}, certify that the information and opinions expressed in this report are based on my professional knowledge and field observations conducted at the subject property. This assessment was performed in accordance with the standards and best management practices established by the International Society of Arboriculture (ISA) and the American National Standards Institute (ANSI A300 series).`;

  y = addWrappedText(doc, certParagraph1, margin, y, contentWidth, 5);
  y += 5;

  const certParagraph2 = `The trees referenced in this report were assessed using visual inspection methods consistent with ISA Tree Risk Assessment Qualification (TRAQ) methodology. Unless otherwise noted, no invasive testing (resistance drilling, root excavation, aerial inspection) was performed. This report represents the conditions observed at the time of inspection and does not guarantee future tree performance or safety.`;

  y = addWrappedText(doc, certParagraph2, margin, y, contentWidth, 5);
  y += 5;

  const certParagraph3 = `The scope of this assessment is limited to the trees identified in the tree inventory. Subsurface root conditions, internal decay not detectable by visual assessment, and future changes in site conditions are beyond the scope of this report. The arborist assumes no responsibility for undisclosed conditions or events occurring after the date of inspection.`;

  y = addWrappedText(doc, certParagraph3, margin, y, contentWidth, 5);
  y += 15;

  // Signature line
  doc.setDrawColor(...FOREST);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 80, y);
  y += 6;

  // Arborist name
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text(data.arboristName, margin, y);
  y += 5;

  // Credentials
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MUTED);

  if (data.isaQualification) {
    doc.text(data.isaQualification, margin, y);
    y += 4.5;
  }
  if (data.isaCredentialNumber) {
    doc.text(`ISA Certification: ${data.isaCredentialNumber}`, margin, y);
    y += 4.5;
  }
  if (data.licenseNumber) {
    doc.text(`License: ${data.licenseNumber}`, margin, y);
    y += 4.5;
  }
  if (data.companyName) {
    doc.text(data.companyName, margin, y);
    y += 4.5;
  }

  // Date
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...MUTED);
  doc.text("DATE", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);
  const dateStr = data.certifiedAt
    ? formatDate(data.certifiedAt)
    : formatDate(data.createdAt);
  doc.text(dateStr, margin + 15, y);

  // ─── Page Numbers & Running Footer on All Pages ──────────────────────────

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");

    // Footer rule
    doc.setDrawColor(...RULE);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

    // Running footer text (skip cover page)
    if (i > 1) {
      doc.text(
        `${data.reportTypeLabel} \u2014 ${data.propertyAddress}`,
        margin,
        pageHeight - 13
      );
    }

    // Page number
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 13,
      { align: "right" }
    );
  }

  return doc.output("blob");
}
