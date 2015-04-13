var fs = require( 'fs' )
var Flawless = require( '../dist' )

var inputPath = __dirname + '/fixture.less'

var file = fs.readFileSync( inputPath, {
    encoding: 'utf8'
})

var flawless = new Flawless({
    filename: 'fixture.less',
    sourcemap: true
});

flawless.compile( file, function( res ) {
    console.log( 'compiled' )
    console.log( res )
    // fs.writeFileSync( './test.css', res.css )
})
