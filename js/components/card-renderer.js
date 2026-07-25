/* ============================================================
   card-renderer.js
   Rendu partagé des cartes (projets, événements, actualités).

   MISE À JOUR — support des nouvelles données actualités :
   - Nouvelles catégories réelles (Vie associative, Assemblée
     Générale, Projet communautaire, Représentation institutionnelle)
   - Badge "galerie photo" sur la vignette quand item.gallery existe
   - Affichage du lieu et du temps de lecture sur les cartes actu
   - Bibliothèque d'icônes autonome (cardIcon) : ne dépend plus
     d'une fonction globale icon() externe, pour éviter tout bug
     silencieux si une icône n'est pas encore connue ailleurs.
   ============================================================ */

/* ---------------------------------------------------------
   Icônes autonomes (24x24, trait "currentColor")
   --------------------------------------------------------- */
var CARD_ICONS = {
  "camera":            '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.2l1.6-2.4A2 2 0 0 1 8.5 2.6h7a2 2 0 0 1 1.7 1L18.8 6H22a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  "users":             '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "graduation-cap":    '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  "globe":             '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  "handshake":         '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>',
  "clipboard-check":   '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/><path d="m9 14 2 2 4-4"/>',
  "award":             '<circle cx="12" cy="9" r="6"/><path d="M8.56 13.9 7 22l5-3 5 3-1.56-8.1"/>',
  "leaf":              '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  "briefcase":         '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v.01M8 12h8"/>',
  "map-pin":           '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  "arrow-right":       '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  "images":            '<rect x="3" y="3" width="15" height="15" rx="2"/><path d="M8.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><path d="m3 15 3.5-3.5a1.5 1.5 0 0 1 2 0L14 17"/><path d="M14 12.5l1.3-1.3a1.5 1.5 0 0 1 2 0L21 15"/>',
  "clock":             '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  "calendar":          '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'
};

function cardIcon(key, size) {
  var s = size || 20;
  var body = CARD_ICONS[key] || CARD_ICONS["camera"];
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
}

/* Compat : si un ancien appel `icon(...)` traîne ailleurs sur le site,
   on ne le redéfinit pas ici — card-renderer.js utilise désormais
   exclusivement cardIcon() en interne. */

/* ---------------------------------------------------------
   Catégories → styles visuels
   --------------------------------------------------------- */
function categorieClasses(cat) {
  const map = {
    // Projets
    "Environnement": "bg-vert/10 text-vert-dark",
    "Entrepreneuriat": "bg-azur/10 text-azur-dark",
    "Éducation": "bg-turquoise/20 text-vert-dark",
    "Citoyenneté": "bg-marine/10 text-marine",
    "Innovation": "bg-azur/10 text-azur-dark",
    "Distinction": "bg-turquoise/20 text-vert-dark",
    "Projet": "bg-azur/10 text-azur-dark",
    "Partenariat": "bg-vert/10 text-vert-dark",
    // Actualités
    "Vie associative": "bg-vert/10 text-vert-dark",
    "Assemblée Générale": "bg-marine/10 text-marine",
    "Projet communautaire": "bg-azur/10 text-azur-dark",
    "Représentation institutionnelle": "bg-turquoise/20 text-vert-dark"
  };
  return map[cat] || "bg-ardoise/10 text-ardoise";
}

function categorieGradient(cat) {
  const map = {
    "Environnement": "from-vert to-vert-dark",
    "Entrepreneuriat": "from-azur to-azur-dark",
    "Éducation": "from-turquoise to-vert-dark",
    "Citoyenneté": "from-marine-light to-marine-dark",
    "Innovation": "from-azur-dark to-marine",
    "Distinction": "from-turquoise to-azur-dark",
    "Projet": "from-azur to-marine",
    "Partenariat": "from-vert to-azur-dark",
    "Vie associative": "from-vert to-vert-dark",
    "Assemblée Générale": "from-marine to-marine-light",
    "Projet communautaire": "from-azur to-azur-dark",
    "Représentation institutionnelle": "from-turquoise to-azur-dark"
  };
  return map[cat] || "from-ardoise to-marine";
}

