const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createPalkaAdmin() {
    const email = 'admin@palkamtm.pl'
    const plainPassword = 'admin'
    const hashedPassword = await bcrypt.hash(plainPassword, 12)

    try {
        // Sprawdź czy użytkownik już istnieje
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            // Zaktualizuj istniejącego użytkownika
            const updated = await prisma.user.update({
                where: { email },
                data: {
                    firstName: 'Admin',
                    lastName: 'Pałka MTM',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: null,
                    isPhoneVerified: false,
                    phoneVerificationCode: null,
                    activationToken: null,
                    address: null,
                    city: null,
                    postalCode: null,
                    image: null
                },
            })
            console.log('✅ Zaktualizowano istniejącego administratora:', updated.email)
        } else {
            // Utwórz nowego administratora
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstName: 'Admin',
                    lastName: 'Pałka MTM',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: null,
                    isPhoneVerified: false,
                    phoneVerificationCode: null,
                    activationToken: null,
                    address: null,
                    city: null,
                    postalCode: null,
                    image: null
                },
            })
            console.log('✅ Utworzono nowego administratora:', newUser.email)
        }

        console.log('\n🎉 DANE LOGOWANIA ADMINISTRATORA PAŁKA MTM:')
        console.log('='.repeat(50))
        console.log('📧 Email:', email)
        console.log('🔐 Hasło:', plainPassword)
        console.log('👤 Imię:', 'Admin Pałka MTM')
        console.log('🏢 Rola:', 'ADMIN')
        console.log('✅ Status:', 'Aktywny')
        console.log('📧 Email:', 'Zweryfikowany')
        console.log('\n🌐 Zaloguj się na: http://localhost:3001/auth/signin')

    } catch (error) {
        console.error('❌ Błąd podczas tworzenia administratora:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createPalkaAdmin()
