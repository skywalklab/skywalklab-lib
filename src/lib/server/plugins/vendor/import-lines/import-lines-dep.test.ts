import { describe, it, expect } from "vitest";
import { getImportRegex } from "../utils/regex.js";

describe("getImportRegex", () => {
  describe("type: dependency", () => {
    const regex = new RegExp(getImportRegex("import-dependency", ""), "s");

    it("matches all named import variations", () => {
      // Named
      expect(regex.test(`import { foo } from 'lodash'`)).toBe(true);
      // Default
      expect(regex.test(`import lodash from 'lodash'`)).toBe(true);
      // Namespace
      expect(regex.test(`import * as lodash from 'lodash'`)).toBe(true);
      // Combined
      expect(regex.test(`import lodash, { foo } from 'lodash'`)).toBe(true);
      // Type
      expect(regex.test(`import type { Foo } from 'lodash'`)).toBe(true);
      // String name (ES2022)
      // expect(regex.test(`import { 'string-name' as stringName } from 'lodash'`)).toBe(true);
      // Multiline
      expect(
        regex.test(`import {
  // comment
  foo
} from 'lodash'`)
      ).toBe(true);
      // Scoped package
      expect(regex.test(`import { foo } from '@scope/utils'`)).toBe(true);
      // Import attributes
      expect(regex.test(`import data from "lodash/data.json" with { type: "json" }`)).toBe(true);
    });

    it("does not match relative or dynamic imports", () => {
      expect(regex.test(`import { foo } from './utils'`)).toBe(false);
      expect(regex.test(`import('lodash')`)).toBe(false);
    });

    it("captures groups correctly", () => {
      const match = `import { foo, bar } from 'lodash/utils'`.match(regex);
      expect(match?.[1]?.trim()).toBe("{ foo, bar }");
      expect(match?.[2]).toBe("lodash/utils");
    });
  });

  describe("type: dependency-bare", () => {
    const regex = new RegExp(getImportRegex("import-dependency-bare", ""));

    it("matches side-effect and dynamic imports", () => {
      // Side-effect
      expect(regex.test(`import 'lodash'`)).toBe(true);
      // Dynamic
      expect(regex.test(`import('lodash')`)).toBe(true);
      // Scoped package
      expect(regex.test(`import '@scope/styles.css'`)).toBe(true);
    });

    it("does not match named or relative imports", () => {
      expect(regex.test(`import { foo } from 'lodash'`)).toBe(false);
      expect(regex.test(`import './styles.css'`)).toBe(false);
    });
  });
});
