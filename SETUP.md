# Instrukcje Uruchomienia Platformy Aukcyjnej Gołębi Pocztowych

## 🚀 Szybki Start

### 1. Wymagania Systemowe

- Node.js 18+
- PostgreSQL 14+
- npm lub yarn

### 2. Instalacja

```bash
# Sklonuj repozytorium
git clone <repository-url>
cd pigeon-auction-platform

# Zainstaluj zależności
npm install

# Skopiuj plik środowiskowy
cp env.example .env.local
```

### 3. Konfiguracja Bazy Danych

```bash
# Utwórz bazę danych PostgreSQL
createdb pigeon_auction

# Uruchom migracje
npx prisma generate
npx prisma db push

# (Opcjonalnie) Wypełnij bazę danymi testowymi
npx prisma db seed
```

### 4. Konfiguracja Zmiennych Środowiskowych

Edytuj plik `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pigeon_auction"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (opcjonalne na początku)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (opcjonalne na początku)
RESEND_API_KEY="re_..."
```

### 5. Uruchomienie Aplikacji

```bash
# Tryb deweloperski
npm run dev

# Aplikacja będzie dostępna pod adresem:
# http://localhost:3000
```

## 📋 Dostępne Strony

### Publiczne

- `/` - Strona główna
- `/heritage` - Nasze Dziedzictwo
- `/champions/thunder-storm` - Przykład profilu championa
- `/references` - Referencje
- `/auctions` - Lista aukcji
- `/auth/signin` - Logowanie
- `/auth/signup` - Rejestracja

### Chronione (wymagają logowania)

- `/buyer/dashboard` - Panel kupującego
- `/seller/dashboard` - Panel sprzedawcy (w przygotowaniu)
- `/admin/dashboard` - Panel administratora (w przygotowaniu)

## 🔐 Testowe Konta

Po uruchomieniu aplikacji możesz utworzyć konto przez formularz rejestracji lub użyć danych testowych:

### Kupujący

- Email: `buyer@test.com`
- Hasło: `password123`

### Sprzedawca

- Email: `seller@test.com`
- Hasło: `password123`

### Administrator

- Email: `admin@test.com`
- Hasło: `password123`

## 🛠️ Dostępne Skrypty

```bash
# Rozwój
npm run dev          # Uruchom serwer deweloperski
npm run build        # Zbuduj aplikację produkcyjną
npm run start        # Uruchom aplikację produkcyjną

# Baza danych
npm run db:generate  # Generuj klienta Prisma
npm run db:push      # Wypchnij zmiany do bazy
npm run db:studio    # Otwórz Prisma Studio

# Testy
npm run test         # Uruchom testy jednostkowe
npm run test:e2e     # Uruchom testy E2E

# Linting
npm run lint         # Sprawdź kod ESLint
npm run lint:fix     # Napraw błędy ESLint
```

## 🗄️ Struktura Bazy Danych

### Główne Tabele

- `User` - Użytkownicy (kupujący, sprzedawcy, administratorzy)
- `Pigeon` - Gołębie z rodowodami i osiągnięciami
- `Auction` - Aukcje gołębi i produktów
- `Bid` - Oferty w aukcjach
- `Transaction` - Transakcje i płatności
- `Message` - Wiadomości między użytkownikami

### Relacje

- Użytkownik może mieć wiele aukcji (sprzedawca)
- Użytkownik może składać wiele ofert (kupujący)
- Aukcja może mieć wiele ofert
- Gołąb może być w wielu aukcjach

## 🎨 Personalizacja

### Kolory

Edytuj plik `tailwind.config.js` aby zmienić kolory:

```javascript
colors: {
  primary: {
    // Zmień kolory primary
  }
}
```

### Treści

- Teksty: Edytuj komponenty w folderze `components/`
- Obrazy: Umieść w folderze `public/`
- Ikony: Użyj Lucide React

## 🚀 Wdrożenie

### Vercel (Zalecane)

1. Połącz repozytorium z Vercel
2. Dodaj zmienne środowiskowe w panelu Vercel
3. Wdróż automatycznie

### Docker

```bash
# Zbuduj obraz
docker build -t pigeon-auction .

# Uruchom kontener
docker run -p 3000:3000 pigeon-auction
```

## 🐛 Rozwiązywanie Problemów

### Błąd bazy danych

```bash
# Sprawdź połączenie
npx prisma db pull

# Zresetuj bazę
npx prisma db push --force-reset
```

### Błąd autoryzacji

- Sprawdź `NEXTAUTH_SECRET`
- Upewnij się, że `NEXTAUTH_URL` jest poprawny

### Błąd buildowania

```bash
# Wyczyść cache
rm -rf .next
npm run build
```

## 📞 Wsparcie

W przypadku problemów:

1. Sprawdź logi w konsoli
2. Sprawdź dokumentację Next.js i Prisma
3. Skontaktuj się z zespołem deweloperskim

---

**Uwaga**: To jest projekt w fazie rozwoju. Niektóre funkcjonalności mogą nie być w pełni zaimplementowane.
