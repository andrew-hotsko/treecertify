"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  Plus,
  User,
  Settings,
  Shield,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConnectivity } from "@/lib/connectivity";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/properties",
    icon: MapPin,
  },
  {
    label: "Ordinances",
    href: "/ordinances",
    icon: BookOpen,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  arboristName: string;
  isaCertNum: string;
  profilePhotoUrl?: string;
  isAdmin?: boolean;
}

export function Sidebar({ arboristName, isaCertNum, profilePhotoUrl, isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const { isOnline, pendingCount } = useConnectivity();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 w-64 flex-col bg-neutral-800 text-neutral-100">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-neutral-700 px-6">
        <div>
          <h1 className="text-lg font-display font-bold tracking-tight">
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-neutral-50 transition-colors hover:bg-forest-light"
        >
          <Plus className="h-4 w-4" />
          New Property
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {[...navItems, ...(isAdmin ? [{ label: "Admin", href: "/admin", icon: Shield }] : [])].map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-forest/10 text-forest-muted border-l-[3px] border-forest-muted pl-[9px]"
                  : "text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sample Report */}
      <div className="px-3 mb-2">
        <a
          href="/api/sample-report?showcase=true"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors"
        >
          <FileText className="h-5 w-5" />
          Sample Report
        </a>
      </div>

      {/* User section */}
      <div className="border-t border-neutral-700 p-4">
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
    </aside>
  );
}
