# flawless-compiler

> Less compilation for flawless builds


## Getting Started

```shell
npm i -D flawless-compiler
```

Flawless is a class so create a new instance and throw some less at it

```js
var Flawless = require( 'flawless-compile' )
var fs = require( 'fs' )

var flawless = new Flawless()
var file = fs.readFileSync( 'styles.less' )

flawless.compile( file, function onCompile( err, output ) {
  fs.writeFileSync( 'styles.css', output.css )
})
```

But reading and writing files like that is a little cumbersome, do yourself a favour and just pipe stuff in and out

```js
var Flawless = require( 'flawless-compile' )
var fs = require( 'fs' )

var flawless = new Flawless()

fs.createReadStream( 'styles.less' )
  .pipe( flawless )
  .pipe( fs.createWriteStream( 'styles.css' ) )
```

### Compile options

```js
new Flawless({
  paths: [
    './src/',
    './node_modules/'
  ],
  filename: 'styles.less',
  compress: true,
  sourceMap: true
})

fs.createReadStream( 'styles.less' ).pipe( flawless )
```

These are all standard less compile options, with the exception of `sourceMap` which is a `boolean` and will append the whole source map to the output.


## CLI

Specify a file as input or pipe into flawless, either way you can redirect the output where you need it

```shell
flawless styles.less > styles.css
flawless < styles.less > styles.css
```

Most of the options are used to instantiate the flawless constructor

```
flawless styles.less -p src/,node_modules/ -c --source-map > styles.css
```


## Contributing

Its written in ES6 so to hack on it you’ll need to transpile

```shell
clone
npm i
npm test
npm run build
```
