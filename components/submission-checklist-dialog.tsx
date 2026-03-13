"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getSubmissionConfig,
  getGenericSubmissionConfig,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/lib/city-submission-requirements";
import type {
  SubmissionRequirement,
  CitySubmissionConfig,
} from "@/lib/city-submission-requirements";
import { getCityContact } from "@/lib/city-contacts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreePhoto {
  id: string;
  url: string;
  caption?: string | null;
  category?: string | null;
}

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  treePhotos?: TreePhoto[];
}

interface ReportData {
  id: string;
  status: string;
  reportType: string;
}

interface AutoCheckResult {
  id: string;
  passed: boolean;
  message?: string;
  actionableTreeNumbers?: number[];
}

interface SubmissionChecklistState {
  cityName: string;
  checkedItems: string[];
  autoCheckedItems: string[];
  submittedTo: string;
  isGeneric: boolean;
  completedAt?: string;
}

interface SubmissionChecklistDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmSubmission: (data: {
    permitStatus: string;
    submittedAt: string;
    submittedTo: string;
    submissionChecklist: string;
  }) => Promise<void>;
  onSaveChecklist: (checklist: string) => Promise<void>;
  cityName: string;
  reportType: string;
  report: ReportData;
  trees: TreeRecord[];
  initialChecklist?: string | null;
}

// ---------------------------------------------------------------------------
// Auto-check logic
// ---------------------------------------------------------------------------

