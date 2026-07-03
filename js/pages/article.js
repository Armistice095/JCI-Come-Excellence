/* =====================================================
   article.js — Page de lecture immersive
   Charge l'article depuis ACTUALITES_DATA via ?id=
   ===================================================== */

/* ─── Couleurs par catégorie ─── */
var CAT_TOKENS = {
  "Événement":   { accent: "#1E96FC", light: "#EFF6FF", text: "#0C6FCB" },
  "Distinction": { accent: "#0F766E", light: "#F0FDFA", text: "#0B544E" },
  "Projet":      { accent: "#4FD1C5", light: "#F0FDFA", text: "#0F766E" },
  "Formation":   { accent: "#14123A", light: "#F1F0F8", text: "#14123A" },
  "Partenariat": { accent: "#0C6FCB", light: "#EFF6FF", text: "#0C6FCB" }
};

/* ─── Temps de lecture estimé ─── */
function readingTime(corps) {
  var totalWords = 0;
  (corps || []).forEach(function (b) {
    if (b.texte)   totalWords += b.texte.split(/\s+/).length;
    if (b.items)   totalWords += b.items.join(" ").split(/\s+/).length;
    if (b.attribution) totalWords += b.attribution.split(/\s+/).length;
  });
  var minutes = Math.max(1, Math.round(totalWords / 200));
  return minutes + " min de lecture";
}

/* ─── SVG icônes inline ─── */
var SVG = {
  calendar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  user:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  clock:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  back:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>',
  share:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',
  list:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  arrow_r:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  arrow_l:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>',
  quote_m:  '<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
  check:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
};

/* ======================================================
   RENDU DES BLOCS DE CONTENU
   ====================================================== */
