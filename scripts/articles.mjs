// Génère une page HTML statique par article : dist/actualites/<id>.html
// Les balises SEO (title, description, canonical, Open Graph, JSON-LD) sont
// écrites directement dans le HTML, sans dépendre de JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const abs = (site, p) => (p ? `${site}/${String(p).replace(/^\//, "")}` : "");

function noscriptBody(a) {
  const out = [`<h1>${esc(a.titre)}</h1>`];
  if (a.chapeau) out.push(`<p><strong>${esc(a.chapeau)}</strong></p>`);
  for (const b of a.corps || []) {
    if (b.type === "h2") out.push(`<h2>${esc(b.texte)}</h2>`);
    else if (b.type === "p" || b.type === "intro") out.push(`<p>${esc(b.texte)}</p>`);
    else if (b.type === "list" || b.type === "callout") {
      if (b.titre) out.push(`<h3>${esc(b.titre)}</h3>`);
      out.push(`<ul>${(b.items || []).map((i) => `<li>${esc(typeof i === "string" ? i : i.texte || i.titre || "")}</li>`).join("")}</ul>`);
    } else if (b.type === "event") {
      out.push(`<p>${esc([b.categorie, b.date, b.lieu, b.organisateur].filter(Boolean).join(" — "))}</p>`);
    }
  }
  return `<noscript><article>${out.join("")}</article></noscript>`;
}

const FRAGMENT_SCRIPT = `<script>
/* La page utilise <base href="/"> : on gère les ancres internes (#section) à la main. */
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  var id = decodeURIComponent(a.getAttribute("href").slice(1));
  var el = id && document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", location.pathname + "#" + id);
  }
});
</script>`;

export function generateArticlePages({ site, distDir, articles, templatePath = "article.html" }) {
  const template = readFileSync(templatePath, "utf8");
  mkdirSync(`${distDir}/actualites`, { recursive: true });

  const set = (html, re, value) => {
    if (!re.test(html)) throw new Error(`Balise introuvable dans le modèle : ${re}`);
    return html.replace(re, (_, p1, p2) => `${p1}${value}${p2}`);
  };

  for (const a of articles) {
    const url = `${site}/actualites/${encodeURIComponent(a.id)}`;
    const title = `${a.titre} - JCI Comé Excellence`;
    const desc = (a.extrait || a.chapeau || a.titre).replace(/\s+/g, " ").trim();
    const cover = abs(site, a.image || a.gallery?.cover);
    const images = [cover, ...(a.gallery?.photos || []).slice(0, 4).map((p) => abs(site, p))].filter(Boolean);

    let h = template;
    h = h.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`);
    h = set(h, /(<meta name="description" content=")[^"]*(")/, esc(desc));
    h = set(h, /(<link rel="canonical" href=")[^"]*(")/, url);
    h = set(h, /(<meta property="og:type" content=")[^"]*(")/, "article");
    h = set(h, /(<meta property="og:url" content=")[^"]*(")/, url);
    h = set(h, /(<meta property="og:title" content=")[^"]*(")/, esc(title));
    h = set(h, /(<meta property="og:description" content=")[^"]*(")/, esc(desc));
    h = set(h, /(<meta name="twitter:title" content=")[^"]*(")/, esc(title));
    h = set(h, /(<meta name="twitter:description" content=")[^"]*(")/, esc(desc));
    if (cover) {
      h = set(h, /(<meta property="og:image" content=")[^"]*(")/, cover);
      h = set(h, /(<meta name="twitter:image" content=")[^"]*(")/, cover);
    }
    // dimensions de l'image par défaut : non valables pour la couverture de l'article
    h = h.replace(/\s*<meta property="og:image:(?:width|height)"[^>]*>/g, "");
    h = h.replace(
      /(<meta property="og:image" content="[^"]*" \/>)/,
      `$1\n  <meta property="article:published_time" content="${esc(a.dateISO)}" />\n  <meta property="article:section" content="${esc(a.categorie || "Actualités")}" />`
    );

    h = h.replace(/(<meta charset="UTF-8"\s*\/>)/, `$1\n  <base href="/" />`);

    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.titre,
        description: desc,
        image: images,
        datePublished: a.dateISO,
        dateModified: a.dateISO,
        inLanguage: "fr",
        articleSection: a.categorie,
        keywords: Array.isArray(a.tags) ? a.tags.join(", ") : undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: "JCI Comé Excellence" },
        publisher: {
          "@type": "Organization",
          name: "JCI Comé Excellence",
          logo: { "@type": "ImageObject", url: `${site}/assets/images/logo/logo-jci-come-optimized.png` },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Actualités", item: `${site}/actualites` },
          { "@type": "ListItem", position: 3, name: a.titre, item: url },
        ],
      },
    ];
    const head =
      `  <script type="application/ld+json" id="ld-article">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>\n` +
      `  <script>window.ARTICLE_ID=${JSON.stringify(a.id)};</script>\n`;
    h = h.replace("</head>", head + "</head>");

    h = h.replace(/(<body[^>]*>)/, `$1\n${noscriptBody(a)}`);
    h = h.replace("</body>", `${FRAGMENT_SCRIPT}\n</body>`);

    writeFileSync(`${distDir}/actualites/${a.id}.html`, h);
  }
  return articles.length;
}
