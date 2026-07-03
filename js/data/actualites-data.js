/* ============================================================
   actualites-data.js
   Structure enrichie — chaque article supporte désormais
   un corps complet (blocs typés) pour la page article.html
   ============================================================

   STRUCTURE D'UN ARTICLE
   ─────────────────────
   id           : string   — slug URL  (ex. "ag-2026")
   featured     : bool     — mis à la une sur actualites.html
   titre        : string
   chapeau      : string   — sous-titre / accroche (1–2 phrases)
   extrait      : string   — résumé court pour les cartes
   date         : string   — affichage humain
   dateISO      : string   — YYYY-MM-DD
   categorie    : string
   icone        : string   — clé icône SVG
   image        : string   — chemin image de couverture
   auteur       : object   { nom, role, bio, avatar }
   tags         : string[]
   corps        : Block[]  — contenu riche (voir types ci-dessous)

   TYPES DE BLOCS (corps[])
   ─────────────────────
   { type:"intro",     texte }
   { type:"h2",        texte, id }          ← ancre ToC
   { type:"p",         texte }
   { type:"quote",     texte, attribution } ← pull-quote
   { type:"list",      items: string[] }
   { type:"image",     src, alt, legende }
   { type:"callout",   titre, items: string[] }  ← encadré "À retenir"
   { type:"stats",     items: [{val, label}] }
   ============================================================ */

