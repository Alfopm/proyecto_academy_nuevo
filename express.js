const express = require('express');
const app = express();
const router = express.Router();
const readJson = require('./utilities')


let expressServer = () => {
    let objetoJson = readJson();

    //---------------------------------------------------------------------------------------------------
    app.get('/articles', function (req, res) {
        let dbToString = JSON.stringify(objetoJson);
        res.send(dbToString);
    });
    //---------------------------------------------------------------------------------------------------
    app.get(`/articles/:id`, function (req, res) {
        const query = req.params.id;
        const found = objetoJson.find(element => element.id === query);
        if (found !== undefined) {
            let mostrar = JSON.stringify(found)
            res.send(mostrar)
        }
        res.send("ocurrió un problema")
    })
    //--------------------------------------------------------------------------------------------------    
    app.listen(8080, err => {
        if (err) console.log("ERROR ", err);
        else
            console.log("Esperando requests en el puerto 8080");
    });
}

expressServer()