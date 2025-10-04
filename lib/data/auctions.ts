export interface AuctionData {
    id: string
    title: string
    description: string
    category: string
    startingPrice: number
    currentPrice: number
    buyNowPrice?: number
    endTime: string
    status: 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'PENDING'
    sellerId: string
    images: string[]
    createdAt: string
    updatedAt: string
}

export const AUCTIONS_DATA: AuctionData[] = []
