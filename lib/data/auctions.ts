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
    saleFormat?: 'auction' | 'auction_with_buy_now' | 'buy_now_only'
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
        saleFormat: 'auction',
        startTime: '2024-01-01T00:00:00Z',
        endTime: '2024-01-15T23:59:59Z',
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg', '/champions/2/gallery/dv-0987-11-396_c.jpg'],
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
        saleFormat: 'buy_now_only',
        startTime: '2024-01-05T00:00:00Z',
        endTime: '2024-01-20T23:59:59Z',
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg'],
        videos: [],
        documents: [],
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z'
    },
    {
        id: 'auction-3',
        title: 'Inbred Son Goed Grijs 998 – linia Sangers',
        description: 'Potomek “Goed Grijs 998” z doskonałym rodowodem. Idealny do rozpłodu.',
        category: 'Champions',
        sellerId: 'seller-3',
        startingPrice: 900,
        currentPrice: 1200,
        // licytacja
        saleFormat: 'auction',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg'],
        videos: [],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'auction-4',
        title: 'Grizzle Girl – wybitna samica',
        description: 'Córka i wnuczka championów. Świetny materiał hodowlany.',
        category: 'Young Birds',
        sellerId: 'seller-4',
        startingPrice: 700,
        currentPrice: 950,
        buyNowPrice: 1400,
        saleFormat: 'buy_now_only',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/2/gallery/dv-0987-11-396_c.jpg'],
        videos: [],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'auction-5',
        title: 'Masterpeace – linia junior x córka Angelino',
        description: 'Zwycięzca w konkursach, wybitny potencjał lotowy i hodowlany.',
        category: 'Champions',
        sellerId: 'seller-5',
        startingPrice: 800,
        currentPrice: 1100,
        buyNowPrice: 1600,
        saleFormat: 'auction_with_buy_now',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg'],
        videos: [],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'auction-6',
        title: 'Cocco – inbred Gold Dust x Katu',
        description: 'Świetnie zapowiadający się gołąb z pewnym pochodzeniem.',
        category: 'Champions',
        sellerId: 'seller-6',
        startingPrice: 600,
        currentPrice: 850,
        // licytacja + kup teraz
        buyNowPrice: 1300,
        saleFormat: 'auction_with_buy_now',
        startingPrice: 700,
        currentPrice: 850,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        isApproved: true,
        images: ['/champions/2/gallery/dv-0987-11-396_c.jpg'],
        videos: [],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
