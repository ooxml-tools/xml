import { ElementCompact, Element } from "xml-js";
import { TEST_ATTR_NAME } from "./constants";

function getAllByTestIdRecursive(
  root: Element | ElementCompact,
  id: string,
  collection: (Element | ElementCompact)[],
) {
  const testAttrValue = root.attributes?.[TEST_ATTR_NAME];
  if (testAttrValue === id) {
    collection.push(root);
  }
  console.log(">>", root);
  if (root.elements) {
    for (const element of root.elements) {
      getAllByTestIdRecursive(element, id, collection);
    }
  }
  return collection;
}

export function getAllByTestId(root: Element | ElementCompact, id: string) {
  return getAllByTestIdRecursive(root, id, []);
}
