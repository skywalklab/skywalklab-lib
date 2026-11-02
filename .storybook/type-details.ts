export const typeDetails: Record<string, string> = {
  IntersectionActionParams: [
    "{",
    "  key?: string;",
    "  scrollContainer?: string;",
    "  thresholdRange?: number[];",
    "  threshold?: number;",
    "  rootMargin?: string;",
    "  noAnimate?: boolean;",
    "  callOnce?: boolean;",
    "  onLoad?: (node: HTMLElement) => void;",
    "  onEnter?: (node: HTMLElement) => void;",
    "  onLeave?: (node: HTMLElement) => void;",
    "}"
  ].join("\n"),
  Logo: [
    "{",
    "  src: string;",
    "  href?: string;",
    '  icon?: Component<any, object, ""> | string;',
    "  iconProps?: Record<string, any>;",
    "  text: string;",
    "}"
  ].join("\n"),
  Links: [
    "{",
    "  href?: string;",
    "  text: string;",
    "  key?: string; // renders a dropdown from the matching `navItemDropdowns` entry",
    "}"
  ].join("\n"),
  NavItemDropdowns: [
    "Record<",
    "  string, // matches the `key` of a link in `links`",
    "  {",
    "    title: string;",
    "    items: {",
    "      text: string;",
    "      href?: string;",
    "      langFlag?: string;",
    "      cb?: () => void;",
    "    }[];",
    "    lang?: string;",
    '    interaction?: "click" | "hover";',
    "    style?: string;",
    "  }",
    ">"
  ].join("\n"),
  CircleCarouselAnimationParams: [
    "{",
    "  speed?: number;",
    "  radiusAdjustment?: number;",
    "  moveToTop?: number;",
    "  noAnimate?: boolean;",
    "}"
  ].join("\n")
};
