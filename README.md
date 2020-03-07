[![Version](https://img.shields.io/npm/v/form-mutator)](https://bit.ly/2VTdnqu)
[![Downloads](https://img.shields.io/npm/dt/form-mutator)](https://bit.ly/2VTdnqu)
[![Dependency Status](https://img.shields.io/david/rickypc/form-mutator)](https://bit.ly/3cFYeys)
[![Dev Dependency Status](https://img.shields.io/david/dev/rickypc/form-mutator)](https://bit.ly/333PdLl)
[![Code Style](https://img.shields.io/badge/code%20style-Airbnb-red)](https://bit.ly/2JYN1gk)
[![Build](https://img.shields.io/travis/rickypc/form-mutator)](https://bit.ly/3cG11rq)
[![Coverage](https://img.shields.io/codecov/c/github/rickypc/form-mutator)](https://bit.ly/39wHtUG)
[![Vulnerability](https://img.shields.io/snyk/vulnerabilities/github/rickypc/form-mutator)](https://bit.ly/2PWiKRP)
[![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=rickypc/form-mutator)](https://bit.ly/2KIM5vs)
[![License](https://img.shields.io/npm/l/form-mutator)](https://mzl.la/2vLmCye)

Form Mutator
============

A utility to fill out web form and mutate field data programmatically.

Browser Download
-
You can download [compressed copy](form-mutator.min.js) for browser usage.

Node.js Installation
-

```bash
$ npm install --save form-mutator
```

API Reference
-
Provide utility to fill out web form and mutate field data programmatically.

**Example** *(Browser usage)*  
```js
<script type="text/javascript" src="form-mutator.min.js"></script>
<script>
  formMutator.fillOut({
    '[name="fullName"]': 'Your Name',
    '[name="address"]': '1 Awesome Way',
    '[name="city"]': 'Lalaland',
    '[type="submit"]': true,
  });
</script>
```
**Example** *(Node.js usage)*  
```js
const formMutator = require('form-mutator');

formMutator.fillOut({
  '[name="fullName"]': 'Your Name',
  '[name="address"]': '1 Awesome Way',
  '[name="city"]': 'Lalaland',
  '[type="submit"]': true,
});
```

* [form-mutator](#module_form-mutator)
    * [.click](#module_form-mutator.click) ⇒ <code>boolean</code>
    * [.deselectByText](#module_form-mutator.deselectByText) ⇒ <code>boolean</code>
    * [.fillOut](#module_form-mutator.fillOut) ⇒ <code>boolean</code>
    * [.selectByText](#module_form-mutator.selectByText) ⇒ <code>boolean</code>
    * [.setValue](#module_form-mutator.setValue) ⇒ <code>boolean</code>
    * [.toggleCheckbox](#module_form-mutator.toggleCheckbox) ⇒ <code>boolean</code>
    * [.typeValue](#module_form-mutator.typeValue) ⇒ <code>boolean</code>

<a name="module_form-mutator.click"></a>

### form-mutator.click ⇒ <code>boolean</code>
Click on given element.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if click triggered, otherwise falsy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to click. |

**Example**  
```js
const el = document.querySelector('a[href="/"]');
const response = formMutator.click(el);
```
<a name="module_form-mutator.deselectByText"></a>

### form-mutator.deselectByText ⇒ <code>boolean</code>
Deselect given values from dropdown list.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if deselect triggered, otherwise falsy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to deselect from. |
| values | <code>Array.&lt;string&gt;</code> | The values to deselect. |

**Example**  
```js
const el = document.querySelector('[name="month"]');
const response = formMutator.deselectByText(el, ['January']);
```
<a name="module_form-mutator.fillOut"></a>

### form-mutator.fillOut ⇒ <code>boolean</code>
Fill out all form field matched given selector => value key-pair. It will
skip unknown field type and missing field.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if the values are set, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The selector => value data map. |
| data.selector | <code>string</code> | The selector to find desired element. |
| data.value | <code>mixed</code> | The value to be set. |

**Example**  
```js
const response = formMutator.fillOut({
  '[name="fullName"]': 'Your Name',
  '[name="address"]': '1 Awesome Way',
  '[name="city"]': 'Lalaland',
  '[type="submit"]': true,
});
```
<a name="module_form-mutator.selectByText"></a>

### form-mutator.selectByText ⇒ <code>boolean</code>
Select given values from dropdown list.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if select triggered, otherwise falsy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to select from. |
| values | <code>Array.&lt;string&gt;</code> | The values to select. |

**Example**  
```js
const el = document.querySelector('[name="month"]');
const response = formMutator.selectByText(el, ['January']);
```
<a name="module_form-mutator.setValue"></a>

### form-mutator.setValue ⇒ <code>boolean</code>
Set given value to input field that match given selector.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if the value is set, or the field is unknown type
or the field can not be found, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector to find desired element. |
| value | <code>mixed</code> | The value to be set. |

**Example**  
```js
const response = formMutator.setValue('[type="text"]', 'value');
```
<a name="module_form-mutator.toggleCheckbox"></a>

### form-mutator.toggleCheckbox ⇒ <code>boolean</code>
Toggle the checkbox or radio button field.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if toggle triggered, otherwise falsy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to toggle from. |
| value | <code>boolean</code> | Check if true, otherwise uncheck. |

**Example**  
```js
const el = document.querySelector('[type="checkbox"]');
const response1 = formMutator.toggleCheckbox(el, true);  // checked
const response2 = formMutator.toggleCheckbox(el, false); // unchecked
```
<a name="module_form-mutator.typeValue"></a>

### form-mutator.typeValue ⇒ <code>boolean</code>
Type given value to password or text field.

**Kind**: static property of [<code>form-mutator</code>](#module_form-mutator)  
**Returns**: <code>boolean</code> - Truthy if type in triggered, otherwise falsy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to type on. |
| value | <code>mixed</code> | The value to be typed in. |

**Example**  
```js
const el = document.querySelector('[type="text"]');
const response = formMutator.typeValue(el, 'value');
```

Development Dependencies
-
You will need to install [Node.js](https://bit.ly/2SMCGXK) as a local
development dependency. The `npm` package manager comes bundled with all
recent releases of `Node.js`.

`npm install` will attempt to resolve any `npm` module dependencies that have
been declared in the project’s `package.json` file, installing them into the
`node_modules` folder.

```bash
$ npm install
```

Run Linter
-
To make sure we followed code style best practice, run:

```bash
$ npm run lint
```

Run Unit Tests
-
To make sure we did not break anything, let's run:

```bash
$ npm test
```

Contributing
-
If you would like to contribute code to Form Mutator repository you can do so
through GitHub by forking the repository and sending a pull request.

If you do not agree to [Contribution Agreement](CONTRIBUTING.md), do not
contribute any code to Form Mutator repository.

When submitting code, please make every effort to follow existing conventions
and style in order to keep the code as readable as possible. Please also include
appropriate test cases.

That's it! Thank you for your contribution!


License
-
Copyright (c) 2018 - 2020 Richard Huang.

This utility is free software, licensed under: [Mozilla Public License (MPL-2.0)](https://bit.ly/2yi7gyO).

Documentation and other similar content are provided under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://bit.ly/2SMCRlS).
