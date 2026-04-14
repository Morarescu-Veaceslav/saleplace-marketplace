import { NextRequest, NextResponse } from "next/server"

const guestOnlyRoutes = ['/auth']      // doar pentru neautentificați
const privateRoutes = ['/dashboard', '/deactivate'] // doar pentru autentificați

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const pathname = nextUrl.pathname
  const session = cookies.get('session')?.value
 
  if (!session && privateRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (session && guestOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard/settings', request.url))
  }

  return NextResponse.next()
}

// Configurare rute pentru matcher
export const config = {
  matcher: [
    '/auth',
    '/dashboard/:path*',
    '/deactivate'
  ],
}
