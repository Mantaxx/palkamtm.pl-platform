/**
 * Skrypt testowy do sprawdzenia integracji SMSAPI
 * Uruchom: node scripts/test-smsapi.js
 */

require('dotenv').config({ path: '.env.local' })
const SmsApi = require('smsapi')

async function testSmsApi() {
  console.log('🔧 Testowanie integracji SMSAPI...')
  
  // Sprawdź czy zmienne środowiskowe są ustawione
  if (!process.env.SMSAPI_TOKEN) {
    console.error('❌ Brak SMSAPI_TOKEN w zmiennych środowiskowych')
    console.log('💡 Dodaj SMSAPI_TOKEN do pliku .env.local')
    return
  }
  
  if (!process.env.SMSAPI_SENDER_NAME) {
    console.error('❌ Brak SMSAPI_SENDER_NAME w zmiennych środowiskowych')
    console.log('💡 Dodaj SMSAPI_SENDER_NAME do pliku .env.local')
    return
  }
  
  console.log('✅ Zmienne środowiskowe znalezione')
  console.log('📱 Nadawca:', process.env.SMSAPI_SENDER_NAME)
  
  try {
    // Inicjalizacja SMSAPI
    const smsApi = new SmsApi()
    await smsApi.authentication.loginHashed(process.env.SMSAPI_TOKEN)
    
    console.log('✅ Autoryzacja SMSAPI przebiegła pomyślnie')
    
    // Test wysyłki SMS (zakomentowane - odkomentuj i podaj numer testowy)
    /*
    const testNumber = '48500123456' // Podaj swój numer testowy
    const testMessage = 'Test weryfikacji SMSAPI - kod: 123456'
    
    console.log(`📤 Wysyłanie SMS na numer: ${testNumber}`)
    
    const result = await smsApi.message.sms()
      .from(process.env.SMSAPI_SENDER_NAME)
      .to(testNumber)
      .message(testMessage)
      .execute()
    
    console.log('✅ SMS wysłany pomyślnie!')
    console.log('📋 ID wiadomości:', result.list[0]?.id)
    */
    
    console.log('🎉 Integracja SMSAPI jest gotowa do użycia!')
    console.log('💡 Odkomentuj sekcję testową i podaj swój numer testowy aby wysłać SMS')
    
  } catch (error) {
    console.error('❌ Błąd podczas testowania SMSAPI:', error.message)
    
    if (error.message.includes('authentication')) {
      console.log('💡 Sprawdź czy token SMSAPI jest poprawny')
      console.log('💡 Token można wygenerować w panelu SMSAPI w sekcji "Tokeny API"')
    }
    
    if (error.message.includes('sender')) {
      console.log('💡 Sprawdź czy nazwa nadawcy jest poprawnie ustawiona w panelu SMSAPI')
    }
  }
}

testSmsApi()
