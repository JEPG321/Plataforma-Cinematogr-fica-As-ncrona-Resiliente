# Plataforma Cinematografica Asincrona Resiliente

## Contexto rapido del proyecto

Base actual disponible en el repositorio:

- `index.html` ya contiene la estructura principal de la interfaz.
- `styles.css` ya define el diseno visual responsivo.
- `js/app.js` controla el flujo principal de renderizado.
- `js/ui.js` encapsula la manipulacion del DOM y el modal.
- `js/data.js` ya contiene un catalogo mock de peliculas.
- `js/favorites.js` ya maneja favoritos con `localStorage`.

Estado actual de la arquitectura:

- El proyecto ya esta separado en varios archivos JS.
- La aplicacion funciona sin base de datos real.
- Los datos y modulos todavia se exponen con `window.*` e IIFE.
- Aun no se usa arquitectura oficial ESM con `import` y `export`.
- Aun no existe carga concurrente resiliente con `Promise.allSettled`.
- Aun no existe un cache asincrono encapsulado mediante clausuras.

## Cambios que se realizaran

### 1. Migracion a ECMAScript Modules (ESM)

Se modificara la carga de scripts para usar `type="module"` y se refactorizaran los archivos actuales para reemplazar:

- `window.moviesData`
- `window.ui`
- `window.favoritesStore`

por exports e imports reales entre modulos.

### 2. Simulacion de tres servicios backend

Se agregaran servicios independientes para representar:

- Catalogo de peliculas
- Resenas de usuarios
- Anuncios promocionales

Cada servicio respondera con promesas simuladas usando datos mock y retrasos artificiales.

### 3. Orquestacion concurrente resiliente

La carga inicial de la app se movera a un flujo con `Promise.allSettled` para consultar en paralelo los tres servicios.

Comportamiento esperado:

- Si falla Catalogo, la vista principal no puede construirse y se mostrara error principal.
- Si falla Resenas o Anuncios, la aplicacion seguira mostrando el catalogo sin romper la experiencia.
- Los fallos secundarios quedaran controlados y demostrables en el screencast.

### 4. Cache asincrono encapsulado con clausuras

Se agregara una funcion constructora que retorne un objeto con un metodo para filtrar peliculas por genero.

Ese modulo:

- mantendra un objeto privado en memoria como cache
- evitara repetir la promesa simulada cuando se consulta dos veces el mismo genero
- demostrara el uso de clausuras sin variables globales

### 5. Ajustes esperados por archivo

Archivos a modificar:

- `index.html`
- `js/app.js`
- `js/ui.js`
- `js/data.js`
- `js/favorites.js`

Archivos a agregar:

- `js/services/movieService.js`
- `js/services/reviewService.js`
- `js/services/adService.js`
- `js/cache/filterCache.js`
- `js/utils/loadHomeData.js`

## Objetivo final

Dejar la aplicacion lista para demostrar:

- modularidad con ESM
- asincronia realista con promesas simuladas
- resiliencia con `Promise.allSettled`
- cache privado con clausuras
- continuidad de la UI aunque fallen servicios secundarios

## Nota importante

No se necesita base de datos para esta tarea. Todo puede resolverse con frontend, modulos ESM, datos mock y promesas simuladas.
