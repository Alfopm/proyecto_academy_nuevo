const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

url1 = "./article.json"

//VALIDACION CON YUP

//SYNC 
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


// LECTURA MODULO validation.js
let readPartOne = (url) => {
  fs.readFile(url, "utf8", (err, jsonString) => {
    const object = JSON.parse(jsonString);
    if (validate(object)) {
      console.log(true);
      try {
        fs.appendFileSync('db.json', jsonString)
      } catch (error) {
        console.log("Error", error);
      }
      console.log("End of script");
    }
    else {
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

//readPartOne(url1);

let arrayObjRead = [];
const util = require('util')
const readBatch = () => {

  fs.readdir('Articles', function (err, files) {
    if (err) console.log("no se pudo leer", files);
    //console.log(files);
    files.forEach(file => {
      const url = './Articles/' + file;

      //console.log(camino);
      fs.readFile(url, 'utf8', function (err, data) {
        if (err) console.log('no se pudo leer el archivo');
        else {
          const object = JSON.parse(data);
          console.log(object);
          if (validate(object)) {
            console.log('se valido!');

            fs.appendFile('./db.json', data, function (err, data) {
              if (err) console.log('no se pudo escribir', data);
              else {
                console.log('se escribió el archivo en db.json');
              }
            })
          } else {
            console.log('no se valido!');
            fs.appendFile('./invalids.json', data, function (err, data) {
              if (err) console.log('No se pudo escribir en invalids.js');
              else {
                console.log('se escribio en invalids.js');
              }
            })
          }


        }

      })
    })


  })
}


//readBatch()



