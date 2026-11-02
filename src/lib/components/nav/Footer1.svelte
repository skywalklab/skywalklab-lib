<script lang="ts">
  import { getLinksAttrs } from "../../utils/navigation.js";
  import type { Links, Logo } from "./types.js";
  import type { Component, Snippet } from "svelte";

  interface Props {
    /** Logo shown in the footer. */
    logo: Logo;
    /** Navigation links shown in the footer; the first entry is the column heading, the rest are the links. */
    links?: Links[];
    /** Contact entries; the first entry is the column heading and its `icon` is not rendered, the rest are the details. Each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    contactInfo?: {
      /** Contact detail shown beside the icon. */
      text: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
    }[];
    /** Small print shown at the bottom. Defaults to a copyright line for the current year. */
    disclaimer?: string;
    /** Rendered under the logo and its name, inside the logo column. */
    logoSnippet?: Snippet;
    /** Rendered between the logo column and the links, as a middle column of the footer content. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    logo,
    links,
    contactInfo,
    disclaimer = `© ${new Date().getFullYear()} ${logo.text}. All rights reserved.`,
    logoSnippet,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<footer id="footer-1-{uid}" class="footer-1" {style}>
  <hr class="footer-1--divider" />
  <div class="footer-1--content">
    <div class="footer-1--logo">
      <a class="footer-1--logo-inner-container" href={logo.href ?? "/"}>
        {#if typeof logo.icon === "string" || !logo.icon}
          {@const src = logo.icon || logo.src}
          <img
            class="footer-1--logo-img"
            {...logo.iconProps}
            {src}
            alt={logo.iconProps?.alt ?? `${logo.text} logo`}
            width={logo.iconProps?.width ?? logo.iconProps?.size ?? "28"}
            height={logo.iconProps?.height ?? logo.iconProps?.size ?? "28"} />
        {:else}
          {@const IconComponent = logo.icon}
          <IconComponent {...logo.iconProps} />
        {/if}
        <p class="footer-1--logo-name">{logo.text}</p>
      </a>
      {@render logoSnippet?.()}
    </div>
    {@render children?.()}
    <div class="footer-1--links-container">
      {#if links}
        <div class="footer-1--links-inner-container">
          <h2 class="footer-1--links-heading">{links[0].text}</h2>
          <ul class="footer-1--links">
            {#each links.slice(1) as link (link.text)}
              <li class="footer-1--links-item">
                <a class="footer-1--links-link" {...getLinksAttrs(link)}>{link.text}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if contactInfo}
        <div class="footer-1--links-inner-container">
          <h2 class="footer-1--links-heading">{contactInfo[0].text}</h2>
          <ul class="footer-1--contact-info">
            {#each contactInfo.slice(1) as item (item.text)}
              {@const IconComponent = item.icon}
              <li class="footer-1--contact-info-item">
                {#if typeof IconComponent === "string"}
                  <img
                    {...item.iconProps}
                    src={IconComponent}
                    alt={item.iconProps?.alt ?? item.text}
                    width={item.iconProps?.width ?? item.iconProps?.size ?? "22"}
                    height={item.iconProps?.height ?? item.iconProps?.size ?? "22"} />
                {:else}
                  <IconComponent {...item.iconProps} />
                {/if}
                <span class="footer-1--contact-info-text">{item.text}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
  <div class="footer-1--disclaimer">
    <p class="footer-1--disclaimer-text">{disclaimer}</p>
  </div>
</footer>

<style>
  .footer-1 {
    width: 100%;
    padding: 0 0 1px;
    height: fit-content;
    margin-top: auto;

    .footer-1--divider {
      color: currentColor;
      opacity: 1;
      margin: 0 0 1rem;
      border: 0;
      border-top: 1px solid currentColor;
    }

    .footer-1--content {
      padding: 0 var(--inline-padding, 1rem);
      max-width: var(--max-page-width, 1200px);
      margin: 3rem auto 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 2rem 4rem;

      .footer-1--logo {
        text-decoration: none;
        width: fit-content;
        min-width: 280px;
        margin-bottom: 2rem;

        @media (min-width: 480px) {
          min-width: 400px;
        }

        .footer-1--logo-inner-container {
          display: flex;
          height: 3.5rem;
          align-items: center;
        }

        .footer-1--logo-img {
          width: auto;
          height: 100%;
          margin: 0 0.15rem 0 0;
        }

        .footer-1--logo-name {
          margin: 0;
          line-height: 1.5;
          font-weight: bold;
          color: currentColor;
          font-size: 2rem;
        }
      }

      .footer-1--links-container {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 4rem 2rem;
        min-width: 280px;
        margin-inline: auto;
        width: fit-content;

        @media (min-width: 768px) {
          min-width: 500px;
        }

        .footer-1--links-inner-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: min(280px, 100%);
          margin-inline: auto;
        }

        .footer-1--links-heading {
          font-size: 22px;
          pointer-events: none;
        }

        .footer-1--links,
        .footer-1--contact-info {
          display: grid;
          grid-template-columns: repeat(1, auto);
          gap: 0.75rem 2rem;
          height: fit-content;

          .footer-1--links-item,
          .footer-1--contact-info-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 16px;
          }
        }
      }
    }

    .footer-1--disclaimer {
      margin: 2rem auto 2rem;
      border-top: 1px solid currentColor;
      padding-top: 1.5rem;
      max-width: var(--max-page-width, 1200px);
      text-align: center;

      .footer-1--disclaimer-text {
        font-size: 14px;
      }
    }
  }
</style>
