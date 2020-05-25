DROP DATABASE IF EXISTS restaurants;

CREATE DATABASE restaurants;

\c restaurants;

DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants(
   id SERIAL,
   name VARCHAR(255),
   address VARCHAR(255),
   phone BIGINT,
   website VARCHAR(255),
   costrating INTEGER,
   review NUMERIC,
   opens CHAR(5),
   closes CHAR (5),
   reservationslot NUMERIC
);

CREATE TABLE tables(
   id SERIAL,
   restaurant_id BIGINT,
   capacity INTEGER
);

CREATE TABLE availability(
   id SERIAL,
   table_id BIGINT,
   date DATE,
   times CHAR(5) []
);