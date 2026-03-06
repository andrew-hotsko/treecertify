import { prisma } from "@/lib/db";
import { getCurrentArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const arborist = await getCurrentArborist();
    if (!arborist) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    if ("pdfShowTraqAppendix" in body) {
      updateData.pdfShowTraqAppendix = !!body.pdfShowTraqAppendix;
    }
    if ("pdfShowCityContacts" in body) {
      updateData.pdfShowCityContacts = !!body.pdfShowCityContacts;
    }
    if ("photoRequiredCount" in body) {
      const count = parseInt(body.photoRequiredCount, 10);
      if (isNaN(count) || count < 1 || count > 10) {
        return NextResponse.json(
          { error: "photoRequiredCount must be between 1 and 10" },
          { status: 400 }
        );
      }
      updateData.photoRequiredCount = count;
    }
    if ("shareDefaultMessage" in body) {
      updateData.shareDefaultMessage = body.shareDefaultMessage || null;
    }
    if ("shareThankYouMessage" in body) {
      updateData.shareThankYouMessage = body.shareThankYouMessage || null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided" },
        { status: 400 }
      );
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: updateData,
    });

    return NextResponse.json({
      pdfShowTraqAppendix: updated.pdfShowTraqAppendix,
      pdfShowCityContacts: updated.pdfShowCityContacts,
      photoRequiredCount: updated.photoRequiredCount,
      shareDefaultMessage: updated.shareDefaultMessage,
      shareThankYouMessage: updated.shareThankYouMessage,
    });
  } catch (error) {
    console.error("Error saving PDF/share preferences:", error);
    return NextResponse.json(
      { error: "Failed to save PDF/share preferences" },
      { status: 500 }
    );
  }
}
