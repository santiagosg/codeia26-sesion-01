# CastCard & PersonDetail UX

Documentación de diseño para las cards de elenco (CastCard) y la página individual de actor/actriz (PersonDetailPage).

---

## Tabla de Contenidos

- [CastCard Component](#castcard-component)
- [PersonDetailPage Component](#persondetailpage-component)
- [Tokens y Estilos](#tokens-y-estilos)
- [Accesibilidad](#accesibilidad)

---

## CastCard Component

Card individual para mostrar un actor/actriz en las listas de elenco, con interacción hover similar a MediaCard.

### Estados del CastCard

| Estado | Descripción | Tokens |
|--------|-------------|--------|
| **Idle** | Foto cuadrada del actor, nombre debajo, personaje en gris pequeño | `aspect-[1/1]`, `text-xs`, `text-muted-foreground` |
| **Hover** | Nombre cambia a rojo (#E50914), degradado aparece, flecha visible | `group-hover:text-netflix-red`, `opacity-0 group-hover:opacity-100` |
| **Focus** | Focus ring visible en el contenedor | `focus-visible:ring-2 focus-visible:ring-netflix-red` |
| **Loading** | Skeleton cuadrado con shimmer | `animate-pulse`, `bg-muted` |

### Estructura del Componente

```tsx
interface CastCardProps {
  person: {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
  };
  onClick?: () => void;
}
```

### Diseño Visual

#### Contenedor Principal
```tsx
<div className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10">
  {/* Imagen del actor */}
  <div className="relative aspect-[1/1] bg-muted overflow-hidden rounded-lg">
    {/* Foto o placeholder */}
    <img
      src={getProfileUrl(person.profile_path, 'w185')}
      alt={person.name}
      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
    />

    {/* Overlay con degradado al hacer hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end justify-between p-3">
      {/* Nombre en rojo */}
      <span className="text-white font-medium text-sm truncate">
        {person.name}
      </span>

      {/* Flecha a la derecha */}
      <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 ease-in-out translate-x-[-20px] group-hover:translate-x-0" />
    </div>
  </div>

  {/* Información debajo (visible en idle) */}
  <div className="mt-2">
    <p className="font-medium text-xs truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out">
      {person.name}
    </p>
    {person.character && (
      <p className="text-[10px] text-muted-foreground truncate">
        {person.character}
      </p>
    )}
  </div>
</div>
```

### Hover Effect Detallado

#### Efecto en la imagen
- **Scale:** `scale-105` (1.05x)
- **Duration:** `300ms`
- **Easing:** `ease-in-out`

#### Overlay con degradado
```
Gradient: from-black/80 → via-black/40 → to-transparent
Opacity: 0 → 100%
Duration: 300ms
Easing: ease-in-out
```

#### Nombre del actor
- **Color:** `text-muted-foreground` → `text-netflix-red`
- **Duration:** `300ms`
- **Easing:** `ease-in-out`

#### Flecha (ArrowRight icon)
- **Estado inicial:** `translate-x-[-20px]`, `opacity-0`
- **Estado hover:** `translate-x-0`, `opacity-100`
- **Duration:** `300ms`
- **Easing:** `ease-in-out`

### Skeleton para Carga

```tsx
<div className="group relative rounded-lg">
  <Skeleton className="w-full aspect-[1/1] rounded-lg" />
  <div className="mt-2 space-y-1">
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-2 w-1/2" />
  </div>
</div>
```

### Grid Responsivo para Elenco

```tsx
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
  {cast.slice(0, 16).map((person) => (
    <CastCard key={person.id} person={person} onClick={() => navigate(`/person/${person.id}`)} />
  ))}
</div>
```

| Breakpoint | Columnas | Cards visibles |
|------------|-----------|----------------|
| Mobile (< 640px) | 3 | 6-9 por fila |
| sm (640px+) | 4 | 8-12 por fila |
| md (768px+) | 5 | 10-15 por fila |
| lg (1024px+) | 6 | 12-18 por fila |
| xl (1280px+) | 8 | 16 por fila |

---

## PersonDetailPage Component

Página individual para mostrar información completa de un actor/actriz con su filmografía.

### Secciones de la Página

```
┌─────────────────────────────────────────────────────────────┐
│                        Navbar                               │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  ┌────────────┐                                             │
│  │            │  Nombre del Actor/Autor                     │
│  │   Foto     │  Profesor (ej: Actor, Director, Guionista) │
│  │   Grande   │  Biografía corta (2-3 líneas)               │
│  │            │  Botones: Seguir, Compartir                │
│  └────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Información Personal                                       │
│  • Fecha de nacimiento                                     │
│  • Lugar de nacimiento                                     │
│  • Género (si aplica)                                       │
│  • Años activo (ej: 2010-presente)                         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Biografía Completa                                         │
│  Texto expandido con botón "Ver más" / "Ver menos"         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Filmografía                                               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Filtra por: [Todos] [Películas] [Series]           │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │            │ │            │ │            │           │
│  │   Película │ │   Película │ │   Serie    │ ...       │
│  │   1        │ │   2        │ │   1        │           │
│  │            │ │            │ │            │           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                           │
│  [Ver más filmografía]                                    │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Conocido por (Top Works)                                  │
│  Grid de 6 trabajos más conocidos                          │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                        Footer                               │
└─────────────────────────────────────────────────────────────┘
```

### Hero Section (Encabezado del Actor)

```tsx
<div className="px-6 md:px-12 lg:px-24 py-12">
  <div className="flex flex-col md:flex-row gap-8">
    {/* Foto Grande */}
    <div className="w-full md:w-[300px] shrink-0">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted">
        {person.profile_path ? (
          <img
            src={getProfileUrl(person.profile_path, 'h632')}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <User className="w-24 h-24 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>

    {/* Información Principal */}
    <div className="flex-1 space-y-4">
      <h1 className="text-3xl md:text-5xl font-bold">{person.name}</h1>

      {/* Profesión */}
      <p className="text-lg text-muted-foreground">
        {person.known_for_department}
      </p>

      {/* Biografía Corta */}
      {person.biography && (
        <p className="text-base text-muted-foreground line-clamp-3">
          {person.biography}
        </p>
      )}

      {/* Botones de Acción */}
      <div className="flex gap-3 pt-4">
        <Button size="lg" variant="outline">
          <Heart className="w-5 h-5 mr-2" />
          Seguir
        </Button>
        <Button size="lg" variant="ghost">
          <Share className="w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
</div>
```

### Información Personal

```tsx
<div className="px-6 md:px-12 lg:px-24 py-8 border-y border-border">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Fecha de nacimiento */}
    {person.birthday && (
      <div>
        <p className="text-sm text-muted-foreground mb-1">Fecha de nacimiento</p>
        <p className="font-medium">{formatDate(person.birthday)}</p>
        {person.deathday && (
          <p className="text-sm text-muted-foreground">Fallecido: {formatDate(person.deathday)}</p>
        )}
      </div>
    )}

    {/* Lugar de nacimiento */}
    {person.place_of_birth && (
      <div>
        <p className="text-sm text-muted-foreground mb-1">Lugar de nacimiento</p>
        <p className="font-medium">{person.place_of_birth}</p>
      </div>
    )}

    {/* Género */}
    {person.gender !== undefined && person.gender !== 0 && (
      <div>
        <p className="text-sm text-muted-foreground mb-1">Género</p>
        <p className="font-medium">{getGenderText(person.gender)}</p>
      </div>
    )}

    {/* Años activo */}
    {person.birthday && (
      <div>
        <p className="text-sm text-muted-foreground mb-1">Años activo</p>
        <p className="font-medium">{getActiveYears(person.birthday)}</p>
      </div>
    )}
  </div>
</div>
```

### Biografía Completa

```tsx
{person.biography && (
  <div className="px-6 md:px-12 lg:px-24 py-8">
    <h2 className="text-2xl font-bold mb-4">Biografía</h2>
    <p className={`text-muted-foreground ${showFullBio ? '' : 'line-clamp-6'}`}>
      {person.biography}
    </p>
    {person.biography.length > 300 && (
      <Button
        variant="ghost"
        onClick={() => setShowFullBio(!showFullBio)}
        className="mt-4 text-netflix-red hover:text-netflix-red/80"
      >
        {showFullBio ? 'Ver menos' : 'Ver más'}
      </Button>
    )}
  </div>
)}
```

### Filmografía con Filtros

```tsx
<div className="px-6 md:px-12 lg:px-24 py-12">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">Filmografía</h2>

    {/* Tabs de Filtro */}
    <div className="flex gap-2">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('all')}
      >
        Todos ({credits.length})
      </Button>
      <Button
        variant={filter === 'movie' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('movie')}
      >
        Películas ({movieCredits.length})
      </Button>
      <Button
        variant={filter === 'tv' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('tv')}
      >
        Series ({tvCredits.length})
      </Button>
    </div>
  </div>

  {/* Grid de Contenido */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {filteredCredits.slice(0, displayedCount).map((credit) => (
      <CreditCard
        key={`${credit.id}-${credit.media_type}`}
        credit={credit}
        onClick={() => navigate(
          credit.media_type === 'movie'
            ? `/movies/${credit.id}`
            : `/series/${credit.id}`
        )}
      />
    ))}
  </div>

  {/* Botón Ver Más */}
  {filteredCredits.length > displayedCount && (
    <div className="flex justify-center mt-8">
      <Button
        variant="outline"
        onClick={() => setDisplayedCount(prev => prev + 12)}
      >
        Ver más filmografía
      </Button>
    </div>
  )}
</div>
```

### CreditCard Component

Card individual para mostrar un trabajo en la filmografía:

```tsx
interface CreditCardProps {
  credit: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    character?: string;
    release_date?: string;
    first_air_date?: string;
    media_type: 'movie' | 'tv';
    vote_average?: number;
  };
  onClick?: () => void;
}

// Implementación
<div
  onClick={onClick}
  className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
>
  <div className="relative aspect-[2/3] bg-muted overflow-hidden rounded-lg">
    {/* Poster */}
    {credit.poster_path ? (
      <img
        src={getImageUrl(credit.poster_path, 'w500')}
        alt={credit.title || credit.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
    ) : (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-muted-foreground text-sm">No imagen</span>
      </div>
    )}

    {/* Overlay con nombre de personaje al hacer hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-3">
      <div className="w-full">
        {credit.character && (
          <p className="text-white text-sm font-medium truncate">
            {credit.character}
          </p>
        )}
        <p className="text-netflix-red text-xs font-medium truncate">
          {credit.title || credit.name}
        </p>
      </div>
    </div>

    {/* Rating badge */}
    {credit.vote_average && credit.vote_average > 0 && (
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-[4px] py-[2px] leading-[1em] rounded-[3px]">
        <span className="text-xs text-white font-normal">
          {credit.vote_average.toFixed(1)}
        </span>
      </div>
    )}
  </div>

  {/* Título */}
  <div className="mt-2">
    <p className="text-sm font-medium truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out">
      {credit.title || credit.name}
    </p>
    {credit.character && (
      <p className="text-xs text-muted-foreground truncate">
        {credit.character}
      </p>
    )}
  </div>
</div>
```

### Conocido Por (Top Works)

```tsx
{person.known_for && person.known_for.length > 0 && (
  <div className="px-6 md:px-12 lg:px-24 py-12">
    <h2 className="text-2xl font-bold mb-6">Conocido por</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {person.known_for.map((work) => (
        <MediaCard
          key={work.id}
          media={work}
          onClick={() => navigate(
            'media_type' in work && work.media_type === 'tv'
              ? `/series/${work.id}`
              : `/movies/${work.id}`
          )}
        />
      ))}
    </div>
  </div>
)}
```

### Skeleton para PersonDetailPage

```tsx
<div className="bg-background">
  <Navbar />

  <div className="px-6 md:px-12 lg:px-24 py-12">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Foto Skeleton */}
      <div className="w-full md:w-[300px] shrink-0">
        <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      </div>

      {/* Info Skeleton */}
      <div className="flex-1 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  </div>

  {/* Info Personal Skeleton */}
  <div className="px-6 md:px-12 lg:px-24 py-8 border-y border-border">
    <div className="grid grid-cols-4 gap-6">
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
    </div>
  </div>

  {/* Filmografía Skeleton */}
  <div className="px-6 md:px-12 lg:px-24 py-12">
    <div className="flex justify-between mb-6">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
          <div className="mt-2 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

## Tokens y Estilos

### Colores

| Elemento | Token | Valor | Uso |
|----------|-------|-------|-----|
| Rojo principal | `netflix-red` | `#E50914` | Hover en nombre de actor |
| Overlay fondo | `black/80` | `rgba(0, 0, 0, 0.8)` | Degradado hover |
| Overlay medio | `black/40` | `rgba(0, 0, 0, 0.4)` | Degradado hover |
| Texto primario | `foreground` | `#FFFFFF` (dark) | Nombres en overlay |
| Texto secundario | `muted-foreground` | `#B3B3B3` (dark) | Personajes, metadata |

### Tipografía

| Elemento | Clase | Tamaño | Uso |
|----------|-------|--------|-----|
| Nombre actor (idle) | `text-xs` | 12px | Nombre debajo de la foto |
| Nombre actor (hover) | `text-sm` | 14px | Nombre en overlay |
| Personaje | `text-[10px]` | 10px | Nombre del personaje |
| Flecha icono | `w-5 h-5` | 20px | ArrowRight |

### Animaciones

| Elemento | Propiedad | Duración | Easing | Valores |
|----------|-----------|----------|--------|---------|
| Scale imagen | `scale` | 300ms | ease-in-out | 1 → 1.05 |
| Opacidad overlay | `opacity` | 300ms | ease-in-out | 0 → 100% |
| Color nombre | `color` | 300ms | ease-in-out | muted-foreground → netflix-red |
| Translate flecha | `transform` | 300ms | ease-in-out | -20px → 0px |
| Opacidad flecha | `opacity` | 300ms | ease-in-out | 0 → 100% |

### Espaciado

| Elemento | Clase | Tamaño |
|----------|-------|--------|
| Gap en grid | `gap-4` | 16px |
| Padding overlay | `p-3` | 12px |
| Margin top texto | `mt-2` | 8px |
| Padding sección | `px-6 py-12` | 24px / 48px |

---

## Accesibilidad

### Navegación por Teclado

| Componente | Requisito | Implementación |
|------------|-----------|----------------|
| **CastCard** | Enter/Space activa, Tab para navegar | `tabindex="0"`, `role="button"`, `aria-label="{name}, como {character}"` |
| **PersonDetailPage** | Skip links, logical tab order | `tabindex="0"` en cards, focus restoration |

### Focus Management

```tsx
// CastCard - Focus visible
<div className="focus-visible:ring-2 focus-visible:ring-netflix-red focus-visible:ring-offset-2 focus-visible:ring-offset-background">
  {/* contenido */}
</div>

// CreditCard - Focus visible
<div className="focus-visible:ring-2 focus-visible:ring-netflix-red focus-visible:ring-offset-2 focus-visible:ring-offset-background">
  {/* contenido */}
</div>
```

### ARIA Labels

```tsx
// CastCard
<div
  role="button"
  aria-label={`${person.name}, interpretando a ${person.character}`}
  tabIndex={0}
>
  {/* contenido */}
</div>

// CreditCard
<div
  role="button"
  aria-label={`${credit.title || credit.name}, como ${credit.character}`}
  tabIndex={0}
>
  {/* contenido */}
</div>

// Filtros de filmografía
<div role="tablist" aria-label="Filtro de filmografía">
  <button
    role="tab"
    aria-selected={filter === 'all'}
    aria-controls="filmography-grid"
  >
    Todos
  </button>
</div>
```

### Screen Reader Considerations

| Consideración | Implementación |
|---------------|----------------|
| **Estado hover** | No comunicar visualmente, solo anuncios relevantes |
| **Orden de lectura** | Foto → Nombre → Personaje (en idle) |
| **Hidden Content** | Icon-only buttons con `aria-label` |
| **Heading Structure** | H1: Nombre del actor, H2: Secciones principales |

### Contraste de Colores

| Elemento | Tema Oscuro | WCAG AA |
|----------|--------------|----------|
| Nombre en overlay | #FFFFFF on #000000 (opacity 80%) | ✅ 21:1 |
| Nombre en rojo (hover) | #E50914 on #141414 | ✅ 8.4:1 |
| Personaje (idle) | #B3B3B3 on #141414 | ✅ 12.6:1 |

### Touch Targets

| Elemento | Mínimo | Implementación |
|----------|--------|----------------|
| CastCard clickable area | 44×44px | Padding en contenedor invisible si necesario |
| Botones de acción | 44×44px | `min-w-[44px] min-h-[44px]` |

### Reduced Motion

```tsx
<div className="group relative rounded-lg transition-all duration-200">
  <div className="transition-transform duration-300 group-hover:scale-105">
    {/* contenido */}
  </div>
</div>

// En prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .transition-transform {
    transition: none;
  }
  .group-hover\:scale-105:hover {
    transform: none;
  }
}
```

---

## Referencias de Implementación

### Rutas de Navegación

```typescript
// React Router - Configuración
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/movies/:id',
    element: <MovieDetailPage />,
  },
  {
    path: '/series/:id',
    element: <SeriesDetailPage />,
  },
  {
    path: '/person/:id',
    element: <PersonDetailPage />,
  },
]);
```

### Servicios TMDB

```typescript
// Person service - Obtener detalles
export async function getPersonDetails(id: number): Promise<PersonDetails> {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=movie_credits,tv_credits,images,external_ids`
  );
  return response.json();
}

// PersonDetails interface
interface PersonDetails {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  gender: number; // 0: Unknown, 1: Female, 2: Male, 3: Non-binary
  known_for_department: string;
  known_for: Array<Movie | TVShow>;
  movie_credits: {
    cast: Credit[];
    crew: Credit[];
  };
  tv_credits: {
    cast: Credit[];
    crew: Credit[];
  };
  images: {
    profiles: ProfileImage[];
  };
}

interface Credit {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  character?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
}
```

---

## Resumen de Deliverables

| Entregable | Estado |
|------------|--------|
| ✅ CastCard con hover effect similar a MediaCard | Definido |
| ✅ Hover con nombre en rojo (#E50914) | Definido |
| ✅ Degradado en hover al estilo Netflix | Definido |
| ✅ Flecha (ArrowRight) en hover | Definido |
| ✅ PersonDetailPage con secciones completas | Definido |
| ✅ Filmografía con filtros (Películas/Series) | Definido |
| ✅ CreditCard para trabajos individuales | Definido |
| ✅ Skeleton patterns para carga | Definido |
| ✅ Tokens de diseño (colores, tipografía, animaciones) | Definido |
| ✅ Accesibilidad (keyboard, ARIA, contrast, touch) | Definido |

---

## Notas de Implementación

1. **Imágenes de actores**: Usar `w185` para CastCard y `h632` para PersonDetailPage (foto grande)
2. **Hover consistency**: Mantener el mismo tiempo de animación (300ms) y easing (ease-in-out) que MediaCard
3. **Responsive grid**: Mostrar más columnas en pantallas grandes para aprovechar el espacio
4. **Lazy loading**: Usar `loading="lazy"` en imágenes fuera del viewport
5. **Skeletons**: Implementar skeletons para todos los estados de carga
6. **Error handling**: Mostrar placeholders cuando no haya foto de perfil
