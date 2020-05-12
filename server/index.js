const express = require('express');
const app = express();
const path = require ('path');

const publicFolder = path.join(__dirname, '../', 'dist');
const publicHTML = path.join(publicFolder, 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(publicFolder));

app.listen(3005, () => {
  console.log('Main proxy running on port 3005');
});

app.get('/', (req, res) => {
  res.send(publicHTML);
});
