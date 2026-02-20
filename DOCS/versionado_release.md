# Versionado y Release

Políticas y convenciones de versionado para el proyecto Netflix-like con TMDB API.

---

## Versionado Semver (Semantic Versioning)

### Formato del Versionado

`MAJOR.MINOR.PATCH`

| Cambio | Versión | Ejemplo |
|---------|----------|---------|
| Cambios incompatibles con la API anterior | MAJOR | 0.1.0 → 1.0.0 |
| Nueva funcionalidad compatible (backwards) | MINOR | 0.1.0 → 0.2.0 |
| Correcciones de bugs compatibles (backwards) | PATCH | 0.1.0 → 0.1.1 |

### Reglas de Versionado

#### Para v0.x.0 (Pre-releases/Development)
- Estos son commits de desarrollo antes del MVP (v1.0.0)
- No hay garantía de estabilidad hacia atrás
- Pueden tener cambios breaking

#### Para v1.x.0 (MVP)
- Primera versión estable con todas las características principales
- Marcador de MVP completo

#### Para v2.x.0 (Release Final)
- Versión de producción lista para despliegue
- Todas las características implementadas y probadas

---

## Rama de Desarrollo

| Rama | Descripción |
|-------|-------------|
| `main` | Rama principal de desarrollo |
| `v0.x` | Ramas de versión (opcional, para paralelo de versiones) |

---

## Git Tags

Los tags de Git siguen el formato: `vX.Y.Z`

### Tags de Pre-release (v0.x)
- `v0.1.0`
- `v0.2.0`
- `v0.3.0`
- `v0.4.0`
- `v0.5.0`
- `v0.6.0`
- `v0.7.0`
- `v0.8.0`
- `v0.9.0`

### Tags de Release (v1.x, v2.x)
- `v1.0.0` - MVP
- `v2.0.0` - Release Final

---

## Tipos de Releases

| Tipo | Descripción |
|------|-------------|
| **Alpha** | v0.x.0 - Versiones inestables, no recomendadas para producción |
| **Beta** | v0.x.0 - Versiones con funcionalidad completa, pruebas limitadas |
| **RC (Release Candidate)** | v0.x.0 - Candidato a producción, pruebas completas |
| **Stable** | v1.x.0, v2.x.0 - Versiones listas para producción |
| **LTS (Long Term Support)** | v2.x.0 + parches de bugs (v2.0.1, v2.0.2...) |

---

## Changelog por Versión

Cada versión debe tener su sección de changelog en [changelog.md](changelog.md).

### Estructura Recomendada

```markdown
## [Versión] - [Título]

### Features
- [Nueva característica]
- [Otra característica]

### Fixes
- [Bug corregido]

### Breaking Changes
- [Cambio incompatible]

### Documentation
- [Actualización de documentación]
```

---

## Proceso de Release

### Checklist Pre-Release

1. ✅ Todas las características de la versión implementadas
2. ✅ Pruebas completadas (unit tests, integration tests, E2E)
3. ✅ Documentación actualizada
4. ✅ Changelog actualizado
5. ✅ Git tag creado
6. ✅ Version actualizada en package.json (si aplica)

### Checklist Post-Release

1. ✅ Deploy a producción completado
2. ✅ Monitoreo activo
3. ✅ Anuncios enviados (si aplica)

---

## Dependencias

Ver [dependencias.md](dependencias.md) para la lista de dependencias del proyecto y sus versiones.

---

## Referencias

- [Changelog](changelog.md) - Plan de versiones y roadmap
- [Plan de Commits](plan_commits.md) - Estrategia de commits y ejemplos
- [Dependencias](dependencias.md) - Lista de dependencias
