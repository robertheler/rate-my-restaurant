const { Pool, Client } = require("pg");
const data = require("../data/data.json");
var each = require('async/each');
//const data1 = require("../data/data1.json");
// const data2 = require("../data/data2.json");
// const data3 = require("../data/data3.json");
// const data4 = require("../data/data4.json");
const fs = require('fs');
const v8 = require('v8');

// Loading and initializing the library:
const pgp = require('pg-promise')({
  // Initialization Options
});
const PS = require('pg-promise').PreparedStatement;

// Preparing the connection details:
const cn = 'postgres://postgres:postgres@localhost:5432/restaurants';

// Creating a new database instance from the connection details:
const db = pgp(cn);
const insertion = new PS({name: 'insertion', text: 'INSERT INTO availability (table_id, date, times) VALUES($1, $2, $3)'});

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

pool.query(`PREPARE insertion (BIGINT, DATE, CHAR(5) []) AS
    INSERT INTO availability (table_id, date, times) VALUES($1, $2, $3)`)
    .then(()=>{
      seedRestaurants();
    });

function seedRestaurants() {
  let query, values;
  let  i = 0;
  for (let restaurant of data) {
    // if (i < 1000) {
    //   i++;
    //   continue
    // }
    if (i === 100) break
    i++;
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
        .query(query, values)
        .then(results => {seedTables(results.rows[0].id, restaurant.tables)})
        .catch(e => console.error(e.stack)),
    500 * i }
    )
    //break
  }
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
      .then(results => {
        seedAvailability(results.rows[0].id, table.dates)
        if (results.rows[0].id % 10 === 0) {
          console.log(`Seeded ${results.rows[0].id} tables so far in ${(Date.now() - start)/60000} minutes!`);
        }
      })
      .catch(e => console.error(e.stack));
  }
}

function seedAvailability(tableID, dates) {
  // pool.query(`PREPARE insertion (BIGINT, DATE, CHAR(5) []) AS
  //   INSERT INTO availability (table_id, date, times) VALUES($1, $2, $3)`)
  //   .then(()=>{
      let query;
      for (let date of dates) {
        // query = `INSERT INTO availability (table_id, date, times)
        //          VALUES($1, $2, $3)`;
        query = `EXECUTE insertion(${tableID}, ${date.date}, '{${date.times}}')`;
        //console.log(query);
        // /insertion.values = [tableID, date.date, date.times];

        db.none(insertion, [tableID, date.date, date.times])
    .then(() => {
      if (date.id % 1000 === 0) {
              console.log(`Seeded ${date.id} dates so far in ${(Date.now() - start)/60000} minutes!`);
            }

    })
    .catch(error => {
        // error;
    });
        // pool
        //   .query(query)
        //   .then(results => {
        //     if (date.id % 1000 === 0) {
        //       console.log(`Seeded ${date.id} dates so far in ${(Date.now() - start)/60000} minutes!`);
        //     }
        //   })
        //   .catch(e => {console.error(e.stack)});
      }
    // })
    // .catch(e => {});
}
