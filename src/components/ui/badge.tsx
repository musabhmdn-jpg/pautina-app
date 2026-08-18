import type { ReactNode } from "react";

type BadgeTone = "brand" | "success" | "warning" | "danger" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-soft text-brand-strong",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  danger: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
  neutral: "bg-black/5 text-foreground/70 dark:bg-white/10 dark:text-foreground/70",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
