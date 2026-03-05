"use client";

import { useState, useEffect, useRef } from "react";
import { WifiOff } from "lucide-react";
import { useConnectivity } from "@/lib/connectivity";

export function ConnectivityIndicator() {
  const { isOnline, pendingCount } = useConnectivity();
  const [wasOffline, setWasOffline] = useState(false);
  const prevOnline = useRef(true);

  useEffect(() => {
    if (isOnline && !prevOnline.current) {
      // Just came back online
      setWasOffline(true);
      const t = setTimeout(() => setWasOffline(false), 3000);
      return () => clearTimeout(t);
    }
    if (!isOnline) {
      prevOnline.current = false;
    } else {
      prevOnline.current = true;
    }
  }, [isOnline]);

  if (isOnline && !wasOffline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] text-center py-2 px-4 text-sm font-medium transition-colors ${
        isOnline ? "bg-forest-light text-white" : "bg-amber-500 text-white"
      }`}
    >
      {isOnline ? (
        pendingCount > 0 ? (
          `Back online — syncing ${pendingCount} change${pendingCount !== 1 ? "s" : ""}...`
        ) : (
          "Back online"
        )
      ) : (
        <span className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          You are offline — changes will sync when reconnected
          {pendingCount > 0 && ` (${pendingCount} pending)`}
        </span>
      )}
    </div>
  );
}
