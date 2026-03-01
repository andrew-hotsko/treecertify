/**
 * Converts a subset of markdown (as produced by Claude AI) into docx
 * Paragraph/Table objects using the `docx` npm package.
 *
 * Handles: # ## ### headings, **bold**, *italic*, - unordered lists,
 * 1. ordered lists, | tables |, --- horizontal rules, and paragraphs.
 */

import {
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
} from "docx";

// ---------------------------------------------------------------------------
// Inline formatting parser
// ---------------------------------------------------------------------------

function parseInlineRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  // Match **bold**, *italic*, or plain text
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      runs.push(new TextRun({ text: match[2], bold: true }));
    } else if (match[3]) {
      // Italic
      runs.push(new TextRun({ text: match[3], italics: true }));
    } else if (match[4]) {
      // Plain
      runs.push(new TextRun({ text: match[4] }));
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ text })];
}

// ---------------------------------------------------------------------------
// Table builder
// ---------------------------------------------------------------------------

function buildTable(lines: string[]): Table {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s\-:|]+\|$/)) // skip separator
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim())
    );

  if (rows.length === 0) {
    return new Table({ rows: [] });
  }

  const headerCells = rows[0];
  const bodyRows = rows.slice(1);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headerCells.map(
      (cell) =>
        new TableCell({
          shading: {
            type: ShadingType.SOLID,
            color: "2d5016",
            fill: "2d5016",
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell,
                  bold: true,
                  color: "ffffff",
                  size: 18,
                }),
              ],
            }),
          ],
        })
    ),
  });

  const dataRows = bodyRows.map(
    (row, rowIdx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              shading:
                rowIdx % 2 === 1
                  ? {
                      type: ShadingType.SOLID,
                      color: "f9f9f6",
                      fill: "f9f9f6",
                    }
                  : undefined,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 18 })],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ---------------------------------------------------------------------------
// Main converter
// ---------------------------------------------------------------------------

export function markdownToDocxElements(
  markdown: string
): (Paragraph | Table)[] {
  const lines = markdown.split("\n");
  const elements: (Paragraph | Table)[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(
        new Paragraph({
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: "999999",
            },
          },
          spacing: { before: 200, after: 200 },
        })
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith("### ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: line.slice(4),
              color: "2d5016",
              size: 24,
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 80 },
        })
      );
      i++;
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: line.slice(3),
              color: "2d5016",
              size: 28,
              bold: true,
            }),
          ],
          spacing: { before: 320, after: 120 },
        })
      );
      i++;
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: line.slice(2),
              color: "2d5016",
              size: 32,
              bold: true,
            }),
          ],
          spacing: { before: 400, after: 160 },
        })
      );
      i++;
      continue;
    }

    // Table
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      elements.push(buildTable(tableLines));
      continue;
    }

    // Unordered list
    if (line.trimStart().startsWith("- ")) {
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        const itemText = lines[i].trimStart().slice(2);
        elements.push(
          new Paragraph({
            bullet: { level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        const itemText = lines[i].trimStart().replace(/^\d+\.\s/, "");
        elements.push(
          new Paragraph({
            numbering: { reference: "ordered-list", level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Paragraph: collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].trimStart().startsWith("|") &&
      !lines[i].trimStart().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        new Paragraph({
          children: parseInlineRuns(paraLines.join(" ")),
          spacing: { before: 80, after: 80 },
        })
      );
    }
  }

  return elements;
}
