-- SUPABASE SQL EDITOR
-- Paste this into Supabase SQL Editor to create the contacts table

-- Enable UUID generation extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- Create contacts table
create table
  public.contacts (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    email text not null,
    message text not null,
    constraint contacts_pkey primary key (id)
  ) tablespace pg_default;

-- Create index on created_at for better query performance
create index contacts_created_at_idx on public.contacts using btree (created_at desc);

-- Create index on email for filtering
create index contacts_email_idx on public.contacts using btree (email);

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;

-- Create policy: Allow anonymous users to insert
create policy "Allow anonymous insert" on public.contacts
  for insert
  with check (true);

-- Create policy: Allow authenticated users to view all
create policy "Allow authenticated select" on public.contacts
  for select
  using (auth.role() = 'authenticated');

-- Grant permissions
grant select, insert on public.contacts to anon;
grant select, insert, update, delete on public.contacts to authenticated;
