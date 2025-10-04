# 🐦 Pałka MTM - Mistrzowie Sprintu | Platforma Aukcyjna Gołębi Pocztowych

## 📋 Spis Treści

- [Opis Projektu](#-opis-projektu)
- [Technologie](#-technologie)
- [Architektura](#-architektura)
- [Struktura Projektu](#-struktura-projektu)
- [Instalacja](#-instalacja)
- [Konfiguracja](#️-konfiguracja)
- [Baza Danych](#️-baza-danych)
- [API Endpoints](#-api-endpoints)
- [Komponenty](#-komponenty)
- [Styling](#-styling)
- [Bezpieczeństwo](#-bezpieczeństwo)
- [Deployment](#-deployment)
- [Skrypty](#-skrypty)
- [Testowanie](#-testowanie)

## 🎯 Opis Projektu

Ekskluzywna platforma  o hodowli golebi pocztowych jednych z najlepszych w histori hodowcow w Polsce oraz platroma aukcyjna dla hodowców gołębi pocztowych, umożliwiająca kupno i sprzedaż championów z rodowodami. Aplikacja oferuje zaawansowane funkcje aukcyjne, zarządzanie użytkownikami, system płatności oraz galerie zdjęć i filmów.

### Główne Funkcje

- 🏆 **System Aukcyjny** - licytacje w czasie rzeczywistym. portal aukcyjny gdzie akzdy moze wysatwic golebie na licytacje badz sprzedaz z opcja kup teraz.mozna tez wysatwic akcesoria hodowlane zegary konstantujace czy sumplmenty
- 👥 **Zarządzanie Użytkownikami** - role: Buyer, Seller, Admin
- 💳 **Płatności** - integracja ze Stripe
- 📸 **Galerie** - zdjęcia golebi zdjecia rodowodów i filmy gołębi
- 🏅 **Championy** - katalog mistrzowskich golebi rodziny Pałka z rodowodami
- 📍 **Spotkania Hodowców** - galerie wydarzeńze spotkan z hodowcami rodziny Pałka oraz mozliwoasc dodania swoich zdjec ze spotkania z nimi
- 🔍 **Wyszukiwanie** - zaawansowane filtry
- Stron O nas
- 📱 **Responsywny Design** - najnowoczesnieszy disigne animacje efekty 3d absolutny swiatowy numer 1 jesli chodzi o designe i styl

## 🛠 Technologie

### Frontend

- **Next.js 15.5.1** - React framework z App Router
- **React 18** - biblioteka UI
- **TypeScript 5** - typowanie statyczne
- **Tailwind CSS 3** - utility-first CSS
- **Framer Motion** - animacje
- **GSAP** - zaawansowane animacje
- **React Hook Form** - zarządzanie formularzami
- **Zustand** - state management
- **SWR / React Query** - data fetching i cache

### Backend

- **Next.js API Routes** - serverless functions
- **Prisma** - ORM dla bazy danych
- **NextAuth.js** - autentykacja
- **Stripe** - płatności
- **Socket.io** - WebSocket komunikacja
- **Express Rate Limit** - ograniczenia API
- **Zod / Joi** - walidacja danych
- **Bcryptjs** - hashowanie haseł

### Baza Danych

- **SQLite** - baza danych (development)
- **Prisma Client** - type-safe database access
- **Migracje** - version control dla schematu

### Narzędzia Deweloperskie

- **ESLint** - linting kodu
- **Prettier** - formatowanie kodu
- **Vitest** - unit testing
- **Playwright** - e2e testing
- **Sharp** - optymalizacja obrazów

### Monitoring i Analytics

- **Sentry** - error tracking
- **Vercel Analytics** - performance monitoring
- **Mixpanel** - user analytics

## 🏗 Architektura

### Wzorzec Architektoniczny

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Layer     │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (SQLite)      │
│                 │    │                 │    │                 │
│ • React         │    │ • NextAuth      │    │ • Prisma ORM    │
│ • TypeScript    │    │ • Stripe        │    │ • Migrations    │
│ • Tailwind      │    │ • Socket.io     │    │ • Relations     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Struktura Komponentów

```text
components/
├── ui/                 # Podstawowe komponenty UI
├── layout/             # Komponenty układu
├── home/               # Strona główna
├── auctions/           # System aukcyjny
├── champions/          # Katalog championów
├── auth/               # Autentykacja
├── dashboard/          # Panele użytkowników
└── heritage/           # Historia hodowli
```

## 📁 Struktura Projektu

```text
pigeon-auction-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autentykacja
│   │   ├── auctions/             # Aukcje
│   │   ├── payments/             # Płatności
│   │   └── upload/               # Upload plików
│   ├── (pages)/                  # Strony aplikacji
│   │   ├── auctions/             # Lista aukcji
│   │   ├── champions/            # Katalog championów
│   │   ├── auth/                 # Logowanie/rejestracja
│   │   ├── dashboard/            # Panele użytkowników
│   │   └── heritage/             # Historia hodowli
│   ├── layout.tsx                # Główny layout
│   ├── page.tsx                  # Strona główna
│   └── globals.css               # Globalne style
├── components/                    # Komponenty React
│   ├── ui/                       # Podstawowe komponenty
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
│   └── validations/              # Schematy walidacji
├── prisma/                       # Baza danych
│   ├── schema.prisma             # Schemat bazy danych
│   └── dev.db                    # Baza SQLite
├── public/                       # Pliki statyczne
│   ├── champions/                # Zdjęcia championów
│   ├── meetings/                 # Zdjęcia spotkań
│   └── press/                    # Zdjęcia prasowe
├── hooks/                        # Custom React hooks
├── store/                        # Zustand store
├── types/                        # Definicje TypeScript
├── utils/                        # Funkcje pomocnicze
└── scripts/                      # Skrypty pomocnicze
```

## 🚀 Instalacja

### Wymagania

- Node.js 18+
- npm lub yarn
- Git

### Kroki Instalacji

1. **Klonowanie repozytorium**

```bash
git clone <repository-url>
cd pigeon-auction-platform
```

1. **Instalacja zależności**

```bash
npm install
# lub
yarn install
```

1. **Konfiguracja zmiennych środowiskowych**

```bash
cp env.example .env.local
```

1. **Konfiguracja bazy danych**

```bash
npx prisma generate
npx prisma db push
npm run migrate
```

1. **Uruchomienie serwera deweloperskiego**

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## ⚙️ Konfiguracja

### Zmienne Środowiskowe (.env.local)

```env
# Baza danych
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (opcjonalne)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# SMS (opcjonalne)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Analytics
MIXPANEL_TOKEN="your-mixpanel-token"
SENTRY_DSN="your-sentry-dsn"
```

### Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { isServer, dev }) => {
    // Konfiguracja webpack
  }
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: { /* paleta kolorów */ },
        secondary: { /* paleta kolorów */ },
      }
    }
  }
}
```

## 🗄️ Baza Danych

### Schemat Prisma

```prisma
// Główne modele
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  firstName     String?
  lastName      String?
  role          UserRole  @default(USER)
  isActive      Boolean   @default(false)
  // ... inne pola
}

model Pigeon {
  id          String   @id @default(cuid())
  name        String
  ringNumber  String   @unique
  bloodline   String
  gender      String
  // ... inne pola
}

model Auction {
  id          String      @id @default(cuid())
  title       String
  description String
  startingPrice Float
  currentPrice  Float
  status      AuctionStatus @default(ACTIVE)
  // ... inne pola
}
```

### Relacje

- **User** ↔ **Auction** (seller)
- **User** ↔ **Bid** (bidder)
- **Auction** ↔ **Pigeon** (przedmiot aukcji)
- **Auction** ↔ **AuctionAsset** (zdjęcia/filmy)
- **User** ↔ **Transaction** (kupujący/sprzedający)

### Migracje

```bash
# Tworzenie migracji
npx prisma migrate dev --name migration-name

# Aplikowanie migracji
npx prisma migrate deploy

# Reset bazy danych
npx prisma migrate reset
```

## 🔌 API Endpoints

### Autentykacja

```text
POST /api/auth/register          # Rejestracja
POST /api/auth/activate          # Aktywacja konta
POST /api/auth/send-sms          # Wysłanie SMS
POST /api/auth/verify-sms        # Weryfikacja SMS
```

### Aukcje

```text
GET    /api/auctions             # Lista aukcji
POST   /api/auctions/create      # Tworzenie aukcji
GET    /api/auctions/[id]        # Szczegóły aukcji
POST   /api/auctions/bid         # Licytacja
```

### Płatności

```text
POST /api/payments/create-intent     # Tworzenie płatności
POST /api/payments/confirm-delivery  # Potwierdzenie dostawy
POST /api/payments/dispute           # Spór
```

### Upload

```text
POST /api/upload                     # Upload plików
POST /api/breeder-meetings/upload    # Upload zdjęć spotkań
```

## 🧩 Komponenty

### UI Components

- **UnifiedButton** - uniwersalny przycisk
- **UnifiedCard** - karta z animacjami
- **GlassContainer** - szklany efekt
- **FloatingCard** - unosząca się karta
- **Button3D** - przycisk 3D
- **Text3D** - tekst 3D

### Layout Components

- **UnifiedLayout** - główny layout
- **PageHeader** - nagłówek strony
- **Footer** - stopka
- **LogoGlow** - świecące logo

### Feature Components

- **AuctionDetails** - szczegóły aukcji
- **ChampionProfile** - profil championa
- **SearchTrends** - trendy wyszukiwania

### Animacje

- **Framer Motion** - podstawowe animacje
- **GSAP** - zaawansowane animacje
- **React Spring** - animacje fizyczne

## 🎨 Styling

### Tailwind CSS

- **Utility-first** - szybkie prototypowanie
- **Custom Design System** - spójne kolory i spacing
- **Responsive Design** - mobile-first approach
- **Dark Mode Ready** - przygotowanie na tryb ciemny

### Custom CSS

- **CSS Modules** - lokalne style
- **Global Styles** - wspólne style
- **Animations** - keyframes i transitions

### Design Tokens

```css
:root {
  --color-primary: #0ea5e9;
  --color-secondary: #71717a;
  --font-sans: 'Inter', system-ui;
  --font-display: 'Poppins', system-ui;
}
```

## 🔒 Bezpieczeństwo

### Bezpieczeństwo Autentykacji

- **NextAuth.js** - OAuth + JWT
- **Session Management** - bezpieczne sesje
- **CSRF Protection** - ochrona przed CSRF
- **Rate Limiting** - ograniczenia API

### Walidacja

- **Zod** - walidacja po stronie klienta
- **Joi** - walidacja po stronie serwera
- **Prisma** - walidacja na poziomie bazy danych

### Bezpieczeństwo API

- **CORS** - konfiguracja cross-origin
- **Helmet** - nagłówki bezpieczeństwa
- **Input Sanitization** - czyszczenie danych

### Bezpieczeństwo Płatności

- **Stripe** - bezpieczne płatności
- **Webhook Verification** - weryfikacja webhooków
- **PCI Compliance** - zgodność z PCI DSS

## 🚀 Deployment

### Vercel (Zalecane)

```bash
# Instalacja Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables w Vercel Dashboard
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="production-secret"
STRIPE_SECRET_KEY="sk_live_..."
```

## 📜 Skrypty

### Development

```bash
npm run dev              # Serwer deweloperski
npm run dev:clean        # Dev z czyszczeniem cache
npm run dev:reset        # Reset i uruchomienie
```

### Database

```bash
npm run migrate          # Migracja danych testowych
npm run migrate:dev      # Prisma migrate dev
npm run migrate:deploy   # Prisma migrate deploy
npm run db:reset         # Reset bazy danych
```

### Maintenance

```bash
npm run clean            # Czyszczenie cache
npm run cleanup          # Auto-cleanup
npm run fix              # Naprawa błędów Next.js
```

### Build & Production

```bash
npm run build            # Build produkcyjny
npm run start            # Serwer produkcyjny
npm run lint             # ESLint
```

## 🧪 Testowanie

### Unit Tests

```bash
npm run test             # Vitest
npm run test:watch       # Watch mode
```

### E2E Tests

```bash
npm run test:e2e         # Playwright
npm run test:e2e:ui      # Playwright UI
```

### Test Coverage

```bash
npm run test:coverage    # Coverage report
```

## 📊 Monitoring

### Error Tracking

- **Sentry** - śledzenie błędów w czasie rzeczywistym
- **Error Boundaries** - obsługa błędów React

### Performance

- **Vercel Analytics** - metryki wydajności
- **Web Vitals** - Core Web Vitals
- **Bundle Analyzer** - analiza rozmiaru bundle

### User Analytics

- **Mixpanel** - śledzenie zachowań użytkowników
- **Custom Events** - własne metryki

## 🤝 Współpraca

### Git Workflow

```bash
git checkout -b feature/nazwa-funkcji
git commit -m "feat: dodaj nową funkcję"
git push origin feature/nazwa-funkcji
```

### Code Style

- **ESLint** - linting
- **Prettier** - formatowanie
- **TypeScript** - typowanie
- **Conventional Commits** - konwencja commitów

### Pull Request Template

```markdown
## Opis
Krótki opis zmian

## Typ zmian
- [ ] Bug fix
- [ ] Nowa funkcja
- [ ] Breaking change
- [ ] Dokumentacja

## Testy
- [ ] Unit tests
- [ ] E2E tests
- [ ] Manual testing
```

## 📞 Wsparcie

### Dokumentacja

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Kontakt

- **Email**: <support@palkamtm.pl>
- **GitHub Issues**: [Issues](https://github.com/your-repo/issues)
- **Discord**: [Discord Server](https://discord.gg/your-server)

---

**Pałka MTM - Mistrzowie Sprintu** 🐦  
*Elitarna platforma aukcyjna gołębi pocztowych*
