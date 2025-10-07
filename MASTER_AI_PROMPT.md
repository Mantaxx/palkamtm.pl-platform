# 🎯 NAJWYŻSZEJ JAKOŚCI PROMPT DLA AI - STWORZENIE PLATFORMY AUKCYJNEJ GOŁĘBI POCZTOWYCH

## 🚀 GŁÓWNY PROMPT PROJEKTU

```
Stwórz profesjonalną platformę aukcyjną dla hodowców gołębi pocztowych o nazwie "Pałka MTM - Mistrzowie Sprintu" z następującymi wymaganiami:

## 🎨 DESIGN & UX - NAJNOWSZEJ GENERACJI
- **Najnowocześniejszy design na świecie** - absolutny numer 1 w branży
- **Glassmorphism + 3D Effects** - przezroczyste karty z efektami głębi i perłowymi odcieniami
- **Pearl Blue Theme** - elegancka paleta kolorów (#3b82f6, #1e40af, #1e3a8a)
- **Framer Motion + GSAP** - płynne animacje, przejścia i efekty 3D
- **Responsive Design** - mobile-first approach z breakpoints (sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px)
- **Dark Mode Ready** - przygotowanie na tryb ciemny
- **Touch Gestures** - gesty dotykowe dla urządzeń mobilnych
- **PWA Ready** - przygotowanie na Progressive Web App

## 🏗 ARCHITEKTURA TECHNICZNA - NAJNOWSZE TECHNOLOGIE
- **Next.js 15** z App Router, TypeScript 5, React 18
- **Prisma ORM** z SQLite (dev) / PostgreSQL (prod) i migracjami
- **NextAuth.js + Firebase Auth** - podwójna autentykacja z weryfikacją email i telefonu
- **Stripe** - płatności, subskrypcje i webhooki
- **Socket.io** - komunikacja real-time dla aukcji i wiadomości
- **Tailwind CSS 3** - utility-first styling z custom design system
- **Zustand** - state management z persist
- **React Query** - data fetching, cache i synchronizacja
- **Sharp** - optymalizacja obrazów i lazy loading

## 🎯 FUNKCJONALNOŚCI GŁÓWNE - KOMPLETNY SYSTEM

### 1. SYSTEM AUKCYJNY - ZAAWANSOWANY
- **Licytacje w czasie rzeczywistym** z Socket.io
- **Kup teraz / Licytuj** z automatycznym przedłużaniem
- **Powiadomienia push** o licytacjach i wygranych
- **Historia licytacji** z pełnym audytem
- **System kategorii**: gołębie, akcesoria hodowlane, zegary, suplementy
- **Weryfikacja sprzedawców** przed publikacją aukcji

### 2. ZARZĄDZANIE UŻYTKOWNIKAMI - PROFESJONALNE
- **Role**: USER, ADMIN z różnymi uprawnieniami
- **Weryfikacja telefonu** przez Twilio SMS
- **Weryfikacja profilu** przez administratorów
- **System reputacji** z ocenami i komentarzami
- **Profil użytkownika** z historią transakcji
- **Dashboard** z statystykami i zarządzaniem

### 3. KATALOG CHAMPIONÓW - EKSKLUZYWNY
- **Profile gołębi** z pełnymi rodowodami
- **Galerie zdjęć i filmów** z optymalizacją
- **Historia osiągnięć** z datami i miejscami
- **System ocen** i komentarzy
- **Wyszukiwanie** po rasie, osiągnięciach, hodowcy
- **Eksport danych** do PDF

### 4. SPOTKANIA HODOWCÓW - SPOŁECZNOŚĆ
- **Galerie wydarzeń** z organizowanych spotkań
- **Upload zdjęć** przez użytkowników
- **System komentarzy** i reakcji
- **Kalendarz wydarzeń** z powiadomieniami
- **Integracja z social media**

### 5. SYSTEM WIADOMOŚCI - REAL-TIME
- **Chat real-time** z Socket.io
- **Powiadomienia push** w przeglądarce
- **Historia konwersacji** z wyszukiwaniem
- **Załączniki** (zdjęcia, dokumenty)
- **Status online/offline** użytkowników

### 6. PANEL ADMINISTRACYJNY - ZAAWANSOWANY
- **Dashboard** z statystykami i metrykami
- **Zarządzanie użytkownikami** z rolami i uprawnieniami
- **Moderacja aukcji** przed publikacją
- **Zarządzanie treściami** (championy, spotkania)
- **Raporty** i analityka
- **System logów** i audytu

## 🔒 BEZPIECZEŃSTWO - NAJWYŻSZY POZIOM
- **CSRF Protection** z tokenami i Redis store
- **Rate Limiting** z różnymi limitami dla różnych akcji
- **Input Validation** z Zod (client) i Joi (server)
- **File Upload Security** z walidacją typów i skanowaniem
- **Phone Verification** z Twilio SMS
- **Session Management** z JWT i secure cookies
- **SQL Injection Protection** przez Prisma ORM
- **XSS Protection** z sanitization

## ⚡ WYDAJNOŚĆ - OPTYMALIZACJA NA MAXIMUM
- **Performance Hooks** do śledzenia wydajności komponentów
- **API Caching** z inteligentnym cache i invalidation
- **Image Optimization** z lazy loading i WebP
- **Code Splitting** z dynamic imports
- **Bundle Optimization** z tree shaking
- **SEO Optimization** z meta tags, sitemap, structured data
- **CDN Ready** dla statycznych zasobów
- **Database Optimization** z indeksami i query optimization

## 📱 RESPONSYWNOŚĆ - MOBILE-FIRST
- **Mobile First Design** - projektowanie od urządzeń mobilnych
- **Touch Gestures** - swipe, pinch, tap
- **Progressive Enhancement** - podstawowa funkcjonalność na wszystkich urządzeniach
- **Offline Support** - podstawowe funkcje offline
- **App-like Experience** - smooth transitions i native feel

## 🎨 DESIGN SYSTEM - SPÓJNY I PROFESJONALNY
- **Color Palette**: Pearl Blue (#3b82f6, #1e40af, #1e3a8a) z perłowymi akcentami
- **Typography**: Poppins (headings), Inter (body) z responsive scale
- **Spacing**: 4px base unit z consistent spacing scale
- **Border Radius**: 12px, 16px, 24px dla różnych elementów
- **Shadows**: 3D depth effects z multiple shadow layers
- **Animations**: 300ms, 500ms, 700ms durations z easing functions
- **Glassmorphism**: backdrop-filter, transparency, blur effects
- **3D Effects**: transform, perspective, box-shadow dla głębi

## 🚀 DEPLOYMENT - PRODUCTION READY
- **Vercel** - hosting z automatycznym CI/CD
- **Environment Variables** - bezpieczne konfiguracje
- **Database Migrations** - Prisma migrations z rollback
- **Monitoring** - Sentry error tracking + Vercel Analytics
- **Backup Strategy** - automatyczne backupy bazy danych
- **SSL/HTTPS** - enforced security
- **CDN** - global content delivery

## 📊 MONITORING & ANALYTICS
- **Error Tracking** - Sentry z custom error boundaries
- **Performance Monitoring** - Core Web Vitals tracking
- **User Analytics** - Mixpanel integration
- **Business Metrics** - custom tracking dla aukcji i transakcji
- **Uptime Monitoring** - 99.9% SLA
- **Log Aggregation** - structured logging

## 🧪 TESTOWANIE - COMPREHENSIVE
- **Unit Tests** - Vitest z Testing Library (80%+ coverage)
- **Integration Tests** - API endpoints i database
- **E2E Tests** - Playwright dla critical user journeys
- **Performance Tests** - Lighthouse CI
- **Security Tests** - OWASP ZAP integration
- **Cross-browser Testing** - Chrome, Firefox, Safari, Edge

## 📚 DOKUMENTACJA - PROFESJONALNA
- **API Documentation** - OpenAPI/Swagger
- **Component Documentation** - Storybook
- **User Guides** - interaktywne tutoriale
- **Developer Docs** - setup, deployment, contributing
- **Architecture Docs** - system design i decisions
- **Changelog** - semantic versioning

## 🔧 NARZĘDZIA DEWELOPERSKIE
- **ESLint + Prettier** - code quality i formatting
- **Husky + lint-staged** - pre-commit hooks
- **TypeScript strict mode** - type safety
- **Git hooks** - automated checks
- **VS Code config** - consistent development environment
- **Docker** - containerization dla development

## 📈 SCALABILITY - PRZYSZŁOŚĆ
- **Microservices Ready** - modularna architektura
- **Database Sharding** - przygotowanie na wzrost
- **Caching Strategy** - Redis dla session i cache
- **CDN Integration** - global content delivery
- **Load Balancing** - horizontal scaling
- **API Rate Limiting** - protection przed abuse

## 🌍 INTERNATIONALIZATION - GLOBAL READY
- **i18n Support** - przygotowanie na wiele języków
- **RTL Support** - right-to-left languages
- **Timezone Handling** - global time zones
- **Currency Support** - multiple currencies
- **Localization** - region-specific content

## 🎯 SUCCESS METRICS
- **Performance**: < 2s load time, 90+ Lighthouse score
- **Security**: A+ SSL Labs rating, zero critical vulnerabilities
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: 95+ PageSpeed Insights score
- **User Experience**: < 100ms interaction response time
- **Reliability**: 99.9% uptime SLA

## 🚨 CRITICAL REQUIREMENTS
- **Zero Downtime Deployment** - blue-green deployment
- **Data Integrity** - ACID transactions, backup strategy
- **Security First** - defense in depth, regular audits
- **Performance First** - Core Web Vitals optimization
- **User Experience First** - intuitive, accessible, fast
- **Maintainability** - clean code, comprehensive tests, documentation

Stwórz kod najwyższej jakości z pełną dokumentacją, testami, optymalizacją wydajności i bezpieczeństwa. Aplikacja ma być gotowa do production deployment z możliwością skalowania na miliony użytkowników.

## 🎯 FINAL REQUIREMENT
**Ta aplikacja ma być absolutnym światowym numerem 1 w branży platform aukcyjnych gołębi pocztowych - pod względem designu, funkcjonalności, wydajności i bezpieczeństwa.**
```

