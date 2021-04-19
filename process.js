const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

url1="./article.json"

//VALIDACION CON YUP
//

//SYNC VIEJO Y QUERIDO
// let validateYup = (url) =>{
//   let data = fs.readFileSync(url, "utf8");
//     try {
//       schema.validate(data, {abortEarly: false});
//       //console.log(true);
//     } catch (err) {
//       return false
//     }
// }

// validateYup(url3);


// INTENTO ALBERTO

// let validateYup = async(url) =>{
//   let data = fs.readFile(url, function(err,data){
//       const validattion = await schema.isValid(data, { abortEarly: false });
//       // const mappedErrors = validation.inner.reduce((errors, entry) => {
//       //   return {
//       //     ...errors,
//       //     [entry.path]: entry.message,
//       //   };
//       // }, {});
//       console.log(validattion)
//     }

//   )
// }



//validYup(url3)

// LECTURA MODULO validation.js
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