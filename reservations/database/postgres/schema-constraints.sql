DROP DATABASE IF EXISTS ratemyrestaurant;

CREATE DATABASE ratemyrestaurant;

\c ratemyrestaurant;

DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   phone BIGINT CHECK (phone BETWEEN 1000000000 AND 9999999999) NOT NULL,
   website VARCHAR(255) NOT NULL,
   costrating INTEGER CHECK (costRating BETWEEN 1 AND 5) NOT NULL,
   review NUMERIC CHECK (review BETWEEN 1 and 5) NOT NULL,
   opens CHAR(5) NOT NULL,
   closes CHAR (5) NOT NULL,
   reservationslot NUMERIC CHECK (reservationslot BETWEEN 0 and 1) NOT NULL
);

CREATE TABLE tables(
   id SERIAL PRIMARY KEY,
   restaurant_id BIGINT REFERENCES restaurants(id) NOT NULL,
   capacity INTEGER CHECK (capacity > 0) NOT NULL
);

CREATE TABLE availability(
   id SERIAL PRIMARY KEY,
   table_id BIGINT REFERENCES tables(id),
   date DATE NOT NULL,
   times CHAR(5) [] NOT NULL
);