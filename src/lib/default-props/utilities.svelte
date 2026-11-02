<script module lang="ts">
  import default_ui from "../css-modules/default-ui.module.css";
  import { utilities_static_props } from "./utilities.js";
  import { withDynamicProps } from "./utils.js";

  export const utilities_default_props = withDynamicProps(utilities_static_props, {
    ContactForm1: {
      props: {
        buttonClass: default_ui["default-ui"]
      }
    },
    ContactForm2: {
      props: {
        buttonClass: default_ui["default-ui"]
      }
    }
  });
</script>
