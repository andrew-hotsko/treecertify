"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  DollarSign,
  Sparkles,
  Mic,
  Cpu,
  Receipt,
  Stethoscope,
  TreePine,
  GripVertical,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Observation,
  getDefaultHealthObservations,
  getDefaultStructuralObservations,
  getDefaultRecommendationMap,
  LOCKED_OBSERVATION_COUNT,
} from "@/lib/default-observations";
import { PENINSULA_SPECIES } from "@/lib/species";
import { ACTION_OPTIONS, CONDITION_LABELS } from "@/lib/observation-helpers";

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
  invoiceHourlyRate?: number | null;
  invoiceDefaultFee?: number | null;
  invoicePaymentInstructions?: string | null;
  invoicePrefix?: string;
  invoiceNetTerms?: string;
  showBillingOnShare?: boolean;
  defaultReportFee?: number | null;
  billingPaymentInstructions?: string | null;
  // Customization
  healthObservations?: string | null;
  structuralObservations?: string | null;
  commonSpecies?: string | null;
  defaultRecommendationMap?: string | null;
  defaultScopeTemplate?: string | null;
  pdfShowTraqAppendix?: boolean;
  pdfShowCityContacts?: boolean;
  pdfCoverAccentColor?: string | null;
  shareDefaultMessage?: string | null;
  shareThankYouMessage?: string | null;
  photoRequiredCount?: number;
  defaultValuationUnitPrice?: number | null;
}

interface ReportDefaults {
  includeTraq: boolean;
  includeCoverLetter: boolean;
  includePhotos: boolean;
  includeAppendix: boolean;
  defaultReportType: string;
  companyDisclaimer: string;
  recommendationMap?: Record<string, string>;
  scopeTemplates?: Record<string, string>;
}

