/**
 * Report section parsing and reassembly utilities.
 *
 * Splits a report's markdown content into preamble, per-tree sections,
 * and postamble so individual tree narratives can be regenerated without
 * affecting the rest of the report.
 */

export interface TreeSection {
  treeNumber: number;
  content: string;
}

export interface ParsedReport {
  preamble: string;
  treeSections: TreeSection[];
  postamble: string;
}

/**
 * Splits a report's markdown content into sections:
 * - preamble (everything before the first "### Tree #")
 * - tree sections (each "### Tree #N" block)
 * - postamble (everything after the last tree section — limitations, cert block, etc.)
 */
export function parseReportSections(markdown: string): ParsedReport {
  const treeHeaderRegex = /^### Tree #(\d+)/gm;
  const matches = [...markdown.matchAll(treeHeaderRegex)];

  if (matches.length === 0) {
    return { preamble: markdown, treeSections: [], postamble: "" };
  }

  const preamble = markdown.slice(0, matches[0].index);

  const treeSections: TreeSection[] = matches.map((match, i) => {
    const start = match.index!;
    const end =
      i < matches.length - 1 ? matches[i + 1].index! : markdown.length;
    return {
      treeNumber: parseInt(match[1]),
      content: markdown.slice(start, end),
    };
  });

  // The postamble is anything after the last tree section that starts with
  // a ## heading that isn't a "### Tree" heading. This includes limitations,
  // cert blocks, etc.
  const lastSection = treeSections[treeSections.length - 1];
  const postambleMatch = lastSection.content.match(/\n(## (?!Tree #\d))/);
  let postamble = "";

  if (postambleMatch && postambleMatch.index != null) {
    postamble = lastSection.content.slice(postambleMatch.index);
    treeSections[treeSections.length - 1] = {
      ...lastSection,
      content: lastSection.content.slice(0, postambleMatch.index),
    };
  }

  return { preamble, treeSections, postamble };
}

/**
 * Reassembles a report from sections, replacing one tree's content.
 */
export function replaceTreeSection(
  markdown: string,
  treeNumber: number,
  newContent: string
): string {
  const { preamble, treeSections, postamble } = parseReportSections(markdown);

  if (treeSections.length === 0) {
    throw new Error("Unable to identify tree sections in this report.");
  }

  const found = treeSections.some((s) => s.treeNumber === treeNumber);
  if (!found) {
    throw new Error(`Tree #${treeNumber} section not found in this report.`);
  }

  // Ensure newContent ends with exactly two newlines for clean joining
  const normalizedNew = newContent.trimEnd() + "\n\n";

  const updatedSections = treeSections.map((s) =>
    s.treeNumber === treeNumber ? { ...s, content: normalizedNew } : s
  );

  return (
    preamble + updatedSections.map((s) => s.content).join("") + postamble
  );
}
