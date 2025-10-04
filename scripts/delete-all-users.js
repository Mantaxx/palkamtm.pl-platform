const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAllUsers() {
    try {
        console.log('🗑️ USUWANIE WSZYSTKICH UŻYTKOWNIKÓW')
        console.log('=' .repeat(50))
        
        // Sprawdź ile użytkowników jest w bazie
        const userCount = await prisma.user.count()
        console.log(`📊 Znaleziono ${userCount} użytkowników w bazie danych`)
        
        if (userCount === 0) {
            console.log('✅ Brak użytkowników do usunięcia')
            return
        }
        
        // Pokaż listę użytkowników przed usunięciem
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                createdAt: true
            }
        })
        
        console.log('\n📋 Użytkownicy do usunięcia:')
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email} (${user.role}) - ${user.isActive ? 'Aktywny' : 'Nieaktywny'} - ${new Date(user.createdAt).toLocaleDateString()}`)
        })
        
        // Usuń wszystkich użytkowników
        console.log('\n🗑️ Usuwanie użytkowników...')
        
        // Usuń powiązane dane (w kolejności zależności)
        await prisma.auctionAsset.deleteMany()
        console.log('✅ Usunięto zasoby aukcji')
        
        await prisma.bid.deleteMany()
        console.log('✅ Usunięto oferty')
        
        await prisma.watchlistItem.deleteMany()
        console.log('✅ Usunięto obserwowane aukcje')
        
        await prisma.transaction.deleteMany()
        console.log('✅ Usunięto transakcje')
        
        await prisma.auction.deleteMany()
        console.log('✅ Usunięto aukcje')
        
        await prisma.message.deleteMany()
        console.log('✅ Usunięto wiadomości')
        
        await prisma.breederMeeting.deleteMany()
        console.log('✅ Usunięto spotkania hodowców')
        
        await prisma.conversation.deleteMany()
        console.log('✅ Usunięto konwersacje')
        
        await prisma.userMessage.deleteMany()
        console.log('✅ Usunięto wiadomości użytkowników')
        
        await prisma.session.deleteMany()
        console.log('✅ Usunięto sesje')
        
        await prisma.account.deleteMany()
        console.log('✅ Usunięto konta')
        
        // Na końcu usuń użytkowników
        const deletedUsers = await prisma.user.deleteMany()
        console.log(`✅ Usunięto ${deletedUsers.count} użytkowników`)
        
        // Sprawdź czy wszystkie zostały usunięte
        const remainingUsers = await prisma.user.count()
        console.log(`\n📊 Pozostało użytkowników: ${remainingUsers}`)
        
        if (remainingUsers === 0) {
            console.log('\n🎉 WSZYSCY UŻYTKOWNICY ZOSTALI USUNIĘCI!')
            console.log('✅ Baza danych jest teraz czysta')
            console.log('✅ Możesz teraz utworzyć nowych użytkowników z nowymi rolami')
        } else {
            console.log('\n⚠️ Niektórzy użytkownicy mogli nie zostać usunięci')
        }
        
    } catch (error) {
        console.error('❌ Błąd podczas usuwania użytkowników:', error)
        throw error
    }
}

deleteAllUsers().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
