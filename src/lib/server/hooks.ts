export const preloadAssets: ({ type }: { type: string }) => boolean = ({ type }) => {
  return type === "font" || type === "js" || type === "css";
};
