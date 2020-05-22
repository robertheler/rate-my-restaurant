const fs = require("fs");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const Fakerator = require("fakerator");
const moment = require('moment'); // require
moment().format();


const lorem = new LoremIpsum();
const generate = new Fakerator();
let data = [];

let totalTables = 0;
for (var restaurant = 1; restaurant <= 10000; restaurant++) {
  let id = restaurant;
  let name = generate.lorem.word() + " " + generate.lorem.word();
  let street = generate.entity.address().street;
  let city = generate.entity.address().city;
  let state = generate.entity.address().state;
  let zip = generate.entity.address().zip;
  let address = `${street}, ${city}, ${state} ${zip}`
  let phone = generate.random.number(1000000000, 9999999999)
  let website = "www." + generate.random.string() + ".com"
  let costRating = generate.random.number(1, 5);
  let review = generate.random.number(100, 500)/100;

  let tables = [];
  let numberTables = generate.random.number(2, 4); // could increase
  for (let i = 0; i < numberTables; i++) {
    totalTables++;
    let id = totalTables;
    let capacity = generate.random.number(2, 12);

    let dates = [];
    let numberDays = 7;
    for (let j = 0; j < numberDays; j++) {
      let date = getDate(j);
      let times = randomAvailableTimes();
      dates.push({date, times});
    }
    tables.push({id, capacity, dates})
  }

  let item = {id, name, address, phone, website, costRating, review, tables};
  //console.log(item);
  data.push(item);

  if (restaurant % 1000 === 0) {
    console.log(`Generated ${restaurant} entries`);
    fs.appendFileSync('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Wrote 1,000 items to file`);
        data = [];
      }
    })
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
    if(generate.random.boolean()) {
      if (i < 10) {
        times.push('0' + i + ':00')
      } else {
        times.push(i + ':00')
      }
    };
  }
  return times;
}
//write JSON
//JSON.stringify(data, null, 2)
// fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
//   console.log(err || 'Data Generated!');
// })

//RangeError: Invalid string length