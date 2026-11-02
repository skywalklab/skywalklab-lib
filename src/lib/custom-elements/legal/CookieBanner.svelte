<svelte:options
  customElement={{
    tag: "skywalk-cookie-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      locale: { type: "String", attribute: "sw-locale" },
      requiresOptIn: { type: "Boolean", attribute: "sw-requires-opt-in" },
      cookieName: { type: "String", attribute: "sw-cookie-name" },
      cookieConfig: { type: "Object", attribute: "sw-cookie-config" },
      showCookieBanner: { type: "Boolean", attribute: "sw-show-cookie-banner", reflect: true },
      showEditIcon: { type: "Boolean", attribute: "sw-show-edit-icon" },
      showSettings: { type: "Boolean", attribute: "sw-show-settings" },
      ignoreCookiesOnLoad: { type: "Boolean", attribute: "sw-ignore-cookies-on-load" },
      canRejectCookies: { type: "Boolean", attribute: "sw-can-reject-cookies" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      acceptAllLabel: { type: "String", attribute: "sw-accept-all-label" },
      acceptSelectedLabel: { type: "String", attribute: "sw-accept-selected-label" },
      rejectLabel: { type: "String", attribute: "sw-reject-label" },
      settingsLabel: { type: "String", attribute: "sw-settings-label" },
      closeLabel: { type: "String", attribute: "sw-close-label" },
      editLabel: { type: "String", attribute: "sw-edit-label" },
      heading: { type: "String", attribute: "sw-heading" },
      description: { type: "String", attribute: "sw-description" },
      choices: { type: "Object", attribute: "sw-choices" },
      swOnnecessary: { type: "Object" },
      swOntracking: { type: "Object" },
      swOnanalytics: { type: "Object" },
      swOnmarketing: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "legal/CookieBanner", false);
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
  import CookieBanner from "../../components/legal/CookieBanner.svelte";

  let { locale, requiresOptIn, cookieName, cookieConfig, showCookieBanner = $bindable(false), showEditIcon, showSettings, ignoreCookiesOnLoad, canRejectCookies, buttonClass, acceptAllLabel, acceptSelectedLabel, rejectLabel, settingsLabel, closeLabel, editLabel, heading, description, choices, swOnnecessary, swOntracking, swOnanalytics, swOnmarketing, style }: any = $props();
</script>

<CookieBanner {locale} {requiresOptIn} {cookieName} {cookieConfig} bind:showCookieBanner={showCookieBanner} {showEditIcon} {showSettings} {ignoreCookiesOnLoad} {canRejectCookies} {buttonClass} {acceptAllLabel} {acceptSelectedLabel} {rejectLabel} {settingsLabel} {closeLabel} {editLabel} {heading} {description} {choices} onnecessary={swOnnecessary} ontracking={swOntracking} onanalytics={swOnanalytics} onmarketing={swOnmarketing} {style} />


<style>
  :host {
    display: contents;
  }

  :global {
:where(.cookie-banner) {
    position: fixed;
    z-index: 101;
    bottom: 40px;
    right: 0;
    margin: 0;
    width: fit-content;
    max-width: min(90vw, 500px);
    max-height: calc(100svh - 40px);
    overflow: auto;
    flex-direction: column;
    gap: 1rem;
    display: none;
    font-size: clamp(14px, 4.5vw, 16px);

    &.show-banner {
      display: flex;
      background-color: var(--background, white);
      box-shadow: var(--box-shadow, none);
      border-radius: 8px;
      padding: 20px clamp(16px, 5vw, 20px);
      z-index: 201;
    }

    &.show-edit-icon {
      display: flex;

      &:not(.show-banner) .cookie-banner--toggle {
        padding: 0.5rem;
        border-radius: 8px;
        background-color: var(--background, white);
        box-shadow: var(--box-shadow, none);
      }
    }

    @media (min-width: 480px) {
      right: 40px;
    }

    .cookie-banner--toggle {
      width: 4rem;
      color: var(--primary, black);
      cursor: pointer;

      svg {
        width: 100%;
      }
    }

    .cookie-banner--wrapper {
      display: none;

      &.show-banner {
        display: block;
      }
    }

    .cookie-banner--consent {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .cookie-banner--content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .cookie-banner--title {
          font-weight: bold;
          font-size: 20px;
        }

        .cookie-banner--description {
          :global {
            a {
              color: var(--accent-dark, slategray);
              border-bottom: 1px solid currentColor;
              transition: all 0.15s linear;

              &:hover,
              &:focus-visible {
                color: var(--primary, black);
              }
            }
          }
        }
      }

      .cookie-banner--right {
        display: flex;
        gap: 0.5rem;
        width: fit-content;
        margin: 0;
      }
    }

    .cookie-banner--operations {
      display: none;

      &.show-settings {
        display: block;
      }

      .cookie-banner--operations-item {
        &.disabled {
          color: grey;
        }

        label {
          font-weight: bold;
        }
      }

      .cookie-banner--operations-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        button {
          width: fit-content;
          margin: 0.25rem 0 0;
        }
      }
    }
  }
  }
</style>
      