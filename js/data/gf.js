// =========================================================
// DONNÉES ÉVÉNEMENTS
// Pour ajouter une photo : déposez-la dans
// assets/images/evenements/ et renseignez "image".
// Statuts : "a-venir" | "en-cours" | "passe"
// Catégories : "AG" | "Forum" | "Formation" | "Citoyenneté" | "Partenariat" | "Autre"
// =========================================================
const EVENEMENTS_DATA = [
  {
    id: "ag-2026",
    titre: "Assemblée Générale Annuelle 2026",
    categorie: "AG",
    jour: "14",
    mois: "Juil",
    moisNum: "07",
    annee: "2026",
    heure: "09h00",
    lieu: "Siège JCI Comé Excellence",
    ville: "Comé",
    description: "Bilan de l'année 2025-2026, présentation du programme d'actions 2027 et clôture officielle du mandat du bureau exécutif sortant.",
    programme: [
      "09h00 — Accueil des membres",
      "09h30 — Rapport moral du Président",
      "10h00 — Rapport financier du Trésorier",
      "10h30 — Présentation du programme 2027",
      "11h30 — Questions et délibérations",
      "12h00 — Clôture et cocktail"
    ],
    statut: "a-venir",
    featured: true,
    image: "assets/images/evenements/ag-2026.jpg"
  },
  {
    id: "forum-jeunesse-2026",
    titre: "Forum Jeunesse & Entrepreneuriat de Comé",
    categorie: "Forum",
    jour: "02",
    mois: "Août",
    moisNum: "08",
    annee: "2026",
    heure: "08h00",
    lieu: "Centre Communal Polyvalent",
    ville: "Comé",
    description: "Conférences, panels d'experts, stands d'exposition et réseautage pour les jeunes entrepreneurs et porteurs de projets du département du Mono.",
    programme: [
      "08h00 — Accueil et enregistrement",
      "09h00 — Cérémonie d'ouverture",
      "10h00 — Panel : Financer son projet au Bénin",
      "11h30 — Stands d'exposition",
      "14h00 — Ateliers thématiques",
      "16h00 — Pitch de startups",
      "17h30 — Clôture et networking"
    ],
    statut: "a-venir",
    featured: false,
    image: "assets/images/evenements/forum-2026.jpg"
  },
  {
    id: "journee-salubrite-2026",
    titre: "Journée de Salubrité Communautaire",
    categorie: "Citoyenneté",
    jour: "23",
    mois: "Août",
    moisNum: "08",
    annee: "2026",
    heure: "07h00",
    lieu: "Quartier Gare",
    ville: "Comé",
    description: "Grand nettoyage citoyen ouvert à tous les habitants et associations partenaires. Collecte de déchets, sensibilisation au tri et plantation symbolique.",
    programme: [
      "07h00 — Rassemblement Quartier Gare",
      "07h30 — Départ en équipes",
      "10h00 — Collecte et tri des déchets",
      "11h00 — Plantation symbolique",
      "12h00 — Clôture et rafraîchissements"
    ],
    statut: "a-venir",
    featured: false,
    image: "assets/images/evenements/salubrite-2026.jpg"
  }
];