function renderBlock(block, catToken) {
  var accent = catToken.accent;

  switch (block.type) {

    case "intro":
      return '<p class="art-intro text-lg sm:text-xl leading-relaxed text-ardoise/80 font-medium mb-8 pb-8 border-b border-ardoise/10">' + block.texte + '</p>';

    case "h2":
      return '<h2 id="' + (block.id || "") + '" class="art-h2 font-heading text-2xl sm:text-3xl font-bold text-marine mt-12 mb-4 leading-snug">' + block.texte + '</h2>';

    case "p":
      return '<p class="art-p text-base sm:text-[17px] leading-[1.85] text-ardoise/75 mb-5">' + block.texte + '</p>';

    case "quote":
      return (
        '<blockquote class="art-quote relative my-10 pl-8 pr-6 py-6 rounded-r-xl border-l-4 bg-fondclair" style="border-color:' + accent + '">' +
          '<span class="absolute top-4 right-5 opacity-10" style="color:' + accent + '">' + SVG.quote_m + '</span>' +
          '<p class="text-lg sm:text-xl font-heading font-medium text-marine leading-relaxed mb-3 italic">' + block.texte + '</p>' +
          (block.attribution ? '<footer class="text-sm text-ardoise/55 font-medium not-italic">— ' + block.attribution + '</footer>' : '') +
        '</blockquote>'
      );

    case "list":
      return (
        '<ul class="art-list my-6 space-y-3">' +
          block.items.map(function (item) {
            return (
              '<li class="flex gap-3 text-base text-ardoise/75 leading-relaxed">' +
                '<span class="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white" style="background:' + accent + '">' +
                  SVG.check +
                '</span>' +
                '<span>' + item + '</span>' +
              '</li>'
            );
          }).join("") +
        '</ul>'
      );

    case "image":
      return (
        '<figure class="art-image my-10 -mx-4 sm:mx-0">' +
          '<div class="relative overflow-hidden rounded-xl bg-ardoise/5 aspect-[16/9]">' +
            '<div class="absolute inset-0 bg-gradient-to-br from-ardoise/5 to-ardoise/10 flex items-center justify-center text-ardoise/20">' +
              '<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' +
            '</div>' +
            '<img src="' + block.src + '" alt="' + (block.alt || "") + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.parentElement.querySelector(\'div\').style.opacity=\'1\'; this.remove();" />' +
          '</div>' +
          (block.legende ? '<figcaption class="mt-3 text-sm text-ardoise/45 text-center leading-relaxed px-4 sm:px-0">' + block.legende + '</figcaption>' : '') +
        '</figure>'
      );

    case "stats":
      return (
        '<div class="art-stats my-10 grid grid-cols-2 sm:grid-cols-4 gap-4">' +
          block.items.map(function (s) {
            return (
              '<div class="rounded-xl p-4 text-center" style="background:' + catToken.light + '">' +
                '<p class="font-heading text-2xl sm:text-3xl font-bold mb-1" style="color:' + accent + '">' + s.val + '</p>' +
                '<p class="text-xs text-ardoise/60 leading-snug">' + s.label + '</p>' +
              '</div>'
            );
          }).join("") +
        '</div>'
      );

    case "callout":
      return (
        '<aside class="art-callout my-10 rounded-2xl p-6 border" style="background:' + catToken.light + '; border-color:' + accent + '33">' +
          '<p class="flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wide mb-4" style="color:' + accent + '">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4M12 16h.01"/></svg>' +
            block.titre +
          '</p>' +
          '<ul class="space-y-2">' +
            block.items.map(function (item) {
              return (
                '<li class="flex items-start gap-2.5 text-sm text-ardoise/75 leading-relaxed">' +
                  '<span class="flex-shrink-0 mt-0.5" style="color:' + accent + '">' + SVG.check + '</span>' +
                  item +
                '</li>'
              );
            }).join("") +
          '</ul>' +
        '</aside>'
      );

    default:
      return "";
  }
}

/* ======================================================
   TABLE DES MATIÈRES
   ====================================================== */
function buildToC(corps) {
  var headings = (corps || []).filter(function (b) { return b.type === "h2"; });
  if (headings.length < 2) return null;
  return headings;
}

function renderToC(headings, catToken) {
  var el = document.getElementById("art-toc");
  if (!el || !headings) return;
  el.innerHTML =
    '<div class="art-toc-inner rounded-2xl border border-ardoise/10 bg-white overflow-hidden">' +
      '<div class="flex items-center gap-2 px-4 py-3 border-b border-ardoise/8 bg-fondclair">' +
        SVG.list +
        '<span class="text-xs font-heading font-semibold text-marine uppercase tracking-wide">Sommaire</span>' +
      '</div>' +
      '<nav aria-label="Table des matières">' +
        '<ul class="py-2">' +
          headings.map(function (h, i) {
            return (
              '<li>' +
                '<a href="#' + h.id + '" class="toc-link flex items-center gap-2 px-4 py-2.5 text-sm text-ardoise/65 hover:text-marine hover:bg-fondclair transition-colors group">' +
                  '<span class="flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white transition-colors" style="background:' + catToken.accent + '22; color:' + catToken.accent + '">' + (i + 1) + '</span>' +
                  '<span class="leading-snug group-hover:underline underline-offset-2">' + h.texte + '</span>' +
                '</a>' +
              '</li>'
            );
          }).join("") +
        '</ul>' +
      '</nav>' +
    '</div>';
  el.classList.remove("hidden");
}

/* ======================================================
   PROGRESSION DE LECTURE
   ====================================================== */
function initReadingProgress() {
  var bar = document.getElementById("art-progress-bar");
  var barMobile = document.getElementById("art-progress-mobile");
  if (!bar) return;

  function update() {
    var article = document.getElementById("art-body");
    if (!article) return;
    var rect = article.getBoundingClientRect();
    var total = article.offsetHeight - window.innerHeight;
    var scrolled = Math.max(0, -rect.top);
    var pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    bar.style.height = pct + "%";
    if (barMobile) barMobile.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ======================================================
   HIGHLIGHTING DU SOMMAIRE EN SCROLL
   ====================================================== */
function initTocHighlight() {
  var headings = Array.from(document.querySelectorAll(".art-h2[id]"));
  if (!headings.length) return;

  var links = document.querySelectorAll(".toc-link");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("toc-active"); });
        var active = document.querySelector('.toc-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add("toc-active");
      }
    });
  }, { rootMargin: "-20% 0% -70% 0%" });

  headings.forEach(function (h) { observer.observe(h); });
}

/* ======================================================
   ARTICLES SIMILAIRES
   ====================================================== */
