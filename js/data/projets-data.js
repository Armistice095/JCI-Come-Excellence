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

    description:
      "À travers cette initiative environnementale, la JCI Comé Excellence ambitionne de contribuer à la restauration des berges du lac Ahémé en mobilisant les communautés, les partenaires et les bénévoles autour d'actions de reboisement et de sensibilisation à la protection des écosystèmes.",

    descriptionLongue:
      "Le projet vise à renforcer la préservation des berges du lac Ahémé face aux effets de l'érosion et de la dégradation environnementale. Des campagnes de plantation d'arbres seront organisées avec la participation des jeunes, des communautés locales et des partenaires institutionnels. En parallèle, des séances de sensibilisation dans les établissements scolaires et les villages riverains permettront de promouvoir les bonnes pratiques en matière de protection de l'environnement et de développement durable.",

    date: "Mars 2026",
    statut: "À venir",
    impact: "Mobilisation citoyenne · Reboisement · Sensibilisation environnementale",
    featured: true
  },

  {
    id: "academie-entrepreneurs",
    titre: "Académie des jeunes entrepreneurs",
    categorie: "Entrepreneuriat",
    icone: "briefcase",
    image: "assets/images/projets/academie-entrepreneurs.jpg",

    description:
      "Un programme conçu pour accompagner les jeunes entrepreneurs et porteurs de projets à travers des formations, du mentorat et des ateliers pratiques afin de renforcer leurs compétences et favoriser la création d'entreprises durables.",

    descriptionLongue:
      "L'Académie des jeunes entrepreneurs offrira un parcours d'accompagnement complet, allant de la conception du projet à sa structuration et à son lancement. Les participants bénéficieront de sessions de formation, de rencontres avec des experts, d'un accompagnement personnalisé ainsi que d'opportunités de réseautage avec des entrepreneurs et partenaires. L'objectif est de développer une nouvelle génération de jeunes leaders capables de créer des entreprises innovantes et génératrices d'emplois.",

    date: "Janvier 2026",
    statut: "À venir",
    impact: "Formation · Mentorat · Réseautage · Accompagnement entrepreneurial",
    featured: true
  },

  {
    id: "lire-pour-reussir",
    titre: "Lire pour réussir",
    categorie: "Éducation",
    icone: "book",
    image: "assets/images/projets/lire-pour-reussir.jpg",

    description:
      "Parce que la lecture est un moteur de réussite, ce projet a pour ambition de favoriser l'accès aux livres et de développer le goût de la lecture chez les enfants et les jeunes grâce à des actions éducatives et des dons d'ouvrages.",

    descriptionLongue:
      "À travers cette initiative, la JCI Comé Excellence souhaite contribuer à l'amélioration de l'environnement éducatif dans les écoles de la commune de Comé. Des collectes de livres, des dons d'ouvrages, l'aménagement d'espaces de lecture et l'organisation d'activités pédagogiques permettront d'encourager les jeunes à lire davantage, à développer leur curiosité et à renforcer leurs compétences scolaires.",

    date: "Novembre 2025",
    statut: "À venir",
    impact: "Collecte de livres · Espaces de lecture · Sensibilisation des élèves",
    featured: true
  },
  {
  id: "impacts-educatifs",
  titre: "Impacts Éducatifs",
  categorie: "Éducation",
  icone: "book-open",
  image: "assets/images/projets/impacts-educatifs.jpg",
  description:
    "Une initiative éducative destinée à accompagner les apprenants à travers des activités de sensibilisation, de partage de connaissances et de renforcement de leurs capacités.",
  descriptionLongue:
    "Organisé à Agatogbo, le projet Impacts Éducatifs a offert aux apprenants un cadre d'échanges, d'apprentissage et de motivation favorisant leur réussite scolaire et leur développement personnel. Grâce à l'implication des bénévoles et partenaires, cette activité a permis de transmettre des connaissances utiles tout en encourageant les jeunes à croire en leur potentiel.",
  date: "20 Février 2026",
  statut: "Terminé",
  impact: "Éducation · Sensibilisation · Renforcement des capacités",
  featured: false
},

