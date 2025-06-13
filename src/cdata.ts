export function cdata(input: string | number) {
    return `<![CDATA[${input}]]>`;
}