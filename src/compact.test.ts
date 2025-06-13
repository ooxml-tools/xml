import { describe, expect, test } from "vitest";
import { compact } from "./compact";

describe("xmlCompact", () => {
    test("already compacted", () => {
        const output = compact(`<name>test</name>`);
        expect(output).toEqual("<name>test</name>")
    });

    test("not compacted", () => {
        const output = compact(`
                <name>
                        test
            </name>
        `);
        expect(output).toEqual("<name>test</name>")
    });
})