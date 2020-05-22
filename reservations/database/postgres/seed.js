const { Pool, Client } = require("pg");
const data = require("../data.json");
var each = require('async/each');

const pool = new Pool({
  user: "postgres",
  host: "localhost", // change to databse for deplying
  database: "ratemyrestaurant",
  password: "postgres",
  port: 5432
});

let query, values;
for (let restaurant of data) {
  query = `INSERT INTO
            restaurants(name, address, phone, website, costRating, review, opens, closes, reservationSlot)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id`;

  values = [
    restaurant.name,
    restaurant.address,
    restaurant.phone,
    restaurant.website,
    restaurant.costRating,
    restaurant.review,
    restaurant.opens,
    restaurant.closes,
    restaurant.reservationSlot
  ];

  pool
    .query(query, values)
    .then(results => {seedTables(results.rows[0].id, restaurant.tables)})
    .catch(e => console.error(e.stack));
}

function seedTables(restaurantID, tables) {
  let query, values;
  for (let table of tables) {
    query = `INSERT INTO tables(restaurant_id, capacity)
             VALUES($1, $2)
             RETURNING id`;
    values = [restaurantID, table.capacity];
    pool
      .query(query, values)
      .then(results => {seedAvailability(results.rows[0].id, table.dates)})
      .catch(e => console.error(e.stack));
  }
}

function seedAvailability(tableID, dates) {
  let query, values;
  for (let date of dates) {
    query = `INSERT INTO availability (table_id, date, times)
             VALUES($1, $2, $3)
             RETURNING id`;
    values = [tableID, date.date, date.times];
    pool
      .query(query, values)
      .then(results => {
        if (results.rows[0].id % 10000 === 0) {
          console.log(`Seeded ${results.rows[0].id} dates inserted so far at ${Date.now()}!`);
        }
      })
      .catch(e => console.error(e.stack));
  }
}
