/* main.js
   Adds interaction without changing any existing class/id names.
*/
document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // A) Dropdown: click + keyboard support (better UX + accessibility)
  // ---------------------------
  const dropdown = document.querySelector(".dropdown");
  const dropBtn = document.querySelector(".dropbtn");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdown && dropBtn && dropdownMenu) {
    // Accessibility attributes (added via JS; no HTML class/id changes)
    dropBtn.setAttribute("role", "button");
    dropBtn.setAttribute("aria-haspopup", "true");
    dropBtn.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("role", "menu");

    const openMenu = () => {
      dropdownMenu.style.opacity = "1";
      dropdownMenu.style.visibility = "visible";
      dropBtn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      dropdownMenu.style.opacity = "";
      dropdownMenu.style.visibility = "";
      dropBtn.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
      const isOpen = dropBtn.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    };

    // Click to toggle (works on touch devices)
    dropBtn.addEventListener("click", (e) => {
      e.preventDefault(); // prevents jumping to "#"
      toggleMenu();
    });

    // Keyboard: Enter/Space opens, Escape closes
    dropBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
      if (e.key === "Escape") closeMenu();
    });

    // Close if user clicks outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) closeMenu();
    });
  }

  // ---------------------------
  // B) Smooth scroll helper (no need to change your links)
  // ---------------------------
  function smoothScrollTo(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------------------------
  // C) Welcome buttons: scroll to sections (Courses / Facilities)

  const welcomeBtnWrap = document.querySelector("#welcometext-btn");
  const courseSection = document.querySelector(".homecourse-container");
  const facilitiesSection = document.querySelector(".homefaci-container");

  if (welcomeBtnWrap) {
    welcomeBtnWrap.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      // Prevent the <a href="Courses"> / <a href="Facilities"> from navigating
      e.preventDefault();

      if (target.classList.contains("allbtn")) {
        smoothScrollTo(courseSection);
      } else if (target.classList.contains("btn2")) {
        smoothScrollTo(facilitiesSection);
      }
    });
  }

});