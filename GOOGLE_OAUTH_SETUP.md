# Konfiguracja Google OAuth

## Krok 1: Utwórz projekt w Google Cloud Console

1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Kliknij "Select a project" → "New Project"
3. Wpisz nazwę projektu (np. "Palka OAuth")
4. Kliknij "Create"

## Krok 2: Włącz Google+ API

1. W menu po lewej stronie wybierz "APIs & Services" → "Library"
2. Wyszukaj "Google+ API"
3. Kliknij na "Google+ API" i następnie "Enable"

## Krok 3: Utwórz OAuth 2.0 Client ID

1. Przejdź do "APIs & Services" → "Credentials"
2. Kliknij "Create Credentials" → "OAuth 2.0 Client ID"
3. Jeśli to pierwszy raz, skonfiguruj "OAuth consent screen":
   - Wybierz "External" (chyba że masz konto Google Workspace)
   - Wypełnij wymagane pola:
     - App name: "Pałka M.T.M. Mistrzowie Sprintu"
     - User support email: Twój email
     - Developer contact: Twój email
   - Kliknij "Save and Continue"
   - W "Scopes" kliknij "Add or Remove Scopes" i dodaj:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
   - Kliknij "Save and Continue"
   - W "Test users" dodaj swój email (opcjonalne)
   - Kliknij "Save and Continue"

4. Teraz utwórz OAuth 2.0 Client ID:
   - Application type: "Web application"
   - Name: "Palka Web Client"
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Kliknij "Create"

## Krok 4: Skopiuj dane do .env.local

1. Skopiuj "Client ID" i "Client Secret" z utworzonego OAuth client
2. Otwórz plik `.env.local` w głównym katalogu projektu
3. Zastąp wartości:

   ```env
   GOOGLE_CLIENT_ID="twoj-rzeczywisty-client-id"
   GOOGLE_CLIENT_SECRET="twoj-rzeczywisty-client-secret"
   ```

## Krok 5: Zrestartuj serwer

```bash
npm run dev
```

## Krok 6: Przetestuj logowanie

1. Przejdź do `http://localhost:3000/auth/signin`
2. Kliknij przycisk "Google"
3. Powinieneś zostać przekierowany do Google OAuth
4. Po zalogowaniu zostaniesz przekierowany z powrotem do aplikacji

## Rozwiązywanie problemów

### Błąd "OAuthAccountNotLinked"

- Sprawdź czy `GOOGLE_CLIENT_ID` i `GOOGLE_CLIENT_SECRET` są poprawnie ustawione
- Upewnij się, że redirect URI jest dokładnie `http://localhost:3000/api/auth/callback/google`

### Błąd "redirect_uri_mismatch"

- W Google Cloud Console sprawdź czy redirect URI jest dokładnie taki sam jak w aplikacji
- Upewnij się, że nie ma dodatkowych slashów na końcu

### Błąd "invalid_client"

- Sprawdź czy Client ID i Client Secret są poprawne
- Upewnij się, że nie ma dodatkowych spacji w pliku .env.local

## Produkcja

Dla środowiska produkcyjnego:

1. Dodaj domenę produkcyjną do "Authorized redirect URIs"
2. Zmień `NEXTAUTH_URL` na domenę produkcyjną
3. Użyj silnego `NEXTAUTH_SECRET`
