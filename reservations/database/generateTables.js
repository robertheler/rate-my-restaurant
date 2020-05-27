const Fakerator = require("fakerator");
const generate = new Fakerator();
const moment = require("moment"); // require
moment().format();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let restaurants = 10000;
let totalTables = 0;
let tables = [];

for (let i = 1; i <= restaurants; i++) {
  let numberTables = generate.random.number(6, 16); // could increase
  for (let j = 0; j < numberTables; j++) {
    totalTables++;
    let capacity = generate.random.number(4, 14);
    tables.push({ restaurant_id: i, capacity });
  }
}

const csvWriterTables = createCsvWriter({
  path: "database/data/tables.csv",
  header: [
    { id: "restaurant_id", title: "restaurant_id" },
    { id: "capacity", title: "capacity" }
  ]
});

csvWriterTables
  .writeRecords(tables)
  .then(() => console.log("The Table CSV file was written successfully"));


console.log(`Generated ${totalTables} tables!`);
