import { BRAND_LAB } from "../../brand/data.js";
import type { TestText } from "./en.js";

export const fr: TestText = {
  title: "SkywalkLab",
  description: "Du local à l'illimité",
  text: "Passez à l'étape suivante.",
  allRightsReserved: "Tous droits réservés.",
  navLinks: ["Accueil", "À propos", "Services", "Tarifs", "Contact"],
  items: { start: "Début", step: "Étape", finish: "Fin" },
  services: [
    {
      text: "Design systems",
      overview:
        "Une bibliothèque de composants partagée, des tokens et une documentation pour que chaque page du produit soit construite à partir des mêmes éléments. Audits, conventions de nommage et un Storybook que votre équipe peut vraiment lire."
    },
    {
      text: "Développement web",
      overview:
        "Des sites et applications SvelteKit conçus pour la rapidité et l'accessibilité. Rendus côté serveur par défaut, typés de bout en bout et déployés avec des aperçus sur chaque branche."
    },
    {
      text: "Performance",
      overview:
        "Travail sur Lighthouse et les Core Web Vitals : traitement des images, chargement des polices, découpage des bundles et mise en cache. Mesuré avant et après, chiffres à l'appui."
    },
    {
      text: "SEO et données structurées",
      overview:
        "Métadonnées, sitemaps et schémas JSON-LD que les moteurs de recherche savent lire. D'abord les correctifs techniques, puis la structure de contenu qui les soutient."
    },
    {
      text: "Maintenance",
      overview:
        "Mises à jour des dépendances, correctifs de sécurité et surveillance de la disponibilité, à intervalles réguliers. Vous recevez un court rapport chaque mois plutôt qu'une mauvaise surprise chaque année."
    }
  ],
  contact: {
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    location: "Votre ville",
    locationLabel: "Adresse",
    hours: "Lun-Dim 9h-23h",
    hoursLabel: "Horaires",
    cta: "Planifier une consultation technique"
  },
  slideDescriptions: [
    "Un studio web sur la Côte d'Azur, qui crée des sites rapides et accessibles pour les entreprises dont l'ancien site ne suffit plus.",
    "Dites-nous ce que le site doit faire. Nous vous dirons ce qu'il faut pour y arriver, et ce que cela coûte.",
    "Commencez par votre ville et allez au-delà — le même site fonctionne pour la rue d'à côté comme pour l'autre bout du monde."
  ],
  segments: [
    [{ text: "Conception et développement" }],
    [{ text: "Hébergement " }, { text: "inclus", bold: true }],
    [{ text: "Modifications illimitées" }],
    [{ text: "Assistance " }, { text: "24h/24, 7j/7", bold: true }],
    [{ text: "Mises à jour à vie" }],
    [{ text: "Conçu avec " }, { text: "SvelteKit", bold: true }]
  ],
  stats: ["Années d'expérience", "Projets réalisés", "Membres de l'équipe", "Clients satisfaits"],
  loadingMessage: "...chargement",
  aboutCta: "À propos de nous",
  contactLabels: { name: "Nom", email: "E-mail", phone: "Téléphone", message: "Message", button: "Envoyer" },
  pageHeadingBanner2: { pageTitle: "Services, style 1", home: "Accueil" },
  pressQuote: {
    quote: "Une plateforme fiable qui couvre l'essentiel des besoins des petites équipes.",
    publication: "Revue du secteur",
    body: "Conçue pour les équipes qui veulent des outils adaptés à leur façon de travailler."
  },
  statStrip: ["Projets livrés", "En activité depuis", "Assistance"],
  founderCard: { role: "Fondateur·rice", contact: "Nous contacter" },
  pricingCard: { notIncluded: ["Assistance prioritaire", "Intégrations sur mesure"] },
  testimonialCarousel: { title: "En leurs propres mots" },
  aiChatbot: {
    chatSuggestions: [
      "Quel composant utiliser pour une section de tarifs ?",
      "Quelles props DefaultButton accepte-t-il ?",
      "Comment styliser un bouton avec un module CSS ?",
      "Comment utiliser un composant comme custom element ?"
    ],
    assistantGreetingMsg: "👋 Posez vos questions sur les composants, les custom elements ou les plugins",
    errorMessage: "L'IA est déconnectée. Contactez-nous pour obtenir le lien vers l'IA connectée.",
    speakerLabels: { user: "Vous", assistant: `Assistant IA ${BRAND_LAB.company}` },
    placeholder: `Posez-moi vos questions sur ${BRAND_LAB.company}`
  },
  animatedMermaidDiagram: { caption: "Le déroulement de l'automatisation de bout en bout" },
  clickableTabs: { ariaLabel: "Notre méthode" },
  tabDrawer: { tabText: "En savoir plus" },
  staggeredSlideshowHero: {
    ctaText: "Travaillez avec nous dès aujourd'hui"
  },
  cookieBanner: {
    necessary: {
      label: "Cookies essentiels : ",
      description:
        "Nécessaires au fonctionnement du site, notamment l'authentification des utilisateurs et la sécurité."
    },
    tracking: { description: "Utilisés à des fins publicitaires." },
    analytics: {
      description:
        "Utilisés pour contrôler Google Analytics, un outil tiers proposé par Google pour suivre le comportement des utilisateurs."
    },
    marketing: {
      label: "Cookies marketing : ",
      description: "Utilisés pour les données marketing. Actuellement non utilisés sur ce site."
    }
  },
  imageCardGrid: { linkText: "Lire la suite" },
  logoList: { mainSite: "Site principal", demos: "Démos", demo: "Démo" },
  overlapIconCards: [
    { title: "Démo en direct", description: "Voyez-le fonctionner avant de vous engager." },
    { title: "Import de données", description: "Récupérez vos données existantes." },
    { title: "Formation", description: "Sessions sur site, en ligne et en salle." }
  ],
  previewList: {
    component: "Composant",
    dir: "Catégorie",
    description:
      "Parcourez la bibliothèque un composant à la fois. Survolez une ligne pour l'aperçu, puis ouvrez-la pour le voir en action avec ses détails."
  },
  processFlow: {
    title: "Comment nous travaillons",
    items: ["Démo", "Import", "Formation", "Assistance"]
  },
  fileList: { previous: "Précédent", next: "Suivant" },
  footer1: { contactHeading: "Coordonnées" },
  hamburgerBase: { title: "Menu", ariaLabel: "Menu" },
  staticGrid: { buttonText: "Voir" },
  storySplitPanel: { items: ["Des consultants expérimentés", "L'engagement de réussir"] },
  tabbedSplitPanel: {
    items: ["Plateforme", "Intégrations", "Modules"],
    cta: "Planifier une démo en direct",
    showMoreText: "Voir plus",
    showLessText: "Voir moins"
  },
  searchModal: {
    searchButtonTitle: "Rechercher des composants",
    placeholder: "Rechercher...",
    modalTitle: "Recherche SkywalkLab"
  },
  contactForm1: { disclaimer: "Nous ne partageons jamais vos coordonnées." },
  contactForm2: { title: "Parlez-nous de votre projet" },
  pricingPlan: {
    name: "Mensuel",
    priceLabel: "par mois",
    included: [
      "Conception et développement",
      "Hébergement inclus",
      "100 € par page au-delà de 5",
      "+250 € pour ajouter un blog",
      "Modifications illimitées",
      "Assistance 24h/24, 7j/7",
      "Mises à jour à vie"
    ],
    indicatorText: "Meilleure offre"
  },
  clickableTabsItems: [
    { title: "Aube", description: "Le soleil franchit l'horizon et tout le ciel prend la couleur d'une pêche." },
    { title: "Midi", description: "La lumière tombe d'aplomb, les ombres se resserrent, pas un nuage à l'horizon." },
    {
      title: "Crépuscule",
      description: "L'orange vire au violet, les premières étoiles paraissent et les oiseaux rentrent."
    }
  ],
  copyrightBanner1: { library: "Bibliothèque SkywalkLab", by: "par" },
  topDisclaimerBanner: { text: "Site de démonstration créé par SkywalkLab - sans lien avec Demo Company" },
  topBarSlide: { home: "Aller à l'accueil", linkedin: "linkedin", github: "github", language: "EN / FR" },
  aiChatbotHeader: { text: "Des questions ? Discutez avec l'IA ici ou consultez notre", linkText: "page de contact" },
  lightboxOverlay: { openText: "Ouvrir la visionneuse" },
  modal: { openText: "Ouvrir la fenêtre", closeText: "Fermer la fenêtre" },
  cardSlideshowHero: { ctaText: "Commencer" },
  loadMoreList: { buttonText: "Charger plus" },
  header1: { ctaText: "Contact" },
  languageHeader: { ctaText: "Nous contacter" },
  searchResults: {
    empty: "Aucun résultat pour :",
    suggestions: "Essayez de rechercher :",
    overviewsLink: "Voir les présentations"
  }
};
