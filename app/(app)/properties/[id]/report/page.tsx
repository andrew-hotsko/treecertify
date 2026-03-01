"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Sparkles,
  Save,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Download,
  FileText,
  Eye,
  Pencil,
  Lock,
  FileDown,
} from "lucide-react";
import { ReportPreview } from "@/components/report-preview";
import { getReportTypeConfig } from "@/lib/report-types";

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
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

export default function PropertyReportPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [arborist, setArborist] = useState<{
    name: string;
    companyName: string | null;
    isaCertificationNum: string;
    companyLogoUrl?: string | null;
    companyAddress?: string | null;
    companyPhone?: string | null;
    companyEmail?: string | null;
    companyWebsite?: string | null;
  } | null>(null);
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [signatureText, setSignatureText] = useState("");
  const [showCertifyForm, setShowCertifyForm] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certifying, setCertifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setContent(r.finalContent || r.aiDraftContent || "");
          setReportType(r.reportType);
          // Start in preview mode when report exists
          setViewMode("preview");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  const generateReport = async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, reportType }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate report");
      }
      const newReport = await res.json();
      setReport(newReport);
      setContent(newReport.aiDraftContent || "");
      // Auto-switch to preview after generation
      setViewMode("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const saveReport = async () => {
    if (!report) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalContent: content, status: "review" }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setReport(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const certifyReport = async () => {
    if (!report || !signatureText.trim()) return;
    setCertifying(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eSignatureText: signatureText.trim() }),
      });
      if (!res.ok) throw new Error("Failed to certify");
      const updated = await res.json();
      setReport(updated);
      setShowCertifyForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Certification failed");
    } finally {
      setCertifying(false);
    }
  };

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

  const isCertified = report?.status === "certified";
  const protectedCount = property.trees.filter((t) => t.isProtected).length;

  return (
    <div>
      <Link
        href={`/properties/${propertyId}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Property
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Report Editor</h1>
            {report && <StatusBadge status={report.status} />}
          </div>
          <p className="text-muted-foreground mt-1">
            {property.address}, {property.city} &mdash; {property.trees.length}{" "}
            tree{property.trees.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {report && !isCertified && viewMode === "edit" && (
            <Button variant="outline" onClick={saveReport} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Draft"}
            </Button>
          )}
          {report && !isCertified && viewMode === "preview" && (
            <Button
              className="bg-emerald-700 hover:bg-emerald-600"
              onClick={() => setShowCertifyForm(true)}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Certify
            </Button>
          )}
          {isCertified && (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-sm px-3 py-1.5">
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              Certified
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {!report ? (
            // Generate Report UI
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Generate AI Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Report Type:</Label>
                  <Badge variant="outline">
                    {getReportTypeConfig(reportType)?.label ||
                      reportType
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Badge>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800">
                  <p className="font-medium mb-2">
                    The AI will generate a multi-tree report including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Assignment &amp; Purpose</li>
                    <li>Tree Inventory table ({property.trees.length} trees)</li>
                    <li>Individual Tree Assessments</li>
                    <li>Protected Status Summary</li>
                    <li>Recommendations &amp; Mitigation</li>
                    <li>Arborist Certification Statement</li>
                  </ul>
                </div>

                <Button
                  onClick={generateReport}
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
                    Add at least one tree to the property before generating a
                    report.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            // Report with Preview / Edit Tabs
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Report Content</CardTitle>
                  <Badge variant="outline" className="ml-auto">
                    {getReportTypeConfig(report.reportType)?.label ||
                      report.reportType
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={viewMode}
                  onValueChange={(v) => setViewMode(v as "preview" | "edit")}
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview" className="gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="edit"
                      disabled={isCertified}
                      className="gap-1.5"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </TabsTrigger>
                  </TabsList>

                  {/* Preview Tab */}
                  <TabsContent value="preview">
                    <ReportPreview
                      content={content}
                      property={property}
                      trees={property.trees}
                      arborist={arborist}
                      reportType={report.reportType}
                      certifiedAt={report.certifiedAt}
                      eSignatureText={report.eSignatureText}
                    />
                  </TabsContent>

                  {/* Edit Tab */}
                  <TabsContent value="edit">
                    {isCertified ? (
                      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 mb-3">
                        <Lock className="h-4 w-4 shrink-0" />
                        This report has been certified and cannot be edited.
                      </div>
                    ) : (
                      <>
                        <Textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="min-h-[600px] font-mono text-sm leading-relaxed"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Tip: Use Markdown formatting &mdash; # headings,
                          **bold**, *italic*, - lists, | tables |
                        </p>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Certify Form */}
          {showCertifyForm && !isCertified && (
            <Card className="mt-6 border-emerald-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3">
                  Certify This Report
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  By certifying, you confirm that you have reviewed this report
                  and that the information is accurate to the best of your
                  professional knowledge. Your ISA certification number and
                  timestamp will be attached.
                </p>
                <div className="space-y-3">
                  <div>
                    <Label>Electronic Signature (type your full name)</Label>
                    <Input
                      placeholder="e.g., Alex Rivera, ISA WE-12345A"
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={certifyReport}
                      disabled={!signatureText.trim() || certifying}
                      className="bg-emerald-700 hover:bg-emerald-600"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      {certifying ? "Certifying..." : "Certify Report"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCertifyForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certification Details */}
          {isCertified && report && (
            <Card className="mt-6 border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Report Certified</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Electronically signed by: {report.eSignatureText}
                </p>
                <p className="text-sm text-muted-foreground">
                  Certified on:{" "}
                  {report.certifiedAt
                    ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Tree Inventory */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Tree Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {property.trees.map((tree) => (
                  <div
                    key={tree.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      {tree.treeNumber}
                    </span>
                    <span className="truncate flex-1">
                      {tree.speciesCommon || "Unidentified"}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {tree.dbhInches}&Prime;
                    </span>
                    {tree.isProtected && (
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                {property.trees.length} tree
                {property.trees.length !== 1 ? "s" : ""} &middot;{" "}
                {protectedCount} protected
              </div>
            </CardContent>
          </Card>

          {/* Export Buttons — visible whenever report exists (ungated from certification) */}
          {report && (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open(`/api/reports/${report.id}/pdf`, "_blank")
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open(`/api/reports/${report.id}/word`, "_blank")
                }
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download Word
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
