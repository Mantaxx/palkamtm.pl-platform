import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
interface User {
    id: string
    email: string
    firstName?: string
    lastName?: string
    role: 'BUYER' | 'SELLER' | 'ADMIN'
    isActive: boolean
}

interface Auction {
    id: string
    title: string
    description: string
    category: string
    startingPrice: number
    currentPrice: number
    buyNowPrice?: number
    reservePrice?: number
    startTime: string
    endTime: string
    status: 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'PENDING'
    isApproved: boolean
    images: string[]
    seller: {
        id: string
        firstName?: string
        lastName?: string
    }
    createdAt: string
}

interface Champion {
    id: string
    name: string
    ringNumber: string
    bloodline: string
    images: string[]
    pedigree: string
}

interface AppState {
    // User state
    user: User | null
    isAuthenticated: boolean

    // Data state
    auctions: Auction[]
    champions: Champion[]
    references: any[]
    breederMeetings: any[]

    // UI state
    isLoading: boolean
    error: string | null

    // Filters and search
    searchTerm: string
    selectedCategory: string
    sortBy: string

    // Actions
    setUser: (user: User | null) => void
    setAuthenticated: (isAuthenticated: boolean) => void
    setAuctions: (auctions: Auction[]) => void
    setChampions: (champions: Champion[]) => void
    setReferences: (references: any[]) => void
    setBreederMeetings: (meetings: any[]) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    setSearchTerm: (term: string) => void
    setSelectedCategory: (category: string) => void
    setSortBy: (sortBy: string) => void

    // Computed values
    filteredAuctions: Auction[]
    filteredChampions: Champion[]
}

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                user: null,
                isAuthenticated: false,
                auctions: [],
                champions: [],
                references: [],
                breederMeetings: [],
                isLoading: false,
                error: null,
                searchTerm: '',
                selectedCategory: '',
                sortBy: 'newest',

                // Actions
                setUser: (user) => set({ user }),
                setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
                setAuctions: (auctions) => set({ auctions }),
                setChampions: (champions) => set({ champions }),
                setReferences: (references) => set({ references }),
                setBreederMeetings: (breederMeetings) => set({ breederMeetings }),
                setLoading: (isLoading) => set({ isLoading }),
                setError: (error) => set({ error }),
                setSearchTerm: (searchTerm) => set({ searchTerm }),
                setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
                setSortBy: (sortBy) => set({ sortBy }),

                // Computed values
                get filteredAuctions() {
                    const { auctions, searchTerm, selectedCategory, sortBy } = get()

                    let filtered = auctions.filter(auction => {
                        const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            auction.description.toLowerCase().includes(searchTerm.toLowerCase())
                        const matchesCategory = !selectedCategory || auction.category === selectedCategory
                        return matchesSearch && matchesCategory
                    })

                    // Sort
                    switch (sortBy) {
                        case 'newest':
                            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            break
                        case 'oldest':
                            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                            break
                        case 'price-low':
                            filtered.sort((a, b) => a.currentPrice - b.currentPrice)
                            break
                        case 'price-high':
                            filtered.sort((a, b) => b.currentPrice - a.currentPrice)
                            break
                        case 'ending-soon':
                            filtered.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
                            break
                    }

                    return filtered
                },

                get filteredChampions() {
                    const { champions, searchTerm } = get()

                    return champions.filter(champion =>
                        champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        champion.ringNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        champion.bloodline.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                }
            }),
            {
                name: 'app-store',
                partialize: (state) => ({
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    searchTerm: state.searchTerm,
                    selectedCategory: state.selectedCategory,
                    sortBy: state.sortBy,
                }),
            }
        ),
        {
            name: 'app-store',
        }
    )
)

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useAuctions = () => useAppStore((state) => state.auctions)
export const useChampions = () => useAppStore((state) => state.champions)
export const useFilteredAuctions = () => useAppStore((state) => state.filteredAuctions)
export const useFilteredChampions = () => useAppStore((state) => state.filteredChampions)
export const useLoading = () => useAppStore((state) => state.isLoading)
export const useError = () => useAppStore((state) => state.error)
