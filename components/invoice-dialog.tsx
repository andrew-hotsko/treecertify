"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Receipt,
  X,
  Plus,
  Trash2,
  Loader2,
  Download,
  CheckCircle2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billToName: string | null;
  billToAddress: string | null;
  lineItems: string; // JSON
  subtotal: number;
  tax: number;
  total: number;
  paymentInstructions: string | null;
  notes: string | null;
  status: string;
  showOnSharePage: boolean;
}

interface ArboristDefaults {
  invoiceDefaultFee: number | null;
  invoiceHourlyRate: number | null;
  invoicePaymentInstructions: string | null;
  invoicePrefix: string;
  invoiceNetTerms: string;
}

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  propertyId: string;
  property: {
    address: string;
    city: string;
    state?: string;
    zip?: string;
    homeownerName?: string | null;
  };
  reportType: string;
  existingInvoice: InvoiceData | null;
  arboristDefaults: ArboristDefaults;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const REPORT_TYPE_LINE_ITEMS: Record<string, string> = {
  removal_permit: "Arborist Report — Tree Removal Permit Application",
  health_assessment: "Arborist Report — Tree Health Assessment",
  tree_valuation: "Arborist Report — Tree Valuation Appraisal",
  construction_encroachment:
    "Arborist Report — Construction Encroachment Assessment",
};

