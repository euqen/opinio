

const moment = require('moment');
const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true,
    }),
  ],
});

logger.stream = {
  write(message) {
    const data = JSON.parse(message);
    const time = moment().format('DD-MM-YYYY HH:mm:ss');

    logger.log('info', `[${time}] HTTP request`, data);
  },
};


module.exports = logger;
