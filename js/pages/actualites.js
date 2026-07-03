/* =====================================================
   actualites.js — Filtres, grille et modale
   ===================================================== */

var ACT_COLORS = {
  "Événement":   { dot: "#1E96FC", badge: "bg-azur/10 text-azur-dark",        grad: "from-azur to-azur-dark" },
  "Distinction": { dot: "#0F766E", badge: "bg-vert/10 text-vert-dark",         grad: "from-vert to-vert-dark" },
  "Projet":      { dot: "#4FD1C5", badge: "bg-turquoise/20 text-vert-dark",    grad: "from-turquoise to-vert" },
  "Formation":   { dot: "#14123A", badge: "bg-marine/10 text-marine",          grad: "from-marine to-azur-dark" },
  "Partenariat": { dot: "#0C6FCB", badge: "bg-azur-dark/10 text-azur-dark",   grad: "from-azur-dark to-marine" }
};

var ACT_ICONS = {
  users:       '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  award:       '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.56 13.9L7 22l5-3 5 3-1.56-8.1"/></svg>',
  leaf:        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  briefcase:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v.01M8 12h8"/></svg>',
  handshake:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>',
  graduation:  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
};

var currentFilter = "tous";
var currentSearch = "";

/* ---- Helpers ---- */
function actColor(cat) { return ACT_COLORS[cat] || ACT_COLORS["Événement"]; }
function actIcon(key)  { return ACT_ICONS[key]  || ACT_ICONS["users"]; }

/* ====================================================
   ARTICLE VEDETTE
   ==================================================== */
function renderFeaturedActualite() {
  var el = document.getElementById("act-featured");
  if (!el) return;
  var art = ACTUALITES_DATA.find(function (a) { return a.featured; }) || ACTUALITES_DATA[0];
  if (!art) { el.classList.add("hidden"); return; }
  var c = actColor(art.categorie);

  el.innerHTML =
    '<article class="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-card border border-ardoise/10 bg-white">' +
      /* Image / dégradé côté gauche — 2/5 */
      '<div class="lg:col-span-2 relative min-h-[240px] bg-gradient-to-br ' + c.grad + ' overflow-hidden">' +
        '<div class="absolute inset-0 flex items-center justify-center text-white/10">' +
          '<svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>' +
        '</div>' +
        (art.image ? '<img src="' + art.image + '" alt="' + art.titre + '" loading="eager" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
        '<div class="absolute inset-0 bg-gradient-to-t from-marine/70 via-marine/20 to-transparent"></div>' +
        '<div class="absolute top-4 left-4">' +
          '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 ' + c.badge + '">' +
            '<span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:' + c.dot + '"></span>' +
            art.categorie +
          '</span>' +
        '</div>' +
        '<div class="absolute bottom-4 left-4 text-white">' +
          '<p class="text-xs text-white/60 uppercase tracking-wide font-medium">Article à la une</p>' +
        '</div>' +
      '</div>' +
      /* Contenu — 3/5 */
      '<div class="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">' +
        '<div>' +
          '<div class="flex items-center gap-3 text-xs text-ardoise/50 mb-4">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>' +
            art.date +
            '<span class="w-1 h-1 rounded-full bg-ardoise/25"></span>' +
            (art.auteur || "La Rédaction") +
          '</div>' +
          '<h2 class="font-heading text-2xl sm:text-3xl font-bold text-marine mb-4 leading-snug">' + art.titre + '</h2>' +
          '<p class="text-ardoise/70 leading-relaxed mb-6">' + art.extrait + '</p>' +
          (art.tags && art.tags.length > 0 ?
            '<div class="flex flex-wrap gap-2 mb-6">' +
              art.tags.map(function (t) {
                return '<span class="text-xs px-2.5 py-1 rounded-full bg-ardoise/8 text-ardoise/60">#' + t + '</span>';
              }).join("") +
            '</div>'
          : '') +
        '</div>' +
        '<a href="article.html?id=' + art.id + '" class="btn-primary w-fit mt-2 inline-flex items-center gap-2">Lire l\u2019article complet</a>' +
      '</div>' +
    '</article>';
}

/* ====================================================
   GRILLE DES ARTICLES
   ==================================================== */
function buildActCard(art, index) {
  var c = actColor(art.categorie);
  var delay = (index % 3) * 75;
  var card = document.createElement("article");
  card.className = "act-card group bg-white rounded-2xl border border-ardoise/10 overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer";
  card.dataset.categorie = art.categorie;
  card.style.transitionDelay = delay + "ms";
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Lire : " + art.titre);

  card.innerHTML =
    /* Bande image + badge */
    '<div class="relative h-36 bg-gradient-to-br ' + c.grad + ' overflow-hidden">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/12">' +
        actIcon(art.icone) +
      '</div>' +
      (art.image ? '<img src="' + art.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
      '<div class="absolute inset-0 bg-gradient-to-t from-marine/50 to-transparent"></div>' +
      '<div class="absolute top-3 left-3">' +
        '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 ' + c.badge + '">' +
          '<span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:' + c.dot + '"></span>' +
          art.categorie +
        '</span>' +
      '</div>' +
    '</div>' +
    /* Corps */
    '<div class="p-5">' +
      '<p class="text-xs text-ardoise/45 mb-2 flex items-center gap-1.5">' +
        '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>' +
        art.date +
      '</p>' +
      '<h3 class="font-heading text-sm font-bold text-marine mb-2 leading-snug group-hover:text-azur-dark transition-colors line-clamp-2">' + art.titre + '</h3>' +
      '<p class="text-xs text-ardoise/60 leading-relaxed mb-4 line-clamp-3">' + art.extrait + '</p>' +
      '<div class="flex items-center justify-between pt-3 border-t border-ardoise/8">' +
        '<span class="text-xs text-ardoise/40">' + (art.auteur || "La Rédaction") + '</span>' +
        '<span class="inline-flex items-center gap-1 text-xs font-semibold text-azur-dark group-hover:gap-2 transition-all">' +
          'Lire <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>' +
        '</span>' +
      '</div>' +
    '</div>';

  card.addEventListener("click", function () { window.location.href = "article.html?id=" + art.id; });
  card.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); window.location.href = "article.html?id=" + art.id; }
  });
  return card;
}

