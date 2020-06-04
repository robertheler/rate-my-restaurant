const Fakerator = require("fakerator");
const moment = require("moment");
moment().format();
const { Pool, Client } = require("pg");
const generate = new Fakerator();
const db = require("./index.js");
const pool = new Pool({
  user: "postgres",
  host: "localhost", // change to databse for deplying
  database: "ratemyrestaurant",
  password: "",
  port: 5432,
  prepared_statements: true,
  reconnect: true,
  prepare_threshold: 0,
  server_prepare_mode: "transaction"
});

let joinStatement = `PREPARE selection (int, int, date) AS
SELECT availability.id, availability.table_id, availability.date, availability.times
FROM availability INNER JOIN tables
ON (availability.table_id = tables.id)
WHERE tables.restaurant_id = $1
AND tables.capacity >= $2
AND availability.date::date = $3
`;
let totalExecutionTime = 0;
let totalPlanningTime = 0;
for (var i = 0; i < 1000; i++) {
  let id = generate.random.number(0, 9999);
  let date = getDate(generate.random.number(0, 100));
  let partySize = generate.random.number(1, 12);
  pool.query(
    `EXPLAIN ANALYZE
       SELECT availability.id, availability.table_id, availability.date, availability.times
      FROM availability
      WHERE date::date = '${date}'
      AND
      table_id IN (SELECT id
                    FROM tables
                    WHERE restaurant_id = ${id}
                    AND capacity >= ${partySize})`,
    // `EXPLAIN ANALYZE SELECT *
    //   FROM availability INNER JOIN tables
    //   ON (availability.table_id = tables.id)
    //   WHERE tables.restaurant_id = ${id}
    //   AND tables.capacity >= ${partySize}
    //   AND availability.date::date = '${date}'`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let executionTime = res.rows[res.rows.length - 1]["QUERY PLAN"];
        //console.log(executionTime);
        let start = executionTime.indexOf(":") + 2;
        let end = executionTime.indexOf(" ms");
        let time = executionTime.substring(start, end);
        totalExecutionTime += Number(time);

        let planningTime = res.rows[res.rows.length - 2]["QUERY PLAN"];
        //console.log(timeOutput);
        start = planningTime.indexOf(":") + 2;
        end = planningTime.indexOf(" ms");
        time = planningTime.substring(start, end);
        totalPlanningTime += Number(time);
      }
    }
  );
}
setTimeout(() => {
  console.log("Average Planning Time: ", totalPlanningTime / 1000);
}, 3000);

setTimeout(() => {
  console.log("Average Execution Time: ", totalExecutionTime / 1000);
}, 3000);

function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format("MM/DD/YYYY");
}
