DROP DATABASE IF EXISTS ratemyrestaurant;

CREATE DATABASE ratemyrestaurant;

\c ratemyrestaurant;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS availability;

CREATE TABLE restaurants(
   restaurant_id INTEGER PRIMARY KEY,
   name VARCHAR(255) NOT NULL
);

CREATE TABLE tables(
   table_id INTEGER PRIMARY KEY,
   restaurant_id INTEGER REFERENCES restaurants(restaurant_id) NOT NULL,
   table_capacity INTEGER CHECK (table_capacity > 0) NOT NULL
);

CREATE TABLE availability(
   availability_id SERIAL PRIMARY KEY,
   table_id INTEGER REFERENCES tables(table_id),
   date DATE NOT NULL,
   available_times CHAR(5) [] NOT NULL
);