import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/uploads";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { photoId } = params;
    const body = await request.json();

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photo = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        ...(body.caption !== undefined && { caption: body.caption }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
        ...(body.category !== undefined && { category: body.category }),
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete file from disk
    deleteFile(treeId, "photos", existing.filename);

    // Delete database record
    await prisma.treePhoto.delete({ where: { id: photoId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
