const Fakerator = require("fakerator");
const moment = require("moment");
moment().format();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const generate = new Fakerator();

let tables = 110471; //replace with output of GenerateTables.js
let numberDaysPerTable = 100;
let availability = [];
let totalDates = 0;
for (let i = 50001; i <= tables; i++) {
  //for (let i = 1; i <= 50000; i++) {
  for (let j = 0; j < numberDaysPerTable; j++) {
    totalDates++;
    let date = getDate(j);
    let opens = toTimeFormat(generate.random.number(6, 9));
    let closes = toTimeFormat(generate.random.number(17, 24));
    let reservationslot = generate.random.number(1, 4) / 4; // 0.25, 0.5 or 1h slots
    let times = randomAvailableTimes(opens, closes, reservationslot);
    availability.push({ table_id: i, date, times });
  }
  if (i % 10000 === 0) console.log(i);
}

const csvWriterAvailability = createCsvWriter({
  path: "database/data/availability2.csv",
  //path: "database/data/availability1.csv",
  header: [
    { id: "table_id", title: "table_id" },
    { id: "date", title: "date" },
    { id: "times", title: "times" }
  ]
});

csvWriterAvailability
  .writeRecords(availability)
  .then(() =>
    console.log("The Availability CSV file was written successfully")
  );

console.log(`Generated ${totalDates} appointment dates!`);

function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format("MM/DD/YYYY");
}

//24h army to hh:mm
function toTimeFormat(hours, minutes = "00") {
  if (minutes === 0) {
    minutes = "00";
  }

  if (hours < 10) {
    return "0" + hours + ":" + minutes;
  } else {
    return hours + ":" + minutes;
  }
}

function randomAvailableTimes(opens, closes, reservationSlot) {
  let times = [];
  opens = Number(opens.substring(0, opens.indexOf(":")));
  closes = Number(closes.substring(0, closes.indexOf(":")));
  for (var time = opens; time <= closes; time = time + reservationSlot) {
    if (generate.random.boolean()) {
      let hours = Math.floor(time);
      let minutes = (time - hours) * 60;
      times.push(toTimeFormat(hours, minutes));
    }
  }
  return "{" + times.join(",") + "}";
}
