// Eyelet Fashion Boutique — progressive enhancements only; the page works fully without JS.
(function () {
  "use strict";

  var root = document.documentElement;
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var items = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window) || !items.length) return;

  root.classList.add("js");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  items.forEach(function (el, i) {
    el.style.transitionDelay = (0.9 + i * 0.1) + "s";
    io.observe(el);
  });

  // Only stagger items visible on first paint; later ones reveal immediately on scroll.
  setTimeout(function () {
    items.forEach(function (el) { el.style.transitionDelay = ""; });
  }, 1500);
})();
