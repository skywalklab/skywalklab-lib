import { all_uncatalogued } from "./uncatalogued.js";
import {
  fr_all_component_descriptions,
  fr_overview_descriptions,
  fr_css_module_descriptions
} from "./component-descriptions.fr.js";

const en_component_descriptions: Record<string, Map<string, string>> = {
  animations: new Map([
    [
      "BrandLogoSpinner",
      "A Circle2 spinner from the svelte-loading-spinners package, extended so a logo or image can sit centered inside it."
    ],
    ["CircleCarousel", "Orbits its children around a background image, restacking them once per revolution."],
    [
      "LinearCarousel",
      "Scrolls a row of items continuously with GSAP, with edge gradients and optional arrow buttons."
    ],
    [
      "LoadingMessageSpinner",
      "A Circle spinner from the svelte-loading-spinners package with a message beneath it. Separate lines with `|` to stack several messages."
    ],
    ["SlideshowCarousel", "Cross-fades through a set of slides with arrow buttons and edge gradients."],
    ["SlideshowIcon", "Cycles through icon, title and description groups on a timer."],
    [
      "SvelteSpinner",
      "Wrapper over svelte-loading-spinners; `type` picks the variant and the remaining props are forwarded to it."
    ]
  ]),
  banners: new Map([
    ["ContactBanner", "A contact strip showing phone, address and email."],
    ["CopyrightBanner1", "A footer line for copyright text supplied as children."],
    ["IconStatusBanner", "A row of icons marking the active step, each clickable."],
    ["PageHeadingBanner1", "A page title with a breadcrumb trail."],
    ["PageHeadingBanner2", "A page title over a tinted background image, with breadcrumbs."],
    ["PressQuote", "A pull quote with its publication and author."],
    [
      "StaircaseBanner",
      "A banner whose background is a stack of chevrons in progressively darker shades of `baseColor`. The animation rotates those shades through the layers one step at a time, so a darker band rises from the bottom point and sweeps outward through the stack on repeat."
    ],
    ["StatBanner", "A row of headline figures with labels."],
    ["StatStrip", "A compact strip of stats sharing one heading color."],
    ["TopBar", "A slim top bar with phone, email, hours and social links."],
    ["TopBar2", "A slim top bar with email, address, hours and social links."],
    [
      "TopBar3",
      "A slim top bar built from a list of contact and social items. Known labels get a built-in icon and link; any item can supply its own icon and href."
    ],
    ["TopBarSlide", "A row of items with a highlight that slides behind whichever one is hovered."],
    ["TopDisclaimerBanner", "A top strip for disclaimer text; its height is bindable so the page can offset for it."]
  ]),
  brand: new Map([
    [
      "SkywalklabLogo",
      "The SkywalkLab mark as inline SVG, so it takes colors from CSS variables and scales without a raster asset. Pass it to any component that takes an `icon`."
    ],
    [
      "SkywalklabAnimatedLogo",
      "The mark with its gradient sweeping one segment at a time, cycling on a timer. Respects `prefers-reduced-motion`, holding on the current segment instead of animating."
    ]
  ]),
  buttons: new Map([
    [
      "DefaultButton",
      "Solid button backed by the default-ui module; text and background swap on hover, focus and active."
    ],
    [
      "DefaultOutlineButton",
      "Outlined button backed by the default-outline-ui module; fill and text swap on hover, focus and active."
    ],
    [
      "DotIndicatorButton",
      "Text button with a dot marker, backed by the dot-indicator-ui module. Add `.dot` to mark the current page."
    ],
    ["InsetButton", "Button backed by the inset-ui module, with separate hover colors for text and background."],
    ["JumpButton", "Button backed by the jump-ui module."],
    ["LineButton", "Button backed by the line-ui module; the line before the text widens on hover."],
    ["PopUpButton", "Button backed by the pop-up-ui module, with its own box-shadow and active-shadow props."],
    ["Rolladex", "Link or button whose label rolls over on hover; renders an anchor when `attrs` carries an `href`."],
    ["SlideButton", "Button backed by the slide-ui module."],
    [
      "SlideIndicatorButton",
      "Text button with a sliding underline, backed by the slide-indicator-ui module. Add `.slide` to mark the current page."
    ],
    ["TextButton", "Text-only button backed by the text-ui module; only the color changes on hover."],
    [
      "UnderlineButton",
      "Underlined button backed by the underline-ui module, with hover colors for text and background."
    ]
  ]),
  cards: new Map([
    ["BubbleIcon", "A circular icon bubble with a label, highlightable and clickable."],
    ["BubbleIcon3", "A row of bubble icons with one highlighted at a time, bound through `highlightIndex`."],
    ["Card3Block1", "Three image-and-copy cards in a row."],
    ["CircleNode", "A circular icon node that can animate in when it scrolls into view."],
    ["CircleNode3", "Three circle nodes with titles and descriptions."],
    ["FounderCard", "A profile card with photo, role, bio and contact links."],
    ["HelpCard", "A card with a left accent border."],
    ["InfoCard1", "A flexbox that stacks its children vertically."],
    ["PricingCard", "A pricing tier with a feature list and call to action, both snippet-driven."],
    ["TopImageCard", "A card with an image above a title and body, optionally lifting on hover."]
  ]),
  carousels: new Map([
    ["Carousel1", "Steps through items one at a time, with an optional index readout."],
    [
      "FlexCardsPagination",
      "A logo wall for the brands you work with. Fits as many per page as the width allows, then pages through the rest with dots or a swipe."
    ],
    ["ReviewCarousel", "Rotates reviews around a circular icon node."],
    ["TestimonialCarousel", "Cycles testimonial cards under a heading block."]
  ]),
  chatbots: new Map([
    [
      "AiChatbot",
      "A floating chat widget with suggested prompts, a greeting and an error state. Messages are handled by `@ai-sdk/svelte`, which posts to `/api/chat` — the route is yours to provide."
    ]
  ]),
  diagrams: new Map([
    [
      "AnimatedMermaidDiagram",
      "Renders a Mermaid flowchart SVG export and draws its arrows on as the diagram scrolls into view. Also patches Mermaid's own layout quirks: rounded cluster corners, and cluster and edge labels resized so longer text isn't clipped."
    ]
  ]),
  disclosure: new Map([
    [
      "Accordion",
      "A standalone disclosure panel. Each one tracks its own `open` state, so any number can be open at once. Use `Accordion2` when only one should be open at a time."
    ],
    [
      "Accordion2",
      "One item of an exclusive accordion group: it shows its content only when `open` is true and its `index` matches the group's `selectedIndex`, so just one sibling is open at a time. The parent owns `selectedIndex` and updates it from `cb`, which is called with this item's index on click. Use `Accordion` for panels that open independently."
    ],
    ["ClickableTabs", "Tabbed panels that fall back to a select element on small screens."],
    [
      "MenuOverlay",
      "Renders its own grid-icon trigger, so place it wherever the button belongs — usually the header, beside the nav. Clicking it slides a panel in from the right over a tinted full-screen scrim; the panel, the close button and the scrim all dismiss it. Sized as an aside rather than a full page, so it suits secondary content like contact details, opening hours or social links. Pass that content as `children`."
    ],
    ["TabDrawer", "A drawer that slides out from a persistent tab."]
  ]),
  frames: new Map([
    [
      "AsciiRenderer",
      "An image redrawn with WebGL as a grid of glowing character shapes, fitted whole inside its parent with transparent space around it. `glitch` adds an animated horizontal tear and flickering scanline, and `glitchSpeed` slows it down. Colors must be literal values; CSS variables come out black. It fills its parent, so the parent needs a height. Adapted from Motion Core's ASCII Renderer."
    ],
    ["Book3D", "A 3D book cover holding its content as the front face, optionally straightening on hover."],
    ["DeviceFrame", "A laptop or phone frame around an image or video, sized and colored by prop."],
    [
      "DeviceMockup",
      "A wrapper for the `@devmansam/device-mockup` custom element, which draws a device frame around an image or video and can be wrapped in a link. The element is imported on mount, so this component is client-only and the frame pops in after hydration — prefer `DeviceFrame` when that matters."
    ],
    [
      "DitheredImage",
      "An image redrawn with WebGL in two colors through an ordered dither pattern (`bayer4x4`, `bayer8x8`, `halftone` or `voidAndCluster`), fitted whole inside its parent with transparent space around it. Colors must be literal values; CSS variables come out black. It fills its parent, so the parent needs a height. Adapted from Motion Core's Dithered Image."
    ],
    ["PictureMat", "A picture-mat border around content, optionally animating in on scroll."],
    [
      "PixelatedImage",
      "An image drawn with WebGL that starts as a coarse pixel grid and sharpens step by step. It fills its parent, so the parent needs a height. Adapted from Motion Core's Pixelated Image."
    ],
    [
      "TraceBox",
      "A box with a border that traces past its content on each axis, with a plus marker on any of its four corners."
    ]
  ]),
  galleries: new Map([
    [
      "LightboxOverlay",
      "Full-screen viewer for a single image, with next and previous controls driven by the arrow keys and closed with Escape. It holds no collection of its own — the parent owns the images and swaps `image` as `lightboxIndex` changes; see `MasonryGallery` for that wiring. Locks page scrolling while open unless `unlockScroll` is true."
    ],
    [
      "MasonryGallery",
      "A masonry image grid whose images open in a lightbox on click, unless `disableLightbox` is true."
    ]
  ]),
  headings: new Map([
    ["AccentHeading", "Heading with an accent rule that fades out."],
    ["FlairHeading", "Heading whose first letter carries a masked logo flair."],
    ["HalfUnderlineHeading", "Heading with a short underline over a full-width track."],
    ["IconHeading", "Heading with an icon beside the text, backed by the icon-heading module."],
    ["IconInlineHeading", "Heading with the icon set inline with the text, backed by the icon-inline-heading module."]
  ]),
  heros: new Map([
    ["CardSlideshowHero", "A hero whose slides are presented as cards, with a call to action."],
    ["StaggeredSlideshowHero", "A hero whose slides cross-fade behind staggered copy."]
  ]),
  icons: new Map([
    [
      "LucideIcon",
      'Renders an icon from the @lucide/svelte package by name. Requires the Lucide Vite plugin, which resolves the icon import and replaces it with a map of the icons it finds — without it the component cannot load anything. Only icons whose name appears literally as `lucide_icon: "name"` or `lucide_icon="name"` somewhere in the project are bundled. Any other name — built at runtime, held under a different key, or coming from a CMS — must be listed in the plugin\'s `whiteList`.'
    ]
  ]),
  legal: new Map([
    ["CookieBanner", "Cookie consent banner that writes per-category choices to a cookie."],
    [
      "PrivacyPolicyEn",
      "An English privacy policy page, adapted from Basecamp's, with optional Google Analytics, Google Ads, Meta Pixel and Klaviyo sections."
    ],
    [
      "PrivacyPolicyFr",
      "A French privacy policy page, adapted from Basecamp's, with optional Google Analytics, Google Ads, Meta Pixel and Klaviyo sections."
    ],
    [
      "PrivacyPolicyIt",
      "An Italian privacy policy page, adapted from Basecamp's, with optional Google Analytics, Google Ads, Meta Pixel and Klaviyo sections."
    ],
    [
      "TermsEn",
      "An English terms of service page, adapted from Basecamp's, linking to the site's home, privacy, contact, about and services pages."
    ],
    [
      "TermsFr",
      "A French terms of service page, adapted from Basecamp's, linking to the site's home, privacy, contact, about and services pages."
    ],
    [
      "TermsIt",
      "An Italian terms of service page, adapted from Basecamp's, linking to the site's home, privacy, contact, about and services pages."
    ]
  ]),
  lists: new Map([
    ["FileList", "A stack of files that sends the front file to the back on click, scroll or arrow keys."],
    ["HowWeWork1", "A list of steps, each with an icon."],
    ["ImageByList", "An image beside a list of icon-and-text items."],
    ["ImageCardGrid", "A grid of image cards with badges, under a heading block."],
    ["LoadMoreList", "A list that loads more items on demand; item, loading and button are snippets."],
    ["LogoList", "A nested list whose markers carry the brand logo."],
    ["OverlapIconCards", "Overlapping cards, each with a badge icon."],
    ["PostIts", "Post-it style notes that animate in as they scroll into view."],
    [
      "PreviewList",
      "Rows that open on click into a showcase, a preview and a details panel, with a floating preview on hover. The first row is a sticky header; every part is a snippet."
    ],
    ["ProcessFlow", "A step-by-step flow with numbered discs and connecting arrows."],
    [
      "SquareCheckList",
      "A checklist with square markers. Each entry is split into segments so parts of a line can be bolded via `.square-check-list--highlighted-text`."
    ],
    ["StepList", "Numbered steps with dividers, optionally balanced across two columns."]
  ]),
  modals: new Map([
    ["Modal", "A dialog with a title, body and footer, closed by the header button or by clicking the area around it."]
  ]),
  nav: new Map([
    [
      "AsideNav1",
      "A vertical side navigation. `selectedIndex` is bindable, so a parent reads it to render the selected item's content beside the nav."
    ],
    ["Footer1", "A site footer with links, contact details, logo and disclaimer."],
    [
      "HamburgerBase",
      "The hamburger toggle button, adapted from [svelte-hamburgers](https://svelte-hamburgers.willow.codes) with its CSS vendored into the library's hamburger modules; `type` picks the animation."
    ],
    ["Header1", "A site header with logo, links and dropdowns that hides as you scroll down."],
    [
      "Header1Links",
      "The links for `Header1`: a hamburger menu on small screens and an inline list on large ones, with dropdowns and a CTA."
    ],
    ["Header2", "`LanguageHeader` made sticky."],
    ["HeaderLogo", "The header's home link: a logo image or icon component beside the site name."],
    ["LanguageHeader", "A header with a language switcher, its own hamburger and full color control."],
    ["LargeScreenNav", "An inline nav list for large screens, with dropdowns and a CTA."],
    [
      "NavItemDropdown",
      "A nav item that opens a list of links on click or hover, with a chevron or a language flag beside it."
    ],
    ["SmallScreenNav", "A hamburger nav for small screens whose menu slides open and closes when a link is followed."],
    [
      "TimelineNav",
      "A vertical timeline of steps whose markers and progress line fill up to the selected step, which opens to show its content."
    ]
  ]),
  panels: new Map([
    ["AboutSplitPanel", "A two-column about panel with copy on one side and an image on the other."],
    ["DoublePanel", "Two side-by-side panels, each supplied as a snippet."],
    ["GoogleMap", "An embedded Google map centered on a coordinate, with a custom marker."],
    ["SplitImagePanel", "An image beside arbitrary content; `reverse` swaps the sides."],
    ["StaticGrid", "A fixed grid of image cards."],
    ["StorySplitPanel", "A two-column story panel pairing an image with a bulleted narrative."],
    ["TabbedSplitPanel", "A split panel whose items collapse behind show-more."]
  ]),
  patterns: new Map([
    ["PatternGrid", "A decorative gradient grid, for use as a background."],
    ["PatternHexagon", "A decorative hexagon pattern, for use as a background. From bgjar.com."],
    ["PatternSoundwave", "A decorative soundwave pattern, for use as a background. From bgjar.com."],
    ["PatternWorldMap", "A decorative dotted world map, for use as a background. From bgjar.com."]
  ]),
  search: new Map([
    ["SearchBar", "A search input with a clear button, an optional debounce on its events, and a bindable `value`."],
    ["SearchList", "A list of clickable search items, reordered with a flip animation."],
    ["SearchListItemText", "A search item's label with the search term highlighted, and its group shown beside it."],
    [
      "SearchModal",
      "A search modal with a results list, suggestions shown when the field is empty, and a footer snippet."
    ],
    [
      "SearchResults",
      "Search results for the current term, a no-results message, or suggestions when the term is empty."
    ]
  ]),
  seo: new Map([
    [
      "JsonLd",
      "Serializes a structured-data object into a JSON-LD script tag, inserted into the HTML head. It renders nothing visible — open devtools and look for `script#json-ld-*` in the head to check it."
    ]
  ]),
  utilities: new Map([
    ["BackToTop1", "A back-to-top button that appears once you scroll past a set position."],
    ["BackToTop2", "A back-to-top button with a ring showing scroll progress."],
    [
      "ContactForm1",
      "A contact form with a disclaimer line and Turnstile support. Pass a `binding` from sveltekit-superforms for client-side validation, or leave it off for a plain POST."
    ],
    ["ContactForm2", "A contact form with its own heading and full color control."]
  ])
};

