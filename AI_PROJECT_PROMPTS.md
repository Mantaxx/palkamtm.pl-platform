# 🚀 NAJWYŻSZEJ JAKOŚCI PROMPTY DLA AI - PROJEKT PLATFORMY AUKCYJNEJ GOŁĘBI POCZTOWYCH

## 📋 SPIS TREŚCI

1. [Główny Prompt Projektu](#-główny-prompt-projektu)
2. [Prompty Architektury](#-prompty-architektury)
3. [Prompty Komponentów](#-prompty-komponentów)
4. [Prompty API](#-prompty-api)
5. [Prompty Stylowania](#-prompty-stylowania)
6. [Prompty Bezpieczeństwa](#-prompty-bezpieczeństwa)
7. [Prompty Wydajności](#-prompty-wydajności)
8. [Rules dla Projektu](#-rules-dla-projektu)
9. [Rules dla Pisania Kodu](#-rules-dla-pisania-kodu)

---

## 🎯 GŁÓWNY PROMPT PROJEKTU

```
Stwórz profesjonalną platformę aukcyjną dla hodowców gołębi pocztowych o nazwie "Pałka MTM - Mistrzowie Sprintu" z następującymi wymaganiami:

## 🎨 DESIGN & UX
- **Najnowocześniejszy design na świecie** - absolutny numer 1 w branży
- **Glassmorphism + 3D Effects** - przezroczyste karty z efektami głębi
- **Pearl Blue Theme** - elegancka paleta kolorów z perłowymi odcieniami
- **Framer Motion + GSAP** - płynne animacje i przejścia
- **Responsive Design** - mobile-first approach
- **Dark Mode Ready** - przygotowanie na tryb ciemny

## 🏗 ARCHITEKTURA TECHNICZNA
- **Next.js 15** z App Router i TypeScript
- **Prisma ORM** z SQLite (dev) / PostgreSQL (prod)
- **NextAuth.js + Firebase Auth** - podwójna autentykacja
- **Stripe** - płatności i subskrypcje
- **Socket.io** - komunikacja real-time
- **Tailwind CSS 3** - utility-first styling
- **Zustand** - state management
- **React Query** - data fetching i cache

## 🎯 FUNKCJONALNOŚCI GŁÓWNE
1. **System Aukcyjny**
   - Licytacje w czasie rzeczywistym
   - Kup teraz / Licytuj
   - Automatyczne przedłużanie
   - Powiadomienia o licytacjach

2. **Zarządzanie Użytkownikami**
   - Role: USER, ADMIN
   - Weryfikacja telefonu (Twilio SMS)
   - Weryfikacja profilu
   - System reputacji

3. **Katalog Championów**
   - Profile gołębi z rodowodami
   - Galerie zdjęć i filmów
   - Historia osiągnięć
   - System ocen

4. **Spotkania Hodowców**
   - Galerie wydarzeń
   - Upload zdjęć przez użytkowników
   - System komentarzy

5. **System Wiadomości**
   - Chat real-time
   - Powiadomienia push
   - Historia konwersacji

## 🔒 BEZPIECZEŃSTWO
- **CSRF Protection** - tokeny zabezpieczające
- **Rate Limiting** - ograniczenia API
- **Input Validation** - Zod + Joi
- **File Upload Security** - walidacja plików
- **Phone Verification** - SMS verification
- **Session Management** - bezpieczne sesje

## ⚡ WYDAJNOŚĆ
- **Performance Hooks** - śledzenie wydajności
- **API Caching** - inteligentny cache
- **Image Optimization** - lazy loading
- **Code Splitting** - optymalizacja bundle
- **SEO Optimization** - meta tags, sitemap

## 📱 RESPONSYWNOŚĆ
- **Mobile First** - projektowanie od mobile
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- **Touch Gestures** - gesty dotykowe
- **PWA Ready** - przygotowanie na PWA

## 🎨 DESIGN SYSTEM
- **Color Palette**: Pearl Blue (#3b82f6, #1e40af, #1e3a8a)
- **Typography**: Poppins (headings), Inter (body)
- **Spacing**: 4px base unit
- **Border Radius**: 12px, 16px, 24px
- **Shadows**: 3D depth effects
- **Animations**: 300ms, 500ms, 700ms durations

## 🚀 DEPLOYMENT
- **Vercel** - hosting i CI/CD
- **Environment Variables** - bezpieczne konfiguracje
- **Database Migrations** - Prisma migrations
- **Monitoring** - Sentry + Vercel Analytics

Stwórz kod najwyższej jakości z pełną dokumentacją, testami i optymalizacją wydajności.
```

---

## 🏗 PROMPTY ARCHITEKTURY

### Prompt dla Struktury Projektu

```
Stwórz strukturę projektu Next.js 15 z następującą organizacją:

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

Zachowaj modularność, separację odpowiedzialności i łatwość utrzymania.
```

### Prompt dla Bazy Danych

```
Stwórz schemat Prisma dla platformy aukcyjnej gołębi z następującymi modelami:

## MODELE GŁÓWNE
1. **User** - użytkownicy z rolami i weryfikacją
2. **Auction** - aukcje z statusami i kategoriami
3. **Bid** - licytacje z historią
4. **Champion** - profile gołębi z rodowodami
5. **BreederMeeting** - spotkania hodowców
6. **Message** - system wiadomości
7. **Transaction** - transakcje płatnicze

## RELACJE
- User 1:N Auction (seller)
- User 1:N Bid (bidder)
- Auction 1:N Bid
- User 1:N Message (sender/recipient)
- User 1:N Transaction (buyer/seller)

## POLA SPECJALNE
- **Weryfikacja**: isPhoneVerified, isProfileVerified
- **Bezpieczeństwo**: activationToken, phoneVerificationCode
- **Wydajność**: indeksy na często używane pola
- **Audit**: createdAt, updatedAt na wszystkich modelach

Użyj SQLite dla development, PostgreSQL dla production.
```

---

## 🧩 PROMPTY KOMPONENTÓW

### Prompt dla Komponentów UI

```
Stwórz system komponentów UI z następującymi zasadami:

## KOMPONENTY PODSTAWOWE
1. **UnifiedButton** - przyciski z wariantami (primary, secondary, outline, ghost)
2. **UnifiedCard** - karty z efektami 3D i glassmorphism
3. **UnifiedInput** - pola formularzy z walidacją
4. **UnifiedModal** - modale z animacjami
5. **UnifiedImage** - obrazy z lazy loading i fallback

## WZORCE DESIGN
- **Glassmorphism**: backdrop-filter, przezroczystość
- **3D Effects**: box-shadow, transform, perspective
- **Pearl Blue Theme**: #3b82f6, #1e40af, #1e3a8a
- **Animations**: Framer Motion transitions
- **Responsive**: mobile-first breakpoints

## PROPS INTERFACE
```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
}
```

## OPTYMALIZACJA

- React.memo dla komponentów
- useCallback dla event handlers
- useMemo dla obliczeń
- Lazy loading dla obrazów

```

### Prompt dla Komponentów Layout

```

Stwórz system layoutów z następującymi komponentami:

## LAYOUT GŁÓWNY

1. **UnifiedLayout** - główny layout z nawigacją
2. **Header** - nagłówek z logo i menu
3. **Footer** - stopka z linkami
4. **Navigation** - menu nawigacyjne
5. **UserStatus** - status użytkownika

## WZORCE NAWIGACJI

- **Sticky Navigation** - przyklejone menu
- **Breadcrumbs** - ścieżka nawigacji
- **Mobile Menu** - hamburger menu
- **User Dropdown** - menu użytkownika

## RESPONSIVE DESIGN

- **Desktop**: pełne menu poziome
- **Tablet**: skrócone menu
- **Mobile**: hamburger menu
- **Touch**: gesty dotykowe

## ANIMACJE

- **Page Transitions**: płynne przejścia
- **Menu Animations**: slide, fade, scale
- **Loading States**: skeleton, spinner
- **Hover Effects**: scale, glow, shadow

```

---

## 🔌 PROMPTY API

### Prompt dla API Routes

```

Stwórz API routes z następującymi wzorcami:

## STRUKTURA API

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

## MIDDLEWARE STACK

1. **Rate Limiting** - ograniczenia zapytań
2. **Authentication** - weryfikacja użytkownika
3. **Authorization** - sprawdzenie uprawnień
4. **Validation** - walidacja danych
5. **CSRF Protection** - ochrona przed CSRF
6. **Phone Verification** - weryfikacja telefonu

## ERROR HANDLING

- **Structured Errors** - spójne formaty błędów
- **Logging** - logowanie wszystkich błędów
- **Monitoring** - integracja z Sentry
- **User-Friendly Messages** - czytelne komunikaty

## RESPONSE FORMAT

```typescript
interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

```

### Prompt dla Walidacji

```

Stwórz system walidacji z Zod i Joi:

## SCHEMATY WALIDACJI

```typescript
// lib/validations/schemas.ts
export const userCreateSchema = z.object({
  email: z.string().email('Nieprawidłowy email'),
  password: z.string().min(8, 'Hasło musi mieć min. 8 znaków'),
  firstName: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
  phoneNumber: z.string().regex(/^\+48\d{9}$/, 'Nieprawidłowy numer telefonu')
})

export const auctionCreateSchema = z.object({
  title: z.string().min(5, 'Tytuł musi mieć min. 5 znaków'),
  description: z.string().min(10, 'Opis musi mieć min. 10 znaków'),
  startingPrice: z.number().positive('Cena musi być dodatnia'),
  category: z.enum(['pigeon', 'accessories', 'supplements']),
  endDate: z.date().min(new Date(), 'Data zakończenia musi być w przyszłości')
})
```

## WALIDACJA PO STRONIE SERWERA

- **Joi** - walidacja API routes
- **Prisma** - walidacja na poziomie bazy danych
- **Sanitization** - czyszczenie danych wejściowych

## WALIDACJA PO STRONIE KLIENTA

- **Zod** - walidacja formularzy
- **React Hook Form** - integracja z walidacją
- **Real-time Validation** - walidacja podczas pisania

```

---

## 🎨 PROMPTY STYLOWANIA

### Prompt dla Design System

```

Stwórz kompletny design system z następującymi elementami:

## COLOR PALETTE

```css
:root {
  /* Pearl Blue Theme */
  --color-primary: #3b82f6;
  --color-primary-dark: #1e40af;
  --color-primary-darker: #1e3a8a;
  
  /* Glassmorphism Colors */
  --glass-bg: rgba(255, 248, 220, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  /* 3D Effects */
  --shadow-3d: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(255, 248, 220, 0.3);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}
```

## TYPOGRAPHY SCALE

```css
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
h2 { font-size: clamp(1.25rem, 3vw, 2.25rem); }
h3 { font-size: clamp(1.125rem, 2.5vw, 1.875rem); }
h4 { font-size: clamp(1rem, 2vw, 1.5rem); }
```

## COMPONENT STYLES

```css
.btn-primary {
  @apply relative overflow-hidden text-white font-semibold py-3 px-6 rounded-2xl;
  background: var(--gradient-3d);
  box-shadow: var(--shadow-3d);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-glow);
}
```

## RESPONSIVE BREAKPOINTS

- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

```

### Prompt dla Animacji

```

Stwórz system animacji z Framer Motion i GSAP:

## FRAMER MOTION ANIMATIONS

```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}
```

## GSAP ANIMATIONS

```typescript
// Timeline animations
const tl = gsap.timeline()
tl.from('.hero-title', { duration: 1, y: 100, opacity: 0 })
  .from('.hero-subtitle', { duration: 0.8, y: 50, opacity: 0 }, '-=0.5')
  .from('.hero-button', { duration: 0.6, scale: 0, opacity: 0 }, '-=0.3')

// Scroll-triggered animations
gsap.registerPlugin(ScrollTrigger)
gsap.from('.card', {
  duration: 1,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.cards-container',
    start: 'top 80%'
  }
})
```

## PERFORMANCE OPTIMIZATION

- **will-change**: dla animowanych elementów
- **transform3d**: dla hardware acceleration
- **requestAnimationFrame**: dla płynnych animacji
- **Intersection Observer**: dla lazy animations

```

---

## 🔒 PROMPTY BEZPIECZEŃSTWA

### Prompt dla Autentykacji

```

Stwórz system autentykacji z NextAuth.js i Firebase:

## NEXTAUTH CONFIGURATION

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Firebase authentication
        const userCredential = await signInWithEmailAndPassword(
          auth, credentials.email, credentials.password
        )
        
        if (!userCredential.user.emailVerified) {
          throw new Error('Email nie jest zweryfikowany')
        }
        
        return {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          role: 'USER'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.uid
      session.user.role = token.role
      return session
    }
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET
}
```

## FIREBASE AUTH MIDDLEWARE

```typescript
export async function requireFirebaseAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Brak tokenu' }, { status: 401 })
  }
  
  const token = authHeader.substring(7)
  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return { decodedToken }
  } catch (error) {
    return NextResponse.json({ error: 'Nieprawidłowy token' }, { status: 401 })
  }
}
```

## PHONE VERIFICATION

```typescript
export async function sendPhoneVerification(phoneNumber: string) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
  
  if (process.env.NODE_ENV === 'production') {
    await twilioClient.messages.create({
      body: `Kod weryfikacyjny: ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })
  }
  
  return verificationCode
}
```

```

### Prompt dla CSRF Protection

```

Stwórz system ochrony CSRF:

## CSRF TOKEN STORE

```typescript
interface CSRFTokenStore {
  get(key: string): Promise<{ token: string; expires: number } | null>
  set(key: string, value: { token: string; expires: number }, ttl: number): Promise<void>
  delete(key: string): Promise<void>
  cleanup(): Promise<void>
}

class MemoryCSRFTokenStore implements CSRFTokenStore {
  private store = new Map<string, { token: string; expires: number }>()
  
  async get(key: string) {
    const value = this.store.get(key)
    if (!value || value.expires < Date.now()) {
      this.store.delete(key)
      return null
    }
    return value
  }
  
  async set(key: string, value: { token: string; expires: number }, ttl: number) {
    this.store.set(key, value)
  }
}
```

## CSRF MIDDLEWARE

```typescript
export async function setCSRFCookie(response: NextResponse, userId: string) {
  const token = crypto.randomUUID()
  const expires = Date.now() + CSRF_TOKEN_TTL
  
  await csrfTokenStore.set(`csrf:${userId}`, { token, expires }, CSRF_TOKEN_TTL)
  
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: CSRF_TOKEN_TTL / 1000
  })
  
  return response
}

export async function validateCSRFToken(request: NextRequest, userId: string) {
  const token = request.cookies.get('csrf-token')?.value
  const headerToken = request.headers.get('x-csrf-token')
  
  if (!token || !headerToken || token !== headerToken) {
    throw new Error('Nieprawidłowy token CSRF')
  }
  
  const stored = await csrfTokenStore.get(`csrf:${userId}`)
  if (!stored || stored.token !== token) {
    throw new Error('Token CSRF wygasł')
  }
}
```

```

---

## ⚡ PROMPTY WYDAJNOŚCI

### Prompt dla Performance Hooks

```

Stwórz system optymalizacji wydajności:

## PERFORMANCE TRACKING HOOK

```typescript
export function usePerformanceOptimization(
  componentName: string,
  config: PerformanceConfig = {}
) {
  const {
    enableTracking = true,
    trackRenderTime = true,
    trackMemoryUsage = false,
    debounceMs = 100,
  } = config

  const renderCount = useRef(0)
  const lastRenderTime = useRef(Date.now())
  const mountTime = useRef(Date.now())

  // Śledzenie renderów
  useEffect(() => {
    renderCount.current++
    const currentTime = Date.now()
    const renderDuration = currentTime - lastRenderTime.current

    if (enableTracking && trackRenderTime) {
      monitoring.trackPerformance(
        `component_render:${componentName}`,
        renderDuration,
        { renderCount: renderCount.current, componentName }
      )
    }

    lastRenderTime.current = currentTime
  })

  // Debounced callback
  const debouncedCallback = useCallback((callback: () => void) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(callback, debounceMs)
  }, [debounceMs])

  return {
    renderCount: renderCount.current,
    debouncedCallback,
    trackAction: (actionName: string, duration?: number) => {
      if (enableTracking) {
        monitoring.trackPerformance(
          `component_action:${componentName}:${actionName}`,
          duration || 0,
          { renderCount: renderCount.current, componentName }
        )
      }
    }
  }
}
```

## API CACHING HOOK

```typescript
export function useAPICache<T>(
  key: string,
  fetcher: () => Promise<T>,
  config?: CacheConfig
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const result = await apiCache.get(key, fetcher)
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [key])

  return { data, isLoading, error, refetch: () => fetchData() }
}
```

## IMAGE OPTIMIZATION HOOK

```typescript
export function useImageOptimization(
  src: string,
  options: { preload?: boolean; lazy?: boolean; quality?: number } = {}
) {
  const { preload = false, lazy = true, quality = 85 } = options
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)

  // Intersection Observer dla lazy loading
  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const img = document.createElement('img')
    observer.observe(img)

    return () => observer.disconnect()
  }, [lazy])

  // Preload obrazu
  useEffect(() => {
    if (!preload || !src || !isInView) return

    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setIsError(true)
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, preload, isInView])

  const optimizedSrc = useMemo(() => {
    if (!src) return src
    const params = new URLSearchParams()
    if (quality !== 85) params.set('q', quality.toString())
    const queryString = params.toString()
    return queryString ? `${src}?${queryString}` : src
  }, [src, quality])

  return { optimizedSrc, isLoaded, isError, isInView, setIsInView }
}
```

```

---

## 📋 RULES DLA PROJEKTU

### 1. ZASADY ARCHITEKTURY

```

## MODULARNOŚĆ

- Każdy komponent w osobnym pliku
- Separacja logiki biznesowej od UI
- Reużywalne komponenty
- Spójne nazewnictwo

## STRUKTURA PLIKÓW

- components/ - komponenty React
- lib/ - utilities i konfiguracje
- hooks/ - custom hooks
- types/ - definicje TypeScript
- utils/ - funkcje pomocnicze

## IMPORT/EXPORT

- Named exports dla komponentów
- Default exports dla głównych komponentów
- Barrel exports (index.ts) dla folderów
- Absolute imports z @/ alias

## NAMING CONVENTIONS

- PascalCase dla komponentów
- camelCase dla funkcji i zmiennych
- kebab-case dla plików
- UPPER_CASE dla stałych

```

### 2. ZASADY BEZPIECZEŃSTWA

```

## AUTHENTICATION

- Zawsze weryfikuj tokeny Firebase
- Sprawdzaj role użytkowników
- Waliduj dane wejściowe
- Używaj HTTPS w production

## DATA VALIDATION

- Zod dla walidacji po stronie klienta
- Joi dla walidacji API
- Prisma dla walidacji bazy danych
- Sanitization wszystkich danych

## FILE UPLOAD

- Waliduj typy plików
- Sprawdzaj rozmiary plików
- Skanuj pod kątem malware
- Używaj bezpiecznych nazw plików

## RATE LIMITING

- Ograniczenia na API endpoints
- Różne limity dla różnych akcji
- IP-based i user-based limiting
- Graceful degradation

```

### 3. ZASADY WYDAJNOŚCI

```

## RENDERING

- React.memo dla komponentów
- useMemo dla obliczeń
- useCallback dla event handlers
- Lazy loading dla komponentów

## DATA FETCHING

- React Query dla cache
- SWR dla real-time data
- Pagination dla dużych list
- Prefetching dla przewidywalnych danych

## IMAGES

- Next.js Image component
- Lazy loading
- WebP format
- Responsive images

## BUNDLE OPTIMIZATION

- Code splitting
- Tree shaking
- Dynamic imports
- Bundle analysis

```

---

## 📝 RULES DLA PISANIA KODU

### 1. ZASADY TYPESCRIPT

```

## TYPING

- Zawsze używaj TypeScript
- Definiuj interfejsy dla props
- Używaj generics gdzie to możliwe
- Unikaj `any` - używaj `unknown`

## INTERFACES

```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}
```

## GENERICS

```typescript
interface ApiResponse<T> {
  data: T
  error?: string
  pagination?: PaginationInfo
}
```

## UTILITY TYPES

- Pick<T, K> - wybierz właściwości
- Omit<T, K> - pomiń właściwości
- Partial<T> - wszystkie opcjonalne
- Required<T> - wszystkie wymagane

```

### 2. ZASADY REACT

```

## COMPONENTS

- Functional components z hooks
- Props destructuring
- Conditional rendering
- Error boundaries

## HOOKS

- Custom hooks dla logiki
- useEffect z dependency array
- useCallback dla funkcji
- useMemo dla obliczeń

## STATE MANAGEMENT

- useState dla lokalnego stanu
- useReducer dla złożonego stanu
- Zustand dla globalnego stanu
- React Query dla server state

## PERFORMANCE

- React.memo dla komponentów
- useMemo dla wartości
- useCallback dla funkcji
- Lazy loading dla komponentów

```

### 3. ZASADY STYLOWANIA

```

## TAILWIND CSS

- Utility-first approach
- Responsive design
- Dark mode support
- Custom design tokens

## CSS CUSTOM PROPERTIES

```css
:root {
  --color-primary: #3b82f6;
  --shadow-3d: 0 8px 32px rgba(0, 0, 0, 0.12);
  --glass-bg: rgba(255, 248, 220, 0.1);
}
```

## COMPONENT STYLES

- CSS modules dla lokalnych stylów
- Global styles dla wspólnych elementów
- CSS-in-JS dla dynamicznych stylów
- PostCSS dla dodatkowych funkcji

## RESPONSIVE DESIGN

- Mobile-first approach
- Breakpoint-based design
- Flexible layouts
- Touch-friendly interfaces

```

### 4. ZASADY TESTOWANIA

```

## UNIT TESTS

- Vitest dla unit testów
- Testing Library dla komponentów
- Mock functions dla dependencies
- Coverage minimum 80%

## INTEGRATION TESTS

- API endpoint testing
- Database integration
- Authentication flows
- Error handling

## E2E TESTS

- Playwright dla e2e testów
- Critical user journeys
- Cross-browser testing
- Performance testing

## TEST STRUCTURE

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  })
  
  it('should handle user interaction', () => {
    // Test implementation
  })
})
```

```

### 5. ZASADY DOKUMENTACJI

```

## CODE COMMENTS

- JSDoc dla funkcji
- Inline comments dla złożonej logiki
- TODO comments z datą
- README dla każdego modułu

## JSDOC EXAMPLE

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

## README STRUCTURE

- Opis funkcjonalności
- Instrukcje instalacji
- Przykłady użycia
- API documentation
- Contributing guidelines

```

---

## 🎯 PODSUMOWANIE

Te prompty zostały stworzone na podstawie szczegółowej analizy profesjonalnej aplikacji Next.js z najnowszymi technologiami i wzorcami. Zawierają:

✅ **Kompletne wzorce architektoniczne**
✅ **Najnowsze technologie (Next.js 15, TypeScript 5)**
✅ **Zaawansowane wzorce bezpieczeństwa**
✅ **Optymalizacje wydajności**
✅ **Profesjonalne wzorce kodu**
✅ **Szczegółowe rules i konwencje**

Użyj tych promptów do stworzenia aplikacji najwyższej jakości z pełną funkcjonalnością, bezpieczeństwem i wydajnością.
