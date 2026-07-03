# JCI Comé Excellence — Site web officiel

Site vitrine de JCI Comé Excellence, organisation locale affiliée à la Jeune Chambre Internationale (Comé, Mono, Bénin). Réalisé en HTML / Tailwind CSS / JavaScript vanilla, sans framework ni backend.

## Démarrage

```bash
npm install
npm run dev     # compile css/output.css en mode watch pendant le développement
npm run build   # génère un css/output.css minifié pour la production
npm run serve   # lance un serveur local (nécessaire : les pages chargent du JS en module)
```

Le fichier `css/output.css` livré est déjà compilé : vous pouvez ouvrir `index.html` immédiatement sans rien installer. Relancez `npm run build` uniquement si vous modifiez les classes Tailwind ou `css/tailwind-input.css`.

## Structure

- `index.html`, `a-propos.html`, etc. — une page par section du site.
- `assets/images/` — visuels organisés par usage (logo, hero, projets, événements, membres, partenaires). Le vrai logo fourni est utilisé tel quel.
- `assets/icons/` — favicons générés à partir du bouclier du logo.
- `css/tailwind-input.css` — fichier source : palette, polices, classes composants (`.btn-primary`, `.section-title`, `.shield-frame`, etc.).
- `js/data/*.js` — contenu des projets, événements et actualités sous forme de tableaux JavaScript. **C'est ici que vous mettrez à jour le contenu réel** sans toucher au HTML.
- `js/components/` — rendu des cartes, carrousel héro, bibliothèque d'icônes SVG inline.
- `js/main.js` — comportements globaux (menu mobile, révélation au scroll, compteurs animés, formulaire newsletter).

## Contenu à remplacer

Tous les textes, chiffres, événements, actualités, projets et logos partenaires actuellement dans le site sont des **contenus placeholders réalistes**, à remplacer par vos contenus réels :

- `js/data/projets-data.js`, `evenements-data.js`, `actualites-data.js`
- Les blocs marqués « Photo : … » dans les pages (zones image en attente de vos visuels)
- La section Partenaires (logos texte à remplacer par les vrais logos)
- Les coordonnées de contact dans le footer

## Design system

Voir `tailwind.config.js` pour la palette complète (marine, azur, turquoise, vert, ardoise) et les polices (Poppins pour les titres, Inter pour le texte courant, JetBrains Mono pour les statistiques chiffrées).
