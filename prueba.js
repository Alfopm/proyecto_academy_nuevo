const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

url1="./article.json"

let readPartOne = (url) => {
    fs.readFile(url, "utf8", (err, jsonString) => {
      const object = JSON.parse(jsonString);
      
       if(schFunc(object)){
          console.log(true);
          console.log("End of script");
      }
      else{
          console.log(false, err.message);
          console.log("End of script");
      }
  });
  };
  
  readPartOne(url1)