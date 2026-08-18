import { initProjects } from "./projects.js";
import { initActiveNavigation } from "./navigation.js";

const phrases = [
  "Administrando sistemas Linux y servicios...",
  "Automatizando tareas con Python y Bash...",
  "Desplegando aplicaciones con Docker...",
  "Integrando servicios mediante APIs y webhooks...",
  "Monitorizando sistemas con Zabbix y Grafana..."
];

function initTypewriter(){
  const typewriterText = document.getElementById("typewriter-text");
  if(!typewriterText) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeWriter(){
    const phrase = phrases[phraseIndex];

    if(deleting){
      typewriterText.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
    }else{
      typewriterText.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = deleting ? 35 : 65;

    if(!deleting && charIndex === phrase.length){
      speed = 1400;
      deleting = true;
    }

    if(deleting && charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    window.setTimeout(typeWriter, speed);
  }

  typeWriter();
}

function initRevealAnimations(){
  const reveals = document.querySelectorAll(".reveal");

  if(!("IntersectionObserver" in window)){
    reveals.forEach(section => section.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(section => observer.observe(section));
}

function initMobileMenu(){
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if(!menuBtn || !navLinks) return;

  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initTypewriter();
  initRevealAnimations();
  initMobileMenu();
  initActiveNavigation();

  try{
    await initProjects();
  }catch(error){
    console.error("No se pudieron cargar los proyectos:", error);
    const status = document.getElementById("projectsStatus");
    if(status){
      status.textContent = "No se pudieron cargar los proyectos en este momento.";
    }
  }
});
