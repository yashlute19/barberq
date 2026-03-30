import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response = NextResponse.next({ request: { headers: request.headers } })
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  if (
  pathname.startsWith('/admin') &&
  !pathname.startsWith('/admin/login') &&
  !pathname.startsWith('/admin/forgot-password') &&
  !pathname.startsWith('/admin/reset-password') &&
  !session
) {
  return NextResponse.redirect(new URL('/admin/login', request.url))
}

  // NOTE: Automatic redirect from login to dashboard removed as per user request
  
  return response
}

export const config = { matcher: ['/admin/:path*'] }
