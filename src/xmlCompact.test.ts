import { describe, expect, test } from "vitest";
import { xmlCompact } from "./xmlCompact";

describe("xmlCompact", () => {
    test("already compacted", () => {
        const output = xmlCompact(`<name>test</name>`);
        expect(output).toEqual("<name>test</name>")
    });

    test("not compacted", () => {
        const output = xmlCompact(`
                <name>
                        test
            </name>
        `);
        expect(output).toEqual("<name>test</name>")
    });
})