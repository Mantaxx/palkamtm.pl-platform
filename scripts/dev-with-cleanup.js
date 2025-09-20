#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 URUCHAMIANIE DEV SERVER Z AUTOMATYCZNYM CZYSZCZENIEM');
console.log('='.repeat(60));

// Uruchom automatyczne czyszczenie w tle
console.log('🤖 Uruchamianie automatycznego czyszczenia...');
const cleanupProcess = spawn('node', ['scripts/auto-cleanup.js'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Uruchom development server
console.log('🌐 Uruchamianie development server...');
const devProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Obsługa zakończenia procesów
process.on('SIGINT', () => {
  console.log('\n🛑 Zatrzymywanie wszystkich procesów...');
  
  cleanupProcess.kill('SIGINT');
  devProcess.kill('SIGINT');
  
  setTimeout(() => {
    process.exit(0);
  }, 2000);
});

// Obsługa błędów
cleanupProcess.on('error', (error) => {
  console.log(`❌ Błąd automatycznego czyszczenia: ${error.message}`);
});

devProcess.on('error', (error) => {
  console.log(`❌ Błąd development server: ${error.message}`);
});

cleanupProcess.on('exit', (code) => {
  console.log(`🤖 Automatyczne czyszczenie zakończone z kodem: ${code}`);
});

devProcess.on('exit', (code) => {
  console.log(`🌐 Development server zakończony z kodem: ${code}`);
  cleanupProcess.kill('SIGINT');
  process.exit(code);
});

console.log('\n✅ Oba procesy uruchomione!');
console.log('💡 Naciśnij Ctrl+C aby zatrzymać wszystko');
