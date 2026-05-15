# Ladrillo — Design System de Spot2 / Colossu

> Scraping consolidado del bundle Vite servido por https://ladrillo.vercel.app  
> Fuentes raw en [`ds-raw/`](ds-raw/) — `index.css` (51 KB, Tailwind v4) e `index.js` (544 KB, datos + JSX minificado).
> Fecha de scraping: 2026-04-22.

---

## ⚠️ Hallazgo crítico: Ladrillo documenta DOS sistemas

Ladrillo es un docs-site de showcase del estado actual extraído automáticamente vía Playwright sobre dos productos vivos:

| Sistema | Para qué se usa | Tipografía | Primario | Acento | Radii | Botones |
|---|---|---|---|---|---|---|
| **Spot2 (legacy / landing)** | spot2.mx, landings de captación, embed forms públicos | `Montserrat` | `#424552` (Charcoal) | `#ffaa00` (Amber) | 8px inputs, **9999px** botones (pill) | Pill, gradiente amber |
| **Colossu (CRM app)** | App admin: dashboards, contactos, contratos, deals, **editor de formularios** | `Geist` | `#0b1f33` (Deep Navy) | `#3b82f6` (Action Blue) | 6–8px todo | Rectángulo, dark navy o blue CTA |

Los tokens nombrados (`--color-spot-*` en CSS) cubren **solo el sistema Spot2**. Los valores Colossu están hardcoded como hex literales (`bg-[#0b1f33]`, `bg-[#3b82f6]`) en el JSX — **no existen como tokens nombrados**. Es un **gap del DS** importante.

**Decisión para esta tarea:** la vista "Editar Formulario Web" vive en la app admin → usar **patrón Colossu**. El **preview** dentro de esa vista renderiza el formulario público → usar **patrón Spot2** (Montserrat + accent amber + pill button).

---

## 1. Estructura de Ladrillo

Sidebar agrupado en:
- **Foundations:** introduction, colors, typography, spacing, shadows, border-radius, icons
- **Components:** buttons, forms, cards, navigation, tables, page-layouts
- **Quality:** accessibility, references

Stack declarado: `Tailwind CSS v4`, `Radix UI`, `shadcn/ui`, `Montserrat Font`, `Next.js (SSR)`, `WhatsApp Integration`.

Métricas globales que Ladrillo se autorreporta:
- **Design Score:** 80/100 (Grade B)
- **Accessibility:** 77 / 100 — 945 pares pasando, **280 fallando**
- 13 colores únicos · spacing base 4px · 14 tokens spacing · 6 patrones de componentes

---

## 2. Tokens

### 2.1 Colores — Sistema Spot2 (canónico en CSS)

**Brand**

| Token | Hex | Uso |
|---|---|---|
| `--color-spot-primary` | `#424552` | Texto principal, UI oscuro |
| `--color-spot-primary-light` | `#535464` | Secondary dark |
| `--color-spot-primary-dark` | `#1c1f2a` | Backgrounds más oscuros |
| `--color-spot-accent` | `#ffaa00` | CTAs y highlights |
| `--color-spot-accent-light` | `#ffc857` | Final del gradient amber |
| `--color-spot-accent-dark` | `#e69900` | Breadcrumb activo, hover |
| `--color-spot-green` | `#25d366` | WhatsApp CTA / success |
| `--color-spot-green-dark` | `#1da851` | WhatsApp hover |

**Neutrals (12 escalones)**

| Token | Hex |
|---|---|
| `--color-spot-white` | `#ffffff` |
| `--color-spot-gray-50` | `#f6f8fb` |
| `--color-spot-gray-100` | `#f5f5f5` |
| `--color-spot-gray-200` | `#e5e5e5` |
| `--color-spot-gray-300` | `#cccdd1` |
| `--color-spot-gray-400` | `#9898a2` |
| `--color-spot-gray-500` | `#737373` |
| `--color-spot-gray-600` | `#666666` |
| `--color-spot-gray-700` | `#535464` |
| `--color-spot-gray-800` | `#424552` |
| `--color-spot-gray-900` | `#1c1f2a` |
| `--color-spot-black` | `#000000` |

**Semantic**

| Token | Hex | Uso |
|---|---|---|
| `--color-spot-error` | `#dc2626` | Errores destructivos |
| `--color-spot-warning` | `#f97316` | Advertencia |
| `--color-spot-info` | `#0ea5e9` | Info |
| `--color-spot-success` | `#25d366` | Éxito (= green) |

