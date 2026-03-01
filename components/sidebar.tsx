"use client";

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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export function Sidebar({ arboristName, isaCertNum }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[hsl(var(--sidebar-muted))] px-6">
        <TreePine className="h-7 w-7 text-emerald-400" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">TreeCertify</h1>
          <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))]/60">
            Arborist OS
          </p>
        </div>
      </div>

      {/* Quick action */}
      <div className="px-4 py-4">
        <Link
          href="/properties/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sidebar-muted))]">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{arboristName}</p>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50 truncate">
              ISA {isaCertNum}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
