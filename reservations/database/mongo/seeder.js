const mongoose = require('mongoose');
const schema = require('./schema.js');

const db = mongoose.connection;

const seed = () => {
  const seeder = {};
  seeder.firstRestaurant = new schema.Restaurants({
    id: 2,
    name: "Berty",
    address: "2175 Market",
    phone: "8048400297",
    website: "",
    googleMaps: "String",
    costRating: 4,
    review: 3.7,
    tables: [
      {
        id: 2,
        capacity: 10,
        dates: [
          {
            date: '05-21-2020',
            times: ["11:00", "12:00"]
          },
          {
            date: '05-22-2020',
            times: ["11:00", "12:00", "13:00", "14:00"]
          },
          {
            date: '05-23-2020',
            times: ["11:00", "12:00", "21:00"]
          }
        ]
      }
    ]
  });

  for (const key in seeder) {
    seeder[key].save((err, value) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully saved ${key.toString()} to database`);
      }
    });
  }
};

module.exports.seed = seed;