function computeDueDate(netTerms: string): string {
  const today = new Date();
  switch (netTerms) {
    case "Net 15":
      today.setDate(today.getDate() + 15);
      break;
    case "Net 30":
      today.setDate(today.getDate() + 30);
      break;
    case "Net 45":
      today.setDate(today.getDate() + 45);
      break;
    case "Net 60":
      today.setDate(today.getDate() + 60);
      break;
    default:
      // "Due on Receipt" = today
      break;
  }
  return today.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InvoiceDialog({
  open,
  onOpenChange,
  reportId,
  propertyId,
  property,
  reportType,
  existingInvoice,
  arboristDefaults,
}: InvoiceDialogProps) {
  const { toast } = useToast();

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [tax, setTax] = useState(0);
  const [billToName, setBillToName] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [showOnSharePage, setShowOnSharePage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);

  // Computed totals
  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.amount, 0),
    [lineItems]
  );
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // Initialize form — pre-fill from existing invoice OR from defaults
  useEffect(() => {
    if (!open) return;

    if (existingInvoice) {
      // Edit existing
      try {
        const items = JSON.parse(existingInvoice.lineItems) as LineItem[];
        setLineItems(items);
      } catch {
        setLineItems([]);
      }
      setTax(existingInvoice.tax);
      setBillToName(existingInvoice.billToName ?? "");
      setBillToAddress(existingInvoice.billToAddress ?? "");
      setDueDate(existingInvoice.dueDate.slice(0, 10));
      setPaymentInstructions(existingInvoice.paymentInstructions ?? "");
      setNotes(existingInvoice.notes ?? "");
      setShowOnSharePage(existingInvoice.showOnSharePage);
    } else {
      // New invoice — pre-fill from defaults
      const defaultRate =
        arboristDefaults.invoiceDefaultFee ??
        arboristDefaults.invoiceHourlyRate ??
        0;
      const description =
        REPORT_TYPE_LINE_ITEMS[reportType] ?? "Arborist Report";

      setLineItems([
        {
          description,
          quantity: 1,
          rate: defaultRate,
          amount: defaultRate,
        },
      ]);
      setTax(0);
      setBillToName(property.homeownerName ?? "");
      const addr = [
        property.address,
        [property.city, property.state, property.zip]
          .filter(Boolean)
          .join(", "),
      ]
        .filter(Boolean)
        .join("\n");
      setBillToAddress(addr);
      setDueDate(computeDueDate(arboristDefaults.invoiceNetTerms));
      setPaymentInstructions(
        arboristDefaults.invoicePaymentInstructions ?? ""
      );
      setNotes("");
      setShowOnSharePage(false);
    }
  }, [open, existingInvoice, arboristDefaults, property, reportType]);

  // Update line item field
  const updateLineItem = useCallback(
    (index: number, field: keyof LineItem, value: string | number) => {
      setLineItems((prev) => {
        const next = [...prev];
        const item = { ...next[index] };

        if (field === "description") {
          item.description = value as string;
        } else if (field === "quantity") {
          item.quantity = Number(value) || 0;
          item.amount = item.quantity * item.rate;
        } else if (field === "rate") {
          item.rate = Number(value) || 0;
          item.amount = item.quantity * item.rate;
        }

        next[index] = item;
        return next;
      });
    },
    []
  );

  const addLineItem = useCallback(() => {
    setLineItems((prev) => [
      ...prev,
      { description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
  }, []);

  const removeLineItem = useCallback(
    (index: number) => {
      if (lineItems.length <= 1) return;
      setLineItems((prev) => prev.filter((_, i) => i !== index));
    },
    [lineItems.length]
  );

  // Save / Create
  const handleSave = async () => {
    if (lineItems.length === 0 || lineItems.every((i) => !i.description.trim())) {
      toast({
        title: "Add at least one line item",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        reportId,
        propertyId,
        dueDate: new Date(dueDate + "T00:00:00").toISOString(),
        billToName: billToName || null,
        billToAddress: billToAddress || null,
        lineItems: JSON.stringify(lineItems),
        subtotal,
        tax,
        total,
        paymentInstructions: paymentInstructions || null,
        notes: notes || null,
        showOnSharePage,
      };

      let invoiceId: string;

      if (existingInvoice) {
        // Update
        const res = await fetch(`/api/invoices/${existingInvoice.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update invoice");
        }
        invoiceId = existingInvoice.id;
        toast({ title: "Invoice updated" });
      } else {
        // Create
        const res = await fetch("/api/invoices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create invoice");
        }
        const data = await res.json();
        invoiceId = data.id;
        toast({ title: `Invoice ${data.invoiceNumber} created` });
      }

      // Auto-download PDF
      try {
        const pdfRes = await fetch(`/api/invoices/${invoiceId}/pdf`);
        if (!pdfRes.ok) throw new Error("PDF generation failed");
        const blob = await pdfRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (pdfErr) {
        console.error("Invoice PDF download failed:", pdfErr);
        toast({
          title: "Invoice saved, but PDF download failed",
          description: "You can download it later from the invoice.",
          variant: "destructive",
        });
      }

      onOpenChange(false);
    } catch (err) {
      console.error("Invoice save error:", err);
      toast({
        title: "Failed to save invoice",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Mark as paid
  const handleMarkPaid = async () => {
    if (!existingInvoice) return;
    setMarkingPaid(true);
    try {
      const res = await fetch(`/api/invoices/${existingInvoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });
      if (!res.ok) throw new Error("Failed to mark as paid");
      toast({ title: "Invoice marked as paid" });
      onOpenChange(false);
    } catch (err) {
      console.error("Mark paid error:", err);
      toast({
        title: "Failed to mark as paid",
        variant: "destructive",
      });
    } finally {
      setMarkingPaid(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <CardContent className="p-6 flex flex-col flex-1 overflow-hidden gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-forest" />
              {existingInvoice ? "Edit Invoice" : "Generate Invoice"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Existing invoice number + status */}
          {existingInvoice && (
            <div className="flex items-center gap-3 text-sm">
              <span className="font-mono font-medium text-neutral-700">
                {existingInvoice.invoiceNumber}
              </span>
              {existingInvoice.status === "paid" ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                  Unpaid
                </span>
              )}
            </div>
          )}

          {/* Scrollable form body */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            {/* Bill To + Due Date row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Bill To</Label>
                <Input
                  value={billToName}
                  onChange={(e) => setBillToName(e.target.value)}
                  placeholder="Client name"
                />
                <Textarea
                  value={billToAddress}
                  onChange={(e) => setBillToAddress(e.target.value)}
                  placeholder="Address"
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Due Date</Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <p className="text-xs text-neutral-500">
                  {dueDate && formatDate(dueDate)}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <Label className="text-sm">Line Items</Label>

              {/* Header row */}
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider px-1">
                <span className="col-span-5">Description</span>
                <span className="col-span-2 text-right">Qty</span>
                <span className="col-span-2 text-right">Rate</span>
                <span className="col-span-2 text-right">Amount</span>
                <span className="col-span-1" />
              </div>

              {lineItems.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <Input
                    className="col-span-5 text-sm"
                    value={item.description}
                    onChange={(e) =>
                      updateLineItem(i, "description", e.target.value)
                    }
                    placeholder="Service description"
                  />
                  <Input
                    className="col-span-2 text-sm text-right font-mono"
                    type="number"
                    min={0}
                    step={1}
                    value={item.quantity || ""}
                    onChange={(e) =>
                      updateLineItem(i, "quantity", e.target.value)
                    }
                  />
                  <Input
                    className="col-span-2 text-sm text-right font-mono"
                    type="number"
                    min={0}
                    step={0.01}
                    value={item.rate || ""}
                    onChange={(e) =>
                      updateLineItem(i, "rate", e.target.value)
                    }
                  />
                  <span className="col-span-2 text-sm text-right font-mono text-neutral-700">
                    ${item.amount.toFixed(2)}
                  </span>
                  <button
                    className="col-span-1 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-30"
                    onClick={() => removeLineItem(i)}
                    disabled={lineItems.length <= 1}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addLineItem}
                className="mt-1"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add Line Item
              </Button>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-mono font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm gap-3">
                  <span className="text-neutral-500">Tax</span>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400">$</span>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={tax || ""}
                      onChange={(e) =>
                        setTax(parseFloat(e.target.value) || 0)
                      }
                      className="w-24 text-right font-mono text-sm h-8"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span>Total</span>
                  <span className="font-mono text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-1.5">
              <Label className="text-sm">Payment Instructions</Label>
              <Textarea
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                placeholder="e.g., Payment by check, Zelle, or bank transfer..."
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="text-sm">Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes for the client..."
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            {/* Show on share page toggle */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Show on Client Share Page
                </p>
                <p className="text-xs text-neutral-500">
                  Clients can view and download the invoice from the shared
                  report link.
                </p>
              </div>
              <Switch
                checked={showOnSharePage}
                onCheckedChange={setShowOnSharePage}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t">
            <div>
              {existingInvoice && existingInvoice.status !== "paid" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkPaid}
                  disabled={markingPaid}
                  className="text-green-700 border-green-200 hover:bg-green-50"
                >
                  {markingPaid ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  Mark as Paid
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                className="bg-forest hover:bg-forest-light"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {existingInvoice ? "Update & Download" : "Generate Invoice"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