**Gradients**

| Nombre | CSS |
|---|---|
| Accent CTA | `linear-gradient(to right, #ffaa00, #ffc857)` |
| Image Overlay | `linear-gradient(rgba(0,0,0,0.5) 36%, rgba(0,0,0,0) 89%)` |
| Fade Right / Left | `linear-gradient(to right/left, #ffffff, transparent)` |

**Guías de uso (extraído tal cual de Ladrillo)**

| Contexto | Hex | Notas |
|---|---|---|
| Body Text | `#424552` | Sobre blancos |
| Headings | `#424552` | Diferenciado por weight |
| Muted Text | `#737373` | Labels, metadata |
| CTA | `#ffaa00` | (texto blanco) |
| WhatsApp CTA | `#25d366` | |
| Borders | `#e5e5e5` | **10 819 usos**, color de borde más frecuente |
| Page BG | `#ffffff` | Áreas de contenido |
| Alt BG | `#f6f8fb` | Distinción sutil de secciones |

### 2.2 Colores — Sistema Colossu (hardcoded, sin tokens)

Inferidos del JSX y CSS de los samples. **Falta nombrarlos como tokens.**

| Rol | Hex | Uso |
|---|---|---|
| Primary | `#0b1f33` | Texto principal, sidebar activo, botones primary, KPI values |
| CTA Blue | `#3b82f6` (= blue-500) | Botones acción positiva, links de tabla, focus ring |
| Border | `#e5e7eb` (= gray-200) | Cards, tablas, sidebar |
| Border strong | `#d1d5db` (= gray-300) | Inputs, botones outline |
| Text muted | `#6b7280` (= gray-500) | Labels, metadata, paginación |
| Text very-muted | `#9ca3af` (= gray-400) | Section titles uppercase |
| BG hover row | `rgba(249,250,251,0.5)` | Hover en filas de tabla |
| Sidebar item active bg | `#f3f4f6` (= gray-100) | |
| Badge bgs | `#dcfce7` / `#fef9c3` / `#fee2e2` / `#dbeafe` / `#fff7ed` | Green / Yellow / Red / Blue / Orange |
| Badge texts | `#15803d` / `#a16207` / `#b91c1c` / `#1d4ed8` / `#ea580c` | |

### 2.3 Tipografía

**Familias cargadas:** `Montserrat 300/400/500/600/700`, `Inter 300/400/500/600/700`, `Geist 300/400/500/600/700` (todas vía Google Fonts).

- **Spot2:** `Montserrat` (declarado como `--font-spot`).
- **Colossu:** `Geist` (en JSX hardcoded como `font-family: 'Geist', sans-serif`).

**Type scale (13 niveles, datos extraídos del intro)**

| Size | rem | Weight | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|
| 36px | 2.25rem | 300 | 36px | 1.5px | h1 — Hero headlines |
| 32px | 2rem | 400 | 48px | normal | Display — Section titles |
| 26px | 1.625rem | 600 | 33.8px | normal | h2 — Section headings |
| 24px | 1.5rem | 600 | 32.16px | normal | h3 — Sub-section |
| 22px | 1.375rem | 500 | 33px | normal | Card titles |
| 20px | 1.25rem | 600 | 30px | normal | Large body emphasized |
| 18px | 1.125rem | 400 | 28px | normal | Body large / nav items |
| **16px** | **1rem** | **400** | **24px** | normal | **Body — default** |
| 15px | 0.9375rem | 500 | 26px | normal | Body compact (links, buttons) |
| 14px | 0.875rem | 700 | 20px | normal | Small bold (button labels, tags) |
| 13px | 0.8125rem | 400 | 17.33px | normal | Secondary links, metadata |
| 12px | 0.75rem | 600 | 16px | normal | Caption (labels, badges) |
| 10px | 0.625rem | 600 | 15px | normal | Micro (status indicators) |

### 2.4 Spacing — base 4px

```
spacing-0.5 = 2px      spacing-6  = 24px
spacing-1   = 4px      spacing-8  = 30px
spacing-1.5 = 5px      spacing-9  = 36px
spacing-2   = 8px      spacing-10 = 40px
spacing-3   = 12px     spacing-12 = 48px
spacing-4   = 16px     spacing-15 = 60px
spacing-5   = 20px     spacing-16 = 64px
                       spacing-20 = 80px
```

**Gaps comunes detectados** — 24px (card grids), 20px (content grids), 16px (form elements), 8px (inline groups).

