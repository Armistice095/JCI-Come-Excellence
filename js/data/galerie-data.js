/* ============================================================
   galerie-data.js — Médias de JCI Comé Excellence
   ============================================================

   STRUCTURE D'UN MÉDIA
   ─────────────────────
   id        : string
   type      : "photo" | "video"
   album     : string    — clé d'album
   titre     : string
   description: string
   src       : string    — chemin image (ou thumbnail vidéo)
   videoUrl  : string    — (optionnel, si type="video") URL embed YouTube
   date      : string
   lieu      : string
   taille    : "sm" | "md" | "lg" | "xl"  — poids visuel dans la grille masonry
   ============================================================ */

const GALERIE_ALBUMS = [
  { id: "cdl",      label: "AGE",    couleur: "#0F766E" },
  { id: "evenements",   label: "Événements",         couleur: "#1E96FC" },
  { id: "formation",    label: "Formation",           couleur: "#14123A" },
  { id: "vie-asso",     label: "Vie associative",    couleur: "#4FD1C5" },
  { id: "distinctions", label: "Distinctions",       couleur: "#0C6FCB" }
];

const GALERIE_DATA = [

  /* ── PROJETS cdl ── */
  {
    id: "g01",
    type: "photo",
    album: "cdl",
    titre: "Reboisement lac Ahémé — plantation de palétuviers",
    description: "Opération Semence d\u2019avenir 2026 : 500 plants mis en terre sur les berges nord du lac Ahémé par 40 bénévoles.",
    src: "assets/images/galerie/cdl26.jpg",
    date: "22 mars 2026",
    lieu: "Berges du lac Ahémé, Comé",
    taille: "xl"
  },
  {
    id: "g02",
    type: "photo",
    album: "vie-asso",
    titre: "Opération Comé Propre — nettoyage du marché central",
    description: "Deuxième édition de Comé Propre : les équipes balaient les abords du marché central sous le soleil du matin.",
    src: "assets/images/galerie/5.png",
    date: "16 mai 2026",
    lieu: "Marché central, Comé",
    taille: "lg"
  },
  {
    id: "g03",
    type: "photo",
    album: "cdl",
    titre: "Distribution de kits de tri aux riverains",
    description: "Les membres JCI remettent 400 kits de tri des déchets ménagers lors de la campagne porte-à-porte.",
    src: "assets/images/galerie/ipp-p26.jpg",
    date: "16 mai 2026",
    lieu: "Quartier Kpodji, Comé",
    taille: "md"
  },
  {
    id: "g04",
    type: "video",
    album: "cdl",
    titre: "Reportage : Semence d\u2019avenir 2026 en images",
    description: "Retour en images sur la troisième édition de notre opération de reboisement sur les berges du lac Ahémé.",
    src: "assets/images/actualites/semence.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "25 mars 2026",
    lieu: "Comé, Bénin",
    taille: "md"
  },
  {
    id: "g05",
    type: "photo",
    album: "cdl",
    titre: "Campagne de dépistage VIH au centre de santé",
    description: "Partenariat avec le centre de santé de Comé pour une journée de dépistage gratuit et de sensibilisation.",
    src: "assets/images/a-propos/equipe.jpg",
    date: "12 février 2026",
    lieu: "Centre de santé de Comé",
    taille: "sm"
  },

  /* ── ÉVÉNEMENTS ── */
  {
    id: "g06",
    type: "photo",
    album: "evenements",
    titre: "Forum Entrepreneur Comé 2026 — séance de pitching",
    description: "Les 40 porteurs de projets se succèdent au micro devant le jury réuni pour la première édition du Forum.",
    src: "assets/images/actualites/ag.jpg",
    date: "10 avril 2026",
    lieu: "Centre Communautaire de Comé",
    taille: "xl"
  },
  {
    id: "g07",
    type: "photo",
    album: "evenements",
    titre: "Assemblée générale 2026 — vote à bulletins secrets",
    description: "Les membres procèdent à l\u2019élection du bureau exécutif 2026. Herman GBODOSSOU est élu avec 93 % des voix.",
    src: "assets/images/actualites/ag.jpg",
    date: "15 janvier 2026",
    lieu: "Centre Communautaire de Comé",
    taille: "lg"
  },
  {
    id: "g08",
    type: "photo",
    album: "evenements",
    titre: "Signature du partenariat avec la Mairie de Comé",
    description: "Le Président GBODOSSOU et le Maire de Comé apposent leur signature sur le protocole d\u2019accord 2026.",
    src: "assets/images/actualites/nonvizan.jpg",
    date: "28 avril 2026",
    lieu: "Hôtel de Ville, Comé",
    taille: "md"
  },
  {
    id: "g09",
    type: "video",
    album: "evenements",
    titre: "Forum Entrepreneur — remise des prix aux lauréats",
    description: "Cérémonie de remise des trophées aux trois lauréats du Forum Entrepreneur Comé 2026.",
    src: "assets/images/actualites/ag.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "10 avril 2026",
    lieu: "Centre Communautaire de Comé",
    taille: "sm"
  },
  {
    id: "g10",
    type: "photo",
    album: "evenements",
    titre: "Cocktail fraternel après l\u2019AG 2026",
    description: "Moment de convivialité entre membres actifs et Past Présidents à l\u2019issue de l\u2019assemblée générale.",
    src: "assets/images/hero/hero-1.jpg",
    date: "15 janvier 2026",
    lieu: "Centre Communautaire de Comé",
    taille: "sm"
  },

  /* ── FORMATION ── */
  {
    id: "g11",
    type: "photo",
    album: "formation",
    titre: "Séminaire Leadership Authentique — atelier en groupe",
    description: "Les 22 participants travaillent en sous-groupes sur les outils de communication bienveillante.",
    src: "assets/images/actualites/nonvizan.jpg",
    date: "8 mai 2026",
    lieu: "Salle de formation JCI, Comé",
    taille: "xl"
  },
  {
    id: "g12",
    type: "photo",
    album: "formation",
    titre: "Remise des attestations JCI aux participants",
    description: "Le formateur Kodjo MENSAH remet les 22 attestations JCI International aux membres certifiés.",
    src: "assets/images/projets/lire-pour-reussir.jpg",
    date: "9 mai 2026",
    lieu: "Salle de formation JCI, Comé",
    taille: "md"
  },
  {
    id: "g13",
    type: "video",
    album: "formation",
    titre: "Témoignages des participants au séminaire",
    description: "Trois membres certifiés partagent ce que le séminaire Leadership Authentique a changé dans leur quotidien.",
    src: "assets/images/actualites/nonvizan.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "12 mai 2026",
    lieu: "Comé, Bénin",
    taille: "md"
  },
  {
    id: "g14",
    type: "photo",
    album: "formation",
    titre: "Session Lire pour réussir — école primaire de Comé",
    description: "Des membres JCI animent une séance de lecture avec des élèves de CE2 dans le cadre du projet éducatif.",
    src: "assets/images/projets/lire-pour-reussir.jpg",
    date: "3 mars 2026",
    lieu: "École primaire publique de Comé",
    taille: "sm"
  },

  /* ── VIE ASSOCIATIVE ── */
  {
    id: "g15",
    type: "photo",
    album: "vie-asso",
    titre: "Cérémonie Nonvizan 2026 — cercle de transmission",
    description: "30 membres et 10 Past Présidents réunis pour le rituel de transmission intergénérationnel.",
    src: "assets/images/actualites/nonvizan.jpg",
    date: "3 mars 2026",
    lieu: "Maison des Jeunes, Comé",
    taille: "xl"
  },
  {
    id: "g16",
    type: "photo",
    album: "vie-asso",
    titre: "Réunion mensuelle du bureau exécutif",
    description: "Le bureau se réunit pour le point d\u2019avancement des projets du trimestre.",
    src: "assets/images/hero/hero-2.jpg",
    date: "5 février 2026",
    lieu: "Siège JCI Comé Excellence",
    taille: "md"
  },
  {
    id: "g17",
    type: "photo",
    album: "vie-asso",
    titre: "Séance photo officielle du bureau 2026",
    description: "Portrait officiel du nouveau bureau exécutif de JCI Comé Excellence pour l\u2019exercice 2026.",
    src: "assets/images/hero/hero-3.jpg",
    date: "20 janvier 2026",
    lieu: "Comé, Bénin",
    taille: "lg"
  },
  {
    id: "g18",
    type: "photo",
    album: "vie-asso",
    titre: "Visite de solidarité — membre hospitalisé",
    description: "Les membres JCI rendent visite à un des leurs au centre hospitalier de Comé — la fraternité en actes.",
    src: "assets/images/a-propos/equipe.jpg",
    date: "18 avril 2026",
    lieu: "Centre hospitalier de Comé",
    taille: "sm"
  },

  /* ── DISTINCTIONS ── */
  {
    id: "g19",
    type: "photo",
    album: "distinctions",
    titre: "Réception du trophée — Conférence nationale JCI Bénin",
    description: "Herman GBODOSSOU reçoit le trophée de la section la plus active du Mono pour la 2e année consécutive.",
    src: "assets/images/temoignage/methode.jpg",
    date: "7 juin 2026",
    lieu: "Cotonou, Bénin",
    taille: "xl"
  },
  {
    id: "g20",
    type: "photo",
    album: "distinctions",
    titre: "Délégation JCI Comé à la conférence nationale",
    description: "La délégation de cinq membres représentant la section lors de la conférence annuelle de JCI Bénin.",
    src: "assets/images/projets/academie-entrepreneurs.jpg",
    date: "7 juin 2026",
    lieu: "Cotonou, Bénin",
    taille: "md"
  }
];
