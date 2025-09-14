import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Sprawdź czy użytkownik próbuje uzyskać dostęp do panelu administratora
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/buyer/dashboard', req.url))
    }

    // Sprawdź czy użytkownik próbuje uzyskać dostęp do panelu sprzedawcy
    if (pathname.startsWith('/seller') && token?.role !== 'SELLER' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/buyer/dashboard', req.url))
    }

    // Sprawdź czy użytkownik próbuje uzyskać dostęp do panelu kupującego
    if (pathname.startsWith('/buyer') && token?.role !== 'BUYER' && token?.role !== 'SELLER' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Zezwól na dostęp do tras publicznych
        if (
          pathname.startsWith('/auth') ||
          pathname === '/' ||
          pathname.startsWith('/auctions') ||
          pathname.startsWith('/champions') ||
          pathname.startsWith('/heritage') ||
          pathname.startsWith('/references') ||
          pathname.startsWith('/about') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/terms') ||
          pathname.startsWith('/privacy') ||
          pathname.startsWith('/sales-terms') ||
          pathname.startsWith('/rodo-clause') ||
          pathname.startsWith('/search') ||
          pathname.startsWith('/api') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/public')
        ) {
          return true
        }

        // Wymagaj autoryzacji dla wszystkich innych tras
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/seller/:path*', 
    '/buyer/:path*',
    '/dashboard/:path*'
  ]
}