**Containers (Tailwind defaults):** `xs 20rem` · `sm 24rem` · `md 28rem` · `lg 32rem` · `xl 36rem`.

### 2.5 Border radius

| Token | Valor | Conteo en sitio | Uso |
|---|---|---|---|
| `sm` | `4px` | 150 | Code blocks, badges pequeños |
| `md` | `8px` | 68 | **Inputs, botones (Colossu)** |
| `lg` | `12px` | 158 | Cards, content blocks, dropdowns |
| `xl` | `24px` | 2 | Cards grandes, hero |
| `full` | `9999px` | 8 | **Pills, avatars, botones (Spot2)** |

### 2.6 Shadows — Tailwind v4 defaults usados

```css
--shadow-xs:  0px 1px 2px  rgba(0,0,0,0.05);
--shadow-sm:  0px 1px 3px  rgba(0,0,0,0.10);
--shadow-md:  0px 4px 6px  rgba(0,0,0,0.10);
--shadow-lg:  0px 10px 15px rgba(0,0,0,0.10), 0px 4px 6px rgba(0,0,0,0.05);
--shadow-xl:  0px 4px 35px rgba(0,0,0,0.25), 0px 8px 10px -5px rgba(0,0,0,0.07);
```

Para Colossu se usa **`shadow-md`** en cards de superficie y **bordes en lugar de shadows** para muchos containers (más austero que Spot2).

---

## 3. Componentes

### 3.1 Buttons — Spot2 (pill, amber)

```css
.btn-accent   { background: #ffaa00; color: #fff; font-family: 'Montserrat'; font-size: 14px; font-weight: 600; padding: 10px 24px; border-radius: 9999px; transition: all .15s; }
.btn-whatsapp { background: #25d366; color: #fff; }
.btn-outline  { background: transparent; border: 2px solid #424552; color: #424552; }
```
Variantes detectadas: 924 instancias en el sitio. Tres core: Accent CTA (amber), WhatsApp (green), Outlined.

### 3.2 Buttons — Colossu (rectangular, navy/blue)

```css
.btn-primary    { background: #0b1f33; color: #fff; font-family: 'Geist'; font-size: 14px; font-weight: 500; padding: 8px 16px; border-radius: 6px; }
.btn-cta        { background: #2563eb; color: #fff; border-radius: 6px; }
.btn-outline    { background: transparent; border: 1px solid #d1d5db; color: #374151; border-radius: 6px; }
.btn-destructive{ border: 1px solid #fca5a5; color: #dc2626; border-radius: 6px; }
```
Tamaños: small + default + large. Patrón "Toggle Group" (segmented control) confirmado:

```html
<div class="flex">
  <button class="rounded-l-md border border-gray-300 bg-[#0b1f33] px-4 py-2 text-sm font-medium text-white">Tabla</button>
  <button class="rounded-r-md border border-l-0 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Kanban</button>
</div>
```

### 3.3 Forms — Spot2

```css
input, select, textarea {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: 'Montserrat';
  outline: none;
  transition: border-color .15s, box-shadow .2s;
}
input:focus { border-color: #ffaa00; box-shadow: 0 0 10px rgba(0,0,0,0.15); }
input.error { border: 2px solid #dc2626; }
```

### 3.4 Forms — Colossu

```css
input, select {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-family: 'Geist';
  color: #0b1f33;
  outline: none;
}
input:focus { border-color: #3b82f6; box-shadow: 0 0 0 1px #3b82f6; }
input.error { border: 2px solid #ef4444; }
label       { font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 6px; }
```
Patrones: Profile Form, Input Variants, Create Entity Form (estándar para Empresa/Contrato/Activo).

### 3.5 Cards — Colossu (KPI / chart / detail)

```css
.colossu-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; /* sin shadow o muy sutil */ }
.kpi-value    { font-family: 'Geist'; font-size: 24px; font-weight: 600; color: #0b1f33; }
.kpi-label    { font-size: 12px; font-weight: 500; color: #6b7280; }
.info-card-title { font-size: 14px; font-weight: 600; color: #0b1f33; }
.info-card .label { font-size: 12px; color: #6b7280; }
.info-card .value { font-size: 14px; font-weight: 500; color: #0b1f33; }
```

### 3.6 Navigation — Colossu

