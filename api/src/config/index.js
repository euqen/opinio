const _ = require('lodash');
const developmentConfig = require('./env/development');
const testConfig = require('./env/test');
const stagingConfig = require('./env/staging');
const productionConfig = require('./env/production');
const envVariables = require('./env/variables');

const envConfigsMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
  staging: stagingConfig,
};

const envConfig = envConfigsMap[process.env.NODE_ENV || 'development'] || {};

// 1. set default value of all configuration parameters (`defaultConfig`)
// 2. override some values with specified env config (`envConfig`)
// 3. apply custom values (with top priority) (`envVariables`)
module.exports = _.defaultsDeep(
  {},
  envVariables,
  envConfig,
);
