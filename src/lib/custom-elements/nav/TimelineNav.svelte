<svelte:options
  customElement={{
    tag: "skywalk-timeline-nav",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      activeItemIndex: { type: "Number", attribute: "sw-active-item-index", reflect: true },
      transitionTiming: { type: "Number", attribute: "sw-transition-timing" },
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

  let { items, activeItemIndex = $bindable(-1), transitionTiming, swOnclick, style }: any = $props();
</script>

<TimelineNav {items} bind:activeItemIndex={activeItemIndex} {transitionTiming} onclick={swOnclick} {style} >
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

      .timeline-nav--list-item {
        position: relative;
        min-height: var(--timeline-nav-min-item-height);

        &.active {
          &::before {
            background-color: currentColor;
          }

          &:not(:last-of-type) {
            .timeline-nav--button::before {
              height: 100%;
            }
          }
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: calc(var(--timeline-nav-marker-diameter) / 2);
          margin: auto 0;
          background-color: var(--timeline-nav-initial-line-color);
          transition: background-color var(--timeline-nav-timing-duration) linear;
        }

        &:before {
          aspect-ratio: 1 / 1;
          left: calc(var(--timeline-nav-line-width) / 2);
          width: var(--timeline-nav-marker-diameter);
          height: auto;
          z-index: 4;
          transition-delay: var(--timeline-nav-item-transition-delay);
        }

        &:after {
          left: calc(var(--timeline-nav-marker-diameter) / 2);
          width: var(--timeline-nav-line-width);
          height: 100%;
          z-index: 2;
        }

        &:last-of-type:after {
          display: none;
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
            transition: height var(--timeline-nav-timing-duration) linear;
            transition-delay: var(--timeline-nav-item-transition-delay);
            /* display: none; */
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
      