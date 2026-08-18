"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { catalogue } from "@/lib/mock/data";

function formatCurrency(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value);
}

export function CataloguePricing() {
  const { t, locale } = useLocale();

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {t.supplier.catalogueTitle}
          </h2>
          <p className="mt-1 text-xs text-muted">{t.supplier.catalogueSubtitle}</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand/40"
        >
          + {t.supplier.catalogueAddItem}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="px-2 py-2 text-start font-medium">{t.supplier.colProduct}</th>
              <th className="px-2 py-2 text-start font-medium">{t.supplier.colSku}</th>
              <th className="px-2 py-2 text-start font-medium">{t.supplier.colPrice}</th>
              <th className="px-2 py-2 text-start font-medium">{t.supplier.colMoq}</th>
              <th className="px-2 py-2 text-start font-medium">{t.supplier.colLeadTime}</th>
            </tr>
          </thead>
          <tbody>
            {catalogue.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-2 py-3 font-medium text-foreground">
                  {locale === "ar" ? item.productAr : item.product}
                </td>
                <td className="px-2 py-3 text-muted">{item.sku}</td>
                <td className="px-2 py-3 text-foreground">
                  {formatCurrency(item.price, locale)}
                </td>
                <td className="px-2 py-3 text-muted">{item.moq}</td>
                <td className="px-2 py-3 text-muted">
                  {item.leadTimeDays} {t.common.days}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
