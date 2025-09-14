import AuctionDetails from '@/components/auctions/AuctionDetails'
import { Metadata } from 'next'

interface AuctionPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: AuctionPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Aukcja #${id} - Gołębie Pocztowe`,
    description: 'Szczegóły aukcji gołębia pocztowego'
  }
}

export default async function AuctionPage({ params }: AuctionPageProps) {
  const { id } = await params
  return <AuctionDetails auctionId={id} />
}
