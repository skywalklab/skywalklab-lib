<svelte:options
  customElement={{
    tag: "skywalk-icon-inline-heading",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      verticalAlign: { type: "String", attribute: "sw-vertical-align" },
      text: { type: "String", attribute: "sw-text" },
      tag: { type: "String", attribute: "sw-tag" },
      icon: { type: "String", attribute: "sw-icon" },
      iconProps: { type: "Object", attribute: "sw-icon-props" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "headings/IconInlineHeading", false, "icon-inline-heading");
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
  import IconInlineHeading from "../../components/headings/IconInlineHeading.svelte";

  let { verticalAlign, text, tag, icon, iconProps, style }: any = $props();
</script>

<IconInlineHeading {verticalAlign} {text} {tag} {icon} {iconProps} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</IconInlineHeading>


<style>
  :host {
    display: block;
  }
</style>
      