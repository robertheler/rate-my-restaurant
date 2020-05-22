/* eslint-disable no-console */
const mongoose = require('mongoose');
const seeder = require('./seeder.js');
const schema = require('./schema');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
//mongoose.connect('mongodb://172.17.0.2:27017/reservations', options);
mongoose.connect('mongodb://localhost/restaurants', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database!');
  seeder.seed();
});

const get = (id, callback) => {
  schema.Restaurants.findOne({ id }, (err, schedule) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, schedule);
    }
  });
};

module.exports.get = get;
