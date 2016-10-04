# existential-default

![Last version](https://img.shields.io/github/tag/Kikobeats/existential-default.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/existential-default/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/existential-default)
[![Dependency status](http://img.shields.io/david/Kikobeats/existential-default.svg?style=flat-square)](https://david-dm.org/Kikobeats/existential-default)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/existential-default.svg?style=flat-square)](https://david-dm.org/Kikobeats/existential-default#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/existential-default.svg?style=flat-square)](https://www.npmjs.org/package/existential-default)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> Check for the existential value of a variable. Assign value by default.

This module have the same behavior than [existential-assign](https://github.com/Kikobeats/existential-assign) where the unique change is the order of the parameters to be more natural and not align with [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) interface.

## Install

```bash
npm install existential-default
```

If you want to use in the browser (powered by [Browserify](http://browserify.org/)):

```bash
bower install existential-default --save
```

and later link in your HTML:

```html
<script src="bower_components/existential-default/dist/existential-default.js"></script>
```

## Usage

```js
var existsDefault = require('existential-default');
var hello = null;
hello = existsDefault(hello, 'world');
console.log(hello);
// => 'world'
```

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
