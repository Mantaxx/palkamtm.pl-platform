# Konfiguracja OAuth - Google i Facebook

## ✅ Co zostało naprawione

1. **Włączono dostawców OAuth** w `lib/auth.ts`
2. **Dodano importy** dla GoogleProvider i FacebookProvider
3. **Naprawiono callback signIn** - teraz automatycznie tworzy użytkowników OAuth
4. **Dodano zmienne środowiskowe** do `env.example`

## 🔧 Konfiguracja Google OAuth

### 1. Utwórz projekt w Google Cloud Console
1. Idź do [Google Cloud Console](https://console.cloud.google.com/)
2. Utwórz nowy projekt lub wybierz istniejący
3. Włącz Google+ API

### 2. Skonfiguruj OAuth consent screen
1. W menu wybierz "APIs & Services" > "OAuth consent screen"
2. Wybierz "External" (dla publicznych aplikacji)
3. Wypełnij wymagane pola:
   - App name: "Pigeon Auction Platform"
   - User support email: twój email
   - Developer contact: twój email

### 3. Utwórz credentials
1. Idź do "APIs & Services" > "Credentials"
2. Kliknij "Create Credentials" > "OAuth 2.0 Client IDs"
3. Wybierz "Web application"
4. Dodaj authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dla development)
   - `https://twoja-domena.com/api/auth/callback/google` (dla production)

### 4. Skopiuj Client ID i Client Secret
- Client ID: skopiuj do `GOOGLE_CLIENT_ID`
- Client Secret: skopiuj do `GOOGLE_CLIENT_SECRET`

## 🔧 Konfiguracja Facebook OAuth

### 1. Utwórz aplikację Facebook
1. Idź do [Facebook Developers](https://developers.facebook.com/)
2. Kliknij "My Apps" > "Create App"
3. Wybierz "Consumer" > "Next"
4. Wypełnij dane aplikacji

### 2. Skonfiguruj Facebook Login
1. W menu aplikacji wybierz "Facebook Login" > "Settings"
2. Dodaj Valid OAuth Redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (dla development)
   - `https://twoja-domena.com/api/auth/callback/facebook` (dla production)

### 3. Skopiuj App ID i App Secret
- App ID: skopiuj do `FACEBOOK_CLIENT_ID`
- App Secret: skopiuj do `FACEBOOK_CLIENT_SECRET`

## 📝 Konfiguracja zmiennych środowiskowych

Utwórz plik `.env.local` w głównym katalogu projektu:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="twoj-sekretny-klucz"

# OAuth Providers
GOOGLE_CLIENT_ID="twoj-google-client-id"
GOOGLE_CLIENT_SECRET="twoj-google-client-secret"
FACEBOOK_CLIENT_ID="twoj-facebook-client-id"
FACEBOOK_CLIENT_SECRET="twoj-facebook-client-secret"
```

## 🚀 Testowanie

1. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

2. Idź do `/auth/signin`
3. Kliknij "Google" lub "Facebook"
4. Zaloguj się przez OAuth
5. Sprawdź czy użytkownik został utworzony w bazie danych

## ⚠️ Uwagi

- **Development**: Użyj `http://localhost:3000` w redirect URIs
- **Production**: Zmień na rzeczywistą domenę
- **Facebook**: Może wymagać weryfikacji aplikacji dla publicznego użycia
- **Google**: Działa od razu w trybie testowym

## 🔍 Rozwiązywanie problemów

### Błąd "redirect_uri_mismatch"
- Sprawdź czy redirect URI w konfiguracji OAuth jest identyczny z tym w kodzie
- Upewnij się, że nie ma dodatkowych slashów lub różnic w wielkości liter

### Błąd "invalid_client"
- Sprawdź czy Client ID i Client Secret są poprawne
- Upewnij się, że aplikacja jest włączona w Google/Facebook

### Błąd "access_denied"
- Sprawdź czy OAuth consent screen jest skonfigurowany
- Upewnij się, że domena jest dodana do authorized domains
