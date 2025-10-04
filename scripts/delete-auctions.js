const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAuctions() {
    try {
        console.log('🗑️ Usuwam wszystkie aukcje z bazy danych...')

        // Najpierw usuń wszystkie powiązane dane
        await prisma.auctionAsset.deleteMany({})
        console.log('✅ Usunięto wszystkie assety aukcji')

        await prisma.bid.deleteMany({})
        console.log('✅ Usunięto wszystkie licytacje')

        // await prisma.watchlist.deleteMany({})
        // console.log('✅ Usunięto wszystkie obserwowane aukcje')

        // Teraz usuń aukcje
        const result = await prisma.auction.deleteMany({})
        console.log(`✅ Usunięto ${result.count} aukcji`)

        console.log('🎉 Wszystkie aukcje zostały usunięte!')

    } catch (error) {
        console.error('❌ Błąd podczas usuwania aukcji:', error)
    } finally {
        await prisma.$disconnect()
    }
}

deleteAuctions()
