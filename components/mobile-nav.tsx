"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TreePine,
  LayoutDashboard,
  MapPin,
  BookOpen,
  Plus,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: MapPin },
  { label: "Ordinances", href: "/ordinances", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface MobileNavProps {
  arboristName: string;
  isaCertNum: string;
  profilePhotoUrl?: string;
}

export function MobileNav({ arboristName, isaCertNum, profilePhotoUrl }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar — mobile only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
        <div className="flex items-center gap-2">
          <TreePine className="h-5 w-5 text-emerald-400" />
          <span className="font-bold text-sm">TreeCertify</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center h-11 w-11 -mr-2 rounded-lg"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out sidebar overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-[hsl(var(--sidebar-muted))] px-6">
          <TreePine className="h-6 w-6 text-emerald-400" />
          <div>
            <h1 className="text-base font-bold tracking-tight">TreeCertify</h1>
            <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))]/60">
              Arborist OS
            </p>
          </div>
        </div>

        {/* Quick action */}
        <div className="px-4 py-4">
          <Link
            href="/properties/new"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            <Plus className="h-4 w-4" />
            New Property
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[hsl(var(--sidebar-accent))] text-white"
                    : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-muted))] hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-[hsl(var(--sidebar-muted))] p-4">
          <div className="flex items-center gap-3">
            {profilePhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profilePhotoUrl}
                alt={arboristName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sidebar-muted))]">
                <User className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{arboristName}</p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50 truncate">
                ISA {isaCertNum}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
