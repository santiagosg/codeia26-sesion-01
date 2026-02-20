# Plan de Commits

Estrategia y ejemplos de commits para el proyecto Netflix-like con TMDB API.

---

## Principios de Commits

1. **Atomic Commits** - Cada commit debe hacer una sola cosa lógica
2. **Conventional Commits** - Seguir formato `type(scope): description`
3. **Commits Pequeños y Frecuentes** - Dividir el trabajo en commits pequeños
4. **Commits Descriptivos** - El mensaje de commit debe describir claramente qué hace
5. **No Commits Masivos** - Evitar commits grandes con muchos cambios mezclados

---

## Tipos de Commits

| Tipo | Prefijo | Descripción |
|-------|----------|-------------|
| `feat` | ✨ | Nueva funcionalidad |
| `fix` | 🐛 | Corrección de bug |
| `docs` | 📝 | Actualización de documentación |
| `style` | 💄 | Cambios de formato/estilos |
| `refactor` | ♻️ | Refactorización de código |
| `test` | ✅ | Añadir o actualizar tests |
| `chore` | 🔧 | Cambios en configuración o herramientas |
| `build` | 📦 | Cambios en build system |
| `ci` | 👷 | Cambios en CI/CD |

---

## Formato de Commit Message

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Componentes

- **type**: Tipo de commit (feat, fix, docs, etc.)
- **scope**: Área afectada (opcional)
- **subject**: Descripción corta (50 caracteres max)
- **body**: Descripción detallada (opcional)

---

## Convenciones de Scope

| Scope | Descripción |
|--------|-------------|
| `docs` | Documentación (archivos en DOCS/) |
| `ui` | Componentes UI (src/components/) |
| `services` | Servicios (src/services/) |
| `types` | Tipos/interfaces (src/types/) |
| `context` | Contexts de estado (src/context/) |
| `hooks` | Custom hooks (src/hooks/) |
| `utils` | Utilidades (src/utils/) |
| `styles` | Estilos globales (src/styles/) |
| `config` | Configuración (vite.config, tailwind.config, etc.) |
| `tests` | Tests (si aplica) |

---

## Ejemplos de Commits

### Ejemplo 1: Nueva Funcionalidad (Feature)

```
feat(ui): agregar MediaCard component con hover effect

- Agregar componente MediaCard en src/components/media/
- Implementar poster con hover scale effect
- Añadir rating con estrellas
- Incluir skeleton de carga
```

### Ejemplo 2: Corrección de Bug (Fix)

```
fix(services): corregir error en movieService.ts al cargar películas

- Corregir error 404 cuando el ID de película no existe
- Manejar mejor el error en el catch
- Actualizar tests relacionados
```

### Ejemplo 3: Documentación (Docs)

```
docs(api_endpoints): documentar endpoints de TMDB

- Agregar todos los endpoints de TMDB API
- Documentar parámetros y respuestas esperadas
- Incluir ejemplos de uso
- Referencias a documentación oficial de TMDB
```

### Ejemplo 4: Refactorización (Refactor)

```
refactor(ui): simplificar Header component

- Extraer lógica de navegación a un hook custom
- Simplificar renderizado del header
- Mejorar separación de responsabilidades
```

### Ejemplo 5: Configuración (Chore)

```
chore: actualizar package.json con nuevas dependencias

- Añadir dependencia: lucide-react
- Actualizar versión de react-router-dom a v6.20.0
- Actualizar scripts de npm
```

### Ejemplo 6: Múltiples Cambios Relacionados

```
feat(services): agregar servicio de configuración de TMDB

services(tmdb): implementar genreService y configService

- Crear configService.ts para obtener configuración de imágenes
- Crear genreService.ts para obtener lista de géneros
- Añadir tipos en src/types/tmdb/
- Actualizar AppContext para cachear géneros y config
```

---

## Flujo de Trabajo por Versión (Ejemplo)

### v0.1.0 - Infraestructura de Datos

```bash
# Commit 1
feat(types): crear tipos base de TMDB

- Crear archivos en src/types/tmdb/
- Definir interfaces para Movie, TVShow, Person, etc.

# Commit 2
feat(services): implementar servicios API base

- Crear axiosConfig.ts con configuración de axios
- Crear tmdbClient.ts como cliente principal
- Crear endpoints.ts con definición de URLs

# Commit 3
feat(services): implementar servicios TMDB

- Crear movieService.ts con métodos para películas
- Crear tvService.ts con métodos para series
- Crear searchService.ts para búsquedas
- Crear genreService.ts y configService.ts

# Commit 4
feat(utils): implementar utilidades base

- Crear formatters.ts para fechas y números
- Crear constants.ts para constantes de la app
- Crear imageHelpers.ts para helpers de imágenes

# Tag
git tag v0.1.0
```

