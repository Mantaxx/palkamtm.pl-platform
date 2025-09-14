# 📸 Instrukcja organizacji zdjęć championów

## 📁 Struktura folderów

Utwórz następującą strukturę w folderze `public/`:

```
public/
├── champions/
│   ├── thunder-storm/           # ID championa (thunder-storm)
│   │   ├── main.jpg             # Zdjęcie główne championa
│   │   ├── gallery/             # Galeria zdjęć
│   │   │   ├── 1.jpg            # Pełne zdjęcie 1
│   │   │   ├── 1-thumb.jpg      # Miniaturka 1 (300x200px)
│   │   │   ├── 2.jpg            # Pełne zdjęcie 2
│   │   │   ├── 2-thumb.jpg      # Miniaturka 2 (300x200px)
│   │   │   ├── 3.jpg            # Pełne zdjęcie 3
│   │   │   ├── 3-thumb.jpg      # Miniaturka 3 (300x200px)
│   │   │   ├── 4.jpg            # Pełne zdjęcie 4
│   │   │   └── 4-thumb.jpg      # Miniaturka 4 (300x200px)
│   │   ├── pedigree/            # Zdjęcia rodowodu
│   │   │   ├── father.jpg       # Zdjęcie ojca
│   │   │   ├── mother.jpg       # Zdjęcie matki
│   │   │   ├── grandfather.jpg  # Zdjęcie dziadka
│   │   │   └── grandmother.jpg  # Zdjęcie babci
│   │   ├── offspring/           # Zdjęcia potomstwa
│   │   │   ├── storm-junior-1.jpg
│   │   │   └── storm-junior-2.jpg
│   │   └── videos/              # Miniaturki filmów
│   │       ├── training-flight-thumb.jpg
│   │       └── competition-return-thumb.jpg
│   ├── lightning-bolt/          # Kolejny champion
│   │   ├── main.jpg
│   │   ├── gallery/
│   │   └── pedigree/
│   └── storm-queen/             # Kolejny champion
│       ├── main.jpg
│       ├── gallery/
│       └── pedigree/
```

## 🖼️ Wymagania dotyczące zdjęć

### Zdjęcia główne (main.jpg)

- **Rozmiar**: 800x800px
- **Format**: JPG, PNG
- **Jakość**: Wysoka (80%+)
- **Tło**: Neutralne, profesjonalne

### Galeria (gallery/)

- **Pełne zdjęcia**: 1200x800px
- **Miniaturki**: 300x200px
- **Format**: JPG
- **Jakość**: Wysoka dla pełnych, średnia dla miniatur

### Rodowód (pedigree/)

- **Rozmiar**: 400x400px
- **Format**: JPG
- **Jakość**: Średnia-wysoka

### Potomstwo (offspring/)

- **Rozmiar**: 300x300px
- **Format**: JPG
- **Jakość**: Średnia

### Miniaturki filmów (videos/)

- **Rozmiar**: 400x225px (16:9)
- **Format**: JPG
- **Jakość**: Średnia

## 📝 Nazewnictwo plików

- Używaj małych liter i myślników
- Unikaj polskich znaków i spacji
- Przykład: `thunder-storm-main.jpg`, `father-pedigree.jpg`

## 🔧 Jak dodać nowego championa

1. Utwórz folder z ID championa w `public/champions/`
2. Dodaj zdjęcia zgodnie ze strukturą powyżej
3. Zaktualizuj dane w `app/champions/[id]/page.tsx`
4. Dodaj nową stronę w `app/champions/[id]/page.tsx`

## 💡 Wskazówki

- **Optymalizuj zdjęcia** - używaj narzędzi jak TinyPNG
- **Zachowaj proporcje** - nie rozciągaj zdjęć
- **Używaj miniatur** - przyspieszają ładowanie strony
- **Testuj responsywność** - sprawdź jak wyglądają na różnych urządzeniach
