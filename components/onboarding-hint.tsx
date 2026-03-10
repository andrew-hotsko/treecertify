"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingHintProps {
  hintId: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function OnboardingHint({ hintId, children, icon: Icon, className }: OnboardingHintProps) {
  const [dismissed, setDismissed] = useState(true); // hidden by default until mounted

  useEffect(() => {
    const key = `tc_hint_dismissed_${hintId}`;
    const wasDismissed = localStorage.getItem(key) === "true";
    setDismissed(wasDismissed);
  }, [hintId]);

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(`tc_hint_dismissed_${hintId}`, "true");
    setDismissed(true);
  };

  return (
    <div
      className={cn(
        "bg-forest/5 border border-forest/20 rounded-lg p-3 text-sm text-forest flex items-start gap-2",
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4 mt-0.5 shrink-0" />}
      <span className="flex-1">{children}</span>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-0.5 rounded hover:bg-forest/10 transition-colors"
        aria-label="Dismiss hint"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
