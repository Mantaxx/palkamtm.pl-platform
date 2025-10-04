const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createUsers() {
    try {
        console.log('🗑️ USUWANIE WSZYSTKICH UŻYTKOWNIKÓW')
        console.log('='.repeat(50))

        // Sprawdź ile użytkowników jest w bazie
        const userCount = await prisma.user.count()
        console.log(`📊 Znaleziono ${userCount} użytkowników w bazie danych`)

        if (userCount > 0) {
            // Usuń powiązane dane (w kolejności zależności)
            await prisma.auctionAsset.deleteMany()
            await prisma.bid.deleteMany()
            await prisma.watchlistItem.deleteMany()
            await prisma.transaction.deleteMany()
            await prisma.auction.deleteMany()
            await prisma.message.deleteMany()
            await prisma.breederMeeting.deleteMany()
            await prisma.conversation.deleteMany()
            await prisma.userMessage.deleteMany()
            await prisma.session.deleteMany()
            await prisma.account.deleteMany()

            // Na końcu usuń użytkowników
            const deletedUsers = await prisma.user.deleteMany()
            console.log(`✅ Usunięto ${deletedUsers.count} użytkowników`)
        }

        console.log('\n👥 TWORZENIE NOWYCH UŻYTKOWNIKÓW')
        console.log('='.repeat(50))

        // Dane użytkowników
        const users = [
            {
                email: 'admin@palka-golebie.pl',
                password: 'admin123',
                firstName: 'Super',
                lastName: 'Administrator',
                role: 'ADMIN',
                phoneNumber: '+48123456789',
                address: 'ul. Administracyjna 1',
                city: 'Warszawa',
                postalCode: '00-001'
            },
            {
                email: 'user1@palka-golebie.pl',
                password: 'user123',
                firstName: 'User',
                lastName: '1',
                role: 'USER',
                phoneNumber: '+48123456790',
                address: 'ul. Gołębia 15',
                city: 'Kraków',
                postalCode: '30-001'
            },
            {
                email: 'user2@palka-golebie.pl',
                password: 'user123',
                firstName: 'User',
                lastName: '2',
                role: 'USER',
                phoneNumber: '+48123456791',
                address: 'ul. Hodowcy 22',
                city: 'Gdańsk',
                postalCode: '80-001'
            },
            {
                email: 'user3@palka-golebie.pl',
                password: 'user123',
                firstName: 'User',
                lastName: '3',
                role: 'USER',
                phoneNumber: '+48123456792',
                address: 'ul. Aukcyjna 8',
                city: 'Wrocław',
                postalCode: '50-001'
            }
        ]

        // Utwórz użytkowników
        for (let i = 0; i < users.length; i++) {
            const userData = users[i]
            const hashedPassword = await bcrypt.hash(userData.password, 12)

            const user = await prisma.user.create({
                data: {
                    email: userData.email,
                    password: hashedPassword,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userData.role,
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: userData.phoneNumber,
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                    address: userData.address,
                    city: userData.city,
                    postalCode: userData.postalCode
                }
            })

            console.log(`✅ Utworzono użytkownika ${i + 1}: ${user.email} (${user.role})`)
        }

        console.log('\n🎉 WSZYSCY UŻYTKOWNICY ZOSTALI UTWORZENI!')
        console.log('='.repeat(50))

        // Pokaż dane logowania
        console.log('\n🔐 DANE LOGOWANIA:')
        console.log('='.repeat(50))

        users.forEach((user, index) => {
            console.log(`\n${index + 1}. ${user.firstName} ${user.lastName} (${user.role})`)
            console.log(`   📧 Email: ${user.email}`)
            console.log(`   🔐 Hasło: ${user.password}`)
            console.log(`   📱 Telefon: ${user.phoneNumber}`)
            console.log(`   🏠 Adres: ${user.address}, ${user.city} ${user.postalCode}`)
        })

        console.log('\n🔑 UPRAWNIENIA:')
        console.log('='.repeat(50))
        console.log('👨‍💼 ADMINISTRATOR:')
        console.log('• Pełny dostęp do panelu administratora')
        console.log('• Zarządzanie wszystkimi aukcjami')
        console.log('• Zarządzanie użytkownikami')
        console.log('• Zarządzanie transakcjami')
        console.log('• Zatwierdzanie aukcji')
        console.log('• Tworzenie aukcji')
        console.log('• Licytowanie na aukcjach')

        console.log('\n👤 UŻYTKOWNICY (wszyscy mają pełne uprawnienia):')
        console.log('• Tworzenie aukcji')
        console.log('• Licytowanie na aukcjach')
        console.log('• Kupowanie na aukcjach')
        console.log('• Sprzedawanie na aukcjach')
        console.log('• Obserwowanie aukcji')
        console.log('• Wysyłanie wiadomości')
        console.log('• Dostęp do wszystkich funkcji platformy')

        console.log('\n📋 PANELE DOSTĘPU:')
        console.log('='.repeat(50))
        console.log('🌐 Aplikacja główna: http://localhost:3000')
        console.log('🔐 Strona logowania: http://localhost:3000/auth/signin')
        console.log('👨‍💼 Panel administratora: http://localhost:3000/admin/dashboard')
        console.log('👤 Panel użytkownika: http://localhost:3000/dashboard')
        console.log('🏪 Aukcje: http://localhost:3000/auctions')
        console.log('➕ Tworzenie aukcji: http://localhost:3000/seller/create-auction')

        console.log('\n✅ WSZYSTKO GOTOWE!')
        console.log('Możesz teraz zalogować się jako dowolny użytkownik i mieć pełne uprawnienia!')

    } catch (error) {
        console.error('❌ Błąd podczas tworzenia użytkowników:', error)
        throw error
    }
}

createUsers().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
