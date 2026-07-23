/* =====================================================
   article.js - page de lecture des actualites
   ===================================================== */

(function () {
  "use strict";

  var CATEGORY_TOKENS = {
    "Vie associative": { accent: "#0F766E", soft: "#ECFDF5", text: "#0B544E" },
    "Assemblée Générale": { accent: "#14123A", soft: "#F1F0F8", text: "#14123A" },
    "Projet communautaire": { accent: "#1E96FC", soft: "#EFF6FF", text: "#0C6FCB" },
    "Représentation institutionnelle": { accent: "#0F766E", soft: "#ECFDF5", text: "#0B544E" },
    "Distinction": { accent: "#4FD1C5", soft: "#ECFDF5", text: "#0F766E" },
    "Partenariat": { accent: "#0C6FCB", soft: "#EFF6FF", text: "#0C6FCB" }
  };

  var TYPE_LABELS = {
    "reportage-photo": "Reportage photo",
    representation: "Représentation",
    projet: "Projet"
  };

  var ICONS = {
    calendar: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    map: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    user: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    image: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="15" height="15" rx="2"/><path d="m3 15 3.5-3.5a1.5 1.5 0 0 1 2 0L14 17"/><path d="M14 12.5l1.3-1.3a1.5 1.5 0 0 1 2 0L21 15"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    arrowLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>'
  };

  var state = {
    article: null,
    sorted: [],
    images: [],
    lightboxIndex: 0,
    activeHeadings: []
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toSlug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getAuthor(article) {
    if (article && article.auteur && typeof article.auteur === "object") {
      return article.auteur;
    }
    return {
      nom: article && article.auteur ? article.auteur : "Commission Communication et Marketing",
      role: "JCI Comé Excellence",
      bio: "La Commission Communication et Marketing valorise les actions, les projets et les temps forts de la JCI Comé Excellence.",
      avatar: "assets/images/icons/favicon-180.png"
    };
  }

  function getToken(category) {
    return CATEGORY_TOKENS[category] || { accent: "#1E96FC", soft: "#EFF6FF", text: "#0C6FCB" };
  }

  function getSortedArticles() {
    return getActualitesData().slice().sort(function (a, b) {
      return String(b.dateISO || "").localeCompare(String(a.dateISO || ""));
    });
  }

  function getActualitesData() {
    if (typeof ACTUALITES_DATA !== "undefined" && Array.isArray(ACTUALITES_DATA)) {
      return ACTUALITES_DATA;
    }
    return [];
  }

  function getReadingTime(article) {
    if (article.lecture) return article.lecture + " de lecture";
    var words = [article.titre, article.chapeau, article.extrait].join(" ").split(/\s+/).length;
    (article.corps || []).forEach(function (block) {
      if (block.texte) words += block.texte.split(/\s+/).length;
      if (block.items) words += block.items.join(" ").split(/\s+/).length;
    });
    return Math.max(1, Math.round(words / 220)) + " min de lecture";
  }

  function collectImages(article) {
    var seen = {};
    var images = [];

    function add(src, title) {
      if (!src || seen[src]) return;
      seen[src] = true;
      images.push({ src: src, title: title || article.titre });
    }

    add(article.image || (article.gallery && article.gallery.cover), "Image principale");
    ((article.gallery && article.gallery.photos) || []).forEach(function (src, index) {
      add(src, "Photo " + (index + 1));
    });
    (article.corps || []).forEach(function (block) {
      if (block.type === "gallery") {
        (block.images || []).forEach(function (src, index) {
          add(src, (block.titre || "Galerie") + " - " + (index + 1));
        });
      }
      if (block.type === "image") add(block.src || block.image, block.caption || block.titre);
    });

    return images;
  }

  function imageHTML(src, alt, className) {
    return '<img src="' + escapeHTML(src) + '" alt="' + escapeHTML(alt || "") + '" loading="lazy" class="' + className + '" onerror="this.closest(\'.js-image-wrap\') ? this.closest(\'.js-image-wrap\').remove() : this.remove()" />';
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text || "";
  }

  function setVisible(id, visible) {
    var el = $(id);
    if (el) el.classList.toggle("hidden", !visible);
  }

  function renderHero(article) {
    var token = getToken(article.categorie);
    var author = getAuthor(article);
    var image = article.image || (article.gallery && article.gallery.cover);
    var heroImg = $("art-hero-img");

    document.documentElement.style.setProperty("--art-accent", token.accent);
    document.title = article.titre + " - JCI Comé Excellence";

    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", article.extrait || article.chapeau || article.titre);

    if (heroImg) {
      heroImg.src = image || "";
      heroImg.alt = article.titre;
    }

    setText("art-cat-badge", article.categorie || "Actualité");
    setText("art-type-badge", TYPE_LABELS[article.type] || "");
    setVisible("art-type-badge", Boolean(TYPE_LABELS[article.type]));
    setText("art-titre", article.titre);
    setText("art-chapeau", article.chapeau || article.extrait || "");
    setText("art-meta-auteur", author.nom);
    setText("art-meta-date", article.date);
    setText("art-meta-time", getReadingTime(article));
    setText("art-meta-lieu", article.lieu || "");
    setVisible("art-meta-lieu-wrap", Boolean(article.lieu));

    var heroTags = $("art-tags");
    if (heroTags) {
      heroTags.innerHTML = (article.tags || []).slice(0, 8).map(function (tag) {
        return '<span class="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/65 border border-white/10">#' + escapeHTML(tag) + "</span>";
      }).join("");
    }
  }

  function renderEventBlock(block) {
    var items = [
      ["Date", block.date, ICONS.calendar],
      ["Lieu", block.lieu, ICONS.map],
      ["Catégorie", block.categorie, ICONS.image],
      ["Organisateur", block.organisateur, ICONS.user]
    ].filter(function (item) { return item[1]; });

    return '<section data-reveal class="my-8 grid sm:grid-cols-2 gap-3">' +
      items.map(function (item) {
        return '<div class="rounded-xl border border-ardoise/10 bg-white p-4 shadow-card">' +
          '<div class="flex items-center gap-2 text-azur-dark mb-1">' + item[2] +
          '<p class="text-[11px] uppercase tracking-wide font-semibold">' + escapeHTML(item[0]) + '</p></div>' +
          '<p class="font-heading font-semibold text-marine">' + escapeHTML(item[1]) + '</p>' +
        '</div>';
      }).join("") +
    '</section>';
  }

  function renderCalloutBlock(block) {
    return '<aside data-reveal class="my-8 rounded-xl border-l-4 bg-white p-5 sm:p-6 shadow-card" style="border-color:var(--art-accent)">' +
      (block.titre ? '<h3 class="font-heading text-base font-semibold text-marine mb-4">' + escapeHTML(block.titre) + '</h3>' : "") +
      '<ul class="space-y-3">' +
        (block.items || []).map(function (item) {
          return '<li class="flex gap-3 text-sm leading-relaxed text-ardoise/70"><span class="mt-0.5 text-azur-dark">' + ICONS.check + '</span><span>' + escapeHTML(item) + '</span></li>';
        }).join("") +
      '</ul>' +
    '</aside>';
  }

  function renderGalleryBlock(block, blockIndex) {
    var images = block.images || [];
    if (!images.length) return "";

    return '<section data-reveal class="my-10">' +
      (block.titre ? '<h3 class="font-heading text-lg font-semibold text-marine mb-4">' + escapeHTML(block.titre) + '</h3>' : "") +
      '<div class="grid grid-cols-2 gap-3 sm:gap-4">' +
        images.map(function (src, index) {
          var globalIndex = state.images.findIndex(function (img) { return img.src === src; });
          return '<button type="button" class="js-gallery-photo js-image-wrap group relative overflow-hidden rounded-xl bg-ardoise/10 aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-azur-dark focus:ring-offset-2" data-index="' + globalIndex + '" aria-label="Ouvrir la photo ' + (index + 1) + ' de la galerie">' +
            imageHTML(src, (block.titre || state.article.titre) + " " + (index + 1), "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105") +
            '<span class="absolute inset-0 bg-marine/0 group-hover:bg-marine/20 transition-colors"></span>' +
            '<span class="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-marine opacity-0 shadow-card transition-opacity group-hover:opacity-100">' + ICONS.image + '</span>' +
          '</button>';
        }).join("") +
      '</div>' +
    '</section>';
  }

  function renderListBlock(block) {
    return '<section data-reveal class="my-8">' +
      (block.titre ? '<h3 class="font-heading text-lg font-semibold text-marine mb-4">' + escapeHTML(block.titre) + '</h3>' : "") +
      '<ul class="art-list space-y-3">' +
        (block.items || []).map(function (item) {
          return '<li class="flex gap-3 rounded-xl bg-white border border-ardoise/10 px-4 py-3 text-ardoise/75 leading-relaxed"><span class="mt-1 text-azur-dark">' + ICONS.check + '</span><span>' + escapeHTML(item) + '</span></li>';
        }).join("") +
      '</ul>' +
    '</section>';
  }

  function renderBodyBlock(block, index) {
    if (!block || !block.type) return "";

    if (block.type === "intro") {
      return '<p data-reveal class="art-p text-xl leading-relaxed text-marine/85 font-medium mb-8">' + escapeHTML(block.texte) + '</p>';
    }
    if (block.type === "p") {
      return '<p data-reveal class="art-p text-[1.03rem] leading-8 text-ardoise/80 mb-6">' + escapeHTML(block.texte) + '</p>';
    }
    if (block.type === "h2") {
      var id = block.id || toSlug(block.texte);
      state.activeHeadings.push({ id: id, title: block.texte });
      return '<h2 id="' + escapeHTML(id) + '" data-reveal class="art-h2 text-2xl sm:text-3xl font-bold text-marine mt-12 mb-5">' + escapeHTML(block.texte) + '</h2>';
    }
    if (block.type === "gallery") return renderGalleryBlock(block, index);
    if (block.type === "event") return renderEventBlock(block);
    if (block.type === "callout") return renderCalloutBlock(block);
    if (block.type === "list") return renderListBlock(block);
    if (block.type === "quote") {
      return '<blockquote data-reveal class="art-quote my-9 border-l-4 pl-5 sm:pl-6" style="border-color:var(--art-accent)">' +
        '<p class="text-xl sm:text-2xl leading-relaxed text-marine italic">' + escapeHTML(block.texte || block.quote) + '</p>' +
        (block.attribution ? '<cite class="mt-3 block text-sm text-ardoise/50 not-italic">' + escapeHTML(block.attribution) + '</cite>' : "") +
      '</blockquote>';
    }
    if (block.type === "image") {
      var src = block.src || block.image;
      if (!src) return "";
      return '<figure data-reveal class="js-image-wrap my-9">' +
        '<button type="button" class="js-gallery-photo block w-full overflow-hidden rounded-xl bg-ardoise/10 focus:outline-none focus:ring-2 focus:ring-azur-dark focus:ring-offset-2" data-index="' + state.images.findIndex(function (img) { return img.src === src; }) + '">' +
          imageHTML(src, block.alt || block.caption || state.article.titre, "w-full max-h-[520px] object-cover") +
        '</button>' +
        (block.caption ? '<figcaption class="mt-3 text-sm text-ardoise/50">' + escapeHTML(block.caption) + '</figcaption>' : "") +
      '</figure>';
    }

    return "";
  }

  function renderBody(article) {
    var body = $("art-body");
    if (!body) return;
    state.activeHeadings = [];

    var blocks = article.corps && article.corps.length ? article.corps : [
      { type: "intro", texte: article.chapeau || article.extrait },
      { type: "p", texte: article.extrait }
    ];

    body.innerHTML = blocks.map(renderBodyBlock).join("");
  }

  function renderToc() {
    var toc = $("art-toc");
    if (!toc) return;

    if (!state.activeHeadings.length) {
      toc.classList.add("hidden");
      return;
    }

    toc.className = "rounded-xl bg-white border border-ardoise/10 p-4 shadow-card";
    toc.innerHTML = '<p class="text-xs font-semibold uppercase tracking-wide text-ardoise/40 mb-3">Sommaire</p>' +
      '<nav class="space-y-1">' +
        state.activeHeadings.map(function (heading, index) {
          return '<a class="toc-link flex items-start gap-2 rounded-lg px-2 py-2 text-sm text-ardoise/55 hover:bg-ardoise/5 hover:text-marine transition-colors" href="#' + escapeHTML(heading.id) + '">' +
            '<span class="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ardoise/8 text-[11px]">' + (index + 1) + '</span>' +
            '<span>' + escapeHTML(heading.title) + '</span>' +
          '</a>';
        }).join("") +
      '</nav>';
  }

  function renderAuthor(article) {
    var author = getAuthor(article);
    var block = $("art-auteur-block");
    if (!block) return;

    block.innerHTML =
      '<div class="flex gap-4">' +
        '<div class="js-image-wrap h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-ardoise/10">' +
          imageHTML(author.avatar || "assets/images/icons/favicon-180.png", author.nom, "h-full w-full object-cover") +
        '</div>' +
        '<div>' +
          '<h3 class="font-heading text-base font-semibold text-marine">' + escapeHTML(author.nom) + '</h3>' +
          '<p class="text-sm font-medium text-azur-dark mb-2">' + escapeHTML(author.role || "JCI Comé Excellence") + '</p>' +
          '<p class="text-sm leading-relaxed text-ardoise/65">' + escapeHTML(author.bio || "") + '</p>' +
        '</div>' +
      '</div>';
  }

  function renderFooterTags(article) {
    var footer = $("art-tags-footer");
    if (!footer) return;
    footer.innerHTML = (article.tags || []).map(function (tag) {
      return '<span class="text-xs px-2.5 py-1 rounded-full bg-ardoise/8 text-ardoise/55">#' + escapeHTML(tag) + '</span>';
    }).join("");
  }

  function articleCard(article) {
    var image = article.image || (article.gallery && article.gallery.cover);
    return '<a href="article.html?id=' + encodeURIComponent(article.id) + '" class="group block overflow-hidden rounded-xl border border-ardoise/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">' +
      '<div class="js-image-wrap relative h-36 overflow-hidden bg-ardoise/10">' +
        (image ? imageHTML(image, "", "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105") : "") +
        '<div class="absolute inset-0 bg-gradient-to-t from-marine/45 to-transparent"></div>' +
        '<span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-marine">' + escapeHTML(article.categorie || "Actualité") + '</span>' +
      '</div>' +
      '<div class="p-4">' +
        '<p class="mb-2 flex items-center gap-1.5 text-xs text-ardoise/45">' + ICONS.calendar + escapeHTML(article.date || "") + '</p>' +
        '<h3 class="line-clamp-2 font-heading text-base font-semibold leading-snug text-marine transition-colors group-hover:text-azur-dark">' + escapeHTML(article.titre) + '</h3>' +
        '<p class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-azur-dark">Lire l\'article ' + ICONS.arrow + '</p>' +
      '</div>' +
    '</a>';
  }

  function renderRelated(article) {
    var grid = $("art-related-grid");
    if (!grid) return;

    var byId = {};
    state.sorted.forEach(function (item) { byId[item.id] = item; });

    var selected = [];
    (article.related || []).forEach(function (id) {
      if (byId[id] && byId[id].id !== article.id && !selected.some(function (item) { return item.id === id; })) {
        selected.push(byId[id]);
      }
    });

    state.sorted.forEach(function (item) {
      if (selected.length >= 3) return;
      if (item.id !== article.id && item.categorie === article.categorie && !selected.some(function (x) { return x.id === item.id; })) {
        selected.push(item);
      }
    });

    state.sorted.forEach(function (item) {
      if (selected.length >= 3) return;
      if (item.id !== article.id && !selected.some(function (x) { return x.id === item.id; })) selected.push(item);
    });

    grid.innerHTML = selected.slice(0, 3).map(articleCard).join("");
  }

  function renderPrevNext(article) {
    var wrap = $("art-prevnext");
    if (!wrap) return;
    var index = state.sorted.findIndex(function (item) { return item.id === article.id; });
    var prev = state.sorted[index + 1] || null;
    var next = state.sorted[index - 1] || null;

    function navCard(item, label, alignRight) {
      if (!item) return '<div class="hidden sm:block"></div>';
      return '<a href="article.html?id=' + encodeURIComponent(item.id) + '" class="group rounded-xl border border-ardoise/10 bg-fondclair p-5 transition-all hover:bg-white hover:shadow-card">' +
        '<p class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ardoise/40 ' + (alignRight ? "justify-end" : "") + '">' +
          (alignRight ? escapeHTML(label) + " " + ICONS.arrow : ICONS.arrowLeft + " " + escapeHTML(label)) +
        '</p>' +
        '<h3 class="font-heading text-base font-semibold leading-snug text-marine group-hover:text-azur-dark ' + (alignRight ? "text-right" : "") + '">' + escapeHTML(item.titre) + '</h3>' +
      '</a>';
    }

    wrap.innerHTML = '<div class="grid gap-4 sm:grid-cols-2">' +
      navCard(prev, "Article précédent", false) +
      navCard(next, "Article suivant", true) +
    '</div>';
  }

  function openLightbox(index) {
    if (!state.images.length) return;
    state.lightboxIndex = Math.max(0, Math.min(index || 0, state.images.length - 1));
    updateLightbox();
    setVisible("art-lightbox", true);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setVisible("art-lightbox", false);
    document.body.style.overflow = "";
  }

  function moveLightbox(direction) {
    if (!state.images.length) return;
    state.lightboxIndex = (state.lightboxIndex + direction + state.images.length) % state.images.length;
    updateLightbox();
  }

  function updateLightbox() {
    var image = state.images[state.lightboxIndex];
    var img = $("art-lightbox-img");
    var counter = $("art-lightbox-counter");
    if (img && image) {
      img.src = image.src;
      img.alt = image.title || state.article.titre;
    }
    if (counter) counter.textContent = (state.lightboxIndex + 1) + " / " + state.images.length;
  }

  function initLightbox() {
    var galleryBtn = $("art-gallery-btn");
    if (galleryBtn) {
      galleryBtn.classList.toggle("hidden", state.images.length < 2);
      galleryBtn.addEventListener("click", function () { openLightbox(0); });
    }

    document.querySelectorAll(".js-gallery-photo").forEach(function (button) {
      button.addEventListener("click", function () {
        var index = Number(button.getAttribute("data-index"));
        openLightbox(Number.isFinite(index) && index >= 0 ? index : 0);
      });
    });

    var closeBtn = $("art-lightbox-close");
    var backdrop = $("art-lightbox-backdrop");
    var prev = $("art-lightbox-prev");
    var next = $("art-lightbox-next");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (backdrop) backdrop.addEventListener("click", closeLightbox);
    if (prev) prev.addEventListener("click", function () { moveLightbox(-1); });
    if (next) next.addEventListener("click", function () { moveLightbox(1); });

    document.addEventListener("keydown", function (event) {
      var lightbox = $("art-lightbox");
      if (!lightbox || lightbox.classList.contains("hidden")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    });
  }

  function initShare(article) {
    var button = $("art-share-btn");
    if (!button) return;

    button.addEventListener("click", function () {
      var payload = {
        title: article.titre,
        text: article.extrait || article.chapeau || article.titre,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(payload).catch(function () {});
        return;
      }

      navigator.clipboard.writeText(window.location.href).then(function () {
        var old = button.innerHTML;
        button.textContent = "Lien copié";
        setTimeout(function () { button.innerHTML = old; }, 1600);
      }).catch(function () {
        window.prompt("Copier le lien de l'article", window.location.href);
      });
    });
  }

  function initProgress() {
    var bar = $("art-progress-bar");
    var mobile = $("art-progress-mobile");
    function update() {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var percent = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (bar) bar.style.height = percent + "%";
      if (mobile) mobile.style.width = percent + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initTocSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc-link"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove("toc-active"); });
        var active = byId[entry.target.id];
        if (active) active.classList.add("toc-active");
      });
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0.01 });

    state.activeHeadings.forEach(function (heading) {
      var el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });
  }

  function showArticlePage() {
    setVisible("art-loading", false);
    setVisible("art-not-found", false);
    var hero = $("art-hero");
    if (hero) hero.classList.remove("hidden");
  }

  function showNotFound() {
    setVisible("art-loading", false);
    setVisible("art-not-found", true);
    document.querySelectorAll("main > :not(#art-loading):not(#art-not-found)").forEach(function (section) {
      section.classList.add("hidden");
    });
  }

  function boot() {
    if (!getActualitesData().length) {
      showNotFound();
      return;
    }

    state.sorted = getSortedArticles();
    var id = getParam("id") || (state.sorted[0] && state.sorted[0].id);
    var article = state.sorted.find(function (item) { return item.id === id; });

    if (!article) {
      showNotFound();
      return;
    }

    state.article = article;
    state.images = collectImages(article);

    renderHero(article);
    renderBody(article);
    renderToc();
    renderAuthor(article);
    renderFooterTags(article);
    renderPrevNext(article);
    renderRelated(article);
    showArticlePage();

    initLightbox();
    initShare(article);
    initProgress();
    initTocSpy();

    if (typeof window.initScrollReveal === "function") {
      setTimeout(window.initScrollReveal, 30);
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
