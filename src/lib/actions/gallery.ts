type GalleryController = {
  galleryIndex: number | undefined;
  itemLength: number;
  event: KeyboardEvent["key"];
};

export function galleryController({ galleryIndex, itemLength, event }: GalleryController): number | undefined {
  if (galleryIndex === undefined) return;

  if (event === "Escape") return;
  if (event === "ArrowRight") return (galleryIndex + 1) % itemLength;
  if (event === "ArrowLeft") return (galleryIndex - 1 + itemLength) % itemLength;

  return galleryIndex;
}
