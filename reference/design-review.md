# Design Review — Form Editor v1 (Redesign)

> Auditoría consolidada de los 5 frames en Figma `hGdKaXdCTWKrxhAYuiIt8V` aplicando: Nielsen 10 Heurísticas, principios Refactoring UI, consistencia cross-componente y feasibilidad shadcn.
> Fecha: 2026-04-22.

**Severidades:** 🔴 4 = bloquea / pérdida de datos · 🟠 3 = degrada UX significativamente · 🟡 2 = molesto, no bloquea · 🟢 1 = pulido.
**Lo accionable** está marcado **TODO** y agrupado al final.

---

## Resumen ejecutivo

| Severidad | Cantidad | Áreas principales |
|---|---|---|
| 🔴 Crítico | 0 | — |
| 🟠 Alto (3) | 4 | Validación inline, save-with-errors, falta keyboard shortcut, sin reactivar CTA en empty-state |
| 🟡 Medio (2) | 8 | Cancelar afordancia débil, switch verde inconsistente, mobile description clip, tabs sin íconos, mensaje de inactividad sin CTA, helper verboso, "etiqueta de fuente (source)" bilingüe, sin sticky nav |
| 🟢 Bajo (1) | 7 | Íconos placeholder, asterisco posicionado raro, breadcrumb tamaño, browser dots, "9:41" status bar mock, edit icon mock, helper/breadcrumb compiten |

**Top 3 a resolver antes de implementar:**
1. **Validación inline en tiempo real** del campo "Etiqueta de fuente" (no esperar al Guardar).
2. **Estado del botón Guardar** debe reflejar errores: contador de errores o estado disabled.
3. **CTA "Reactivar formulario"** dentro del empty-state cuando el form está inactivo.

---

## Frame 01 — Default

### Heurísticas Nielsen

