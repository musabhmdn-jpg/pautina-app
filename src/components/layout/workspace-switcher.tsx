"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";

export function WorkspaceSwitcher() {
  const pathname = usePathname();
  const { t } = useLocale();

  const items = [
    { href: "/", label: t.nav.landing },
    { href: "/buyer", label: t.nav.buyer },
    { href: "/supplier", label: t.nav.supplier },
  ];

  return (
    <nav className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-surface p-1 text-sm font-medium">
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              active
                ? "bg-brand text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
