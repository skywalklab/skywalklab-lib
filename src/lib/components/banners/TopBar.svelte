<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import PhoneIcon from "@lucide/svelte/icons/phone";
  import EmailIcon from "@lucide/svelte/icons/mail";
  import ClockIcon from "@lucide/svelte/icons/clock";
  import { getSocialSVG } from "../../utils/icons.js";

  interface Props {
    /** Phone number shown in the bar. */
    phone?: string;
    /** Email address shown in the bar. */
    email?: string;
    /** Opening hours shown in the bar. */
    hours?: string;
    /** Social links keyed by platform name. */
    socials?: Record<string, string>;
    /** Color of the contact and social links. Sets `--top-bar-icon-color`. */
    iconColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { phone, email, hours, socials, iconColor = "var(--primary, black)", style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<div id="top-bar-{uid}" class="top-bar" style:--top-bar-icon-color={iconColor} {style}>
  <div class="top-bar--inner-container">
    <ul class="top-bar--contact-details">
      {#if phone}
        <li class="top-bar--item">
          <a href="tel:{phone}"><PhoneIcon size={18} /><span class="top-bar--text">{phone}</span></a>
        </li>
      {/if}
      {#if email}
        <li class="top-bar--item">
          <a href="mailto:{email}"><EmailIcon size={18} /><span class="top-bar--text">{email}</span></a>
        </li>
      {/if}
      {#if socials}
        {#each Object.entries(socials) as [key, link], i (i)}
          <li class="top-bar--item">
            <a target="_blank" rel="noreferrer" href={link} class="top-bar--social-link" aria-label={labels.goTo(key)}>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html getSocialSVG({ social: key })}
            </a>
          </li>
        {/each}
      {/if}

      {#if hours}
        <li class="top-bar--item top-bar--schedule" aria-label={labels.openHours}>
          <ClockIcon size={18} /><span class="top-bar--text">{hours}</span>
        </li>
      {/if}
    </ul>
  </div>
</div>

<style>
  .top-bar {
    background-color: #f5f5f5;

    .top-bar--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar--item {
        font-weight: 500;
        font-size: 13px;
        color: #999;
        line-height: 20px;
        padding: 15px 20px;

        @media (min-width: 1024px) {
          border-right: 1px solid #e2e6e7;

          &:first-child {
            border-left: 1px solid #e2e6e7;
          }

          &.top-bar--schedule {
            flex: 1;
            justify-content: flex-end;
            min-width: 250px;
          }
        }
      }

      .top-bar--item a,
      .top-bar--schedule {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar--schedule {
        color: #6a6a6a;
      }

      .top-bar--item a {
        color: var(--top-bar-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar--item:not(.top-bar--schedule) .top-bar--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
</style>
