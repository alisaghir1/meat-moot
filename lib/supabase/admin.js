import { createClient } from '@supabase/supabase-js'

/**
 * Admin / service-role Supabase client.
 * SERVER ONLY. Never import from a client component or route that runs in the
 * browser. Used for write operations from trusted server actions / API routes
 * (e.g. file upload with UUID rename, mass-assignment-safe inserts).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase admin client misconfigured (missing env).')
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
