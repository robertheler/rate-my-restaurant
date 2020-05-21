const { Pool, Client } = require("pg");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum();

const pool = new Pool({
  user: "postgres",
  host: "localhost", // change to databse for deplying
  database: "ratemyrestaurant",
  password: "postgres",
  port: 5432
});

// insert into restaurants
let inserted = 0;
let tableID = 0;
for (var restaurantID = 1; restaurantID <= 10; restaurantID++) {
  // insert into tables, between 4 and 10 tables per restaurant
  let numberOfTables = 4 + Math.floor(Math.random() * 10);
  for (var table = 0; table < numberOfTables; table++) {
    tableID++;
    const query = "INSERT INTO tables(table_id, restaurant_id, table_capacity) VALUES($1, $2, $3)";
    const values = [tableID, restaurantID, 1 + Math.floor(Math.random() * 10)];
    pool
      .query(query, values)
      .then(res => {
        // insert into availability
      })
      .catch(e => console.error(e.stack));
  }
}
