import { BRAND_LAB } from "../src/lib/brand/data.js";
import { create } from "storybook/theming";

const primary = BRAND_LAB.brand.primary;
const white = "#ffffff";
const accent = BRAND_LAB.brand.accent;
const accentDark = BRAND_LAB.brand.accentDark;
const whiteBg = BRAND_LAB.brand.bgColor;

const brand = {
  brandTitle: BRAND_LAB.company,
  brandImage: BRAND_LAB.favicon,
  brandUrl: BRAND_LAB.site,
  brandTarget: "_blank",
  colorSecondary: accent,
  appBorderRadius: 4,
  barSelectedColor: accentDark,
  barHoverColor: accentDark
};

export const dark = create({
  base: "dark",
  ...brand,
  appBg: primary,
  appContentBg: primary,
  appPreviewBg: primary,
  textColor: white,
  textInverseColor: primary,
  barTextColor: white,
  barBg: primary
});

export const light = create({
  base: "light",
  ...brand,
  appBg: whiteBg,
  appContentBg: whiteBg,
  appPreviewBg: whiteBg,
  textColor: primary,
  textInverseColor: white,
  barTextColor: primary,
  barBg: whiteBg
});
