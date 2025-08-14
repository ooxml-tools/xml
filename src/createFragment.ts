import { Element } from "xml-js";

export function createFragment(elements: Element[]): Element {
  return {
    type: "element",
    name: "XML_FRAGMENT",
    elements: elements,
  };
}
