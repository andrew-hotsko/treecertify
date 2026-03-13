"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MoreVertical,
  Flag,
  X,
  CheckCircle2,
  Download,
  Share2,
  Pencil,
  AlertTriangle,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { StatusBadge } from "@/components/status-badge";
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReviewFlag {
  sectionId: string;
  sectionTitle: string;
  note: string;
  createdAt: string;
}

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
  recommendedAction: string;
  isProtected: boolean;
  protectionReason?: string | null;
  treePhotos?: TreePhoto[];
}

interface QuickReviewProps {
  reportId: string;
  reportContent: string;
  reportStatus: string;
  propertyId: string;
  propertyAddress: string;
  propertyCity: string;
  trees: TreeRecord[];
  initialFlags: ReviewFlag[];
  onExitQuickReview: () => void;
  onStartCertification: () => void;
  onSaveFlags: (flags: ReviewFlag[]) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Section parsing — splits by ## headings
// ---------------------------------------------------------------------------

interface ReportSection {
  id: string;
  title: string;
  html: string;
  level: number; // 1 for ##, 2 for ###
}

function parseIntoSections(markdown: string): ReportSection[] {
  const lines = markdown.split("\n");
  const sections: ReportSection[] = [];
  let currentTitle = "";
  let currentLines: string[] = [];
  let currentLevel = 0;

  const flush = () => {
    if (currentTitle && currentLines.length > 0) {
      const id = currentTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const md = currentLines.join("\n");
      sections.push({
        id,
        title: currentTitle,
        html: renderMarkdownToHtml(md),
        level: currentLevel,
      });
    }
  };

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h2Match) {
      flush();
      currentTitle = h2Match[1].replace(/\*+/g, "").trim();
      currentLines = [line];
      currentLevel = 1;
    } else if (h3Match && !currentTitle) {
      // Leading ### before any ##
      flush();
      currentTitle = h3Match[1].replace(/\*+/g, "").trim();
      currentLines = [line];
      currentLevel = 2;
    } else {
      currentLines.push(line);
    }
  }
  flush();

  // If no sections parsed, treat entire content as one section
  if (sections.length === 0 && markdown.trim()) {
    sections.push({
      id: "report",
      title: "Report",
      html: renderMarkdownToHtml(markdown),
      level: 1,
    });
  }

  return sections;
}

// ---------------------------------------------------------------------------
// Condition helpers
// ---------------------------------------------------------------------------

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_COLORS: Record<number, string> = {
  0: "bg-neutral-400",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-lime-500",
  5: "bg-emerald-500",
};

