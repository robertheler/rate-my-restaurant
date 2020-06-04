/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const path = require('path');
//const db = require('../database/mongo/index.js');
const db = require('../database/postgres/index.js');
const cors = require('cors');
const schedule = require('../database/legacy.json');

const app = express();

const publicFolder = path.join(__dirname, '/..', 'client', 'dist');
const publicHTML = path.join(publicFolder, 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(publicFolder));

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

app.get('/', (req, res) => {
  res.send(publicHTML);
});

app.get('/api/restaurants/:id', (req, res) => {
  db.getRestaurant(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
      NewRelic.Api.Agent.NewRelic.NoticeError(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/restaurants', (req, res) => {
  db.postRestaurant(req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).end();
    }
  });
});

app.delete('/api/restaurants/:id', (req, res) => {
  db.deleteRestaurant(req.params.id, (err, results) => {
    if (err) {
      res.status(404).end(err);
      console.log(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.patch('/api/restaurants/:id', (req, res) => {
  db.patchRestaurant(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.get('/api/tables/:id', (req, res) => {
  db.getTable(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/tables', (req, res) => {
  db.postTable(req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).end();
    }
  });
});

app.delete('/api/tables/:id', (req, res) => {
  db.deleteTable(req.params.id, (err, results) => {
    if (err) {
      res.status(404).end();
      console.log(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.patch('/api/tables/:id', (req, res) => {
  db.patchTable(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.get('/api/availability/:id', (req, res) => {
  db.getAvailability(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/availability', (req, res) => {
  db.postAvailability(req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).end();
    }
  });
});

app.delete('/api/availability/:id', (req, res) => {
  db.deleteAvailability(req.params.id, (err, results) => {
    if (err) {
      res.status(404).end();
      console.log(err);
    } else {
      res.status(204).send(results);
    }
  });
});

app.patch('/api/availability/:id', (req, res) => {
  db.patchAvailability(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(204).send(results);
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


app.get('/legacy/:id', (req, res) => {
  res.status(200);
  res.send(schedule);
  res.end();
});