const en_overview_descriptions: Map<string, string> = new Map([
  ["animations", "Spinners, loaders and continuously moving carousels. Each one links to its own docs page."],
  [
    "banners",
    "Full-width strips: page headings, calls to action, stats, quotes, top bars and disclaimers. Each one links to its own docs page."
  ],
  [
    "brand",
    "The SkywalkLab mark as inline SVG, still and animated. Pass either to any component that takes an `icon`. Each one links to its own docs page."
  ],
  [
    "buttons",
    "Every button variant rendered side by side so hover and focus effects can be compared. Each one links to its own docs page."
  ],
  [
    "cards",
    "Self-contained content blocks: icons, nodes, founder, pricing, help and image cards. Each one links to its own docs page."
  ],
  [
    "carousels",
    "Paginated and swipeable carousels for cards, reviews and testimonials. Each one links to its own docs page."
  ],
  ["chatbots", "A floating chat widget that talks to an AI endpoint. Each one links to its own docs page."],
  ["diagrams", "Mermaid flowchart exports animated as they scroll into view. Each one links to its own docs page."],
  [
    "disclosure",
    "Components that show and hide content: accordions, tabs, drawers and overlays. Each one links to its own docs page."
  ],
  [
    "frames",
    "Decorative wrappers that present content as a book, device, matted picture or traced box. Each one links to its own docs page."
  ],
  ["galleries", "Image galleries and the lightbox that opens them. Each one links to its own docs page."],
  ["headings", "Heading variants with accents, underlines, flair and icons. Each one links to its own docs page."],
  ["heros", "Above-the-fold hero sections with slideshow backgrounds. Each one links to its own docs page."],
  ["icons", "Icon renderers that resolve a Lucide icon by name. Each one links to its own docs page."],
  ["legal", "Cookie consent and the privacy and terms pages behind it. Each one links to its own docs page."],
  [
    "lists",
    "Structured lists: steps, processes, checklists, logo and image lists, and card grids. Each one links to its own docs page."
  ],
  ["modals", "Dialogs with a header, body and footer the caller fills. Each one links to its own docs page."],
  [
    "nav",
    "Site navigation: headers, footers, aside nav and the hamburger base they share. Each one links to its own docs page."
  ],
  [
    "panels",
    "Two-column and grid layouts that pair text with images, tabs or a map. Each one links to its own docs page."
  ],
  [
    "patterns",
    "Decorative SVG backgrounds: grid, hexagon, soundwave and world map. Each one links to its own docs page."
  ],
  ["search", "Site search: the modal, its bar, list and results. Each one links to its own docs page."],
  ["seo", "Structured-data tags injected into the document head. Each one links to its own docs page."],
  ["utilities", "Page helpers: back-to-top buttons and contact forms. Each one links to its own docs page."]
]);

