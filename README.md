# CareHome Manager

Sistema de Gestión Integral para Hogar de Ancianos.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | App principal (renombra HogarAncianosManager.html a index.html) |
| `manifest.json` | Configuración PWA |
| `sw.js` | Service Worker (modo offline) |
| `icon-192.png` | Icono 192×192 |
| `icon-512.png` | Icono 512×512 |

## Instalación en GitHub Pages

1. Crea repo nuevo: `carehome-manager`
2. Sube todos los archivos
3. Ve a Settings → Pages → Branch: main → Save
4. URL: `https://dianavelez7dv-create.github.io/carehome-manager/`
5. Abre la URL en Chrome → menú ⋮ → "Instalar aplicación"

## Funciona offline
Una vez instalada, funciona sin internet gracias al Service Worker.
Los datos se guardan en el dispositivo (localStorage).
