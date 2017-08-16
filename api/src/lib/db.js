const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');
const shortid = require('shortid');
const { mongodb } = require('src/config');

mongoose.Promise = global.Promise;

function shortIdPlugin(schema) {
  schema.add({ _id: 'string' });
  schema.pre('save', function generateId(next) {
    if (!this._id) {
      this._id = shortid.generate();
    }

    next();
  });
}

function init() {
  const odm = mongoose.createConnection(mongodb.buildConnectionString());

  mongoose.plugin(shortIdPlugin);
  mongoose.plugin(mongooseTimestamp);

  Promise.promisifyAll(odm.db);

  return odm;
}

module.exports = init();
