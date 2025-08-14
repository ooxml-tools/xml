import { describe, expect, test } from "vitest";
import { cdata } from "./";

describe("cdata", () => {
  test("string", () => {
    const output = cdata("testing");
    expect(output).toEqual("<![CDATA[testing]]>");
  });

  test("string with markup text", () => {
    const output = cdata("one < two");
    expect(output).toEqual("<![CDATA[one < two]]>");
  });
});
