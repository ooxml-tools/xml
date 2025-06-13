import { xml2js, type Element } from "xml-js";

export function asXmlElement (xml: string | Element): Element {
    if (typeof xml === "string") {
        return xml2js(xml, {
            compact: false,
            captureSpacesBetweenElements: false,
        }) as Element;
    } else{
        return xml;
    }
}