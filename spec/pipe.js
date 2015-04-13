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

// flawless.compile( file, function onCompile( err, res ) {
//     console.log( 'compiled' )
//     console.log( err, res )
//     // fs.writeFileSync( './test.css', res.css )
// })

fs.createReadStream( inputPath )
    .pipe( flawless )
    .pipe( fs.createWriteStream( './test.css' ) )
