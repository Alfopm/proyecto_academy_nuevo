const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const readJson = require('./utilities')
const validate = require("./validation");
const fs = require('fs');

let expressServer = () => {
    let objetoJson = readJson();

    //---------------------------------------------------------------------------------------------------
    //GET 
    app.get('/articles', function (req, res) {
        let dbToString = JSON.stringify(objetoJson);
        res.send(dbToString);
    });
    //---------------------------------------------------------------------------------------------------
    //GET 
    app.get('/articles/:id', function (req, res) {
        const query = req.params.id;
        const found = objetoJson.find(element => element.id === query);
        if (found !== undefined) {
            let mostrar = JSON.stringify(found)
            res.send(mostrar)
        } else
            res.send("ocurrió un problema")
    })
    //--------------------------------------------------------------------------------------------------    
    //POST
    app.use(bodyParser.json());
    app.post('/articles', (req, res) => {
        let body = req.body
        if (!body) {
            return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
            });
        }
        else {
            let bodyToString = JSON.stringify(body)
            if (validate(req.body)) {
                try {
                    fs.appendFileSync('db.json', bodyToString)
                } catch (err) {
                    console.log("Error", err.message);
                }
                res.status(201).json({
                    status: 'succes',
                    message: 'The article was succesfully saved.'
                })
            }
            else {
                try {
                    fs.appendFileSync('invalids.json', bodyToString)
                } catch (err) {
                    console.log("Error", err.message);
                } 
                res.status(201).json({
                    status: 'succes',
                    message: 'The article did not meet the requirements, but still it was saved.'
                })
            }
        }
    })

    //------------------------------------------------------------------------------------------------------
    app.listen(8080, err => {
        if (err) console.log("ERROR ", err);
        else
            console.log("Esperando requests en el puerto 8080");
    });
}

expressServer()