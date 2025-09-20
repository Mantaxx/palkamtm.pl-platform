# Przewodnik po Komponentach 3D i Efektach Szkła

## Przegląd

Ten projekt został wzbogacony o zaawansowane efekty 3D, glassmorphism i spójny system wizualny oparty na niebieskich i cyjanowych odcieniach.

## Nowe Komponenty 3D

### 1. FloatingCard

Karta z efektem unoszenia się i animacjami 3D.

```tsx
import { FloatingCard } from '@/components/ui/FloatingCard'

<FloatingCard 
  intensity="medium" 
  glow={true} 
  delay={0.2}
>
  <h3>Tytuł Karty</h3>
  <p>Opis zawartości</p>
</FloatingCard>
```

**Props:**

- `intensity`: 'low' | 'medium' | 'high' - intensywność animacji
- `glow`: boolean - czy ma świecić
- `delay`: number - opóźnienie animacji wejścia

### 2. GlassContainer

Kontener z efektami glassmorphism.

```tsx
import { GlassContainer } from '@/components/ui/GlassContainer'

<GlassContainer 
  variant="ultra" 
  blur="2xl" 
  glow={true}
  hover={true}
>
  <p>Zawartość w szklanym kontenerze</p>
</GlassContainer>
```

**Props:**

- `variant`: 'default' | 'strong' | 'ultra' | 'gradient'
- `blur`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
- `glow`: boolean - efekt świecenia
- `hover`: boolean - efekty hover

### 3. Button3D

Przycisk z efektami 3D i szkła.

```tsx
import { Button3D } from '@/components/ui/Button3D'

<Button3D 
  variant="primary" 
  size="lg" 
  intensity="high"
  glow={true}
  onClick={() => console.log('Clicked!')}
>
  Kliknij Mnie
</Button3D>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'
- `size`: 'sm' | 'md' | 'lg'
- `intensity`: 'low' | 'medium' | 'high'
- `glow`: boolean - efekt świecenia
- `href`: string - link (opcjonalny)

### 4. Text3D

Tekst z efektami 3D i animacjami.

```tsx
import { Text3D } from '@/components/ui/Text3D'

<Text3D 
  variant="neon" 
  intensity="high" 
  animate={true}
  hover={true}
>
  Tekst 3D
</Text3D>
```

**Props:**

- `variant`: 'gradient' | 'glow' | 'neon' | 'shimmer'
- `intensity`: 'low' | 'medium' | 'high'
- `animate`: boolean - animacja wejścia
- `hover`: boolean - efekty hover

## Nowe Klasy CSS

### Efekty 3D

```css
.transform-3d          /* Włącza transform-style: preserve-3d */
.perspective-1000      /* Ustawia perspektywę 1000px */
.perspective-2000      /* Ustawia perspektywę 2000px */
.hover-3d-lift         /* Efekt podniesienia 3D przy hover */
.hover-3d-tilt         /* Efekt pochylenia 3D przy hover */
.hover-3d-rotate       /* Efekt obrotu 3D przy hover */
```

### Glass Morphism

```css
.glass-morphism        /* Podstawowy efekt szkła */
.glass-morphism-strong /* Silniejszy efekt szkła */
.glass-morphism-ultra  /* Maksymalny efekt szkła */
```

### Karty 3D

```css
.card-3d              /* Karta z efektami 3D */
.card-floating        /* Karta z animacją unoszenia */
.card-gradient        /* Karta z gradientem */
```

### Animacje 3D

```css
.animate-float3D      /* Animacja unoszenia 3D */
.animate-glow3D       /* Animacja świecenia 3D */
.animate-shimmer3D    /* Animacja shimmer 3D */
.animate-morph3D      /* Animacja morfowania 3D */
```

## Zmienne CSS

### Kolory Szkła

```css
--glass-bg: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
--glass-strong: rgba(255, 255, 255, 0.25)
--glass-ultra: rgba(255, 255, 255, 0.35)
```

### Efekty Świecenia

```css
--glow-primary: rgba(14, 165, 233, 0.4)
--glow-secondary: rgba(56, 189, 248, 0.3)
--glow-accent: rgba(147, 197, 253, 0.2)
```

### Cienie 3D

```css
--shadow-3d: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)
--shadow-glass: 0 8px 32px rgba(31, 38, 135, 0.37)
--shadow-glow-strong: 0 0 40px rgba(14, 165, 233, 0.6), 0 0 80px rgba(14, 165, 233, 0.3)
```

## Przykład Użycia

```tsx
import { FloatingCard } from '@/components/ui/FloatingCard'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button3D } from '@/components/ui/Button3D'
import { Text3D } from '@/components/ui/Text3D'

export function ExamplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      <GlassContainer variant="ultra" glow={true} className="p-8">
        <Text3D variant="neon" intensity="high" className="text-4xl mb-4">
          Tytuł Strony
        </Text3D>
        
        <FloatingCard intensity="medium" glow={true}>
          <p>Zawartość w karcie 3D</p>
        </FloatingCard>
        
        <Button3D variant="primary" size="lg" intensity="high" glow={true}>
          Akcja
        </Button3D>
      </GlassContainer>
    </div>
  )
}
```

## Wskazówki

1. **Wydajność**: Używaj `transform-3d` tylko gdy potrzebujesz efektów 3D
2. **Responsywność**: Wszystkie komponenty są w pełni responsywne
3. **Dostępność**: Zachowaj kontrast i czytelność tekstu
4. **Animacje**: Używaj umiarkowanie - zbyt wiele może rozpraszać
5. **Kolory**: System jest oparty na niebieskich/cyjanowych odcieniach dla spójności

## Kompatybilność

- ✅ Chrome 88+
- ✅ Firefox 87+
- ✅ Safari 14+ (z prefiksami webkit)
- ✅ Edge 88+
- ✅ Mobile browsers (z ograniczeniami 3D)
