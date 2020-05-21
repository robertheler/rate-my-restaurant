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
  const query = "INSERT INTO restaurants(id, name) VALUES($1, $2)";
  const values = [restaurantID, lorem.generateWords(2)];
  pool
    .query(query, values)
    .then(res => {
      inserted++;
      if (inserted % 10000 === 0) {
        console.log(inserted);
      }
    })
    .catch(e => console.error(e.stack));
}