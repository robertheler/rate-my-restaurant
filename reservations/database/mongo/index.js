/* eslint-disable no-console */
const mongoose = require('mongoose');
const schema = require('./schema');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
//mongoose.connect('mongodb://172.17.0.2:27017/reservations', options);
mongoose.connect('mongodb://localhost/restaurants', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database!');
  //seeder.seed();
  mongoose.connection.db.dropDatabase();
});

function get (id, callback) {
  schema.Restaurants.findOne({ id }, (err, schedule) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, schedule);
    }
  });
};

// findAll retrieves all shoes
function findAll(callback) {
  schema.Restaurants.find({}, callback);
}

// findOne will retrieve the shoe associated with the given id
function findOne(id, callback) {
  mongoose.connect('mongodb://mongo:27017/adidas', options, () => {
    schema.Restaurants.find({id: id}, callback)
  })
}

// insertOne inserts a shoe into the db
function insertOne(shoe, callback) {
  schema.Restaurants.create(shoe, callback);
}


module.exports.get = get;
module.exports.findOne = findOne;
module.exports.findAll = findAll;
module.exports.insertOne = insertOne;