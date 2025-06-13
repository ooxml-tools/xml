import { xml2js } from "xml-js";

/**
 * @param templateStrings template strings
 * @param templateValues tamplate values
 * @returns xml string
 */
export function safeXml(
    templateStrings: TemplateStringsArray,
    ...templateValues: (string | number | (string | number)[])[]
) {
    let xml = "";
    for (let i = 0; i < templateStrings.length; i++) {
      if (templateValues[i] !== undefined) {
        const value = templateValues[i];
        const xmlPart = Array.isArray(value) ? value.join("") : value;
        xml += `${templateStrings[i]!}${xmlPart}`;
      } else {
        xml += `${templateStrings[i]!}`;
      }
    }
  
    if (process.env.NODE_ENV === "development") {
      // This will "throw" if the XML is invalid
      xml2js(xml, {
        compact: false,
        captureSpacesBetweenElements: false,
      });
    }
  
    return xml;
}