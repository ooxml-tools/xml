export function cdata(input: string | number | null | undefined) {
  if (input === null || input === undefined) {
    return "";
  }
  return `<![CDATA[${input}]]>`;
}
