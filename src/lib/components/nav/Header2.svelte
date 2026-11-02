<script lang="ts">
  import LanguageHeader, { type Props } from "./LanguageHeader.svelte";

  let { openHamburger = $bindable(false), ...props }: Props = $props();
</script>

<LanguageHeader
  {...props}
  bind:openHamburger
  headerClass="header-2"
  style={[props.style, "position: sticky;"].filter(Boolean).join(" ")} />

<style>
  :global {
    .header-2 {
      .nav-logo-link--custom {
        max-width: unset;

        .nav-logo-img--custom {
          height: 2.5rem;
          width: 2.5rem;
          margin-right: 0.25rem;
        }

        p.nav-logo-name--custom {
          font-size: clamp(1.25rem, 4.5vw, 1.8rem);
        }
      }
    }
  }
</style>
