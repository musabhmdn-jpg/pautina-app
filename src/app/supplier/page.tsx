"use client";

import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useLocale } from "@/components/providers/locale-provider";
import { InstantQuoteToggles } from "@/components/supplier/instant-quote-toggles";
import { RfqInbox } from "@/components/supplier/rfq-inbox";
import { CataloguePricing } from "@/components/supplier/catalogue-pricing";

export default function SupplierWorkspacePage() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {t.supplier.title}
            </h1>
            <p className="mt-1 text-sm text-muted">{t.supplier.subtitle}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-6">
              <RfqInbox />
              <CataloguePricing />
            </div>
            <div className="flex flex-col gap-6">
              <InstantQuoteToggles />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
