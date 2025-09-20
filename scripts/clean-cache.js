#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 CZYSZCZENIE CACHE - DUŻY SPRZĄTACZ');
console.log('='.repeat(50));

const cacheDirs = [
  '.next',
  'node_modules/.cache',
  '.turbo',
  'dist',
  'build',
  'out'
];

const tempDirs = [
  'temp',
  'tmp',
  '.tmp'
];

console.log('\n🗑️ 1. USUWANIE KATALOGÓW CACHE');
console.log('-'.repeat(30));

cacheDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      console.log(`🧹 Usuwanie ${dir}...`);
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ ${dir} usunięty`);
    } catch (error) {
      console.log(`❌ Błąd usuwania ${dir}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️ ${dir} nie istnieje`);
  }
});

console.log('\n🗑️ 2. USUWANIE KATALOGÓW TYMCZASOWYCH');
console.log('-'.repeat(30));

tempDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      console.log(`🧹 Usuwanie ${dir}...`);
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ ${dir} usunięty`);
    } catch (error) {
      console.log(`❌ Błąd usuwania ${dir}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️ ${dir} nie istnieje`);
  }
});

console.log('\n🗑️ 3. CZYSZCZENIE NPM CACHE');
console.log('-'.repeat(30));

try {
  console.log('🧹 Czyszczenie npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ npm cache wyczyszczony');
} catch (error) {
  console.log(`❌ Błąd czyszczenia npm cache: ${error.message}`);
}

console.log('\n🗑️ 4. USUWANIE PLIKÓW TYMCZASOWYCH');
console.log('-'.repeat(30));

const tempFiles = [
  '.tsbuildinfo',
  '*.log',
  '*.tmp',
  '.DS_Store',
  'Thumbs.db'
];

// Funkcja do rekurencyjnego usuwania plików
function removeFilesRecursively(dir, patterns) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      removeFilesRecursively(filePath, patterns);
    } else {
      patterns.forEach(pattern => {
        if (file.includes(pattern.replace('*', ''))) {
          try {
            fs.unlinkSync(filePath);
            console.log(`✅ Usunięto ${filePath}`);
          } catch (error) {
            console.log(`❌ Błąd usuwania ${filePath}: ${error.message}`);
          }
        }
      });
    }
  });
}

// Usuwanie plików tymczasowych z całego projektu
removeFilesRecursively('.', tempFiles);

console.log('\n🗑️ 5. CZYSZCZENIE LOCKFILE');
console.log('-'.repeat(30));

const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
lockFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      console.log(`🧹 Usuwanie ${file}...`);
      fs.unlinkSync(file);
      console.log(`✅ ${file} usunięty`);
    } catch (error) {
      console.log(`❌ Błąd usuwania ${file}: ${error.message}`);
    }
  }
});

console.log('\n🗑️ 6. CZYSZCZENIE ENVIRONMENT FILES');
console.log('-'.repeat(30));

const envFiles = ['.env.local', '.env.development.local', '.env.test.local'];
envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      console.log(`🧹 Usuwanie ${file}...`);
      fs.unlinkSync(file);
      console.log(`✅ ${file} usunięty`);
    } catch (error) {
      console.log(`❌ Błąd usuwania ${file}: ${error.message}`);
    }
  }
});

console.log('\n🔧 7. REINSTALACJA ZALEŻNOŚCI');
console.log('-'.repeat(30));

try {
  console.log('📦 Instalowanie zależności...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Zależności zainstalowane');
} catch (error) {
  console.log(`❌ Błąd instalacji: ${error.message}`);
}

console.log('\n📊 8. SPRAWDZENIE ROZMIARU PROJEKTU');
console.log('-'.repeat(30));

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  if (!fs.existsSync(dirPath)) return 0;
  
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stat.size;
    }
  });
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const projectSize = getDirectorySize('.');
console.log(`📏 Rozmiar projektu: ${formatBytes(projectSize)}`);

const nodeModulesSize = getDirectorySize('node_modules');
console.log(`📦 Rozmiar node_modules: ${formatBytes(nodeModulesSize)}`);

console.log('\n' + '='.repeat(50));
console.log('🎉 CZYSZCZENIE ZAKOŃCZONE!');
console.log('='.repeat(50));

console.log('\n📋 REKOMENDACJE:');
console.log('1. Uruchom: npm run dev (sprawdź czy aplikacja działa)');
console.log('2. Uruchom: npm run build (sprawdź czy build działa)');
console.log('3. Sprawdź czy wszystkie funkcje działają poprawnie');

console.log('\n💡 TIP: Uruchamiaj ten skrypt regularnie:');
console.log('   node scripts/clean-cache.js');

process.exit(0);
