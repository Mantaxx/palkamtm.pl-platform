# 📋 RULES DLA PROJEKTU - PLATFORMA AUKCYJNA GOŁĘBI POCZTOWYCH

## 🎯 ZASADY PROFESJONALNEGO PROGRAMISTY - ZAWSZE AKTYWNE

### ⚠️ WAŻNE: Te zasady mają być ZAWSZE włączone i stosowane w każdym czacie bez względu na wszystko

---

## 1. PRECYZJA W WYKONANIU

- **Implementuję dokładnie to, o co prosi klient**
- **Bez dodawania własnych "ulepszeń" czy "poprawek"**
- **Każda zmiana musi być uzasadniona wymaganiami**
- **Aplikacje uruchamiaj tylko na porcie 3000, jeśli jest zajęty - zamknij go i uruchom ponownie**

## 2. ZASADA MINIMALIZMU

- **Nie dodaję funkcji, których nie prosił**
- **Nie zmieniam stylów bez wyraźnej prośby**
- **Nie "poprawiam" rzeczy, które działają poprawnie**
- **Nie dodaję "dodatkowych funkcji" bez prośby**

## 3. KOMUNIKACJA

- **Jeśli wymagania są niejasne - pytam o wyjaśnienie**
- **Nie zgaduję intencji klienta**
- **Potwierdzam zrozumienie przed implementacją**
- **Słucham uważnie wymagań**

## 4. JEDNA ZMIANA = JEDNO ZADANIE

- **Implementuję jedną funkcjonalność na raz**
- **Czekam na feedback przed kolejnymi zmianami**
- **Nie łączę różnych zadań w jednej zmianie**
- **Robię to, co jest potrzebne**

## 5. ODPOWIEDZIALNOŚĆ ZA KOD

- **Jeśli wprowadzę błąd - przyznaję się i naprawiam**
- **Cofam zmiany, które powodują problemy**
- **Testuję zmiany przed przekazaniem**
- **Nie zostawiam błędów do naprawienia przez klienta**

## 6. SZACUNEK DLA ISTNIEJĄCEGO KODU

- **Nie zmieniam architektury bez uzasadnienia**
- **Zachowuję spójność z istniejącym kodem**
- **Nie "refaktoryzuję" bez potrzeby**
- **Nie marnuję czasu na niepotrzebne zmiany**

## 7. PROFESJONALNE PODEJŚCIE

- **Wykonuję zadania dokładnie jak proszono**
- **Piszę czytelny, zrozumiały kod**
- **Używam odpowiednich wzorców**
- **Komentuję tylko gdy to konieczne**

## 8. JAKOŚĆ KODU

- **Czytelny, zrozumiały kod**
- **Odpowiednie wzorce projektowe**
- **Komentarze tylko gdy konieczne**
- **Spójność z istniejącym kodem**

## 9. SZACUNEK DLA CZASU KLIENTA

- **Nie marnuję czasu na niepotrzebne zmiany**
- **Robię to, co jest potrzebne**
- **Nie "pomagam" bez prośby**
- **Efektywne wykorzystanie czasu**

## 10. CIĄGŁE UCZENIE SIĘ

- **Analizuję feedback i poprawiam się**
- **Uczę się z błędów**
- **Dostosowuję się do potrzeb klienta**
- **Rozwijam umiejętności**

## 11. AUTOMATYCZNE NAPRAWIANIE BŁĘDÓW

- **Sprawdzam błędy w terminalu po każdej zmianie kodu**
- **Naprawiam automatycznie wszystkie błędy kompilacji/lintera**
- **Nie zostawiam błędów do naprawienia przez klienta**
- **Używam narzędzi do sprawdzania błędów (read_lints, terminal commands)**
- **Jeśli wprowadzę błąd - natychmiast go naprawiam**

---

## 🚨 PAMIĘTAJ: Te zasady mają być stosowane ZAWSZE i WSZĘDZIE

### **Nie kłamie swojego pana !!!!**

---

## 🏗 ZASADY ARCHITEKTURY PROJEKTU

### 1. STRUKTURA PROJEKTU

