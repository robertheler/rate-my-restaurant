const mongoose = require('mongoose');
const schema = require('./schema.js');

const db = mongoose.connection;

const seed = () => {
  const seeder = {};
  seeder.billyBobsDinerSchedule = new schema.ReservationSchedule({
    id: 0,
    restaurantName: "Billy Bob\'s Diner",
    timeslots: ['0900', '0915', '0930', '0945', '1000', '1015', '1030', '1045', '1100', '1115', '1130', '1145', '1200', '1215', '1230', '1245', '1300', '1315', '1330', '1345', '1400', '1415', '1430', '1445', '1500', '1515', '1530', '1545', '1600', '1615', '1630', '1645', '1700', '1715', '1730', '1745', '1800', '1815', '1830', '1845', '1900', '1915', '1930', '1945', '2000'],
    dates_closed: [],
  });

  seeder.priyankasSquidFactorySchedule = new schema.ReservationSchedule({
    id: 1,
    restaurantName: "Priyanka's Squid Factory",
    timeslots: ['1400', '1415', '1430', '1445', '1500', '1515', '1530', '1545', '1600', '1615', '1630', '1645', '1700', '1715', '1730', '1745', '1800', '1815', '1830', '1845', '1900', '1915', '1930', '1945', '2000', '2015', '2030', '2045'],
    dates_closed: ['5/3/20', '5/10/20', '5/16/20'],
  });

  seeder.kiefersEggLabSchedule = new schema.ReservationSchedule({
    id: 2,
    restaurantName: "Kiefer's Egg Lab",
    timeslots: [[1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500],
      [1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430],
      [1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
        1700, 1730, 1800, 1830],
      [1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
        1700, 1730, 1800, 1830],
      [1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
        1700, 1730, 1800, 1830],
      [1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
        1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030],
      [1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030]],
    dates_closed: ['5/7/20', '5/8/20', '5/20/20', '6/4/20'],
  });

  seeder.kimosSecretTrufflesSchedule = new schema.ReservationSchedule({
    id: 3,
    restaurantName: "Kimo's Secret Truffles",
    timeslots: ['1100', '1115', '1130', '1145', '1200', '1215', '1230', '1245', '1300', '1315', '1330', '1345', '1400', '1730', '1745', '1800', '1815', '1830', '1845', '1900', '1915', '1930', '1945', '2000', '2015', '2030', '2045', '2100', '2115', '2130', '2145', '2200'],
    dates_closed: ['5/7/20', '5/11/20', '5/17/20', '5/20/20', '5/23/20', '5/26/20', '5/29/20', '6/12/20'],
  });

  seeder.minjisLevitatingTeacupSchedule = new schema.ReservationSchedule({
    id: 4,
    restaurantName: "Minji's Levitating Teacup",
    timeslots: ['0800', '0815', '0830', '0845', '0900', '0915', '0930', '0945', '1000', '1015', '1030', '1045', '1100', '1115', '1130', '1145', '1200', '1215', '1230', '1245', '1300', '1315', '1330', '1345', '1400', '1415', '1430', '1445', '1500', '1515', '1530', '1545', '1600'],
    dates_closed: ['5/7/20', '5/10/20', '5/15/20', '6/3/20'],
  });

  db.dropCollection('schedules', () => {

  });

  for (const key in seeder) {
    seeder[key].save((err, value) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully saved ${key.toString()} to database`);
      }
    });
  }
};

module.exports.seed = seed;
