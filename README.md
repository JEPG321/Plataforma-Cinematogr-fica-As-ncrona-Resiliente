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
- Ya existe carga concurrente resiliente con `Promise.allSettled`.
- Ya existe un cache asincrono encapsulado mediante clausuras.

## Estado de implementacion

### 1. Migracion a ECMAScript Modules (ESM)

Estado: Implementado.

Ya realizado:

- `index.html` ahora carga un unico punto de entrada con `type="module"`.
- `js/app.js` ahora importa dependencias con `import`.
- `js/data.js` ahora exporta `moviesData`.
- `js/ui.js` ahora exporta funciones de interfaz.
- `js/favorites.js` ahora exporta funciones de favoritos.

Validacion realizada:

- la app ya fue probada visualmente en navegador
- la estructura modular ya sirve de base para toda la carga asincrona actual

### 2. Simulacion de tres servicios backend

Estado: Implementado.

Ya realizado:

- `js/services/movieService.js` para catalogo de peliculas.
- `js/services/reviewService.js` para resenas de usuarios.
- `js/services/adService.js` para anuncios promocionales.
- Cada servicio responde con promesas simuladas y retrasos artificiales.
- Resenas y anuncios pueden fallar de forma aleatoria.
- Tambien se puede forzar el fallo desde `sessionStorage` para el screencast.

### 3. Orquestacion concurrente resiliente

Estado: Implementado.

Ya realizado:

- Se agrego `js/utils/loadHomeData.js`.
- La carga inicial ahora usa `Promise.allSettled`.
- Si falla Catalogo, se muestra un error principal de carga.
- Si falla Resenas o Anuncios, el catalogo principal sigue renderizando.
- Se muestran alertas visuales no criticas para evidenciar el fallo controlado.

Comportamiento esperado:

- Si falla Catalogo, la vista principal no puede construirse y se mostrara error principal.
- Si falla Resenas o Anuncios, la aplicacion seguira mostrando el catalogo sin romper la experiencia.
- Los fallos secundarios quedaran controlados y demostrables en el screencast.

### 4. Cache asincrono encapsulado con clausuras

Estado: Implementado.

Ya realizado:

- Se agrego `js/cache/filterCache.js`.
- El modulo expone una funcion constructora que retorna un objeto con el metodo `filterByGenre`.
- El cache interno queda encapsulado en una clausura privada.
- La primera vez que se filtra un genero se simula una promesa asincrona.
- La segunda vez que se consulta el mismo genero se reutiliza el cache privado sin repetir la espera.
- Se dejan trazas en consola con `cache hit` y `cache miss` para la demostracion.

### 5. Ajustes esperados por archivo

Archivos a modificar:

- `index.html`
- `js/app.js`
- `js/ui.js`
- `js/data.js`
- `js/favorites.js`
- `styles.css`

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
- Se agrego una capa de servicios simulados para catalogo, resenas y anuncios.
- Se integro `Promise.allSettled` para cargar los tres servicios en paralelo.
- Se agregaron alertas visuales y paneles de promociones/resenas para evidenciar resiliencia.
- Se conecto el filtro por genero a un cache asincrono encapsulado con clausuras.

Pendiente fuera del codigo:

- grabar el screencast explicativo
- subir o verificar el repositorio final en GitHub

## Objetivo final

Dejar la aplicacion lista para demostrar:

- modularidad con ESM
- asincronia realista con promesas simuladas
- resiliencia con `Promise.allSettled`
- cache privado con clausuras
- continuidad de la UI aunque fallen servicios secundarios

## Nota importante

No se necesita base de datos para esta tarea. Todo puede resolverse con frontend, modulos ESM, datos mock y promesas simuladas.
