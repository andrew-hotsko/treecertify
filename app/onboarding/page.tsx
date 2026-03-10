"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TreePine,
  Loader2,
  ShieldCheck,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Home,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  User,
  ExternalLink,
} from "lucide-react";
import { REPORT_TYPES } from "@/lib/report-types";
import { SAMPLE_REPORT } from "@/lib/sample-report-data";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Service areas (grouped by region)
// ---------------------------------------------------------------------------

const SERVICE_AREAS = [
  {
    group: "Peninsula",
    cities: [
      "Palo Alto",
      "Menlo Park",
      "Atherton",
      "Woodside",
      "Portola Valley",
      "Redwood City",
      "San Mateo",
      "Los Altos",
      "Los Altos Hills",
      "Mountain View",
      "Hillsborough",
      "San Carlos",
      "Burlingame",
    ],
  },
  {
    group: "North Bay",
    cities: [
      "Sonoma County",
      "Santa Rosa",
      "City of Napa",
      "Windsor",
      "Healdsburg",
    ],
  },
  {
    group: "Tahoe / Nevada",
    cities: ["Tahoe Basin", "Reno"],
  },
];

// Cities with full ordinance data
const SUPPORTED_CITIES = [
  "Palo Alto",
  "Menlo Park",
  "Atherton",
  "Woodside",
  "Portola Valley",
];

const COUNTY_MAP: Record<string, string> = {
  "Palo Alto": "Santa Clara",
  "Menlo Park": "San Mateo",
  "Atherton": "San Mateo",
  "Woodside": "San Mateo",
  "Portola Valley": "San Mateo",
  "Redwood City": "San Mateo",
  "San Mateo": "San Mateo",
  "Los Altos": "Santa Clara",
  "Los Altos Hills": "Santa Clara",
  "Mountain View": "Santa Clara",
  "Hillsborough": "San Mateo",
  "San Carlos": "San Mateo",
  "Burlingame": "San Mateo",
  "Sonoma County": "Sonoma",
  "Santa Rosa": "Sonoma",
  "City of Napa": "Napa",
  "Windsor": "Sonoma",
  "Healdsburg": "Sonoma",
};

const ICON_MAP = { Stethoscope, Axe, DollarSign, HardHat, Home } as const;

const COLOR_MAP: Record<
  string,
  { border: string; bg: string; ring: string; icon: string; check: string }
> = {
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
  violet: {
    border: "border-l-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-600",
    icon: "text-violet-700",
    check: "bg-violet-600",
  },
};

// ---------------------------------------------------------------------------
// Condition dot colors (matching property-map-view)
// ---------------------------------------------------------------------------

const CONDITION_DOT: Record<number, string> = {
  5: "bg-emerald-500",
  4: "bg-lime-500",
  3: "bg-amber-500",
  2: "bg-orange-500",
  1: "bg-red-500",
};

const CONDITION_LABEL: Record<number, string> = {
  5: "Excellent",
  4: "Good",
  3: "Fair",
  2: "Poor",
  1: "Critical",
};

