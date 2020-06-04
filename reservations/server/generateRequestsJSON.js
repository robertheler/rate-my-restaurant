const Fakerator = require("fakerator");
const moment = require("moment");
moment().format();
const generate = new Fakerator();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require('fs');

let data = {
  keys: ["restaurant, date, size"],
  values: []
}

for (let i = 0; i <= 100; i++) {
  let id = String(generate.random.number(0, 9999));
  let date = getDate(generate.random.number(0, 100));
  let size = String(generate.random.number(1, 12));

  data.values.push([id, date, size])
}

 // write JSON of clean data
 fs.writeFile('data.json', JSON.stringify(data, null, 0), (err) => {
  console.log(err);
})

function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format("MM-DD-YYYY");
}
