"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { quotes } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function QuoteComparisonPanel() {
  const { t, locale } = useLocale();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        {t.buyer.quoteComparisonTitle}
      </h2>
      <p className="mt-1 text-xs text-muted">{t.buyer.quoteComparisonSubtitle}</p>

      <div className="mt-4 flex flex-col gap-3">
        {quotes.map((quote) => {
          const isSelected = selected === quote.id;
          return (
            <div
              key={quote.id}
              className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 transition-colors ${
                isSelected
                  ? "border-brand bg-brand-soft/60"
                  : "border-border bg-background"
              }`}
            >
              <div className="min-w-[10rem]">
                <p className="text-sm font-medium text-foreground">{quote.supplier}</p>
                <p className="mt-0.5 text-xs text-muted">★ {quote.rating.toFixed(1)}</p>
              </div>
              <div className="flex items-center gap-2">
                {quote.isBestPrice ? (
                  <Badge tone="success">{t.buyer.quoteComparisonBestPrice}</Badge>
                ) : null}
                {quote.isFastest ? (
                  <Badge tone="brand">{t.buyer.quoteComparisonFastest}</Badge>
                ) : null}
              </div>
              <div className="text-end">
                <p className="text-sm font-bold text-foreground">
                  {formatCurrency(quote.price, locale)}
                </p>
                <p className="text-xs text-muted">
                  {quote.leadTimeDays} {t.common.days}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(quote.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-brand text-white"
                    : "border border-border text-foreground hover:border-brand/40"
                }`}
              >
                {isSelected ? "✓" : t.buyer.quoteComparisonSelect}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
