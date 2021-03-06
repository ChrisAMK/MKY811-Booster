// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(server) {

  server.get("/api/rig021/last", (req, res) => {
    db.MKY021.findAll({
      limit: 1,
      where: {
       // Future Conditions 
      },
      order: [[ 'id', 'DESC' ]]
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.get("/api/rig08/last", (req, res) => {
    db.MKY08.findAll({
      limit: 1,
      where: {
       // Future Conditions 
      },
      order: [[ 'id', 'DESC' ]]
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  })


  
};