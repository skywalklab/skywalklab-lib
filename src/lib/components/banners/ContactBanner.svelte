<script lang="ts">
  import Phone from "@lucide/svelte/icons/phone";
  import Map from "@lucide/svelte/icons/map";
  import Email from "@lucide/svelte/icons/mail-open";

  interface ContactItem {
    /** Value shown for the entry. */
    value: string;
    /** Label describing the entry. */
    label: string;
  }

  interface Props {
    /** Phone entry shown in the banner. */
    phone: ContactItem;
    /** Address entry shown in the banner. */
    address: ContactItem;
    /** Email entry shown in the banner. */
    email: ContactItem;
    /** Background color of the banner. Sets `--contact-banner-bg-color`. */
    bannerBgColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { phone, address, email, bannerBgColor = "var(--primary, black)", style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="contact-banner-{uid}" class="contact-banner" style:--contact-banner-bg-color={bannerBgColor} {style}>
  <div class="contact-banner--inner-container">
    <div class="contact-banner--item">
      <div class="contact-banner--icon-container">
        <Phone />
      </div>
      <div class="contact-banner--text-container">
        <p>{phone.label}:</p>
        <p class="contact-banner--contact-data">{phone.value}</p>
      </div>
    </div>
    <div class="contact-banner--item">
      <div class="contact-banner--icon-container">
        <Map />
      </div>
      <div class="contact-banner--text-container">
        <p>{address.label}:</p>
        <p class="contact-banner--contact-data">{address.value}</p>
      </div>
    </div>
    <div class="contact-banner--item">
      <div class="contact-banner--icon-container">
        <Email />
      </div>
      <div class="contact-banner--text-container">
        <p>{email.label}:</p>
        <p class="contact-banner--contact-data">{email.value}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .contact-banner {
    background-color: var(--contact-banner-bg-color);
    color: #fff;

    .contact-banner--inner-container {
      display: grid;
      gap: 1.5rem;
      justify-content: center;
      align-content: center;
      padding: 30px 0;

      @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }

      @media (min-width: 1024px) {
        width: 100%;
      }
    }

    .contact-banner--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(0.75rem, 5vw, 1rem);
      width: fit-content;

      @media (min-width: 400px) {
        flex-direction: row;
      }

      .contact-banner--icon-container {
        align-self: flex-start;
        padding: clamp(0.5rem, 3vw, 1.5rem);
        background-color: #fff;
        border-radius: 50%;

        :global(svg) {
          color: var(--contact-banner-bg-color);
          height: clamp(1.75rem, 3vw, 2.5rem);
          width: clamp(1.75rem, 3vw, 2.5rem);
        }
      }

      .contact-banner--text-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: clamp(14px, 4vw, 18px);
      }
    }
  }
</style>
