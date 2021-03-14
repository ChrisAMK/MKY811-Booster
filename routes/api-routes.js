// Requiring our models and passport as we've configured it
const db = require("../models");

const months = ['index', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const timeAttributes = ['year', 'month', 'date', 'hour', 'minute', 'second'];
const RcDrillAttributes = ['engineRPM', 'oilPressure', 'holdBackPressure', 'DownholeAirPressure', 'rotationForwardPressure', 'penetrationRate', 'coolantTemp', 'mainPumpPressure', 'headPosition', 'holeDepth', 'driller', 'bitWeight', 'pulldownPressure', 'rotationRpm', 'waterPressure', 'rodLoaderPosition', 'headRefPosition', 'engineHours', 'outsideTemp'];
const RcEngineAttributes = ['engineRPM', 'oilPressure', 'coolantTemp', 'mainPumpPressure', 'engineOilTemp', 'intakeManifoldTemp', 'engineTorque', 'intercoolerTemp', 'turboRpm', 'engineOilLevel'];
const RcCompressorAttributes = ['compressorDischargeTemperature', 'compressorInterstagePressure', 'compressorLinePressure', 'compressorSumpPressure']
const holeSetup = ['mastAngle', 'deckRoll', 'deckPitch']
module.exports = function(server) {

  //RIG 21 Routes
  server.post("/api/rig021/last", (req, res) => {
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

  server.post("/api/rig021/time", (req, res) => {
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
    chosenAttributes.push(...timeAttributes, ...holeSetup);
    db.MKY08.findAll({
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
    // Once the query is complete, check if a valid entry was found, if not run another query
    .then(result => {
      if (result.length === 0) {
        db.MKY021.findAll({
          where: {
            year: req.body.year,
            month: req.body.month,
            date: req.body.day,
            hour: req.body.hour,
            minute: req.body.minute,
          }
          // If no exact search was found, search the DB for all entries in that minute, Try to return the closest
        }).then(result => {
          if (result.length === 0) {

            db.MKY021.findAll({
              where: {
                year: req.body.year,
                month: req.body.month,
                date: req.body.day,
                hour: req.body.hour,
              }
            }).then(result => {
              // Result here is a array of all Entries for the Hour
              // If there are no Entries in the Array, Return a error message
              if (result.length === 0) {
                res.json("No Entries for the Hour")
              } else {
                // New Minutes is an Array that is populated with all the Minutes in the Hour that have been captured
                let newMinutes = [];
                result.forEach(entry => {
                  newMinutes.push(entry.minute)
                });
                const closestMinuteResult = newMinutes.reduce((a, b) => {
                  return Math.abs(b - req.body.minute) < Math.abs(a - req.body.minute) ? b : a;
                });
                // Perform another search but now we know what minute is closest to an existing result for the hour
                db.MKY021.findAll({
                  attributes: chosenAttributes,
                  where: {
                    year: req.body.year,
                    month: req.body.month,
                    date: req.body.day,
                    hour: req.body.hour,
                    minute: closestMinuteResult,
                  }
                }).then(result => {
                  // Result is an Array of all the entries that match the cloest minute of the hour
                  if (result.length === 0) {
                    // Technically there shouldn't ever be an error here because we are selecting from a "Suggested Search"
                    res.json("Server Code is Wrong, Make a Change");
                    console.log("Error in Auto Searching");
                  } else {
                    // Create a new Array full of the seconds of existing entries that are within the closet minute of the hour
                    let newSeconds = [];
                    result.forEach(entry => {
                      newSeconds.push(entry.second)
                      
                    });
                    let closestSecondResult = [];
                    (req.body.minute > closestMinuteResult) ? closestSecondResult = Math.max(...newSeconds) : closestSecondResult = Math.min(...newSeconds)
                    // const closestSecondResult = newSeconds.reduce((a, b) => {
                    //   return Math.abs(b - req.body.second) < Math.abs(a - req.body.second) ? b : a;
                    // });
                    db.MKY021.findAll({
                      attributes: chosenAttributes,
                      where: {
                        year: req.body.year,
                        month: req.body.month,
                        date: req.body.day,
                        hour: req.body.hour,
                        minute: closestMinuteResult,
                        second: closestSecondResult,
                      }
                    })
                    .then(result => {
                      res.json(result);

                    })
                  }
                })
              } 
              

            })

          } else {
            
            let newTimes = [];
            result.forEach(entry => {
              newTimes.push(entry.second)
            });
            const closestResult = newTimes.reduce((a, b) => {
              return Math.abs(b - req.body.second) < Math.abs(a - req.body.second) ? b : a;
            });
            //console.log(result[1], "THIS")
            db.MKY021.findAll({
              attributes: chosenAttributes,
              where: {
                year: req.body.year,
                month: req.body.month,
                date: req.body.day,
                hour: req.body.hour,
                minute: req.body.minute,
                second: closestResult,
              }
            }).then(result => res.json(result))
          }
          
        })


      } else {
        console.log(result.length)
        res.json(result)
      }
      
    })
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
        chosenAttributes.push(...RcEngineAttributes);
        break;
      case "compressor":
        chosenAttributes.push(...RcCompressorAttributes);
        break;
      default:
        console.log("Check Switch Case Statement in API - Routes");
        break;
    }
    chosenAttributes.push(...timeAttributes, ...holeSetup);

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
    chosenAttributes.push(...timeAttributes, ...holeSetup);
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
    // Once the query is complete, check if a valid entry was found, if not run another query
    .then(result => {
      if (result.length === 0) {
        db.MKY08.findAll({
          attributes: chosenAttributes,
          where: {
            year: req.body.year,
            month: req.body.month,
            date: req.body.day,
            hour: req.body.hour,
            minute: req.body.minute,
          }
          // If no exact search was found, search the DB for all entries in that minute, Try to return the closest
        }).then(result => {
          if (result.length === 0) {

            db.MKY08.findAll({
              attributes: chosenAttributes,
              where: {
                year: req.body.year,
                month: req.body.month,
                date: req.body.day,
                hour: req.body.hour,
              }
            }).then(result => {
              // Result here is a array of all Entries for the Hour
              // If there are no Entries in the Array, Return a error message
              if (result.length === 0) {
                res.json("No Entries for the Hour")
              } else {
                // New Minutes is an Array that is populated with all the Minutes in the Hour that have been captured
                let newMinutes = [];
                result.forEach(entry => {
                  newMinutes.push(entry.minute)
                });
                const closestMinuteResult = newMinutes.reduce((a, b) => {
                  return Math.abs(b - req.body.minute) < Math.abs(a - req.body.minute) ? b : a;
                });
                // Perform another search but now we know what minute is closest to an existing result for the hour
                db.MKY08.findAll({
                  attributes: chosenAttributes,
                  where: {
                    year: req.body.year,
                    month: req.body.month,
                    date: req.body.day,
                    hour: req.body.hour,
                    minute: closestMinuteResult,
                  }
                }).then(result => {
                  // Result is an Array of all the entries that match the cloest minute of the hour
                  if (result.length === 0) {
                    // Technically there shouldn't ever be an error here because we are selecting from a "Suggested Search"
                    res.json("Server Code is Wrong, Make a Change");
                    console.log("Error in Auto Searching");
                  } else {
                    // Create a new Array full of the seconds of existing entries that are within the closet minute of the hour
                    let newSeconds = [];
                    result.forEach(entry => {
                      newSeconds.push(entry.second)
                      
                    });
                    let closestSecondResult = [];
                    (req.body.minute > closestMinuteResult) ? closestSecondResult = Math.max(...newSeconds) : closestSecondResult = Math.min(...newSeconds)
                    // const closestSecondResult = newSeconds.reduce((a, b) => {
                    //   return Math.abs(b - req.body.second) < Math.abs(a - req.body.second) ? b : a;
                    // });
                    db.MKY08.findAll({
                      attributes: chosenAttributes,
                      where: {
                        year: req.body.year,
                        month: req.body.month,
                        date: req.body.day,
                        hour: req.body.hour,
                        minute: closestMinuteResult,
                        second: closestSecondResult,
                      }
                    })
                    .then(result => {
                      res.json(result);

                    })
                  }
                })
              } 
              

            })

          } else {
            
            let newTimes = [];
            result.forEach(entry => {
              newTimes.push(entry.second)
            });
            const closestResult = newTimes.reduce((a, b) => {
              return Math.abs(b - req.body.second) < Math.abs(a - req.body.second) ? b : a;
            });
            //console.log(result[1], "THIS")
            db.MKY08.findAll({
              attributes: chosenAttributes,
              where: {
                year: req.body.year,
                month: req.body.month,
                date: req.body.day,
                hour: req.body.hour,
                minute: req.body.minute,
                second: closestResult,
              }
            }).then(result => res.json(result))
          }
          
        })


      } else {
        console.log(result.length)
        res.json(result)
      }
      
    })
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