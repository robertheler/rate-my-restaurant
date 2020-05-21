const { Pool, Client } = require("pg");
const moment = require("moment"); // require
moment().format();

const pool = new Pool({
  user: "postgres",
  host: "localhost", // change to databse for deplying
  database: "ratemyrestaurant",
  password: "postgres",
  port: 5432
});

//GET api/restaurants/:id
const getAllAvailability = (id, callback) => {
  pool.query(
    `SELECT name FROM restaurants WHERE id = ${id}`,
    (err, name) => {
      if (err) {
        callback(err);
      } else if (name.rows.length === 0) {
        callback(null, {});
      } else {
        pool.query(
          `SELECT * FROM availability INNER JOIN tables ON (availability.table_id = tables.id) WHERE tables.restaurant_id = ${id}`,
          (err, res) => {
            if (err) {
              callback(err);
            } else {
              let result = {
                id: id,
                name: name.rows[0].name,
                dates: {}
              };
              for (var i = 0; i < res.rows.length; i++) {
                let date = moment(res.rows[i].date).format("MM/DD/YYYY");
                if (!result.dates[date]) {
                  result.dates[date] = [
                    {
                      id: res.rows[i].table_id,
                      capacity: res.rows[i].capacity,
                      times: res.rows[i].times
                    }
                  ];
                } else {
                  result.dates[date].push({
                    id: res.rows[i].table_id,
                    capacity: res.rows[i].capacity,
                    times: res.rows[i].times
                  });
                }
              }
              callback(err, result);
            }
          }
        );
      }
    }
  );
};

//GET /api/restaurants/:id/:date/:size
const getSpecificAvailability = (id, date, size, callback) => {
  console.log(date);
  pool.query(
    `SELECT name FROM restaurants WHERE id = ${id}`,
    (err, name) => {
      if (err) {
        callback(err);
      } else if (name.rows.length === 0) {
        callback(null, {});
      } else {
        pool.query(
          `SELECT *
          FROM availability INNER JOIN tables
          ON (availability.table_id = tables.id)
          WHERE tables.restaurant_id = ${id}
          AND tables.capacity >= ${size}
          AND availability.date::date = '${date}'`,
          (err, res) => {
            if (err) {
              callback(err);
            } else {
              let result = {
                id: id,
                name: name.rows[0].name,
                date: date,
                tables: []
              };
              for (var i = 0; i < res.rows.length; i++) {
                  result.tables.push({
                    id: res.rows[i].table_id,
                    capacity: res.rows[i].capacity,
                    times: res.rows[i].times
                  });
              }
              callback(err, result);
            }
          }
        );
      }
    }
  );
};


//POST api/restaurants/:name
const postRestaurant = (restaurant, callback) => {
  console.log(restaurant);
  pool.query(`INSERT INTO restaurants VALUES(DEFAULT, '${restaurant.name}')`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports.getSpecificAvailability = getSpecificAvailability;
module.exports.getAllAvailability = getAllAvailability;
module.exports.postRestaurant = postRestaurant;
