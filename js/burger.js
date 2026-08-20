document
  .getElementById("hamburger-menu")
  .addEventListener("click", function () {
    var nav = document.querySelector(".top-nav");
    nav.classList.toggle("show");
  });

// Función para cerrar el menú burger
function closeBurgerMenu() {
  var nav = document.querySelector(".top-nav");
  nav.classList.remove("show");
}

// Agregar event listeners a todos los enlaces del menú para cerrar el burger
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".top-nav a");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Cerrar el menú burger después de un pequeño delay para permitir la navegación
      setTimeout(closeBurgerMenu, 100);
    });
  });
});
