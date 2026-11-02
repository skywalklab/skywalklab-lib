import { describe, it, expect } from "vitest";
import { getExportRegex } from "../utils/regex.js";

describe("export-named-direct regex", () => {
  const regex = new RegExp(getExportRegex("export-named-direct", "foo"));

  it("matches const, let, var, and function exports", () => {
    // const
    expect(regex.test(`export const foo = 'bar'`)).toBe(true);
    // let
    expect(regex.test(`export let foo = 'bar'`)).toBe(true);
    // var
    expect(regex.test(`export var foo = 'bar'`)).toBe(true);
    // function
    expect(regex.test(`export function foo() {}`)).toBe(true);
    // async function
    expect(regex.test(`export async function foo() {}`)).toBe(true);
  });

  it("matches class exports", () => {
    expect(regex.test(`export class foo {}`)).toBe(true);
  });

  it("matches generator function exports", () => {
    expect(regex.test(`export function* foo() {}`)).toBe(true);
  });

  it("does not match different names or default exports", () => {
    // Different name
    expect(regex.test(`export const bar = 'baz'`)).toBe(false);
    // Default export
    expect(regex.test(`export default foo`)).toBe(false);
    // Prefix match
    expect(new RegExp(getExportRegex("export-named-direct", "Arrow")).test(`export const ArrowRight = 'icon'`)).toBe(
      false
    );
  });

  it("captures the export name", () => {
    const match = `export const foo = 'bar'`.match(regex);
    expect(match?.[1]).toBe("foo");
  });
});

describe("export-named-re regex", () => {
  const regex = new RegExp(getExportRegex("export-named-re", "foo"));

  it("matches all re-export variations", () => {
    // Named
    expect(regex.test(`export { foo } from './utils'`)).toBe(true);
    // With alias
    expect(regex.test(`export { foo as bar } from './utils'`)).toBe(true);
    // Multiple
    expect(regex.test(`export { foo, bar, baz } from './utils'`)).toBe(true);
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

  it("does not match different names or prefix matches", () => {
    // Different name
    expect(regex.test(`export { bar } from './utils'`)).toBe(false);
    // Prefix match
    expect(
      new RegExp(getExportRegex("export-named-re", "Arrow")).test(`export { default as ArrowRight } from './utils'`)
    ).toBe(false);
  });

  it("captures groups correctly", () => {
    const match = `export { foo } from './utils.js'`.match(regex);
    expect(match?.[1]).toBe("foo");
    expect(match?.[2]).toBe(".");
    expect(match?.[3]).toBe("/utils.js");
  });
});

describe("export-named-binding regex", () => {
  const regex = new RegExp(getExportRegex("export-named-binding", "foo|bar"));

  it("matches binding exports without from clause", () => {
    expect(regex.test(`export { foo }`)).toBe(true);
    expect(regex.test(`export { bar }`)).toBe(true);
    expect(regex.test(`export { foo, bar }`)).toBe(true);
  });

  it("matches with alias", () => {
    expect(regex.test(`export { foo as myFoo }`)).toBe(true);
  });

  it("matches multiline exports", () => {
    expect(
      regex.test(`export {
  foo,
  bar
}`)
    ).toBe(true);
  });

  it("does not match different names", () => {
    expect(regex.test(`export { baz }`)).toBe(false);
  });

  it("does not match partial names", () => {
    expect(new RegExp(getExportRegex("export-named-binding", "foo")).test(`export { fooBar }`)).toBe(false);
  });

  it("captures the full export clause and name", () => {
    const match = `export { foo, bar }`.match(regex);
    expect(match?.[1]).toBe("export { foo, bar }");
  });
});
