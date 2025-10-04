#!/usr/bin/env node

/**
 * Skrypt diagnostyczny do debugowania problemów z publikowaniem aukcji
 * Uruchom: node scripts/debug-auction-creation.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function debugAuctionCreation() {
    console.log('🔍 DIAGNOZA PROBLEMÓW Z PUBLIKOWANIEM AUKCJI')
    console.log('=' .repeat(50))
    
    try {
        // 1. Sprawdź połączenie z bazą danych
        console.log('\n1. Sprawdzanie połączenia z bazą danych...')
        await prisma.$connect()
        console.log('✅ Połączenie z bazą danych OK')
        
        // 2. Sprawdź strukturę tabeli Auction
        console.log('\n2. Sprawdzanie struktury tabeli Auction...')
        const auctionCount = await prisma.auction.count()
        console.log(`✅ Tabela Auction istnieje, liczba rekordów: ${auctionCount}`)
        
        // 3. Sprawdź strukturę tabeli User
        console.log('\n3. Sprawdzanie struktury tabeli User...')
        const userCount = await prisma.user.count()
        console.log(`✅ Tabela User istnieje, liczba rekordów: ${userCount}`)
        
        // 4. Sprawdź strukturę tabeli AuctionAsset
        console.log('\n4. Sprawdzanie struktury tabeli AuctionAsset...')
        const assetCount = await prisma.auctionAsset.count()
        console.log(`✅ Tabela AuctionAsset istnieje, liczba rekordów: ${assetCount}`)
        
        // 5. Sprawdź przykładowe dane użytkowników
        console.log('\n5. Sprawdzanie przykładowych użytkowników...')
        const users = await prisma.user.findMany({
            take: 3,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                isPhoneVerified: true
            }
        })
        
        if (users.length > 0) {
            console.log('✅ Znaleziono użytkowników:')
            users.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.email} (${user.role}) - Aktywny: ${user.isActive}, Telefon: ${user.isPhoneVerified}`)
            })
        } else {
            console.log('⚠️  Brak użytkowników w bazie danych')
        }
        
        // 6. Sprawdź przykładowe aukcje
        console.log('\n6. Sprawdzanie przykładowych aukcji...')
        const auctions = await prisma.auction.findMany({
            take: 3,
            select: {
                id: true,
                title: true,
                status: true,
                isApproved: true,
                createdAt: true,
                seller: {
                    select: {
                        email: true
                    }
                }
            }
        })
        
        if (auctions.length > 0) {
            console.log('✅ Znaleziono aukcje:')
            auctions.forEach((auction, index) => {
                console.log(`   ${index + 1}. "${auction.title}" - Status: ${auction.status}, Zatwierdzona: ${auction.isApproved}`)
            })
        } else {
            console.log('⚠️  Brak aukcji w bazie danych')
        }
        
        // 7. Sprawdź przykładowe zasoby
        console.log('\n7. Sprawdzanie przykładowych zasobów...')
        const assets = await prisma.auctionAsset.findMany({
            take: 3,
            select: {
                id: true,
                type: true,
                url: true,
                auction: {
                    select: {
                        title: true
                    }
                }
            }
        })
        
        if (assets.length > 0) {
            console.log('✅ Znaleziono zasoby:')
            assets.forEach((asset, index) => {
                console.log(`   ${index + 1}. ${asset.type}: ${asset.url}`)
            })
        } else {
            console.log('⚠️  Brak zasobów w bazie danych')
        }
        
        // 8. Test tworzenia przykładowej aukcji
        console.log('\n8. Test tworzenia przykładowej aukcji...')
        
        // Znajdź aktywnego użytkownika
        const activeUser = await prisma.user.findFirst({
            where: {
                isActive: true
            }
        })
        
        if (!activeUser) {
            console.log('❌ Brak aktywnego użytkownika do testu')
            return
        }
        
        console.log(`✅ Używam użytkownika: ${activeUser.email}`)
        
        // Próbuj utworzyć testową aukcję
        const testAuction = await prisma.auction.create({
            data: {
                title: 'Test Aukcja - ' + new Date().toISOString(),
                description: 'To jest testowa aukcja utworzona przez skrypt diagnostyczny',
                category: 'Pigeon',
                startingPrice: 100,
                currentPrice: 100,
                startTime: new Date(),
                endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dni
                sellerId: activeUser.id,
                status: 'PENDING',
                isApproved: false
            }
        })
        
        console.log(`✅ Testowa aukcja utworzona: ${testAuction.id}`)
        
        // Usuń testową aukcję
        await prisma.auction.delete({
            where: { id: testAuction.id }
        })
        console.log('✅ Testowa aukcja usunięta')
        
        console.log('\n🎉 DIAGNOZA ZAKOŃCZONA POMYŚLNIE')
        console.log('Wszystkie komponenty działają poprawnie!')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS DIAGNOZY:')
        console.error('Typ błędu:', error.constructor.name)
        console.error('Wiadomość:', error.message)
        
        if (error.code) {
            console.error('Kod błędu:', error.code)
        }
        
        if (error.meta) {
            console.error('Meta:', error.meta)
        }
        
        console.error('\nStack trace:')
        console.error(error.stack)
    } finally {
        await prisma.$disconnect()
    }
}

// Uruchom diagnozę
debugAuctionCreation()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })
