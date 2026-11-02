export const fr_all_component_descriptions: Record<string, Map<string, string>> = {
  animations: new Map([
    [
      "BrandLogoSpinner",
      "Un spinner Circle2 du package svelte-loading-spinners, étendu pour qu'un logo ou une image puisse se placer au centre."
    ],
    ["CircleCarousel", "Fait tourner ses enfants autour d'une image de fond et les réordonne à chaque révolution."],
    [
      "LinearCarousel",
      "Fait défiler une rangée d'éléments en continu avec GSAP, avec des dégradés sur les bords et des boutons fléchés optionnels."
    ],
    [
      "LoadingMessageSpinner",
      "Un spinner Circle du package svelte-loading-spinners avec un message en dessous. Séparez les lignes avec `|` pour empiler plusieurs messages."
    ],
    [
      "SlideshowCarousel",
      "Enchaîne une série de diapositives en fondu, avec des boutons fléchés et des dégradés sur les bords."
    ],
    ["SlideshowIcon", "Fait défiler des groupes icône, titre et description à intervalle régulier."],
    [
      "SvelteSpinner",
      "Surcouche de svelte-loading-spinners ; `type` choisit la variante et les autres props lui sont transmises."
    ]
  ]),
  banners: new Map([
    ["ContactBanner", "Un bandeau de contact affichant le téléphone, l'adresse et l'e-mail."],
    ["CopyrightBanner1", "Une ligne de pied de page pour un texte de copyright fourni en children."],
    ["IconStatusBanner", "Une rangée d'icônes indiquant l'étape active, chacune cliquable."],
    ["PageHeadingBanner1", "Un titre de page avec un fil d'Ariane."],
    ["PageHeadingBanner2", "Un titre de page sur une image de fond teintée, avec un fil d'Ariane."],
    ["PressQuote", "Une citation mise en avant, avec sa publication et son auteur."],
    [
      "StaircaseBanner",
      "Une bannière dont le fond est un empilement de chevrons dans des nuances de plus en plus sombres de `baseColor`. L'animation fait tourner ces nuances d'une couche à l'autre, une étape à la fois, si bien qu'une bande plus sombre monte de la pointe inférieure et balaie l'empilement vers l'extérieur, en boucle."
    ],
    ["StatBanner", "Une rangée de chiffres clés avec leurs libellés."],
    ["StatStrip", "Un bandeau compact de statistiques partageant une même couleur de titre."],
    ["TopBar", "Une fine barre supérieure avec téléphone, e-mail, horaires et liens sociaux."],
    ["TopBar2", "Une fine barre supérieure avec e-mail, adresse, horaires et liens sociaux."],
    [
      "TopBar3",
      "Une fine barre supérieure construite à partir d'une liste d'éléments de contact et de réseaux sociaux. Les libellés connus reçoivent une icône et un lien intégrés ; chaque élément peut fournir sa propre icône et son propre href."
    ],
    [
      "TopDisclaimerBanner",
      "Un bandeau supérieur pour un texte d'avertissement ; sa hauteur est liable pour que la page puisse se décaler en conséquence."
    ]
  ]),
  brand: new Map([
    [
      "SkywalklabLogo",
      "Le logo SkywalkLab en SVG inline, qui prend ses couleurs des variables CSS et se redimensionne sans image matricielle. Passez-le à tout composant qui accepte une `icon`."
    ],
    [
      "SkywalklabAnimatedLogo",
      "Le logo avec son dégradé qui balaie un segment à la fois, en boucle à intervalle régulier. Respecte `prefers-reduced-motion` en restant sur le segment courant au lieu de s'animer."
    ]
  ]),
  buttons: new Map([
    [
      "DefaultButton",
      "Bouton plein reposant sur le module default-ui ; texte et fond s'inversent au survol, au focus et à l'activation."
    ],
    [
      "DefaultOutlineButton",
      "Bouton à contour reposant sur le module default-outline-ui ; remplissage et texte s'inversent au survol, au focus et à l'activation."
    ],
    [
      "DotIndicatorButton",
      "Bouton texte avec un point indicateur, reposant sur le module dot-indicator-ui. Ajoutez `.dot` pour marquer la page courante."
    ],
    [
      "InsetButton",
      "Bouton reposant sur le module inset-ui, avec des couleurs de survol distinctes pour le texte et le fond."
    ],
    ["JumpButton", "Bouton reposant sur le module jump-ui."],
    ["LineButton", "Bouton reposant sur le module line-ui ; la ligne devant le texte s'élargit au survol."],
    ["PopUpButton", "Bouton reposant sur le module pop-up-ui, avec ses propres props d'ombre et d'ombre active."],
    ["Rolladex", "Lien ou bouton dont le libellé défile au survol ; rend une ancre quand `attrs` contient un `href`."],
    ["SlideButton", "Bouton reposant sur le module slide-ui."],
    [
      "SlideIndicatorButton",
      "Bouton texte avec un soulignement glissant, reposant sur le module slide-indicator-ui. Ajoutez `.slide` pour marquer la page courante."
    ],
    ["TextButton", "Bouton texte seul reposant sur le module text-ui ; seule la couleur change au survol."],
    [
      "UnderlineButton",
      "Bouton souligné reposant sur le module underline-ui, avec des couleurs de survol pour le texte et le fond."
    ]
  ]),
  cards: new Map([
    ["BubbleIcon", "Une bulle d'icône circulaire avec un libellé, pouvant être mise en évidence et cliquée."],
    [
      "BubbleIcon3",
      "Une rangée de bulles d'icônes dont une seule est mise en évidence à la fois, liée via `highlightIndex`."
    ],
    ["Card3Block1", "Trois cartes image et texte sur une rangée."],
    ["CircleNode", "Un nœud d'icône circulaire qui peut s'animer en entrant dans la zone visible."],
    ["CircleNode3", "Trois nœuds circulaires avec titres et descriptions."],
    ["FounderCard", "Une carte de profil avec photo, rôle, biographie et liens de contact."],
    ["HelpCard", "Une carte avec une bordure d'accent à gauche."],
    ["InfoCard1", "Une flexbox qui empile ses enfants verticalement."],
    [
      "PricingCard",
      "Une formule tarifaire avec une liste de fonctionnalités et un appel à l'action, tous deux fournis par snippets."
    ],
    ["TopImageCard", "Une carte avec une image au-dessus d'un titre et d'un texte, qui peut se soulever au survol."]
  ]),
  carousels: new Map([
    ["Carousel1", "Passe d'un élément à l'autre un par un, avec un indicateur de position optionnel."],
    [
      "FlexCardsPagination",
      "Un mur de logos pour les marques avec lesquelles vous travaillez. Affiche autant de logos par page que la largeur le permet, puis fait défiler les suivants avec des points ou un balayage."
    ],
    ["ReviewCarousel", "Fait tourner des avis autour d'un nœud d'icône circulaire."],
    ["TestimonialCarousel", "Fait défiler des cartes de témoignages sous un bloc de titre."]
  ]),
  chatbots: new Map([
    [
      "AiChatbot",
      "Un widget de chat flottant avec des suggestions de questions, un message d'accueil et un état d'erreur. Les messages sont gérés par `@ai-sdk/svelte`, qui envoie les requêtes à `/api/chat` — cette route est à vous de la fournir."
    ]
  ]),
  diagrams: new Map([
    [
      "AnimatedMermaidDiagram",
      "Affiche un export SVG d'organigramme Mermaid et trace ses flèches à mesure que le diagramme entre dans la zone visible. Corrige aussi certains défauts de mise en page de Mermaid : coins arrondis des clusters, et libellés de clusters et d'arêtes redimensionnés pour que les textes longs ne soient pas coupés."
    ]
  ]),
  disclosure: new Map([
    [
      "Accordion",
      "Un panneau dépliable autonome. Chacun gère son propre état `open`, donc plusieurs peuvent être ouverts en même temps. Utilisez `Accordion2` quand un seul doit être ouvert à la fois."
    ],
    [
      "Accordion2",
      "Un élément d'un groupe d'accordéon exclusif : il n'affiche son contenu que lorsque `open` est vrai et que son `index` correspond au `selectedIndex` du groupe, de sorte qu'un seul élément est ouvert à la fois. Le parent possède `selectedIndex` et le met à jour depuis `cb`, appelé avec l'index de cet élément au clic. Utilisez `Accordion` pour des panneaux qui s'ouvrent indépendamment."
    ],
    ["ClickableTabs", "Des panneaux à onglets qui se replient sur un élément select sur les petits écrans."],
    [
      "MenuOverlay",
      "Affiche son propre déclencheur en icône de grille, à placer là où le bouton doit apparaître — généralement dans l'en-tête, à côté de la navigation. Un clic fait glisser un panneau depuis la droite par-dessus un voile teinté plein écran ; le panneau, le bouton de fermeture et le voile le referment tous. Dimensionné comme un panneau latéral plutôt qu'une page entière, il convient à du contenu secondaire comme des coordonnées, des horaires d'ouverture ou des liens sociaux. Passez ce contenu en `children`."
    ],
    ["TabDrawer", "Un tiroir qui glisse depuis un onglet toujours visible."]
  ]),
  frames: new Map([
    [
      "AsciiRenderer",
      "Une image redessinée avec WebGL sous forme de grille de caractères lumineux, ajustée entièrement dans son parent avec un espace transparent autour. `glitch` ajoute une déchirure horizontale animée et une ligne de balayage scintillante, et `glitchSpeed` la ralentit. Les couleurs doivent être des valeurs littérales ; les variables CSS donnent du noir. Il remplit son parent, qui doit donc avoir une hauteur. Adapté de l'ASCII Renderer de Motion Core."
    ],
    ["Book3D", "Une couverture de livre en 3D qui porte son contenu en face avant, et peut se redresser au survol."],
    [
      "DeviceFrame",
      "Un cadre d'ordinateur portable ou de téléphone autour d'une image ou d'une vidéo, dimensionné et coloré par props."
    ],
    [
      "DeviceMockup",
      "Une surcouche du custom element `@devmansam/device-mockup`, qui dessine un cadre d'appareil autour d'une image ou d'une vidéo et peut être enveloppé dans un lien. L'élément est importé au montage, donc ce composant ne s'affiche que côté client et le cadre apparaît après l'hydratation — préférez `DeviceFrame` si cela compte."
    ],
    [
      "DitheredImage",
      "Une image redessinée avec WebGL en deux couleurs à travers un motif de tramage ordonné (`bayer4x4`, `bayer8x8`, `halftone` ou `voidAndCluster`), ajustée entièrement dans son parent avec un espace transparent autour. Les couleurs doivent être des valeurs littérales ; les variables CSS donnent du noir. Elle remplit son parent, qui doit donc avoir une hauteur. Adapté du Dithered Image de Motion Core."
    ],
    ["PictureMat", "Un passe-partout autour du contenu, qui peut s'animer au défilement."],
    [
      "PixelatedImage",
      "Une image dessinée avec WebGL qui commence en grille de gros pixels et se précise étape par étape. Elle remplit son parent, qui doit donc avoir une hauteur. Adapté du Pixelated Image de Motion Core."
    ],
    [
      "TraceBox",
      "Une boîte dont la bordure dépasse son contenu sur chaque axe, avec un repère en forme de plus sur n'importe lequel de ses quatre coins."
    ]
  ]),
  galleries: new Map([
    [
      "LightboxOverlay",
      "Visionneuse plein écran pour une seule image, avec des commandes suivant et précédent pilotées par les flèches du clavier, et fermée avec Échap. Elle ne gère aucune collection elle-même — le parent possède les images et change `image` quand `lightboxIndex` change ; voir `MasonryGallery` pour ce câblage. Bloque le défilement de la page tant qu'elle est ouverte, sauf si `unlockScroll` est vrai."
    ],
    [
      "MasonryGallery",
      "Une grille d'images en maçonnerie dont les images s'ouvrent dans une visionneuse au clic, sauf si `disableLightbox` est vrai."
    ]
  ]),
  headings: new Map([
    ["AccentHeading", "Titre avec un filet d'accent qui s'estompe."],
    ["FlairHeading", "Titre dont la première lettre porte un ornement en forme de logo masqué."],
    ["HalfUnderlineHeading", "Titre avec un court soulignement sur une piste pleine largeur."],
    ["IconHeading", "Titre avec une icône à côté du texte, reposant sur le module icon-heading."],
    [
      "IconInlineHeading",
      "Titre avec l'icône placée dans la ligne du texte, reposant sur le module icon-inline-heading."
    ]
  ]),
  heros: new Map([
    [
      "CardSlideshowHero",
      "Un hero dont les diapositives sont présentées sous forme de cartes, avec un appel à l'action."
    ],
    ["StaggeredSlideshowHero", "Un hero dont les diapositives s'enchaînent en fondu derrière un texte en décalé."]
  ]),
  icons: new Map([
    [
      "LucideIcon",
      "Affiche une icône du package @lucide/svelte à partir de son nom. Nécessite le plugin Vite Lucide, qui résout l'import des icônes et le remplace par une table des icônes qu'il trouve — sans lui, le composant ne peut rien charger. Seules les icônes dont le nom apparaît littéralement sous la forme `lucide_icon: \"name\"` ou `lucide_icon=\"name\"` quelque part dans le projet sont incluses dans le bundle. Tout autre nom — construit à l'exécution, stocké sous une autre clé ou provenant d'un CMS — doit être listé dans la `whiteList` du plugin."
    ]
  ]),
  legal: new Map([
    ["CookieBanner", "Bannière de consentement aux cookies qui enregistre les choix par catégorie dans un cookie."],
    [
      "PrivacyPolicyEn",
      "Une page de politique de confidentialité en anglais, adaptée de celle de Basecamp, avec des sections optionnelles pour Google Analytics, Google Ads, Meta Pixel et Klaviyo."
    ],
    [
      "PrivacyPolicyFr",
      "Une page de politique de confidentialité en français, adaptée de celle de Basecamp, avec des sections optionnelles pour Google Analytics, Google Ads, Meta Pixel et Klaviyo."
    ],
    [
      "PrivacyPolicyIt",
      "Une page de politique de confidentialité en italien, adaptée de celle de Basecamp, avec des sections optionnelles pour Google Analytics, Google Ads, Meta Pixel et Klaviyo."
    ],
    [
      "TermsEn",
      "Une page de conditions d'utilisation en anglais, adaptée de celle de Basecamp, avec des liens vers les pages d'accueil, de confidentialité, de contact, à propos et services du site."
    ],
    [
      "TermsFr",
      "Une page de conditions d'utilisation en français, adaptée de celle de Basecamp, avec des liens vers les pages d'accueil, de confidentialité, de contact, à propos et services du site."
    ],
    [
      "TermsIt",
      "Une page de conditions d'utilisation en italien, adaptée de celle de Basecamp, avec des liens vers les pages d'accueil, de confidentialité, de contact, à propos et services du site."
    ]
  ]),
  lists: new Map([
    [
      "FileList",
      "Une pile de fichiers qui envoie le fichier du dessus à l'arrière au clic, au défilement ou avec les flèches du clavier."
    ],
    ["HowWeWork1", "Une liste d'étapes, chacune avec une icône."],
    ["ImageByList", "Une image à côté d'une liste d'éléments icône et texte."],
    ["ImageCardGrid", "Une grille de cartes image avec des badges, sous un bloc de titre."],
    [
      "LoadMoreList",
      "Une liste qui charge plus d'éléments à la demande ; l'élément, le chargement et le bouton sont des snippets."
    ],
    ["LogoList", "Une liste imbriquée dont les puces portent le logo de la marque."],
    ["OverlapIconCards", "Des cartes qui se chevauchent, chacune avec une icône en badge."],
    ["PostIts", "Des notes façon post-it qui s'animent en entrant dans la zone visible."],
    [
      "PreviewList",
      "Des lignes qui s'ouvrent au clic sur une vitrine, un aperçu et un panneau de détails, avec un aperçu flottant au survol. La première ligne est un en-tête fixe ; chaque partie est un snippet."
    ],
    ["ProcessFlow", "Un déroulé étape par étape avec des disques numérotés et des flèches de liaison."],
    [
      "SquareCheckList",
      "Une liste à cocher avec des puces carrées. Chaque entrée est découpée en segments pour que des parties d'une ligne puissent être mises en gras via `.square-check-list--highlighted-text`."
    ],
    ["StepList", "Des étapes numérotées avec des séparateurs, qui peuvent être réparties sur deux colonnes."]
  ]),
  modals: new Map([
    [
      "Modal",
      "Une boîte de dialogue avec un titre, un corps et un pied, fermée par le bouton de l'en-tête ou par un clic autour."
    ]
  ]),
  nav: new Map([
    [
      "AsideNav1",
      "Une navigation latérale verticale. `selectedIndex` est liable, pour qu'un parent le lise et affiche le contenu de l'élément sélectionné à côté de la navigation."
    ],
    ["Footer1", "Un pied de page de site avec liens, coordonnées, logo et mention légale."],
    [
      "HamburgerBase",
      "Le bouton hamburger, adapté de [svelte-hamburgers](https://svelte-hamburgers.willow.codes) avec son CSS intégré aux modules hamburger de la bibliothèque ; `type` choisit l'animation."
    ],
    [
      "Header1",
      "Un en-tête de site avec logo, liens et menus déroulants, qui se masque quand on fait défiler vers le bas."
    ],
    [
      "Header1Links",
      "Les liens de `Header1` : un menu hamburger sur les petits écrans et une liste en ligne sur les grands, avec menus déroulants et un appel à l'action."
    ],
    ["Header2", "`LanguageHeader` rendu fixe."],
    ["HeaderLogo", "Le lien d'accueil de l'en-tête : une image ou un composant icône de logo à côté du nom du site."],
    [
      "LanguageHeader",
      "Un en-tête avec un sélecteur de langue, son propre hamburger et un contrôle complet des couleurs."
    ],
    [
      "LargeScreenNav",
      "Une liste de navigation en ligne pour les grands écrans, avec menus déroulants et un appel à l'action."
    ],
    [
      "NavItemDropdown",
      "Un élément de navigation qui ouvre une liste de liens au clic ou au survol, avec un chevron ou un drapeau de langue à côté."
    ],
    [
      "SmallScreenNav",
      "Une navigation hamburger pour les petits écrans, dont le menu s'ouvre en glissant et se ferme quand on suit un lien."
    ],
    [
      "TimelineNav",
      "Une frise verticale d'étapes dont les repères et la ligne de progression se remplissent jusqu'à l'étape sélectionnée, qui s'ouvre pour afficher son contenu."
    ]
  ]),
  panels: new Map([
    ["AboutSplitPanel", "Un panneau à propos sur deux colonnes, avec du texte d'un côté et une image de l'autre."],
    ["DoublePanel", "Deux panneaux côte à côte, chacun fourni par un snippet."],
    ["GoogleMap", "Une carte Google intégrée, centrée sur des coordonnées, avec un marqueur personnalisé."],
    ["SplitImagePanel", "Une image à côté d'un contenu libre ; `reverse` inverse les côtés."],
    ["StaticGrid", "Une grille fixe de cartes image."],
    ["StorySplitPanel", "Un panneau récit sur deux colonnes associant une image à un texte à puces."],
    ["TabbedSplitPanel", "Un panneau divisé dont les éléments se replient derrière un « voir plus »."]
  ]),
  patterns: new Map([
    ["PatternGrid", "Une grille décorative en dégradé, à utiliser en arrière-plan."],
    ["PatternHexagon", "Un motif décoratif d'hexagones, à utiliser en arrière-plan. Issu de bgjar.com."],
    ["PatternSoundwave", "Un motif décoratif d'onde sonore, à utiliser en arrière-plan. Issu de bgjar.com."],
    ["PatternWorldMap", "Une carte du monde décorative en pointillés, à utiliser en arrière-plan. Issue de bgjar.com."]
  ]),
  search: new Map([
    [
      "SearchBar",
      "Un champ de recherche avec un bouton d'effacement, un debounce optionnel sur ses événements et une `value` liable."
    ],
    ["SearchList", "Une liste d'éléments de recherche cliquables, réordonnés avec une animation flip."],
    [
      "SearchListItemText",
      "Le libellé d'un élément de recherche avec le terme recherché mis en évidence, et son groupe affiché à côté."
    ],
    [
      "SearchModal",
      "Une fenêtre de recherche avec une liste de résultats, des suggestions affichées quand le champ est vide, et un snippet de pied."
    ],
    [
      "SearchResults",
      "Les résultats de recherche pour le terme courant, un message d'absence de résultats, ou des suggestions quand le terme est vide."
    ]
  ]),
  seo: new Map([
    [
      "JsonLd",
      "Sérialise un objet de données structurées dans une balise script JSON-LD, insérée dans le head HTML. Il n'affiche rien de visible — ouvrez les outils de développement et cherchez `script#json-ld-*` dans le head pour le vérifier."
    ]
  ]),
  utilities: new Map([
    ["BackToTop1", "Un bouton de retour en haut qui apparaît une fois une position de défilement dépassée."],
    ["BackToTop2", "Un bouton de retour en haut avec un anneau indiquant la progression du défilement."],
    [
      "ContactForm1",
      "Un formulaire de contact avec une ligne d'avertissement et la prise en charge de Turnstile. Passez un `binding` de sveltekit-superforms pour la validation côté client, ou omettez-le pour un simple POST."
    ],
    ["ContactForm2", "Un formulaire de contact avec son propre titre et un contrôle complet des couleurs."]
  ])
};

