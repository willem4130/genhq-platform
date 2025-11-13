import { type NextRequest } from 'next/server'
// import { updateSession } from '@/lib/supabase/middleware'

// Temporarily disabled until Supabase is configured
// We'll enable this when we set up authentication
export async function middleware(_request: NextRequest) {
  // return await updateSession(request)
  return
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
