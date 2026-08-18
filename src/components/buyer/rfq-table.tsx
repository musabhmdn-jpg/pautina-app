"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { rfqs } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import type { RfqStatus } from "@/lib/mock/types";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

const statusTone: Record<RfqStatus, "neutral" | "brand" | "success" | "warning"> = {
  draft: "neutral",
  sent: "brand",
  quoted: "warning",
  closed: "success",
};

export function RfqTable() {
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<RfqStatus>("sent");

  const tabs: { key: RfqStatus; label: string }[] = [
    { key: "draft", label: t.buyer.tabDraft },
    { key: "sent", label: t.buyer.tabSent },
    { key: "quoted", label: t.buyer.tabQuoted },
    { key: "closed", label: t.buyer.tabClosed },
  ];

  const statusLabel: Record<RfqStatus, string> = {
    draft: t.buyer.tabDraft,
    sent: t.buyer.tabSent,
    quoted: t.buyer.tabQuoted,
    closed: t.buyer.tabClosed,
  };

  const filtered = rfqs.filter((r) => r.status === tab);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          {t.buyer.rfqTableTitle}
        </h2>
        <div className="inline-flex items-center gap-1 overflow-x-auto rounded-full border border-border bg-background p-1 text-xs font-medium">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                tab === item.key
                  ? "bg-brand text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-start text-xs text-muted">
              <th className="px-2 py-2 text-start font-medium">{t.buyer.colRfq}</th>
              <th className="px-2 py-2 text-start font-medium">
                {t.buyer.colSupplierCount}
              </th>
              <th className="px-2 py-2 text-start font-medium">{t.buyer.colDeadline}</th>
              <th className="px-2 py-2 text-start font-medium">{t.buyer.colValue}</th>
              <th className="px-2 py-2 text-start font-medium">{t.buyer.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rfq) => (
              <tr key={rfq.id} className="border-b border-border last:border-0">
                <td className="px-2 py-3">
                  <p className="font-medium text-foreground">
                    {locale === "ar" ? rfq.titleAr : rfq.title}
                  </p>
                  <p className="text-xs text-muted">#{rfq.id.split("-")[1]}</p>
                </td>
                <td className="px-2 py-3 text-muted">{rfq.supplierCount}</td>
                <td className="px-2 py-3 text-muted">
                  {rfq.deadlineDays === 0 ? "—" : `${rfq.deadlineDays} ${t.common.days}`}
                </td>
                <td className="px-2 py-3 font-medium text-foreground">
                  {formatCurrency(rfq.value, locale)}
                </td>
                <td className="px-2 py-3">
                  <Badge tone={statusTone[rfq.status]}>{statusLabel[rfq.status]}</Badge>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-2 py-8 text-center text-sm text-muted">
                  —
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
