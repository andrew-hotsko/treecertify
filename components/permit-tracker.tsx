"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Loader2,
  Phone,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCityContact } from "@/lib/city-contacts";
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PermitTrackerProps {
  reportId: string;
  permitStatus: string | null;
  submittedAt: string | null;
  submittedTo: string | null;
  reviewerNotes: string | null;
  conditionsOfApproval: string | null;
  denialReason: string | null;
  approvedAt: string | null;
  permitExpiresAt: string | null;
  city: string;
  reportType: string;
  onUpdate: (data: PermitUpdateData) => void;
}

export interface PermitUpdateData {
  permitStatus: string | null;
  submittedAt?: string | null;
  submittedTo?: string | null;
  reviewerNotes?: string | null;
  conditionsOfApproval?: string | null;
  denialReason?: string | null;
  approvedAt?: string | null;
  permitExpiresAt?: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: "", label: "Not Submitted" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "approved_with_conditions", label: "Approved with Conditions" },
  { value: "denied", label: "Denied" },
];

const STEPS = [
  { key: "not_submitted", label: "Not Submitted" },
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Under Review" },
  { key: "decision", label: "Decision" },
];

function getStepIndex(status: string | null): number {
  if (!status) return 0;
  if (status === "submitted") return 1;
  if (status === "under_review") return 2;
  if (["approved", "approved_with_conditions", "denied"].includes(status)) return 3;
  return 0;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function daysUntil(dateStr: string): string {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  if (diff < 30) return `${diff} days remaining`;
  const months = Math.round(diff / 30);
  return `${months} month${months !== 1 ? "s" : ""} remaining`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PermitTracker({
  reportId,
  permitStatus,
  submittedAt,
  submittedTo,
  reviewerNotes,
  conditionsOfApproval,
  denialReason,
  approvedAt,
  permitExpiresAt,
  city,
  reportType,
  onUpdate,
}: PermitTrackerProps) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const today = new Date().toISOString().split("T")[0];
  const [formStatus, setFormStatus] = useState(permitStatus || "");
  const [formDate, setFormDate] = useState(today);
  const [formSubmittedTo, setFormSubmittedTo] = useState(submittedTo || "");
  const [formNotes, setFormNotes] = useState(reviewerNotes || "");
  const [formConditions, setFormConditions] = useState(conditionsOfApproval || "");
  const [formDenialReason, setFormDenialReason] = useState(denialReason || "");
  const [formMitigationDue, setFormMitigationDue] = useState(
    permitExpiresAt ? new Date(permitExpiresAt).toISOString().split("T")[0] : ""
  );

  const stepIndex = getStepIndex(permitStatus);
  const isApproved = permitStatus === "approved" || permitStatus === "approved_with_conditions";
  const isDenied = permitStatus === "denied";

  const cityContact = useMemo(
    () => getCityContact(city, reportType),
    [city, reportType]
  );

  const openDialog = () => {
    setFormStatus(permitStatus || "");
    setFormDate(today);
    setFormSubmittedTo(submittedTo || cityContact?.department || "");
    setFormNotes(reviewerNotes || "");
    setFormConditions(conditionsOfApproval || "");
    setFormDenialReason(denialReason || "");
    setFormMitigationDue(
      permitExpiresAt ? new Date(permitExpiresAt).toISOString().split("T")[0] : ""
    );
    setShowDialog(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: PermitUpdateData = {
        permitStatus: formStatus || null,
      };

      if (formStatus === "submitted") {
        data.submittedAt = new Date(formDate).toISOString();
        data.submittedTo = formSubmittedTo || null;
      }
      if (["approved", "approved_with_conditions", "denied"].includes(formStatus)) {
        data.approvedAt = new Date(formDate).toISOString();
      }
      if (["approved", "approved_with_conditions"].includes(formStatus)) {
        data.conditionsOfApproval = formConditions || null;
      }
      if (formStatus === "approved_with_conditions" && formMitigationDue) {
        data.permitExpiresAt = new Date(formMitigationDue).toISOString();
      }
      if (formStatus === "denied") {
        data.denialReason = formDenialReason || null;
      }
      if (formNotes) {
        data.reviewerNotes = formNotes;
      }

      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      onUpdate(data);
      setShowDialog(false);
      toast({ description: "Permit status updated" });
    } catch {
      toast({ variant: "destructive", description: "Could not update permit status" });
    } finally {
      setSaving(false);
    }
  };

  // Show city contact when submitted/under review
  const showCityContact = (permitStatus === "submitted" || permitStatus === "under_review") && cityContact;

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-display font-semibold">
              <Send className="h-4 w-4 text-forest" />
              Permit Status
            </CardTitle>
            {!isApproved && (
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={openDialog}>
                Update Status
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Horizontal step indicator */}
          <div className="flex items-center gap-0 mb-4">
            {STEPS.map((step, i) => {
              const completed = i < stepIndex;
              const current = i === stepIndex;
              const isTerminalDenied = current && isDenied;
              const isTerminalApproved = current && isApproved;

              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                        completed && "bg-forest text-white",
                        current && !isTerminalDenied && !isTerminalApproved && "ring-2 ring-amber-500 bg-amber-50 text-amber-700",
                        isTerminalApproved && "bg-forest text-white",
                        isTerminalDenied && "bg-red-500 text-white",
                        !completed && !current && "bg-neutral-200 text-neutral-400"
                      )}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : isTerminalDenied ? (
                        <XCircle className="h-3.5 w-3.5" />
                      ) : isTerminalApproved ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] mt-1 whitespace-nowrap",
                        (completed || current) ? "text-neutral-700 font-medium" : "text-neutral-400"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-1.5 mt-[-14px]">
                      <div
                        className={cn(
                          "h-0.5 w-full rounded",
                          i < stepIndex ? "bg-forest" : "bg-neutral-200"
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Status detail */}
          <div className="text-sm space-y-1.5">
            {!permitStatus && (
              <p className="text-muted-foreground">Not yet submitted to the city.</p>
            )}

            {permitStatus === "submitted" && (
              <>
                <p className="text-neutral-700">
                  Submitted {formatShortDate(submittedAt)}
                  {submittedTo && <span className="text-muted-foreground"> to {submittedTo}</span>}
                </p>
              </>
            )}

            {permitStatus === "under_review" && (
              <p className="text-neutral-700">
                Under review
                {submittedAt && <span className="text-muted-foreground"> · Submitted {formatShortDate(submittedAt)}</span>}
              </p>
            )}

            {permitStatus === "approved" && (
              <p className="text-forest font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
                Approved {formatShortDate(approvedAt)}
              </p>
            )}

            {permitStatus === "approved_with_conditions" && (
              <div className="space-y-1.5">
                <p className="text-forest font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
                  Approved with Conditions {formatShortDate(approvedAt)}
                </p>
                {conditionsOfApproval && (
                  <p className="text-xs text-neutral-600 bg-neutral-50 rounded p-2">
                    {conditionsOfApproval}
                  </p>
                )}
                {permitExpiresAt && (
                  <p className="text-xs text-amber-700 font-medium">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Mitigation due: {formatDate(permitExpiresAt)} ({daysUntil(permitExpiresAt)})
                  </p>
                )}
              </div>
            )}

            {permitStatus === "denied" && (
              <div className="space-y-1">
                <p className="text-red-600 font-medium">
                  <XCircle className="h-3.5 w-3.5 inline mr-1" />
                  Denied {formatShortDate(approvedAt)}
                </p>
                {denialReason && (
                  <p className="text-xs text-neutral-600">{denialReason}</p>
                )}
              </div>
            )}

            {reviewerNotes && !isDenied && (
              <p className="text-xs text-muted-foreground italic">{reviewerNotes}</p>
            )}
          </div>

          {/* City contact info when submitted/under review */}
          {showCityContact && (
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-neutral-700">{cityContact.department}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {cityContact.phone && (
                  <a href={`tel:${cityContact.phone}`} className="flex items-center gap-1 text-forest hover:underline">
                    <Phone className="h-3 w-3" />
                    {cityContact.phone}
                  </a>
                )}
                {cityContact.email && (
                  <a href={`mailto:${cityContact.email}`} className="text-forest hover:underline">
                    {cityContact.email}
                  </a>
                )}
                {cityContact.portalUrl && (
                  <a href={cityContact.portalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-forest hover:underline">
                    <Globe className="h-3 w-3" />
                    Portal
                  </a>
                )}
              </div>
              {cityContact.typicalTimeline && (
                <p>Typical review: {cityContact.typicalTimeline}</p>
              )}
            </div>
          )}

          {/* Approved with conditions — allow update for mitigation tracking */}
          {isApproved && (
            <div className="mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={openDialog}>
                <ChevronRight className="h-3 w-3 mr-1" />
                Update Status
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Status Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Update Permit Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {formStatus && (
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <Input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {formStatus === "submitted" && (
              <div>
                <Label className="text-sm font-medium">Submitted To</Label>
                <Input
                  value={formSubmittedTo}
                  onChange={(e) => setFormSubmittedTo(e.target.value)}
                  placeholder={cityContact?.department || "City Planning Department"}
                  className="mt-1"
                />
              </div>
            )}

            {["approved", "approved_with_conditions"].includes(formStatus) && (
              <div>
                <Label className="text-sm font-medium">Conditions of Approval</Label>
                <textarea
                  value={formConditions}
                  onChange={(e) => setFormConditions(e.target.value)}
                  rows={3}
                  placeholder="e.g., Plant 2 replacement trees within 12 months"
                  className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>
            )}

            {formStatus === "approved_with_conditions" && (
              <div>
                <Label className="text-sm font-medium">Mitigation Deadline</Label>
                <Input
                  type="date"
                  value={formMitigationDue}
                  onChange={(e) => setFormMitigationDue(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {formStatus === "denied" && (
              <div>
                <Label className="text-sm font-medium">Denial Reason</Label>
                <textarea
                  value={formDenialReason}
                  onChange={(e) => setFormDenialReason(e.target.value)}
                  rows={3}
                  placeholder="Reason for denial..."
                  className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium">Notes (optional)</Label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={2}
                placeholder="e.g., Submitted online via planning portal"
                className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>

            {/* City contact hint when setting to submitted */}
            {formStatus === "submitted" && cityContact && (
              <div className="rounded-md bg-forest/5 px-3 py-2 text-xs text-neutral-600">
                <p className="font-medium text-neutral-700">{cityContact.department}</p>
                <p>
                  {cityContact.phone && <>{cityContact.phone}</>}
                  {cityContact.phone && cityContact.email && " · "}
                  {cityContact.email && <>{cityContact.email}</>}
                </p>
                {cityContact.typicalTimeline && (
                  <p className="mt-0.5">Typical review: {cityContact.typicalTimeline}</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-forest hover:bg-forest-light"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