| # | Principio | Hallazgo | Sev |
|---|---|---|---|
| H1 | Visibility of system status | Status pill, tab indicator, switch ON, breadcrumb — todos comunican estado correcto | ✓ |
| H2 | Match real world | "Etiqueta de fuente (source)" mezcla español + inglés. Inconsistente con resto de UI 100% en español. **TODO:** renombrar a "Etiqueta de origen" o solo "Source label" | 🟡 |
| H3 | User control and freedom | Cancelar como ghost button tiene afordancia muy débil contra el fondo blanco — fácil de no ver. **TODO:** considerar Cancelar como secondary outlined | 🟡 |
| H4 | Consistency and standards | Switch ON usa `feedback/success/fg` (#15803d, verde oscuro), pero el pill Activo usa `feedback/success/bg` (verde claro #dcfce7) con texto verde oscuro. Dos verdes "active" distintos en el mismo viewport. **TODO:** unificar — el switch ON debe usar el mismo `feedback/success/fg` para tracking semántico, o usar `colossu/navy` como afirmativo | 🟡 |
| H5 | Error prevention | El requisito kebab-case está como helper text estático, no como validación reactiva mientras se escribe. Ver Frame 03 | 🟠 |
| H6 | Recognition over recall | Las 5 tabs son texto puro. Para usuarios que entran ocasionalmente al editor, recordar qué hay en cada tab requiere abrirlas. **TODO:** agregar íconos Lucide pequeños (Settings, ListChecks, Target, MessageCircle, Code) | 🟡 |
| H7 | Flexibility/efficiency | No se ve atajo Cmd+S para Guardar. **TODO:** agregar tooltip al botón Guardar con shortcut, o caption pequeño debajo | 🟠 |
| H8 | Aesthetic / minimalist | Toggle row description (15 palabras) es verbosa. **TODO:** acortar a "Si está inactivo, se mostrará el mensaje en lugar de los campos" (12 palabras, mismo significado) | 🟢 |
| H9 | Recover from errors | Sin frame de error de Guardado de red. Solo se diseñó error de validación inline (Frame 03) | 🟢 |
| H10 | Help and documentation | No hay link de ayuda visible desde Datos. Solo en tab Instalación. **TODO:** agregar "?" icon en header next to "Editar" que abre Help Drawer | 🟡 |

### Refactoring UI

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Jerarquía | Título 22px Semi Bold > etiquetas 13px Medium > helper 12px Regular. Bien escalonado. | ✓ |
| Color | Navy + accent verde para success. Excelente contraste (navy/white ≈ 16:1 AAA) | ✓ |
| Espaciado | 24px entre secciones, 6px label/input, 4px helper. Sigue Gestalt (proximidad). | ✓ |
| Tipografía | Geist en todo, escalado consistente. ✓ | ✓ |
| Densidad | Card de configuración ocupa 60% del ancho con mucho whitespace. Para forms con muchos campos, podría sentirse vacía en Datos pero llenarse en Campos. Aceptable. | ✓ |
| Sombras | Preview card tiene `shadow-md` (4px y), Configuración card no tiene shadow — solo border. **TODO:** decidir paridad — o ambas con shadow sutil, o ambas con solo border. La distinción actual sugiere que Preview es más "elevado" lo cual es correcto (es contenido inmutable / de salida) | 🟢 |
| Pill semántico | Activo dot 6px en bg verde claro 22px alto — el dot es chico relativo. **TODO:** subir dot a 8px para mejor balance visual | 🟢 |
| Asterisk required (form preview) | El `*` rojo se renderiza con line-height grande (parece flotar arriba). **TODO:** usar fontSize 12 + lineHeight:16 idéntico al label | 🟢 |
| Sidebar navigation icons | Cuadrados grises placeholder. Aceptable para v1 mock pero **TODO:** sustituir por Lucide en handoff | 🟢 |
| Edit pencil icon junto al nombre | Cuadrado gris placeholder. **TODO:** Pencil icon Lucide 14px | 🟢 |

---

## Frame 02 — Tab hover (Campos)

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Visibilidad del estado | El cambio a `action/ghost/bg-hover` (gris muy claro) es muy sutil. Un usuario con monitor brillante puede no notarlo. **TODO:** además del bg, oscurecer el texto del tab a `text/secondary` y mostrar un cursor:pointer apparent + transición 150ms en código | 🟡 |
| Anotación de estado | El frame no tiene cursor visible (limitación Figma). **TODO:** agregar callout "👆 hover" o similar como anotación para handoff dev | 🟢 |

---

## Frame 03 — Validación error

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Visibilidad del error | Borde rojo 2px + mensaje rojo Medium debajo. Patrón estándar y reconocible. ✓ | ✓ |
| H9 — Help diagnose | Mensaje "Tiene espacios — usá kebab-case (ej. renta-oficinas-polanco)" — es accionable y muestra ejemplo. ✓ | ✓ |
| Falta ícono | El mensaje de error no tiene ícono leading. **TODO:** agregar `AlertCircle` Lucide 14px en `feedback/danger/fg` antes del texto. Ayuda accesibilidad (signo no solo cromático) | 🟡 |
| Auto-corrección | No hay botón "Reemplazar con `renta-oficinas-polanco`" ni autocomplete. Para un slug field es un patrón muy útil (ej. GitHub repo names). **TODO:** sugerir corrección en una chip clickeable debajo del error | 🟡 |
| Save button still enabled | El botón "Guardar cambios" sigue navy/primary aunque hay un error de validación abajo. Usuario puede clickearlo y recibir error tras submit (mal UX). **TODO:** o disabled cuando hay errores, o pill rojo "1 error" junto al botón Guardar como advertencia previa | 🟠 |
| Validación reactiva | El error solo apareció en este frame (asumimos post-submit). **TODO:** validar mientras el usuario escribe (debounce 400ms) y limpiar el error en cuanto cumpla el patrón | 🟠 |
| Color contraste | `#b91c1c` sobre `#ffffff` ≈ 7.2:1 AAA ✓ | ✓ |
| Borde rojo + label | El label "Etiqueta de fuente (source)" sigue gris. **TODO:** opcionalmente teñir el label en rojo también para reforzar el estado de error (patrón Material) | 🟢 |

---

## Frame 04 — Preview Mobile

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Toggle desktop/mobile | Cambio claro: bg blanco con shadow sobre el segmento Mobile. ✓ | ✓ |
| Device frame | Width 300px, radius 24, status bar 9:41 — buena evocación de mobile. ✓ | ✓ |
| Texto descriptivo se clipea | "Dejanos tus datos y un asesor te contacta en..." está cortado en el borde derecho del preview. Bug de wrapping en el clone. **TODO:** aplicar `layoutSizingHorizontal=FILL` al text node del subtítulo en el clone (también en el frame original donde el problema persiste discretamente) | 🟡 |
| Status bar "9:41 ●●●●" | Mock decente pero no representa iOS real (carrier + wifi + battery). Aceptable como mock; **TODO:** si querés realismo, importar componente status bar de iOS 26 UI Kit (está disponible en libraries comunitarias) | 🟢 |
| Centrado horizontal | El device frame está centrado en su contenedor. ✓ | ✓ |
| Stack vertical email/teléfono | Buen comportamiento responsive — campos de 1 columna en mobile. ✓ | ✓ |
| Submit button | Sigue navy (correcto para Colossu unificado). En el form embedido real, posiblemente cliente quiera un color personalizable. **TODO:** considerar exponer `primaryColor` como prop del embed (fuera de scope) | 🟢 |

---

## Frame 05 — Formulario Inactivo

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Pill "Inactivo" amber | Bien. Comunica "advertencia/pause" mejor que gris neutro (más atención que un estado pasivo). ✓ | ✓ |
| Switch OFF | Bg gris, knob a la izquierda. ✓ | ✓ |
| Empty state preview | Patrón ícono + título + descripción centrado. Estándar y bueno. ✓ | ✓ |
| Falta CTA "Reactivar" | El empty state no ofrece acción directa para reactivar. Usuario tiene que escanear hasta el switch para reactivar. **TODO:** agregar botón ghost/secondary "Reactivar formulario" debajo del mensaje, que togglea el switch | 🟠 |
| Ícono `!` placeholder | Es un signo de exclamación texto. **TODO:** sustituir por Lucide `PauseCircle` o `Pause` (semánticamente "pausa", no "error") | 🟢 |
| Mensaje del empty state es customizable | El brief original dice que esto es el "Mensaje de inactividad" del tab Mensajes. **TODO:** validar que el preview lee de ese campo configurable, no es texto hardcoded — agregar nota visual "↻ usa el mensaje configurado en Mensajes" (sutil) | 🟡 |
| Sin tab Mensajes activa | El usuario está en tab Datos viendo el preview de inactividad. Esto puede ser confuso ("¿dónde edito ese mensaje?"). **TODO:** agregar link sutil en el empty state: "Editar mensaje →" que cambia a tab Mensajes | 🟡 |

---

## Consistencia cross-frame

| Aspecto | Hallazgo | Sev |
|---|---|---|
| Sidebar idéntico | ✓ | ✓ |
| Header chrome idéntico | ✓ | ✓ |
| Tabs en posición consistente | ✓ | ✓ |
| Pill verde / amber siguen patrón dot+label | ✓ | ✓ |
| Switch ON/OFF | ON usa verde oscuro, OFF gris. Patrón estándar shadcn ✓ | ✓ |
| Variables semánticas vs hardcoded | Todos los colores están bound a variables `Colossu/Semantic`. Excelente para theming futuro y dark mode si se quiere agregar | ✓ |
| Falta de modo oscuro | El kit Colossu (según Ladrillo) no tiene dark mode. Las variables están preparadas para soportarlo (multi-mode collection). Decisión de producto | 🟢 |
| Sticky behavior del header en scroll | Diseñado como sticky en spec, pero los frames son estáticos a 1024px. **TODO:** documentar para dev — `position: sticky; top: 0; z-index: 50; background: var(--surface-background); border-bottom: 1px solid var(--border-default);` | 🟡 |

---

## Mapeo shadcn

Cada componente del diseño tiene equivalente directo en shadcn/ui. El handoff a código es viable sin custom components.

| Componente del diseño | shadcn primitive | Notas |
|---|---|---|
| App Sidebar | `Sidebar` (`@/components/ui/sidebar`) | Group label + nav items + footer user — mapea 1:1 |
| Page Header | Custom layout sobre `Card` o div | No es un primitive, se compone |
| Breadcrumb | `Breadcrumb` | ✓ |
| Editable name input | `Input` con styling inline (sin border en estado idle, con border en focus) | Usar `Input` con `variant="ghost"` (custom) o el truco `border-transparent focus:border-input` |
| Status pill | `Badge` con `variant` custom (success/warning/draft) | Crear variantes custom en `badge.tsx` con `cva` |
| Buttons | `Button` con variants `default` (primary), `ghost` | ✓ |
| Tabs | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` | ✓ |
| Field (label + input + helper) | `FormField` + `FormLabel` + `FormControl` + `FormMessage` (de `react-hook-form` + shadcn) | Plug-and-play |
| Switch | `Switch` | ✓ |
| Toggle group (Desktop/Mobile) | `ToggleGroup` con `type="single"` | ✓ |
| Card (Configuración + Preview) | `Card` + `CardHeader` + `CardContent` | ✓ |
| Avatar | `Avatar` + `AvatarFallback` | ✓ |
| Empty state (inactive) | Custom — composición de `Card` + ícono Lucide + texto | shadcn no tiene empty-state primitive nativo |

**Conclusión shadcn:** ningún componente requiere construir desde cero. El sistema mapea limpiamente. La única "custom" sería Status Pill (variantes adicionales del Badge) y Empty State (composición). Buen indicador de mantenibilidad futura.

---

## Accesibilidad (WCAG 2.1)

| Check | Estado |
|---|---|
| Texto sobre fondo (body 14 #4b5563 sobre white) | 7.6:1 AAA ✓ |
| Link primary (#3b82f6 sobre white) | 4.6:1 AA ✓ |
| Pill Activo (#15803d sobre #dcfce7) | 4.95:1 AA ✓ |
| Pill Inactivo (#a16207 sobre #fef9c3) | 4.61:1 AA ✓ |
| Botón primary navy (white sobre #0b1f33) | 16.4:1 AAA ✓ |
| Error message (#b91c1c sobre white) | 7.2:1 AAA ✓ |
| Tab activo (#0b1f33 sobre white) | 16.4:1 AAA ✓ |
| Status dot del pill (6px) | El dot es decorativo, no portador de info — el texto siempre acompaña ✓ |
| Switch ON/OFF | El estado se comunica solo por color (verde vs gris). **TODO:** agregar `aria-checked` semántico en código + considerar `data-state` que renderee un check icon dentro del knob para usuarios con daltonismo | 🟡 |
| Icon-only buttons | Editar (lápiz junto al nombre) — no tiene texto visible. **TODO:** agregar `aria-label="Editar nombre"` en código | 🟡 |
| Focus rings | No diseñados en los frames. **TODO:** documentar que en todos los inputs el focus debe usar `border/focus` (var apunta a `blue/500`) con `ring-2 ring-blue-500/20` | 🟡 |

---

## TODO list accionable (priorizado por severidad)

### 🟠 Sev 3 — antes de implementar
- [ ] **Validación inline reactiva** en "Etiqueta de fuente" (debounce 400ms, regex `^[a-z0-9-]+$`, limpiar error al cumplir)
- [ ] **Save button refleja errores**: pill rojo "N errores" junto al botón, o disabled hasta limpiar
- [ ] **Falta tooltip Cmd+S** en botón Guardar cambios (+ binding del shortcut en el view)
- [ ] **CTA "Reactivar formulario"** dentro del empty-state inactivo

### 🟡 Sev 2 — antes de QA / next sprint
- [ ] Renombrar "Etiqueta de fuente (source)" → "Etiqueta de origen" (consistencia de idioma)
- [ ] Cancelar como secondary outlined, no ghost
- [ ] Agregar íconos Lucide a las 5 tabs (Settings, ListChecks, Target, MessageCircle, Code)
- [ ] Help "?" icon en header
- [ ] Unificar verde de switch ON con el verde del pill (mismo token semántico)
- [ ] Hover de tab más visible (oscurecer texto, no solo bg)
- [ ] Validación error: agregar AlertCircle leading icon
- [ ] Validación error: chip de auto-corrección clickeable
- [ ] Mobile preview: arreglar wrap de descripción (`layoutSizingHorizontal=FILL` en el subtítulo)
- [ ] Empty state inactivo: link "↻ Editar mensaje en Mensajes →"
- [ ] Switch state: agregar check icon dentro del knob ON (accesibilidad daltónica)
- [ ] Edit/icon-only buttons: documentar `aria-label`
- [ ] Focus ring spec en handoff
- [ ] Documentar sticky header CSS

### 🟢 Sev 1 — polish
- [ ] Reemplazar todos los íconos placeholder cuadrados por Lucide
- [ ] Pill dot 6px → 8px
- [ ] Asterisco required: ajustar lineHeight para no levitar
- [ ] Acortar descripción del switch (12 palabras)
- [ ] Decidir paridad de shadow en cards (keep current si Preview = elevado)
- [ ] Browser dots (rojo/amber/verde) usar colores macOS reales
- [ ] iOS status bar más realista o reemplazar por componente del UI Kit comunitario
- [ ] Tab inactivo: text/secondary en lugar de text/muted (mejorar legibilidad)

---

## Recomendaciones generales (fuera de la auditoría per-frame)

1. **Tabs no diseñados (Campos / Destino / Mensajes / Instalación):** v1 solo cubre tab Datos. Para una v2 hay que diseñar:
   - **Campos:** lista drag-and-drop con item recipe (handle, label editable, toggle requerido, type select, delete)
   - **Destino:** select pipeline + multi-select agentes con chip removible
   - **Mensajes:** dos textareas con character counter
   - **Instalación:** sub-tabs HTML/iFrame/React + code block con copy + lista de dominios CORS con add/remove

2. **Componentes faltantes en Ladrillo identificados:** documentados en `colossu-design-system.md` sección "Gaps". Recomiendo formalizar:
   - Status Pill como componente con variantes (success/warning/danger/info/neutral)
   - Switch component (no documentado en Ladrillo)
   - Code block + copy button
   - Drag-handle list item

3. **Nombrar tokens Colossu:** los hex `#0b1f33`, `#3b82f6`, `#dcfce7` etc. están hoy hardcoded en JSX de Ladrillo. Las variables que creé en este Figma file (`Colossu / Semantic`) deberían exportarse como CSS vars al codebase real (`--colossu-action-primary-bg`, etc.) — propongo que sea entregable de un sprint paralelo.

4. **Dark mode:** las collections soportan multi-mode. No diseñé el modo oscuro porque está fuera de scope, pero la base está lista para sumarlo en una iteración futura.
