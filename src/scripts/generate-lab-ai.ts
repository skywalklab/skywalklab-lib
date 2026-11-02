import path from "node:path";
import { parseArgs } from "node:util";
import { labAiPluginOptions } from "../lib/server/plugins/lab-ai/helpers.js";

const { values } = parseArgs({ options: { out: { type: "string" } } });

if (!values.out) {
  console.error("Missing --out <file> for the generated lab AI data.");
  process.exit(1);
}

const fileToWrite = path.resolve(process.cwd(), values.out);
const { buildStart } = labAiPluginOptions({ execute: true, fileToWrite });

await (buildStart as any).call(null);

console.log(`Generated lab ai tools: ${fileToWrite}`);
