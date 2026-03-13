"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportPreview } from "@/components/report-preview";
import { SectionEditor } from "@/components/section-editor";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { getReportTypeConfig } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Sparkles,
  Save,
  CheckCircle2,
  Loader2,
  Download,
  FileDown,
  Lock,
  Unlock,
  RefreshCw,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Share2,
  Send,
  Settings2,
  X,
  ClipboardCheck,
  ExternalLink,
  History,
  RotateCcw,
  Trash2,
  DollarSign,
  CheckCircle,
  Home,
  Mail,
  FileEdit,
  BadgeCheck,
  Flag,
  Smartphone,
  MoreVertical,
  BookOpen,
  Search,
} from "lucide-react";
import { OnboardingHint } from "@/components/onboarding-hint";
import { parseReportSections, replaceTreeSection } from "@/lib/report-sections";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";
import {
  SubmissionChecklistDialog,
  SubmissionChecklistSummary,
} from "@/components/submission-checklist-dialog";
import { QuickReview, ReviewFlag } from "@/components/quick-review";
import { useToast } from "@/hooks/use-toast";

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
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt?: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  isProtected: boolean;
  protectionReason?: string | null;
  recommendedAction: string;
  status: string;
  tagNumber?: string | null;
  treePhotos?: TreePhoto[];
  // Valuation fields
  valuationUnitPrice?: number | null;
  valuationHealthRating?: number | null;
  valuationStructureRating?: number | null;
  valuationFormRating?: number | null;
  valuationConditionRating?: number | null;
  valuationSpeciesRating?: number | null;
  valuationSiteRating?: number | null;
  valuationContributionRating?: number | null;
  valuationLocationRating?: number | null;
  valuationBasicValue?: number | null;
  valuationAppraisedValue?: number | null;
  valuationNotes?: string | null;
  // Type-specific
  typeSpecificData?: string | null;
  mitigationRequired?: string | null;
}

interface Property {
  id: string;
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
  reportType?: string;
  homeownerName?: string | null;
  homeownerEmail?: string | null;
  trees: TreeRecord[];
  reports: Report[];
}

interface Report {
  id: string;
  propertyId: string;
  reportType: string;
  aiDraftContent: string | null;
  finalContent: string | null;
  eSignatureText: string | null;
  certifiedAt: string | null;
  status: string;
  reportOptions?: string;
  // Permit lifecycle
  permitStatus: string | null;
  submittedAt: string | null;
  submittedTo: string | null;
  reviewerName: string | null;
  reviewerNotes: string | null;
  conditionsOfApproval: string | null;
  denialReason: string | null;
  approvedAt: string | null;
  permitExpiresAt: string | null;
  submissionChecklist: string | null;
  reviewFlags: string | null;
  clientNote: string | null;
  // Real estate package fields
  reListingAddress?: string | null;
  reRealtorName?: string | null;
  reRealtorEmail?: string | null;
  reRealtorPhone?: string | null;
  reRealtorCompany?: string | null;
  reListingPrice?: number | null;
  rePackageNotes?: string | null;
  // Amendment tracking
  amendmentReason: string | null;
  amendmentNumber: number;
  originalCertifiedAt: string | null;
}

interface ReportOptions {
  includeTraq?: boolean;
  includeCoverLetter?: boolean;
  includeMitigation?: boolean;
  includeSiteMap?: boolean;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  signatureName?: string | null;
  traqCertified?: boolean;
  additionalCerts?: string | null;
  licenseNumbers?: string | null;
  valuationLimitingConditions?: string | null;
  // Billing defaults
  showBillingOnShare?: boolean;
  defaultReportFee?: number | null;
  billingPaymentInstructions?: string | null;
}

interface ValidationCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  message: string;
  fixPath?: string;
}

interface ValidationResult {
  checks: ValidationCheck[];
  hasFailures: boolean;
  hasWarnings: boolean;
  allPassed: boolean;
}

interface ReportVersionItem {
  id: string;
  label: string;
  content: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PropertyReportPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Data state
  const [property, setProperty] = useState<Property | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [arborist, setArborist] = useState<ArboristInfo | null>(null);
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");

  // Certification state
  const [signatureText, setSignatureText] = useState("");
  const [certifyAgreed, setCertifyAgreed] = useState(false);
  const [showCertifyPanel, setShowCertifyPanel] = useState(false);
  const [certifyStep, setCertifyStep] = useState(1); // 1=Review, 2=Attest, 3=Sign
  const [reviewChecked, setReviewChecked] = useState(false);
  const [certifySuccess, setCertifySuccess] = useState(false);
  const [showCertifyCompletion, setShowCertifyCompletion] = useState(false);
  const [showSubmissionChecklist, setShowSubmissionChecklist] = useState(false);

