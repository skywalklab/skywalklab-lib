<script module lang="ts">
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import { headings_static_props } from "./headings.js";
  import { withDynamicProps } from "./utils.js";

  export const headings_default_props = withDynamicProps(headings_static_props, {
    IconHeading: {
      props: {
        icon: LucideIcon
      }
    },
    IconInlineHeading: {
      props: {
        icon: LucideIcon
      }
    }
  });
</script>
