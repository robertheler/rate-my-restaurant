const fs = require("fs");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const Fakerator = require("fakerator");
const moment = require("moment"); // require
moment().format();

const lorem = new LoremIpsum();
const generate = new Fakerator();
let data = [];

let totalTables = 0;
let totalDates = 0;
let totalRestaurants = 0;
for (var restaurant = 1; restaurant <= 1000; restaurant++) {
  totalRestaurants++;
  let id = totalRestaurants;
  let name = generate.lorem.word() + " " + generate.lorem.word();
  let street = generate.entity.address().street;
  let city = generate.entity.address().city;
  let state = generate.entity.address().state;
  let zip = generate.entity.address().zip;
  let address = `${street}, ${city}, ${state} ${zip}`;
  let phone = generate.random.number(1000000000, 9999999999);
  let website = "www." + generate.random.string() + ".com";
  let costRating = generate.random.number(1, 5);
  let review = generate.random.number(100, 500) / 100;
  let opens = toTimeFormat(generate.random.number(6, 9));
  let closes = toTimeFormat(generate.random.number(17, 24));
  let reservationSlot = generate.random.number(1, 4) / 4; // 0.25, 0.5 or 1h slots
  let tables = [];
  let numberTables = generate.random.number(6, 16); // could increase
  for (let i = 0; i < numberTables; i++) {
    totalTables++;
    let capacity = generate.random.number(4, 14);
    let dates = [];
    let numberDays = 100;
    for (let j = 0; j < numberDays; j++) {
      totalDates++;
      let date = getDate(j);
      let times = randomAvailableTimes(opens, closes, reservationSlot);
      dates.push({ id: totalDates, date, times });
    }
    tables.push({ id: totalTables, capacity, dates });
  }

  let item = {
    id,
    name,
    address,
    phone,
    website,
    costRating,
    review,
    opens,
    closes,
    reservationSlot,
    tables
  };

  data.push(item);

  if (restaurant % 1000 === 0) {
    console.log(`So far ${restaurant} entries`);
  }
}

fs.writeFileSync(
  "data.json",
  JSON.stringify(data, null),
  (err) => {
    if (err) {
      console.log('Error');
    } else {
      console.log('Success!');
      //data = [];
    }
  }
);

console.log('---------------------------------------')
console.log(`Generated ${totalRestaurants} restaurants!`);
console.log(`Generated ${totalTables} tables!`);
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
  return times;
}