const ACTION_LABEL: Record<string, string> = {
  retain: "Retain",
  remove: "Remove",
  prune: "Prune",
  monitor: "Monitor",
};

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Your Info", icon: User },
    { num: 2, label: "See It In Action", icon: FileText },
    { num: 3, label: "First Assessment", icon: MapPin },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-3 sm:flex-1">
          <div className="flex items-center gap-3 sm:flex-col sm:gap-1.5">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                currentStep > step.num
                  ? "bg-forest text-white"
                  : currentStep === step.num
                    ? "bg-forest text-white ring-4 ring-forest/10"
                    : "bg-neutral-300 text-neutral-500"
              )}
            >
              {currentStep > step.num ? (
                <Check className="h-4 w-4" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                currentStep >= step.num
                  ? "font-medium text-neutral-900"
                  : "text-neutral-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden sm:block flex-1 h-px bg-neutral-300 mx-4" />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sample report mini preview (inline HTML, not PDF)
// ---------------------------------------------------------------------------

function SampleReportPreview() {
  const { trees, property, certifier } = SAMPLE_REPORT;

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="max-h-[420px] overflow-y-auto">
        <div className="p-5 sm:p-6 space-y-5" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "10.5pt", lineHeight: 1.55, color: "#3A3A36" }}>
          {/* Certification header */}
          <div className="border-2 border-forest rounded p-4 bg-[#FBF9F6]">
            <div className="text-center space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-forest font-semibold">Certified Arborist Report</p>
              <p className="text-sm font-semibold text-neutral-800">{property.address}, {property.city}, {property.state} {property.zip}</p>
              <p className="text-xs text-neutral-500">Prepared by {certifier.name}, ISA #{certifier.isaCertNum} &middot; {certifier.company}</p>
            </div>
          </div>

          {/* Tree inventory mini-table */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-forest mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Tree Inventory Summary
            </h3>
            <div className="border rounded overflow-hidden text-xs">
              <table className="w-full">
                <thead>
                  <tr className="text-white text-left" style={{ backgroundColor: "#1D4E3E", fontSize: "8.5pt", letterSpacing: "0.3px" }}>
                    <th className="px-3 py-2 font-medium">#</th>
                    <th className="px-3 py-2 font-medium">Species</th>
                    <th className="px-3 py-2 font-medium">DBH</th>
                    <th className="px-3 py-2 font-medium">Condition</th>
                    <th className="px-3 py-2 font-medium">Action</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trees.map((tree, i) => (
                    <tr key={tree.treeNumber} className={i % 2 === 1 ? "bg-[#FEFDFB]" : ""} style={{ borderBottom: "1px solid #e5e4df" }}>
                      <td className="px-3 py-2 font-mono">{tree.treeNumber}</td>
                      <td className="px-3 py-2">
                        <span className="font-medium">{tree.speciesCommon}</span>
                        <br />
                        <span className="text-neutral-400 italic text-[10px]">{tree.speciesScientific}</span>
                      </td>
                      <td className="px-3 py-2 font-mono">{tree.dbhInches}&quot;</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={cn("w-2 h-2 rounded-full", CONDITION_DOT[tree.conditionRating])} />
                          {CONDITION_LABEL[tree.conditionRating]}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={cn(
                          "font-medium",
                          tree.recommendedAction === "remove" ? "text-red-600" : "text-forest"
                        )}>
                          {ACTION_LABEL[tree.recommendedAction]}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {tree.isProtected && (
                          <span className="inline-flex items-center gap-1 text-forest">
                            <ShieldCheck className="h-3 w-3" />
                            {tree.isHeritage ? "Heritage" : "Protected"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sample narrative excerpt — Tree #2 only (most compelling) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-forest mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Assessment Excerpt
            </h3>
            <div className="space-y-2 text-[10pt] leading-relaxed">
              <h4 className="font-semibold text-[10.5pt]" style={{ fontFamily: "'Instrument Sans', sans-serif", color: "#333" }}>
                Tree #2 — Monterey Pine (<em>Pinus radiata</em>)
              </h4>
              <p>
                Significant health decline is evident throughout the specimen. Crown dieback affects approximately 45% of the upper canopy, with sparse needle retention and chlorotic foliage in the remaining live crown. Pitch canker (<em>Fusarium circinatum</em>) lesions are present on multiple scaffold branches. Fungal conks consistent with <em>Phellinus pini</em> were observed at two locations on the lower trunk, indicating advancing heartwood decay.
              </p>
              <p>
                <strong>Protection Status:</strong> Protected under Palo Alto Municipal Code §8.10.020 — exceeds 11.5&quot; DBH threshold. Removal requires a permit and mitigation per §8.10.050.
              </p>
              <p>
                <strong>Recommended Action:</strong>{" "}
                <span className="text-red-600 font-medium">Remove.</span>{" "}
                This tree presents an unacceptable level of risk due to advanced decay, active pitch canker infection, and significant lean toward occupied target zones. Per Palo Alto mitigation requirements, replacement planting at a 2:1 ratio is required.
              </p>
            </div>
          </div>

          {/* Limitations teaser */}
          <div className="bg-neutral-50 rounded p-3 text-[9.5pt] text-neutral-500">
            <p className="font-semibold text-neutral-600 mb-1">Limitations</p>
            <p>
              This assessment is based on a Level 2 Basic visual examination conducted from ground level per ISA Best Management Practices. No invasive testing, root excavation, or aerial inspection was performed...
            </p>
          </div>
        </div>
      </div>
      {/* Fade overlay at bottom */}
      <div className="h-8 bg-gradient-to-t from-white to-transparent -mt-8 relative z-10 pointer-events-none" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Step 1 fields
  const [name, setName] = useState(user?.fullName ?? "");
  const [isaCertificationNum, setIsaCertificationNum] = useState("");
  const [serviceArea, setServiceArea] = useState("");

  // Step 3 fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [reportType, setReportType] = useState<string | null>(null);
  const [creatingProperty, setCreatingProperty] = useState(false);

  // City validation
  const normalizedCity = city
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const isSupportedCity = SUPPORTED_CITIES.includes(normalizedCity);
  const showCityValidation = city.trim().length >= 3;

  // ---------------------------------------------------------------------------
  // Resume from saved progress
  // ---------------------------------------------------------------------------

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (res.ok) {
          const profile = await res.json();
          if (profile.hasCompletedOnboarding) {
            router.replace("/dashboard");
            return;
          }

          // Pre-populate fields
          if (profile.name) setName(profile.name);
          if (profile.isaCertificationNum)
            setIsaCertificationNum(profile.isaCertificationNum);
          if (profile.citiesServed) {
            try {
              const cities = JSON.parse(profile.citiesServed);
              if (Array.isArray(cities) && cities.length > 0) {
                setServiceArea(cities[0]);
              }
            } catch {
              // ignore parse errors
            }
          }

          // Resume at next step
          if (profile.onboardingStep >= 1) {
            setCurrentStep(
              Math.min(profile.onboardingStep + 1, 3)
            );
          }
        }
      } catch {
        // No profile yet — start fresh at step 1
      } finally {
        setInitialLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  // Also set name from Clerk if still empty
  useEffect(() => {
    if (!name && user?.fullName) setName(user.fullName);
  }, [user?.fullName, name]);

  // ---------------------------------------------------------------------------
  // Step 1: Save profile essentials
  // ---------------------------------------------------------------------------

  async function handleStep1() {
    if (!name || !isaCertificationNum) {
      setError("Please fill in your name and ISA certification number.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          isaCertificationNum,
          citiesServed: serviceArea ? JSON.stringify([serviceArea]) : "[]",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save profile");
      }

      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Step 3: Create property
  // ---------------------------------------------------------------------------

  async function handleStep3() {
    if (!address.trim() || !city.trim() || !reportType) {
      setError("Address, city, and report type are required.");
      return;
    }
    setCreatingProperty(true);
    setError("");

    try {
      // Geocode
      let lat: number | undefined;
      let lng: number | undefined;
      try {
        const geoRes = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: address.trim(),
            city: normalizedCity,
            state: "CA",
          }),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          lat = geoData.lat;
          lng = geoData.lng;
        }
      } catch {
        console.warn("Geocoding failed, proceeding without coordinates");
      }

      // Create property
      const county = COUNTY_MAP[normalizedCity] || "";
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          city: normalizedCity,
          county,
          lat,
          lng,
          reportType,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create property");
      }

      const property = await res.json();

      // Mark onboarding complete
      await fetch("/api/arborist/onboard", { method: "PATCH" });

      router.push(`/properties/${property.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setCreatingProperty(false);
    }
  }

  async function handleSkip() {
    setLoading(true);
    try {
      await fetch("/api/arborist/onboard", { method: "PATCH" });
      router.push("/dashboard");
    } catch {
      router.push("/dashboard");
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-forest/5 to-green-100">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-forest/5 to-green-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 rounded-full bg-forest/10 p-3 w-fit">
            <TreePine className="h-8 w-8 text-forest" />
          </div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">
            Welcome to TreeCertify
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            {currentStep === 1 && "Let\u2019s get your practice set up."}
            {currentStep === 2 && "See what your reports will look like."}
            {currentStep === 3 && "Set up your first property to see TreeCertify in action."}
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* ================================================================ */}
        {/* STEP 1: Profile Essentials (30 seconds)                          */}
        {/* ================================================================ */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Rodriguez"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isaCertificationNum">
                      ISA Certification Number{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isaCertificationNum"
                      value={isaCertificationNum}
                      onChange={(e) =>
                        setIsaCertificationNum(e.target.value)
                      }
                      placeholder="WE-12345A"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceArea">
                      Primary Service Area
                    </Label>
                    <select
                      id="serviceArea"
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select your area...</option>
                      {SERVICE_AREAS.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.cities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              onClick={handleStep1}
              disabled={loading}
              className="w-full bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 2: Explore a Sample Report (60 seconds)                     */}
        {/* ================================================================ */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <SampleReportPreview />

            {/* Feature callout cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border-l-4 border-l-forest bg-forest/5 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-forest" />
                  <h3 className="text-sm font-medium text-neutral-900">AI-generated narrative</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Enter tree data, get a professional report in seconds
                </p>
              </div>
              <div className="border-l-4 border-l-forest bg-forest/5 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-4 w-4 text-forest" />
                  <h3 className="text-sm font-medium text-neutral-900">Ordinance intelligence</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Automatically checks protection status and cites local code
                </p>
              </div>
              <div className="border-l-4 border-l-forest bg-forest/5 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-forest" />
                  <h3 className="text-sm font-medium text-neutral-900">One-click PDF &amp; share</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Download or share a branded report with your client
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setError("");
                  setCurrentStep(1);
                }}
                className="flex-shrink-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform h-12 text-base"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <a
              href="/api/sample-report?showcase=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View sample PDF
            </a>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3: First Assessment (30 seconds)                            */}
        {/* ================================================================ */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-forest" />
                  <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                    Your First Property
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Enter the address of a job you&apos;re currently working on.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 University Ave"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Palo Alto"
                      className="h-12"
                    />
                    {showCityValidation && isSupportedCity && (
                      <p className="flex items-center gap-1.5 text-xs text-forest">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Tree ordinance data available for {normalizedCity}
                      </p>
                    )}
                    {showCityValidation && !isSupportedCity && (
                      <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium">Limited ordinance support</p>
                          <p className="text-amber-600 mt-0.5">
                            TreeCertify currently has full ordinance data for{" "}
                            {SUPPORTED_CITIES.join(", ")}. You can still create
                            properties in other cities, but tree protection
                            analysis will be limited.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report type selector */}
            <div>
              <Label className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3 block">
                Report Type <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REPORT_TYPES.map((rt) => {
                  const Icon =
                    ICON_MAP[rt.icon as keyof typeof ICON_MAP];
                  const colors = COLOR_MAP[rt.color] || COLOR_MAP.green;
                  const selected = reportType === rt.id;

                  return (
                    <button
                      key={rt.id}
                      onClick={() => setReportType(rt.id)}
                      className={cn(
                        "relative text-left p-4 rounded-lg border-2 border-l-4 transition-all",
                        colors.border,
                        selected
                          ? `${colors.bg} ring-2 ${colors.ring} border-transparent`
                          : "bg-neutral-50 hover:bg-neutral-100 border-border"
                      )}
                    >
                      {selected && (
                        <div
                          className={cn(
                            "absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center",
                            colors.check
                          )}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <Icon className={cn("h-5 w-5 mb-2", colors.icon)} />
                      <h3 className="font-semibold text-xs text-foreground">
                        {rt.label}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        {rt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setError("");
                  setCurrentStep(2);
                }}
                className="flex-shrink-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleStep3}
                disabled={
                  !address.trim() ||
                  !city.trim() ||
                  !reportType ||
                  creatingProperty
                }
                className="flex-1 bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform h-12 text-base"
              >
                {creatingProperty ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <button
              onClick={handleSkip}
              disabled={loading}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              I&apos;ll do this later &mdash; take me to the dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
