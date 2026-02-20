# CHANGELOG

Registro de cambios y plan de versiones del proyecto Netflix-like con TMDB API.

---

## Versionado Semver (Semantic Versioning)

`MAJOR.MINOR.PATCH`

| Cambio | Versión | Ejemplo |
|---------|----------|---------|
| Cambios incompatibles con la API anterior | MAJOR | 0.1.0 → 1.0.0 |
| Nueva funcionalidad compatible | MINOR | 0.1.0 → 0.2.0 |
| Correcciones de bugs compatibles | PATCH | 0.1.0 → 0.1.1 |

---

## Roadmap y Deadlines

### v0.1.0 - MVP Básico
**Deadline: Lunes 24/02/2026**

**Objetivo:** Configuración inicial del proyecto e infraestructura base.

#### Tareas
- [ ] Inicializar proyecto Vite + React + TypeScript
- [ ] Configurar Tailwind CSS con tema Claro/Oscuro
- [ ] Configurar shadcn/ui CLI
- [ ] Configurar aliases en tsconfig y vite.config
- [ ] Crear estructura de carpetas completa
- [ ] Crear archivo .env.example con variables de TMDB
- [ ] Configurar colores personalizados (Netflix-like)
  - Tema oscuro: `#141414` (background), `#E50914` (accent red)
  - Tema claro: `#FFFFFF` (background), `#E50914` (accent red)

#### Entregables
- Proyecto inicializado y funcional
- Dev server ejecutándose
- Estructura de carpetas creada
- Configuración de temas base

---

### v0.2.0 - Infraestructura de Datos
**Deadline: Martes 25/02/2026**

**Objetivo:** Capa de servicios y tipos TypeScript para TMDB API.

#### Tareas
- [ ] Crear tipos/interfaces en `src/types/tmdb/`
  - `movie.types.ts`
  - `tv.types.ts`
  - `person.types.ts`
  - `search.types.ts`
  - `genre.types.ts`
  - `video.types.ts`
  - `config.types.ts`
- [ ] Implementar servicios API
  - `src/services/api/axiosConfig.ts`
  - `src/services/api/tmdbClient.ts`
  - `src/services/api/endpoints.ts`
- [ ] Implementar servicios TMDB
  - `src/services/tmdb/configService.ts`
  - `src/services/tmdb/genreService.ts`
  - `src/services/tmdb/movieService.ts`
  - `src/services/tmdb/tvService.ts`
  - `src/services/tmdb/searchService.ts`
- [ ] Implementar utilidades
  - `src/utils/formatters.ts` (fechas, números)
  - `src/utils/constants.ts`
  - `src/utils/imageHelpers.ts`

#### Entregables
- Todos los tipos definidos
- Capa de servicios completa y testeada
- Documentación de uso de servicios

---

### v0.3.0 - Contextos y Hooks
**Deadline: Miércoles 26/02/2026**

**Objetivo:** State management global y custom hooks.

#### Tareas
- [ ] Implementar `src/context/AppContext.tsx`
  - Configuración global de TMDB
  - Image baseUrl
  - Lista de géneros (caché)
- [ ] Implementar `src/context/ThemeContext.tsx`
  - Toggle tema Claro/Oscuro
  - Persistencia en localStorage
  - Colores definidos para ambos temas
- [ ] Implementar custom hooks
  - `src/hooks/useTMDB.ts` (hook genérico para llamadas API)
  - `src/hooks/useDebounce.ts` (para búsqueda)
  - `src/hooks/useLocalStorage.ts` (persistencia)

#### Entregables
- Contextos funcionando
- Hooks custom documentados
- Toggle de tema Claro/Oscuro funcional

---

### v0.4.0 - Componentes UI Base
**Deadline: Jueves 27/02/2026**

**Objetivo:** Componentes base y comunes.

#### Tareas
- [ ] Instalar componentes shadcn/ui
  - button, card, input, select, dialog, scroll-area, skeleton, separator, badge, avatar, dropdown-menu
