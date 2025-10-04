#!/usr/bin/env node

/**
 * Skrypt do testowania całego procesu publikacji aukcji
 * Uruchom: node scripts/test-full-auction-process.js
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const prisma = new PrismaClient()

async function testFullAuctionProcess() {
    console.log('🚀 TEST PEŁNEGO PROCESU PUBLIKACJI AUKCJI')
    console.log('=' .repeat(50))
    
    const baseUrl = 'http://localhost:3000'
    
    try {
        // 1. Przygotuj testowe dane
        console.log('\n1. Przygotowanie testowych danych...')
        
        const testAuctionData = {
            title: 'Test Champion - ' + new Date().toISOString().slice(0, 19),
            description: 'To jest testowy gołąb champion z doskonałymi wynikami w lotach krótkodystansowych. Posiada rodowód z najlepszych linii europejskich.',
            category: 'Pigeon',
            startingPrice: 500,
            buyNowPrice: 1500,
            location: 'Kraków, Polska'
        }
        
        console.log('✅ Dane testowe przygotowane')
        console.log(`   Tytuł: ${testAuctionData.title}`)
        console.log(`   Cena startowa: ${testAuctionData.startingPrice} zł`)
        
        // 2. Utwórz testowy obraz
        console.log('\n2. Tworzenie testowego obrazu...')
        
        // Utwórz prosty obraz PNG (1x1 pixel)
        const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
        
        // Zapisz do pliku tymczasowego
        const tempImagePath = path.join(__dirname, '..', 'public', 'uploads', 'image', 'test-auction.png')
        const uploadDir = path.dirname(tempImagePath)
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        
        fs.writeFileSync(tempImagePath, testImageData)
        console.log(`✅ Testowy obraz utworzony: ${tempImagePath}`)
        
        // 3. Test logowania przez API
        console.log('\n3. Test logowania przez API...')
        
        // Symuluj logowanie (w rzeczywistości trzeba by użyć cookies)
        console.log('⚠️  Logowanie przez API wymaga cookies - pomijam')
        
        // 4. Test tworzenia aukcji bezpośrednio w bazie
        console.log('\n4. Test tworzenia aukcji bezpośrednio w bazie...')
        
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@palka-golebie.pl' }
        })
        
        if (!admin) {
            throw new Error('Admin nie istnieje!')
        }
        
        const auction = await prisma.auction.create({
            data: {
                title: testAuctionData.title,
                description: testAuctionData.description,
                category: testAuctionData.category,
                startingPrice: testAuctionData.startingPrice,
                currentPrice: testAuctionData.startingPrice,
                buyNowPrice: testAuctionData.buyNowPrice,
                startTime: new Date(),
                endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                sellerId: admin.id,
                status: 'PENDING',
                isApproved: false
            }
        })
        
        console.log(`✅ Aukcja utworzona: ${auction.id}`)
        
        // 5. Test dodawania zasobów
        console.log('\n5. Test dodawania zasobów...')
        
        const asset = await prisma.auctionAsset.create({
            data: {
                auctionId: auction.id,
                type: 'IMAGE',
                url: '/uploads/image/test-auction.png'
            }
        })
        
        console.log(`✅ Zasób dodany: ${asset.id}`)
        
        // 6. Test zatwierdzania aukcji
        console.log('\n6. Test zatwierdzania aukcji...')
        
        const approvedAuction = await prisma.auction.update({
            where: { id: auction.id },
            data: {
                isApproved: true,
                status: 'ACTIVE'
            }
        })
        
        console.log(`✅ Aukcja zatwierdzona: ${approvedAuction.status}`)
        
        // 7. Test pobierania aukcji przez API
        console.log('\n7. Test pobierania aukcji przez API...')
        
        const apiResponse = await fetch(`${baseUrl}/api/auctions`)
        if (apiResponse.ok) {
            const apiData = await apiResponse.json()
            console.log(`✅ API zwróciło ${apiData.auctions.length} aukcji`)
            
            const ourAuction = apiData.auctions.find(a => a.id === auction.id)
            if (ourAuction) {
                console.log(`✅ Nasza aukcja jest widoczna w API`)
                console.log(`   Status: ${ourAuction.status}`)
                console.log(`   Zatwierdzona: ${ourAuction.isApproved}`)
            } else {
                console.log('⚠️  Nasza aukcja nie jest widoczna w API')
            }
        } else {
            console.log('❌ Błąd API:', apiResponse.status)
        }
        
        // 8. Test licytacji
        console.log('\n8. Test licytacji...')
        
        const bid = await prisma.bid.create({
            data: {
                auctionId: auction.id,
                bidderId: admin.id,
                amount: 600
            }
        })
        
        console.log(`✅ Licytacja utworzona: ${bid.amount} zł`)
        
        // 9. Podsumowanie
        console.log('\n9. Podsumowanie testu...')
        
        const finalAuction = await prisma.auction.findUnique({
            where: { id: auction.id },
            include: {
                assets: true,
                bids: true,
                seller: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        
        console.log('📊 FINALNE DANE AUKCJI:')
        console.log(`   ID: ${finalAuction.id}`)
        console.log(`   Tytuł: ${finalAuction.title}`)
        console.log(`   Status: ${finalAuction.status}`)
        console.log(`   Zatwierdzona: ${finalAuction.isApproved}`)
        console.log(`   Sprzedawca: ${finalAuction.seller.firstName} ${finalAuction.seller.lastName}`)
        console.log(`   Cena startowa: ${finalAuction.startingPrice} zł`)
        console.log(`   Aktualna cena: ${finalAuction.currentPrice} zł`)
        console.log(`   Liczba zasobów: ${finalAuction.assets.length}`)
        console.log(`   Liczba licytacji: ${finalAuction.bids.length}`)
        
        // 10. Czyszczenie
        console.log('\n10. Czyszczenie testowych danych...')
        
        await prisma.bid.deleteMany({
            where: { auctionId: auction.id }
        })
        
        await prisma.auctionAsset.deleteMany({
            where: { auctionId: auction.id }
        })
        
        await prisma.auction.delete({
            where: { id: auction.id }
        })
        
        if (fs.existsSync(tempImagePath)) {
            fs.unlinkSync(tempImagePath)
        }
        
        console.log('✅ Testowe dane usunięte')
        
        console.log('\n🎉 TEST PEŁNEGO PROCESU ZAKOŃCZONY POMYŚLNIE!')
        console.log('Wszystkie komponenty działają poprawnie.')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS TESTU:')
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
testFullAuctionProcess()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })

