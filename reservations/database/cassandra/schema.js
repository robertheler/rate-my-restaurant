// const mongoose = require('mongoose');

// const reservationScheduleSchema = new mongoose.Schema({
//   id: Number,
//   restaurantName: String,
//   timeslots: Array,
//   dates_closed: Array,
// });

// const ReservationSchedule = mongoose.model('Schedule', reservationScheduleSchema);

// module.exports.reservationScheduleSchema = reservationScheduleSchema;
// module.exports.ReservationSchedule = ReservationSchedule;
CREATE TABLE Customer (
  cust_id text,
  first_name text,
  last_name text,
  registered_on timestamp,
  PRIMARY KEY (cust_id));

CREATE TABLE Product (
  prdt_id text,
  title text,
  PRIMARY KEY (prdt_id));

CREATE TABLE Customer_By_Liked_Product (
  liked_prdt_id text,
  liked_on timestamp,
  title text,
  cust_id text,
  first_name text,
  last_name text,
  PRIMARY KEY (prdt_id, liked_on));

CREATE TABLE Product_Liked_By_Customer (
  cust_id text,
  first_name text,
  last_name text,
  liked_prdt_id text,
  liked_on timestamp,
  title text,
  PRIMARY KEY (cust_id, liked_on));