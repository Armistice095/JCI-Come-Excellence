// =========================================================
// DONNÉES PROJETS
// Pour ajouter un projet :
//   1. Déposez la photo dans assets/images/projets/
//   2. Ajoutez un objet dans ce tableau.
// Sans photo, un dégradé de couleur s'affiche automatiquement.
// =========================================================
const PROJETS_DATA = [
  {
    id: "reboisement-littoral",
    titre: "Reboisement du littoral de Comé",
    categorie: "Environnement",
    icone: "leaf",
    image: "assets/images/projets/reboisement-littoral.jpg",
    description: "Face aux défis liés à l'érosion côtière, ce projet mobilise des bénévoles, des partenaires et des communautés locales pour restaurer les berges du lac Ahémé grâce à la plantation d'arbres et à des actions de sensibilisation environnementale.",
    descriptionLongue: "Face à l'érosion progressive des berges du lac Ahémé, JCI Comé Excellence a mobilisé plus de 200 bénévoles sur trois journées consécutives pour planter 2 000 plants sélectionnés avec l'appui de botanistes locaux. Des ateliers de sensibilisation ont été organisés dans 8 écoles riveraines pour expliquer l'importance des zones humides et la préservation des ressources naturelles du département du Mono.",
    date: "Mars 2026",
    statut: "En cours",
    impact: "2 000 plants · 200 bénévoles · 8 écoles sensibilisées",
    featured: true
  },
  {
    id: "academie-entrepreneurs",
    titre: "Académie des jeunes entrepreneurs",
    categorie: "Entrepreneuriat",
    icone: "briefcase",
    image: "assets/images/projets/academie-entrepreneurs.jpg",
    description: "Un programme d'accompagnement destiné aux jeunes entrepreneurs et porteurs de projets, combinant formations, mentorat et ateliers pratiques pour transformer leurs idées en entreprises pérennes et créatrices de valeur.",
    descriptionLongue: "L'Académie des jeunes entrepreneurs est un programme intensif de 8 semaines qui couvre l'idéation, l'étude de marché, le plan d'affaires, le financement et le lancement. Chaque participant bénéficie d'un mentor issu du réseau JCI et d'un accès à un mini-fonds de démarrage. Sur la première cohorte de 30 participants, 18 ont lancé leur activité dans les 3 mois suivant la clôture de la formation.",
    date: "Janvier 2026",
    statut: "Terminé",
    impact: "30 formés · 18 entreprises créées · 8 semaines de formation",
    featured: true
  },
  {
    id: "lire-pour-reussir",
    titre: "Lire pour réussir",
    categorie: "Éducation",
    icone: "book",
    image: "assets/images/projets/lire-pour-reussir.jpg",
    description: "Parce que l'éducation est un puissant levier de développement, cette initiative favorise l'accès aux livres et encourage la lecture chez les plus jeunes à travers des dons d'ouvrages, la création d'espaces de lecture et des activités éducatives.",
    descriptionLongue: "Le projet Lire pour réussir répond au manque criant de ressources pédagogiques dans les écoles primaires de Comé. Grâce aux collectes organisées auprès des membres, partenaires et habitants, 1 200 ouvrages (manuels scolaires, livres de jeunesse, encyclopédies) ont été rassemblés, triés et remis à deux établissements prioritaires, dotés chacun d'un coin lecture aménagé.",
    date: "Novembre 2025",
    statut: "Terminé",
    impact: "1 200 livres · 2 écoles équipées · 600 élèves bénéficiaires",
    featured: true
  },
  {
    id: "sante-pour-tous",
    titre: "Santé pour tous",
    categorie: "Citoyenneté",
    icone: "heart",
    image: "assets/images/projets/sante-pour-tous.jpg",
    description: "Journée de dépistage gratuit du diabète et de l'hypertension organisée avec le centre de santé communal de Comé.",
    descriptionLongue: "En partenariat avec le centre de santé communal et des infirmiers bénévoles, JCI Comé Excellence a organisé une journée de dépistage gratuit ouverte à tous les habitants. Plus de 300 personnes ont bénéficié de consultations, mesures de glycémie et de tension artérielle, et d'une sensibilisation aux habitudes alimentaires saines. Les cas urgents détectés ont été orientés vers le suivi médical approprié.",
    date: "Septembre 2025",
    statut: "Terminé",
    impact: "300 personnes dépistées · 1 journée · 12 soignants mobilisés",
    featured: false
  },
  {
    id: "salubrite-quartiers",
    titre: "Quartiers propres",
    categorie: "Environnement",
    icone: "recycle",
    image: "assets/images/projets/salubrite-quartiers.jpg",
    description: "Campagnes mensuelles d'assainissement dans les quartiers de Comé, en partenariat avec la mairie et les associations de jeunesse.",
    descriptionLongue: "Chaque mois, les membres de JCI Comé Excellence investissent un quartier différent de la commune pour une journée de nettoyage, de sensibilisation au tri des déchets et de plantation de végétaux. Cette action récurrente, coordonnée avec la mairie et les associations de quartier, a permis de couvrir 12 zones en 2025 et de mobiliser plus de 400 bénévoles cumulés sur l'année.",
    date: "Action continue",
    statut: "En cours",
    impact: "12 quartiers · 400 bénévoles · action mensuelle",
    featured: false
  },
  {
    id: "numerique-rural",
    titre: "Numérique pour les artisans",
    categorie: "Innovation",
    icone: "device-laptop",
    image: "assets/images/projets/numerique-rural.jpg",
    description: "Initiation de 50 artisans et commerçantes locales aux outils numériques pour vendre leurs produits au-delà de Comé.",
    descriptionLongue: "Ce programme de formation numérique cible les artisans et petits commerçants de Comé qui n'ont pas accès aux formations classiques. En 5 ateliers pratiques, les participants apprennent à utiliser un smartphone pour photographier leurs produits, créer une page sur les réseaux sociaux et accepter des paiements mobiles. 50 artisans ont participé à la première édition, dont 32 ont déjà effectué leur première vente en ligne.",
    date: "Juin 2025",
    statut: "Terminé",
    impact: "50 artisans formés · 32 premières ventes en ligne",
    featured: false
  }
];
