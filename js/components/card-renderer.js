function categorieClasses(cat) {
  const map = {
    "Environnement": "bg-vert/10 text-vert-dark",
    "Entrepreneuriat": "bg-azur/10 text-azur-dark",
    "Éducation": "bg-turquoise/20 text-vert-dark",
    "Citoyenneté": "bg-marine/10 text-marine",
    "Innovation": "bg-azur/10 text-azur-dark",
    "Distinction": "bg-turquoise/20 text-vert-dark",
    "Projet": "bg-azur/10 text-azur-dark",
    "Partenariat": "bg-vert/10 text-vert-dark"
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
    "Partenariat": "from-vert to-azur-dark"
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
    "Partenariat": "bg-vert"
  };
  return map[cat] || "bg-ardoise";
}

// Zone média en haut de carte : si item.image pointe vers un fichier existant,
// la photo s'affiche ; sinon (chemin absent ou fichier introuvable), un dégradé
// aux couleurs de la catégorie + une icône s'affichent à la place. Rien ne casse
// jamais visuellement, même sans aucune photo fournie.
function renderCardMedia(item) {
  const gradient = categorieGradient(item.categorie);
  const imgTag = item.image
    ? '<img src="' + item.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />'
    : "";
  return (
    '<div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br ' + gradient + '">' +
      '<div class="absolute inset-0 flex items-center justify-center text-white/30">' + icon(item.icone, 44) + '</div>' +
      imgTag +
      '<span class="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/95 text-marine shadow-sm">' +
        '<span class="w-1.5 h-1.5 rounded-full ' + categorieDot(item.categorie) + '"></span>' + item.categorie +
      '</span>' +
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
        '<div class="flex items-center justify-between pt-3 border-t border-ardoise/10">' +
          '<span class="text-xs font-mono text-ardoise/60">' + p.date + '</span>' +
          '<a href="projets.html#' + p.id + '" class="inline-flex items-center gap-1 text-sm font-medium text-azur-dark hover:gap-2 transition-all">En savoir plus ' + icon("arrow-right", 16) + '</a>' +
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

function renderFeaturedEvent(containerId, evt) {
  const el = document.getElementById(containerId);
  if (!el || !evt) return;
  const dateBlock = evt.dateConnue
    ? '<span class="font-mono text-4xl font-medium leading-none">' + evt.jour + '</span>' +
      '<span class="text-sm uppercase tracking-wide text-turquoise mt-1">' + evt.mois + ' ' + evt.annee + '</span>'
    : '<span class="font-heading text-xl font-semibold leading-none">À venir</span>' +
      '<span class="text-xs uppercase tracking-wide text-turquoise mt-1">Date à confirmer</span>';
  el.innerHTML =
    '<div class="bg-marine rounded-xl2 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center text-white">' +
      '<div class="flex flex-col items-center justify-center bg-white/10 rounded-xl px-6 py-4 flex-shrink-0">' +
        dateBlock +
      '</div>' +
      '<div class="flex-1">' +
        '<span class="inline-block text-xs font-medium uppercase tracking-wide text-turquoise mb-2">Prochain événement</span>' +
        '<h3 class="font-heading text-2xl font-semibold text-white mb-2">' + evt.titre + '</h3>' +
        '<p class="text-white/75 text-sm mb-3 max-w-xl">' + evt.description + '</p>' +
        '<p class="flex items-center gap-2 text-sm text-white/60">' + icon("map-pin", 16) + evt.lieu + '</p>' +
      '</div>' +
      '<a href="evenements.html#' + evt.id + '" class="btn-primary flex-shrink-0 whitespace-nowrap">En savoir plus</a>' +
    '</div>';
}

function renderEventsList(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const others = list.filter(function (e) { return !e.featured; });
  el.innerHTML = others.map(function (e) {
    const datePastille = e.dateConnue
      ? '<span class="font-mono text-base font-medium text-marine leading-none">' + e.jour + '</span>' +
        '<span class="text-[11px] text-ardoise/60">' + e.mois + '</span>'
      : '<span class="text-[10px] font-semibold text-marine text-center leading-tight px-1">À venir</span>';
    return (
      '<a href="evenements.html#' + e.id + '" class="flex items-center gap-4 py-4 border-b border-ardoise/10 group">' +
        '<div class="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-fondclair border border-ardoise/10 flex-shrink-0">' +
          datePastille +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="font-heading text-sm font-medium text-marine line-clamp-2 leading-snug group-hover:text-azur-dark transition-colors">' + e.titre + '</p>' +
          '<p class="text-xs text-ardoise/60 truncate mt-1">' + e.lieu + '</p>' +
        '</div>' +
        '<span class="text-ardoise/40 group-hover:text-azur-dark group-hover:translate-x-1 transition-all flex-shrink-0">' + icon("arrow-right", 18) + '</span>' +
      '</a>'
    );
  }).join("");
}

function renderNewsCard(n, index) {
  const delay = (index % 3) * 90;
  return (
    '<article data-reveal style="transition-delay:' + delay + 'ms" class="bg-white rounded-xl2 border border-ardoise/10 overflow-hidden flex flex-col shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-azur/20">' +
      renderCardMedia(n) +
      '<div class="p-6 flex flex-col flex-1">' +
        '<h3 class="font-heading text-base font-semibold text-marine mb-2 leading-snug">' + n.titre + '</h3>' +
        '<p class="text-sm text-ardoise/75 leading-relaxed mb-4 flex-1">' + n.extrait + '</p>' +
        '<div class="flex items-center justify-between pt-3 border-t border-ardoise/10">' +
          '<span class="text-xs font-mono text-ardoise/60">' + n.date + '</span>' +
          '<a href="actualites.html#' + n.id + '" class="text-sm font-medium text-azur-dark">Lire ' + icon("arrow-right", 14) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderNews(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.slice(0, 3).map(renderNewsCard).join("");
}
