import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import type { VendorConfig } from "../types.js";

const getVendorConfigFile = (vendorFolder: string) => `${vendorFolder}/config.json`;

export async function createVendorConfig({ useVendor, vendorFolder }: Required<VendorConfig>): Promise<void> {
  const vendorConfigFile = getVendorConfigFile(vendorFolder);
  const outputPath = path.resolve(process.cwd(), vendorConfigFile);
  await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
  await fsPromises.writeFile(outputPath, JSON.stringify({ useVendor }));
}

export async function getVendorConfig(vendorFolder: string): Promise<VendorConfig | undefined> {
  const vendorConfigFile = getVendorConfigFile(vendorFolder);

  const vendorConfig =
    fs.existsSync(vendorConfigFile) && JSON.parse(await fsPromises.readFile(vendorConfigFile, { encoding: "utf-8" }));

  return vendorConfig;
}
