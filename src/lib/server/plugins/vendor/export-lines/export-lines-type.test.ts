import { describe, it, expect } from "vitest";
import { getExportRegex } from "../utils/regex.js";

describe("export-type regex", () => {
  const regex = new RegExp(getExportRegex("export-type", "Foo|Bar"));

  it("matches interface and type exports", () => {
    // interface
    expect(regex.test(`export interface Foo {}`)).toBe(true);
    // type
    expect(regex.test(`export type Bar = string`)).toBe(true);
  });

  it("matches enum exports", () => {
    expect(regex.test(`export enum Foo { A, B }`)).toBe(true);
    expect(regex.test(`enum Bar { X, Y }`)).toBe(true);
  });

  it("matches namespace exports", () => {
    expect(regex.test(`export namespace Foo {}`)).toBe(true);
    expect(regex.test(`namespace Bar {}`)).toBe(true);
  });

  it("matches ambient declarations with declare", () => {
    expect(regex.test(`declare interface Foo {}`)).toBe(true);
    expect(regex.test(`declare type Bar = string`)).toBe(true);
    expect(regex.test(`declare enum Foo { A }`)).toBe(true);
    expect(regex.test(`declare namespace Bar {}`)).toBe(true);
  });

  it("does not match different names or non-type exports", () => {
    // Different name
    expect(regex.test(`export type Baz = string`)).toBe(false);
    // const export
    expect(regex.test(`export const Foo = 'bar'`)).toBe(false);
    // function export
    expect(regex.test(`export function Foo() {}`)).toBe(false);
  });

  it("captures groups correctly", () => {
    const match = `export interface Foo {}`.match(regex);
    expect(match?.[1]).toBe("interface");
    expect(match?.[2]).toBe("Foo");
  });

  it("matches non-exported type declarations", () => {
    // The export-type regex matches declarations with or without export
    // This is intentional to find types that may be exported via binding
    expect(regex.test(`interface Foo {}`)).toBe(true);
    expect(regex.test(`type Bar = string`)).toBe(true);
  });
});

describe("type binding exports", () => {
  const bindingRegex = new RegExp(getExportRegex("export-named-binding", "Foo|Bar"));

  it("matches type exports via binding clause", () => {
    // Types can be exported via export { TypeName }
    expect(bindingRegex.test(`export { Foo }`)).toBe(true);
    expect(bindingRegex.test(`export { Bar }`)).toBe(true);
  });

  it("matches type keyword in binding export", () => {
    expect(bindingRegex.test(`export { type Foo }`)).toBe(true);
  });

  it("matches mixed type and value exports", () => {
    expect(bindingRegex.test(`export { type Foo, Bar }`)).toBe(true);
  });
});
