<script module lang="ts">
  import { testDescription, testLogo } from "../data/test-data.js";
  import { frames_static_props } from "./frames.js";
  import { withDynamicProps } from "./utils.js";

  export const frames_default_props = withDynamicProps(frames_static_props, {
    Book3D: {
      props: {
        children: Book3DChildren
      }
    },
    PictureMat: {
      props: {
        children: PictureMatChildren
      }
    },
    TraceBox: {
      props: {
        children: TraceBoxChildren
      }
    }
  });
</script>

{#snippet Book3DChildren()}
  <img src={testLogo} alt="SkywalkLab logo" width="188" height="330" />
{/snippet}

{#snippet PictureMatChildren()}
  <img width="60" height="96" src={testLogo} alt="" loading="lazy" style="object-fit: contain;" />
{/snippet}

{#snippet TraceBoxChildren()}
  <p style="text-align: center;">{testDescription}</p>
{/snippet}
