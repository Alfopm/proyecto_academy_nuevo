const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

//valid
const url1 = "./test/valids/0379c574-3c1d-4c76-b694-589290f709a7.json";


//invalid
const url2 = "./test/invalids/1234.json";
const url3 = "./test/invalids/22ca4ccf-8d14-4035-9cbb-c1d0aee5ef38.json";
const url4 = "./test/invalids/2d77b0c6-858f-407f-a518-58371ac9adcb.json";
const url5 = "./test/invalids/d598e54f-923f-4397-8914-149ee41a7f61.json";
const url6 = "./test/invalids/efc30e08-49b1-4d1e-a727-a35aecd6468e.json.json";

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