```css
.sidebar              { width: 240px; background: #fff; border-right: 1px solid #e5e7eb; position: fixed; font-family: 'Geist'; }
.sidebar-group-label  { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: #9ca3af; }
.sidebar-item         { padding: 8px 12px; border-radius: 6px; font-size: 14px; font-weight: 500; color: #4b5563; }
.sidebar-item.active  { background: #f3f4f6; color: #0b1f33; }
.tab-active           { border-bottom: 2px solid #0b1f33; color: #0b1f33; font-weight: 500; }
.breadcrumb-separator { color: #d1d5db; }
```

### 3.7 Tables — Colossu

```css
.colossu-table       { width: 100%; font-family: 'Geist'; font-size: 14px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.colossu-table th    { font-size: 12px; font-weight: 500; color: #6b7280; padding: 12px 16px; background: rgba(249,250,251,0.8); }
.colossu-table td    { padding: 12px 16px; color: #333; border-bottom: 1px solid #f3f4f6; }
.table-toolbar .cta  { background: #3b82f6; color: #fff; }
.table-link          { color: #3b82f6; font-weight: 500; }
```

### 3.8 Badges / Status pills

```css
.badge          { display: inline-flex; gap: 4px; border-radius: 9999px; padding: 2px 10px; font-size: 12px; font-weight: 500; font-family: 'Geist'; }
.badge-green    { background: #dcfce7; color: #15803d; }   /* Activo / Success */
.badge-yellow   { background: #fef9c3; color: #a16207; }   /* Borrador / Pending */
.badge-red      { background: #fee2e2; color: #b91c1c; }   /* Error / Vencido */
.badge-blue     { background: #dbeafe; color: #1d4ed8; }   /* Info */
.badge-outline  { border: 1px solid #d1d5db; color: #4b5563; }    /* Inactivo neutral */
.badge-orange   { border: 1px solid #fdba74; color: #ea580c; background: #fff7ed; } /* Warning */
```

### 3.9 Avatars

```css
.avatar       { display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; font-weight: 600; color: #fff; }
.avatar-sm    { width: 24px; height: 24px; font-size: 10px; }
.avatar-md    { width: 32px; height: 32px; font-size: 12px; }
.avatar-lg    { width: 40px; height: 40px; font-size: 14px; }
.avatar-xl    { width: 56px; height: 56px; font-size: 16px; }
.avatar-group > * + * { margin-left: -8px; }
.avatar-group .avatar { border: 2px solid #fff; }
```

### 3.10 Header / Breadcrumb (Spot2)

```css
.nav-header        { background: #fff; position: sticky; top: 0; z-index: 50; border-bottom: 1px solid #e5e5e5; font-family: 'Montserrat'; }
.nav-link          { color: #737373; font-size: 13px; font-weight: 500; }
.nav-link:hover    { color: #424552; }
.breadcrumb-active { color: #e69900; font-weight: 500; }
```

### 3.11 Iconos

Ladrillo declara **14 iconos únicos detectados** y especifica librería **Lucide React** (predominantly filled style). 4 size-classes:

| Clase | Tamaño aprox |
|---|---|
| icon-xs | 16px |
| icon-sm | 20px |
| icon-md | 24px |
| icon-lg | 32px |

---

## 4. Patrones de composición

| Layout | Estructura |
|---|---|
| **Dashboard** | Sidebar + KPI row + grid de charts |
| **List / Table** | Sidebar + título + filter bar + data table + pagination |
| **Detail** | Sidebar + breadcrumbs + título + tabs + content (a veces con sidebar derecho) |
| **Settings** | Sidebar + título + settings tabs + form |

Detail-pages con **sidebar derecho** (`detail-sidebar`) para info contextual y `info-card` con bordered container + section title uppercase muted.

Pattern empty-state: centered text + muted styling + optional icon.

Pattern paginación: bordered bar fondo blanco + flechas + número de página + texto "X-Y of Z".

---

## 5. Accesibilidad — estado actual

Score 77 (945 pasando / 280 fallando). **Pares fallando críticos:**

| FG | BG | Ratio | Componente | Conteo |
|---|---|---|---|---|
| `#ffffff` | `#25d366` | 1.98:1 | **WhatsApp buttons** | 150 |
| `#ffffff` | `#cccdd1` | 1.59:1 | **Disabled buttons** | 114 |
| `#424552` | `#000000` | 2.20:1 | Texto sobre dark | 8 |

**Pares pasando AAA:** `#424552` sobre `#ffffff` (8.74), `#424552` sobre `#f6f8fb` (8.95), `#ffffff` sobre `#1c1f2a` (16.42), `#ffffff` sobre `#000000` (21).

