#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('👀 WATCH CLEANUP - CZYSZCZENIE CO MINUTĘ');
console.log('='.repeat(50));

let isRunning = false;
let cleanupCount = 0;

// Funkcja szybkiego czyszczenia
function quickCleanup() {
    if (isRunning) return;
    isRunning = true;

    cleanupCount++;
    const timestamp = new Date().toLocaleString();

    console.log(`\n🧹 [${timestamp}] Szybkie czyszczenie #${cleanupCount}`);

    try {
        // Usuń tylko .next cache
        if (fs.existsSync('.next')) {
            fs.rmSync('.next', { recursive: true, force: true });
            console.log('✅ .next cache usunięty');
        }

        // Usuń pliki .tsbuildinfo
        const tsbuildinfoFiles = findFiles('.', '.tsbuildinfo');
        tsbuildinfoFiles.forEach(file => {
            try {
                fs.unlinkSync(file);
                console.log(`✅ Usunięto ${file}`);
            } catch (error) {
                // Ignoruj błędy
            }
        });

        // Usuń logi
        const logFiles = findFiles('.', '.log');
        logFiles.forEach(file => {
            try {
                fs.unlinkSync(file);
                console.log(`✅ Usunięto ${file}`);
            } catch (error) {
                // Ignoruj błędy
            }
        });

    } catch (error) {
        console.log(`❌ Błąd: ${error.message}`);
    }

    isRunning = false;
}

// Funkcja do znajdowania plików
function findFiles(dir, extension) {
    const files = [];

    if (!fs.existsSync(dir)) return files;

    try {
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                files.push(...findFiles(itemPath, extension));
            } else if (item.endsWith(extension)) {
                files.push(itemPath);
            }
        });
    } catch (error) {
        // Ignoruj błędy dostępu
    }

    return files;
}

// Uruchom czyszczenie co minutę
console.log('⏰ Czyszczenie co 60 sekund...');
console.log('💡 Naciśnij Ctrl+C aby zatrzymać\n');

// Pierwsze czyszczenie od razu
quickCleanup();

const interval = setInterval(quickCleanup, 60000); // 60 sekund

// Obsługa zakończenia
process.on('SIGINT', () => {
    console.log('\n\n🛑 Zatrzymywanie watch cleanup...');
    clearInterval(interval);
    console.log(`📊 Wykonano ${cleanupCount} czyszczeń`);
    console.log('👋 Do widzenia!');
    process.exit(0);
});
