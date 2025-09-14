# Platforma Aukcyjna Gołębi Pocztowych

Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych, umożliwiająca kupno i sprzedaż championów z rodowodami.

## 🚀 Funkcjonalności

### ✅ Zaimplementowane

- **Strona główna** z sekcją hero i Bento Grid
- **Podstrona "Nasze Dziedzictwo"** z interaktywną osią czasu
- **Profil championa** z galerią, rodowodem i wynikami
- **Strona referencji** z case studies
- **System autoryzacji** z NextAuth.js
- **Panel kupującego** z zarządzaniem aukcjami

### 🔄 W trakcie rozwoju

- Panel sprzedawcy
- Panel administratora
- System aukcyjny z licytacją w czasie rzeczywistym
- Integracja z Stripe Connect
- System wyszukiwania i filtrowania

## 🛠️ Technologie

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Baza danych**: PostgreSQL
- **Autoryzacja**: NextAuth.js
- **Animacje**: Framer Motion
- **Ikony**: Lucide React
- **Daty**: date-fns
- **Zarządzanie stanem**: Zustand
- **Płatności**: Stripe Connect
- **WebSockets**: Socket.io

## 📦 Instalacja

1. **Sklonuj repozytorium**

```bash
git clone <repository-url>
cd pigeon-auction-platform
```

2. **Zainstaluj zależności**

```bash
npm install
```

3. **Skonfiguruj zmienne środowiskowe**

```bash
cp .env.example .env.local
```

Wypełnij plik `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pigeon_auction"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
```

4. **Skonfiguruj bazę danych**

```bash
npx prisma generate
npx prisma db push
```

5. **Uruchom aplikację**

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## 🗂️ Struktura Projektu

```
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── auth/              # Strony autoryzacji
│   ├── buyer/             # Panel kupującego
│   ├── seller/            # Panel sprzedawcy
│   ├── admin/             # Panel administratora
│   ├── champions/         # Profile championów
│   ├── heritage/          # Strona dziedzictwa
│   └── references/        # Strona referencji
├── components/            # Komponenty React
│   ├── layout/           # Komponenty layoutu
│   ├── home/             # Komponenty strony głównej
│   ├── heritage/         # Komponenty dziedzictwa
│   ├── champions/        # Komponenty championów
│   ├── references/       # Komponenty referencji
│   ├── dashboard/        # Komponenty paneli
│   └── providers/        # Dostawcy kontekstu
├── lib/                  # Biblioteki i utilities
│   ├── auth.ts          # Konfiguracja NextAuth
│   ├── prisma.ts        # Klient Prisma
│   └── utils.ts         # Funkcje pomocnicze
├── prisma/              # Schema bazy danych
└── types/               # Definicje TypeScript
```

## 🎨 Design System

### Kolory

- **Primary**: Niebieski (#0ea5e9)
- **Secondary**: Szary (#71717a)
- **Success**: Zielony (#10b981)
- **Warning**: Żółty (#f59e0b)
- **Error**: Czerwony (#ef4444)

### Typografia

- **Display**: Poppins (nagłówki)
- **Body**: Inter (tekst)

### Komponenty

- Wszystkie komponenty używają Tailwind CSS
- Animacje z Framer Motion
- Responsywny design mobile-first

## 🔐 System Autoryzacji

### Role użytkowników

- **BUYER**: Kupujący - może licytować i kupować
- **SELLER**: Sprzedawca - może tworzyć aukcje
- **ADMIN**: Administrator - pełny dostęp

### Funkcjonalności

- Rejestracja z walidacją
- Logowanie z hasłem
- Ochrona tras na podstawie ról
- Sesje JWT

## 🏆 System Aukcyjny

### Typy aukcji

- **Licytacja standardowa**: Oferty wyższe od aktualnej ceny
- **Licytacja z auto-przebiciem**: Maksymalna oferta, system licytuje automatycznie
- **Kup Teraz**: Natychmiastowy zakup

### Funkcjonalności

- Licytacja w czasie rzeczywistym (WebSockets)
- Anti-sniping (przedłużenie czasu w ostatniej minucie)
- System powiadomień
- Historia ofert

## 💳 System Płatności

### Stripe Connect

- Płatności escrow
- Automatyczne rozliczenia
- Prowizje platformy
- Obsługa sporów

### Przepływ transakcji

1. Kupujący wygrywa aukcję
2. Płatność trafia do escrow
3. Sprzedawca wysyła przedmiot
4. Kupujący potwierdza odbiór
5. Środki trafiają do sprzedawcy (minus prowizja)

## 🧪 Testowanie

### Testy jednostkowe

```bash
npm run test
```

### Testy E2E

```bash
npm run test:e2e
```

## 🚀 Wdrożenie

### Vercel (Zalecane)

1. Połącz repozytorium z Vercel
2. Skonfiguruj zmienne środowiskowe
3. Wdróż automatycznie

### Inne platformy

- Docker support
- PM2 dla Node.js
- Nginx jako reverse proxy

## 📝 Licencja

Ten projekt jest własnością prywatną. Wszystkie prawa zastrzeżone.

## 🤝 Wsparcie

W przypadku pytań lub problemów, skontaktuj się z zespołem deweloperskim.

---

**Uwaga**: To jest projekt w fazie rozwoju. Niektóre funkcjonalności mogą nie być w pełni zaimplementowane.
