import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Batch-update sort orders in a transaction
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.treePhoto.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error reordering photos:", error);
    return NextResponse.json(
      { error: "Failed to reorder photos" },
      { status: 500 }
    );
  }
}
