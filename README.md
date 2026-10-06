# Auditoría Web Express — Landing

Landing estática premium (HTML + CSS + JS vanilla) para el servicio **Auditoría Web Express**. Sin build step. Lista para GitHub Pages.

## Abrir en local

Desde esta carpeta:

```bash
# Opción A — Python
python3 -m http.server 8080

# Opción B — npx
npx --yes serve -p 8080
```

Abre [http://localhost:8080](http://localhost:8080).

Archivos:

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Landing principal |
| `informe.html` | Teaser de informe ficticio (Hotel Costa Luz) |
| `styles.css` | Estilos (Apple / Emil Kowalski) |
| `main.js` | Theme + i18n (ES/EN) + scroll reveal |

## GitHub Pages

1. Sube el repo (o usa el ya creado `heindall92/auditoria-ad-express`).
2. En GitHub: **Settings → Pages**.
3. **Source**: Deploy from a branch.
4. Branch: `main`, folder: `/ (root)`.
5. Save. En unos minutos estará en:

   `https://heindall92.github.io/auditoria-ad-express/`

Alternativa por CLI (si `gh` está autenticado):

```bash
gh api repos/heindall92/auditoria-ad-express/pages -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

## Tema e idioma

- **Tema**: toggle Claro/Oscuro en la nav. Persistido en `localStorage` (`theme`). Por defecto oscuro; en la primera visita respeta `prefers-color-scheme` si no hay valor guardado. Se aplica con `data-theme` en `<html>`.
- **Idioma**: toggle ES | EN. Persistido en `localStorage` (`lang`). Por defecto español. Traduce toda la copy de `index.html` e `informe.html`.

## Contacto CTAs

Los botones de reserva usan:

`mailto:yoandyramirezdelgado@gmail.com?subject=Auditoría%20Web%20Express`

## Licencia / aviso

El informe de ejemplo es **ficticio**. No representa un cliente real.
