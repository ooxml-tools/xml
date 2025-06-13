import { js2xml, xml2js } from "xml-js";

export function compact(xml: string) {
  const parsed = xml2js(xml, {
    compact: false,
    trim: true,
  });
  return js2xml(parsed);
}