---

## 🔧 PROMPT DLA SPECYFICZNYCH KOMPONENTÓW

### Prompt dla Systemu Aukcyjnego

```
Stwórz zaawansowany system aukcyjny z następującymi funkcjami:

## REAL-TIME LICYTACJE
- Socket.io dla live updates
- Automatyczne przedłużanie przy ostatniej minucie
- Powiadomienia push o nowych licytacjach
- Historia licytacji z timestampami
- Anti-sniping protection

## TYPY AUKCJI
- **Licytacja** - standardowa aukcja z czasem zakończenia
- **Kup Teraz** - natychmiastowy zakup
- **Licytacja + Kup Teraz** - kombinacja obu opcji
- **Rezerwacja** - aukcja z ceną rezerwacji

## SYSTEM KATEGORII
- Gołębie pocztowe (z rodowodami)
- Akcesoria hodowlane
- Zegary kontrolujące
- Suplementy i leki
- Literatura fachowa

## WERYFIKACJA SPRZEDAWCY
- Weryfikacja telefonu (SMS)
- Weryfikacja profilu przez admina
- System reputacji z ocenami
- Historia transakcji
- Dokumenty tożsamości

## PŁATNOŚCI I TRANSAKCJE
- Stripe integration
- Automatyczne rozliczenia
- System prowizji
- Refund policy
- Dispute resolution

## MODERACJA TREŚCI
- Automatyczna moderacja obrazów
- Sprawdzanie treści przez AI
- Manual review przez adminów
- System zgłoszeń użytkowników
- Blacklist słów i fraz
```

