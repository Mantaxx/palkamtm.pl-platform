#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Naprawiam problemy z cache Next.js na Windows...\n');

// Funkcja do bezpiecznego usuwania folderów
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      // Użyj PowerShell dla lepszego usuwania na Windows
      execSync(`powershell -Command "Remove-Item -Path '${dirPath}' -Recurse -Force -ErrorAction SilentlyContinue"`, { stdio: 'ignore' });
      console.log(`✅ Usunięto ${dirPath}`);
    } catch (error) {
      try {
        // Fallback do standardowego usuwania
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`✅ Usunięto ${dirPath} (fallback)`);
      } catch (fallbackError) {
        console.log(`⚠️  Nie można usunąć ${dirPath}: ${fallbackError.message}`);
      }
    }
  }
}

// Funkcja do czyszczenia plików tymczasowych
function cleanTempFiles() {
  const tempDirs = [
    '.next',
    'node_modules/.cache',
    'node_modules/.next',
    'node_modules/.swc',
    '.turbo',
    'dist',
    'build',
    'out'
  ];

  console.log('🧹 Czyszczę foldery cache...');
  tempDirs.forEach(dir => removeDir(dir));

  // Usuń pliki .tsbuildinfo
  console.log('\n🧹 Czyszczę pliki TypeScript cache...');
  const tsbuildinfoFiles = findFiles('.', '.tsbuildinfo');
  tsbuildinfoFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
      console.log(`✅ Usunięto ${file}`);
    } catch (error) {
      // Ignoruj błędy
    }
  });

  // Usuń pliki log
  console.log('\n🧹 Czyszczę pliki log...');
  const logFiles = findFiles('.', '.log');
  logFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
      console.log(`✅ Usunięto ${file}`);
    } catch (error) {
      // Ignoruj błędy
    }
  });
}

// Funkcja do znajdowania plików
function findFiles(dir, extension) {
  const files = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...findFiles(fullPath, extension));
      } else if (item.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignoruj błędy
  }
  return files;
}

// Wyczyść npm cache
function cleanNpmCache() {
  console.log('\n🧹 Czyszczę npm cache...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ npm cache wyczyszczony');
  } catch (error) {
    console.log('⚠️  Nie można wyczyścić npm cache:', error.message);
  }
}

// Wyczyść Windows temp files
function cleanWindowsTemp() {
  console.log('\n🧹 Czyszczę Windows temp files...');
  try {
    // Wyczyść temp folder użytkownika
    const tempPath = process.env.TEMP || process.env.TMP || 'C:\\Windows\\Temp';
    execSync(`powershell -Command "Get-ChildItem -Path '${tempPath}' -Filter '*next*' -Recurse -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue"`, { stdio: 'ignore' });
    console.log('✅ Windows temp files wyczyszczone');
  } catch (error) {
    console.log('⚠️  Nie można wyczyścić Windows temp:', error.message);
  }
}

// Sprawdź uprawnienia
function checkPermissions() {
  console.log('\n🔍 Sprawdzam uprawnienia...');
  try {
    // Sprawdź czy można pisać do folderu projektu
    const testFile = path.join(process.cwd(), '.permission-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ Uprawnienia do zapisu OK');
  } catch (error) {
    console.log('❌ Problemy z uprawnieniami:', error.message);
    console.log('💡 Spróbuj uruchomić jako administrator');
  }
}

// Główna funkcja
function main() {
  console.log('='.repeat(60));
  console.log('🔧 NAPRAWA PROBLEMÓW Z CACHE NEXT.JS NA WINDOWS');
  console.log('='.repeat(60));

  checkPermissions();
  cleanTempFiles();
  cleanNpmCache();
  cleanWindowsTemp();

  console.log('\n' + '='.repeat(60));
  console.log('✅ Czyszczenie zakończone!');
  console.log('💡 Teraz uruchom: npm run dev');
  console.log('='.repeat(60));
}

// Uruchom jeśli wywołany bezpośrednio
if (require.main === module) {
  main();
}

module.exports = { main, cleanTempFiles, cleanNpmCache };
