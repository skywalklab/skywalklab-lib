<svelte:options
  customElement={{
    tag: "skywalk-flair-heading",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      tag: { type: "String", attribute: "sw-tag" },
      backgroundImage: { type: "String", attribute: "sw-background-image" },
      iconWidth: { type: "String", attribute: "sw-icon-width" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "headings/FlairHeading", false);
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
  import FlairHeading from "../../components/headings/FlairHeading.svelte";

  let { text, tag, backgroundImage, iconWidth, iconColor, style }: any = $props();
</script>

<FlairHeading {text} {tag} {backgroundImage} {iconWidth} {iconColor} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</FlairHeading>


<style>
  :host {
    display: block;
  }

  :global {
.flair-heading {
    width: fit-content;
    text-align: center;
    text-wrap: balance;

    .flair-heading--first-word {
      white-space: nowrap;
      position: relative;

      .flair-heading--first-letter {
        display: contents;

        &::before {
          content: "";
          position: absolute;
          height: calc(100% * 1.25);
          width: 100%;
          transform: translateY(-65%);
          background-color: var(--flair-heading-icon-color, currentColor);
          -webkit-mask: var(--flair-heading-background-image) no-repeat left / var(--flair-heading-icon-width)
            calc(var(--flair-heading-icon-width) * 1.5);
          mask: var(--flair-heading-background-image) no-repeat left / var(--flair-heading-icon-width)
            calc(var(--flair-heading-icon-width) * 1.5);
        }
      }
    }
  }
  }
</style>
      