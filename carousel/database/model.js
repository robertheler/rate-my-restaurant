const db = require('./index.js'); //connection
const {genericQueryHandler} = require('./handlers.js');

module.exports = {
    findAllImages: (res) => {
        db.query('SELECT * FROM images_info', genericQueryHandler(res));
      }, 
    findAllUserInfo: (res) => {
        db.query('SELECT * FROM users_info', genericQueryHandler(res));
    }
}