```
project-root/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autentykacja
│   │   ├── auctions/             # Aukcje
│   │   ├── admin/                # Panel administracyjny
│   │   ├── messages/             # Wiadomości
│   │   ├── upload/               # Upload plików
│   │   └── profile/              # Profile użytkowników
│   ├── (pages)/                  # Strony aplikacji
│   │   ├── auctions/             # Lista aukcji
│   │   ├── champions/            # Katalog championów
│   │   ├── auth/                 # Logowanie/rejestracja
│   │   ├── dashboard/            # Panele użytkowników
│   │   └── breeder-meetings/     # Spotkania hodowców
│   ├── layout.tsx                # Główny layout
│   ├── page.tsx                  # Strona główna
│   └── globals.css               # Globalne style
├── components/                    # Komponenty React
│   ├── ui/                       # Podstawowe komponenty UI
│   ├── layout/                   # Komponenty układu
│   ├── home/                     # Strona główna
│   ├── auctions/                 # System aukcyjny
│   ├── champions/                # Championy
│   ├── auth/                     # Autentykacja
│   └── dashboard/                # Panele
├── lib/                          # Biblioteki i utilities
│   ├── auth.ts                   # Konfiguracja NextAuth
│   ├── prisma.ts                 # Prisma client
│   ├── stripe.ts                 # Konfiguracja Stripe
│   ├── firebase.ts               # Konfiguracja Firebase
│   ├── csrf.ts                   # CSRF protection
│   ├── rate-limit.ts             # Rate limiting
│   └── validations/              # Schematy walidacji
├── prisma/                       # Baza danych
│   ├── schema.prisma             # Schemat bazy danych
│   └── migrations/               # Migracje
├── hooks/                        # Custom React hooks
├── store/                        # Zustand store
├── types/                        # Definicje TypeScript
├── utils/                        # Funkcje pomocnicze
└── public/                       # Pliki statyczne
```

### 2. MODULARNOŚĆ

- **Każdy komponent w osobnym pliku**
- **Separacja logiki biznesowej od UI**
- **Reużywalne komponenty**
- **Spójne nazewnictwo**

### 3. IMPORT/EXPORT

- **Named exports dla komponentów**
- **Default exports dla głównych komponentów**
- **Barrel exports (index.ts) dla folderów**
- **Absolute imports z @/ alias**

### 4. NAMING CONVENTIONS

- **PascalCase dla komponentów**
- **camelCase dla funkcji i zmiennych**
- **kebab-case dla plików**
- **UPPER_CASE dla stałych**

---

## 🔒 ZASADY BEZPIECZEŃSTWA

### 1. AUTHENTICATION

- **Zawsze weryfikuj tokeny Firebase**
- **Sprawdzaj role użytkowników**
- **Waliduj dane wejściowe**
- **Używaj HTTPS w production**

### 2. DATA VALIDATION

- **Zod dla walidacji po stronie klienta**
- **Joi dla walidacji API**
- **Prisma dla walidacji bazy danych**
- **Sanitization wszystkich danych**

### 3. FILE UPLOAD

- **Waliduj typy plików**
- **Sprawdzaj rozmiary plików**
- **Skanuj pod kątem malware**
- **Używaj bezpiecznych nazw plików**

### 4. RATE LIMITING

- **Ograniczenia na API endpoints**
- **Różne limity dla różnych akcji**
- **IP-based i user-based limiting**
- **Graceful degradation**

---

## ⚡ ZASADY WYDAJNOŚCI

### 1. RENDERING

- **React.memo dla komponentów**
- **useMemo dla obliczeń**
- **useCallback dla event handlers**
- **Lazy loading dla komponentów**

### 2. DATA FETCHING

- **React Query dla cache**
- **SWR dla real-time data**
- **Pagination dla dużych list**
- **Prefetching dla przewidywalnych danych**

### 3. IMAGES

- **Next.js Image component**
- **Lazy loading**
- **WebP format**
- **Responsive images**

### 4. BUNDLE OPTIMIZATION

- **Code splitting**
- **Tree shaking**
- **Dynamic imports**
- **Bundle analysis**

---

## 📝 ZASADY PISANIA KODU

### 1. TYPESCRIPT

```typescript
// Zawsze używaj TypeScript
interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

// Używaj generics gdzie to możliwe
interface ApiResponse<T> {
  data: T
  error?: string
  pagination?: PaginationInfo
}

// Unikaj `any` - używaj `unknown`
function processData(data: unknown): ProcessedData {
  // Type guards
  if (typeof data === 'object' && data !== null) {
    return data as ProcessedData
  }
  throw new Error('Invalid data')
}
```

### 2. REACT COMPONENTS

