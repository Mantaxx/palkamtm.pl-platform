#!/usr/bin/env node

/**
 * SKRYPT DIAGNOSTYCZNY - STRONA AUKCJI
 * Dogłębna analiza problemów z renderowaniem strony aukcji
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNOSTYKA STRONY AUKCJI - ROZPOCZYNAM...\n');

// 1. SPRAWDZENIE STRUKTURY PLIKÓW
console.log('📁 1. SPRAWDZANIE STRUKTURY PLIKÓW');
const requiredFiles = [
    'app/auctions/page.tsx',
    'components/auctions/AuctionsPage.tsx',
    'lib/data/auctions.ts',
    'store/useAppStore.ts',
    'components/providers/Providers.tsx',
    'app/layout.tsx'
];

requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${exists ? '✅' : '❌'} ${file} ${exists ? 'ISTNIEJE' : 'BRAK'}`);
    if (!exists) {
        console.log(`      ⚠️  KRYTYCZNY BŁĄD: Brak pliku ${file}`);
    }
});

// 2. SPRAWDZENIE IMPORTOW W AUKCJEPAGE
console.log('\n📦 2. SPRAWDZANIE IMPORTOW W AUKCJEPAGE');
const auctionsPagePath = 'components/auctions/AuctionsPage.tsx';
if (fs.existsSync(auctionsPagePath)) {
    const content = fs.readFileSync(auctionsPagePath, 'utf8');

    // Sprawdź importy
    const imports = content.match(/import.*from.*['"][^'"]+['"]/g) || [];
    console.log('   Importy znalezione:');
    imports.forEach(imp => {
        console.log(`   ✅ ${imp}`);
    });

    // Sprawdź czy są błędy w importach
    const missingImports = [];
    if (content.includes('useSession') && !content.includes("import { useSession }") && !content.includes("import { useSession,")) {
        missingImports.push('useSession');
    }
    if (content.includes('AuctionData') && !content.includes("AuctionData }")) {
        missingImports.push('AuctionData');
    }

    if (missingImports.length > 0) {
        console.log('   ❌ BRAKUJĄCE IMPORTY:');
        missingImports.forEach(imp => console.log(`      - ${imp}`));
    }
}

// 3. SPRAWDZENIE DANYCH AUKCJI
console.log('\n📊 3. SPRAWDZANIE DANYCH AUKCJI');
const auctionsDataPath = 'lib/data/auctions.ts';
if (fs.existsSync(auctionsDataPath)) {
    const content = fs.readFileSync(auctionsDataPath, 'utf8');

    // Sprawdź czy AUCTIONS_DATA jest eksportowany
    const hasExport = content.includes('export const AUCTIONS_DATA');
    console.log(`   ${hasExport ? '✅' : '❌'} AUCTIONS_DATA jest eksportowany`);

    // Sprawdź czy są dane
    const dataMatch = content.match(/export const AUCTIONS_DATA: AuctionData\[\] = \[([\s\S]*?)\]/);
    if (dataMatch) {
        const dataContent = dataMatch[1];
        const auctionCount = (dataContent.match(/{/g) || []).length;
        console.log(`   ${auctionCount > 0 ? '✅' : '❌'} Liczba aukcji: ${auctionCount}`);

        if (auctionCount === 0) {
            console.log('   ⚠️  BRAK DANYCH AUKCJI - to może być przyczyna pustej strony');
        }
    }

    // Sprawdź interfejs AuctionData
    const hasInterface = content.includes('export interface AuctionData');
    console.log(`   ${hasInterface ? '✅' : '❌'} Interfejs AuctionData jest zdefiniowany`);
}

// 4. SPRAWDZENIE STORE
console.log('\n🏪 4. SPRAWDZANIE STORE');
const storePath = 'store/useAppStore.ts';
if (fs.existsSync(storePath)) {
    const content = fs.readFileSync(storePath, 'utf8');

    // Sprawdź czy AuctionData jest importowany
    const hasAuctionDataImport = content.includes("import { AuctionData }");
    console.log(`   ${hasAuctionDataImport ? '✅' : '❌'} AuctionData jest importowany w store`);

    // Sprawdź czy setAuctions jest zdefiniowany
    const hasSetAuctions = content.includes('setAuctions: (auctions: AuctionData[]) => void');
    console.log(`   ${hasSetAuctions ? '✅' : '❌'} setAuctions jest zdefiniowany`);

    // Sprawdź czy getFilteredAuctions jest zdefiniowany
    const hasGetFiltered = content.includes('getFilteredAuctions: () => AuctionData[]');
    console.log(`   ${hasGetFiltered ? '✅' : '❌'} getFilteredAuctions jest zdefiniowany`);

    // Sprawdź implementację getFilteredAuctions
    const getFilteredMatch = content.match(/getFilteredAuctions: \(\) => \{([\s\S]*?)\},/);
    if (getFilteredMatch) {
        const implementation = getFilteredMatch[1];
        const hasReturn = implementation.includes('return filtered');
        console.log(`   ${hasReturn ? '✅' : '❌'} getFilteredAuctions ma return statement`);
    }
}

// 5. SPRAWDZENIE KOMPONENTU AUKCJEPAGE
console.log('\n🎨 5. SPRAWDZANIE KOMPONENTU AUKCJEPAGE');
if (fs.existsSync(auctionsPagePath)) {
    const content = fs.readFileSync(auctionsPagePath, 'utf8');

    // Sprawdź czy useEffect jest zdefiniowany
    const hasUseEffect = content.includes('useEffect(');
    console.log(`   ${hasUseEffect ? '✅' : '❌'} useEffect jest zdefiniowany`);

    // Sprawdź czy setAuctions jest wywoływany
    const hasSetAuctionsCall = content.includes('setAuctions(');
    console.log(`   ${hasSetAuctionsCall ? '✅' : '❌'} setAuctions jest wywoływany`);

    // Sprawdź czy setLoading jest wywoływany
    const hasSetLoadingCall = content.includes('setLoading(');
    console.log(`   ${hasSetLoadingCall ? '✅' : '❌'} setLoading jest wywoływany`);

    // Sprawdź czy getFilteredAuctions jest używany
    const hasGetFilteredCall = content.includes('getFilteredAuctions()');
    console.log(`   ${hasGetFilteredCall ? '✅' : '❌'} getFilteredAuctions jest używany`);

    // Sprawdź czy jest loading state
    const hasLoadingState = content.includes('if (isLoading)');
    console.log(`   ${hasLoadingState ? '✅' : '❌'} Loading state jest zdefiniowany`);

    // Sprawdź czy jest error state
    const hasErrorState = content.includes('if (error)');
    console.log(`   ${hasErrorState ? '✅' : '❌'} Error state jest zdefiniowany`);

    // Sprawdź czy jest renderowanie aukcji
    const hasAuctionRendering = content.includes('statusFilteredAuctions.map');
    console.log(`   ${hasAuctionRendering ? '✅' : '❌'} Renderowanie aukcji jest zdefiniowane`);
}

// 6. SPRAWDZENIE LAYOUT I PROVIDERS
console.log('\n🏗️ 6. SPRAWDZENIE LAYOUT I PROVIDERS');
const layoutPath = 'app/layout.tsx';
if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');

    // Sprawdź czy Providers jest używany
    const hasProviders = content.includes('<Providers>');
    console.log(`   ${hasProviders ? '✅' : '❌'} Providers jest używany w layout`);

    // Sprawdź czy ErrorBoundary jest używany
    const hasErrorBoundary = content.includes('<ErrorBoundary>');
    console.log(`   ${hasErrorBoundary ? '✅' : '❌'} ErrorBoundary jest używany`);
}

const providersPath = 'components/providers/Providers.tsx';
if (fs.existsSync(providersPath)) {
    const content = fs.readFileSync(providersPath, 'utf8');

    // Sprawdź czy SessionProvider jest używany
    const hasSessionProvider = content.includes('<SessionProvider>');
    console.log(`   ${hasSessionProvider ? '✅' : '❌'} SessionProvider jest używany`);

    // Sprawdź czy QueryClientProvider jest używany
    const hasQueryClient = content.includes('<QueryClientProvider') || content.includes('QueryClientProvider>') || content.includes('QueryClientProvider');
    console.log(`   ${hasQueryClient ? '✅' : '❌'} QueryClientProvider jest używany`);
}

// 7. SPRAWDZENIE NEXT.CONFIG.JS
console.log('\n⚙️ 7. SPRAWDZENIE KONFIGURACJI NEXT.JS');
const nextConfigPath = 'next.config.js';
if (fs.existsSync(nextConfigPath)) {
    const content = fs.readFileSync(nextConfigPath, 'utf8');

    // Sprawdź czy webpack jest skonfigurowany
    const hasWebpack = content.includes('webpack:');
    console.log(`   ${hasWebpack ? '✅' : '❌'} Webpack jest skonfigurowany`);

    // Sprawdź czy są ignoreWarnings
    const hasIgnoreWarnings = content.includes('ignoreWarnings');
    console.log(`   ${hasIgnoreWarnings ? '✅' : '❌'} ignoreWarnings jest skonfigurowany`);
}

// 8. SPRAWDZENIE PACKAGE.JSON
console.log('\n📦 8. SPRAWDZENIE ZALEŻNOŚCI');
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Sprawdź kluczowe zależności
    const requiredDeps = ['next', 'react', 'react-dom', 'zustand', 'next-auth', 'framer-motion'];
    requiredDeps.forEach(dep => {
        const hasDep = content.dependencies && content.dependencies[dep];
        console.log(`   ${hasDep ? '✅' : '❌'} ${dep}: ${hasDep || 'BRAK'}`);
    });
}

// 9. SPRAWDZENIE TYPÓW
console.log('\n🔧 9. SPRAWDZENIE TYPÓW');
const tsConfigPath = 'tsconfig.json';
if (fs.existsSync(tsConfigPath)) {
    const content = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

    // Sprawdź czy strict jest włączony
    const strict = content.compilerOptions && content.compilerOptions.strict;
    console.log(`   ${strict ? '✅' : '⚠️'} Strict mode: ${strict ? 'WŁĄCZONY' : 'WYŁĄCZONY'}`);

    // Sprawdź czy są path mappings
    const hasPaths = content.compilerOptions && content.compilerOptions.paths;
    console.log(`   ${hasPaths ? '✅' : '❌'} Path mappings: ${hasPaths ? 'SKONFIGUROWANE' : 'BRAK'}`);
}

// 10. PODSUMOWANIE I REKOMENDACJE
console.log('\n📋 10. PODSUMOWANIE I REKOMENDACJE');

console.log('\n🔍 NAJWAŻNIEJSZE PUNKTY DO SPRAWDZENIA:');
console.log('   1. Otwórz konsolę przeglądarki (F12) i sprawdź czy są logi debug');
console.log('   2. Sprawdź czy serwer działa na porcie 3001 (nie 3000)');
console.log('   3. Sprawdź czy nie ma błędów JavaScript w konsoli');
console.log('   4. Sprawdź czy dane aukcji są ładowane do store');
console.log('   5. Sprawdź czy getFilteredAuctions zwraca dane');

console.log('\n🚀 KROKI DO WYKONANIA:');
console.log('   1. Uruchom: npm run dev');
console.log('   2. Otwórz: http://localhost:3001/auctions');
console.log('   3. Otwórz konsolę przeglądarki (F12)');
console.log('   4. Sprawdź logi debug w konsoli');
console.log('   5. Sprawdź czy są błędy JavaScript');

console.log('\n💡 MOŻLIWE PRZYCZYNY PUSTEJ STRONY:');
console.log('   - useEffect się nie wykonuje');
console.log('   - setLoading nie jest wywoływany');
console.log('   - getFilteredAuctions zwraca pustą tablicę');
console.log('   - Błąd JavaScript blokuje renderowanie');
console.log('   - Problem z importami lub typami');

console.log('\n✅ DIAGNOSTYKA ZAKOŃCZONA');
