/* =====================================================
   actualites.js — Grille, filtres et article à la une
   Mis à jour pour la nouvelle structure de données :
   - catégories réelles (Vie associative, Assemblée Générale,
     Projet communautaire, Représentation institutionnelle…)
   - tri chronologique (dateISO)
   - lieu, temps de lecture, badge galerie sur les cartes
   - filtres de catégorie générés dynamiquement depuis les
     données (plus besoin de les mettre à jour à la main)
   - la modale "aperçu rapide" a été retirée : elle ne
     pouvait plus afficher les nouveaux articles (blocs
     riches, galeries...) et faisait doublon avec la page
     article.html. Les cartes mènent maintenant directement
     à l'article complet.
   ===================================================== */

/* ---- Couleurs par catégorie (avec repli neutre) ---- */
var ACT_COLORS = {
  "Vie associative":                  { dot: "#0F766E", badge: "bg-vert/10 text-vert-dark",      grad: "from-vert to-vert-dark" },
  "Assemblée Générale":                { dot: "#14123A", badge: "bg-marine/10 text-marine",        grad: "from-marine to-marine-light" },
  "Projet communautaire":              { dot: "#1E96FC", badge: "bg-azur/10 text-azur-dark",       grad: "from-azur to-azur-dark" },
  "Représentation institutionnelle":   { dot: "#4FD1C5", badge: "bg-turquoise/20 text-vert-dark",  grad: "from-turquoise to-azur-dark" },
  "Distinction":                       { dot: "#4FD1C5", badge: "bg-turquoise/20 text-vert-dark",  grad: "from-turquoise to-vert" },
  "Partenariat":                       { dot: "#0C6FCB", badge: "bg-azur-dark/10 text-azur-dark",  grad: "from-azur-dark to-marine" }
};
var ACT_COLOR_FALLBACK = { dot: "#94a3b8", badge: "bg-ardoise/10 text-ardoise", grad: "from-ardoise to-marine" };

/* ---- Icônes (autonomes, 24x24) ---- */
var ACT_ICONS = {
  "camera":          '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.2l1.6-2.4A2 2 0 0 1 8.5 2.6h7a2 2 0 0 1 1.7 1L18.8 6H22a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  "users":           '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "graduation-cap":  '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  "globe":           '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  "handshake":       '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>',
  "clipboard-check": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/><path d="m9 14 2 2 4-4"/>',
  "award":           '<circle cx="12" cy="9" r="6"/><path d="M8.56 13.9 7 22l5-3 5 3-1.56-8.1"/>'
};

var currentFilter = "tous";
var currentSearch = "";
var CAT_ORDER = []; // rempli dynamiquement au chargement

/* ---- Helpers ---- */
function actColor(cat) { return ACT_COLORS[cat] || ACT_COLOR_FALLBACK; }
function actIcon(key, size) {
  var s = size || 22;
  var body = ACT_ICONS[key] || ACT_ICONS["camera"];
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
}

function bySort(a, b) {
  if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO);
  return 0;
}
function getSortedData() {
  return (ACTUALITES_DATA || []).slice().sort(bySort);
}

/* ====================================================
   ARTICLE VEDETTE
   L'article le plus récent parmi ceux marqués "featured"
   (à défaut, l'article le plus récent tout court).
   ==================================================== */
function pickFeatured() {
  var sorted = getSortedData();
  var featured = sorted.filter(function (a) { return a.featured; });
  return featured[0] || sorted[0] || null;
}

