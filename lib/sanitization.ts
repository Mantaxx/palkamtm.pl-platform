import DOMPurify from 'isomorphic-dompurify'
import { NextRequest } from 'next/server'

/**
 * Sanityzuje tekst, usuwając potencjalnie niebezpieczne znaki
 */
export function sanitizeText(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    // Usuń HTML tags i potencjalnie niebezpieczne znaki
    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
    }).trim()
}

/**
 * Sanityzuje HTML, zachowując bezpieczne tagi
 */
export function sanitizeHTML(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ALLOWED_ATTR: []
    })
}

/**
 * Sanityzuje URL, sprawdzając czy jest bezpieczny
 */
export function sanitizeURL(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    try {
        const url = new URL(input)

        // Sprawdź czy protokół jest bezpieczny
        if (!['http:', 'https:'].includes(url.protocol)) {
            return ''
        }

        return url.toString()
    } catch {
        return ''
    }
}

/**
 * Sanityzuje email
 */
export function sanitizeEmail(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    const email = input.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        return ''
    }

    return email
}

/**
 * Sanityzuje numer telefonu
 */
export function sanitizePhoneNumber(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    // Usuń wszystkie znaki oprócz cyfr, +, -, (, ), spacji
    const cleaned = input.replace(/[^\d+\-() ]/g, '')

    // Sprawdź czy ma odpowiedni format
    const phoneRegex = /^[\+]?[1-9][\d]{1,14}$/
    const digitsOnly = cleaned.replace(/[\s\-()]/g, '')

    if (!phoneRegex.test(digitsOnly)) {
        return ''
    }

    return cleaned
}

/**
 * Sanityzuje kod pocztowy
 */
export function sanitizePostalCode(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    const cleaned = input.trim()
    const postalCodeRegex = /^\d{2}-\d{3}$/

    if (!postalCodeRegex.test(cleaned)) {
        return ''
    }

    return cleaned
}

/**
 * Sanityzuje cenę (liczba)
 */
export function sanitizePrice(input: number | string): number {
    if (typeof input === 'number') {
        return Math.max(0, Math.round(input * 100) / 100) // Zaokrąglij do 2 miejsc po przecinku
    }

    if (typeof input === 'string') {
        const parsed = parseFloat(input)
        if (isNaN(parsed)) {
            return 0
        }
        return Math.max(0, Math.round(parsed * 100) / 100)
    }

    return 0
}

/**
 * Sanityzuje ID (cuid)
 */
export function sanitizeID(input: string): string {
    if (typeof input !== 'string') {
        return ''
    }

    const cleaned = input.trim()
    const cuidRegex = /^c[a-z0-9]{24}$/

    if (!cuidRegex.test(cleaned)) {
        return ''
    }

    return cleaned
}

/**
 * Sanityzuje obiekt z danymi formularza
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            // Różne typy sanityzacji w zależności od klucza
            if (key.includes('email')) {
                sanitized[key] = sanitizeEmail(value)
            } else if (key.includes('phone')) {
                sanitized[key] = sanitizePhoneNumber(value)
            } else if (key.includes('url') || key.includes('image') || key.includes('video')) {
                sanitized[key] = sanitizeURL(value)
            } else if (key.includes('price') || key.includes('amount')) {
                sanitized[key] = sanitizePrice(value)
            } else if (key.includes('id')) {
                sanitized[key] = sanitizeID(value)
            } else if (key.includes('postal') || key.includes('zip')) {
                sanitized[key] = sanitizePostalCode(value)
            } else if (key.includes('description') || key.includes('content')) {
                sanitized[key] = sanitizeHTML(value)
            } else {
                sanitized[key] = sanitizeText(value)
            }
        } else if (typeof value === 'number') {
            if (key.includes('price') || key.includes('amount')) {
                sanitized[key] = sanitizePrice(value)
            } else {
                sanitized[key] = value
            }
        } else if (Array.isArray(value)) {
            sanitized[key] = value.map(item =>
                typeof item === 'string' ? sanitizeText(item) : item
            )
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeFormData(value)
        } else {
            sanitized[key] = value
        }
    }

    return sanitized
}

/**
 * Middleware do sanityzacji danych wejściowych
 */
export function withSanitization(handler: Function) {
    return async (request: NextRequest, ...args: unknown[]) => {
        try {
            // Jeśli to POST, PUT, PATCH request, sanityzuj body
            if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
                const body = await request.json()
                const sanitizedBody = sanitizeFormData(body)

                // Stwórz nowy request z sanityzowanymi danymi
                const sanitizedRequest = new NextRequest(request.url, {
                    method: request.method,
                    headers: request.headers,
                    body: JSON.stringify(sanitizedBody)
                })

                return handler(sanitizedRequest, ...args)
            }

            return handler(request, ...args)
        } catch (error) {
            console.error('Sanitization middleware error:', error)
            return new Response(
                JSON.stringify({ error: 'Błąd sanityzacji danych' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }
    }
}
