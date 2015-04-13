/**
 * Flawless-compile
 * ---
 *
 */

import stream from 'stream';
import core from 'core-js/library/es6/object';
import less from 'less';
import log from './log';

export default class Flawless extends stream.Transform {
    constructor( opts ) {
        super();

        this.opts = core.assign({
            paths: '',
            compress: false,
            filename: null,
            sourceMap: false
        }, opts )

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
        this.compile( this.input, res => {
            this.push( res.css )
            done()
        })
    }

    compile( input, cb ) {
        less.render( input, {
            filename: this.opts.filename,
            paths: this.opts.paths,
            compress: this.opts.compress,
            sourceMap: {
                sourceMapFileInline: this.opts.sourceMap,
                outputSourceFiles: this.opts.sourceMap
            }
        })
            .then( output => {
                cb( output )
            })
            .catch( err => {
                log.error( 'Error compiling less' )
                log.error( err )
            })
    }
}
