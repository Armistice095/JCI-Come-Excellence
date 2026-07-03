document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initStickyHeader();
  initCounters();
  if (typeof initHeroCarousel === "function") initHeroCarousel();
  initFooterYear();
  initNewsletterForm();

  if (typeof PROJETS_DATA !== "undefined" && typeof renderProjects === "function") {
    renderProjects("projets-grid", PROJETS_DATA);
  }
  if (typeof EVENEMENTS_DATA !== "undefined" && typeof renderFeaturedEvent === "function") {
    var featured = EVENEMENTS_DATA.find(function (e) { return e.featured; });
    renderFeaturedEvent("evenement-vedette", featured);
  }
  if (typeof EVENEMENTS_DATA !== "undefined" && typeof renderEventsList === "function") {
    renderEventsList("evenements-liste", EVENEMENTS_DATA);
  }
  if (typeof ACTUALITES_DATA !== "undefined" && typeof renderNews === "function") {
    renderNews("actualites-grid", ACTUALITES_DATA);
  }
  if (typeof PARTENAIRES_DATA !== "undefined") {
    renderPartnersMarquee("partenaires-marquee", PARTENAIRES_DATA);
  }

  if (typeof initBureauPage === "function") initBureauPage();

  // Le scroll-reveal s'initialise en dernier pour englober aussi
  // les cartes injectées dynamiquement ci-dessus.
  initScrollReveal();
});

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;
  const message = document.querySelector("[data-newsletter-message]");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.reset();
    if (message) message.classList.remove("hidden");
  });
}

function initMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-menu-panel]");
  if (!toggle || !panel) return;
  const iconOpen = toggle.querySelector("[data-icon-open]");
  const iconClose = toggle.querySelector("[data-icon-close]");

  function setState(isOpen) {
    panel.dataset.open = isOpen ? "true" : "false";
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
    }
  }

  toggle.addEventListener("click", function () {
    setState(panel.dataset.open !== "true");
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setState(false); });
  });
}

function initStickyHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 24) {
      header.dataset.scrolled = "true";
    } else {
      header.dataset.scrolled = "false";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]:not(.is-visible):not([data-observed])");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) {
    el.dataset.observed = "1";
    observer.observe(el);
  });

  window.setTimeout(function () {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    observer.disconnect();
  }, 4500);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animate(el) {
    const target = parseInt(el.dataset.counter, 10);
    if (reduceMotion || isNaN(target)) {
      el.textContent = target + (el.dataset.suffix || "");
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + (el.dataset.suffix || "");
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });
}

function initFooterYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;
  const message = document.querySelector("[data-newsletter-message]");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.reset();
    if (message) message.classList.remove("hidden");
  });
}
