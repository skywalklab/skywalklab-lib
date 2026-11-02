<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import MapPinIcon from "@lucide/svelte/icons/map-pin";
  import EmailIcon from "@lucide/svelte/icons/mail";
  import ClockIcon from "@lucide/svelte/icons/clock";
  import { getSocialSVG } from "../../utils/icons.js";

  interface Props {
    /** Email address shown in the bar. */
    email?: string;
    /** Address shown in the bar. */
    address?: string;
    /** Opening hours shown in the bar. */
    hours?: string;
    /** Social links keyed by platform name. */
    socials?: Record<string, string>;
    /** Color of the contact and social links. Sets `--top-bar-2-icon-color`. */
    iconColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { email, address, hours, socials, iconColor = "var(--primary, black)", style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<div id="top-bar-2-{uid}" class="top-bar-2" style:--top-bar-2-icon-color={iconColor} {style}>
  <div class="top-bar-2--inner-container">
    <ul class="top-bar-2--contact-details">
      {#if email}
        <li class="top-bar-2--item">
          <a href="mailto:{email}"><EmailIcon size={18} /><span class="top-bar-2--text">{email}</span></a>
        </li>
      {/if}
      {#if address}
        <li class="top-bar-2--item">
          <a href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(address)}"
            ><MapPinIcon size={18} /><span class="top-bar-2--text">{address}</span></a>
        </li>
      {/if}

      {#if socials}
        {#each Object.entries(socials) as [key, link], i (i)}
          <li class="top-bar-2--item">
            <a
              target="_blank"
              rel="noreferrer"
              href={link}
              class="top-bar-2--social-link"
              title={key}
              aria-label={labels.goTo(key)}>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html getSocialSVG({ social: key })}
            </a>
          </li>
        {/each}
      {/if}

      {#if hours}
        <li class="top-bar-2--item top-bar-2--schedule" aria-label={labels.openHours}>
          <ClockIcon size={18} /><span class="top-bar-2--text">{hours}</span>
        </li>
      {/if}
    </ul>
  </div>
</div>

<style>
  .top-bar-2 {
    .top-bar-2--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar-2--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar-2--item {
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding: 15px 20px;

        @media (min-width: 1024px) {
          &.top-bar-2--schedule {
            flex: 1;
            justify-content: flex-end;
            min-width: 250px;
          }
        }
      }

      .top-bar-2--item a,
      .top-bar-2--schedule {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar-2--item a {
        color: var(--top-bar-2-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar-2--item:not(.top-bar-2--schedule) .top-bar-2--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
</style>
