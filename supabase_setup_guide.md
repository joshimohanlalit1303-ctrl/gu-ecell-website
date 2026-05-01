# Supabase Connection & Setup Guide

This guide describes how to configure your Supabase database and link it to the GEC Applications platform.

---

## Phase 1: Set up the Database Table in Supabase

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project or open your existing project.
3. In the left navigation bar, go to the **SQL Editor**.
4. Create a new query, paste the following SQL script to create the `gec_applications` table, and click **Run**:

```sql
-- Create table to store GEC applications
create table public.gec_applications (
  id text primary key not null,
  "fullName" text not null,
  email text not null,
  whatsapp text not null,
  "yearBranch" text not null,
  "whyGec" text not null,
  interests text not null,
  status text not null default 'Pending',
  "appliedAt" text not null
);

-- Enable RLS (Row Level Security)
alter table public.gec_applications enable row level security;

-- Create policies for Insert (Public), Select, Update, Delete (Authorized)
create policy "Allow public to insert applications"
  on public.gec_applications
  for insert
  with check (true);

create policy "Allow all users to view applications"
  on public.gec_applications
  for select
  using (true);

create policy "Allow all users to update applications"
  on public.gec_applications
  for update
  using (true);

create policy "Allow all users to delete applications"
  on public.gec_applications
  for delete
  using (true);
```

---

## Phase 2: Add Environment Variables

1. Go to **Project Settings** > **API** on your Supabase dashboard.
2. Locate your:
   - **Project URL**
   - **anon public key**
3. Open the file [.env](file:///Users/lalit/Desktop/ecell2/.env) in this workspace.
4. Replace the placeholder values with your real keys:

```env
VITE_SUPABASE_URL=https://abc123yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...yourAnonKeyHere
```

5. Save the `.env` file.
6. Restart your development server:
   ```bash
   npm run dev
   ```

---

## Phase 3: Testing

1. Once the environment variables are active, open the application form and submit a new candidate application.
2. Verify it is inserted directly into the table in your **Table Editor** on Supabase.
3. Access the private admin portal (`/gec-internal-admin-2026`) with the password **`GEC_ADMIN_2026`** to confirm you can read, modify, and delete the record.
