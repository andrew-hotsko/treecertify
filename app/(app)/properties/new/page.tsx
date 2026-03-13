"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  ArrowLeft,
  Loader2,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Home,
  Check,
  Calendar,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { REPORT_TYPES } from "@/lib/report-types";
import { cn } from "@/lib/utils";

const COUNTY_MAP: Record<string, string> = {
  "Palo Alto": "Santa Clara",
  "Los Altos": "Santa Clara",
  "Los Altos Hills": "Santa Clara",
  "Mountain View": "Santa Clara",
  "Sunnyvale": "Santa Clara",
  "Cupertino": "Santa Clara",
  "Saratoga": "Santa Clara",
  "Los Gatos": "Santa Clara",
  "San Jose": "Santa Clara",
  "Menlo Park": "San Mateo",
  "Atherton": "San Mateo",
  "Woodside": "San Mateo",
  "Portola Valley": "San Mateo",
  "Redwood City": "San Mateo",
  "San Carlos": "San Mateo",
  "Belmont": "San Mateo",
  "San Mateo": "San Mateo",
  "Hillsborough": "San Mateo",
  "Burlingame": "San Mateo",
  "Foster City": "San Mateo",
  "Half Moon Bay": "San Mateo",
  "Pacifica": "San Mateo",
  "Daly City": "San Mateo",
  "South San Francisco": "San Mateo",
};

const ICON_MAP = {
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Home,
} as const;

