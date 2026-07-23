// =========================================================
// DONNÉES DU BUREAU EXÉCUTIF 2026
// Pour ajouter une photo : déposez le fichier dans
// assets/images/bureau/  et renseignez le champ "photo".
// Convention de nommage suggérée : prenom-nom.jpg
// Ex : "assets/images/bureau/herman-gbodossou.jpg"
// =========================================================
const BUREAU_DATA = [
  {
    id: "herman-gbodossou",
    prenom: "Herman",
    nom: "GBODOSSOU",
    role: "Président",
    roleShort: "Président",
    classe: "president",
    niveau: 1,
    annee: 2026,
    theme: "Ravivons l'amitié.",
    photo: "assets/images/bureau/herman-gbodossou.jpg"
  },
  {
    id: "noelie-kpohlo",
    prenom: "Noélie",
    nom: "KPOHLO",
    role: "Vice Présidente Exécutive",
    roleShort: "VP Exécutive",
    classe: "vice-president",
    niveau: 2,
    photo: "assets/images/bureau/noelie-kpohlo.jpg"
  },
  {
    id: "methode-hounkanrin",
    prenom: "Méthode",
    nom: "HOUNKANRIN",
    role: "Secrétaire Général",
    roleShort: "Secrétaire Général",
    classe: "membre",
    niveau: 2,
    photo: "assets/images/bureau/methode-hounkanrin.jpg"
  },
  {
    id: "guillaume-anani",
    prenom: "Guillaume",
    nom: "ANANI",
    role: "Trésorier Général",
    roleShort: "Trésorier Général",
    classe: "membre",
    niveau: 2,
    photo: "assets/images/bureau/guillaume-anani.jpg"
  },
  {
    id: "claudel-amedjrovi",
    prenom: "Claudel",
    nom: "AMEDJROVI",
    role: "Immediate Past Président",
    roleShort: "IPP 2025",
    classe: "membre",
    niveau: 3,
    annee: 2025,
    theme: "Let's Excel Together",
    photo: "assets/images/pasts/claudel-amedjrovi.jpg"
  },
  {
    id: "viviane-tossavi",
    prenom: "Viviane",
    nom: "TOSSAVI",
    role: "Conseillère Juridique",
    roleShort: "Conseillère Juridique",
    classe: "membre",
    niveau: 3,
    photo: "assets/images/bureau/viviane-tossavi.jpg"
  },
  {
    id: "valerie-nikoue",
    prenom: "Valérie",
    nom: "NIKOUE",
    role: "VP Affaires & Entrepreneuriat",
    roleShort: "VP Entrepreneuriat",
    classe: "membre",
    niveau: 3,
    photo: "assets/images/bureau/valerie-nikoue.jpg"
  },
  {
    id: "joviale-gnacadja",
    prenom: "Joviale Marcelle",
    nom: "GNACADJA",
    role: "VP Communication & Marketing",
    roleShort: "VP Communication",
    classe: "membre",
    niveau: 3,
    photo: "assets/images/bureau/joviale-gnacadja.jpg"
  },
  {
    id: "leroi-zanda",
    prenom: "Leroi Trésor",
    nom: "ZANDA",
    role: "VP Formation",
    roleShort: "VP Formation",
    classe: "membre",
    niveau: 3,
    photo: "assets/images/bureau/leroi-zanda.jpg"
  },
  {
    id: "carmel-lokossoudjin",
    prenom: "Carmel Espero",
    nom: "LOKOSSOUDJIN",
    role: "VP Relations Extérieures",
    roleShort: "VP Relations Ext.",
    classe: "membre",
    niveau: 4,
    photo: "assets/images/bureau/carmel-lokossoudjin.jpg"
  },
  {
    id: "nicaise-houngbedjro",
    prenom: "Nicaise",
    nom: "HOUNGBEDJRO",
    role: "Dir. Cabinet Présidentiel — Efficacité & Récompenses",
    roleShort: "Dir. Cabinet",
    classe: "membre",
    niveau: 4,
    photo: "assets/images/bureau/nicaise-houngbedjro.jpg"
  },
  {
    id: "fabrice-gboclou",
    prenom: "Fabrice",
    nom: "GBOCLOU",
    role: "Assistant du Président — Représentativité",
    roleShort: "Ass. Représentativité",
    classe: "membre",
    niveau: 4,
    photo: "assets/images/bureau/fabrice-gboclou.jpg"
  },
  {
    id: "elodie-medegnan",
    prenom: "Élodie",
    nom: "MEDEGNAN",
    role: "Assistante du Président — Questions du Genre",
    roleShort: "Ass. Genre",
    classe: "membre",
    niveau: 4,
    photo: "assets/images/bureau/elodie-medegnan.jpg"
  },
  {
    id: "fortune-dansou-ladji",
    prenom: "Fortuné",
    nom: "DANSOU-LADJI",
    role: "Directeur de l'Entrepreneuriat",
    roleShort: "Dir. Entrepreneuriat",
    classe: "membre",
    niveau: 4,
    photo: "assets/images/bureau/fortune-dansou-ladji.jpg"
  }
];

