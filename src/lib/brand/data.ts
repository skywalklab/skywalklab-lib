export interface BrandLogoProps {
  curveStartX: number;
  curvePath: string;
  lineSpacing: number;
  numLines: number;
  line1StartY: number;
}

export const brandLogoProps: BrandLogoProps = {
  curveStartX: 27.04,
  curvePath:
    "c4.43-2.51 6.69-5.56 6.76-9.14.03-1.42-.32-2.8-1.05-4.15-.71-1.37-1.74-2.54-3.11-3.5-1.99-1.47-5.52-3.07-10.61-4.79-4.23-1.47-7-2.46-8.29-2.97-1.26-.51-2.56-1.21-3.88-2.08-2.77-1.8-4.18-4.08-4.23-6.85-.01-.82.08-1.56.29-2.23.21-.69.53-1.34.97-1.96.43-.64 1.16-1.5 2.18-2.56-3.94 2.38-5.87 5.32-5.8 8.83.07 3.34 1.71 5.97 4.91 7.89 1.68 1.02 3.6 1.93 5.76 2.73.27.11 2.37.86 6.29 2.25 4.72 1.65 7.96 3.14 9.73 4.47 2.81 2.1 4.18 4.58 4.14 7.41-.02 1.37-.36 2.58-1.02 3.64-.63 1.04-1.64 2.04-3.04 3.01z",
  lineSpacing: 10.2,
  numLines: 3,
  line1StartY: 40.45
};

export interface Brand {
  company: string;
  site: string;
  frSite?: string;
  industry: string;
  tagline_1: string;
  tagline_2: string;
  subtagline: string;
  logoProps: BrandLogoProps;
  favicon: string;
  meta: {
    site_name: string;
    url: string;
    ogImage: string;
    appleTouchIcon: string;
    themeColor: string;
  };
  seo: {
    linkedin: string;
  };
  brand: {
    primary: string;
    accent: string;
    accentDark: string;
    bgColor: string;
  };
}

export const SKYWALK_DIR: string = "skywalklab-library";
export const SKYWALK_PACKAGE: string = "@skywalklab/lib";
export const SKYWALK_VENDOR: string = "src/skywalklab/lib";
export const SKYWALK_ALIAS: string = "/@skywalklib";
export const SKYWALK_PREFIX: string = "skywalk";
export const SKYWALK_ATTR_PREFIX: string = "sw";

const _COMPANY = "SkywalkLab";
const _SITE = "https://skywalklab.com";
const _INDUSTRY = "Digital Agency";
const _TAGLINE_1 = "Take the next step.";
const _TAGLINE_2 = "From local to limitless.";
const _SUBTAGLINE = "Custom websites and AI tools that bring you more customers.";

export const GET_BRAND = (args?: Partial<Brand>): Brand => ({
  company: _COMPANY,
  site: _SITE,
  industry: _INDUSTRY,
  tagline_1: _TAGLINE_1,
  tagline_2: _TAGLINE_2,
  subtagline: _SUBTAGLINE,
  logoProps: brandLogoProps,
  favicon: `${_SITE}/favicon.ico`,
  meta: {
    site_name: _COMPANY,
    url: _SITE,
    ogImage: `${_SITE}/brand/og-image.jpg`,
    appleTouchIcon: `${_SITE}/brand/logo-192.png`,
    themeColor: "#0f1922"
  },
  seo: {
    linkedin: "https://www.linkedin.com/company/skywalklab/"
  },
  brand: {
    primary: "#0f1922",
    accent: "#85c1e9",
    accentDark: "#436175",
    bgColor: "#f5f5f5"
  },
  ...args
});

export const BRAND_SITE: Brand = GET_BRAND();
export const BRAND_LAB: Brand = GET_BRAND({
  company: "SkywalkLab Library",
  site: "https://lab.skywalklab.com",
  frSite: "https://fr.lab.skywalklab.com",
  tagline_1: "Library for SkywalkLab",
  favicon: "https://lab.skywalklab.com/favicon-inverse.png",
  meta: {
    site_name: "SkywalkLab Library",
    url: "https://lab.skywalklab.com",
    ogImage: "https://lab.skywalklab.com/og-image-storybook.webp",
    appleTouchIcon: `https://lab.skywalklab/logo-192.png`,
    themeColor: "#0f1922"
  }
});
