/* =====================================================
   partenaires.js — Grille filtrée + niveaux
   ===================================================== */

var currentTypeFilter = "tous";

/* ─── Couleur par type ─── */
var TYPE_COLORS = {
  "institutionnel": { bg: "#EFF6FF", text: "#0C6FCB", dot: "#1E96FC" },
  "entreprise":     { bg: "#F0FDFA", text: "#0B544E", dot: "#0F766E" },
  "ong":            { bg: "#F0FDFA", text: "#0F766E", dot: "#4FD1C5" },
  "media":          { bg: "#F1F0F8", text: "#14123A", dot: "#14123A" },
  "education":      { bg: "#FEF9E7", text: "#92400E", dot: "#D97706" }
};

function typeColor(type) {
  return TYPE_COLORS[type] || { bg: "#F8FAFC", text: "#475569", dot: "#94A3B8" };
}

function typeLabel(type) {
  var t = (PARTENAIRES_TYPES || []).find(function (x) { return x.id === type; });
  return t ? t.label : type;
}

/* ======================================================
   HERO — STATS
   ====================================================== */
function renderHeroStats() {
  var total = PARTENAIRES_DATA.length;
  var types = [...new Set(PARTENAIRES_DATA.map(function (p) { return p.type; }))].length;
  var oldest = Math.min.apply(null, PARTENAIRES_DATA.map(function (p) { return parseInt(p.depuis); }));
  var years = 2026 - oldest;

  var el = document.getElementById("part-hero-stats");
  if (!el) return;
  el.innerHTML = [
    { val: total,        label: "partenaires actifs" },
    { val: types,        label: "secteurs représentés" },
    { val: years + " ans", label: "de partenariats" }
  ].map(function (s) {
    return (
      '<div class="text-center">' +
        '<p class="font-heading text-3xl sm:text-4xl font-bold text-white">' + s.val + '</p>' +
        '<p class="text-sm text-white/55 mt-0.5">' + s.label + '</p>' +
      '</div>'
    );
  }).join(
    '<div class="w-px h-10 bg-white/15 self-center hidden sm:block" aria-hidden="true"></div>'
  );
}

/* ======================================================
   GRILLE PARTENAIRES
   ====================================================== */
function buildPartCard(p) {
  var c = typeColor(p.type);
  var card = document.createElement("article");
  card.className = [
    "part-card group bg-white rounded-2xl border border-ardoise/10 overflow-hidden",
    "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
    "reveal-item",
    p.featured ? "sm:col-span-2 lg:col-span-1" : ""
  ].filter(Boolean).join(" ");
  card.dataset.type = p.type;

  card.innerHTML =
    /* En-tête : logo + badge type */
    '<div class="relative p-6 pb-4">' +
      '<div class="flex items-start justify-between gap-3 mb-5">' +
        /* Logo */
        '<div class="w-16 h-16 rounded-xl flex-shrink-0 bg-fondclair border border-ardoise/10 flex items-center justify-center overflow-hidden p-2">' +
          (p.logo
            ? '<img src="' + p.logo + '" alt="Logo ' + p.nom + '" class="w-full h-full object-contain" loading="lazy" onerror="this.parentElement.innerHTML=\'<span class=&quot;font-heading font-bold text-lg text-marine&quot;>\'+(p.nom||\'?\').charAt(0)+\'</span>\'" />'
            : '<span class="font-heading font-bold text-xl text-marine">' + p.nom.charAt(0) + '</span>') +
        '</div>' +
        /* Badge type */
        '<span class="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full" style="background:' + c.bg + '; color:' + c.text + '">' +
          typeLabel(p.type) +
        '</span>' +
      '</div>' +

      /* Nom + depuis */
      '<h3 class="font-heading text-base font-bold text-marine mb-1 leading-snug">' + p.nom + '</h3>' +
      '<p class="text-xs text-ardoise/45 mb-3">Partenaire depuis <strong class="text-ardoise/70">' + p.depuis + '</strong></p>' +

      /* Description */
      '<p class="text-sm text-ardoise/65 leading-relaxed mb-4 line-clamp-2">' + p.description + '</p>' +

      /* Domaines */
      '<div class="flex flex-wrap gap-1.5">' +
        p.domaines.map(function (d) {
          return '<span class="text-xs px-2 py-0.5 rounded-full" style="background:' + c.bg + '; color:' + c.text + '">' + d + '</span>';
        }).join("") +
      '</div>' +
    '</div>' +

    /* Pied : ligne colorée + lien optionnel */
    '<div class="h-1 w-full" style="background:' + c.dot + '"></div>';

  return card;
}

