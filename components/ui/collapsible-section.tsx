"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  badge?: string | number;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function CollapsibleSection({
  title,
  badge,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="text-xs font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-1.5">
          {badge !== undefined && badge !== 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-forest/10 text-forest text-[10px] font-semibold">
              {badge}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
