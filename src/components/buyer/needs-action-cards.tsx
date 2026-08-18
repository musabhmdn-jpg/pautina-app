"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { needsAction } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import type { NeedsActionItem } from "@/lib/mock/types";

const urgencyTone: Record<NeedsActionItem["urgency"], "danger" | "warning" | "brand"> = {
  high: "danger",
  medium: "warning",
  low: "brand",
};

export function NeedsActionCards() {
  const { t, locale } = useLocale();

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        {t.buyer.needsActionTitle}
      </h2>
      {needsAction.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{t.buyer.needsActionEmpty}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {needsAction.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {locale === "ar" ? item.titleAr : item.title}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {locale === "ar" ? item.detailAr : item.detail}
                </p>
              </div>
              <Badge tone={urgencyTone[item.urgency]}>{item.urgency}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
