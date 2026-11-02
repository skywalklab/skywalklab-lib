<svelte:options
  customElement={{
    tag: "skywalk-timeline-nav",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      openItemIndex: { type: "Number", attribute: "sw-open-item-index", reflect: true },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/TimelineNav", false);
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
  import TimelineNav from "../../components/nav/TimelineNav.svelte";

  let { items, openItemIndex = $bindable(-1), swOnclick, style }: any = $props();
</script>

<TimelineNav {items} bind:openItemIndex={openItemIndex} onclick={swOnclick} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
{#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
</TimelineNav>


<style>
  :host {
    display: block;
  }

  :global {
.timeline-nav {
    --timeline-nav-padding-left: 1.75rem;
    --timeline-nav-marker-diameter: 10px;
    --timeline-nav-line-width: 2px;
    --timeline-nav-initial-line-color: oklch(from currentColor calc(l + (1 - round(l)) * 0.65 - round(l) * 0.45) c h);
    --timeline-nav-line-color: var(--timeline-nav-initial-line-color);
    --timeline-nav-min-item-height: 4rem;

    .timeline-nav--list {
      position: relative;
      display: flex;
      flex-direction: column;

      &:before {
        content: "";
        position: absolute;
        z-index: 3;
        top: var(--timeline-nav-marker-diameter);
        left: calc(var(--timeline-nav-marker-diameter) / 2);
        height: calc(var(--timeline-nav-min-item-height) * var(--timeline-nav-active-items));
        max-height: calc(var(--timeline-nav-min-item-height) * (var(--timeline-nav-total-items) - 1));
        width: var(--timeline-nav-line-width);
        background-color: currentColor;
        transition: height 0.3s linear;
      }

      .timeline-nav--list-item {
        position: relative;
        min-height: var(--timeline-nav-min-item-height);

        &.active {
          --timeline-nav-line-color: currentColor;

          &:not(:last-of-type) {
            .timeline-nav--button::before {
              transition: height 0.15s 0.3s linear;
              height: 100%;
            }
          }
        }

        &:last-of-type:after {
          display: none;
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: calc(var(--timeline-nav-marker-diameter) / 2);
          margin: auto 0;
          width: var(--timeline-nav-marker-diameter);
          height: auto;
          transition: background-color 0.15s linear;
          background-color: var(--timeline-nav-initial-line-color);
        }

        &:before {
          aspect-ratio: 1 / 1;
          left: calc(var(--timeline-nav-line-width) / 2);
          background-color: var(--timeline-nav-line-color);
          z-index: 4;
        }

        &:after {
          left: calc(var(--timeline-nav-marker-diameter) / 2);
          width: var(--timeline-nav-line-width);
          height: 100%;
          z-index: 2;
        }

        .timeline-nav--button {
          padding-left: var(--timeline-nav-padding-left);
          width: 100%;
          height: 100%;
          cursor: pointer;
          text-align: left;
          display: flex;
          z-index: 3;
          position: absolute;
          top: 0;
          left: 0;

          &::before {
            content: "";
            position: absolute;
            top: calc(var(--timeline-nav-marker-diameter) / 2);
            left: calc(var(--timeline-nav-marker-diameter) / 2);
            width: var(--timeline-nav-line-width);
            height: 0%;
            background-color: currentColor;
          }
        }

        .timeline-nav--dropdown {
          position: relative;
          top: 2rem;
          left: var(--timeline-nav-padding-left);
          z-index: 3;
          margin: 0 0 3rem;
        }
      }
    }
  }
  }
</style>
      