const COLOR_MAP: Record<string, { border: string; bg: string; ring: string; icon: string; check: string }> = {
  green: {
    border: "border-l-[#1D4E3E]",
    bg: "bg-[#1D4E3E]/5",
    ring: "ring-[#1D4E3E]",
    icon: "text-[#1D4E3E]",
    check: "bg-[#1D4E3E]",
  },
  red: {
    border: "border-l-red-600",
    bg: "bg-red-50",
    ring: "ring-red-600",
    icon: "text-red-700",
    check: "bg-red-600",
  },
  amber: {
    border: "border-l-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-600",
    icon: "text-amber-700",
    check: "bg-amber-600",
  },
  blue: {
    border: "border-l-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-600",
    icon: "text-blue-700",
    check: "bg-blue-600",
  },
  violet: {
    border: "border-l-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-600",
    icon: "text-violet-700",
    check: "bg-violet-600",
  },
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Report type
  const [reportType, setReportType] = useState<string | null>(null);
  const [showAllTypes, setShowAllTypes] = useState(false);

  // Property details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [parcelNumber, setParcelNumber] = useState("");
  const [neededByDate, setNeededByDate] = useState("");
  const [homeownerName, setHomeownerName] = useState("");
  const [homeownerEmail, setHomeownerEmail] = useState("");
  const [homeownerPhone, setHomeownerPhone] = useState("");

  // Construction encroachment project fields
  const [projectDescription, setProjectDescription] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [architectName, setArchitectName] = useState("");

  const handleCityChange = (value: string) => {
    setCity(value);
    const normalized = value.trim().replace(/\b\w/g, (c) => c.toUpperCase());
    const matchedCounty = COUNTY_MAP[normalized];
    if (matchedCounty) {
      setCounty(matchedCounty);
    }
  };

  const handleSubmit = async () => {
    if (!address.trim() || !city || !reportType) {
      setError("Report type, address, and city are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Geocode the address
      let lat: number | undefined;
      let lng: number | undefined;

      try {
        const geoRes = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: address.trim(), city, state: "CA" }),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          lat = geoData.lat;
          lng = geoData.lng;
        }
      } catch {
        console.warn("Geocoding failed, proceeding without coordinates");
      }

      // 2. Create the property
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          city,
          county,
          zip: zip.trim() || undefined,
          parcelNumber: parcelNumber.trim() || undefined,
          lat,
          lng,
          reportType,
          ...(neededByDate && { neededByDate }),
          ...(homeownerName.trim() && { homeownerName: homeownerName.trim() }),
          ...(homeownerEmail.trim() && { homeownerEmail: homeownerEmail.trim() }),
          ...(homeownerPhone.trim() && { homeownerPhone: homeownerPhone.trim() }),
          ...(reportType === "construction_encroachment" && {
            ...(projectDescription.trim() && { projectDescription: projectDescription.trim() }),
            ...(permitNumber.trim() && { permitNumber: permitNumber.trim() }),
            ...(developerName.trim() && { developerName: developerName.trim() }),
            ...(architectName.trim() && { architectName: architectName.trim() }),
          }),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create property");
      }

      const property = await res.json();
      router.push(`/properties/${property.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const isValid = address.trim() && city && reportType;

  return (
    <div className="max-w-2xl mx-auto pb-24 sm:pb-8">
      {/* Back link */}
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Properties
      </Link>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
          New Property
        </p>
        <h1 className="text-2xl md:text-3xl tracking-tight">
          Create Property
        </h1>
      </div>

      <div className="space-y-8">
        {/* Report Type Selection */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Report Type *
          </p>
          {(() => {
            const PRIMARY_IDS = ["removal_permit", "health_assessment", "construction_encroachment"];
            const primaryTypes = REPORT_TYPES.filter((rt) => PRIMARY_IDS.includes(rt.id));
            const secondaryTypes = REPORT_TYPES.filter((rt) => !PRIMARY_IDS.includes(rt.id));
            const isSecondarySelected = reportType && secondaryTypes.some((rt) => rt.id === reportType);
            const expanded = showAllTypes || isSecondarySelected;

            const renderCard = (rt: (typeof REPORT_TYPES)[0]) => {
              const Icon = ICON_MAP[rt.icon];
              const colors = COLOR_MAP[rt.color] || COLOR_MAP.green;
              const selected = reportType === rt.id;

              return (
                <button
                  key={rt.id}
                  onClick={() => setReportType(rt.id)}
                  className={cn(
                    "relative text-left p-5 rounded-lg border-2 border-l-4 transition-all",
                    colors.border,
                    selected
                      ? `${colors.bg} ring-2 ${colors.ring} border-transparent`
                      : "bg-card hover:bg-accent/30 border-border"
                  )}
                >
                  {selected && (
                    <div
                      className={cn(
                        "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",
                        colors.check
                      )}
                    >
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <Icon className={cn("h-7 w-7 mb-3", colors.icon)} />
                  <h3 className="font-semibold text-sm text-foreground">
                    {rt.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rt.description}
                  </p>
                </button>
              );
            };

            return (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {primaryTypes.map(renderCard)}
                </div>
                {expanded ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {secondaryTypes.map(renderCard)}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAllTypes(true)}
                    className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-[#1D4E3E] transition-colors mx-auto"
                  >
                    Show all report types
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })()}
        </div>

        {/* Property Location */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Property Location
          </p>
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div>
              <label className="text-xs text-muted-foreground">Street Address *</label>
              <Input
                placeholder="123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">City *</label>
                <Input
                  placeholder="Palo Alto"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">County</label>
                <Input
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="mt-1"
                  placeholder="San Mateo"
                />
              </div>
            </div>

            {/* Auto-detected ordinance */}
            {county && (
              <div className="flex items-center gap-2 bg-[#1D4E3E]/5 rounded-lg p-3 text-sm border border-[#1D4E3E]/10">
                <MapPin className="h-4 w-4 text-[#1D4E3E] shrink-0" />
                <span className="text-[#1D4E3E] font-medium text-xs">
                  {county} County ordinance detected
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">ZIP Code</label>
                <Input
                  placeholder="94301"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">APN / Parcel Number</label>
                <Input
                  placeholder="132-40-001"
                  value={parcelNumber}
                  onChange={(e) => setParcelNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Needed By Date
              </label>
              <Input
                type="date"
                value={neededByDate}
                onChange={(e) => setNeededByDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Construction encroachment project info */}
        {reportType === "construction_encroachment" && (
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Project Information
            </p>
            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              <div>
                <label className="text-xs text-muted-foreground">Project Description</label>
                <Input
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Permit Number</label>
                  <Input
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Developer / Contractor</label>
                  <Input
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Architect</label>
                <Input
                  placeholder="Jane Smith, AIA"
                  value={architectName}
                  onChange={(e) => setArchitectName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Homeowner Info */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Client Information <span className="normal-case tracking-normal font-sans text-muted-foreground/60">(optional)</span>
          </p>
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div>
              <label className="text-xs text-muted-foreground">Client Name</label>
              <Input
                placeholder="Property owner name"
                value={homeownerName}
                onChange={(e) => setHomeownerName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="client@email.com"
                  value={homeownerEmail}
                  onChange={(e) => setHomeownerEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Phone</label>
                <Input
                  placeholder="(650) 555-0123"
                  value={homeownerPhone}
                  onChange={(e) => setHomeownerPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            asChild
            className="border-[#1D4E3E]/20 hover:bg-[#1D4E3E]/5 hover:border-[#1D4E3E]/40"
          >
            <Link href="/properties">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="bg-[#1D4E3E] hover:bg-[#2A6B55] text-white"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Property"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
