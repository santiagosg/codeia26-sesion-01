# Tailwind Tokens

Definición de tokens de diseño y ejemplos de uso conceptual para la interfaz tipo Netflix.

---

## Tabla de Contenidos

- [Colores Semánticos](#colores-semánticos)
- [Spacing System](#spacing-system)
- [Typography Scale](#typography-scale)
- [Animation Timing](#animation-timing)
- [Border Radius](#border-radius)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## Colores Semánticos

### Brand Colors

```tailwind
colors: {
  brand: {
    red: '#E50914',      // Netflix red primary
    redHover: '#f40612', // Red hover state
    black: '#141414',    // Background primary
    dark: '#181818',     // Card/background secondary
  },
}
```

### Uso Conceptual - Brand Colors

| Token | Caso de Uso | Clase Tailwind Equivalente |
|-------|-------------|---------------------------|
| `brand.red` | Botones principales, acentos, highlights | `bg-brand-red` / `text-brand-red` |
| `brand.redHover` | Hover states de botones red | `hover:bg-brand-redHover` |
| `brand.black` | Background principal de la app | `bg-brand-black` |
| `brand.dark` | Background de cards y headers | `bg-brand-dark` |

### UI States Colors

```tailwind
colors: {
  overlay: {
    idle: 'rgba(0, 0, 0, 0.0)',
    hover: 'rgba(0, 0, 0, 0.7)',
    focus: 'rgba(255, 255, 255, 0.2)',
  },
}
```

### Uso Conceptual - Overlay States

| Token | Caso de Uso | Clase Tailwind Equivalente |
|-------|-------------|---------------------------|
| `overlay.idle` | Estado inicial sin overlay | `bg-overlay-idle` |
| `overlay.hover` | Card hover overlay | `group-hover:bg-overlay-hover backdrop-blur-sm` |
| `overlay.focus` | Focus ring background | `focus:bg-overlay-focus` |

### Rating Colors

```tailwind
colors: {
  rating: {
    high: '#46d369',   // 80-100%
    medium: '#dcdcdc', // 50-79%
    low: '#e50914',    // 0-49%
  },
}
```

### Uso Conceptual - Rating Colors

| Score Rango | Color Token | Caso de Uso | Clase Tailwind |
|-------------|-------------|-------------|----------------|
| 80-100% | `rating.high` | Películas/top content | `text-rating-high`, `bg-rating-high` |
| 50-79% | `rating.medium` | Contenido promedio | `text-rating-medium`, `bg-rating-medium` |
| 0-49% | `rating.low` | Contenido bajo rating | `text-rating-low`, `bg-rating-low` |

---

## Spacing System

### Definición de Tokens

```tailwind
spacing: {
  'card-gap': '1rem',      // Grid gap: 16px
  'section-y': '3rem',     // Section vertical spacing: 48px
  'hero-padding': '4rem',   // Hero content padding: 64px
  'touch-target': '44px',   // Minimum touch target
}
```

### Uso Conceptual - Spacing

| Token | Valor | Caso de Uso | Clase Tailwind Equivalente |
|-------|-------|-------------|---------------------------|
| `card-gap` | 16px | Gap entre cards en grid | `gap-card-gap` → `gap-4` |
| `section-y` | 48px | Espacio vertical entre secciones | `py-section-y` → `py-12` |
| `hero-padding` | 64px | Padding interno del hero banner | `p-hero-padding` → `p-16` |
| `touch-target` | 44px | Mínimo para elementos touch | `min-w-touch-target` → `min-w-[44px]` |

### Ejemplo: Grid con Spacing

```tsx
// Grid de películas usando spacing tokens
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-card-gap">
  {movies.map(movie => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</div>

// Equivalente: gap-4 (16px)
```

### Ejemplo: Section con Spacing Vertical

```tsx
// Sección con espaciado vertical definido
<section className="py-section-y">
  <h2 className="text-hero mb-section-y">
    Tendencias
  </h2>
  <MediaRow movies={trending} />
</section>

// Equivalente: py-12 (48px)
```

---

## Typography Scale

### Definición de Tokens

```tailwind
fontSize: {
  'display': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],  // Hero title
  'hero': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],   // Section title
  'card': ['0.875rem', { lineHeight: '1.3', fontWeight: '500' }],  // Card title
  'meta': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],  // Metadata
  'badge': ['0.625rem', { lineHeight: '1.2', fontWeight: '500' }], // Badge text
}
```

### Uso Conceptual - Typography

| Token | Tamaño | Peso | Caso de Uso | Clase Tailwind Equivalente |
|-------|--------|------|-------------|---------------------------|
| `display` | 40px | 700 | Título principal del Hero | `text-display` → `text-4xl font-bold` |
| `hero` | 28px | 600 | Títulos de secciones | `text-hero` → `text-2xl font-semibold` |
| `card` | 14px | 500 | Títulos de cards | `text-card` → `text-sm font-medium` |
| `meta` | 12px | 400 | Metadata (año, duración) | `text-meta` → `text-xs` |
| `badge` | 10px | 500 | Texto en badges | `text-badge` → `text-[10px] font-medium` |

### Ejemplo: Hero Title

```tsx
// Título del hero usando display token
<h1 className="text-display">
  Película Destacada
</h1>

// Equivalente: text-4xl font-bold leading-tight (40px, 700, 1.1)
```

### Ejemplo: Section Header

```tsx
// Header de sección usando hero token
<h2 className="text-hero">
  Tendencias Ahora
</h2>

// Equivalente: text-2xl font-semibold (28px, 600)
```

### Ejemplo: Card Title y Metadata

```tsx
// Card de película
<div className="card">
  <h3 className="text-card">Nombre de Película</h3>
  <p className="text-meta">2024 • 2h 15m</p>
</div>

// Equivalente:
// h3: text-sm font-medium (14px, 500)
// p: text-xs (12px, 400)
```

---

## Animation Timing

### Definición de Tokens

```tailwind
transitionTimingFunction: {
  'netflix-ease': 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material standard
  'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',        // Quick interactions
},
transitionDuration: {
  'hover': '200ms',
  'focus': '150ms',
  'modal': '300ms',
}
```

### Uso Conceptual - Animation Timing

| Token | Duración | Curva | Caso de Uso | Clase Tailwind Equivalente |
|-------|----------|-------|-------------|---------------------------|
| `hover` | 200ms | `netflix-ease` | Hover de cards y botones | `transition-all duration-hover ease-netflix-ease` |
| `focus` | 150ms | `snappy` | Focus ring appearance | `transition-all duration-focus ease-snappy` |
| `modal` | 300ms | `netflix-ease` | Modal fade in/out | `transition-all duration-modal ease-netflix-ease` |

### Ejemplo: Card Hover Animation

```tsx
// Card con hover animation usando tokens
<div className="transition-all duration-hover ease-netflix-ease hover:scale-105">
  {/* Card content */}
</div>

// Equivalente: transition-all duration-200 ease-[cubic-bezier(0.4,0.0,0.2,1)]
```

### Ejemplo: Focus Animation

```tsx
// Input con focus animation
<input
  className="transition-all duration-focus ease-snappy focus-visible:ring-2"
  placeholder="Buscar..."
/>

// Equivalente: transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]
```

### Ejemplo: Modal Animation

```tsx
// Modal con fade animation
<Dialog className="transition-all duration-modal ease-netflix-ease">
  {/* Modal content */}
</Dialog>

// Equivalente: transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]
```

---

## Border Radius

### Definición de Tokens

```tailwind
borderRadius: {
  'card': '4px',     // MovieCard corners
  'badge': '9999px', // Pill badges
  'button': '8px',   // Button rounding
  'modal': '12px',   // Modal/drawer
}
```

### Uso Conceptual - Border Radius

| Token | Valor | Caso de Uso | Clase Tailwind Equivalente |
|-------|-------|-------------|---------------------------|
| `card` | 4px | Esquinas de MovieCard | `rounded-card` → `rounded` |
| `badge` | 9999px (pill) | Badges tipo píldora | `rounded-badge` → `rounded-full` |
| `button` | 8px | Botones principales | `rounded-button` → `rounded-lg` |
| `modal` | 12px | Modal y drawer | `rounded-modal` → `rounded-xl` |

### Ejemplo: MovieCard Border Radius

```tsx
// Card con border radius definido
<div className="rounded-card overflow-hidden">
  <img src={poster} alt={title} />
</div>

// Equivalente: rounded (4px)
```

### Ejemplo: Badge Border Radius

```tsx
// Badge tipo píldora
<span className="rounded-badge px-2 py-0.5">
  Nuevo
</span>

// Equivalente: rounded-full
```

### Ejemplo: Button Border Radius

```tsx
// Botón con border radius definido
<button className="rounded-button px-6 py-2">
  Reproducir
</button>

// Equivalente: rounded-lg (8px)
```

---

## Ejemplos de Uso

### Ejemplo Completo: MovieCard

```tsx
// MovieCard usando múltiples tokens
<div
  className="
    group relative rounded-card overflow-hidden
    transition-all duration-hover ease-netflix-ease
    hover:scale-105 hover:shadow-2xl
    focus-visible:outline-3 focus-visible:outline-white
  "
  tabIndex={0}
  role="button"
>
  {/* Poster */}
  <img src={poster} alt={title} className="aspect-[2/3]" />

  {/* Overlay */}
  <div className="
    absolute inset-0 bg-overlay-hover backdrop-blur-sm
    opacity-0 group-hover:opacity-100
    transition-opacity duration-hover
  ">
    <h3 className="text-card">{title}</h3>
    <p className="text-meta">{year} • {duration}</p>
    <Badge variant="rating" score={rating} />
  </div>
</div>
```

### Ejemplo Completo: Button Primary

```tsx
// Botón principal usando tokens
<Button
  className="
    rounded-button px-6 py-2
    bg-brand-red hover:bg-brand-redHover
    text-white font-medium
    transition-all duration-hover ease-netflix-ease
    focus-visible:ring-2 focus-visible:ring-white
  "
>
  <Play className="mr-2" />
  Reproducir
</Button>
```

### Ejemplo Completo: Section Header

```tsx
// Header de sección usando tokens
<section className="py-section-y">
  <h2 className="text-hero mb-section-y">
    Tendencias Ahora
  </h2>
  <div className="grid gap-card-gap grid-cols-2 md:grid-cols-4">
    {/* Cards */}
  </div>
</section>
```

### Ejemplo Completo: Modal

```tsx
// Modal usando tokens
<Dialog className="rounded-modal transition-all duration-modal ease-netflix-ease">
  <DialogHeader>
    <DialogTitle className="text-display">
      Título de Película
    </DialogTitle>
  </DialogHeader>
  <DialogContent>
    <Badge variant="genre" className="rounded-badge">Acción</Badge>
    <p className="text-meta mt-2">
      Sinopsis del contenido...
    </p>
  </DialogContent>
</Dialog>
```

---

## Referencias Rápidas

### Mapeo de Tokens a Tailwind Classes

| Categoría | Token | Tailwind Native | Custom Class |
|-----------|-------|-----------------|--------------|
| **Colors** | `brand.red` | - | `bg-brand-red` |
| **Spacing** | `card-gap` | `gap-4` | `gap-card-gap` |
| **Typography** | `display` | `text-4xl font-bold` | `text-display` |
| **Animation** | `hover` | `duration-200` | `duration-hover` |
| **Radius** | `card` | `rounded` | `rounded-card` |

### Nota de Implementación

Los tokens definidos aquí deben configurarse en `tailwind.config.ts` para usar las clases personalizadas (ej. `bg-brand-red`, `text-display`, `rounded-card`). Mientras tanto, usar las clases nativas de Tailwind equivalentes.
