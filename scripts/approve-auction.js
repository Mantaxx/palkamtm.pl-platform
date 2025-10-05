const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const auctionId = 'cmgcwpzgv0001b3psm54zzm5m'

    try {
        // Sprawdź czy aukcja istnieje
        const auction = await prisma.auction.findUnique({
            where: { id: auctionId },
            select: { id: true, title: true, status: true, isApproved: true }
        })

        if (!auction) {
            console.log('❌ Aukcja nie została znaleziona')
            return
        }

        console.log('📋 Obecny stan aukcji:')
        console.log('- ID:', auction.id)
        console.log('- Tytuł:', auction.title)
        console.log('- Status:', auction.status)
        console.log('- Zatwierdzona:', auction.isApproved)

        // Zatwierdź aukcję
        const updatedAuction = await prisma.auction.update({
            where: { id: auctionId },
            data: {
                status: 'ACTIVE',
                isApproved: true
            },
            select: {
                id: true,
                title: true,
                status: true,
                isApproved: true,
                updatedAt: true
            }
        })

        console.log('\n✅ Aukcja została zatwierdzona!')
        console.log('- ID:', updatedAuction.id)
        console.log('- Tytuł:', updatedAuction.title)
        console.log('- Status:', updatedAuction.status)
        console.log('- Zatwierdzona:', updatedAuction.isApproved)
        console.log('- Zaktualizowana:', updatedAuction.updatedAt)

    } catch (error) {
        console.error('❌ Błąd podczas zatwierdzania aukcji:', error)
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
