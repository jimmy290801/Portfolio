# Portfolio — Germán Castro Ramos

Portfolio profesional orientado a perfiles de IT, sistemas, DevOps, infraestructura, automatización y desarrollo.

## Características

- HTML semántico y diseño responsive.
- CSS separado y mantenible.
- JavaScript ES Modules.
- Proyectos cargados dinámicamente desde JSON.
- Filtros de proyectos sin recargar la página.
- Integración con la API pública de GitHub para mostrar metadatos reales de los repositorios.
- Navegación activa según la sección visible.
- Animaciones con IntersectionObserver.
- Menú responsive.
- Soporte para `prefers-reduced-motion`.
- Despliegue estático compatible con GitHub Pages.

## Estructura

```text
Portfolio/
├── assets/
│   └── images/
│       └── profile.png
├── css/
│   └── styles.css
├── data/
│   └── projects.json
├── js/
│   ├── github.js
│   ├── main.js
│   ├── navigation.js
│   └── projects.js
├── index.html
├── LICENSE
└── README.md
```

## Stack

HTML5 · CSS3 · JavaScript ES6+ · JSON · GitHub REST API · GitHub Pages

## Añadir un proyecto

Solo hay que editar `data/projects.json`. La sección de proyectos se genera automáticamente desde JavaScript.

Ejemplo:

```json
{
  "name": "Nombre del proyecto",
  "repo": "nombre-del-repositorio",
  "category": "DevOps",
  "label": "Infrastructure",
  "description": "Descripción breve del proyecto.",
  "technologies": ["Docker", "Linux"],
  "url": "https://github.com/usuario/repositorio",
  "featured": true
}
```

## Desarrollo local

Al utilizar `fetch()` para cargar `data/projects.json`, es recomendable servir el proyecto con un servidor local en vez de abrir `index.html` directamente.

Por ejemplo:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Despliegue

El proyecto está preparado para GitHub Pages. Configura el repositorio para desplegar desde la rama `main` y la carpeta raíz `/`.

## Autor

Germán Castro Ramos

- Portfolio: https://jimmy290801.github.io/Portfolio/
- LinkedIn: https://www.linkedin.com/in/germancastroramos/
- GitHub: https://github.com/jimmy290801
