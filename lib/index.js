/**
 * Flawless-compile
 * ---
 *
 */

import stream from 'stream';
import less from 'less';
import log from './log';


export default class Flawless extends stream.Writable {
    constructor() {
        super();

        this.input = ''

        this.on( 'finish', () => {
            this.compile( this.input )
        })
    }

    write( chunk ) {
        if ( chunk !== null ) {
            this.input += chunk
        }
    }

    compile( input ) {
        log( input )
    }
}
