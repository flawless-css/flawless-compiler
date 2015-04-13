var fs = require( 'fs' )
var path = require( 'path' )
var os = require( 'osenv' )
var test = require( 'tape' )
var Flawless = require( '../dist' )


var fixtureCompiled = 'body {\n  background: #ff0088;\n}\n'


test( 'The long way - pass in a whole file', function( t ) {
    t.plan( 1 )

    var flawless = new Flawless()
    var file = fs.readFileSync( path.join( __dirname, 'fixtures/basic.less' ), {
        encoding: 'utf8'
    })

    flawless.compile( file, function onCompile( err, res ) {
        t.equal( res.css, fixtureCompiled, 'should perform basic single file less compilation from passing in a file' )
    });
})


test( 'The good way - pipey streamy', function( t ) {
    t.plan( 1 )

    var flawless = new Flawless();
    var outPath = path.join( os.tmpdir(), 'flawless' + Math.random() )

    fs.createReadStream( path.join( __dirname, 'fixtures/basic.less' ) )
        .pipe( flawless )
        .pipe( fs.createWriteStream( outPath )
            .on( 'close', function() {
                t.equal( fs.readFileSync( outPath, { encoding: 'utf8' } ), fixtureCompiled, 'streaming performs basic single file less compilation' )
            }))
})
