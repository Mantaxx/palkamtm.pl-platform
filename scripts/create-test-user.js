const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createTestUser() {
    const email = 'testuser@palka-golebie.pl'
    const plainPassword = 'test123'
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
                    firstName: 'Test',
                    lastName: 'User',
                    password: hashedPassword,
                    role: 'USER',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                    address: 'ul. Testowa 1',
                    city: 'Warszawa',
                    postalCode: '00-001'
                },
            })
            console.log('✅ Zaktualizowano istniejącego użytkownika testowego:', updated.email)
        } else {
            // Utwórz nowego użytkownika testowego
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstName: 'Test',
                    lastName: 'User',
                    password: hashedPassword,
                    role: 'USER',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                    address: 'ul. Testowa 1',
                    city: 'Warszawa',
                    postalCode: '00-001'
                },
            })
            console.log('✅ Utworzono nowego użytkownika testowego:', newUser.email)
        }

        console.log('\n🎉 DANE LOGOWANIA UŻYTKOWNIKA TESTOWEGO:')
        console.log('=' .repeat(50))
        console.log('📧 Email:', email)
        console.log('🔐 Hasło:', plainPassword)
        console.log('👤 Imię:', 'Test User')
        console.log('🏢 Rola:', 'USER')
        console.log('✅ Status:', 'Aktywny')
        console.log('📧 Email:', 'Zweryfikowany')
        console.log('📱 Telefon:', 'Zweryfikowany (+48123456789)')
        console.log('🏠 Adres:', 'ul. Testowa 1, Warszawa 00-001')

    } catch (error) {
        console.error('❌ Błąd podczas tworzenia użytkownika testowego:', error)
        throw error
    }
}

createTestUser().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
