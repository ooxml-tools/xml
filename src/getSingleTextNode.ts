import { ElementCompact, Element } from "xml-js";

export function getSingleTextNode(
  element: Element | ElementCompact | undefined,
): Element {
  if (element) {
    const elements = element.elements;
    if (elements && elements.length === 1 && elements[0].type === "text") {
      return elements[0];
    }
  }
  throw new Error("Not a single text node");
}