function renderRelated(currentId, categorie) {
  var container = document.getElementById("art-related-grid");
  if (!container || typeof ACTUALITES_DATA === "undefined") return;

  var related = ACTUALITES_DATA
    .filter(function (a) { return a.id !== currentId; })
    .filter(function (a) { return a.categorie === categorie || true; }) // prend tous si pas assez
    .slice(0, 3);

  var catColors = {
    "Événement":   "from-azur to-azur-dark",
    "Distinction": "from-vert to-vert-dark",
    "Projet":      "from-turquoise to-vert",
    "Formation":   "from-marine to-azur-dark",
    "Partenariat": "from-azur-dark to-marine"
  };

  container.innerHTML = related.map(function (art) {
    var grad = catColors[art.categorie] || "from-marine to-azur-dark";
    var tok = CAT_TOKENS[art.categorie] || CAT_TOKENS["Événement"];
    return (
      '<a href="article.html?id=' + art.id + '" class="group block bg-white rounded-2xl border border-ardoise/10 overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300">' +
        '<div class="relative h-36 bg-gradient-to-br ' + grad + ' overflow-hidden">' +
          (art.image ? '<img src="' + art.image + '" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()" />' : '') +
          '<div class="absolute inset-0 bg-gradient-to-t from-marine/60 to-transparent"></div>' +
          '<span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90" style="color:' + tok.text + '">' + art.categorie + '</span>' +
        '</div>' +
        '<div class="p-4">' +
          '<p class="text-xs text-ardoise/45 mb-1.5">' + art.date + '</p>' +
          '<h3 class="font-heading text-sm font-bold text-marine leading-snug group-hover:text-azur-dark transition-colors line-clamp-2">' + art.titre + '</h3>' +
        '</div>' +
      '</a>'
    );
  }).join("");
}

/* ======================================================
   NAV PREV / NEXT
   ====================================================== */
function renderPrevNext(currentId) {
  var all = ACTUALITES_DATA || [];
  var idx = all.findIndex(function (a) { return a.id === currentId; });
  var prev = idx > 0 ? all[idx - 1] : null;
  var next = idx < all.length - 1 ? all[idx + 1] : null;

  var container = document.getElementById("art-prevnext");
  if (!container) return;

  container.innerHTML =
    '<div class="flex flex-col sm:flex-row gap-4">' +
      (prev ?
        '<a href="article.html?id=' + prev.id + '" class="group flex-1 flex items-center gap-4 bg-white rounded-2xl border border-ardoise/10 p-5 hover:border-azur/40 hover:shadow-md transition-all">' +
          '<span class="flex-shrink-0 w-10 h-10 rounded-full border border-ardoise/15 flex items-center justify-center text-ardoise/50 group-hover:bg-azur group-hover:border-azur group-hover:text-white transition-all">' + SVG.arrow_l + '</span>' +
          '<div class="min-w-0">' +
            '<p class="text-xs text-ardoise/40 uppercase tracking-wide mb-0.5">Article précédent</p>' +
            '<p class="font-heading text-sm font-semibold text-marine group-hover:text-azur-dark transition-colors leading-snug line-clamp-2">' + prev.titre + '</p>' +
          '</div>' +
        '</a>'
      : '<div class="flex-1"></div>') +

      (next ?
        '<a href="article.html?id=' + next.id + '" class="group flex-1 flex items-center gap-4 bg-white rounded-2xl border border-ardoise/10 p-5 hover:border-azur/40 hover:shadow-md transition-all sm:flex-row-reverse sm:text-right">' +
          '<span class="flex-shrink-0 w-10 h-10 rounded-full border border-ardoise/15 flex items-center justify-center text-ardoise/50 group-hover:bg-azur group-hover:border-azur group-hover:text-white transition-all">' + SVG.arrow_r + '</span>' +
          '<div class="min-w-0">' +
            '<p class="text-xs text-ardoise/40 uppercase tracking-wide mb-0.5">Article suivant</p>' +
            '<p class="font-heading text-sm font-semibold text-marine group-hover:text-azur-dark transition-colors leading-snug line-clamp-2">' + next.titre + '</p>' +
          '</div>' +
        '</a>'
      : '<div class="flex-1"></div>') +
    '</div>';
}

/* ======================================================
   PARTAGE
   ====================================================== */
function initShare(titre) {
  var btn = document.getElementById("art-share-btn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({ title: titre, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(function () {
        btn.textContent = "Lien copié !";
        setTimeout(function () { btn.innerHTML = SVG.share + " Partager"; }, 2000);
      });
    }
  });
}

/* ======================================================
   RENDU AUTEUR
   ====================================================== */
function renderAuteur(auteur, catToken) {
  var el = document.getElementById("art-auteur-block");
  if (!el || !auteur) return;
  el.innerHTML =
    '<div class="flex flex-col sm:flex-row gap-5 items-start sm:items-center">' +
      '<div class="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br overflow-hidden border-2" style="border-color:' + catToken.accent + '33; background:' + catToken.light + '">' +
        (auteur.avatar
          ? '<img src="' + auteur.avatar + '" alt="' + auteur.nom + '" class="w-full h-full object-cover" onerror="this.remove()" />'
          : '<div class="w-full h-full flex items-center justify-center font-heading font-bold text-xl" style="color:' + catToken.accent + '">' + auteur.nom.charAt(0) + '</div>') +
      '</div>' +
      '<div>' +
        '<p class="font-heading font-bold text-marine text-lg mb-0.5">' + auteur.nom + '</p>' +
        '<p class="text-sm font-medium mb-2" style="color:' + catToken.accent + '">' + auteur.role + '</p>' +
        '<p class="text-sm text-ardoise/65 leading-relaxed">' + (auteur.bio || "") + '</p>' +
      '</div>' +
    '</div>';
}

