-- Pautina core schema: profiles, cr_verifications, rfqs.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth.users account, buyer or supplier
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('buyer', 'supplier')),
  company_name text not null,
  cr_number text,
  sijillat_number text,
  sector text,
  email text,
  phone text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up. Role and
-- company name are read from the auth signup call's `options.data` payload
-- (raw_user_meta_data), e.g. supabase.auth.signUp({ options: { data: {...} } }).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, company_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'buyer'),
    coalesce(new.raw_user_meta_data ->> 'company_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- cr_verifications: CR / Sijillat verification requests submitted from the
-- public landing page form. Submissions are allowed from anonymous visitors
-- (they may not have an account yet) and are optionally linked to a profile.
-- ---------------------------------------------------------------------------
create table public.cr_verifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  company_name text not null,
  cr_number text not null,
  sijillat_number text not null,
  sector text not null,
  email text not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewer_notes text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index cr_verifications_status_idx on public.cr_verifications (status);
create index cr_verifications_profile_id_idx on public.cr_verifications (profile_id);

alter table public.cr_verifications enable row level security;

-- Anyone (including anonymous visitors) can submit a verification request.
create policy "anyone can submit a verification request"
  on public.cr_verifications for insert
  with check (true);

-- Signed-in users can see verification requests linked to their own profile.
create policy "owners can view their verification requests"
  on public.cr_verifications for select
  using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------------
-- rfqs: requests for quote created by buyers
-- ---------------------------------------------------------------------------
create table public.rfqs (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  sector text,
  deadline date,
  estimated_value numeric(14, 2),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'quoted', 'closed')),
  supplier_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index rfqs_buyer_id_idx on public.rfqs (buyer_id);
create index rfqs_status_idx on public.rfqs (status);

alter table public.rfqs enable row level security;

create trigger rfqs_set_updated_at
  before update on public.rfqs
  for each row execute function public.set_updated_at();

-- Buyers manage their own RFQs end-to-end.
create policy "buyers can view their own rfqs"
  on public.rfqs for select
  using (auth.uid() = buyer_id);

create policy "buyers can insert their own rfqs"
  on public.rfqs for insert
  with check (auth.uid() = buyer_id);

create policy "buyers can update their own rfqs"
  on public.rfqs for update
  using (auth.uid() = buyer_id)
  with check (auth.uid() = buyer_id);

create policy "buyers can delete their own rfqs"
  on public.rfqs for delete
  using (auth.uid() = buyer_id);

-- Suppliers can browse published (non-draft) RFQs to respond to.
create policy "suppliers can view published rfqs"
  on public.rfqs for select
  using (
    status <> 'draft'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'supplier'
    )
  );
