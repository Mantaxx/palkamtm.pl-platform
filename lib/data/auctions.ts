// Centralized auction data management
export interface AuctionData {
    id: string
    title: string
    description: string
    category: string
    pigeonId?: string
    sellerId: string
    startingPrice: number
    currentPrice: number
    buyNowPrice?: number
    reservePrice?: number
    startTime: string
    endTime: string
    status: 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'PENDING'
    isApproved: boolean
    images: string[]
    videos: string[]
    documents: string[]
    createdAt: string
    updatedAt: string
}

// Static auction data - in production this would come from database
export const AUCTIONS_DATA: AuctionData[] = [
    {
        id: 'auction-1',
        title: 'Champion Thunder Storm - Elitarny Rodowód',
        description: 'Wybitny champion z doskonałymi wynikami w konkursach krajowych i międzynarodowych. Idealny do hodowli.',
        category: 'Champions',
        pigeonId: 'thunder-storm',
        sellerId: 'seller-1',
        startingPrice: 5000,
        currentPrice: 7500,
        buyNowPrice: 10000,
        reservePrice: 6000,
        startTime: '2024-01-01T00:00:00Z',
        endTime: '2024-01-15T23:59:59Z',
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/thunder-storm/gallery/1.jpg', '/champions/thunder-storm/gallery/2.jpg'],
        videos: ['/champions/thunder-storm/videos/1.mp4'],
        documents: ['/champions/thunder-storm/pedigree.pdf'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'auction-2',
        title: 'Młode Gołębie - Linia Janssen',
        description: 'Młode gołębie z linii Janssen, gotowe do hodowli. Doskonałe geny.',
        category: 'Young Birds',
        sellerId: 'seller-2',
        startingPrice: 1500,
        currentPrice: 2200,
        buyNowPrice: 3000,
        startTime: '2024-01-05T00:00:00Z',
        endTime: '2024-01-20T23:59:59Z',
        status: 'ACTIVE',
        isApproved: true,
        images: ['/auctions/young-birds/1.jpg'],
        videos: [],
        documents: [],
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z'
    }
]

// Helper functions
export function getAuctionById(id: string): AuctionData | undefined {
    return AUCTIONS_DATA.find(auction => auction.id === id)
}

export function getAuctionsByCategory(category: string): AuctionData[] {
    return AUCTIONS_DATA.filter(auction => auction.category === category)
}

export function getActiveAuctions(): AuctionData[] {
    return AUCTIONS_DATA.filter(auction => auction.status === 'ACTIVE')
}

export function getApprovedAuctions(): AuctionData[] {
    return AUCTIONS_DATA.filter(auction => auction.isApproved)
}

export function searchAuctions(query: string): AuctionData[] {
    const lowercaseQuery = query.toLowerCase()
    return AUCTIONS_DATA.filter(auction =>
        auction.title.toLowerCase().includes(lowercaseQuery) ||
        auction.description.toLowerCase().includes(lowercaseQuery) ||
        auction.category.toLowerCase().includes(lowercaseQuery)
    )
}

export function getAuctionsBySeller(sellerId: string): AuctionData[] {
    return AUCTIONS_DATA.filter(auction => auction.sellerId === sellerId)
}

export function getAllCategories(): string[] {
    const categories = new Set<string>()
    AUCTIONS_DATA.forEach(auction => {
        categories.add(auction.category)
    })
    return Array.from(categories).sort()
}

export function sortAuctions(auctions: AuctionData[], sortBy: string): AuctionData[] {
    const sorted = [...auctions]

    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        case 'oldest':
            return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        case 'price-low':
            return sorted.sort((a, b) => a.currentPrice - b.currentPrice)
        case 'price-high':
            return sorted.sort((a, b) => b.currentPrice - a.currentPrice)
        case 'ending-soon':
            return sorted.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
        default:
            return sorted
    }
}
