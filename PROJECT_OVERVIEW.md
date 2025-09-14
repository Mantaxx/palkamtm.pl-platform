# 🐦 Platforma Aukcyjna Gołębi Pocztowych

Kompleksowa platforma aukcyjna dla gołębi pocztowych zbudowana w Next.js 14, TypeScript i Tailwind CSS.

## 🚀 Funkcjonalności

### ✅ Zaimplementowane

#### 1. **Strona Główna i Narracja**

- **Hero Section** - Pełnoekranowa sekcja z dynamicznym tłem wideo
- **Bento Grid** - Modularny układ z wyróżnionymi elementami
- **Sekcja Championów** - Prezentacja najlepszych gołębi
- **Nadchodzące Aukcje** - Podgląd aktywnych aukcji
- **Filozofia Hodowli** - Krótki cytat z linkiem do szczegółów

#### 2. **Strona "Nasze Dziedzictwo"**

- **Interaktywna Oś Czasu** - Horyzontalna timeline kluczowych momentów
- **Filozofia Hodowli** - 6 podstawowych zasad hodowli
- **Nowoczesne Metody** - Techniki żywieniowe, treningowe i genetyczne

#### 3. **Galeria Championów**

- **Profil Championa** - Reużywalny komponent z:
  - Galerią zdjęć i wideo z możliwością powiększania
  - Interaktywnym drzewem genealogicznym
  - Tabelą wyników zawodów
  - Siatką wybitnego potomstwa

#### 4. **Strona Referencji**

- **Case Studies** - Studia przypadku hodowców
- **Testimonialy** - Opinie z listą zwycięstw
- **Linki do Rodowodów** - Bezpośrednie połączenia z profilami

#### 5. **System Użytkowników**

- **NextAuth.js** - Autentykacja z rolami (Kupujący, Sprzedawca, Administrator)
- **Rejestracja/Logowanie** - Email/hasło + opcja Passkeys
- **Przekierowania** - Automatyczne przekierowanie do odpowiednich paneli

#### 6. **Panele Użytkowników**

##### Panel Kupującego

- **Przegląd** - Statystyki, ostatnie aktywności
- **Obserwowane** - Lista aukcji na watchliście
- **Moje Oferty** - Historia licytacji
- **Płatności** - Zarządzanie płatnościami z escrow
- **Historia** - Zakupy i transakcje

##### Panel Sprzedawcy

- **Przegląd** - Statystyki sprzedaży, przychody
- **Moje Aukcje** - Zarządzanie ofertami
- **Płatności** - Monitorowanie płatności i prowizji
- **Wiadomości** - Komunikacja z kupującymi

##### Panel Administratora

- **Przegląd** - Statystyki platformy
- **Użytkownicy** - Zarządzanie kontami, zatwierdzanie sprzedawców
- **Transakcje** - Monitorowanie płatności i sporów
- **Ustawienia** - Konfiguracja prowizji i limitów

#### 7. **System Aukcyjny**

- **Szczegóły Aukcji** - Pełnoekranowa galeria, licznik czasu
- **Licytacja w Czasie Rzeczywistym** - Automatyczne odliczanie, aktualizacje
- **Historia Licytacji** - Lista ofert z informacjami o licytujących
- **Tworzenie Aukcji** - Wieloetapowy formularz (5 kroków):
  - Wybór kategorii (Gołąb, Suplementy, Akcesoria)
  - Szczegóły produktu (numer obrączki, linia krwi, płeć, data urodzenia)
  - Cena i format sprzedaży
  - Upload plików multimedialnych
  - Podsumowanie i publikacja

#### 8. **System Płatności Stripe Connect**

- **Escrow System** - Bezpieczne przechowywanie środków
- **Modal Płatności** - Integracja z Stripe Elements
- **Zarządzanie Płatnościami** - Dla kupujących i sprzedawców
- **Potwierdzanie Dostawy** - Zwolnienie środków ze escrow
- **System Sporów** - Zgłaszanie problemów i zwrot środków
- **Prowizje** - Automatyczne obliczanie prowizji platformy (5%)

#### 9. **Zaawansowane Wyszukiwanie**

- **Quick Search** - Wyszukiwanie z sugestiami w nawigacji
- **Advanced Search** - Strona z zaawansowanymi filtrami:
  - Wyszukiwanie tekstowe
  - Filtry: kategoria, linia krwi, cena, wiek, płeć, lokalizacja
  - Ocena sprzedawcy
  - Sortowanie według różnych kryteriów
- **Search Trends** - Popularne wyszukiwania i trendy
- **Responsywny Design** - Dostosowany do wszystkich urządzeń

## 🛠️ Technologie

### Frontend

- **Next.js 14** - App Router, Server Components
- **TypeScript** - Pełne typowanie
- **Tailwind CSS** - Stylizacja
- **Framer Motion** - Animacje i przejścia
- **Lucide React** - Ikony

### Backend & API

