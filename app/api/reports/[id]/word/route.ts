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
  PageBreak,
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

    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // ------------------------------------------------------------------
    // COVER PAGE section
    // ------------------------------------------------------------------

    const coverChildren: (Paragraph | Table)[] = [];

    // Logo
    if (arborist.companyLogoUrl) {
      try {
        const urlParts = arborist.companyLogoUrl.replace(/^\/api\/uploads\//, "");
        const logoPath = path.join(process.cwd(), "uploads", urlParts);

        if (fs.existsSync(logoPath)) {
          const logoData = fs.readFileSync(logoPath);
          const ext = path.extname(logoPath).toLowerCase();

          if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            coverChildren.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: logoData,
                    transformation: { width: 160, height: 80 },
                    type: ext === ".png" ? "png" : "jpg",
                  }),
                ],
                spacing: { after: 200 },
              })
            );
          }
        }
      } catch {
        // Skip logo on error
      }
    }

    // Company name
    if (arborist.companyName) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: arborist.companyName,
              bold: true,
              size: 28,
              color: "333333",
            }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    // Contact info
    const contactParts = [
      arborist.companyAddress,
      arborist.companyPhone,
      arborist.companyEmail,
      arborist.companyWebsite,
    ].filter(Boolean);
    if (contactParts.length > 0) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: contactParts.join(" \u2022 "),
              size: 18,
              color: "666666",
            }),
          ],
          spacing: { after: 600 },
        })
      );
    }

    // Separator
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
        },
        spacing: { after: 600 },
        children: [],
      })
    );

    // Title
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "ARBORIST REPORT",
            bold: true,
            size: 56,
            color: "1a1a1a",
          }),
        ],
        spacing: { after: 120 },
      })
    );

    // Address
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: property.address, size: 28, bold: true }),
        ],
        spacing: { after: 60 },
      })
    );

    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${property.city}, ${property.state || "CA"}${property.county ? ` \u2014 ${property.county} County` : ""}`,
            size: 22,
            color: "666666",
          }),
        ],
        spacing: { after: 200 },
      })
    );

    // Report type
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: reportTypeLabel,
            size: 22,
            color: "555555",
          }),
        ],
        spacing: { after: 600 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
        },
      })
    );

    // Meta info
    const metaLines = [
      `Prepared by: ${arborist.name}, ISA #${arborist.isaCertificationNum}`,
      `Date: ${dateStr}`,
      `Property APN: ${property.parcelNumber || "N/A"}`,
      `Trees Assessed: ${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}`,
    ];

    for (const line of metaLines) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: line, size: 20, color: "555555" })],
          spacing: { after: 40 },
        })
      );
    }

    // Draft label
    if (!isCertified) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "DRAFT",
              bold: true,
              size: 32,
              color: "999999",
            }),
          ],
          spacing: { before: 400 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
          },
        })
      );
    }

    // ------------------------------------------------------------------
    // BODY section children
    // ------------------------------------------------------------------

    const bodyChildren: (Paragraph | Table)[] = [];

    // ---- Tree Inventory Table ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Tree Inventory",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 100, after: 120 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    const inventoryHeaders = [
      "Tree #",
      "Tag",
      "Species",
      "DBH",
      "Height",
      "Canopy",
      "Condition",
      "Protected",
      "Action",
    ];

    const treeHeader = new TableRow({
      tableHeader: true,
      children: inventoryHeaders.map(
        (h) =>
          new TableCell({
            shading: {
              type: ShadingType.SOLID,
              color: "333333",
              fill: "333333",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: h,
                    bold: true,
                    color: "ffffff",
                    size: 16,
                    font: "Helvetica",
                  }),
                ],
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
            cellParagraph(tree.tagNumber || "\u2014"),
            cellParagraph(
              `${tree.speciesCommon}${tree.speciesScientific ? ` (${tree.speciesScientific})` : ""}`
            ),
            cellParagraph(`${tree.dbhInches}"`, AlignmentType.CENTER),
            cellParagraph(
              tree.heightFt ? `${tree.heightFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              conditionLabels[tree.conditionRating] ??
                String(tree.conditionRating),
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.isProtected ? "Yes" : "No",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.recommendedAction
                ?.replace(/_/g, " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A"
            ),
          ].map(
            (para) =>
              new TableCell({
                shading:
                  idx % 2 === 1
                    ? {
                        type: ShadingType.SOLID,
                        color: "f7f7f7",
                        fill: "f7f7f7",
                      }
                    : undefined,
                children: [para],
              })
          ),
        })
    );

    bodyChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [treeHeader, ...treeDataRows],
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Condition Scale: 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent",
            size: 16,
            color: "999999",
            italics: true,
          }),
        ],
        spacing: { before: 40, after: 200 },
      })
    );

    // Page break before report body
    bodyChildren.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    // ---- Report Content (markdown → docx) ----
    const contentElements = markdownToDocxElements(content);
    bodyChildren.push(...contentElements);

    // ---- Photo Documentation ----
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    if (treesWithPhotos.length > 0) {
      bodyChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "Photo Documentation",
              bold: true,
              size: 28,
              color: "1a1a1a",
              font: "Helvetica",
            }),
          ],
          spacing: { before: 400, after: 120 },
          pageBreakBefore: true,
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
          },
        })
      );

      for (const tree of treesWithPhotos) {
        bodyChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: `Tree #${tree.treeNumber} \u2014 ${tree.speciesCommon}`,
                bold: true,
                size: 24,
                color: "333333",
                font: "Helvetica",
              }),
            ],
            spacing: { before: 200, after: 80 },
          })
        );

        for (const photo of tree.treePhotos) {
          try {
            const urlPath = photo.url.replace(/^\/api\/uploads\//, "");
            const photoPath = path.join(process.cwd(), "uploads", urlPath);

            if (fs.existsSync(photoPath)) {
              const photoData = fs.readFileSync(photoPath);
              const ext = path.extname(photoPath).toLowerCase();

              if (
                ext === ".png" ||
                ext === ".jpg" ||
                ext === ".jpeg" ||
                ext === ".webp"
              ) {
                bodyChildren.push(
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
                  bodyChildren.push(
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

    // ---- Certification Section ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Arborist Certification",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 400, after: 120 },
        pageBreakBefore: true,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I, the undersigned, certify that I have personally inspected the tree(s) described in this report and that the information contained herein is accurate to the best of my professional knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based on my professional training, experience, and education.",
            size: 20,
          }),
        ],
        spacing: { after: 80 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I have no personal interest or bias with respect to the parties involved. The analysis, opinions, and conclusions stated herein are my own, and are based on current scientific procedures and facts.",
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );

    if (isCertified) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Electronically Signed: ",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: report.eSignatureText || "",
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 60 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "cccccc" },
          },
        })
      );
    }

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Name: ", bold: true, size: 20 }),
          new TextRun({ text: arborist.name, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "ISA Certification #: ",
            bold: true,
            size: 20,
          }),
          new TextRun({ text: arborist.isaCertificationNum, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    if (arborist.companyName) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Company: ", bold: true, size: 20 }),
            new TextRun({ text: arborist.companyName, size: 20 }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    if (isCertified && report.certifiedAt) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Date Certified: ", bold: true, size: 20 }),
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
    } else {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "This report has not yet been certified.",
              size: 20,
              color: "999999",
              italics: true,
            }),
          ],
          spacing: { before: 80 },
        })
      );
    }

    // ------------------------------------------------------------------
    // Build the Document with two sections: cover page + body
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
          heading1: {
            run: {
              font: "Helvetica",
              size: 28,
              bold: true,
              color: "1a1a1a",
            },
            paragraph: {
              spacing: { before: 360, after: 120 },
            },
          },
          heading2: {
            run: {
              font: "Helvetica",
              size: 24,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 240, after: 80 },
            },
          },
          heading3: {
            run: {
              font: "Helvetica",
              size: 22,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 200, after: 60 },
            },
          },
        },
      },
      sections: [
        // Cover page section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: coverChildren,
        },
        // Body section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: bodyChildren,
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
    children: [new TextRun({ text, size: 16 })],
  });
}