- [ ] Implementar `src/components/common/LoadingSpinner.tsx`
- [ ] Implementar `src/components/common/ErrorMessage.tsx`
- [ ] Implementar `src/components/common/ErrorBoundary.tsx`
- [ ] Configurar `src/styles/globals.css`
  - Estilos globales Tailwind
  - Variables CSS para temas Claro/Oscuro
  - Animaciones base

#### Entregables
- shadcn/ui instalado y configurado
- Componentes comunes funcionando
- Sistema de temas Claro/Oscuro implementado

---

### v0.5.0 - Layout y Navegación
**Deadline: Viernes 28/02/2026**

**Objetivo:** Estructura de layout y enrutamiento.

#### Tareas
- [ ] Implementar `src/components/layout/Footer.tsx`
- [ ] Implementar `src/components/layout/Header.tsx`
  - Logo de la aplicación
  - Navegación principal
  - Toggle de tema
  - Barra de búsqueda
- [ ] Implementar `src/components/layout/MainLayout.tsx`
- [ ] Configurar React Router en `src/main.tsx`
  - Proveedores (AppContext, ThemeContext)
  - BrowserRouter
- [ ] Implementar `src/App.tsx` con rutas base

#### Entregables
- Layout completo funcional
- Navegación entre rutas funcionando
- Tema Claro/Oscuro aplicado globalmente

---

### v0.6.0 - Componentes de Media
**Deadline: Sábado 01/03/2026**

**Objetivo:** Componentes para mostrar contenido de películas/series.

#### Tareas
- [ ] Implementar `src/components/media/HeroBanner.tsx`
  - Imagen de fondo grande
  - Título destacado
  - Botones de acción
  - Soporte para tema Claro/Oscuro
- [ ] Implementar `src/components/media/MediaCard.tsx`
  - Poster con hover effect
  - Rating con estrellas
  - Año de lanzamiento
  - Skeleton de carga
- [ ] Implementar `src/components/media/MediaRow.tsx`
  - Carrusel horizontal con scroll
  - Flechas de navegación
  - Título de sección
- [ ] Implementar `src/components/media/MediaGrid.tsx`
  - Grid responsivo (1-6 columnas)
  - Soporte para paginación
  - Skeleton de carga

#### Entregables
- Componentes de media funcionales
- Skeleton de carga implementado
- Responsive design completado

---

### v0.7.0 - Home Page
**Deadline: Domingo 02/03/2026**

**Objetivo:** Página principal funcional con contenido de TMDB.

#### Tareas
- [ ] Implementar `src/pages/HomePage.tsx` (Class Component)
  - Cargar datos en componentDidMount
  - HeroBanner con película destacada
  - Múltiples MediaRows (Trending, Popular, Top Rated)
- [ ] Integrar datos de TMDB en Home
  - Trending movies/day
  - Popular movies
  - Top rated movies
  - Popular TV shows
  - Top rated TV shows

#### Entregables
- Home page funcional
- Datos cargados desde TMDB
- Imágenes mostradas correctamente

---

### v0.8.0 - Componentes de Búsqueda
**Deadline: Lunes 03/03/2026**

**Objetivo:** Sistema de búsqueda con dropdowns modernos y filtros.

#### Tareas
- [ ] Implementar `src/components/search/SearchBar.tsx`
  - Input con debounce
  - Dropdown moderno para resultados rápidos
  - Icono de búsqueda
- [ ] Implementar `src/components/search/SearchFilter.tsx`
  - Dropdowns modernos para filtros
    - Género (select con dropdown)
    - Año (dropdown o range slider)
    - Rating (dropdown con estrellas)
  - Filtros comunes aplicables
- [ ] Implementar `src/components/search/SearchResults.tsx`
  - Grid de resultados
  - Tabs para filtrar por tipo (Películas/Series)
  - Skeleton de carga
  - Estado vacío sin resultados
  - Paginación

#### Entregables
- Sistema de búsqueda funcional
- Dropdowns modernos implementados
- Filtros comunes en listados
- Paginación en resultados

