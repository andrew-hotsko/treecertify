"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Save,
  Upload,
  Trash2,
  Building2,
  User,
  FileText,
  X,
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
  ChevronUp,
  ChevronDown,
  Pencil,
  BookOpen,
  Award,
  Pen,
  Settings2,
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
import { REPORT_TYPES } from "@/lib/report-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Types ─────────────────────────────────────────────
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
  showBillingOnShare?: boolean;
  defaultReportFee?: number | null;
  billingPaymentInstructions?: string | null;
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
  valuationLimitingConditions?: string | null;
  aiPreferredTerms?: string | null;
  aiAvoidTerms?: string | null;
  aiStandardDisclaimer?: string | null;
  aiTonePreference?: string | null;
  aiCustomInstructions?: string | null;
  citiesServed?: string;
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

interface DocTemplate {
  id: string;
  name: string;
  content: string;
  category: string | null;
  cityTag: string | null;
  reportTypeTag: string | null;
  usageCount: number;
}

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

// ─── Tab Configuration ────────────────────────────────
type TabId = "profile" | "company" | "credentials" | "signature" | "writing" | "templates" | "billing" | "advanced";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  { id: "company", label: "Company", icon: <Building2 className="h-4 w-4" /> },
  { id: "credentials", label: "Credentials", icon: <Award className="h-4 w-4" /> },
  { id: "signature", label: "Signature", icon: <Pen className="h-4 w-4" /> },
  { id: "writing", label: "Writing Style", icon: <Sparkles className="h-4 w-4" /> },
  { id: "templates", label: "Templates", icon: <BookOpen className="h-4 w-4" /> },
  { id: "billing", label: "Billing", icon: <Receipt className="h-4 w-4" /> },
  { id: "advanced", label: "Advanced", icon: <Settings2 className="h-4 w-4" /> },
];

