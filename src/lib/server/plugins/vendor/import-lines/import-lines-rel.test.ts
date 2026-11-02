import { describe, it, expect } from "vitest";
import { getImportRegex } from "../utils/regex.js";

describe("getImportRegex", () => {
  describe("type: relative", () => {
    const regex = new RegExp(getImportRegex("import-relative", ""), "s");

    it("matches all named import variations", () => {
      // Named
      expect(regex.test(`import { foo } from './utils'`)).toBe(true);
      // Default
      expect(regex.test(`import utils from './utils'`)).toBe(true);
      // Namespace
      expect(regex.test(`import * as utils from './utils'`)).toBe(true);
      // Combined
      expect(regex.test(`import utils, { foo } from './utils'`)).toBe(true);
      // Type
      expect(regex.test(`import type { Foo } from './utils'`)).toBe(true);
      // String name (ES2022)
      // expect(regex.test(`import { 'string-name' as stringName } from './utils'`)).toBe(true);
      // Multiline
      expect(
        regex.test(`import {
  // comment
  foo
} from './utils'`)
      ).toBe(true);
      // Parent directory
      expect(regex.test(`import { foo } from '../utils'`)).toBe(true);
      // Import attributes
      expect(regex.test(`import data from "./data.json" with { type: "json" }`)).toBe(true);
    });

    it("does not match packages or dynamic imports", () => {
      expect(regex.test(`import { foo } from 'lodash'`)).toBe(false);
      expect(regex.test(`import { foo } from '@scope/utils'`)).toBe(false);
      expect(regex.test(`import('./utils')`)).toBe(false);
    });

    it("captures groups correctly", () => {
      const match = `import { foo, bar } from './utils.js'`.match(regex);
      expect(match?.[1]?.trim()).toBe("{ foo, bar }");
      expect(match?.[2]).toBe(".");
      expect(match?.[3]).toBe("/utils.js");
    });
  });

  describe("type: relative-bare", () => {
    const regex = new RegExp(getImportRegex("import-relative-bare", ""));

    it("matches side-effect and dynamic imports", () => {
      // Side-effect
      expect(regex.test(`import './styles.css'`)).toBe(true);
      // Dynamic
      expect(regex.test(`import('./utils')`)).toBe(true);
      // Parent directory
      expect(regex.test(`import '../styles.css'`)).toBe(true);
    });

    it("does not match named imports or packages", () => {
      expect(regex.test(`import { foo } from './utils'`)).toBe(false);
      expect(regex.test(`import 'lodash'`)).toBe(false);
    });
  });
});
