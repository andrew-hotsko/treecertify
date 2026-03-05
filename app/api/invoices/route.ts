import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST /api/invoices — create a new invoice
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json({ error: "No arborist found" }, { status: 404 });
    }

    const body = await request.json();
    const { reportId, propertyId, lineItems, subtotal, total, dueDate } = body;

    if (!reportId || !propertyId || !lineItems || subtotal == null || total == null || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields: reportId, propertyId, lineItems, subtotal, total, dueDate" },
        { status: 400 }
      );
    }

    // Validate report exists and belongs to this arborist
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      select: { id: true, arboristId: true },
    });
    if (!report || report.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Report not found or access denied" }, { status: 404 });
    }

    // Auto-generate invoice number
    const existingCount = await prisma.invoice.count({
      where: { arboristId: arborist.id },
    });
    const prefix = arborist.invoicePrefix || "INV-";
    const invoiceNumber = `${prefix}${String(existingCount + 1).padStart(4, "0")}`;

    const invoice = await prisma.invoice.create({
      data: {
        arboristId: arborist.id,
        reportId,
        propertyId,
        invoiceNumber,
        invoiceDate: new Date(),
        dueDate: new Date(dueDate),
        billToName: body.billToName ?? null,
        billToAddress: body.billToAddress ?? null,
        lineItems: typeof lineItems === "string" ? lineItems : JSON.stringify(lineItems),
        subtotal: parseFloat(subtotal),
        tax: body.tax != null ? parseFloat(body.tax) : 0,
        total: parseFloat(total),
        paymentInstructions: body.paymentInstructions ?? null,
        notes: body.notes ?? null,
        showOnSharePage: !!body.showOnSharePage,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

// GET /api/invoices — list invoices for the authenticated arborist
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json({ error: "No arborist found" }, { status: 404 });
    }

    const url = new URL(request.url);
    const reportId = url.searchParams.get("reportId");

    const invoices = await prisma.invoice.findMany({
      where: {
        arboristId: arborist.id,
        ...(reportId ? { reportId } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          select: { address: true, city: true },
        },
        report: {
          select: { reportType: true },
        },
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error listing invoices:", error);
    return NextResponse.json(
      { error: "Failed to list invoices" },
      { status: 500 }
    );
  }
}
