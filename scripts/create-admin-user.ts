import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    const email = 'admin@palka-golebie.pl'
    const plainPassword = 'admin123'
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
                    firstName: 'Administrator',
                    lastName: 'Systemu',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                },
            })
            console.log('✅ Zaktualizowano istniejącego administratora:', updated.email)
        } else {
            // Utwórz nowego użytkownika
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstName: 'Administrator',
                    lastName: 'Systemu',
                    password: hashedPassword,
                    role: 'ADMIN',
                    isActive: true,
                    emailVerified: new Date(),
                    phoneNumber: '+48123456789',
                    isPhoneVerified: true,
                    phoneVerificationCode: null,
                    phoneVerificationExpires: null,
                    activationToken: null,
                },
            })
            console.log('✅ Utworzono nowego administratora:', newUser.email)
        }

        console.log('\n🎉 Dane logowania:')
        console.log('Email:', email)
        console.log('Hasło:', plainPassword)
        console.log('\n📋 Panel administratora:')
        console.log('Aplikacja: http://localhost:3001/admin/dashboard')
        console.log('Prisma Studio: http://localhost:5555')

    } catch (error) {
        console.error('❌ Błąd podczas tworzenia administratora:', error)
        throw error
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
