<h1>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://ooxml-tools.github.io/design/images/xml-dark.png">
        <source media="(prefers-color-scheme: light)" srcset="https://ooxml-tools.github.io/design/images/xml-light.png">
        <img alt="@ooxml-tools/xml" height="56" src="https://ooxml-tools.github.io/design/images/xml-light.png">
    </picture>
</h1>

Some XML helpers to help with OOXML development

> [!NOTE]
> These are all based around [`xml-js`](https://www.npmjs.com/package/xml-js) and output that modules internal format


## API

### `asXmlElement`
When working with `xml-js` it's really handy to not have to worry about when you're passing an XML string our the `xml-js` JSON type called `Element`

This helper function just outputs an `Element` for either input

```ts
asXmlElement("<name>foo</name>") // => {name: "name", text: "foo"}
asXmlElement({name: "name", text: "foo"}) // => {name: "name", text: "foo"}
```

> [!NOTE]
> All the other functions in this document that accept XML, also accept this `Element` (using this function) 

### `safeXml`
An XML tagged template literal with the following features

 - error if XML is incorrect
 - array support in substitution

The following will error in development, because of mismatched start/end tags 
 
```ts
safeXml`<foo>hello</bar>`
```

Substitution of arrays "just works" so you can map values in the tagged template literals  
 
```ts
const items = [1,2,3].map(n => safeXml`<name>item ${1}</name>`);
const outXml = safeXml`<test>${items}</test>`
assert.equal(outXml, `<test><name>item 1</name><name>item 2</name><name>item 3</name></test>`);
```

This also makes it easy to support <https://prettier.io/docs/en/options#embedded-language-formatting>

### `compact`
Removes non required whitespace from the XML

```ts
const outXml = compact(`
    <test>
        something
    </test>
`);
assert.equal(outXml, "<test>something</test>");
```

### `removeFragments`
For XML to be valid, there must be a single root node. When composing apps it's handy for that not to be true.

For example the following would error

```ts
const xml = safeXml`
    <name>foo</name>
    <name>bar</name>
`
```

So instead we'd like something like a HTML fragment

```ts
const xml = safeXml`
    <XML_FRAGMENT>
        <name>foo</name>
        <name>bar</name>
    </XML_FRAGMENT>
`
```

So we did just that, `removeFragments` walks over a tree removing `<XML_FRAGMENT>...</XML_FRAGMENT>` nodes.

```ts
const innerBit = safeXml`
    <XML_FRAGMENT>
        <name>foo</name>
        <name>bar</name>
    </XML_FRAGMENT>
`
const newXml = removeFragments(
    safeXml`
        <doc>
            ${innerBit}
        </doc>
    `
)
assert.equal(newXml, `
    <doc>
        <name>foo</name>
        <name>bar</name>
    </doc>
`)
```

### `cdata`
From [the wikipedia page](https://en.wikipedia.org/wiki/CDATA)

> CDATA section is a piece of element content that is marked up to be interpreted literally, as textual data, not as marked-up content.

But `<name><![CDATA[one < two]]><name>` is ugly and hard to read, so instead

```ts
safeXml`<name>${cdata("one < two")}</name>`
```

## CI

[![codecov](https://codecov.io/gh/ooxml-tools/xml/graph/badge.svg?token=N82AKMVJM7)](https://codecov.io/gh/ooxml-tools/xml)


## License

MIT
