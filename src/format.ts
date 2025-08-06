import { js2xml, xml2js } from "xml-js";

export type FormatOptions = {
    spaces?: number;
}
export function format(input: string, {spaces=2}: FormatOptions = {}) {
  const elementJson = xml2js(input, {
    compact: false,
    captureSpacesBetweenElements: false,
  });
  return js2xml(elementJson, {
    spaces: spaces,
    compact: false,
    indentText: true,
    fullTagEmptyElement: true,
    indentAttributes: true,
  });
}