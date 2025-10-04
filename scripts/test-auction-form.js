#!/usr/bin/env node

/**
 * Skrypt do testowania formularza aukcji w przeglądarce
 * Uruchom: node scripts/test-auction-form.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testAuctionForm() {
    console.log('🌐 TEST FORMULARZA AUKCJI W PRZEGLĄDARCE')
    console.log('=' .repeat(50))
    
    try {
        // 1. Sprawdź czy serwer działa
        console.log('\n1. Sprawdzanie serwera...')
        
        const fetch = require('node-fetch')
        const baseUrl = 'http://localhost:3000'
        
        try {
            const response = await fetch(baseUrl)
            if (response.ok) {
                console.log('✅ Serwer działa na http://localhost:3000')
            } else {
                console.log('❌ Serwer nie odpowiada poprawnie')
                return
            }
        } catch (error) {
            console.log('❌ Serwer nie działa:', error.message)
            console.log('💡 Uruchom: npm run dev')
            return
        }
        
        // 2. Sprawdź czy użytkownik może się zalogować
        console.log('\n2. Sprawdzanie użytkownika...')
        
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@palka-golebie.pl' }
        })
        
        if (!admin) {
            console.log('❌ Admin nie istnieje!')
            return
        }
        
        console.log(`✅ Admin istnieje: ${admin.email}`)
        console.log(`   Aktywny: ${admin.isActive}`)
        console.log(`   Hasło: admin123`)
        
        // 3. Sprawdź czy katalog uploads istnieje
        console.log('\n3. Sprawdzanie katalogu uploads...')
        
        const fs = require('fs')
        const path = require('path')
        
        const uploadDirs = [
            'public/uploads/image',
            'public/uploads/video',
            'public/uploads/document'
        ]
        
        for (const dir of uploadDirs) {
            const fullPath = path.join(__dirname, '..', dir)
            if (fs.existsSync(fullPath)) {
                console.log(`✅ Katalog istnieje: ${dir}`)
            } else {
                console.log(`⚠️  Katalog nie istnieje: ${dir}`)
                try {
                    fs.mkdirSync(fullPath, { recursive: true })
                    console.log(`✅ Katalog utworzony: ${dir}`)
                } catch (error) {
                    console.log(`❌ Błąd tworzenia katalogu: ${dir}`)
                }
            }
        }
        
        // 4. Sprawdź czy formularz aukcji jest dostępny
        console.log('\n4. Sprawdzanie formularza aukcji...')
        
        try {
            const formResponse = await fetch(`${baseUrl}/seller/create-auction`)
            if (formResponse.ok) {
                console.log('✅ Formularz aukcji dostępny')
            } else {
                console.log('❌ Formularz aukcji niedostępny:', formResponse.status)
            }
        } catch (error) {
            console.log('❌ Błąd dostępu do formularza:', error.message)
        }
        
        // 5. Sprawdź czy API upload działa
        console.log('\n5. Sprawdzanie API upload...')
        
        try {
            const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
                method: 'POST'
            })
            
            if (uploadResponse.status === 401) {
                console.log('✅ API upload wymaga autoryzacji (oczekiwane)')
            } else {
                console.log(`⚠️  API upload zwróciło status: ${uploadResponse.status}`)
            }
        } catch (error) {
            console.log('❌ Błąd API upload:', error.message)
        }
        
        // 6. Instrukcje dla użytkownika
        console.log('\n6. INSTRUKCJE DLA UŻYTKOWNIKA:')
        console.log('=' .repeat(40))
        console.log('1. Otwórz przeglądarkę i przejdź do: http://localhost:3000')
        console.log('2. Kliknij "Zaloguj się"')
        console.log('3. Wpisz dane:')
        console.log('   Email: admin@palka-golebie.pl')
        console.log('   Hasło: admin123')
        console.log('4. Po zalogowaniu przejdź do: http://localhost:3000/seller/create-auction')
        console.log('5. Wypełnij formularz aukcji:')
        console.log('   - Wybierz kategorię: Gołąb Pocztowy')
        console.log('   - Tytuł: Test Champion (min. 5 znaków)')
        console.log('   - Opis: Testowy gołąb champion (min. 20 znaków)')
        console.log('   - Cena startowa: 500')
        console.log('   - Dodaj przynajmniej jedno zdjęcie')
        console.log('6. Kliknij "Opublikuj aukcję"')
        console.log('7. Sprawdź konsolę przeglądarki (F12) pod kątem błędów')
        
        console.log('\n7. MOŻLIWE PROBLEMY I ROZWIĄZANIA:')
        console.log('=' .repeat(40))
        console.log('❌ Błąd 401 (Unauthorized):')
        console.log('   - Sprawdź czy jesteś zalogowany')
        console.log('   - Odśwież stronę i zaloguj się ponownie')
        console.log('')
        console.log('❌ Błąd 400 (Bad Request):')
        console.log('   - Sprawdź czy wszystkie wymagane pola są wypełnione')
        console.log('   - Sprawdź czy dodałeś przynajmniej jedno zdjęcie')
        console.log('   - Sprawdź czy cena startowa jest większa od 0')
        console.log('')
        console.log('❌ Błąd 500 (Internal Server Error):')
        console.log('   - Sprawdź konsolę serwera (terminal)')
        console.log('   - Sprawdź czy baza danych działa')
        console.log('   - Sprawdź czy katalog uploads istnieje')
        console.log('')
        console.log('❌ Błąd uploadu plików:')
        console.log('   - Sprawdź czy katalog public/uploads istnieje')
        console.log('   - Sprawdź uprawnienia do zapisu')
        console.log('   - Sprawdź czy plik nie jest za duży')
        
        console.log('\n8. DEBUGGING:')
        console.log('=' .repeat(40))
        console.log('🔍 Otwórz konsolę przeglądarki (F12) i sprawdź:')
        console.log('   - Czy są błędy JavaScript')
        console.log('   - Czy requesty HTTP są wysyłane')
        console.log('   - Jakie są odpowiedzi serwera')
        console.log('')
        console.log('🔍 Sprawdź konsolę serwera (terminal):')
        console.log('   - Czy są błędy podczas tworzenia aukcji')
        console.log('   - Czy są błędy podczas uploadu plików')
        console.log('   - Czy są błędy bazy danych')
        
        console.log('\n🎉 INSTRUKCJE GOTOWE!')
        console.log('Teraz możesz przetestować formularz aukcji w przeglądarce.')
        
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
testAuctionForm()
    .then(() => {
        console.log('\n✅ Skrypt zakończony')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Skrypt zakończony z błędem:', error)
        process.exit(1)
    })

