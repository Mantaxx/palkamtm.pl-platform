// Simple in-memory cache implementation
// In production, use Redis or similar

interface CacheEntry<T> {
    data: T
    timestamp: number
    ttl: number
}

class MemoryCache {
    private cache = new Map<string, CacheEntry<unknown>>()
    private maxSize = 1000 // Maximum number of entries

    set<T>(key: string, data: T, ttl: number = 300000): void { // 5 minutes default
        // Remove oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value
            if (oldestKey) {
                this.cache.delete(oldestKey)
            }
        }

        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        })
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Check if entry has expired
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key)
            return null
        }

        return entry.data as T
    }

    delete(key: string): boolean {
        return this.cache.delete(key)
    }

    clear(): void {
        this.cache.clear()
    }

    // Clean up expired entries
    cleanup(): void {
        const now = Date.now()
        for (const [key, entry] of Array.from(this.cache.entries())) {
            if (now - entry.timestamp > entry.ttl) {
                this.cache.delete(key)
            }
        }
    }
}

// Global cache instance
const cache = new MemoryCache()

// Cleanup expired entries every 5 minutes
setInterval(() => {
    cache.cleanup()
}, 5 * 60 * 1000)

export { cache }

// Cache key generators
export const cacheKeys = {
    champions: (id?: string) => id ? `champions:${id}` : 'champions:all',
    auctions: (filters?: string) => `auctions:${filters || 'all'}`,
    references: () => 'references:approved',
    breederMeetings: () => 'breeder-meetings:approved',
    user: (id: string) => `user:${id}`,
    auction: (id: string) => `auction:${id}`,
}

// Cache decorator for API routes
export function withCache<T>(
    key: string,
    ttl: number = 300000,
    fetcher: () => Promise<T>
): Promise<T> {
    // Try to get from cache first
    const cached = cache.get<T>(key)
    if (cached) {
        return Promise.resolve(cached)
    }

    // Fetch fresh data
    return fetcher().then(data => {
        cache.set(key, data, ttl)
        return data
    })
}

// Cache invalidation helpers
export function invalidateCache(pattern: string): void {
    for (const key of Array.from(cache['cache'].keys())) {
        if (key.includes(pattern)) {
            cache.delete(key)
        }
    }
}

export function invalidateUserCache(userId: string): void {
    invalidateCache(`user:${userId}`)
}

export function invalidateAuctionCache(auctionId: string): void {
    invalidateCache(`auction:${auctionId}`)
    invalidateCache('auctions:') // Invalidate all auction lists
}
