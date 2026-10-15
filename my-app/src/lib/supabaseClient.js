import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpnrmtfcouvintzladwa.supabase.co';
const supabaseAnonKey = 'sb_publishable_RYCuXRRCAjNMVxYbXSaCLg_s9kx28Sa';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)