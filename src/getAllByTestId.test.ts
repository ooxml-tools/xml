import { describe, expect, test } from "vitest";
import { getAllByTestId, getSingleTextNode } from "./";
import { xml2js } from "xml-js";

describe("getAllByTestId", () => {
  test("root node", () => {
    const xml = `
            <root _testid="foobar">
                <foo>
                    TEST_1
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    const elements = getAllByTestId(root, "foobar");
    expect(elements.length).toEqual(1);
    expect(elements[0]?.name).toEqual("root");
  });

  test("sibling nodes", () => {
    const xml = `
            <root>
                <foo _testid="foobar">
                    TEST_1
                </foo>
                <foo _testid="foobar">
                    TEST_2
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    const elements = getAllByTestId(root, "foobar");
    expect(elements.length).toEqual(2);
    expect(getSingleTextNode(elements[0]).text).toMatch(/TEST_1/);
    expect(getSingleTextNode(elements[1]).text).toMatch(/TEST_2/);
  });

  test("nested nodes", () => {
    const xml = `
            <root>
                <foo _testid="foobar">
                    TEST_1
                </foo>
                <bar>
                    <test _testid="foobar">
                        TEST_2
                    </test>
                </bar>
                <foo _testid="foobar">
                    TEST_3
                </foo>
            </root>
        `;
    const root = xml2js(xml);
    const elements = getAllByTestId(root, "foobar");
    expect(elements.length).toEqual(3);
    expect(getSingleTextNode(elements[0]).text).toMatch(/TEST_1/);
    expect(getSingleTextNode(elements[1]).text).toMatch(/TEST_2/);
    expect(getSingleTextNode(elements[2]).text).toMatch(/TEST_3/);
  });
});
