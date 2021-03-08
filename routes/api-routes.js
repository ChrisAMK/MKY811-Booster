// Requiring our models and passport as we've configured it
const db = require("../models");

const months = ['index', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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

  server.get("/api/rig08/all", (req, res) => {
    db.MKY021.findAll({})
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.get("/api/rig08/last", (req, res) => {
    console.log("API ROUTES")
    db.MKY08.findAll({
      limit: 1,
      where: {
       // Future Conditions 
      },
      order: [[ 'id', 'DESC' ]]
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.post("/api/rig08/time", (req, res) => {
    console.log(req.body)
    db.MKY08.findAll({
      limit: 1,
      where: {
        year: req.body.year,
        month: months[req.body.month],
        date: req.body.day,
        hour: req.body.hour,
        minute: req.body.minute,
        second: req.body.second
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  })


  
};