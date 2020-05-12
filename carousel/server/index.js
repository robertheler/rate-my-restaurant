// helper files
const database = require('../database/index.js')

// middleware
const parser = require('body-parser');

// import controller
const {getImages, getUsers} = require('./controller.js');

const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/images', getImages);

app.get('/users', getUsers);

module.exports = app;