const ACTION_LABELS: Record<string, { text: string; color: string }> = {
  retain: { text: "Retain", color: "text-emerald-700 bg-emerald-50" },
  remove: { text: "Remove", color: "text-red-700 bg-red-50" },
  prune: { text: "Prune", color: "text-blue-700 bg-blue-50" },
  monitor: { text: "Monitor", color: "text-amber-700 bg-amber-50" },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QuickReview({
  reportId,
  reportContent,
  reportStatus,
  propertyId,
  propertyAddress,
  propertyCity,
  trees,
  initialFlags,
  onExitQuickReview,
  onStartCertification,
  onSaveFlags,
}: QuickReviewProps) {
  const { toast } = useToast();
  const [flags, setFlags] = useState<ReviewFlag[]>(initialFlags);
  const [activeFlag, setActiveFlag] = useState<string | null>(null);
  const [flagNote, setFlagNote] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const flagInputRef = useRef<HTMLTextAreaElement>(null);

  const isCertified =
    reportStatus === "certified" || reportStatus === "filed";

  // Parse content into sections
  const sections = useMemo(
    () => parseIntoSections(reportContent),
    [reportContent]
  );

  // Flag lookup
  const flagMap = useMemo(() => {
    const map = new Map<string, ReviewFlag>();
    for (const f of flags) map.set(f.sectionId, f);
    return map;
  }, [flags]);

  const flagCount = flags.length;

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Focus flag input when opened
  useEffect(() => {
    if (activeFlag && flagInputRef.current) {
      flagInputRef.current.focus();
    }
  }, [activeFlag]);

  // Add or update a flag
  const submitFlag = useCallback(
    (sectionId: string, sectionTitle: string) => {
      if (!flagNote.trim()) return;
      const newFlag: ReviewFlag = {
        sectionId,
        sectionTitle,
        note: flagNote.trim(),
        createdAt: new Date().toISOString(),
      };
      setFlags((prev) => [
        ...prev.filter((f) => f.sectionId !== sectionId),
        newFlag,
      ]);
      setFlagNote("");
      setActiveFlag(null);
    },
    [flagNote]
  );

  // Remove a flag
  const removeFlag = useCallback((sectionId: string) => {
    setFlags((prev) => prev.filter((f) => f.sectionId !== sectionId));
  }, []);

  // Send back for revision
  const sendBackForRevision = useCallback(async () => {
    setSaving(true);
    try {
      await onSaveFlags(flags);
      // Update status back to review (or keep draft) with flags attached
      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "review",
          reviewFlags: JSON.stringify(flags),
        }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Sent back for revision",
        description: `${flagCount} section${flagCount !== 1 ? "s" : ""} flagged for changes`,
      });
      onExitQuickReview();
    } catch {
      toast({
        title: "Could not update report",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [flags, flagCount, reportId, onSaveFlags, toast, onExitQuickReview]);

  // Share with client
  const shareWithClient = useCallback(async () => {
    try {
      const res = await fetch(`/api/properties/${propertyId}/share`, {
        method: "POST",
      });
      if (res.ok) {
        const { shareToken } = await res.json();
        const shareUrl = `${window.location.origin}/share/${shareToken}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Share link copied",
          description: "The link has been copied to your clipboard.",
        });
      }
    } catch {
      toast({
        title: "Could not create share link",
        variant: "destructive",
      });
    }
  }, [propertyId, toast]);

  // Download PDF
  const downloadPdf = useCallback(async () => {
    try {
      const res = await fetch(`/api/reports/${reportId}/pdf`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast({
        title: "PDF download failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [reportId, toast]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Sticky header ── */}
      <div className="flex-none sticky top-0 z-20 bg-background border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExitQuickReview}
            className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold font-display truncate">
              {propertyAddress}
            </p>
            <p className="text-xs text-muted-foreground">{propertyCity}</p>
          </div>
          <StatusBadge status={reportStatus} />

          {/* Three-dot menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-lg shadow-lg z-30 py-1">
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 flex items-center gap-2"
                  onClick={() => {
                    setMenuOpen(false);
                    onExitQuickReview();
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  Open Full Editor
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 flex items-center gap-2"
                  onClick={() => {
                    setMenuOpen(false);
                    downloadPdf();
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Flag count banner */}
          {flagCount > 0 && !isCertified && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 mb-5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm text-amber-800">
                {flagCount} section{flagCount !== 1 ? "s" : ""} flagged for
                revision
              </span>
            </div>
          )}

          {/* Report sections */}
          {sections.map((section) => {
            const flag = flagMap.get(section.id);
            const isFlagging = activeFlag === section.id;

            return (
              <div
                key={section.id}
                className={cn(
                  "relative mb-6",
                  flag && "border-l-2 border-amber-400 pl-4"
                )}
              >
                {/* Section content */}
                <div
                  className="quick-review-content"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />

                {/* Flag indicator */}
                {flag && !isFlagging && (
                  <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2">
                    <Flag className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-amber-800">{flag.note}</p>
                    </div>
                    {!isCertified && (
                      <button
                        type="button"
                        onClick={() => removeFlag(section.id)}
                        className="p-1 rounded hover:bg-amber-100 shrink-0"
                      >
                        <X className="h-3.5 w-3.5 text-amber-600" />
                      </button>
                    )}
                  </div>
                )}

                {/* Flag input */}
                {isFlagging && (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      ref={flagInputRef}
                      placeholder="What needs to change?"
                      value={flagNote}
                      onChange={(e) => setFlagNote(e.target.value)}
                      className="text-sm min-h-[60px] resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700"
                        disabled={!flagNote.trim()}
                        onClick={() =>
                          submitFlag(section.id, section.title)
                        }
                      >
                        <Flag className="h-3.5 w-3.5 mr-1" />
                        Flag Section
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setActiveFlag(null);
                          setFlagNote("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Flag button (only for non-certified, when not already flagging) */}
                {!isCertified && !isFlagging && !flag && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFlag(section.id);
                      setFlagNote("");
                    }}
                    className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-600 transition-colors py-1"
                  >
                    <Flag className="h-3 w-3" />
                    Flag this section
                  </button>
                )}
              </div>
            );
          })}

          {/* ── Tree inventory cards ── */}
          {trees.length > 0 && (
            <div className="mt-8 mb-6">
              <h2 className="text-base font-semibold font-display text-foreground mb-3">
                Tree Inventory
              </h2>
              <div className="space-y-3">
                {trees.map((tree) => {
                  const action = ACTION_LABELS[tree.recommendedAction] || {
                    text: tree.recommendedAction,
                    color: "text-neutral-700 bg-neutral-50",
                  };
                  return (
                    <div
                      key={tree.id}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">
                            Tree #{tree.treeNumber} &mdash;{" "}
                            {tree.speciesCommon}
                          </p>
                          {tree.speciesScientific && (
                            <p className="text-xs text-muted-foreground italic">
                              {tree.speciesScientific}
                            </p>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            action.color
                          )}
                        >
                          {action.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                        <span>{tree.dbhInches}&quot; DBH</span>
                        {tree.heightFt && <span>{tree.heightFt} ft</span>}
                        {tree.canopySpreadFt && (
                          <span>{tree.canopySpreadFt} ft spread</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            CONDITION_COLORS[tree.conditionRating] ||
                              "bg-neutral-400"
                          )}
                        />
                        <span className="text-xs">
                          {CONDITION_LABELS[tree.conditionRating] || "Unknown"}
                        </span>
                        {tree.isProtected && (
                          <span className="text-xs text-[#1D4E3E] font-medium flex items-center gap-1">
                            <span className="text-[10px]">&#128737;</span>{" "}
                            Protected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky bottom action bar ── */}
      <div className="flex-none sticky bottom-0 z-20 bg-background border-t px-4 py-4 safe-area-bottom">
        {isCertified ? (
          /* Certified: Share + Download */
          <div className="flex gap-3 max-w-2xl mx-auto">
            <Button
              className="flex-1 bg-[#1D4E3E] hover:bg-[#2A6B55] h-[52px] text-base"
              onClick={shareWithClient}
            >
              <Share2 className="h-4.5 w-4.5 mr-2" />
              Share with Client
            </Button>
            <Button
              variant="outline"
              className="h-[52px]"
              onClick={downloadPdf}
            >
              <Download className="h-4.5 w-4.5" />
            </Button>
          </div>
        ) : flagCount > 0 ? (
          /* Has flags: Send Back + Certify Anyway */
          <div className="max-w-2xl mx-auto space-y-2">
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 h-[52px] text-base"
              disabled={saving}
              onClick={sendBackForRevision}
            >
              <Send className="h-4.5 w-4.5 mr-2" />
              {saving
                ? "Saving..."
                : `Send Back for Revision (${flagCount} flag${flagCount !== 1 ? "s" : ""})`}
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
              onClick={onStartCertification}
            >
              Certify anyway
            </button>
          </div>
        ) : (
          /* No flags: Certify */
          <div className="max-w-2xl mx-auto">
            <Button
              className="w-full bg-[#1D4E3E] hover:bg-[#2A6B55] h-[52px] text-base"
              onClick={onStartCertification}
            >
              <CheckCircle2 className="h-4.5 w-4.5 mr-2" />
              Certify Report
            </Button>
          </div>
        )}
      </div>

      {/* ── Inline styles for quick review content ── */}
      <style jsx global>{`
        .quick-review-content {
          font-family: "Roboto", system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #3a3a36;
        }
        .quick-review-content h1,
        .quick-review-content h2 {
          font-family: "Instrument Sans", system-ui, sans-serif;
          font-weight: 600;
          color: #1d4e3e;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          padding-bottom: 0.3em;
          border-bottom: 1px solid #e5e4df;
        }
        .quick-review-content h1 {
          font-size: 18px;
          border-bottom-width: 2px;
        }
        .quick-review-content h2 {
          font-size: 16px;
        }
        .quick-review-content h3 {
          font-family: "Instrument Sans", system-ui, sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #333;
          margin-top: 1.2em;
          margin-bottom: 0.4em;
        }
        .quick-review-content p {
          margin-bottom: 0.8em;
        }
        .quick-review-content ul,
        .quick-review-content ol {
          padding-left: 1.5em;
          margin-bottom: 0.8em;
        }
        .quick-review-content li {
          margin-bottom: 0.3em;
        }
        .quick-review-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1em;
          font-size: 13px;
          overflow-x: auto;
          display: block;
        }
        .quick-review-content th {
          background: #1d4e3e;
          color: white;
          padding: 6px 10px;
          text-align: left;
          font-size: 12px;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
        .quick-review-content td {
          padding: 6px 10px;
          border-bottom: 1px solid #e5e4df;
        }
        .quick-review-content tr:nth-child(even) td {
          background: #fefdfb;
        }
        .quick-review-content strong {
          font-weight: 600;
        }
        .safe-area-bottom {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
