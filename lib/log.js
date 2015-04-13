
import chalk from 'chalk';
import pkg from '../package.json';


let isSuppressed = false

exports = module.exports = function() {
    if ( isSuppressed ) {
        return
    }

    process.stdout.write( chalk.grey( '  [' + pkg.shortname + '] ' ) )
    console.log.apply( console, arguments )
}

export let suppress = function( flag ) {
    isSuppressed = flag
}
