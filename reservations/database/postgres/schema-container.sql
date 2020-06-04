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
   restaurant_id BIGINT,
   capacity INTEGER CHECK (capacity > 0) NOT NULL
);

CREATE TABLE availability(
   id SERIAL PRIMARY KEY,
   table_id BIGINT,
   date DATE NOT NULL,
   times CHAR(5)[] NOT NULL
);

COPY restaurants (name, address, phone, website, costrating, review, opens, closes, reservationslot) FROM '/db/restaurants.csv' DELIMITER ',' CSV HEADER;

COPY tables (restaurant_id, capacity) FROM '/db/tables.csv' DELIMITER ',' CSV HEADER;

COPY availability (table_id, date, times) FROM '/db/availability1.csv' DELIMITER ',' CSV HEADER;

COPY availability (table_id, date, times) FROM '/db/availability2.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX ON restaurants(id);
CREATE INDEX ON restaurants(address);
CREATE INDEX ON restaurants(phone);
CREATE INDEX ON restaurants(website);
CREATE INDEX ON restaurants(costrating);
CREATE INDEX ON restaurants(review);
CREATE INDEX ON restaurants(opens);
CREATE INDEX ON restaurants(closes);
CREATE INDEX ON restaurants(reservationslot);

CREATE INDEX ON tables(id);
CREATE INDEX ON tables(restaurant_id);
CREATE INDEX ON tables(capacity);

CREATE INDEX ON availability(table_id);
/* CREATE INDEX ON availability(id);
CREATE INDEX ON availability(date);
CREATE INDEX ON availability(times); */

ALTER TABLE availability
ADD CONSTRAINT availability_foreign FOREIGN KEY (table_id) REFERENCES tables (id);

ALTER TABLE tables
ADD CONSTRAINT tables_foreign FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);