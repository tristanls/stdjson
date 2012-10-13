/*
 * index.js
 *
 * (C) 2012 Tristan Slominski
 */

var log = function log ( options ) {

  options = options || {};

  var logLevel = options.logLevel || "debug";

  var logLevels = {
    "debug" : 0,
    "info" : 1,
    "warn" : 2,
    "error" : 3
  };

  var _do = function _do ( stream, level, message, data ) {

    // don't log if wrong level
    if ( logLevels[ level ] < logLevels[ logLevel ] ) { 
      return; 
    }

    if ( typeof( message ) == 'string' ) {
      data = { message : message, data : data };
    } else if ( message instanceof Error ) {
      data = { message : message.toString(), data : message.stack };
    } else if ( typeof( message ) == 'object' && Object.keys( message ).length == 0 ) {
      data = { message : message.toString(), data : message.stack };
    } else {
      data = { data : message };
    }

    data.level = level;
    data.timestamp = data.timestamp || ( new Date() ).toISOString();

    stream.write( JSON.stringify( data ) + '\n' );

  }; // _do

  var debug = function debug ( message, data ) {
    _do( process.stdout, "debug", message, data );
  };

  var info = function info ( message, data ) {
    _do( process.stdout, "info", message, data );
  };

  var warn = function warn ( message, data ) {
    _do( process.stdout, "warn", message, data );
  };

  var error = function error ( message, data ) {
    _do( process.stderr, "error", message, data );
  };

  return {
    debug : debug,
    error : error,
    info : info,
    level : logLevel,
    log : info,
    warn : warn
  };

}; // log

module.exports = log;