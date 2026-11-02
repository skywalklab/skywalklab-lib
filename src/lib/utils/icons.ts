export const socialsIcons = ({
  size = "18",
  fill = "none",
  stroke = "currentColor"
}: {
  size?: string;
  fill?: string;
  stroke?: string;
}): Map<string, string> =>
  new Map([
    [
      "instagram",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`
    ],
    [
      "github",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`
    ],
    [
      "facebook",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
    ],
    [
      "youtube",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`
    ],
    [
      "twitter",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`
    ],
    [
      "pinterest",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>`
    ],
    [
      "linkedin",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`
    ],
    [
      "travaux",
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-2 -2 36 36" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.468 29.765c7.62 4.399 17.364 1.789 21.762-5.831 4.4-7.62 1.79-17.363-5.83-21.762S7.036.383 2.637 8.002c-4.399 7.62-1.788 17.364 5.831 21.763"/><g transform="translate(16,16) scale(0.85) translate(-16,-16)"><path d="M28.471 8.604 26.644 7.55a.97.97 0 0 0-.569-.126c-.796.071-2.914.127-2.472-1.358a.34.34 0 0 0-.133-.377 12.45 12.45 0 0 0-13.273-.505c-1.092.63-.497 1.362 0 1.293 3.35-.463 7.033.37 6.504 3.005-.078.382-.286.805-.538 1.257l-9.38 14.66a.43.43 0 0 0 .064.545 13.9 13.9 0 0 0 4.08 2.713c.207.09.448.004.553-.195l9.196-17.399c.077-.147.175-.283.294-.397 1.044-1.002 2.025.81 2.354 1.522a.96.96 0 0 0 .392.428l1.83 1.056a.384.384 0 0 0 .525-.14l2.541-4.402a.384.384 0 0 0-.14-.526v.001Z"/></g></svg>`
    ]
  ]);

export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getSocialSVG({
  social,
  size,
  fill,
  stroke,
  dataUrl
}: {
  social: string;
  size?: string;
  fill?: string;
  stroke?: string;
  dataUrl?: boolean;
}) {
  const socialsSVG =
    socialsIcons({ size, fill, stroke }).get(social) ?? socialsIcons({ size, fill, stroke }).get("instagram")!;

  return dataUrl ? svgToDataUrl(socialsSVG) : socialsSVG;
}
