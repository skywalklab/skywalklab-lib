<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import type { Logo } from "./types.js";

  interface Props {
    /** Logo image, icon and text shown in the header. */
    logo: Logo;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { logo, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<a
  id="header-logo-{uid}"
  class="nav-logo-link nav-logo-link--custom"
  href={logo.href ?? "/"}
  {style}
  aria-label={labels.goToHomepage}>
  <div class="nav-logo-inner-container">
    {#if typeof logo.icon === "string" || !logo.icon}
      {@const src = logo.icon || logo.src}
      <img
        class="nav-logo-img nav-logo-img--custom"
        {...logo.iconProps}
        {src}
        alt={logo.iconProps?.alt ?? `${logo.text} logo`}
        width={logo.iconProps?.width ?? logo.iconProps?.size ?? "28"}
        height={logo.iconProps?.height ?? logo.iconProps?.size ?? "28"} />
    {:else}
      {@const IconComponent = logo.icon}
      <IconComponent {...logo.iconProps} />
    {/if}
    <p class="nav-logo-name nav-logo-name--custom">{logo.text}</p>
  </div>
</a>

<style>
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
</style>
