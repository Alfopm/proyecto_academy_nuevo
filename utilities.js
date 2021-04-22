const fs = require("fs");

let readJsonDB = () => {
    let readFile = fs.readFileSync("db.json");
    objRead = JSON.parse(readFile)
    return objRead
}

module.exports = readJsonDB