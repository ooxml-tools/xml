import type { Element } from "xml-js";
import { asXmlElement } from "./asXmlElement";

function _collapseFragments(orig: Element) {
  let node = orig;
  const cloneIfRequired = () => {
    if (node === orig) {
      return {
        ...node,
        elements: node.elements ? [...node.elements] : undefined,
      };
    }
    return node;
  };
  if (node.elements) {
    for (let i = node.elements.length - 1; i >= 0; i--) {
      if (node.elements) {
        const child = node.elements[i]!;
        const out = _collapseFragments(child);

        if (Array.isArray(out)) {
          node = cloneIfRequired();
          node.elements!.splice(i, 1, ...out);
        } else if (out !== child) {
          node = cloneIfRequired();
          if (node.elements) {
            node.elements[i] = out;
          }
        }
      }
    }
  }

  if (node.name === "XML_FRAGMENT") {
    return node.elements ?? [];
  }
  return node;
}

export function collapseFragments(root: string | Element) {
  const out = _collapseFragments(asXmlElement(root));
  return out;
}

