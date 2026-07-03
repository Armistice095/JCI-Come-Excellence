/* ============================================================
   partenaires-data.js
   ============================================================

   STRUCTURE D'UN PARTENAIRE
   ─────────────────────────
   nom        : string
   logo       : string   — chemin vers le logo
   site       : string   — URL (optionnel)
   type       : string   — "institutionnel" | "entreprise" | "media" | "ong" | "education"
   depuis     : string   — année de début du partenariat
   domaines   : string[] — axes de collaboration
   description: string   — phrase courte présentant l'organisation
   featured   : bool     — mis en avant (grand format)
   ============================================================ */

const PARTENAIRES_TYPES = [
  { id: "tous",           label: "Tous" },
  { id: "institutionnel", label: "Institutionnels" },
  { id: "entreprise",     label: "Entreprises" },
  { id: "ong",            label: "ONG & Associations" },
  { id: "media",          label: "Médias" },
  { id: "education",      label: "Éducation & Culture" }
];

const PARTENAIRES_DATA = [
  {
    nom: "Mairie de Comé",
    logo: "assets/images/partenaires/mairie-jeunes-come.jpg",
    site: "",
    type: "institutionnel",
    depuis: "2015",
    domaines: ["Assainissement", "Formation citoyenne", "Logistique"],
    description: "Partenaire institutionnel historique de JCI Comé Excellence, la Mairie de Comé co-organise les campagnes citoyennes et met ses locaux à disposition.",
    featured: true
  },
  {
    nom: "ONG APS Bénin",
    logo: "assets/images/partenaires/aps.png",
    site: "",
    type: "ong",
    depuis: "2018",
    domaines: ["Santé communautaire", "Sensibilisation", "Prévention"],
    description: "L'ONG APS Bénin accompagne JCI Comé Excellence sur les volets santé de ses projets citoyens.",
    featured: true
  },
  {
    nom: "Radio FM Ahémé 87.7",
    logo: "assets/images/partenaires/radio-aheme.png",
    site: "",
    type: "media",
    depuis: "2016",
    domaines: ["Communication", "Sensibilisation", "Couverture médiatique"],
    description: "Radio locale de référence du Mono, Radio FM Ahémé assure la couverture médiatique des actions de JCI Comé Excellence.",
    featured: true
  },
  {
    nom: "DigiSaim",
    logo: "assets/images/partenaires/digisaim.png",
    site: "",
    type: "entreprise",
    depuis: "2021",
    domaines: ["Numérique", "Formation", "Communication digitale"],
    description: "Agence digitale béninoise, DigiSaim soutient JCI Comé Excellence dans sa transformation numérique et ses formations tech."
  },
  {
    nom: "Gbogbé Art School Association",
    logo: "assets/images/partenaires/gasa.png",
    site: "",
    type: "education",
    depuis: "2020",
    domaines: ["Art", "Culture", "Jeunesse"],
    description: "La GASA offre un espace d'expression artistique aux jeunes de Comé, en synergie avec les projets éducatifs JCI."
  },
  {
    nom: "Villa Karo",
    logo: "assets/images/partenaires/karo.png",
    site: "",
    type: "education",
    depuis: "2019",
    domaines: ["Culture", "Formation", "Échanges internationaux"],
    description: "Centre culturel franco-béninois basé à Grand-Popo, Villa Karo enrichit les projets culturels de JCI Comé Excellence."
  },
  {
    nom: "Providence HD",
    logo: "assets/images/partenaires/providence.png",
    site: "",
    type: "entreprise",
    depuis: "2022",
    domaines: ["Santé", "Logistique", "Événementiel"],
    description: "Entreprise de services médicaux et logistiques, Providence HD est partenaire opérationnel des campagnes de santé JCI."
  },
  {
    nom: "SHYB-TP",
    logo: "assets/images/partenaires/shybtp.png",
    site: "",
    type: "entreprise",
    depuis: "2023",
    domaines: ["BTP", "Environnement", "Infrastructure"],
    description: "Entreprise de travaux publics du Mono, SHYB-TP apporte son expertise technique aux projets d'aménagement de JCI."
  },
  {
    nom: "CCMA Nonvizohwé",
    logo: "assets/images/partenaires/smhat.png",
    site: "",
    type: "institutionnel",
    depuis: "2017",
    domaines: ["Gouvernance locale", "Citoyenneté", "Développement"],
    description: "Conseil communal du Mono, le CCMA Nonvizohwé facilite l'ancrage institutionnel de JCI Comé Excellence."
  },
  {
    nom: "TA Studio",
    logo: "assets/images/partenaires/ta_studio.png",
    site: "",
    type: "media",
    depuis: "2022",
    domaines: ["Photo", "Vidéo", "Communication visuelle"],
    description: "Studio de production audiovisuelle, TA Studio documente les événements et projets de JCI Comé Excellence."
  },
  {
    nom: "VIA-ME",
    logo: "assets/images/partenaires/via_me.png",
    site: "",
    type: "ong",
    depuis: "2020",
    domaines: ["Entrepreneuriat", "Jeunesse", "Mentorat"],
    description: "Structure d'accompagnement des jeunes entrepreneurs béninois, VIA-ME co-anime les sessions de l'Académie des entrepreneurs."
  },
  {
    nom: "CAAD – Centre d'Aide Afrique",
    logo: "assets/images/partenaires/caad.png",
    site: "",
    type: "ong",
    depuis: "2019",
    domaines: ["Développement", "Formation", "Solidarité"],
    description: "ONG panafricaine de solidarité et développement, le CAAD apporte des ressources de formation aux projets JCI."
  },
  {
    nom: "GI Mono",
    logo: "assets/images/partenaires/gimono.png",
    site: "",
    type: "institutionnel",
    depuis: "2016",
    domaines: ["Économie locale", "Emploi", "Formation professionnelle"],
    description: "Groupement interprofessionnel du Mono, GI Mono connecte JCI Comé Excellence au tissu économique local."
  }
];

/* Niveaux de partenariat (pour la section "Devenir partenaire") */
const PARTENARIAT_NIVEAUX = [
  {
    id: "or",
    label: "Partenaire Or",
    couleur: "#B8860B",
    couleurLight: "#FEF9E7",
    icone: "star",
    avantages: [
      "Logo en grand format sur toutes les communications officielles",
      "Mention systématique lors des événements JCI",
      "Participation au comité consultatif annuel",
      "Rapport d'impact annuel personnalisé",
      "Accès prioritaire aux talents formés par JCI",
      "Invitation aux événements privés du bureau"
    ]
  },
  {
    id: "argent",
    label: "Partenaire Argent",
    couleur: "#1E96FC",
    couleurLight: "#EFF6FF",
    icone: "shield",
    avantages: [
      "Logo sur le site web et les supports de communication",
      "Mention lors des événements phares JCI",
      "Accès aux formations ouvertes aux partenaires",
      "Rapport d'impact semestriel",
      "Visibilité sur les réseaux sociaux JCI"
    ]
  },
  {
    id: "bronze",
    label: "Partenaire Bronze",
    couleur: "#0F766E",
    couleurLight: "#F0FDFA",
    icone: "handshake",
    avantages: [
      "Logo sur le site web de JCI Comé Excellence",
      "Mention dans les newsletters de l'organisation",
      "Invitation aux événements publics JCI",
      "Certificat de partenariat officiel JCI"
    ]
  }
];
