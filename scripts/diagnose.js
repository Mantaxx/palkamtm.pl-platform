#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 DIAGNOSTYKA APLIKACJI NEXT.JS - GŁĘBOKA ANALIZA');
console.log('='.repeat(60));

const issues = [];
const warnings = [];
const fixes = [];

// 1. SPRAWDZENIE STRUKTURY PROJEKTU
console.log('\n📁 1. ANALIZA STRUKTURY PROJEKTU');
console.log('-'.repeat(40));

const requiredFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'tailwind.config.js',
  'prisma/schema.prisma',
  'middleware.ts',
  'app/layout.tsx',
  'app/page.tsx'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    issues.push(`❌ Brakuje pliku: ${file}`);
  }
});

// 2. SPRAWDZENIE ZALEŻNOŚCI
console.log('\n📦 2. ANALIZA ZALEŻNOŚCI');
console.log('-'.repeat(40));

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const criticalDeps = [
    'next',
    'react',
    'react-dom',
    '@next-auth/prisma-adapter',
    'next-auth',
    'prisma',
    '@prisma/client',
    'tailwindcss',
    'typescript'
  ];

  criticalDeps.forEach(dep => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      issues.push(`❌ Brakuje zależności: ${dep}`);
    }
  });

  // Sprawdzenie wersji Next.js
  const nextVersion = packageJson.dependencies.next;
  if (nextVersion) {
    console.log(`📋 Next.js version: ${nextVersion}`);
    if (nextVersion.includes('15')) {
      warnings.push('⚠️ Używasz Next.js 15 - sprawdź kompatybilność z bibliotekami');
    }
  }

} catch (error) {
  issues.push(`❌ Błąd odczytu package.json: ${error.message}`);
}

// 3. SPRAWDZENIE KONFIGURACJI TYPESCRIPT
console.log('\n🔧 3. ANALIZA KONFIGURACJI TYPESCRIPT');
console.log('-'.repeat(40));

try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  
  if (!tsconfig.compilerOptions) {
    issues.push('❌ Brakuje compilerOptions w tsconfig.json');
  } else {
    const requiredOptions = {
      'strict': true,
      'esModuleInterop': true,
      'skipLibCheck': true,
      'forceConsistentCasingInFileNames': true
    };

    Object.entries(requiredOptions).forEach(([key, value]) => {
      if (tsconfig.compilerOptions[key] === value) {
        console.log(`✅ ${key}: ${value}`);
      } else {
        warnings.push(`⚠️ ${key} powinno być ustawione na ${value}`);
      }
    });

    // Sprawdzenie target
    if (tsconfig.compilerOptions.target === 'es2015' || 
        tsconfig.compilerOptions.target === 'es2017' || 
        tsconfig.compilerOptions.target === 'es2018') {
      console.log(`✅ target: ${tsconfig.compilerOptions.target}`);
    } else {
      warnings.push(`⚠️ target może być za niski: ${tsconfig.compilerOptions.target}`);
    }
  }
} catch (error) {
  issues.push(`❌ Błąd odczytu tsconfig.json: ${error.message}`);
}

// 4. SPRAWDZENIE KONFIGURACJI NEXT.JS
console.log('\n⚙️ 4. ANALIZA KONFIGURACJI NEXT.JS');
console.log('-'.repeat(40));

try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  
  if (nextConfig.includes('experimental')) {
    console.log('✅ Znaleziono konfigurację experimental');
  } else {
    warnings.push('⚠️ Brak konfiguracji experimental');
  }

  if (nextConfig.includes('optimizePackageImports')) {
    console.log('✅ optimizePackageImports włączone');
  }

} catch (error) {
  issues.push(`❌ Błąd odczytu next.config.js: ${error.message}`);
}

// 5. SPRAWDZENIE BŁĘDÓW TYPESCRIPT
console.log('\n🔍 5. SPRAWDZENIE BŁĘDÓW TYPESCRIPT');
console.log('-'.repeat(40));

