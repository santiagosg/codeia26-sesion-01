# UI Kit

Documentación completa de componentes, estilos y sistema de diseño de la aplicación Netflix-like.

---

## Tabla de Contenidos

- [Tailwind Tokens](#tailwind-tokens)
- [Wireframes](#wireframes)
- [Skeleton Patterns](#skeleton-patterns)
- [Search UX](#search-ux)
- [Sistema de Colores](#sistema-de-colores)
- [Temas](#temas)
- [Tipografía](#tipografía)
- [Componentes shadcn/ui](#componentes-shadcnui)
- [Componentes Custom](#componentes-custom)
- [Estados de Carga](#estados-de-carga)
- [Dropdowns Modernos](#dropdowns-modernos)
- [Filtros Comunes](#filtros-comunes)
- [Paginación](#paginacion)
- [Espaciado](#espaciado)
- [Responsividad](#responsividad)
- [Netflix UI Kit Specification](#netflix-ui-kit-specification)

---

## Tailwind Tokens

> 📋 La definición completa de tokens de diseño con ejemplos de uso conceptual se encuentra en **[tailwind_tokens.md](tailwind_tokens.md)**

Este archivo incluye:
- **Colores Semánticos** - Brand, overlay, y rating colors
- **Spacing System** - card-gap, section-y, hero-padding, touch-target
- **Typography Scale** - display, hero, card, meta, badge
- **Animation Timing** - hover, focus, modal durations + easing curves
- **Border Radius** - card, badge, button, modal
- **Ejemplos de Uso** - Implementaciones conceptuales con código

```bash
# Ver tokens de Tailwind
cat DOCS/tailwind_tokens.md
```

---

## Wireframes

> 📐 Wireframes anotados de Home y Detail view con ASCII, Mermaid diagrams, leyendas de componentes e interacciones.

Este archivo incluye:
- **Home Page** - Wireframe ASCII + Component Tree Mermaid + Leyenda + Interacciones
- **Detail View** - Wireframe ASCII + Component Tree Mermaid + Leyenda + Interacciones
- **Criterios de Legibilidad** - Contraste, typography, overlays, z-index layering

```bash
# Ver wireframes completos
cat DOCS/wireframes.md
```

---

## Skeleton Patterns

> 🦴 Patrones de carga (Skeleton) para MovieCard y Detail con dimensiones, tiempos y shimmer.

Este archivo incluye:
- **Principios UX de Skeleton** - Indicadores, estructura, transiciones
- **MovieCard Skeleton** - Dimensiones, estructura interna, estados
- **Detail Skeleton** - Dimensiones por sección, estructura completa
- **Shimmer Animation** - Cuándo usar shimmer vs pulse, configuración CSS
- **Tiempos de Carga** - Timing matrix por tamaño y conexión
- **Checklist Skeleton vs Empty** - Flujo de decisión, cuando usar cada estado

```bash
# Ver patrones de skeleton completos
cat DOCS/skeleton_patterns.md
```

---

## Sistema de Colores

### Colores Primarios (Netflix-like)

| Variable CSS | Valor (Tema Oscuro) | Valor (Tema Claro) | Uso |
|---------------|----------------------|---------------------|-----|
| `--netflix-red` | `#E50914` | `#E50914` | Botones principales, acentos, highlights |
| `--netflix-black` | `#141414` | - | Background principal (tema oscuro) |
| `--netflix-dark` | `#181818` | - | Cards, headers (tema oscuro) |
| `--netflix-gray` | `#2F2F2F` | - | Bordes, elementos secundarios (tema oscuro) |

### Variables CSS por Tema

#### Tema Oscuro (Default - Netflix-like)
```css
--background: #141414;
--foreground: #FFFFFF;
--card: #181818;
--card-foreground: #FFFFFF;
--primary: #E50914;
--primary-foreground: #FFFFFF;
--muted: #2F2F2F;
--muted-foreground: #B3B3B3;
--border: #404040;
--input: #2F2F2F;
--ring: #E50914;
```

#### Tema Claro
```css
--background: #FFFFFF;
--foreground: #141414;
--card: #F5F5F5;
--card-foreground: #141414;
--primary: #E50914;
--primary-foreground: #FFFFFF;
--muted: #E5E5E5;
--muted-foreground: #666666;
--border: #D1D1D1;
--input: #E5E5E5;
--ring: #E50914;
```

---

## Temas

### Tema Oscuro (Default)
- **Background:** `#141414` (negro Netflix)
- **Card Background:** `#181818`
- **Text:** `#FFFFFF` (blanco)
- **Accent:** `#E50914` (rojo Netflix)
- **Muted Text:** `#B3B3B3` (gris claro)
- **Border:** `#404040` (gris medio)

### Tema Claro
- **Background:** `#FFFFFF` (blanco)
- **Card Background:** `#F5F5F5` (gris muy claro)
- **Text:** `#141414` (casi negro)
- **Accent:** `#E50914` (rojo Netflix - mismo en ambos temas)
- **Muted Text:** `#666666` (gris medio)
- **Border:** `#D1D1D1` (gris claro)

### Toggle de Tema
- **Ubicación:** Header (esquina superior derecha)
- **Icono:** Sol (tema claro) / Luna (tema oscuro)
- **Animación:** Smooth transition (300ms)
- **Persistencia:** localStorage

---

## Tipografía

### Fuente Principal
- **Nombre:** Inter (o fuente system default)
- **Pesos:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Escalas de Tamaño:**

| Clase Tailwind | Tamaño | Uso |
|-----------------|---------|-----|
| `text-xs` | 12px | Labels pequeños, metadata |
| `text-sm` | 14px | Descripciones cortas, tags |
| `text-base` | 16px | Texto de cuerpo |
| `text-lg` | 18px | Títulos de secciones |
| `text-xl` | 20px | Subtítulos |
| `text-2xl` | 24px | Títulos de cards |
| `text-3xl` | 30px | Títulos destacados |
| `text-4xl` | 36px | Hero titles |
| `text-5xl` | 48px | Hero titles grandes |

---

## Componentes shadcn/ui

### Lista de Componentes Instalados

| Componente | Descripción | Variantes |
|------------|-------------|-----------|
| **Button** | Botón reutilizable | default, destructive, outline, ghost, link |
| **Card** | Contenedor con header y contenido | default, outline |
| **Input** | Campo de entrada de texto | default |
| **Select** | Dropdown select | default |
| **DropdownMenu** | Menú dropdown con opciones | - |
| **Dialog** | Modal/Dialog overlay | - |
| **ScrollArea** | Área con scroll personalizado | - |
| **Skeleton** | Skeleton de carga | - |
| **Separator** | Línea separadora | horizontal, vertical |
| **Badge** | Badge/etiqueta | default, secondary, destructive, outline |
| **Avatar** | Avatar con imagen o iniciales | - |
| **DropdownMenuItem** | Item de menú dropdown | - |f
| **DropdownMenuTrigger** | Trigger del dropdown | - |
| **DropdownMenuContent** | Contenido del dropdown | - |

### Instalación de Componentes

```bash
# Instalar componente individual
npx shadcn-ui@latest add button

# Instalar múltiples componentes
npx shadcn-ui@latest add button card input select dialog

# Inicializar shadcn/ui (primera vez)
npx shadcn-ui@latest init
```

---

## Componentes Custom

### Layout Components

#### Header
- **Ubicación:** `src/components/layout/Header.tsx`
- **Props:**
  - `title?: string` - Título de la app
  - `showSearch?: boolean` - Mostrar barra de búsqueda
- **Contenido:**
  - Logo de la aplicación
  - Navegación principal (Home, Películas, Series)
  - Barra de búsqueda
  - Toggle de tema (Sol/Luna)

#### Footer
- **Ubicación:** `src/components/layout/Footer.tsx`
- **Props:** None
- **Contenido:**
  - Enlaces sociales
  - Información de copyright
  - Enlaces legales

#### MainLayout
- **Ubicación:** `src/components/layout/MainLayout.tsx`
- **Props:** `children: ReactNode`
- **Contenido:**
  - Wrapper principal
  - Incluye Header y Footer
  - Gestión de scroll global

---

### Media Components

#### MediaCard
- **Ubicación:** `src/components/media/MediaCard.tsx`
- **Props:**
  - `media: Movie | TVShow` - Datos del contenido
  - `onClick: () => void` - Callback al hacer click
  - `showRating?: boolean` - Mostrar rating (default: true)
- **Características:**
  - Poster con hover effect
  - Rating con estrellas
  - Año de lanzamiento
  - Skeleton de carga

#### MediaRow
- **Ubicación:** `src/components/media/MediaRow.tsx`
- **Props:**
  - `title: string` - Título de la sección
  - `mediaList: Movie[] | TVShow[]` - Lista de contenido
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Título de sección
  - Scroll horizontal
  - Flechas de navegación
  - Skeleton de carga

#### MediaGrid
- **Ubicación:** `src/components/media/MediaGrid.tsx`
- **Props:**
  - `mediaList: Movie[] | TVShow[]` - Lista de contenido
  - `columns?: number` - Número de columnas (responsivo)
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Grid responsivo (1-6 columnas)
  - Soporte para paginación
  - Skeleton de carga

#### HeroBanner
- **Ubicación:** `src/components/media/HeroBanner.tsx`
- **Props:**
  - `media?: Movie | TVShow` - Contenido destacado
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Imagen de fondo grande (backdrop)
  - Título destacado
  - Descripción corta
  - Botón "Ver ahora"
  - Botón "Más información"
  - Skeleton de carga

---

### Detail Components

#### MovieDetail
- **Ubicación:** `src/components/detail/MovieDetail.tsx`
- **Tipo:** Class Component (legacy)
- **Props:**
  - `movie: MovieDetails` - Datos de la película
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Banner con backdrop
  - Información completa
  - Elenco (CastList)
  - Trailers (VideoPlayer)
  - Contenido similar

#### TVDetail
- **Ubicación:** `src/components/detail/TVDetail.tsx`
- **Tipo:** Class Component (legacy)
- **Props:**
  - `tvShow: TVShowDetails` - Datos de la serie
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Banner con backdrop
  - Información completa
  - Lista de temporadas (dropdown)
  - Elenco (CastList)
  - Trailers (VideoPlayer)
  - Contenido similar

#### CastList
- **Ubicación:** `src/components/detail/CastList.tsx`
- **Props:**
  - `cast: Cast[]` - Lista del elenco
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Grid de actores
  - Foto, nombre, personaje
  - Scroll horizontal
  - Skeleton de carga

#### GenreTags
- **Ubicación:** `src/components/detail/GenreTags.tsx`
- **Props:**
  - `genres: Genre[]` - Lista de géneros
  - `onGenreClick?: (genre: Genre) => void` - Callback al click
- **Características:**
  - Tags clickeables
  - Scroll horizontal
  - Colores adaptativos al tema

#### SimilarMedia
- **Ubicación:** `src/components/detail/SimilarMedia.tsx`
- **Props:**
  - `mediaList: Movie[] | TVShow[]` - Lista de contenido similar
  - `mediaType: 'movie' | 'tv'` - Tipo de contenido
  - `title?: string` - Título de sección
- **Características:**
  - Grid de contenido similar
  - Cards con click para navegar
  - Skeleton de carga

#### VideoPlayer
- **Ubicación:** `src/components/detail/VideoPlayer.tsx`
- **Props:**
  - `videos: Video[]` - Lista de videos
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Reproductor de YouTube embed
  - **Dropdown moderno** para selección de trailers
  - Lista de videos disponibles

---

### Search Components

#### SearchBar
- **Ubicación:** `src/components/search/SearchBar.tsx`
- **Props:**
  - `onSearch: (query: string) => void` - Callback al buscar
  - `placeholder?: string` - Placeholder del input
  - `loading?: boolean` - Estado de carga
- **Características:**
  - Input con icono de búsqueda
  - Debounce en typing
  - Dropdown moderno para resultados rápidos
  - Colores adaptativos al tema

#### SearchResults
- **Ubicación:** `src/components/search/SearchResults.tsx`
- **Props:**
  - `results: SearchResult[]` - Resultados de búsqueda
  - `loading?: boolean` - Estado de carga
  - `mediaType?: 'all' | 'movie' | 'tv'` - Filtro por tipo
- **Características:**
  - Grid de resultados
  - Tabs para filtrar por tipo (Películas/Series/Personas)
  - Skeleton de carga
  - Estado vacío sin resultados

#### SearchFilter
- **Ubicación:** `src/components/search/SearchFilter.tsx`
- **Props:**
  - `filters: SearchFilters` - Filtros aplicados
  - `onFilterChange: (filters: SearchFilters) => void` - Callback al cambiar filtros
  - `genres: Genre[]` - Lista de géneros disponibles
- **Características:**
  - **Dropdowns modernos** para filtros
  - Género (multi-select dropdown)
  - Año (dropdown o range slider)
  - Rating (dropdown con estrellas)
  - Reset de filtros

---

### Common Components

#### LoadingSpinner
- **Ubicación:** `src/components/common/LoadingSpinner.tsx`
- **Props:**
  - `size?: 'sm' | 'md' | 'lg' | 'xl'` - Tamaño (default: md)
  - `color?: string` - Color (default: primary)
- **Características:**
  - Spinner animado
  - Configurable size/color

#### ErrorMessage
- **Ubicación:** `src/components/common/ErrorMessage.tsx`
- **Props:**
  - `message: string` - Mensaje de error
  - `onRetry?: () => void` - Callback para reintentar
- **Características:**
  - Mensaje de error amigable
  - Botón de reintentar
  - Colores adaptativos al tema

#### ErrorBoundary
- **Ubicación:** `src/components/common/ErrorBoundary.tsx`
- **Tipo:** Class Component (legacy)
- **Props:**
  - `children: ReactNode` - Componentes hijos
  - `fallback?: ReactNode` - Fallback personalizado
- **Características:**
  - Captura de errores de React
  - UI de error amigable

---

## Estados de Carga (Skeletons)

### Skeleton Component (shadcn/ui)

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton para MediaCard
<Skeleton className="w-full aspect-[2/3] rounded-lg" />

// Skeleton para HeroBanner
<Skeleton className="w-full h-[60vh] rounded-lg" />

// Skeleton para texto
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

### Ubicaciones de Skeleton

| Componente | Tipo de Skeleton |
|------------|------------------|
| MediaCard | Poster rectángulo + skeleton de texto |
| MediaRow | Múltiples cards con skeleton |
| MediaGrid | Grid de cards con skeleton |
| HeroBanner | Banner grande con skeleton |
| CastList | Avatares circulares con skeleton |
| MovieDetail/TVDetail | Banner + skeleton de información |
| SearchResults | Grid de skeletons |
| SearchBar | Skeleton de input |

---

## Search UX

> 🔍 Experiencia de búsqueda con Command K, resultados navegables y accesibilidad completa.

Este archivo incluye:
- **Trigger del Command** - Atajos de teclado (Ctrl/Cmd+K, /, Escape)
- **Estados del Command** - Closed, Open, Searching, Results, Empty, Error
- **Resultados de Búsqueda** - Estructura con título/año/rating, orden de relevancia
- **Navegación por Teclado** - Arrow keys, Home/End, Enter, Tab
- **Estados Vacíos y Errores** - Empty state con CTA, error state con retry
- **Criterios de Focus** - Orden de focus, focus trap, focus visible indicators
- **Roles ARIA** - Estructura completa de ARIA para accesibilidad

```bash
# Ver experiencia de búsqueda completa
cat DOCS/search_ux.md
```

---

## Dropdowns Modernos

### shadcn/ui DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Dropdown básico
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Opción 1</DropdownMenuItem>
    <DropdownMenuItem>Opción 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Características de Dropdowns Modernos

| Característica | Descripción |
|---------------|-------------|
| Animación | Smooth fade + scale (150ms) |
| Posicionamiento | Auto (bottom-start, top-end, etc.) |
| Soporte de teclado | Arrow keys + Enter/Escape |
| Colores | Adaptativos al tema (Claro/Oscuro) |
| Iconos | Soporte para Lucide icons |
| Accesibilidad | ARIA labels, focus management |
| Offset | Personalizable (gap entre trigger y content) |

### Dropdowns en la App

| Ubicación | Tipo de Dropdown | Propósito |
|-----------|------------------|------------|
| VideoPlayer | Select de trailers | Elegir trailer a reproducir |
| TVDetail | Select de temporadas | Navegar entre temporadas |
| SearchFilter | Multi-select géneros | Filtrar por múltiples géneros |
| SearchFilter | Dropdown de año | Filtrar por año |
| SearchFilter | Dropdown de rating | Filtrar por valoración |
| Paginación | Select de página | Navegar a página específica |

---

## Filtros Comunes en Listados

### Tipos de Filtros

| Filtro | Tipo | Componente | Valores |
|--------|-------|-------------|----------|
| **Género** | Multi-select | DropdownMenu | IDs de géneros TMDB |
| **Año** | Range o Select | DropdownMenu/Slider | Año (ej: 2024) |
| **Rating** | Select | DropdownMenu | 0-10 (estrellas) |
| **Tipo** | Tabs | Tabs | Películas/Series |

### Componente SearchFilter

```tsx
interface SearchFilters {
  genres?: number[];
  year?: number;
  rating?: number;
  type?: 'all' | 'movie' | 'tv';
}

// Ejemplo de uso en MoviesPage
<SearchFilter
  filters={filters}
  onFilterChange={setFilters}
  genres={genres}
/>
```

### Dropdowns de Filtros

#### Filtro de Género (Multi-select)
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <Filter className="mr-2 h-4 w-4" />
      Géneros
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Seleccionar Géneros</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {genres.map((genre) => (
      <DropdownMenuItem key={genre.id}>
        <Checkbox checked={selectedGenres.includes(genre.id)} />
        {genre.name}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

#### Filtro de Año (Dropdown)
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Año</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setYear(2024)}>2024</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setYear(2023)}>2023</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setYear(2022)}>2022</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Filtro de Rating (Dropdown con estrellas)
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <Star className="mr-2 h-4 w-4" />
      Rating
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setRating(8)}>★★★★☆ (8+)</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setRating(7)}>★★★☆☆ (7+)</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setRating(6)}>★★☆☆☆ (6+)</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Paginación

### Componente de Paginación

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

// Dropdown de páginas
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Página {currentPage} de {totalPages}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
      <DropdownMenuItem key={i + 1} onClick={() => onPageChange(i + 1)}>
        {i + 1}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

// Botones de navegación
<div className="flex gap-2">
  <Button
    variant="outline"
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    <ChevronLeft className="h-4 w-4" />
  </Button>
  <Button
    variant="outline"
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    <ChevronRight className="h-4 w-4" />
  </Button>
</div>
```

### Paginación en Listados

| Página | Tipo de Paginación |
|---------|-------------------|
| MoviesPage | Dropdown de páginas + Anterior/Siguiente |
| TVShowsPage | Dropdown de páginas + Anterior/Siguiente |
| SearchPage | Infinite scroll o Dropdown de páginas |
| Home Page | Ver más (load more) |

---

## Espaciado

### Escala de Espaciado (Tailwind)

| Clase | Tamaño | Uso |
|--------|---------|-----|
| `p-1` | 4px | Espacio muy pequeño |
| `p-2` | 8px | Espacio pequeño |
| `p-3` | 12px | Espacio regular |
| `p-4` | 16px | Espacio medio |
| `p-6` | 24px | Espacio grande |
| `p-8` | 32px | Espacio muy grande |
| `gap-2` | 8px | Gap entre elementos |
| `gap-4` | 16px | Gap medio |
| `gap-6` | 24px | Gap grande |
| `gap-8` | 32px | Gap muy grande |

---

## Responsividad

### Breakpoints

| Breakpoint | Ancho | Dispositivo |
|------------|--------|-------------|
| `sm` | 640px | Mobile grande |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop grande |

### Grid Responsivo

```tsx
// MediaGrid responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
  {mediaList.map((media) => (
    <MediaCard key={media.id} media={media} />
  ))}
</div>
```

| Breakpoint | Columnas |
|------------|-----------|
| Mobile (< 640px) | 1 columna |
| sm (640px+) | 2 columnas |
| md (768px+) | 3 columnas |
| lg (1024px+) | 4 columnas |
| xl (1280px+) | 5 columnas |
| 2xl (1536px+) | 6 columnas |

---

## Animaciones

### Transiciones

```css
/* Transición suave para tema */
* {
  transition: background-color 300ms ease, color 300ms ease;
}

/* Transición de hover */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
```

### Efectos de Hover

| Elemento | Efecto |
|-----------|---------|
| MediaCard | Scale 1.05 + shadow |
| Button | Scale 0.95 |
| Header item | Underline animation |
| Dropdown | Fade + scale |

---

## Accesibilidad

### Contraste de Colores

| Elemento | Tema Oscuro | Tema Claro | WCAG AA |
|-----------|--------------|-------------|----------|
| Texto primario | #FFFFFF on #141414 | #141414 on #FFFFFF | ✅ |
| Texto secundario | #B3B3B3 on #141414 | #666666 on #FFFFFF | ✅ |
| Botón primario | #FFFFFF on #E50914 | #FFFFFF on #E50914 | ✅ |
| Bordes | #404040 | #D1D1D1 | ✅ |

### ARIA Labels

```tsx
// Toggle de tema
<button
  aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>

// Búsqueda
<input
  aria-label="Buscar películas y series"
  placeholder="Buscar..."
/>
```

---

# Netflix UI Kit Specification

Especificación completa del kit mínimo de componentes para una interfaz tipo Netflix, utilizando shadcn/ui y Tailwind CSS.

---

## Tabla de Contenidos - Netflix UI Kit

- [Catálogo de Componentes](#catálogo-de-componentes)
  - [Navbar](#navbar)
  - [MovieGrid](#moviegrid)
  - [MovieCard](#moviecard)
  - [DetailView](#detailview)
- [Variants](#variants)
  - [MovieCard Variants](#moviecard-variants)
  - [Badge Variants](#badge-variants)
  - [Button Variants](#button-variants)
- [Tokens de Tailwind](#tokens-de-tailwind) → Ver [tailwind_tokens.md](tailwind_tokens.md)
- [Reglas de Accesibilidad](#reglas-de-accesibilidad-wcag-21-aa)

---

## Catálogo de Componentes

### Navbar

| Estado | Descripción | Tokens |
|--------|-------------|--------|
| **Idle** | Posición fija top, gradiente semi-transparente, logo + navegación + usuario | `bg-black/80` → `bg-black/95` (scroll), `h-16`, `px-6` |
| **Hover** | Links con subrayado animado, avatar con badge de notificación | `group-hover:text-white`, `transition-colors-200` |
| **Focus** | Focus ring visible 2px white, padding visible para touch targets | `focus-visible:ring-2 focus-visible:ring-white`, `min-w-44` touch target |
| **Loading** | Skeleton para logo, pulsing para nav items, avatar placeholder | `animate-pulse`, `bg-neutral-800` |

**Sub-componentes:** Search input, Profile dropdown, Mobile menu drawer

---

### MovieGrid

| Estado | Descripción | Tokens |
|--------|-------------|--------|
| **Idle** | Grid responsive con gap, scroll horizontal o vertical según layout | `grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`, `gap-4` |
| **Hover** | Scale suave de cards dentro del contenedor, cursor pointer | `hover:scale-[1.02]`, `transition-transform-200` |
| **Focus** | Focus visible en el contenedor, scroll con arrow keys | `focus-within:ring-1`, `focus-visible:ring-2 focus-visible:ring-white` |
| **Loading** | Skeleton cards repetidos, shimmer effect | `animate-shimmer`, `bg-neutral-800/50` |

**Sub-componentes:** Section header, Carousel arrows, Loading skeleton

---

### MovieCard

| Estado | Descripción | Tokens |
|--------|-------------|--------|
| **Idle** | Poster con metadata overlay (título, año), ratio 2:3 o 16:9 | `aspect-[2/3]` (portrait) / `aspect-video` (landscape) |
| **Hover** | Scale 1.05, metadata expandida, botón Play visible, badge de calidad | `hover:scale-105`, `hover:shadow-2xl`, `group-hover:opacity-100` |
| **Focus** | Focus ring outline 3px white/card-outline, padding compensado | `focus-visible:outline-3 focus-visible:outline-white`, `p-1` offset |
| **Loading** | Shimmer gradient, pulse en metadata, placeholder gray | `bg-gradient-to-r from-neutral-800 to-neutral-700`, `animate-pulse` |

**Elementos visibles:** Poster image, Title, Year, Duration, Quality badge (4K/HD), Play button, Add to list button

---

### DetailView (Modal/Page)

| Estado | Descripción | Tokens |
|--------|-------------|--------|
| **Idle** | Hero section con backdrop blur, info sobre imagen, cast horizontal, related content | `h-[70vh]`, `bg-gradient-to-b from-transparent to-black` |
| **Hover** | Interactive tooltips en cast, botones con hover states | `hover:text-red-500`, `hover:bg-white/10` |
| **Focus** | Focus visible en botones principales, focus trapping en modal | `focus-visible:ring-4`, `trap-focus` |
| **Loading** | Hero skeleton, cast skeleton shimmer, placeholder sections | `animate-pulse`, `bg-neutral-900` |

**Secciones:** Hero backdrop, Metadata (title, year, rating, genres), Synopsis, Cast carousel, Similar content, Action buttons (Play, My List, Share)

---

## Variants

### MovieCard Variants

| Variant | Dimensiones | Uso | Tokens Tailwind |
|---------|-------------|-----|-----------------|
| **compact** | 120x180px (2:3), metadata minimal | Row horizontal, trending small | `w-[120px] aspect-[2/3] text-xs` |
| **wide** | 320x180px (16:9), metadata lateral o bottom | Featured, hero thumbnails | `w-[320px] aspect-video text-sm` |
| **hero** | Full width + metadata overlay | Main featured banner | `w-full aspect-video text-lg md:text-xl` |

### Badge Variants

| Variant | Estilo | Uso | Tokens Tailwind |
|---------|--------|-----|-----------------|
| **rating** | Pill, score colored (green/yellow/red) + icon | User ratings, critic scores | `rounded-full px-2 py-0.5 text-xs bg-black/50 backdrop-blur` |
| **genre** | Chip, outline, neutral | Genre tags | `rounded-md px-2 py-0.5 text-xs border border-white/20` |
| **quality** | Corner badge, solid accent (4K/HD) | Video quality indicator | `absolute top-2 right-2 px-1.5 py-0.5 text-[10px] bg-red-600` |
| **new** | Pill, solid primary, animated pulse | New content flag | `rounded-full px-2 py-0.5 text-xs bg-red-600 animate-pulse` |

### Button Variants

| Variant | Estilo | Uso | Tokens Tailwind |
|---------|--------|-----|-----------------|
| **primary** | Solid white/black, rounded-lg | Play, CTA principal | `bg-white text-black hover:bg-white/90 rounded-lg px-6 py-2` |
| **secondary** | Outline, semi-transparent | My List, Share | `border border-white/30 bg-white/10 hover:bg-white/20 rounded-lg px-6 py-2` |
| **icon** | Circle, icon-only | Close, Mute, Settings | `w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center` |

---

## Tokens de Tailwind

> ⚠️ La definición completa de tokens de Tailwind con ejemplos de uso conceptual ha sido movida a [tailwind_tokens.md](tailwind_tokens.md).

### Resumen Rápido

| Categoría | Archivo | Contenido |
|-----------|---------|-----------|
| **Colores Semánticos** | [tailwind_tokens.md](tailwind_tokens.md#colores-semánticos) | Brand, overlay, rating colors |
| **Spacing System** | [tailwind_tokens.md](tailwind_tokens.md#spacing-system) | card-gap, section-y, hero-padding, touch-target |
| **Typography Scale** | [tailwind_tokens.md](tailwind_tokens.md#typography-scale) | display, hero, card, meta, badge |
| **Animation Timing** | [tailwind_tokens.md](tailwind_tokens.md#animation-timing) | hover, focus, modal durations + easing |
| **Border Radius** | [tailwind_tokens.md](tailwind_tokens.md#border-radius) | card, badge, button, modal |

---

## Reglas de Accesibilidad (WCAG 2.1 AA)

### Navegación por Teclado

| Componente | Requisito | Implementación |
|------------|-----------|----------------|
| **Navbar** | Tab order lógico, escape cierra dropdowns | `tabindex="0"`, `data-state`, `role="navigation"` |
| **MovieGrid** | Arrow keys navegan cards, Home/End extremos | `role="grid"`, `aria-colcount`, JS keyboard handlers |
| **MovieCard** | Enter/Space activa, visible focus ring | `tabindex="0"`, `role="button"`, `aria-label="{title}, {year}"` |
| **DetailView** | Focus trap en modal, Escape cierra | `role="dialog"`, `aria-modal="true"`, focus management |

### Contraste y Legibilidad

| Elemento | Requisito WCAG | Medición |
|----------|----------------|----------|
| **Text on dark** | 4.5:1 normal, 3:1 large | White text on `#141414` = 15.8:1 ✓ |
| **Buttons** | 3:1 para componentes no-texto | Primary button ✓, Secondary button border ✓ |
| **Badges** | 3:1 mínimo | Rating badge on overlay = 4.5:1 ✓ |
| **Links** | Subrayado o equivalente visual | Hover underline, color change ✓ |

### ARIA Roles y Propiedades

```yaml
Navbar:
  role: navigation
  aria-label: "Menú principal"
  items: role="menuitem", aria-current cuando activo

MovieGrid:
  role: grid
  aria-label: "{section name}"
  cells: role="gridcell", aria-rowindex, aria-colindex

MovieCard:
  role: button
  aria-label: "{title}, estrenado en {year}, duración {duration}"
  aria-describedby: "{rating-badge-id}"

DetailView:
  role: dialog
  aria-labelledby: "{title-id}"
  aria-modal: "true"
  close: aria-label="Cerrar"
```

### Focus Management

| Regla | Detalles |
|-------|----------|
| **Visible Focus** | `focus-visible:ring-2 ring-white ring-offset-2 ring-offset-black` thickness mínimo 2px |
| **Focus Order** | Lógico: Navbar → Grid → Cards → Detail → Close button |
| **Focus Restoration** | Al cerrar modal, focus regresa al trigger element |
| **No Focus Trap** | Menú dropdown puede cerrarse con Escape sin trap |

### Screen Reader Considerations

| Consideración | Implementación |
|---------------|----------------|
| **Live Regions** | `aria-live="polite"` para notificaciones (Añadido a lista) |
| **Hidden Content** | Icon-only buttons: `aria-label` descriptivo |
| **Heading Structure** | H1 para título principal, H2 para secciones, H3 para card titles |
| **Skip Links** | "Saltar al contenido" visible al focus inicial |
| **Image Alt** | Poster: alt="{title} poster" decorativo si hay texto card; Null alt si es puro decorativo |

### Motion y Animaciones

| Preferencia | Implementación |
|-------------|----------------|
| **Reduced Motion** | `prefers-reduced-motion` deshabilita scale, transform, animations |
| **Animation Duration** | Máximo 200ms para hover states en reduced motion |
| **Pause Auto-scroll** | Carousel se detiene en hover, `aria-live="off"` |

### Touch Targets

| Elemento | Mínimo | Implementación |
|----------|--------|----------------|
| **Buttons** | 44×44px | `min-w-[44px] min-h-[44px]` |
| **Links** | 44×44px | Padding compensado si visualmente más pequeño |
| **Card clickable area** | 44×44px mínimo en interactive elements | Expandir tap area invisible si necesario |

### Validación de Color

- **Color-only information:** Nunca comunicar estado solo por color (usar icono + color para rating)
- **Color blindness:** Testear con simuladores (Deuteranopia, Protanopia, Tritanopia)
- **Custom focus colors:** No depender solo de outline, agregar background/border change

---

## Resumen de Deliverables - Netflix UI Kit

| Entregable | Estado |
|------------|--------|
| ✅ Catálogo de componentes con 4 estados | Completado |
| ✅ Variants Card (compact/wide/hero) | Completado |
| ✅ Variants Badge (rating/genre/quality/new) | Completado |
| ✅ Variants Button (primary/secondary/icon) | Completado |
| ✅ Tokens Tailwind (colors, spacing, typography, animation, radius) | Completado |
| ✅ Reglas A11y (keyboard, contrast, ARIA, focus, screen reader, motion, touch, color) | Completado |

---

## Referencias

- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
