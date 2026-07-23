/* ===================================================
   BUREAU RENDERER
   Hiérarchie du Comité Exécutif Local + Galerie des
   Past Présidents + Onglets avec curseur animé.
   =================================================== */

function initiales(prenom, nom) {
  const parts = (prenom || "").trim().split(" ");
  const p = parts[0].charAt(0).toUpperCase();
  const n = (nom || "").trim().charAt(0).toUpperCase();
  return p + n;
}

/* Portrait rectangulaire (format 4:5) avec repli en initiales
   si la photo est manquante ou ne charge pas. */
function portraitImg(prenom, nom, photo, opts) {
  opts = opts || {};
  const aspect = opts.aspect || "aspect-[4/5]";
  const textSize = opts.textSize || "text-2xl";
  const grad = opts.grad || "bg-gradient-to-br from-marine to-azur-dark";
  const imgClass = opts.imgClass || "absolute inset-0 w-full h-full object-cover";
  return (
    '<div class="relative ' + aspect + ' overflow-hidden">' +
      '<div class="absolute inset-0 flex items-center justify-center font-heading font-bold text-white ' + textSize + ' ' + grad + '">' + initiales(prenom, nom) + '</div>' +
      (photo ? '<img src="' + photo + '" alt="' + prenom + ' ' + nom + '" loading="lazy" class="' + imgClass + '" onerror="this.remove()" />' : '') +
    '</div>'
  );
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------- ONGLETS (avec curseur glissant) ---------- */
function initTabs() {
  const tabs = document.querySelectorAll("[data-tab-btn]");
  const panels = document.querySelectorAll("[data-tab-panel]");
  const indicator = document.getElementById("tab-indicator");

  function moveIndicator(btn) {
    if (!indicator || !btn) return;
    indicator.style.width = btn.offsetWidth + "px";
    indicator.style.transform = "translateX(" + btn.offsetLeft + "px)";
  }

  function activate(target) {
    let activeBtn = null;
    tabs.forEach(function (t) {
      const on = t.dataset.tabBtn === target;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.classList.toggle("tab-active", on);
      t.classList.toggle("tab-inactive", !on);
      if (on) activeBtn = t;
    });
    panels.forEach(function (p) {
      const on = p.dataset.tabPanel === target;
      if (on) {
        p.classList.remove("hidden");
        p.classList.add("tab-panel-enter");
        setTimeout(function () { p.classList.remove("tab-panel-enter"); }, 20);
      } else {
        p.classList.add("hidden");
      }
    });
    moveIndicator(activeBtn);
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activate(t.dataset.tabBtn); });
  });

  window.addEventListener("resize", function () {
    const current = document.querySelector('[data-tab-btn].tab-active') || tabs[0];
    moveIndicator(current);
  });

  activate("comite");
}

/* ---------- PRÉSIDENT — grande carte premium ---------- */
function renderPresident(p) {
  const el = document.getElementById("president-card");
  if (!el || !p) return;
  const theme = escapeHtml(p.theme || p.devise);
  const annee = p.annee || 2026;
  el.innerHTML =
    '<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-marine via-marine to-azur-dark shadow-2xl">' +
      '<div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" aria-hidden="true"></div>' +
      '<div class="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-turquoise/10 pointer-events-none" aria-hidden="true"></div>' +
      '<div class="relative grid sm:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr]">' +
        portraitImg(p.prenom, p.nom, p.photo, {
          aspect: "aspect-[4/5] sm:aspect-auto sm:h-full",
          textSize: "text-5xl",
          grad: "bg-gradient-to-br from-azur to-turquoise",
          imgClass: "absolute inset-0 w-full h-full object-cover"
        }) +
        '<div class="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center">' +
          '<span class="inline-flex items-center gap-2 self-start bg-turquoise/20 text-turquoise text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">' +
            '<span class="w-2 h-2 rounded-full bg-turquoise inline-block animate-pulse"></span>' +
            'Président ' + annee +
          '</span>' +
          '<h2 class="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">' + escapeHtml(p.prenom) + ' <span class="text-turquoise">' + escapeHtml(p.nom) + '</span></h2>' +
          (theme
            ? '<div class="max-w-xl rounded-2xl border border-white/10 bg-white/10 p-5">' +
                '<p class="text-[11px] font-semibold uppercase tracking-widest text-turquoise mb-2">Thème du mandat</p>' +
                '<blockquote class="italic text-white/90 text-lg sm:text-xl font-heading font-medium leading-relaxed">« ' + theme + ' »</blockquote>' +
              '</div>'
            : '')
        '</div>' +
      '</div>' +
    '</div>';
}

