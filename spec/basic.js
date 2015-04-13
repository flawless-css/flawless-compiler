var stream = require( 'stream' )
var test = require( 'tape' )
var Flawless = require( '../dist' )
var log = require( '../dist/log' )
log.suppress( true )


test( 'basic stuff', function( t ) {
    t.plan( 4 )

    var flawless = new Flawless()

    t.ok( flawless instanceof Flawless, 'the constructor doesnt do anything funky, it just constructs' )
    t.ok( flawless instanceof stream.Transform, 'I am Optimus' )

    t.equal( flawless.input, '', 'input starts as an empty string' )
    t.equal( typeof flawless.compile, 'function', 'flawless implements a compile function' )
})


test( 'basic string compilation', function( t ) {
    t.plan( 6 )

    var flawless = new Flawless()
    flawless.compile( 'body {color:red}', function( err, res ) {
        t.equal( err, null, 'no error should be returned' )

        t.equal( typeof res.css, 'string', 'compile returns the compiled string' )
        t.equal( res.css, 'body {\n  color: red;\n}\n', 'compile returns the string' )

        t.equal( typeof res.map, 'string', 'compile also throws back the source mapping info' )
        t.doesNotThrow( function() {
            JSON.parse( res.map )
        }, 'parsing the source map string should not throw' )
    })

    flawless.compile( 'body{ color:@doesNotExist }', function( err, res ) {
        t.ok( /@doesNotExist/.test( err.message ), 'compile throws with a invalid less to transform' )
    })
})
