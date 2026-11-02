import type { Component } from "svelte";
import { BRAND_SITE, BRAND_LAB } from "../brand/data.js";
import { en } from "./test-text/en.js";
import { fr } from "./test-text/fr.js";

// set STORYBOOK_LOCALE=fr when running or building Storybook for French test data
const t = import.meta.env?.STORYBOOK_LOCALE === "fr" ? fr : en;

export const testLogo: string = "/@skywalklib/assets/brand/svgs/skywalklab-logo.svg";
export const testLogoWhite: string = "/@skywalklib/assets/brand/svgs/skywalklab-logo-white.svg";
export const testCircleLogo: string = "/@skywalklib/assets/brand/svgs/skywalklab-circle-logo.svg";
export const testCircleLogoInverse: string = "/@skywalklib/assets/brand/svgs/skywalklab-circle-logo-inverse.svg";
export const testImgPath: string = BRAND_LAB.meta.ogImage.replace(BRAND_LAB.site, "");
export const testImg: string = BRAND_LAB.meta.ogImage;
export const testImgChatbot: string = "https://tommydoak.com/og-image-chatbot.webp";
export const lucide_icon: string = "origami";
export const testIcon: string = lucide_icon;
export const testTitle: string = t.title;
export const testDescription: string = t.description;
export const testText: string = t.text;
export const testDisclaimer: string = `© ${new Date().getFullYear()} ${testTitle}. ${t.allRightsReserved}`;
export const testHREF: string = "/";
export const testNavLinks: { href: string; text: string }[] = ["/", "/about", "/services", "/pricing", "/contact"].map(
  (href, i) => ({ href, text: t.navLinks[i] })
);
export const testCallback: () => void = () => {};
const itemIcons = [testLogo, testLogoWhite, testCircleLogo, testCircleLogoInverse];
export const testItems: { text: string; icon: string }[] = [
  t.items.start,
  ...Array.from({ length: 8 }, (_, i) => `${t.items.step} ${i + 1}`),
  t.items.finish
].map((text, i) => ({ text, icon: itemIcons[i % itemIcons.length] }));

export const testServices: { text: string; title?: string; lucide_icon: string; overview: string }[] = [
  "component",
  "code-xml",
  "gauge",
  "search",
  "wrench"
].map((lucide_icon, i) => ({ ...t.services[i], lucide_icon }));

export const contact: { text: string; lucide_icon: string; label?: string }[] = [
  { text: "example@skywalklab-info.com", lucide_icon: "mail", label: t.contact.emailLabel },
  { text: "+1 555 010 0100", lucide_icon: "phone", label: t.contact.phoneLabel },
  { text: t.contact.location, lucide_icon: "map-pin", label: t.contact.locationLabel },
  { text: t.contact.hours, lucide_icon: "clock", label: t.contact.hoursLabel },
  { text: t.contact.cta, lucide_icon: "calendar-check" }
];
export const contactMap: Map<string, { text: string; lucide_icon: string; label?: string }> = new Map([
  ["email", contact[0]],
  ["phone", contact[1]],
  ["location", contact[2]],
  ["hours", contact[3]],
  ["cta", contact[4]]
]);
export const testSlides: {
  src: string;
  title: string;
  description: string;
  width: string;
  height: string;
}[] = [
  { src: testImg, title: testTitle, description: t.slideDescriptions[0], width: "2400", height: "1260" },
  { src: testImgChatbot, title: testText, description: t.slideDescriptions[1], width: "2400", height: "1260" },
  {
    src: `${BRAND_SITE.site}/images/office-building.webp`,
    title: testDescription,
    description: t.slideDescriptions[2],
    width: "1920",
    height: "1257"
  }
];
export const iconItems: {
  icon: Component<any, object, ""> | string;
  iconProps: Record<string, any>;
  title: string;
  bgColor: string;
  highlightColor: string;
}[] = [
  { fill: "var(--primary, black)" },
  { fill: "var(--accent-dark, slategray)" },
  { fill: "var(--primary, black)", endFill: "var(--accent, lightblue)" }
].map((iconProps) => ({
  icon: testLogo,
  iconProps: iconProps,
  title: testTitle,
  bgColor: "#fff",
  highlightColor: "var(--primary, black)"
}));

export const segments: { segments: { text: string; bold?: boolean }[] }[] = t.segments.map((segments) => ({
  segments
}));
export const testStats: { value: string | number; label: string }[] = ["15+", "500+", "50+", "98%"].map((value, i) => ({
  value,
  label: t.stats[i]
}));

export const testName: string = "Jane Doe";
export const testLoadingMessage: string = t.loadingMessage;
export const testAboutCta: { text: string; href: string } = { text: t.aboutCta, href: "/about" };
export const testContactLabels: { name: string; email: string; phone: string; message: string; button: string } =
  t.contactLabels;