const ACTUALITES_DATA = [

  /* ══════════════════════════════════════════════════════════
     1. ARTICLE VEDETTE
     ══════════════════════════════════════════════════════════ */
  {
    id: "ag-2026",
    featured: true,
    titre: "Assemblée Générale Élective : un nouveau leadership pour construire l'avenir",
    chapeau: "Dans une salle comble, les membres ont adopté le programme d'actions 2026 et élu Herman GBODOSSOU à la présidence avec 93 % des voix.",
    extrait: "Les membres de la JCI Comé Excellence se sont réunis pour dresser le bilan du mandat écoulé, élire une nouvelle équipe dirigeante et définir les grandes orientations qui guideront les actions de l'organisation au cours de la nouvelle année.",
    date: "15 janvier 2026",
    dateISO: "2026-01-15",
    categorie: "Événement",
    icone: "users",
    image: "assets/images/actualites/ag.jpg",
    auteur: {
      nom: "Romaric HOUNKANRIN",
      role: "Secrétaire général, JCI Comé Excellence",
      bio: "Romaric HOUNKANRIN est membre fondateur de JCI Comé Excellence et Past Président de l'organisation (2019). Aujourd'hui Secrétaire général, il couvre la vie institutionnelle de la section depuis sa création en 2013.",
      avatar: "assets/images/membres/hounkanrin.jpg"
    },
    tags: ["Bureau", "Gouvernance", "2026"],
    corps: [
      {
        type: "intro",
        texte: "Le samedi 15 janvier 2026, la salle polyvalente du Centre Communautaire de Comé affichait complet. Quarante-deux membres actifs, une douzaine de Past Présidents et plusieurs représentants de la commune avaient répondu à l'invitation de JCI Comé Excellence pour la tenue de son Assemblée générale annuelle — un moment solennel qui marque chaque année le point de départ d'un nouvel exercice associatif."
      },
      {
        type: "h2",
        texte: "Un bilan 2025 salué à l'unanimité",
        id: "bilan-2025"
      },
      {
        type: "p",
        texte: "Le Président sortant, Fiacre ADJOVI, a ouvert la séance par la lecture du rapport moral de l'exercice 2025. En douze mois, l'organisation a mené dix-huit actions documentées, impliqué plus de deux cents bénévoles et touché directement trois mille cinq cents habitants de la commune. Le rapport financier, présenté par la Trésorière Générale Mariette DOSSOU, a fait état d'une gestion saine, avec un excédent budgétaire de 7 % réinvesti en fonds de roulement pour 2026."
      },
      {
        type: "stats",
        items: [
          { val: "18", label: "actions menées" },
          { val: "200+", label: "bénévoles mobilisés" },
          { val: "3 500", label: "bénéficiaires directs" },
          { val: "+7 %", label: "excédent budgétaire" }
        ]
      },
      {
        type: "quote",
        texte: "Nous avons prouvé en 2025 qu'une petite organisation peut produire un impact disproportionné quand elle est bien structurée, portée par des gens qui croient vraiment en ce qu'ils font.",
        attribution: "Fiacre ADJOVI, Président 2025 de JCI Comé Excellence"
      },
      {
        type: "h2",
        texte: "Herman GBODOSSOU élu Président avec 93 % des suffrages",
        id: "election"
      },
      {
        type: "p",
        texte: "L'élection du nouveau bureau a constitué le temps fort de la matinée. Trois candidats se sont présentés à la présidence. Après un tour unique à bulletins secrets, Herman GBODOSSOU a obtenu 93 % des suffrages exprimés. Âgé de 31 ans, ingénieur en génie civil et membre de JCI Comé Excellence depuis 2020, il avait notamment coordonné l'opération Semence d'avenir en 2024."
      },
      {
        type: "image",
        src: "assets/images/actualites/ag.jpg",
        alt: "Herman GBODOSSOU reçoit le gavel de la présidence lors de l'AG 2026",
        legende: "Transmission du gavel de la présidence — JCI Comé Excellence, 15 janvier 2026."
      },
      {
        type: "p",
        texte: "Dans son discours d'investiture, le nouveau Président a fixé le cap : « JCI Comé Excellence doit devenir, d'ici à décembre 2026, la section de référence non seulement du département du Mono, mais de tout le sud-ouest du Bénin. Pour cela, nous allons professionnaliser nos processus, renforcer nos partenariats et placer la formation de nos membres au cœur de nos priorités. »"
      },
      {
        type: "h2",
        texte: "Cinq axes stratégiques pour 2026",
        id: "axes-strategiques"
      },
      {
        type: "p",
        texte: "Le programme d'actions 2026 a été adopté à l'unanimité après une heure de débat. Il s'articule autour de cinq piliers qui traduisent la vision du nouveau bureau exécutif."
      },
      {
        type: "list",
        items: [
          "Entrepreneuriat des jeunes — création d'un fond d'amorçage de 500 000 F CFA pour les porteurs de projets locaux.",
          "Éducation citoyenne — partenariat avec les établissements scolaires de Comé pour des sessions d'éducation civique.",
          "Environnement — poursuite et amplification de l'opération Semence d'avenir sur les berges du lac Ahémé.",
          "Santé communautaire — organisation de deux campagnes de dépistage en partenariat avec le centre de santé de Comé.",
          "Renforcement institutionnel — mise en place d'un système de CRM interne pour le suivi des membres et des projets."
        ]
      },
      {
        type: "callout",
        titre: "À retenir",
        items: [
          "Herman GBODOSSOU élu Président 2026 avec 93 % des voix.",
          "18 actions réalisées et 3 500 bénéficiaires directs en 2025.",
          "5 axes stratégiques adoptés à l'unanimité pour l'exercice 2026.",
          "Fonds d'amorçage de 500 000 F CFA créé pour les jeunes entrepreneurs.",
          "Prochain rendez-vous : Forum Entrepreneur Comé, 10 avril 2026."
        ]
      },
      {
        type: "h2",
        texte: "Un nouveau bureau, une nouvelle énergie",
        id: "nouveau-bureau"
      },
      {
        type: "p",
        texte: "Outre la présidence, l'ensemble du bureau exécutif a été renouvelé. Les commissions thématiques — Environnement, Entrepreneuriat, Formation, Communication et Citoyenneté — seront chacune pilotées par un Vice-Président dédié. Cette organisation matricielle, inspirée des standards JCI International, vise à fluidifier la prise de décision et à responsabiliser davantage les membres dans la conduite des projets."
      },
      {
        type: "p",
        texte: "L'Assemblée générale s'est clôturée sur un cocktail fraternel et la traditionnelle photo de groupe. La prochaine réunion ordinaire du bureau est fixée au 5 février 2026."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     2. NONVIZAN
     ══════════════════════════════════════════════════════════ */
  {
    id: "nonvizan",
    titre: "Cérémonie Nonvizan : célébrer l'engagement, transmettre le leadership",
    chapeau: "La cérémonie annuelle de transmission a réuni anciens et nouveaux membres dans un moment d'une rare intensité émotionnelle.",
    extrait: "Dans une atmosphère empreinte de fraternité et de reconnaissance, la cérémonie Nonvizan a réuni anciens et nouveaux membres autour des valeurs qui fondent l'identité de la JCI : leadership, engagement et continuité.",
    date: "3 mars 2026",
    dateISO: "2026-03-03",
    categorie: "Distinction",
    icone: "award",
    image: "assets/images/actualites/nonvizan.jpg",
    auteur: {
      nom: "Adjovi KOSSOU",
      role: "Responsable Communication, JCI Comé Excellence",
      bio: "Adjovi KOSSOU pilote la stratégie de communication digitale de JCI Comé Excellence depuis 2024. Elle est également formatrice en prise de parole publique et couvre les événements institutionnels de la section.",
      avatar: "assets/images/membres/kossou.jpg"
    },
    tags: ["Traditions", "Membres", "Leadership"],
    corps: [
      {
        type: "intro",
        texte: "Il y a des cérémonies qui marquent un calendrier, et d'autres qui marquent des âmes. La Nonvizan appartient à la seconde catégorie. Chaque année, JCI Comé Excellence y réunit ses anciens et ses nouveaux membres pour un rituel de transmission qui donne à l'organisation son fil conducteur à travers le temps."
      },
      {
        type: "h2",
        texte: "Un rituel ancré dans l'identité de la section",
        id: "rituel-identite"
      },
      {
        type: "p",
        texte: "Le mot Nonvizan signifie en langue fon « celui qui hérite de la flamme ». Depuis 2015, la section de Comé organise cette cérémonie en début d'année pour officialiser le passage de témoin entre l'ancien bureau et le nouveau, en présence des Past Présidents. La forme a évolué au fil des éditions — on a ajouté un temps de parole libre, puis une séquence de mentorat croisé — mais l'esprit reste le même : ne pas couper le lien."
      },
      {
        type: "quote",
        texte: "Ce que nous avons construit depuis 2013 vaut parce que chaque génération a su prendre le relais avec rigueur et enthousiasme. La Nonvizan est le moment où cette continuité devient visible.",
        attribution: "Romaric HOUNKANRIN, Past Président 2019"
      },
      {
        type: "h2",
        texte: "L'édition 2026 : trente membres, dix Past Présidents",
        id: "edition-2026"
      },
      {
        type: "p",
        texte: "L'édition du 3 mars 2026 a réuni trente membres actifs et dix Past Présidents autour d'une table ronde installée dans la cour de la Maison des Jeunes de Comé. Chaque Past Président a partagé une leçon apprise pendant son mandat — succès, échec, surprise. Le nouveau Président Herman GBODOSSOU a conclu la séance en demandant à chaque membre présent de formuler un engagement personnel pour l'année."
      },
      {
        type: "image",
        src: "assets/images/actualites/nonvizan.jpg",
        alt: "Membres JCI réunis lors de la cérémonie Nonvizan 2026",
        legende: "Cercle de transmission — Nonvizan 2026, Maison des Jeunes de Comé."
      },
      {
        type: "h2",
        texte: "La force du réseau intergénérationnel",
        id: "reseau-intergenerationnel"
      },
      {
        type: "p",
        texte: "Au-delà du symbolique, la Nonvizan est un levier concret de développement pour l'organisation. Les anciens membres — devenus entrepreneurs, fonctionnaires, enseignants — offrent aux plus jeunes un réseau d'une valeur inestimable. Plusieurs partenariats noués dans l'histoire de JCI Comé Excellence ont leur origine dans une conversation informelle lors de cette cérémonie."
      },
      {
        type: "callout",
        titre: "En chiffres",
        items: [
          "11 éditions de la cérémonie Nonvizan depuis 2015.",
          "Plus de 80 membres actifs et anciens membres réunis au total sur toutes les éditions.",
          "3 partenariats institutionnels issus des mises en relation de la Nonvizan."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     3. SEMENCE D'AVENIR
     ══════════════════════════════════════════════════════════ */
  {
    id: "semence-avenir",
    titre: "Semence d'Avenir : 500 arbres pour préserver les berges du lac Ahémé",
    chapeau: "Pour sa troisième édition, l'opération de reboisement franchit un cap avec 500 plants mis en terre et 40 bénévoles mobilisés à l'occasion de la Journée mondiale de l'eau.",
    extrait: "Mobilisant bénévoles, partenaires et habitants de la commune, cette campagne de reboisement illustre l'engagement de la JCI Comé Excellence en faveur de la protection de l'environnement et du développement durable.",
    date: "22 mars 2026",
    dateISO: "2026-03-22",
    categorie: "Projet",
    icone: "leaf",
    image: "assets/images/actualites/semence.jpg",
    auteur: {
      nom: "Brice AZONKPON",
      role: "Vice-Président Environnement, JCI Comé Excellence",
      bio: "Brice AZONKPON est agronome de formation et responsable de la commission Environnement de JCI Comé Excellence depuis 2024. Il coordonne les opérations Semence d'avenir depuis leur lancement en 2024.",
      avatar: "assets/images/membres/azonkpon.jpg"
    },
    tags: ["Environnement", "Lac Ahémé", "Reboisement"],
    corps: [
      {
        type: "intro",
        texte: "Le lac Ahémé est une ressource vitale pour les populations du département du Mono : pêche, agriculture irriguée, transport fluvial. Mais ses berges subissent depuis deux décennies une pression croissante — déboisement, érosion, pollution des eaux. Face à cette réalité, JCI Comé Excellence a lancé en 2024 l'opération Semence d'avenir, un programme annuel de reboisement qui prend chaque édition un peu plus d'ampleur."
      },
      {
        type: "h2",
        texte: "22 mars, journée mondiale de l'eau : un symbole choisi",
        id: "journee-eau"
      },
      {
        type: "p",
        texte: "La date n'est pas un hasard. En ancrant l'opération à la Journée mondiale de l'eau, JCI Comé Excellence positionne son action dans un cadre international et donne à ses bénévoles le sentiment de participer à quelque chose de plus grand que leur commune. La communication autour de l'édition 2026 a intégré pour la première fois un volet numérique, avec une série de posts documentaires publiés sur les réseaux sociaux de l'organisation pendant les jours précédant l'action."
      },
      {
        type: "h2",
        texte: "500 plants, 3 espèces, 40 bénévoles",
        id: "details-operation"
      },
      {
        type: "p",
        texte: "Le 22 mars 2026 au matin, quarante personnes se sont retrouvées sur les berges nord du lac, à deux kilomètres du marché de Comé. Parmi elles : des membres JCI, des élèves de terminale du CEG de Comé, des riverains et deux techniciens du Projet GIRE-Lac, partenaire opérationnel de l'opération. Cinq cents plants ont été mis en terre en trois heures."
      },
      {
        type: "stats",
        items: [
          { val: "500", label: "plants mis en terre" },
          { val: "3", label: "espèces plantées" },
          { val: "40", label: "bénévoles" },
          { val: "3h", label: "durée de l'action" }
        ]
      },
      {
        type: "list",
        items: [
          "Palétuviers (Rhizophora) — espèce indigène, excellente fixatrice de berges et habitat naturel pour les juvéniles de poissons.",
          "Niaouli (Melaleuca quinquenervia) — arbre résilient, recommandé pour les zones humides dégradées.",
          "Acajou du Sénégal (Khaya senegalensis) — essence à forte valeur économique et écologique, offerte par le Projet GIRE-Lac."
        ]
      },
      {
        type: "image",
        src: "assets/images/actualites/semence.jpg",
        alt: "Bénévoles plantant des palétuviers sur les berges du lac Ahémé",
        legende: "Bénévoles JCI et riverains sur les berges du lac Ahémé — 22 mars 2026."
      },
      {
        type: "quote",
        texte: "Planter un arbre, c'est faire confiance à l'avenir. C'est dire que dans dix ans, quelqu'un bénéficiera de ce que nous faisons aujourd'hui. C'est exactement ce que JCI est censé faire.",
        attribution: "Brice AZONKPON, VP Environnement"
      },
      {
        type: "callout",
        titre: "Bilan des trois éditions (2024–2026)",
        items: [
          "1 100 plants mis en terre au total sur trois éditions.",
          "Taux de reprise estimé à 78 % sur les plants des éditions 2024 et 2025.",
          "Partenaires : Projet GIRE-Lac, Mairie de Comé, CEG de Comé.",
          "Prochaine édition : mars 2027 — objectif 800 plants."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     4. FORUM ENTREPRENEUR
     ══════════════════════════════════════════════════════════ */
  {
    id: "forum-entrepreneur",
    titre: "Forum Entrepreneur Comé 2026 : 150 jeunes, 40 projets, 3 lauréats",
    chapeau: "Première édition d'un forum qui ambitionne de devenir le rendez-vous annuel de l'écosystème entrepreneurial du département du Mono.",
    extrait: "Le premier forum dédié à l'entrepreneuriat jeune de la commune de Comé a réuni étudiants, porteurs de projets et financeurs dans un échange inédit.",
    date: "10 avril 2026",
    dateISO: "2026-04-10",
    categorie: "Formation",
    icone: "briefcase",
    image: "assets/images/actualites/forum-entrepreneur.jpg",
    auteur: {
      nom: "Céleste KPODJI",
      role: "VP Entrepreneuriat, JCI Comé Excellence",
      bio: "Céleste KPODJI est chef de projet et responsable de la commission Entrepreneuriat de JCI Comé Excellence. Elle a coordonné l'organisation du Forum Entrepreneur Comé 2026 de bout en bout.",
      avatar: "assets/images/membres/kpodji.jpg"
    },
    tags: ["Entrepreneuriat", "Forum", "Jeunesse"],
    corps: [
      {
        type: "intro",
        texte: "Dans le département du Mono, les jeunes qui veulent entreprendre manquent rarement d'idées. Ce qui leur manque, c'est un espace pour les tester, les confronter à des réalités économiques, et les connecter à des personnes qui peuvent les aider à aller plus loin. Le Forum Entrepreneur Comé 2026 a voulu être cet espace."
      },
      {
        type: "h2",
        texte: "Six heures d'un programme sans temps mort",
        id: "programme"
      },
      {
        type: "p",
        texte: "Le 10 avril 2026, dès 8 h 30, le Centre Communautaire de Comé accueillait les premiers participants. Le programme de la journée avait été conçu pour alterner entre conférences plénières, ateliers pratiques et moments de réseautage. Six panélistes — deux entrepreneurs à succès de la région, un représentant de la microfinance CLCAM, un fonctionnaire de la Direction Régionale du Commerce, une conseillère en financement de l'ANPE et un mentor JCI Bénin — se sont succédé au micro."
      },
      {
        type: "h2",
        texte: "40 projets sur scène, 3 lauréats sur le podium",
        id: "laureats"
      },
      {
        type: "p",
        texte: "L'après-midi a été entièrement consacré au pitching. Quarante porteurs de projets ont eu chacun cinq minutes pour présenter leur idée devant un jury de six membres. Les secteurs représentés couvraient l'agriculture, la transformation alimentaire, l'artisanat, le numérique et les services. Le jury a délibéré pendant trente minutes avant d'annoncer les trois lauréats."
      },
      {
        type: "list",
        items: [
          "1er prix — Esther DAGNON pour son projet de séchoir solaire mobile destiné aux femmes transformatrices de produits halieutiques du lac Ahémé.",
          "2e prix — Jean-Paul AÏKPE pour sa plateforme de mise en relation des artisans de Comé avec les clients de la diaspora béninoise.",
          "3e prix — Noémie AGOSSOU pour son concept de cantine scolaire bio approvisionnée en circuits courts par les maraîchers de la commune."
        ]
      },
      {
        type: "quote",
        texte: "Je n'avais jamais présenté mon projet devant autant de personnes. Maintenant j'ai un mentor, un réseau, et surtout la conviction que mon idée vaut quelque chose.",
        attribution: "Esther DAGNON, 1re lauréate du Forum Entrepreneur Comé 2026"
      },
      {
        type: "stats",
        items: [
          { val: "150+", label: "participants" },
          { val: "40", label: "projets présentés" },
          { val: "6", label: "panélistes" },
          { val: "3", label: "lauréats accompagnés" }
        ]
      },
      {
        type: "callout",
        titre: "Ce qui attend les lauréats",
        items: [
          "6 mois de mentorat individuel par les experts de JCI Bénin.",
          "Accès prioritaire au fonds d'amorçage de 500 000 F CFA lancé par JCI Comé Excellence.",
          "Intégration au réseau des alumni JCI pour des opportunités de partenariat.",
          "Suivi trimestriel de l'avancement de leur projet par la commission Entrepreneuriat."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     5. PARTENARIAT MAIRIE
     ══════════════════════════════════════════════════════════ */
  {
    id: "partenariat-mairie",
    titre: "JCI Comé Excellence et la Mairie formalisent leur partenariat pour 2026",
    chapeau: "Un protocole d'accord signé en présence du Maire ouvre la voie à une collaboration structurée sur trois axes : assainissement, commerce durable et formation.",
    extrait: "JCI Comé Excellence formalise sa collaboration avec la commune pour les actions citoyennes 2026, notamment en matière d'hygiène et d'assainissement.",
    date: "28 avril 2026",
    dateISO: "2026-04-28",
    categorie: "Partenariat",
    icone: "handshake",
    image: "assets/images/actualites/partenariat-mairie.jpg",
    auteur: {
      nom: "Herman GBODOSSOU",
      role: "Président 2026, JCI Comé Excellence",
      bio: "Herman GBODOSSOU est ingénieur en génie civil et Président de JCI Comé Excellence pour l'exercice 2026. Il s'est engagé à renforcer l'ancrage institutionnel de l'organisation auprès des pouvoirs publics locaux.",
      avatar: "assets/images/membres/gbodossou.jpg"
    },
    tags: ["Gouvernance", "Partenariat", "Commune"],
    corps: [
      {
        type: "intro",
        texte: "Depuis sa fondation en 2013, JCI Comé Excellence collabore de manière informelle avec la Mairie de Comé. Des membres JCI participent à des commissions communales, des élus locaux patronnent les événements de l'organisation. Mais cette collaboration n'avait jamais été formalisée. C'est désormais chose faite."
      },
      {
        type: "h2",
        texte: "Une signature publique, un signal fort",
        id: "signature"
      },
      {
        type: "p",
        texte: "Le 28 avril 2026, dans la salle des délibérations de la Mairie de Comé, le Président Herman GBODOSSOU et le Maire ont apposé leurs signatures sur un protocole d'accord de partenariat. La cérémonie, ouverte au public et aux médias locaux, a réuni une trentaine de personnes. Elle a constitué, au-delà de l'acte administratif, un signal politique fort : la commune reconnaît officiellement JCI Comé Excellence comme un acteur du développement local."
      },
      {
        type: "h2",
        texte: "Trois piliers pour un partenariat structuré",
        id: "trois-piliers"
      },
      {
        type: "list",
        items: [
          "Assainissement — co-organisation de trois campagnes de nettoyage de l'espace public entre mai et novembre 2026, avec mise à disposition de matériel par la commune.",
          "Commerce durable — déploiement de membres JCI comme animateurs dans les marchés de la commune pour diffuser les bonnes pratiques d'hygiène commerciale.",
          "Formation — accès à la salle d'archives de la Mairie pour les sessions de formation JCI, en échange d'une contribution en nature (équipements)."
        ]
      },
      {
        type: "quote",
        texte: "La Mairie de Comé a besoin de partenaires comme JCI : des jeunes organisés, motivés, capables d'agir vite sur le terrain. Ce protocole est le début d'une relation de longue durée.",
        attribution: "Le Maire de Comé, lors de la cérémonie de signature"
      },
      {
        type: "callout",
        titre: "À retenir",
        items: [
          "Premier protocole formel entre JCI Comé Excellence et la Mairie de Comé.",
          "Durée du partenariat : exercice 2026, renouvelable annuellement.",
          "3 axes : assainissement, commerce durable, formation.",
          "Engagement financier de la commune : mise à disposition de matériel et de locaux."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     6. FORMATION LEADERSHIP
     ══════════════════════════════════════════════════════════ */
  {
    id: "formation-leadership",
    titre: "Séminaire Leadership Authentique : 22 membres certifiés en deux jours",
    chapeau: "Un séminaire intensif, animé par un formateur agréé JCI International, a transformé la façon dont les membres de la section abordent la communication et la gestion de projets.",
    extrait: "Conduit par un formateur JCI certifié, ce séminaire intensif a renforcé les compétences de communication, de gestion de projets et de prise de décision des participants.",
    date: "9 mai 2026",
    dateISO: "2026-05-09",
    categorie: "Formation",
    icone: "graduation",
    image: "assets/images/actualites/formation-leadership.jpg",
    auteur: {
      nom: "Fatoumata SOGLOHOUN",
      role: "VP Formation, JCI Comé Excellence",
      bio: "Fatoumata SOGLOHOUN est coordinatrice de formation et responsable de la commission Formation de JCI Comé Excellence. Elle pilote le plan de développement des compétences des membres depuis 2025.",
      avatar: "assets/images/membres/soglohoun.jpg"
    },
    tags: ["Leadership", "Formation", "Membres"],
    corps: [
      {
        type: "intro",
        texte: "Une organisation n'est jamais plus forte que les gens qui la composent. C'est la conviction qui a guidé, depuis le début de l'exercice 2026, la commission Formation de JCI Comé Excellence dans la conception de son programme annuel. Premier temps fort de ce programme : le séminaire Leadership Authentique, organisé les 8 et 9 mai 2026."
      },
      {
        type: "h2",
        texte: "Un formateur JCI International à Comé",
        id: "formateur"
      },
      {
        type: "p",
        texte: "Le séminaire a été animé par Kodjo MENSAH, formateur agréé JCI International basé à Lomé. Spécialisé dans le développement du leadership et la facilitation de groupes, il intervient régulièrement dans les sections JCI d'Afrique de l'Ouest. Sa présence à Comé est le fruit d'un partenariat noué lors de la Conférence nationale JCI Bénin de juin 2025."
      },
      {
        type: "h2",
        texte: "Un programme en quatre modules",
        id: "modules"
      },
      {
        type: "list",
        items: [
          "Module 1 — Communication bienveillante : écoute active, reformulation, gestion des désaccords en réunion.",
          "Module 2 — Leadership situationnel : adapter son style de management au contexte et au profil des collaborateurs.",
          "Module 3 — Conduite de projets agile : méthodes Kanban et SCRUM appliquées à des projets associatifs.",
          "Module 4 — Prise de décision sous incertitude : outils de priorisation, analyse de risques, scenarii."
        ]
      },
      {
        type: "image",
        src: "assets/images/actualites/formation-leadership.jpg",
        alt: "Participants au séminaire Leadership Authentique de JCI Comé Excellence",
        legende: "Session de travail en groupe — Séminaire Leadership Authentique, 8–9 mai 2026."
      },
      {
        type: "quote",
        texte: "Je vais arrêter d'improviser mes réunions. J'ai compris que le respect du temps des autres, c'est aussi une forme de leadership.",
        attribution: "Un participant, membre actif depuis 2023"
      },
      {
        type: "stats",
        items: [
          { val: "22", label: "membres certifiés" },
          { val: "2", label: "jours de formation" },
          { val: "4", label: "modules" },
          { val: "100 %", label: "taux de satisfaction" }
        ]
      },
      {
        type: "callout",
        titre: "Prochaines formations prévues",
        items: [
          "Juillet 2026 — Communication digitale et gestion des réseaux sociaux.",
          "Septembre 2026 — Plaidoyer et dialogue civique.",
          "Novembre 2026 — Gestion financière pour associations."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     7. CAMPAGNE HYGIÈNE
     ══════════════════════════════════════════════════════════ */
  {
    id: "campagne-hygiene",
    titre: "Comé Propre : 3 km de rues nettoyées, 400 foyers sensibilisés en une matinée",
    chapeau: "Deuxième édition d'une opération devenue incontournable dans la commune — 40 bénévoles, des kits de tri et beaucoup d'énergie.",
    extrait: "Quarante membres et sympathisants ont battu le pavé du centre-ville de Comé pour une grande opération d'hygiène publique couplée à une sensibilisation porte-à-porte.",
    date: "16 mai 2026",
    dateISO: "2026-05-16",
    categorie: "Projet",
    icone: "leaf",
    image: "assets/images/actualites/hygiene.jpg",
    auteur: {
      nom: "Adjovi KOSSOU",
      role: "Responsable Communication, JCI Comé Excellence",
      bio: "Adjovi KOSSOU pilote la stratégie de communication digitale de JCI Comé Excellence depuis 2024. Elle est également formatrice en prise de parole publique et couvre les événements institutionnels de la section.",
      avatar: "assets/images/membres/kossou.jpg"
    },
    tags: ["Hygiène", "Bénévolat", "Comé"],
    corps: [
      {
        type: "intro",
        texte: "8 heures du matin, marché central de Comé. Quarante personnes en T-shirt blanc marqué du logo JCI Comé Excellence se répartissent en huit équipes. Chaque équipe reçoit des balais, des sacs-poubelles, des gants et — plus important — des centaines de dépliants explicatifs sur le tri des déchets ménagers. L'opération Comé Propre 2026 peut commencer."
      },
      {
        type: "h2",
        texte: "Une mobilisation en deux volets",
        id: "deux-volets"
      },
      {
        type: "p",
        texte: "La particularité de l'opération Comé Propre est d'articuler deux actions simultanées. D'un côté, quatre équipes nettoient les rues, les caniveaux et les abords du marché. De l'autre, quatre équipes vont de porte en porte pour sensibiliser les habitants. En trois heures, trois kilomètres de rues ont été balayés et quatre cents foyers visités."
      },
      {
        type: "stats",
        items: [
          { val: "3 km", label: "de rues nettoyées" },
          { val: "400", label: "foyers sensibilisés" },
          { val: "2", label: "camions de déchets" },
          { val: "400", label: "kits de tri distribués" }
        ]
      },
      {
        type: "h2",
        texte: "Un partenariat avec l'ONG AIDONS",
        id: "partenariat-aidons"
      },
      {
        type: "p",
        texte: "Nouveauté de cette édition : le partenariat avec l'ONG AIDONS, qui intervient dans le domaine de la santé communautaire dans la commune de Comé. Des agents de santé de l'ONG ont accompagné les équipes porte-à-porte pour renforcer les messages de sensibilisation avec une dimension médicale : prévention du paludisme, gestion des eaux stagnantes, importance du lavage des mains."
      },
      {
        type: "quote",
        texte: "On nettoie les rues, c'est visible. Mais le vrai travail, c'est de changer les habitudes. Et ça, ça commence par des conversations, porte à porte, famille par famille.",
        attribution: "Agent de santé AIDONS, volontaire sur l'opération"
      },
      {
        type: "callout",
        titre: "Prochaine édition",
        items: [
          "Opération Comé Propre #3 prévue en octobre 2026.",
          "Objectif : couvrir les quartiers nord et est de la commune.",
          "Ouvert aux volontaires non-membres — inscription via le formulaire de contact."
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════
     8. CONFÉRENCE NATIONALE JCI BÉNIN
     ══════════════════════════════════════════════════════════ */
  {
    id: "jci-beninoise",
    titre: "Conférence nationale JCI Bénin : Comé Excellence récompensée deux fois de suite",
    chapeau: "Pour la deuxième année consécutive, notre section reçoit le trophée de la section la plus active du département du Mono — une reconnaissance nationale qui engage pour l'avenir.",
    extrait: "Lors de la Conférence nationale JCI Bénin à Cotonou, notre section a reçu le prix de l'organisation la plus active du département du Mono pour la deuxième année consécutive.",
    date: "7 juin 2026",
    dateISO: "2026-06-07",
    categorie: "Distinction",
    icone: "award",
    image: "assets/images/actualites/conference-nationale.jpg",
    auteur: {
      nom: "Romaric HOUNKANRIN",
      role: "Secrétaire général, JCI Comé Excellence",
      bio: "Romaric HOUNKANRIN est membre fondateur de JCI Comé Excellence et Past Président de l'organisation (2019). Aujourd'hui Secrétaire général, il couvre la vie institutionnelle de la section depuis sa création en 2013.",
      avatar: "assets/images/membres/hounkanrin.jpg"
    },
    tags: ["Prix", "JCI Bénin", "Reconnaissance"],
    corps: [
      {
        type: "intro",
        texte: "La Conférence nationale JCI Bénin, qui réunit chaque année à Cotonou l'ensemble des sections locales du pays, est le moment où l'organisation prend la mesure de ce qu'elle accomplit collectivement. Et pour JCI Comé Excellence, l'édition 2026 restera longtemps dans les mémoires."
      },
      {
        type: "h2",
        texte: "Un prix décerné sur critères objectifs",
        id: "criteres"
      },
      {
        type: "p",
        texte: "Le trophée de la section la plus active du département du Mono n'est pas un prix de popularité. Il est attribué par le Comité de pilotage de JCI Bénin sur la base d'une grille d'évaluation stricte : nombre d'actions documentées, taux d'engagement des membres, qualité du reporting transmis à la fédération nationale, et impact mesurable des projets. JCI Comé Excellence a obtenu la note de 92/100, soit la meilleure score jamais enregistré pour une section du Mono."
      },
      {
        type: "stats",
        items: [
          { val: "92/100", label: "score d'évaluation" },
          { val: "2e", label: "année consécutive" },
          { val: "#1", label: "du département du Mono" },
          { val: "18", label: "sections évaluées au total" }
        ]
      },
      {
        type: "h2",
        texte: "Une distinction dédiée à tous les membres",
        id: "dedicace"
      },
      {
        type: "p",
        texte: "Sur scène, le Président Herman GBODOSSOU n'a pas attendu la fin de la cérémonie pour dédier le trophée : « Ce prix appartient à chaque membre qui a donné de son temps, de son énergie et parfois de son argent pour que nos projets aboutissent. Je suis fier de vous représenter ici ce soir. » Une déclaration qui a provoqué une standing ovation dans la salle."
      },
      {
        type: "quote",
        texte: "Recevoir ce trophée deux fois de suite, c'est une formidable validation. Mais c'est surtout une responsabilité : il faudra être à la hauteur en 2027.",
        attribution: "Herman GBODOSSOU, Président 2026 de JCI Comé Excellence"
      },
      {
        type: "h2",
        texte: "Et maintenant, viser le prix national",
        id: "prix-national"
      },
      {
        type: "p",
        texte: "Forte de ce résultat, JCI Comé Excellence a officiellement soumis sa candidature pour le prix de la meilleure section nationale, qui sera décerné à la conférence de décembre 2026. Pour y prétendre, la section devra démontrer un impact encore plus large et une innovation dans ses méthodes. Les équipes sont déjà mobilisées."
      },
      {
        type: "callout",
        titre: "Prochaines échéances",
        items: [
          "Dépôt du dossier de candidature au prix national : 30 septembre 2026.",
          "Conférence nationale JCI Bénin (décembre) : annonce du prix national.",
          "Rapport d'impact semestriel à transmettre à JCI Bénin avant le 15 juillet 2026."
        ]
      }
    ]
  }

];
