import { describe, expect, test } from "vitest";
import { safeXml } from "./";

describe("safeXml", () => {
  test("basic valid", () => {
    const output = safeXml`<name>foo</name>`;
    expect(output).toEqual("<name>foo</name>");
  });

  test("valid with variable", () => {
    const output = safeXml`<name>${"testing"}</name>`;
    expect(output).toEqual("<name>testing</name>");
  });

  test("valid with null variable", () => {
    const output = safeXml`<name>${null}</name>`;
    expect(output).toEqual("<name></name>");
  });

  test("valid with undefined variable", () => {
    const output = safeXml`<name>${undefined}</name>`;
    expect(output).toEqual("<name></name>");
  });

  test("valid with array variable", () => {
    const output = safeXml`<name>${["this", " is", " awesome!"]}</name>`;
    expect(output).toEqual("<name>this is awesome!</name>");
  });

  test("invalid", () => {
    process.env.NODE_ENV = "development";
    expect(() => safeXml`<foo></bar>`).toThrow("Unmatched closing tag: bar");
  });

  test("with null/undefined", () => {
    const output = safeXml`<name>${["this", undefined, " is", null, " awesome!"]}</name>`;
    expect(output).toEqual("<name>this is awesome!</name>");
  });

  test("valid with the common '&&' syntax", () => {
    const truthyOutput = safeXml`<name>${true && "this is awesome!"}</name>`;
    expect(truthyOutput).toEqual("<name>this is awesome!</name>");
    const falseyOutput = safeXml`<name>${false && "this is awesome!"}</name>`;
    expect(falseyOutput).toEqual("<name></name>");
  });
});
