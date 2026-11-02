<script lang="ts">
  import { createHomepageSchema } from "$lib/utils/page-schema.js";
  import logo_list from "$lib/css-modules/logo-list.module.css";
  import Accordion from "$lib/components/disclosure/Accordion.svelte";
  import JsonLd from "$lib/components/seo/JsonLd.svelte";
  import { resolve } from "$app/paths";
  import { type PackageRegistry } from "$lib/utils/package-registry.js";
  import { getContext } from "svelte";
  import { getPackageRegistrySets } from "$lib/utils/package-registry.js";
  import BrandLogoSpinner from "$lib/components/animations/BrandLogoSpinner.svelte";
  import { testLogo, testLogoWhite } from "$lib/data/test-data.js";
  import { BRAND_LAB } from "$lib/brand/data.js";

  const packageRegistries = $state<{
    registryPromise: Promise<PackageRegistry>;
    serverPackageRegistry: PackageRegistry;
  }>(getContext("package-registries"));

  const homepageSchema = createHomepageSchema({
    name: BRAND_LAB.company,
    url: BRAND_LAB.site,
    logo: BRAND_LAB.favicon,
    description: BRAND_LAB.tagline_1
  });

  const convertJSCase = (camelCase: string) => {
    return camelCase
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([a-zA-Z])_([a-zA-Z])/g, "$1 $2")
      .replace(/^([a-z])/, (_, group) => group.toUpperCase());
  };
</script>

<svelte:head>
  <title>{BRAND_LAB.company}</title>
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <JsonLd schema={homepageSchema} />
</svelte:head>
<article class="package-exports">
  <h1>Package Exports</h1>
  {#await packageRegistries.registryPromise}
    <BrandLogoSpinner icon={testLogo} />
  {:then registry}
    {@const sets = getPackageRegistrySets(registry, packageRegistries.serverPackageRegistry)}
    <ul class="{logo_list['logo-list']} package-exports-list" style:--logo-list-marker-bg-color="var(--accent)">
      {#each sets.packageRegistry.entries() as [key, value] (key)}
        <li class={logo_list["active-hover"]}>
          <span style="color: black;">
            <Accordion summary={convertJSCase(key)}>
              <ul
                class={logo_list["logo-list"]}
                style:--logo-list-marker-image="url('{testLogoWhite.replaceAll("'", '%27')}')">
                {#if key === "components"}
                  {#each sets.componentSet as component (component)}
                    <li class="{logo_list['active-hover']} {logo_list['outline-marker']}">
                      <a href={resolve(`/${component}` as any)}>{convertJSCase(component)}</a>
                      <ul class="{logo_list['logo-list']} sub-sub-list">
                        {#each value as val (val)}
                          {#if val.startsWith(component)}
                            <li
                              class="{logo_list['active-hover']} {logo_list['outline-marker']}"
                              style:--logo-list-outline-marker-color="var(--accent)">
                              <a href={resolve(`/${component}#${val.split("__")[1]}` as any)}>
                                {convertJSCase(val.split("__")[1])}
                              </a>
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    </li>
                  {/each}
                {:else if /css_modules/.test(key)}
                  {#each value as val (val)}
                    <li class="{logo_list['active-hover']} {logo_list['outline-marker']}">
                      <a href={resolve("/buttons" as any)}>{convertJSCase(val)}</a>
                    </li>
                  {/each}
                {:else if /server/.test(key)}
                  {#each value.filter((file) => !/plugins__(?!SKYWALK_DIR)/i.test(file)).sort() as val (val)}
                    {#if !/plugins/.test(val)}
                      <li><span>{convertJSCase(val)}</span></li>
                    {:else}
                      <li>
                        <span>{convertJSCase(val.replace(/(?<=plugins).*/, ""))}</span>
                        <ul class="{logo_list['logo-list']} sub-sub-list">
                          {#each [...sets.pluginSet].sort() as val (val)}
                            <li style:--logo-list-outline-marker-color="var(--accent)">
                              <span>
                                {convertJSCase(val.split("__")[1])}
                              </span>
                            </li>
                          {/each}
                        </ul>
                      </li>
                    {/if}
                  {/each}
                {:else}
                  {#each value as val (val)}
                    <li><span>{convertJSCase(val)}</span></li>
                  {/each}
                {/if}
              </ul>
            </Accordion>
          </span>
        </li>
      {/each}
    </ul>
  {/await}
</article>

<style>
  .package-exports :global {
    background-color: transparent;

    .package-exports-list {
      width: min(90vw, 800px);
    }

    .sub-sub-list {
      --logo-list-nested-marker-bg-color: black;
    }
  }
</style>
