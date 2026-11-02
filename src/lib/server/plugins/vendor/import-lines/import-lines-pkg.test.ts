import { describe, it, expect } from "vitest";
import { getImportRegex } from "../utils/regex.js";

describe("getImportRegex", () => {
  describe("type: package", () => {
    const regex = new RegExp(getImportRegex("import-package", "@skywalklab"), "s");

    it("matches all named import variations", () => {
      // Named
      expect(regex.test(`import { foo } from '@skywalklab/utils'`)).toBe(true);
      // Default
      expect(regex.test(`import utils from '@skywalklab/utils'`)).toBe(true);
      // Namespace
      expect(regex.test(`import * as utils from '@skywalklab/utils'`)).toBe(true);
      // Combined
      expect(regex.test(`import utils, { foo } from '@skywalklab/utils'`)).toBe(true);
      // Type
      expect(regex.test(`import type { Foo } from '@skywalklab/utils'`)).toBe(true);
      // String name (ES2022)
      // expect(regex.test(`import { 'string-name' as stringName } from '@skywalklab/utils'`)).toBe(true);
      // Multiline
      expect(
        regex.test(`import {
  // comment
  foo
} from '@skywalklab/utils'`)
      ).toBe(true);
      // Import attributes
      expect(regex.test(`import data from "@skywalklab/data.json" with { type: "json" }`)).toBe(true);
    });

    it("does not match other packages, relative, or dynamic imports", () => {
      expect(regex.test(`import { foo } from 'lodash'`)).toBe(false);
      expect(regex.test(`import { foo } from './@skywalklab'`)).toBe(false);
      expect(regex.test(`import('@skywalklab/utils')`)).toBe(false);
    });

    it("captures groups correctly", () => {
      const match = `import { foo, bar } from '@skywalklab/utils'`.match(regex);
      expect(match?.[1]?.trim()).toBe("{ foo, bar }");
      expect(match?.[2]).toBe("/utils");
    });
  });

  describe("type: package-bare", () => {
    const regex = new RegExp(getImportRegex("import-package-bare", "@skywalklab"));

    it("matches side-effect and dynamic imports", () => {
      // Side-effect
      expect(regex.test(`import '@skywalklab/styles.css'`)).toBe(true);
      // Dynamic
      expect(regex.test(`import('@skywalklab/utils')`)).toBe(true);
    });

    it("does not match named imports or other packages", () => {
      expect(regex.test(`import { foo } from '@skywalklab/utils'`)).toBe(false);
      expect(regex.test(`import 'lodash'`)).toBe(false);
    });
  });
});