  // UI state
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certifying, setCertifying] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewMode, setViewMode] = useState<"editor" | "preview" | "quickReview">("editor");
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [qualityWarnings, setQualityWarnings] = useState<string[]>([]);
  const [streamingText, setStreamingText] = useState("");

  // Client note (shown on share page)
  const [clientNote, setClientNote] = useState("");
  // Report options state (PDF appendix toggles)
  const [reportOptions, setReportOptions] = useState<ReportOptions>({});

  // Delete report state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingReport, setDeletingReport] = useState(false);

  // Billing state
  const [billingAmount, setBillingAmount] = useState("");
  const [billingPaymentInstructions, setBillingPaymentInstructions] = useState("");
  const [billingIncluded, setBillingIncluded] = useState(false);
  const [billingPaidAt, setBillingPaidAt] = useState<string | null>(null);

  // Share dialog state
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [savingShare, setSavingShare] = useState(false);

  // Listing info state (real_estate_package only)
  const [reListingAddress, setReListingAddress] = useState("");
  const [reRealtorName, setReRealtorName] = useState("");
  const [reRealtorEmail, setReRealtorEmail] = useState("");
  const [reRealtorPhone, setReRealtorPhone] = useState("");
  const [reRealtorCompany, setReRealtorCompany] = useState("");
  const [reListingPrice, setReListingPrice] = useState("");
  const [rePackageNotes, setRePackageNotes] = useState("");
  const [savingListing, setSavingListing] = useState(false);

  // Report delivery state
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Per-tree regeneration state
  const [regeneratingTree, setRegeneratingTree] = useState<number | null>(null);
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState<number | null>(null);

  // Amendment state
  const [showAmendDialog, setShowAmendDialog] = useState(false);
  const [amendmentReason, setAmendmentReason] = useState("");
  const [issuingAmendment, setIssuingAmendment] = useState(false);

  // Pre-certification validation state
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const [warningsAcknowledged, setWarningsAcknowledged] = useState(false);

  // Version history state
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState<ReportVersionItem[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [previewVersion, setPreviewVersion] = useState<ReportVersionItem | null>(null);
  const [showVersionPreview, setShowVersionPreview] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [reportCost, setReportCost] = useState<number | null>(null);

  // Template insert state
  interface DocTemplate {
    id: string;
    name: string;
    content: string;
    category: string | null;
    cityTag: string | null;
    reportTypeTag: string | null;
    usageCount: number;
  }
  const [showTemplatePanel, setShowTemplatePanel] = useState(false);
  const [editorTemplates, setEditorTemplates] = useState<DocTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templateSearch, setTemplateSearch] = useState("");
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [savingNewTemplate, setSavingNewTemplate] = useState(false);
  const [newTemplateForm, setNewTemplateForm] = useState({ name: "", content: "", category: "", cityTag: "", reportTypeTag: "" });

  // Refs
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedContentRef = useRef("");
  const lastSavedRef = useRef<Date | null>(null);
  const generationStartRef = useRef<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Derived state
  const isCertified = report?.status === "certified" || report?.status === "filed";
  const isAmending = report?.status === "amendment_in_progress";
  const parsedTreeSections = useMemo(() => parseReportSections(content), [content]);

  // -------------------------------------------------------------------------
  // Load data
  // -------------------------------------------------------------------------

  useEffect(() => {
    async function loadData() {
      try {
        const [propRes, arbRes] = await Promise.all([
          fetch(`/api/properties/${propertyId}`),
          fetch("/api/arborist/profile"),
        ]);

        if (!propRes.ok) throw new Error("Failed to load property");
        const data = await propRes.json();
        setProperty(data);
        setReportType(data.reportType || "health_assessment");

        if (arbRes.ok) {
          const arbData = await arbRes.json();
          setArborist(arbData);
        }

        if (data.reports && data.reports.length > 0) {
          const r = data.reports[0];
          setReport(r);
          const c = r.finalContent || r.aiDraftContent || "";
          setContent(c);
          savedContentRef.current = c;
          setReportType(r.reportType);
          // Check query param for Quick Review entry
          const requestedView = searchParams.get("view");
          if (requestedView === "quickReview") {
            setViewMode("quickReview");
          } else {
            setViewMode(r.status === "certified" || r.status === "filed" ? "preview" : "editor");
          }
          // Parse report options
          try {
            setReportOptions(JSON.parse(r.reportOptions || "{}"));
          } catch { /* default empty */ }
          setClientNote(r.clientNote ?? "");
          // Initialize listing info state (real_estate_package)
          setReListingAddress(r.reListingAddress ?? "");
          setReRealtorName(r.reRealtorName ?? "");
          setReRealtorEmail(r.reRealtorEmail ?? "");
          setReRealtorPhone(r.reRealtorPhone ?? "");
          setReRealtorCompany(r.reRealtorCompany ?? "");
          setReListingPrice(r.reListingPrice != null ? String(r.reListingPrice) : "");
          setRePackageNotes(r.rePackageNotes ?? "");
          // Initialize billing state
          setBillingAmount(r.billingAmount != null ? String(r.billingAmount) : "");
          setBillingPaymentInstructions(r.billingPaymentInstructions ?? "");
          setBillingIncluded(r.billingIncluded ?? false);
          setBillingPaidAt(r.billingPaidAt ?? null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  // Fetch per-report API cost
  useEffect(() => {
    if (!report?.id) return;
    fetch(`/api/reports/usage?reportId=${report.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.totalCost != null) setReportCost(data.totalCost);
      })
      .catch((err) => { console.error("Report usage fetch failed:", err); });
  }, [report?.id]);

  // -------------------------------------------------------------------------
  // Fetch validation checks
  // -------------------------------------------------------------------------

  const fetchValidation = useCallback(async (reportId: string) => {
    setValidationLoading(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/validate`);
      if (res.ok) {
        const data = await res.json();
        setValidationResult(data);
      }
    } catch (err) {
      console.error("Validation fetch failed:", err);
    } finally {
      setValidationLoading(false);
    }
  }, []);

  // Run validation when report is loaded and not yet certified
  useEffect(() => {
    if (report && report.status !== "certified" && report.status !== "filed") {
      fetchValidation(report.id);
    }
  }, [report?.id, report?.status, fetchValidation]);

  // -------------------------------------------------------------------------
  // Debounced preview (500ms)
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Content change handler
  // -------------------------------------------------------------------------

  const handleContentChange = useCallback(
    (value: string) => {
      setContent(value);
      setHasUnsavedChanges(value !== savedContentRef.current);
    },
    []
  );

  // -------------------------------------------------------------------------
  // Save report
  // -------------------------------------------------------------------------

  const saveReport = useCallback(
    async (silent = false) => {
      if (!report || (isCertified && !isAmending)) return;
      if (!silent) setSaving(true);
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalContent: content,
            status: report.status === "draft" ? "review" : report.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to save");
        const updated = await res.json();
        setReport(updated);
        savedContentRef.current = content;
        setHasUnsavedChanges(false);
        const now = new Date();
        setLastSaved(now);
        lastSavedRef.current = now;
      } catch (err) {
        console.error("Save failed:", err);
        if (!silent) {
          setError("Couldn\u2019t save \u2014 check your connection and try again");
        }
      } finally {
        if (!silent) setSaving(false);
      }
    },
    [report, isCertified, content]
  );

  // -------------------------------------------------------------------------
  // Update permit status
  // -------------------------------------------------------------------------

  const updatePermitStatus = useCallback(
    async (data: Record<string, unknown>) => {
      if (!report) return;
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update permit status");
        const updated = await res.json();
        setReport(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update permit status");
      }
    },
    [report]
  );

  const saveListingInfo = useCallback(async () => {
    if (!report) return;
    setSavingListing(true);
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reListingAddress: reListingAddress || null,
          reRealtorName: reRealtorName || null,
          reRealtorEmail: reRealtorEmail || null,
          reRealtorPhone: reRealtorPhone || null,
          reRealtorCompany: reRealtorCompany || null,
          reListingPrice: reListingPrice ? parseFloat(reListingPrice) : null,
          rePackageNotes: rePackageNotes || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save listing info");
      const updated = await res.json();
      setReport(updated);
      toast({ title: "Listing info saved" });
    } catch (err) {
      toast({
        title: "Failed to save listing info",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingListing(false);
    }
  }, [report, reListingAddress, reRealtorName, reRealtorEmail, reRealtorPhone, reRealtorCompany, reListingPrice, rePackageNotes, toast]);

  // -------------------------------------------------------------------------
  // Auto-save every 30s
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!report || (isCertified && !isAmending)) return;

    autoSaveRef.current = setInterval(() => {
      if (savedContentRef.current !== content) {
        saveReport(true);
      }
    }, 30000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [report, isCertified, isAmending, content, saveReport]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Refresh "saved X ago" text
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // -------------------------------------------------------------------------
  // Data quality check
  // -------------------------------------------------------------------------

  function assessDataQuality(trees: TreeRecord[]) {
    const warnings: string[] = [];
    const treesWithoutNotes: number[] = [];
    const treesWithoutCondition: number[] = [];
    const treesWithoutDBH: number[] = [];

    trees.forEach((tree) => {
      if (!tree.healthNotes && !tree.structuralNotes) {
        treesWithoutNotes.push(tree.treeNumber);
      }
      if (!tree.conditionRating || tree.conditionRating === 0) {
        treesWithoutCondition.push(tree.treeNumber);
      }
      if (!tree.dbhInches || tree.dbhInches === 0) {
        treesWithoutDBH.push(tree.treeNumber);
      }
    });

    if (treesWithoutDBH.length > 0) {
      warnings.push(
        `Tree${treesWithoutDBH.length > 1 ? "s" : ""} #${treesWithoutDBH.join(", #")} missing DBH measurement`
      );
    }
    if (treesWithoutCondition.length > 0) {
      warnings.push(
        `Tree${treesWithoutCondition.length > 1 ? "s" : ""} #${treesWithoutCondition.join(", #")} missing condition rating`
      );
    }
    if (treesWithoutNotes.length > 0) {
      warnings.push(
        `Tree${treesWithoutNotes.length > 1 ? "s" : ""} #${treesWithoutNotes.join(", #")} have no health or structural notes \u2014 the AI will generate generic observations`
      );
    }

    return warnings;
  }

  const handleGenerateClick = () => {
    if (!property) return;
    const warnings = assessDataQuality(property.trees);
    if (warnings.length > 0) {
      setQualityWarnings(warnings);
      setShowQualityDialog(true);
    } else {
      generateReport();
    }
  };

  // -------------------------------------------------------------------------
  // Generate report
  // -------------------------------------------------------------------------

  // Elapsed time counter for AI generation
  useEffect(() => {
    if (!generating) {
      setElapsedSeconds(0);
      return;
    }
    generationStartRef.current = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - generationStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [generating]);

  const generateReport = async () => {
    setGenerating(true);
    setStreamingText("");
    setError(null);

    // 90-second timeout — abort if AI takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90_000);

    try {
      const res = await fetch("/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, reportType }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to generate report" }));
        throw new Error(data.error || "Failed to generate report");
      }

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("text/event-stream") && res.body) {
        // Streaming SSE path
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";
        let receivedDone = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last potentially incomplete line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            let payload;
            try {
              payload = JSON.parse(line.slice(6));
            } catch {
              // Skip malformed SSE lines
              continue;
            }
            if (payload.type === "text") {
              accumulated += payload.text;
              setStreamingText(accumulated);
            } else if (payload.type === "done") {
              receivedDone = true;
              // Report saved on server — set it locally
              setReport({
                id: payload.reportId,
                propertyId,
                reportType,
                aiDraftContent: accumulated,
                finalContent: null,
                eSignatureText: null,
                certifiedAt: null,
                status: "draft",
                clientNote: null,
                permitStatus: null,
                submittedAt: null,
                submittedTo: null,
                reviewerName: null,
                reviewerNotes: null,
                conditionsOfApproval: null,
                denialReason: null,
                approvedAt: null,
                permitExpiresAt: null,
                submissionChecklist: null,
                reviewFlags: null,
                amendmentReason: null,
                amendmentNumber: 0,
                originalCertifiedAt: null,
              });
              setContent(accumulated);
              savedContentRef.current = accumulated;
              setViewMode("editor");
            } else if (payload.type === "error") {
              throw new Error(payload.error || "Report generation failed");
            }
          }
        }

        // Stream ended — check if we actually got a completed report
        if (!receivedDone) {
          if (accumulated.length > 0) {
            // AI generated text but server couldn't save — try to reload
            // the property in case the report was saved before the stream dropped
            try {
              const reloadRes = await fetch(`/api/properties/${propertyId}`);
              if (reloadRes.ok) {
                const reloadData = await reloadRes.json();
                if (reloadData.reports && reloadData.reports.length > 0) {
                  const r = reloadData.reports[0];
                  setReport(r);
                  const c = r.finalContent || r.aiDraftContent || "";
                  setContent(c);
                  savedContentRef.current = c;
                  setViewMode("editor");
                  return; // Report was saved — proceed normally
                }
              }
            } catch {
              // Reload failed — fall through to error
            }
            throw new Error("Report generation completed but the connection was interrupted. Please try again.");
          } else {
            throw new Error("Report generation failed — no response received from AI. Please try again.");
          }
        }
      } else {
        // Non-streaming JSON path (mock fallback)
        const newReport = await res.json();
        setReport(newReport);
        const c = newReport.aiDraftContent || "";
        setContent(c);
        savedContentRef.current = c;
        setViewMode("editor");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Report generation timed out after 90 seconds. This can happen with large assessments or slow connections. Please try again.");
      } else {
        setError(err instanceof Error ? err.message : "Generation failed");
      }
    } finally {
      clearTimeout(timeoutId);
      setGenerating(false);
      setStreamingText("");
    }
  };

  const regenerateReport = () => {
    if (
      !window.confirm(
        "Regenerating will replace the current AI draft. Your edits will be lost. Continue?"
      )
    )
      return;
    generateReport();
  };

  // -------------------------------------------------------------------------
  // Per-tree regeneration
  // -------------------------------------------------------------------------

  const handleRegenerateTree = async (treeNumber: number) => {
    if (!report || !property) return;
    const tree = property.trees.find((t) => t.treeNumber === treeNumber);
    if (!tree) return;

    setRegeneratingTree(treeNumber);
    setShowRegenerateConfirm(null);
    try {
      const res = await fetch("/api/ai/regenerate-tree-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: report.id,
          treeId: tree.id,
          treeNumber,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed" }));
        throw new Error(data.error || "Failed to regenerate tree section");
      }
      const data = await res.json();
      try {
        const newContent = replaceTreeSection(content, treeNumber, data.content);
        handleContentChange(newContent);
        toast({ title: `Tree #${treeNumber} section regenerated` });
      } catch {
        toast({
          title: "Unable to identify tree sections",
          description: "Use full report regeneration instead.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Regeneration failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegeneratingTree(null);
    }
  };

  // -------------------------------------------------------------------------
  // Issue amendment
  // -------------------------------------------------------------------------

  const issueAmendment = async () => {
    if (!report || !amendmentReason.trim()) return;
    setIssuingAmendment(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/amend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: amendmentReason.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed" }));
        throw new Error(data.error || "Failed to issue amendment");
      }
      const updated = await res.json();
      setReport(updated);
      setShowAmendDialog(false);
      setAmendmentReason("");
      setViewMode("editor");
      toast({ title: `Amendment #${updated.amendmentNumber} issued`, description: "The report is now open for editing." });
    } catch (err) {
      toast({
        title: "Amendment failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIssuingAmendment(false);
    }
  };

  // -------------------------------------------------------------------------
  // Certify report
  // -------------------------------------------------------------------------

  const certifyReport = async () => {
    if (!report || !signatureText.trim() || !certifyAgreed) return;
    setCertifying(true);
    try {
      // Save content first
      await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalContent: content, status: "review" }),
      });

      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eSignatureText: signatureText.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        if (errData?.validation) {
          setValidationResult(errData.validation);
        }
        throw new Error(errData?.error || "Failed to certify");
      }
      const updated = await res.json();
      setReport(updated);
      setCertifySuccess(true);
      savedContentRef.current = content;
      setHasUnsavedChanges(false);
      // Close ceremony dialog and show completion modal
      setShowCertifyPanel(false);
      setViewMode("preview");
      setShowCertifyCompletion(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Certification failed");
    } finally {
      setCertifying(false);
    }
  };

  // -------------------------------------------------------------------------
  // Unlock (uncertify) report
  // -------------------------------------------------------------------------

  const unlockReport = async () => {
    if (
      !window.confirm(
        "Unlocking will revert the report to review status. The certification will be removed. Continue?"
      )
    )
      return;

    if (!report) return;
    setUnlocking(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to unlock");
      const updated = await res.json();
      setReport(updated);
      setViewMode("editor");
      setSignatureText("");
      setCertifyAgreed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unlock failed");
    } finally {
      setUnlocking(false);
    }
  };

  // -------------------------------------------------------------------------
  // Open delivery dialog (pre-fill from property data)
  // -------------------------------------------------------------------------

  const openDeliveryDialog = useCallback(() => {
    if (!property || !report) return;
    const reportLabel =
      getReportTypeConfig(report.reportType)?.label ||
      report.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    setRecipientEmail(property.homeownerEmail || "");
    setEmailSubject(
      `${reportLabel} — ${property.address}, ${property.city}`
    );
    setEmailBody(
      `Dear ${property.homeownerName || "Client"},\n\nPlease find attached the ${reportLabel} for the property at ${property.address}, ${property.city}.\n\nIf you have any questions regarding this report, please don't hesitate to contact me.\n\nBest regards`
    );
    setShowDeliveryDialog(true);
  }, [property, report]);

  // -------------------------------------------------------------------------
  // Share with Client (create share link + copy to clipboard)
  // -------------------------------------------------------------------------

  const handleShareWithClient = useCallback(() => {
    // Pre-fill billing fields from arborist defaults if empty
    if (!billingAmount && arborist?.defaultReportFee) {
      setBillingAmount(String(arborist.defaultReportFee));
    }
    if (!billingPaymentInstructions && arborist?.billingPaymentInstructions) {
      setBillingPaymentInstructions(arborist.billingPaymentInstructions);
    }
    if (arborist?.showBillingOnShare && !billingIncluded && !billingPaidAt) {
      setBillingIncluded(true);
    }
    setShowShareDialog(true);
  }, [arborist, billingAmount, billingPaymentInstructions, billingIncluded, billingPaidAt]);

  const handleShareSubmit = useCallback(async () => {
    if (!propertyId || !report) return;
    setSavingShare(true);
    try {
      // Save client note + billing to report
      const amt = billingAmount ? parseFloat(billingAmount) : null;
      await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientNote: clientNote || null,
          billingAmount: amt,
          billingPaymentInstructions: billingPaymentInstructions || null,
          billingIncluded,
        }),
      });
      // Create share link
      const res = await fetch(`/api/properties/${propertyId}/share`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to create share link");
      const { shareToken } = await res.json();
      const shareUrl = `${window.location.origin}/share/${shareToken}`;
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Share link copied", description: "Paste it in a message or email to send to your client." });
      setShowShareDialog(false);
    } catch {
      toast({ title: "Could not share report", variant: "destructive" });
    } finally {
      setSavingShare(false);
    }
  }, [propertyId, report, clientNote, billingAmount, billingPaymentInstructions, billingIncluded, toast]);

  // -------------------------------------------------------------------------
  // Download PDF helper
  // -------------------------------------------------------------------------

  const handleDownloadPdf = useCallback(async () => {
    if (!report) return;
    setPdfLoading(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/pdf`);
      if (!res.ok) throw new Error(`PDF generation failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${report.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      toast({
        title: "PDF download failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPdfLoading(false);
    }
  }, [report, toast]);

  // -------------------------------------------------------------------------
  // Download Word helper
  // -------------------------------------------------------------------------

  const handleDownloadWord = useCallback(async () => {
    if (!report) return;
    try {
      const res = await fetch(`/api/reports/${report.id}/word`);
      if (!res.ok) throw new Error(`Word export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${report.id}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Word download failed:", err);
      toast({
        title: "Word download failed",
        description: "Could not generate Word document. Please try again.",
        variant: "destructive",
      });
    }
  }, [report, toast]);

  // -------------------------------------------------------------------------
  // Share via native share or download
  // -------------------------------------------------------------------------

  const handleSharePdf = useCallback(async () => {
    if (!report) return;
    const pdfUrl = `/api/reports/${report.id}/pdf`;
    if (navigator.share) {
      try {
        const res = await fetch(pdfUrl);
        const blob = await res.blob();
        const file = new File(
          [blob],
          `report-${report.id}.pdf`,
          { type: "application/pdf" }
        );
        await navigator.share({
          title: `Tree Report — ${property?.address ?? ""}`,
          files: [file],
        });
      } catch {
        // User cancelled share — silent
      }
    } else {
      try {
        const res = await fetch(pdfUrl);
        if (!res.ok) throw new Error("PDF generation failed");
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `report-${report.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("PDF download failed:", err);
        toast({
          title: "PDF download failed",
          description: "Could not generate PDF. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [report, property, toast]);

  // -------------------------------------------------------------------------
  // Version History
  // -------------------------------------------------------------------------

  const loadVersions = useCallback(async () => {
    if (!report) return;
    setVersionsLoading(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/versions`);
      if (res.ok) {
        const data = await res.json();
        setVersions(data);
      }
    } catch {
      // Best-effort
    } finally {
      setVersionsLoading(false);
    }
  }, [report]);

  const openVersionHistory = useCallback(() => {
    setShowVersionHistory(true);
    loadVersions();
  }, [loadVersions]);

  const restoreVersion = useCallback(
    async (version: ReportVersionItem) => {
      if (!report) return;
      setRestoring(true);
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalContent: version.content,
            status: report.status === "draft" ? "review" : report.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to restore");
        const updated = await res.json();
        setReport(updated);
        setContent(version.content);
        savedContentRef.current = version.content;
        setHasUnsavedChanges(false);
        setShowVersionPreview(false);
        setPreviewVersion(null);
        setShowVersionHistory(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Restore failed");
      } finally {
        setRestoring(false);
      }
    },
    [report]
  );

  // -------------------------------------------------------------------------
  // Update report options (PDF appendix toggles)
  // -------------------------------------------------------------------------

  const updateReportOptions = useCallback(
    async (partial: Partial<ReportOptions>) => {
      if (!report) return;
      const updated = { ...reportOptions, ...partial };
      setReportOptions(updated);
      try {
        await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportOptions: JSON.stringify(updated) }),
        });
      } catch {
        // Silently fail — options saved next time report is saved
      }
    },
    [report, reportOptions]
  );

  // -------------------------------------------------------------------------
  // Section nav click — scroll preview to heading
  // -------------------------------------------------------------------------

  // scrollToSection is now handled by SectionEditor component

  // -------------------------------------------------------------------------
  // Render: Loading
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-none border-b bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-neutral-200/70 rounded animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-5 w-48 bg-neutral-200/70 rounded animate-pulse" />
              <div className="h-3 w-32 bg-neutral-200/70 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        Property not found
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: No report yet — generate UI
  // -------------------------------------------------------------------------

  if (!report) {
    return (
      <div>
        <Link
          href={`/properties/${propertyId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {property.address}
        </Link>

        <div className="max-w-lg mx-auto mt-12">
          <Card className="shadow-sm">
            <CardContent className="pt-8 pb-6 px-6 space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-forest/10 mb-4">
                  <Sparkles className="h-7 w-7 text-forest" />
                </div>
                <h2 className="text-xl font-semibold font-display tracking-tight">Generate AI Report</h2>
                <p className="text-sm text-muted-foreground mt-1.5">
                  {property.address}, {property.city}
                </p>
                <Badge variant="outline" className="mt-2">
                  {getReportTypeConfig(reportType)?.label ||
                    reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>

              <div className="rounded-lg bg-forest/5 border border-forest/10 p-4 text-sm text-neutral-700">
                <p className="font-medium mb-2 text-neutral-800">
                  The AI will generate a comprehensive report including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li>Scope of Assignment &amp; Site Observations</li>
                  <li>
                    Tree Inventory table ({property.trees.length} tree{property.trees.length !== 1 ? "s" : ""})
                  </li>
                  <li>Individual Tree Assessments</li>
                  <li>Recommendations &amp; Mitigation</li>
                  <li>Arborist Certification Statement</li>
                </ul>
              </div>

              <OnboardingHint hintId="report_generation" className="mb-2">
                The AI will draft a full report based on your tree data. Review it, then certify when ready.
              </OnboardingHint>

              <Button
                onClick={handleGenerateClick}
                disabled={generating || property.trees.length === 0}
                className="w-full h-12 bg-forest hover:bg-forest-light active:scale-[0.98] transition-all text-base"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Draft
                  </>
                )}
              </Button>

              {property.trees.length === 0 && (
                <p className="text-sm text-amber-600 text-center">
                  Add at least one tree before generating a report.
                </p>
              )}

              {error && !generating && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">
                        Report generation encountered an issue
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        This is usually temporary. Check your connection and try again.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-800 hover:bg-amber-100"
                      onClick={() => {
                        setError(null);
                        generateReport();
                      }}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Data Quality Check Dialog */}
              {showQualityDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="w-full max-w-lg mx-4">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold">Ready to Generate Report</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Property:</span> {property.address}, {property.city}</p>
                        <p><span className="font-medium text-foreground">Report Type:</span> {getReportTypeConfig(reportType)?.label || reportType}</p>
                        <p><span className="font-medium text-foreground">Trees:</span> {property.trees.length} assessed</p>
                      </div>

                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                          <AlertTriangle className="h-4 w-4" />
                          Data Quality Notes
                        </div>
                        <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                          {qualityWarnings.map((w, i) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        The AI will fill in missing details with professional language, but the report will be stronger with complete field data.
                      </p>

                      <div className="flex gap-3 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setShowQualityDialog(false)}
                        >
                          Go Back and Complete
                        </Button>
                        <Button
                          onClick={() => {
                            setShowQualityDialog(false);
                            generateReport();
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Anyway
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Streaming Progress Modal */}
              {generating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1 overflow-hidden gap-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-forest shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold">Generating Report</h3>
                          <p className="text-sm text-muted-foreground">
                            {elapsedSeconds < 5
                              ? "Connecting to AI..."
                              : elapsedSeconds < 15
                                ? "Analyzing tree data..."
                                : elapsedSeconds < 30
                                  ? `Writing ${getReportTypeConfig(reportType)?.label || "report"}...`
                                  : elapsedSeconds < 60
                                    ? "Drafting individual assessments..."
                                    : "Finalizing report — almost done..."}
                          </p>
                        </div>
                      </div>
                      {streamingText ? (
                        <ScrollArea className="flex-1 min-h-0 rounded-lg border bg-muted/30">
                          <div
                            className="p-4 prose prose-sm max-w-none text-sm"
                            dangerouslySetInnerHTML={{
                              __html: renderMarkdownToHtml(streamingText),
                            }}
                          />
                        </ScrollArea>
                      ) : (
                        <div className="flex-1 flex items-center justify-center rounded-lg border bg-muted/30 min-h-[200px]">
                          <div className="text-center text-muted-foreground">
                            <Sparkles className="h-8 w-8 mx-auto mb-2 text-forest/40 animate-pulse" />
                            <p className="text-sm">Preparing report structure...</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {streamingText
                            ? `${streamingText.split(/\s+/).length} words generated`
                            : "Connecting to AI..."}
                        </span>
                        <span>
                          {elapsedSeconds > 0 && `${elapsedSeconds}s · `}
                          {elapsedSeconds > 60
                            ? "Taking longer than usual — hang tight"
                            : "Usually takes 30–60 seconds"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: Report exists — editor / preview
  // -------------------------------------------------------------------------

  const signatureNameMatch =
    arborist?.signatureName &&
    signatureText.trim().toLowerCase() ===
      arborist.signatureName.trim().toLowerCase();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* ---- Header Bar ---- */}
      <div className="flex-none border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/properties/${propertyId}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline truncate max-w-[200px]">{property.address}</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold font-display">Report</h1>
                <StatusBadge status={report.status} />
                <Badge variant="outline" className="text-xs">
                  {getReportTypeConfig(report.reportType)?.label ||
                    report.reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span>
                  {property.address}, {property.city}
                </span>
                {lastSaved && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Saved {timeAgo(lastSaved)}
                  </span>
                )}
                {hasUnsavedChanges && (
                  <span className="text-amber-600 font-medium">
                    Unsaved changes
                  </span>
                )}
                {reportCost != null && reportCost > 0 && (
                  <span className="flex items-center gap-1 text-neutral-400" title="Estimated API cost for this report">
                    <Sparkles className="h-3 w-3" />
                    API: ${reportCost.toFixed(3)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* ---- Draft / Amendment toolbar ---- */}
            {(!isCertified || isAmending) && (
              <>
                {hasUnsavedChanges && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => saveReport(false)}
                    disabled={saving}
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    {saving ? "Saving..." : "Save"}
                  </Button>
                )}

                <Button
                  size="sm"
                  className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
                  onClick={() => {
                    setCertifyStep(1);
                    setReviewChecked(false);
                    setCertifyAgreed(false);
                    setSignatureText("");
                    setCertifySuccess(false);
                    setWarningsAcknowledged(false);
                    if (report) fetchValidation(report.id);
                    setShowCertifyPanel(true);
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Certify Report
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTemplatesLoading(true);
                    setTemplateSearch("");
                    fetch("/api/templates")
                      .then((r) => (r.ok ? r.json() : []))
                      .then((data) => setEditorTemplates(data))
                      .catch(() => setEditorTemplates([]))
                      .finally(() => setTemplatesLoading(false));
                    setShowTemplatePanel(true);
                  }}
                >
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  Templates
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-52">
                        <DropdownMenuItem
                          onClick={() => regenerateReport()}
                          disabled={generating || regeneratingTree !== null}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Full Report
                        </DropdownMenuItem>
                        {parsedTreeSections.treeSections.length > 0 && (
                          <>
                            <DropdownMenuSeparator />
                            {parsedTreeSections.treeSections.map((ts) => {
                              const tree = property?.trees.find((t) => t.treeNumber === ts.treeNumber);
                              return (
                                <DropdownMenuItem
                                  key={ts.treeNumber}
                                  onClick={() => setShowRegenerateConfirm(ts.treeNumber)}
                                  disabled={regeneratingTree !== null}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Tree #{ts.treeNumber}{tree ? ` — ${tree.speciesCommon}` : ""}
                                </DropdownMenuItem>
                              );
                            })}
                          </>
                        )}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Settings2 className="h-4 w-4 mr-2" />
                        Report Options
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-52">
                        <DropdownMenuCheckboxItem
                          checked={reportOptions.includeTraq ?? (reportType === "health_assessment")}
                          onCheckedChange={(checked) => updateReportOptions({ includeTraq: checked })}
                        >
                          TRAQ Risk Assessment
                        </DropdownMenuCheckboxItem>
                        {reportType === "removal_permit" && (
                          <DropdownMenuCheckboxItem
                            checked={reportOptions.includeCoverLetter ?? true}
                            onCheckedChange={(checked) => updateReportOptions({ includeCoverLetter: checked })}
                          >
                            Permit Cover Letter
                          </DropdownMenuCheckboxItem>
                        )}
                        <DropdownMenuCheckboxItem
                          checked={reportOptions.includeMitigation ?? true}
                          onCheckedChange={(checked) => updateReportOptions({ includeMitigation: checked })}
                        >
                          Mitigation Summary
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={reportOptions.includeSiteMap ?? true}
                          onCheckedChange={(checked) => updateReportOptions({ includeSiteMap: checked })}
                        >
                          Site Map
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setViewMode("quickReview")}>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Quick Review
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openVersionHistory}>
                      <History className="h-4 w-4 mr-2" />
                      Version History
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleDownloadPdf} disabled={pdfLoading}>
                      <Download className="h-4 w-4 mr-2" />
                      {pdfLoading ? "Generating PDF..." : "Download PDF"}
                    </DropdownMenuItem>
                    {reportType !== "tree_valuation" && reportType !== "real_estate_package" && (
                      <DropdownMenuItem onClick={handleDownloadWord}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Word
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSharePdf}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share PDF
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* ---- Certified toolbar ---- */}
            {isCertified && !isAmending && (
              <>
                <Button
                  size="sm"
                  className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
                  onClick={handleShareWithClient}
                >
                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                  Share with Client
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPdf}
                  disabled={pdfLoading}
                >
                  {pdfLoading ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : (
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  {pdfLoading ? "Generating..." : "PDF"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={openDeliveryDialog}>
                      <Send className="h-4 w-4 mr-2" />
                      Send via Email
                    </DropdownMenuItem>
                    {reportType === "real_estate_package" && reRealtorEmail && (
                      <DropdownMenuItem asChild>
                        <a
                          href={`mailto:${reRealtorEmail}?subject=${encodeURIComponent(
                            `Tree Canopy Report — ${property?.address ?? ""}`
                          )}&body=${encodeURIComponent(
                            `Hi ${reRealtorName || ""},\n\nPlease find the Certified Tree Canopy Report for ${property?.address ?? "the property"} attached.\n\nBest regards`
                          )}`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email Realtor
                        </a>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setViewMode("quickReview")}>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Quick Review
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setShowAmendDialog(true)}
                      className="text-amber-700 focus:text-amber-700"
                    >
                      <FileEdit className="h-4 w-4 mr-2" />
                      Issue Amendment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={unlockReport} disabled={unlocking}>
                      <Unlock className="h-4 w-4 mr-2" />
                      {unlocking ? "Unlocking..." : "Unlock & Revise"}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={openVersionHistory}>
                      <History className="h-4 w-4 mr-2" />
                      Version History
                    </DropdownMenuItem>
                    {reportType !== "tree_valuation" && reportType !== "real_estate_package" && (
                      <DropdownMenuItem onClick={handleDownloadWord}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Word
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---- Validation Banner (inline, replaces old toolbar indicator) ---- */}
      {(!isCertified || isAmending) && validationResult && !validationLoading && (
        <button
          type="button"
          className={`flex-none border-b px-4 py-2 text-sm flex items-center gap-2 w-full text-left transition-colors ${
            validationResult.hasFailures
              ? "bg-red-50 border-red-200 text-red-800 hover:bg-red-100"
              : validationResult.hasWarnings
              ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
              : "bg-forest/5 border-forest/20 text-forest hover:bg-forest/10"
          }`}
          onClick={() => {
            setCertifyStep(1);
            setReviewChecked(false);
            setCertifyAgreed(false);
            setSignatureText("");
            setCertifySuccess(false);
            setWarningsAcknowledged(false);
            if (report) fetchValidation(report.id);
            setShowCertifyPanel(true);
          }}
        >
          {validationResult.hasFailures ? (
            <>
              <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              {validationResult.checks.filter((c) => c.status === "fail").length} blocking issue{validationResult.checks.filter((c) => c.status === "fail").length !== 1 ? "s" : ""} — click to review
            </>
          ) : validationResult.hasWarnings ? (
            <>
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
              {validationResult.checks.filter((c) => c.status === "warning").length} warning{validationResult.checks.filter((c) => c.status === "warning").length !== 1 ? "s" : ""} — click to review
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
              Ready to certify
            </>
          )}
        </button>
      )}

      {/* ---- Error Bar ---- */}
      {error && report && (
        <div className="flex-none border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
          {error}
          {error.includes("save") || error.includes("connection") ? (
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto h-7 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
              onClick={() => { setError(null); saveReport(); }}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Retry
            </Button>
          ) : (
            <button
              onClick={() => setError(null)}
              className="ml-auto text-amber-600 hover:text-amber-800"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Amendment banner */}
        {isAmending && report && (
          <div className="flex-none border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 flex items-center gap-2">
            <FileEdit className="h-4 w-4 shrink-0" />
            <span>
              <span className="font-medium">Amendment #{report.amendmentNumber} in progress</span>
              {report.amendmentReason && <span className="text-amber-600"> — {report.amendmentReason}</span>}
            </span>
            <span className="ml-auto text-xs text-amber-600">
              Share page shows the previously certified version
            </span>
          </div>
        )}

        {/* Review flags banner — shown in editor modes when flags exist */}
        {viewMode !== "quickReview" && report?.reviewFlags && (() => {
          try {
            const flags: ReviewFlag[] = JSON.parse(report.reviewFlags);
            if (flags.length === 0) return null;
            return (
              <div className="flex-none border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-600 shrink-0" />
                <span>
                  <span className="font-medium">{flags.length} section{flags.length !== 1 ? "s" : ""} flagged for revision</span>
                  <span className="text-amber-600"> — {flags.map((f) => f.sectionTitle).join(", ")}</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    await fetch(`/api/reports/${report.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ reviewFlags: null, status: "draft" }),
                    });
                    setReport({ ...report, reviewFlags: null, status: "draft" });
                    toast({ title: "Review flags cleared" });
                  }}
                  className="ml-auto text-xs text-amber-600 hover:text-amber-800 underline shrink-0"
                >
                  Clear flags
                </button>
              </div>
            );
          } catch { return null; }
        })()}

        {/* Quick Review full-screen mode */}
        {viewMode === "quickReview" && property && report ? (
          <QuickReview
            reportId={report.id}
            reportContent={content}
            reportStatus={report.status}
            propertyId={property.id}
            propertyAddress={property.address}
            propertyCity={property.city}
            trees={property.trees}
            initialFlags={(() => {
              try { return report.reviewFlags ? JSON.parse(report.reviewFlags) : []; }
              catch { return []; }
            })()}
            onExitQuickReview={() => {
              setViewMode(isCertified ? "preview" : "editor");
            }}
            onStartCertification={() => {
              setCertifyStep(1);
              setReviewChecked(false);
              setCertifyAgreed(false);
              setSignatureText("");
              setCertifySuccess(false);
              setWarningsAcknowledged(false);
              if (report) fetchValidation(report.id);
              setShowCertifyPanel(true);
            }}
            onSaveFlags={async (flags) => {
              const flagsJson = JSON.stringify(flags);
              const res = await fetch(`/api/reports/${report.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reviewFlags: flagsJson }),
              });
              if (!res.ok) throw new Error("Failed to save flags");
              setReport({ ...report, reviewFlags: flagsJson });
            }}
          />
        ) : viewMode === "editor" && (!isCertified || isAmending) ? (
          <SectionEditor
            content={content}
            reportId={report?.id || ""}
            trees={property?.trees || []}
            onContentChange={handleContentChange}
          />
        ) : (
          /* Full Preview Mode (or certified read-only) */
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
                {isCertified && (
                  <div className="flex items-center gap-2 rounded-lg border border-forest/20 bg-forest/5 p-3 text-sm text-forest mb-4">
                    <Lock className="h-4 w-4 shrink-0" />
                    This report has been certified and is locked. Use
                    &ldquo;Unlock &amp; Revise&rdquo; to make changes.
                  </div>
                )}
                {isCertified && report && (
                  <>
                    <PermitStatusPipeline
                      permitStatus={report.permitStatus}
                      submittedAt={report.submittedAt}
                      submittedTo={report.submittedTo}
                      reviewerName={report.reviewerName}
                      reviewerNotes={report.reviewerNotes}
                      conditionsOfApproval={report.conditionsOfApproval}
                      denialReason={report.denialReason}
                      approvedAt={report.approvedAt}
                      permitExpiresAt={report.permitExpiresAt}
                      certifiedAt={report.certifiedAt}
                      mode="interactive"
                      onUpdatePermitStatus={updatePermitStatus}
                      onSubmitClick={
                        reportType === "removal_permit" ||
                        reportType === "construction_encroachment"
                          ? () => setShowSubmissionChecklist(true)
                          : undefined
                      }
                    />
                    {/* Read-only submission checklist summary (post-submission) */}
                    {report.submissionChecklist && (
                      <SubmissionChecklistSummary
                        checklistJson={report.submissionChecklist}
                      />
                    )}
                  </>
                )}

                {/* ---- Listing Information (real_estate_package only) ---- */}
                {isCertified && reportType === "real_estate_package" && (
                  <div className="border border-violet-200 rounded-lg overflow-hidden mb-4">
                    <div className="flex items-center justify-between px-4 py-3 bg-violet-50">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-violet-600" />
                        <span className="text-sm font-semibold text-violet-700">Listing Information</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Realtor Name</Label>
                          <Input
                            value={reRealtorName}
                            onChange={(e) => setReRealtorName(e.target.value)}
                            placeholder="Agent name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Realtor Company</Label>
                          <Input
                            value={reRealtorCompany}
                            onChange={(e) => setReRealtorCompany(e.target.value)}
                            placeholder="Brokerage name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Realtor Email</Label>
                          <Input
                            type="email"
                            value={reRealtorEmail}
                            onChange={(e) => setReRealtorEmail(e.target.value)}
                            placeholder="agent@example.com"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Realtor Phone</Label>
                          <Input
                            type="tel"
                            value={reRealtorPhone}
                            onChange={(e) => setReRealtorPhone(e.target.value)}
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Listing Address</Label>
                          <Input
                            value={reListingAddress}
                            onChange={(e) => setReListingAddress(e.target.value)}
                            placeholder="Usually same as property address"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-neutral-600">Listing Price</Label>
                          <Input
                            type="number"
                            value={reListingPrice}
                            onChange={(e) => setReListingPrice(e.target.value)}
                            placeholder="e.g. 2500000"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-600">Notes for Realtor</Label>
                        <Textarea
                          value={rePackageNotes}
                          onChange={(e) => setRePackageNotes(e.target.value)}
                          placeholder="Any additional notes for the real estate agent..."
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={saveListingInfo}
                          disabled={savingListing}
                          className="bg-violet-600 hover:bg-violet-700"
                        >
                          {savingListing ? "Saving…" : "Save Listing Info"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---- Inline Billing Status ---- */}
                {isCertified && billingIncluded && billingAmount && parseFloat(billingAmount) > 0 && (
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-neutral-500" />
                      <span className="font-mono font-medium">${parseFloat(billingAmount).toFixed(2)}</span>
                      <span className="text-neutral-500">—</span>
                      {billingPaidAt ? (
                        <span className="text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Paid {new Date(billingPaidAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      ) : (
                        <span className="text-amber-600">Awaiting payment</span>
                      )}
                    </div>
                    {!billingPaidAt ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={async () => {
                          if (!report) return;
                          const now = new Date().toISOString();
                          try {
                            const res = await fetch(`/api/reports/${report.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ billingPaidAt: now }),
                            });
                            if (!res.ok) throw new Error("Failed");
                            setBillingPaidAt(now);
                            toast({ title: "Marked as paid" });
                          } catch {
                            toast({ title: "Failed to mark as paid", variant: "destructive" });
                          }
                        }}
                      >
                        Mark Paid
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-neutral-500"
                        onClick={async () => {
                          if (!report) return;
                          try {
                            const res = await fetch(`/api/reports/${report.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ billingPaidAt: null }),
                            });
                            if (!res.ok) throw new Error("Failed");
                            setBillingPaidAt(null);
                            toast({ title: "Payment status cleared" });
                          } catch {
                            toast({ title: "Failed to update", variant: "destructive" });
                          }
                        }}
                      >
                        Undo
                      </Button>
                    )}
                  </div>
                )}

                <ReportPreview
                  content={content}
                  property={property}
                  trees={property.trees}
                  arborist={arborist}
                  reportType={report.reportType}
                  certifiedAt={report.certifiedAt}
                  eSignatureText={report.eSignatureText}
                  reportOptions={report.reportOptions}
                />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* ---- Per-tree regeneration confirm dialog ---- */}
      {showRegenerateConfirm !== null && (
        <AlertDialog open={true} onOpenChange={() => setShowRegenerateConfirm(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Regenerate Tree #{showRegenerateConfirm}?</AlertDialogTitle>
              <AlertDialogDescription>
                The AI will regenerate the narrative for Tree #{showRegenerateConfirm}. Your edits to this tree&apos;s section will be replaced. Other sections will not be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleRegenerateTree(showRegenerateConfirm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Regenerate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* ---- Share Report Dialog ---- */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-forest" />
              Share Report
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Client note */}
            <div>
              <Label className="text-xs font-medium text-neutral-700">Note for your client (optional)</Label>
              <Textarea
                value={clientNote}
                onChange={(e) => setClientNote(e.target.value)}
                placeholder="Add a personal note — e.g., recommended next steps, timeline..."
                rows={2}
                className="mt-1 resize-none"
              />
            </div>

            {/* Billing section */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Include billing on share page</Label>
                <Switch
                  checked={billingIncluded}
                  onCheckedChange={(checked: boolean) => setBillingIncluded(checked)}
                />
              </div>

              {billingIncluded && (
                <div className="space-y-3 pl-0">
                  <div>
                    <Label className="text-xs font-medium text-neutral-700">Fee ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={billingAmount}
                      onChange={(e) => setBillingAmount(e.target.value)}
                      className="mt-1 font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-neutral-700">Payment instructions</Label>
                    <Textarea
                      value={billingPaymentInstructions}
                      onChange={(e) => setBillingPaymentInstructions(e.target.value)}
                      placeholder="e.g., Make checks payable to... / Venmo: @handle"
                      rows={2}
                      className="mt-1 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-forest hover:bg-forest-light"
              disabled={savingShare}
              onClick={handleShareSubmit}
            >
              {savingShare ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
              )}
              {savingShare ? "Sharing..." : "Share & Copy Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Amendment Dialog ---- */}
      <Dialog open={showAmendDialog} onOpenChange={setShowAmendDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-amber-600" />
              Issue Report Amendment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This report was certified on{" "}
              <span className="font-medium text-foreground">
                {report?.certifiedAt
                  ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
              . Issuing an amendment will reopen the report for editing. The current share link will continue to show the certified version until you re-certify.
            </p>
            <div>
              <Label className="text-sm font-medium">
                Reason for Amendment <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={amendmentReason}
                onChange={(e) => setAmendmentReason(e.target.value)}
                placeholder='e.g., "Corrected DBH measurement for Tree #3 from 18 inches to 22 inches."'
                rows={3}
                className="mt-1.5 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will be recorded in the version history and shown on the amended PDF cover page.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAmendDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={issueAmendment}
              disabled={!amendmentReason.trim() || issuingAmendment}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {issuingAmendment ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Issuing...
                </>
              ) : (
                <>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Issue Amendment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Certification Ceremony Dialog ---- */}
      {showCertifyPanel && (!isCertified || isAmending) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg mx-4">
            <CardContent className="p-6 space-y-4">
              {/* Success state */}
              {certifySuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest/10 mb-2">
                    <CheckCircle2 className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="text-xl font-bold text-forest">Report Certified</h3>
                  <p className="text-sm text-muted-foreground">
                    Your report has been certified and locked. You can now download or share it.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header with step indicator */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-forest" />
                      Certify Report
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCertifyPanel(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Step indicator */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            certifyStep >= step
                              ? "bg-forest text-white"
                              : "bg-neutral-200 text-neutral-500"
                          }`}
                        >
                          {step}
                        </div>
                        <span className={`text-xs font-medium ${certifyStep >= step ? "text-foreground" : "text-muted-foreground"}`}>
                          {step === 1 ? "Review" : step === 2 ? "Attest" : "Sign"}
                        </span>
                        {step < 3 && <div className={`flex-1 h-0.5 ${certifyStep > step ? "bg-forest" : "bg-neutral-200"}`} />}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Review + Validation Checklist */}
                  {certifyStep === 1 && (
                    <div className="space-y-3">
                      <div className="rounded-lg border p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property</span>
                          <span className="font-medium">{property?.address}, {property?.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Report Type</span>
                          <span className="font-medium">
                            {getReportTypeConfig(reportType)?.label || reportType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trees Assessed</span>
                          <span className="font-medium">{property?.trees.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Arborist</span>
                          <span className="font-medium">{arborist?.name} (ISA #<span className="font-mono">{arborist?.isaCertificationNum}</span>)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      </div>

                      {/* Validation Checklist */}
                      {validationLoading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Running quality checks...
                        </div>
                      ) : validationResult ? (
                        <div className="rounded-lg border p-3 space-y-1.5">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Quality Checklist
                            </span>
                            {validationResult.allPassed && (
                              <Badge className="ml-auto bg-forest/10 text-forest hover:bg-forest/10 text-[10px]">All passed</Badge>
                            )}
                          </div>
                          {/* Failures first */}
                          {validationResult.checks
                            .filter((c) => c.status === "fail")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md bg-red-50 border border-red-100">
                                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-red-800">{check.label}</span>
                                  <p className="text-xs text-red-600">{check.message}</p>
                                </div>
                                {check.fixPath && (
                                  <Link href={check.fixPath} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-0.5 shrink-0">
                                    Fix <ExternalLink className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          {/* Warnings */}
                          {validationResult.checks
                            .filter((c) => c.status === "warning")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md bg-amber-50 border border-amber-100">
                                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-amber-800">{check.label}</span>
                                  <p className="text-xs text-amber-600">{check.message}</p>
                                </div>
                                {check.fixPath && (
                                  <Link href={check.fixPath} className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-0.5 shrink-0">
                                    Fix <ExternalLink className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          {/* Passes */}
                          {validationResult.checks
                            .filter((c) => c.status === "pass")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md">
                                <CheckCircle2 className="h-4 w-4 text-forest-light shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-muted-foreground">{check.label}</span>
                                  <p className="text-xs text-muted-foreground/70">{check.message}</p>
                                </div>
                              </div>
                            ))}

                          {/* Blocking failures message */}
                          {validationResult.hasFailures && (
                            <p className="text-xs text-red-600 font-medium pt-1">
                              Resolve required items before certifying
                            </p>
                          )}

                          {/* Warning acknowledgement checkbox */}
                          {!validationResult.hasFailures && validationResult.hasWarnings && (
                            <label className="flex items-start gap-2 text-sm cursor-pointer p-2 rounded-md border border-amber-200 bg-amber-50/50 mt-1">
                              <input
                                type="checkbox"
                                checked={warningsAcknowledged}
                                onChange={(e) => setWarningsAcknowledged(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                              />
                              <span className="text-amber-800">
                                I have reviewed these items and confirm this report is ready for certification
                              </span>
                            </label>
                          )}
                        </div>
                      ) : null}

                      <label className="flex items-start gap-2 text-sm cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={reviewChecked}
                          onChange={(e) => setReviewChecked(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-forest focus:ring-forest-light"
                        />
                        <span>I have reviewed the report content and all tree data is accurate.</span>
                      </label>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => setCertifyStep(2)}
                          disabled={
                            !reviewChecked ||
                            (validationResult?.hasFailures ?? false) ||
                            (validationResult?.hasWarnings && !warningsAcknowledged)
                          }
                          className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
                        >
                          Next: Attestation
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Attestation */}
                  {certifyStep === 2 && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-forest/5 border border-forest/20 text-sm leading-relaxed">
                        <p className="font-semibold text-forest mb-2">Professional Certification Statement</p>
                        <p className="text-forest/90">
                          I certify that I have personally inspected the tree(s) described in this report and
                          that the information contained herein is accurate to the best of my professional
                          knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are
                          based on my professional training, experience, and education. This report was
                          prepared in accordance with ISA standards and accepted arboricultural practices.
                        </p>
                      </div>

                      <label className="flex items-start gap-2 text-sm cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={certifyAgreed}
                          onChange={(e) => setCertifyAgreed(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-forest focus:ring-forest-light"
                        />
                        <span>I agree to the above certification statement and confirm all information is accurate.</span>
                      </label>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCertifyStep(1)}>
                          Back
                        </Button>
                        <Button
                          onClick={() => setCertifyStep(3)}
                          disabled={!certifyAgreed}
                          className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
                        >
                          Next: Sign
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Electronic Signature */}
                  {certifyStep === 3 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Electronic Signature
                          {arborist?.signatureName && (
                            <span className="text-muted-foreground font-normal ml-1">
                              (type: {arborist.signatureName})
                            </span>
                          )}
                        </label>
                        <Input
                          placeholder="Type your full name"
                          value={signatureText}
                          onChange={(e) => setSignatureText(e.target.value)}
                          className={`text-lg ${
                            signatureText.trim() &&
                            arborist?.signatureName &&
                            !signatureNameMatch
                              ? "border-amber-300 focus-visible:ring-amber-400"
                              : ""
                          }`}
                          autoFocus
                        />
                        {signatureText.trim() &&
                          arborist?.signatureName &&
                          !signatureNameMatch && (
                            <p className="text-xs text-amber-600 mt-1">
                              Must match: {arborist.signatureName}
                            </p>
                          )}
                      </div>

                      {/* Signature preview */}
                      {signatureText.trim() && (
                        <div className="p-4 rounded-lg border bg-neutral-50 text-center">
                          <p className="text-2xl italic text-neutral-800" style={{ fontFamily: "Georgia, serif" }}>
                            {signatureText}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCertifyStep(2)}>
                          Back
                        </Button>
                        <Button
                          onClick={certifyReport}
                          disabled={
                            !signatureText.trim() ||
                            !certifyAgreed ||
                            certifying ||
                            (arborist?.signatureName ? !signatureNameMatch : false)
                          }
                          className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
                        >
                          {certifying ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Certifying...
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Certify &amp; Lock Report
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- Certification Completion Modal ---- */}
      {showCertifyCompletion && report && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md sm:mx-4 bg-white sm:rounded-xl rounded-t-2xl shadow-2xl p-8 sm:p-10 text-center space-y-5 animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1D4E3E]/10">
              <BadgeCheck className="h-7 w-7 text-[#1D4E3E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold font-display text-foreground">
                Report Certified
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your ISA certification has been applied to this report.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Button
                className="w-full bg-[#1D4E3E] hover:bg-[#2A6B55] text-white"
                onClick={() => {
                  setShowCertifyCompletion(false);
                  handleShareWithClient();
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with Client
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/reports/${report.id}/pdf`);
                    if (!res.ok) throw new Error();
                    const blob = await res.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = blobUrl;
                    a.download = `report.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blobUrl);
                  } catch {
                    toast({ title: "PDF download failed", description: "Please try again.", variant: "destructive" });
                  }
                  setShowCertifyCompletion(false);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Certified {report.certifiedAt ? new Date(report.certifiedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "just now"}
              {arborist ? ` · ISA #${arborist.isaCertificationNum}` : ""}
            </p>
            <button
              type="button"
              onClick={() => setShowCertifyCompletion(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---- Submission Checklist Dialog ---- */}
      {showSubmissionChecklist && property && report && (
        <SubmissionChecklistDialog
          open={showSubmissionChecklist}
          onClose={() => setShowSubmissionChecklist(false)}
          onConfirmSubmission={async (data) => {
            await updatePermitStatus(data);
            setShowSubmissionChecklist(false);
          }}
          onSaveChecklist={async (checklist) => {
            await updatePermitStatus({ submissionChecklist: checklist });
          }}
          cityName={property.city}
          reportType={report.reportType}
          report={report}
          trees={property.trees}
          initialChecklist={report.submissionChecklist}
        />
      )}

      {/* ---- Certified details bar ---- */}
      {isCertified && !isAmending && report && (
        <div className="flex-none border-t bg-forest/5 px-6 py-3">
          <div className="flex items-center gap-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-forest" />
            <span className="font-medium text-forest">
              {report.amendmentNumber > 0 ? `Certified (Amended #${report.amendmentNumber})` : "Certified"}
            </span>
            <span className="text-muted-foreground">
              Signed by {report.eSignatureText}
            </span>
            {report.certifiedAt && (
              <span className="text-muted-foreground">
                on{" "}
                {new Date(report.certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            {report.originalCertifiedAt && report.amendmentNumber > 0 && (
              <span className="text-xs text-muted-foreground">
                (Originally certified {new Date(report.originalCertifiedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })})
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---- Streaming Progress Modal (regeneration) ---- */}
      {generating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
            <CardContent className="p-6 flex flex-col flex-1 overflow-hidden gap-4">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Regenerating Report</h3>
                  <p className="text-sm text-muted-foreground">
                    AI is rewriting your {getReportTypeConfig(reportType)?.label || "report"}...
                  </p>
                </div>
              </div>
              {streamingText ? (
                <ScrollArea className="flex-1 min-h-0 rounded-lg border bg-muted/30">
                  <div
                    className="p-4 prose prose-sm max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownToHtml(streamingText),
                    }}
                  />
                </ScrollArea>
              ) : (
                <div className="flex-1 flex items-center justify-center rounded-lg border bg-muted/30 min-h-[200px]">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-blue-400 animate-pulse" />
                    <p className="text-sm">Preparing report structure...</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {streamingText
                    ? `${streamingText.split(/\s+/).length} words generated`
                    : "Connecting to AI..."}
                </span>
                <span>This may take 30–60 seconds</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- Delivery Dialog ---- */}
      {showDeliveryDialog && report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg mx-4">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  Send Report
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowDeliveryDialog(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-email" className="text-sm">Recipient Email</Label>
                  <Input
                    id="delivery-email"
                    type="email"
                    placeholder="client@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-subject" className="text-sm">Subject</Label>
                  <Input
                    id="delivery-subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-body" className="text-sm">Message</Label>
                  <Textarea
                    id="delivery-body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={5}
                    className="text-sm"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This will open your email client with the message pre-filled. Download the PDF first, then attach it to the email.
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/reports/${report.id}/pdf`);
                      if (!res.ok) throw new Error("PDF generation failed");
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `report-${report.id}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error("PDF download failed:", err);
                      toast({
                        title: "PDF download failed",
                        description: "Could not generate PDF. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const subject = encodeURIComponent(emailSubject);
                    const body = encodeURIComponent(emailBody);
                    const mailto = `mailto:${encodeURIComponent(recipientEmail)}?subject=${subject}&body=${body}`;
                    window.open(mailto, "_blank");
                    setShowDeliveryDialog(false);
                  }}
                  disabled={!recipientEmail.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Open Email Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- Version History Sheet ---- */}
      <Sheet open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <SheetContent className="w-[400px] sm:w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Version History
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {versionsLoading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading versions...
              </div>
            ) : versions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No versions yet. Versions are created automatically when you save edits.
              </p>
            ) : (
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="space-y-2 pr-4">
                  {versions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setPreviewVersion(v);
                        setShowVersionPreview(true);
                      }}
                      className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          variant={
                            v.label === "AI Draft"
                              ? "default"
                              : v.label === "Pre-certification"
                              ? "secondary"
                              : v.label.startsWith("Restored")
                              ? "outline"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {v.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(new Date(v.createdAt))}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {v.content.replace(/[#*_\-|>]/g, "").slice(0, 120)}...
                      </p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ---- Version Preview Dialog ---- */}
      <Dialog open={showVersionPreview} onOpenChange={setShowVersionPreview}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewVersion?.label}
              <span className="text-sm font-normal text-muted-foreground">
                {previewVersion && timeAgo(new Date(previewVersion.createdAt))}
              </span>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-2 border rounded-md">
            <div
              className="prose prose-sm max-w-none p-6"
              dangerouslySetInnerHTML={{
                __html: previewVersion
                  ? renderMarkdownToHtml(previewVersion.content)
                  : "",
              }}
            />
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowVersionPreview(false)}
            >
              Close
            </Button>
            {(!isCertified || isAmending) && (
              <Button
                onClick={() => {
                  if (
                    previewVersion &&
                    window.confirm(
                      `Restore this version? Your current content will be replaced with the "${previewVersion.label}" version.`
                    )
                  ) {
                    restoreVersion(previewVersion);
                  }
                }}
                disabled={restoring}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                {restoring ? "Restoring..." : "Restore this version"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Report Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>This will delete the report and all its content.</p>
                <p>Your tree assessments and photos will <span className="font-semibold text-foreground">NOT</span> be deleted — only the report text.</p>
                <p>You can generate a new report afterward.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingReport}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletingReport}
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={async () => {
                if (!report) return;
                setDeletingReport(true);
                try {
                  const res = await fetch(`/api/reports/${report.id}`, { method: "DELETE" });
                  if (!res.ok) throw new Error("Failed to delete report");
                  toast({ title: "Report deleted", description: "You can generate a new report from the property page." });
                  router.push(`/properties/${propertyId}`);
                } catch {
                  toast({ title: "Delete failed", description: "Could not delete report. Please try again.", variant: "destructive" });
                  setDeletingReport(false);
                  setShowDeleteDialog(false);
                }
              }}
            >
              {deletingReport ? "Deleting..." : "Delete Report"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Insert Template Panel */}
      <Sheet open={showTemplatePanel} onOpenChange={setShowTemplatePanel}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display">Insert Template</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            {templatesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
              </div>
            ) : (() => {
              const query = templateSearch.toLowerCase();
              const filtered = editorTemplates.filter(
                (t) => t.name.toLowerCase().includes(query) || t.content.toLowerCase().includes(query)
              );
              const suggested = filtered.filter(
                (t) => (t.cityTag && t.cityTag === property?.city) || (t.reportTypeTag && t.reportTypeTag === reportType)
              );
              const rest = filtered.filter(
                (t) => !suggested.includes(t)
              );
              return filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {editorTemplates.length === 0 ? "No templates yet. Create them in Settings." : "No matching templates."}
                </p>
              ) : (
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-1">
                    {suggested.length > 0 && (
                      <>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 pt-2">Suggested</p>
                        {suggested.map((t) => (
                          <button
                            key={t.id}
                            className="w-full text-left rounded-lg border p-3 hover:bg-neutral-50 transition-colors"
                            onClick={() => {
                              const sep = content.length > 0 && !content.endsWith("\n") ? "\n\n" : "";
                              handleContentChange(content + sep + t.content);
                              fetch(`/api/templates/${t.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ incrementUsage: true }),
                              }).catch(() => {});
                              setShowTemplatePanel(false);
                              toast({ description: "Template inserted" });
                            }}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{t.name}</span>
                              {t.category && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-forest/10 text-forest font-medium">{t.category}</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.content}</p>
                          </button>
                        ))}
                      </>
                    )}
                    {rest.length > 0 && (
                      <>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 pt-2">
                          {suggested.length > 0 ? "All Templates" : "Templates"}
                        </p>
                        {rest.map((t) => (
                          <button
                            key={t.id}
                            className="w-full text-left rounded-lg border p-3 hover:bg-neutral-50 transition-colors"
                            onClick={() => {
                              const sep = content.length > 0 && !content.endsWith("\n") ? "\n\n" : "";
                              handleContentChange(content + sep + t.content);
                              fetch(`/api/templates/${t.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ incrementUsage: true }),
                              }).catch(() => {});
                              setShowTemplatePanel(false);
                              toast({ description: "Template inserted" });
                            }}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{t.name}</span>
                              {t.category && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-forest/10 text-forest font-medium">{t.category}</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.content}</p>
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </ScrollArea>
              );
            })()}
          </div>
        </SheetContent>
      </Sheet>

      {/* Save as Template Dialog */}
      <Dialog open={showSaveTemplateDialog} onOpenChange={setShowSaveTemplateDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Save as Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="new-tpl-name" className="text-sm font-medium">Name</Label>
              <Input
                id="new-tpl-name"
                value={newTemplateForm.name}
                onChange={(e) => setNewTemplateForm({ ...newTemplateForm, name: e.target.value })}
                placeholder="e.g., Standard Limitations"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-tpl-category" className="text-sm font-medium">Category</Label>
              <select
                id="new-tpl-category"
                value={newTemplateForm.category}
                onChange={(e) => setNewTemplateForm({ ...newTemplateForm, category: e.target.value })}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">No category</option>
                <option value="cover_letter">Cover Letter</option>
                <option value="limitations">Limitations</option>
                <option value="methodology">Methodology</option>
                <option value="qualifications">Qualifications</option>
                <option value="site_boilerplate">Site Boilerplate</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium">Content</Label>
              <div className="mt-1 rounded-md border bg-muted/30 p-3 text-sm max-h-32 overflow-y-auto">
                {newTemplateForm.content}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSaveTemplateDialog(false)}>Cancel</Button>
              <Button
                disabled={savingNewTemplate || !newTemplateForm.name.trim()}
                className="bg-forest hover:bg-forest-light"
                onClick={async () => {
                  setSavingNewTemplate(true);
                  try {
                    const res = await fetch("/api/templates", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: newTemplateForm.name,
                        content: newTemplateForm.content,
                        category: newTemplateForm.category || null,
                        cityTag: newTemplateForm.cityTag || null,
                        reportTypeTag: newTemplateForm.reportTypeTag || null,
                      }),
                    });
                    if (!res.ok) throw new Error();
                    setShowSaveTemplateDialog(false);
                    toast({ description: "Template saved" });
                  } catch {
                    toast({ variant: "destructive", description: "Failed to save template" });
                  } finally {
                    setSavingNewTemplate(false);
                  }
                }}
              >
                {savingNewTemplate ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Adds data-section-id attributes to headings in HTML for section nav scrolling
// ---------------------------------------------------------------------------

// addSectionIds removed — section navigation is now handled by SectionEditor component
