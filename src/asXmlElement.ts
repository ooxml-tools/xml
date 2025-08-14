import { type Element, xml2js } from "xml-js";

export function asXmlElement(xml: string | Element): Element {
  if (typeof xml === "string") {
    return xml2js(xml, {
      compact: false,
      captureSpacesBetweenElements: false,
    }) as Element;
  } else {
    return xml;
  }
}
