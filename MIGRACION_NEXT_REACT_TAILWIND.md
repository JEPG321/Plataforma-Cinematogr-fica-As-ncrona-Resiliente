# Migracion Base a Next.js, React y Tailwind CSS

## Fecha
6 de agosto de 2026

## Objetivo

Migrar la aplicacion actual, construida con `HTML + CSS + TypeScript + manipulacion directa del DOM`, hacia una base moderna con:

- `Next.js`
- `React`
- `Tailwind CSS`
- `TypeScript`

La meta no es solo cambiar tecnologia, sino dejar una estructura mas escalable, mantenible y lista para crecer.

## Estado actual del proyecto

La aplicacion actual ya tiene una ventaja importante: la logica no esta completamente mezclada con la interfaz.

Base identificada:

- [index.html](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\index.html) contiene la estructura principal de la pagina.
- [styles.css](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\styles.css) concentra el diseno visual actual.
- [src/legacy-app/app.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app\app.ts) conserva el flujo principal de la version anterior.
- [src/legacy-app/ui.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app\ui.ts) conserva el renderizado y la manipulacion del DOM de la version anterior.
- [src/legacy-app/favorites.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app\favorites.ts) mantiene la logica de favoritos heredada.
- [src/utils/loadHomeData.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\utils\loadHomeData.ts) orquesta la carga inicial.
- [src/entities/domain.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\entities\domain.ts) define los tipos de dominio.
- [src/services](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\services), [src/mappers](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\mappers) y [src/dtos](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\dtos) ya separan datos, transformacion y consumo.

## Avance real al 6 de agosto de 2026

Estado actual:

- La base de `Next.js + React + Tailwind CSS` ya fue instalada y configurada.
- La aplicacion ya compila correctamente con `npm.cmd run build`.
- Ya existe una primera pantalla funcional montada sobre `App Router`.
- La UI principal ya fue migrada a componentes React con Tailwind.
- La carpeta `src/app/` antigua fue movida a [src/legacy-app](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app) para evitar conflicto con el `app/` de Next.js.
- Los assets de imagen ya fueron llevados a [public/images](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\public\images).

Archivos nuevos o activados en esta etapa:

- [app/layout.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\layout.tsx)
- [app/page.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\page.tsx)
- [app/globals.css](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\globals.css)
- [postcss.config.mjs](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\postcss.config.mjs)
- [src/components](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components)
- [src/lib](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\lib)
- [tsconfig.legacy.json](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\tsconfig.legacy.json)

Funcionalidad ya migrada a React:

- encabezado principal
- selector de idioma
- busqueda
- filtros por genero
- favoritos con `localStorage`
- modal de detalle
- promociones
- resenas
- alertas por fallos controlados

Mejoras adicionales aplicadas el 6 de agosto de 2026:

- correccion de la estructura de tarjetas para evitar botones anidados
- mejora de accesibilidad del modal con `role="dialog"` y `aria-modal="true"`
- cierre del modal al presionar `Escape`
- cierre del modal al hacer clic en el fondo
- enfoque inicial del boton de cierre al abrir el modal
- bloqueo de scroll del `body` mientras el modal esta abierto
- estado de carga visual con skeletons para la grilla principal

Pendiente despues de esta etapa:

- refinar diseno visual para acercarlo o superar la version original
- revisar accesibilidad fina adicional de teclado y foco
- decidir si la carga inicial quedara definitivamente en cliente o si parte de los datos pasara a servidor
- migrar o retirar por completo la base antigua cuando ya no sea necesaria

## Diagnostico tecnico

Lo que ya esta bien:

- Existe separacion entre dominio, servicios, mappers y UI.
- El proyecto ya usa `TypeScript`.
- La carga principal ya esta desacoplada en una funcion reutilizable.
- La app ya tiene logica clara para filtros, favoritos, idiomas, modal y busqueda.

Lo que debe cambiar para la migracion:

- El renderizado actual depende de `document.getElementById`, `innerHTML`, `onclick` y manejo manual del DOM.
- La estructura vive en `index.html`, lo cual no corresponde al modelo de componentes de React.
- `styles.css` esta centralizado como hoja global, en lugar de estar organizado por componentes o utilidades.
- El estado de la interfaz esta distribuido en variables globales dentro de `app.ts`.
- Parte de la logica heredada fue escrita con imports pensados para `tsc` y tuvo que adaptarse para ser compatible con Next.js.

## Decision de arquitectura

La nueva base debe quedar sobre:

- `Next.js` como framework principal
- `React` para el modelo de componentes
- `App Router` de Next.js
- `Tailwind CSS` para estilos
- `TypeScript` como lenguaje principal

## Enfoque de migracion recomendado

La migracion debe hacerse por capas, no reescribiendo todo al mismo tiempo.

### 1. Reutilizar la capa de dominio y datos

Se debe conservar, con ajustes menores si hicieran falta:

- `entities`
- `dtos`
- `mappers`
- `services`
- `utils/loadHomeData.ts`

Estas piezas ya representan una base limpia y portable hacia Next.js.

