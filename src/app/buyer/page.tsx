"use client";

import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useLocale } from "@/components/providers/locale-provider";
import { KpiChips } from "@/components/buyer/kpi-chips";
import { NeedsActionCards } from "@/components/buyer/needs-action-cards";
import { RfqTable } from "@/components/buyer/rfq-table";
import { OrderTracker } from "@/components/buyer/order-tracker";
import { QuoteComparisonPanel } from "@/components/buyer/quote-comparison-panel";

export default function BuyerWorkspacePage() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 bg-[#f6f7fb] dark:bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {t.buyer.title}
            </h1>
            <p className="mt-1 text-sm text-muted">{t.buyer.subtitle}</p>
          </div>

          <KpiChips />

          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-6">
              <RfqTable />
              <QuoteComparisonPanel />
            </div>
            <div className="flex flex-col gap-6">
              <NeedsActionCards />
              <OrderTracker />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
