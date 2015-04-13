/**
 * Flawless-compile
 * ---
 *
 */

import stream from 'stream';
import less from 'less';
import log from './log';


export default class Flawless extends stream.Transform {
    constructor() {
        super();

        this.input = ''

        this.on( 'error', err => {
            console.error( 'Something bad may or may not have happened...' )
        })
    }

    _transform( chunk, enc, next ) {
        if ( chunk !== null ) {
            this.input += chunk
        }
        next()
    }

    _flush( done ) {
        less.render( this.input )
            .then( output => {
                this.push( output.css )
                done()
            })
            .catch( err => {
                log.error( 'Error compiling less' )
                log.error( err )
            })
    }
}
