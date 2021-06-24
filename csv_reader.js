var fs = require('fs');
var csv = require('csv-parser');

let abbrevs = [];
fs.createReadStream('abbreviations.csv')
  .pipe(csv())
  .on('data', (data) => {
    abbrevs.push(data)
    console.log("abbrevs data[0]:===============================================", data)
  })
  .on('end', () => {
    console.log("abbrevs:===================================================", abbrevs);
  });

let state_data = [];
fs.createReadStream('state_data.csv')
  .pipe(csv())
  .on('data', (data) => state_data.push(data))
  .on('end', () => {
    console.log("state_data:===================================================", state_data[0]["state"]);
  });

  module.exports = {state_data};
  module.exports = {abbrevs};