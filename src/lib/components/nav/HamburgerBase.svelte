<script module lang="ts">
  const HAMBURGER_TYPES = [
    "3dx",
    "3dx-r",
    "3dy",
    "3dy-r",
    "3dxy",
    "3dxy-r",
    "arrow",
    "arrow-r",
    "arrowalt",
    "arrowalt-r",
    "arrowturn",
    "arrowturn-r",
    "boring",
    "collapse",
    "collapse-r",
    "elastic",
    "elastic-r",
    "emphatic",
    "emphatic-r",
    "minus",
    "slider",
    "slider-r",
    "spin",
    "spin-r",
    "spring",
    "spring-r",
    "stand",
    "stand-r",
    "squeeze",
    "vortex",
    "vortex-r"
  ] as const;
  export type HamburgerType = (typeof HAMBURGER_TYPES)[number];
</script>

<script lang="ts">
  /** COPIED FROM SVELTE-HAMBURGERS */

  import hamburger_base from "../../css-modules/hamburgers/hamburger-base.module.css";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    /**
     * Controls and represents whether the hamburger is open
     * @default false
     */
    open?: boolean;

    /**
     * The type of the hamburger
     * @default "spin"
     * @see https://svelte-hamburgers.willow.codes#types
     */
    type?: HamburgerType;

    /**
     * Can be used to add a tooltip, also controls the default value of the `ariaLabel` prop
     * @default "Hamburger menu"
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title
     */
    title?: string;

    /**
     * This identifies the element(s) whos presence is controlled by the hamburger menu
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-controls
     */
    ariaControls?: string;

    /**
     * A label that describes the hamburger menu.
     * Defaults to the value of the `title` prop, which defaults to `Hamburger menu`.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-label
     */
    ariaLabel?: string;

    /** Custom Skywalklab Property Import Hamburger styles from css-modules */
    cssModule?: CSSModuleClasses;

    /** Fires when the hamburger is clicked. This event won't propagate. */
    onclick?: (e: MouseEvent) => void;

    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    open = $bindable(false),
    type = "spin",
    title = "Hamburger menu",
    ariaControls,
    ariaLabel = title,
    cssModule,
    onclick,
    style
  }: Props = $props();

  const hamburgerModule = (className: string) => cssModule?.[className] ?? "";
</script>

<button
  {title}
  aria-label={ariaLabel}
  aria-controls={ariaControls}
  aria-expanded={open}
  class={`${hamburger_base["hamburger"]} ${cssModule?.[`hamburger--${type}`] ?? ""} ${open ? hamburger_base["is-active"] + " " + hamburgerModule("is-active") : ""}`}
  {style}
  onclick={(event) => {
    event.stopPropagation();
    open = !open;
    onclick?.(event);
  }}>
  <span class="{hamburger_base['hamburger-box']} {hamburgerModule('hamburger-box')}">
    <span class="{hamburger_base['hamburger-inner']} {hamburgerModule('hamburger-inner')}"></span>
  </span>
</button>
