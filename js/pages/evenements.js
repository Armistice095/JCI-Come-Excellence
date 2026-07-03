/* =====================================================
   evenements.js — Calendrier, filtres et modale
   ===================================================== */

var EVT_COLORS = {
  "AG":           { dot: "#1E96FC", bg: "from-azur to-azur-dark",     badge: "bg-azur/10 text-azur-dark" },
  "Forum":        { dot: "#0F766E", bg: "from-vert to-vert-dark",      badge: "bg-vert/10 text-vert-dark" },
  "Formation":    { dot: "#4FD1C5", bg: "from-turquoise to-vert-dark", badge: "bg-turquoise/20 text-vert-dark" },
  "Citoyenneté":  { dot: "#14123A", bg: "from-marine to-azur-dark",    badge: "bg-marine/10 text-marine" },
  "Partenariat":  { dot: "#0C6FCB", bg: "from-azur-dark to-marine",    badge: "bg-azur-dark/10 text-azur-dark" },
  "Autre":        { dot: "#334155", bg: "from-ardoise to-marine",       badge: "bg-ardoise/10 text-ardoise" }
};

var STATUT_LABELS = {
  "a-venir":  { label: "À venir",   cls: "bg-azur/10 text-azur-dark" },
  "en-cours": { label: "En cours",  cls: "bg-vert/10 text-vert-dark" },
  "passe":    { label: "Passé",     cls: "bg-ardoise/10 text-ardoise" }
};

var MOIS_LONG = {
  "01":"Janvier","02":"Février","03":"Mars","04":"Avril",
  "05":"Mai","06":"Juin","07":"Juillet","08":"Août",
  "09":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"
};

var currentFilter = "tous";

/* ---- Couleur par catégorie ---- */
function evtColor(cat) { return EVT_COLORS[cat] || EVT_COLORS["Autre"]; }

/* ---- Badge statut ---- */
function statutBadge(s) {
  var st = STATUT_LABELS[s] || STATUT_LABELS["passe"];
  return '<span class="text-xs font-medium px-2.5 py-1 rounded-full ' + st.cls + '">' + st.label + '</span>';
}

/* ====================================================
   SECTION PROCHAIN ÉVÉNEMENT VEDETTE
   ==================================================== */
