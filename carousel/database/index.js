var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'student',
  password : 'student',
  database : 'restaurants'
});

connection.connect(() => console.log('connected to the database!'));

module.exports = connection;