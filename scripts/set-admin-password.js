const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const email = 'admin@test.com'
    const plain = 'admin'
    const hashed = await bcrypt.hash(plain, 12)

    const updated = await prisma.user.update({
        where: { email },
        data: {
            isActive: true,
            emailVerified: new Date(),
            password: hashed,
            role: 'ADMIN',
            phoneVerificationCode: null,
            phoneVerificationExpires: null,
        },
    })

    console.log('Zaktualizowano użytkownika:', updated.email)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})


