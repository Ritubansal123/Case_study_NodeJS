const { json } = require("body-parser");
const fs = require("fs");
var sailing;
//read the JSON file 
var freightData =() => JSON.parse(fs.readFileSync("./data/response.json", "utf8"));

module.exports={freightData};