"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TreePine,
  Loader2,
  User,
  ShieldCheck,
  Building2,
  Upload,
  ImageIcon,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    phone: "",
    isaCertificationNum: "",
    isaExpirationDate: "",
    licenseNumbers: "",
    signatureName: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadLogo = async (file: File) => {
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
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.isaCertificationNum || !form.isaExpirationDate) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          isaCertificationNum: form.isaCertificationNum,
          isaExpirationDate: form.isaExpirationDate,
          companyName: form.companyName || null,
          phone: form.phone || null,
          licenseNumbers: form.licenseNumbers || null,
          signatureName: form.signatureName || null,
          companyAddress: form.companyAddress || null,
          companyPhone: form.companyPhone || null,
          companyEmail: form.companyEmail || null,
          companyWebsite: form.companyWebsite || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create profile");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 rounded-full bg-emerald-100 p-3 w-fit">
            <TreePine className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to TreeCertify
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Set up your arborist profile to get started. This information will
            appear on your certified reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Your Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Your Information
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
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(650) 555-1234"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: ISA Credentials */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  ISA Credentials
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isaCertificationNum">
                      ISA Certification Number{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isaCertificationNum"
                      value={form.isaCertificationNum}
                      onChange={(e) =>
                        updateField("isaCertificationNum", e.target.value)
                      }
                      placeholder="WE-12345A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isaExpirationDate">
                      Expiration Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isaExpirationDate"
                      type="date"
                      value={form.isaExpirationDate}
                      onChange={(e) =>
                        updateField("isaExpirationDate", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumbers">License Numbers</Label>
                  <Input
                    id="licenseNumbers"
                    value={form.licenseNumbers}
                    onChange={(e) =>
                      updateField("licenseNumbers", e.target.value)
                    }
                    placeholder="e.g., CA-QCLP #1234, TRAQ"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatureName">
                    How should your name appear on certified reports?
                  </Label>
                  <Input
                    id="signatureName"
                    value={form.signatureName}
                    onChange={(e) =>
                      updateField("signatureName", e.target.value)
                    }
                    placeholder="e.g., Andrew Hotsko, ISA Board Certified Master Arborist"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the name that will appear in your certification
                    signature
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Company Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Company Details
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Optional &mdash; this information will appear on report headers
              </p>
              <div className="space-y-4">
                {/* Logo upload */}
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 overflow-hidden shrink-0">
                      {logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logoUrl}
                          alt="Company logo"
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-zinc-300" />
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
                      value={form.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      placeholder="Peninsula Tree Care"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={form.companyPhone}
                      onChange={(e) =>
                        updateField("companyPhone", e.target.value)
                      }
                      placeholder="(650) 555-0100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input
                    id="companyAddress"
                    value={form.companyAddress}
                    onChange={(e) =>
                      updateField("companyAddress", e.target.value)
                    }
                    placeholder="123 Main St, City, CA 94000"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={form.companyEmail}
                      onChange={(e) =>
                        updateField("companyEmail", e.target.value)
                      }
                      placeholder="info@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={form.companyWebsite}
                      onChange={(e) =>
                        updateField("companyWebsite", e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error display */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              "Create My Profile & Get Started"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
