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
    nom: "Mairie de  Comé",
    logo: "assets/images/partenaires/mairie-come.jpg",
    site: "",
    type: "institutionnel",
    depuis: "2015",
    domaines: ["Assainissement", "Formation citoyenne", "Logistique"],
    description: "Collectivité territoriale partenaire, la Mairie de Comé accompagne les initiatives citoyennes et le développement local portés par la JCI Comé Excellence.",
    featured: true
  },
  {
    nom: "Mairie des Jeunes de Comé",
    logo: "assets/images/partenaires/mairie-jeunes-come.jpg",
    site: "",
    type: "institutionnel",
    depuis: "2025",
    domaines: ["Assainissement", "Formation citoyenne", "Logistique"],
    description: "Partenaire de la jeunesse, la Mairie des Jeunes de Comé collabore à l'organisation d'actions citoyennes et de projets dédiés aux jeunes.",
    featured: true
  },
  {
    nom: "ONG APS Bénin",
    logo: "assets/images/partenaires/aps.png",
    site: "",
    type: "ong",
    depuis: "2018",
    domaines: ["Santé communautaire", "Sensibilisation", "Prévention"],
    description: "Organisation engagée pour la santé communautaire, APS Bénin soutient les campagnes de sensibilisation et de prévention menées par la JCI Comé Excellence.",
    featured: true
  },
  {
    nom: "Radio FM Ahémé 87.7",
    logo: "assets/images/partenaires/radio-aheme.png",
    site: "",
    type: "media",
    depuis: "2016",
    domaines: ["Communication", "Sensibilisation", "Couverture médiatique"],
    description: "Média de proximité, Radio FM Ahémé 87.7 valorise les actions de la JCI Comé Excellence auprès des populations du Mono.",

  },
  {
    nom: "DigiSaim",
    logo: "assets/images/partenaires/digisaim.png",
    site: "",
    type: "entreprise",
    depuis: "2021",
    domaines: ["Numérique", "Formation", "Communication digitale"],
    description: "Agence spécialisée dans le numérique, DigiSaim accompagne la JCI Comé Excellence dans sa communication digitale et ses projets d'innovation.",

  },
  {
    nom: "Gbogbé Art School Association",
    logo: "assets/images/partenaires/gasa.png",
    site: "",
    type: "education",
    depuis: "2020",
    domaines: ["Art", "Culture", "Jeunesse"],
    description: "Association culturelle engagée, GASA favorise l'expression artistique et l'épanouissement des jeunes à travers des initiatives communes."
  },
  {
    nom: "Villa Karo",
    logo: "assets/images/partenaires/karo.png",
    site: "",
    type: "education",
    depuis: "2019",
    domaines: ["Culture", "Formation", "Échanges internationaux"],
    description: "Centre culturel de référence, Villa Karo encourage les échanges culturels et enrichit les projets artistiques et éducatifs de la JCI Comé Excellence."
  },
  {
    nom: "Providence HD",
    logo: "assets/images/partenaires/providence.png",
    site: "",
    type: "entreprise",
    depuis: "2022",
    domaines: ["Santé", "Logistique", "Événementiel"],
    description: "Entreprise de services, Providence HD apporte son expertise logistique et son accompagnement lors des actions communautaires de la JCI Comé Excellence."
  },
  {
    nom: "SHYB-TP",
    logo: "assets/images/partenaires/shybtp.png",
    site: "",
    type: "entreprise",
    depuis: "2023",
    domaines: ["BTP", "Environnement", "Infrastructure"],
    description: "Entreprise spécialisée dans les travaux publics, SHYB-TP soutient les projets d'aménagement et les initiatives en faveur du cadre de vie."
  },
  {
    nom: "CCMA Nonvizohwé",
    logo: "assets/images/partenaires/smhat.png",
    site: "",
    type: "institutionnel",
    depuis: "2017",
    domaines: ["Gouvernance locale", "Citoyenneté", "Développement"],
    description: "Acteur du développement local, le CCMA Nonvizohwé accompagne les initiatives citoyennes et renforce les collaborations institutionnelles."
  },
  {
    nom: "TA Studio",
    logo: "assets/images/partenaires/ta_studio.png",
    site: "",
    type: "media",
    depuis: "2022",
    domaines: ["Photo", "Vidéo", "Communication visuelle"],
    description: "Studio de création audiovisuelle, TA Studio met en valeur les projets et les événements de la JCI Comé Excellence à travers l'image."
  },
  {
    nom: "VIA-ME",
    logo: "assets/images/partenaires/via_me.png",
    site: "",
    type: "ong",
    depuis: "2020",
    domaines: ["Entrepreneuriat", "Jeunesse", "Mentorat"],
    description: "Organisation dédiée à l'entrepreneuriat, VIA-ME accompagne les jeunes dans le développement de leurs compétences et de leurs projets."
  },
  {
    nom: "CAAD – Centre d'Aide Afrique",
    logo: "assets/images/partenaires/caad.png",
    site: "",
    type: "ong",
    depuis: "2019",
    domaines: ["Développement", "Formation", "Solidarité"],
    description: "Organisation engagée pour le développement et la solidarité, le CAAD soutient les actions de formation et les projets à impact communautaire."
  },
  {
    nom: "GI Mono",
    logo: "assets/images/partenaires/gimono.png",
    site: "",
    type: "institutionnel",
    depuis: "2016",
    domaines: ["Économie locale", "Emploi", "Formation professionnelle"],
    description: "Acteur du développement économique local, GI Mono favorise les collaborations entre la JCI Comé Excellence et les entreprises du département."
  }
];