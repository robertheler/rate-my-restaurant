var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '172.17.0.3', // 172.17.0.3
  user     : 'root',
  password : 'kiefer898',
  database : 'restaurants'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to the database!')

  }
});

module.exports = connection;