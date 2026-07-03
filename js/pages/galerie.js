/* =====================================================
   galerie.js — Grille masonry, filtres, lightbox
   ===================================================== */

var gal = {
  currentAlbum: "tous",
  currentType:  "tous",
  currentIdx:   0,
  filtered:     [],

  /* Couleurs album */
  albumColor: function (albumId) {
    var a = (GALERIE_ALBUMS || []).find(function (x) { return x.id === albumId; });
    return a ? a.couleur : "#14123A";
  },
  albumLabel: function (albumId) {
    var a = (GALERIE_ALBUMS || []).find(function (x) { return x.id === albumId; });
    return a ? a.label : albumId;
  }
};

/* ======================================================
   GRILLE MASONRY
   ====================================================== */

/* Classe CSS de taille → classes Tailwind */
var SPAN = {
  sm:  { col: "",                  row: "" },
  md:  { col: "",                  row: "row-span-2" },
  lg:  { col: "md:col-span-2",    row: "" },
  xl:  { col: "md:col-span-2",    row: "row-span-2" }
};

function buildCard(item, index) {
  var color = gal.albumColor(item.album);
  var span  = SPAN[item.taille] || SPAN.sm;
  var delay = (index % 6) * 60;

  var el = document.createElement("div");
  el.className = [
    "gal-card group relative overflow-hidden rounded-2xl cursor-pointer bg-ardoise/10",
    span.col, span.row,
    "reveal-item"
  ].filter(Boolean).join(" ");
  el.style.transitionDelay = delay + "ms";
  el.dataset.index = index;
  el.setAttribute("tabindex", "0");
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Agrandir : " + item.titre);

  /* Aspect ratio selon taille */
  var aspectClass = (item.taille === "xl" || item.taille === "md") ? "aspect-[4/5]" : "aspect-[4/3]";
  if (span.col.includes("col-span-2") && !span.row.includes("row-span-2")) aspectClass = "aspect-[16/7]";

  el.innerHTML =
    /* Image / placeholder */
    '<div class="absolute inset-0 ' + aspectClass + ' w-full h-full">' +
      '<div class="absolute inset-0 bg-gradient-to-br opacity-80" style="background: linear-gradient(135deg,' + color + '99,' + color + 'dd)"></div>' +
      (item.src
        ? '<img src="' + item.src + '" alt="' + item.titre + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.remove()" />'
        : '') +
      /* Overlay hover */
      '<div class="absolute inset-0 bg-marine/0 group-hover:bg-marine/40 transition-all duration-300"></div>' +
    '</div>' +

    /* Badge type vidéo */
    (item.type === "video"
      ? '<div class="absolute top-3 left-3 z-10 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-marine">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m5 3 14 9-14 9V3z"/></svg>' +
          'Vidéo' +
        '</div>'
      : '') +

    /* Badge album */
    '<div class="absolute top-3 right-3 z-10">' +
      '<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">' +
        gal.albumLabel(item.album) +
      '</span>' +
    '</div>' +

    /* Icône loupe au centre — apparaît au hover */
    '<div class="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">' +
      '<div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">' +
        (item.type === "video"
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="m5 3 14 9-14 9V3z"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6M11 8v6"/></svg>') +
      '</div>' +
    '</div>' +

    /* Légende — slide depuis le bas */
    '<div class="absolute bottom-0 inset-x-0 z-10 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">' +
      '<div class="bg-marine/80 backdrop-blur-sm rounded-xl p-3">' +
        '<p class="font-heading text-sm font-semibold text-white leading-snug mb-0.5 line-clamp-1">' + item.titre + '</p>' +
        '<p class="text-xs text-white/60 flex items-center gap-1.5">' +
          '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
          item.lieu +
        '</p>' +
      '</div>' +
    '</div>';

  el.addEventListener("click",   function () { gal.openLightbox(+el.dataset.index); });
  el.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); gal.openLightbox(+el.dataset.index); }
  });
  return el;
}

function renderGrid() {
  var grid   = document.getElementById("gal-grid");
  var noRes  = document.getElementById("gal-no-results");
  var countEl= document.getElementById("gal-count");
  if (!grid) return;

  /* Filtrer */
  var list = GALERIE_DATA.filter(function (item) {
    var okAlbum = gal.currentAlbum === "tous" || item.album === gal.currentAlbum;
    var okType  = gal.currentType  === "tous" || item.type  === gal.currentType;
    return okAlbum && okType;
  });
  gal.filtered = list;

  if (countEl) countEl.textContent = list.length + " média" + (list.length > 1 ? "s" : "");

  grid.innerHTML = "";
  if (list.length === 0) {
    if (noRes) noRes.classList.remove("hidden");
    return;
  }
  if (noRes) noRes.classList.add("hidden");

  list.forEach(function (item, i) { grid.appendChild(buildCard(item, i)); });
  initReveal();
}

/* ======================================================
   FILTRES
   ====================================================== */