const en_css_module_descriptions: Map<string, string> = new Map([
  ["buttons", "Buttons styled purely by CSS module classes. Hover the button to see the effects."],
  ["headings", "Headings styled purely by CSS module classes. Pick a module to see its effects."],
  ["nav", "A header styled purely by CSS module classes."],
  ["lists", "Lists styled purely by CSS module classes."],
  ["navSee", "See"],
  ["navSeeAfter", "for worked examples of both snippets."]
]);

const fr = import.meta.env?.STORYBOOK_LOCALE === "fr";

export const all_component_descriptions: Record<string, Map<string, string>> = fr
  ? fr_all_component_descriptions
  : en_component_descriptions;
export const overview_descriptions: Map<string, string> = fr ? fr_overview_descriptions : en_overview_descriptions;
export const css_module_descriptions: Map<string, string> = fr
  ? fr_css_module_descriptions
  : en_css_module_descriptions;

const withoutUncatalogued = (descriptions: Record<string, Map<string, string>>): Record<string, Map<string, string>> =>
  Object.fromEntries(
    Object.entries(descriptions).map(([componentDir, componentMap]) => [
      componentDir,
      new Map([...componentMap.entries()].filter(([componentName]) => !all_uncatalogued.includes(componentName)))
    ])
  );

export const component_descriptions: Record<string, Map<string, string>> = withoutUncatalogued(
  all_component_descriptions
);
export const fr_component_descriptions: Record<string, Map<string, string>> = withoutUncatalogued(
  fr_all_component_descriptions
);
