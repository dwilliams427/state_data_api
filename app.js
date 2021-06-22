var fs = require('fs');
var csv = require('csv-parser');
const express = require("express");
const app = express();

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


  //considering that you said I did well, is there any possibilty for an internship? Wanna get my foot in the door and gain experience and i feel paynearme
  //would be a great place to get that experience.If not do you know if you will have internship or 
  //apprenticeship roles later? I'd like to keep in touch for if/when those roles  open

  //This will return all the state/abbreviations
app.get("/states", function(req, res) {
  //HERE WE NEED TO ADD STATE NAME AND ABBREVS INTO ONE ARRAY
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

//this will parse params and return data for the specified state
app.get('/states/:abbreviation', function(req, res){
  //we need to associate an AABREVIATION with the correct STATE DATA
  let state = "";
  let temp_abbrev = "";
  let index = 0;
  while(index < abbrevs.length){
    if (abbrevs[index]["Code"] == req.params.abbreviation){
      console.log(abbrevs[index]["State"]);
      temp_abbrev = abbrevs[index]["State"];
      state = `${abbrevs[index]["State"]}, ${req.params.abbreviation} `
      break;
    } else {
      index += 1;
    }
  }
  console.log(state);  
  res.send(state);
});





 