// ─── Sortable Observation Item ────────────────────────
function SortableObservationItem({
  obs,
  index,
  onToggle,
  onRename,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  obs: Observation;
  index: number;
  onToggle: () => void;
  onRename: (newLabel: string) => void;
  onDelete: (() => void) | null;
  onMoveUp: (() => void) | null;
  onMoveDown: (() => void) | null;
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
        className="cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600 touch-none hidden sm:block"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="flex flex-col gap-0 sm:hidden">
        <button
          type="button"
          disabled={!onMoveUp}
          onClick={onMoveUp ?? undefined}
          className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed p-0"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={!onMoveDown}
          onClick={onMoveDown ?? undefined}
          className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed p-0"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={obs.enabled}
        disabled={isLocked}
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${
          isLocked
            ? "bg-[#1D4E3E]/50 cursor-not-allowed"
            : obs.enabled
            ? "bg-[#1D4E3E]/50 cursor-pointer"
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
          className="flex-1 text-sm border border-[#1D4E3E]/30 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#1D4E3E]"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-sm cursor-pointer hover:text-[#1D4E3E]"
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

// ─── Main Page Component ──────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
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

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");

  // Usage data state
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
  const [valuationLimitingConditions, setValuationLimitingConditions] = useState<string>("");
  const [savingValuation, setSavingValuation] = useState(false);

  // AI writing preferences state
  const [aiTonePreference, setAiTonePreference] = useState("formal");
  const [aiPreferredTerms, setAiPreferredTerms] = useState<string[]>([]);
  const [aiAvoidTerms, setAiAvoidTerms] = useState<string[]>([]);
  const [aiStandardDisclaimer, setAiStandardDisclaimer] = useState("");
  const [aiCustomInstructions, setAiCustomInstructions] = useState("");
  const [newPreferredTerm, setNewPreferredTerm] = useState("");
  const [newAvoidTerm, setNewAvoidTerm] = useState("");

  // Document templates state
  const [templates, setTemplates] = useState<DocTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DocTemplate | null>(null);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    content: "",
    category: "",
    cityTag: "",
    reportTypeTag: "",
  });

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ─── Data Loading ─────────────────────────────────────
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
        try {
          const lc = JSON.parse(data.valuationLimitingConditions || "[]");
          if (Array.isArray(lc) && lc.length > 0) {
            setValuationLimitingConditions(lc.join("\n\n"));
          }
        } catch (err) { console.warn("Failed to parse valuationLimitingConditions from settings, using defaults:", err); }
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
        } catch (err) {
          console.warn("Failed to parse reportDefaults from settings, using defaults:", err);
        }

        try {
          const hObs = data.healthObservations ? JSON.parse(data.healthObservations) : null;
          const sObs = data.structuralObservations ? JSON.parse(data.structuralObservations) : null;
          setHealthObs(hObs || getDefaultHealthObservations());
          setStructuralObs(sObs || getDefaultStructuralObservations());
        } catch (err) {
          console.warn("Failed to parse healthObservations/structuralObservations from settings, using defaults:", err);
          setHealthObs(getDefaultHealthObservations());
          setStructuralObs(getDefaultStructuralObservations());
        }

        try {
          const species = data.commonSpecies ? JSON.parse(data.commonSpecies) : [];
          setCommonSpecies(species);
        } catch (err) {
          console.warn("Failed to parse commonSpecies from settings, using defaults:", err);
          setCommonSpecies([]);
        }

        try {
          const parsed = JSON.parse(data.reportDefaults || "{}");
          setReportDefaults(prev => ({
            ...prev,
            recommendationMap: parsed.recommendationMap || getDefaultRecommendationMap(),
            scopeTemplates: parsed.scopeTemplates || {},
          }));
        } catch (err) {
          console.warn("Failed to parse reportDefaults (recommendationMap) from settings, using defaults:", err);
        }

        setPdfShareForm({
          pdfShowTraqAppendix: data.pdfShowTraqAppendix ?? true,
          pdfShowCityContacts: data.pdfShowCityContacts ?? true,
          photoRequiredCount: String(data.photoRequiredCount ?? 2),
          shareDefaultMessage: data.shareDefaultMessage || "",
          shareThankYouMessage: data.shareThankYouMessage || "",
        });

        setAiTonePreference(data.aiTonePreference || "formal");
        try { setAiPreferredTerms(JSON.parse(data.aiPreferredTerms || "[]")); } catch (err) { console.warn("Failed to parse aiPreferredTerms from settings, using defaults:", err); setAiPreferredTerms([]); }
        try { setAiAvoidTerms(JSON.parse(data.aiAvoidTerms || "[]")); } catch (err) { console.warn("Failed to parse aiAvoidTerms from settings, using defaults:", err); setAiAvoidTerms([]); }
        setAiStandardDisclaimer(data.aiStandardDisclaimer || "");
        setAiCustomInstructions(data.aiCustomInstructions || "");
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

    fetch("/api/templates")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setTemplates(data))
      .catch(() => setTemplates([]))
      .finally(() => setLoadingTemplates(false));
  }, []);

  useEffect(() => {
    async function loadUsage() {
      setUsageLoading(true);
      try {
        const res = await fetch("/api/arborist/usage");
        if (res.ok) {
          setUsageData(await res.json());
        }
      } catch (err) {
        console.error("Usage stats fetch failed:", err);
      } finally {
        setUsageLoading(false);
      }
    }
    loadUsage();
  }, []);

  // ─── Signature Canvas Handlers ────────────────────────
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let x: number, y: number;
    if ("touches" in e) {
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
    } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let x: number, y: number;
    if ("touches" in e) {
      e.preventDefault();
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
    } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
    }
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1D4E3E";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      setSignatureDataUrl(dataUrl);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignatureDataUrl("");
  };

  // Restore signature to canvas when data loads
  useEffect(() => {
    if (signatureDataUrl && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = signatureDataUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ─── Field Helper ─────────────────────────────────────
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Save Handlers ────────────────────────────────────
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
          aiTonePreference: aiTonePreference || null,
          aiPreferredTerms: aiPreferredTerms.length > 0 ? JSON.stringify(aiPreferredTerms) : null,
          aiAvoidTerms: aiAvoidTerms.length > 0 ? JSON.stringify(aiAvoidTerms) : null,
          aiStandardDisclaimer: aiStandardDisclaimer || null,
          aiCustomInstructions: aiCustomInstructions || null,
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
          valuationLimitingConditions: valuationLimitingConditions.trim()
            ? valuationLimitingConditions.split(/\n\n+/).map(s => s.trim()).filter(Boolean)
            : null,
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

  // ─── Document Template CRUD ───────────────────────────
  const openNewTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({ name: "", content: "", category: "", cityTag: "", reportTypeTag: "" });
    setShowTemplateModal(true);
  };
  const openEditTemplate = (t: DocTemplate) => {
    setEditingTemplate(t);
    setTemplateForm({
      name: t.name,
      content: t.content,
      category: t.category || "",
      cityTag: t.cityTag || "",
      reportTypeTag: t.reportTypeTag || "",
    });
    setShowTemplateModal(true);
  };
  const saveTemplate = async () => {
    if (!templateForm.name.trim() || !templateForm.content.trim()) return;
    setSavingTemplate(true);
    try {
      const payload = {
        name: templateForm.name,
        content: templateForm.content,
        category: templateForm.category || null,
        cityTag: templateForm.cityTag || null,
        reportTypeTag: templateForm.reportTypeTag || null,
      };
      if (editingTemplate) {
        const res = await fetch(`/api/templates/${editingTemplate.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setTemplates((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const res = await fetch("/api/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setTemplates((prev) => [created, ...prev]);
      }
      setShowTemplateModal(false);
      setMessage({ type: "success", text: editingTemplate ? "Template updated" : "Template created" });
    } catch {
      setMessage({ type: "error", text: "Failed to save template" });
    } finally {
      setSavingTemplate(false);
    }
  };
  const deleteTemplate = async (id: string) => {
    setDeletingTemplateId(id);
    try {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setMessage({ type: "error", text: "Failed to delete template" });
    } finally {
      setDeletingTemplateId(null);
    }
  };

  const citiesServedList: string[] = (() => {
    try { return JSON.parse(profile?.citiesServed || "[]"); } catch { return []; }
  })();

  // ─── File Upload Handlers ─────────────────────────────
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

  // ─── Loading Skeleton ─────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <div className="h-3 w-16 bg-neutral-200/70 rounded animate-pulse" />
          <div className="h-8 w-48 bg-neutral-200/70 rounded-md animate-pulse mt-2" />
        </div>
        <div className="flex gap-6">
          <div className="w-48 shrink-0 space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-9 w-full bg-neutral-200/70 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-5 w-32 bg-neutral-200/70 rounded animate-pulse" />
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-neutral-200/70 rounded animate-pulse" />
                  <div className="h-9 w-full bg-neutral-200/70 rounded-md animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-neutral-200/70 rounded animate-pulse" />
                  <div className="h-9 w-full bg-neutral-200/70 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-28 bg-neutral-200/70 rounded animate-pulse" />
                <div className="h-9 w-full bg-neutral-200/70 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Tab Content Renderers ────────────────────────────

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">Profile</h2>
        <p className="text-xs text-muted-foreground">Your personal information and service area.</p>
      </div>

      {/* Profile Photo */}
      <Card className="border-border">
        <CardContent className="p-5">
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

      {/* Personal Info */}
      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
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
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="(650) 555-0123"
              className="mt-1"
            />
          </div>

          {/* Service Area */}
          {citiesServedList.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground">Service Area</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {citiesServedList.map((city: string) => (
                  <span
                    key={city}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1D4E3E]/10 text-[#1D4E3E] text-xs"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">Company</h2>
        <p className="text-xs text-muted-foreground">Business details that appear on generated reports and PDFs.</p>
      </div>

      {/* Company Logo */}
      <Card className="border-border">
        <CardContent className="p-5">
          <Label className="text-xs text-muted-foreground mb-3 block">Company Logo</Label>
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

      {/* Company Details */}
      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
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
              <Label>Company Phone</Label>
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
              <Label>Company Email</Label>
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

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Company Info"}
        </Button>
      </div>
    </div>
  );

  const renderCredentialsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">Credentials</h2>
        <p className="text-xs text-muted-foreground">ISA certifications and professional licenses for report stamps.</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>ISA Certification #</Label>
              <Input
                value={form.isaCertificationNum}
                onChange={(e) => updateField("isaCertificationNum", e.target.value)}
                placeholder="WE-12345A"
                className="mt-1 font-mono"
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

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="traq-certified"
              checked={form.traqCertified}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, traqCertified: e.target.checked }))
              }
              className="h-4 w-4 rounded border-neutral-300 text-[#1D4E3E] focus:ring-[#2A6B55]"
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

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Credentials"}
        </Button>
      </div>
    </div>
  );

  const renderSignatureTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">E-Signature</h2>
        <p className="text-xs text-muted-foreground">Draw your signature for report certification stamps. Your signature name is rendered in script font on PDFs.</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
          <div>
            <Label>Signature Name</Label>
            <Input
              placeholder="e.g., Alex Rivera, ISA Board Certified Master Arborist"
              value={form.signatureName}
              onChange={(e) => updateField("signatureName", e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text is rendered in script font on certified report PDFs
            </p>
          </div>

          <div>
            <Label className="mb-2 block">Signature Drawing</Label>
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-1 bg-white">
              <canvas
                ref={canvasRef}
                width={500}
                height={150}
                className="w-full cursor-crosshair touch-none"
                style={{ height: "150px" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Draw using mouse or touch
              </p>
              <Button variant="ghost" size="sm" onClick={clearSignature} className="text-xs text-muted-foreground">
                Clear Signature
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Signature"}
        </Button>
      </div>
    </div>
  );

  const renderWritingTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">Writing Style</h2>
        <p className="text-xs text-muted-foreground">These preferences are applied to every AI-generated report to match your professional voice.</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-5 space-y-5">
          {/* Tone */}
          <div>
            <Label className="text-sm font-medium">Tone</Label>
            <div className="mt-2 flex flex-col gap-2">
              {[
                { value: "formal", label: "Formal", desc: "Standard ISA professional language" },
                { value: "conversational", label: "Conversational", desc: "Slightly less formal, approachable for homeowners" },
                { value: "technical", label: "Technical", desc: "Detailed technical language for professional audiences" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-start gap-3 cursor-pointer p-2 rounded-md border hover:bg-muted/50 transition-colors">
                  <input
                    type="radio"
                    name="aiTone"
                    value={opt.value}
                    checked={aiTonePreference === opt.value}
                    onChange={() => setAiTonePreference(opt.value)}
                    className="mt-1 h-4 w-4 text-[#1D4E3E] focus:ring-[#1D4E3E]"
                  />
                  <div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Terms */}
          <div>
            <Label className="text-sm font-medium">Preferred Terms (optional)</Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-2">
              Words and phrases you prefer in your reports. The AI will use these when possible.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {aiPreferredTerms.map((term, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1D4E3E]/10 text-[#1D4E3E] text-xs font-medium">
                  {term}
                  <button
                    onClick={() => setAiPreferredTerms(aiPreferredTerms.filter((_, i) => i !== idx))}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder='e.g., "canopy" or "root zone"'
                value={newPreferredTerm}
                onChange={(e) => setNewPreferredTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newPreferredTerm.trim()) {
                    e.preventDefault();
                    setAiPreferredTerms([...aiPreferredTerms, newPreferredTerm.trim()]);
                    setNewPreferredTerm("");
                  }
                }}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newPreferredTerm.trim()) {
                    setAiPreferredTerms([...aiPreferredTerms, newPreferredTerm.trim()]);
                    setNewPreferredTerm("");
                  }
                }}
                disabled={!newPreferredTerm.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Terms to Avoid */}
          <div>
            <Label className="text-sm font-medium">Terms to Avoid (optional)</Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-2">
              Words the AI should not use in your reports. Max 20 terms.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {aiAvoidTerms.map((term, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                  {term}
                  <button
                    onClick={() => setAiAvoidTerms(aiAvoidTerms.filter((_, i) => i !== idx))}
                    className="hover:text-red-900 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {aiAvoidTerms.length < 20 && (
              <div className="flex gap-2">
                <Input
                  placeholder='e.g., "specimen" or "aforementioned"'
                  value={newAvoidTerm}
                  onChange={(e) => setNewAvoidTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newAvoidTerm.trim() && aiAvoidTerms.length < 20) {
                      e.preventDefault();
                      setAiAvoidTerms([...aiAvoidTerms, newAvoidTerm.trim()]);
                      setNewAvoidTerm("");
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (newAvoidTerm.trim() && aiAvoidTerms.length < 20) {
                      setAiAvoidTerms([...aiAvoidTerms, newAvoidTerm.trim()]);
                      setNewAvoidTerm("");
                    }
                  }}
                  disabled={!newAvoidTerm.trim() || aiAvoidTerms.length >= 20}
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* Standard Disclaimer */}
          <div>
            <Label htmlFor="aiStandardDisclaimer" className="text-sm font-medium">Standard Disclaimer (optional)</Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">
              Text appended verbatim to the end of every report, before the certification block. Not sent to the AI.
            </p>
            <textarea
              id="aiStandardDisclaimer"
              rows={3}
              value={aiStandardDisclaimer}
              onChange={(e) => setAiStandardDisclaimer(e.target.value)}
              placeholder="e.g., This report is based on a visual assessment from the ground only. No invasive testing was performed. Conditions may change due to weather, disease, or other factors."
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          {/* Additional Instructions */}
          <div>
            <Label htmlFor="aiCustomInstructions" className="text-sm font-medium">Additional Instructions (optional)</Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">
              Any other instructions for the AI report writer. Be specific.
            </p>
            <textarea
              id="aiCustomInstructions"
              rows={3}
              value={aiCustomInstructions}
              onChange={(e) => setAiCustomInstructions(e.target.value)}
              placeholder={"e.g., \"Always mention the tree's contribution to the streetscape. Never recommend removal without offering alternatives.\""}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Writing Style"}
        </Button>
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium mb-1">Document Templates</h2>
          <p className="text-xs text-muted-foreground">Saved text blocks for reports. These help the AI match your preferred language.</p>
        </div>
        <Button variant="outline" size="sm" onClick={openNewTemplate}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          New Template
        </Button>
      </div>

      <Card className="border-border">
        <CardContent className="p-5">
          {loadingTemplates ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
            </div>
          ) : templates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No templates yet. Save text blocks from your reports to build your library.
            </p>
          ) : (
            <div className="space-y-2">
              {templates.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between gap-3 rounded-lg border p-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{t.name}</span>
                      {t.category && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1D4E3E]/10 text-[#1D4E3E] font-medium">
                          {t.category}
                        </span>
                      )}
                      {t.cityTag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                          {t.cityTag}
                        </span>
                      )}
                      {t.reportTypeTag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                          {REPORT_TYPES.find((rt) => rt.id === t.reportTypeTag)?.label || t.reportTypeTag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.content}</p>
                    {t.usageCount > 0 && (
                      <p className="text-[10px] text-neutral-400 mt-1">Used {t.usageCount} time{t.usageCount !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openEditTemplate(t)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      disabled={deletingTemplateId === t.id}
                      onClick={() => deleteTemplate(t.id)}
                    >
                      {deletingTemplateId === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-1">Client Billing</h2>
        <p className="text-xs text-muted-foreground">Set defaults for the billing section shown on client share pages.</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
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
              className="mt-1"
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
              Shown on client share pages -- tell clients how to pay you
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Billing Settings"}
        </Button>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-medium mb-1">Advanced Settings</h2>
        <p className="text-xs text-muted-foreground">Report defaults, observation library, species presets, valuation, and PDF preferences.</p>
      </div>

      {/* ── Report Defaults ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-[#1D4E3E]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">Report Defaults</h3>
        </div>
        <Card className="border-border">
          <CardContent className="p-5 space-y-5">
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
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6B55] focus-visible:ring-offset-2 ${
                      reportDefaults[key] ? "bg-[#1D4E3E]/50" : "bg-neutral-300"
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
                        className="text-xs text-neutral-500 hover:text-[#1D4E3E] transition-colors flex items-center gap-1"
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

            <div className="flex justify-end pt-2 border-t">
              <Button
                onClick={saveProfile}
                disabled={saving}
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Report Defaults"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Observation Library ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="h-4 w-4 text-[#1D4E3E]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">Observation Library</h3>
          {obsChanged && (
            <span className="h-2 w-2 rounded-full bg-amber-500" title="Unsaved changes" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Customize the observation checklists shown during tree assessments. Drag to reorder, click to rename.
        </p>
        <Card className="border-border">
          <CardContent className="p-5 space-y-6">
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
                        onMoveUp={
                          idx > 0
                            ? () => {
                                setHealthObs((prev) => arrayMove(prev, idx, idx - 1));
                                setObsChanged(true);
                              }
                            : null
                        }
                        onMoveDown={
                          idx < healthObs.length - 1
                            ? () => {
                                setHealthObs((prev) => arrayMove(prev, idx, idx + 1));
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
                  className="text-xs text-neutral-500 hover:text-[#1D4E3E] transition-colors flex items-center gap-1"
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
                        onMoveUp={
                          idx > 0
                            ? () => {
                                setStructuralObs((prev) => arrayMove(prev, idx, idx - 1));
                                setObsChanged(true);
                              }
                            : null
                        }
                        onMoveDown={
                          idx < structuralObs.length - 1
                            ? () => {
                                setStructuralObs((prev) => arrayMove(prev, idx, idx + 1));
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
                  className="text-xs text-neutral-500 hover:text-[#1D4E3E] transition-colors flex items-center gap-1"
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

            <div className="flex justify-end pt-2 border-t">
              <Button
                onClick={saveObservations}
                disabled={savingObs || !obsChanged}
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {savingObs ? "Saving..." : "Save Observation Library"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Species Presets ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <TreePine className="h-4 w-4 text-[#1D4E3E]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">Species Presets</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Your frequently-used species appear first in the species dropdown when assessing trees.
        </p>
        <Card className="border-border">
          <CardContent className="p-5 space-y-4">
            {commonSpecies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {commonSpecies.map((sp) => (
                  <span
                    key={sp}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1D4E3E]/10 text-[#1D4E3E] text-sm"
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
                        className="w-full text-left px-3 py-2 text-sm hover:bg-[#1D4E3E]/5 transition-colors"
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

            <div className="flex justify-end pt-2 border-t">
              <Button
                onClick={saveSpeciesPresets}
                disabled={savingSpecies}
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {savingSpecies ? "Saving..." : "Save Species Presets"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── PDF & Share Preferences ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-[#1D4E3E]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">PDF &amp; Share Preferences</h3>
        </div>
        <Card className="border-border">
          <CardContent className="p-5 space-y-4">
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
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6B55] focus-visible:ring-offset-2 ${
                      pdfShareForm[key] ? "bg-[#1D4E3E]/50" : "bg-neutral-300"
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

            <div className="flex justify-end pt-2 border-t">
              <Button
                onClick={savePdfSharePrefs}
                disabled={savingPdfShare}
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {savingPdfShare ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Valuation Defaults ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-amber-600" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">Valuation Defaults</h3>
        </div>
        <Card className="border-border">
          <CardContent className="p-5 space-y-4">
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
                Used as the starting value when creating valuation assessments. Current suggested range for Bay Area / North Bay: $32-$45/sq in.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="val-limiting-conditions" className="text-sm">
                Limiting Conditions &amp; Assumptions
              </Label>
              <Textarea
                id="val-limiting-conditions"
                rows={6}
                placeholder="Each condition separated by a blank line. Leave empty to use defaults."
                value={valuationLimitingConditions}
                onChange={(e) => setValuationLimitingConditions(e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Included in valuation PDFs. Separate each condition with a blank line. Leave empty for the 6 standard CTLA/USPAP defaults.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <Button
                onClick={saveValuationDefaults}
                disabled={savingValuation}
                size="sm"
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
              >
                {savingValuation ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                )}
                Save Valuation Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Usage & Costs ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-[#1D4E3E]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-foreground">Usage &amp; Costs</h3>
        </div>
        <Card className="border-border">
          <CardContent className="p-5">
            {usageLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
              </div>
            ) : usageData ? (
              <div className="space-y-5">
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
      </section>
    </div>
  );

  // ─── Tab Router ───────────────────────────────────────
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab();
      case "company": return renderCompanyTab();
      case "credentials": return renderCredentialsTab();
      case "signature": return renderSignatureTab();
      case "writing": return renderWritingTab();
      case "templates": return renderTemplatesTab();
      case "billing": return renderBillingTab();
      case "advanced": return renderAdvancedTab();
      default: return renderProfileTab();
    }
  };

  // ─── Main Layout ──────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9C93] mb-1">Settings</p>
        <h1 className="text-2xl md:text-3xl tracking-tight">Arborist Profile</h1>
      </div>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm mb-6 ${
            message.type === "success"
              ? "bg-[#1D4E3E]/5 border-[#1D4E3E]/20 text-[#1D4E3E]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Mobile: Horizontal scrollable tab bar */}
      <div className="md:hidden mb-6 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-1 min-w-max pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1D4E3E]/10 text-[#1D4E3E] font-medium"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Sidebar + Content */}
      <div className="flex gap-6">
        {/* Vertical tab sidebar - hidden on mobile */}
        <nav className="hidden md:block w-48 shrink-0">
          <div className="sticky top-20 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 text-left py-2 px-3 text-sm rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1D4E3E]/10 text-[#1D4E3E] font-medium"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <div className="flex-1 min-w-0 pb-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Template New/Edit Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">{editingTemplate ? "Edit Template" : "New Template"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="tpl-name" className="text-sm font-medium">Name</Label>
              <Input
                id="tpl-name"
                value={templateForm.name}
                onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                placeholder="e.g., Standard Limitations"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tpl-category" className="text-sm font-medium">Category</Label>
              <select
                id="tpl-category"
                value={templateForm.category}
                onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="tpl-city" className="text-sm font-medium">City (optional)</Label>
                <select
                  id="tpl-city"
                  value={templateForm.cityTag}
                  onChange={(e) => setTemplateForm({ ...templateForm, cityTag: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">All Cities</option>
                  {citiesServedList.map((c: string) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="tpl-type" className="text-sm font-medium">Report Type (optional)</Label>
                <select
                  id="tpl-type"
                  value={templateForm.reportTypeTag}
                  onChange={(e) => setTemplateForm({ ...templateForm, reportTypeTag: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">All Types</option>
                  {REPORT_TYPES.map((rt) => (
                    <option key={rt.id} value={rt.id}>{rt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="tpl-content" className="text-sm font-medium">Content</Label>
              <textarea
                id="tpl-content"
                rows={6}
                value={templateForm.content}
                onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                placeholder="Paste or type your template text here..."
                className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowTemplateModal(false)}>Cancel</Button>
              <Button
                onClick={saveTemplate}
                disabled={savingTemplate || !templateForm.name.trim() || !templateForm.content.trim()}
                className="bg-[#1D4E3E] hover:bg-[#2A6B55]"
              >
                {savingTemplate ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {editingTemplate ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
