<script module lang="ts">
  import inset_ui from "../css-modules/inset-ui.module.css";
  import { legal_static_props } from "./legal.js";
  import { withDynamicProps } from "./utils.js";

  export const legal_default_props = withDynamicProps(legal_static_props, {
    CookieBanner: {
      props: {
        buttonClass: inset_ui["inset-ui"]
      }
    }
  });
</script>
