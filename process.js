const fs = require("fs");
let validate = require("./validation");
let schema = require('./validationYup');

//VALIDACION CON YUP

let url1 = "./article.json"
let validateYup = (url) => {
  fs.readFile(url, (err, data) => {
    if (err) {
      console.error(`Could not read file: ${err.message}`);
    }
    const jsonData = JSON.parse(data);
    schema.isValid(JSON.parse(data))
      .then(() => {
        const JsonToString = JSON.stringify(jsonData);
        fs.appendFile('db.json', JsonToString, "utf8", err => {
          if (err) {
            console.log(`Could not save into db: ${err.message}`);
            
          }
          else console.info('Saved correctly');
        });
      })
      .catch(err => {
        console.error(`Error validating: ${err.message}`);
      });
  });
}

validateYup(url1)

//------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        console.log("Error", err);
      }
      console.log("End of script");
    }
  });
};

//readPartOne(url1);

//-------------------------------------------------------------------------------------------------------------------------------

// PROCESO EN LOTES 

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
