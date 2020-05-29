const Fakerator = require("fakerator");
const moment = require("moment");
moment().format();
const generate = new Fakerator();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let data =[]
for (let i = 0; i <= 1000000; i++) {
  let id = generate.random.number(0, 9999);
  let date = getDate(generate.random.number(0, 100));
  let size = generate.random.number(1, 12);

  data.push({id, date, size})
}

const csvWriter = createCsvWriter({
  path: "server/requests.csv",
  header: [
    { id: "id", title: "id" },
    { id: "date", title: "date" },
    { id: "size", title: "size" },
  ]
});

csvWriter
  .writeRecords(data)
  .then(() => console.log("The CSV requests file was written successfully"));

function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format("MM-DD-YYYY");
}
