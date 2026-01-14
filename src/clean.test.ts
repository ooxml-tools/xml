import { describe, expect, test } from "vitest";
import { clean } from "./clean";
import { asXmlElement } from "./asXmlElement";
import { js2xml } from "xml-js";
import { format } from "./format";
import { safeXml } from "./safeXml";

describe("clean", () => {
  test("basic", () => {
    const expectedXml = format(safeXml`
      <w:document>
        <w:p>
          <w:r>
            <w:t>Test</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:r>
            <w:t>Test</w:t>
          </w:r>
        </w:p>
      </w:document>
    `);

    const output = clean(asXmlElement(`
      <w:document>
        <XML_FRAGMENT>
          <w:p>
            <w:r>
              <w:t _testid="TESTING">Test</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:r>
              <w:t>Test</w:t>
            </w:r>
          </w:p>
        </XML_FRAGMENT>
      </w:document>
    `));

    expect(format(js2xml(output))).toEqual(expectedXml);
  });

});
