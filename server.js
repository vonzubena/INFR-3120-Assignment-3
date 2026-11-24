/**
 * Starts the web server (moved from bin/www, same as in class)
 */

// Source: dotenv package (https://www.npmjs.com/package/dotenv)
require('dotenv').config();

let app = require('./config/app');
let debug = require('debug')('homelabinventory:server');
let http = require('http');

/**
 * Use the port Render gives us, or 3000 on our own computer.
 */
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create the HTTP server.
 */
let server = http.createServer(app);

/**
 * Start listening for visitors.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Turn the port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Handle server start-up errors with a clear message.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Let us know the server is running.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}