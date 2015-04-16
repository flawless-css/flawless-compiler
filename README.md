# Ho-compiler

> Less compilation transform


## Getting Started

```shell
npm i -D ho-compiler
```

Compiler is a class so create a new instance and throw some less at it

```js
var Compiler = require( 'ho-compile' )
var fs = require( 'fs' )

var compiler = new Compiler()
var file = fs.readFileSync( 'styles.less' )

compiler.compile( file, function onCompile( err, output ) {
  fs.writeFileSync( 'styles.css', output.css )
})
```

But reading and writing files like that is a little cumbersome, do yourself a favour and just pipe stuff in and out

```js
var Compiler = require( 'ho-compile' )
var fs = require( 'fs' )

var compiler = new Compiler()

fs.createReadStream( 'styles.less' )
  .pipe( compiler )
  .pipe( fs.createWriteStream( 'styles.css' ) )
```

### Compile options

```js
new Compiler({
  paths: [
    './src/',
    './node_modules/'
  ],
  filename: 'styles.less',
  compress: true,
  sourceMap: true
})

fs.createReadStream( 'styles.less' ).pipe( compiler )
```

These are all standard less compile options, with the exception of `sourceMap` which is a `boolean` and will append the whole source map to the output.


## CLI

Specify a file as input or pipe into the compiler, either way you can redirect the output where you need it

```shell
ho-compile styles.less > styles.css
ho-compile < styles.less > styles.css
```

Most of the options are used to instantiate the Compiler constructor

```
ho-compile styles.less -p src/,node_modules/ -c --source-map > styles.css
```


## Contributing

Its written in ES6 so to hack on it you’ll need to transpile

```shell
clone
npm i
npm test
npm run build
```
