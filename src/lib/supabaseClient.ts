import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for the contacts table
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface InsertContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  data?: Contact;
  error?: string;
}