try {
  const tscOutput = execSync('npx tsc --noEmit --pretty', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  if (tscOutput.trim() === '') {
    console.log('✅ Brak błędów TypeScript');
  } else {
    console.log('❌ Znaleziono błędy TypeScript:');
    console.log(tscOutput);
    issues.push('❌ Błędy TypeScript wymagają naprawy');
  }
} catch (error) {
  console.log('❌ Błąd podczas sprawdzania TypeScript:');
  console.log(error.stdout || error.message);
  issues.push('❌ Błędy TypeScript wymagają naprawy');
}

// 6. SPRAWDZENIE BŁĘDÓW ESLINT
console.log('\n🔍 6. SPRAWDZENIE BŁĘDÓW ESLINT');
console.log('-'.repeat(40));

try {
  const eslintOutput = execSync('npx eslint . --ext .ts,.tsx --format=compact', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  if (eslintOutput.trim() === '') {
    console.log('✅ Brak błędów ESLint');
  } else {
    console.log('⚠️ Znaleziono ostrzeżenia ESLint:');
    console.log(eslintOutput);
    warnings.push('⚠️ Ostrzeżenia ESLint');
  }
} catch (error) {
  if (error.status !== 1) { // ESLint zwraca 1 gdy znajdzie błędy
    console.log('❌ Błąd podczas sprawdzania ESLint:');
    console.log(error.stdout || error.message);
  }
}

// 7. SPRAWDZENIE PLIKÓW KONFIGURACYJNYCH
console.log('\n📋 7. ANALIZA PLIKÓW KONFIGURACYJNYCH');
console.log('-'.repeat(40));

// Sprawdzenie .env
const envFiles = ['.env', '.env.local', '.env.example'];
envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} istnieje`);
    
    if (file === '.env.example') {
      const content = fs.readFileSync(file, 'utf8');
      const requiredVars = [
        'DATABASE_URL',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET'
      ];
      
      requiredVars.forEach(varName => {
        if (content.includes(varName)) {
          console.log(`  ✅ ${varName}`);
        } else {
          warnings.push(`⚠️ Brakuje ${varName} w .env.example`);
        }
      });
    }
  } else {
    warnings.push(`⚠️ Brakuje pliku ${file}`);
  }
});

// 8. SPRAWDZENIE STRUKTURY APP ROUTER
console.log('\n📁 8. ANALIZA STRUKTURY APP ROUTER');
console.log('-'.repeat(40));

const appDir = 'app';
if (fs.existsSync(appDir)) {
  console.log('✅ Katalog app/ istnieje');
  
  // Sprawdzenie layout.tsx
  if (fs.existsSync('app/layout.tsx')) {
    console.log('✅ app/layout.tsx istnieje');
  } else {
    issues.push('❌ Brakuje app/layout.tsx');
  }
  
  // Sprawdzenie page.tsx
  if (fs.existsSync('app/page.tsx')) {
    console.log('✅ app/page.tsx istnieje');
  } else {
    issues.push('❌ Brakuje app/page.tsx');
  }
  
  // Sprawdzenie middleware.ts
  if (fs.existsSync('middleware.ts')) {
    console.log('✅ middleware.ts istnieje');
  } else {
    warnings.push('⚠️ Brakuje middleware.ts');
  }
} else {
  issues.push('❌ Brakuje katalogu app/');
}

// 9. SPRAWDZENIE PRISMA
console.log('\n🗄️ 9. ANALIZA KONFIGURACJI PRISMA');
console.log('-'.repeat(40));

if (fs.existsSync('prisma/schema.prisma')) {
  console.log('✅ Prisma schema istnieje');
  
  try {
    const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
    
    if (schema.includes('generator client')) {
      console.log('✅ Generator Prisma Client skonfigurowany');
    } else {
      issues.push('❌ Brakuje generator client w schema.prisma');
    }
    
    if (schema.includes('datasource db')) {
      console.log('✅ Datasource skonfigurowany');
    } else {
      issues.push('❌ Brakuje datasource w schema.prisma');
    }
    
  } catch (error) {
    issues.push(`❌ Błąd odczytu schema.prisma: ${error.message}`);
  }
} else {
  issues.push('❌ Brakuje prisma/schema.prisma');
}

// 10. SPRAWDZENIE KOMPONENTÓW
console.log('\n🧩 10. ANALIZA KOMPONENTÓW');
console.log('-'.repeat(40));

const componentsDir = 'components';
if (fs.existsSync(componentsDir)) {
  console.log('✅ Katalog components/ istnieje');
  
  // Sprawdzenie czy komponenty używają 'use client' gdzie potrzeba
  const checkComponent = (filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('useState') || 
          content.includes('useEffect') || 
          content.includes('onClick') ||
          content.includes('onChange')) {
        
        if (!content.includes("'use client'") && !content.includes('"use client"')) {
          warnings.push(`⚠️ ${filePath} może wymagać 'use client'`);
        }
      }
    } catch (error) {
      // Ignoruj błędy odczytu
    }
  };
  
  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        checkComponent(filePath);
      }
    });
  };
  
  walkDir(componentsDir);
} else {
  warnings.push('⚠️ Brakuje katalogu components/');
}

// 11. SPRAWDZENIE API ROUTES
console.log('\n🔌 11. ANALIZA API ROUTES');
console.log('-'.repeat(40));

const apiDir = 'app/api';
if (fs.existsSync(apiDir)) {
  console.log('✅ Katalog app/api/ istnieje');
  
  // Sprawdzenie czy API routes mają prawidłową strukturę
  const checkApiRoute = (filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('export async function GET') ||
          content.includes('export async function POST') ||
          content.includes('export async function PUT') ||
          content.includes('export async function DELETE')) {
        console.log(`✅ ${filePath} ma prawidłowe eksporty`);
      } else {
        warnings.push(`⚠️ ${filePath} może nie mieć prawidłowych eksportów HTTP`);
      }
    } catch (error) {
      // Ignoruj błędy odczytu
    }
  };
  
  const walkApiDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkApiDir(filePath);
      } else if (file === 'route.ts') {
        checkApiRoute(filePath);
      }
    });
  };
  
  walkApiDir(apiDir);
} else {
  warnings.push('⚠️ Brakuje katalogu app/api/');
}

// 12. SPRAWDZENIE BŁĘDÓW BUDOWANIA
console.log('\n🔨 12. TEST BUDOWANIA');
console.log('-'.repeat(40));

try {
  console.log('Sprawdzanie czy aplikacja się kompiluje...');
  const buildOutput = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 60000 // 60 sekund timeout
  });
  
  console.log('✅ Build zakończony sukcesem');
} catch (error) {
  console.log('❌ Build nieudany:');
  console.log(error.stdout || error.message);
  issues.push('❌ Aplikacja nie kompiluje się poprawnie');
}

// PODSUMOWANIE
console.log('\n' + '='.repeat(60));
console.log('📊 PODSUMOWANIE DIAGNOSTYKI');
console.log('='.repeat(60));

console.log(`\n🔴 KRYTYCZNE PROBLEMY (${issues.length}):`);
if (issues.length === 0) {
  console.log('✅ Brak krytycznych problemów!');
} else {
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}

console.log(`\n🟡 OSTRZEŻENIA (${warnings.length}):`);
if (warnings.length === 0) {
  console.log('✅ Brak ostrzeżeń!');
} else {
  warnings.forEach((warning, index) => {
    console.log(`${index + 1}. ${warning}`);
  });
}

// REKOMENDACJE NAPRAW
console.log('\n🔧 REKOMENDACJE NAPRAW:');
console.log('-'.repeat(40));

if (issues.length > 0) {
  console.log('\n1. NAPRAW KRYTYCZNE PROBLEMY:');
  issues.forEach((issue, index) => {
    console.log(`   ${index + 1}. ${issue}`);
  });
}

if (warnings.length > 0) {
  console.log('\n2. ROZWAŻ NAPRAWĘ OSTRZEŻEŃ:');
  warnings.forEach((warning, index) => {
    console.log(`   ${index + 1}. ${warning}`);
  });
}

console.log('\n3. OGÓLNE REKOMENDACJE:');
console.log('   - Uruchom: npm run dev (sprawdź czy aplikacja działa)');
console.log('   - Sprawdź logi w konsoli przeglądarki');
console.log('   - Sprawdź logi w terminalu');
console.log('   - Upewnij się, że wszystkie zmienne środowiskowe są ustawione');

console.log('\n' + '='.repeat(60));
console.log('🏁 DIAGNOSTYKA ZAKOŃCZONA');
console.log('='.repeat(60));

// Zakończ z odpowiednim kodem
process.exit(issues.length > 0 ? 1 : 0);
