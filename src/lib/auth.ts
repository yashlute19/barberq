import { createSupabaseServerClient } from './supabase-server'

export async function getSession() {
  const supabase = await createSupabaseServerClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null
  return session
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}
