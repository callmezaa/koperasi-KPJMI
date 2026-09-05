-- ============================================================================
-- KPJMI — Skema konten website (Fase 1)
-- Tabel: products, gallery_items, testimonials, faqs, site_settings
-- Plus: kebijakan RLS (publik = baca saja, admin login = penuh)
--       dan bucket Storage publik "media".
--
-- Cara pakai: salin seluruh isi file ini ke Supabase Dashboard → SQL Editor
-- → Run. Skrip ini idempotent (aman dijalankan ulang).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Tabel konten
-- ---------------------------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  comment text not null,
  photo_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Baris tunggal (id selalu 1) untuk info kontak
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  hours text not null default '',
  whatsapp text not null default '',
  maps_url text not null default '',
  maps_embed text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 2. Row Level Security — anonim hanya boleh SELECT, admin (authenticated) penuh
-- ---------------------------------------------------------------------------

alter table public.products enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['products', 'gallery_items', 'testimonials', 'faqs', 'site_settings'] loop
    execute format('drop policy if exists "public_read_%1$s" on public.%1$I', t);
    execute format(
      'create policy "public_read_%1$s" on public.%1$I for select using (true)', t);
    execute format('drop policy if exists "admin_all_%1$s" on public.%1$I', t);
    execute format(
      'create policy "admin_all_%1$s" on public.%1$I for all to authenticated using (true) with check (true)',
      t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 3. Storage — bucket publik "media" (folder: products/, gallery/, testimonials/)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "admin_write_media" on storage.objects;
create policy "admin_write_media" on storage.objects
  for all to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');
