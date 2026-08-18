"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import type { SupplierRfqInboxItem } from "@/lib/mock/types";

export function QuoteBuilderDrawer({
  item,
  onClose,
}: {
  item: SupplierRfqInboxItem | null;
  onClose: () => void;
}) {
  const { t, dir } = useLocale();
  const open = item !== null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const offscreen = dir === "rtl" ? "-translate-x-full" : "translate-x-full";

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        aria-label={t.common.close}
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col border-s border-border bg-surface p-6 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : offscreen
        }`}
      >
        {item ? <DrawerContent key={item.id} item={item} onClose={onClose} /> : null}
      </div>
    </div>
  );
}

function DrawerContent({
  item,
  onClose,
}: {
  item: SupplierRfqInboxItem;
  onClose: () => void;
}) {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t.supplier.drawerTitle}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {locale === "ar" ? item.titleAr : item.title} · {item.buyer}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted hover:text-foreground"
        >
          ✕
        </button>
      </div>

      {sent ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <p className="text-sm text-muted">{t.supplier.drawerSubtitle}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:border-brand/40"
          >
            {t.common.close}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">
                {t.supplier.drawerUnitPrice}
              </span>
              <input required type="number" min={0} step="0.01" className="form-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">
                {t.supplier.drawerQuantity}
              </span>
              <input required type="text" defaultValue={item.quantity} className="form-input" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.supplier.drawerLeadTime}
            </span>
            <input required type="number" min={1} className="form-input" />
          </label>
          <label className="block flex-1">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.supplier.drawerNotes}
            </span>
            <textarea
              rows={4}
              className="form-input resize-none"
              placeholder={t.supplier.drawerNotesPlaceholder}
            />
          </label>
          <button
            type="submit"
            className="mt-auto rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            {t.supplier.drawerSend}
          </button>
        </form>
      )}
    </>
  );
}
