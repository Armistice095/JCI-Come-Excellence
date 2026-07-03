function initHeroCarousel() {
  const root = document.querySelector("[data-hero-carousel]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const dotsWrap = root.querySelector("[data-carousel-dots]");
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const interval = 6000;

  const dots = slides.map(function (_, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Aller à la diapositive " + (i + 1));
    dot.className = "w-2.5 h-2.5 rounded-full bg-white/40 transition-colors duration-300 data-[active=true]:bg-white";
    dot.addEventListener("click", function () { goTo(i); restart(); });
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  function update() {
    slides.forEach(function (slide, i) {
      slide.style.opacity = i === current ? "1" : "0";
      slide.style.zIndex = i === current ? "1" : "0";
      slide.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      dot.dataset.active = i === current ? "true" : "false";
    });
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    update();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restart() {
    if (reduceMotion) return;
    if (timer) clearInterval(timer);
    timer = setInterval(next, interval);
  }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

  root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
  root.addEventListener("mouseleave", restart);
  root.addEventListener("focusin", function () { if (timer) clearInterval(timer); });
  root.addEventListener("focusout", restart);

  update();
  restart();
}