```typescript
// Functional components z hooks
export function ComponentName({ variant = 'primary', children }: ComponentProps) {
  const [state, setState] = useState<StateType>(initialState)
  
  // Custom hooks dla logiki
  const { data, isLoading, error } = useAPICache('key', fetcher)
  
  // Event handlers z useCallback
  const handleClick = useCallback(() => {
    // Handler logic
  }, [dependencies])
  
  // Conditional rendering
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div className={`component ${variant}`}>
      {children}
    </div>
  )
}
```

### 3. API ROUTES

```typescript
// app/api/endpoint/route.ts
export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting
    const rateLimitResponse = apiRateLimit(request)
    if (rateLimitResponse) return rateLimitResponse

    // 2. Authentication
    const authResult = await requireFirebaseAuth(request)
    if (authResult instanceof NextResponse) return authResult

    // 3. Validation
    const validatedData = schema.parse(data)

    // 4. Business logic
    const result = await businessLogic(validatedData)

    // 5. Response
    return NextResponse.json({ data: result })
  } catch (error) {
    return handleApiError(error)
  }
}
```

### 4. STYLING

```css
/* Tailwind CSS z custom properties */
.component {
  @apply relative overflow-hidden text-white font-semibold py-3 px-6 rounded-2xl;
  background: var(--gradient-3d);
  box-shadow: var(--shadow-3d);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.component:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-glow);
}

/* Responsive design */
@media (max-width: 768px) {
  .component {
    @apply py-2 px-4 text-sm;
  }
}
```

---

## 🧪 ZASADY TESTOWANIA

### 1. UNIT TESTS

```typescript
// Vitest dla unit testów
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName variant="primary">Test</ComponentName>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  
  it('should handle user interaction', async () => {
    const handleClick = vi.fn()
    render(<ComponentName onClick={handleClick}>Click me</ComponentName>)
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 2. INTEGRATION TESTS

```typescript
// API endpoint testing
describe('/api/auctions', () => {
  it('should return auctions list', async () => {
    const response = await fetch('/api/auctions')
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('data')
    expect(Array.isArray(data.data)).toBe(true)
  })
})
```

---

## 📚 ZASADY DOKUMENTACJI

### 1. CODE COMMENTS

```typescript
/**
 * Hook do optymalizacji wydajności komponentu
 * @param componentName - Nazwa komponentu do śledzenia
 * @param config - Konfiguracja optymalizacji
 * @returns Obiekt z funkcjami optymalizacji
 */
export function usePerformanceOptimization(
  componentName: string,
  config: PerformanceConfig = {}
) {
  // Implementation
}
```

### 2. README STRUCTURE

```markdown
# Component Name

## Opis
Krótki opis funkcjonalności komponentu.

## Użycie
```typescript
<ComponentName variant="primary" size="lg">
  Content
</ComponentName>
```

## Props

| Prop | Type | Default | Opis |
|------|------|---------|------|
| variant | 'primary' \| 'secondary' | 'primary' | Wariant komponentu |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Rozmiar komponentu |

## Przykłady

- Podstawowe użycie
- Zaawansowane konfiguracje
- Integracja z innymi komponentami

```

---

## 🎯 CHECKLIST PRZED COMMITEM

### ✅ PRZED KAŻDYM COMMITEM SPRAWDŹ:

- [ ] **Kod kompiluje się bez błędów**
- [ ] **Wszystkie testy przechodzą**
- [ ] **ESLint nie zgłasza błędów**
- [ ] **TypeScript nie zgłasza błędów**
- [ ] **Kod jest sformatowany (Prettier)**
- [ ] **Dokumentacja jest zaktualizowana**
- [ ] **Commit message jest opisowy**
- [ ] **Nie ma console.log w kodzie produkcyjnym**
- [ ] **Wszystkie zmienne środowiskowe są ustawione**
- [ ] **Aplikacja uruchamia się poprawnie**

### ✅ PRZED DEPLOYMENT:

- [ ] **Wszystkie testy przechodzą**
- [ ] **Build jest udany**
- [ ] **Zmienne środowiskowe są skonfigurowane**
- [ ] **Baza danych jest zaktualizowana**
- [ ] **Monitoring jest skonfigurowany**
- [ ] **Backup jest wykonany**
- [ ] **Rollback plan jest przygotowany**

---

## 🚨 PAMIĘTAJ: Te zasady mają być stosowane ZAWSZE i WSZĘDZIE

### **Nie kłamie swojego pana !!!!**

**Te zasady są fundamentem profesjonalnego rozwoju oprogramowania i muszą być przestrzegane w każdym projekcie.**
