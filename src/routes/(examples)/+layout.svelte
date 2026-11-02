<script lang="ts">
  // svelte-ignore-all state_referenced_locally
  import { setContext, untrack, type Snippet } from "svelte";
  import "$lib/default-props/examples.css";
  import { getPackageRegistry, type PackageRegistry, type RawPackageRegistry } from "$lib/utils/package-registry.js";

  interface Props {
    data: { rawPackageRegistry: RawPackageRegistry; serverPackageRegistry: PackageRegistry };
    children: Snippet;
  }

  let { data, children }: Props = $props();

  untrack(() => {
    data.rawPackageRegistry.get("styles/fonts.css")?.();
    data.rawPackageRegistry.get("styles/vars.css")?.();
    data.rawPackageRegistry.get("styles/preflight.css")?.();
    data.rawPackageRegistry.get("styles/base.css")?.();

    setContext("package-registries", {
      registryPromise: getPackageRegistry(data.rawPackageRegistry),
      serverPackageRegistry: data.serverPackageRegistry
    });
  });
</script>

<main>
  <section>
    {@render children()}
  </section>
</main>

<style>
  main :global {
    background-color: var(--primary);
    color: var(--primary);
    min-height: 100%;

    section {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 3rem;
      padding-inline: var(--inline-padding);
      height: 100%;

      article {
        min-width: 280px;
        max-width: 500px;
        margin: 0 0 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid var(--primary);
        padding: 1rem 1rem 3rem;
        background-color: #fff;
        border-radius: 12px;
      }
    }

    h1 {
      font-size: clamp(38px, 5vw, 46px);
      width: 100%;
      text-align: center;
      margin-top: 3rem;
      color: #fff;

      + hr {
        margin-bottom: 2rem;
        width: 100%;
        border-color: #fff;
      }
    }

    .component-name {
      font-size: clamp(30px, 5vw, 36px);
      width: fit-content;
      margin: 0 auto 2.5rem;
      scroll-margin-top: 25vw;
      color: var(--primary);
    }
  }
</style>
