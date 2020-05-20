DROP DATABASE IF EXISTS ratemyrestaurant;

CREATE DATABASE ratemyrestaurant;

\c ratemyrestaurant;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS availability;

CREATE TABLE restaurants(
   restaurant_id INTEGER PRIMARY KEY,
   name VARCHAR(255) NOT NULL
);

CREATE TABLE availability(
   availability_id SERIAL PRIMARY KEY,
   restaurant_id INTEGER REFERENCES restaurant(restaurant_id),
   date date NOT NULL,
   time CHAR(4) NOT NULL
);


INSERT INTO restaurants VALUES (1, 'Bertys Oasis');
INSERT INTO restaurants VALUES (2, 'Bertys Oasis 2');
INSERT INTO restaurants VALUES (3, 'Bertys Oasis 3');

-- INSERT INTO imagearray VALUES (0, 0,'https://6-pack.s3-us-west-1.amazonaws.com/00/0.jpg', 'Rock Reach House - mail floor');
-- INSERT INTO imagearray VALUES (1, 0, 'https://6-pack.s3-us-west-1.amazonaws.com/00/1.jpg', 'Rock Reach House - dawn outside');
