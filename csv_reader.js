var fs = require('fs');
var csv = require('csv-parser');

//get all abbreviations
let abbrevs = [];
fs.createReadStream('abbreviations.csv')
  .pipe(csv())
  .on('data', (data) => {
    abbrevs.push(data)
    // console.log("abbrevs data[0]:===============================================", data)
  })
  .on('end', () => {
    // console.log("abbrevs:===================================================", abbrevs);
  });

  //get all state data
let state_data = [];
fs.createReadStream('state_data.csv')
  .pipe(csv())
  .on('data', (data) => state_data.push(data))
  .on('end', () => {
    // console.log("state_data:===================================================", state_data[0]["state"]);
  });

// get state/abbrev data


  module.exports = {state_data};
  module.exports = {abbrevs};