"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
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
  ShieldCheck,
  Share2,
  Send,
  X,
} from "lucide-react";

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
}

interface Section {
  id: string;
  title: string;
  level: number;
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

  // UI state
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certifying, setCertifying] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [qualityWarnings, setQualityWarnings] = useState<string[]>([]);
  const [streamingText, setStreamingText] = useState("");

  // Report delivery state
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Refs
  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedContentRef = useRef("");
  const lastSavedRef = useRef<Date | null>(null);

  // Derived state
  const isCertified = report?.status === "certified";
  const sections = useMemo(() => extractSections(content), [content]);

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
          setViewMode(r.status === "certified" ? "preview" : "editor");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

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
      if (!report || isCertified) return;
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
  // Auto-save every 30s
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!report || isCertified) return;

    autoSaveRef.current = setInterval(() => {
      if (savedContentRef.current !== content) {
        saveReport(true);
      }
    }, 30000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [report, isCertified, content, saveReport]);

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
                });
                setContent(accumulated);
                savedContentRef.current = accumulated;
                setPreviewHtml(renderMarkdownToHtml(accumulated));
                setViewMode("editor");
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
        setViewMode("editor");
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
      if (!res.ok) throw new Error("Failed to certify");
      const updated = await res.json();
      setReport(updated);
      setShowCertifyPanel(false);
      setViewMode("preview");
      savedContentRef.current = content;
      setHasUnsavedChanges(false);
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
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
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
                className="w-full bg-blue-600 hover:bg-blue-700"
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
                            className="p-4 prose prose-sm max-w-none dark:prose-invert text-sm"
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
                <h1 className="text-lg font-bold">Report Editor</h1>
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
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Edit actions */}
            {!isCertified && (
              <>
                {/* View mode toggle */}
                <div className="flex rounded-lg border bg-muted p-0.5">
                  <button
                    onClick={() => setViewMode("editor")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "editor"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Pencil className="h-3 w-3" />
                    Editor
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

                {/* Regenerate */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerateReport}
                  disabled={generating}
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 mr-1.5 ${generating ? "animate-spin" : ""}`}
                  />
                  Regenerate
                </Button>

                {/* Save */}
                {viewMode === "editor" && (
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

                {/* Certify */}
                <Button
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-600"
                  onClick={() => setShowCertifyPanel(true)}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Certify
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Certified actions */}
            {isCertified && (
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
                  onClick={unlockReport}
                  disabled={unlocking}
                >
                  <Unlock className="h-3.5 w-3.5 mr-1.5" />
                  {unlocking ? "Unlocking..." : "Unlock & Revise"}
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Export actions — always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/reports/${report.id}/pdf`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/reports/${report.id}/word`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
              Word
            </Button>
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
                    // User cancelled or share failed — silent
                  }
                } else {
                  const a = document.createElement("a");
                  a.href = pdfUrl;
                  a.download = "";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              }}
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </Button>
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
        {sections.length > 0 && showSectionNav && viewMode === "editor" && (
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
        {!showSectionNav && viewMode === "editor" && sections.length > 0 && (
          <button
            onClick={() => setShowSectionNav(true)}
            className="flex-none w-8 border-r bg-muted/30 flex items-center justify-center hover:bg-muted transition-colors"
            title="Show section navigation"
          >
            <List className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* Editor + Preview (split pane) or Full Preview */}
        {viewMode === "editor" && !isCertified ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Markdown Editor */}
            <div className="flex-1 flex flex-col border-r">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Pencil className="h-3 w-3" />
                Markdown Editor
                <span className="ml-auto">
                  Use # headings, **bold**, *italic*, - lists, | tables |
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="flex-1 resize-none border-0 bg-background p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0"
                spellCheck={false}
              />
            </div>

            {/* Live Preview */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="h-3 w-3" />
                Live Preview
              </div>
              <ScrollArea className="flex-1">
                <div
                  ref={previewRef}
                  className="p-6 prose prose-sm max-w-none dark:prose-invert report-live-preview"
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
          </div>
        ) : (
          /* Full Preview Mode (or certified read-only) */
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-4xl mx-auto py-6 px-4">
                {isCertified && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 mb-4">
                    <Lock className="h-4 w-4 shrink-0" />
                    This report has been certified and is locked. Use
                    &ldquo;Unlock &amp; Revise&rdquo; to make changes.
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

      {/* ---- Certification Panel ---- */}
      {showCertifyPanel && !isCertified && (
        <div className="flex-none border-t bg-emerald-50/50 dark:bg-emerald-950/10 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h3 className="font-semibold text-lg">Certify This Report</h3>
              <button
                onClick={() => {
                  setShowCertifyPanel(false);
                  setCertifyAgreed(false);
                  setSignatureText("");
                }}
                className="ml-auto text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            {/* Arborist info */}
            {arborist && (
              <div className="flex items-center gap-4 text-sm mb-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border">
                <div>
                  <span className="font-medium">{arborist.name}</span>
                  <span className="text-muted-foreground ml-2">
                    ISA #{arborist.isaCertificationNum}
                  </span>
                </div>
                {arborist.companyName && (
                  <span className="text-muted-foreground">
                    {arborist.companyName}
                  </span>
                )}
              </div>
            )}

            {/* Certification statement */}
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border text-sm mb-3">
              <p>
                I certify that I have personally inspected the tree(s)
                described in this report and that the information contained
                herein is accurate to the best of my professional knowledge
                and belief. I am an ISA Certified Arborist and the opinions
                expressed are based on my professional training, experience,
                and education.
              </p>
            </div>

            {/* Agreement checkbox */}
            <label className="flex items-start gap-2 text-sm mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={certifyAgreed}
                onChange={(e) => setCertifyAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                I agree to the certification statement above and confirm all
                information is accurate.
              </span>
            </label>

            {/* Signature input */}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Type your full name as electronic signature
                  {arborist?.signatureName && (
                    <span className="text-muted-foreground/60 ml-1">
                      (must match: {arborist.signatureName})
                    </span>
                  )}
                </label>
                <Input
                  placeholder="e.g., Alex Rivera"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  className={
                    signatureText.trim() &&
                    arborist?.signatureName &&
                    !signatureNameMatch
                      ? "border-amber-300 focus-visible:ring-amber-400"
                      : ""
                  }
                />
                {signatureText.trim() &&
                  arborist?.signatureName &&
                  !signatureNameMatch && (
                    <p className="text-xs text-amber-600 mt-1">
                      Signature must match your profile name:{" "}
                      {arborist.signatureName}
                    </p>
                  )}
              </div>
              <Button
                onClick={certifyReport}
                disabled={
                  !signatureText.trim() ||
                  !certifyAgreed ||
                  certifying ||
                  (arborist?.signatureName ? !signatureNameMatch : false)
                }
                className="bg-emerald-700 hover:bg-emerald-600"
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
        </div>
      )}

      {/* ---- Certified details bar ---- */}
      {isCertified && report && (
        <div className="flex-none border-t bg-emerald-50/50 dark:bg-emerald-950/10 px-6 py-3">
          <div className="flex items-center gap-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <span className="font-medium text-emerald-800">
              Certified
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
                    className="p-4 prose prose-sm max-w-none dark:prose-invert text-sm"
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
                  onClick={() => {
                    // Download PDF
                    const a = document.createElement("a");
                    a.href = `/api/reports/${report.id}/pdf`;
                    a.download = "";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
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
