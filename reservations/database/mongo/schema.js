const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: String,
  address: String,
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999
  },
  website: String,
  costRating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: Number,
    min: 1,
    max: 5
  },
  opens: {
    type: String,
    maxLength: 5
  },
  closes: {
    type: String,
    maxLength: 5
  },
  reservationSlot: Number,
  tables: [
    {
      id: {
        type: Number,
        unique: true,
        required: true
      },
      capacity: {
        type: Number,
        min: 0
      },
      dates: [
        {
          id: Number,
          date: Date,
          times: [String]
        }
      ]
    }
  ]
});

const Restaurants = mongoose.model("Restaurants", schema);

module.exports.schema = schema;
module.exports.Restaurants = Restaurants;
