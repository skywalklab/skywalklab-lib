<script lang="ts">
  import { BRAND_LAB } from "../brand/data.js";
  import SkywalklabLogo from "../components/brand/SkywalklabLogo.svelte";
  import PatternGrid from "../components/patterns/PatternGrid.svelte";

  interface Props {
    src?: string;
  }

  let { src = "/@skywalklib/assets/brand/images/storybook-example.webp" }: Props = $props();
</script>

<section class="og-section">
  <PatternGrid />
  <div class="og">
    <p class="hero--tagline">Svelte Components, Custom Elements, CSS Modules, & Vite Plugins</p>
    <div class="og-company">
      <SkywalklabLogo fill="#fff" height="60" />
      <h1 class="hero--company">{BRAND_LAB.company}</h1>
    </div>
    <p class="hero--industry">Storybook</p>
  </div>
  <img
    {src}
    width=""
    height=""
    alt="cv generator"
    style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%; margin: auto; object-position: left; object-fit: cover;" />
</section>

<style>
  .og-section {
    margin: 5rem auto;
    width: 1200px;
    height: 630px;
    position: relative;
    padding: 0;
    z-index: 0;
    overflow: hidden;

    .og {
      position: absolute;
      z-index: 3;
      margin: auto;
      width: fit-content;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      top: 2rem;
      left: unset;
      bottom: unset;
      right: 2rem;
      background-color: var(--primary);
      padding: 1rem 2rem;
      border-radius: 12px;

      .hero--tagline {
        font-size: 18px;
        color: #ffffff;
        margin: 0 auto;

        @media (min-width: 768px) {
          margin-bottom: 0;
        }
      }

      .og-company {
        position: relative;
        display: flex;
        align-items: center;

        .hero--company {
          font-size: 4rem;
          font-family: Inter, Georgia, sans-serif;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 0.75rem;
          color: white;
          margin-top: 1rem;
        }
      }

      .hero--industry {
        font-size: 2.5rem;
        font-family: Inter, Georgia, sans-serif;
        font-weight: bold;
        line-height: 1;
        margin: 0 0 1.5rem 12.5%;
        color: white;
      }
    }
  }
</style>
