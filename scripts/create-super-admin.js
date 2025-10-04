const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createSuperAdmin() {
    const email = 'superadmin@palka-golebie.pl'
    const plainPassword = 'SuperAdmin2024!'
    const hashedPassword = await bcrypt.hash(plainPassword, 12)

    try {
        // Sprawdź czy użytkownik już istnieje
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            // Aktualizuj istniejącego użytkownika
            const updated = await prisma.user.update({
                where: { email },
                data: {
                    firstName: 'Super',
                    lastName: 'Administrator',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                    address: 'ul. Administracyjna 1',
                    city: 'Warszawa',
                    postalCode: '00-001',
                    image: '/uploads/admin-avatar.jpg'
                },
            })
            console.log('✅ Zaktualizowano istniejącego super administratora:', updated.email)
        } else {
            // Utwórz nowego super administratora
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstName: 'Super',
                    lastName: 'Administrator',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                    address: 'ul. Administracyjna 1',
                    city: 'Warszawa',
                    postalCode: '00-001',
                    image: '/uploads/admin-avatar.jpg'
                },
            })
            console.log('✅ Utworzono nowego super administratora:', newUser.email)
        }

        console.log('\n🎉 DANE LOGOWANIA SUPER ADMINISTRATORA:')
        console.log('=' .repeat(50))
        console.log('📧 Email:', email)
        console.log('🔐 Hasło:', plainPassword)
        console.log('👤 Imię:', 'Super Administrator')
        console.log('🏢 Rola:', 'ADMIN')
        console.log('✅ Status:', 'Aktywny')
        console.log('📧 Email:', 'Zweryfikowany')
        console.log('📱 Telefon:', 'Zweryfikowany (+48123456789)')
        console.log('🏠 Adres:', 'ul. Administracyjna 1, Warszawa 00-001')
        
        console.log('\n🔑 UPRAWNIENIA:')
        console.log('• Pełny dostęp do panelu administratora')
        console.log('• Zarządzanie wszystkimi aukcjami')
        console.log('• Zarządzanie użytkownikami')
        console.log('• Zarządzanie transakcjami')
        console.log('• Zarządzanie wiadomościami')
        console.log('• Zarządzanie spotkaniami hodowców')
        console.log('• Dostęp do wszystkich danych')
        console.log('• Możliwość tworzenia aukcji')
        console.log('• Możliwość licytowania')
        console.log('• Dostęp do wszystkich funkcji systemu')

        console.log('\n📋 PANELE DOSTĘPU:')
        console.log('🌐 Aplikacja główna: http://localhost:3001')
        console.log('👨‍💼 Panel administratora: http://localhost:3001/admin/dashboard')
        console.log('🔐 Strona logowania: http://localhost:3001/auth/signin')
        console.log('📊 Prisma Studio: http://localhost:5555')
        console.log('🏠 Strona główna: http://localhost:3001/')
        console.log('🏪 Aukcje: http://localhost:3001/auctions')
        console.log('👤 Dashboard: http://localhost:3001/dashboard')
        console.log('⚙️ Ustawienia: http://localhost:3001/settings/profile')

        console.log('\n🚀 FUNKCJE DOSTĘPNE:')
        console.log('• Tworzenie i zarządzanie aukcjami')
        console.log('• Zatwierdzanie aukcji użytkowników')
        console.log('• Zarządzanie użytkownikami (aktywacja, dezaktywacja)')
        console.log('• Przeglądanie wszystkich transakcji')
        console.log('• Zarządzanie wiadomościami systemowymi')
        console.log('• Dodawanie spotkań hodowców')
        console.log('• Zarządzanie zasobami (zdjęcia, dokumenty)')
        console.log('• Dostęp do logów systemowych')
        console.log('• Zarządzanie referencjami')
        console.log('• Kontrola nad wszystkimi funkcjami platformy')

        console.log('\n⚠️ UWAGI BEZPIECZEŃSTWA:')
        console.log('• To konto ma pełne uprawnienia administratora')
        console.log('• Używaj ostrożnie - może modyfikować wszystkie dane')
        console.log('• Zalecane jest zmiana hasła po pierwszym logowaniu')
        console.log('• Konto ma dostęp do wszystkich wrażliwych danych')

    } catch (error) {
        console.error('❌ Błąd podczas tworzenia super administratora:', error)
        throw error
    }
}

createSuperAdmin().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
