const header = document.querySelector<HTMLElement>("[data-site-header]");
const trigger = document.querySelector<HTMLButtonElement>(
  "[data-menu-trigger]",
);
const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");

function setMenuOpen(open: boolean, restoreFocus = false) {
  if (!trigger || !menu) return;
  trigger.setAttribute("aria-expanded", String(open));
  trigger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menu.dataset.open = String(open);
  if (restoreFocus) trigger.focus();
}

trigger?.addEventListener("click", () => {
  setMenuOpen(trigger.getAttribute("aria-expanded") !== "true");
});

menu
  ?.querySelectorAll<HTMLAnchorElement>("[data-mobile-link]")
  .forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    trigger?.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false, true);
  }
});

function updateHeaderState() {
  if (header) header.dataset.scrolled = String(window.scrollY > 24);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
