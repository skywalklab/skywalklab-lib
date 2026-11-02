import type { Component, Snippet } from "svelte";

export type LinkSnippet = Snippet<[{ text: string; href?: string; cb?: () => void } & Record<string, any>]>;

export type Links = {
  href?: string;
  text: string;
  /** Renders a dropdown instead of a plain link, using the matching entry in `navItemDropdowns`. */
  key?: string;
} & Record<string, any>;

export type NavItemDropdowns = Record<
  string,
  {
    title: string;
    /** Links in the dropdown; each `cb` runs when that link is clicked, and `langFlag` takes the same values as `lang`. */
    items: (Links & { langFlag?: string; cb?: () => void })[];
    /** Flag shown beside the trigger. Currently `en`, `en-gb`, `fr` and `it`; more can be added on request. */
    lang?: string;
    interaction?: "click" | "hover";
    style?: string;
  }
>;

export interface Logo {
  src: string;
  href?: string;
  icon?: Component<any, object, ""> | string;
  iconProps?: Record<string, any>;
  text: string;
}