### 2. Reemplazar la capa de UI actual

Se debe sustituir completamente la logica de:

- `index.html`
- `src/legacy-app/ui.ts`
- la parte de arranque visual de `src/legacy-app/app.ts`

Todo eso debe convertirse a componentes React.

### 3. Mantener la funcionalidad existente

La migracion no debe perder:

- favoritos con `localStorage`
- filtros por genero
- cambio de idioma `es/en`
- busqueda
- modal de detalle
- promociones
- resenas
- alertas por fallos controlados

## Estructura objetivo sugerida

```txt
app/
  layout.tsx
  page.tsx
  globals.css
src/
  components/
    hero.tsx
    filters-bar.tsx
    movies-grid.tsx
    movie-card.tsx
    movie-modal.tsx
    promotion-panel.tsx
    reviews-panel.tsx
    service-alerts.tsx
  lib/
    i18n.ts
    favorites.ts
    selectors.ts
  entities/
  dtos/
  mappers/
  services/
  utils/
public/
  images/
```

## Distribucion de responsabilidades

### `app/page.tsx`

Debe ser la pagina principal de la cartelera.

Responsabilidades:

- recibir o cargar los datos iniciales
- montar la vista principal
- conectar componentes de alto nivel

### `components/`

Cada bloque de interfaz debe quedar desacoplado:

- `Hero`: encabezado principal
- `FiltersBar`: idioma, busqueda y generos
- `MoviesGrid`: grilla principal
- `MovieCard`: tarjeta individual
- `MovieModal`: detalle de pelicula
- `PromotionPanel`: promocion destacada
- `ReviewsPanel`: resenas
- `ServiceAlerts`: alertas de servicios secundarios

### `lib/favorites.ts`

Debe contener la logica cliente de favoritos:

- leer favoritos
- guardar favoritos
- alternar favoritos

Nota:

Esta capa debe protegerse para ejecutarse solo en cliente, porque `localStorage` no existe en el servidor.

### `lib/i18n.ts`

Debe centralizar los textos actualmente definidos en `app.ts`.

Esto ayuda a:

- evitar un archivo de pagina demasiado grande
- mantener escalable el soporte bilingue
- reutilizar textos desde varios componentes

## Estrategia de datos en Next.js

Como el proyecto actual usa datos simulados y servicios locales, la opcion mas simple y ordenada es:

- cargar datos iniciales desde servidor en `page.tsx`
- dejar favoritos, modal y filtros como estado de cliente

Modelo recomendado:

- datos iniciales: `Server Component`
- interaccion de usuario: `Client Components`

Esto permite aprovechar mejor Next.js sin complicar la migracion.

## Estrategia de Tailwind CSS

Tailwind debe usarse como base principal del nuevo estilo.

### Reglas de trabajo

- evitar recrear `styles.css` completo dentro de un solo archivo
- migrar estilos componente por componente
- dejar `globals.css` solo para resets, fuentes, variables y reglas muy generales
- usar clases utilitarias directamente en JSX

### Convencion sugerida

- espaciados consistentes
- tipografia clara
- colores definidos desde variables o tema
- clases condicionales para estados activos, favoritos, filtros y modal

### Complementos utiles

Opcionales pero recomendables:

- `clsx`
- `tailwind-merge`

Sirven para manejar clases dinamicas de forma mas limpia en React.

## Fases de trabajo

### Fase 1. Preparacion del proyecto

Objetivo:

Dejar lista la base tecnica de Next.js.

Tareas:

- inicializar proyecto con `Next.js + TypeScript`
- instalar y configurar `Tailwind CSS`
- mover assets a `public/`
- preparar `app/layout.tsx`
- preparar `app/page.tsx`
- crear `globals.css`

Estado:

Completada el 6 de agosto de 2026.

### Fase 2. Migracion del dominio reutilizable

Objetivo:

Reusar lo que ya esta bien hecho.

Tareas:

- mover `entities`
- mover `dtos`
- mover `mappers`
- mover `services`
- mover `utils/loadHomeData.ts`
- ajustar imports a la nueva estructura

Estado:

Completada en su primera version el 6 de agosto de 2026.

### Fase 3. Migracion de la interfaz

Objetivo:

Reemplazar la UI basada en DOM por componentes React.

Tareas:

- construir `Hero`
- construir `FiltersBar`
- construir `MoviesGrid`
- construir `MovieCard`
- construir `PromotionPanel`
- construir `ReviewsPanel`
- construir `MovieModal`
- construir `ServiceAlerts`

Estado:

Ya iniciada y funcional el 6 de agosto de 2026.

Avance agregado el 6 de agosto de 2026:

- tarjetas de pelicula corregidas para una estructura HTML valida
- acciones separadas para detalle y favoritos
- modal con mejor semantica accesible

### Fase 4. Estado e interactividad

Objetivo:

Recuperar toda la experiencia de usuario actual.

Tareas:

- migrar favoritos a hooks cliente
- migrar filtros por genero
- migrar busqueda
- migrar cambio de idioma
- migrar apertura y cierre del modal
- migrar contador de favoritas

