/* =====================================================
   projets.js — Filtres, grille et modale détail
   ===================================================== */

var currentFilter = "tous";

/* Couleurs par catégorie */
var CAT_GRADIENT = {
  "Environnement": "from-vert to-vert-dark",
  "Entrepreneuriat": "from-azur to-azur-dark",
  "Éducation": "from-turquoise to-vert-dark",
  "Citoyenneté": "from-marine-light to-marine-dark",
  "Innovation": "from-azur-dark to-marine"
};
var CAT_DOT = {
  "Environnement": "#0F766E",
  "Entrepreneuriat": "#1E96FC",
  "Éducation": "#4FD1C5",
  "Citoyenneté": "#14123A",
  "Innovation": "#0C6FCB"
};
var STATUT_CLASS = {
  "En cours":  "badge-en-cours",
  "Terminé":   "badge-termine",
  "Planifié":  "badge-planifie"
};

/* ---------- Construction d'une carte projet ---------- */
function buildCard(p, index) {
  var grad = CAT_GRADIENT[p.categorie] || "from-marine to-azur-dark";
  var dot  = CAT_DOT[p.categorie] || "#1E96FC";

  var mediaHtml =
    '<div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br ' + grad + '">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/20">' + icon(p.icone || "flag", 48) + '</div>' +
      (p.image ? '<img src="' + p.image + '" alt="' + p.titre + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
      '<div class="absolute inset-0 bg-gradient-to-t from-marine/40 to-transparent"></div>' +
      '<span class="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/95 text-marine shadow-sm">' +
        '<span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:' + dot + '"></span>' + p.categorie +
      '</span>' +
      (p.statut ? '<span class="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ' + (STATUT_CLASS[p.statut] || "badge-termine") + '">' + p.statut + '</span>' : '') +
    '</div>';

  var delay = (index % 3) * 80;
  var card  = document.createElement("article");
  card.className = "projet-card group bg-white rounded-2xl border border-ardoise/10 overflow-hidden flex flex-col shadow-card hover:-translate-y-1 hover:shadow-xl cursor-pointer";
  card.dataset.categorie = p.categorie;
  card.dataset.id = p.id;
  card.style.transitionDelay = delay + "ms";
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Voir le détail du projet : " + p.titre);
  card.innerHTML =
    mediaHtml +
    '<div class="p-6 flex flex-col flex-1">' +
      '<h2 class="font-heading text-lg font-semibold text-marine mb-2 group-hover:text-azur-dark transition-colors">' + p.titre + '</h2>' +
      '<p class="text-sm text-ardoise/75 leading-relaxed mb-4 flex-1">' + p.description + '</p>' +
      (p.impact ? '<p class="text-xs text-ardoise/50 font-mono mb-4 leading-relaxed border-t border-ardoise/8 pt-3">' + p.impact + '</p>' : '') +
      '<div class="flex items-center justify-between">' +
        '<span class="text-xs font-mono text-ardoise/50">' + (p.date || "") + '</span>' +
        '<span class="inline-flex items-center gap-1 text-sm font-medium text-azur-dark group-hover:gap-2 transition-all">' +
          'Détails ' + icon("arrow-right", 15) +
        '</span>' +
      '</div>' +
    '</div>';

  /* Ouvrir la modale au clic ou Entrée */
  function openDetail() { openModal(p); }
  card.addEventListener("click", openDetail);
  card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(); } });

  return card;
}

/* ---------- Rendu de la grille ---------- */
function renderGrid(filter) {
  var grid = document.getElementById("projets-grid-full");
  var noRes = document.getElementById("no-results");
  if (!grid) return;

  /* Mise à jour compteur total */
  var countEl = document.getElementById("count-tous");
  if (countEl) countEl.textContent = "(" + PROJETS_DATA.length + ")";

  /* Filtrage */
  var liste = filter === "tous"
    ? PROJETS_DATA
    : PROJETS_DATA.filter(function (p) { return p.categorie === filter; });

  var results = document.getElementById("results-count");
  if (results) results.textContent = liste.length + " projet" + (liste.length > 1 ? "s" : "");

  if (liste.length === 0) {
    grid.innerHTML = "";
    if (noRes) noRes.classList.remove("hidden");
    return;
  }
  if (noRes) noRes.classList.add("hidden");

  /* Vider et reconstruire */
  grid.innerHTML = "";
  liste.forEach(function (p, i) {
    var card = buildCard(p, i);
    grid.appendChild(card);
  });

  /* Déclencher le scroll-reveal sur les nouvelles cartes */
  if (typeof initScrollReveal === "function") {
    setTimeout(initScrollReveal, 30);
  }
}

/* ---------- Filtres ---------- */
function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    var on = btn.dataset.filter === filter;
    btn.classList.toggle("active", on);
    if (!on) btn.classList.remove("active");
  });
  renderGrid(filter);
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { applyFilter(btn.dataset.filter); });
  });
}

/* ---------- Modale ---------- */
function openModal(p) {
  var modal   = document.getElementById("projet-modal");
  var imgEl   = document.getElementById("modal-image");
  var titreEl = document.getElementById("modal-titre");
  var catEl   = document.getElementById("modal-categorie");
  var statEl  = document.getElementById("modal-statut");
  var dateEl  = document.getElementById("modal-date");
  var descEl  = document.getElementById("modal-description");
  var impEl   = document.getElementById("modal-impact");
  var impBlk  = document.getElementById("modal-impact-block");
  if (!modal) return;

  /* Image ou dégradé */
  var grad = CAT_GRADIENT[p.categorie] || "from-marine to-azur-dark";
  imgEl.className = "aspect-[16/9] relative overflow-hidden rounded-t-2xl bg-gradient-to-br " + grad;
  imgEl.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-white/20">' + icon(p.icone || "flag", 64) + '</div>';
  if (p.image) {
    var img = new Image();
    img.src = p.image;
    img.alt = p.titre;
    img.className = "absolute inset-0 w-full h-full object-cover";
    img.onerror = function () { this.remove(); };
    imgEl.appendChild(img);
  }

  titreEl.textContent = p.titre;
  descEl.textContent  = p.descriptionLongue || p.description;
  dateEl.textContent  = p.date || "";

  /* Catégorie */
  catEl.textContent  = p.categorie;
  catEl.className    = "text-xs font-medium px-3 py-1 rounded-full bg-azur/10 text-azur-dark";

  /* Statut */
  if (p.statut) {
    statEl.textContent = p.statut;
    statEl.className   = "text-xs font-medium px-3 py-1 rounded-full " + (STATUT_CLASS[p.statut] || "badge-termine");
    statEl.style.display = "";
  } else {
    statEl.style.display = "none";
  }

  /* Impact */
  if (p.impact) {
    impEl.textContent = p.impact;
    impBlk.classList.remove("hidden");
  } else {
    impBlk.classList.add("hidden");
  }

  modal.classList.remove("modal-hidden");
  document.body.style.overflow = "hidden";

  /* Focus pour accessibilité */
  setTimeout(function () {
    var closeBtn = document.getElementById("modal-close");
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeModal() {
  var modal = document.getElementById("projet-modal");
  if (!modal) return;
  modal.classList.add("modal-hidden");
  document.body.style.overflow = "";
}

function initModal() {
  var closeBtn  = document.getElementById("modal-close");
  var backdrop  = document.getElementById("modal-backdrop");
  if (closeBtn)  closeBtn.addEventListener("click", closeModal);
  if (backdrop)  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- Init générale ---------- */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof PROJETS_DATA === "undefined") return;
  initFilters();
  initModal();
  renderGrid("tous");
});
