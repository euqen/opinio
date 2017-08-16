const Koa = require('koa');
const morgan = require('koa-morgan');
const json = require('morgan-json');
const meta = require('package.json');
const config = require('src/config');
const logger = require('src/lib/logger');

const app = new Koa();

const format = json({
  status: ':status',
  url: ':url',
  method: ':method',
  length: ':res[content-length]',
  'response-time': ':response-time ms',
});

app.use(morgan(format, { stream: logger.stream }));

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(config.port, () => {
  const now = new Date()
    .toISOString()
    .substr(0, 19)
    .replace(/T/, ' at ');

  logger.info('*********************************************************');
  logger.info('OPINIO API SERVER');
  logger.info(`${meta.description}  v(${meta.version})\n`);
  logger.info(`Server is up, listening on port ${config.port}`);
  logger.info(`Started on ${now} UTC`);
  logger.info('*********************************************************');
});
