const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAdmins() {
    try {
        console.log('🔍 Sprawdzam administratorów w bazie...')

        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' }
        })

        if (admins.length === 0) {
            console.log('❌ Brak administratorów w bazie')
        } else {
            console.log(`✅ Znaleziono ${admins.length} administratorów:`)
            admins.forEach((admin, index) => {
                console.log(`\n${index + 1}. ${admin.firstName} ${admin.lastName}`)
                console.log(`   📧 Email: ${admin.email}`)
                console.log(`   🏢 Rola: ${admin.role}`)
                console.log(`   ✅ Aktywny: ${admin.isActive ? 'Tak' : 'Nie'}`)
                console.log(`   📧 Email zweryfikowany: ${admin.emailVerified ? 'Tak' : 'Nie'}`)
            })
        }

    } catch (error) {
        console.error('❌ Błąd:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAdmins()
