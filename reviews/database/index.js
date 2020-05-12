const mysql = require('mysql');
const mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);
connection.connect((error) => {
  if (error) {
    console.log (error);
  } else {
    console.log ('mySQL is connected!');
  }
});


const allReviews = function (id, callback) {
  connection.query(`
  SELECT reviews.id, reviews.stars, DATE_FORMAT(reviews.uploadDate, "%c/%e/%Y") "uploadDate", reviews.restaurantVisit, reviews.content, reviews.emojiUseful, reviews.emojiFunny, reviews.emojiCool, reviews.reply, DATE_FORMAT(reviews.replyDate, "%c/%e/%Y") "replyDate", users.id "userID", users.profPicURL, users.userName, users.city, users.friendCount, users.memberStatus, users.statusYear, users.pictures_count, users.reviews_count, restaurants.restaurantName FROM reviews INNER JOIN (SELECT users.id, users.userName, users.memberStatus, users.statusYear, users.city, users.profPicURL, users.friendCount, COUNT(DISTINCT pictures.id) AS pictures_count, COUNT(DISTINCT reviews.id) AS reviews_count FROM users LEFT JOIN pictures ON pictures.userID = users.id LEFT JOIN reviews ON reviews.userID = users.id GROUP BY 1) AS users ON users.id = reviews.userID INNER JOIN restaurants ON restaurants.id = reviews.restaurantID WHERE restaurants.id = ${id}`, (error, results) => {
    if (error) {
      console.log('unable to get reviews from db');
      callback(error, null);
    } else {
      connection.query('SELECT picURL, userID, reviewID FROM pictures', (err, data) => {
        if (err) {
          console.log('unable to get pics for reviews from db');
          callback(err, null);
      } else {
        for (let i = 0; i < results.length; i++) {
          results[i].pictures = [];
          for (let j = 0; j < data.length; j++) {
            if (results[i].id === data[j].reviewID) {
              results[i].pictures.push(data[j].picURL);
            }
          }
        }
        callback(null, results);
      }
    })
  }
  });
};

const allPics = (callback) => {
  connection.query('SELECT * FROM pictures', (error, results) => {
    if (error) {
      console.log('Failed to get pictures from DB');
    } else {
      let resultString = JSON.stringify(results);
      let parseResult = JSON.parse(resultString);
      console.log('Successfully got pictures from DB');
      callback(null, parseResult);
    }
  });
};

const emojiPlus = (data, callback) => {
  connection.query(`UPDATE reviews SET ${data.emoji} = ${data.emoji} + 1 WHERE id = ${data.reviewID}`, (error, results) => {
    if (error) {
      console.log('Failed to update emoji count, ', error);
    } else {
      callback(null, results);
    }
  })
}

const searchedReviews = function (id, q, callback) {
  connection.query(`
  SELECT reviews.id, reviews.stars, DATE_FORMAT(reviews.uploadDate, "%c/%e/%Y") "uploadDate", reviews.restaurantVisit, reviews.content, reviews.emojiUseful, reviews.emojiFunny, reviews.emojiCool, reviews.reply, DATE_FORMAT(reviews.replyDate, "%c/%e/%Y") "replyDate", users.id "userID", users.profPicURL, users.userName, users.city, users.friendCount, users.memberStatus, users.statusYear, users.pictures_count, users.reviews_count, restaurants.restaurantName FROM reviews INNER JOIN (SELECT users.id, users.userName, users.memberStatus, users.statusYear, users.city, users.profPicURL, users.friendCount, COUNT(DISTINCT pictures.id) AS pictures_count, COUNT(DISTINCT reviews.id) AS reviews_count FROM users LEFT JOIN pictures ON pictures.userID = users.id LEFT JOIN reviews ON reviews.userID = users.id GROUP BY 1) AS users ON users.id = reviews.userID INNER JOIN restaurants ON restaurants.id = reviews.restaurantID WHERE restaurants.id = ${id} AND reviews.content like '%${q}%'`, (error, results) => {
    if (error) {
      console.log('unable to get reviews from db');
      callback(error, null);
    } else {
      connection.query('SELECT picURL, userID, reviewID FROM pictures', (err, data) => {
        if (err) {
          console.log('unable to get pics for reviews from db');
          callback(err, null);
      } else {
        for (let i = 0; i < results.length; i++) {
          results[i].pictures = [];
          for (let j = 0; j < data.length; j++) {
            if (results[i].id === data[j].reviewID) {
              results[i].pictures.push(data[j].picURL);
            }
          }
        }
        callback(null, results);
      }
    })
  }
  });
};


