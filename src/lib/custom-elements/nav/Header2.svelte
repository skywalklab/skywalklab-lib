<svelte:options
  customElement={{
    tag: "skywalk-header-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      logo: { type: "Object", attribute: "sw-logo" },
      links: { type: "Array", attribute: "sw-links" },
      openHamburger: { type: "Boolean", attribute: "sw-open-hamburger", reflect: true },
      hamburger: { type: "Object", attribute: "sw-hamburger" },
      navItemDropdowns: { type: "Object", attribute: "sw-nav-item-dropdowns" },
      headerClass: { type: "String", attribute: "sw-header-class" },
      actionType: { type: "String", attribute: "sw-action-type" },
      showHeaderCb: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/Header2", false, "hamburgers/hamburger-base");
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
  import Header2 from "../../components/nav/Header2.svelte";

  let { logo, links, openHamburger = $bindable(false), hamburger, navItemDropdowns, headerClass, actionType, showHeaderCb, style }: any = $props();
</script>

<Header2 {logo} {links} bind:openHamburger={openHamburger} {hamburger} {navItemDropdowns} {headerClass} {actionType} {showHeaderCb} {style} >
  {#snippet linkSnippet()}
    <slot name="linkSnippet"/>
  {/snippet}
{#snippet ctaSnippet()}
    <slot name="ctaSnippet"/>
  {/snippet}
</Header2>


<style>
  :host {
    display: block;
  }

  :global {
:global {
    .header-2 {
      .nav-logo-link--custom {
        max-width: unset;

        .nav-logo-img--custom {
          height: 2.5rem;
          width: 2.5rem;
          margin-right: 0.25rem;
        }

        p.nav-logo-name--custom {
          font-size: clamp(1.25rem, 4.5vw, 1.8rem);
        }
      }
    }
  }

:where(.language-header) {
    --language-header-color: #000000;
    --language-header-bg-color: #ffffff;
    --language-header-hover-bg-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    background-color: var(--language-header-bg-color);
    color: var(--language-header-color);
    transition:
      background-color 0.3s cubic-bezier(0, 0, 0.58, 1),
      color 0.3s cubic-bezier(0, 0, 0.58, 1),
      height 0.3s cubic-bezier(0, 0, 0.58, 1);
    box-shadow: none;

    .language-header--inner-container {
      width: 100%;
      height: 100%;
      max-width: var(--max-page-width, 1200px);
      padding: 0 var(--side-padding, 12px);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 1024px) {
        :global(.large-screen-nav) {
          display: none;
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition:
        background-color 0.75s ease,
        color 0.75s ease,
        height 0.75s ease;
    }

    &:not(.show) {
      box-shadow: var(--box-shadow, none);
    }
  }

.nav-logo-link {
    max-width: 10rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    color: #000000;
    text-decoration: none;
    white-space: nowrap;

    .nav-logo-inner-container {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .nav-logo-img {
      object-fit: contain;
      object-position: center;
      margin: 0 0.15rem 0 0;
    }

    .nav-logo-name {
      margin: 0;
      line-height: 1.5;
      font-size: 1.25rem;
      font-weight: bold;
      color: inherit;
      transition: all 0.3s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s linear;
      }
    }
  }

.large-screen-nav {
    .large-screen-nav--list {
      display: flex;
      gap: 0.25rem;
      height: var(--dynamic-header-height, 56px);

      :global(li > :first-child) {
        padding: 6px 12px;
        height: 100%;
        display: flex;
        align-items: center;

        &::after {
          right: 6px;
        }
      }
    }
  }

.nav-item-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;

    &:has(.selected):hover {
      background-color: transparent;
    }

    .nav-item-dropdown--button {
      font-size: unset;
      font-family: unset;
      color: unset;
      border: unset;
      text-align: unset;
      padding: unset;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: transparent;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
      cursor: pointer;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s ease;
      }

      :is(&:hover, &.selected) .nav-item-dropdown--icon-container {
        background-color: var(--language-header-color, black);
        color: var(--language-header-bg-color, white);
      }

      &.selected .nav-item-dropdown--icon-container {
        transform: rotate(180deg);
      }

      .nav-item-dropdown--icon-container {
        height: 1.25rem;
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--language-header-color, black);
        background-color: var(--language-header-bg-color, white);
        color: var(--language-header-color, black);
        transition: inherit;
      }

      > :global(:first-child) {
        width: fit-content;
      }
    }

    .nav-item-dropdown--list {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      background-color: var(--background, white);
      overflow: hidden;

      @media (min-width: 1024px) {
        box-shadow: var(--box-shadow, none);
        position: absolute;
        top: var(--dynamic-header-height, 56px);
        right: 0;
      }

      .nav-item-dropdown--list-item {
        border-bottom: 1px solid hsla(0, 0%, 47.1%, 0.83);
        padding-right: 0.25rem;
        justify-content: space-between;

        &:last-of-type {
          border-bottom-width: 0px;
        }
      }
    }
  }

.small-screen-nav {
    .small-screen-nav--list {
      position: absolute;
      top: var(--dynamic-header-height, 56px);
      left: 0;
      right: 0;
      width: 100%;
      margin: 0 auto;
      color: var(--language-header-color, black);
      background-color: var(--language-header-bg-color, white);
      box-shadow: var(--box-shadow, none);

      @media (min-width: 768px) {
        width: calc(100% - 60px);
      }

      :global {
        > li:not(:last-of-type) {
          border-bottom: 1px solid hsla(0, 0%, 47.1%, 0.83);
        }

        li {
          padding: 0 10px;
          background-color: transparent;
          transition: background-color 0.15s linear;
          text-transform: uppercase;
          font-size: 15px;
          position: relative;

          @media (prefers-reduced-motion: reduce) {
            transition: background-color 0.75s linear;
          }

          &:hover {
            background-color: var(--language-header-hover-bg-color, transparent);
          }

          > :first-child {
            padding: 15px 0;
            width: 100%;
          }

          > ul li {
            padding: 0 10px 0 20px;

            > :first-child {
              padding: 8px 0 8px 0px;
              width: 100%;
            }
          }
        }
      }
    }
  }
  }
</style>
      