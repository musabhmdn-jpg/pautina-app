"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { Modal } from "@/components/ui/modal";

export function VerificationModal({
  open,
  onClose,
  opportunityTitle,
}: {
  open: boolean;
  onClose: () => void;
  opportunityTitle?: string;
}) {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 200);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t.landing.modalTitle}
      subtitle={opportunityTitle ?? t.landing.modalBody}
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <p className="text-sm text-muted">{t.landing.modalSuccess}</p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:border-brand/40"
          >
            {t.common.close}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.landing.modalCompany}
            </span>
            <input required type="text" className="form-input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.landing.modalMessage}
            </span>
            <textarea
              rows={3}
              className="form-input resize-none"
              placeholder={t.landing.modalMessagePlaceholder}
            />
          </label>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:border-brand/40"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-strong"
            >
              {t.landing.modalSubmit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