/* Petit connecteur visuel entre deux niveaux de la hiérarchie */
function tierConnector() {
  return (
    '<div class="flex justify-center py-3" aria-hidden="true">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-ardoise/25"><path d="M12 4v14"/><path d="m6 13 6 6 6-6"/></svg>' +
    '</div>'
  );
}

/* En-tête discret pour chaque niveau de la hiérarchie */
function tierLabel(text) {
  return '<p class="text-center text-[11px] font-semibold uppercase tracking-widest text-ardoise/40 mb-4">' + text + '</p>';
}

/* Carte d'un membre (niveaux 2, 3 et 4) */
function memberCard(m, delay, opts) {
  opts = opts || {};
  const isIpp = /past/i.test(m.role || "");
  const gradients = [
    "from-azur to-azur-dark", "from-marine to-azur-dark", "from-vert to-vert-dark",
    "from-turquoise to-vert-dark", "from-azur-dark to-marine", "from-vert-dark to-marine"
  ];
  const grad = "bg-gradient-to-br " + gradients[Math.abs(delay) % gradients.length];
  const accent = opts.accent
    ? '<div class="h-1.5 w-full bg-gradient-to-r from-azur to-turquoise"></div>'
    : '';
  const theme = m.theme
    ? '<p class="mt-3 text-xs leading-relaxed text-ardoise/70 bg-fondclair rounded-xl px-3 py-2">« ' + escapeHtml(m.theme) + ' »</p>'
    : '';
  const badge = isIpp && m.annee
    ? '<span class="absolute top-3 left-3 bg-white/95 backdrop-blur text-marine text-xs font-mono font-bold px-2.5 py-1 rounded-full">' + m.annee + '</span>'
    : '';
  return (
    '<div data-reveal style="transition-delay:' + delay + 'ms" ' +
         'class="group bg-white rounded-2xl border ' + (isIpp ? 'border-turquoise/40 ring-1 ring-turquoise/15 ' : 'border-ardoise/10 ') + 'overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">' +
      accent +
      '<div class="relative aspect-[4/5] overflow-hidden">' +
        '<div class="absolute inset-0 flex items-center justify-center font-heading font-bold text-white text-2xl ' + grad + '">' + initiales(m.prenom, m.nom) + '</div>' +
        (m.photo ? '<img src="' + escapeHtml(m.photo) + '" alt="' + escapeHtml(m.prenom + ' ' + m.nom) + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1" onerror="this.remove()" />' : '') +
        badge +
      '</div>' +
      '<div class="p-4 sm:p-5 text-center">' +
        '<h3 class="font-heading text-sm sm:text-base font-bold text-marine leading-snug">' + escapeHtml(m.prenom) + '<br/>' + escapeHtml(m.nom) + '</h3>' +
        '<span class="inline-block mt-2 text-[11px] sm:text-xs font-medium ' + (isIpp ? 'text-vert-dark bg-turquoise/15' : 'text-ardoise/60 bg-fondclair') + ' px-3 py-1 rounded-full leading-snug">' + escapeHtml(m.roleShort) + '</span>' +
        theme +
      '</div>' +
    '</div>'
  );
}

/* ---------- HIÉRARCHIE DU COMITÉ EXÉCUTIF ---------- */
function renderBureauHierarchy(list) {
  const president = list.find(function (m) { return m.niveau === 1; });
  const direction  = list.filter(function (m) { return m.niveau === 2; });
  const cadres     = list.filter(function (m) { return m.niveau === 3; });
  const membres    = list.filter(function (m) { return m.niveau === 4; });

  if (president) renderPresident(president);

  const elConnectorTop = document.getElementById("hierarchy-connector-1");
  if (elConnectorTop) elConnectorTop.innerHTML = tierConnector();

  const elDirection = document.getElementById("direction-grid");
  if (elDirection) {
    elDirection.innerHTML =
      tierLabel("Direction") +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">' +
        direction.map(function (m, i) { return memberCard(m, i * 80, { accent: true }); }).join("") +
      '</div>';
  }

  const elConnector2 = document.getElementById("hierarchy-connector-2");
  if (elConnector2) elConnector2.innerHTML = tierConnector();

  const elCadres = document.getElementById("cadres-grid");
  if (elCadres) {
    elCadres.innerHTML =
      tierLabel("Coordination") +
      '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">' +
        cadres.map(function (m, i) { return memberCard(m, i * 70); }).join("") +
      '</div>';
  }

  const elConnector3 = document.getElementById("hierarchy-connector-3");
  if (elConnector3) elConnector3.innerHTML = tierConnector();

  const elMembres = document.getElementById("membres-grid");
  if (elMembres) {
    elMembres.innerHTML =
      tierLabel("Équipe élargie") +
      '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">' +
        membres.map(function (m, i) { return memberCard(m, i * 60); }).join("") +
      '</div>';
  }
}

/* ---------- GALERIE DES PASTS PRÉSIDENTS ---------- */
function renderPastsGrid(list) {
  const el = document.getElementById("pasts-grid");
  if (!el) return;

  const gradients = [
    "from-azur to-azur-dark", "from-vert to-vert-dark", "from-turquoise to-vert-dark",
    "from-marine to-azur-dark", "from-azur-dark to-vert-dark", "from-vert-dark to-marine"
  ];

  el.innerHTML = list.slice().reverse().map(function (p, i) {
    const delay = (i % 4) * 70;
    const grad = gradients[i % gradients.length];
    const isCurrent = p.statut === "Président actuel";
    return (
      '<div data-reveal style="transition-delay:' + delay + 'ms" ' +
           'class="group bg-white rounded-2xl border ' + (isCurrent ? 'border-turquoise/50 ring-1 ring-turquoise/20 ' : 'border-ardoise/10 ') + 'overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">' +
        '<div class="relative aspect-[4/5] overflow-hidden">' +
          '<div class="absolute inset-0 flex items-center justify-center font-heading font-bold text-white text-2xl bg-gradient-to-br ' + grad + '">' + initiales(p.prenom, p.nom) + '</div>' +
          (p.photo ? '<img src="' + escapeHtml(p.photo) + '" alt="' + escapeHtml(p.prenom + ' ' + p.nom) + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1" onerror="this.remove()" />' : '') +
          '<span class="absolute top-3 left-3 bg-white/95 backdrop-blur text-marine text-xs font-mono font-bold px-2.5 py-1 rounded-full">' + p.annee + '</span>' +
          (isCurrent ? '<span class="absolute top-3 right-3 bg-turquoise text-marine text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">Actuel</span>' : '') +
        '</div>' +
        '<div class="p-4 sm:p-5 text-center flex flex-col min-h-[190px]">' +
          '<span class="text-[11px] font-semibold ' + (isCurrent ? 'text-vert-dark' : 'text-azur-dark') + ' uppercase tracking-wide">' + (isCurrent ? 'Président actuel' : 'Past Président') + '</span>' +
          '<h3 class="font-heading text-sm sm:text-base font-bold text-marine leading-snug mt-1">' + escapeHtml(p.prenom) + '<br/>' + escapeHtml(p.nom) + '</h3>' +
          '<p class="mt-3 text-xs leading-relaxed text-ardoise/70 bg-fondclair rounded-xl px-3 py-2 flex-1">« ' + escapeHtml(p.theme) + ' »</p>' +
        '</div>' +
      '</div>'
    );
  }).join("");
}

/* ---------- POINT D'ENTRÉE ---------- */
function initBureauPage() {
  if (typeof BUREAU_DATA === "undefined" || typeof PASTS_DATA === "undefined") return;
  renderBureauHierarchy(BUREAU_DATA);
  renderPastsGrid(PASTS_DATA);
  initTabs();
  // Re-déclencher le scroll-reveal sur les éléments injectés par JS
  if (typeof initScrollReveal === "function") {
    setTimeout(initScrollReveal, 50);
  }
}