---

### v0.9.0 - Página de Búsqueda
**Deadline: Martes 04/03/2026**

**Objetivo:** Página de búsqueda completa con filtros.

#### Tareas
- [ ] Implementar `src/pages/SearchPage.tsx` (Class Component)
  - Barra de búsqueda en Header
  - Filtros comunes (Género, Año, Rating)
  - Paginación infinita
  - Skeleton de carga
  - Estado de vacío
- [ ] Integrar TMDB search/multi endpoint
- [ ] Implementar paginación con dropdown de selección de página

#### Entregables
- Página de búsqueda funcional
- Filtros comunes aplicables
- Paginación con dropdown moderno
- Skeleton de carga durante búsqueda

---

### v1.0.0 - Páginas de Listado (Películas y Series)
**Deadline: Miércoles 05/03/2026**

**Objetivo:** Catálogos de películas y series con filtros y paginación.

#### Tareas
- [ ] Implementar `src/pages/MoviesPage.tsx` (Class Component)
  - Tabs (Popular / Top Rated / En Cartelera)
  - Filtros comunes (Género, Año, Rating)
  - Paginación con dropdown de páginas
  - Skeleton de carga
  - Grid responsivo con MediaGrid
- [ ] Implementar `src/pages/TVShowsPage.tsx` (Class Component)
  - Tabs (Popular / Top Rated / En Emisión)
  - Filtros comunes (Género, Año, Rating)
  - Paginación con dropdown de páginas
  - Skeleton de carga
  - Grid responsivo con MediaGrid
- [ ] Implementar dropdown moderno para selección de filtros
  - shadcn/ui DropdownMenu
  - Selección múltiple para géneros
  - Range slider para años y rating

#### Entregables
- Catálogo de películas funcional
- Catálogo de series funcional
- Filtros comunes en listados
- Dropdowns modernos para filtros
- Paginación con dropdown de páginas
- Skeleton de carga implementado

---

### v1.1.0 - Componentes de Detalle
**Deadline: Jueves 06/03/2026**

**Objetivo:** Componentes para mostrar detalles de películas/series.

#### Tareas
- [ ] Implementar `src/components/detail/CastList.tsx`
  - Grid de actores
  - Foto, nombre, personaje
  - Scroll horizontal
  - Skeleton de carga
- [ ] Implementar `src/components/detail/GenreTags.tsx`
  - Tags clickeables para géneros
  - Scroll horizontal
  - Colores adaptativos al tema
- [ ] Implementar `src/components/detail/SimilarMedia.tsx`
  - Grid de contenido similar
  - Cards con click para navegar
- [ ] Implementar `src/components/detail/VideoPlayer.tsx`
  - Reproductor de YouTube embed
  - Selector de trailers (dropdown)
  - Lista de videos disponibles

#### Entregables
- Componentes de detalle funcionales
- Dropdown para selección de trailers
- Skeleton de carga en elenco

---

### v1.2.0 - Páginas de Detalle
**Deadline: Viernes 07/03/2026**

**Objetivo:** Páginas de detalle completas con toda la información.

#### Tareas
- [ ] Implementar `src/components/detail/MovieDetail.tsx`
  - Banner con backdrop
  - Información completa
  - Elenco (CastList)
  - Trailers (VideoPlayer)
  - Contenido similar
  - Tags de géneros
- [ ] Implementar `src/components/detail/TVDetail.tsx`
  - Banner con backdrop
  - Información completa
  - Lista de temporadas (dropdown)
  - Elenco (CastList)
  - Trailers (VideoPlayer)
  - Contenido similar
  - Tags de géneros
- [ ] Implementar `src/pages/MovieDetailPage.tsx` (Class Component)
  - Cargar datos en componentDidMount
  - Manejo de estado de carga/error
  - Integración con MovieDetail component
- [ ] Implementar `src/pages/TVDetailPage.tsx` (Class Component)
  - Cargar datos en componentDidMount
  - Manejo de estado de carga/error
  - Integración con TVDetail component

