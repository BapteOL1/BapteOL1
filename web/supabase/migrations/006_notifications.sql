-- 006: notifications
-- In-app notifications for the user

create type public.notification_type as enum (
  'task_due',
  'contract_expiring',
  'service_confirmed',
  'payment_reminder',
  'document_required',
  'info'
);

create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  type       public.notification_type not null default 'info',
  title      text not null,
  body       text,
  link       text,            -- relative URL to navigate to on click
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users read their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users update their own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Service role can insert notifications (for server-side triggers)
create policy "Service role can insert notifications"
  on public.notifications for insert
  to service_role
  with check (true);

create index idx_notifications_user_unread
  on public.notifications(user_id, is_read, created_at desc);
