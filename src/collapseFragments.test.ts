import { describe, expect, test } from "vitest"
import { collapseFragments } from "./collapseFragments"

describe("collapseFragments", () => {
    test("without fragments", () => {
        const output = collapseFragments(`
            <doc>
                <XML_FRAGMENT>
                    <name>one</name>
                    <name>two</name>
                </XML_FRAGMENT>
            </doc>
        `);
        expect(output).toEqual({
            "elements": [
              {
                "type": "element",
                "name": "doc",
                "elements": [
                  {
                    "type": "element",
                    "name": "name",
                    "elements": [
                      {
                        "type": "text",
                        "text": "one"
                      }
                    ]
                  },
                  {
                    "type": "element",
                    "name": "name",
                    "elements": [
                      {
                        "type": "text",
                        "text": "two"
                      }
                    ]
                  }
                ]
              }
            ]
          })
    })

    test("with fragments", () => {
        const output = collapseFragments(`
            <doc>
                <name>one</name>
                <name>two</name>
            </doc>
        `)
        expect(output).toEqual({
            "elements": [
              {
                "type": "element",
                "name": "doc",
                "elements": [
                  {
                    "type": "element",
                    "name": "name",
                    "elements": [
                      {
                        "type": "text",
                        "text": "one"
                      }
                    ]
                  },
                  {
                    "type": "element",
                    "name": "name",
                    "elements": [
                      {
                        "type": "text",
                        "text": "two"
                      }
                    ]
                  }
                ]
              }
            ]
          })
    })
})