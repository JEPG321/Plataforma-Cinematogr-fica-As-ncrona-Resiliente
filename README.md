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
- La migracion base a ESM ya inicio y la app ahora usa `type="module"` en `index.html`.
- Los modulos principales ya dejaron de depender de `window.*`.
- Aun no existe carga concurrente resiliente con `Promise.allSettled`.
- Aun no existe un cache asincrono encapsulado mediante clausuras.

## Cambios que se realizaran

### 1. Migracion a ECMAScript Modules (ESM)

Estado: En progreso avanzado.

Ya realizado:

- `index.html` ahora carga un unico punto de entrada con `type="module"`.
- `js/app.js` ahora importa dependencias con `import`.
- `js/data.js` ahora exporta `moviesData`.
- `js/ui.js` ahora exporta funciones de interfaz.
- `js/favorites.js` ahora exporta funciones de favoritos.

Pendiente dentro de esta fase:

- validar visualmente la app en navegador
- limpiar textos con caracteres rotos en HTML si hiciera falta
- continuar con servicios asincronos sobre esta base modular

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

## Avance realizado hasta ahora

Cambios ya aplicados:

- Se actualizo `index.html` para usar un solo script modulo.
- Se elimino la dependencia de variables globales en los modulos JS principales.
- Se convirtio la base actual a una estructura preparada para `import` y `export`.
- Se mantuvo la logica principal de renderizado, filtros y favoritos sobre la nueva estructura.

Siguiente bloque recomendado:

- crear `movieService.js`, `reviewService.js` y `adService.js`
- simular retrasos y errores controlados
- integrar `Promise.allSettled` en la carga inicial

## Objetivo final

Dejar la aplicacion lista para demostrar:

- modularidad con ESM
- asincronia realista con promesas simuladas
- resiliencia con `Promise.allSettled`
- cache privado con clausuras
- continuidad de la UI aunque fallen servicios secundarios

## Nota importante

No se necesita base de datos para esta tarea. Todo puede resolverse con frontend, modulos ESM, datos mock y promesas simuladas.
