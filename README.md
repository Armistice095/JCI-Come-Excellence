# JCI Comé Excellence — Site officiel

Site web officiel de la Jeune Chambre Internationale (JCI) Comé Excellence, organisation locale de la JCI au Bénin. Le site présente l’organisation, ses actions, ses projets, ses actualités, ses partenaires et les modalités d’adhésion.

## Présentation

Ce projet est un site vitrine statique conçu pour valoriser les activités de JCI Comé Excellence et faciliter la prise de contact avec ses membres, partenaires et futurs adhérents.

Le site comprend notamment :

- une page d’accueil présentant la mission et les axes d’intervention de l’organisation ;
- une présentation de JCI Comé Excellence et de son bureau ;
- un catalogue des projets et actions menés ;
- une rubrique consacrée aux actualités et aux articles ;
- une page dédiée aux partenaires ;
- un formulaire de contact et une page d’adhésion ;
- une interface responsive adaptée aux ordinateurs, tablettes et smartphones.

## Technologies utilisées

- HTML5 pour la structure des pages ;
- Tailwind CSS pour le style et le design system ;
- JavaScript vanilla pour les interactions et le rendu dynamique ;
- Node.js et npm pour la compilation des styles ;
- `serve` pour lancer un serveur local de prévisualisation.

Le projet ne dépend d’aucun framework frontend ni d’un backend applicatif. Les contenus dynamiques sont stockés dans des fichiers JavaScript locaux.

## Pages disponibles

| Page | Fichier |
| --- | --- |
| Accueil | `index.html` |
| À propos | `a-propos.html` |
| Actualités | `actualites.html` |
| Article | `article.html` |
| Bureau et membres | `bureau-membres.html` |
| Contact | `contact.html` |
| Adhésion | `adhesion.html` |
| Partenaires | `partenaires.html` |
| Projets et actions | `projets.html` |

## Installation

### Prérequis

- Node.js 18 ou version ultérieure ;
- npm.

### Mise en place

Depuis le répertoire du projet :

```bash
npm install
```

## Développement

Pour compiler les styles Tailwind CSS en mode surveillance :

```bash
npm run dev
```

Dans un autre terminal, lancez le serveur local :

```bash
npm run serve
```

Le site sera ensuite accessible à l’adresse indiquée par le serveur local, généralement `http://localhost:3000`.

## Compilation pour la production

La feuille de style optimisée est générée avec :

```bash
npm run build
```

Cette commande compile `css/tailwind-input.css` vers `css/output.css` en version minifiée. Le fichier `css/output.css` est déjà inclus dans le projet ; une installation des dépendances n’est donc pas nécessaire pour consulter directement les pages HTML.

## Organisation du projet

```text
.
├── assets/
│   ├── icons/              # Favicons et icônes
│   ├── images/             # Logos, photos, projets, événements et partenaires
│   └── videos/             # Ressources vidéo
├── css/
│   ├── tailwind-input.css  # Source des styles et composants
│   └── output.css          # Feuille de style compilée
├── js/
│   ├── components/         # Composants réutilisables et interactions
│   ├── data/               # Données éditoriales du site
│   ├── pages/              # Logique propre à certaines pages
│   └── main.js              # Fonctionnalités communes
├── *.html                  # Pages du site
├── package.json            # Scripts et dépendances du projet
└── tailwind.config.js      # Configuration Tailwind CSS
```

## Mise à jour des contenus

Les données des projets, actualités, partenaires et membres sont centralisées dans le dossier `js/data/`. Cette organisation permet de mettre à jour le contenu sans modifier la structure HTML des pages.

Les principaux fichiers éditoriaux sont :

- `js/data/projets-data.js` ;
- `js/data/actualites-data.js` ;
- `js/data/partenaires-data.js` ;
- `js/data/bureau-data.js`.

Les images associées sont rangées dans `assets/images/` par catégorie. Après toute modification des classes Tailwind ou du fichier `css/tailwind-input.css`, il est recommandé d’exécuter `npm run build`.

## Déploiement

Le projet peut être déployé sur tout hébergement capable de servir des fichiers statiques, par exemple GitHub Pages, Netlify, Vercel ou un serveur web classique.

Aucune étape de compilation côté serveur n’est requise pour une livraison utilisant le fichier `css/output.css` déjà généré. Il suffit de publier les fichiers HTML, CSS, JavaScript et le dossier `assets/` en conservant leur arborescence.

## Maintenance

Avant chaque mise en ligne, il est conseillé de vérifier :

1. l’affichage des pages sur mobile et ordinateur ;
2. le fonctionnement du menu et des interactions JavaScript ;
3. les liens internes et les ressources médias ;
4. les formulaires de contact et d’adhésion selon le service de réception configuré ;
5. la génération de `css/output.css` après toute modification des styles.

## Auteur et organisation

Projet réalisé pour JCI Comé Excellence.