{
  id: "semences-jci",
  titre: "SEMENCES JCI",
  categorie: "Développement personnel",
  icone: "users",
  image: "assets/images/projets/semences-jci.jpg",
  description:
    "Une journée de découverte et de partage dédiée aux enfants afin de promouvoir les valeurs de leadership, de citoyenneté et de vivre-ensemble.",
  descriptionLongue:
    "À travers des activités ludiques, des ateliers d'apprentissage et un circuit touristique, les enfants ont vécu une expérience enrichissante placée sous le signe de l'amitié, de la découverte et de la convivialité. Le projet SEMENCES JCI illustre l'engagement de la JCI Comé Excellence à investir dans la jeunesse en développant dès le plus jeune âge les valeurs de responsabilité, de leadership et d'ouverture sur le monde.",
  date: "2026",
  statut: "Terminé",
  impact: "Jeunesse · Leadership · Citoyenneté",
  featured: true
},

{
  id: "operation-salubrite",
  titre: "Opération de Salubrité",
  categorie: "Environnement",
  icone: "trash-2",
  image: "assets/images/projets/operation-salubrite.jpg",
  description:
    "Une grande opération citoyenne de salubrité menée par les aspirants de la JCI Comé Excellence afin de promouvoir un cadre de vie propre et sensibiliser la population à la protection de l'environnement.",
  descriptionLongue:
    "Réalisée le 23 août 2025 dans l'arrondissement central de Comé, cette activité 100 % aspirants a mobilisé membres, partenaires et citoyens autour d'une vaste opération de nettoyage. Au-delà de l'assainissement des espaces publics, cette initiative a démontré le leadership, l'esprit d'équipe et l'engagement citoyen des jeunes de la JCI Comé Excellence en faveur d'une commune plus propre et plus agréable à vivre.",
  date: "23 Août 2025",
  statut: "Terminé",
  impact: "Salubrité · Mobilisation citoyenne · Leadership des aspirants",
  featured: true
},

{
  id: "brisons-solitude",
  titre: "Brisons la solitude, elle tue",
  categorie: "Communauté",
  icone: "heart",
  image: "assets/images/projets/brisons-solitude.jpg",
  description:
    "Un projet solidaire destiné à renforcer les liens sociaux, promouvoir la solidarité et sensibiliser la communauté à l'importance du soutien envers les personnes isolées.",
  descriptionLongue:
    "Le rendu du projet, organisé le 17 mai 2025, a réuni membres, partenaires et sympathisants de la JCI Comé Excellence autour d'un moment de partage, de fraternité et de reconnaissance. Cette initiative a permis de rappeler l'importance de la solidarité, du vivre-ensemble et de l'engagement citoyen. La cérémonie s'est clôturée par un moment convivial marqué par des hommages aux différents partenaires et acteurs ayant contribué au succès du projet.",
  date: "17 Mai 2025",
  statut: "Terminé",
  impact: "Solidarité · Inclusion sociale · Engagement citoyen",
  featured: true
},

{
  id: "future-planet",
  titre: "Future Planet",
  categorie: "Environnement",
  icone: "leaf",
  image: "assets/images/projets/future-planet.jpg",
  description:
    "Future Planet est une initiative de sensibilisation environnementale visant à promouvoir des habitudes de consommation plus saines en réduisant l'utilisation des sachets plastiques pour les aliments.",
  descriptionLongue:
    "Organisé au CEG 2 Agatogbo, le projet Future Planet a permis de sensibiliser les élèves ainsi que les femmes restauratrices aux risques sanitaires et environnementaux liés à l'utilisation des sachets plastiques pour les aliments chauds. À travers des échanges interactifs et des conseils pratiques, les participants ont découvert des alternatives plus respectueuses de la santé et de l'environnement, contribuant ainsi à la promotion d'un mode de vie plus durable.",
  date: "27 Mars 2024",
  statut: "Terminé",
  impact: "Sensibilisation · Santé · Protection de l'environnement",
  featured: false
}
];