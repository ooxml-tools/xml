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
        expect(output).toEqual("<doc><name>one</name><name>two</name></doc>")
    })

    test("with fragments", () => {
        const output = collapseFragments(`
            <doc>
                <name>one</name>
                <name>two</name>
            </doc>
        `)
        expect(output).toEqual("<doc><name>one</name><name>two</name></doc>")
    })
})