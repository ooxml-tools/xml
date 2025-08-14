import { describe, expect, test } from "vitest";
import { getSingleTextNode } from "./";
import { xml2js } from "xml-js";

describe("getSingleTextNode", () => {
  test("returns text node if present", () => {
    const xml = `<root>HELLO</root>`;
    const root = xml2js(xml);
    const output = getSingleTextNode(root.elements[0]);
    expect(output.text).toEqual("HELLO");
  });

  test("errors if no nodes present", () => {
    const xml = `<root></root>`;
    const root = xml2js(xml);
    expect(() => getSingleTextNode(root.elements[0])).toThrowError(
      "Not a single text node",
    );
  });

  test("errors if node isn't text node", () => {
    const xml = `<root><foo></foo></root>`;
    const root = xml2js(xml);
    expect(() => getSingleTextNode(root.elements[0])).toThrowError(
      "Not a single text node",
    );
  });
});
