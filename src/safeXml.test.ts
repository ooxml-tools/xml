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

  test("valid with array variable", () => {
    const output = safeXml`<name>${["this", " is", " awesome!"]}</name>`;
    expect(output).toEqual("<name>this is awesome!</name>");
  });

  test("invalid", () => {
    process.env.NODE_ENV = "development";
    expect(() => safeXml`<foo></bar>`).toThrow("Unmatched closing tag: bar");
  });
});
