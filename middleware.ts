import { NextRequest, NextResponse } from 'next/server'

// Trasy wymagające autoryzacji
const protectedRoutes = [
    '/dashboard',
    '/admin',
    '/seller',
    '/auctions/create',
    '/profile',
    '/settings'
]

// Trasy wymagające uprawnień administratora
const adminRoutes = [
    '/admin'
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Sprawdź czy trasa wymaga autoryzacji
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (!isProtectedRoute) {
        return NextResponse.next()
    }

    try {
        // Sprawdź Firebase Auth token z cookies
        const firebaseToken = request.cookies.get('firebase-auth-token')?.value

        if (!firebaseToken) {
            // Przekieruj do logowania
            const loginUrl = new URL('/auth/signin', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }

        // Sprawdź czy trasa wymaga uprawnień administratora
        const isAdminRoute = adminRoutes.some(route =>
            pathname.startsWith(route)
        )

        if (isAdminRoute) {
            // Dla tras admin, sprawdź rolę w bazie danych przez API
            // Na razie pozwól na dostęp - sprawdzenie roli będzie w komponencie
            console.log('Admin route accessed:', pathname)
        }

        // Dodaj informacje o użytkowniku do nagłówków
        const response = NextResponse.next()
        response.headers.set('x-firebase-token', firebaseToken)

        return response

    } catch (error) {
        console.error('Middleware authentication error:', error)

        // W przypadku błędu, przekieruj do logowania
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        loginUrl.searchParams.set('error', 'AuthenticationError')
        return NextResponse.redirect(loginUrl)
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public|auth).*)',
    ],
}
