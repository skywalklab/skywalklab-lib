<script module lang="ts">
  import { buttons_static_props } from "./buttons.js";
  import { withDynamicProps } from "./utils.js";

  export const buttons_default_props = withDynamicProps(buttons_static_props, {
    Rolladex: {
      props: {
        children: RolladexChildren
      }
    }
  });
</script>

{#snippet RolladexChildren()}
  Rolladex Button
{/snippet}
