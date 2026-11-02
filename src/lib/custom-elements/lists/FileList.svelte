<svelte:options
  customElement={{
    tag: "skywalk-file-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      activeItemKey: { type: "Number", attribute: "sw-active-item-key", reflect: true },
      navButtons: { type: "Object", attribute: "sw-nav-buttons" },
      swOnItemClick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/FileList", false);
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
  import FileList from "../../components/lists/FileList.svelte";

  let { items, activeItemKey = $bindable(0), navButtons, swOnItemClick, style }: any = $props();
</script>

<FileList {items} bind:activeItemKey={activeItemKey} {navButtons} onItemClick={swOnItemClick} {style} >
  {#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
{#snippet children()}
    <slot />
  {/snippet}
</FileList>


<style>
  :host {
    display: block;
  }

  :global {
.file-list {
    --file-list-top: 29px;
    --file-list-padding-top: calc(var(--file-list-top) * 2);
    --file-list-padding-bottom: 6rem;
    --file-list-item-width: clamp(280px, 80vw, 400px);
    --file-list-item-height: calc(var(--file-list-item-width) * 9 / 16);
    max-height: 100svh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    .file-list--nav-buttons-container {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      width: 100%;
      height: fit-content;
      margin-bottom: var(--file-list-top);
      z-index: calc(var(--file-list-count) + 2);

      button {
        cursor: pointer;
      }
    }

    .file-list--list-wrapper {
      width: var(--file-list-item-width);
      height: calc(
        var(--file-list-item-height) + ((var(--file-list-count) - 1) * var(--file-list-top)) +
          (var(--file-list-padding-bottom))
      );
      padding-bottom: var(--file-list-padding-bottom);
      contain: size;
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
      position: relative;

      &::before {
        content: "";
        width: calc(var(--file-list-item-width) * 0.95);
        height: calc(
          var(--file-list-item-height) + ((var(--file-list-count) - 1) * var(--file-list-top)) +
            (var(--file-list-padding-top) + var(--file-list-padding-bottom))
        );
        max-height: 100svh;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: radial-gradient(
          ellipse 50% var(--file-list-padding-top) at 50% 0,
          color-mix(in srgb, currentColor, transparent 80%),
          transparent
        );
        pointer-events: none;
        z-index: calc(var(--file-list-count) + 1);
      }

      .file-list--list {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
        position: relative;
        margin: 0 auto;

        .file-list--item {
          height: 100%;
          width: 100%;
          position: absolute;
          inset: 0;
          transform: translateY(calc(var(--file-list-index) * var(--file-list-top) * -1))
            scale(calc(1 - var(--file-list-index) * 0.0225));
          margin: 0 auto;
          z-index: calc(var(--file-list-count) - var(--file-list-index));
          transition: transform 0.3s ease-in;

          .file-list--item-button {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
    }

    @media (min-width: 768px) {
      .file-list--nav-buttons-container {
        width: fit-content;
      }

      .file-list--list-wrapper {
        --file-list-padding-bottom: 4rem;
      }
    }
  }
  }
</style>
      