### Prompt dla Panelu Administracyjnego

```
Stwórz kompletny panel administracyjny z następującymi funkcjami:

## DASHBOARD
- Statystyki w czasie rzeczywistym
- Wykresy sprzedaży i użytkowników
- Top aukcje i użytkownicy
- System alertów i powiadomień
- Quick actions dla adminów

## ZARZĄDZANIE UŻYTKOWNIKAMI
- Lista użytkowników z filtrami
- Edycja profili i ról
- Weryfikacja dokumentów
- System banów i ostrzeżeń
- Historia aktywności

## MODERACJA AUKCJI
- Queue aukcji do zatwierdzenia
- Bulk actions (approve/reject)
- Edycja treści aukcji
- System flagów i zgłoszeń
- Audit trail wszystkich zmian

## ZARZĄDZANIE TREŚCIAMI
- CRUD dla championów
- Moderacja zdjęć i filmów
- Zarządzanie kategoriami
- SEO optimization tools
- Content scheduling

## RAPORTY I ANALITYKA
- Custom reports builder
- Export do Excel/PDF
- Business intelligence dashboard
- User behavior analytics
- Revenue tracking

## SYSTEM USTAWIEŃ
- Globalne ustawienia aplikacji
- Email templates
- Notification settings
- Payment configuration
- Security settings
```

---

## 🎨 PROMPT DLA DESIGN SYSTEM

```
Stwórz kompletny design system z następującymi elementami:

## COLOR SYSTEM
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
h1 { font-size: clamp(1.5rem, 4vw, 3rem); font-weight: 600; }
h2 { font-size: clamp(1.25rem, 3vw, 2.25rem); font-weight: 600; }
h3 { font-size: clamp(1.125rem, 2.5vw, 1.875rem); font-weight: 600; }
h4 { font-size: clamp(1rem, 2vw, 1.5rem); font-weight: 500; }
```

