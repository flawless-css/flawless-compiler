/**
 * Ho-compile
 * ---
 *
 * Less compiler
 */

import stream from 'stream';
import core from 'core-js/library/es6/object';
import less from 'less';
import log from './log';


/**
 * Compiler
 * @class
 * @extends stream.Transform
 */
export default class Compiler extends stream.Transform {
    /**
     * @constructs
     * @param opts <Object>
     *   @param paths <Array:String> less import paths
     *   @param compress <Boolean> should compress less output
     *   @param filename <String> initial file path
     *   @param sourceMap <Boolean> should include source map in output
     * @throws on stream error
     * @throws on less compile error
     */
    constructor( opts ) {
        super()

        this.opts = core.assign({
            paths: '',
            compress: false,
            filename: null,
            sourceMap: false
        }, opts )

        this.input = ''
    }

    /**
     * _transform
     * Collects input
     * @private
     */
    _transform( chunk, enc, next ) {
        if ( chunk !== null ) {
            this.input += chunk
        }
        next()
    }

    /**
     * _flush
     * Called when input has been collected
     */
    _flush( done ) {
        this.compile( this.input, ( err, res ) => {
            if ( err ) {
                this.emit( 'error', err )
            }
            this.push( res.css )
            done()
        })
    }

    /**
     * compile
     * Turns less into css
     * @param input <String> less to convert
     * @param cb <Function>
     *   @param err <Error> non-null on any less compilation errors
     *   @param output <String> converted less
     */
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
                cb( null, output )
            })
            .catch( err => {
                log.error( 'Error compiling less' )
                cb( err )
            })
    }
}
