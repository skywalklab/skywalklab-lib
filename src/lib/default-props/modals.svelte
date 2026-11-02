<script module lang="ts">
  import SkywalklabAnimatedLogo from "../components/brand/SkywalklabAnimatedLogo.svelte";
  import pop_up_ui from "../css-modules/pop-up-ui.module.css";
  import { testLogoWhite, testTitle, testModal } from "../data/test-data.js";
  import { modals_static_props } from "./modals.js";
  import { withDynamicProps } from "./utils.js";

  export const modals_default_props = withDynamicProps(modals_static_props, {
    Modal: {
      props: {
        headerSnippet: ModalHeaderSnippet,
        bodySnippet: ModalBodySnippet,
        footerSnippet: ModalFooterSnippet
      },
      extraSnippet: ModalExtraSnippet
    }
  });
</script>

{#snippet ModalHeaderSnippet()}
  <img src={testLogoWhite} alt="" width="32" height="32" />
  <h2 style="font-size: 26px; margin-left: 0.5rem;">{testTitle}</h2>
{/snippet}

{#snippet ModalBodySnippet()}
  <div>
    <SkywalklabAnimatedLogo
      itemIndex={0}
      itemsLength={4}
      logoProps={{
        fill: "var(--accent, lightblue)",
        endFill: "var(--primary, black)",
        stroke: "#ffffff",
        height: "150"
      }}
      style="margin: 0 auto;" />
  </div>
{/snippet}

{#snippet ModalFooterSnippet()}
  <p style="text-align: center;">
    <button
      style="background-color: var(--primary); color: #fff; box-shadow: var(--box-shadow); border-radius: 24px; padding: 0.75rem 1.5rem; cursor: pointer;"
      onclick={(e) => {
        const host = e.currentTarget.closest("[slot]")?.parentElement ?? e.currentTarget;
        const root = (host.shadowRoot ?? host.getRootNode()) as Document | ShadowRoot;

        (root?.querySelector(".modal--close-button") as HTMLButtonElement)?.click();
      }}>{testModal.closeText}</button>
  </p>
{/snippet}

{#snippet ModalExtraSnippet(componentName: string, { cb, showModal }: { cb: () => void; showModal: boolean })}
  {#if componentName === "Modal" && !showModal}
    <button class={pop_up_ui["pop-up-ui"]} onclick={() => cb?.()}>{testModal.openText}</button>
  {/if}
{/snippet}
