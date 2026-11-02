import { component_descriptions } from "../stories/component-descriptions.js";
import {
  contact,
  testLogo,
  testTitle,
  testDisclaimer,
  testNavLinks,
  testServices,
  testFooter1,
  testHamburgerBase,
  testSlides
} from "../data/test-data.js";
import type { NavItemDropdowns } from "../components/nav/types.js";
import { BRAND_LAB } from "../brand/data.js";

export const nav_static_props = new Map<string, any>([
  [
    "AsideNav1",
    {
      storyDescription: component_descriptions.nav.get("AsideNav1"),
      props: {
        items: testServices,
        selectedIndex: 0,
        buttonClass: "",
        style: "min-width: 260px;"
      }
    }
  ],
  [
    "Footer1",
    {
      storyDescription: component_descriptions.nav.get("Footer1"),
      props: {
        links: testNavLinks,
        disclaimer: testDisclaimer,
        logo: {
          src: "",
          href: "/",
          icon: testLogo,
          iconProps: {
            itemsLength: 7,
            logoProps: {
              height: "50px",
              fill: "var(--primary)",
              endFill: "#fff",
              stroke: "var(--primary)",
              position: "left"
            }
          },
          text: BRAND_LAB.company
        },
        contactInfo: [
          { text: testFooter1.contactHeading, icon: testLogo },
          ...contact.map((item) => ({
            text: item.text,
            icon: testLogo,
            iconProps: { lucide_icon: item.lucide_icon, size: 22 }
          }))
        ],
        style:
          "position: relative; background: var(--background); z-index: 1; --logo-font-size: 50px; width: var(--full-width-max);"
      }
    }
  ],
  [
    "HamburgerBase",
    {
      storyDescription: component_descriptions.nav.get("HamburgerBase"),
      props: {
        open: false,
        type: "spin",
        title: testHamburgerBase.title,
        ariaControls: "nav-menu",
        ariaLabel: testHamburgerBase.ariaLabel,
        style: "--active-color: var(--accent-dark, slategray);"
      }
    }
  ],
  [
    "Header1",
    {
      storyDescription: component_descriptions.nav.get("Header1"),
      moduleDescription:
        "A header styled purely by header1.module.css, which nests the whole structure under the root rather than exposing interchangeable classes. linkSnippet and ctaSnippet render the nav links and the call to action.",
      props: {
        logo: { src: testLogo, text: "Header1" },
        links: testNavLinks,
        navOpen: false,
        floatMobileMenu: false,
        hamburger: { title: testHamburgerBase.title },
        navItemDropdowns: {
          locale: {
            title: "EN",
            items: [
              { text: "English", href: "#" },
              { text: "French", href: "#" }
            ],
            lang: "en",
            interaction: "hover"
          }
        } as NavItemDropdowns,
        style:
          "position: relative; --language-header-color: var(--primary, black); --language-header-bg-color: #ffffff;"
      }
    }
  ],
  [
    "LanguageHeader",
    {
      storyDescription: component_descriptions.nav.get("LanguageHeader"),
      props: {
        links: [
          ...testNavLinks.map((link) => ({ ...link, isPage: link.text === "Home" })),
          { text: "en", href: undefined, key: "locale" }
        ],
        logo: { src: testLogo, icon: testLogo, iconProps: { height: 28 }, text: testTitle },
        hamburger: { type: "spin", module: "", title: testHamburgerBase.title },
        openHamburger: false,
        navItemDropdowns: {
          locale: {
            title: "en".toUpperCase(),
            items: ["en", "fr"].map((locale) => ({
              text: new Map([
                ["en", "English"],
                ["fr", "French"]
              ]).get(locale)!,
              href: undefined,
              cb: () => {
                /** setLocale(locale) */
              }
            })),
            interaction: "click"
          }
        } as NavItemDropdowns,
        actionType: "shrink",
        style:
          "--max-page-width: 1400px; --language-header-color: #000000; --language-header-bg-color: #ffffff; --language-header-hover-bg-color: transparent; position: relative; width: var(--full-width-max);"
      }
    }
  ],
  [
    "TimelineNav",
    {
      storyDescription: component_descriptions.nav.get("TimelineNav"),
      props: {
        items: testSlides.map(({ title, description }) => ({ text: title, description })),
        style: "width: var(--full-width-min);"
      }
    }
  ]
]);
