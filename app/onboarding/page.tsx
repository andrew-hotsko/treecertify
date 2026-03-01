"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreePine, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    isaCertificationNum: "",
    isaExpirationDate: "",
    companyName: "",
    phone: "",
  });

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 rounded-full bg-emerald-100 p-3 w-fit">
            <TreePine className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to TreeCertify
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Set up your arborist profile to get started
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isaCertificationNum">
                ISA Certification Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="isaCertificationNum"
                value={form.isaCertificationNum}
                onChange={(e) =>
                  setForm({ ...form, isaCertificationNum: e.target.value })
                }
                placeholder="WE-12345A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isaExpirationDate">
                ISA Expiration Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="isaExpirationDate"
                type="date"
                value={form.isaExpirationDate}
                onChange={(e) =>
                  setForm({ ...form, isaExpirationDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                placeholder="Peninsula Tree Care (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(650) 555-1234 (optional)"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                "Create Profile & Continue"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