## COMPONENT LIBRARY

- **UnifiedButton** - 4 warianty (primary, secondary, outline, ghost)
- **UnifiedCard** - glassmorphism z 3D effects
- **UnifiedInput** - form controls z validation states
- **UnifiedModal** - accessible modals z animations
- **UnifiedImage** - optimized images z lazy loading
- **UnifiedTable** - responsive tables z sorting
- **UnifiedPagination** - accessible pagination
- **UnifiedToast** - notification system

## ANIMATION SYSTEM

```typescript
// Framer Motion variants
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
```

## RESPONSIVE BREAKPOINTS

- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (ultra-wide)

```

---

## 🔒 PROMPT DLA BEZPIECZEŃSTWA

```

Stwórz kompletny system bezpieczeństwa z następującymi elementami:

## AUTHENTICATION & AUTHORIZATION

- NextAuth.js z Firebase integration
- JWT tokens z refresh mechanism
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)
- Session management z secure cookies

## DATA PROTECTION

- Input validation z Zod i Joi
- SQL injection protection przez Prisma
- XSS protection z sanitization
- CSRF protection z token validation
- File upload security z type checking

## API SECURITY

- Rate limiting z Redis
- API key authentication
- Request/response logging
- Error handling bez information leakage
- CORS configuration

## INFRASTRUCTURE SECURITY

- HTTPS enforcement
- Security headers (HSTS, CSP, etc.)
- Environment variables protection
- Database encryption at rest
- Backup encryption

## MONITORING & ALERTING

- Security event logging
- Intrusion detection
- Automated threat response
- Security audit trails
- Compliance reporting

```

---

## ⚡ PROMPT DLA WYDAJNOŚCI

```

Stwórz system optymalizacji wydajności z następującymi elementami:

## FRONTEND OPTIMIZATION

- React.memo dla komponentów
- useMemo i useCallback dla obliczeń
- Code splitting z dynamic imports
- Lazy loading dla komponentów i obrazów
- Bundle optimization z tree shaking

## BACKEND OPTIMIZATION

- Database query optimization
- Connection pooling
- Caching strategy z Redis
- API response compression
- Background job processing

## IMAGE OPTIMIZATION

- Next.js Image component
- WebP format support
- Responsive images
- Lazy loading z Intersection Observer
- CDN integration

## CACHING STRATEGY

- Browser caching
- CDN caching
- API response caching
- Database query caching
- Static asset caching

## MONITORING & METRICS

- Core Web Vitals tracking
- Performance budgets
- Real User Monitoring (RUM)
- Synthetic monitoring
- Performance alerts

```

---

## 🎯 FINAL PROMPT - COMPLETE IMPLEMENTATION

```

Na podstawie wszystkich powyższych wymagań, stwórz kompletną aplikację Next.js 15 z następującą strukturą:

## IMPLEMENTACJA KROK PO KROK

1. **Setup projektu** z Next.js 15, TypeScript, Tailwind CSS
2. **Konfiguracja bazy danych** z Prisma i SQLite
3. **System autentykacji** z NextAuth.js i Firebase
4. **Design system** z komponentami UI
5. **API routes** z walidacją i bezpieczeństwem
6. **System aukcyjny** z real-time updates
7. **Panel administracyjny** z pełną funkcjonalnością
8. **Optymalizacja wydajności** i testy
9. **Deployment** na Vercel z monitoring

## WYMAGANIA TECHNICZNE

- **TypeScript strict mode** - pełne typowanie
- **ESLint + Prettier** - code quality
- **Vitest** - unit testing (80%+ coverage)
- **Playwright** - e2e testing
- **Sentry** - error tracking
- **Vercel Analytics** - performance monitoring

## WYMAGANIA BIZNESOWE

- **Zero downtime** deployment
- **99.9% uptime** SLA
- **< 2s load time** performance
- **A+ security** rating
- **WCAG 2.1 AA** accessibility
- **Mobile-first** responsive design

## DELIVERABLES

- **Kompletna aplikacja** gotowa do production
- **Dokumentacja** API i komponentów
- **Testy** unit, integration, e2e
- **Deployment** scripts i configuration
- **Monitoring** setup i dashboards
- **User guides** i documentation

Stwórz aplikację najwyższej jakości, która będzie absolutnym światowym numerem 1 w branży platform aukcyjnych gołębi pocztowych.

```
