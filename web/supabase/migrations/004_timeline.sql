-- 004: timeline
-- Relocation timeline tasks, per user

create type public.task_status as enum (
  'pending',
  'in_progress',
  'done',
  'blocked'
);

create type public.task_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

create table if not exists public.timeline_tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  description text,
  category    text,           -- 'documents', 'services', 'move_in', 'installed'
  status      public.task_status not null default 'pending',
  priority    public.task_priority not null default 'medium',
  due_date    date,
  done_at     timestamptz,
  sort_order  int default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.timeline_tasks enable row level security;

create policy "Users manage their own tasks"
  on public.timeline_tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index idx_timeline_user_id on public.timeline_tasks(user_id, due_date);