Estado:

Implementada en la primera pantalla migrada.

Avance agregado el 6 de agosto de 2026:

- cierre con `Escape`
- cierre por backdrop
- bloqueo de scroll mientras el modal esta abierto
- carga visual inicial con skeletons

### Fase 5. Estilo final con Tailwind

Objetivo:

Dejar la app visualmente consistente y responsiva.

Tareas:

- convertir estilos actuales a utilidades Tailwind
- ajustar responsive en mobile, tablet y desktop
- mantener jerarquia visual
- revisar hover, focus y accesibilidad

Estado:

Iniciada, pero aun pendiente de refinamiento visual y accesibilidad fina.

Avance agregado el 6 de agosto de 2026:

- ya existe una primera capa de estados visuales para loading
- la base visual ya no depende de `styles.css` para la pantalla principal

### Fase 6. Validacion final

Objetivo:

Comprobar que la migracion no rompio funcionalidad.

Tareas:

- verificar carga inicial
- verificar modal
- verificar favoritos
- verificar filtros
- verificar idioma
- verificar busqueda
- verificar promociones y resenas
- verificar estados de error controlado

Estado:

Validacion tecnica inicial completada con `npm.cmd run build` el 6 de agosto de 2026.

Validaciones acumuladas al 6 de agosto de 2026:

- compilacion exitosa despues del bootstrap de Next.js
- compilacion exitosa despues de los ajustes de accesibilidad e interaccion

## Criterios de exito

La migracion se considerara correcta si:

- la app corre sobre `Next.js`
- la UI esta construida con `React`
- el estilo principal usa `Tailwind CSS`
- se conserva la funcionalidad actual
- la estructura queda lista para escalar
- el codigo queda mas mantenible que la version actual

## Riesgos a cuidar

### 1. Mezclar demasiado CSS viejo con Tailwind

Riesgo:

Duplicidad de estilos y mantenimiento confuso.

Medida:

Migrar bloques completos en lugar de mezclar por mucho tiempo ambos enfoques.

### 2. Usar `localStorage` en componentes de servidor

Riesgo:

Errores de ejecucion en Next.js.

Medida:

Encapsular favoritos en componentes cliente o helpers protegidos.

### 3. Reescribir logica ya estable

Riesgo:

Introducir errores donde hoy ya existe funcionalidad correcta.

Medida:

Reutilizar servicios, dominio y mapeadores siempre que sea posible.

### 4. Perder la separacion actual

Riesgo:

Mover todo a un `page.tsx` gigante.

Medida:

Dividir claramente por componentes y utilidades.

## Orden de trabajo recomendado

1. Crear base `Next.js + Tailwind`.
2. Mover datos, dominio y servicios.
3. Crear la pagina principal en React.
4. Separar componentes visuales.
5. Migrar estado e interacciones.
6. Ajustar estilos finales.
7. Probar toda la aplicacion.

## Estado actual por archivos

Base Next.js:

- [app/layout.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\layout.tsx)
- [app/page.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\page.tsx)
- [app/globals.css](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\app\globals.css)

Componentes React ya creados:

- [src/components/home-experience.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\home-experience.tsx)
- [src/components/hero.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\hero.tsx)
- [src/components/filters-bar.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\filters-bar.tsx)
- [src/components/movies-grid.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\movies-grid.tsx)
- [src/components/movie-card.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\movie-card.tsx)
- [src/components/movie-modal.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\movie-modal.tsx)
- [src/components/promotion-panel.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\promotion-panel.tsx)
- [src/components/reviews-panel.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\reviews-panel.tsx)
- [src/components/service-alerts.tsx](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\components\service-alerts.tsx)

Utilidades nuevas:

- [src/lib/i18n.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\lib\i18n.ts)
- [src/lib/favorites.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\lib\favorites.ts)
- [src/lib/selectors.ts](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\lib\selectors.ts)

Compatibilidad temporal con la version anterior:

- [src/legacy-app](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app) conserva la implementacion original mientras terminamos la migracion.

## Estado del frente migrado

La pantalla principal ya funciona sobre React y Tailwind, y en esta etapa quedo reforzada en tres aspectos importantes:

- estructura HTML mas correcta en las tarjetas
- mejor experiencia de carga inicial
- mejor comportamiento accesible del modal

## Resultado esperado

Al terminar, el proyecto debe pasar de una app basada en HTML estatico y renderizado manual a una aplicacion moderna con componentes reutilizables, mejor manejo de estado y una base mucho mas profesional para futuras ampliaciones.

## Siguiente paso recomendado

El siguiente paso practico ya no es crear la base, porque esa parte ya quedo lista el 6 de agosto de 2026.

Lo siguiente ahora debe ser:

- refinar el diseno Tailwind de la pagina principal
- mejorar accesibilidad del modal y navegacion por teclado
- decidir si `loadHomeData.ts` seguira completamente en cliente o si parte pasara a servidor
- migrar o desmontar la implementacion heredada de [src/legacy-app](C:\Users\josep\OneDrive\Documentos\Laboratorio 2\src\legacy-app)
