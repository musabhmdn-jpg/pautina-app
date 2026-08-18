"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium">
      {(["en", "ar"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            locale === option
              ? "bg-brand text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {option === "en" ? "EN" : "AR"}
        </button>
      ))}
    </div>
  );
}