const sortReviews = function (id, sortBy, callback) {
  if (sortBy !== 'elite') {
    console.log(sortBy)
    connection.query(`
    SELECT reviews.id, reviews.stars, DATE_FORMAT(reviews.uploadDate, "%c/%e/%Y") "uploadDate", reviews.restaurantVisit, reviews.content, reviews.emojiUseful, reviews.emojiFunny, reviews.emojiCool, reviews.reply, DATE_FORMAT(reviews.replyDate, "%c/%e/%Y") "replyDate", users.id "userID", users.profPicURL, users.userName, users.city, users.friendCount, users.memberStatus, users.statusYear, users.pictures_count, users.reviews_count, restaurants.restaurantName FROM reviews INNER JOIN (SELECT users.id, users.userName, users.memberStatus, users.statusYear, users.city, users.profPicURL, users.friendCount, COUNT(DISTINCT pictures.id) AS pictures_count, COUNT(DISTINCT reviews.id) AS reviews_count FROM users LEFT JOIN pictures ON pictures.userID = users.id LEFT JOIN reviews ON reviews.userID = users.id GROUP BY 1) AS users ON users.id = reviews.userID INNER JOIN restaurants ON restaurants.id = reviews.restaurantID WHERE restaurants.id = ${id} ORDER BY ${sortBy}`, (error, results) => {
      if (error) {
        console.log('unable to get reviews from db');
        callback(error, null);
      } else {
        connection.query('SELECT picURL, userID, reviewID FROM pictures', (err, data) => {
          if (err) {
            console.log('unable to get pics for reviews from db');
            callback(err, null);
        } else {
          for (let i = 0; i < results.length; i++) {
            results[i].pictures = [];
            for (let j = 0; j < data.length; j++) {
              if (results[i].id === data[j].reviewID) {
                results[i].pictures.push(data[j].picURL);
              }
            }
          }
          console.log(results)
          callback(null, results);
        }
      })
    }

  })
  } else {
    connection.query(`
    SELECT reviews.id, reviews.stars, DATE_FORMAT(reviews.uploadDate, "%c/%e/%Y") "uploadDate", reviews.restaurantVisit, reviews.content, reviews.emojiUseful, reviews.emojiFunny, reviews.emojiCool, reviews.reply, DATE_FORMAT(reviews.replyDate, "%c/%e/%Y") "replyDate", users.id "userID", users.profPicURL, users.userName, users.city, users.friendCount, users.memberStatus, users.statusYear, users.pictures_count, users.reviews_count, restaurants.restaurantName FROM reviews INNER JOIN (SELECT users.id, users.userName, users.memberStatus, users.statusYear, users.city, users.profPicURL, users.friendCount, COUNT(DISTINCT pictures.id) AS pictures_count, COUNT(DISTINCT reviews.id) AS reviews_count FROM users LEFT JOIN pictures ON pictures.userID = users.id LEFT JOIN reviews ON reviews.userID = users.id GROUP BY 1) AS users ON users.id = reviews.userID INNER JOIN restaurants ON restaurants.id = reviews.restaurantID WHERE restaurants.id = ${id} AND users.memberStatus = '${sortBy}'`, (error, results) => {
      if (error) {
        console.log('unable to get reviews from db');
        callback(error, null);
      } else {
        connection.query('SELECT picURL, userID, reviewID FROM pictures', (err, data) => {
          if (err) {
            console.log('unable to get pics for reviews from db');
            callback(err, null);
        } else {
          for (let i = 0; i < results.length; i++) {
            results[i].pictures = [];
            for (let j = 0; j < data.length; j++) {
              if (results[i].id === data[j].reviewID) {
                results[i].pictures.push(data[j].picURL);
              }
            }
          }
          callback(null, results);
        }
      })
    }
  })
  }
}

module.exports.allReviews = allReviews;
module.exports.allPics = allPics;
module.exports.emojiPlus = emojiPlus;
module.exports.searchedReviews = searchedReviews;
module.exports.sortReviews = sortReviews;
