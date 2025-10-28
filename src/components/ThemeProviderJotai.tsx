"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";

export default function ThemeProviderJotai({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useAtom(themeAtom);

  // Initialize theme from localStorage or system
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (saved) setTheme(saved);
  }, [setTheme]);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystemTheme = () => {
        root.classList.toggle("dark", darkQuery.matches);
      };
      applySystemTheme();
      darkQuery.addEventListener("change", applySystemTheme);
      return () => darkQuery.removeEventListener("change", applySystemTheme);
    }

    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
}
