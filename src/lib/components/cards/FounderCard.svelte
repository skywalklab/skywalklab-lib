<script lang="ts">
  interface Props {
    /** Founder's name. */
    name: string;
    /** Founder's role or title. */
    role: string;
    /** Body copy; blank lines start a new paragraph. */
    bio?: string;
    /** Portrait image; falls back to the name's initials when omitted. */
    image?: { src: string; alt: string; width: string; height: string };
    /** Contact link text and destination. */
    contact?: { text: string; href: string };
    /** Color of the name. Sets `--founder-card-heading-color`. */
    headingColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { name, role, bio, image, contact, headingColor, style }: Props = $props();
  let uid: string = $props.id();

  const initials = $derived(
    name
      .split(/[\s,.]+/)
      .filter((part) => /^[A-Za-z]/.test(part))
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("")
  );
  const paragraphs = $derived((bio ?? "").split("\n\n").filter(Boolean));
</script>

<div id="founder-card-{uid}" class="founder-card" style:--founder-card-heading-color={headingColor} {style}>
  <div class="founder-card--portrait">
    {#if image}
      <img class="founder-card--image" src={image.src} alt={image.alt} width={image.width} height={image.height} />
    {:else}
      <span class="founder-card--initials" aria-hidden="true">{initials}</span>
    {/if}
  </div>

  <div class="founder-card--content">
    <h2 class="founder-card--name">{name}</h2>
    <p class="founder-card--role">{role}</p>
    {#each paragraphs as paragraph, i (i)}
      <p class="founder-card--bio">{paragraph}</p>
    {/each}
    {#if contact}
      <a class="founder-card--contact" href={contact.href}>{contact.text}</a>
    {/if}
  </div>
</div>

<style>
  .founder-card {
    --founder-card-accent: var(--accent, lightblue);

    display: grid;
    gap: 2.5rem;
    align-items: start;

    .founder-card--portrait {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      max-width: 260px;
      border-radius: 24px;
      overflow: hidden;
      background: linear-gradient(
        150deg,
        color-mix(in srgb, var(--founder-card-accent), #fff 15%),
        var(--founder-card-accent)
      );

      .founder-card--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .founder-card--initials {
        color: var(--primary, black);
        font-size: clamp(48px, 7vw, 76px);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
      }
    }

    .founder-card--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .founder-card--name {
        color: var(--founder-card-heading-color, var(--primary, black));
        font-size: clamp(28px, 3.2vw, 40px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
      }

      .founder-card--role {
        color: var(--founder-card-accent);
        font-size: 16px;
        font-weight: 700;
        margin-top: 0.5rem;
      }

      .founder-card--bio {
        font-size: 16px;
        line-height: 28px;
        max-width: 62ch;
        margin-top: 1.5rem;
      }

      .founder-card--contact {
        color: var(--founder-card-accent);
        font-size: 15px;
        font-weight: 700;
        margin-top: 1.75rem;
        border-bottom: 1px solid currentColor;
      }
    }

    @media (min-width: 768px) {
      grid-template-columns: minmax(200px, 260px) 1fr;
      gap: 3.5rem;
    }
  }
</style>
