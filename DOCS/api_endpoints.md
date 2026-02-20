# API Endpoints TMDB

Documentación de los endpoints de TMDB utilizados en la aplicación Netflix-like.

Base URL: `https://api.themoviedb.org/3`

---

## Variables de Entorno

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_TMDB_API_KEY` | tu_api_key | Clave de API de TMDB (requerida) |
| `VITE_TMDB_BASE_URL` | `https://api.themoviedb.org/3` | URL base de la API |
| `VITE_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` | URL base para imágenes |

---

## Endpoints

### Discovery / Home

#### Trending
```
GET /trending/{media_type}/{time_window}
```

**Parámetros:**
- `media_type`: `all`, `movie`, `tv`, `person`
- `time_window`: `day`, `week`

**Respuesta:** Lista de contenido en tendencia

**Uso en la app:** Home page - Row destacado de tendencias

---

#### Películas Populares
```
GET /movie/popular
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de películas populares

**Uso en la app:** Home page - Row de películas populares

---

#### Películas Mejor Valoradas
```
GET /movie/top_rated
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de películas mejor valoradas

**Uso en la app:** Home page - Row de películas top rated

---

#### En Cartelera
```
GET /movie/now_playing
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Películas actualmente en cartelera

**Uso en la app:** Home page - Row de estrenos

---

#### Series Populares
```
GET /tv/popular
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de series populares

**Uso en la app:** Home page - Row de series populares

---

#### Series Mejor Valoradas
```
GET /tv/top_rated
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de series mejor valoradas

**Uso en la app:** Home page - Row de series top rated

---

### Detalle de Contenido

#### Detalle de Película
```
GET /movie/{movie_id}
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `append_to_response`: credits, similar, videos (para cargar en una llamada)

**Respuesta:** Detalles completos de la película

**Uso en la app:** Página de detalle de película

---

#### Detalle de Serie
```
GET /tv/{tv_id}
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `append_to_response`: credits, similar, videos (para cargar en una llamada)

**Respuesta:** Detalles completos de la serie

**Uso en la app:** Página de detalle de serie

---

#### Créditos de Película (Elenco)
```
GET /movie/{movie_id}/credits
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de cast y crew

**Uso en la app:** Página de detalle - Sección de elenco

---

#### Créditos de Serie (Elenco)
```
GET /tv/{tv_id}/credits
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de cast y crew

**Uso en la app:** Página de detalle - Sección de elenco

---

#### Películas Similares
```
GET /movie/{movie_id}/similar
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de películas similares

**Uso en la app:** Página de detalle - Sección de contenido similar

---

#### Series Similares
```
GET /tv/{tv_id}/similar
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Lista de series similares

**Uso en la app:** Página de detalle - Sección de contenido similar

---

#### Videos de Película (Trailers)
```
GET /movie/{movie_id}/videos
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de videos (trailers, teasers, clips)

**Uso en la app:** Página de detalle - Reproductor de trailers

---

#### Videos de Serie (Trailers)
```
GET /tv/{tv_id}/videos
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de videos (trailers, teasers, clips)

**Uso en la app:** Página de detalle - Reproductor de trailers

---

### Búsqueda

#### Búsqueda Global (Multi)
```
GET /search/multi
```

**Parámetros requeridos:**
- `query`: término de búsqueda

**Parámetros opcionales:**
- `include_adult`: true/false
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)

**Respuesta:** Resultados de películas, series y personas

**Uso en la app:** Página de búsqueda principal

---

#### Búsqueda de Películas
```
GET /search/movie
```

**Parámetros requeridos:**
- `query`: término de búsqueda

**Parámetros opcionales:**
- `include_adult`: true/false
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)
- `primary_release_year`: año de lanzamiento

**Respuesta:** Lista de películas que coinciden con la búsqueda

**Uso en la app:** Página de películas - Filtro de búsqueda

---

#### Búsqueda de Series
```
GET /search/tv
```

**Parámetros requeridos:**
- `query`: término de búsqueda

**Parámetros opcionales:**
- `include_adult`: true/false
- `language`: es-ES, en-US, etc.
- `page`: número de página (default: 1)
- `first_air_date_year`: año de estreno

**Respuesta:** Lista de series que coinciden con la búsqueda

**Uso en la app:** Página de series - Filtro de búsqueda

---

### Configuración

#### Configuración General
```
GET /configuration
```

**Respuesta:**
- `images.base_url`: URL base para imágenes
- `images.secure_base_url`: URL segura para imágenes
- `images.poster_sizes`: tamaños disponibles para posters
- `images.backdrop_sizes`: tamaños disponibles para backdrops
- `images.profile_sizes`: tamaños disponibles para perfiles

**Uso en la app:** Inicialización - Obtener URLs base de imágenes

---

#### Géneros de Películas
```
GET /genre/movie/list
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de géneros de películas

