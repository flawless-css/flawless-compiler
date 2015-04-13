
import chalk from 'chalk';
import pkg from '../package.json';


let isSuppressed = false

function prepend( str, level ) {
    var color = [
        null,
        chalk.red,
        chalk.yellow,
        chalk.grey
    ][ level || 3 ]
    process.stdout.write( chalk.white( '[' ) + color( str || pkg.shortname ) + chalk.white( '] ' ) )
}

exports = module.exports = function() {
    if ( isSuppressed ) {
        return
    }

    prepend()
    console.log.apply( console, arguments )
}

export let error = function() {
    if ( isSuppressed ) {
        return
    }

    prepend( null, 1 )
    console.log.apply( console, arguments )
}

export let suppress = function( flag ) {
    isSuppressed = flag
}