function getFilteredList() {
  var liste = ACTUALITES_DATA.filter(function (a) { return !a.featured; });
  if (currentFilter !== "tous") {
    liste = liste.filter(function (a) { return a.categorie === currentFilter; });
  }
  if (currentSearch.trim().length > 0) {
    var q = currentSearch.trim().toLowerCase();
    liste = liste.filter(function (a) {
      return a.titre.toLowerCase().includes(q) ||
             a.extrait.toLowerCase().includes(q) ||
             (a.tags && a.tags.some(function (t) { return t.toLowerCase().includes(q); }));
    });
  }
  return liste;
}

function renderActGrid() {
  var grid   = document.getElementById("act-grid");
  var noRes  = document.getElementById("act-no-results");
  var count  = document.getElementById("act-count");
  if (!grid) return;

  var liste = getFilteredList();

  if (count) count.textContent = liste.length + " article" + (liste.length > 1 ? "s" : "");

  grid.innerHTML = "";
  if (liste.length === 0) {
    if (noRes) noRes.classList.remove("hidden");
    return;
  }
  if (noRes) noRes.classList.add("hidden");

  liste.forEach(function (art, i) { grid.appendChild(buildActCard(art, i)); });
  if (typeof initScrollReveal === "function") setTimeout(initScrollReveal, 30);
}

/* ====================================================
   FILTRES
   ==================================================== */
function applyActFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".act-filter").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderActGrid();
}

function initActFilters() {
  document.querySelectorAll(".act-filter").forEach(function (btn) {
    btn.addEventListener("click", function () { applyActFilter(btn.dataset.filter); });
  });
}

/* ====================================================
   RECHERCHE
   ==================================================== */
function initActSearch() {
  var input = document.getElementById("act-search");
  if (!input) return;
  var debounce;
  input.addEventListener("input", function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      currentSearch = input.value;
      renderActGrid();
    }, 220);
  });
  var clearBtn = document.getElementById("act-search-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      input.value = "";
      currentSearch = "";
      renderActGrid();
      input.focus();
    });
  }
}

/* ====================================================
   MODALE ARTICLE COMPLET
   ==================================================== */
function openActModal(art) {
  var modal = document.getElementById("act-modal");
  if (!modal) return;
  var c = actColor(art.categorie);

  /* Image */
  var imgEl = document.getElementById("act-modal-image");
  imgEl.className = "aspect-[16/7] relative overflow-hidden rounded-xl bg-gradient-to-br " + c.grad;
  imgEl.innerHTML =
    '<div class="absolute inset-0 flex items-center justify-center text-white/15">' +
      '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>' +
    '</div>';
  if (art.image) {
    var img = new Image(); img.src = art.image; img.alt = art.titre;
    img.className = "absolute inset-0 w-full h-full object-cover";
    img.onerror = function () { this.remove(); };
    imgEl.appendChild(img);
    var overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-gradient-to-t from-marine/50 to-transparent";
    imgEl.appendChild(overlay);
  }

  /* Métadonnées */
  var catEl = document.getElementById("act-modal-cat");
  catEl.textContent = art.categorie;
  catEl.className = "text-xs font-semibold px-3 py-1 rounded-full " + c.badge;

  document.getElementById("act-modal-titre").textContent  = art.titre;
  document.getElementById("act-modal-date").textContent   = art.date;
  document.getElementById("act-modal-auteur").textContent = art.auteur || "La Rédaction";

  /* Contenu */
  var bodyEl = document.getElementById("act-modal-body");
  var texte = art.contenu || art.extrait;
  bodyEl.innerHTML = texte.split("\n").map(function (para) {
    return para.trim() ? '<p class="mb-4 last:mb-0">' + para.trim() + '</p>' : "";
  }).join("");

  /* Tags */
  var tagsEl = document.getElementById("act-modal-tags");
  if (art.tags && art.tags.length > 0) {
    tagsEl.innerHTML = art.tags.map(function (t) {
      return '<span class="text-xs px-2.5 py-1 rounded-full bg-ardoise/8 text-ardoise/60">#' + t + '</span>';
    }).join("");
    tagsEl.classList.remove("hidden");
  } else {
    tagsEl.classList.add("hidden");
  }

  /* Ouvrir */
  modal.classList.remove("modal-hidden");
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    document.getElementById("act-modal-close").focus();
    document.getElementById("act-modal-panel").scrollTop = 0;
  }, 60);
}

function closeActModal() {
  var modal = document.getElementById("act-modal");
  if (modal) modal.classList.add("modal-hidden");
  document.body.style.overflow = "";
}

function initActModal() {
  document.getElementById("act-modal-close").addEventListener("click", closeActModal);
  document.getElementById("act-modal-backdrop").addEventListener("click", closeActModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeActModal(); });
}

/* ====================================================
   NEWSLETTER INLINE
   ==================================================== */
function initActNewsletter() {
  var form = document.getElementById("act-newsletter-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.reset();
    var msg = document.getElementById("act-newsletter-msg");
    if (msg) msg.classList.remove("hidden");
  });
}

/* ====================================================
   INIT
   ==================================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof ACTUALITES_DATA === "undefined") return;
  renderFeaturedActualite();
  initActFilters();
  initActSearch();
  initActModal();
  initActNewsletter();
  renderActGrid();
});
