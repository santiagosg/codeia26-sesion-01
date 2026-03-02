# No Image Card UX

Diseño para las cards de películas/series que no tienen imagen disponible, mostrando la "V" de Verflix como elemento visual distintivo.

---

## Tabla de Contenidos

- [Descripción del Problema](#descripción-del-problema)
- [Diseño Propuesto](#diseño-propuesto)
- [Especificaciones Visuales](#especificaciones-visuales)
- [Ejemplos de Implementación](#ejemplos-de-implementación)

---

## Descripción del Problema

Actualmente, cuando una película o serie no tiene imagen disponible (`poster_path` o `backdrop_path` es `null`), las cards muestran:

- Texto simple: "No imagen"
- Color: `text-muted-foreground` (gris)
- Sin identidad visual de marca

Esto genera:
- Experiencia visual inconsistente
- Falta de identidad de marca (Verflix)
- Cards sin imagen se ven vacías/rotas

---

## Diseño Propuesto

### Concepto

Mostrar la **"V"** de Verflix como elemento visual principal cuando no hay imagen, creando una identidad consistente con la marca.

```
┌─────────────────┐
│             │
│      RED V   │
│             │
│   (Verflix) │
│             │
└─────────────────┘
```

### Características

| Aspecto | Descripción |
|----------|-------------|
| **Elemento principal** | Letra "V" grande y roja (#E50914) |
| **Fondo** | Gradiente sutil rojo a negro |
| **Contorno** | Borde sutil con sombra |
| **Indicador** | Icono pequeño de imagen (opcional) |
| **Texto secundario** | Título debajo en gris pequeño |

---

## Especificaciones Visuales

### Colores

| Elemento | Color | Uso |
|-----------|-------|------|
| Fondo base | `from-netflix-red via-black/80 to-black` | Gradiente del fondo |
| Letra "V" | `#E50914` (netflix-red) | Elemento principal |
| Borde | `netflix-red/20` | Contorno sutil |
| Sombra | `shadow-lg shadow-netflix-red/20` | Efecto de profundidad |
| Texto título | `text-muted-foreground` | Título debajo de la V |

### Tipografía

| Elemento | Tamaño | Peso | Uso |
|-----------|---------|-------|------|
| Letra "V" | 80-120px | 700-900 (Bold) | Elemento principal |
| Título | text-sm | 500 (Medium) | Debajo de la V |
| Año | text-xs | 400 (Regular) | Metadata |

### Dimensiones y Espaciado

| Elemento | Valor | Uso |
|-----------|-------|------|
| Aspect ratio | `aspect-[2/3]` (poster) / `aspect-video` (backdrop) | Mantener proporción |
| Padding interno | `p-6` a `p-8` | Espacio para la V |
| Border radius | `rounded-lg` | Igual que otras cards |
| Gap al título | `gap-2` o `gap-3` | Separación del título |

---

## Ejemplos de Implementación

### MediaCard (No Image Variant)

```tsx
export function MediaCard({ media, onClick, showRating = true, variant = 'poster' }: MediaCardProps) {
  const title = 'title' in media ? media.title : media.name;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = date ? new Date(date).getFullYear() : null;
  const imagePath = variant === 'poster' ? media.poster_path : media.backdrop_path;
  const imageUrl = getImageUrl(imagePath, variant === 'poster' ? 'w500' : 'w780');
  const hasImage = !!imagePath;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
    >
      <div className={`relative ${variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video'} bg-muted overflow-hidden rounded-lg`}>
        {/* Imagen o Placeholder con V */}
        {hasImage ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-netflix-red/80 via-netflix-red/90 to-black rounded-lg border border-netflix-red/20 shadow-lg">
            <span className="text-6xl md:text-8xl font-bold text-netflix-red">V</span>
          </div>
        )}

        {/* Overlay on hover - solo cuando hay imagen */}
        {hasImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[300ms] ease-in-out flex items-center justify-center">
            <Play className="w-12 h-12 text-white transition-all duration-[300ms] ease-in-out scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
          </div>
        )}

        {/* Rating badge - solo cuando hay imagen */}
        {showRating && hasImage && media.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-[4px] py-[2px] leading-[1em] rounded-[3px]">
            <span className="text-xs text-white font-normal">
              {media.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Título */}
      <div className="mt-2">
        <p className="text-sm font-medium truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out" title={title}>
          {title}
        </p>
        {year && <p className="text-xs text-muted-foreground">{year}</p>}
      </div>
    </div>
  );
}
```

### CreditCard (No Image Variant)

```tsx
export function CreditCard({ credit, onClick }: CreditCardProps) {
  const title = credit.title || credit.name;
  const imageUrl = getImageUrl(credit.poster_path, 'w500');
  const year = credit.release_date
    ? new Date(credit.release_date).getFullYear()
    : credit.first_air_date
      ? new Date(credit.first_air_date).getFullYear()
      : null;
  const hasImage = !!credit.poster_path;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
    >
      <div className="relative aspect-[2/3] bg-muted overflow-hidden rounded-lg">
        {/* Imagen o Placeholder con V */}
        {hasImage ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-netflix-red/80 via-netflix-red/90 to-black rounded-lg border border-netflix-red/20 shadow-lg">
            <span className="text-6xl md:text-8xl font-bold text-netflix-red">V</span>
          </div>
        )}

        {/* Overlay con nombre de personaje al hacer hover - solo cuando hay imagen */}
        {hasImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-3">
            <div className="w-full">
              {credit.character && (
                <p className="text-white text-sm font-medium truncate">
                  {credit.character}
                </p>
              )}
              <p className="text-netflix-red text-xs font-medium truncate">
                {title}
              </p>
            </div>
          </div>
        )}

        {/* Rating badge - solo cuando hay imagen */}
        {hasImage && credit.vote_average && credit.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-[4px] py-[2px] leading-[1em] rounded-[3px]">
            <span className="text-xs text-white font-normal">
              {credit.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Título - ocultar en hover si hay imagen */}
      <div className={`mt-2 ${hasImage ? 'group-hover:opacity-0 transition-opacity duration-300 ease-in-out' : ''}`}>
        <p className={`text-sm font-medium truncate ${hasImage ? 'group-hover:text-netflix-red transition-colors duration-300 ease-in-out' : ''}`}>
          {title}
        </p>
        {credit.character && (
          <p className="text-xs text-muted-foreground truncate">
            {credit.character}
          </p>
        )}
        {year && (
          <p className="text-xs text-muted-foreground">{year}</p>
        )}
      </div>
    </div>
  );
}
```

---

## Comparación Antes vs Después

### Antes (Estado Actual)

```
┌─────────────────┐
│               │
│   No imagen   │  ← Texto gris, sin identidad
│               │
└─────────────────┘
```

### Después (Propuesto)

```
┌─────────────────┐
│               │
│      RED V    │  ← V roja grande, identidad de marca
│               │
│  ┌─────────┐ │
│  │ Título  │ │  ← Título pequeño abajo
│  │ 2024    │ │
│  └─────────┘ │
└─────────────────┘
```

---

## States de la Card (No Image)

| Estado | Descripción | Comportamiento |
|--------|-------------|----------------|
| **Idle** | V roja visible, título gris visible |
| **Hover** | V roja visible, título oculto si es CreditCard (duplicado) |
| **Loading** | Skeleton de carga | Skeleton de proporción 2:3 con shimmer |
| **Error** | Error de carga | Estado de error con mensaje amigable |

---

## Accesibilidad

### ARIA Labels

```tsx
<div
  role="img"
  aria-label={`${title}, sin imagen disponible`}
  className="..."
>
  <span className="sr-only">Sin imagen disponible</span>
  <span className="text-6xl font-bold text-netflix-red">V</span>
</div>
```

### Keyboard Navigation

| Tecla | Acción | Descripción |
|--------|---------|-------------|
| `Tab` | Navegar a siguiente card | Focus visible con borde netflix-red |
| `Enter` / `Space` | Activar card | Navegar a detalle |
| `Esc` | Cerrar modal | Volver a listado |

### Screen Reader

```tsx
{/* Mensaje para screen readers */}
<span className="sr-only">
  Película {title} sin imagen disponible. Se muestra la V de Verflix como placeholder.
</span>
```

---

## Tokens de Tailwind (Resumen)

| Token | Valor | Uso |
|--------|-------|------|
| `text-netflix-red` | `#E50914` | Color de la V |
| `from-netflix-red/80` | Gradiente | Fondo de la V |
| `via-netflix-red/90` | Gradiente | Fondo de la V (punto medio) |
| `to-black` | Gradiente | Fondo de la V (punto final) |
| `border-netflix-red/20` | `rgba(229, 9, 20, 0.08)` | Borde sutil |
| `shadow-lg shadow-netflix-red/20` | Sombra | Profundidad |
| `text-6xl` | 60px | Tamaño de V en mobile |
| `text-8xl` | 96px | Tamaño de V en desktop |
| `font-bold` | 700-900 | Peso de la V |

---

## Resumen de Cambios

| Archivo | Cambio |
|----------|---------|
| [MediaCard.tsx](../verflix-app/src/components/media/MediaCard.tsx) | Agregar lógica para cards sin imagen |
| [CreditCard.tsx](../verflix-app/src/components/media/CreditCard.tsx) | Agregar lógica para cards sin imagen |

### Comportamiento Unificado

1. **Detectar si hay imagen**: `!!imagePath` o `!!poster_path`
2. **Renderizar condicionalmente**:
   - Si hay imagen: Mostrar imagen + overlay hover + rating
   - Si no hay imagen: Mostrar V roja + gradiente
3. **Ocultar título en hover** (CreditCard): `group-hover:opacity-0` si hay imagen

---

## Consideraciones Adicionales

### Performance

- Las cards sin imagen no deben cargar imágenes externas
- Placeholder renderizado con CSS puro (gradiente + texto)
- Sin impacto en CLS (Cumulative Layout Shift)

### Consistencia

- La V roja debe ser consistente con la identidad de marca de Verflix
- Mismo tamaño de fuente para todas las Vs en cards
- Gradiente sutil para no parecer "demasiado" rojo

### Responsividad

- `text-6xl` en mobile (< 768px)
- `text-8xl` en desktop (>= 768px)
- Mantener proporción de la card (aspect-[2/3] o aspect-video)