### v0.2.0 - Contextos y Hooks

```bash
# Commit 1
feat(context): implementar AppContext

- Crear AppContext.tsx para configuración global
- Cachear configuración de TMDB y URLs de imágenes
- Proveer a toda la aplicación

# Commit 2
feat(context): implementar ThemeContext

- Crear ThemeContext.tsx para toggle de tema Claro/Oscuro
- Definir colores para ambos temas
- Persistir en localStorage

# Commit 3
feat(hooks): crear hooks custom base

- Crear useTMDB.ts como hook genérico para llamadas API
- Crear useDebounce.ts para debounce en búsquedas
- Crear useLocalStorage.ts para persistencia
```

### v1.0.0 - MVP

```bash
# Commit 1
feat(ui): instalar componentes shadcn/ui

- Ejecutar npx shadcn-ui@latest init
- Instalar componentes: button, card, input, select, dialog, etc.

# Commit 2
feat(ui): implementar componentes comunes

- Crear LoadingSpinner.tsx
- Crear ErrorMessage.tsx
- Crear ErrorBoundary.tsx (Class Component)

# Commit 3
feat(ui): implementar layout components

- Crear Header.tsx con navegación y toggle de tema
- Crear Footer.tsx
- Crear MainLayout.tsx como wrapper

# Commit 4
feat(ui): implementar media components

- Crear MediaCard.tsx con hover effect
- Crear MediaRow.tsx con scroll horizontal
- Crear MediaGrid.tsx responsivo
- Crear HeroBanner.tsx destacado

# Commit 5
feat(ui): implementar search components

- Crear SearchBar.tsx con debounce
- Crear SearchFilter.tsx con dropdowns
- Crear SearchResults.tsx

# Commit 6
feat(ui): implementar detail components

- Crear CastList.tsx con grid de actores
- Crear GenreTags.tsx clickeables
- Crear SimilarMedia.tsx con grid
- Crear VideoPlayer.tsx con dropdown de trailers

# Commit 7
feat(pages): implementar HomePage (Class Component)

- Crear HomePage.tsx
- Cargar datos de TMDB en componentDidMount
- Renderizar HeroBanner y múltiples MediaRows
- Integrar con servicios de TMDB

# Commit 8
feat(pages): implementar páginas de listado (Class Components)

- Crear MoviesPage.tsx con tabs y filtros
- Crear TVShowsPage.tsx con tabs y filtros
- Implementar paginación con dropdown moderno
- Implementar filtros comunes (género, año, rating)

# Commit 9
feat(pages): implementar página de búsqueda (Class Component)

- Crear SearchPage.tsx
- Integrar SearchBar y SearchFilter
- Implementar resultados con paginación

# Commit 10
feat(pages): implementar páginas de detalle (Class Components)

- Crear MovieDetailPage.tsx
- Crear TVDetailPage.tsx
- Integrar componentes de detalle
- Cargar credits, similar y videos en paralelo

# Commit 11
docs(changelog): actualizar roadmap y versiones

- Documentar todas las versiones y sus entregables
- Referenciar a ui_kit.md para especificación de temas
- Actualizar criterios de finalización

# Commit 12
docs(ui_kit): crear documentación de UI Kit

- Documentar sistema de colores y temas
- Documentar componentes shadcn/ui
- Documentar componentes custom con props y características
- Incluir ejemplos de uso

# Tag
git tag v1.0.0
```

---

## Creación de Releases

### Para crear un release:

```bash
# 1. Actualizar versión en package.json
npm version minor

# 2. Commit con el changelog
git add .
git commit -m "docs: actualizar changelog para v1.0.0"

# 3. Crear el tag
git tag -a v1.0.0 -m "Release v1.0.0 - MVP"

# 4. Push a remoto
git push origin main --tags
```

---

## Notas

- Los commits deben ser atómicos y describir claramente qué hacen
- Los scopes ayudan a filtrar cambios por área del proyecto
- Los tipos de commits deben ir precedidos de emoji para mejor legibilidad
- Mantener los mensajes de commit en español (consistente con el código)

---

## Referencias

- [Changelog](changelog.md) - Plan de versiones y roadmap
- [Versionado](versionado_release.md) - Políticas de Semver y release
