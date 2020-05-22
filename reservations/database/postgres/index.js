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
const getRestaurant = (id, callback) => {
  pool.query(`SELECT * FROM restaurants WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

//POST api/restaurants
const postRestaurant = (restaurant, callback) => {
  query = `INSERT INTO
            restaurants(name, address, phone, website, costrating, review, opens, closes, reservationslot)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  values = [
    restaurant.name,
    restaurant.address,
    restaurant.phone,
    restaurant.website,
    restaurant.costrating,
    restaurant.review,
    restaurant.opens,
    restaurant.closes,
    restaurant.reservationslot
  ];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//GET api/tables/:id
const getTable = (id, callback) => {
  pool.query(`SELECT * FROM tables WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

//POST api/tables
const postTable = (table, callback) => {
  query = `INSERT INTO tables(restaurant_id, capacity) VALUES($1, $2)`;

  values = [table.restaurant_id, table.capacity];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//DELETE api/table/:id
const deleteTable = (id, callback) => {
  pool.query(`DELETE FROM availability WHERE table_id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      pool.query(`DELETE FROM tables WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

//GET api/availability/:id
const getAvailability = (id, callback) => {
  pool.query(`SELECT * FROM availability WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

//POST api/availability
const postAvailability = (availability, callback) => {
  query = `INSERT INTO availability(table_id, date, times) VALUES($1, $2, $3)`;

  values = [availability.table_id, availability.date, availability.times];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//DELETE api/availability/:id
const deleteAvailability = (id, callback) => {
  pool.query(`DELETE FROM availability WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res);
    }
  });
};




//GET api/restaurants/:id
const getAllAvailability = (id, callback) => {
  pool.query(`SELECT name FROM restaurants WHERE id = ${id}`, (err, name) => {
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
  });
};

//GET /api/restaurants/:id/:date/:size
const getSpecificAvailability = (id, date, size, callback) => {
  console.log(date);
  pool.query(`SELECT name FROM restaurants WHERE id = ${id}`, (err, name) => {
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
  });
};


module.exports.getRestaurant = getRestaurant;
module.exports.postRestaurant = postRestaurant;


module.exports.getTable = getTable;
module.exports.postTable = postTable;
module.exports.deleteTable = deleteTable;

module.exports.getAvailability = getAvailability;
module.exports.postAvailability = postAvailability;
module.exports.deleteAvailability = deleteAvailability

module.exports.getSpecificAvailability = getSpecificAvailability;
module.exports.getAllAvailability = getAllAvailability;
