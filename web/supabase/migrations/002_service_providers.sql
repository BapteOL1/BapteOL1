-- 002: service_providers
-- Catalogue of relocation service providers (moving, electricity, internet, insurance, etc.)

create type public.service_category as enum (
  'moving',
  'electricity',
  'internet',
  'insurance',
  'water_gas',
  'banking',
  'other'
);

create table if not exists public.service_providers (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     public.service_category not null,
  logo_url     text,
  tagline      text,
  description  text,
  price_label  text,          -- e.g. "À partir de 29€/mois"
  rating       numeric(2,1) check (rating >= 0 and rating <= 5),
  review_count int default 0,
  badge        text,          -- e.g. "Recommandé", "Populaire"
  cta_label    text default 'Souscrire',
  external_url text,
  is_active    boolean not null default true,
  sort_order   int default 0,
  created_at   timestamptz not null default now()
);

-- Public read access for authenticated users
alter table public.service_providers enable row level security;

create policy "Authenticated users can read providers"
  on public.service_providers for select
  to authenticated
  using (is_active = true);

-- Seed data
insert into public.service_providers (name, category, tagline, price_label, rating, review_count, badge, sort_order) values
  ('Déménageurs Parisiens', 'moving', 'Déménagement clé en main NYC', 'Devis gratuit', 4.8, 142, 'Recommandé', 1),
  ('MovePro Express',       'moving', 'Rapide, fiable, assuré',        'À partir de 490€', 4.5, 87, null, 2),
  ('EDF',                   'electricity', 'Le fournisseur historique', 'À partir de 18€/mois', 4.2, 320, null, 1),
  ('TotalEnergies',         'electricity', 'Électricité verte 100%',    'À partir de 15€/mois', 4.6, 210, 'Vert', 2),
  ('Orange',                'internet',  'Fibre jusqu''à 2 Gb/s',       'À partir de 29€/mois', 4.3, 480, null, 1),
  ('Free',                  'internet',  'La box la moins chère',       'À partir de 19€/mois', 4.1, 390, 'Populaire', 2),
  ('SFR',                   'internet',  'Box + TV inclus',             'À partir de 24€/mois', 4.0, 270, null, 3),
  ('Luko',                  'insurance', 'Assurance habitation moderne', 'À partir de 5€/mois', 4.7, 650, 'Recommandé', 1),
  ('MAIF',                  'insurance', 'Assurance responsable',        'À partir de 8€/mois', 4.4, 420, null, 2),
  ('GRDF',                  'water_gas', 'Gaz naturel réseau national',  'Variable', 4.0, 180, null, 1);
