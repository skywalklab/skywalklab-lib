import { customElementsPluginOptions } from "../lib/server/plugins/custom-elements/helpers.js";

const cwd = process.cwd();

const { buildStart } = customElementsPluginOptions({ execute: true, cwd });

(buildStart as any).call(null);

console.log("Generated custom elements.");
