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
import { useConnectivity } from "@/lib/connectivity";

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
  const { isOnline, pendingCount } = useConnectivity();

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
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-neutral-800 text-neutral-100">
        <div className="flex items-center gap-2">
          <TreePine className="h-5 w-5 text-forest-muted" />
          <span className="font-display font-bold text-sm">
            <span className="text-forest-muted">Tree</span>
            <span className="text-neutral-50">Certify</span>
          </span>
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
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-neutral-800 text-neutral-100 transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-neutral-700 px-6">
          <TreePine className="h-6 w-6 text-forest-muted" />
          <div>
            <h1 className="text-base font-display font-bold tracking-tight">
              <span className="text-forest-muted">Tree</span>
              <span className="text-neutral-50">Certify</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              Arborist OS
            </p>
          </div>
        </div>

        {/* Quick action */}
        <div className="px-4 py-4">
          <Link
            href="/properties/new"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-forest-light"
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
                    ? "bg-forest text-neutral-50"
                    : "text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-neutral-700 p-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              {profilePhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profilePhotoUrl}
                  alt={arboristName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700">
                  <User className="h-5 w-5" />
                </div>
              )}
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-neutral-800",
                  isOnline ? "bg-forest-muted" : "bg-red-500 animate-pulse"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-300 truncate">{arboristName}</p>
              <p className="font-mono text-xs text-neutral-500 truncate">
                ISA {isaCertNum}
              </p>
              {pendingCount > 0 && (
                <p className="text-[10px] text-orange-400 font-medium">
                  {pendingCount} pending
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
