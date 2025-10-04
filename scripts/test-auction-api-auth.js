#!/usr/bin/env node

/**
 * Skrypt do testowania API aukcji z autoryzacją
 * Uruchom: node scripts/test-auction-api-auth.js
 */

const fetch = require('node-fetch')

async function testAuctionAPIWithAuth() {
    console.log('🔐 TEST API AUKCJI Z AUTORYZACJĄ')
    console.log('=' .repeat(45))
    
    const baseUrl = 'http://localhost:3000'
    
    try {
        // 1. Test logowania
        console.log('\n1. Test logowania...')
        const loginResponse = await fetch(`${baseUrl}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'admin@palka-golebie.pl',
                password: 'admin123' // Zmień na właściwe hasło
            })
        })
        
        console.log(`Status: ${loginResponse.status}`)
        
        if (loginResponse.ok) {
            console.log('✅ Logowanie OK')
        } else {
            console.log('❌ Logowanie FAILED')
            const error = await loginResponse.text()
            console.log('Error:', error)
        }
        
        // 2. Test sesji po logowaniu
        console.log('\n2. Test sesji po logowaniu...')
        const sessionResponse = await fetch(`${baseUrl}/api/auth/session`)
        console.log(`Status: ${sessionResponse.status}`)
        
        if (sessionResponse.ok) {
            const session = await sessionResponse.json()
            console.log('✅ Sesja OK')
            console.log('Session:', session)
        } else {
            console.log('❌ Sesja FAILED')
            const error = await sessionResponse.text()
            console.log('Error:', error)
        }
        
        // 3. Test tworzenia aukcji z autoryzacją
        console.log('\n3. Test tworzenia aukcji z autoryzacją...')
        
        // Najpierw utwórz testowy obraz
        const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
        const formData = new FormData()
        formData.append('files', new Blob([testImageData], { type: 'image/png' }), 'test.png')
        formData.append('type', 'image')
        
        const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
            method: 'POST',
            body: formData
        })
        
        console.log(`Upload Status: ${uploadResponse.status}`)
        
        let imageUrl = '/test-image.jpg' // fallback
        
        if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json()
            console.log('✅ Upload OK')
            console.log('Upload result:', uploadResult)
            if (uploadResult.files && uploadResult.files.length > 0) {
                imageUrl = uploadResult.files[0]
            }
        } else {
            console.log('❌ Upload FAILED')
            const error = await uploadResponse.text()
            console.log('Upload error:', error)
        }
        
        // Teraz utwórz aukcję
        const auctionResponse = await fetch(`${baseUrl}/api/auctions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Aukcja API',
                description: 'To jest testowa aukcja utworzona przez skrypt API',
                category: 'Pigeon',
                startingPrice: 100,
                startTime: new Date().toISOString(),
                endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                images: [imageUrl]
            })
        })
        
        console.log(`Auction Status: ${auctionResponse.status}`)
        
        if (auctionResponse.ok) {
            const result = await auctionResponse.json()
            console.log('✅ Aukcja utworzona OK')
            console.log('Auction result:', result)
        } else {
            console.log('❌ Aukcja FAILED')
            const error = await auctionResponse.text()
            console.log('Auction error:', error)
        }
        
        console.log('\n🎉 TEST API Z AUTORYZACJĄ ZAKOŃCZONY')
        
    } catch (error) {
        console.error('\n❌ BŁĄD PODCZAS TESTU API Z AUTORYZACJĄ:')
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
testAuctionAPIWithAuth()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })

