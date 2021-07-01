/* eslint-disable camelcase */
var fs = require('fs');
var csv = require('csv-parser');

function get_abbrevs() {
//get all abbreviations
  let abbrevs = [];
  fs.createReadStream('abbreviations.csv')
    .pipe(csv())
    .on('data', (data) => {
      abbrevs.push(data);
    // console.log("abbrevs data[0]:===============================================", data);
    })
    .on('end', () => {
    // console.log("abbrevs:===================================================", abbrevs);
    });
  return abbrevs;
}

function get_states() {
//get all state data
  let states_data = [];
  fs.createReadStream('state_data.csv')
    .pipe(csv())
    .on('data', (data) => {
      states_data.push(data);
      console.log("getting state data:===============================================", data);

    })
    .on('end', () => {
      console.log("FINAL state data:===================================================", states_data[0]["state"]);
    });
 
  console.log("helooooooooooo");

  return states_data;

}
// get state/abbrev data
module.exports = {get_states};
module.exports = {get_abbrevs};