function runAutoChecks(
  report: ReportData,
  trees: TreeRecord[]
): AutoCheckResult[] {
  const results: AutoCheckResult[] = [];

  // 1. Certified report
  results.push({
    id: "certified_report",
    passed: report.status === "certified",
    message:
      report.status !== "certified" ? "Report not yet certified" : undefined,
  });

  // 2. Photos attached (every tree has at least 1 photo)
  const treesWithoutPhotos = trees.filter((t) => !t.treePhotos?.length);
  results.push({
    id: "photos_attached",
    passed: treesWithoutPhotos.length === 0,
    message:
      treesWithoutPhotos.length > 0
        ? `${treesWithoutPhotos.length} tree${treesWithoutPhotos.length > 1 ? "s" : ""} missing photos (${treesWithoutPhotos.map((t) => `#${t.treeNumber}`).join(", ")})`
        : undefined,
    actionableTreeNumbers: treesWithoutPhotos.map((t) => t.treeNumber),
  });

  return results;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SubmissionChecklistDialog({
  open,
  onClose,
  onConfirmSubmission,
  onSaveChecklist,
  cityName,
  reportType,
  report,
  trees,
  initialChecklist,
}: SubmissionChecklistDialogProps) {
  // Load city config
  const config: CitySubmissionConfig = useMemo(() => {
    return getSubmissionConfig(cityName) || getGenericSubmissionConfig(cityName);
  }, [cityName]);

  const isGeneric = useMemo(
    () => !getSubmissionConfig(cityName),
    [cityName]
  );

  // Load city contact info
  const cityContact = useMemo(
    () => getCityContact(cityName, reportType),
    [cityName, reportType]
  );

  // Run auto-checks
  const autoChecks = useMemo(
    () => runAutoChecks(report, trees),
    [report, trees]
  );

  // Initialize checked items
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize from saved state or auto-checks
  useEffect(() => {
    const initial = new Set<string>();

    // Restore saved checklist
    if (initialChecklist) {
      try {
        const saved: SubmissionChecklistState = JSON.parse(initialChecklist);
        if (saved.checkedItems) {
          saved.checkedItems.forEach((id) => initial.add(id));
        }
      } catch {
        // ignore parse errors
      }
    }

    // Apply auto-checks (override saved state if auto-check passes)
    for (const check of autoChecks) {
      if (check.passed) {
        // Find which requirements use this auto-check
        for (const req of config.requirements) {
          if (req.autoCheckId === check.id) {
            initial.add(req.id);
          }
        }
      }
    }

    setCheckedItems(initial);
  }, [initialChecklist, autoChecks, config.requirements]);

  // Group requirements by category
  const groupedRequirements = useMemo(() => {
    const groups: Record<string, SubmissionRequirement[]> = {};
    for (const req of config.requirements) {
      if (!groups[req.category]) {
        groups[req.category] = [];
      }
      groups[req.category].push(req);
    }
    return groups;
  }, [config.requirements]);

  // Check if all required items are checked
  const allRequiredChecked = useMemo(() => {
    return config.requirements
      .filter((r) => r.required)
      .every((r) => checkedItems.has(r.id));
  }, [config.requirements, checkedItems]);

  // Get auto-check result for a requirement
  const getAutoCheck = useCallback(
    (req: SubmissionRequirement): AutoCheckResult | undefined => {
      if (!req.autoCheckId) return undefined;
      return autoChecks.find((ac) => ac.id === req.autoCheckId);
    },
    [autoChecks]
  );

  // Toggle a checkbox
  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Build checklist JSON
  const buildChecklistJson = useCallback(
    (completedAt?: string): string => {
      const autoCheckedIds = autoChecks
        .filter((ac) => ac.passed)
        .flatMap((ac) =>
          config.requirements
            .filter((r) => r.autoCheckId === ac.id)
            .map((r) => r.id)
        );

      const state: SubmissionChecklistState = {
        cityName: config.cityName,
        checkedItems: Array.from(checkedItems),
        autoCheckedItems: autoCheckedIds,
        submittedTo:
          cityContact?.department || config.cityName + " Planning Department",
        isGeneric,
        ...(completedAt ? { completedAt } : {}),
      };
      return JSON.stringify(state);
    },
    [checkedItems, autoChecks, config, cityContact, isGeneric]
  );

  // Save progress
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await onSaveChecklist(buildChecklistJson());
    } finally {
      setSaving(false);
    }
  }, [onSaveChecklist, buildChecklistJson]);

  // Confirm submission
  const handleConfirm = useCallback(async () => {
    setSubmitting(true);
    try {
      const submittedTo =
        cityContact?.department || config.cityName + " Planning Department";
      await onConfirmSubmission({
        permitStatus: "submitted",
        submittedAt: new Date().toISOString(),
        submittedTo,
        submissionChecklist: buildChecklistJson(new Date().toISOString()),
      });
    } finally {
      setSubmitting(false);
    }
  }, [onConfirmSubmission, cityContact, config.cityName, buildChecklistJson]);

  if (!open) return null;

  const requiredCount = config.requirements.filter((r) => r.required).length;
  const checkedRequiredCount = config.requirements.filter(
    (r) => r.required && checkedItems.has(r.id)
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Dialog card */}
      <div
        className={cn(
          "relative bg-background w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl",
          "max-h-[92vh] sm:max-h-[85vh] flex flex-col",
          "animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-200"
        )}
      >
        {/* ── Header ── */}
        <div className="flex-none px-5 pt-5 pb-3 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold font-display text-foreground">
                Submission Checklist
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isGeneric
                  ? "Common submission requirements"
                  : config.cityName}
                {cityContact?.department && !isGeneric && (
                  <span> &mdash; {cityContact.department}</span>
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 -mr-1 -mt-1"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Unverified warning */}
          {!config.isVerified && (
            <div className="flex items-start gap-2 mt-3 rounded-md bg-amber-50 border border-amber-200 px-3 py-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800">
                {isGeneric
                  ? `Requirements for ${config.cityName} are not yet configured. Contact the city directly to confirm their specific requirements.`
                  : "Requirements may vary \u2014 confirm with city before submitting."}
              </p>
            </div>
          )}

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D4E3E] rounded-full transition-all duration-300"
                style={{
                  width: `${requiredCount > 0 ? (checkedRequiredCount / requiredCount) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {checkedRequiredCount}/{requiredCount}
            </span>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Requirement groups */}
          {CATEGORY_ORDER.map((category) => {
            const items = groupedRequirements[category];
            if (!items?.length) return null;

            return (
              <div key={category}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  {CATEGORY_LABELS[category]}
                </h3>
                <div className="space-y-1">
                  {items.map((req) => {
                    const autoCheck = getAutoCheck(req);
                    const isAutoVerified = autoCheck?.passed === true;
                    const isAutoFailed = autoCheck?.passed === false;
                    const isChecked = checkedItems.has(req.id);

                    return (
                      <div
                        key={req.id}
                        className={cn(
                          "flex items-start gap-3 rounded-lg px-3 py-3 min-h-[44px] transition-colors",
                          isAutoVerified && "bg-[#1D4E3E]/5",
                          isAutoFailed && "bg-amber-50",
                          !isAutoVerified && !isAutoFailed && "hover:bg-neutral-50"
                        )}
                      >
                        {/* Checkbox or auto-check icon */}
                        <div className="pt-0.5 shrink-0">
                          {isAutoVerified ? (
                            <CheckCircle2 className="h-5 w-5 text-[#1D4E3E]" />
                          ) : isAutoFailed ? (
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleItem(req.id)}
                              className={cn(
                                "h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
                                isChecked
                                  ? "bg-[#1D4E3E] border-[#1D4E3E]"
                                  : "border-neutral-300 hover:border-[#1D4E3E]/50"
                              )}
                            >
                              {isChecked && (
                                <svg
                                  className="h-3 w-3 text-white"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M2.5 6L5 8.5L9.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Label and description */}
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => {
                            if (!isAutoVerified) toggleItem(req.id);
                          }}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isAutoVerified && "text-[#1D4E3E]",
                                isAutoFailed && "text-amber-800"
                              )}
                            >
                              {req.label}
                            </span>
                            {req.required && !isChecked && !isAutoVerified && (
                              <span className="text-[10px] text-red-500 font-medium">
                                Required
                              </span>
                            )}
                            {isAutoVerified && (
                              <span className="text-[10px] text-muted-foreground">
                                Auto-verified
                              </span>
                            )}
                          </div>
                          {req.description && !isAutoFailed && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {req.description}
                            </p>
                          )}
                          {isAutoFailed && autoCheck?.message && (
                            <p className="text-xs text-amber-700 mt-0.5">
                              {autoCheck.message}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Submission info section ── */}
          {(cityContact || config.submissionMethod) && (
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Submission Details
              </h3>

              <div className="space-y-2 text-sm">
                {/* Department */}
                {cityContact?.department && (
                  <div className="flex items-start gap-2">
                    <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      {cityContact.department}
                    </span>
                  </div>
                )}

                {/* Address */}
                {cityContact?.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {cityContact.address}
                    </span>
                  </div>
                )}

                {/* Phone */}
                {cityContact?.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <a
                      href={`tel:${cityContact.phone.replace(/[^\d+]/g, "")}`}
                      className="text-[#1D4E3E] hover:underline"
                    >
                      {cityContact.phone}
                    </a>
                  </div>
                )}

                {/* Email */}
                {cityContact?.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <a
                      href={`mailto:${cityContact.email}`}
                      className="text-[#1D4E3E] hover:underline"
                    >
                      {cityContact.email}
                    </a>
                  </div>
                )}

                {/* Submission method */}
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    {config.submissionMethod}
                  </span>
                </div>

                {/* Processing time */}
                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    {config.typicalProcessingTime}
                  </span>
                </div>

                {/* Submission notes */}
                {config.submissionNotes && (
                  <p className="text-xs italic text-muted-foreground pl-5">
                    {config.submissionNotes}
                  </p>
                )}

                {/* Portal link */}
                {cityContact?.portalUrl && (
                  <a
                    href={cityContact.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#1D4E3E] hover:underline pl-5"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open city portal
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className="flex-none px-5 py-4 border-t bg-neutral-50/50 sm:rounded-b-xl rounded-b-none">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="bg-[#1D4E3E] hover:bg-[#2A6B55] flex-1 sm:flex-none"
              disabled={!allRequiredChecked || submitting}
              onClick={handleConfirm}
            >
              {submitting ? "Submitting..." : "Confirm Submission"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none"
            >
              {saving ? "Saving..." : "Save Progress"}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="sm:ml-auto text-muted-foreground"
            >
              Cancel
            </Button>
          </div>
          {!allRequiredChecked && (
            <p className="text-xs text-muted-foreground mt-2">
              Check all required items to enable submission
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Read-only summary (for post-submission view)
// ---------------------------------------------------------------------------

interface SubmissionChecklistSummaryProps {
  checklistJson: string;
}

export function SubmissionChecklistSummary({
  checklistJson,
}: SubmissionChecklistSummaryProps) {
  let state: SubmissionChecklistState;
  try {
    state = JSON.parse(checklistJson);
  } catch {
    return null;
  }

  if (!state.completedAt) return null;

  const config =
    getSubmissionConfig(state.cityName) ||
    getGenericSubmissionConfig(state.cityName);
  const totalRequired = config.requirements.filter((r) => r.required).length;
  const checkedSet = new Set(state.checkedItems);
  const autoSet = new Set(state.autoCheckedItems);

  return (
    <details className="border rounded-lg text-sm mb-4 overflow-hidden">
      <summary className="flex items-center gap-2 cursor-pointer font-medium px-4 py-3 hover:bg-neutral-50">
        <CheckCircle2 className="h-4 w-4 text-[#1D4E3E] shrink-0" />
        <span>Submission Checklist &mdash; {state.cityName}</span>
        <span className="text-xs text-muted-foreground ml-auto font-mono">
          {state.checkedItems.length}/{totalRequired} verified
        </span>
      </summary>
      <div className="px-4 pb-3 space-y-1 border-t">
        {config.requirements.map((req) => {
          const isChecked = checkedSet.has(req.id);
          const isAuto = autoSet.has(req.id);

          return (
            <div
              key={req.id}
              className="flex items-center gap-2 py-1.5 text-sm"
            >
              {isChecked ? (
                <CheckCircle2
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isAuto ? "text-[#1D4E3E]" : "text-[#1D4E3E]/70"
                  )}
                />
              ) : (
                <div className="h-4 w-4 rounded border-2 border-neutral-300 shrink-0" />
              )}
              <span
                className={cn(
                  isChecked
                    ? "text-foreground"
                    : "text-muted-foreground line-through"
                )}
              >
                {req.label}
              </span>
              {isAuto && (
                <span className="text-[10px] text-muted-foreground">
                  Auto-verified
                </span>
              )}
            </div>
          );
        })}
        <div className="pt-2 text-xs text-muted-foreground">
          Submitted to {state.submittedTo} on{" "}
          {new Date(state.completedAt).toLocaleDateString()}
        </div>
      </div>
    </details>
  );
}
