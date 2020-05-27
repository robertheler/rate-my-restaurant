/* eslint-disable no-console */
const mongoose = require('mongoose');
const schema = require('./schema');
const moment = require("moment"); // require
moment().format();

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
  console.log('Connected to Mongo Database!');
});

function getRestaurant (id, callback) {
  schema.Restaurants.find({id: id})
  //.explain('executionStats')
  .exec(callback);
};

function postRestaurant (restaurant, callback) {
  schema.Restaurants.create(restaurant, callback);
};

function deleteRestaurant (id, callback) {
  schema.Restaurants.deleteOne({id:id}, callback);
};


function patchRestaurant (id, changes, callback) {
  schema.Restaurants.updateOne({id:id},changes, callback);
};

function getSpecificAvailability (id, date, size, callback) {
  getRestaurant(id, (err, restaurant) => {
    if (err) {
      callback(err)
    }
    else if (restaurant.length === 0) {
      console.log([]);
      callback(null, [])
    } else {
      let tables = restaurant[0].tables;
      let output = {
        id: restaurant[0].id,
        name: restaurant[0].name,
        date: date,
        tables: []
      };
      // for each table, check available dates if capacity greater than input
      for (var i = 0; i < tables.length; i++) {
        if (tables[i].capacity >= size) {
          let times = [];
          let dateFound = false;
          // if input date in database, push its available times to output
          for (let j = 0; j < tables[i].dates.length; j++) {
            let currentDate = moment(tables[i].dates[j].date).format("MM-DD-YYYY");
            if (currentDate ===  date) {
              times = tables[i].dates[j].times;
              dateFound = true;
            }
          }
          if (dateFound) {
            let table = {
              id: tables[i].id,
              capacity: tables[i].capacity,
              times: times
            };
            output.tables.push(table)
          }
        } else {
          continue
        }
      }
      callback(null, output);
    }
  })
};


module.exports.getRestaurant = getRestaurant;
module.exports.postRestaurant = postRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.patchRestaurant = patchRestaurant;
module.exports.getSpecificAvailability = getSpecificAvailability ;
