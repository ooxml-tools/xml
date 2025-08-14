import { ElementCompact, Element } from "xml-js";
import { getAllByTestId } from "./getAllByTestId";
import { TEST_ATTR_NAME } from "./constants";

export function getByTestId(root: Element | ElementCompact, id: string) {
  const elements = getAllByTestId(root, id);
  if (elements.length > 1) {
    throw new Error(`Only expected 1 element with ${TEST_ATTR_NAME}='${id}'`);
  }
  return elements[0];
}
