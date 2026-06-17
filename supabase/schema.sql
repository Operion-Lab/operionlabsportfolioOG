create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  project_type text,
  budget_range text,
  timeline text,
  requirements text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  product text,
  preferred_date text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
alter table public.quote_requests enable row level security;
alter table public.demo_requests enable row level security;

drop policy if exists "Allow public contact inserts" on public.contact_messages;
drop policy if exists "Allow public quote inserts" on public.quote_requests;
drop policy if exists "Allow public demo inserts" on public.demo_requests;

create policy "Allow public contact inserts"
on public.contact_messages
for insert
to anon
with check (
  char_length(name) >= 2
  and char_length(email) >= 5
  and char_length(message) >= 5
);

create policy "Allow public quote inserts"
on public.quote_requests
for insert
to anon
with check (
  char_length(name) >= 2
  and char_length(email) >= 5
  and char_length(requirements) >= 5
);

create policy "Allow public demo inserts"
on public.demo_requests
for insert
to anon
with check (
  char_length(name) >= 2
  and char_length(email) >= 5
);

grant usage on schema public to anon, authenticated, service_role;
grant select, insert on public.contact_messages to anon, authenticated, service_role;
grant select, insert on public.quote_requests to anon, authenticated, service_role;
grant select, insert on public.demo_requests to anon, authenticated, service_role;

notify pgrst, 'reload schema';
