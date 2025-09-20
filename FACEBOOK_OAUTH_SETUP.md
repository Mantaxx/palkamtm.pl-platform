# Konfiguracja Facebook OAuth

## Krok 1: Utwórz aplikację w Facebook Developers

1. Przejdź do [Facebook Developers](https://developers.facebook.com/)
2. Kliknij "My Apps" → "Create App"
3. Wybierz "Consumer" jako typ aplikacji
4. Wpisz nazwę aplikacji (np. "Pałka M.T.M. Mistrzowie Sprintu")
5. Wpisz swój email kontaktowy
6. Kliknij "Create App"

## Krok 2: Skonfiguruj Facebook Login

1. W panelu aplikacji wybierz "Facebook Login" → "Set Up"
2. Wybierz "Web" jako platformę
3. Wpisz URL strony: `http://localhost:3000`
4. Kliknij "Save"

## Krok 3: Skonfiguruj OAuth Redirect URIs

1. W menu po lewej stronie wybierz "Facebook Login" → "Settings"
2. W sekcji "Valid OAuth Redirect URIs" dodaj:
   - `http://localhost:3000/api/auth/callback/facebook`
3. Kliknij "Save Changes"

## Krok 4: Pobierz App ID i App Secret

1. W menu po lewej stronie wybierz "Settings" → "Basic"
2. Skopiuj "App ID" (to będzie `FACEBOOK_CLIENT_ID`)
3. Kliknij "Show" przy "App Secret" i skopiuj go (to będzie `FACEBOOK_CLIENT_SECRET`)

## Krok 5: Skonfiguruj domeny aplikacji

1. W "Settings" → "Basic" przewiń w dół do "App Domains"
2. Dodaj: `localhost`
3. W sekcji "Website" dodaj: `http://localhost:3000`
4. Kliknij "Save Changes"

## Krok 6: Zaktualizuj plik .env.local

Otwórz plik `.env.local` i zastąp wartości:

```env
FACEBOOK_CLIENT_ID="twój-app-id-z-facebook"
FACEBOOK_CLIENT_SECRET="twój-app-secret-z-facebook"
```

## Krok 7: Zrestartuj serwer

```bash
npm run dev
```

## Krok 8: Przetestuj logowanie

1. Przejdź do `http://localhost:3000/auth/signin`
2. Kliknij przycisk "Facebook"
3. Powinieneś zostać przekierowany do Facebook OAuth
4. Po zalogowaniu zostaniesz przekierowany z powrotem do aplikacji

## Rozwiązywanie problemów

### Błąd "App Not Setup"

- Upewnij się, że aplikacja jest w trybie "Development"
- Sprawdź czy wszystkie wymagane pola są wypełnione w "App Review"

### Błąd "Invalid Redirect URI"

- Sprawdź czy redirect URI jest dokładnie: `http://localhost:3000/api/auth/callback/facebook`
- Upewnij się, że nie ma dodatkowych slashów na końcu

### Błąd "App Secret Mismatch"

- Sprawdź czy App Secret jest poprawnie skopiowany
- Upewnij się, że nie ma dodatkowych spacji w pliku .env.local

## Produkcja

Dla środowiska produkcyjnego:

1. Dodaj domenę produkcyjną do "App Domains"
2. Dodaj redirect URI produkcyjny: `https://twoja-domena.com/api/auth/callback/facebook`
3. Przełącz aplikację na tryb "Live" w Facebook Developers
4. Zaktualizuj zmienne środowiskowe na serwerze produkcyjnym

## Wymagane uprawnienia

Facebook automatycznie żąda podstawowych uprawnień:

- `email` - do pobrania adresu email
- `public_profile` - do pobrania podstawowych informacji profilu

Te uprawnienia są wystarczające dla większości aplikacji.