function renderFeaturedActualite(art) {
  var el = document.getElementById("act-featured");
  if (!el) return;
  if (!art) { el.classList.add("hidden"); return; }
  var c = actColor(art.categorie);
  var auteurNom = typeof art.auteur === "object" && art.auteur ? art.auteur.nom : (art.auteur || "La Rédaction");

  el.innerHTML =
    '<article class="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-card border border-ardoise/10 bg-white">' +
      /* Image / dégradé côté gauche — 2/5 */
      '<div class="lg:col-span-2 relative min-h-[240px] bg-gradient-to-br ' + c.grad + ' overflow-hidden">' +
        '<div class="absolute inset-0 flex items-center justify-center text-white/10">' +
          actIcon(art.icone, 140) +
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
          '<div class="flex items-center gap-3 text-xs text-ardoise/50 mb-4 flex-wrap">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>' +
            art.date +
            '<span class="w-1 h-1 rounded-full bg-ardoise/25"></span>' +
            auteurNom +
            (art.lieu ?
              '<span class="w-1 h-1 rounded-full bg-ardoise/25"></span>' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
              art.lieu
            : '') +
          '</div>' +
          '<h2 class="font-heading text-2xl sm:text-3xl font-bold text-marine mb-4 leading-snug">' + art.titre + '</h2>' +
          '<p class="text-ardoise/70 leading-relaxed mb-6">' + (art.chapeau || art.extrait) + '</p>' +
          (art.tags && art.tags.length > 0 ?
            '<div class="flex flex-wrap gap-2 mb-6">' +
              art.tags.slice(0, 5).map(function (t) {
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
   FILTRES — générés dynamiquement depuis les données
   ==================================================== */
function buildCategoryList() {
  var seen = {};
  var cats = [];
  getSortedData().forEach(function (a) {
    if (a.categorie && !seen[a.categorie]) { seen[a.categorie] = true; cats.push(a.categorie); }
  });
  return cats;
}

function renderActFilters() {
  var wrap = document.getElementById("act-filters");
  if (!wrap) return;
  CAT_ORDER = buildCategoryList();

  var buttons = [
    '<button class="act-filter active text-sm font-medium px-4 py-2 rounded-full border border-ardoise/20 text-ardoise/70 hover:bg-ardoise/5 transition-all" data-filter="tous">Tous</button>'
  ];
  CAT_ORDER.forEach(function (cat) {
    buttons.push(
      '<button class="act-filter text-sm font-medium px-4 py-2 rounded-full border border-ardoise/20 text-ardoise/70 hover:bg-ardoise/5 transition-all" data-filter="' + cat + '">' + cat + '</button>'
    );
  });
  wrap.innerHTML = buttons.join("");

  wrap.querySelectorAll(".act-filter").forEach(function (btn) {
    btn.addEventListener("click", function () { applyActFilter(btn.dataset.filter); });
  });
}

function applyActFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".act-filter").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderActGrid();
}

/* ====================================================
   GRILLE DES ARTICLES
   ==================================================== */
function buildActCard(art, index) {
  var c = actColor(art.categorie);
  var delay = (index % 3) * 75;
  var auteurNom = typeof art.auteur === "object" && art.auteur ? art.auteur.nom : (art.auteur || "La Rédaction");
  var photoCount = art.gallery && art.gallery.photos ? art.gallery.photos.length : 0;

  var card = document.createElement("a");
  card.href = "article.html?id=" + art.id;
  card.className = "act-card group bg-white rounded-2xl border border-ardoise/10 overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 block";
  card.dataset.categorie = art.categorie;
  card.style.transitionDelay = delay + "ms";
  card.setAttribute("aria-label", "Lire : " + art.titre);

  card.innerHTML =
    /* Bande image + badge */
    '<div class="relative h-36 bg-gradient-to-br ' + c.grad + ' overflow-hidden">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/12">' +
        actIcon(art.icone, 22) +
      '</div>' +
      (art.image ? '<img src="' + art.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
      '<div class="absolute inset-0 bg-gradient-to-t from-marine/50 to-transparent"></div>' +
      '<div class="absolute top-3 left-3 flex items-center gap-2">' +
        '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 ' + c.badge + '">' +
          '<span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:' + c.dot + '"></span>' +
          art.categorie +
        '</span>' +
      '</div>' +
      (art.featured ?
        '<span class="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-turquoise text-marine">À la une</span>'
      : '') +
      (photoCount > 0 ?
        '<span class="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-marine/70 backdrop-blur-sm text-white">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="15" height="15" rx="2"/><path d="m3 15 3.5-3.5a1.5 1.5 0 0 1 2 0L14 17"/><path d="M14 12.5l1.3-1.3a1.5 1.5 0 0 1 2 0L21 15"/></svg>' +
          photoCount +
        '</span>'
      : '') +
    '</div>' +
    /* Corps */
    '<div class="p-5">' +
      '<div class="text-xs text-ardoise/45 mb-2 flex items-center flex-wrap gap-x-3 gap-y-1">' +
        '<span class="flex items-center gap-1.5">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>' +
          art.date +
        '</span>' +
        (art.lieu ?
          '<span class="flex items-center gap-1.5">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
            art.lieu +
          '</span>'
        : '') +
      '</div>' +
      '<h3 class="font-heading text-sm font-bold text-marine mb-2 leading-snug group-hover:text-azur-dark transition-colors line-clamp-2">' + art.titre + '</h3>' +
      '<p class="text-xs text-ardoise/60 leading-relaxed mb-4 line-clamp-3">' + art.extrait + '</p>' +
      '<div class="flex items-center justify-between pt-3 border-t border-ardoise/8">' +
        '<span class="text-xs text-ardoise/40">' + (art.lecture ? art.lecture + " de lecture" : auteurNom) + '</span>' +
        '<span class="inline-flex items-center gap-1 text-xs font-semibold text-azur-dark group-hover:gap-2 transition-all">' +
          'Lire <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>' +
        '</span>' +
      '</div>' +
    '</div>';

  return card;
}

function getFilteredList(excludeId) {
  var liste = getSortedData().filter(function (a) { return a.id !== excludeId; });
  if (currentFilter !== "tous") {
    liste = liste.filter(function (a) { return a.categorie === currentFilter; });
  }
  if (currentSearch.trim().length > 0) {
    var q = currentSearch.trim().toLowerCase();
    liste = liste.filter(function (a) {
      return a.titre.toLowerCase().includes(q) ||
             a.extrait.toLowerCase().includes(q) ||
             (a.lieu && a.lieu.toLowerCase().includes(q)) ||
             (a.tags && a.tags.some(function (t) { return t.toLowerCase().includes(q); }));
    });
  }
  return liste;
}

function renderActGrid(featuredId) {
  var grid   = document.getElementById("act-grid");
  var noRes  = document.getElementById("act-no-results");
  var count  = document.getElementById("act-count");
  if (!grid) return;

  var liste = getFilteredList(featuredId);

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
      renderActGrid(window.__actFeaturedId);
    }, 220);
  });
  var clearBtn = document.getElementById("act-search-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      input.value = "";
      currentSearch = "";
      renderActGrid(window.__actFeaturedId);
      input.focus();
    });
  }
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

  var featured = pickFeatured();
  window.__actFeaturedId = featured ? featured.id : null;

  renderFeaturedActualite(featured);
  renderActFilters();
  initActSearch();
  initActNewsletter();
  renderActGrid(window.__actFeaturedId);
});
