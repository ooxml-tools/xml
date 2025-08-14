import { describe, expect, test } from "vitest";
import { format } from "./";

describe("format", () => {
  test("default", () => {
    const xml = format(`
      <test>
        <one>   foobar </one>
      </test>
    `);
    expect(xml).toEqual(`<test>
  <one>
       foobar 
  </one>
</test>`);
  });

  test("with spaces", () => {
    const xml = format(
      `
      <test>
        <one>   foobar </one>
      </test>
    `,
      { spaces: 4 },
    );
    expect(xml).toEqual(`<test>
    <one>
           foobar 
    </one>
</test>`);
  });
});
