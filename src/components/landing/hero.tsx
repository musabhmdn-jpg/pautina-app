"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers/locale-provider";

const stats = [
  { key: "heroStat1Label", value: "12,400+" },
  { key: "heroStat2Label", value: "3,800" },
  { key: "heroStat3Label", value: "4.2 hrs" },
] as const;

const sectors = [
  "Construction",
  "Manufacturing",
  "FMCG",
  "Facilities management",
  "Logistics",
  "Corporate services",
];

export function Hero() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-b border-border bg-gradient-to-b from-brand-soft/60 to-transparent">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">
            {t.landing.heroEyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t.landing.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {t.landing.heroSubtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#verify"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              {t.landing.heroCtaPrimary}
            </a>
            <a
              href="#opportunities"
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/40"
            >
              {t.landing.heroCtaSecondary}
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.key}>
                <dt className="text-xs text-muted">{t.landing[stat.key]}</dt>
                <dd className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="verify" className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {t.landing.formSuccessTitle}
              </h3>
              <p className="max-w-xs text-sm text-muted">{t.landing.formSuccessBody}</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-foreground">
                {t.landing.formTitle}
              </h2>
              <p className="mt-1 text-sm text-muted">{t.landing.formSubtitle}</p>
              <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
                <Field label={t.landing.formCompanyName}>
                  <input required type="text" className="form-input" placeholder="Al Faisal Trading Co." />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.landing.formCrNumber}>
                    <input required type="text" inputMode="numeric" className="form-input" placeholder="1010XXXXXX" />
                  </Field>
                  <Field label={t.landing.formSijillatNumber}>
                    <input required type="text" inputMode="numeric" className="form-input" placeholder="7001XXXXXX" />
                  </Field>
                </div>
                <Field label={t.landing.formSector}>
                  <select required className="form-input" defaultValue="">
                    <option value="" disabled>
                      {t.common.filter}
                    </option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.landing.formEmail}>
                    <input required type="email" className="form-input" placeholder="you@company.com" />
                  </Field>
                  <Field label={t.landing.formPhone}>
                    <input required type="tel" className="form-input" placeholder="+966 5X XXX XXXX" />
                  </Field>
                </div>
                <button
                  type="submit"
                  className="mt-1 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
                >
                  {t.landing.formSubmit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