// =========================================================
// PASTS PRÉSIDENTS (anciens présidents)
// Pour ajouter une photo : assets/images/pasts/prenom-nom.jpg
// =========================================================
const PASTS_DATA = [
  { annee: 2013, prenom: "Maurice",        nom: "TOSSOU",    theme: "L'engagement change le monde", photo: "assets/images/pasts/maurice-tossou.jpg" },
  { annee: 2014, prenom: "Abraham",        nom: "KAKPO",     theme: "Toujours engagé pour une OL plus forte", photo: "assets/images/pasts/abraham-kakpo.jpg" },
  { annee: 2015, prenom: "Carole",         nom: "CODJO",     theme: "Impactons par l'action", photo: "assets/images/pasts/carole-codjo.jpg" },
  { annee: 2016, prenom: "Apollinaire",    nom: "SAGBO",     theme: "Vivons l'impact", photo: "assets/images/pasts/apollinaire-sagbo.jpg" },
  { annee: 2017, prenom: "Parfait",        nom: "GBOGBE",    theme: "Excellons dans l'impact", photo: "assets/images/pasts/parfait-gbogbe.jpg" },
  { annee: 2018, prenom: "Richard",        nom: "TANDJOMA",  theme: "Excellence mon impact", photo: "assets/images/pasts/richard-tandjoma.jpg" },
  { annee: 2019, prenom: "Pierre",         nom: "HOUNNOUVI", theme: "Maintenons l'impact", photo: "assets/images/pasts/pierre-hounnouvi.jpg" },
  { annee: 2020, prenom: "Jean de Dieu",   nom: "HOUNDETE",  theme: "Impactons par Excellence", photo: "assets/images/pasts/jean-houndete.jpg" },
  { annee: 2021, prenom: "Germain",        nom: "KAKPOSSA",  theme: "Agissons ensemble pour plus d'impact durable", photo: "assets/images/pasts/germain-kakpossa.jpg" },
  { annee: 2022, prenom: "Wilfried",       nom: "EHAKO",     theme: "Redynamisons l'excellence", photo: "assets/images/pasts/wilfried-ehako.jpg" },
  { annee: 2023, prenom: "Placide",        nom: "KOCOU",     theme: "Vivons l'excellence", photo: "assets/images/pasts/placide-cokou.jpg" },
  { annee: 2024, prenom: "C. R. José",     nom: "EDOH",      theme: "Rise Together", photo: "assets/images/pasts/reynard-edoh.jpg" },
  { annee: 2025, prenom: "Claudel",        nom: "AMEDJROVI", theme: "Let's Excel Together", photo: "assets/images/pasts/claudel-amedjrovi.jpg" },
  { annee: 2026, prenom: "Herman",         nom: "GBODOSSOU", theme: "Ravivons l'amitié.", statut: "Président actuel", photo: "assets/images/bureau/herman-gbodossou.jpg" }
];
