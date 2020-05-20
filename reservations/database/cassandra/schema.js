const mongoose = require('mongoose');

const reservationScheduleSchema = new mongoose.Schema({
  id: Number,
  restaurantName: String,
  timeslots: Array,
  dates_closed: Array,
});

const ReservationSchedule = mongoose.model('Schedule', reservationScheduleSchema);

module.exports.reservationScheduleSchema = reservationScheduleSchema;
module.exports.ReservationSchedule = ReservationSchedule;
