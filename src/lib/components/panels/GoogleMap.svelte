<script lang="ts">
  import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
  import type { Action } from "svelte/action";
  import { SvelteMap } from "svelte/reactivity";

  interface Props {
    /** Latitude the map centers on, and where the marker is placed. */
    lat: number;
    /** Longitude the map centers on, and where the marker is placed. */
    lng: number;
    /** Initial zoom level, from 1 (world) to 22 (building). */
    zoom?: number;
    /** Image drawn as the map marker. `alt` defaults to `"Google Map Marker"`, `width` and `height` to `30`. Omit it to leave the position unmarked. */
    marker?: { src: string; alt?: string; width?: number; height?: number };
    /** ID of a map style created in the Google Cloud console. Required for the marker to appear; the default is Google's sample style. */
    mapId?: string;
    /** Google Maps JavaScript API key, used to load the `maps` and `marker` libraries. */
    googleMapApiKey: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { lat, lng, zoom = 14, marker, mapId = "DEMO_MAP_ID", googleMapApiKey, style }: Props = $props();
  let uid: string = $props.id();
  const mapCreator = new SvelteMap<string, () => void>();

  // Reading the position props here re-creates the map when they change; the factory closes
  // over them, so without this a later lat/lng would never recenter it.
  $effect(() => {
    void [lat, lng, zoom, mapId];
    return mapCreator.get("createMap")?.();
  });

  const addMap: Action<HTMLElement> = (node: HTMLElement) => {
    setOptions({ key: googleMapApiKey });

    Promise.all([importLibrary("maps"), importLibrary("marker")]).then(([{ Map }, { AdvancedMarkerElement }]) => {
      mapCreator.set("createMap", () => {
        let map = new Map(node, {
          center: { lat, lng },
          zoom,
          mapId,
          disableDefaultUI: true
        });

        let content: HTMLImageElement | undefined;

        if (marker?.src) {
          content = document.createElement("img");
          content.src = marker.src;
          content.alt = marker.alt ?? "Google Map Marker";
          content.width = marker.width ?? 30;
          content.height = marker.height ?? 30;
        }

        const markerEl = new AdvancedMarkerElement({ position: { lat, lng }, map, content });

        return () => {
          markerEl.map = null;
          if (node.firstElementChild) node.removeChild(node.firstElementChild);
        };
      });
    });
  };
</script>

<div id="google-map-{uid}" class="google-map" {style} use:addMap></div>
