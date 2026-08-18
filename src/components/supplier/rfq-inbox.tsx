"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { supplierRfqInbox } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import { QuoteBuilderDrawer } from "./quote-builder-drawer";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RfqInbox() {
  const { t, locale } = useLocale();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = supplierRfqInbox.find((item) => item.id === activeId) ?? null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        {t.supplier.rfqInboxTitle}
      </h2>
      <p className="mt-1 text-xs text-muted">{t.supplier.rfqInboxSubtitle}</p>

      <ul className="mt-4 flex flex-col gap-3">
        {supplierRfqInbox.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-3.5"
          >
            <div className="min-w-[12rem]">
              <p className="text-sm font-medium text-foreground">
                {locale === "ar" ? item.titleAr : item.title}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {item.buyer} · {item.quantity}
              </p>
            </div>
            <Badge tone={item.deadlineDays <= 1 ? "danger" : "warning"}>
              {item.deadlineDays} {t.common.days}
            </Badge>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrency(item.value, locale)}
            </span>
            <button
              type="button"
              onClick={() => setActiveId(item.id)}
              className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              {t.supplier.rfqRespond}
            </button>
          </li>
        ))}
      </ul>

      <QuoteBuilderDrawer item={activeItem} onClose={() => setActiveId(null)} />
    </div>
  );
}
