// Requiring our models and passport as we've configured it
const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(server) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  server.post("/api/booster", (req, res) => {
    console.log(req.body)
    db.MKY811.create({
      
      hours: req.body.hours,
      temp: req.body.temp
    })
      .then(result => res.json(result))
      .catch(error => console.log(error))
  })

  server.get("/api/booster", (req, res) => {
    db.MKY811.findAll({})
      .then(result => res.json(result))
      .catch(error => console.log(error))
  });

  
};