function renderFeaturedEvent() {
  var el = document.getElementById("evt-vedette");
  if (!el) return;
  var featured = EVENEMENTS_DATA.find(function (e) { return e.featured && e.statut !== "passe"; });
  if (!featured) { el.classList.add("hidden"); return; }
  var c = evtColor(featured.categorie);
  el.innerHTML =
    '<div class="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-card border border-ardoise/10">' +
      /* Image / dégradé */
      '<div class="relative min-h-[260px] lg:min-h-[360px] bg-gradient-to-br ' + c.bg + '">' +
        '<div class="absolute inset-0 flex items-center justify-center text-white/15">' +
          '<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.6" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/></svg>' +
        '</div>' +
        (featured.image ? '<img src="' + featured.image + '" alt="' + featured.titre + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
        '<div class="absolute inset-0 bg-gradient-to-t from-marine/60 to-transparent"></div>' +
        '<div class="absolute top-4 left-4">' + statutBadge(featured.statut) + '</div>' +
        /* Grande date (ou "À venir" si la date n'est pas encore fixée) */
        (featured.dateConnue
          ? '<div class="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-white">' +
              '<p class="font-mono text-5xl font-bold leading-none">' + featured.jour + '</p>' +
              '<p class="text-sm text-white/80 mt-1">' + MOIS_LONG[featured.moisNum] + ' ' + featured.annee + '</p>' +
            '</div>'
          : '<div class="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-white">' +
              '<p class="font-heading text-2xl font-bold leading-none">À venir</p>' +
              '<p class="text-sm text-white/80 mt-1">Date à confirmer</p>' +
            '</div>') +
      '</div>' +
      /* Détail */
      '<div class="bg-white p-8 lg:p-10 flex flex-col justify-center">' +
        '<span class="inline-flex items-center gap-2 text-xs font-medium mb-4 ' + c.badge + ' px-3 py-1 rounded-full w-fit">' +
          '<span class="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style="background:' + c.dot + '"></span>' +
          'Prochain événement · ' + featured.categorie +
        '</span>' +
        '<h2 class="font-heading text-2xl sm:text-3xl font-bold text-marine mb-3">' + featured.titre + '</h2>' +
        '<p class="text-ardoise/70 leading-relaxed mb-6">' + featured.description + '</p>' +
        '<div class="space-y-2 mb-6">' +
          '<div class="flex items-center gap-2 text-sm text-ardoise/70">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/></svg>' +
            (featured.dateConnue ? MOIS_LONG[featured.moisNum] + ' ' + featured.jour + ', ' + featured.annee : 'Date à confirmer') +
          '</div>' +
          '<div class="flex items-center gap-2 text-sm text-ardoise/70">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>' +
            (featured.heure || "Heure à confirmer") +
          '</div>' +
          '<div class="flex items-center gap-2 text-sm text-ardoise/70">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>' +
            featured.lieu + (featured.ville ? ', ' + featured.ville : '') +
          '</div>' +
        '</div>' +
        (featured.programme && featured.programme.length > 0
          ? '<div class="border-t border-ardoise/10 pt-5 mb-6">' +
              '<p class="text-xs font-semibold text-ardoise/50 uppercase tracking-wide mb-3">Programme</p>' +
              '<ul class="space-y-1.5">' +
                featured.programme.map(function (ligne) {
                  return '<li class="text-sm text-ardoise/70 flex gap-2"><span class="text-azur-dark font-mono flex-shrink-0">' + ligne.split('—')[0] + '</span>' + (ligne.split('—')[1] || '') + '</li>';
                }).join("") +
              '</ul>' +
            '</div>'
          : '') +
        '<button onclick="openEvtModal(EVENEMENTS_DATA[0])" class="btn-primary w-fit">Voir les détails complets</button>' +
      '</div>' +
    '</div>';
}

/* ====================================================
   GRILLE DES AUTRES ÉVÉNEMENTS
   ==================================================== */
function buildEvtCard(e, index) {
  var c = evtColor(e.categorie);
  var delay = (index % 3) * 80;
  var isPast = e.statut === "passe";
  var card = document.createElement("article");
  card.className = "evt-card group bg-white rounded-2xl border border-ardoise/10 overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer" + (isPast ? " opacity-70" : "");
  card.dataset.categorie = e.categorie;
  card.dataset.statut    = e.statut;
  card.style.transitionDelay = delay + "ms";
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Détails : " + e.titre);

  card.innerHTML =
    /* Bande supérieure colorée + date absolue */
    '<div class="relative h-28 bg-gradient-to-br ' + c.bg + ' overflow-hidden">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/15">' +
        '<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/></svg>' +
      '</div>' +
      (e.image ? '<img src="' + e.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
      '<div class="absolute inset-0 bg-gradient-to-r from-marine/50 to-transparent"></div>' +
      '<div class="absolute top-3 right-3 flex gap-2">' +
        '<span class="text-xs font-medium px-2.5 py-1 rounded-full ' + c.badge + ' bg-white/90">' + e.categorie + '</span>' +
        statutBadge(e.statut) +
      '</div>' +
      '<div class="absolute bottom-3 left-4 flex items-end gap-2 text-white">' +
        (e.dateConnue
          ? '<span class="font-mono text-4xl font-bold leading-none">' + e.jour + '</span>' +
            '<span class="text-sm mb-0.5 text-white/80">' + e.mois + ' ' + e.annee + '</span>'
          : '<span class="font-heading text-xl font-bold leading-none">À venir</span>') +
      '</div>' +
    '</div>' +
    /* Corps */
    '<div class="p-5">' +
      '<h3 class="font-heading text-base font-bold text-marine mb-2 leading-snug group-hover:text-azur-dark transition-colors">' + e.titre + '</h3>' +
      '<p class="text-sm text-ardoise/65 leading-relaxed mb-4 line-clamp-2">' + e.description + '</p>' +
      '<div class="space-y-1.5 mb-4">' +
        '<p class="flex items-center gap-2 text-xs text-ardoise/55">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>' +
          (e.heure || "Heure à confirmer") +
        '</p>' +
        '<p class="flex items-center gap-2 text-xs text-ardoise/55">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>' +
          e.lieu + (e.ville ? ', ' + e.ville : '') +
        '</p>' +
      '</div>' +
      '<div class="flex items-center justify-end pt-3 border-t border-ardoise/8">' +
        '<span class="inline-flex items-center gap-1 text-sm font-medium text-azur-dark group-hover:gap-2 transition-all">' +
          'Voir le détail <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>' +
        '</span>' +
      '</div>' +
    '</div>';

  card.addEventListener("click", function () { openEvtModal(e); });
  card.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openEvtModal(e); } });
  return card;
}

