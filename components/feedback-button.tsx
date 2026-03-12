"use client";

import { useState } from "react";
import { MessageSquarePlus, Bug, Lightbulb, HelpCircle, Camera, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type FeedbackType = "bug" | "suggestion" | "question";

const FEEDBACK_TYPES: {
  value: FeedbackType;
  label: string;
  icon: typeof Bug;
  color: string;
  activeColor: string;
}[] = [
  {
    value: "bug",
    label: "Bug",
    icon: Bug,
    color: "text-red-500",
    activeColor: "bg-red-50 border-red-300 text-red-700",
  },
  {
    value: "suggestion",
    label: "Suggestion",
    icon: Lightbulb,
    color: "text-amber-500",
    activeColor: "bg-amber-50 border-amber-300 text-amber-700",
  },
  {
    value: "question",
    label: "Question",
    icon: HelpCircle,
    color: "text-blue-500",
    activeColor: "bg-blue-50 border-blue-300 text-blue-700",
  },
];

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [description, setDescription] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  function resetForm() {
    setType("suggestion");
    setDescription("");
    setScreenshotUrl(null);
  }

  async function captureScreenshot() {
    setCapturing(true);
    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(document.body, {
        scale: 0.5,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 0.8)
      );
      if (!blob) throw new Error("Failed to create screenshot blob");

      const formData = new FormData();
      formData.append("screenshot", blob, "screenshot.png");

      const res = await fetch("/api/feedback/screenshot", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setScreenshotUrl(data.url);
    } catch (err) {
      console.error("Screenshot capture failed:", err);
      toast({
        title: "Screenshot failed",
        description: "Could not capture screenshot. You can still submit feedback without one.",
        variant: "destructive",
      });
    } finally {
      setCapturing(false);
    }
  }

  async function handleSubmit() {
    if (!description.trim()) return;

    setSubmitting(true);
    try {
      // Extract property ID from URL if on a property page
      const propertyIdMatch = window.location.pathname.match(
        /\/properties\/([a-zA-Z0-9_-]+)/
      );

      const metadata = JSON.stringify({
        userAgent: navigator.userAgent,
        propertyId: propertyIdMatch?.[1] || null,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: new Date().toISOString(),
      });

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          description: description.trim(),
          screenshotUrl,
          pageUrl: window.location.href,
          metadata,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit feedback");
      }

      toast({
        title: "Feedback sent",
        description: "Thank you! We'll review your feedback soon.",
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error("Feedback submission failed:", err);
      toast({
        title: "Submission failed",
        description: "Could not send feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        data-feedback-trigger
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-lg hover:bg-forest-light hover:shadow-xl transition-all active:scale-[0.98] print:hidden"
        aria-label="Send feedback"
      >
        <MessageSquarePlus className="h-5 w-5" />
      </button>

      {/* Feedback Dialog */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Help us improve TreeCertify during the beta.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Type Selector */}
            <div className="flex gap-2">
              {FEEDBACK_TYPES.map((ft) => {
                const Icon = ft.icon;
                const isActive = type === ft.value;
                return (
                  <button
                    key={ft.value}
                    type="button"
                    onClick={() => setType(ft.value)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                      isActive
                        ? ft.activeColor
                        : "border-neutral-300 text-neutral-500 hover:bg-neutral-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {ft.label}
                  </button>
                );
              })}
            </div>

            {/* Description */}
            <Textarea
              placeholder="Describe the issue or your suggestion..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />

            {/* Screenshot */}
            <div className="flex items-center gap-3">
              {screenshotUrl ? (
                <div className="flex items-center gap-2 text-sm text-forest">
                  <Check className="h-4 w-4" />
                  Screenshot attached
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={captureScreenshot}
                  disabled={capturing}
                >
                  {capturing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="mr-2 h-4 w-4" />
                  )}
                  {capturing ? "Capturing..." : "Attach Screenshot"}
                </Button>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!description.trim() || submitting}
                className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-transform"
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {submitting ? "Sending..." : "Send Feedback"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
