"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PermitStatusPipelineProps {
  permitStatus: string | null;
  submittedAt: string | null;
  submittedTo: string | null;
  reviewerName: string | null;
  reviewerNotes: string | null;
  conditionsOfApproval: string | null;
  denialReason: string | null;
  approvedAt: string | null;
  permitExpiresAt: string | null;
  certifiedAt: string | null;
  mode: "interactive" | "readonly";
  friendlyLabels?: boolean;
  onUpdatePermitStatus?: (data: Record<string, unknown>) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Stage definitions
// ---------------------------------------------------------------------------

interface Stage {
  key: string;
  label: string;
  friendlyLabel: string;
  icon: React.ElementType;
}

const STAGES: Stage[] = [
  { key: "certified", label: "Certified", friendlyLabel: "Report Complete", icon: ShieldCheck },
  { key: "submitted", label: "Submitted", friendlyLabel: "Submitted to City", icon: Send },
  { key: "under_review", label: "Under Review", friendlyLabel: "Under Review", icon: Clock },
];

const TERMINAL_STAGES: Record<string, { label: string; friendlyLabel: string; icon: React.ElementType; color: string }> = {
  approved: { label: "Approved", friendlyLabel: "Permit Approved", icon: ShieldCheck, color: "forest" },
  denied: { label: "Denied", friendlyLabel: "Permit Denied", icon: XCircle, color: "red" },
  revision_requested: { label: "Revision Requested", friendlyLabel: "Revision Needed", icon: AlertTriangle, color: "amber" },
};

