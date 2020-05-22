const { Pool, Client } = require("pg");
const data = require("../data.json");

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
            restaurants(id, name, address, phone, website, costRating, review, opens, closes, reservationSlot)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

  values = [
    restaurant.id,
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
    .then(results => {seedTables(restaurant.id, restaurant.tables)})
    .catch(e => console.error(e.stack));
}

function seedTables(restaurantID, tables) {
  let query, values;
  for (let table of tables) {
    query = "INSERT INTO tables(id, restaurant_id, capacity) VALUES($1, $2, $3)";
    values = [table.id, restaurantID, table.capacity];
    pool
      .query(query, values)
      .then(results => {seedAvailability(table.id, table.dates)})
      .catch(e => console.error(e.stack));
  }
}

function seedAvailability(tableID, dates) {
  let query, values;
  for (let date of dates) {
    query =
      "INSERT INTO availability (id, table_id, date, times) VALUES($1, $2, $3, $4)";
    values = [date.id, tableID, date.date, date.times];
    pool
      .query(query, values)
      .then(results => {
        if (date.id % 10000 === 0) {
          console.log(`Seeded ${date.id} date availabilities so far!`);
        }
      })
      .catch(e => console.error(e.stack));
  }
}