export const testPageHeadingBanner2: { pageTitle: string; breadcrumbs: { text: string; href?: string }[] } = {
  pageTitle: t.pageHeadingBanner2.pageTitle,
  breadcrumbs: [{ text: t.pageHeadingBanner2.home, href: "/" }, { text: t.pageHeadingBanner2.pageTitle }]
};
export const testPressQuote: { quote: string; publication: string; author: string; body: string } = {
  ...t.pressQuote,
  author: testName
};
export const testStatStrip: { value: string; label: string }[] = ["120+", "2010", "24/7"].map((value, i) => ({
  value,
  label: t.statStrip[i]
}));
export const testFounderCard: { name: string; role: string; contact: { text: string; href: string } } = {
  name: testName,
  role: t.founderCard.role,
  contact: { text: t.founderCard.contact, href: "/contact" }
};
export const testPricingCard: { notIncluded: string[] } = t.pricingCard;
export const testTestimonialCarousel: { title: string } = t.testimonialCarousel;
export const testAiChatbot: {
  chatSuggestions: string[];
  assistantGreetingMsg: string;
  errorMessage: string;
  speakerLabels: { user: string; assistant: string };
  placeholder: string;
} = t.aiChatbot;
export const testAnimatedMermaidDiagram: { caption: string } = t.animatedMermaidDiagram;
export const testClickableTabs: { ariaLabel: string } = t.clickableTabs;
export const testTabDrawer: { tabText: string } = t.tabDrawer;
export const testStaggeredSlideshowHero: { ctaText: string } = t.staggeredSlideshowHero;
export const testCookieBanner: { choices: Record<string, { label?: string; description: string }> } = {
  choices: t.cookieBanner
};
export const testImageCardGrid: { linkText: string } = t.imageCardGrid;
export const testLogoList: { items: { text: string; subItems: string[] }[] } = {
  items: [
    { text: testTitle, subItems: [t.logoList.mainSite] },
    { text: t.logoList.demos, subItems: [0, 1, 2].map((n) => `${t.logoList.demo} ${n}`) }
  ]
};
export const testOverlapIconCards: { items: { title: string; description: string }[] } = {
  items: t.overlapIconCards
};
export const testPreviewList: {
  header: { component: string; dir: string; description: string; isHeader: boolean; hideDescription: boolean };
} = {
  header: { isHeader: true, hideDescription: false, ...t.previewList }
};
export const testProcessFlow: { title: string; items: string[] } = t.processFlow;
export const testFileList: { navButtons: Record<"left" | "right", Record<string, any>> } = {
  navButtons: { left: { text: t.fileList.previous }, right: { text: t.fileList.next } }
};
export const testFooter1: { contactHeading: string } = t.footer1;
export const testHamburgerBase: { title: string; ariaLabel: string } = t.hamburgerBase;
export const testAboutSplitPanel: { cta: { text: string; href: string } } = {
  cta: testAboutCta
};
export const testStaticGrid: { buttonText: string } = t.staticGrid;
export const testStorySplitPanel: { items: string[]; cta: { text: string; href: string } } = {
  items: t.storySplitPanel.items,
  cta: testAboutCta
};
export const testTabbedSplitPanel: {
  items: string[];
  cta: { text: string; href: string };
  showMoreText: string;
  showLessText: string;
} = { ...t.tabbedSplitPanel, cta: { text: t.tabbedSplitPanel.cta, href: "/contact" } };
export const testSearchModal: { searchButtonTitle: string; modalTitle: string; placeholder: string } = t.searchModal;
export const testContactForm1: { labels: typeof testContactLabels & { disclaimer: string } } = {
  labels: { ...testContactLabels, disclaimer: t.contactForm1.disclaimer }
};
export const testContactForm2: { labels: typeof testContactLabels; title: string } = {
  labels: testContactLabels,
  ...t.contactForm2
};
export const testPricingPlan: { name: string; priceLabel: string; included: string[]; indicatorText: string } =
  t.pricingPlan;
export const testClickableTabsItems: { title: string; description: string }[] = t.clickableTabsItems;
export const testCopyrightBanner1: { library: string; by: string } = t.copyrightBanner1;
export const testTopDisclaimerBanner: { text: string } = t.topDisclaimerBanner;
export const testTopBarSlide: { home: string; linkedin: string; github: string; language: string } = t.topBarSlide;
export const testAiChatbotHeader: { text: string; linkText: string } = t.aiChatbotHeader;
export const testLightboxOverlay: { openText: string } = t.lightboxOverlay;
export const testModal: { openText: string; closeText: string } = t.modal;
export const testCardSlideshowHero: { ctaText: string } = t.cardSlideshowHero;
export const testLoadMoreList: { buttonText: string } = t.loadMoreList;
export const testHeader1: { ctaText: string } = t.header1;
export const testLanguageHeader: { ctaText: string } = t.languageHeader;
export const testSearchResults: { empty: string; suggestions: string; overviewsLink: string } = t.searchResults;