function categorieDot(cat) {
  const map = {
    "Environnement": "bg-vert",
    "Entrepreneuriat": "bg-azur",
    "Éducation": "bg-turquoise",
    "Citoyenneté": "bg-marine",
    "Innovation": "bg-azur-dark",
    "Distinction": "bg-turquoise",
    "Projet": "bg-azur",
    "Partenariat": "bg-vert",
    "Vie associative": "bg-vert",
    "Assemblée Générale": "bg-marine",
    "Projet communautaire": "bg-azur",
    "Représentation institutionnelle": "bg-turquoise"
  };
  return map[cat] || "bg-ardoise";
}

function renderCardMedia(item) {
  const gradient = categorieGradient(item.categorie);
  const imgTag = item.image
    ? '<img src="' + item.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />'
    : "";
  return (
    '<div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br ' + gradient + ' group/media">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/30">' + cardIcon(item.icone, 44) + '</div>' +
      imgTag +
      '<div class="absolute inset-0 bg-gradient-to-t from-marine/65 via-transparent to-transparent opacity-80 pointer-events-none"></div>' +
      '<span class="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/95 text-marine shadow-sm">' +
        '<span class="w-1.5 h-1.5 rounded-full ' + categorieDot(item.categorie) + '"></span>' + item.categorie +
      '</span>' +
      (item.gallery ? '<span class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-marine/80 text-white backdrop-blur">' + cardIcon("images", 14) + 'Galerie</span>' : '') +
    '</div>'
  );
}

function renderProjectCard(p, index) {
  const delay = (index % 3) * 90;
  return (
    '<article data-reveal style="transition-delay:' + delay + 'ms" class="group bg-white rounded-xl2 border border-ardoise/10 overflow-hidden flex flex-col shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-azur/20">' +
      renderCardMedia(p) +
      '<div class="p-6 flex flex-col flex-1">' +
        '<h3 class="font-heading text-lg font-semibold text-marine mb-2">' + p.titre + '</h3>' +
        '<p class="text-sm text-ardoise/80 leading-relaxed mb-4 flex-1">' + p.description + '</p>' +
        '<div class="flex items-center justify-between pt-4 border-t border-ardoise/10">' +
          '<span class="text-[0.7rem] font-mono uppercase tracking-wide text-ardoise/60">' + p.date + '</span>' +
          '<a href="projets.html#' + p.id + '" class="inline-flex items-center gap-1 text-sm font-medium text-azur-dark hover:gap-2 transition-all">En savoir plus ' + cardIcon("arrow-right", 16) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderProjects(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.filter(function (p) { return p.featured; }).map(renderProjectCard).join("");
}


/* ---------------------------------------------------------
   Cartes actualités
   Utilisées pour les aperçus "3 dernières actus" (accueil, etc).
   Affiche désormais le lieu (si présent) et le temps de lecture
   (si présent) en plus de la date.
   --------------------------------------------------------- */
function renderNewsCard(n, index) {
  const delay = (index % 3) * 90;
  const metaBits = [
    '<span class="inline-flex items-center gap-1">' + cardIcon("calendar", 12) + n.date + '</span>'
  ];
  if (n.lieu) {
    metaBits.push('<span class="inline-flex items-center gap-1">' + cardIcon("map-pin", 12) + n.lieu + '</span>');
  }
  return (
    '<article data-reveal style="transition-delay:' + delay + 'ms" class="group bg-white rounded-xl2 border border-ardoise/10 overflow-hidden flex flex-col shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-azur/20">' +
      renderCardMedia(n) +
      '<div class="p-6 flex flex-col flex-1">' +
        '<h3 class="font-heading text-base font-semibold text-marine mb-2 leading-snug">' + n.titre + '</h3>' +
        '<p class="text-sm text-ardoise/75 leading-relaxed mb-4 flex-1">' + n.extrait + '</p>' +
        '<div class="flex items-center justify-between pt-4 border-t border-ardoise/10 gap-3">' +
          '<span class="text-[0.7rem] font-mono text-ardoise/60 flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">' + metaBits.join("") + '</span>' +
          '<a href="article.html?id=' + n.id + '" class="inline-flex items-center gap-1 text-sm font-semibold text-azur-dark flex-shrink-0 transition-all group-hover:gap-2">Lire ' + cardIcon("arrow-right", 14) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderNews(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  // Les articles les plus récents d'abord (dateISO), sinon ordre du tableau.
  const sorted = list.slice().sort(function (a, b) {
    if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO);
    return 0;
  });
  el.innerHTML = sorted.slice(0, 3).map(renderNewsCard).join("");
}
