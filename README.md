# Pautina

Pautina is a verified B2B marketplace prototype for the Kingdom, connecting CR/Sijillat-verified
buyers and suppliers through RFQs, transparent quoting, and order tracking.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase (Postgres + Auth). The
buyer/supplier workspace dashboards are still mocked client-side; the landing page's CR/Sijillat
verification form writes real rows to Supabase.

## Routes

- `/` — Public landing page: hero with a CR/Sijillat verification request form (writes to
  Supabase), a 3-step verification process, and a live opportunities feed with an application
  modal.
- `/buyer` — Buyer workspace: KPI chips, "needs your action" cards, a tabbed RFQ table, an order
  tracker, and a quote-comparison panel.
- `/supplier` — Supplier workspace: instant-quote toggles, an active RFQ inbox, catalogue pricing,
  and a quote-builder drawer.

The header includes an EN/AR language switcher (with full RTL support) and a dark/light mode
toggle, both persisted to `localStorage`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Apply the schema in `supabase/migrations/` — either run
   `npx supabase link --project-ref <your-project-ref>` then `npx supabase db push`, or paste the
   contents of `supabase/migrations/20260818192127_init_schema.sql` into the SQL editor in the
   Supabase dashboard.
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL and anon key (Project
   Settings → API).

### Schema

- **`profiles`** — one row per `auth.users` account, `role` is `buyer` or `supplier`. Auto-created
  by a database trigger (`handle_new_user`) when a user signs up; the trigger reads `role`,
  `company_name`, and `phone` from the sign-up call's `options.data` metadata.
- **`cr_verifications`** — CR/Sijillat verification requests submitted from the landing page form.
  Open to anonymous inserts (RLS `with check (true)`) since applicants may not have an account yet;
  only the linked profile owner can read their own submissions back.
- **`rfqs`** — requests for quote created by buyers. Buyers manage their own rows; suppliers can
  read any non-draft (published) RFQ.

## Getting started

```bash
npm install
cp .env.local.example .env.local  # then fill in your Supabase project credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
