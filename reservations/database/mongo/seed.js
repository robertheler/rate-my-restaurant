const data = require("./data.json");
var each = require('async/each');
// const data1 = require("../data/data1.json");
// const data2 = require("../data/data1.json");
// const data3 = require("../data/data1.json");
// const data4 = require("../data/data1.json");
const mongoose = require('mongoose');
// /const schema = require('./schema.js');
const Restaurants = require('./index.js');


const db = mongoose.connection;

let query, values;
let i = 0;
console.log(data.length);
for (let restaurant of data) {
  console.log(i);i++
  setTimeout(
    () => {
      Restaurants.insertOne(restaurant, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${restaurant.id} inserted into the collection`);
        }
      })
    }, 300 * i
  )
}
