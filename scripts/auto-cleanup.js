#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 AUTOMATYCZNE CZYSZCZENIE CACHE - START');
console.log('='.repeat(50));

// Konfiguracja
const CONFIG = {
  // Interwał czyszczenia w milisekundach (5 minut)
  CLEANUP_INTERVAL: 5 * 60 * 1000,
  
  // Maksymalny rozmiar cache w MB
  MAX_CACHE_SIZE_MB: 100,
  
  // Katalogi do czyszczenia
  CACHE_DIRS: [
    '.next',
    'node_modules/.cache',
    '.turbo',
    'dist',
    'build',
    'out'
  ],
  
  // Pliki do usuwania
  TEMP_FILES: [
    '.tsbuildinfo',
    '*.log',
    '*.tmp',
    '.DS_Store',
    'Thumbs.db'
  ]
};

let cleanupCount = 0;
let isRunning = false;

// Funkcja do sprawdzania rozmiaru katalogu
function getDirectorySize(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  
  let totalSize = 0;
  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          totalSize += getDirectorySize(filePath);
        } else {
          totalSize += stat.size;
        }
      } catch (error) {
        // Ignoruj błędy dostępu do plików
      }
    });
  } catch (error) {
    // Ignoruj błędy dostępu do katalogu
  }
  
  return totalSize;
}

// Funkcja do formatowania rozmiaru
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Funkcja czyszczenia cache
function cleanupCache() {
  if (isRunning) return;
  isRunning = true;
  
  cleanupCount++;
  const timestamp = new Date().toLocaleString();
  
  console.log(`\n🧹 [${timestamp}] Czyszczenie #${cleanupCount}`);
  console.log('-'.repeat(40));
  
  let totalCleaned = 0;
  
  // Czyszczenie katalogów cache
  CONFIG.CACHE_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        const sizeBefore = getDirectorySize(dir);
        fs.rmSync(dir, { recursive: true, force: true });
        totalCleaned += sizeBefore;
        console.log(`✅ ${dir} - ${formatBytes(sizeBefore)}`);
      } catch (error) {
        console.log(`❌ Błąd usuwania ${dir}: ${error.message}`);
      }
    }
  });
  
  // Czyszczenie plików tymczasowych
  function removeTempFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            removeTempFiles(filePath);
          } else {
            CONFIG.TEMP_FILES.forEach(pattern => {
              if (file.includes(pattern.replace('*', ''))) {
                const fileSize = stat.size;
                fs.unlinkSync(filePath);
                totalCleaned += fileSize;
                console.log(`✅ ${filePath} - ${formatBytes(fileSize)}`);
              }
            });
          }
        } catch (error) {
          // Ignoruj błędy dostępu do plików
        }
      });
    } catch (error) {
      // Ignoruj błędy dostępu do katalogu
    }
  }
  
  removeTempFiles('.');
  
  console.log(`📊 Łącznie wyczyszczono: ${formatBytes(totalCleaned)}`);
  
  // Sprawdź rozmiar node_modules
  const nodeModulesSize = getDirectorySize('node_modules');
  const nodeModulesSizeMB = nodeModulesSize / (1024 * 1024);
  
  if (nodeModulesSizeMB > CONFIG.MAX_CACHE_SIZE_MB) {
    console.log(`⚠️ node_modules za duży (${formatBytes(nodeModulesSize)}) - rozważ reinstalację`);
  }
  
  isRunning = false;
}

// Funkcja do sprawdzania czy aplikacja działa
function checkAppStatus() {
  try {
    // Sprawdź czy port 3000 jest używany
    execSync('netstat -an | findstr :3000', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Główna pętla
function startAutoCleanup() {
  console.log(`⏰ Interwał czyszczenia: ${CONFIG.CLEANUP_INTERVAL / 1000} sekund`);
  console.log(`📏 Maksymalny rozmiar cache: ${CONFIG.MAX_CACHE_SIZE_MB} MB`);
  console.log(`🎯 Katalogi do czyszczenia: ${CONFIG.CACHE_DIRS.join(', ')}`);
  console.log('\n🔄 Automatyczne czyszczenie uruchomione...');
  console.log('💡 Naciśnij Ctrl+C aby zatrzymać\n');
  
  // Pierwsze czyszczenie od razu
  cleanupCache();
  
  // Ustaw interwał
  const interval = setInterval(() => {
    cleanupCache();
  }, CONFIG.CLEANUP_INTERVAL);
  
  // Obsługa zakończenia
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Zatrzymywanie automatycznego czyszczenia...');
    clearInterval(interval);
    console.log(`📊 Wykonano ${cleanupCount} czyszczeń`);
    console.log('👋 Do widzenia!');
    process.exit(0);
  });
  
  // Obsługa błędów
  process.on('uncaughtException', (error) => {
    console.log(`\n❌ Błąd: ${error.message}`);
    console.log('🔄 Restartowanie...');
    setTimeout(() => {
      startAutoCleanup();
    }, 5000);
  });
}

// Sprawdź czy aplikacja jest uruchomiona
if (checkAppStatus()) {
  console.log('✅ Aplikacja działa na porcie 3000');
} else {
  console.log('ℹ️ Aplikacja nie jest uruchomiona');
}

// Uruchom automatyczne czyszczenie
startAutoCleanup();