- **Next.js API Routes** - Endpointy API
- **NextAuth.js** - Autentykacja i autoryzacja
- **Prisma ORM** - Zarządzanie bazą danych
- **PostgreSQL** - Baza danych

### Płatności

- **Stripe** - Bramka płatności
- **Stripe Connect** - Płatności między użytkownikami
- **Escrow System** - Bezpieczne transakcje

### Narzędzia Deweloperskie

- **ESLint** - Linting kodu
- **Prettier** - Formatowanie
- **Vitest** - Testy jednostkowe
- **React Testing Library** - Testy komponentów
- **Playwright** - Testy E2E

## 📁 Struktura Projektu

```text
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Grupa tras autentykacji
│   ├── admin/             # Panel administratora
│   ├── auctions/          # Aukcje
│   ├── buyer/             # Panel kupującego
│   ├── champions/         # Profile championów
│   ├── heritage/          # Nasze dziedzictwo
│   ├── references/        # Referencje
│   ├── search/            # Wyszukiwanie
│   ├── seller/            # Panel sprzedawcy
│   └── api/               # API endpoints
├── components/            # Komponenty React
│   ├── auth/              # Komponenty autentykacji
│   ├── auctions/          # Komponenty aukcji
│   ├── champions/         # Komponenty championów
│   ├── dashboard/         # Panele użytkowników
│   ├── heritage/          # Komponenty dziedzictwa
│   ├── home/              # Komponenty strony głównej
│   ├── layout/            # Layout i nawigacja
│   ├── payments/          # Komponenty płatności
│   ├── providers/         # Context providers
│   ├── references/        # Komponenty referencji
│   └── search/            # Komponenty wyszukiwania
├── lib/                   # Utilities i konfiguracja
├── prisma/                # Schema bazy danych
├── types/                 # Definicje typów TypeScript
└── public/                # Pliki statyczne
```

## 🚀 Uruchomienie

1. **Instalacja zależności:**

   ```bash
   npm install
   ```

2. **Konfiguracja środowiska:**

   ```bash
   cp env.example .env.local
   ```

3. **Konfiguracja bazy danych:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Uruchomienie serwera deweloperskiego:**

   ```bash
   npm run dev
   ```

## 🔧 Konfiguracja

### Zmienne Środowiskowe

- `DATABASE_URL` - URL bazy danych PostgreSQL
- `NEXTAUTH_SECRET` - Klucz sekretny NextAuth
- `NEXTAUTH_URL` - URL aplikacji
- `STRIPE_SECRET_KEY` - Klucz sekretny Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Klucz publiczny Stripe
- `RESEND_API_KEY` - Klucz API Resend (email)

### Baza Danych

Schema Prisma zawiera modele:

- `User` - Użytkownicy z rolami
- `Account`, `Session`, `VerificationToken` - NextAuth
- `Pigeon` - Gołębie (rozszerzalne)

## 🎨 Design System

### Kolory

- **Primary**: Niebieski (#3B82F6)
- **Secondary**: Szary (#6B7280)
- **Success**: Zielony (#10B981)
- **Warning**: Żółty (#F59E0B)
- **Error**: Czerwony (#EF4444)

### Typografia

- **Display**: Font bezszeryfowy dla nagłówków
- **Body**: Font szeryfowy dla tekstu

### Komponenty

- **Responsive Design** - Mobile-first approach
- **Accessibility** - ARIA labels, keyboard navigation
- **Animations** - Płynne przejścia z Framer Motion

## 🔒 Bezpieczeństwo

- **NextAuth.js** - Bezpieczna autentykacja
- **Stripe** - PCI DSS compliant płatności
- **Escrow** - Ochrona środków w transakcjach
- **Input Validation** - Zod schemas
- **CSRF Protection** - Wbudowane w Next.js

## 📱 Responsywność

- **Mobile First** - Projektowanie od urządzeń mobilnych
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly** - Przyciski i interakcje dostosowane do dotyku

## 🧪 Testowanie

```bash
# Testy jednostkowe
npm run test

# Testy E2E
npm run test:e2e

# Linting
npm run lint
```

## 🚀 Deployment

### Vercel (Zalecane)

1. Połącz repozytorium z Vercel
2. Skonfiguruj zmienne środowiskowe
3. Deploy automatyczny przy push

### Inne Platformy

- **Netlify** - Static export
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 📈 Monitoring i Analytics

- **Vercel Analytics** - Performance monitoring
- **Stripe Dashboard** - Monitoring płatności
- **Error Tracking** - Sentry (opcjonalnie)

## 🔮 Przyszłe Rozszerzenia

- **WebSockets** - Real-time licytacja
- **Push Notifications** - Powiadomienia push
- **Mobile App** - React Native
- **AI Recommendations** - Rekomendacje gołębi
- **Video Streaming** - Live streaming aukcji
- **Multi-language** - Wsparcie wielu języków

## 📞 Wsparcie

- **Dokumentacja**: README.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

**Status**: ✅ Kompletny MVP gotowy do produkcji
**Wersja**: 1.0.0
**Ostatnia aktualizacja**: 2024
