const openBtn = document.getElementById("menu-open");
const closeBtn = document.getElementById("menu-close");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

let lastFocused;

function openMenu() {
  lastFocused = document.activeElement;

  // Prepare elements
  sidebar.classList.remove("hidden");
  overlay.classList.remove("hidden");
  
  // Force reflow
  sidebar.offsetHeight;
  
  // Apply transitions
  sidebar.style.transform = "translateX(0%)";
  overlay.style.opacity = "1";

  document.body.style.overflow = "hidden";
  sidebar.setAttribute("tabindex", "-1");
  sidebar.focus();
  openBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  // Apply transitions
  sidebar.style.transform = "translateX(100%)";
  overlay.style.opacity = "0";
  
  // Handle cleanup after transition
  setTimeout(() => {
    sidebar.classList.add("hidden");
    overlay.classList.add("hidden");
  }, 200);

  document.body.style.overflow = "";
  openBtn.setAttribute("aria-expanded", "false");
  lastFocused?.focus();
}

// Set initial styles for animation
if (sidebar) {
  sidebar.style.transform = "translateX(100%)";
  sidebar.style.transition = "transform 0.2s ease-out";
}

if (overlay) {
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.2s ease-out";
}

openBtn?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});