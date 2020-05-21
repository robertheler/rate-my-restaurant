DROP DATABASE IF EXISTS ratemyrestaurant;

CREATE DATABASE ratemyrestaurant;

\c ratemyrestaurant;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS availability;

CREATE TABLE restaurants(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL
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