export const fr_overview_descriptions: Map<string, string> = new Map([
  [
    "animations",
    "Spinners, chargements et carrousels en mouvement continu. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "banners",
    "Bandeaux pleine largeur : titres de page, appels à l'action, statistiques, citations, barres supérieures et avertissements. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "brand",
    "Le logo SkywalkLab en SVG inline, fixe et animé. Passez l'un ou l'autre à tout composant qui accepte une `icon`. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "buttons",
    "Toutes les variantes de bouton côte à côte pour comparer les effets de survol et de focus. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "cards",
    "Blocs de contenu autonomes : icônes, nœuds, fondateur, tarifs, aide et cartes image. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "carousels",
    "Carrousels paginés et balayables pour des cartes, des avis et des témoignages. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "chatbots",
    "Un widget de chat flottant qui dialogue avec un endpoint d'IA. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "diagrams",
    "Exports d'organigrammes Mermaid animés à mesure qu'ils entrent dans la zone visible. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "disclosure",
    "Composants qui affichent et masquent du contenu : accordéons, onglets, tiroirs et superpositions. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "frames",
    "Enveloppes décoratives qui présentent le contenu comme un livre, un appareil, une image encadrée ou une boîte tracée. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "galleries",
    "Galeries d'images et la visionneuse qui les ouvre. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "headings",
    "Variantes de titres avec accents, soulignements, ornements et icônes. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "heros",
    "Sections hero en haut de page avec des fonds en diaporama. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "icons",
    "Composants qui affichent une icône Lucide à partir de son nom. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "legal",
    "Le consentement aux cookies et les pages de confidentialité et de conditions qui l'accompagnent. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "lists",
    "Listes structurées : étapes, processus, listes à cocher, listes de logos et d'images, et grilles de cartes. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "modals",
    "Boîtes de dialogue avec un en-tête, un corps et un pied que l'appelant remplit. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "nav",
    "Navigation du site : en-têtes, pieds de page, navigation latérale et le bouton hamburger qu'ils partagent. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "panels",
    "Mises en page sur deux colonnes ou en grille qui associent du texte à des images, des onglets ou une carte. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "patterns",
    "Fonds SVG décoratifs : grille, hexagones, onde sonore et carte du monde. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "search",
    "Recherche du site : la fenêtre, sa barre, sa liste et ses résultats. Chacun renvoie vers sa propre page de documentation."
  ],
  [
    "seo",
    "Balises de données structurées insérées dans le head du document. Chacune renvoie vers sa propre page de documentation."
  ],
  [
    "utilities",
    "Outils de page : boutons de retour en haut et formulaires de contact. Chacun renvoie vers sa propre page de documentation."
  ]
]);

export const fr_css_module_descriptions: Map<string, string> = new Map([
  ["buttons", "Des boutons stylés uniquement par des classes de modules CSS. Survolez le bouton pour voir les effets."],
  [
    "headings",
    "Des titres stylés uniquement par des classes de modules CSS. Choisissez un module pour voir ses effets."
  ],
  ["nav", "Un en-tête stylé uniquement par des classes de modules CSS."],
  ["lists", "Des listes stylées uniquement par des classes de modules CSS."],
  ["navSee", "Voir"],
  ["navSeeAfter", "pour des exemples complets des deux snippets."]
]);
