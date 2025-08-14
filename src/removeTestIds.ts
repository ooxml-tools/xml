import { ElementCompact, Element } from "xml-js";
import { TEST_ATTR_NAME } from "./constants";

function removeTestIdsRecursive(
  root: Element | ElementCompact,
): Element {
    const attributes = root.attributes ? {...root.attributes} : undefined;
    if (attributes) {
        delete attributes[TEST_ATTR_NAME];
    }
  return {
    ...root,
    attributes,
    elements: root.elements?.map((element: Element | ElementCompact) => {
        return removeTestIdsRecursive(element);
    })
  }
}

export function removeTestIds(root: Element | ElementCompact) {
  return removeTestIdsRecursive(root);
}
