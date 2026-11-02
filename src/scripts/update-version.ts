import { readFile, writeFile } from "node:fs/promises";
import { inc } from "semver";

let packageJSON = await readFile("./package.json", "utf-8");
packageJSON = packageJSON.replace(/"version":\s"(.*)",/, (match, version) =>
  match.replace(version, `${inc(version, "patch")}`)
);
await writeFile("./package.json", packageJSON);
