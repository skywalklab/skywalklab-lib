import type { UpdateVendorMapArgs, VendorMap } from "../types.js";
import { NAMED_IMPORTS, DEFAULT_IMPORTS } from "./consts.js";

const mergeToVendorMap = (vendorMap: VendorMap, source: string, specifiers: string[]) => {
  vendorMap.set(source, [
    ...new Set([...(vendorMap.get(source) ?? []), ...specifiers.map((specifier) => specifier.trim())])
  ]);
};

export const updateVendorMap = ({ vendorMap, source, specifier, fileName, isStatic }: UpdateVendorMapArgs) => {
  mergeToVendorMap(vendorMap, isStatic ? DEFAULT_IMPORTS : NAMED_IMPORTS, [specifier]);
  mergeToVendorMap(vendorMap, source, [fileName]);
};
