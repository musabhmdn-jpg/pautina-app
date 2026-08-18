"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { opportunities } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import { VerificationModal } from "./verification-modal";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function OpportunitiesFeed() {
  const { t, locale } = useLocale();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOpportunity = opportunities.find((o) => o.id === selected);

  return (
    <section id="opportunities" className="scroll-mt-20 border-b border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                {t.common.live}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.landing.opportunitiesTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{t.landing.opportunitiesSubtitle}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <Badge tone={opp.deadlineDays <= 3 ? "warning" : "neutral"}>
                  {opp.deadlineDays} {t.common.days}
                </Badge>
                <span className="text-xs text-muted">{opp.postedMinutesAgo}m ago</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground">
                {locale === "ar" ? opp.titleAr : opp.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{opp.buyer}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{locale === "ar" ? opp.locationAr : opp.location}</span>
                <span>{locale === "ar" ? opp.sectorAr : opp.sector}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(opp.value, locale)}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(opp.id)}
                  className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
                >
                  {t.landing.opportunityApply}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VerificationModal
        open={selected !== null}
        onClose={() => setSelected(null)}
        opportunityTitle={
          selectedOpportunity
            ? locale === "ar"
              ? selectedOpportunity.titleAr
              : selectedOpportunity.title
            : undefined
        }
        opportunitySector={selectedOpportunity?.sector}
      />
    </section>
  );
}
