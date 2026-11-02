<script lang="ts">
  import type { Component } from "svelte";

  export interface Props {
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Animate the node on intersection. */
    animate?: boolean;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { icon, iconProps, animate = false, style }: Props = $props();
  let uid: string = $props.id();

  const IconComponent = $derived(icon);
</script>

<div id="circle-node-{uid}" class="circle-node" class:animate {style}>
  <div class="circle-node--image-container">
    {#if typeof IconComponent === "string"}
      <img
        {...iconProps}
        src={IconComponent}
        alt={iconProps?.alt ?? ""}
        width={iconProps?.width ?? iconProps?.size ?? "48"}
        height={iconProps?.height ?? iconProps?.size ?? "48"} />
    {:else}
      <IconComponent {...iconProps} />
    {/if}
  </div>
</div>

<style>
  .circle-node {
    --circle-node-animation-duration: 0.3s;
    padding: 2.5rem;
    border: 1px solid #e2e6e7;
    border-radius: 50%;
    width: fit-content;
    position: relative;
    margin-bottom: 2.5rem;

    .circle-node--image-container {
      overflow: hidden;
      border-radius: inherit;
    }

    &::before {
      content: "";
      position: absolute;
      top: calc(100%);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 2rem;
      width: 1px;
      background-color: #e2e6e7;
    }

    &::after {
      content: "";
      position: absolute;
      top: calc(100% + 2rem);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 1px solid #e2e6e7;
    }

    &.animate {
      &::before {
        animation: var(--circle-node-animation-duration) ease-in slide-down-before;
        animation-fill-mode: forwards;
      }

      &::after {
        animation: var(--circle-node-animation-duration) ease-in slide-down-after;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes slide-down-before {
    0% {
      height: 0rem;
    }

    100% {
      height: 2rem;
    }
  }

  @keyframes slide-down-after {
    0% {
      top: 100%;
    }

    100% {
      top: calc(100% + 2rem);
    }
  }
</style>
