const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.dataset.revealState = "visible";
  });
} else {
  revealElements.forEach((element) => {
    element.dataset.revealState = "pending";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.dataset.revealState = "visible";
        observer.unobserve(element);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
}
