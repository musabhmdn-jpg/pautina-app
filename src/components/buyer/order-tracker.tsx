"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { orders } from "@/lib/mock/data";
import type { OrderStage } from "@/lib/mock/types";

const stages: OrderStage[] = ["confirmed", "production", "shipped", "delivered"];

const stageLabel: Record<OrderStage, { en: string; ar: string }> = {
  confirmed: { en: "Confirmed", ar: "مؤكد" },
  production: { en: "Production", ar: "قيد التصنيع" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التسليم" },
};

export function OrderTracker() {
  const { t, locale } = useLocale();

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        {t.buyer.orderTrackerTitle}
      </h2>
      <p className="mt-1 text-xs text-muted">{t.buyer.orderTrackerSubtitle}</p>

      <ul className="mt-4 flex flex-col gap-5">
        {orders.map((order) => {
          const activeIndex = stages.indexOf(order.stage);
          return (
            <li key={order.id}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {locale === "ar" ? order.titleAr : order.title}
                  </p>
                  <p className="text-xs text-muted">{order.supplier}</p>
                </div>
                <span className="whitespace-nowrap text-xs font-medium text-muted">
                  {order.eta}
                </span>
              </div>
              <div className="mt-3 flex items-center">
                {stages.map((stage, index) => (
                  <div key={stage} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          index <= activeIndex ? "bg-brand" : "bg-border"
                        }`}
                      />
                      <span
                        className={`mt-1.5 hidden text-[10px] sm:block ${
                          index <= activeIndex ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {locale === "ar" ? stageLabel[stage].ar : stageLabel[stage].en}
                      </span>
                    </div>
                    {index < stages.length - 1 ? (
                      <span
                        className={`mx-1 h-0.5 flex-1 ${
                          index < activeIndex ? "bg-brand" : "bg-border"
                        }`}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
