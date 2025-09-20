#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 Uruchamiam serwer deweloperski z czyszczeniem cache...');

// Usuń .next folder
if (fs.existsSync('.next')) {
    try {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('✅ Usunięto folder .next');
    } catch (error) {
        console.log('⚠️  Nie można usunąć .next:', error.message);
    }
}

// Uruchom serwer z reset cache
const devProcess = spawn('npm', ['run', 'dev', '--', '--reset-cache'], {
    stdio: 'inherit',
    shell: true
});

devProcess.on('error', (error) => {
    console.error('❌ Błąd uruchamiania serwera:', error);
});

devProcess.on('close', (code) => {
    console.log(`🔚 Serwer zakończył działanie z kodem: ${code}`);
});

// Obsługa Ctrl+C
process.on('SIGINT', () => {
    console.log('\n🛑 Zatrzymuję serwer...');
    devProcess.kill('SIGINT');
    process.exit(0);
});
