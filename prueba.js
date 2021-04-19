const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

url1="./article.json"

let readPartOne = (url) => {
    fs.readFile(url, "utf8", (err, jsonString) => {
      const object = JSON.parse(jsonString);
       if(validate(object)){
          console.log(true);
          try {
            fs.appendFileSync('db.json', jsonString)
          } catch (error) {
            console.log("Error", error);
          }
          console.log("End of script");
      }
      else{
          console.log(false);
          try {
           fs.appendFileSync('invalids.json', jsonString) 
          } catch (error) {
            console.log("Error", error);
          }
          console.log("End of script");
      }
  });
  };
  
  readPartOne(url1)