const fs = require('fs')
const path = require('path')

// Funkcja do zapisywania logów
function logStep(step, data = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
        timestamp,
        step,
        data,
        url: typeof window !== 'undefined' ? window.location.href : 'server-side'
    }

    console.log(`🔍 [${timestamp}] ${step}:`, data)

    // Zapisz do pliku (jeśli jesteśmy po stronie serwera)
    if (typeof window === 'undefined') {
        const logFile = path.join(process.cwd(), 'debug-auction-steps.log')
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n')
    }
}

// Middleware do przechwytywania żądań API
function createApiLogger() {
    return (req, res, next) => {
        const originalSend = res.send
        const originalJson = res.json

        // Loguj żądanie
        logStep('API_REQUEST', {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body
        })

        // Loguj odpowiedź
        res.send = function (data) {
            logStep('API_RESPONSE', {
                status: res.statusCode,
                data: data
            })
            originalSend.call(this, data)
        }

        res.json = function (data) {
            logStep('API_RESPONSE_JSON', {
                status: res.statusCode,
                data: data
            })
            originalJson.call(this, data)
        }

        if (next) next()
    }
}

// Funkcja do testowania kroków
async function testAuctionSteps() {
    console.log('🚀 ROZPOCZYNAM TEST KROKÓW TWORZENIA AUKCJI')
    console.log('='.repeat(60))

    try {
        // Krok 1: Sprawdź połączenie z bazą danych
        logStep('STEP_1_DATABASE_CHECK', { message: 'Sprawdzanie połączenia z bazą danych' })
        const { PrismaClient } = require('@prisma/client')
        const prisma = new PrismaClient()

        const userCount = await prisma.user.count()
        logStep('STEP_1_DATABASE_CHECK_SUCCESS', { userCount })

        // Krok 2: Sprawdź czy istnieje użytkownik testowy
        logStep('STEP_2_USER_CHECK', { message: 'Sprawdzanie użytkownika testowego' })
        const testUser = await prisma.user.findUnique({
            where: { email: 'testuser@palka-golebie.pl' }
        })

        if (!testUser) {
            logStep('STEP_2_USER_NOT_FOUND', { message: 'Użytkownik testowy nie istnieje' })
            console.log('❌ Użytkownik testowy nie istnieje. Uruchom: node scripts/create-test-user.js')
            return
        }

        logStep('STEP_2_USER_FOUND', {
            id: testUser.id,
            email: testUser.email,
            role: testUser.role,
            isActive: testUser.isActive
        })

        // Krok 3: Sprawdź strukturę tabeli Auction
        logStep('STEP_3_AUCTION_TABLE_CHECK', { message: 'Sprawdzanie struktury tabeli Auction' })
        const auctionCount = await prisma.auction.count()
        logStep('STEP_3_AUCTION_TABLE_CHECK_SUCCESS', { auctionCount })

        // Krok 4: Sprawdź strukturę tabeli AuctionAsset
        logStep('STEP_4_AUCTION_ASSET_TABLE_CHECK', { message: 'Sprawdzanie struktury tabeli AuctionAsset' })
        const assetCount = await prisma.auctionAsset.count()
        logStep('STEP_4_AUCTION_ASSET_TABLE_CHECK_SUCCESS', { assetCount })

        // Krok 5: Test tworzenia aukcji
        logStep('STEP_5_CREATE_AUCTION_TEST', { message: 'Test tworzenia aukcji' })

        const now = new Date()
        const endTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 dni

        const testAuction = await prisma.auction.create({
            data: {
                title: 'Test Auction - ' + now.toISOString(),
                description: 'This is a test auction created by the debug script to verify auction creation functionality.',
                category: 'Pigeon',
                startingPrice: 100,
                currentPrice: 100,
                buyNowPrice: 200,
                startTime: now,
                endTime: endTime,
                sellerId: testUser.id,
                status: 'PENDING',
                isApproved: false
            }
        })

        logStep('STEP_5_CREATE_AUCTION_SUCCESS', {
            auctionId: testAuction.id,
            title: testAuction.title,
            status: testAuction.status
        })

        // Krok 6: Test dodawania zasobów
        logStep('STEP_6_ADD_ASSETS_TEST', { message: 'Test dodawania zasobów' })

        const testAsset = await prisma.auctionAsset.create({
            data: {
                auctionId: testAuction.id,
                type: 'IMAGE',
                url: '/uploads/image/test-auction.png'
            }
        })

        logStep('STEP_6_ADD_ASSETS_SUCCESS', {
            assetId: testAsset.id,
            type: testAsset.type,
            url: testAsset.url
        })

        // Krok 7: Test usuwania testowej aukcji
        logStep('STEP_7_CLEANUP_TEST', { message: 'Usuwanie testowej aukcji' })

        await prisma.auctionAsset.deleteMany({
            where: { auctionId: testAuction.id }
        })

        await prisma.auction.delete({
            where: { id: testAuction.id }
        })

        logStep('STEP_7_CLEANUP_SUCCESS', { message: 'Testowa aukcja usunięta' })

        console.log('\n✅ WSZYSTKIE KROKI ZAKOŃCZONE POMYŚLNIE!')
        console.log('📋 Logi zapisane w: debug-auction-steps.log')

    } catch (error) {
        logStep('ERROR', {
            message: error.message,
            stack: error.stack
        })
        console.error('❌ Błąd podczas testowania kroków:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Uruchom test jeśli skrypt jest wywoływany bezpośrednio
if (require.main === module) {
    testAuctionSteps()
}

module.exports = {
    logStep,
    createApiLogger,
    testAuctionSteps
}
