const botonModo = document.getElementById('modo-btn');
const body = document.body;
const botonIdioma = document.getElementById("cambiar-idioma");
let idiomaActual = localStorage.getItem("idioma") || "es";
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

botonModo.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  botonModo.textContent = body.classList.contains('dark-mode')
    ? traducciones[idiomaActual]["boton.modo.dia"]
    : traducciones[idiomaActual]["boton.modo.noche"];
});

function cambiarIdioma(idioma) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const clave = el.getAttribute("data-i18n");
    if (traducciones[idioma] && traducciones[idioma][clave]) {
      el.textContent = traducciones[idioma][clave];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const clave = el.getAttribute("data-i18n-placeholder");
    if (traducciones[idioma] && traducciones[idioma][clave]) {
      el.placeholder = traducciones[idioma][clave];
    }
  });

   // Cambiar el link del CV según idioma
  const linkCV = document.querySelector("a[download]");
  if (linkCV) {
    linkCV.href = idioma === "es" 
      ? "NicolásEzequielBainer.cv.pdf"   
      : "NicolásEzequielBainer_en.cv.pdf";       
  }

  // Cambiar atributo lang para accesibilidad
  document.documentElement.lang = idioma;

  // Guardar elección
  localStorage.setItem("idioma", idioma);
  
  // Cambiar texto del botón que alterna el idioma
  botonIdioma.textContent = idioma === "es" ? "EN" : "ES";
}

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar idioma guardado al cargar página
  cambiarIdioma(idiomaActual);

  // Cambiar idioma al click
  botonIdioma.addEventListener("click", () => {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    cambiarIdioma(idiomaActual);
  });
});



hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
