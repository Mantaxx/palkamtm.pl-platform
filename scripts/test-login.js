#!/usr/bin/env node

/**
 * Skrypt do testowania logowania
 * Uruchom: node scripts/test-login.js
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function testLogin() {
    console.log('🔐 TEST LOGOWANIA')
    console.log('=' .repeat(30))
    
    try {
        // 1. Sprawdź admina
        console.log('\n1. Sprawdzenie admina:')
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@palka-golebie.pl' }
        })
        
        if (!admin) {
            console.log('❌ Admin nie istnieje!')
            return
        }
        
        console.log(`✅ Admin istnieje: ${admin.email}`)
        console.log(`   Aktywny: ${admin.isActive}`)
        console.log(`   Ma hasło: ${admin.password ? 'TAK' : 'NIE'}`)
        
        // 2. Test hasła
        if (admin.password) {
            console.log('\n2. Test hasła:')
            
            const testPasswords = [
                'admin123',
                'admin',
                'password',
                '123456',
                'palka123',
                'MTM123'
            ]
            
            for (const password of testPasswords) {
                const isValid = await bcrypt.compare(password, admin.password)
                console.log(`   "${password}": ${isValid ? '✅ POPRAWNE' : '❌ Niepoprawne'}`)
                
                if (isValid) {
                    console.log(`\n🎉 ZNALEZIONO HASŁO: "${password}"`)
                    break
                }
            }
        }
        
        // 3. Sprawdź czy można utworzyć sesję
        console.log('\n3. Test tworzenia sesji:')
        
        const sessionToken = 'test-session-' + Date.now()
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dni
        
        try {
            const session = await prisma.session.create({
                data: {
                    sessionToken,
                    userId: admin.id,
                    expires
                }
            })
            
            console.log('✅ Sesja utworzona pomyślnie')
            console.log(`   Token: ${session.sessionToken}`)
            console.log(`   Wygasa: ${session.expires}`)
            
            // Usuń testową sesję
            await prisma.session.delete({
                where: { id: session.id }
            })
            console.log('✅ Testowa sesja usunięta')
            
        } catch (error) {
            console.log('❌ Błąd tworzenia sesji:', error.message)
        }
        
        // 4. Sprawdź czy można utworzyć aukcję
        console.log('\n4. Test tworzenia aukcji:')
        
        try {
            const auction = await prisma.auction.create({
                data: {
                    title: 'Test Aukcja - ' + new Date().toISOString(),
                    description: 'To jest testowa aukcja utworzona przez skrypt testowy',
                    category: 'Pigeon',
                    startingPrice: 100,
                    currentPrice: 100,
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    sellerId: admin.id,
                    status: 'PENDING',
                    isApproved: false
                }
            })
            
            console.log('✅ Aukcja utworzona pomyślnie')
            console.log(`   ID: ${auction.id}`)
            console.log(`   Tytuł: ${auction.title}`)
            
            // Usuń testową aukcję
            await prisma.auction.delete({
                where: { id: auction.id }
            })
            console.log('✅ Testowa aukcja usunięta')
            
        } catch (error) {
            console.log('❌ Błąd tworzenia aukcji:', error.message)
        }
        
        console.log('\n🎉 TEST LOGOWANIA ZAKOŃCZONY')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS TESTU LOGOWANIA:')
        console.error('Typ błędu:', error.constructor.name)
        console.error('Wiadomość:', error.message)
        
        if (error.code) {
            console.error('Kod błędu:', error.code)
        }
        
        console.error('\nStack trace:')
        console.error(error.stack)
    } finally {
        await prisma.$disconnect()
    }
}

// Uruchom test
testLogin()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })

