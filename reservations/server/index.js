/* eslint-disable no-console */
const express = require('express');
const path = require('path');
//const db = require('../database/cassandra/index.js');
const db = require('../database/postgres/index.js');
const cors = require('cors');
const schedule = require('../database/expected-by-client.json');

const app = express();

const publicFolder = path.join(__dirname, '/..', 'client', 'dist');
const publicHTML = path.join(publicFolder, 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(publicFolder));

app.listen(3001, () => {
  console.log('Server listening on port http://localhost:3001');
});

app.get('/', (req, res) => {
  res.send(publicHTML);
});

app.get('/api/restaurants/:id', (req, res) => {
  db.getAllAvailability(req.params.id, (err, results) => {
    if (err) {
      res.status(404);
      res.end();
      console.log(err);
    } else {
      res.status(200);
      res.send(results);
      res.end();
    }
  });
});

app.get('/api/restaurants/:id/:date/:size', (req, res) => {
  db.getSpecificAvailability(req.params.id, req.params.date, req.params.size, (err, results) => {
    if (err) {
      res.status(404);
      res.end();
      console.log(err);
    } else {
      res.status(200);
      res.send(results);
      res.end();
    }
  });
});

app.post('/api/restaurants/', (req, res) => {
  db.postRestaurant(req.body, (err, results) => {
    if (err) {
      res.status(404);
      res.end();
      console.log(err);
    } else {
      res.status(201);
      res.send(results);
      res.end();
    }
  });
});

app.delete('/api/tables/:id', (req, res) => {
  db.deleteTable(req.params.id, (err, results) => {
    if (err) {
      res.status(404);
      res.end();
      console.log(err);
    } else {
      res.status(204);
      res.send(results);
      res.end();
    }
  });
});

app.get('/legacy/:id', (req, res) => {
  res.status(200);
  res.send(schedule);
  res.end();
});
