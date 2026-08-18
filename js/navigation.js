export function initActiveNavigation(){
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = links
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if(!sections.length || !("IntersectionObserver" in window)) return;

  const linkById = new Map(
    links.map(link => [link.getAttribute("href").slice(1), link])
  );

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if(!visible) return;

    links.forEach(link => link.classList.remove("active"));
    linkById.get(visible.target.id)?.classList.add("active");
  }, {
    rootMargin: "-30% 0px -60% 0px",
    threshold: [0, 0.15, 0.35, 0.6]
  });

  sections.forEach(section => observer.observe(section));
}
