"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Save,
  Upload,
  Trash2,
  Building2,
  User,
  Globe,
  ImageIcon,
  FileText,
  X,
  Camera,
} from "lucide-react";

interface ArboristProfile {
  id: string;
  name: string;
  email: string;
  isaCertificationNum: string;
  companyName: string | null;
  phone: string | null;
  companyLogoUrl: string | null;
  companyAddress: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  companyWebsite: string | null;
  licenseNumbers: string | null;
  signatureName: string | null;
  traqCertified: boolean;
  additionalCerts: string | null;
  reportDefaults?: string | null;
  profilePhotoUrl?: string | null;
}

interface ReportDefaults {
  includeTraq: boolean;
  includeCoverLetter: boolean;
  includePhotos: boolean;
  includeAppendix: boolean;
  defaultReportType: string;
  companyDisclaimer: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ArboristProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    isaCertificationNum: "",
    companyName: "",
    phone: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    licenseNumbers: "",
    signatureName: "",
    traqCertified: false,
    additionalCerts: "",
  });

  const defaultReportDefaults: ReportDefaults = {
    includeTraq: true,
    includeCoverLetter: true,
    includePhotos: true,
    includeAppendix: true,
    defaultReportType: "health_assessment",
    companyDisclaimer: "",
  };

  const [reportDefaults, setReportDefaults] = useState<ReportDefaults>(defaultReportDefaults);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data: ArboristProfile = await res.json();
        setProfile(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          isaCertificationNum: data.isaCertificationNum || "",
          companyName: data.companyName || "",
          phone: data.phone || "",
          companyAddress: data.companyAddress || "",
          companyPhone: data.companyPhone || "",
          companyEmail: data.companyEmail || "",
          companyWebsite: data.companyWebsite || "",
          licenseNumbers: data.licenseNumbers || "",
          signatureName: data.signatureName || "",
          traqCertified: data.traqCertified ?? false,
          additionalCerts: data.additionalCerts || "",
        });
        // Parse report defaults
        try {
          const parsed = JSON.parse(data.reportDefaults || "{}");
          setReportDefaults({
            includeTraq: parsed.includeTraq ?? true,
            includeCoverLetter: parsed.includeCoverLetter ?? true,
            includePhotos: parsed.includePhotos ?? true,
            includeAppendix: parsed.includeAppendix ?? true,
            defaultReportType: parsed.defaultReportType || "health_assessment",
            companyDisclaimer: parsed.companyDisclaimer || "",
          });
        } catch {
          // Use defaults if parsing fails
        }
      } catch (err) {
        setMessage({
          type: "error",
          text: err instanceof Error ? err.message : "Failed to load",
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          reportDefaults: JSON.stringify(reportDefaults),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setProfile(updated);
      setMessage({ type: "success", text: "Profile saved successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/arborist/logo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: data.companyLogoUrl } : prev
      );
      setMessage({ type: "success", text: "Logo uploaded successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteLogo = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/logo", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: null } : prev
      );
      setMessage({ type: "success", text: "Logo removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  const uploadPhoto = async (file: File) => {
    setUploadingPhoto(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/arborist/photo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setProfile((prev) =>
        prev ? { ...prev, profilePhotoUrl: data.url } : prev
      );
      setMessage({ type: "success", text: "Profile photo uploaded successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const deletePhoto = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/photo", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProfile((prev) =>
        prev ? { ...prev, profilePhotoUrl: null } : prev
      );
      setMessage({ type: "success", text: "Profile photo removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your arborist profile and company branding
      </p>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm mb-6 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Photo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="h-5 w-5 text-emerald-600" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                {profile?.profilePhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profilePhotoUrl}
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                )}
              </div>
              {profile?.profilePhotoUrl && (
                <button
                  onClick={deletePhoto}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  title="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                ref={photoInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadPhoto(file);
                  e.target.value = "";
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => photoInputRef.current?.click()}
                disabled={uploadingPhoto}
              >
                {uploadingPhoto ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1.5" />
                )}
                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Square image recommended &bull; Max 10 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Logo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-5 w-5 text-emerald-600" />
            Company Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shrink-0">
              {profile?.companyLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.companyLogoUrl}
                  alt="Company logo"
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <Building2 className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadLogo(file);
                  e.target.value = "";
                }}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-1.5" />
                  )}
                  {uploading ? "Uploading..." : "Upload Logo"}
                </Button>
                {profile?.companyLogoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteLogo}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP, or SVG &bull; Max 10 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arborist Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5 text-emerald-600" />
            Arborist Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ISA Certification #</Label>
              <Input
                value={form.isaCertificationNum}
                onChange={(e) =>
                  updateField("isaCertificationNum", e.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>License Numbers</Label>
              <Input
                placeholder="e.g., CA-QCLP #1234"
                value={form.licenseNumbers}
                onChange={(e) => updateField("licenseNumbers", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Signature Name (for certifications)</Label>
            <Input
              placeholder="e.g., Alex Rivera, ISA Board Certified Master Arborist"
              value={form.signatureName}
              onChange={(e) => updateField("signatureName", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="traq-certified"
              checked={form.traqCertified}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, traqCertified: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <Label htmlFor="traq-certified" className="cursor-pointer">
              TRAQ Qualified (ISA Tree Risk Assessment Qualification)
            </Label>
          </div>
          <div>
            <Label>Additional Certifications</Label>
            <Input
              placeholder="e.g., BCMA, Utility Specialist, Municipal Specialist"
              value={form.additionalCerts}
              onChange={(e) => updateField("additionalCerts", e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated list of additional ISA or industry certifications
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-5 w-5 text-emerald-600" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
              placeholder="123 Main St, City, CA 94000"
              value={form.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.companyEmail}
                onChange={(e) => updateField("companyEmail", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="https://example.com"
                value={form.companyWebsite}
                onChange={(e) => updateField("companyWebsite", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Defaults */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-emerald-600" />
            Report Defaults
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Toggle switches */}
          <div className="space-y-3">
            {[
              { key: "includeTraq" as const, label: "Include TRAQ Assessment" },
              { key: "includeCoverLetter" as const, label: "Include Cover Letter" },
              { key: "includePhotos" as const, label: "Include Photo Appendix" },
              { key: "includeAppendix" as const, label: "Include Tree Data Appendix" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="cursor-pointer" htmlFor={`rd-${key}`}>
                  {label}
                </Label>
                <button
                  id={`rd-${key}`}
                  type="button"
                  role="switch"
                  aria-checked={reportDefaults[key]}
                  onClick={() =>
                    setReportDefaults((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                    reportDefaults[key] ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                      reportDefaults[key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Default report type */}
          <div>
            <Label htmlFor="default-report-type">Default Report Type</Label>
            <select
              id="default-report-type"
              value={reportDefaults.defaultReportType}
              onChange={(e) =>
                setReportDefaults((prev) => ({
                  ...prev,
                  defaultReportType: e.target.value,
                }))
              }
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="health_assessment">Health Assessment</option>
              <option value="removal_permit">Removal Permit</option>
              <option value="tree_valuation">Tree Valuation</option>
              <option value="construction_encroachment">Construction &amp; Encroachment</option>
            </select>
          </div>

          {/* Company disclaimer */}
          <div>
            <Label htmlFor="company-disclaimer">Company Disclaimer</Label>
            <textarea
              id="company-disclaimer"
              rows={3}
              placeholder="Optional disclaimer text to appear in report footers..."
              value={reportDefaults.companyDisclaimer}
              onChange={(e) =>
                setReportDefaults((prev) => ({
                  ...prev,
                  companyDisclaimer: e.target.value,
                }))
              }
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text will appear as a footer disclaimer on generated reports
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-emerald-700 hover:bg-emerald-600"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
