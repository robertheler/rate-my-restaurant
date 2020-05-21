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
    `SELECT name FROM restaurants WHERE restaurant_id = ${id}`,
    (err, name) => {
      if (err) {
        callback(err);
      } else if (name.rows.length === 0) {
        callback(null, {});
      } else {
        pool.query(
          `SELECT * FROM availability INNER JOIN tables ON (availability.table_id = tables.table_id) WHERE tables.restaurant_id = ${id}`,
          (err, res) => {
            if (err) {
              callback(err);
            } else {
              let result = {
                restaurant_id: id,
                restaurant_name: name.rows[0].name,
                dates: {}
              };
              for (var i = 0; i < res.rows.length; i++) {
                let date = moment(res.rows[i].date).format("MM/DD/YYYY");
                if (!result.dates[date]) {
                  result.dates[date] = [
                    {
                      table_id: res.rows[i].table_id,
                      table_capacity: res.rows[i].table_capacity,
                      available_times: res.rows[i].available_times
                    }
                  ];
                } else {
                  result.dates[date].push({
                    table_id: res.rows[i].table_id,
                    table_capacity: res.rows[i].table_capacity,
                    available_times: res.rows[i].available_times
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

//GET api/restaurants/:id
const getSpecificAvailability = (id, date, size, callback) => {
  console.log(date);
  pool.query(
    `SELECT name FROM restaurants WHERE restaurant_id = ${id}`,
    (err, name) => {
      if (err) {
        callback(err);
      } else if (name.rows.length === 0) {
        callback(null, {});
      } else {
        pool.query(
          `SELECT *
          FROM availability INNER JOIN tables
          ON (availability.table_id = tables.table_id)
          WHERE tables.restaurant_id = ${id}
          AND tables.table_capacity >= ${size}
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
                    capacity: res.rows[i].table_capacity,
                    times: res.rows[i].available_times
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
// pool.query(`SELECT * FROM availability INNER JOIN tables ON (availability.table_id = tables.table_id) WHERE tables.restaurant_id = ${id}`, (err, res) => {
//   if (err) {
//     callback(err);
//   } else {
//     console.log(res.rows);
//     pool.query(`SELECT name FROM restaurants WHERE restaurant_id = ${id}`, (err, name) => {
//       if (err) {
//         callback(err);
//       } else if (name.rows.length === 0){
//         callback(null, {});
//       } else {
//         output = {
//           restaurant_id: id,

//         }
//         callback(err, res.rows);
//       }
//     })
//   }
// })

//POST api/restaurants/:name
const post = (name, callback) => {
  pool.query(`INSERT INTO restaurants(name) VALUES('${name}')`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports.getSpecificAvailability = getSpecificAvailability;
module.exports.getAllAvailability = getAllAvailability;
module.exports.post = post;

// //routes
// app.post("/api/property/", async (req, res) => {
//   try {
//     pool.query(`INSERT INTO property VALUES (${req.body.property_id}, '${req.body.description}')`);
//     req.body.images.map(image => {
//       pool.query(`INSERT INTO imagearray VALUES (DEFAULT, ${req.body.property_id}, '${image.url}', '${image.description}')`);
//     });
//     res.send("Inserted");
//   } catch (err) {
//     console.error(err.message);
//   }
// });
