import { js2xml, type Element } from "xml-js";
import { asXmlElement } from "./asXmlElement";

export function xmlCompact(xml: string | Element) {
    const parsed = asXmlElement(xml);
    return js2xml(parsed, {
      compact: true,
    });
}