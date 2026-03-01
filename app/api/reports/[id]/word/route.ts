import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { markdownToDocxElements } from "@/lib/markdown-to-docx";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  ShadingType,
  BorderStyle,
  ImageRun,
} from "docx";
import fs from "fs";
import path from "path";

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

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // ------------------------------------------------------------------
    // Build document sections
    // ------------------------------------------------------------------

    const sections: (Paragraph | Table)[] = [];

    // ---- Company Branding Header ----
    if (arborist.companyName) {
      const brandingRuns: TextRun[] = [
        new TextRun({
          text: arborist.companyName,
          bold: true,
          size: 24,
          color: "2d5016",
        }),
      ];

      if (arborist.companyAddress) {
        brandingRuns.push(new TextRun({ break: 1, text: arborist.companyAddress, size: 18, color: "666666" }));
      }
      if (arborist.companyPhone) {
        brandingRuns.push(new TextRun({ break: 1, text: arborist.companyPhone, size: 18, color: "666666" }));
      }
      if (arborist.companyEmail) {
        brandingRuns.push(new TextRun({ break: 1, text: arborist.companyEmail, size: 18, color: "666666" }));
      }
      if (arborist.companyWebsite) {
        brandingRuns.push(new TextRun({ break: 1, text: arborist.companyWebsite, size: 18, color: "666666" }));
      }

      sections.push(
        new Paragraph({
          children: brandingRuns,
          spacing: { after: 200 },
        })
      );

      // Separator line
      sections.push(
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.DOUBLE, size: 6, color: "2d5016" },
          },
          spacing: { after: 300 },
        })
      );
    }

    // ---- Logo (if exists on disk) ----
    if (arborist.companyLogoUrl) {
      try {
        // companyLogoUrl is like /api/uploads/arborist/{id}/{filename}
        // resolve to disk path
        const urlParts = arborist.companyLogoUrl.replace(/^\/api\/uploads\//, "");
        const logoPath = path.join(process.cwd(), "uploads", urlParts);

        if (fs.existsSync(logoPath)) {
          const logoData = fs.readFileSync(logoPath);
          const ext = path.extname(logoPath).toLowerCase();

          // Only embed jpg/png (docx doesn't support svg/webp natively)
          if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            sections.unshift(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logoData,
                    transformation: { width: 120, height: 60 },
                    type: ext === ".png" ? "png" : "jpg",
                  }),
                ],
                spacing: { after: 100 },
              })
            );
          }
        }
      } catch {
        // Skip logo if any error
      }
    }

    // ---- Report Title ----
    sections.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "ARBORIST REPORT",
            bold: true,
            size: 36,
            color: "2d5016",
          }),
        ],
        spacing: { before: 200, after: 100 },
      })
    );

    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: property.address,
            size: 28,
            bold: true,
          }),
        ],
        spacing: { after: 60 },
      })
    );

    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${property.city}, ${property.state || "CA"}${property.county ? `, ${property.county} County` : ""}`,
            size: 20,
            color: "666666",
          }),
        ],
        spacing: { after: 300 },
        border: {
          bottom: { style: BorderStyle.DOUBLE, size: 6, color: "2d5016" },
        },
      })
    );

    // ---- Meta Table ----
    const metaRows = [
      ["Report Type", reportTypeLabel, "Date", dateStr],
      ["Arborist", arborist.name, "ISA #", arborist.isaCertificationNum],
      ["Property", property.address, "APN", property.parcelNumber || "N/A"],
      [
        "City",
        `${property.city}, ${property.state || "CA"} ${property.zip || ""}`.trim(),
        "Trees Assessed",
        String(trees.length),
      ],
    ];

    sections.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: metaRows.map(
          (row) =>
            new TableRow({
              children: row.map((cell, colIdx) =>
                new TableCell({
                  shading:
                    colIdx % 2 === 0
                      ? { type: ShadingType.SOLID, color: "f5f5f0", fill: "f5f5f0" }
                      : undefined,
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          bold: colIdx % 2 === 0,
                          size: 20,
                        }),
                      ],
                    }),
                  ],
                })
              ),
            })
        ),
      })
    );

    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // ---- Tree Inventory Table ----
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({ text: "Tree Inventory", color: "2d5016", bold: true, size: 26 }),
        ],
        spacing: { before: 300, after: 120 },
      })
    );

    const treeHeader = new TableRow({
      tableHeader: true,
      children: ["Tree #", "Species", "DBH", "Height", "Condition", "Protected", "Action"].map(
        (h) =>
          new TableCell({
            shading: { type: ShadingType.SOLID, color: "2d5016", fill: "2d5016" },
            children: [
              new Paragraph({
                children: [new TextRun({ text: h, bold: true, color: "ffffff", size: 18 })],
              }),
            ],
          })
      ),
    });

    const treeDataRows = trees.map(
      (tree, idx) =>
        new TableRow({
          children: [
            cellParagraph(String(tree.treeNumber), AlignmentType.CENTER),
            cellParagraph(
              `${tree.speciesCommon}${tree.speciesScientific ? ` (${tree.speciesScientific})` : ""}`
            ),
            cellParagraph(`${tree.dbhInches}"`, AlignmentType.CENTER),
            cellParagraph(tree.heightFt ? `${tree.heightFt}'` : "N/A", AlignmentType.CENTER),
            cellParagraph(`${tree.conditionRating}/5`, AlignmentType.CENTER),
            cellParagraph(tree.isProtected ? "Yes" : "No", AlignmentType.CENTER),
            cellParagraph(tree.recommendedAction || "N/A"),
          ].map(
            (para) =>
              new TableCell({
                shading:
                  idx % 2 === 1
                    ? { type: ShadingType.SOLID, color: "f9f9f6", fill: "f9f9f6" }
                    : undefined,
                children: [para],
              })
          ),
        })
    );

    sections.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [treeHeader, ...treeDataRows],
      })
    );

    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // ---- Report Content (markdown → docx) ----
    const contentElements = markdownToDocxElements(content);
    sections.push(...contentElements);

    // ---- Photo Documentation ----
    const treesWithPhotos = trees.filter((t) => t.treePhotos && t.treePhotos.length > 0);
    if (treesWithPhotos.length > 0) {
      sections.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "Photo Documentation", color: "2d5016", bold: true, size: 26 }),
          ],
          spacing: { before: 400, after: 120 },
          pageBreakBefore: true,
        })
      );

      for (const tree of treesWithPhotos) {
        sections.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({
                text: `Tree #${tree.treeNumber} — ${tree.speciesCommon}`,
                color: "2d5016",
                bold: true,
                size: 22,
              }),
            ],
            spacing: { before: 200, after: 80 },
          })
        );

        for (const photo of tree.treePhotos) {
          try {
            // Resolve photo URL to disk path
            const urlPath = photo.url.replace(/^\/api\/uploads\//, "");
            const photoPath = path.join(process.cwd(), "uploads", urlPath);

            if (fs.existsSync(photoPath)) {
              const photoData = fs.readFileSync(photoPath);
              const ext = path.extname(photoPath).toLowerCase();

              if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp") {
                sections.push(
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: photoData,
                        transformation: { width: 300, height: 200 },
                        type: ext === ".png" ? "png" : "jpg",
                      }),
                    ],
                    spacing: { after: 40 },
                  })
                );

                if (photo.caption) {
                  sections.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: photo.caption,
                          italics: true,
                          size: 18,
                          color: "666666",
                        }),
                      ],
                      spacing: { after: 120 },
                    })
                  );
                }
              }
            }
          } catch {
            // Skip photo on error
          }
        }
      }
    }

    // ---- Certification Box ----
    if (report.status === "certified") {
      sections.push(new Paragraph({ spacing: { before: 400 } }));

      sections.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: "Arborist Certification",
              color: "2d5016",
              bold: true,
              size: 26,
            }),
          ],
          spacing: { after: 120 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 4, color: "2d5016" },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "2d5016" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "2d5016" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "2d5016" },
          },
          shading: { type: ShadingType.SOLID, color: "f8faf5", fill: "f8faf5" },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "I, the undersigned, certify that I have personally inspected the tree(s) described in this report and that the information contained herein is accurate to the best of my professional knowledge and belief.",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Electronically signed: ", bold: true, size: 20 }),
            new TextRun({ text: report.eSignatureText || "", size: 20 }),
          ],
          spacing: { after: 60 },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: "ISA Certification #: ", bold: true, size: 20 }),
            new TextRun({ text: arborist.isaCertificationNum, size: 20 }),
          ],
          spacing: { after: 60 },
        })
      );

      if (report.certifiedAt) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: "Date: ", bold: true, size: 20 }),
              new TextRun({
                text: new Date(report.certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                size: 20,
              }),
            ],
          })
        );
      }
    }

    // ------------------------------------------------------------------
    // Build the Document
    // ------------------------------------------------------------------

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "ordered-list",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
              },
            ],
          },
        ],
      },
      styles: {
        default: {
          document: {
            run: {
              font: "Georgia",
              size: 22,
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,    // 1 inch
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: sections,
        },
      ],
    });

    // ------------------------------------------------------------------
    // Generate the buffer and return
    // ------------------------------------------------------------------

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    const filename = `Arborist_Report_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;

    return new NextResponse(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Word generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Word document" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helper: create a simple cell paragraph
// ---------------------------------------------------------------------------

function cellParagraph(
  text: string,
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.START
): Paragraph {
  return new Paragraph({
    alignment,
    children: [new TextRun({ text, size: 18 })],
  });
}
