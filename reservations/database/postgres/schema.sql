DROP DATABASE IF EXISTS ratemyrestaurant;

CREATE DATABASE ratemyrestaurant;

\c ratemyrestaurant;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS availability;

CREATE TABLE restaurants(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   phone INTEGER CHECK (phone BETWEEN 1000000000 AND 9999999999) NOT NULL,
   website VARCHAR(255) NOT NULL,
   costRating INTEGER CHECK (costRating BETWEEN 1 AND 5) NOT NULL,
   review NUMERIC CHECK (review BETWEEN 1 and 5) NOT NULL,
   opens CHAR(5) NOT NULL,
   closes CHAR (5) NOT NULL,
   reservationSlot NUMERIC CHECK (reservationSlot BETWEEN 0 and 1) NOT NULL
);

CREATE TABLE tables(
   id SERIAL PRIMARY KEY,
   restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
   capacity INTEGER CHECK (capacity > 0) NOT NULL
);

CREATE TABLE availability(
   id SERIAL PRIMARY KEY,
   table_id INTEGER REFERENCES tables(id),
   date DATE NOT NULL,
   times CHAR(5) [] NOT NULL
);