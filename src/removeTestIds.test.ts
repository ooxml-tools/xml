import { describe, expect, test } from "vitest";
import { removeTestIds } from "./";
import { js2xml, xml2js } from "xml-js";

describe("removeTestIds", () => {
  test("removed all _testid attributes", () => {
    const xml = `
      <root>
        <foo _testid="foobar">
          <foo _testid="foobar">
            TEST
          </foo>
        </foo>
        <bar _testid="foobar">
          TEST
        </bar>
      </root>
    `;
    expect(xml).toMatch(/_testid/);
    const root = xml2js(xml);
    const output = removeTestIds(root);
    const outputXml = js2xml(output)
    expect(outputXml).not.toMatch(/_testid/);
    expect(output).toMatchSnapshot();
  });
});
