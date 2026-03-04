import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // Snapshot previous content as a version before overwriting
    if (body.finalContent !== undefined) {
      const previousContent = existing.finalContent || existing.aiDraftContent;
      if (previousContent && previousContent !== body.finalContent) {
        await prisma.reportVersion.create({
          data: {
            reportId: id,
            content: previousContent,
            label: "Edit",
          },
        });
      }
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        ...(body.finalContent !== undefined && { finalContent: body.finalContent }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.eSignatureText !== undefined && { eSignatureText: body.eSignatureText }),
        ...(body.reportOptions !== undefined && { reportOptions: body.reportOptions }),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
