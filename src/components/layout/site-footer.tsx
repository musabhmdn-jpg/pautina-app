"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-xs font-bold text-white">
            P
          </span>
          <span className="font-medium text-foreground">{t.common.appName}</span>
        </div>
        <p>{t.common.tagline}</p>
      </div>
    </footer>
  );
}
