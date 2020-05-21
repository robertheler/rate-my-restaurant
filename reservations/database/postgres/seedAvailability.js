const { Pool, Client } = require("pg");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const moment = require('moment'); // require
moment().format();

const lorem = new LoremIpsum();

const pool = new Pool({
  user: "postgres",
  host: "localhost", // change to databse for deplying
  database: "ratemyrestaurant",
  password: "postgres",
  port: 5432
});

// insert into Availability
for (var tableID = 1; tableID <= 94; tableID++) {
  // 7 dates for each restaurant
  for (var i = 0; i < 7; i++) {
    let date = getDate(i);
    let times = randomAvailableTimes();
    const query = "INSERT INTO availability (table_id, date, times) VALUES($1, $2, $3)";
    const values = [tableID, date, times];
    pool
      .query(query, values)
      .then(res => {
        // insert into availability
      })
      .catch(e => console.error(e.stack));
  }
}

function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format('MM/DD/YYYY');
}

function randomAvailableTimes() {
  let times = [];
  for (var i = 7; i < 24; i++){
    if(Math.random() >= 0.5) {
      if (i < 10) {
        times.push('0' + i + ':00')
      } else {
        times.push(i + ':00')
      }
    };
  }
  return times;
}
