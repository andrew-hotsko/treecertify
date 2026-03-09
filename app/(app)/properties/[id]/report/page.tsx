"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportPreview } from "@/components/report-preview";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { getReportTypeConfig } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Sparkles,
  Save,
  CheckCircle2,
  Loader2,
  Download,
  FileDown,
  Eye,
  Pencil,
  Lock,
  Unlock,
  RefreshCw,
  List,
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
  Plus,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Home,
  Mail,
  FileEdit,
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  isProtected: boolean;
  recommendedAction: string;
  status: string;
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
  // Billing defaults
  showBillingOnShare?: boolean;
  defaultReportFee?: number | null;
  billingPaymentInstructions?: string | null;
}

interface Section {
  id: string;
  title: string;
  level: number;
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractSections(markdown: string): Section[] {
  const sections: Section[] = [];
  for (const line of markdown.split("\n")) {
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      sections.push({ id: slugify(title), title, level: 3 });
    } else if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      sections.push({ id: slugify(title), title, level: 2 });
    } else if (line.startsWith("# ")) {
      const title = line.slice(2).trim();
      sections.push({ id: slugify(title), title, level: 1 });
    }
  }
  return sections;
}

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
  const { toast } = useToast();

  // Data state
  const [property, setProperty] = useState<Property | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [arborist, setArborist] = useState<ArboristInfo | null>(null);
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  // Certification state
  const [signatureText, setSignatureText] = useState("");
  const [certifyAgreed, setCertifyAgreed] = useState(false);
  const [showCertifyPanel, setShowCertifyPanel] = useState(false);
  const [certifyStep, setCertifyStep] = useState(1); // 1=Review, 2=Attest, 3=Sign
  const [reviewChecked, setReviewChecked] = useState(false);
  const [certifySuccess, setCertifySuccess] = useState(false);

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
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">("split");
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [qualityWarnings, setQualityWarnings] = useState<string[]>([]);
  const [streamingText, setStreamingText] = useState("");

  // Client note (shown on share page)
  const [clientNote, setClientNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  // Report options state (PDF appendix toggles)
  const [reportOptions, setReportOptions] = useState<ReportOptions>({});

  // Delete report state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingReport, setDeletingReport] = useState(false);

  // Billing state
  const [billingExpanded, setBillingExpanded] = useState(false);
  const [billingAmount, setBillingAmount] = useState("");
  const [billingLineItems, setBillingLineItems] = useState<{ description: string; amount: string }[]>([]);
  const [billingPaymentInstructions, setBillingPaymentInstructions] = useState("");
  const [billingIncluded, setBillingIncluded] = useState(false);
  const [billingPaidAt, setBillingPaidAt] = useState<string | null>(null);
  const [savingBilling, setSavingBilling] = useState(false);

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

  // Refs
  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedContentRef = useRef("");
  const lastSavedRef = useRef<Date | null>(null);
  const generationStartRef = useRef<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Derived state
  const isCertified = report?.status === "certified" || report?.status === "filed";
  const isAmending = report?.status === "amendment_in_progress";
  const sections = useMemo(() => extractSections(content), [content]);
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
          setPreviewHtml(renderMarkdownToHtml(c));
          setReportType(r.reportType);
          setViewMode(r.status === "certified" || r.status === "filed" ? "preview" : "split");
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
          try {
            const items = JSON.parse(r.billingLineItems || "[]");
            setBillingLineItems(items.length > 0 ? items : []);
          } catch { setBillingLineItems([]); }
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
      .catch(() => {});
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
    } catch {
      // Validation fetch is best-effort
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

  const updatePreview = useCallback((md: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(renderMarkdownToHtml(md));
    }, 500);
  }, []);

  // -------------------------------------------------------------------------
  // Content change handler
  // -------------------------------------------------------------------------

  const handleContentChange = useCallback(
    (value: string) => {
      setContent(value);
      setHasUnsavedChanges(value !== savedContentRef.current);
      updatePreview(value);
    },
    [updatePreview]
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
        if (!silent) {
          setError(err instanceof Error ? err.message : "Save failed");
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

  const saveClientNote = useCallback(async () => {
    if (!report) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientNote }),
      });
      if (!res.ok) throw new Error("Failed to save note");
      const updated = await res.json();
      setReport(updated);
      toast({ title: "Note saved" });
    } catch (err) {
      toast({
        title: "Failed to save note",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingNote(false);
    }
  }, [report, clientNote, toast]);

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
    try {
      const res = await fetch("/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, reportType }),
      });
      if (!res.ok) {
        // Non-streaming error — try to parse JSON
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

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last potentially incomplete line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const payload = JSON.parse(line.slice(6));
              if (payload.type === "text") {
                accumulated += payload.text;
                setStreamingText(accumulated);
              } else if (payload.type === "done") {
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
                  amendmentReason: null,
                  amendmentNumber: 0,
                  originalCertifiedAt: null,
                });
                setContent(accumulated);
                savedContentRef.current = accumulated;
                setPreviewHtml(renderMarkdownToHtml(accumulated));
                setViewMode("split");
              } else if (payload.type === "error") {
                throw new Error(payload.error || "Streaming error");
              }
            } catch (parseErr) {
              // Skip malformed SSE lines
              if (parseErr instanceof Error && parseErr.message !== "Streaming error") continue;
              throw parseErr;
            }
          }
        }
      } else {
        // Non-streaming JSON path (mock fallback)
        const newReport = await res.json();
        setReport(newReport);
        const c = newReport.aiDraftContent || "";
        setContent(c);
        savedContentRef.current = c;
        setPreviewHtml(renderMarkdownToHtml(c));
        setViewMode("split");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
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
      setViewMode("split");
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
      // Auto-close after 3 seconds
      setTimeout(() => {
        setShowCertifyPanel(false);
        setViewMode("preview");
        setCertifySuccess(false);
      }, 3000);
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
      setViewMode("split");
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
        setPreviewHtml(renderMarkdownToHtml(version.content));
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

  const scrollToSection = (sectionId: string) => {
    if (previewRef.current) {
      const heading = previewRef.current.querySelector(
        `[data-section-id="${sectionId}"]`
      );
      if (heading) {
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // -------------------------------------------------------------------------
  // Render: Loading
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
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
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Property
        </Link>

        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold">Generate AI Report</h2>
                <p className="text-muted-foreground mt-1">
                  {property.address}, {property.city}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Report Type:</span>
                <Badge variant="outline">
                  {getReportTypeConfig(reportType)?.label ||
                    reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800">
                <p className="font-medium mb-2">
                  The AI will generate a comprehensive report including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Scope of Assignment &amp; Site Observations</li>
                  <li>
                    Tree Inventory table ({property.trees.length} trees)
                  </li>
                  <li>Individual Tree Assessments</li>
                  <li>Recommendations &amp; Mitigation</li>
                  <li>Arborist Certification Statement</li>
                </ul>
              </div>

              <Button
                onClick={handleGenerateClick}
                disabled={generating || property.trees.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-transform"
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
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold">Generating Report</h3>
                          <p className="text-sm text-muted-foreground">
                            AI is writing your {getReportTypeConfig(reportType)?.label || "report"}...
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
                        <span>
                          {elapsedSeconds > 0 && `${elapsedSeconds}s elapsed · `}
                          {elapsedSeconds > 45
                            ? "Taking longer than usual — hang tight"
                            : "This may take 30–60 seconds"}
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
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-display">Report Editor</h1>
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
            {/* Edit actions */}
            {(!isCertified || isAmending) && (
              <>
                {/* View mode toggle: Edit / Split / Preview */}
                <div className="flex rounded-lg border bg-muted p-0.5">
                  <button
                    onClick={() => setViewMode("edit")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "edit"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setViewMode("split")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "split"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Split
                  </button>
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "preview"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                </div>

                {/* Report Options (PDF appendix toggles) */}
                {(reportType === "health_assessment" || reportType === "removal_permit" || reportType === "tree_valuation" || reportType === "construction_encroachment" || reportType === "real_estate_package") && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings2 className="h-3.5 w-3.5 mr-1.5" />
                        Report Options
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72" align="end">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">PDF Appendices</h4>
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">TRAQ Risk Assessment Forms</p>
                            <p className="text-xs text-muted-foreground">ISA Level 2 Basic Assessment per tree</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeTraq ?? (reportType === "health_assessment")}
                            onCheckedChange={(checked) => updateReportOptions({ includeTraq: checked })}
                          />
                        </label>
                        {reportType === "removal_permit" && (
                          <label className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium">Permit Cover Letter</p>
                              <p className="text-xs text-muted-foreground">Auto-generated letter to city</p>
                            </div>
                            <Switch
                              checked={reportOptions.includeCoverLetter ?? true}
                              onCheckedChange={(checked) => updateReportOptions({ includeCoverLetter: checked })}
                            />
                          </label>
                        )}
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">Mitigation Summary</p>
                            <p className="text-xs text-muted-foreground">Auto-calculated replacement requirements</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeMitigation ?? true}
                            onCheckedChange={(checked) => updateReportOptions({ includeMitigation: checked })}
                          />
                        </label>
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">Site Map</p>
                            <p className="text-xs text-muted-foreground">Satellite map with tree pins</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeSiteMap ?? true}
                            onCheckedChange={(checked) => updateReportOptions({ includeSiteMap: checked })}
                          />
                        </label>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* Regenerate — full report + per-tree dropdown */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={generating || regeneratingTree !== null}
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 mr-1.5 ${generating || regeneratingTree !== null ? "animate-spin" : ""}`}
                      />
                      Regenerate
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" align="end">
                    <button
                      onClick={() => regenerateReport()}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      <span className="font-medium">Full Report</span>
                      <p className="text-xs text-muted-foreground">Regenerate the entire report</p>
                    </button>
                    {parsedTreeSections.treeSections.length > 0 && (
                      <>
                        <div className="border-t my-1" />
                        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Per Tree
                        </p>
                        {parsedTreeSections.treeSections.map((ts) => {
                          const tree = property?.trees.find((t) => t.treeNumber === ts.treeNumber);
                          return (
                            <button
                              key={ts.treeNumber}
                              onClick={() => setShowRegenerateConfirm(ts.treeNumber)}
                              disabled={regeneratingTree !== null}
                              className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                            >
                              {regeneratingTree === ts.treeNumber ? (
                                <Loader2 className="h-3 w-3 animate-spin shrink-0" />
                              ) : (
                                <RefreshCw className="h-3 w-3 shrink-0 text-muted-foreground" />
                              )}
                              <span>
                                Tree #{ts.treeNumber}
                                {tree ? ` — ${tree.speciesCommon}` : ""}
                              </span>
                            </button>
                          );
                        })}
                      </>
                    )}
                  </PopoverContent>
                </Popover>

                {/* Save */}
                {(viewMode === "edit" || viewMode === "split") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => saveReport(false)}
                    disabled={saving || !hasUnsavedChanges}
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    {saving ? "Saving..." : "Save"}
                  </Button>
                )}

                {/* Validation status indicator */}
                {validationResult && !validationLoading && (
                  <span className="text-xs flex items-center gap-1">
                    {validationResult.hasFailures ? (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-red-600">
                          {validationResult.checks.filter((c) => c.status === "fail").length} issue{validationResult.checks.filter((c) => c.status === "fail").length !== 1 ? "s" : ""}
                        </span>
                      </>
                    ) : validationResult.hasWarnings ? (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600">
                          {validationResult.checks.filter((c) => c.status === "warning").length} warning{validationResult.checks.filter((c) => c.status === "warning").length !== 1 ? "s" : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-forest-light" />
                        <span className="text-forest">Ready</span>
                      </>
                    )}
                  </span>
                )}

                {/* Certify */}
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
                  Certify
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Certified actions */}
            {isCertified && !isAmending && (
              <>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={openDeliveryDialog}
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Send Report
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAmendDialog(true)}
                  className="text-amber-700 border-amber-300 hover:bg-amber-50"
                >
                  <FileEdit className="h-3.5 w-3.5 mr-1.5" />
                  Issue Amendment
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={unlockReport}
                  disabled={unlocking}
                >
                  <Unlock className="h-3.5 w-3.5 mr-1.5" />
                  {unlocking ? "Unlocking..." : "Unlock & Revise"}
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Version History */}
            <Button
              variant="outline"
              size="sm"
              onClick={openVersionHistory}
            >
              <History className="h-3.5 w-3.5 mr-1.5" />
              Versions
            </Button>

            {/* Delete Report */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Export actions — always visible */}
            <Button
              variant="outline"
              size="sm"
              disabled={pdfLoading}
              onClick={async () => {
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
              }}
            >
              {pdfLoading ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5 mr-1.5" />
              )}
              {pdfLoading ? "Generating..." : "PDF"}
            </Button>
            {/* Word export — not available for valuation types (formatting doesn't support valuation tables) */}
            {reportType !== "tree_valuation" && reportType !== "real_estate_package" && (
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
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
                }}
              >
                <FileDown className="h-3.5 w-3.5 mr-1.5" />
                Word
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
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
              }}
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </Button>
            {/* Share with Realtor — RE only, when realtor email is set */}
            {reportType === "real_estate_package" && reRealtorEmail && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={`mailto:${reRealtorEmail}?subject=${encodeURIComponent(
                    `Tree Canopy Report — ${property?.address ?? ""}`
                  )}&body=${encodeURIComponent(
                    `Hi ${reRealtorName || ""},\n\nPlease find the Certified Tree Canopy Report for ${property?.address ?? "the property"} attached.\n\nBest regards`
                  )}`}
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Email Realtor
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ---- Error Bar ---- */}
      {error && (
        <div className="flex-none border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Section Navigation Sidebar */}
        {sections.length > 0 && showSectionNav && (viewMode === "edit" || viewMode === "split") && (!isCertified || isAmending) && (
          <div className="flex-none w-48 border-r bg-muted/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sections
              </span>
              <button
                onClick={() => setShowSectionNav(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-0.5">
                {sections.map((section, idx) => (
                  <button
                    key={`${section.id}-${idx}`}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded hover:bg-accent transition-colors truncate ${
                      section.level === 1
                        ? "font-semibold"
                        : section.level === 2
                          ? "pl-4 text-muted-foreground"
                          : "pl-6 text-muted-foreground/70"
                    }`}
                    title={section.title}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Toggle section nav when hidden */}
        {!showSectionNav && (viewMode === "edit" || viewMode === "split") && (!isCertified || isAmending) && sections.length > 0 && (
          <button
            onClick={() => setShowSectionNav(true)}
            className="flex-none w-8 border-r bg-muted/30 flex items-center justify-center hover:bg-muted transition-colors"
            title="Show section navigation"
          >
            <List className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

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

        {/* Editor + Preview layout based on viewMode */}
        {(viewMode === "edit" || viewMode === "split") && (!isCertified || isAmending) ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Markdown Editor — full width in edit mode, 35% in split */}
            {(viewMode === "edit" || viewMode === "split") && (
              <div className={`flex flex-col border-r ${viewMode === "split" ? "w-[35%]" : "flex-1"}`}>
                <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                  <Pencil className="h-3 w-3" />
                  Markdown Editor
                  {viewMode === "edit" && (
                    <span className="ml-auto">
                      Use # headings, **bold**, *italic*, - lists, | tables |
                    </span>
                  )}
                </div>
                <textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="flex-1 resize-none border-0 bg-background p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Live Preview — 65% in split mode */}
            {viewMode === "split" && (
            <div className="w-[65%] flex flex-col overflow-hidden">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="h-3 w-3" />
                Live Preview
              </div>
              <ScrollArea className="flex-1">
                <div
                  ref={previewRef}
                  className="p-6 prose prose-sm max-w-none report-live-preview"
                >
                  <style>{`
                    .report-live-preview h1,
                    .report-live-preview h2,
                    .report-live-preview h3 {
                      color: #2d5016;
                      scroll-margin-top: 16px;
                    }
                    .dark .report-live-preview h1,
                    .dark .report-live-preview h2,
                    .dark .report-live-preview h3 {
                      color: #6fcf3b;
                    }
                    .report-live-preview table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 0.8rem;
                    }
                    .report-live-preview table th {
                      background: #2d5016;
                      color: white;
                      padding: 4px 8px;
                      text-align: left;
                    }
                    .dark .report-live-preview table th {
                      background: #1a3a0a;
                    }
                    .report-live-preview table td {
                      padding: 4px 8px;
                      border: 1px solid #ddd;
                    }
                    .dark .report-live-preview table td {
                      border-color: #3f3f46;
                    }
                    .report-live-preview table tr:nth-child(even) {
                      background: #f9f9f6;
                    }
                    .dark .report-live-preview table tr:nth-child(even) {
                      background: #18181b;
                    }
                    .report-live-preview hr {
                      border: none;
                      border-top: 1px solid #ddd;
                      margin: 16px 0;
                    }
                  `}</style>
                  <div
                    dangerouslySetInnerHTML={{ __html: addSectionIds(previewHtml) }}
                  />
                </div>
              </ScrollArea>
            </div>
            )}
          </div>
        ) : (
          /* Full Preview Mode (or certified read-only) */
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-4xl mx-auto py-6 px-4">
                {isCertified && (
                  <div className="flex items-center gap-2 rounded-lg border border-forest/20 bg-forest/5 p-3 text-sm text-forest mb-4">
                    <Lock className="h-4 w-4 shrink-0" />
                    This report has been certified and is locked. Use
                    &ldquo;Unlock &amp; Revise&rdquo; to make changes.
                  </div>
                )}
                {isCertified && report && (
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
                  />
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

                {/* ---- Note to Client ---- */}
                {isCertified && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Note to Client
                    </p>
                    <p className="text-xs text-neutral-500">
                      This note appears at the top of the shared report page.
                    </p>
                    <Textarea
                      value={clientNote}
                      onChange={(e) => setClientNote(e.target.value)}
                      placeholder="Add a personal note for the homeowner — e.g., recommended next steps, timeline, or anything they should know..."
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={saveClientNote}
                        disabled={
                          savingNote ||
                          clientNote === (report?.clientNote ?? "")
                        }
                      >
                        {savingNote ? "Saving…" : "Save Note"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* ---- Client Billing ---- */}
                {isCertified && arborist?.showBillingOnShare !== false && (
                  <div className="border border-forest/20 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setBillingExpanded(!billingExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-forest/5 hover:bg-forest/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-forest" />
                        <span className="text-sm font-semibold text-forest">Client Billing</span>
                        {billingPaidAt && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                            <CheckCircle className="h-3 w-3" />
                            Paid
                          </span>
                        )}
                        {!billingPaidAt && billingAmount && parseFloat(billingAmount) > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                            ${parseFloat(billingAmount).toFixed(2)} due
                          </span>
                        )}
                      </div>
                      {billingExpanded ? (
                        <ChevronUp className="h-4 w-4 text-neutral-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-neutral-500" />
                      )}
                    </button>
                    {billingExpanded && (
                      <div className="p-4 space-y-4">
                        {/* Total Amount */}
                        <div>
                          <Label className="text-xs font-medium text-neutral-700">Total Amount ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder={arborist?.defaultReportFee ? String(arborist.defaultReportFee) : "0.00"}
                            value={billingAmount}
                            onChange={(e) => setBillingAmount(e.target.value)}
                            className="mt-1 font-mono"
                          />
                        </div>

                        {/* Line Items */}
                        <div>
                          <Label className="text-xs font-medium text-neutral-700">Line Items (optional)</Label>
                          <div className="mt-1 space-y-2">
                            {billingLineItems.map((item, idx) => (
                              <div key={idx} className="flex gap-2">
                                <Input
                                  placeholder="Description"
                                  value={item.description}
                                  onChange={(e) => {
                                    const updated = [...billingLineItems];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setBillingLineItems(updated);
                                  }}
                                  className="flex-1"
                                />
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  placeholder="$"
                                  value={item.amount}
                                  onChange={(e) => {
                                    const updated = [...billingLineItems];
                                    updated[idx] = { ...updated[idx], amount: e.target.value };
                                    setBillingLineItems(updated);
                                  }}
                                  className="w-28 font-mono"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setBillingLineItems(billingLineItems.filter((_, i) => i !== idx));
                                  }}
                                  className="px-2 text-neutral-400 hover:text-red-500"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setBillingLineItems([...billingLineItems, { description: "", amount: "" }])}
                              className="text-xs"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add line item
                            </Button>
                          </div>
                        </div>

                        {/* Payment Instructions */}
                        <div>
                          <Label className="text-xs font-medium text-neutral-700">Payment Instructions</Label>
                          <Textarea
                            value={billingPaymentInstructions || (arborist?.billingPaymentInstructions ?? "")}
                            onChange={(e) => setBillingPaymentInstructions(e.target.value)}
                            placeholder="e.g., Make checks payable to... / Venmo: @handle"
                            rows={2}
                            className="mt-1 resize-none"
                          />
                        </div>

                        {/* Include on share page */}
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-xs font-medium text-neutral-700">Include on share page</Label>
                            <p className="text-xs text-neutral-500">Client sees billing when viewing the shared report</p>
                          </div>
                          <Switch
                            checked={billingIncluded}
                            onCheckedChange={(checked: boolean) => setBillingIncluded(checked)}
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            className="bg-forest hover:bg-forest-light"
                            disabled={savingBilling}
                            onClick={async () => {
                              if (!report) return;
                              setSavingBilling(true);
                              try {
                                const amt = billingAmount ? parseFloat(billingAmount) : null;
                                const lineItemsJson = billingLineItems.length > 0
                                  ? JSON.stringify(billingLineItems.filter(li => li.description || li.amount))
                                  : null;
                                const res = await fetch(`/api/reports/${report.id}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    billingAmount: amt,
                                    billingLineItems: lineItemsJson,
                                    billingPaymentInstructions: billingPaymentInstructions || null,
                                    billingIncluded,
                                  }),
                                });
                                if (!res.ok) throw new Error("Failed to save billing");
                                toast({ title: "Billing saved" });
                              } catch {
                                toast({ title: "Failed to save billing", variant: "destructive" });
                              } finally {
                                setSavingBilling(false);
                              }
                            }}
                          >
                            {savingBilling ? "Saving..." : "Save Billing"}
                          </Button>
                          {!billingPaidAt && billingAmount && parseFloat(billingAmount) > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
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
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                              Mark as Paid
                            </Button>
                          )}
                          {billingPaidAt && (
                            <Button
                              variant="ghost"
                              size="sm"
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
                              className="text-xs text-neutral-500"
                            >
                              Undo paid
                            </Button>
                          )}
                        </div>
                      </div>
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Adds data-section-id attributes to headings in HTML for section nav scrolling
// ---------------------------------------------------------------------------

function addSectionIds(html: string): string {
  return html.replace(
    /<(h[1-3])>(.*?)<\/h[1-3]>/g,
    (match, tag, content) => {
      const text = content.replace(/<[^>]+>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<${tag} data-section-id="${id}">${content}</${tag}>`;
    }
  );
}
