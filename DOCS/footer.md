# Footer Design

Documentación del diseño y estructura del footer para Verflix, una plataforma de streaming tipo Netflix.

---

## Tabla de Contenidos

- [Estructura del Footer](#estructura-del-footer)
- [Wireframe ASCII](#wireframe-ascii)
- [Secciones del Footer](#secciones-del-footer)
  - [Logo y Marca](#logo-y-marca)
  - [Tipos de Contenido](#tipos-de-contenido)
  - [Categorías por Tipo](#categorías-por-tipo)
  - [Enlaces Legales](#enlaces-legales)
- [Tokens de Diseño](#tokens-de-diseño)
- [Comportamiento Responsivo](#comportamiento-responsivo)
- [Accesibilidad](#accesibilidad)
- [Implementación Técnica](#implementación-técnica)

---

## Estructura del Footer

El footer de Verflix está diseñado para proporcionar acceso rápido al catálogo de contenido y cumplir con los requisitos legales esenciales de una plataforma de streaming.

### Columnas del Footer

| Columna | Contenido | Enlaces |
|---------|----------|---------|
| **Logo/Brand** | Logo "V" + texto "Verflix" | Enlace a `/` (Inicio) |
| **Contenido** | Tipos de contenido principales | Películas, Series |
| **Categorías Películas** | Géneros de películas | Acción, Comedia, Drama, etc. |
| **Categorías Series** | Géneros de series | Acción y aventura, Animación, etc. |
| **Legal** | Enlaces legales obligatorios | Aviso legal, Privacidad, Cookies, etc. |

---

## Wireframe ASCII

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [Contenido principal de la página...]                                       │
│                                                                              │
│                                                                              │
┌──────────────────────────────────────────────────────────────────────────────┐│
│  ┌────────────────────────────────────────────────────────────────────────┐  ││
│  │  ┌────────┐  ┌──────────────┐  ┌──────────────────┐  ┌──────────┐ │  ││
│  │  │   V    │  │  Películas   │  │  Géneros Cine   │  │  Legal   │ │  ││  ← Footer Desktop
│  │  │Verflix │  │              │  │                  │  │          │ │  ││    (4 columnas)
│  │  │        │  │  • Populares │  │  • Acción       │  │  Aviso   │ │  ││
│  │  │        │  │  • Mejor     │  │  • Comedia      │  │  legal   │ │  ││
│  │  │        │  │    valoradas │  │  • Drama        │  │          │ │  ││
│  │  │        │  │  • En        │  │  • Fantasía     │  │  Política│ │  ││
│  │  │        │  │    cartelera  │  │  • Sci-Fi      │  │  de      │ │  ││
│  │  │        │  │              │  │  • Terror       │  │  privacidad│  ││
│  │  │        │  │  ┌────────┐  │  │  • Misterio     │  │          │ │  ││
│  │  │        │  │  │ Series │  │  │  • Romance      │  │  Cookies │ │  ││
│  │  │        │  │  │        │  │  │                │  │          │ │  ││
│  │  │        │  │  │• Populares│ │  │  ┌──────────┐  │  │          │ │  ││
│  │  │        │  │  │• Mejor    │ │  │  │ Series   │  │  │  Contacto│  ││
│  │  │        │  │  │  valoradas│ │  │  │          │  │  │          │ │  ││
│  │  │        │  │  │          │  │  │  │• Acción  │  │  │          │ │  ││
│  │  │        │  │  │          │  │  │  │  y       │  │  └──────────┘  │  ││
│  │  │        │  │  │          │  │  │  │  aventura│  │                │  ││
│  │  │        │  │  │          │  │  │  │• Animación│  │  © 2026 Verflix│  ││
│  │  │        │  │  │          │  │  │  │• Drama   │  │  Todos los     │  ││
│  │  │        │  │  └────────┘  │  │  │• Kids    │  │  derechos      │  ││
│  │  └────────┘  └──────────────┘  │  │• Reality  │  │  reservados    │  ││
│  │                                   │  └──────────┘  │                │  ││
│  │                                   └──────────────────┘                │  ││
│  └────────────────────────────────────────────────────────────────────────┘  ││
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐│
│  ┌────────────────────────────────────────────────────────────────────────┐  ││
│  │  ┌────────┐                                                           │  ││
│  │  │   V    │  V                          [Expand ▼]                   │  ││  ← Footer Mobile
│  │  │Verflix │  Series                         [Expand ▼]               │  ││    (Accordion)
│  │  │        │  Legal                          [Expand ▼]               │  ││
│  │  │        │                                                           │  ││
│  │  └────────┘                                                           │  ││
│  │                                                                       │  ││
│  │                        © 2026 Verflix                                  │  ││
│  │                     Todos los derechos reservados                        │  ││
│  └────────────────────────────────────────────────────────────────────────┘  ││
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Secciones del Footer

### Logo y Marca

| Elemento | Descripción | Ruta |
|----------|-------------|------|
| **Logo** | Imagen "V" con fondo transparente | `/logo.png` |
| **Texto** | "Verflix" en tipografía del brand | Link a `/` |
| **Hover** | Efecto `opacity-90` con transición | `duration-200` |

**Especificaciones:**
- Logo: 32px × 32px (tamaño footer)
- Texto: `text-netflix-red` o `text-white` (según tema)
- Link: `to="/"` con `aria-label="Ir al inicio"`

---

### Tipos de Contenido

Enlace directo a las páginas principales de contenido.

| Título | Enlace | Ruta |
|--------|--------|------|
| **Películas** | Ver catálogo de películas | `/movies` |
| **Populares** | Películas populares | `/movies?filter=popular` |
| **Mejor valoradas** | Top películas por rating | `/movies?filter=top_rated` |
| **En cartelera** | Películas actualmente en cartelera | `/movies?filter=now_playing` |

| Título | Enlace | Ruta |
|--------|--------|------|
| **Series** | Ver catálogo de series | `/tv` |
| **Populares** | Series populares | `/tv?filter=popular` |
| **Mejor valoradas** | Top series por rating | `/tv?filter=top_rated` |

---

### Categorías por Tipo

#### Categorías de Películas

Géneros disponibles en TMDB para películas:

| ID | Género | Español |
|----|---------|---------|
| 28 | Action | Acción |
| 12 | Adventure | Aventura |
| 16 | Animation | Animación |
| 35 | Comedy | Comedia |
| 80 | Crime | Crimen |
| 99 | Documentary | Documental |
| 18 | Drama | Drama |
| 10751 | Family | Familia |
| 14 | Fantasy | Fantasía |
| 36 | History | Historia |
| 27 | Horror | Horror/Terror |
| 10402 | Music | Música |
| 9648 | Mystery | Misterio |
| 10749 | Romance | Romance |
| 878 | Science Fiction | Ciencia ficción |
| 10770 | TV Movie | Telefilm |
| 53 | Thriller | Suspense |
| 10752 | War | Bélica |
| 37 | Western | Western |

**Estructura de enlaces:** `/movies?genre={id}`

#### Categorías de Series

Géneros disponibles en TMDB para series de TV:

| ID | Género | Español |
|----|---------|---------|
| 10759 | Action & Adventure | Acción y aventura |
| 16 | Animation | Animación |
| 35 | Comedy | Comedia |
| 80 | Crime | Crimen |
| 99 | Documentary | Documental |
| 18 | Drama | Drama |
| 10751 | Family | Familia |
| 10762 | Kids | Niños |
| 9648 | Mystery | Misterio |
| 10763 | News | Noticias |
| 10764 | Reality | Reality |
| 10765 | Sci-Fi & Fantasy | Fantasía y ciencia ficción |
| 10766 | Soap | Soap |
| 10767 | Talk | Talk |
| 10768 | War & Politics | Guerra y política |
| 37 | Western | Western |

**Estructura de enlaces:** `/tv?genre={id}`

---

### Enlaces Legales

Enlaces obligatorios según estudios de legalidad para plataformas de streaming en España/UE:

| Título | Descripción | Ruta | Atributos |
|--------|-------------|------|-----------|
| **Aviso Legal** | Información legal del sitio | `/legal/aviso` | `rel="nofollow"` |
| **Política de Privacidad** | Uso de datos personales | `/legal/privacidad` | `rel="nofollow"` |
| **Política de Cookies** | Uso de cookies | `/legal/cookies` | `rel="nofollow"` |
| **Términos y Condiciones** | Términos de uso del servicio | `/legal/terminos` | `rel="nofollow"` |
| **Contacto** | Información de contacto | `/legal/contacto` | `rel="nofollow"` |
| **Preferencias de Cookies** | Configuración de cookies | `/legal/cookies-preferencias` | `rel="nofollow"` |

> **Nota:** Las páginas legales deben crearse en el futuro. Estas rutas son propuestas para implementación.

---

## Tokens de Diseño

### Colores (Tema Oscuro - Default)

| Token | Valor | Uso |
|-------|-------|-----|
| `footer-bg` | `#141414` | Background del footer |
| `footer-border` | `#2F2F2F` | Borde superior del footer |
| `footer-link` | `#B3B3B3` | Links inactivos |
| `footer-link-hover` | `#FFFFFF` | Links en hover |
| `footer-copyright` | `#808080` | Texto de copyright |

### Colores (Tema Claro)

| Token | Valor | Uso |
|-------|-------|-----|
| `footer-bg` | `#F5F5F5` | Background del footer |
| `footer-border` | `#E5E5E5` | Borde superior del footer |
| `footer-link` | `#666666` | Links inactivos |
| `footer-link-hover` | `#141414` | Links en hover |
| `footer-copyright` | `#999999` | Texto de copyright |

### Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `footer-padding-x` | `24px` (desktop) / `16px` (mobile) | Padding horizontal |
| `footer-padding-y` | `48px` (desktop) / `24px` (mobile) | Padding vertical |
| `footer-column-gap` | `32px` | Espacio entre columnas |
| `footer-link-gap` | `12px` | Espacio entre links |

### Tipografía

| Token | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| `footer-heading` | `14px` | `600` | Títulos de columnas |
| `footer-link` | `13px` | `400` | Links del footer |
| `footer-copyright` | `12px` | `400` | Texto de copyright |

### Transiciones

| Token | Duración | Curva | Uso |
|-------|----------|-------|-----|
| `footer-hover` | `200ms` | `ease-out` | Hover de links |

---

## Comportamiento Responsivo

### Breakpoints

| Breakpoint | Layout | Columnas |
|------------|--------|----------|
| **Mobile** (< 640px) | Accordion vertical | 1 columna expandida |
| **Tablet** (640px - 1024px) | Grid compacto | 2 columnas |
| **Desktop** (≥ 1024px) | Grid completo | 4-5 columnas |

### Mobile (Accordion)

```tsx
// Estado: Cada sección es un accordion expandible
<div className="space-y-4">
  <AccordionItem value="content">
    <AccordionTrigger>Contenido</AccordionTrigger>
    <AccordionContent>
      <ul className="space-y-2">
        <li><Link to="/movies">Películas</Link></li>
        <li><Link to="/tv">Series</Link></li>
      </ul>
    </AccordionContent>
  </AccordionItem>
</div>
```

### Tablet (2 Columnas)

```tsx
// Layout: Grid de 2 columnas
<div className="grid grid-cols-2 gap-8">
  <FooterColumn title="Contenido" links={contentLinks} />
  <FooterColumn title="Categorías" links={categoryLinks} />
</div>
```

### Desktop (4-5 Columnas)

```tsx
// Layout: Grid de 4-5 columnas
<div className="grid grid-cols-4 lg:grid-cols-5 gap-8">
  <FooterLogo />
  <FooterColumn title="Películas" links={movieLinks} />
  <FooterColumn title="Series" links={tvLinks} />
  <FooterColumn title="Categorías" links={genreLinks} />
  <FooterColumn title="Legal" links={legalLinks} />
</div>
```

---

## Accesibilidad

### Requisitos WCAG 2.1 AA

| Elemento | Requisito | Implementación |
|----------|-----------|----------------|
| **Logo link** | `aria-label` descriptivo | `<a href="/" aria-label="Verflix - Ir al inicio">` |
| **Links de footer** | `rel="nofollow"` en legales | `rel="nofollow"` en links legales |
| **Contraste** | 4.5:1 mínimo | Texto links: `#B3B3B3` on `#141414` = 4.6:1 ✅ |
| **Focus visible** | Focus ring de 2px mínimo | `focus-visible:ring-2 focus-visible:ring-white` |
| **Touch targets** | 44×44px mínimo | Padding en links para cumplir |
| **Heading structure** | H3 para columnas | Cada columna tiene `h3` con título |

### ARIA Roles

```tsx
<footer role="contentinfo" aria-label="Pie de página">
  <nav aria-label="Enlaces de contenido">
    <h3>Contenido</h3>
    <ul role="list">
      <li><Link to="/movies">Películas</Link></li>
    </ul>
  </nav>
</footer>
```

### Navegación por Teclado

| Tecla | Acción |
|-------|--------|
| **Tab** | Navegar entre links en orden |
| **Shift+Tab** | Navegar hacia atrás |
| **Enter/Space** | Activar link seleccionado |
| **Home/End** | Ir al primer/último link del footer |

---

## Implementación Técnica

### Componente Footer

**Ubicación:** `src/components/layout/Footer.tsx`

```tsx
import { Link } from 'react-router-dom';
import { Film, Tv, Scale, Shield, Cookie } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-footer-border bg-footer-bg text-footer-link">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Verflix - Ir al inicio">
              <img src="/logo.png" alt="V" className="h-8 w-auto" />
              <span className="text-xl font-bold text-netflix-red">Verflix</span>
            </Link>
          </div>

          {/* Películas */}
          <FooterColumn
            title="Películas"
            icon={<Film className="h-4 w-4" />}
            links={[
              { label: 'Populares', href: '/movies?filter=popular' },
              { label: 'Mejor valoradas', href: '/movies?filter=top_rated' },
              { label: 'En cartelera', href: '/movies?filter=now_playing' },
            ]}
          />

          {/* Series */}
          <FooterColumn
            title="Series"
            icon={<Tv className="h-4 w-4" />}
            links={[
              { label: 'Populares', href: '/tv?filter=popular' },
              { label: 'Mejor valoradas', href: '/tv?filter=top_rated' },
            ]}
          />

          {/* Categorías */}
          <FooterColumn
            title="Categorías"
            links={[
              { label: 'Acción', href: '/movies?genre=28' },
              { label: 'Comedia', href: '/movies?genre=35' },
              { label: 'Drama', href: '/movies?genre=18' },
              { label: 'Fantasía', href: '/movies?genre=14' },
              { label: 'Ciencia ficción', href: '/movies?genre=878' },
              { label: 'Terror', href: '/movies?genre=27' },
            ]}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            links={[
              { label: 'Aviso legal', href: '/legal/aviso', rel: 'nofollow' },
              { label: 'Política de privacidad', href: '/legal/privacidad', rel: 'nofollow' },
              { label: 'Política de cookies', href: '/legal/cookies', rel: 'nofollow' },
              { label: 'Términos y condiciones', href: '/legal/terminos', rel: 'nofollow' },
              { label: 'Contacto', href: '/legal/contacto', rel: 'nofollow' },
            ]}
          />
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-footer-border text-center text-sm text-footer-copyright">
          <p>© 2026 Verflix. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, icon, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm transition-colors duration-200 hover:text-white"
              rel={link.rel}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Classes Tailwind Equivalentes

| Token Custom | Tailwind Native |
|--------------|----------------|
| `footer-bg` | `bg-background` (usa `--background` CSS var) |
| `footer-border` | `border-border` (usa `--border` CSS var) |
| `footer-link` | `text-muted-foreground` (usa `--muted-foreground` CSS var) |
| `footer-link-hover` | `hover:text-foreground` (usa `--foreground` CSS var) |
| `footer-copyright` | `text-xs text-muted-foreground` |

---

## Checklist de Implementación

- [ ] Crear componente `Footer.tsx` en `src/components/layout/`
- [ ] Implementar grid responsivo con 2-5 columnas
- [ ] Agregar logo con link al inicio
- [ ] Crear columnas para Películas, Series, Categorías y Legal
- [ ] Implementar enlaces a rutas existentes (`/movies`, `/tv`)
- [ ] Crear páginas legales placeholder para `/legal/*`
- [ ] Agregar iconos de Lucide React para columnas
- [ ] Implementar efectos de hover con transiciones suaves
- [ ] Asegurar contraste WCAG AA en todos los temas
- [ ] Agregar `aria-label` en links donde sea necesario
- [ ] Implementar accordion versión mobile
- [ ] Probar navegación por teclado
- [ ] Agregar sección de copyright
- [ ] Integrar Footer en `App.tsx` o `MainLayout.tsx`

---

## Referencias

- [shadcn/ui Footer Component](https://ui.shadcn.com/docs/components/footer)
- [WCAG 2.1 - Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [Tailwind CSS - Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [TMDB Genre List](https://developer.themoviedb.org/reference/genre-movie-list)
