import { expect, test } from "vitest";
import { createFragment } from "./";

test("createFragment", () => {
  const output = createFragment([
    {
      type: "element",
      name: "name",
      elements: [
        {
          type: "text",
          text: "one",
        },
      ],
    },
    {
      type: "element",
      name: "name",
      elements: [
        {
          type: "text",
          text: "two",
        },
      ],
    },
  ]);
  expect(output).toEqual({
    elements: [
      {
        elements: [
          {
            text: "one",
            type: "text",
          },
        ],
        name: "name",
        type: "element",
      },
      {
        elements: [
          {
            text: "two",
            type: "text",
          },
        ],
        name: "name",
        type: "element",
      },
    ],
    name: "XML_FRAGMENT",
    type: "element",
  });
});
