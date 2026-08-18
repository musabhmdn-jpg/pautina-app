"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { orders, rfqs } from "@/lib/mock/data";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function KpiChips() {
  const { t, locale } = useLocale();

  const openRfqs = rfqs.filter((r) => r.status !== "closed").length;
  const pendingQuotes = rfqs.filter((r) => r.status === "quoted").length;
  const activeOrders = orders.filter((o) => o.stage !== "delivered").length;
  const spendMtd = 742500;

  const items = [
    { label: t.buyer.kpiOpenRfqs, value: String(openRfqs) },
    { label: t.buyer.kpiPendingQuotes, value: String(pendingQuotes) },
    { label: t.buyer.kpiActiveOrders, value: String(activeOrders) },
    { label: t.buyer.kpiSpendMtd, value: formatCurrency(spendMtd, locale) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border bg-surface p-4"
        >
          <p className="text-xs text-muted">{item.label}</p>
          <p className="mt-1.5 text-xl font-bold text-foreground sm:text-2xl">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
