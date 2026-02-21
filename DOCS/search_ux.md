# Search UX Specification

Experiencia de búsqueda con Command K para la aplicación Netflix-like.

---

## Tabla de Contenidos

- [Trigger del Command](#trigger-del-command)
- [Estados del Command](#estados-del-command)
- [Resultados de Búsqueda](#resultados-de-búsqueda)
- [Navegación por Teclado](#navegación-por-teclado)
- [Estados Vacíos y Errores](#estados-vacíos-y-errores)
- [Criterios de Focus](#criterios-de-focus)
- [Roles ARIA](#roles-aria)

---

## Trigger del Command

### Atajos de Teclado

| Atajo | Plataforma | Acción | Implementación |
|--------|-------------|--------|---------------|
| `Ctrl + K` | Windows/Linux | Abrir Command | `useEffect` con `keydown` listener |
| `Cmd + K` | macOS | Abrir Command | `useEffect` con `keydown` listener |
| `/` | Todas | Abrir Command (foco en input) | `keydown` listener en document |
| `Escape` | Todas | Cerrar Command | `onOpenChange(false)` |

### Estado Idle del Trigger

```
┌────────────────────────────────────────────────────────────┐
│  LOGO      Home    Películas    Series    [🔍 / ]   │
│                                                      ↑
│                           ┌───────────────────┐ │
│                           │  Presiona /      │ │
│                           │  para buscar     │ │
│                           └───────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### Implementación - Trigger

```tsx
import { Command } from "@/components/ui/command";
import { useEffect } from "react";

export function SearchCommand() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Command label="Buscar">
          <CommandInput placeholder="Buscar películas y series..." />
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Estados del Command

| Estado | Trigger | Visual | Comportamiento |
|--------|---------|--------|---------------|
| **Closed** | Ctrl/Cmd+K | Indicador sutil (badge en search icon) | No contenido visible |
| **Opening** | Trigger | Fade-in 150ms | Input ready para typing |
| **Open** | - | Command visible | Input focusado, lista desplegada |
| **Searching** | Input typing | Skeleton results | Debounce 300ms, shimmer loading |
| **Results** | Data loaded | Lista de resultados | Scroll enabled, selección activa |
| **Empty** | Sin resultados | Empty state | Mensaje + CTA |
| **Error** | Fetch error | Error state | Mensaje + retry |

### Transiciones de Estado

```css
/* Fade-in del Command */
@keyframes commandFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-command-fade-in {
  animation: commandFadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Fade-out del Command */
@keyframes commandFadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

.animate-command-fade-out {
  animation: commandFadeOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Resultados de Búsqueda

### Estructura de Resultado

```
┌────────────────────────────────────────────────────────────┐
│ 🔍 Término de búsqueda...                                 │
├────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐   │
│  │ [POSTER]  Nombre de Película      ★ 8.5    │   │ ← Resultado seleccionado
│  │            2024 • Acción • Sci-Fi • 2h 15m      │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [POSTER]  Otra Película          ★ 7.2      │   │ ← Resultado hover
│  │            2023 • Drama                     │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [POSTER]  Más Películas            ★ 6.8      │   │ ← Resultado idle
│  │            2022 • Thriller                  │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

### Componentes del Resultado

| Elemento | Dimensión | Clase Tailwind | shadcn/ui |
|----------|-------------|-----------------|------------|
| **Poster** | 48px × 72px | `w-12 h-[72px] rounded-md` | Avatar/Media |
| **Title** | variable width | `w-2/3 truncate text-sm font-medium` | Text |
| **Year** | 40px | `w-10 text-xs text-muted` | Badge |
| **Rating** | 40px | `w-10 text-xs` + icon | Badge: rating |
| **Genres** | 80-120px | `w-20 text-xs text-muted truncate` | Badge: genre |
| **Duration** | 60px | `w-16 text-xs text-muted` | Text |

### Estados del Resultado

| Estado | Visual | Clases |
|--------|--------|---------|
| **Idle** | Sin highlight | `hover:bg-accent` |
| **Selected** | Background destacado | `bg-accent` |
| **Active** | Resultado con focus | `focus:bg-accent/80 focus-visible:ring-2` |
| **Loading** | Skeleton | `animate-pulse bg-neutral-800/50` |

### Orden de Resultados

| Criterio | Orden | Ejemplo |
|-----------|--------|----------|
| **Relevance** | Higher match first | "Stranger" antes de "Stranger Things" |
| **Rating** | Higher rating first (same relevance) | 8.5 antes de 7.2 |
| **Year** | Recent first (same relevance) | 2024 antes de 2023 |
| **Popularity** | More popular first | Trending antes de regular |

---

## Navegación por Teclado

### Teclas de Navegación

| Tecla | Acción | Comportamiento |
|-------|--------|---------------|
| `↑` / `k` | Arriba | Seleccionar resultado anterior |
| `↓` / `j` | Abajo | Seleccionar siguiente resultado |
| `Home` | Inicio | Primer resultado |
| `End` | Fin | Último resultado |
| `PageUp` | Página arriba | 5 resultados arriba |
| `PageDown` | Página abajo | 5 resultados abajo |
| `Enter` | Seleccionar | Navegar a detalle |
| `Escape` | Cerrar | Cerrar Command |
| `Tab` | Siguiente | Salir del Command, focus body |

### Implementación - Navegación

```tsx
import { Command } from "@/components/ui/command";

function SearchResults({ results, onSelect }) {
  const [selected, setSelected] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "k":
        setSelected((s) => Math.max(0, s - 1));
        e.preventDefault();
        break;
      case "ArrowDown":
      case "j":
        setSelected((s) => Math.min(results.length - 1, s + 1));
        e.preventDefault();
        break;
      case "Home":
        setSelected(0);
        e.preventDefault();
        break;
      case "End":
        setSelected(results.length - 1);
        e.preventDefault();
        break;
      case "Enter":
        onSelect(results[selected]);
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  return (
    <Command.Group onKeyDown={handleKeyDown}>
      {results.map((result, index) => (
        <Command.Item
          key={result.id}
          value={result.id}
          data-selected={index === selected}
        >
          {/* Result content */}
        </Command.Item>
      ))}
    </Command.Group>
  );
}
```

---

## Estados Vacíos y Errores

### Estado Vacío - Sin Resultados

```
┌────────────────────────────────────────────────────────────┐
│ 🔍 "término de búsqueda"                              │
├────────────────────────────────────────────────────────────┤
│                                                       │
│              ┌─────────────────────┐                  │
│              │                     │                  │
│              │     🔍               │                  │
│              │                     │                  │
│              │ No se encontraron     │                  │
│              │ resultados para     │                  │
│              │ "{término}"         │                  │
│              │                     │                  │
│              └─────────────────────┘                  │
│                                                       │
│              [ Ver todo el catálogo ]                   │
│                                                       │
└────────────────────────────────────────────────────────────┘
```

### Estado de Error

```
┌────────────────────────────────────────────────────────────┐
│ 🔍 Término de búsqueda                              │
├────────────────────────────────────────────────────────────┤
│                                                       │
│              ┌─────────────────────┐                  │
│              │                     │                  │
│              │     ⚠️               │                  │
│              │                     │                  │
│              │ Error al buscar      │                  │
│              │                     │                  │
│              │ Intenta de nuevo     │                  │
│              │                     │                  │
│              └─────────────────────┘                  │
│                                                       │
│              [ Reintentar ]  [ Cerrar ]               │
│                                                       │
└────────────────────────────────────────────────────────────┘
```

### Estados de Carga

| Estado | Visual | Clases |
|--------|--------|---------|
| **Input loading** | Spinner en input | `relative → <div className="absolute right-3">` |
| **Results loading** | Skeleton rows | `<Command.Skeleton />` × N |
| **Debounce loading** | Indicador sutil | `"Buscando..." text-xs text-muted` |

---

## Criterios de Focus

### Orden de Focus al Abrir

```
┌────────────────────────────────────────────────────────────┐
│ 1. Trigger (Ctrl/Cmd+K activado)                │
│ 2. Command Dialog (fade-in 150ms)                  │
│ 3. Input Field (auto focus)                         │
│ 4. Primer Resultado (opcional, auto-select)          │
│ 5. Navegación (↑↓ para mover focus)                │
│ 6. Seleccionar (Enter para navegar)                  │
└────────────────────────────────────────────────────────────┘
```

### Focus Trap en Command

| Estado | Comportamiento |
|--------|---------------|
| **Abierto** | Focus trap dentro del Command |
| **Input focus** | Mantiene focus en input mientras se escribe |
| **Results focus** | Arrow keys mueven focus entre resultados |
| **Escape** | Cierra Command, restaura focus al trigger |
| **Click outside** | Cierra Command, restaura focus al body |

### Focus Visible Indicators

```css
/* Focus visible styles */
.result-item {
  position: relative;
  outline: none;
}

.result-item:focus-visible {
  background-color: rgba(255, 255, 255, 0.1);
}

.result-item:focus-visible::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 6px;
  border: 2px solid #E50914;
}
```

---

## Roles ARIA

### Estructura ARIA del Command

```tsx
<Dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="search-title"
  aria-describedby="search-instructions"
>
  <Command
    role="listbox"
    aria-label="Resultados de búsqueda"
    aria-activedescendant={selectedId}
  >
    <Command.Input
      role="searchbox"
      aria-label="Buscar películas y series"
      aria-autocomplete="list"
      aria-controls="search-results"
      aria-expanded={open}
    />
    <Command.Group
      role="list"
      id="search-results"
      aria-label={`${results.length} resultados encontrados`}
    >
      {results.map((result) => (
        <Command.Item
          role="option"
          id={`result-${result.id}`}
          aria-selected={result.id === selectedId}
          aria-label={`${result.title}, ${result.year}, rating ${result.rating}`}
        >
          {/* Result content */}
        </Command.Item>
      ))}
    </Command.Group>
  </Command>
</Dialog>
```

### ARIA Roles y Propiedades

| Elemento | Role | ARIA Properties | Propósito |
|-----------|------|------------------|------------|
| **Dialog** | `dialog` | `aria-modal="true"`, `aria-labelledby` | Modal de búsqueda |
| **Input** | `searchbox` | `aria-label`, `aria-autocomplete="list"`, `aria-expanded` | Campo de búsqueda |
| **Command** | `listbox` | `aria-label`, `aria-activedescendant` | Contenedor de resultados |
| **Command.Group** | `list` | `aria-label`, `aria-live="polite"` | Grupo de resultados |
| **Command.Item** | `option` | `aria-selected`, `aria-label` | Resultado individual |
| **Skeleton** | - | `aria-hidden="true"`, `aria-busy="true"` | Estado de carga |
| **Empty State** | - | `aria-live="polite"` | Notificación de vacío |
| **Error State** | - | `aria-live="assertive"` | Notificación de error |

### Live Regions para Notificaciones

```tsx
// Empty state con live region
<div role="status" aria-live="polite">
  <Alert variant="default">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>No se encontraron resultados</AlertTitle>
    <AlertDescription>
      Prueba con otros términos o {" "}
      <button className="text-brand-red hover:underline">
        ver todo el catálogo
      </button>
    </AlertDescription>
  </Alert>
</div>

// Error state con live region (assertive)
<div role="alert" aria-live="assertive">
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error al buscar</AlertTitle>
    <AlertDescription>
      {error.message}
      <Button onClick={retry} className="mt-2">
        Reintentar
      </Button>
    </AlertDescription>
  </Alert>
</div>
```

---

## Resumen de Interacciones

| Evento | Trigger | Acción | Animación |
|---------|---------|--------|-----------|
| **Abrir Command** | Ctrl/Cmd+K o `/` | Fade-in 150ms + focus input |
| **Cerrar Command** | Escape o click outside | Fade-out 150ms + restore focus |
| **Type en input** | User input | Debounce 300ms + loading state |
| **Navegar resultados** | ↑↓jk | Move focus + visual indicator |
| **Seleccionar resultado** | Enter | Navigate to detail + close command |
| **Click resultado** | Mouse | Same as Enter |
| **Clear input** | Esc | Clear input + show initial suggestions |

---

## Componentes shadcn/ui Utilizados

| Componente | Uso | Props Clave |
|-------------|------|-------------|
| **Command** | Contenedor principal | `children`, `label`, `shouldFilter` |
| **Command.Input** | Campo de búsqueda | `placeholder`, `value`, `onChange` |
| **Command.List** | Lista de resultados | `children` |
| **Command.Item** | Resultado individual | `value`, `onSelect` |
| **Command.Empty** | Estado vacío | `children` |
| **Command.Skeleton** | Carga | `count` |
| **Dialog** | Modal contenedor | `open`, `onOpenChange` |
| **ScrollArea** | Scroll personalizado | `className` |

---

## Referencias

- [shadcn/ui Command](https://ui.shadcn.com/docs/components/command)
- [Command Palette Pattern - Radix UI](https://www.radix-ui.com/docs/primitives/docs/command)
- [ARIA ComboBox Pattern](https://www.w3.org/WAI/ARIA/apatterns/combobox/)
- [Keyboard Navigation Best Practices](https://web.dev/keyboard-navigation/)
