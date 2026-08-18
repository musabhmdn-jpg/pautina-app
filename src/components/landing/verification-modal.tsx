"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { Modal } from "@/components/ui/modal";
import { createClient } from "@/lib/supabase/client";

const initialForm = {
  companyName: "",
  email: "",
  message: "",
};

type FormState = typeof initialForm;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function VerificationModal({
  open,
  onClose,
  opportunityTitle,
  opportunitySector,
}: {
  open: boolean;
  onClose: () => void;
  opportunityTitle?: string;
  opportunitySector?: string;
}) {
  const { t } = useLocale();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage(null);
      setForm(initialForm);
    }, 200);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const notes = [
      opportunityTitle ? `Applied to opportunity: ${opportunityTitle}` : null,
      form.message.trim() || null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("cr_verifications").insert({
        company_name: form.companyName,
        email: form.email,
        sector: opportunitySector ?? null,
        notes: notes || null,
        source: "opportunity_modal",
      });

      if (error) throw error;

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t.landing.modalError);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t.landing.modalTitle}
      subtitle={opportunityTitle ?? t.landing.modalBody}
    >
      {status === "success" ? (
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
            <input
              required
              type="text"
              className="form-input"
              value={form.companyName}
              onChange={(e) => updateField("companyName")(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.landing.modalEmail}
            </span>
            <input
              required
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => updateField("email")(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">
              {t.landing.modalMessage}
            </span>
            <textarea
              rows={3}
              className="form-input resize-none"
              placeholder={t.landing.modalMessagePlaceholder}
              value={form.message}
              onChange={(e) => updateField("message")(e.target.value)}
            />
          </label>
          {status === "error" ? (
            <p className="text-sm text-rose-600 dark:text-rose-400">
              {errorMessage ?? t.landing.modalError}
            </p>
          ) : null}
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
              disabled={status === "submitting"}
              className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? t.landing.modalSubmitting : t.landing.modalSubmit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
