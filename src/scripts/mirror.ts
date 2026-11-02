import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { addDependencyModules } from "../lib/server/plugins/vendor/source-files/find-dependencies.js";
import { DEP, DEV_DEP } from "../lib/server/plugins/vendor/utils/consts.js";

const libDir = path.resolve(import.meta.dirname, "../..");
const git = (...args: string[]) => execFileSync("git", args, { cwd: libDir, encoding: "utf-8" }).trim();
const root = git("rev-parse", "--show-toplevel");
const libFolder = git("rev-parse", "--show-prefix").replace(/\/$/, "");
const { values } = parseArgs({
  options: { out: { type: "string", default: path.resolve(root, "../skywalklab-lib") } }
});
const out = path.resolve(process.env.INIT_CWD ?? process.cwd(), values.out!);

fs.mkdirSync(out, { recursive: true });
for (const entry of fs.readdirSync(out)) {
  if (entry !== ".git") fs.rmSync(path.join(out, entry), { recursive: true, force: true });
}
execFileSync("sh", ["-c", `git archive --format=tar "HEAD:${libFolder}" -- . ':!static' | tar -x -C "$OUT"`], {
  cwd: root,
  env: { ...process.env, OUT: out },
  stdio: "inherit"
});

process.chdir(root);
const pkgPath = path.join(out, "package.json");
const packageJSON = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const vendorMap = new Map<string, string[]>();
await addDependencyModules({ vendorMap, packageJSON, specifiers: [], useNpmAlias: false, includeAllDep: true });

const toDependencies = (entries: string[]) =>
  Object.fromEntries(
    entries.map((entry) => [entry.slice(0, entry.lastIndexOf("@")), entry.slice(entry.lastIndexOf("@") + 1)])
  );
if (packageJSON.dependencies) packageJSON.dependencies = toDependencies(vendorMap.get(DEP)!);
if (packageJSON.devDependencies) packageJSON.devDependencies = toDependencies(vendorMap.get(DEV_DEP)!);

const unresolved = JSON.stringify(packageJSON).match(/"catalog:[^"]*"/g);
if (unresolved) throw new Error(`Unresolved catalog versions in ${pkgPath}`);

fs.writeFileSync(pkgPath, JSON.stringify(packageJSON, null, 2) + "\n");
console.log(`Mirrored ${libFolder} (HEAD) to ${out}`);