**Uso en la app:** Filtros por género, tags de géneros en detalle

---

#### Géneros de Series
```
GET /genre/tv/list
```

**Parámetros opcionales:**
- `language`: es-ES, en-US, etc.

**Respuesta:** Lista de géneros de series

**Uso en la app:** Filtros por género, tags de géneros en detalle

---

### Discover (Filtros Avanzados)

#### Descubrir Películas
```
GET /discover/movie
```

**Parámetros útiles:**
- `with_genres`: ID de género (separados por coma)
- `sort_by`: popularity.desc, vote_average.desc, release_date.desc, etc.
- `vote_average.gte`: valoración mínima (0-10)
- `release_date.gte`: fecha mínima (formato YYYY-MM-DD)
- `release_date.lte`: fecha máxima (formato YYYY-MM-DD)
- `with_original_language`: código de idioma (es, en, etc.)
- `page`: número de página

**Respuesta:** Lista de películas filtradas

**Uso en la app:** Página de películas con filtros

---

#### Descubrir Series
```
GET /discover/tv
```

**Parámetros útiles:**
- `with_genres`: ID de género (separados por coma)
- `sort_by`: popularity.desc, vote_average.desc, first_air_date.desc, etc.
- `vote_average.gte`: valoración mínima (0-10)
- `first_air_date.gte`: fecha mínima (formato YYYY-MM-DD)
- `first_air_date.lte`: fecha máxima (formato YYYY-MM-DD)
- `with_original_language`: código de idioma (es, en, etc.)
- `page`: número de página

**Respuesta:** Lista de series filtradas

**Uso en la app:** Página de series con filtros

---

## Sizes de Imágenes

### Poster Sizes
- `w92`: 92px ancho
- `w154`: 154px ancho
- `w185`: 185px ancho (común para cards)
- `w342`: 342px ancho
- `w500`: 500px ancho
- `w780`: 780px ancho
- `original`: tamaño original

### Backdrop Sizes
- `w300`: 300px ancho
- `w780`: 780px ancho (común para hero banner)
- `w1280`: 1280px ancho
- `original`: tamaño original

### Profile Sizes
- `w45`: 45px ancho
- `w185`: 185px ancho
- `h632`: 632px alto
- `original`: tamaño original

---

## IDs de Géneros Comunes

### Películas
| ID | Nombre |
|----|--------|
| 28 | Acción |
| 12 | Aventura |
| 16 | Animación |
| 35 | Comedia |
| 80 | Crimen |
| 99 | Documental |
| 18 | Drama |
| 10751 | Familia |
| 14 | Fantasía |
| 36 | Historia |
| 27 | Horror |
| 10402 | Música |
| 9648 | Misterio |
| 10749 | Romance |
| 878 | Ciencia Ficción |
| 10770 | Telefilme |
| 53 | Thriller |
| 10752 | Bélica |
| 37 | Western |

### Series
| ID | Nombre |
|----|--------|
| 10759 | Acción y Aventura |
| 16 | Animación |
| 35 | Comedia |
| 80 | Crimen |
| 99 | Documental |
| 18 | Drama |
| 10751 | Familia |
| 10762 | Infantil |
| 9648 | Misterio |
| 10763 | Noticias |
| 10764 | Reality |
| 10765 | Sci-Fi y Fantasía |
| 10766 | Soap |
| 10767 | Talk |
| 10768 | Guerra y Política |
| 37 | Western |

---

## Ejemplos de URLs

Con API Key:
```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=es-ES&page=1
```

Con Header Authorization:
```
GET https://api.themoviedb.org/3/movie/popular
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Imagen de poster:
```
https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg
```

Imagen de backdrop:
```
https://image.tmdb.org/t/p/w780/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg
```

---

## Códigos de Estado HTTP

| Código | Significado | Acción |
|--------|-------------|--------|
| 200 | OK | Respuesta exitosa |
| 401 | Unauthorized | API Key inválida o expirada |
| 404 | Not Found | Recurso no encontrado (ID inválido) |
| 429 | Too Many Requests | Límite de rate excedido |
| 500 | Server Error | Error interno del servidor |

---

## Referencias

- Documentación oficial: https://developer.themoviedb.org/reference/intro/getting-started
- Obtener API Key: https://www.themoviedb.org/settings/api
- Pruebas en línea: https://developer.themoviedb.org/reference
