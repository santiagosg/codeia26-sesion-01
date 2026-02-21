# Verflix

Una aplicación tipo Netflix que consume la API de TMDB (The Movie Database).

![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38BDF8?logo=tailwindcss&logoColor=white)

## Características

- **Catálogo completo** de películas y series de TV
- **Búsqueda** por películas, series y personas
- **Filtros** por popularidad, mejor valoradas y en cartelera
- **Detalles completos** incluyendo elenco, trailers y contenido similar
- **Modo oscuro/claro** con transiciones suaves
- **UI responsive** para dispositivos móviles y escritorio
- **Diseño tipo Netflix** con animaciones y hover effects

## Stack Tecnológico

| Tecnología | Versión |
|------------|---------|
| React | 19.2.0 |
| TypeScript | 5.2.2 |
| Vite | 5.0.8 |
| Tailwind CSS | 3.3.6 |
| shadcn/ui | latest |
| React Router DOM | 6.20.0 |
| Axios | 1.6.2 |
| Lucide React | 0.294.0 |

## Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar API Key de TMDB**

   - Ve a [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Crea una cuenta y obtén tu API Key
   - Copia la API Key y pégala en el archivo `.env`:
     ```bash
     VITE_TMDB_API_KEY=tu_api_key_aqui
     ```

   *Nota: El archivo `.env` ya contiene la estructura necesaria. Solo necesitas reemplazar `your_tmdb_api_key_here` con tu API Key real.*

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter |

## Estructura del Proyecto

```
verflix-app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components (Navbar)
│   │   ├── media/           # Media components (MediaCard, MediaRow, HeroBanner)
│   │   ├── detail/          # Detail components
│   │   ├── search/          # Search components
│   │   └── common/          # Common utility components
│   ├── pages/               # Páginas principales
│   ├── services/            # Capa de servicios
│   │   ├── api/             # Configuración API
│   │   └── tmdb/            # Servicios TMDB
│   ├── types/               # Definiciones TypeScript
│   ├── context/             # React Contexts
│   ├── hooks/               # Custom React Hooks
│   ├── utils/               # Utilidades y helpers
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Entry point
├── public/                  # Archivos estáticos
└── DOCS/                    # Documentación
```

## Páginas

| Ruta | Página |
|------|--------|
| `/` | Home principal con contenido en tendencia y destacados |
| `/movies` | Catálogo de películas con filtros |
| `/movies/:id` | Detalle de película |
| `/tv` | Catálogo de series con filtros |
| `/tv/:id` | Detalle de serie |
| `/search` | Página de búsqueda |

## Configuración de TMDB

Para usar la aplicación, necesitas una API Key de TMDB gratuita:

1. Ve a [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Completa el registro
3. Ve a Settings > API
4. Haz clic en "Create a new key"
5. Completa el formulario con los datos de tu aplicación
6. Copia la API Key generada

## Archivo .env

El archivo `.env` debe contener:

```bash
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## Notas Importantes

- **No compartas tu API Key** públicamente ni la subas a GitHub
- **Usa `--legacy-peer-deps`** al instalar dependencias si encuentras conflictos con React 19
- **El archivo `.env` está en `.gitignore`** por seguridad
- **Usa el archivo `.env.example`** como plantilla para tu configuración

## Licencia

Este proyecto es para fines educativos.

## Créditos

- [TMDB API](https://developer.themoviedb.org) - Datos de películas y series
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI base
- [Tailwind CSS](https://tailwindcss.com) - Framework de estilos
- [Lucide Icons](https://lucide.dev) - Iconos
