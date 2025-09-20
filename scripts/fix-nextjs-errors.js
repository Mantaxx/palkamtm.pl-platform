#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Naprawiam błędy Next.js...');

// Funkcja do usuwania folderów rekurencyjnie
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Usunięto: ${dirPath}`);
    } catch (error) {
      console.log(`⚠️  Nie można usunąć: ${dirPath} - ${error.message}`);
    }
  }
}

// Funkcja do tworzenia folderów
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Utworzono: ${dirPath}`);
    } catch (error) {
      console.log(`⚠️  Nie można utworzyć: ${dirPath} - ${error.message}`);
    }
  }
}

// Usuń problematyczne foldery
console.log('\n🗑️  Usuwam problematyczne foldery...');
removeDir('.next');
removeDir('node_modules/.cache');
removeDir('node_modules/.next');

// Utwórz brakujące foldery dla mistrzów
console.log('\n📁 Tworzę brakujące foldery...');
const champions = [5, 6, 7, 8, 9];
champions.forEach(id => {
  createDir(`public/champions/${id}/offspring`);
  createDir(`public/champions/${id}/videos`);
});

// Wyczyść npm cache
console.log('\n🧹 Czyszczę npm cache...');
const { execSync } = require('child_process');
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ npm cache wyczyszczony');
} catch (error) {
  console.log('⚠️  Nie można wyczyścić npm cache:', error.message);
}

// Sprawdź package.json
console.log('\n📦 Sprawdzam package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Usuń problematyczne zależności jeśli istnieją
const problematicDeps = ['react-loadable', '@loadable/component'];
problematicDeps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    delete packageJson.dependencies[dep];
    console.log(`✅ Usunięto problematyczną zależność: ${dep}`);
  }
  if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
    delete packageJson.devDependencies[dep];
    console.log(`✅ Usunięto problematyczną zależność dev: ${dep}`);
  }
});

// Zapisz zaktualizowany package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('\n🎉 Naprawa zakończona!');
console.log('\n📋 Następne kroki:');
console.log('1. Uruchom: npm install');
console.log('2. Uruchom: npm run dev');
console.log('\n💡 Jeśli nadal występują błędy, uruchom:');
console.log('   - npm run dev -- --reset-cache');
console.log('   - lub uruchom ponownie terminal jako administrator');
