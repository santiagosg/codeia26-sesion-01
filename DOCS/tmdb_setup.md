# TMDB Setup

Instrucciones para configurar y obtener acceso a la API de TMDB (The Movie Database).

---

## ¿Qué es TMDB?

TMDB (The Movie Database) es una base de datos comunitaria de películas y programas de televisión. Su API permite acceder a información detallada sobre:

- Películas y series de TV
- Personas (actores, directores, etc.)
- Géneros y clasificaciones
- Imágenes, posters y backdrops
- Trailers y videos
- Contenido en tendencia

---

## Paso 1: Crear una cuenta en TMDB

1. Ve a [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Completa el formulario de registro con tu información
3. Verifica tu cuenta a través del correo electrónico que recibirás
4. Inicia sesión en [https://www.themoviedb.org](https://www.themoviedb.org)

---

## Paso 2: Solicitar una API Key

1. Inicia sesión en tu cuenta de TMDB
2. Ve a tu perfil (clic en tu nombre de usuario)
3. Selecciona **Settings** > **API** desde el menú
4. En la sección "Developer", haz clic en **"Apply"** o **"Create a new key"**

---

## Paso 3: Completar el formulario de solicitud

La API Key de TMDB es gratuita pero requiere completar un formulario de solicitud:

### Campos requeridos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Application Name** | Nombre de tu aplicación | "Netflix Clone App" |
| **Application URL** | URL donde se usará la API | `http://localhost:3000` (dev) o tu dominio |
| **Application Summary** | Descripción corta de la app | "Aplicación que muestra catálogo de películas y series" |
| **Address** | Tu dirección física | [Tu dirección] |
| **Company** | Nombre de la compañía (opcional) | [Tu nombre/empresa] |

### Tips para la solicitud:

1. **Sé honesto**: TMDB revisa las solicitudes manualmente
2. **Usa una URL válida**: Si no tienes hosting, usa `http://localhost:3000`
3. **Describe el propósito**: Explica que es un proyecto educacional o personal
4. **Espera la aprobación**: Generalmente toma pocas horas, a veces hasta 24-48h

---

## Paso 4: Obtener tu API Key

Una vez aprobada tu solicitud:

1. Ve a **Settings** > **API**
2. En la sección "API Key (v3 auth)" encontrarás tu clave
3. Haz clic en **"click to reveal"** para ver tu API Key
4. Copia la clave (se verá algo como: `e9d8f7a6b5c4d3e2f1a0...`)

**IMPORTANTE:** Guarda tu API Key de forma segura. Nunca la compartas públicamente ni la subas a GitHub.

---

## Paso 5: Configurar las variables de entorno

En tu proyecto, crea un archivo `.env` en la raíz:

```bash
# Archivo: .env

# TMDB API Configuration
VITE_TMDB_API_KEY=e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**NOTAS:**

- Las variables para Vite deben comenzar con `VITE_` para estar disponibles en el cliente
- Reemplaza `e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4` con tu API Key real
- El archivo `.env` está en `.gitignore` por seguridad

---

## Paso 6: Archivo .env.example

Crea un archivo `.env.example` como plantilla (este SÍ se sube a Git):

```bash
# Archivo: .env.example

# TMDB API Configuration
# Obtén tu API Key en: https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

---

## Paso 7: Verificar la configuración

Para verificar que tu API Key funciona correctamente:

### Usando el navegador:

```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=es-ES&page=1
```

Deberías recibir una respuesta JSON con una lista de películas.

---

## Límites de la API (Rate Limits)

| Tipo de Plan | Límite |
|--------------|--------|
| Free | ~40 requests por 10 segundos |
| Standard | Contactar para límites |
| Enterprise | Contactar para límites |

---

## URLs Útiles

| Recurso | URL |
|---------|-----|
| Sitio oficial | https://www.themoviedb.org |
| Documentación API | https://developer.themoviedb.org |
| Aplicación API Key | https://www.themoviedb.org/settings/api |

---

## Seguridad

1. **NUNCA compartas tu API Key públicamente**
2. **NUNCA subas tu archivo `.env` a GitHub**
3. **Usa `.gitignore` para excluir archivos sensibles**
4. **Si tu key es comprometida, revócala en los settings de TMDB**
