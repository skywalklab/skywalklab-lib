<svelte:options
  customElement={{
    tag: "skywalk-contact-form-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      action: { type: "String", attribute: "sw-action" },
      labels: { type: "Object", attribute: "sw-labels" },
      binding: { type: "Object", attribute: "sw-binding" },
      title: { type: "String", attribute: "sw-title" },
      centered: { type: "Boolean", attribute: "sw-centered" },
      maxWidth: { type: "String", attribute: "sw-max-width" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      accentColor: { type: "String", attribute: "sw-accent-color" },
      fieldBgColor: { type: "String", attribute: "sw-field-bg-color" },
      fieldBorderColor: { type: "String", attribute: "sw-field-border-color" },
      fieldColor: { type: "String", attribute: "sw-field-color" },
      labelColor: { type: "String", attribute: "sw-label-color" },
      titleColor: { type: "String", attribute: "sw-title-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "utilities/ContactForm2", false);
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
  import ContactForm2 from "../../components/utilities/ContactForm2.svelte";

  let { action, labels, binding, title, centered, maxWidth, buttonClass, accentColor, fieldBgColor, fieldBorderColor, fieldColor, labelColor, titleColor, style }: any = $props();
</script>

<ContactForm2 {action} {labels} {binding} {title} {centered} {maxWidth} {buttonClass} {accentColor} {fieldBgColor} {fieldBorderColor} {fieldColor} {labelColor} {titleColor} {style} >
  {#snippet turnstileSnippet()}
    <slot name="turnstileSnippet"/>
  {/snippet}
</ContactForm2>


<style>
  :host {
    display: block;
  }

  :global {
.contact-form-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .contact-form-2--title {
      color: var(--contact-form-2-title-color, #fff);
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: none;
    }

    .contact-form-2--fields {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      width: 100%;
      margin-top: 2.5rem;

      .contact-form-2--field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: left;

        .contact-form-2--label {
          color: var(--contact-form-2-label-color, rgba(255, 255, 255, 0.72));
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        .contact-form-2--input {
          width: 100%;
          background-color: var(--contact-form-2-field-bg-color, rgba(255, 255, 255, 0.03));
          border: 1px solid var(--contact-form-2-field-border-color, rgba(255, 255, 255, 0.14));
          border-radius: 10px;
          color: var(--contact-form-2-field-color, #fff);
          font: inherit;
          font-size: 16px;
          padding: 0.95rem 1.15rem;
          transition: border-color 0.15s linear;

          &:focus-visible {
            outline: none;
            border-color: var(--contact-form-2-accent-color, var(--accent, lightblue));
          }
        }

        .contact-form-2--textarea {
          min-height: 150px;
          resize: vertical;
        }

        &.wide {
          grid-column: 1 / -1;
        }
      }

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .contact-form-2--turnstile {
      margin-top: 1.75rem;
    }

    .contact-form-2--submit {
      margin-top: 1.75rem;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .contact-form-2--error {
      color: var(--error, #e5484d);
      font-size: 13px;
      line-height: 1.35;

      &.contact-form-2--form-error {
        margin-top: 1rem;
      }
    }

    .contact-form-2--message {
      margin-top: 1.25rem;
      background-color: color-mix(
        in srgb,
        var(--contact-form-2-accent-color, var(--accent, lightblue)),
        transparent 88%
      );
      border-left: 3px solid var(--contact-form-2-accent-color, var(--accent, lightblue));
      border-radius: 8px;
      color: var(--contact-form-2-field-color, #fff);
      font-size: 14px;
      line-height: 22px;
      padding: 0.85rem 1.1rem;
    }

    &.centered {
      max-width: var(--contact-form-2-max-width, 760px);
      margin-inline: auto;
      align-items: center;
      text-align: center;
    }
  }
  }
</style>
      