"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { catalogue } from "@/lib/mock/data";

export function InstantQuoteToggles() {
  const { t, locale } = useLocale();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "cat-1": true,
    "cat-2": true,
    "cat-3": false,
    "cat-4": false,
  });

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        {t.supplier.instantQuoteTitle}
      </h2>
      <p className="mt-1 text-xs text-muted">{t.supplier.instantQuoteSubtitle}</p>

      <ul className="mt-4 flex flex-col gap-3">
        {catalogue.map((item) => {
          const isOn = enabled[item.id];
          return (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {locale === "ar" ? item.productAr : item.product}
                </p>
                <p className="text-xs text-muted">
                  {isOn ? t.supplier.instantQuoteEnabled : t.supplier.instantQuoteDisabled}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={() => toggle(item.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  isOn ? "bg-brand" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    isOn ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5 rtl:-translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
