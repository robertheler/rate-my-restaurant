/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const cors = require('cors');

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

app.get('/reservations/:id', (req, res) => {
  db.getSchedule(req.params.id, (err, schedule) => {
    if (err) {
      res.status(404);
      res.end();
      console.log(err);
    } else {
      res.status(200);
      res.send(schedule);
      res.end();
    }
  });
});
