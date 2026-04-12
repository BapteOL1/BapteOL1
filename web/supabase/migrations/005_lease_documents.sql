-- 005: lease_documents
-- Stores lease/contract documents metadata for a user

create type public.document_type as enum (
  'lease',
  'id_card',
  'proof_of_income',
  'bank_statement',
  'insurance_certificate',
  'utility_bill',
  'other'
);

create table if not exists public.lease_documents (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  document_type public.document_type not null,
  filename      text not null,
  storage_path  text not null,     -- path in Supabase Storage bucket "documents"
  file_size     int,               -- bytes
  mime_type     text,
  expiry_date   date,              -- for ID cards, insurance certificates, etc.
  is_verified   boolean default false,
  notes         text,
  created_at    timestamptz not null default now()
);

alter table public.lease_documents enable row level security;

create policy "Users manage their own documents"
  on public.lease_documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index idx_lease_docs_user_id on public.lease_documents(user_id, document_type);