/* ======================================================
   HERO
   ====================================================== */
function renderHero(art, catToken) {
  /* Barre de catégorie colorée */
  var catBar = document.getElementById("art-cat-bar");
  if (catBar) { catBar.style.background = catToken.accent; }

  /* Badge catégorie */
  var catBadge = document.getElementById("art-cat-badge");
  if (catBadge) {
    catBadge.textContent = art.categorie;
    catBadge.style.background = catToken.light;
    catBadge.style.color = catToken.text;
  }

  /* Image hero */
  var heroImg = document.getElementById("art-hero-img");
  if (heroImg && art.image) {
    heroImg.src = art.image;
    heroImg.alt = art.titre;
    heroImg.onerror = function () { this.remove(); };
  }

  /* Titre */
  document.getElementById("art-titre").textContent = art.titre;

  /* Chapeau */
  var chapeauEl = document.getElementById("art-chapeau");
  if (chapeauEl) chapeauEl.textContent = art.chapeau || art.extrait;

  /* Meta */
  document.getElementById("art-meta-date").textContent = art.date;
  document.getElementById("art-meta-auteur").textContent = typeof art.auteur === "object" ? art.auteur.nom : art.auteur;
  document.getElementById("art-meta-time").textContent = readingTime(art.corps);

  /* Tags */
  var tagsEl = document.getElementById("art-tags");
  if (tagsEl && art.tags && art.tags.length) {
    tagsEl.innerHTML = art.tags.map(function (t) {
      return '<span class="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/70">#' + t + '</span>';
    }).join("");
  }

  /* Barre de progression — couleur catégorie */
  var prog = document.getElementById("art-progress-bar");
  var progMobile = document.getElementById("art-progress-mobile");
  if (prog) prog.style.background = catToken.accent;
  if (progMobile) progMobile.style.background = catToken.accent;
}

/* ======================================================
   CORPS DE L'ARTICLE
   ====================================================== */
function renderBody(art, catToken) {
  var container = document.getElementById("art-body");
  if (!container) return;
  container.innerHTML = (art.corps || []).map(function (b) {
    return renderBlock(b, catToken);
  }).join("");
}

/* ======================================================
   ANIMATIONS D'APPARITION
   ====================================================== */
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll("[data-reveal]").forEach(function (el) { obs.observe(el); });
}

/* ======================================================
   404 ARTICLE NON TROUVÉ
   ====================================================== */
function render404() {
  document.getElementById("art-loading").classList.add("hidden");
  document.getElementById("art-not-found").classList.remove("hidden");
}

/* ======================================================
   INIT
   ====================================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof ACTUALITES_DATA === "undefined") return;

  /* Récupérer l'id depuis l'URL */
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  var art = id ? ACTUALITES_DATA.find(function (a) { return a.id === id; }) : null;

  /* Cacher le spinner */
  var loadingEl = document.getElementById("art-loading");
  if (loadingEl) loadingEl.classList.add("hidden");

  if (!art) { render404(); return; }

  var catToken = CAT_TOKENS[art.categorie] || CAT_TOKENS["Événement"];
  var auteurObj = typeof art.auteur === "object" ? art.auteur : { nom: art.auteur, role: "", bio: "" };

  /* Méta page */
  document.title = art.titre + " — JCI Comé Excellence";
  var metaDesc = document.querySelector("meta[name='description']");
  if (metaDesc) metaDesc.setAttribute("content", art.extrait);

  /* Rendu */
  renderHero(art, catToken);
  renderBody(art, catToken);

  /* ToC */
  var headings = buildToC(art.corps);
  renderToC(headings, catToken);

  /* Auteur */
  renderAuteur(auteurObj, catToken);

  /* Articles similaires */
  renderRelated(art.id, art.categorie);

  /* Prev / Next */
  renderPrevNext(art.id);

  /* Partage */
  initShare(art.titre);

  /* Progression */
  initReadingProgress();

  /* Highlight ToC */
  setTimeout(initTocHighlight, 200);

  /* Révélations scroll */
  initReveal();
});
