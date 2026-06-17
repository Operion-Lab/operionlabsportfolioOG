import { createClient } from "@supabase/supabase-js";

export function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && (getSupabaseAnonKey() || process.env.SUPABASE_SERVICE_ROLE_KEY));
}

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabaseLeadClients() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = getSupabaseAnonKey();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || (!anonKey && !serviceRoleKey)) {
    throw new Error("Missing Supabase lead capture environment variables");
  }

  const clients = [];

  if (anonKey) {
    clients.push(
      createClient(supabaseUrl, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }),
    );
  }

  if (!anonKey && serviceRoleKey) {
      clients.push(
        createClient(supabaseUrl, serviceRoleKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
      }),
    );
  }

  return clients;
}

function getSupabaseAnonKey() {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}
