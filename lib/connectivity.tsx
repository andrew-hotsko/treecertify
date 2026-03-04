"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface ConnectivityState {
  isOnline: boolean;
  pendingCount: number;
  setPendingCount: (count: number) => void;
}

const ConnectivityContext = createContext<ConnectivityState>({
  isOnline: true,
  pendingCount: 0,
  setPendingCount: () => {},
});

export function useConnectivity(): ConnectivityState {
  return useContext(ConnectivityContext);
}

export function ConnectivityProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    // Initialize pending count from localStorage queue
    try {
      const queue = JSON.parse(
        localStorage.getItem("treecertify_queue") || "[]"
      );
      setPendingCount(queue.length);
    } catch {
      /* ignore */
    }

    function handleOnline() {
      setIsOnline(true);
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

  return (
    <ConnectivityContext.Provider
      value={{ isOnline, pendingCount, setPendingCount }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
}
