export function getImageAttr(file: string, useParams?: boolean): Record<string, string> {
  const url = new URL(file);

  const filename =
    url.pathname
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "") ?? "";
  const parts: string[][] = useParams
    ? [...url.searchParams.entries()]
    : filename?.split("__").map((item) => item.split("-"));

  return parts.reduce(
    (acc, item) => {
      const [key, value] = item;

      acc[key.replace("_", "-")] = value.replace("_", "-");
      return acc;
    },
    {} as Record<string, string>
  );
}