function getCurrentStageIndex(permitStatus: string | null, certifiedAt: string | null): number {
  if (!certifiedAt) return -1;
  if (!permitStatus) return 0;
  if (permitStatus === "submitted") return 1;
  if (permitStatus === "under_review") return 2;
  if (permitStatus in TERMINAL_STAGES) return 3;
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PermitStatusPipeline({
  permitStatus,
  submittedAt,
  submittedTo,
  reviewerName,
  reviewerNotes,
  conditionsOfApproval,
  denialReason,
  approvedAt,
  permitExpiresAt,
  certifiedAt,
  mode,
  friendlyLabels = false,
  onUpdatePermitStatus,
}: PermitStatusPipelineProps) {
  const currentStage = getCurrentStageIndex(permitStatus, certifiedAt);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state for each action
  const [formSubmittedTo, setFormSubmittedTo] = useState("");
  const [formReviewerName, setFormReviewerName] = useState("");
  const [formConditions, setFormConditions] = useState("");
  const [formExpiresAt, setFormExpiresAt] = useState("");
  const [formDenialReason, setFormDenialReason] = useState("");
  const [formReviewerNotes, setFormReviewerNotes] = useState("");

  const handleUpdate = useCallback(
    async (data: Record<string, unknown>) => {
      if (!onUpdatePermitStatus) return;
      setSaving(true);
      try {
        await onUpdatePermitStatus(data);
        setExpandedAction(null);
      } finally {
        setSaving(false);
      }
    },
    [onUpdatePermitStatus]
  );

  // Determine terminal stage info
  const terminalInfo = permitStatus && TERMINAL_STAGES[permitStatus]
    ? TERMINAL_STAGES[permitStatus]
    : { label: "Approved", friendlyLabel: "Permit Approved", icon: ShieldCheck, color: "forest" };

  // Build full stages list including terminal
  const allStages = [
    ...STAGES,
    {
      key: "terminal",
      label: terminalInfo.label,
      friendlyLabel: terminalInfo.friendlyLabel,
      icon: terminalInfo.icon,
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Send className="h-4 w-4 text-forest" />
          {friendlyLabels ? "Permit Status" : "Permit Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ---- Pipeline visualization ---- */}
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {allStages.map((stage, idx) => {
            const isComplete = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isTerminal = idx === 3;
            const isTerminalDenied = isTerminal && permitStatus === "denied";
            const isTerminalRevision = isTerminal && permitStatus === "revision_requested";

            // Colors
            let circleColor = "bg-neutral-300 text-neutral-400";
            let lineColor = "bg-neutral-300";
            let textColor = "text-neutral-400";

            if (isComplete) {
              circleColor = "bg-forest text-white";
              lineColor = "bg-forest";
              textColor = "text-forest";
            } else if (isCurrent) {
              circleColor = "bg-amber-500 text-white";
              textColor = "text-amber-700 font-semibold";
              if (isTerminalDenied) {
                circleColor = "bg-red-500 text-white";
                textColor = "text-red-700 font-semibold";
              } else if (isTerminalRevision) {
                circleColor = "bg-amber-500 text-white";
                textColor = "text-amber-700 font-semibold";
              } else if (isTerminal && permitStatus === "approved") {
                circleColor = "bg-forest text-white";
                textColor = "text-forest font-semibold";
              }
            }

            const StageIcon = stage.icon;
            const label = friendlyLabels ? stage.friendlyLabel : stage.label;

            return (
              <div key={stage.key} className="flex items-center">
                {/* Connector line (before each stage except first) */}
                {idx > 0 && (
                  <div
                    className={cn(
                      "h-0.5 w-6 sm:w-10 shrink-0",
                      isComplete || isCurrent ? (isTerminalDenied ? "bg-red-300" : isTerminalRevision ? "bg-amber-300" : "bg-forest/30") : lineColor
                    )}
                  />
                )}

                {/* Stage node */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                      circleColor
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <StageIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={cn("text-[10px] sm:text-xs text-center whitespace-nowrap", textColor)}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Status detail line ---- */}
        <div className="text-xs text-muted-foreground space-y-0.5">
          {submittedTo && submittedAt && (
            <p>
              Submitted to <span className="font-medium text-foreground">{submittedTo}</span> on{" "}
              {formatDate(submittedAt)}
            </p>
          )}
          {reviewerName && (
            <p>Reviewer: <span className="font-medium text-foreground">{reviewerName}</span></p>
          )}
          {permitStatus === "approved" && approvedAt && (
            <p>Approved on {formatDate(approvedAt)}</p>
          )}
          {permitStatus === "approved" && permitExpiresAt && (
            <p>Permit expires: {formatDate(permitExpiresAt)}</p>
          )}
          {permitStatus === "approved" && conditionsOfApproval && (
            <div className="mt-2 p-2 rounded bg-forest/5 border border-forest/10 text-xs text-forest">
              <p className="font-medium mb-1">Conditions of Approval</p>
              <p className="whitespace-pre-wrap">{conditionsOfApproval}</p>
            </div>
          )}
          {permitStatus === "denied" && denialReason && (
            <div className="mt-2 p-2 rounded bg-red-50 border border-red-100 text-xs text-red-800">
              <p className="font-medium mb-1">Reason for Denial</p>
              <p className="whitespace-pre-wrap">{denialReason}</p>
            </div>
          )}
          {permitStatus === "revision_requested" && reviewerNotes && (
            <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-100 text-xs text-amber-800">
              <p className="font-medium mb-1">Reviewer Notes</p>
              <p className="whitespace-pre-wrap">{reviewerNotes}</p>
            </div>
          )}
        </div>

        {/* ---- Interactive form section (arborist only) ---- */}
        {mode === "interactive" && (
          <div className="pt-2 border-t">
            {/* Stage 0: Mark as Submitted */}
            {currentStage === 0 && (
              <>
                {expandedAction !== "submit" ? (
                  <Button
                    size="sm"
                    className="bg-forest hover:bg-forest-light"
                    onClick={() => setExpandedAction("submit")}
                  >
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Submitted
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="submittedTo" className="text-xs">
                        Submitted to
                      </Label>
                      <Input
                        id="submittedTo"
                        placeholder="e.g. City of Palo Alto Planning Dept"
                        value={formSubmittedTo}
                        onChange={(e) => setFormSubmittedTo(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-forest hover:bg-forest-light"
                        disabled={!formSubmittedTo.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "submitted",
                            submittedAt: new Date().toISOString(),
                            submittedTo: formSubmittedTo.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Submission"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedAction(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Stage 1: Mark as Under Review */}
            {currentStage === 1 && (
              <>
                {expandedAction !== "review" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedAction("review")}
                  >
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Under Review
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="reviewerName" className="text-xs">
                        Reviewer name (optional)
                      </Label>
                      <Input
                        id="reviewerName"
                        placeholder="e.g. John Smith, Planning Dept"
                        value={formReviewerName}
                        onChange={(e) => setFormReviewerName(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-forest hover:bg-forest-light"
                        disabled={saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "under_review",
                            ...(formReviewerName.trim() && { reviewerName: formReviewerName.trim() }),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedAction(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Stage 2: Record decision */}
            {currentStage === 2 && (
              <>
                {!expandedAction ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-forest hover:bg-forest-light"
                      onClick={() => setExpandedAction("approved")}
                    >
                      <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                      Approved
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => setExpandedAction("denied")}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Denied
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => setExpandedAction("revision")}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                      Revision Requested
                    </Button>
                  </div>
                ) : expandedAction === "approved" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="conditions" className="text-xs">
                        Conditions of approval (optional)
                      </Label>
                      <Textarea
                        id="conditions"
                        placeholder="e.g. Plant 2 replacement trees within 6 months"
                        value={formConditions}
                        onChange={(e) => setFormConditions(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="expiresAt" className="text-xs">
                        Permit expiration date (optional)
                      </Label>
                      <Input
                        id="expiresAt"
                        type="date"
                        value={formExpiresAt}
                        onChange={(e) => setFormExpiresAt(e.target.value)}
                        className="text-sm w-48"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-forest hover:bg-forest-light"
                        disabled={saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "approved",
                            approvedAt: new Date().toISOString(),
                            ...(formConditions.trim() && { conditionsOfApproval: formConditions.trim() }),
                            ...(formExpiresAt && { permitExpiresAt: new Date(formExpiresAt).toISOString() }),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Approval"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : expandedAction === "denied" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="denialReason" className="text-xs">
                        Reason for denial
                      </Label>
                      <Textarea
                        id="denialReason"
                        placeholder="Enter the reason provided by the city..."
                        value={formDenialReason}
                        onChange={(e) => setFormDenialReason(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={!formDenialReason.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "denied",
                            denialReason: formDenialReason.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Denial"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : expandedAction === "revision" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="reviewerNotes" className="text-xs">
                        Reviewer notes / required changes
                      </Label>
                      <Textarea
                        id="reviewerNotes"
                        placeholder="What changes did the city request?"
                        value={formReviewerNotes}
                        onChange={(e) => setFormReviewerNotes(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700"
                        disabled={!formReviewerNotes.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "revision_requested",
                            reviewerNotes: formReviewerNotes.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {/* Stage 3: Terminal — allow reset for denied/revision */}
            {currentStage === 3 && (permitStatus === "denied" || permitStatus === "revision_requested") && (
              <Button
                size="sm"
                variant="outline"
                disabled={saving}
                onClick={() =>
                  handleUpdate({
                    permitStatus: "under_review",
                    denialReason: null,
                    reviewerNotes: null,
                  })
                }
              >
                <ChevronRight className="h-3.5 w-3.5 mr-1.5" />
                {saving ? "Saving..." : "Reset to Under Review"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
