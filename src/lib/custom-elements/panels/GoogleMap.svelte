<svelte:options
  customElement={{
    tag: "skywalk-google-map",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      lat: { type: "Number", attribute: "sw-lat" },
      lng: { type: "Number", attribute: "sw-lng" },
      zoom: { type: "Number", attribute: "sw-zoom" },
      marker: { type: "Object", attribute: "sw-marker" },
      mapId: { type: "String", attribute: "sw-map-id" },
      googleMapApiKey: { type: "String", attribute: "sw-google-map-api-key" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/GoogleMap", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import GoogleMap from "../../components/panels/GoogleMap.svelte";

  let { lat, lng, zoom, marker, mapId, googleMapApiKey, style }: any = $props();
</script>

<GoogleMap {lat} {lng} {zoom} {marker} {mapId} {googleMapApiKey} {style} />


<style>
  :host {
    display: block;
  }
</style>
      