#### Entregables
- Página de detalle de película funcional
- Página de detalle de serie funcional
- Skeleton de carga en detalles
- Todos los datos de TMDB mostrados

---

### v1.3.0 - Características Adicionales (Opcional)
**Deadline: Sábado 08/03/2026**

**Objetivo:** Funcionalidades extra para mejorar la UX.

#### Tareas
- [ ] Implementar `src/context/FavoritesContext.tsx`
  - Gestión de favoritos
  - Persistencia en localStorage
  - Icono de corazón en cards
- [ ] Implementar `src/hooks/useInfiniteScroll.ts`
  - Scroll infinito en listados
- [ ] Implementar `src/hooks/useMediaDetails.ts`
  - Carga optimizada de detalles
- [ ] Implementar animaciones con Framer Motion (opcional)

#### Entregables
- Sistema de favoritos funcional
- Scroll infinito en listados
- Animaciones suaves

---

### v2.0.0 - Release Final
**Deadline: Domingo 09/03/2026**

**Objetivo:** Aplicación completa y lista para producción.

#### Tareas
- [ ] Testing completo de todas las rutas
- [ ] Testing de filtros comunes
- [ ] Testing de paginación
- [ ] Testing de temas Claro/Oscuro
- [ ] Testing de dropdowns modernos
- [ ] Testing de skeletons de carga
- [ ] Optimización de imágenes (lazy loading)
- [ ] Optimización de bundle
- [ ] Actualizar documentación completa
- [ ] Preparar build de producción

#### Entregables
- Aplicación completa y funcional
- Todos los requisitos implementados
- Documentación actualizada
- Build de producción optimizado

---

## Resumen de Requisitos por Versión

### Filtros Comunes en Listados
- **Versión:** v1.0.0
- **Componentes:** `SearchFilter.tsx`, `MoviesPage.tsx`, `TVShowsPage.tsx`
- **Dropdowns modernos:**
  - Género (dropdown multi-select)
  - Año (dropdown o range slider)
  - Rating (dropdown con estrellas)
- **Implementación:** shadcn/ui DropdownMenu + Select

### Paginación
- **Versión:** v1.0.0
- **Componentes:** `MediaGrid.tsx`, `MoviesPage.tsx`, `TVShowsPage.tsx`, `SearchPage.tsx`
- **Implementación:**
  - Dropdown moderno para selección de página
  - Botones Anterior/Siguiente
  - Información de "Página X de Y"

### Skeleton de Carga
- **Versión:** v0.6.0 - v1.2.0
- **Componentes:** Todos los componentes principales
- **Implementación:**
  - shadcn/ui Skeleton component
  - Estados de loading mientras cargan datos
  - Skeletons en cards, rows, grids, detalles

### Dropdowns Modernos
- **Versión:** v0.4.0 - v1.1.0
- **Componentes:** Todos los filtros y selectores
- **Implementación:**
  - shadcn/ui DropdownMenu
  - shadcn/ui Select
  - Animaciones suaves
  - Colores adaptativos al tema