function initFilters() {
  /* Albums */
  document.querySelectorAll(".gal-filter-album").forEach(function (btn) {
    btn.addEventListener("click", function () {
      gal.currentAlbum = btn.dataset.album;
      document.querySelectorAll(".gal-filter-album").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      renderGrid();
    });
  });

  /* Type photo/vidéo */
  document.querySelectorAll(".gal-filter-type").forEach(function (btn) {
    btn.addEventListener("click", function () {
      gal.currentType = btn.dataset.type;
      document.querySelectorAll(".gal-filter-type").forEach(function (b) {
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
   LIGHTBOX
   ====================================================== */
gal.openLightbox = function (idx) {
  gal.currentIdx = idx;
  gal.renderLightboxItem();
  var lb = document.getElementById("gal-lightbox");
  lb.classList.remove("lb-hidden");
  document.body.style.overflow = "hidden";
  setTimeout(function () { document.getElementById("gal-lb-close").focus(); }, 80);
};

gal.closeLightbox = function () {
  document.getElementById("gal-lightbox").classList.add("lb-hidden");
  document.body.style.overflow = "";
};

gal.prev = function () {
  gal.currentIdx = (gal.currentIdx - 1 + gal.filtered.length) % gal.filtered.length;
  gal.renderLightboxItem();
};

gal.next = function () {
  gal.currentIdx = (gal.currentIdx + 1) % gal.filtered.length;
  gal.renderLightboxItem();
};

gal.renderLightboxItem = function () {
  var item = gal.filtered[gal.currentIdx];
  if (!item) return;
  var color = gal.albumColor(item.album);

  /* Media */
  var mediaEl = document.getElementById("gal-lb-media");
  if (item.type === "video" && item.videoUrl) {
    mediaEl.innerHTML =
      '<div class="relative w-full" style="padding-bottom:56.25%">' +
        '<iframe src="' + item.videoUrl + '?autoplay=1&rel=0" class="absolute inset-0 w-full h-full rounded-xl" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="' + item.titre + '"></iframe>' +
      '</div>';
  } else {
    mediaEl.innerHTML =
      '<div class="relative rounded-xl overflow-hidden bg-ardoise/20" style="background:linear-gradient(135deg,' + color + '33,' + color + '11)">' +
        '<img src="' + (item.src || "") + '" alt="' + item.titre + '" class="w-full max-h-[70vh] object-contain" />' +
      '</div>';
  }

  /* Infos */
  document.getElementById("gal-lb-titre").textContent = item.titre;
  document.getElementById("gal-lb-desc").textContent  = item.description || "";

  var metaEl = document.getElementById("gal-lb-meta");
  metaEl.innerHTML =
    '<span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium" style="background:' + color + '22; color:' + color + '">' +
      gal.albumLabel(item.album) +
    '</span>' +
    '<span class="text-xs text-ardoise/50">' + item.date + '</span>' +
    '<span class="text-xs text-ardoise/50 flex items-center gap-1">' +
      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
      item.lieu +
    '</span>';

  /* Compteur */
  var ctrEl = document.getElementById("gal-lb-counter");
  if (ctrEl) ctrEl.textContent = (gal.currentIdx + 1) + " / " + gal.filtered.length;
};

function initLightbox() {
  document.getElementById("gal-lb-close").addEventListener("click", gal.closeLightbox);
  document.getElementById("gal-lb-backdrop").addEventListener("click", gal.closeLightbox);
  document.getElementById("gal-lb-prev").addEventListener("click", function (e) { e.stopPropagation(); gal.prev(); });
  document.getElementById("gal-lb-next").addEventListener("click", function (e) { e.stopPropagation(); gal.next(); });

  /* Clavier */
  document.addEventListener("keydown", function (e) {
    var lb = document.getElementById("gal-lightbox");
    if (lb.classList.contains("lb-hidden")) return;
    if (e.key === "Escape")     gal.closeLightbox();
    if (e.key === "ArrowLeft")  gal.prev();
    if (e.key === "ArrowRight") gal.next();
  });

  /* Swipe tactile */
  var startX = 0;
  var mediaEl = document.getElementById("gal-lb-media");
  mediaEl.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  mediaEl.addEventListener("touchend",   function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { dx < 0 ? gal.next() : gal.prev(); }
  });
}

/* ======================================================
   STATISTIQUES HERO
   ====================================================== */
function renderStats() {
  var photos = GALERIE_DATA.filter(function (i) { return i.type === "photo"; }).length;
  var videos = GALERIE_DATA.filter(function (i) { return i.type === "video"; }).length;
  var albums = GALERIE_ALBUMS.length;

  var el = document.getElementById("gal-stats");
  if (!el) return;
  el.innerHTML =
    '<span>' + photos + ' photos</span>' +
    '<span class="w-1 h-1 rounded-full bg-white/30 inline-block align-middle"></span>' +
    '<span>' + videos + ' vidéos</span>' +
    '<span class="w-1 h-1 rounded-full bg-white/30 inline-block align-middle"></span>' +
    '<span>' + albums + ' albums</span>';
}

/* ======================================================
   REVEAL SCROLL
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
  }, { threshold: 0.05 });
  document.querySelectorAll(".reveal-item:not(.visible)").forEach(function (el) { obs.observe(el); });
}

/* ======================================================
   INIT
   ====================================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof GALERIE_DATA === "undefined") return;
  renderStats();
  initFilters();
  initLightbox();
  renderGrid();
});
