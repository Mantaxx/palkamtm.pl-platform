# Przewodnik Ujednolicenia Stylów

## ✅ Status Ujednolicenia

### Zaktualizowane Komponenty:
- ✅ **HeroSection** - Pełne efekty 3D i glassmorphism
- ✅ **BentoGrid** - Karty 3D z animacjami
- ✅ **PressPage** - Zaktualizowane karty z glassmorphism
- ✅ **HeritagePageClient** - Ujednolicone kolory i efekty
- ✅ **AboutPageClient** - Nowe tło i przyciski
- ✅ **ContactPageClient** - Spójne style z resztą

### Nowe Komponenty Ujednolicające:
- ✅ **UnifiedLayout** - Wspólny layout dla wszystkich stron
- ✅ **UnifiedCard** - Ujednolicone karty z efektami 3D
- ✅ **UnifiedButton** - Spójne przyciski w całym projekcie

## 🎨 Ujednolicona Paleta Kolorów

### Główne Kolory:
```css
/* Niebiesko-cyjanowa paleta */
--primary-500: #0ea5e9    /* Główny niebieski */
--primary-600: #0284c7    /* Ciemniejszy niebieski */
--primary-700: #0369a1    /* Najciemniejszy niebieski */
--cyan-400: #22d3ee       /* Cyjan */
--cyan-500: #06b6d4       /* Ciemniejszy cyjan */
```

### Tła Stron:
```css
/* Wszystkie strony używają tego samego tła */
background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0891b2 100%);
/* Lub krócej: */
bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900
```

### Efekty Szkła:
```css
.glass-morphism        /* Podstawowy efekt szkła */
.glass-morphism-strong /* Silniejszy efekt */
.glass-morphism-ultra  /* Maksymalny efekt */
```

## 🔧 Instrukcje Ujednolicania

### 1. Używanie UnifiedLayout

Zamień wszystkie indywidualne layouty na UnifiedLayout:

```tsx
// PRZED:
<div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
  {/* Logo */}
  {/* Navigation */}
  {/* Content */}
</div>

// PO:
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

<UnifiedLayout showNavigation={true} showAuthButtons={true}>
  {/* Tylko content strony */}
</UnifiedLayout>
```

### 2. Ujednolicone Przyciski

```tsx
// PRZED:
<button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-lg">
  Przycisk
</button>

// PO:
import { UnifiedButton } from '@/components/ui/UnifiedButton'

<UnifiedButton variant="glass" size="md" glow={true}>
  Przycisk
</UnifiedButton>
```

### 3. Ujednolicone Karty

```tsx
// PRZED:
<div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-6">
  Zawartość
</div>

// PO:
import { UnifiedCard } from '@/components/ui/UnifiedCard'

<UnifiedCard variant="3d" glow={true} intensity="medium">
  Zawartość
</UnifiedCard>
```

## 📋 Checklist Ujednolicenia

### Dla każdego komponentu sprawdź:

- [ ] **Tło strony**: Czy używa `bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900`?
- [ ] **Elementy tła**: Czy używa `bg-blue-400/30`, `bg-cyan-400/30` zamiast `bg-slate-*`?
- [ ] **Przyciski**: Czy używa `glass-morphism` lub `btn-primary`?
- [ ] **Karty**: Czy używa `card-3d`, `card-glass` lub `UnifiedCard`?
- [ ] **Animacje**: Czy używa `animate-float3D`, `animate-glow3D` zamiast starych?
- [ ] **Hover effects**: Czy używa `hover-3d-lift`, `hover-3d-tilt`?
- [ ] **Kolory tekstu**: Czy używa spójnych kolorów z palety?

## 🚀 Przykład Kompletnego Ujednolicenia

```tsx
'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { Text3D } from '@/components/ui/Text3D'

export function ExamplePage() {
  return (
    <UnifiedLayout>
      <div className="container mx-auto px-4 py-16">
        <Text3D variant="neon" intensity="high" className="text-4xl mb-8">
          Tytuł Strony
        </Text3D>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UnifiedCard variant="3d" glow={true}>
            <h3 className="text-xl font-bold mb-4">Karta 1</h3>
            <p className="text-white/80 mb-4">Opis zawartości</p>
            <UnifiedButton variant="primary" size="md">
              Akcja
            </UnifiedButton>
          </UnifiedCard>
          
          <UnifiedCard variant="glass" intensity="medium">
            <h3 className="text-xl font-bold mb-4">Karta 2</h3>
            <p className="text-white/80 mb-4">Opis zawartości</p>
            <UnifiedButton variant="glass" size="md">
              Akcja
            </UnifiedButton>
          </UnifiedCard>
        </div>
      </div>
    </UnifiedLayout>
  )
}
```

## ⚠️ Częste Błędy

### ❌ NIE RÓB:
```tsx
// Stare kolory
<div className="bg-slate-800">
<button className="bg-white/10 backdrop-blur-sm">
<div className="bg-gray-200">

// Stare animacje
<div className="animate-float">
<div className="animate-pulse">
```

### ✅ RÓB:
```tsx
// Nowe kolory
<div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
<button className="glass-morphism">
<div className="glass-morphism-strong">

// Nowe animacje
<div className="animate-float3D">
<div className="animate-glow3D">
```

## 🎯 Korzyści Ujednolicenia

1. **Spójność wizualna** - Wszystkie strony wyglądają jak część jednej aplikacji
2. **Łatwość utrzymania** - Zmiany w jednym miejscu wpływają na całość
3. **Lepsze UX** - Użytkownicy mają spójne doświadczenie
4. **Nowoczesny wygląd** - Efekty 3D i glassmorphism na całej stronie
5. **Responsywność** - Wszystkie komponenty działają na wszystkich urządzeniach

## 📞 Wsparcie

Jeśli masz pytania dotyczące ujednolicania stylów, sprawdź:
1. `docs/3D_COMPONENTS_GUIDE.md` - Szczegóły komponentów 3D
2. `app/globals.css` - Wszystkie dostępne klasy CSS
3. Przykłady w `components/ui/` - Gotowe komponenty do użycia
