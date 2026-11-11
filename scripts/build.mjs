// Build statique : compile Tailwind, copie les fichiers publics dans dist/,
// puis génère sitemap.xml à partir des pages et des articles.
import { execSync } from "node:child_process";
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import { generateArticlePages } from "./articles.mjs";

const SITE = "https://jcicomee.org";
const DIST = "dist";

// 1) CSS
execSync("npx tailwindcss -i ./css/tailwind-input.css -o ./css/output.css --minify", { stdio: "inherit" });

// 2) dist/
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);
for (const f of readdirSync(".")) {
  if (f.endsWith(".html")) cpSync(f, `${DIST}/${f}`);
}
for (const f of ["robots.txt", "site.webmanifest", "_headers"]) {
  if (existsSync(f)) cpSync(f, `${DIST}/${f}`);
}
for (const d of ["assets", "css", "js"]) cpSync(d, `${DIST}/${d}`, { recursive: true });
rmSync(`${DIST}/css/tailwind-input.css`, { force: true });

// 3) sitemap.xml
const lastmodOf = (file) => {
  try {
    const d = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { encoding: "utf8" }).trim();
    return d || new Date().toISOString().slice(0, 10);
  } catch { return new Date().toISOString().slice(0, 10); }
};

const pages = [
  { file: "index.html", path: "/", priority: "1.0", freq: "weekly" },
  { file: "a-propos.html", path: "/a-propos", priority: "0.8", freq: "monthly" },
  { file: "projets.html", path: "/projets", priority: "0.8", freq: "monthly" },
  { file: "actualites.html", path: "/actualites", priority: "0.9", freq: "weekly" },
  { file: "bureau-membres.html", path: "/bureau-membres", priority: "0.6", freq: "yearly" },
  { file: "partenaires.html", path: "/partenaires", priority: "0.6", freq: "monthly" },
  { file: "adhesion.html", path: "/adhesion", priority: "0.7", freq: "monthly" },
  { file: "contact.html", path: "/contact", priority: "0.7", freq: "yearly" },
];

const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync("js/data/actualites-data.js", "utf8") + "\nthis.__A = ACTUALITES_DATA;", ctx);
const articles = ctx.__A || [];

const url = (loc, lastmod, freq, prio) =>
  `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`;

const entries = [
  ...pages.map((p) => url(SITE + p.path, lastmodOf(p.file), p.freq, p.priority)),
  ...articles.map((a) =>
    url(`${SITE}/actualites/${encodeURIComponent(a.id)}`, a.dateISO || lastmodOf("js/data/actualites-data.js"), "yearly", "0.6")
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
writeFileSync(`${DIST}/sitemap.xml`, xml);

// 4) pages d'articles statiques + modèle article.html (ancien format ?id=) hors index
const n = generateArticlePages({ site: SITE, distDir: DIST, articles });
let tpl = readFileSync(`${DIST}/article.html`, "utf8");
tpl = tpl.replace(/\s*<link rel="canonical"[^>]*>/, "").replace(/content="index, follow[^"]*"/, 'content="noindex, follow"');
writeFileSync(`${DIST}/article.html`, tpl);
console.log(`${n} pages d'articles générées dans dist/actualites/`);
console.log(`dist/ prêt : ${pages.length} pages + ${articles.length} articles dans sitemap.xml`);
