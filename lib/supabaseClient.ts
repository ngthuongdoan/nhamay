import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables.
// For local development, create a `.env.local` file in the project root and define
// NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY with your project's credentials.
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
