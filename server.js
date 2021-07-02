/* eslint-disable camelcase */
var csv = require('csv-parser');
// const {get_abbrevs, get_state_data} = require('./csv_reader.js');
const path = require('path');
const express = require("express");
const app = express();

const neatCsv = require("neat-csv");
const fs = require("fs").promises;
const filePath = path.resolve(__dirname, "state_data.csv");

app.get('/states-test', function(req, res) {
  async function getSpreadsheetData() {
    const data = await fs.readFile(filePath);
    return await neatCsv(data);
  }
  
  (async () => {
    const loadedCSV = await getSpreadsheetData();
    res.send(loadedCSV);
  })();
});

//FORMER CSV PARSING CODE

function get_abbrevs() {
  //get all abbreviations
    let abbrevs = [];
    fs.createReadStream('abbreviations.csv')
      .pipe(csv())
      .on('data', (data) => {
        abbrevs.push(data);
        // console.log("abbrevs data: ", data);
        // console.log("abbrevs so far...", abbrevs);
      })
      .on('end', () => {
      // console.log("final abbrevs", abbrevs);
      return abbrevs;
      });
  }
  
  function get_state_data() {
  //get all state data
    let states_data = [];
    fs.createReadStream('state_data.csv')
      .pipe(csv())
      .on('data', (data) => {
        states_data.push(data);
        // console.log("getting state data:===============================================", data);
  
      })
      .on('end', () => {
        // console.log("FINAL state data: ", states_data);
      return states_data;
      });
  }



//RENDER HTML
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//This will return all the state/abbreviations
let all_data = [];
app.get("/states", function(req, res) {
  //HERE WE NEED TO ADD STATE NAME AND ABBREVS INTO ONE ARRAY
  //FOR EACH ITEM IN ARRAY, CREATE A NEW HASH --> hash[state_data["state"]]= abbrevs["Code"]
  //THEN ADD THIS OBJECT/HASH TO ARRAY
  // const { states, abbrevs } = get_all_data();
  // const state_data = states;

  let state_data;
  let abbrevs;
  const myPromise = new Promise((resolve, reject) => {
    state_data = get_state_data()
    abbrevs = get_abbrevs();
    // while(state_data === undefined && abbrevs === undefined){
    //   setTimeout(()=>{console.log("Waiting for response")}, 10000)
    // }
    if(state_data !== undefined && abbrevs !== undefined) {
      resolve();
    }
    else{
      reject("State data and abbrevs were not defined :(");
    }
  }).then(()=>{

    console.log("IVE BEEN RESOLVED!")
    let index = 0;
    let state = "";
    let abbrev = "";
    console.log(`state data: ${state_data}`);
    console.log(`abbrevs: ${abbrevs}`);
    while (index < state_data.length) {
      state = state_data[index]["state"];
      abbrev = abbrevs[index]["Code"];
      all_data.push(`${state}, ${abbrev}`);
      index += 1;
    }
    res.send(all_data);  
  }).catch(err => { console.log(err) });
});
  
app.listen(3000, function() {
  console.log("server is running on port 3000");
});

//this will parse params and return data for the specified state
app.get('/states/:abbreviation', function(req, res) {
  //we need to associate an ABREVIATION with the correct STATE DATA
  let state = "";
  // let temp_abbrev = "";
  const abbrevs = get_abbrevs();
  let index = 0;
  while (index < abbrevs.length) {
    if (abbrevs[index]["Code"] == req.params.abbreviation) {
      console.log(abbrevs[index]["State"]);
      // temp_abbrev = abbrevs[index]["State"];
      state = `${abbrevs[index]["State"]}, ${req.params.abbreviation} `;
      break;
    } 
    index += 1;    
  }
  console.log(state);  
  res.send(state);
});


//DATA MAPS API




 
