# Los Elegidos

40 discos elegidos por año, desde 1970 a 1999. Tres décadas, 1200 álbumes.

## Cómo funciona

Cada página tiene un selector arriba con 6 servicios de streaming:

- Spotify
- Apple Music
- YouTube Music
- Tidal
- Deezer
- Amazon Music

Tu elección queda guardada en el `localStorage` del navegador. Al hacer clic en un álbum, se abre la búsqueda directa en el servicio que elegiste.

## Estructura

```
/                      Master index — tres décadas
/70s/                  Década 70 — 10 años
/70s/1970              Cada año tiene 40 discos
/80s/                  Década 80
/90s/                  Década 90
/assets/app.js         Lógica del selector de servicio
/assets/app.css        Estilos del selector
```

Sin frameworks. HTML estático + un solo JS chico.

## Deploy

Repo conectado a Vercel. Cada push a `main` redespliega automáticamente.

## Curaduría

Por [Fernando Galaz](https://mstudioprod.com) — director de postproducción.
