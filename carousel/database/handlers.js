module.exports = {
    genericQueryHandler: (res) => {
      return (error, results, fields) =>  {
        if(error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          res.status(200).send(results);
        }
      }
    }
  }