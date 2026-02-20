# Arquitectura del Proyecto

Documentación de la arquitectura de la aplicación Netflix-like que consume TMDB API.

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.2.0 | Framework UI |
| TypeScript | 5.2.2 | Tipado estático |
| Vite | 5.0.8 | Build tool y dev server |
| Tailwind CSS | 3.3.6 | Framework de estilos |
| shadcn/ui | latest | Componentes UI base |
| React Router DOM | 6.20.0 | Enrutamiento |
| Axios | 1.6.2 | Cliente HTTP |
| Lucide React | 0.294.0 | Iconos |
| clsx | 2.0.0 | Utilidad de clases CSS |
| tailwind-merge | 2.1.0 | Merge de estilos Tailwind |

---

## Estructura de Carpetas

```
codeia26-sesion-01/
├── src/
│   ├── components/              # Componentes React
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   ├── media/               # Media-related components
│   │   ├── detail/              # Detail page components
│   │   ├── search/              # Search components
│   │   └── common/              # Common utility components
│   ├── pages/                   # Páginas principales (Class Components)
│   ├── services/                # Capa de servicios
│   │   ├── api/                 # Configuración API
│   │   └── tmdb/                # Servicios TMDB
│   ├── types/                   # Definiciones TypeScript
│   ├── context/                 # React Contexts
│   ├── hooks/                   # Custom React Hooks
│   ├── utils/                   # Utilidades y helpers
│   ├── styles/                  # Estilos globales
│   ├── App.tsx                  # Componente principal
│   └── main.tsx                 # Entry point
├── public/                      # Archivos estáticos
├── DOCS/                        # Documentación
└── Archivos de configuración
```

---

## Patrón Arquitectónico: Capas en Capa (Layered Architecture)

```
┌─────────────────────────────────────────────────────┐
│              PRESENTATION LAYER                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Pages (Class Components)                       │ │
│  │  - HomePage, MovieDetailPage, TVDetailPage     │ │
│  │  - SearchPage, MoviesPage, TVShowsPage         │ │
│  └─────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Components (Functional)                       │ │
│  │  - Layout, Media, Detail, Search, Common        │ │
│  │  - shadcn/ui components                         │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│             BUSINESS LOGIC LAYER                    │
│  ┌─────────────────────────────────────────────────┐ │
│  │  React Contexts                                  │ │
│  │  - AppContext, ThemeContext, FavoritesContext   │ │
│  └─────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Custom Hooks                                   │ │
│  │  - useTMDB, useSearch, useDebounce              │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                 SERVICE LAYER                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │  TMDB Services                                   │ │
│  │  - movieService, tvService, searchService        │ │
│  │  - genreService, configService                  │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│               DATA ACCESS LAYER                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │  API Client                                      │ │
│  │  - axiosConfig, tmdbClient, endpoints           │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                 EXTERNAL API                         │
│                    TMDB API                          │
└─────────────────────────────────────────────────────┘
```

---

## State Management

Enfoque híbrido para gestionar el estado de la aplicación:

### Estado Global (React Context)

**AppContext:**
- Configuración global de TMDB
- URL base de imágenes
- Lista de géneros (caché)
- Estado de carga inicial

**ThemeContext:**
- Tema actual (light/dark)
- Función toggleTheme()

**FavoritesContext (opcional):**
- Lista de favoritos
- Funciones add/remove/isFavorite

### Estado Local

- **Pages (Class Components):** `this.state` para datos específicos
- **Functional Components:** `useState` para estados simples

---

## Routing

React Router DOM v6 define las rutas:

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `HomePage` | Home principal |
| `/movies` | `MoviesPage` | Catálogo de películas |
| `/movies/:id` | `MovieDetailPage` | Detalle de película |
| `/tv` | `TVShowsPage` | Catálogo de series |
| `/tv/:id` | `TVDetailPage` | Detalle de serie |
| `/search` | `SearchPage` | Página de búsqueda |

---

## Convenciones de Código

### Nomenclatura

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes | PascalCase | `HomePage.tsx` |
| Hooks | camelCase + 'use' | `useTMDB.ts` |
| Servicios | camelCase | `movieService.ts` |
| Tipos/Interfaces | PascalCase | `Movie`, `MovieDetails` |
| Constantes | UPPER_SNAKE_CASE | `API_BASE_URL` |

---

## Referencias

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TMDB API Documentation](https://developer.themoviedb.org)

---

## Documentación Relacionada

- [API Endpoints TMDB](api_endpoints.md) - Documentación de endpoints de TMDB API
- [UI Kit](ui_kit.md) - Componentes, estilos, temas, filtros, paginación
- [TMDB Setup](tmdb_setup.md) - Configuración de TMDB API
- [Dependencias](dependencias.md) - Lista de dependencias del proyecto
- [Changelog](changelog.md) - Roadmap y versiones
