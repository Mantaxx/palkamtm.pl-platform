#!/usr/bin/env node

/**
 * Skrypt do testowania API aukcji bezpośrednio
 * Uruchom: node scripts/test-auction-api.js
 */

const fetch = require('node-fetch')

async function testAuctionAPI() {
    console.log('🧪 TEST API AUKCJI')
    console.log('=' .repeat(40))
    
    const baseUrl = 'http://localhost:3000'
    
    try {
        // 1. Test GET /api/auctions
        console.log('\n1. Test GET /api/auctions...')
        const getResponse = await fetch(`${baseUrl}/api/auctions`)
        console.log(`Status: ${getResponse.status}`)
        
        if (getResponse.ok) {
            const data = await getResponse.json()
            console.log('✅ GET /api/auctions OK')
            console.log(`Liczba aukcji: ${data.auctions?.length || 0}`)
        } else {
            console.log('❌ GET /api/auctions FAILED')
            const error = await getResponse.text()
            console.log('Error:', error)
        }
        
        // 2. Test POST /api/auctions (bez autoryzacji)
        console.log('\n2. Test POST /api/auctions (bez autoryzacji)...')
        const postResponse = await fetch(`${baseUrl}/api/auctions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Aukcja',
                description: 'To jest testowa aukcja',
                category: 'Pigeon',
                startingPrice: 100,
                startTime: new Date().toISOString(),
                endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                images: ['/test-image.jpg']
            })
        })
        
        console.log(`Status: ${postResponse.status}`)
        
        if (postResponse.status === 401) {
            console.log('✅ POST /api/auctions wymaga autoryzacji (oczekiwane)')
        } else {
            console.log('⚠️  POST /api/auctions nie wymaga autoryzacji (nieoczekiwane)')
            const result = await postResponse.text()
            console.log('Response:', result)
        }
        
        // 3. Test POST /api/upload (bez autoryzacji)
        console.log('\n3. Test POST /api/upload (bez autoryzacji)...')
        const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
            method: 'POST',
            body: new FormData()
        })
        
        console.log(`Status: ${uploadResponse.status}`)
        
        if (uploadResponse.status === 401) {
            console.log('✅ POST /api/upload wymaga autoryzacji (oczekiwane)')
        } else {
            console.log('⚠️  POST /api/upload nie wymaga autoryzacji (nieoczekiwane)')
            const result = await uploadResponse.text()
            console.log('Response:', result)
        }
        
        // 4. Test GET /api/auth/session
        console.log('\n4. Test GET /api/auth/session...')
        const sessionResponse = await fetch(`${baseUrl}/api/auth/session`)
        console.log(`Status: ${sessionResponse.status}`)
        
        if (sessionResponse.ok) {
            const session = await sessionResponse.json()
            console.log('✅ GET /api/auth/session OK')
            console.log('Session:', session)
        } else {
            console.log('❌ GET /api/auth/session FAILED')
            const error = await sessionResponse.text()
            console.log('Error:', error)
        }
        
        console.log('\n🎉 TEST API ZAKOŃCZONY')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS TESTU API:')
        console.error('Typ błędu:', error.constructor.name)
        console.error('Wiadomość:', error.message)
        
        if (error.code) {
            console.error('Kod błędu:', error.code)
        }
        
        console.error('\nStack trace:')
        console.error(error.stack)
    }
}

// Uruchom test
testAuctionAPI()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })
