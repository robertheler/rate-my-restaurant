/* eslint-disable no-console */
const mongoose = require('mongoose');
const seeder = require('./seeder.js');
const schema = require('./schema');

//mongoose.connect('mongodb://172.17.0.2:27017/reservations', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database!');
  seeder.seed();
});

const get = (id, callback) => {
  schema.ReservationSchedule.findOne({ id }, (err, schedule) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, schedule);
    }
  });
};

module.exports.get = get;
