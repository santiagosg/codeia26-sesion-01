# Política de Dependencias

Documentación de todas las dependencias utilizadas en el proyecto Netflix-like.

---

## Dependencias de Producción

### Framework y UI

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **react** | ^18.2.0 | Biblioteca JavaScript para construir interfaces de usuario | Framework principal |
| **react-dom** | ^18.2.0 | Punto de entrada para React en el DOM | Renderizado en el navegador |
| **react-router-dom** | ^6.20.0 | Enrutamiento para aplicaciones React | Navegación SPA |

### Cliente HTTP

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **axios** | ^1.6.2 | Cliente HTTP basado en promesas | Comunicación con TMDB API |

### Estilos

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **clsx** | ^2.0.0 | Utilidad para construir className condicional | Manejo de clases CSS dinámicas |
| **tailwind-merge** | ^2.1.0 | Combina clases Tailwind sin conflictos | Merge inteligente de estilos |

### Iconos

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **lucide-react** | ^0.294.0 | Iconos SVG modernos | Iconos de la interfaz |

---

## Dependencias de Desarrollo

### TypeScript

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **@types/react** | ^18.2.43 | Definiciones de tipos para React | Tipado TypeScript |
| **@types/react-dom** | ^18.2.17 | Definiciones de tipos para React DOM | Tipado TypeScript |

### Build Tool y Configuración

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **@vitejs/plugin-react** | ^4.2.1 | Plugin oficial de React para Vite | Configuración de React + Vite |
| **vite** | ^5.0.8 | Build tool y dev server | Desarrollo y bundle |
| **typescript** | ^5.2.2 | Lenguaje de tipado estático | Tipado del proyecto |

### CSS

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **tailwindcss** | ^3.3.6 | Framework de utilidades CSS | Estilos de la aplicación |
| **autoprefixer** | ^10.4.16 | Autoprefijador CSS | Compatibilidad cross-browser |
| **postcss** | ^8.4.32 | Transformador CSS | Procesamiento de CSS |

### Linting

| Paquete | Versión | Descripción | Uso |
|---------|---------|-------------|-----|
| **eslint** | ^8.55.0 | Linter para JavaScript/TypeScript | Calidad de código |
| **@typescript-eslint/eslint-plugin** | ^6.14.0 | Reglas ESLint para TypeScript | Validación TypeScript |
| **@typescript-eslint/parser** | ^6.14.0 | Parser para TypeScript en ESLint | Análisis TypeScript |
| **eslint-plugin-react-hooks** | ^4.6.0 | Reglas ESLint para React Hooks | Validación de Hooks |
| **eslint-plugin-react-refresh** | ^0.4.5 | Optimización de recarga React HMR | Fast Refresh |

---

## Paquete package.json Completo

```json
{
  "name": "codeia26-sesion-01",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

---

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila TypeScript y crea bundle de producción |
| `npm run preview` | Previsualiza el bundle de producción |
| `npm run lint` | Ejecuta ESLint en el proyecto |

---

## shadcn/ui Dependencias

shadcn/ui es una colección de componentes que se instalan individualmente. No se añaden al package.json automáticamente.

### Componentes Instalables

| Componente | Descripción |
|------------|-------------|
| button | Botón reutilizable con múltiples variantes |
| card | Contenedor con header y contenido |
| input | Campo de entrada de texto |
| select | Dropdown select |
| dialog | Modal/dialog overlay |
| scroll-area | Área con scroll personalizado |
| skeleton | Skeleton de carga |
| separator | Línea separadora |
| badge | Badge/etiqueta |
| avatar | Avatar con imagen o iniciales |

### Comando de Instalación

```bash
npx shadcn-ui@latest add [componente]
```

Ejemplo:
```bash
npx shadcn-ui@latest add button card input dialog
```

---

## Política de Actualización

### Versión Semántica (SemVer)

Las versiones siguen el formato `MAJOR.MINOR.PATCH`:

| Cambio | Versión | Ejemplo |
|--------|---------|---------|
| Cambios incompatibles con la API anterior | MAJOR | 1.0.0 → 2.0.0 |
| Nueva funcionalidad compatible | MINOR | 1.0.0 → 1.1.0 |
| Correcciones de bugs compatibles | PATCH | 1.0.0 → 1.0.1 |

### Actualización de Dependencias

**Para dependencias de producción:**
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar a las versiones compatibles más recientes
npm update

# Actualizar a la versión más reciente (cuidado con cambios mayores)
npm update react --latest
```

**Para dependencias de desarrollo:**
```bash
# Actualizar todas las devDependencies
npm update -D
```

### Dependencias Pinneadas

Para mayor estabilidad, algunas dependencias están "pinneadas" a versiones específicas:

- **React 18.2.0**: Versión estable probada
- **React Router DOM 6.20.0**: Compatible con React 18
- **Vite 5.0.8**: Última versión estable al momento

**NO actualizar** sin pruebas exhaustivas:
- React (puede romper la aplicación)
- React Router DOM (cambios de API)
- TypeScript (nuevas reglas pueden causar errores)

---

## Dependencias Opcionales

Las siguientes dependencias pueden añadirse si es necesario:

| Paquete | Uso | Cuándo usarlo |
|---------|-----|---------------|
| **react-query** | Caché y gestión de estado de servidor | Si se necesita caché avanzado |
| **zustand** | State management ligero | Si el Context no es suficiente |
| **framer-motion** | Animaciones | Para animaciones complejas |
| **react-intersection-observer** | Lazy loading | Para implementar infinite scroll |
| **date-fns** | Manipulación de fechas | Si se necesita más formato de fechas |

---

## Dependencias a EVITAR

| Paquete | Razón para evitar |
|---------|-------------------|
| **jquery** | No necesario con React |
| **bootstrap** | Usamos Tailwind CSS |
| **material-ui** | Usamos shadcn/ui |
| **redux** | El proyecto usa Context para estado global |
| **next.js** | El proyecto usa Vite (opción de migración posterior) |

---

## Auditoría de Seguridad

Para verificar vulnerabilidades en las dependencias:

```bash
npm audit
```

Para corregir automáticamente vulnerabilidades:

```bash
npm audit fix
```

**IMPORTANTE:** Revisar los cambios antes de aplicar `npm audit fix` ya que puede actualizar dependencias a versiones incompatibles.

---

## Limpieza de Dependencias

Para eliminar dependencias no utilizadas:

```bash
# Detectar dependencias no utilizadas
npm prune

# Eliminar una dependencia específica
npm uninstall nombre-del-paquete

# Eliminar una devDependency
npm uninstall -D nombre-del-paquete
```

---

## Resumen

| Categoría | Cantidad |
|-----------|----------|
| Production Dependencies | 7 |
| Development Dependencies | 11 |
| shadcn/ui Components | 10 (instalables individualmente) |
| Total estimado | ~28 paquetes |

---

## Referencias

- [npm Registry](https://www.npmjs.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [React Router Documentation](https://reactrouter.com)
