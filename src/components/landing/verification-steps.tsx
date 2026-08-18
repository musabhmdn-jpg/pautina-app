"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function VerificationSteps() {
  const { t } = useLocale();

  const steps = [
    { title: t.landing.step1Title, body: t.landing.step1Body },
    { title: t.landing.step2Title, body: t.landing.step2Body },
    { title: t.landing.step3Title, body: t.landing.step3Body },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.landing.stepsTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.landing.stepsSubtitle}</p>
        </div>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
