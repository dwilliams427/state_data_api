var fs = require('fs');
var csv = require('csv-parser');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let state_data = [];
fs.createReadStream('state_data.csv')
  .pipe(csv())
  .on('data', (data) => state_data.push(data))
  .on('end', () => {
    console.log("state_data:===================================================", state_data[0]["state"]);
  });

let abbrevs = [];
fs.createReadStream('abbreviations.csv')
  .pipe(csv())
  .on('data', (data) => abbrevs.push(data))
  .on('end', () => {
    console.log("abbrevs:===================================================", abbrevs[0]["Code"]);
  });

  app.get("/states", function(req, res) {
    //HERE WE NEED TO ADD STATE_DATA AND ABBREVS INTO ONE ARRAY
    //FOR EACH ITEM IN ARRAY, CREATE A NEW HASH --> hash[state_data["state"]]= abbrevs["Code"]
      //THEN ADD THIS OBJECT/HASH TO ARRAY
    let index = 0;
    let all_data = []
    let state = "";
    let abbrev = ""
    while (index < state_data.length){
      state = state_data[index]["state"];
      abbrev = abbrevs[index]["Code"];
      all_data.push(`${state}, ${abbrev}`)
      index += 1;
    }
    res.send(all_data);    
  });
   
  app.listen(3000, function(){
    console.log("server is running on port 3000");
  })

//HOW TO GET DATA OUT OF THIS FUNCTION???
// (async function () {
//     const st_data = await fs.readFile(__dirname+'/state_data.csv');
//     const abbrevs = await fs.readFile(__dirname+'/abbreviations.csv');
//     const state_data_parse = parse(st_data, {columns: true});
//     const abbrevs_parse = parse(abbrevs, {columns: true});
//     console.log("state data: ", state_data_parse[0]["state"]);
//     console.log("abbreviations: ", abbrevs_parse[0]["Code"]);

//     //Parse thru both csv files and return only the state name and abbreviation.
//     let index = 0
//     while (index < state_data_parse.length){
//       console.log(`${state_data_parse[index]["state"]}, ${abbrevs_parse[index]["Code"]}`);
//       index += 1
//     }

// })();


 
