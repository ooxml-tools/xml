import { ElementCompact, Element } from "xml-js";
import { collapseFragments } from "./collapseFragments";
import { removeTestIds } from "./removeTestIds";

// Remove all "special" content from the XML 
export function clean(element: Element | ElementCompact) {
  return collapseFragments(removeTestIds(element));
}
