<svelte:options
  customElement={{
    tag: "skywalk-half-underline-heading",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      tag: { type: "String", attribute: "sw-tag" },
      includeFull: { type: "Boolean", attribute: "sw-include-full" },
      underlineLength: { type: "String", attribute: "sw-underline-length" },
      underlineColor: { type: "String", attribute: "sw-underline-color" },
      trackColor: { type: "String", attribute: "sw-track-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "headings/HalfUnderlineHeading", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  /* eslint-disable svelte/no-useless-children-snippet */
  import HalfUnderlineHeading from "../../components/headings/HalfUnderlineHeading.svelte";

  let { text, tag, includeFull, underlineLength, underlineColor, trackColor, style }: any = $props();
</script>

<HalfUnderlineHeading {text} {tag} {includeFull} {underlineLength} {underlineColor} {trackColor} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</HalfUnderlineHeading>


<style>
  :host {
    display: block;
  }

  :global {
.half-underline-heading {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    position: relative;

    &::before,
    &::after {
      content: "";
      height: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
    }

    &::after {
      border: 1.5px solid var(--half-underline-heading-underline-color, var(--primary, black));
      width: var(--half-underline-heading-underline-length, 3rem);
    }

    &.include-full {
      &::before {
        border: 1px solid var(--half-underline-heading-track-color, #e2e6e7);
        width: 100%;
      }
    }
  }
  }
</style>
      