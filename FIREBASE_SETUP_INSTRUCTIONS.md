# 🔥 Firebase Setup - Instrukcja Krok po Kroku

## 🚨 **Problem:**

Otrzymujesz błąd `auth/api-key-not-valid` ponieważ masz placeholder wartości w `.env.local` zamiast prawdziwych kluczy Firebase.

## 🔧 **Rozwiązanie:**

### **Krok 1: Firebase Console Setup**

1. **Idź do [Firebase Console](https://console.firebase.google.com/)**
2. **Kliknij "Create a project"** lub wybierz istniejący
3. **Nazwij projekt** (np. "palka-mtm-auth")
4. **Wyłącz Google Analytics** (opcjonalnie)
5. **Kliknij "Create project"**

### **Krok 2: Dodaj Web App**

1. **W Firebase Console kliknij ikonę Web (</>)**
2. **Nazwij aplikację** (np. "palka-mtm-web")
3. **Kliknij "Register app"**
4. **Skopiuj konfigurację Firebase** - będzie wyglądać tak:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...twoj_prawdziwy_klucz",
  authDomain: "twoj-projekt.firebaseapp.com",
  projectId: "twoj-projekt-id",
  storageBucket: "twoj-projekt.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### **Krok 3: Włącz Authentication**

1. **W Firebase Console przejdź do "Authentication"**
2. **Kliknij "Get started"**
3. **Przejdź do zakładki "Sign-in method"**
4. **Włącz następujące metody:**
   - ✅ **Email/Password** - kliknij "Enable"
   - ✅ **Phone** - kliknij "Enable" (dla SMS)
   - ✅ **Google** - kliknij "Enable" (dla Google OAuth)
   - ✅ **Facebook** - kliknij "Enable" (dla Facebook OAuth)

### **Krok 4: Skonfiguruj Google OAuth**

1. **W sekcji Google kliknij "Configure"**
2. **Wybierz projekt Google Cloud** (lub utwórz nowy)
3. **Dodaj domeny:**
   - `localhost` (dla development)
   - Twoja domena produkcyjna
4. **Kliknij "Save"**

### **Krok 5: Skonfiguruj Facebook OAuth**

1. **Idź do [Facebook Developers](https://developers.facebook.com/)**
2. **Kliknij "Create App"**
3. **Wybierz "Consumer"** > "Next"
4. **Nazwij aplikację** (np. "PAŁKA MTM")
5. **Dodaj kontakt email**
6. **Kliknij "Create App"**

#### **W Facebook Developers:**

1. **Przejdź do "Facebook Login"** > "Settings"
2. **Dodaj domeny:**
   - `localhost` (dla development)
   - Twoja domena produkcyjna
3. **Dodaj OAuth Redirect URI:**
   - `https://twoj-projekt-id.firebaseapp.com/__/auth/handler`
4. **Przejdź do "Settings"** > "Basic"
5. **Skopiuj App ID i App Secret**

#### **W Firebase Console:**

1. **W sekcji Facebook kliknij "Configure"**
2. **Wklej App ID i App Secret**
3. **Kliknij "Save"**

### **Krok 6: Zaktualizuj .env.local**

1. **Otwórz plik `.env.local`**
2. **Zastąp wszystkie placeholder wartości prawdziwymi danymi z Firebase:**

```env
# Firebase Configuration - PRAWDZIWE WARTOŚCI Z FIREBASE CONSOLE
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...twoj_prawdziwy_klucz_z_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=twoj-projekt.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=twoj-projekt-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=twoj-projekt.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Firebase Admin SDK - dla serwera (opcjonalnie)
FIREBASE_PROJECT_ID=twoj-projekt-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@twoj-projekt.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTwój_prawdziwy_klucz_prywatny\n-----END PRIVATE KEY-----\n"
```

### **Krok 7: Restart aplikacji**

1. **Zatrzymaj serwer** (Ctrl+C)
2. **Uruchom ponownie:**

   ```bash
   npm run dev
   ```

## 🎯 **Testowanie:**

Po skonfigurowaniu powinieneś móc:

1. **Zarejestrować się przez email** - `/auth/signup`
2. **Zalogować się przez email** - `/auth/signin`
3. **Zalogować się przez Google** - przycisk Google
4. **Zalogować się przez Facebook** - przycisk Facebook
5. **Zalogować się przez SMS** - przycisk SMS

## 🚨 **Ważne:**

- **Nigdy nie commituj `.env.local`** do Git
- **Upewnij się, że wszystkie wartości są prawdziwe** (nie placeholder)
- **Sprawdź czy wszystkie metody są włączone** w Firebase Console

## 📞 **Jeśli nadal masz problemy:**

1. **Sprawdź konsolę przeglądarki** - czy są błędy
2. **Sprawdź Firebase Console** - czy wszystkie metody są włączone
3. **Sprawdź `.env.local`** - czy wartości są prawdziwe
4. **Restart aplikacji** po zmianie `.env.local`

**Po skonfigurowaniu Firebase Console i dodaniu prawdziwych kluczy API, wszystkie metody logowania będą działać!** 🚀