function renderGrid() {
  var grid   = document.getElementById("part-grid");
  var noRes  = document.getElementById("part-no-results");
  var countEl= document.getElementById("part-count");
  if (!grid) return;

  var list = PARTENAIRES_DATA.filter(function (p) {
    return currentTypeFilter === "tous" || p.type === currentTypeFilter;
  });

  if (countEl) countEl.textContent = list.length + " partenaire" + (list.length > 1 ? "s" : "");

  grid.innerHTML = "";
  if (list.length === 0) {
    if (noRes) noRes.classList.remove("hidden");
    return;
  }
  if (noRes) noRes.classList.add("hidden");

  list.forEach(function (p) { grid.appendChild(buildPartCard(p)); });
  initReveal();
}

/* ======================================================
   FILTRES
   ====================================================== */
function initFilters() {
  document.querySelectorAll(".part-filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTypeFilter = btn.dataset.type;
      document.querySelectorAll(".part-filter").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      renderGrid();
    });
  });
}

/* ======================================================
   NIVEAUX DE PARTENARIAT
   ====================================================== */
var ICONS = {
  star: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  handshake: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
};

function renderNiveaux() {
  var container = document.getElementById("part-niveaux");
  if (!container || typeof PARTENARIAT_NIVEAUX === "undefined") return;

  container.innerHTML = PARTENARIAT_NIVEAUX.map(function (n, i) {
    var delay = i * 100;
    return (
      '<div class="reveal-item flex flex-col rounded-2xl border overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"' +
          ' style="transition-delay:' + delay + 'ms; border-color:' + n.couleur + '33">' +

        /* En-tête coloré */
        '<div class="p-6 pb-5" style="background:' + n.couleurLight + '">' +
          '<div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style="background:' + n.couleur + '; color:#fff">' +
            (ICONS[n.icone] || "") +
          '</div>' +
          '<h3 class="font-heading text-lg font-bold mb-1" style="color:' + n.couleur + '">' + n.label + '</h3>' +
        '</div>' +

        /* Avantages */
        '<div class="flex-1 p-6">' +
          '<ul class="space-y-2.5 mb-6">' +
            n.avantages.map(function (a) {
              return (
                '<li class="flex items-start gap-2.5 text-sm text-ardoise/70 leading-relaxed">' +
                  '<svg class="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' + n.couleur + '" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' +
                  a +
                '</li>'
              );
            }).join("") +
          '</ul>' +
          '<a href="contact.html?sujet=partenariat-' + n.id + '"' +
             ' class="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-heading font-semibold text-sm text-white transition-opacity hover:opacity-90"' +
             ' style="background:' + n.couleur + '">' +
            'Devenir partenaire ' + n.label +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>' +
          '</a>' +
        '</div>' +

      '</div>'
    );
  }).join("");

  initReveal();
}

/* ======================================================
   REVEAL
   ====================================================== */
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal-item").forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal-item:not(.visible)").forEach(function (el) { obs.observe(el); });
}

/* ======================================================
   INIT
   ====================================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof PARTENAIRES_DATA === "undefined") return;
  renderHeroStats();
  initFilters();
  renderGrid();
  renderNiveaux();
});
