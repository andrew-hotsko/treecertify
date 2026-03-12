"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: MapPin },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-neutral-800 border-t border-neutral-700"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", height: "calc(52px + env(safe-area-inset-bottom, 0px))" }}
    >
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-medium transition-colors",
              isActive ? "text-forest-muted" : "text-neutral-400"
            )}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
