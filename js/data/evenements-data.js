// =========================================================
// DONNÉES ÉVÉNEMENTS
// Pour ajouter une photo : déposez-la dans
// assets/images/evenements/ et renseignez "image".
// Statuts : "a-venir" | "en-cours" | "passe"
// Catégories : "AG" | "Forum" | "Formation" | "Citoyenneté" | "Partenariat" | "Autre"
//
// dateConnue : false → la date précise n'est pas encore fixée,
// l'affichage montre "À venir" au lieu d'un jour/mois/année.
// Dès que la date est confirmée, passer dateConnue à true et
// renseigner jour / mois / moisNum / annee.
// =========================================================
const EVENEMENTS_DATA = [

  {
    id: "ag-2026",
    titre: "Assemblée Générale Élective & Passation de Charges 2026",
    categorie: "AG",
    dateConnue: false,
    jour: null,
    mois: null,
    moisNum: null,
    annee: null,
    heure: "09h00",
    lieu: "Siège JCI Comé Excellence",
    ville: "Comé",
    description: "Moment fort de la vie de l'organisation, l'Assemblée Générale Élective et la Passation de Charges réunissent les membres autour du bilan du mandat écoulé, de l'élection des nouveaux dirigeants et de la transmission officielle des responsabilités. Cet événement marque une nouvelle étape dans la continuité du leadership et de l'engagement au service de la communauté.",
    programme: [
      "09h00 — Accueil et enregistrement des membres",
      "09h30 — Ouverture officielle de l'Assemblée Générale",
      "10h00 — Présentation des rapports moral, d'activités et financier",
      "11h00 — Échanges, débats et adoption des rapports",
      "11h30 — Élection du nouveau Bureau Exécutif Local",
      "12h30 — Cérémonie officielle de Passation de Charges",
      "13h00 — Allocution du Président entrant et présentation des orientations du mandat",
      "13h30 — Cocktail de fraternité et networking"
    ],
    statut: "a-venir",
    featured: true,
    image: "assets/images/evenements/ag-2026.jpg"
  },

  {
    id: "forum-jeunesse-2026",
    titre: "Forum Jeunesse & Entrepreneuriat de Comé",
    categorie: "Forum",
    dateConnue: false,
    jour: null,
    mois: null,
    moisNum: null,
    annee: null,
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
    dateConnue: false,
    jour: null,
    mois: null,
    moisNum: null,
    annee: null,
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
