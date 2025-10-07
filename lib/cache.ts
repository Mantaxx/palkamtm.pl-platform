import { NextRequest, NextResponse } from 'next/server'

// Prosty in-memory cache (w produkcji użyj Redis)
interface CacheEntry<T> {
    data: T
    expires: number
    createdAt: number
}

class MemoryCache {
    private cache = new Map<string, CacheEntry<any>>()
    private maxSize = 1000 // Maksymalna liczba wpisów

    set<T>(key: string, data: T, ttlSeconds: number = 300): void {
        // Wyczyść cache jeśli jest za duży
        if (this.cache.size >= this.maxSize) {
            this.cleanup()
        }

        const expires = Date.now() + (ttlSeconds * 1000)
        this.cache.set(key, {
            data,
            expires,
            createdAt: Date.now()
        })
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        if (Date.now() > entry.expires) {
            this.cache.delete(key)
            return null
        }

        return entry.data
    }

    delete(key: string): void {
        this.cache.delete(key)
    }

    clear(): void {
        this.cache.clear()
    }

    private cleanup(): void {
        const now = Date.now()
        const entriesToDelete: string[] = []

        for (const [key, entry] of Array.from(this.cache.entries())) {
            if (now > entry.expires) {
                entriesToDelete.push(key)
            }
        }

        entriesToDelete.forEach(key => this.cache.delete(key))

        // Jeśli nadal za dużo, usuń najstarsze
        if (this.cache.size >= this.maxSize) {
            const sortedEntries = Array.from(this.cache.entries())
                .sort((a, b) => a[1].createdAt - b[1].createdAt)

            const toDelete = sortedEntries.slice(0, Math.floor(this.maxSize * 0.2))
            toDelete.forEach(([key]) => this.cache.delete(key))
        }
    }

    // Statystyki cache
    getStats() {
        const now = Date.now()
        let expired = 0
        let active = 0

        for (const entry of Array.from(this.cache.values())) {
            if (now > entry.expires) {
                expired++
            } else {
                active++
            }
        }

        return {
            total: this.cache.size,
            active,
            expired,
            maxSize: this.maxSize
        }
    }
}

// Globalna instancja cache
const cache = new MemoryCache()

/**
 * Generuje klucz cache na podstawie requestu
 */
export function generateCacheKey(request: NextRequest, prefix: string = ''): string {
    const url = new URL(request.url)
    const searchParams = url.searchParams.toString()
    const pathname = url.pathname

    return `${prefix}:${pathname}:${searchParams}`
}

/**
 * Cache dla GET requestów
 */
export function withCache<T>(
    handler: (request: NextRequest) => Promise<NextResponse>,
    options: {
        ttl?: number // Time to live w sekundach
        keyPrefix?: string
        skipCache?: (request: NextRequest) => boolean
    } = {}
) {
    const { ttl = 300, keyPrefix = 'api', skipCache } = options

    return async (request: NextRequest): Promise<NextResponse> => {
        // Tylko dla GET requestów
        if (request.method !== 'GET') {
            return handler(request)
        }

        // Sprawdź czy cache ma być pominięty
        if (skipCache && skipCache(request)) {
            return handler(request)
        }

        const cacheKey = generateCacheKey(request, keyPrefix)

        // Sprawdź cache
        const cachedResponse = cache.get<NextResponse>(cacheKey)
        if (cachedResponse) {
            // Dodaj nagłówki cache
            const response = NextResponse.json(await cachedResponse.json(), {
                status: cachedResponse.status,
                headers: {
                    ...cachedResponse.headers,
                    'X-Cache': 'HIT',
                    'X-Cache-Timestamp': new Date().toISOString()
                }
            })
            return response
        }

        // Wykonaj handler
        const response = await handler(request)

        // Cache tylko successful responses
        if (response.status >= 200 && response.status < 300) {
            // Klonuj response aby móc go cache'ować
            const responseClone = response.clone()
            const responseData = await responseClone.json()

            const cacheableResponse = NextResponse.json(responseData, {
                status: response.status,
                headers: response.headers
            })

            cache.set(cacheKey, cacheableResponse, ttl)
        }

        // Dodaj nagłówki cache miss
        const finalResponse = NextResponse.json(await response.json(), {
            status: response.status,
            headers: {
                ...response.headers,
                'X-Cache': 'MISS',
                'X-Cache-Timestamp': new Date().toISOString()
            }
        })

        return finalResponse
    }
}

/**
 * Cache dla danych z bazy danych
 */
export class DatabaseCache {
    private static instance: DatabaseCache
    private cache = new MemoryCache()

    static getInstance(): DatabaseCache {
        if (!DatabaseCache.instance) {
            DatabaseCache.instance = new DatabaseCache()
        }
        return DatabaseCache.instance
    }

    /**
     * Cache dla listy aukcji
     */
    async getAuctions(key: string, fetcher: () => Promise<any>, ttl: number = 60) {
        const cached = this.cache.get(key)
        if (cached) {
            return cached
        }

        const data = await fetcher()
        this.cache.set(key, data, ttl)
        return data
    }

    /**
     * Cache dla pojedynczej aukcji
     */
    async getAuction(id: string, fetcher: () => Promise<any>, ttl: number = 300) {
        const key = `auction:${id}`
        const cached = this.cache.get(key)
        if (cached) {
            return cached
        }

        const data = await fetcher()
        this.cache.set(key, data, ttl)
        return data
    }

    /**
     * Cache dla danych użytkownika
     */
    async getUser(id: string, fetcher: () => Promise<any>, ttl: number = 600) {
        const key = `user:${id}`
        const cached = this.cache.get(key)
        if (cached) {
            return cached
        }

        const data = await fetcher()
        this.cache.set(key, data, ttl)
        return data
    }

    /**
     * Inwaliduj cache dla aukcji
     */
    invalidateAuction(id: string): void {
        this.cache.delete(`auction:${id}`)
        // Inwaliduj też listy aukcji
        this.invalidatePattern('auctions:*')
    }

    /**
     * Inwaliduj cache dla użytkownika
     */
    invalidateUser(id: string): void {
        this.cache.delete(`user:${id}`)
    }

    /**
     * Inwaliduj cache według wzorca
     */
    invalidatePattern(pattern: string): void {
        // W prawdziwej implementacji z Redis użyjbyś SCAN
        // Tutaj po prostu wyczyść cały cache
        this.cache.clear()
    }

    /**
     * Wyczyść cały cache
     */
    clear(): void {
        this.cache.clear()
    }

    /**
     * Statystyki cache
     */
    getStats() {
        return this.cache.getStats()
    }
}

// Export singleton instance
export const dbCache = DatabaseCache.getInstance()

/**
 * Middleware do cache'owania API responses
 */
export function createCacheMiddleware(options: {
    ttl?: number
    keyPrefix?: string
    skipCache?: (request: NextRequest) => boolean
}) {
    return (handler: (request: NextRequest) => Promise<NextResponse>) => {
        return withCache(handler, options)
    }
}

/**
 * Helper do tworzenia kluczy cache
 */
export const cacheKeys = {
    auctions: (params: Record<string, any>) => {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `auctions:${sortedParams}`
    },

    auction: (id: string) => `auction:${id}`,

    user: (id: string) => `user:${id}`,

    userAuctions: (userId: string, params: Record<string, any> = {}) => {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `user:${userId}:auctions:${sortedParams}`
    },

    userBids: (userId: string) => `user:${userId}:bids`,

    stats: (type: string) => `stats:${type}`,
}