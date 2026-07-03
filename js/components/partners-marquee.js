function renderPartnerCard(p) {
  return (
    '<div class="partner-card flex-shrink-0 w-52 mx-3 flex flex-col items-center justify-center gap-3 bg-white border border-ardoise/10 rounded-xl px-6 py-6">' +
      '<div class="h-14 w-full flex items-center justify-center">' +
        '<img src="' + p.logo + '" alt="' + p.nom + '" loading="lazy" data-partner-logo class="max-h-14 max-w-full object-contain" />' +
      '</div>' +
      '<p class="text-xs font-medium text-ardoise/70 text-center leading-snug">' + p.nom + '</p>' +
    '</div>'
  );
}

function renderPartnersMarquee(containerId, list) {
  const wrap = document.getElementById(containerId);
  if (!wrap || !list.length) return;

  const track = document.createElement("div");
  track.className = "marquee-track";
  // La liste est dupliquée pour permettre une boucle de défilement parfaitement continue.
  track.innerHTML = list.map(renderPartnerCard).join("") + list.map(renderPartnerCard).join("");
  wrap.innerHTML = "";
  wrap.appendChild(track);

  // Si un logo ne charge pas, on le remplace par une icône neutre plutôt
  // que de laisser une icône d'image cassée : le nom reste de toute façon visible en dessous.
  track.querySelectorAll("[data-partner-logo]").forEach(function (img) {
    img.addEventListener("error", function () {
      const fallback = document.createElement("span");
      fallback.className = "text-marine/25";
      fallback.innerHTML = icon("flag", 26);
      img.replaceWith(fallback);
    }, { once: true });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  function setSpeed() {
    const singleSetWidth = track.scrollWidth / 2;
    const pxPerSecond = 55;
    const duration = Math.max(singleSetWidth / pxPerSecond, 12);
    track.style.animationDuration = duration + "s";
  }

  // On attend que les images aient leur taille pour mesurer correctement la largeur totale.
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(setSpeed);
  });
  window.addEventListener("resize", setSpeed);
}