**Implicación para esta tarea:** evitar `#fff` sobre verde/amber sin mejorar contraste. El botón "Activo" como pill verde debe usar `#15803d` sobre `#dcfce7` (badge), NO blanco sobre `#25d366`.

---

## 6. Gaps identificados en Ladrillo (para feedback al equipo)

1. **Sin tokens nombrados para Colossu** — todo el sistema (Deep Navy `#0b1f33`, Action Blue `#3b82f6`, gray scale shadcn) está hardcoded como hex. Se necesita una sección `--color-colossu-*` paralela a `--color-spot-*`.
2. **No documenta Status Pill como componente independiente** — solo Badges genéricos. Para forms se necesitan variantes Activo/Inactivo/Borrador semánticas.
3. **No documenta Toggle / Switch** binario — solo "Toggle Groups" (segmented). Falta el switch para "Activar formulario".
4. **No documenta Tabs Component formal** — solo `.tab-active` clase suelta. Falta anatomía de tabs (rail, indicator, hover state).
5. **No documenta bloque de código con copy button** — necesario para el snippet de instalación del embed.
6. **No documenta drag-and-drop list** — necesaria para reordenar campos del formulario.
7. **No documenta multi-select chip** — necesario para asignar agentes.
8. **Familias tipográficas duplicadas** — el HTML carga Montserrat + Inter + Geist; en la práctica solo se usan Montserrat (Spot2) y Geist (Colossu). Inter parece huérfana.
9. **Score de accesibilidad bajo (77)** — botones disabled y WhatsApp tienen contraste insuficiente.
10. **Sin documentación de validación inline en forms** — solo se ve `input.error { border: ... }` pero no el mensaje de error, posición, tipografía.

---

## 7. Tokens recomendados a crear en Figma (Variables Collection)

Para esta tarea se necesitan estas variables (a crear en `cc-figma-tokens` si no existen):

**Primitives:**
- Todos los colores Spot brand + neutrals + semantic
- Geist + Montserrat font weights 300–700
- Spacing scale 2/4/8/12/16/20/24/32/40/48/64
- Radius 4/6/8/12/24/9999
- Shadow xs/sm/md/lg/xl

**Semantic (Colossu):**
- `surface/background` = `#ffffff`
- `surface/subtle` = `#f6f8fb`
- `surface/sidebar` = `#ffffff`
- `border/default` = `#e5e7eb`
- `border/strong` = `#d1d5db`
- `text/primary` = `#0b1f33`
- `text/secondary` = `#6b7280`
- `text/muted` = `#9ca3af`
- `action/primary/bg` = `#0b1f33`
- `action/primary/fg` = `#ffffff`
- `action/cta/bg` = `#3b82f6`
- `action/destructive/border` = `#fca5a5`
- `feedback/success/bg` = `#dcfce7` / `fg` = `#15803d`
- `feedback/warning/bg` = `#fef9c3` / `fg` = `#a16207`
- `feedback/danger/bg` = `#fee2e2` / `fg` = `#b91c1c`
- `feedback/neutral/bg` = `transparent` / `fg` = `#4b5563` (con border `#d1d5db`)

---

## 8. Estado del scraping

| Item | Estado |
|---|---|
| Tokens (CSS vars) | ✅ extraídos de `index.css` |
| Brand / neutral / semantic colors | ✅ del `colors:{}` del JS |
| Type scale | ✅ del `typeScale:[]` del JS |
| Spacing scale | ✅ del `tokens:[]` del JS |
| Border radius | ✅ del `borderRadius:[]` del JS |
| Shadows | ✅ del CSS Tailwind |
| Component code samples | ✅ 10 samples CSS extraídos del bundle |
| Component descriptions | ✅ 133 (title, description) pares extraídos |
| Iconos individuales | ⚠️ solo el conteo (14) y la familia (Lucide); no la lista completa |
| **Screenshots PNG @1440** | ⏳ pendiente — Ladrillo es SPA Vite y se necesita un browser (Chrome MCP o Playwright). El JS bundle no expone los SVGs de los componentes individualmente. |

**Nota sobre screenshots:** El task original pedía screenshots a `/ds-screenshots/`. Para hacerlo necesitamos resolver: (a) la conexión múltiple de Claude in Chrome (hay dos browsers conectados) eligiendo cuál usar, o (b) instalar Playwright vía pip (~150 MB). Si decidís que sí los necesitás antes de la Fase 2, indicame con cuál vamos.
