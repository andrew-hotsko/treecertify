"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  resolvedTheme: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemPreference();
  return theme;
}

// Field mode routes force light theme on mobile
const FIELD_MODE_ROUTES = ["/properties/"];

function isFieldModeRoute(pathname: string): boolean {
  return FIELD_MODE_ROUTES.some((route) => pathname.includes(route));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch arborist's theme preference on mount
  useEffect(() => {
    async function fetchPreference() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (res.ok) {
          const data = await res.json();
          const pref = (data.themePreference as Theme) || "light";
          setThemeState(pref);
        }
      } catch {
        // Silently fall back to light — unauthenticated pages won't have a profile
      } finally {
        setHasFetched(true);
      }
    }
    fetchPreference();
  }, []);

  // Apply the data-theme attribute and resolve theme
  useEffect(() => {
    if (!hasFetched) return;

    const isMobile = window.innerWidth < 768;
    const isFieldRoute = isFieldModeRoute(window.location.pathname);

    // Field mode (mobile + field route) always forces light
    if (isMobile && isFieldRoute) {
      document.documentElement.setAttribute("data-theme", "light");
      setResolvedTheme("light");
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    setResolvedTheme(resolveTheme(theme));
  }, [theme, hasFetched]);

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolvedTheme(getSystemPreference());
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    // Persist to server — fire and forget
    fetch("/api/arborist/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themePreference: newTheme }),
    }).catch(() => {});
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
