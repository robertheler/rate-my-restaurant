const { Pool, Client } = require("pg");
const data = require("../data/data.json");
var each = require("async/each");
//const data1 = require("../data/data1.json");
const data2 = require("../data/data2.json");
// const data3 = require("../data/data3.json");
// const data4 = require("../data/data4.json");

// Loading and initializing the library:
const pgp = require("pg-promise")({});
const PS = require("pg-promise").PreparedStatement;
const db = pgp("postgres://postgres:postgres@localhost:5432/restaurants");

const insertion = new PS({
  name: "insertion",
  text: "INSERT INTO availability (table_id, date, times) VALUES($1, $2, $3)"
});

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/restaurants",
  user: "postgres",
  host: "localhost", // change to databse for deploying
  database: "restaurants",
  password: "postgres",
  port: 5432,
  preparedStatements: true,
  reconnect: true,
  preparedThreshold: 0,
  serverPrepareMode: "transaction"
});

let start = Date.now();
let alreadyAdded = 4000;


seedRestaurants();
function seedRestaurants() {
  let query, values;
  for (let i = 0; i < data2.length; i++) {
    let restaurant = data2[alreadyAdded + i];
    if (i === 1000) break;
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

    setTimeout(() => {
      pool
        .query(query, [
          restaurant.name,
          restaurant.address,
          restaurant.phone,
          restaurant.website,
          restaurant.costRating,
          restaurant.review,
          restaurant.opens,
          restaurant.closes,
          restaurant.reservationSlot
        ])
        .then(results => {
          seedTables(results.rows[0].id, restaurant.tables);
        })
        .catch(e => console.error(e.stack));
    }, 500 * i);
    //break
  }
}

function seedTables(restaurantID, tables) {
  let i = 0;
  let query, values;
  for (let table of tables) {
    i++;
    query = `INSERT INTO tables(restaurant_id, capacity)
             VALUES($1, $2)
             RETURNING id`;
    values = [restaurantID, table.capacity];
    pool
      .query(query, values)
      .then(results => {
        seedAvailability(results.rows[0].id, table.dates);
        if (results.rows[0].id % 10 === 0) {
          console.log(
            `Seeded ${results.rows[0].id} tables so far in ${(Date.now() -
              start) /
              60000} minutes!`
          );
        }
      })
      .catch(e => console.error(e.stack));
  }
}

function seedAvailability(tableID, dates) {
  for (let date of dates) {
    db.none(insertion, [tableID, date.date, date.times])
      .then(() => {
        if (date.id % 1000 === 0) {
          console.log(
            `Seeded ${date.id} dates so far in ${(Date.now() - start) /
              60000} minutes!`
          );
        }
      })
      .catch(error => {
        // error;
      });
  }
}
