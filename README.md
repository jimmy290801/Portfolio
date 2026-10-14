# Portfolio — Germán Castro Ramos

Portfolio personal de técnico de sistemas junior, infraestructura y automatización.

## Ejecutar localmente

El sitio utiliza módulos JavaScript y carga `data/projects.json` con `fetch`, por lo que debe servirse mediante HTTP en vez de abrir el HTML directamente como archivo.

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Para publicarlo, subir el contenido de esta carpeta al repositorio de GitHub Pages.

## Estructura

- `index.html`: contenido y secciones
- `css/styles.css`: diseño responsive y colores inspirados en el CV
- `js/`: navegación, animaciones y proyectos
- `data/projects.json`: listado editable de proyectos
- `assets/images/profile.png`: fotografía original