function renderEventsGrid(filter) {
  var grid   = document.getElementById("evts-grid");
  var noRes  = document.getElementById("evt-no-results");
  var count  = document.getElementById("evt-count");
  if (!grid) return;

  var liste = EVENEMENTS_DATA.filter(function (e) { return !e.featured || e.statut === "passe"; });

  if (filter !== "tous") {
    if (filter === "a-venir" || filter === "passe") {
      liste = liste.filter(function (e) { return e.statut === filter; });
    } else {
      liste = liste.filter(function (e) { return e.categorie === filter; });
    }
  }

  if (count) count.textContent = liste.length + " événement" + (liste.length > 1 ? "s" : "");

  grid.innerHTML = "";
  if (liste.length === 0) {
    if (noRes) noRes.classList.remove("hidden");
    return;
  }
  if (noRes) noRes.classList.add("hidden");

  liste.forEach(function (e, i) { grid.appendChild(buildEvtCard(e, i)); });
  if (typeof initScrollReveal === "function") setTimeout(initScrollReveal, 30);
}

/* ====================================================
   FILTRES
   ==================================================== */
function applyEvtFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".evt-filter").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderEventsGrid(filter);
}

function initEvtFilters() {
  document.querySelectorAll(".evt-filter").forEach(function (btn) {
    btn.addEventListener("click", function () { applyEvtFilter(btn.dataset.filter); });
  });
}

/* ====================================================
   MODALE DÉTAIL ÉVÉNEMENT
   ==================================================== */
function openEvtModal(e) {
  var modal = document.getElementById("evt-modal");
  if (!modal) return;
  var c = evtColor(e.categorie);

  /* Image */
  var imgEl = document.getElementById("evt-modal-image");
  imgEl.className = "aspect-[16/9] relative overflow-hidden rounded-t-2xl bg-gradient-to-br " + c.bg;
  imgEl.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-white/20"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/></svg></div>';
  if (e.image) {
    var img = new Image(); img.src = e.image; img.alt = e.titre;
    img.className = "absolute inset-0 w-full h-full object-cover";
    img.onerror = function () { this.remove(); };
    imgEl.appendChild(img);
  }

  /* Contenu */
  document.getElementById("evt-modal-titre").textContent = e.titre;
  document.getElementById("evt-modal-desc").textContent  = e.description;

  var catEl = document.getElementById("evt-modal-cat");
  catEl.textContent = e.categorie;
  catEl.className   = "text-xs font-medium px-3 py-1 rounded-full " + c.badge;

  var statEl = document.getElementById("evt-modal-statut");
  var st = STATUT_LABELS[e.statut] || STATUT_LABELS["passe"];
  statEl.textContent = st.label;
  statEl.className   = "text-xs font-medium px-3 py-1 rounded-full " + st.cls;

  document.getElementById("evt-modal-date").textContent = e.dateConnue
    ? MOIS_LONG[e.moisNum] + " " + e.jour + ", " + e.annee
    : "À venir — date à confirmer";
  document.getElementById("evt-modal-heure").textContent = e.heure || "Heure à confirmer";
  document.getElementById("evt-modal-lieu").textContent  = e.lieu + (e.ville ? ", " + e.ville : "");

  /* Programme */
  var progBlock = document.getElementById("evt-modal-prog-block");
  var progList  = document.getElementById("evt-modal-prog");
  if (e.programme && e.programme.length > 0) {
    progList.innerHTML = e.programme.map(function (l) {
      var parts = l.split("—");
      return '<li class="flex gap-3 text-sm py-2 border-b border-ardoise/8 last:border-0">' +
        '<span class="font-mono text-azur-dark font-medium flex-shrink-0 w-16 text-xs pt-0.5">' + (parts[0] || "").trim() + '</span>' +
        '<span class="text-ardoise/75">' + (parts[1] || "").trim() + '</span>' +
        '</li>';
    }).join("");
    progBlock.classList.remove("hidden");
  } else {
    progBlock.classList.add("hidden");
  }

  modal.classList.remove("modal-hidden");
  document.body.style.overflow = "hidden";
  setTimeout(function () { document.getElementById("evt-modal-close").focus(); }, 80);
}

function closeEvtModal() {
  var modal = document.getElementById("evt-modal");
  if (modal) modal.classList.add("modal-hidden");
  document.body.style.overflow = "";
}

function initEvtModal() {
  document.getElementById("evt-modal-close").addEventListener("click", closeEvtModal);
  document.getElementById("evt-modal-backdrop").addEventListener("click", closeEvtModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEvtModal(); });
}

/* ====================================================
   INIT
   ==================================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof EVENEMENTS_DATA === "undefined") return;
  renderFeaturedEvent();
  initEvtFilters();
  initEvtModal();
  renderEventsGrid("tous");
});
