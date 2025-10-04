const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAllUsers() {
    try {
        console.log('🔍 Sprawdzam wszystkich użytkowników w bazie...')
        
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                emailVerified: true
            }
        })
        
        if (users.length === 0) {
            console.log('❌ Brak użytkowników w bazie')
        } else {
            console.log(`✅ Znaleziono ${users.length} użytkowników:`)
            users.forEach((user, index) => {
                console.log(`\n${index + 1}. ${user.firstName} ${user.lastName}`)
                console.log(`   📧 Email: ${user.email}`)
                console.log(`   🏢 Rola: ${user.role}`)
                console.log(`   ✅ Aktywny: ${user.isActive ? 'Tak' : 'Nie'}`)
                console.log(`   📧 Email zweryfikowany: ${user.emailVerified ? 'Tak' : 'Nie'}`)
            })
        }
        
        // Sprawdź konkretnie admin@palkamtm.pl
        console.log('\n🔍 Sprawdzam konkretnie admin@palkamtm.pl...')
        const palkaAdmin = await prisma.user.findUnique({
            where: { email: 'admin@palkamtm.pl' }
        })
        
        if (palkaAdmin) {
            console.log('✅ Znaleziono admin@palkamtm.pl!')
            console.log(`   👤 Imię: ${palkaAdmin.firstName} ${palkaAdmin.lastName}`)
            console.log(`   🏢 Rola: ${palkaAdmin.role}`)
            console.log(`   ✅ Aktywny: ${palkaAdmin.isActive ? 'Tak' : 'Nie'}`)
        } else {
            console.log('❌ NIE znaleziono admin@palkamtm.pl')
        }
        
    } catch (error) {
        console.error('❌ Błąd:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAllUsers()