function SortableObservationItem({
  obs,
  index,
  onToggle,
  onRename,
  onDelete,
}: {
  obs: Observation;
  index: number;
  onToggle: () => void;
  onRename: (newLabel: string) => void;
  onDelete: (() => void) | null;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: obs.id });
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(obs.label);
  const isLocked = index < LOCKED_OBSERVATION_COUNT;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
        obs.enabled ? "bg-white border-neutral-200" : "bg-neutral-50 border-neutral-100 opacity-60"
      }`}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600 touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={obs.enabled}
        disabled={isLocked}
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${
          isLocked
            ? "bg-forest/50 cursor-not-allowed"
            : obs.enabled
            ? "bg-forest/50 cursor-pointer"
            : "bg-neutral-300 cursor-pointer"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            obs.enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>

      {editing ? (
        <input
          type="text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          onBlur={() => {
            if (editLabel.trim()) onRename(editLabel.trim());
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (editLabel.trim()) onRename(editLabel.trim());
              setEditing(false);
            }
            if (e.key === "Escape") {
              setEditLabel(obs.label);
              setEditing(false);
            }
          }}
          className="flex-1 text-sm border border-forest/30 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-forest"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-sm cursor-pointer hover:text-forest"
          onClick={() => {
            setEditLabel(obs.label);
            setEditing(true);
          }}
        >
          {obs.label}
        </span>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="text-neutral-400 hover:text-red-500 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
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

  // Usage data state
  interface UsageData {
    monthly: {
      cost: number;
      inputTokens: number;
      outputTokens: number;
      callCount: number;
      reportCount: number;
      avgCostPerReport: number;
      byEndpoint: Record<string, { count: number; cost: number }>;
    };
    allTime: {
      cost: number;
      callCount: number;
      inputTokens: number;
      outputTokens: number;
    };
  }
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);

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
    showBillingOnShare: true,
    defaultReportFee: "",
    billingPaymentInstructions: "",
  });

  const defaultReportDefaults: ReportDefaults = {
    includeTraq: true,
    includeCoverLetter: true,
    includePhotos: true,
    includeAppendix: true,
    defaultReportType: "health_assessment",
    companyDisclaimer: "",
    recommendationMap: undefined,
    scopeTemplates: undefined,
  };

  const [reportDefaults, setReportDefaults] = useState<ReportDefaults>(defaultReportDefaults);

  // Observation library state
  const [healthObs, setHealthObs] = useState<Observation[]>([]);
  const [structuralObs, setStructuralObs] = useState<Observation[]>([]);
  const [obsChanged, setObsChanged] = useState(false);
  const [savingObs, setSavingObs] = useState(false);

  // Species presets state
  const [commonSpecies, setCommonSpecies] = useState<string[]>([]);
  const [speciesSearch, setSpeciesSearch] = useState("");
  const [savingSpecies, setSavingSpecies] = useState(false);

  // PDF & Share state
  const [pdfShareForm, setPdfShareForm] = useState({
    pdfShowTraqAppendix: true,
    pdfShowCityContacts: true,
    photoRequiredCount: "2",
    shareDefaultMessage: "",
    shareThankYouMessage: "",
  });
  const [savingPdfShare, setSavingPdfShare] = useState(false);

  // Valuation defaults state
  const [valuationUnitPrice, setValuationUnitPrice] = useState<string>("");
  const [savingValuation, setSavingValuation] = useState(false);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
          showBillingOnShare: data.showBillingOnShare ?? true,
          defaultReportFee: data.defaultReportFee != null ? String(data.defaultReportFee) : "",
          billingPaymentInstructions: data.billingPaymentInstructions || "",
        });
        setValuationUnitPrice(data.defaultValuationUnitPrice ? String(data.defaultValuationUnitPrice) : "");
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

        // Load observation library
        try {
          const hObs = data.healthObservations ? JSON.parse(data.healthObservations) : null;
          const sObs = data.structuralObservations ? JSON.parse(data.structuralObservations) : null;
          setHealthObs(hObs || getDefaultHealthObservations());
          setStructuralObs(sObs || getDefaultStructuralObservations());
        } catch {
          setHealthObs(getDefaultHealthObservations());
          setStructuralObs(getDefaultStructuralObservations());
        }

        // Load species presets
        try {
          const species = data.commonSpecies ? JSON.parse(data.commonSpecies) : [];
          setCommonSpecies(species);
        } catch {
          setCommonSpecies([]);
        }

        // Load recommendation map into reportDefaults
        try {
          const parsed = JSON.parse(data.reportDefaults || "{}");
          setReportDefaults(prev => ({
            ...prev,
            recommendationMap: parsed.recommendationMap || getDefaultRecommendationMap(),
            scopeTemplates: parsed.scopeTemplates || {},
          }));
        } catch {
          // Use defaults
        }

        // Load PDF & Share preferences
        setPdfShareForm({
          pdfShowTraqAppendix: data.pdfShowTraqAppendix ?? true,
          pdfShowCityContacts: data.pdfShowCityContacts ?? true,
          photoRequiredCount: String(data.photoRequiredCount ?? 2),
          shareDefaultMessage: data.shareDefaultMessage || "",
          shareThankYouMessage: data.shareThankYouMessage || "",
        });
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

  // Load usage data
  useEffect(() => {
    async function loadUsage() {
      setUsageLoading(true);
      try {
        const res = await fetch("/api/arborist/usage");
        if (res.ok) {
          setUsageData(await res.json());
        }
      } catch {
        // Non-critical — silently fail
      } finally {
        setUsageLoading(false);
      }
    }
    loadUsage();
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
          defaultReportFee: form.defaultReportFee ? parseFloat(form.defaultReportFee as string) : null,
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

  const saveObservations = async () => {
    setSavingObs(true);
    try {
      const res = await fetch("/api/settings/observations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          healthObservations: healthObs,
          structuralObservations: structuralObs,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setObsChanged(false);
      setMessage({ type: "success", text: "Observation library saved" });
    } catch {
      setMessage({ type: "error", text: "Failed to save observation library" });
    } finally {
      setSavingObs(false);
    }
  };

  const saveSpeciesPresets = async () => {
    setSavingSpecies(true);
    try {
      const res = await fetch("/api/settings/species-presets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commonSpecies }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage({ type: "success", text: "Species presets saved" });
    } catch {
      setMessage({ type: "error", text: "Failed to save species presets" });
    } finally {
      setSavingSpecies(false);
    }
  };

  const savePdfSharePrefs = async () => {
    setSavingPdfShare(true);
    try {
      const res = await fetch("/api/settings/pdf-share", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfShowTraqAppendix: pdfShareForm.pdfShowTraqAppendix,
          pdfShowCityContacts: pdfShareForm.pdfShowCityContacts,
          photoRequiredCount: parseInt(pdfShareForm.photoRequiredCount, 10),
          shareDefaultMessage: pdfShareForm.shareDefaultMessage,
          shareThankYouMessage: pdfShareForm.shareThankYouMessage,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage({ type: "success", text: "PDF & share preferences saved" });
    } catch {
      setMessage({ type: "error", text: "Failed to save preferences" });
    } finally {
      setSavingPdfShare(false);
    }
  };

  const saveValuationDefaults = async () => {
    setSavingValuation(true);
    try {
      const res = await fetch("/api/settings/valuation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          defaultValuationUnitPrice: valuationUnitPrice ? parseFloat(valuationUnitPrice) : null,
        }),
      });
      if (!res.ok) throw new Error();
      setMessage({ type: "success", text: "Valuation defaults saved" });
    } catch {
      setMessage({ type: "error", text: "Failed to save valuation defaults" });
    } finally {
      setSavingValuation(false);
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
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold font-display mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your arborist profile and company branding
      </p>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm mb-6 ${
            message.type === "success"
              ? "bg-forest/5 border-forest/20 text-forest"
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
            <Camera className="h-5 w-5 text-forest" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-neutral-200 bg-neutral-50 overflow-hidden">
                {profile?.profilePhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profilePhotoUrl}
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-neutral-300" />
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
            <ImageIcon className="h-5 w-5 text-forest" />
            Company Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 overflow-hidden shrink-0">
              {profile?.companyLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.companyLogoUrl}
                  alt="Company logo"
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <Building2 className="h-8 w-8 text-neutral-300" />
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
            <User className="h-5 w-5 text-forest" />
            Arborist Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="h-4 w-4 rounded border-neutral-300 text-forest focus:ring-forest-light"
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
            <Globe className="h-5 w-5 text-forest" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <FileText className="h-5 w-5 text-forest" />
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
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-light focus-visible:ring-offset-2 ${
                    reportDefaults[key] ? "bg-forest/50" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-neutral-50 shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
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

          {/* Recommendation Map */}
          <div>
            <Label className="text-sm font-medium">Default Action by Condition Rating</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Auto-select a recommended action when you rate a tree&apos;s condition
            </p>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-neutral-600 flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        rating === 0
                          ? "bg-gray-700"
                          : rating === 1
                          ? "bg-red-500"
                          : rating === 2
                          ? "bg-orange-500"
                          : rating === 3
                          ? "bg-amber-500"
                          : rating === 4
                          ? "bg-emerald-500"
                          : "bg-green-600"
                      }`}
                    />
                    {CONDITION_LABELS[rating]}
                  </span>
                  <select
                    value={(reportDefaults.recommendationMap || getDefaultRecommendationMap())[String(rating)] || "retain"}
                    onChange={(e) =>
                      setReportDefaults((prev) => ({
                        ...prev,
                        recommendationMap: {
                          ...(prev.recommendationMap || getDefaultRecommendationMap()),
                          [String(rating)]: e.target.value,
                        },
                      }))
                    }
                    className="flex h-8 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {ACTION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Scope Templates */}
          <div>
            <Label className="text-sm font-medium">Scope of Assignment Templates</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Use {"{count}"} for tree count and {"{address}"} for property address
            </p>
            <div className="space-y-3">
              {[
                { key: "removal_permit", label: "Removal Permit" },
                { key: "health_assessment", label: "Health Assessment" },
                { key: "construction_encroachment", label: "Construction & Encroachment" },
                { key: "tree_valuation", label: "Tree Valuation" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor={`scope-${key}`} className="text-xs text-neutral-600">
                      {label}
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-neutral-500 hover:text-forest transition-colors flex items-center gap-1"
                      onClick={() => {
                        setReportDefaults((prev) => ({
                          ...prev,
                          scopeTemplates: {
                            ...(prev.scopeTemplates || {}),
                            [key]: "",
                          },
                        }));
                      }}
                    >
                      <RotateCcw className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                  <textarea
                    id={`scope-${key}`}
                    rows={2}
                    placeholder="Leave blank to use built-in default..."
                    value={(reportDefaults.scopeTemplates || {})[key] || ""}
                    onChange={(e) =>
                      setReportDefaults((prev) => ({
                        ...prev,
                        scopeTemplates: {
                          ...(prev.scopeTemplates || {}),
                          [key]: e.target.value,
                        },
                      }))
                    }
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/* Observation Library */}
      {/* ================================================================ */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Stethoscope className="h-5 w-5 text-forest" />
            Observation Library
            {obsChanged && (
              <span className="h-2 w-2 rounded-full bg-amber-500" title="Unsaved changes" />
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize the observation checklists shown during tree assessments. Drag to reorder, click to rename.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Health Observations */}
          <div>
            <h4 className="text-sm font-medium mb-2">Health Observations</h4>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                  setHealthObs((items) => {
                    const oldIndex = items.findIndex((i) => i.id === active.id);
                    const newIndex = items.findIndex((i) => i.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                  });
                  setObsChanged(true);
                }
              }}
            >
              <SortableContext items={healthObs.map((o) => o.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1">
                  {healthObs.map((obs, idx) => (
                    <SortableObservationItem
                      key={obs.id}
                      obs={obs}
                      index={idx}
                      onToggle={() => {
                        if (idx < LOCKED_OBSERVATION_COUNT) return;
                        setHealthObs((prev) =>
                          prev.map((o) => (o.id === obs.id ? { ...o, enabled: !o.enabled } : o))
                        );
                        setObsChanged(true);
                      }}
                      onRename={(newLabel) => {
                        setHealthObs((prev) =>
                          prev.map((o) =>
                            o.id === obs.id
                              ? { ...o, label: newLabel, canonical: o.builtIn ? o.canonical : `(custom) ${newLabel}` }
                              : o
                          )
                        );
                        setObsChanged(true);
                      }}
                      onDelete={
                        !obs.builtIn
                          ? () => {
                              setHealthObs((prev) => prev.filter((o) => o.id !== obs.id));
                              setObsChanged(true);
                            }
                          : null
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex items-center gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const label = prompt("Enter custom health observation:");
                  if (label?.trim()) {
                    setHealthObs((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        label: label.trim(),
                        canonical: `(custom) ${label.trim()}`,
                        enabled: true,
                        builtIn: false,
                      },
                    ]);
                    setObsChanged(true);
                  }
                }}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Custom
              </Button>
              <button
                type="button"
                className="text-xs text-neutral-500 hover:text-forest transition-colors flex items-center gap-1"
                onClick={() => {
                  setHealthObs(getDefaultHealthObservations());
                  setObsChanged(true);
                }}
              >
                <RotateCcw className="h-3 w-3" />
                Reset to Defaults
              </button>
            </div>
          </div>

          {/* Structural Observations */}
          <div>
            <h4 className="text-sm font-medium mb-2">Structural Observations</h4>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                  setStructuralObs((items) => {
                    const oldIndex = items.findIndex((i) => i.id === active.id);
                    const newIndex = items.findIndex((i) => i.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                  });
                  setObsChanged(true);
                }
              }}
            >
              <SortableContext items={structuralObs.map((o) => o.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1">
                  {structuralObs.map((obs, idx) => (
                    <SortableObservationItem
                      key={obs.id}
                      obs={obs}
                      index={idx}
                      onToggle={() => {
                        if (idx < LOCKED_OBSERVATION_COUNT) return;
                        setStructuralObs((prev) =>
                          prev.map((o) => (o.id === obs.id ? { ...o, enabled: !o.enabled } : o))
                        );
                        setObsChanged(true);
                      }}
                      onRename={(newLabel) => {
                        setStructuralObs((prev) =>
                          prev.map((o) =>
                            o.id === obs.id
                              ? { ...o, label: newLabel, canonical: o.builtIn ? o.canonical : `(custom) ${newLabel}` }
                              : o
                          )
                        );
                        setObsChanged(true);
                      }}
                      onDelete={
                        !obs.builtIn
                          ? () => {
                              setStructuralObs((prev) => prev.filter((o) => o.id !== obs.id));
                              setObsChanged(true);
                            }
                          : null
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex items-center gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const label = prompt("Enter custom structural observation:");
                  if (label?.trim()) {
                    setStructuralObs((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        label: label.trim(),
                        canonical: `(custom) ${label.trim()}`,
                        enabled: true,
                        builtIn: false,
                      },
                    ]);
                    setObsChanged(true);
                  }
                }}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Custom
              </Button>
              <button
                type="button"
                className="text-xs text-neutral-500 hover:text-forest transition-colors flex items-center gap-1"
                onClick={() => {
                  setStructuralObs(getDefaultStructuralObservations());
                  setObsChanged(true);
                }}
              >
                <RotateCcw className="h-3 w-3" />
                Reset to Defaults
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end pt-2 border-t">
            <Button
              onClick={saveObservations}
              disabled={savingObs || !obsChanged}
              className="bg-forest hover:bg-forest-light"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingObs ? "Saving..." : "Save Observation Library"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/* Species Presets */}
      {/* ================================================================ */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TreePine className="h-5 w-5 text-forest" />
            Species Presets
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your frequently-used species appear first in the species dropdown when assessing trees.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          {commonSpecies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {commonSpecies.map((sp) => (
                <span
                  key={sp}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest/10 text-forest text-sm"
                >
                  {sp}
                  <button
                    type="button"
                    onClick={() => setCommonSpecies((prev) => prev.filter((s) => s !== sp))}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search input */}
          <div className="relative">
            <Input
              placeholder="Search species to add..."
              value={speciesSearch}
              onChange={(e) => setSpeciesSearch(e.target.value)}
            />
            {speciesSearch.length >= 2 && (
              <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-neutral-200 rounded-md shadow-lg">
                {PENINSULA_SPECIES.filter(
                  (sp) =>
                    (sp.common.toLowerCase().includes(speciesSearch.toLowerCase()) ||
                      sp.scientific.toLowerCase().includes(speciesSearch.toLowerCase())) &&
                    !commonSpecies.includes(sp.common)
                )
                  .slice(0, 10)
                  .map((sp) => (
                    <button
                      key={sp.common}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-forest/5 transition-colors"
                      onClick={() => {
                        setCommonSpecies((prev) => [...prev, sp.common]);
                        setSpeciesSearch("");
                      }}
                    >
                      <span className="font-medium">{sp.common}</span>
                      <span className="text-neutral-500 ml-2 italic">{sp.scientific}</span>
                    </button>
                  ))}
                {PENINSULA_SPECIES.filter(
                  (sp) =>
                    (sp.common.toLowerCase().includes(speciesSearch.toLowerCase()) ||
                      sp.scientific.toLowerCase().includes(speciesSearch.toLowerCase())) &&
                    !commonSpecies.includes(sp.common)
                ).length === 0 && (
                  <p className="px-3 py-2 text-sm text-neutral-500">No matching species</p>
                )}
              </div>
            )}
          </div>

          {/* Save */}
          <div className="flex justify-end pt-2 border-t">
            <Button
              onClick={saveSpeciesPresets}
              disabled={savingSpecies}
              className="bg-forest hover:bg-forest-light"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingSpecies ? "Saving..." : "Save Species Presets"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/* PDF & Share Preferences */}
      {/* ================================================================ */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-forest" />
            PDF &amp; Share Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { key: "pdfShowTraqAppendix" as const, label: "Show TRAQ appendix in PDF" },
              { key: "pdfShowCityContacts" as const, label: "Show city contacts on share page" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="cursor-pointer" htmlFor={`psp-${key}`}>
                  {label}
                </Label>
                <button
                  id={`psp-${key}`}
                  type="button"
                  role="switch"
                  aria-checked={pdfShareForm[key] as boolean}
                  onClick={() =>
                    setPdfShareForm((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-light focus-visible:ring-offset-2 ${
                    pdfShareForm[key] ? "bg-forest/50" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-neutral-50 shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                      pdfShareForm[key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="photoRequiredCount">Required Photos Per Tree</Label>
            <Input
              id="photoRequiredCount"
              type="number"
              min="1"
              max="10"
              value={pdfShareForm.photoRequiredCount}
              onChange={(e) =>
                setPdfShareForm((prev) => ({ ...prev, photoRequiredCount: e.target.value }))
              }
              className="mt-1 w-32"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum photos required per tree for validation (1-10)
            </p>
          </div>

          <div>
            <Label htmlFor="shareDefaultMessage">Default Share Message</Label>
            <textarea
              id="shareDefaultMessage"
              rows={2}
              placeholder="Personal note shown at top of share page..."
              value={pdfShareForm.shareDefaultMessage}
              onChange={(e) =>
                setPdfShareForm((prev) => ({ ...prev, shareDefaultMessage: e.target.value }))
              }
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          <div>
            <Label htmlFor="shareThankYouMessage">Thank-You Message</Label>
            <textarea
              id="shareThankYouMessage"
              rows={2}
              placeholder="Message shown at bottom of share page..."
              value={pdfShareForm.shareThankYouMessage}
              onChange={(e) =>
                setPdfShareForm((prev) => ({ ...prev, shareThankYouMessage: e.target.value }))
              }
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          {/* Save */}
          <div className="flex justify-end pt-2 border-t">
            <Button
              onClick={savePdfSharePrefs}
              disabled={savingPdfShare}
              className="bg-forest hover:bg-forest-light"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingPdfShare ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Valuation Defaults ── */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-amber-600" />
            Valuation Defaults
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="val-unit-price-setting" className="text-sm">
              Default Unit Price ($ per square inch)
            </Label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <Input
                id="val-unit-price-setting"
                type="number"
                min="0"
                step="1"
                placeholder="38.00"
                value={valuationUnitPrice}
                onChange={(e) => setValuationUnitPrice(e.target.value)}
                className="pl-7 font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Used as the starting value when creating valuation assessments. Update annually when CTLA publishes new regional price tables. Current suggested range for Bay Area / North Bay: $32–$45/sq in.
            </p>
          </div>

          <Button
            onClick={saveValuationDefaults}
            disabled={savingValuation}
            size="sm"
            className="bg-forest hover:bg-forest-light"
          >
            {savingValuation ? (
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5 mr-1.5" />
            )}
            Save Valuation Defaults
          </Button>
        </CardContent>
      </Card>

      {/* Client Billing */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Receipt className="h-5 w-5 text-forest" />
            Client Billing
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set defaults for the billing section shown on client share pages.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showBillingOnShare">Show billing on share page</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                When enabled, a billing section appears on reports you share with clients
              </p>
            </div>
            <Switch
              id="showBillingOnShare"
              checked={form.showBillingOnShare as boolean}
              onCheckedChange={(checked: boolean) =>
                setForm((prev) => ({ ...prev, showBillingOnShare: checked }))
              }
            />
          </div>
          <div>
            <Label htmlFor="defaultReportFee">Default Report Fee ($)</Label>
            <Input
              id="defaultReportFee"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 500.00"
              value={form.defaultReportFee}
              onChange={(e) => updateField("defaultReportFee", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Pre-filled as the default amount on new reports
            </p>
          </div>
          <div>
            <Label htmlFor="billingPaymentInstructions">Payment Instructions</Label>
            <textarea
              id="billingPaymentInstructions"
              rows={3}
              placeholder="e.g., Make checks payable to... / Venmo: @your-handle / Pay online at..."
              value={form.billingPaymentInstructions}
              onChange={(e) => updateField("billingPaymentInstructions", e.target.value)}
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Shown on client share pages — tell clients how to pay you
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-forest hover:bg-forest-light"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      {/* Usage & Costs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-5 w-5 text-forest" />
            Usage &amp; Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usageLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
            </div>
          ) : usageData ? (
            <div className="space-y-5">
              {/* Monthly overview stats */}
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  This Month
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-neutral-100 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold font-mono text-neutral-900">
                      ${usageData.monthly.cost.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500">Total Cost</p>
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold font-mono text-neutral-900">
                      {usageData.monthly.callCount}
                    </p>
                    <p className="text-xs text-neutral-500">API Calls</p>
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold font-mono text-neutral-900">
                      ${usageData.monthly.avgCostPerReport.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500">Avg / Report</p>
                  </div>
                </div>
              </div>

              {/* Breakdown by endpoint */}
              {Object.keys(usageData.monthly.byEndpoint).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                    Breakdown by Endpoint
                  </p>
                  <div className="space-y-2">
                    {Object.entries(usageData.monthly.byEndpoint).map(
                      ([endpoint, data]) => (
                        <div
                          key={endpoint}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex items-center gap-2 text-neutral-700">
                            {endpoint === "generate-report" && (
                              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                            )}
                            {endpoint === "parse-audio" && (
                              <Cpu className="h-3.5 w-3.5 text-blue-500" />
                            )}
                            {endpoint === "transcribe" && (
                              <Mic className="h-3.5 w-3.5 text-amber-500" />
                            )}
                            {endpoint.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                          <span className="text-neutral-500">
                            {data.count} calls &middot; ${data.cost.toFixed(3)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* All time */}
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  All Time
                </p>
                <p className="text-sm text-neutral-600">
                  {usageData.allTime.callCount} API calls &middot; $
                  {usageData.allTime.cost.toFixed(2)} estimated cost
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-neutral-500 text-center py-4">
              No usage data available yet. API costs will appear here after
              generating reports or using voice dictation.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
