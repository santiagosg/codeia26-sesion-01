# Skeleton Patterns Specification

Patrones de carga (Skeleton) para componentes MovieCard y Detail, definidos por un UX Engineer.

---

## Tabla de Contenidos

- [Principios UX de Skeleton](#principios-ux-de-skeleton)
- [MovieCard Skeleton](#moviecard-skeleton)
- [Detail Skeleton](#detail-skeleton)
- [Shimmer Animation](#shimmer-animation)
- [Tiempos de Carga](#tiempos-de-carga)
- [Checklist: Skeleton vs Estado Vacío](#checklist-skeleton-vs-estado-vacío)

---

## Principios UX de Skeleton

| Principio | Descripción | Aplicación |
|-----------|-------------|-------------|
| **Indicador de Progreso** | Usuario debe saber que contenido está cargando | Shimmer animation + pulse |
| **Estructura Familiar** | Skeleton debe reflejar layout final del componente | Mismas dimensiones y proporciones |
| **No False Promises** | No mostrar placeholder para contenido que aún no existe | Solo para datos que se cargarán |
| **Transición Suave** | Fade-in de skeleton a contenido real | 200-300ms transition |
| **Reduced Motion** | Respetar preferencia de usuario sin animaciones | `prefers-reduced-motion` |

---

## MovieCard Skeleton

### Dimensiones

| Variant | Width | Height | Aspect Ratio | Clase Tailwind |
|---------|--------|---------|--------------|-----------------|
| **compact** | 120px | 180px | 2:3 | `w-[120px] h-[180px] aspect-[2/3]` |
| **standard** | 160px | 240px | 2:3 | `w-[160px] h-[240px] aspect-[2/3]` |
| **wide** | 320px | 180px | 16:9 | `w-[320px] h-[180px] aspect-video` |

### Estructura de Skeleton

```
┌─────────────────┐
│                 │  ← Placeholder poster (90% height)
│   SHIMMER      │
│                 │
│                 │
│─────────────────┤
│ ▓▓▓ ▓▓▓ ▓▓   │  ← Metadata badges (10% height)
└─────────────────┘
```

### Componentes Internos

| Elemento | Dimensión Relativa | Tailwind Classes |
|----------|-------------------|-----------------|
| **Poster placeholder** | 90% height, 100% width | `h-[90%] w-full bg-gradient` |
| **Rating badge** | 20px × 20px, absolute top-2 right-2 | `absolute top-2 right-2 w-5 h-5 rounded-full` |
| **Quality badge** | 30px × 15px, absolute bottom-2 left-2 | `absolute bottom-2 left-2 w-[30px] h-4 rounded` |

### Estado Idle del Skeleton

```tsx
// MovieCard Skeleton - Estado loading inicial
<div className="
  group relative rounded-card overflow-hidden
  bg-neutral-800/50
  animate-pulse
">
  {/* Poster placeholder */}
  <div className="
    w-full h-[90%] bg-gradient-to-br
    from-neutral-800 to-neutral-700
    animate-shimmer
  " />

  {/* Quality badge placeholder */}
  <div className="
    absolute top-2 left-2 w-[30px] h-4
    bg-neutral-700 rounded-sm
  " />

  {/* Rating badge placeholder */}
  <div className="
    absolute top-2 right-2 w-5 h-5
    bg-neutral-700 rounded-full
  " />
</div>
```

### Estados de Skeleton

| Estado | Animación | Duración | Transición al cargar |
|--------|------------|-----------|----------------------|
| **Initial load** | `animate-pulse` + `animate-shimmer` | 1.5s (pulse) / 2s (shimmer loop) | Fade-out 200ms + Fade-in content 300ms |
| **Infinite loading** | `animate-pulse` | 1.5s loop | - |
| **Error** | No animación, color `bg-red-900/30` | - | Fade-out 200ms + Fade-in error UI |

---

## Detail Skeleton

### Dimensiones

| Sección | Height Mínimo | Max Width | Tailwind Classes |
|---------|----------------|------------|-----------------|
| **Hero backdrop** | 50vh | 100% | `h-[50vh] w-full` |
| **Title** | 48px | 600px (lg) | `text-display max-w-[600px]` |
| **Metadata row** | 24px | - | `h-6 flex gap-4` |
| **Synopsis** | 120px | 800px (lg) | `h-[120px] max-w-[800px]` |
| **Action buttons** | 48px | - | `h-12 flex gap-3` |
| **Cast carousel** | 180px | 100% | `h-[180px] w-full` |
| **Cast item** | 140px | 140px | `w-[140px] h-[140px]` |

### Estructura de Skeleton - Detail

```
┌────────────────────────────────────────────────────────────┐
│                                                    │
│   ╔════════════════════════════════════════╗   │  ← Hero backdrop (50vh)
│   ║                                          ║   │
│   ║   SHIMMER BACKDROP                       ║   │
│   ║                                          ║   │
│   ╚════════════════════════════════════════╝   │
│                                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Title placeholder (48px)
│                                                    │
│  ▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓▓▓  ▓▓▓▓▓▓  │  ← Metadata badges (24px)
│                                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Synopsis placeholder (120px)
│                                                    │
│  ▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓  │  ← Action buttons (48px)
│                                                    │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │  ← Cast carousel (180px)
│  │ ●   │ │ ●   │ │ ●   │ │ ●   │ │ ●   │  │    Cast items (140px)
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘  │
└────────────────────────────────────────────────────────────┘
```

### Componentes Internos

| Elemento | Dimensiones | Tailwind Classes |
|----------|-------------|-----------------|
| **Hero backdrop** | 50vh height, 100% width | `h-[50vh] w-full bg-gradient animate-shimmer` |
| **Title** | 48px height, variable width | `h-12 w-3/4 lg:w-3/5 bg-neutral-700 rounded-lg` |
| **Metadata badges** | 24px height, badges 80-120px | `h-6 flex gap-4` → badges `w-20 h-6 bg-neutral-700 rounded-full` |
| **Synopsis** | 120px height | `h-32 w-full lg:w-2/3 bg-neutral-700/50 rounded-lg` |
| **Action buttons** | 48px height, buttons 120-180px | `h-12 flex gap-3` → buttons `w-30 h-12 bg-neutral-700 rounded-lg` |
| **Cast item** | 140px × 140px | `w-[140px] h-[140px] bg-neutral-700 rounded-lg` |
| **Cast avatar** | 80px × 80px, centered | `w-20 h-20 bg-neutral-600 rounded-full mx-auto` |

### Estado Idle del Skeleton - Detail

```tsx
// Detail Skeleton - Estado loading inicial
<div className="animate-fade-in">
  {/* Hero backdrop */}
  <div className="
    h-[50vh] w-full bg-gradient-to-br
    from-neutral-800 to-neutral-700
    animate-shimmer
  " />

  {/* Content container */}
  <div className="space-y-section-y px-hero-padding">
    {/* Title */}
    <div className="h-12 w-3/4 lg:w-3/5 bg-neutral-700 rounded-lg animate-pulse" />

    {/* Metadata row */}
    <div className="flex gap-4 h-6">
      <div className="w-20 bg-neutral-700 rounded-full animate-pulse" />
      <div className="w-24 bg-neutral-700 rounded-full animate-pulse" />
      <div className="w-16 bg-neutral-700 rounded-full animate-pulse" />
    </div>

    {/* Synopsis */}
    <div className="h-32 lg:w-2/3 bg-neutral-700/50 rounded-lg animate-pulse" />

    {/* Action buttons */}
    <div className="flex gap-3 h-12">
      <div className="w-32 h-12 bg-neutral-700 rounded-lg animate-pulse" />
      <div className="w-28 h-12 bg-neutral-700 rounded-lg animate-pulse" />
      <div className="w-12 h-12 bg-neutral-700 rounded-full animate-pulse" />
    </div>

    {/* Cast carousel */}
    <div className="space-y-4">
      <div className="h-6 w-48 bg-neutral-700 rounded animate-pulse" />
      <div className="flex gap-4 h-[180px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[140px] h-[140px] bg-neutral-700 rounded-lg animate-pulse">
            <div className="w-20 h-20 bg-neutral-600 rounded-full mx-auto mt-4" />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

---

## Shimmer Animation

### Cuándo Usar Shimmer

| Caso de Uso | Aplicar Shimmer | Razón |
|-------------|-----------------|--------|
| **Large areas** (backdrop, poster) | ✅ Sí | Área grande se siente más dinámica |
| **Text placeholders** | ❌ No | Pulse es suficiente, shimmer distrae |
| **Small badges** | ❌ No | Shimmer no visible en áreas pequeñas |
| **Card hover states** | ❌ No | Solo para estado loading inicial |
| **Grid de skeletons** | ✅ Sí (coordinado) | Offset phase para efecto de ola |

### Configuración de Shimmer

```css
/* Shimmer animation definition */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Shimmer utility */
.animate-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-shimmer {
    animation: none;
  }
}
```

### Clases Tailwind Equivalentes

| Estado | Clase Tailwind | CSS Resultante |
|--------|---------------|----------------|
| **Shimmer base** | `bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%] animate-shimmer` | Shimmer horizontal |
| **Pulse** | `animate-pulse bg-neutral-800/50` | Pulse opacity |
| **Fade-in** | `animate-[fadeIn_200ms_ease-in-out]` | Fade desde transparente |
| **Fade-out** | `animate-[fadeOut_200ms_ease-in-out]` | Fade a transparente |

---

## Tiempos de Carga

### MovieCard - Timing Matrix

| Tamaño de Imagen | Conexión | Tiempo Esperado | Mostrar Skeleton |
|-----------------|-----------|------------------|------------------|
| **Pequeña** (< 50KB) | 3G+ | < 1s | ❌ No (carga casi instantánea) |
| **Pequeña** (< 50KB) | WiFi/4G | < 500ms | ❌ No |
| **Mediana** (50-200KB) | 3G | 1-2s | ✅ Sí |
| **Mediana** (50-200KB) | WiFi/4G | 500ms-1s | ⚠️ Opcional (si hay delay en render) |
| **Grande** (> 200KB) | 3G | 2-5s | ✅ Sí |
| **Grande** (> 200KB) | WiFi/4G | 1-2s | ✅ Sí |

### Detail - Timing Matrix

| Sección | Tiempo Esperado | Mostrar Skeleton | Prioridad |
|---------|------------------|------------------|-----------|
| **Hero backdrop** | 1-3s | ✅ Sí | Alta (elemento principal) |
| **Metadata** | 500ms-1s | ⚠️ Opcional | Media |
| **Cast** | 1-2s | ✅ Sí | Media |
| **Similar content** | 1-2s | ✅ Sí | Baja (lazy load) |

### Timing Thresholds

| Threshold | Condición | Acción |
|-----------|-------------|---------|
| **Inmediata** (< 200ms) | Datos cacheados | No mostrar skeleton |
| **Rápida** (200-500ms) | Datos ya fetchados | Skeleton opcional |
| **Media** (500ms-1.5s) | Fetch estándar | Mostrar skeleton |
| **Lenta** (1.5-3s) | Conexión lenta o payload grande | Mostrar skeleton completo |
| **Muy lenta** (> 3s) | Timeout probable | Skeleton + timeout message |

---

## Checklist: Skeleton vs Estado Vacío

### ¿Cuándo usar Skeleton?

| Condición | Skeleton | Empty State | Razón |
|-----------|-----------|--------------|--------|
| **First-time load** de contenido | ✅ | ❌ | Usuario espera ver contenido |
| **Pull-to-refresh** | ✅ | ❌ | Usuario explícitamente solicitó actualizar |
| **Pagination load** (página siguiente) | ✅ | ❌ | Datos existen, cargando más |
| **Infinite scroll** (next batch) | ✅ | ❌ | Extendiendo contenido existente |
| **Search con results** | ✅ | ❌ | Usuario encontró contenido |
| **Search vacío** | ❌ | ✅ | No hay resultados para mostrar |
| **Filtered list vacía** | ❌ | ✅ | Filtros no coinciden con items |
| **Error de fetch** | ❌ | ✅ | Error state, no loading |
| **Skeleton timeout** (> 5s) | ❌ | ✅ | Timeout, no loading indefinite |
| **Content vacío por defecto** | ❌ | ✅ | No hay contenido para mostrar |
| **User-generated content vacío** | ❌ | ✅ | CTA para crear contenido |

### Flujo de Decisión

```
                    ┌─────────────────┐
                    │  Request Start  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Has Cache?     │
                    └────┬─────┬────┘
                         │     │
                    ┌────▼─┐ ┌──▼─────┐
                    │  Yes  │ │  No    │
                    └───┬───┘ └──┬─────┘
                        │         │
                   ┌────▼────────┐ │
                   │ Render <200ms │ │
                   └────┬───────┬─┘
                        │   No   │
                   ┌────▼───────▼──┐
                   │ Show Content   │
                   └───────────────┘

                        │ Yes (>200ms)
                   ┌────▼──────────┐
                   │ Is Content     │
                   │ Guaranteed?  │
                   └────┬─────┬────┘
                        │     │
                   ┌────▼─┐ ┌──▼─────┐
                   │  Yes  │ │  No    │
                   └───┬───┘ └──┬─────┘
                       │         │
                  ┌────▼────────┐ │
                  │ Show Skel.  │ │
                  │ + Timeout  │ │
                  └────┬───────┘
                       │
              ┌────────▼────────┐
              │ Data Arrives?  │
              └────┬─────┬────┘
                   │     │
              ┌────▼─┐ ┌──▼─────┐
              │  Yes  │ │  No    │
              └───┬───┘ └──┬─────┘
                  │         │
             ┌────▼──────────┐ │
             │ Show Content  │ │
             │ + Animation │ │
             └────┬─────────┘
                  │
         ┌────────▼────────┐
         │ Timeout > 5s?  │
         └────┬─────┬────┘
              │     │
         ┌────▼─┐ ┌──▼─────┐
         │  Yes  │ │  No    │
         └───┬───┘ └──┬─────┘
             │         │
        ┌────▼────────┐ │
        │ Show Error/ │ │
        │ Empty State │ │
        └─────────────┘
```

### Empty States - Cuándo Usar

| Scenario | Empty State | CTA | Mensaje Sugerido |
|----------|--------------|------|------------------|
| **Search sin resultados** | Ilustración + texto | "No se encontraron resultados para '{query}'" | Buscar con otros términos |
| **Filtros sin coincidencias** | Ícono + texto | "No hay contenido con los filtros seleccionados" | Limpiar filtros |
| **Watch list vacía** | Ilustración + texto | "Tu lista está vacía" | Explorar películas |
| **Continue watching vacío** | Ícono + texto | "No hay contenido en progreso" | Empezar a ver algo |
| **Similar content vacío** | Ícono + texto | "No hay contenido similar" | Volver al inicio |

---

## Componentes de Skeleton - shadcn/ui

### Uso del Skeleton Component

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// MovieCard Skeleton
<Skeleton className="w-[160px] h-[240px] aspect-[2/3] rounded-lg" />

// Detail Hero Skeleton
<Skeleton className="h-[50vh] w-full rounded-none" />

// Text Skeleton (title)
<Skeleton className="h-12 w-3/4 lg:w-3/5 rounded-lg" />

// Badge Skeleton
<Skeleton className="w-20 h-6 rounded-full" />

// Cast Item Skeleton
<Skeleton className="w-[140px] h-[140px] rounded-lg">
  <Skeleton className="w-20 h-20 rounded-full mx-auto mt-4" />
</Skeleton>
```

### Variantes Personalizadas

```tsx
// Shimmer variant para grandes áreas
<Skeleton className="
  h-[50vh] w-full
  bg-gradient-to-br from-neutral-800 to-neutral-700
  animate-shimmer
" />

// Pulse variant para areas pequeñas
<Skeleton className="h-6 w-20 rounded-full animate-pulse" />
```

---

## Resumen

| Componente | Skeleton Principal | Dimensiones Clave | Shimmer? | Timeout |
|-------------|-------------------|-------------------|-----------|----------|
| **MovieCard** | Poster placeholder + badges | 120-320px width | ✅ Sí (large area) | 3s |
| **Detail Hero** | Backdrop + content | 50vh height | ✅ Sí (large area) | 5s |
| **Detail Cast** | Carousel de items | 140px × 140px items | ⚠️ Opcional | 2s |
| **Empty State** | Ilustración + CTA | Variable | ❌ No | - |

---

## Referencias

- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Loading Skeletons - UX Patterns](https://www.smashingmagazine.com/2022/10/how-to-build-a-smart-loading-skeleton-component/)
- [WCAG 2.1 Loading States](https://www.w3.org/WAI/WCAG21/Techniques/aria-live)
- [Material Design - Skeleton Screens](https://m3.material.io/components/skeleton-screen/overview)
