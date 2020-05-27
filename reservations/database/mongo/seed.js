const data = require("./data.json");
const mongoose = require('mongoose');
const Restaurants = require('./index.js');

let i = 0;
for (let restaurant of data) {
  i++
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
    }, 100 * i
  )
}
