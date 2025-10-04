#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Naprawiam problemy z webpack-runtime...');

const projectRoot = process.cwd();
const nextDir = path.join(projectRoot, '.next');
const serverDir = path.join(nextDir, 'server');

// Funkcja do tworzenia katalogów z odpowiednimi uprawnieniami
function ensureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true, mode: 0o755 });
      console.log(`✅ Utworzono katalog: ${dirPath}`);
    }
  } catch (error) {
    console.error(`❌ Błąd tworzenia katalogu ${dirPath}:`, error.message);
  }
}

// Funkcja do naprawy uprawnień
function fixPermissions(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.chmodSync(filePath, 0o644);
      console.log(`✅ Naprawiono uprawnienia: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Błąd uprawnień ${filePath}:`, error.message);
  }
}

// Funkcja do usuwania problematycznych plików
function cleanupProblematicFiles() {
  const problematicFiles = [
    path.join(serverDir, 'webpack-runtime.js'),
    path.join(serverDir, 'webpack-api-runtime.js'),
    path.join(nextDir, 'cache'),
    path.join(nextDir, 'server', 'chunks'),
  ];

  problematicFiles.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
        console.log(`🗑️ Usunięto problematyczny plik/folder: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Błąd usuwania ${filePath}:`, error.message);
    }
  });
}

// Główna funkcja naprawy
function fixWebpackRuntimeErrors() {
  console.log('🚀 Rozpoczynam naprawę...');
  
  // 1. Wyczyść problematyczne pliki
  cleanupProblematicFiles();
  
  // 2. Upewnij się, że katalogi istnieją
  ensureDir(nextDir);
  ensureDir(serverDir);
  
  // 3. Utwórz pusty plik webpack-runtime.js jeśli nie istnieje
  const webpackRuntimePath = path.join(serverDir, 'webpack-runtime.js');
  try {
    if (!fs.existsSync(webpackRuntimePath)) {
      fs.writeFileSync(webpackRuntimePath, '// Webpack runtime placeholder\nmodule.exports = {};', 'utf8');
      console.log(`✅ Utworzono placeholder: ${webpackRuntimePath}`);
    }
    fixPermissions(webpackRuntimePath);
  } catch (error) {
    console.error(`❌ Błąd tworzenia webpack-runtime.js:`, error.message);
  }
  
  console.log('✅ Naprawa zakończona!');
}

// Uruchom naprawę
fixWebpackRuntimeErrors();

// Export dla użycia jako moduł
module.exports = { fixWebpackRuntimeErrors };
