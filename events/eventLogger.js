const EventEmitter = require('events');
class Logger extends EventEmitter {}
const logger = new Logger();

logger.on('log', (payload) => {
  const ts = new Date().toISOString();
  console.log(` ${payload.message}`);
});

module.exports = logger;
