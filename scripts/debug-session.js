#!/usr/bin/env node

/**
 * Skrypt do debugowania sesji użytkownika
 * Uruchom: node scripts/debug-session.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function debugSession() {
    console.log('🔍 DEBUG SESJI UŻYTKOWNIKA')
    console.log('=' .repeat(40))
    
    try {
        // 1. Sprawdź wszystkich użytkowników
        console.log('\n1. Wszyscy użytkownicy w bazie:')
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                isPhoneVerified: true,
                createdAt: true
            }
        })
        
        users.forEach((user, index) => {
            console.log(`   ${index + 1}. ID: ${user.id}`)
            console.log(`      Email: ${user.email}`)
            console.log(`      Imię: ${user.firstName || 'Brak'}`)
            console.log(`      Nazwisko: ${user.lastName || 'Brak'}`)
            console.log(`      Rola: ${user.role}`)
            console.log(`      Aktywny: ${user.isActive}`)
            console.log(`      Telefon zweryfikowany: ${user.isPhoneVerified}`)
            console.log(`      Utworzony: ${user.createdAt}`)
            console.log('')
        })
        
        // 2. Sprawdź sesje
        console.log('\n2. Aktywne sesje:')
        const sessions = await prisma.session.findMany({
            select: {
                id: true,
                sessionToken: true,
                userId: true,
                expires: true,
                user: {
                    select: {
                        email: true
                    }
                }
            }
        })
        
        if (sessions.length > 0) {
            sessions.forEach((session, index) => {
                console.log(`   ${index + 1}. Token: ${session.sessionToken.substring(0, 20)}...`)
                console.log(`      Użytkownik: ${session.user.email}`)
                console.log(`      Wygasa: ${session.expires}`)
                console.log(`      Aktywna: ${new Date() < session.expires ? 'TAK' : 'NIE'}`)
                console.log('')
            })
        } else {
            console.log('   Brak aktywnych sesji')
        }
        
        // 3. Sprawdź konta
        console.log('\n3. Konta użytkowników:')
        const accounts = await prisma.account.findMany({
            select: {
                id: true,
                userId: true,
                type: true,
                provider: true,
                user: {
                    select: {
                        email: true
                    }
                }
            }
        })
        
        if (accounts.length > 0) {
            accounts.forEach((account, index) => {
                console.log(`   ${index + 1}. Provider: ${account.provider}`)
                console.log(`      Typ: ${account.type}`)
                console.log(`      Użytkownik: ${account.user.email}`)
                console.log('')
            })
        } else {
            console.log('   Brak kont')
        }
        
        // 4. Sprawdź czy admin ma hasło
        console.log('\n4. Sprawdzenie hasła admina:')
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@palka-golebie.pl' },
            select: {
                id: true,
                email: true,
                password: true,
                isActive: true
            }
        })
        
        if (admin) {
            console.log(`   Email: ${admin.email}`)
            console.log(`   ID: ${admin.id}`)
            console.log(`   Ma hasło: ${admin.password ? 'TAK' : 'NIE'}`)
            console.log(`   Aktywny: ${admin.isActive}`)
            
            if (!admin.password) {
                console.log('\n⚠️  UWAGA: Admin nie ma hasła!')
                console.log('   Uruchom: node scripts/set-admin-password.js')
            }
        } else {
            console.log('   ❌ Admin nie istnieje!')
        }
        
        console.log('\n🎉 DEBUG SESJI ZAKOŃCZONY')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS DEBUGU SESJI:')
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

// Uruchom debug
debugSession()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })

