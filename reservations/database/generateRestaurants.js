const Fakerator = require("fakerator");
const moment = require("moment"); // require
moment().format();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const generate = new Fakerator();

let restaurants = [];
let totalRestaurants = 10000;
for (var i = 1; i <= 10000; i++) {
  let name = generate.lorem.word() + " " + generate.lorem.word();
  let street = generate.entity.address().street;
  let city = generate.entity.address().city;
  let state = generate.entity.address().state;
  let zip = generate.entity.address().zip;
  let address = `${street}, ${city}, ${state} ${zip}`;
  let phone = generate.random.number(1000000000, 9999999999);
  let website = "www." + generate.random.string() + ".com";
  let costrating = generate.random.number(1, 5);
  let review = generate.random.number(100, 500) / 100;
  let opens = toTimeFormat(generate.random.number(6, 9));
  let closes = toTimeFormat(generate.random.number(17, 24));
  let reservationslot = generate.random.number(1, 4) / 4; // 0.25, 0.5 or 1h slots

  let item = {
    name,
    address,
    phone,
    website,
    costrating,
    review,
    opens,
    closes,
    reservationslot
  };

  restaurants.push(item);
}

const csvWriterRestaurants = createCsvWriter({
  path: "database/data/restaurants.csv",
  header: [
    { id: "name", title: "name" },
    { id: "address", title: "address" },
    { id: "phone", title: "phone" },
    { id: "website", title: "website" },
    { id: "costrating", title: "costrating" },
    { id: "review", title: "review" },
    { id: "opens", title: "opens" },
    { id: "closes", title: "closes" },
    { id: "reservationslot", title: "reservationslot" }
  ]
});

csvWriterRestaurants
  .writeRecords(restaurants)
  .then(() => console.log("The Restaurant CSV file was written successfully"));

console.log(`Generated ${totalRestaurants} restaurants!`);

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
