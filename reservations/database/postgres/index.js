const {Pool, Client} = require("pg");
const seeder = require('./seeder.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // change to databse for deplying
  database: 'ratemyrestaurant',
  password: 'postgres',
  port: 5432
});

const get = (id, callback) => {
  pool.query(`SELECT * FROM restaurants WHERE "restaurant_id" = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res)
    }
  })
};

module.exports.get = get;



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

