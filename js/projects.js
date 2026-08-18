import { getRepositoryMetadata } from "./github.js";

const DATA_URL = "./data/projects.json";

function escapeHtml(value = ""){
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function formatDate(dateString){
  if(!dateString) return "";
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

function renderProject(project){
  const technologies = project.technologies
    .map(tech => `<span class="tag">${escapeHtml(tech)}</span>`)
    .join("");

  const language = project.github?.language
    ? `<span>Lenguaje: ${escapeHtml(project.github.language)}</span>`
    : "";

  const stars = Number.isFinite(project.github?.stars)
    ? `<span>★ ${project.github.stars}</span>`
    : "";

  const updated = project.github?.updatedAt
    ? `<span>Actualizado: ${formatDate(project.github.updatedAt)}</span>`
    : "";

  return `
    <article class="card project-card" data-category="${escapeHtml(project.category)}">
      <div class="project-label">${escapeHtml(project.label)}</div>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.description)}</p>

      <div class="tags">${technologies}</div>

      <div class="project-meta">
        ${language}
        ${stars}
        ${updated}
      </div>

      <div class="project-actions">
        <a class="project-link"
           href="${escapeHtml(project.url)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Abrir ${escapeHtml(project.name)} en GitHub">
          Ver en GitHub
        </a>
      </div>
    </article>
  `;
}

function renderFilters(projects, onFilter){
  const container = document.getElementById("projectFilters");
  if(!container) return;

  const categories = ["Todos", ...new Set(projects.map(p => p.category))];

  container.innerHTML = categories.map((category, index) => `
    <button class="filter-btn${index === 0 ? " active" : ""}"
            type="button"
            data-filter="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");

  container.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");
    if(!button) return;

    container.querySelectorAll(".filter-btn")
      .forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    onFilter(button.dataset.filter);
  });
}

export async function initProjects(){
  const grid = document.getElementById("projectsGrid");
  const status = document.getElementById("projectsStatus");
  if(!grid) return;

  if(status) status.textContent = "Cargando proyectos...";

  const response = await fetch(DATA_URL);
  if(!response.ok){
    throw new Error(`No se pudo cargar ${DATA_URL}: ${response.status}`);
  }

  const projects = await response.json();

  // GitHub API enriches cards with live public repository metadata.
  const enriched = await Promise.all(projects.map(async project => {
    if(!project.repo) return project;
    const github = await getRepositoryMetadata("jimmy290801", project.repo);
    return { ...project, github };
  }));

  function paint(filter = "Todos"){
    const visible = filter === "Todos"
      ? enriched
      : enriched.filter(project => project.category === filter);

    grid.innerHTML = visible.map(renderProject).join("");
    if(status){
      status.textContent = `${visible.length} proyecto${visible.length === 1 ? "" : "s"} mostrado${visible.length === 1 ? "" : "s"}.`;
    }
  }

  renderFilters(enriched, paint);
  paint();
}
