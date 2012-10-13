stdjson
====

`stdjson` is a minimal `nodejs` module to log JSON to stdout and stderr.

## Installation

    npm install stdjson

## Usage

```javascript
var log = require( 'stdjson' );

// initialize, logLevel is the only option
log = log( { logLevel : "info" } ); // default "debug"

log.debug( "this will be ignored" );
// no output

log.info( "just message" );
// stdout:
// {"message":"just message","level":"info","timestamp":"2012-10-13T21:02:42.113Z"}

log.info( "message", "data" );
// stdout:
// {"message":"message","data":"data","level":"info","timestamp":"2012-10-13T20:32:08.625Z"}

log.info( "message", { my : "data object" } );
// stdout:
// {"message":"message","data":{"my":"data object"},"level":"info","timestamp":"2012-10-13T21:03:48.764Z"}

log.warn( { just : "data" } );
// stdout:
// {"data":{"just":"data"},"level":"warn","timestamp":"2012-10-13T21:01:01.817Z"}

log.error( new Error( "oh no" ) );
// stderr (includes stack trace):
// {"message":"Error: oh no","data":"Error: oh no\n    at repl:1:11\n    at REPLServer.self.eval (repl.js:111:21)\n    at rli.on.self.bufferedCmd (repl.js:260:20)\n    at REPLServer.self.eval (repl.js:118:5)\n    at Interface.<anonymous> (repl.js:250:12)\n    at Interface.EventEmitter.emit (events.js:93:17)\n    at Interface._onLine (readline.js:199:10)\n    at Interface._line (readline.js:517:8)\n    at Interface._ttyWrite (readline.js:735:14)\n    at ReadStream.onkeypress (readline.js:98:10)","level":"error","timestamp":"2012-10-13T20:58:18.275Z"}

// if you are really curious

log.info( "message", {} );
// stdout:
// {"message":"message","data":{},"level":"info","timestamp":"2012-10-13T21:04:20.688Z"}

log.info( "message", null );
// stdout:
// {"message":"message","data":null,"level":"info","timestamp":"2012-10-13T21:04:30.806Z"}

log.info( "message", undefined );
// stdout:
// {"message":"message","level":"info","timestamp":"2012-10-13T21:04:41.371Z"}

```