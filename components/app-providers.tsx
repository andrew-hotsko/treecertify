"use client";

import { ConnectivityProvider } from "@/lib/connectivity";
import { type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ConnectivityProvider>{children}</ConnectivityProvider>;
}
