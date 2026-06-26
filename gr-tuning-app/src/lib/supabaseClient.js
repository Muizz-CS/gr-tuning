import { createClient } from '@supabase/supabase-js';

console.log("Vite URL Check:", import.meta.meta?.env?.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment configuration tokens.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);