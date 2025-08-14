import { describe, expect, test } from "vitest";
import { getByTestId, getSingleTextNode } from "./";
import { xml2js } from "xml-js";

describe("getByTestId", () => {
  test("root node", () => {
    const xml = `
            <root _testid="foobar">
                <foo>
                    TEST_1
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    const element = getByTestId(root, "foobar");
    expect(element).toBeDefined();
    expect(element?.name).toEqual("root");
  });

  test("nested", () => {
    const xml = `
            <root>
                <foo>
                    <bar>
                        test
                    </bar>
                    <baz _testid="foobar">TEST</baz>
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    const element = getByTestId(root, "foobar");
    expect(element).toBeDefined();
    expect(element?.name).toEqual("baz");
    expect(getSingleTextNode(element).text).toMatch(/TEST/);
  });

  test("throws if multiple defined", () => {
    const xml = `
            <root>
                <foo _testid="foobar">
                    <bar>
                        test
                    </bar>
                    <baz _testid="foobar">TEST</baz>
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    expect(() => getByTestId(root, "foobar")).toThrowError(
      new Error("Only expected 1 element with _testid='foobar'"),
    );
  });
});
