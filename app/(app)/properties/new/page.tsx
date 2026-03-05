"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  ArrowLeft,
  Loader2,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Check,
  Calendar,
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
} as const;

const COLOR_MAP: Record<string, { border: string; bg: string; ring: string; icon: string; check: string }> = {
  green: {
    border: "border-l-forest",
    bg: "bg-forest/5",
    ring: "ring-forest",
    icon: "text-forest",
    check: "bg-forest",
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
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Report type
  const [reportType, setReportType] = useState<string | null>(null);

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
        // Geocoding failure is non-fatal
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
          // Construction encroachment project fields
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
    <div className="max-w-2xl mx-auto">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">New Property</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select a report type and enter the property address to get started.
        </p>
      </div>

      <div className="space-y-6">
        {/* Report Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REPORT_TYPES.map((rt) => {
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
                    : "bg-neutral-50 hover:bg-neutral-100 border-border"
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
          })}
        </div>

        {/* Property Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-forest" />
              Property Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>City *</Label>
                <Input
                  placeholder="e.g., Palo Alto"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>County</Label>
                <Input
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="mt-1"
                  placeholder="e.g., San Mateo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  placeholder="94301"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="apn">APN / Parcel Number</Label>
                <Input
                  id="apn"
                  placeholder="132-40-001"
                  value={parcelNumber}
                  onChange={(e) => setParcelNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="neededByDate" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                Needed By Date
              </Label>
              <Input
                id="neededByDate"
                type="date"
                value={neededByDate}
                onChange={(e) => setNeededByDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Construction encroachment project info */}
        {reportType === "construction_encroachment" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <HardHat className="h-4 w-4 text-blue-600" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="projectDescription">Project Description</Label>
                <Input
                  id="projectDescription"
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permitNumber">Permit Number</Label>
                  <Input
                    id="permitNumber"
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="developerName">Developer / Contractor</Label>
                  <Input
                    id="developerName"
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="architectName">Architect</Label>
                <Input
                  id="architectName"
                  placeholder="Jane Smith, AIA"
                  value={architectName}
                  onChange={(e) => setArchitectName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Homeowner Info (optional) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Homeowner Information{" "}
              <span className="text-muted-foreground font-normal text-sm">
                (Optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="homeownerName">Name</Label>
              <Input
                id="homeownerName"
                placeholder="John Smith"
                value={homeownerName}
                onChange={(e) => setHomeownerName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="homeownerEmail">Email</Label>
                <Input
                  id="homeownerEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={homeownerEmail}
                  onChange={(e) => setHomeownerEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="homeownerPhone">Phone</Label>
                <Input
                  id="homeownerPhone"
                  placeholder="(650) 555-0100"
                  value={homeownerPhone}
                  onChange={(e) => setHomeownerPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error display */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" asChild>
            <Link href="/properties">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="bg-forest hover:bg-forest-light"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Create &amp; Open Map
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
