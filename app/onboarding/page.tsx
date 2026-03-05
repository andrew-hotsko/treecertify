"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TreePine,
  Loader2,
  ShieldCheck,
  Building2,
  Upload,
  ImageIcon,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { REPORT_TYPES } from "@/lib/report-types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Supported cities
// ---------------------------------------------------------------------------

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
};

const ICON_MAP = { Stethoscope, Axe, DollarSign, HardHat } as const;

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
};

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Credentials", icon: ShieldCheck },
    { num: 2, label: "Branding", icon: Building2 },
    { num: 3, label: "First Property", icon: MapPin },
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
// Cover page preview
// ---------------------------------------------------------------------------

function CoverPagePreview({
  logoUrl,
  companyName,
  arboristName,
  isaCertNum,
}: {
  logoUrl: string | null;
  companyName: string;
  arboristName: string;
  isaCertNum: string;
}) {
  return (
    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 bg-neutral-50 max-w-xs mx-auto">
      <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mb-4">
        Cover Page Preview
      </p>
      <div className="text-center space-y-3">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt="Logo"
            className="h-14 mx-auto object-contain"
          />
        ) : (
          <div className="h-14 w-14 mx-auto rounded-lg bg-neutral-200 flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-neutral-300" />
          </div>
        )}
        <h3
          className="text-base font-semibold text-neutral-800"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {companyName || "Your Company Name"}
        </h3>
        <div className="h-px bg-neutral-300 mx-8" />
        <div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
            Prepared by
          </p>
          <p className="text-sm font-medium text-neutral-700 mt-1">
            {arboristName || "Your Name"}
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">
            ISA Certified Arborist #{isaCertNum || "XX-XXXXX"}
          </p>
        </div>
      </div>
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1 fields
  const [name, setName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState("");
  const [isaCertificationNum, setIsaCertificationNum] = useState("");
  const [isaExpirationDate, setIsaExpirationDate] = useState("");
  const [traqCertified, setTraqCertified] = useState(false);
  const [licenseNumbers, setLicenseNumbers] = useState("");
  const [signatureName, setSignatureName] = useState("");

  // Step 2 fields
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

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
          if (profile.onboardingStep >= 3) {
            router.replace("/dashboard");
            return;
          }

          // Pre-populate fields
          if (profile.name) setName(profile.name);
          if (profile.phone) setPhone(profile.phone);
          if (profile.isaCertificationNum)
            setIsaCertificationNum(profile.isaCertificationNum);
          if (profile.isaExpirationDate) {
            const d = new Date(profile.isaExpirationDate);
            setIsaExpirationDate(d.toISOString().split("T")[0]);
          }
          if (profile.traqCertified) setTraqCertified(true);
          if (profile.licenseNumbers)
            setLicenseNumbers(profile.licenseNumbers);
          if (profile.signatureName) setSignatureName(profile.signatureName);
          if (profile.companyLogoUrl) setLogoUrl(profile.companyLogoUrl);
          if (profile.companyName) setCompanyName(profile.companyName);
          if (profile.companyAddress)
            setCompanyAddress(profile.companyAddress);
          if (profile.companyPhone) setCompanyPhone(profile.companyPhone);
          if (profile.companyEmail) setCompanyEmail(profile.companyEmail);
          if (profile.companyWebsite)
            setCompanyWebsite(profile.companyWebsite);

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
  // Step 1: Save credentials
  // ---------------------------------------------------------------------------

  async function handleStep1() {
    if (!name || !isaCertificationNum || !isaExpirationDate) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 1,
          name,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          phone: phone || null,
          isaCertificationNum,
          isaExpirationDate,
          traqCertified,
          licenseNumbers: licenseNumbers || null,
          signatureName: signatureName || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save credentials");
      }

      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Step 2: Save branding
  // ---------------------------------------------------------------------------

  async function uploadLogo(file: File) {
    setUploading(true);
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
      setLogoUrl(data.companyLogoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logo upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleStep2() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 2,
          companyName: companyName || null,
          companyAddress: companyAddress || null,
          companyPhone: companyPhone || null,
          companyEmail: companyEmail || null,
          companyWebsite: companyWebsite || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save company info");
      }

      setCurrentStep(3);
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
      const county = COUNTY_MAP[normalizedCity] || "San Mateo";
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

  async function handleSkipStep3() {
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
          <h1 className="text-2xl font-bold text-neutral-900">
            Welcome to TreeCertify
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            {currentStep === 1 &&
              "Let's set up your arborist profile. This info will appear on your certified reports."}
            {currentStep === 2 &&
              "Add your company branding. This is optional but makes your reports look professional."}
            {currentStep === 3 &&
              "Set up your first property to see TreeCertify in action."}
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* ================================================================ */}
        {/* STEP 1: Professional Credentials                                 */}
        {/* ================================================================ */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-forest" />
                  <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                    Professional Credentials
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(650) 555-1234"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="isaExpirationDate">
                        Expiration Date{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="isaExpirationDate"
                        type="date"
                        value={isaExpirationDate}
                        onChange={(e) =>
                          setIsaExpirationDate(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="traqCertified"
                      checked={traqCertified}
                      onCheckedChange={(checked) =>
                        setTraqCertified(checked === true)
                      }
                    />
                    <Label
                      htmlFor="traqCertified"
                      className="text-sm font-normal cursor-pointer"
                    >
                      ISA TRAQ Qualified
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumbers">
                      Additional Licenses / Certifications
                    </Label>
                    <Input
                      id="licenseNumbers"
                      value={licenseNumbers}
                      onChange={(e) => setLicenseNumbers(e.target.value)}
                      placeholder="e.g., CA-QCLP #1234, BCMA, ASCA RCA"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signatureName">Report Signature Name</Label>
                    <Input
                      id="signatureName"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="e.g., Jane Smith, ISA Board Certified Master Arborist"
                    />
                    <p className="text-xs text-muted-foreground">
                      How your name and credentials will appear on certified
                      reports
                    </p>
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
              className="w-full bg-forest hover:bg-forest-light h-12 text-base"
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
        {/* STEP 2: Company Branding                                         */}
        {/* ================================================================ */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-4 w-4 text-forest" />
                  <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                    Company Branding
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Optional &mdash; this information appears on report cover
                  pages and headers
                </p>
                <div className="space-y-4">
                  {/* Logo upload */}
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100 overflow-hidden shrink-0">
                        {logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logoUrl}
                            alt="Company logo"
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-neutral-300" />
                        )}
                      </div>
                      <div>
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
                        <Button
                          type="button"
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
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, WebP, or SVG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Peninsula Tree Care"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Phone</Label>
                      <Input
                        id="companyPhone"
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        placeholder="(650) 555-0100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Address</Label>
                    <Input
                      id="companyAddress"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="123 Main St, City, CA 94000"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="info@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Website</Label>
                      <Input
                        id="companyWebsite"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live preview */}
            <CoverPagePreview
              logoUrl={logoUrl}
              companyName={companyName}
              arboristName={name}
              isaCertNum={isaCertificationNum}
            />

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
                  setCurrentStep(1);
                }}
                className="flex-shrink-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleStep2}
                disabled={loading}
                className="flex-1 bg-forest hover:bg-forest-light h-12 text-base"
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

            <button
              onClick={handleStep2}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip &mdash; I&apos;ll add company details later
            </button>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3: First Property                                           */}
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
                  You&apos;ll be able to pin trees on the map.
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
                          <p className="font-medium">
                            Limited ordinance support
                          </p>
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
                className="flex-1 bg-forest hover:bg-forest-light h-12 text-base"
              >
                {creatingProperty ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Property...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Create & Open Map
                  </>
                )}
              </Button>
            </div>

            <button
              onClick={handleSkipStep3}
              disabled={loading}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now &mdash; go to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