### Tema Claro/Oscuro
- **Versión:** v0.3.0 - v0.5.0
- **Componentes:** `ThemeContext.tsx`, `Header.tsx`, componentes globales
- **Especificación completa:** Ver [ui_kit.md#temas](ui_kit.md#temas)
---

## Checklist de Características

| Característica | Versión | Deadline | Estado |
|---------------|----------|----------|---------|
| Configuración del proyecto | v0.1.0 | 24/02/2026 | ⏳ |
| Tipos y servicios TMDB | v0.2.0 | 25/02/2026 | ⏳ |
| Contextos y hooks | v0.3.0 | 26/02/2026 | ⏳ |
| Componentes UI base | v0.4.0 | 27/02/2026 | ⏳ |
| Layout y navegación | v0.5.0 | 28/02/2026 | ⏳ |
| Componentes de media | v0.6.0 | 01/03/2026 | ⏳ |
| Home page | v0.7.0 | 02/03/2026 | ⏳ |
| Componentes de búsqueda | v0.8.0 | 03/03/2026 | ⏳ |
| Página de búsqueda | v0.9.0 | 04/03/2026 | ⏳ |
| Páginas de listado | v1.0.0 | 05/03/2026 | ⏳ |
| Componentes de detalle | v1.1.0 | 06/03/2026 | ⏳ |
| Páginas de detalle | v1.2.0 | 07/03/2026 | ⏳ |
| Características adicionales | v1.3.0 | 08/03/2026 | ⏳ |
| Release final | v2.0.0 | 09/03/2026 | ⏳ |

---

## Requisitos Específicos por Versión

### Filtros Comunes (v1.0.0)
- [ ] Dropdown de Género (multi-select)
- [ ] Dropdown de Año (range o select)
- [ ] Dropdown de Rating (estrellas)
- [ ] Aplicación de filtros en MoviesPage
- [ ] Aplicación de filtros en TVShowsPage
- [ ] Aplicación de filtros en SearchPage

### Paginación (v1.0.0)
- [ ] Dropdown para seleccionar página
- [ ] Botones Anterior/Siguiente
- [ ] Indicador de página actual
- [ ] Total de páginas disponibles
- [ ] Integración con TMDB API (page parameter)

### Skeleton de Carga (v0.6.0+)
- [ ] Skeleton en MediaCards
- [ ] Skeleton en MediaRows
- [ ] Skeleton en MediaGrid
- [ ] Skeleton en CastList
- [ ] Skeleton en detalles de película/serie
- [ ] Skeleton en resultados de búsqueda

### Dropdowns Modernos (v0.4.0+)
- [ ] shadcn/ui DropdownMenu instalado
- [ ] shadcn/ui Select instalado
- [ ] Animaciones suaves de apertura/cierre
- [ ] Colores adaptativos al tema
- [ ] Soporte para iconos
- [ ] Accesibilidad (keyboard navigation)

### Tema Claro/Oscuro (v0.3.0+)
- [ ] ThemeContext implementado
- [ ] Toggle en Header
- [ ] Persistencia en localStorage
- [ ] Colores definidos para tema oscuro
- [ ] Colores definidos para tema claro
- [ ] Todos los componentes adaptativos
- [ ] Netflix Red (#E50914) como color primario en ambos temas

---

## Criterios de Finalización por Versión

### v0.5.0 (Layout)
- [ ] Dev server ejecutándose sin errores
- [ ] Navegación entre rutas funcionando
- [ ] Toggle de tema Claro/Oscuro visible y funcional
- [ ] Header con logo y navegación
- [ ] Footer con información

### v0.7.0 (Home)
- [ ] Home page muestra datos de TMDB
- [ ] Imágenes cargan correctamente
- [ ] HeroBanner muestra película destacada
- [ ] Múltiples rows con contenido
- [ ] Scroll horizontal en rows funcional

### v1.0.0 (Listados)
- [ ] MoviesPage muestra películas
- [ ] TVShowsPage muestra series
- [ ] Filtros comunes funcionales (Género, Año, Rating)
- [ ] Dropdowns modernos implementados
- [ ] Paginación funcional con dropdown
- [ ] Skeleton de carga en listados

### v2.0.0 (Release)
- [ ] Todas las páginas funcionales
- [ ] Todos los filtros implementados
- [ ] Paginación en todos los listados
- [ ] Skeletons en todos los componentes
- [ ] Temas Claro/Oscuro funcionando
- [ ] Sin errores en consola
- [ ] Build de producción exitoso

---

## Notas

- Los deadlines son aproximados y pueden ajustarse según el progreso
- Las versiones v0.x.0 son pre-releases (development)
- La versión v1.0.0 marca el MVP completo
- La versión v2.0.0 marca el release final de producción
- Todos los componentes deben soportar tema Claro/Oscuro
- Todos los componentes deben tener skeleton de carga
- Todos los listados deben tener filtros comunes y paginación
- Todos los dropdowns deben usar shadcn/ui componentes modernos
