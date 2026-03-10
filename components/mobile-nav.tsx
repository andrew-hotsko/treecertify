"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: MapPin },
  { label: "Add", href: "/properties/new", icon: Plus, isCenter: true },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface MobileNavProps {
  arboristName: string;
  isaCertNum: string;
  profilePhotoUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileNav(_props: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-800 border-t border-neutral-700"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-end justify-around h-16 px-2">
        {tabItems.map((item) => {
          const isActive =
            !item.isCenter &&
            (pathname === item.href || pathname.startsWith(item.href + "/"));
          const Icon = item.icon;

          if (item.isCenter) {
            // Center "Add" button — raised, forest green
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4"
                aria-label={item.label}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-lg transition-transform active:scale-95">
                  <Icon className="h-6 w-6" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] min-h-[44px] transition-colors",
                isActive ? "text-forest-muted" : "text-neutral-500"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-forest-muted")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
