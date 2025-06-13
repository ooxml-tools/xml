import { describe, expect, test } from "vitest";
import { asXmlElement } from "./asXmlElement";

const outputElement = {
    "elements": [
        {
            "elements": [
                {
                    "text": "testing",
                    "type": "text",
                },
            ],
            "name": "name",
            "type": "element",
        },
    ],
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