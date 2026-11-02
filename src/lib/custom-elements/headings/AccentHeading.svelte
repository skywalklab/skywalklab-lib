<svelte:options
  customElement={{
    tag: "skywalk-accent-heading",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      tag: { type: "String", attribute: "sw-tag" },
      accentLength: { type: "String", attribute: "sw-accent-length" },
      fadeOutColor: { type: "String", attribute: "sw-fade-out-color" },
      accentColor: { type: "String", attribute: "sw-accent-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "headings/AccentHeading", false);
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
  import AccentHeading from "../../components/headings/AccentHeading.svelte";

  let { text, tag, accentLength, fadeOutColor, accentColor, style }: any = $props();
</script>

<AccentHeading {text} {tag} {accentLength} {fadeOutColor} {accentColor} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</AccentHeading>


<style>
  :host {
    display: block;
  }

  :global {
.accent-heading {
    display: flex;
    justify-content: center;
    width: fit-content;

    .accent-heading--inner-container {
      margin: 0 var(--accent-heading-length);
      display: inline-block;
      position: relative;
      width: fit-content;
      text-align: center;
      text-wrap: balance;

      &::before,
      &::after {
        content: "";
        display: block;
        width: var(--accent-heading-length);
        height: 2px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }

      &::before {
        background: linear-gradient(
          270deg,
          var(--accent-heading-accent-color, currentColor) 0%,
          var(--accent-heading-fade-out-color) 100%
        );
        right: calc(100% + 15px);
      }

      &::after {
        background: linear-gradient(
          90deg,
          var(--accent-heading-accent-color, currentColor) 0%,
          var(--accent-heading-fade-out-color) 100%
        );
        left: calc(100% + 15px);
      }
    }
  }
  }
</style>
      