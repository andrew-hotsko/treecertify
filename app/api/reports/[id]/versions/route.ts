import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const versions = await prisma.reportVersion.findMany({
      where: { reportId: id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        label: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error("Error fetching report versions:", error);
    return NextResponse.json(
      { error: "Failed to fetch versions" },
      { status: 500 }
    );
  }
}
