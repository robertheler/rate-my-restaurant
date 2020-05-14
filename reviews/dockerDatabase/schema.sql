DROP DATABASE IF EXISTS yelpreviews;

CREATE DATABASE yelpreviews;

USE yelpreviews;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(150) NOT NULL,
  memberStatus VARCHAR(50),
  statusYear INT,
  city VARCHAR(150) NOT NULL,
  profPicURL VARCHAR(150),
  friendCount INT
);

DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  restaurantName VARCHAR(500)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  restaurantID INT,
  stars INT,
  uploadDate DATE,
  restaurantVisit INT DEFAULT 0,
  content VARCHAR(3000),
  emojiUseful INT DEFAULT 0,
  emojiFunny INT DEFAULT 0,
  emojiCool INT DEFAULT 0,
  reply VARCHAR(3000),
  userID INT,
  replyDate DATE,
  CONSTRAINT fk_reviews_restaurant FOREIGN KEY (restaurantID) REFERENCES restaurants(id),
  CONSTRAINT fk_reviews_user FOREIGN KEY (userID) REFERENCES users(id)
  );

DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  picDescript VARCHAR(1000),
  picURL VARCHAR(500),
  uploadDate DATE,
  userID INT,
  helpful INT,
  notHelpful INT,
  reviewID INT,
  restaurantID INT,
  CONSTRAINT fk_pics_review FOREIGN KEY (reviewID) REFERENCES reviews(id),
  CONSTRAINT fk_pics_user FOREIGN KEY (userID) REFERENCES users(id),
  CONSTRAINT fk_pics_restaurant FOREIGN KEY (restaurantID) REFERENCES restaurants(id)
);

INSERT INTO users(userName, memberStatus, statusYear, city, profPicURL,  friendCount) VALUES ("Michael Scott", NULL, NULL, "Palo Alto", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/michaelscott.jpg", 3);
INSERT INTO users(userName, memberStatus, statusYear, city, profPicURL,  friendCount) VALUES ("Dwight Scrute", NULL, NULL, "San Jose", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/dwightschrute.jpg", 5);
INSERT INTO users(userName, memberStatus, statusYear, city, profPicURL,  friendCount) VALUES ("Pam Beesly", "Elite", 2020, "Fremont", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/pambeesly.jpg", 223);
INSERT INTO users(userName, memberStatus, statusYear, city, profPicURL,  friendCount) VALUES ("Jim Halpert", "Elite", 2020, "San Francisco", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/jimhalpert.jpg", 256);
INSERT INTO users(userName, memberStatus, statusYear, city, profPicURL,  friendCount) VALUES ("Angela Martin", "Elite", 2020, "Berkeley", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/angelamartin.jpg", 20);

INSERT INTO restaurants(restaurantName) VALUES ('Taste of Italy');
INSERT INTO restaurants(restaurantName) VALUES ('Taste of Korea');
INSERT INTO restaurants(restaurantName) VALUES ('Taste of India');
INSERT INTO restaurants(restaurantName) VALUES ('Taste of Vietnam');

INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (1, 5, "2020-04-02", 1, "It was delicious!", 1, 0, 0, "I'm glad you enjoyed it!", 1, "2020-04-03");
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (1, 2, "2020-03-23", 0, "Wasn't great", 1, 1, 0, Null, 2, NULL);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (2, 4, "2020-02-12", 2, "Love this place", 1, 0, 1, "Thank you!", 3, "2020-02-13");
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (3, 5, "2020-01-10", 0, "Best Naan in town", 1, 1, 1, Null, 4, Null);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (4, 5, "2020-03-25", 0, "Try their springrolls", 1, 0, 0, Null, 5, Null);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (3, 4, "2020-01-10", 1, "Lamb curry was my favorite", 1, 0, 0, Null, 3, Null);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (2, 3, "2020-05-01", 0, "Too spicy", 0, 0, 0, Null, 5, Null);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (2, 1, "2020-05-5", 0, "Service was terrible", 0, 0, 0, "I am sorry to hear that you felt that way. Please let us know how we can make the experience better next time", 5, "2020-05-08");
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (2, 3, "2020-04-12", 0, "It was just okay", 0, 0, 0, Null, 2, Null);
INSERT INTO reviews (restaurantID, stars, uploadDate, restaurantVisit, content, emojiUseful, emojiFunny, emojiCool, reply, userID, replyDate) VALUES (2, 5, "2020-04-12", 1, "It was really  delicious!", 1, 0, 0, "I'm glad you enjoyed it! Please come again.", 1, "2020-04-15");

INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Menu", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/italian_menu1.jpg", "2020-04-02", 1, 1, 1, 1);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Pasta", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/pasta_pic1.jpg", "2020-04-02", 1, 1, Null, 1);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES (Null, "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/italian_inside1.jpg", "2020-04-02", 1, Null, Null, 1);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Menu", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/korean_menu1.jpg", "2020-02-12", 3, Null, 1, 3);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Bossam - pork", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/bossam_pic1.jpg", "2020-02-12", 3, Null, Null, 3);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Decor", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/korean_inside1.jpg", "2020-02-12", 3, Null, Null, 3);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Kimchi", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/kimchi_pic1.jpg", "2020-02-12", 3, 1, Null, 3);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES ("Menu", "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/vietnamese_menu1.jpg", "2020-03-25", 5, 1, Null, 5);
INSERT INTO pictures (picDescript, picURL, uploadDate, userID, helpful, notHelpful, reviewID) VALUES (Null, "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/vietnamese_food1.jpg", "2020-03-25", 5, Null, Null, 5);

