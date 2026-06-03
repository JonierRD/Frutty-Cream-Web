# Frutty Cream Web

Sitio web empresarial y responsivo para Frutty Cream, heladeria ubicada en Mocoa, Putumayo. El proyecto fue desarrollado como actividad ABP usando HTML5, CSS3, JavaScript y Bootstrap 5.

## Objetivo

Presentar una pagina web completa para una organizacion del Putumayo, con navegacion clara, contenido empresarial, funcionalidades interactivas y despliegue en linea.

## Tecnologias

- HTML5 semantico
- CSS3 personalizado
- JavaScript
- Bootstrap 5
- Leaflet y OpenStreetMap para mapa interactivo
- LocalStorage para preferencias del usuario

## Paginas

- `index.html`: pagina principal, hero, sabores, promociones y accesos.
- `pages/Nosotros.html`: informacion de Frutty Cream, ubicacion y mapa interactivo.
- `pages/Productos.html`: catalogo, precios, filtros y modales de detalle.
- `pages/galeria.html`: galeria interactiva con lightbox y reacciones.
- `pages/Promociones.html`: promociones, favoritos y sabor favorito.
- `pages/Contacto.html`: formulario de contacto validado y datos de la empresa.

## Funcionalidades

- Navegacion consistente en todas las paginas.
- Diseno responsive para celular, tablet y escritorio.
- Formulario de contacto con validacion.
- Galeria de imagenes con lightbox, navegacion y corazones guardados.
- Mapa interactivo con Leaflet/OpenStreetMap.
- Filtros y ordenamiento de productos por precio.
- Modales de detalle para productos.
- Favoritos y sabor favorito guardados con LocalStorage.
- Animaciones y transiciones CSS.

## Estructura

```text
Frutty-Cream-Web/
+-- index.html
+-- pages/
|   +-- Nosotros.html
|   +-- Productos.html
|   +-- galeria.html
|   +-- Promociones.html
|   +-- Contacto.html
+-- css/
+-- js/
+-- img/
```

## Equipo

- Jonier: navbar, layout, responsive, home, footer y contacto.
- Yhan: productos, catalogo, cards, precios, filtros y modales.
- Jorge: galeria interactiva, lightbox, reacciones y animaciones.
- Junior: promociones, API de mapa y LocalStorage.
- Sidney: contacto inicialmente; la parte fue asumida por Jonier.

## Requisitos ABP Cubiertos

- Minimo 5 paginas interconectadas.
- Navegacion consistente.
- Diseno responsive mobile-first.
- Estructura semantica HTML5.
- Formulario de contacto con validacion.
- Galeria de imagenes interactiva.
- Consumo de API externa mediante mapa.
- Interactividad con filtros, modales, lightbox y favoritos.
- Almacenamiento local de preferencias.
- CSS3 personalizado y Bootstrap 5.
- Animaciones CSS y diseno coherente.

## Uso Local

Abrir `index.html` en el navegador. Para que el mapa cargue correctamente, se recomienda usar conexion a internet porque Leaflet y OpenStreetMap se cargan desde CDN.

## Despliegue

El sitio debe publicarse en GitHub Pages u otro servicio de hosting estatico antes de la sustentacion.
