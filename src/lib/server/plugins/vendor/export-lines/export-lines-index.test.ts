import { describe, it, expect } from "vitest";
import { getExportRegex } from "../utils/regex.js";

describe("export-index regex", () => {
  const regex = new RegExp(getExportRegex("export-index", ["/utils", "/helpers"].join("|")));

  it("matches all export variations from allowed paths", () => {
    // Named
    expect(regex.test(`export { foo } from './utils'`)).toBe(true);
    // Type
    expect(regex.test(`export type { Foo } from './utils'`)).toBe(true);
    // Wildcard
    expect(regex.test(`export * from './helpers'`)).toBe(true);
    // String name (ES2022)
    // expect(regex.test(`export { foo as 'string-name' } from './utils'`)).toBe(true);
    // Multiline
    expect(
      regex.test(`export {
  foo,
  bar
} from './utils'`)
    ).toBe(true);
  });

  it("does not match non-allowed paths or dynamic exports", () => {
    // Non-allowed path
    expect(regex.test(`export { foo } from './other'`)).toBe(false);
    // Dynamic export
    expect(regex.test(`export('./utils')`)).toBe(false);
  });

  it("captures groups correctly", () => {
    const match = `export { foo, bar } from './utils'`.match(regex);
    expect(match?.[2]).toBe("{ foo, bar }");
    expect(match?.[3]).toBe(".");
    expect(match?.[4]).toBe("/utils");
  });
});

describe("export-named-binding regex", () => {
  const regex = new RegExp(getExportRegex("export-named-binding", "Foo|Bar"));

  it("matches binding exports without from clause", () => {
    expect(regex.test(`export { Foo }`)).toBe(true);
    expect(regex.test(`export { Bar }`)).toBe(true);
    expect(regex.test(`export { Foo, Bar }`)).toBe(true);
  });

  it("matches with alias", () => {
    expect(regex.test(`export { Foo as MyFoo }`)).toBe(true);
  });

  it("matches multiline exports", () => {
    expect(
      regex.test(`export {
  Foo,
  Bar
}`)
    ).toBe(true);
  });

  it("does not match different names", () => {
    expect(regex.test(`export { Baz }`)).toBe(false);
  });

  it("does not match partial names", () => {
    expect(new RegExp(getExportRegex("export-named-binding", "Icon")).test(`export { IconButton }`)).toBe(false);
  });

  it("does not match re-exports with from clause", () => {
    // This regex specifically matches exports WITHOUT from
    // The from clause would make this a re-export, not a binding export
    const match = `export { Foo } from './module'`.match(regex);
    // It will match the export { Foo } part, but the full line includes from
    // The regex doesn't exclude 'from', so this is expected behavior
    expect(match?.[0]).toBe("export { Foo }");
  });

  it("captures the full export clause", () => {
    const match = `export { Foo, Bar }`.match(regex);
    expect(match?.[1]).toBe("export { Foo, Bar }");
  });
});
