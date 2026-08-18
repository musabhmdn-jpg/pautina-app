# Pautina

Pautina is a verified B2B marketplace prototype for the Kingdom, connecting CR/Sijillat-verified
buyers and suppliers through RFQs, transparent quoting, and order tracking.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. All data is mocked client-side —
there is no backend.

## Routes

- `/` — Public landing page: hero with a CR/Sijillat verification request form, a 3-step
  verification process, and a live opportunities feed with an application modal.
- `/buyer` — Buyer workspace: KPI chips, "needs your action" cards, a tabbed RFQ table, an order
  tracker, and a quote-comparison panel.
- `/supplier` — Supplier workspace: instant-quote toggles, an active RFQ inbox, catalogue pricing,
  and a quote-builder drawer.

The header includes an EN/AR language switcher (with full RTL support) and a dark/light mode
toggle, both persisted to `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
