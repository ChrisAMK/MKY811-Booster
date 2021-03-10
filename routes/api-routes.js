// Requiring our models and passport as we've configured it
const db = require("../models");

const months = ['index', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const timeAttributes = ['year', 'month', 'date', 'hour', 'minute', 'second'];
const RcDrillAttributes = ['engineRPM', 'oilPressure', 'holdBackPressure', 'DownholeAirPressure', 'rotationForwardPressure', 'penetrationRate', 'coolantTemp', 'mainPumpPressure', 'headPosition', 'holeDepth', 'driller', 'bitWeight', 'pulldownPressure', 'rotationRpm', 'waterPressure', 'rodLoaderPosition', 'headRefPosition', 'engineHours'];
const RcEngineAttributes = ['engineRPM', 'oilPressure', 'coolantTemp', 'mainPumpPressure', 'engineOilTemp', 'intakeManifoldTemp', 'engineTorque', 'intercoolerTemp', 'turboRpm', 'engineOilLevel'];
const RcCompressorAttributes = ['compressorDischargeTemperature', 'compressorInterstagePressure', 'compressorLinePressure', 'compressorSumpPressure']

module.exports = function(server) {

  //RIG 21 Routes
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





  //Rig 08 Routes
  server.get("/api/rig08/all", (req, res) => {
    db.MKY021.findAll({})
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.post("/api/rig08/last", (req, res) => {
    let chosenAttributes = []
    switch (req.body.page) {
      case "drilling":
        chosenAttributes.push(...RcDrillAttributes);
        break;
      case "engine":
        chosenAttributes.push(...RcEngineAttributes)
        break;
      case "compressor":
        chosenAttributes.push(...RcCompressorAttributes);
        break;
      default:
        console.log("Check Switch Case Statement in API - Routes");
        break;
    }
    chosenAttributes.push(...timeAttributes);

    db.MKY08.findAll({
      attributes: chosenAttributes,
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
    let chosenAttributes = []
    switch (req.body.page) {
      case "drilling":
        chosenAttributes.push(...RcDrillAttributes);
        break;
      case "engine":
        chosenAttributes.push(...RcEngineAttributes)
        break;
      case "compressor":
        chosenAttributes.push(...RcCompressorAttributes);
        break;
      default:
        console.log("Check Switch Case Statement in API - Routes");
        break;
    }
    chosenAttributes.push(...timeAttributes);
    db.MKY08.findAll({
      attributes: chosenAttributes,
      limit: 1,
      where: {
        year: req.body.year,
        month: req.body.month,
        date: req.body.day,
        hour: req.body.hour,
        minute: req.body.minute,
        second: req.body.second
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.post("/api/rig08/day", (req, res) => {
    console.log(req.body)
    db.MKY08.findAll({
      where: {
        year: req.body.year,
        month: req.body.month,
        date: req.body.day,
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.post("/api/rig08/hour", (req, res) => {
    console.log(req.body)
    db.MKY08.findAll({
      where: {
        year: req.body.year,
        month: req.body.month,
        date: req.body.day,
        hour: req.body.hour
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.post("/api/rig08/minute", (req, res) => {
    db.MKY08.findAll({
      where: {
        year: req.body.year,
        month: req.body.month,
        date: req.body.day,
        hour: req.body.hour,
        minute: req.body.minute,
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  }),

  server.get("/api/rig08/entry", (req, res) => {
    db.MKY08.findAll({
      attributes: ['date']
      ,
      where: {
        year: 2021,
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  })
  
};