import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/invoices/[id] — fetch a single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        property: true,
        report: { select: { reportType: true, certifiedAt: true } },
        arborist: {
          select: {
            id: true,
            name: true,
            companyName: true,
            clerkUserId: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.arborist.clerkUserId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}

// PUT /api/invoices/[id] — update an invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await prisma.invoice.findUnique({
      where: { id: params.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (existing.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    // Auto-set paidAt when marking as paid
    const paidAt =
      body.status === "paid" && !existing.paidAt
        ? body.paidAt ? new Date(body.paidAt) : new Date()
        : body.paidAt !== undefined
          ? body.paidAt ? new Date(body.paidAt) : null
          : undefined;

    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        ...(body.lineItems !== undefined && {
          lineItems: typeof body.lineItems === "string" ? body.lineItems : JSON.stringify(body.lineItems),
        }),
        ...(body.subtotal !== undefined && { subtotal: parseFloat(body.subtotal) }),
        ...(body.tax !== undefined && { tax: parseFloat(body.tax) }),
        ...(body.total !== undefined && { total: parseFloat(body.total) }),
        ...(body.billToName !== undefined && { billToName: body.billToName }),
        ...(body.billToAddress !== undefined && { billToAddress: body.billToAddress }),
        ...(body.dueDate !== undefined && { dueDate: new Date(body.dueDate) }),
        ...(body.paymentInstructions !== undefined && { paymentInstructions: body.paymentInstructions }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.showOnSharePage !== undefined && { showOnSharePage: !!body.showOnSharePage }),
        ...(body.status !== undefined && { status: body.status }),
        ...(paidAt !== undefined && { paidAt }),
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 }
    );
  }
}

// DELETE /api/invoices/[id] — delete an invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      select: { id: true, arboristId: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (invoice.arboristId !== arborist.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.invoice.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
