"use client";

import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground/80 transition-colors hover:text-foreground"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M6 6l1 1M18 18l-1-1M6 18l1-1M18 6l-1 1"
          />
          <circle cx="12" cy="12" r="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
