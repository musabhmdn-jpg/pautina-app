"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppHeader() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            P
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            {t.common.appName}
          </span>
        </Link>

        <div className="order-3 w-full sm:order-2 sm:w-auto">
          <WorkspaceSwitcher />
        </div>

        <div className="order-2 flex items-center gap-2 sm:order-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/#verify"
            className="hidden rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            {t.nav.getVerified}
          </Link>
        </div>
      </div>
    </header>
  );
}
