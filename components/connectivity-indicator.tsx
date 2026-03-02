"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function ConnectivityIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    function handleOnline() {
      setIsOnline(true);
      setWasOffline(true);
      // Hide the "back online" message after 3 seconds
      setTimeout(() => setWasOffline(false), 3000);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !wasOffline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] text-center py-2 px-4 text-sm font-medium transition-colors ${
        isOnline
          ? "bg-emerald-500 text-white"
          : "bg-amber-500 text-white"
      }`}
    >
      {isOnline ? (
        "Back online"
      ) : (
        <span className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          You are offline. Changes may not be saved.
        </span>
      )}
    </div>
  );
}
