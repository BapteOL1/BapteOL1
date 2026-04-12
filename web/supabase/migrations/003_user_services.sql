-- 003: user_services
-- Tracks which services a user has subscribed to / is in process of subscribing

create type public.service_status as enum (
  'interested',    -- user bookmarked
  'in_progress',   -- subscription started
  'active',        -- fully subscribed
  'cancelled'
);

create table if not exists public.user_services (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  provider_id         uuid not null references public.service_providers(id),
  status              public.service_status not null default 'interested',
  subscribed_at       timestamptz,
  contract_start_date date,
  contract_end_date   date,
  monthly_price       numeric(8,2),
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  unique (user_id, provider_id)
);

alter table public.user_services enable row level security;

create policy "Users manage their own services"
  on public.user_services for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index idx_user_services_user_id on public.user_services(user_id);
