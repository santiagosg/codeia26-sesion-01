# Data Model

Entidades principales, ejemplos y reglas de transformación de TMDB API.

---

## Entidades Principales

### Movie (Película)

```typescript
interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
```

### TVShow (Serie)

```typescript
interface TVShow {
  id: number;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}
```

### MovieDetails (Detalle de Película)

```typescript
interface MovieDetails extends Movie {
  belongs_to_collection: boolean;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  credits?: Credits;
  videos?: VideoResults;
  similar?: MovieListResponse;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
```

### TVShowDetails (Detalle de Serie)

```typescript
interface TVShowDetails extends TVShow {
  created_by: { id: string; name: string; profile_path: string };
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits?: Credits;
  videos?: VideoResults;
  similar?: TVShowListResponse;
}

interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
```

### Person (Persona)

```typescript
interface Person {
  id: number;
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number; // 1 = mujer, 2 = hombre
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  known_for: string;
  name: string;
  place_of_birth: string;
  profile_path: string | null;
  popularity: number;
  profile_path: string | null;
}
```

### Cast y Crew (Elenco)

```typescript
interface Cast extends Person {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number; // Orden en el elenco
}

interface Crew extends Person {
  credit_id: string;
  department: string; // Dirección (ej: Directing, Writing, etc.)
  job: string;
}

interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
```

### Genre (Género)

```typescript
interface Genre {
  id: number;
  name: string;
}
```

### Video (Trailer)

```typescript
interface Video {
  id: string;
  iso_639_1: string;
  iso_639_2: string;
  key: string; // YouTube video key
  name: string;
  site: string; // 'YouTube', 'Vimeo', etc.
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
  official: boolean;
  published_at: string;
  size: number;
}
```

### VideoResults (Lista de Videos)

```typescript
interface VideoResults {
  id: number;
  results: Video[];
}
```

### SearchFilters (Filtros de Búsqueda)

```typescript
interface SearchFilters {
  query?: string;
  media_type?: 'all' | 'movie' | 'tv';
  genres?: number[];
  year?: number;
  rating?: number;
  page?: number;
}
```

### SearchResults (Resultados de Búsqueda)

```typescript
interface SearchResult extends Partial<Movie | TVShow> {
  media_type: 'movie' | 'tv' | 'person';
  profile_path: string | null; // para personas
}
```

---

## Transformaciones de Datos

### TMDB API → Entidades Locales

```typescript
// Transformar respuesta de TMDB a entidades locales
function mapMovie(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
    // ... restantes campos
  };
}

// Usar en servicios
const movies = await tmdbClient.get<TMDBMovie[]>('/movie/popular');
const localMovies = movies.results.map(mapMovie);
```

### Formateo de Fechas

```typescript
// Formatear fecha de TMDB (YYYY-MM-DD) a formato local
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Ejemplo: "2024-01-15" → "15 de enero de 2024"
```

### Formateo de Duración

```typescript
// Convertir runtime (minutos) a formato legible
function formatRuntime(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
  return `${minutes}min`;
}

// Ejemplos: 125 → "2h 5min", 90 → "1h 30min", 45 → "45min"
```

### Formateo de Rating

```typescript
// Formatear rating como estrellas
function formatRating(rating: number): string {
  const stars = Math.round(rating / 2);
  const emptyStars = 5 - stars;
  return '★'.repeat(stars) + '☆'.repeat(emptyStars);
}

// Ejemplo: 8.5 → "★★★★☆", 7.2 → "★★★☆☆", 6.8 → "★★★☆☆"
```

### Construir URL de Imagen

```typescript
// Construir URL completa de imagen usando config
function getImageUrl(
  imagePath: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
): string {
  if (!imagePath) return '';
  return `${imageBaseUrl}${size}${imagePath}`;
}

// Ejemplos:
getImageUrl('/abc123.jpg', 'w500')  → "https://image.tmdb.org/t/p/w500/abc123.jpg"
getImageUrl('/xyz789.jpg', 'original')  → "https://image.tmdb.org/t/p/original/xyz789.jpg"
```

---

## Reglas de Transformación

1. **Validación**: Siempre validar que los datos existan antes de usarlos
2. **Null Safety**: Verificar si `poster_path`, `backdrop_path` son null antes de construir URLs
3. **Default Values**: Proporcionar valores por defecto para datos faltantes
4. **Separación de Responsabilidades**: Separar lógica de datos de la lógica de UI
5. **Immutabilidad**: No mutar los datos recibidos de la API

---

## Referencias

- [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started)
- [Types TypeScript](https://www.typescriptlang.org)
