/**
 * Lightweight markdown-to-HTML renderer for arborist report content.
 * Handles the subset of markdown produced by Claude: headings, bold, italic,
 * lists, tables, horizontal rules, and paragraphs.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return result;
}

function renderTable(lines: string[]): string {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s-:|]+\|$/)) // skip separator row
    .map((line) => {
      const cells = line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      return cells;
    });

  if (rows.length === 0) return "";

  const headerCells = rows[0]
    .map((c) => `<th>${renderInline(c)}</th>`)
    .join("");
  const bodyRows = rows
    .slice(1)
    .map(
      (row) =>
        `<tr>${row.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`
    )
    .join("\n");

  return `<table>
<thead><tr>${headerCells}</tr></thead>
<tbody>${bodyRows}</tbody>
</table>`;
}

export function renderMarkdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
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
      output.push("<hr />");
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      output.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      output.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      output.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // Table: collect consecutive lines starting with |
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    // Unordered list: collect consecutive - items
    if (line.trimStart().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        listItems.push(lines[i].trimStart().slice(2));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ul>${lis}</ul>`);
      continue;
    }

    // Ordered list: collect consecutive numbered items
    if (/^\d+\.\s/.test(line.trimStart())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        listItems.push(lines[i].trimStart().replace(/^\d+\.\s/, ""));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ol>${lis}</ol>`);
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
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
      output.push(`<p>${renderInline(paraLines.join(" "))}</p>`);
    }
  }

  return output.join("\n");
}
