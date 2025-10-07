import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// Trasy wymagające autoryzacji
const protectedRoutes = [
    '/dashboard',
    '/admin',
    '/seller',
    '/auctions/create',
    '/profile'
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
        // Sprawdź token NextAuth
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        })

        if (!token) {
            // Przekieruj do logowania
            const loginUrl = new URL('/auth/signin', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }

        // Sprawdź czy token nie wygasł
        if (token.exp && typeof token.exp === 'number' && token.exp < Math.floor(Date.now() / 1000)) {
            const loginUrl = new URL('/auth/signin', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            loginUrl.searchParams.set('error', 'SessionExpired')
            return NextResponse.redirect(loginUrl)
        }

        // Sprawdź czy trasa wymaga uprawnień administratora
        const isAdminRoute = adminRoutes.some(route =>
            pathname.startsWith(route)
        )

        if (isAdminRoute && token.role !== 'ADMIN') {
            // Przekieruj do dashboard z błędem
            const dashboardUrl = new URL('/dashboard', request.url)
            dashboardUrl.searchParams.set('error', 'InsufficientPermissions')
            return NextResponse.redirect(dashboardUrl)
        }

        // Dodaj informacje o użytkowniku do nagłówków
        const response = NextResponse.next()
        response.headers.set('x-user-id', token.uid as string)
        response.headers.set('x-user-role', token.role as string)

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
