"use client";

import { ConnectivityProvider } from "@/lib/connectivity";
import { ThemeProvider } from "@/components/theme-provider";
import { type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ConnectivityProvider>{children}</ConnectivityProvider>
    </ThemeProvider>
  );
}
