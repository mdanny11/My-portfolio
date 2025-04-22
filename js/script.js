document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector("nav ul");
  
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  