const model = require('../database/model.js');

module.exports = {
  getImages: (req, res) => {
    // res.send('GET Images route working');
    model.findAllImages(res);
  },
  getUsers: (req, res) => {
    model.findAllUserInfo(res);
  }
};
