import { describe, expect, test } from "vitest";
import { asXmlElement } from "./asXmlElement";

const outputElement = {
    "elements": [
      {
        "type": "element",
        "name": "name",
        "elements": [
          {
            "type": "text",
            "text": "testing"
          }
        ]
      }
    ]
  }

describe("asXmlElement", () => {
    test("string", () => {
        const output = asXmlElement("<name>testing</name>");
        expect(output).toEqual(outputElement);
    });

    test("Element", () => {
        const output = asXmlElement(outputElement);
        expect(output).toEqual(outputElement);
    })
})