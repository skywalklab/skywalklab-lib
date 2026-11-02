<svelte:options
  customElement={{
    tag: "skywalk-contact-form-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      action: { type: "String", attribute: "sw-action" },
      labels: { type: "Object", attribute: "sw-labels" },
      binding: { type: "Object", attribute: "sw-binding" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      errorColor: { type: "String", attribute: "sw-error-color" },
      messageColor: { type: "String", attribute: "sw-message-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "utilities/ContactForm1", false);
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
  import ContactForm1 from "../../components/utilities/ContactForm1.svelte";

  let { action, labels, binding, buttonClass, errorColor, messageColor, style }: any = $props();
</script>

<ContactForm1 {action} {labels} {binding} {buttonClass} {errorColor} {messageColor} {style} >
  {#snippet turnstileSnippet()}
    <slot name="turnstileSnippet"/>
  {/snippet}
</ContactForm1>


<style>
  :host {
    display: block;
  }

  :global {
.contact-form-1 {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    .contact-form-1--field {
      display: flex;
      flex-direction: column;
      gap: 0;
      font-size: 14px;

      input,
      textarea {
        border: 1px solid #e2e6e7;
        padding: 0.75rem 1rem;
      }

      &:has(textarea) {
        height: 100%;

        textarea {
          height: inherit;
          min-height: 199px;
        }
      }
    }

    .contact-form-1--error {
      color: var(--contact-form-1-error-color);
      font-size: 13px;
      line-height: 1.35;
      margin-top: 0.25rem;
    }

    .contact-form-1--form-error {
      margin-top: 1rem;
    }

    .contact-form-1--message {
      width: 100%;
      background-color: color-mix(in srgb, var(--contact-form-1-message-color), transparent 92%);
      border-left: 3px solid var(--contact-form-1-message-color);
      border-radius: 8px;
      font-size: 14px;
      line-height: 22px;
      padding: 0.75rem 1rem;
    }

    .contact-form-1--contact-info {
      flex: 1;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .contact-form-1--message-info {
      flex: 1;
      min-width: 280px;
    }

    .contact-form-1--submit-container {
      width: 100%;
      flex-direction: row;
      row-gap: 1rem;
      column-gap: 3rem;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
  }
</style>
      